"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  ADMIN_COOKIE,
  AdminApiError,
  deleteMessage,
  deleteConversation,
  deleteTestimonial,
  getConversation,
  notifyConversation,
  putSection,
  replyToConversation,
  setMessageRead,
  setTestimonialStatus,
} from "@/lib/admin-api";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";
import { findSection } from "@/components/admin/content/sections";
import type { TestimonialStatus } from "@/types";
import type { AdminConversation } from "@/types/conversation";
import { draftSummaryEmail, SummaryError } from "@/lib/summary-email";

export type ActionState = { error?: string };

/** Only paths inside the dashboard: `next` comes from the URL. */
function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/admin") && !next.startsWith("/admin/login") && !next.includes("//")
    ? next
    : "/admin";
}

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!username || !password) return { error: "Enter your username and password." };
  if (!PORTFOLIO_API_BASE) return { error: "PORTFOLIO_API_URL is not set." };

  let response: Response;
  try {
    response = await fetch(`${PORTFOLIO_API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { error: "Can't reach the API right now. Try again in a minute." };
  }

  if (response.status === 401) return { error: "Wrong username or password." };
  if (response.status === 429) return { error: "Too many attempts. Wait a minute, then try again." };
  if (!response.ok) return { error: `The API answered ${response.status}. Try again later.` };

  const result = (await response.json().catch(() => null)) as {
    accessToken?: string;
    expiresAt?: string;
  } | null;
  if (!result?.accessToken) return { error: "The API's answer had no token." };

  (await cookies()).set(ADMIN_COOKIE, result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    expires: result.expiresAt ? new Date(result.expiresAt) : undefined,
  });
  redirect(safeNext(formData.get("next")));
}

export async function logout(): Promise<void> {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

/** Runs a mutation, refreshes the dashboard, and turns API errors into a message. */
async function run(work: () => Promise<void>, after?: () => void): Promise<ActionState> {
  try {
    await work();
  } catch (error) {
    if (error instanceof AdminApiError) return { error: error.message };
    throw error; // includes Next's redirect to the login on a 401
  }
  after?.();
  revalidatePath("/admin", "layout");
  return {};
}

export async function markMessage(id: number, isRead: boolean): Promise<ActionState> {
  return run(() => setMessageRead(id, isRead));
}

export async function removeMessage(id: number): Promise<ActionState> {
  return run(() => deleteMessage(id));
}

// The public testimonial list is cached; refresh it now, not in 10 minutes.
export async function changeTestimonialStatus(
  id: number,
  status: TestimonialStatus,
): Promise<ActionState> {
  return run(
    () => setTestimonialStatus(id, status),
    () => revalidateTag("testimonials"),
  );
}

export async function removeTestimonial(id: number): Promise<ActionState> {
  return run(
    () => deleteTestimonial(id),
    () => revalidateTag("testimonials"),
  );
}

/**
 * Saves one content section (the whole list or object) through the API's
 * admin PUT, then refreshes the public site's cached content at once.
 */
export async function saveSection(
  slug: string,
  data: unknown,
): Promise<ActionState & { data?: unknown }> {
  const section = findSection(slug);
  if (!section) return { error: "Unknown section." };
  try {
    const saved = await putSection(section.endpoint, data);
    revalidateTag("content");
    revalidatePath("/admin/content", "layout");
    return { data: saved ?? undefined };
  } catch (error) {
    if (error instanceof AdminApiError) return { error: error.message };
    throw error;
  }
}

// ---------- conversations ----------

type ThreadState = ActionState & { conversation?: AdminConversation };

/** Zaid's reply in a conversation. Sends no email (see sendSummaryEmail). */
export async function sendReply(id: number, body: string): Promise<ThreadState> {
  const text = body.trim();
  if (!text) return { error: "Write a reply first." };
  if (text.length > 5000) return { error: "Keep a reply under 5000 characters." };
  try {
    const conversation = await replyToConversation(id, text);
    revalidatePath("/admin", "layout");
    return { conversation };
  } catch (error) {
    if (error instanceof AdminApiError) return { error: error.message };
    throw error;
  }
}

/** Gemini's draft of the summary email, for Zaid to check and edit. */
export async function draftSummary(id: number): Promise<ActionState & { draft?: string }> {
  try {
    const conversation = await getConversation(id);
    if (!conversation) return { error: "This conversation no longer exists." };
    const draft = await draftSummaryEmail(conversation.name, conversation.unemailedReplies);
    return { draft };
  } catch (error) {
    if (error instanceof AdminApiError || error instanceof SummaryError) return { error: error.message };
    throw error;
  }
}

/** Emails the visitor the summary Zaid approved (and maybe edited). */
export async function sendSummaryEmail(id: number, body: string): Promise<ThreadState> {
  const text = body.trim();
  if (!text) return { error: "The email is empty." };
  if (text.length > 5000) return { error: "Keep the email under 5000 characters." };
  try {
    const conversation = await notifyConversation(id, text);
    revalidatePath("/admin", "layout");
    return { conversation };
  } catch (error) {
    if (error instanceof AdminApiError)
      return {
        error:
          error.status === 502
            ? "The email couldn't be sent. Nothing was marked as emailed; try again."
            : error.message,
      };
    throw error;
  }
}

export async function removeConversation(id: number): Promise<ActionState> {
  return run(() => deleteConversation(id));
}

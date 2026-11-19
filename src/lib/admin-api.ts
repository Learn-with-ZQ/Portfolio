// Server-only: reads the httpOnly admin cookie. Never import from a client component.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type {
  AdminMessage,
  AdminSummary,
  AdminTestimonial,
  MessageFilter,
  TestimonialFilter,
} from "@/types/admin";
import type { TestimonialStatus } from "@/types";
import type { AdminConversation, AdminConversationSummary } from "@/types/conversation";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";

/**
 * The admin dashboard's link to the Portfolio API. The API's admin JWT (from
 * POST /api/auth/login, 60 minutes) lives in this httpOnly cookie, scoped to
 * /admin, and only the site's server ever sends it to the API.
 */
export const ADMIN_COOKIE = "admin_token";

const TIMEOUT_MS = 10_000;

/** The API couldn't do what was asked; `message` is safe to show Zaid. */
export class AdminApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

/**
 * Calls the API with the admin token. A 401 (expired, revoked or forged
 * token) sends Zaid to the login; the cookie is replaced when he signs in.
 */
async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!PORTFOLIO_API_BASE) throw new AdminApiError("PORTFOLIO_API_URL is not set.", 503);
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) redirect("/admin/login");

  let response: Response;
  try {
    response = await fetch(`${PORTFOLIO_API_BASE}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new AdminApiError("The API can't be reached right now. Try again in a minute.", 503);
  }

  if (response.status === 401) redirect("/admin/login?expired=1");
  return response;
}

async function readJson<T>(path: string): Promise<T> {
  const response = await adminFetch(path);
  if (!response.ok) throw await toError(response);
  return (await response.json()) as T;
}

/** A mutation. A 404 means it's already gone, which is what was wanted. */
async function mutate(path: string, method: "PUT" | "DELETE", body?: unknown): Promise<void> {
  const response = await adminFetch(path, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok && response.status !== 404) throw await toError(response);
}

async function toError(response: Response): Promise<AdminApiError> {
  const body = (await response.json().catch(() => null)) as
    | { message?: unknown; title?: unknown }
    | null;
  // ProblemDetails from model validation lists field errors under `errors`.
  const fieldErrors =
    body && typeof (body as { errors?: unknown }).errors === "object" && (body as { errors?: unknown }).errors
      ? Object.values((body as { errors: Record<string, unknown> }).errors)
          .flat()
          .filter((e): e is string => typeof e === "string")
          .slice(0, 3)
      : [];
  const detail = fieldErrors.length
    ? fieldErrors.join(" ")
    : typeof body?.message === "string"
      ? body.message
      : typeof body?.title === "string"
        ? body.title
        : `The API answered ${response.status}.`;
  return new AdminApiError(detail, response.status);
}

export const getSummary = () => readJson<AdminSummary>("/api/admin/summary");

export const getMessages = (filter: MessageFilter) =>
  readJson<AdminMessage[]>(`/api/admin/messages?filter=${filter}`);

export const setMessageRead = (id: number, isRead: boolean) =>
  mutate(`/api/admin/messages/${id}/read`, "PUT", { isRead });

export const deleteMessage = (id: number) => mutate(`/api/admin/messages/${id}`, "DELETE");

export const getTestimonials = (status: TestimonialFilter) =>
  readJson<AdminTestimonial[]>(`/api/admin/testimonials?status=${status}`);

export const setTestimonialStatus = (id: number, status: TestimonialStatus) =>
  mutate(`/api/admin/testimonials/${id}/status`, "PUT", { status });

export const deleteTestimonial = (id: number) =>
  mutate(`/api/admin/testimonials/${id}`, "DELETE");

/** A content section, read fresh for editing (the public GET). */
export const getSection = (endpoint: string) => readJson<unknown>(endpoint);

/** Saves a whole content section; returns it as the API now has it. */
export async function putSection(endpoint: string, body: unknown): Promise<unknown> {
  const response = await adminFetch(endpoint, { method: "PUT", body: JSON.stringify(body) });
  if (!response.ok) throw await toError(response);
  return response.json().catch(() => null);
}

// ---------- conversations ----------

export const getConversations = () =>
  readJson<AdminConversationSummary[]>("/api/admin/conversations");

/** A full thread. Reading it marks the visitor's messages as read. */
export async function getConversation(id: number): Promise<AdminConversation | null> {
  const response = await adminFetch(`/api/admin/conversations/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw await toError(response);
  return (await response.json()) as AdminConversation;
}

async function postThread(path: string, body: string): Promise<AdminConversation> {
  const response = await adminFetch(path, { method: "POST", body: JSON.stringify({ body }) });
  if (!response.ok) throw await toError(response);
  return (await response.json()) as AdminConversation;
}

/** Adds Zaid's reply. Sends no email. */
export const replyToConversation = (id: number, body: string) =>
  postThread(`/api/admin/conversations/${id}/messages`, body);

/** Emails the visitor the summary Zaid approved. */
export const notifyConversation = (id: number, body: string) =>
  postThread(`/api/admin/conversations/${id}/notify`, body);

export const deleteConversation = (id: number) =>
  mutate(`/api/admin/conversations/${id}`, "DELETE");

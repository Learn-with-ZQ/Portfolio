import type { ConversationMessage, MyConversation } from "@/types/conversation";
import { PORTFOLIO_API_BASE } from "@/lib/portfolio-api";

/** What loading the visitor's own conversation came to. */
export type MyConversationResult =
  | { kind: "found"; conversation: MyConversation }
  | { kind: "none" }
  /** The API rejected the visitor token: sign in again. */
  | { kind: "reauth" }
  | { kind: "unavailable" };

const TIMEOUT_MS = 8000;

export function toMyConversation(data: unknown): MyConversation | null {
  if (typeof data !== "object" || data === null) return null;
  const r = data as { id?: unknown; messages?: unknown };
  if (typeof r.id !== "number" || !Array.isArray(r.messages)) return null;
  const messages = r.messages
    .filter(
      (m): m is ConversationMessage =>
        typeof m === "object" &&
        m !== null &&
        typeof (m as ConversationMessage).id === "number" &&
        ((m as ConversationMessage).sender === "visitor" || (m as ConversationMessage).sender === "admin") &&
        typeof (m as ConversationMessage).body === "string",
    )
    .map((m) => ({ id: m.id, sender: m.sender, body: m.body, createdAt: String(m.createdAt ?? "") }));
  return { id: r.id, messages };
}

/** The visitor's conversation, read fresh with their visitor token. */
export async function getMyConversation(visitorToken: string): Promise<MyConversationResult> {
  if (!PORTFOLIO_API_BASE) return { kind: "unavailable" };
  try {
    const res = await fetch(`${PORTFOLIO_API_BASE}/api/conversations/mine`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${visitorToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status === 404) return { kind: "none" };
    if (res.status === 401) return { kind: "reauth" };
    if (!res.ok) return { kind: "unavailable" };
    const conversation = toMyConversation(await res.json());
    return conversation ? { kind: "found", conversation } : { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  }
}

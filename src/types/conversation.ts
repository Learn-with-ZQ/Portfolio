/** Shapes of the Portfolio API's conversation endpoints. */

export type ConversationSender = "visitor" | "admin";

export interface ConversationMessage {
  id: number;
  sender: ConversationSender;
  body: string;
  createdAt: string;
}

/** The signed-in visitor's own conversation (GET /api/conversations/mine). */
export interface MyConversation {
  id: number;
  messages: ConversationMessage[];
}

/** A row in the dashboard's conversation list. */
export interface AdminConversationSummary {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string | null;
  lastMessageAt: string;
  adminUnread: number;
  lastMessage: { sender: ConversationSender; body: string } | null;
}

/** A full thread in the dashboard. */
export interface AdminConversation {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string | null;
  createdAt: string;
  lastMessageAt: string;
  visitorNotifiedAt: string | null;
  messages: ConversationMessage[];
  /** Zaid's replies since the visitor's last summary email, oldest first. */
  unemailedReplies: { id: number; body: string; createdAt: string }[];
}

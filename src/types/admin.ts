import type { TestimonialStatus } from "@/types";

/** Shapes of the Portfolio API's /api/admin/* endpoints (admin token only). */

export interface AdminSummary {
  unreadMessages: number;
  pendingTestimonials: number;
  totalMessages: number;
  approvedTestimonials: number;
  /** Conversations with messages Zaid hasn't read. Absent on an API before conversations. */
  unreadConversations?: number;
}

export interface AdminMessage {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
}

export interface AdminTestimonial {
  id: number;
  createdAt: string;
  updatedAt: string;
  approvedAt: string | null;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  rating: number;
  profileImageUrl: string | null;
  documentUrl: string | null;
  documentName: string | null;
  status: TestimonialStatus;
}

export type MessageFilter = "unread" | "all";
export type TestimonialFilter = TestimonialStatus | "all";

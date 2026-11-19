import { Suspense } from "react";
import { getSummary, AdminApiError } from "@/lib/admin-api";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import type { AdminSummary } from "@/types/admin";

/** Every signed-in admin page: the sidebar, then the page. */
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  // The counts are a nicety: without them the sidebar still works.
  let summary: AdminSummary | null = null;
  try {
    summary = await getSummary();
  } catch (error) {
    if (!(error instanceof AdminApiError)) throw error;
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Suspense>
        <AdminSidebar
          counts={{
            conversations: summary?.unreadConversations ?? null,
            anonymous: summary?.unreadMessages ?? null,
            testimonials: summary?.pendingTestimonials ?? null,
          }}
        />
      </Suspense>
      <main id="main-content" className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 lg:px-12 lg:py-10">{children}</div>
      </main>
    </div>
  );
}

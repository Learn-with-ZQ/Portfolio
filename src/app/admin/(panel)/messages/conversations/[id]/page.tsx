import { notFound } from "next/navigation";
import { AdminApiError, getConversation } from "@/lib/admin-api";
import { ConversationThread } from "@/components/admin/conversation-thread";
import { ErrorPanel } from "@/components/admin/error-panel";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import type { AdminConversation } from "@/types/conversation";

export const metadata = { title: "Conversation" };

interface ThreadPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminConversationPage({ params }: ThreadPageProps) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  let conversation: AdminConversation | null = null;
  let error = "";
  try {
    conversation = await getConversation(id);
  } catch (e) {
    if (!(e instanceof AdminApiError)) throw e;
    error = e.message;
  }
  if (!error && !conversation) notFound();

  return (
    <>
      {conversation ? (
        <>
          <AdminPageHeader
            trail={[
              { href: "/admin", label: "Dashboard" },
              { href: "/admin/messages", label: "Conversations" },
              { label: conversation.name },
            ]}
            title={conversation.name}
            description={
              <a href={`mailto:${conversation.email}`} className="link break-all">
                {conversation.email}
              </a>
            }
          />
          <div className="mt-8">
            <ConversationThread key={conversation.id} initial={conversation} />
          </div>
        </>
      ) : (
        <div className="grid gap-8">
          <AdminPageHeader
            trail={[{ href: "/admin", label: "Dashboard" }, { href: "/admin/messages", label: "Conversations" }]}
            title="Conversation"
          />
          <ErrorPanel message={error} />
        </div>
      )}
    </>
  );
}

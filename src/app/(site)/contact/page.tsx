import { createPageMetadata } from "@/lib/metadata";
import { getContactInfo, getSocialLinks } from "@/lib/content";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/ui/section";
import { SocialIcons } from "@/components/ui/social-icons";
import { ContactForm } from "@/components/contact/contact-form";
import { ConversationPanel } from "@/components/contact/conversation-panel";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { LogIn } from "lucide-react";
import { auth, signIn } from "@/lib/auth";
import { getVisitorToken, hasFreshVisitorToken } from "@/lib/visitor-token";
import { getMyConversation } from "@/lib/conversation";
import type { MyConversation } from "@/types/conversation";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Muhammad Zaid Qasim — email, phone, and social links. Open to roles and collaborations in backend, .NET, and full-stack development.",
  path: "/contact",
});

async function signInToChat() {
  "use server";
  await signIn("google", { redirectTo: "/contact" });
}

export default async function ContactPage() {
  const [contactInfo, socialLinks, session] = await Promise.all([
    getContactInfo(),
    getSocialLinks(),
    auth(),
  ]);

  // Signed in with Google: a two-way conversation. Signed out: the anonymous
  // form, as before, plus an invitation to sign in and chat.
  const user = session?.user?.id && session.user.email ? session.user : null;
  let conversation: MyConversation | null = null;
  let needsReauth = false;
  let loadFailed = false;
  if (user) {
    const token = hasFreshVisitorToken(user.visitorTokenExpiresAt)
      ? await getVisitorToken(await headers())
      : null;
    if (!token) needsReauth = true;
    else {
      const mine = await getMyConversation(token);
      if (mine.kind === "found") conversation = mine.conversation;
      else if (mine.kind === "reauth") needsReauth = true;
      else if (mine.kind === "unavailable") loadFailed = true;
    }
  }
  const contactRows = [
    { label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { label: "Phone", value: contactInfo.phoneDisplay, href: `tel:${contactInfo.phone}` },
    { label: "Location", value: contactInfo.location },
  ];

  return (
    <>
      <PageHeader
        title="Contact"
        description="Have a question or an opportunity? Send a message — I usually respond within a day."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0 space-y-6">
            {user ? (
              <div className="surface reveal p-6 sm:p-8">
                <h2 className="type-h3">Your conversation with Zaid</h2>
                <p className="type-meta mt-1.5 max-w-[60ch] text-ink-muted">
                  Signed in as {user.email}. I reply here, and you get an email when there&apos;s a
                  reply to read.
                </p>
                <div className="mt-6">
                  <ConversationPanel
                    firstName={(user.name ?? "").split(" ")[0] || "there"}
                    initial={conversation}
                    needsReauth={needsReauth}
                    loadFailed={loadFailed}
                    signInAction={signInToChat}
                  />
                </div>
              </div>
            ) : null}

            <div className="surface reveal p-6 sm:p-8">
              <h2 className="type-h3">{user ? "Or send a one-off message" : "Send a message"}</h2>
              <p className="type-meta mt-1.5 max-w-[60ch] text-ink-muted">
                No sign-in needed. Your message lands straight in my inbox, and I&apos;ll reply to the
                email (or phone number) you leave here.
              </p>
              <div className="mt-6">
                <ContactForm email={contactInfo.email} />
              </div>
            </div>

            {user ? null : (
              <div className="reveal flex flex-col gap-4 rounded-lg border border-dashed border-rule-strong p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <p className="type-meta text-ink">
                  Prefer a conversation? Sign in with Google to chat with me here and get an email
                  when I reply.
                </p>
                <form action={signInToChat} className="shrink-0">
                  <Button type="submit" variant="secondary">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Sign in with Google
                  </Button>
                </form>
              </div>
            )}
          </div>

          <aside aria-labelledby="direct-title" className="reveal min-w-0">
            <h2 id="direct-title" className="type-h3">
              Reach me directly
            </h2>
            <dl className="mt-4">
              {contactRows.map((row) => (
                <div key={row.label} className="border-t border-rule py-4">
                  <dt className="type-meta text-ink-muted">{row.label}</dt>
                  <dd className="mt-1 [overflow-wrap:anywhere]">
                    {row.href ? (
                      <a href={row.href} className="link">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-ink">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <h2 className="type-meta border-t border-rule pt-5 font-semibold text-ink">
              Find me online
            </h2>
            <SocialIcons links={socialLinks} className="mt-3" />
          </aside>
        </div>
      </Section>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ExternalLink,
  Inbox,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquareQuote,
  MessagesSquare,
  X,
} from "lucide-react";
import { logout } from "@/app/admin/actions";
import { SECTIONS, SECTION_GROUPS } from "@/components/admin/content/sections";
import { cn } from "@/lib/utils";

export interface SidebarCounts {
  conversations: number | null;
  anonymous: number | null;
  testimonials: number | null;
}

function Count({ value, label }: { value: number | null; label: string }) {
  if (!value) return null;
  return (
    <span className="ml-auto rounded-full bg-cta px-1.5 font-mono text-[0.6875rem] leading-5 tabular-nums text-primary-foreground">
      {value}
      <span className="sr-only"> {label}</span>
    </span>
  );
}

function NavLink({
  href,
  active,
  icon,
  children,
  count,
  countLabel = "unread",
  sub = false,
}: {
  href: string;
  active: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  count?: number | null;
  countLabel?: string;
  sub?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex min-h-9 items-center gap-2.5 rounded-md pr-2 text-sm transition-colors",
        sub ? "pl-9" : "pl-3",
        active ? "bg-white/10 font-medium text-ink" : "text-ink-muted hover:bg-white/5 hover:text-ink",
      )}
    >
      {/* The one accent: a gold mark on the page you're on. */}
      {active ? <span aria-hidden="true" className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-cta" /> : null}
      {icon}
      <span className="truncate">{children}</span>
      <Count value={count ?? null} label={countLabel} />
    </Link>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="mb-1 px-3 text-xs text-ink-muted/80">{label}</p>
      <div className="grid gap-0.5">{children}</div>
    </div>
  );
}

export function AdminSidebar({ counts }: { counts: SidebarCounts }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const [open, setOpen] = useState(false);

  // Close the phone menu after navigating.
  useEffect(() => setOpen(false), [pathname, search]);

  const onAnonymous = pathname === "/admin/messages" && search.get("tab") === "anonymous";
  const onConversations =
    (pathname === "/admin/messages" && !onAnonymous) || pathname.startsWith("/admin/messages/conversations");
  const icon = "h-4 w-4 shrink-0";

  const nav = (
    <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-color:rgba(255,255,255,0.15)_transparent] [scrollbar-width:thin]" data-lenis-prevent>
      <Group label="Overview">
        <NavLink href="/admin" active={pathname === "/admin"} icon={<LayoutGrid className={icon} aria-hidden="true" />}>
          Dashboard
        </NavLink>
      </Group>

      <Group label="Inbox">
        <NavLink
          href="/admin/messages"
          active={onConversations}
          icon={<MessagesSquare className={icon} aria-hidden="true" />}
          count={counts.conversations}
          countLabel="with unread messages"
        >
          Conversations
        </NavLink>
        <NavLink
          href="/admin/messages?tab=anonymous"
          active={onAnonymous}
          icon={<Inbox className={icon} aria-hidden="true" />}
          count={counts.anonymous}
        >
          Anonymous messages
        </NavLink>
        <NavLink
          href="/admin/testimonials"
          active={pathname.startsWith("/admin/testimonials")}
          icon={<MessageSquareQuote className={icon} aria-hidden="true" />}
          count={counts.testimonials}
          countLabel="waiting for review"
        >
          Testimonials
        </NavLink>
      </Group>

      {SECTION_GROUPS.map((group) => (
        <Group key={group} label={group}>
          {SECTIONS.filter((s) => s.group === group).map((section) => (
            <NavLink
              key={section.slug}
              href={`/admin/content/${section.slug}`}
              active={pathname === `/admin/content/${section.slug}`}
            >
              {section.title}
            </NavLink>
          ))}
        </Group>
      ))}
    </nav>
  );

  const footer = (
    <div className="grid gap-0.5 border-t border-white/10 px-3 py-3">
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="flex min-h-9 items-center gap-2.5 rounded-md px-3 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
      >
        <ExternalLink className={icon} aria-hidden="true" />
        View site
      </a>
      <form action={logout}>
        <button
          type="submit"
          className="flex min-h-9 w-full items-center gap-2.5 rounded-md px-3 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
        >
          <LogOut className={icon} aria-hidden="true" />
          Sign out
        </button>
      </form>
    </div>
  );

  const brand = (
    <Link href="/admin" className="flex items-baseline gap-2 text-ink">
      <span className="text-[0.9375rem] font-semibold tracking-tight">Zaid Qasim</span>
      <span className="font-mono text-[0.6875rem] text-ink-muted">admin</span>
    </Link>
  );

  return (
    <>
      {/* Phones: a top bar with a menu button; the sidebar slides in over the page. */}
      <div className="band-dark sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 px-4 lg:hidden">
        {brand}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="admin-sidebar"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-white/10"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      ) : null}

      <aside
        id="admin-sidebar"
        className={cn(
          "band-dark fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-64 lg:translate-x-0 lg:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-6">
          {brand}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-white/10 hover:text-ink lg:hidden"
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        {nav}
        {footer}
      </aside>
    </>
  );
}

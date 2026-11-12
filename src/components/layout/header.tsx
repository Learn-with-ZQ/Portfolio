"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, FileDown, Menu, X } from "lucide-react";
import { mainNav, moreNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import type { NavLink } from "@/types";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { containerClass } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// The wordmark already links home, so the desktop bar leaves "Home" out.
const desktopLinks = mainNav.filter((link) => link.href !== "/");

// Tabs sit on the header's bottom rule; the active one gets a primary bar.
const tabStyles =
  "flex h-16 items-center border-b-2 border-transparent px-3 text-[0.9375rem] text-ink-muted transition-colors hover:text-ink";
const tabActiveStyles = "border-primary text-ink";

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
}

function MoreMenu({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const containsActive = links.some((link) => isActive(link.href));

  return (
    <li ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(tabStyles, "gap-1", containsActive && tabActiveStyles)}
      >
        More
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul id={menuId} className="surface absolute top-full left-0 z-50 mt-px min-w-52 py-1.5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="flex h-11 items-center border-l-2 border-transparent px-4 text-[0.9375rem] text-ink-muted transition-colors hover:bg-surface hover:text-ink aria-[current=page]:border-primary aria-[current=page]:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const isActive = useIsActive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Mobile menu: lock scroll, move focus in, trap Tab, close on Escape and
  // return focus to the toggle, and close if the viewport grows past `lg`.
  useEffect(() => {
    if (!isMenuOpen) return;
    const menu = menuRef.current;
    document.body.style.overflow = "hidden";
    menu?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const items = [
        toggleRef.current,
        ...Array.from(menu.querySelectorAll<HTMLElement>("a[href], button")),
      ].filter((element): element is HTMLElement => Boolean(element));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ground">
      <div className={cn(containerClass, "flex h-16 items-center gap-6 lg:gap-8")}>
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="wordmark flex h-11 shrink-0 items-center text-lg text-ink"
        >
          Zaid Qasim
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {desktopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(tabStyles, isActive(link.href) && tabActiveStyles)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <MoreMenu links={moreNav} />
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ButtonLink
            href={profile.resumeUrl}
            download
            variant="secondary"
            size="sm"
            className="hidden md:inline-flex"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            Resume
          </ButtonLink>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-rule text-ink transition-colors hover:border-rule-strong lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-rule bg-ground lg:hidden"
        >
          <nav aria-label="Mobile" className={cn(containerClass, "pt-2 pb-10")}>
            <ul>
              {[...mainNav, ...moreNav].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="flex h-12 items-center border-b border-l-2 border-rule border-l-transparent pl-3 text-[1.0625rem] text-ink-muted transition-colors hover:text-ink aria-[current=page]:border-l-primary aria-[current=page]:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={profile.resumeUrl}
              download
              variant="secondary"
              size="lg"
              className="mt-8 w-full"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Download resume
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

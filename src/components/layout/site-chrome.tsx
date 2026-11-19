import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Assistant } from "@/components/assistant/assistant";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

/**
 * The public site's chrome: skip link, header, main, footer, the chat mascot
 * and the smooth scroll. Used by the `(site)` route group's layout and by the
 * root `not-found.tsx` / `error.tsx`, which sit outside that group. The admin
 * (`/admin`) has its own layout and none of this.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ground"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <Assistant />
      <SmoothScroll />
    </>
  );
}

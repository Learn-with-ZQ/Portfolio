import { SiteChrome } from "@/components/layout/site-chrome";

/**
 * Every public page. A route group (no effect on URLs) so `/admin` can have a
 * layout without the public header, footer and mascot.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}

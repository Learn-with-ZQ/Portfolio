# Enterprise SEO Audit Report
## Portfolio: Muhammad Zaid Qasim — Next.js Portfolio

**Audit scope:** Full source-code review of all 103 repository files (excluding `.git`), with focus on `src/app`, `src/components`, `src/lib`, `src/data`, `src/types`, `public`, config, and routing.

**Audit date:** July 18, 2026  
**Method:** Static code analysis only — no code modified, no live Lighthouse/CWV measurement (build tooling unavailable in environment).

---

## 1. Executive Summary

This portfolio is **well above average** for a personal developer site. It has a solid Next.js App Router foundation, per-page metadata, `robots.ts`, `sitemap.ts`, Open Graph/Twitter defaults, Person JSON-LD, semantic landmarks, skip navigation, and strong E-E-A-T content (experience, projects, education, certifications).

However, it is **not yet optimized for your stated personal-brand ranking goals**. The site consistently brands you as **“Software Developer”**, while your target queries emphasize **“Software Engineer,” “Full Stack Developer,” “React Developer,” and “Portfolio.”** Several high-value keywords exist only in client-rendered typing animation (empty in SSR HTML). Structured data is minimal (Person only). Security headers, custom domain configuration, OG image format, and entity reinforcement across GitHub/LinkedIn handles need work.

**Bottom line:** Strong technical and content foundation (~72/100 overall). With targeted metadata, schema, keyword alignment, domain setup, and off-site entity building, ranking for **“Muhammad Zaid Qasim”** should be achievable. Broader queries like **“Zaid”** or **“Muhammad Zaid”** will remain highly competitive.

---

## 2. Overall SEO Score: **72 / 100**

| Category | Score |
|---|---|
| Technical SEO | 68 / 100 |
| On-Page SEO | 74 / 100 |
| Performance | 78 / 100 |
| Accessibility | 82 / 100 |
| Structured Data | 55 / 100 |
| Personal Branding | 70 / 100 |
| E-E-A-T | 76 / 100 |

---

## 3. Technical SEO Score: **68 / 100**

### What works
- Root metadata in `layout.tsx` with `metadataBase`, title template, description, keywords, authors, OG, Twitter, robots
- Dynamic `sitemap.ts` covering 12 static routes + 9 project slugs
- `robots.ts` with sitemap reference
- `generateStaticParams()` on project detail routes (SSG-friendly)
- Canonical `./` pattern with `metadataBase` (should resolve per-route — verify in production HTML)

### Critical gaps
- Default production URL is Vercel subdomain, not a branded custom domain
- No `middleware.ts`
- Empty `next.config.ts` — no security headers, redirects, or image policy
- `/api/contact` is crawlable (`allow: /`) though it is not a page
- No Search Console verification meta tag
- No `manifest.json`, `apple-touch-icon`, or dedicated OG image asset

---

## 4. On-Page SEO Score: **74 / 100**

### Strengths
- Full name appears in default title, hero H1, and most meta descriptions
- 21 indexable content URLs with unique titles/descriptions
- Strong topical depth: experience, 9 projects, skills, services, education
- Internal linking via header, footer, homepage CTAs, project next-links

### Weaknesses
- Inner-page H1s are generic (“Experience”, “About Me → Engineering with purpose”) rather than name + intent
- Target keyword variants underrepresented in visible HTML
- Homepage has no page-level `metadata` export (inherits root — acceptable but limits homepage-specific tuning)
- Project `generateMetadata()` only sets `title` + `description` — no page-specific OG/canonical/schema

---

## 5. Performance Score: **78 / 100** *(code-based estimate)*

### Positive signals
- Geist fonts with `display: "swap"`
- Hero image uses `next/image` with `priority`, explicit dimensions, `sizes`
- Server Components used for most pages
- `prefers-reduced-motion` respected globally
- Small dependency footprint (no heavy UI libraries beyond Framer Motion)

### Concerns (likely CWV impact)
- **LCP:** Hero is a `"use client"` component; profile image is LCP candidate — `priority` helps, but client boundary adds hydration cost
- **INP:** Framer Motion on header, hero, reveal wrappers, projects filter, skill bars increases main-thread work
- **CLS:** Images have width/height — low CLS risk
- No dynamic imports for motion-heavy sections
- No `preconnect`/`dns-prefetch` for external profiles (GitHub, LinkedIn, HackerRank)
- Portrait photo used as OG image (960×1280) — suboptimal for social previews, not performance-critical but affects engagement

*Note: Actual LCP/CLS/INP were not measured — run PageSpeed Insights after deployment.*

---

## 6. Accessibility Score: **82 / 100**

### Strengths
- Skip link to `#main-content` with visible focus state
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`
- ARIA on navigation (`aria-current`, `aria-expanded`, `aria-label`)
- Form labels, `aria-invalid`, `aria-describedby`, honeypot properly hidden
- Focus-visible styles in `globals.css`
- Decorative icons marked `aria-hidden`
- Star ratings use `role="img"` + `aria-label`

### Issues
- Typing effect exposes only first role to assistive tech; animated text is `aria-hidden`
- Animated counters lack live-region announcements
- Desktop nav hides Education/Certifications/Achievements/Testimonials (mobile-only in “more” menu) — discoverability gap
- Some interactive cards (project cards) rely on heading text only — acceptable but could be richer

---

## 7. Structured Data Score: **55 / 100**

### Present
| Schema | Location | Status |
|---|---|---|
| Person | `layout.tsx` L55–86 | ✅ Implemented |
| Website | — | ❌ Missing |
| Organization | — | ❌ Missing |
| BreadcrumbList | — | ❌ Missing |
| FAQ | — | ❌ Missing |
| SearchAction | — | ❌ Missing |
| CreativeWork / Project | project pages | ❌ Missing |

### Person schema gaps
- `jobTitle` = “Software Developer” (not target variants)
- `knowsAbout` omits React, TypeScript, Next.js, Full Stack
- No `email`, `telephone` (privacy choice — acceptable)
- No `hasOccupation`, `award`, `alumniOf` array (only one school)
- Single global Person schema — project pages lack `about`/`author` linkage

---

## 8. Personal Branding Score: **70 / 100**

Google can identify you as a **.NET-focused Software Developer in Karachi, Pakistan**, with enterprise/mobile experience. It cannot yet confidently map you to all target identity queries.

| Target identity | Site support | Verdict |
|---|---|---|
| Muhammad Zaid Qasim | Title, H1, JSON-LD, meta descriptions | ✅ Strong |
| Muhammad Zaid | Full name in H1; partial first+middle usage | ⚠️ Moderate |
| Zaid Qasim | Header/footer branding “ZaidQasim” | ⚠️ Moderate |
| Muhammad Qasim | Not used as exact phrase | ❌ Missing |
| Zaid | Header abbreviation only | ⚠️ Weak |
| Software Engineer | Uses “Software Developer” instead | ❌ Mismatch |
| Full Stack Developer | Only in typing roles (SSR-empty) | ❌ Weak |
| React Developer | Only “React Native” | ❌ Missing target |
| .NET Developer | Keywords + typing roles + content | ✅ Good |
| Portfolio | Keyword array + eyebrow labels | ⚠️ Moderate |

### Entity disconnect (off-site signals referenced in code)
- GitHub: `Learn-with-ZQ` — handle doesn’t match full name
- LinkedIn: `/in/m-zaid-qasim` — abbreviated slug
- No `rel="me"` links reinforcing identity graph

---

## 9. E-E-A-T Score: **76 / 100**

| Pillar | Score | Evidence |
|---|---|---|
| **Experience** | 85/100 | 3+ years, IoBM deployment, 15+ modules, detailed responsibilities |
| **Expertise** | 82/100 | Skills matrix, certifications, project depth, MS Data Science |
| **Authoritativeness** | 62/100 | HackerRank credentials, hackathon wins; empty testimonials; limited external citations |
| **Trustworthiness** | 75/100 | Privacy policy, real contact info, no tracking; no security headers; Vercel subdomain |

---

## 10. Critical Issues

### C1 — Default domain is Vercel subdomain, not branded domain
- **Severity:** Critical  
- **File:** `src/lib/site.ts` L6  
- **Why it matters:** Personal-name SEO is heavily tied to a stable, branded canonical domain. Subdomains dilute entity authority.  
- **SEO impact:** Weak Knowledge Panel association; split signals if LinkedIn/GitHub point elsewhere.  
- **Recommended fix:** Set `NEXT_PUBLIC_SITE_URL` to a custom domain (e.g. `muhammadzaidqasim.com`) and 301 redirect Vercel URL.

---

### C2 — Target role keywords empty in SSR HTML (TypingEffect)
- **Severity:** Critical  
- **File:** `src/components/common/typing-effect.tsx` L14–15, L48–50; consumed in `hero.tsx` L57  
- **Why it matters:** Initial HTML renders `text=""`. Roles like “Full-Stack Developer”, “.NET Developer” are not in server-rendered body copy.  
- **SEO impact:** Google may under-index role variants; misses “Full Stack Developer”, “.NET Developer” in first paint.  
- **Recommended fix:** Render a static visible role string in SSR HTML; enhance with JS animation progressively.

---

### C3 — Primary profession label mismatch vs target queries
- **Severity:** Critical (for stated goals)  
- **Files:** `src/lib/site.ts` L3, `src/data/profile.ts` L6–7  
- **Why it matters:** Site consistently says “Software Developer”; targets include “Software Engineer”, “Full Stack Developer”, “React Developer”.  
- **SEO impact:** Google entity classification won’t align with target SERP intents.  
- **Recommended fix:** Align primary title/H1/meta with intended primary label; use secondary labels naturally in body copy.

---

### C4 — No security headers configured
- **Severity:** Critical (trust/ranking indirect)  
- **File:** `next.config.ts` (empty); no `middleware.ts`  
- **Why it matters:** Missing HSTS, CSP, X-Frame-Options, X-Content-Type-Options reduces trust signals.  
- **SEO impact:** Indirect — browser security warnings, lower trust for recruiters/clients.  
- **Recommended fix:** Add security headers via `next.config.ts` headers or middleware.

---

## 11. High Priority Issues

### H1 — Structured data severely incomplete
- **Severity:** High  
- **File:** `src/app/layout.tsx` L55–86  
- **Missing:** WebSite, Organization, BreadcrumbList, FAQ, SearchAction, per-project CreativeWork  
- **SEO impact:** Reduced rich-result eligibility; weaker entity graph for personal brand.  
- **Recommended fix:** Add WebSite + ProfilePage linkage; BreadcrumbList on inner pages; Project schema on `/projects/[slug]`.

---

### H2 — OG/Twitter image is portrait profile photo
- **Severity:** High  
- **File:** `src/lib/site.ts` L7; `layout.tsx` L41  
- **Why it matters:** Recommended OG ratio is 1.91:1 (~1200×630). Portrait 960×1280 crops poorly on LinkedIn/Twitter/Google Discover.  
- **SEO impact:** Lower CTR on shared links; weaker brand recall.  
- **Recommended fix:** Create dedicated landscape OG image with name, role, and tech stack.

---

### H3 — Inner-page H1s not optimized for branded search
- **Severity:** High  
- **Files:** `page-header.tsx` L23–24; e.g. `about/page.tsx` L21, `experience/page.tsx` L21  
- **Example:** About H1 = “Engineering with purpose” (no name)  
- **SEO impact:** Missed on-page relevance for “Muhammad Zaid Qasim About/Experience/Projects”.  
- **Recommended fix:** Include name + page intent in H1 or visible subheading near top.

---

### H4 — “React Developer” keyword gap
- **Severity:** High  
- **Files:** `skills.ts`, `profile.ts`, `site.ts` keywords  
- **Why it matters:** “React Native” appears often; “React Developer” / “React” (web) does not. Frontend lists Angular, not React.  
- **SEO impact:** Won’t rank for “Muhammad Zaid React Developer” without content support.  
- **Recommended fix:** Only add if accurate — include React/Next.js in skills and project narrative if applicable.

---

### H5 — `/api/contact` not disallowed in robots
- **Severity:** High  
- **File:** `src/app/robots.ts` L6–9  
- **SEO impact:** Crawl budget waste; possible soft-404 indexing attempts.  
- **Recommended fix:** Add `disallow: /api/` rule.

---

### H6 — Desktop navigation omits 4 indexable pages
- **Severity:** High (UX + internal linking)  
- **File:** `src/data/navigation.ts` L3–18; `header.tsx` L65–91  
- **Pages affected:** `/education`, `/certifications`, `/achievements`, `/testimonials`  
- **SEO impact:** Weaker internal PageRank flow; users may not discover E-E-A-T pages.  
- **Recommended fix:** Add to desktop nav or a visible “More” dropdown.

---

### H7 — Project pages lack enriched metadata
- **Severity:** High  
- **File:** `src/app/projects/[slug]/page.tsx` L30–37  
- **Why it matters:** Only title + description; no canonical override, OG image, or JSON-LD per project.  
- **SEO impact:** Project pages won’t rank for “[Project Name] Muhammad Zaid Qasim” as strongly.  
- **Recommended fix:** Extend `generateMetadata()` and add Project/CreativeWork schema.

---

### H8 — GitHub/LinkedIn handles weaken entity reconciliation
- **Severity:** High (off-page + on-page)  
- **File:** `src/data/social.ts` L6–12  
- **SEO impact:** Google must infer that `Learn-with-ZQ` = Muhammad Zaid Qasim.  
- **Recommended fix:** Align handles where possible; add `sameAs` consistency; link prominently from About page with full name anchor text.

---

## 12. Medium Priority Issues

### M1 — Title template puts name at end
- **File:** `layout.tsx` L25–27  
- **Example:** “About — Muhammad Zaid Qasim” vs “About Muhammad Zaid Qasim | Portfolio”  
- **Impact:** Slightly weaker branded SERP matching.

### M2 — Homepage lacks dedicated metadata export
- **File:** `src/app/page.tsx` — no `metadata` export  
- **Impact:** Cannot tune homepage title/description independently from site default.

### M3 — `meta keywords` tag present
- **File:** `layout.tsx` L30; `site.ts` L9–21  
- **Impact:** Ignored by Google; harmless but dated.

### M4 — Sitemap `lastModified: new Date()` on every build
- **File:** `sitemap.ts` L21, L28  
- **Impact:** May cause unnecessary recrawl signals.

### M5 — Testimonials page indexed but empty
- **File:** `testimonials.ts` L8; `testimonials/page.tsx`  
- **Impact:** Thin content page; weak E-E-A-T until populated.

### M6 — No `not-found.tsx` metadata / noindex
- **File:** `not-found.tsx`  
- **Impact:** 404 pages could occasionally appear in index.

### M7 — Resume PDF not in sitemap
- **File:** `public/Muhammad_Zaid_Qasim_Resume.pdf`  
- **Impact:** Missed opportunity for PDF rich results / document discovery.

### M8 — No hreflang (acceptable for single-locale EN site)
- **File:** `layout.tsx` L95 `lang="en"`  
- **Impact:** None currently; note if expanding to Urdu.

### M9 — Framer Motion increases client JS across most pages
- **Files:** `reveal.tsx`, `hero.tsx`, `header.tsx`, etc.  
- **Impact:** INP/TBT risk on mid-tier mobile devices.

### M10 — `Software Engineer` phrase absent
- **Files:** throughout `profile.ts`, meta descriptions  
- **Impact:** Won’t match “Muhammad Zaid Software Engineer” intent.

---

## 13. Low Priority Issues

### L1 — Footer copyright uses full name ✅ but header shows “ZaidQasim” only
- **File:** `header.tsx` L60–62, `footer.tsx` L18–19

### L2 — No `apple-touch-icon` or PWA manifest
- **File:** `public/favicon.ico` exists; no manifest

### L3 — Project cards use icon placeholders, no screenshots
- **File:** `project-card.tsx` — no visual project evidence for image search

### L4 — `error.tsx` is client-only with no metadata
- **File:** `error.tsx`

### L5 — Color contrast on `text-muted` (#64748b on #fafafa) — likely passes AA for body text but verify gradient text

### L6 — Experience `companyUrl` defined in types but unused
- **File:** `types/index.ts` L55; `experience.ts`

### L7 — No analytics (privacy-positive, but limits SEO performance monitoring)

### L8 — README mentions SEO-ready but no Google Search Console setup documented

---

## 14. Positive Findings

1. **Consistent full-name usage** in meta descriptions across 10+ routes  
2. **Person JSON-LD** with `sameAs`, `knowsAbout`, `alumniOf`, location  
3. **Complete sitemap** with all routes including privacy and 9 projects  
4. **Strong E-E-A-T content depth** — experience responsibilities, 9 detailed projects, certifications, achievements  
5. **Semantic HTML foundation** — landmarks, lists, blockquotes on testimonials  
6. **Accessibility basics done well** — skip link, focus states, form a11y, reduced motion  
7. **Image SEO on profile photo** — descriptive alt, dimensions, lazy/priority strategy  
8. **Static generation** for project slugs via `generateStaticParams()`  
9. **Privacy policy** builds trust; no tracking bloat  
10. **Contact form security** — honeypot, validation, sanitization, timeout  
11. **Internal linking structure** — footer groups, homepage CTAs, project next-navigation  
12. **Resume downloadable** with SEO-friendly filename `Muhammad_Zaid_Qasim_Resume.pdf`  
13. **Location consistently stated** — Karachi, Pakistan across profile, JSON-LD, contact  
14. **No keyword stuffing** — natural, professional tone throughout  

---

## 15. Keyword Coverage Analysis

### Target keyword presence

| Keyword | Present? | Where |
|---|---|---|
| Muhammad Zaid Qasim | ✅ | Title, H1, meta, JSON-LD, footer |
| Muhammad Zaid | ✅ | Full name; not isolated often |
| Zaid Qasim | ✅ | Header/footer branding |
| Muhammad Qasim | ❌ | Not found as exact phrase |
| Zaid | ⚠️ | Header abbreviation, firstName in data |
| Muhammad Zaid Developer | ❌ | Not exact |
| Muhammad Zaid Portfolio | ❌ | “Portfolio” alone, not combined |
| Muhammad Zaid Software Engineer | ❌ | “Software Developer” used |
| Muhammad Zaid Full Stack Developer | ❌ | Only in client typing animation |
| Muhammad Zaid React Developer | ❌ | Missing |
| Muhammad Zaid .NET Developer | ⚠️ | “.NET Developer” in typing roles (SSR-empty) |

### Missing keywords (add naturally later)
- Muhammad Qasim  
- Software Engineer (if accurate)  
- Full Stack Developer (visible static text)  
- React Developer (if accurate)  
- Muhammad Zaid Portfolio  
- Next.js Developer (site itself is built with Next.js — untapped proof point)

### Overused / dominant terms
- “Software Developer” (primary label everywhere)  
- “enterprise” (high frequency across projects/services)  
- “E-Creatorz” / “IoBM” (appropriate but repetitive)

### Opportunities
- Homepage visible subtitle with static role string  
- About page opening paragraph naming all target role variants once  
- Dedicated “Tech Stack” mention of Next.js/React/TypeScript used to build this site  
- Project pages naming your contribution with “Muhammad Zaid Qasim developed…”  
- Resume page or `/resume` route for document indexation  

---

## 16. Competition Estimate

| Query | Competition | Ranking outlook |
|---|---|---|
| **Muhammad Zaid Qasim** | Low (unique identity) | **High** — should reach #1 with custom domain, Search Console, LinkedIn/GitHub alignment, and a few quality backlinks |
| **Muhammad Zaid** | Very high (common names globally) | **Low–Medium** — needs sustained authority + geographic qualifiers |
| **Zaid Qasim** | Medium | **Medium** — achievable in Pakistan/Karachi context |
| **Zaid** | Extremely high | **Very low** — unrealistic as primary goal |
| **Muhammad Zaid Software Engineer** | Medium | **Medium** — requires explicit on-page + LinkedIn headline alignment |

---

## 17. Route-by-Route Analysis

| Route | Title (resolved) | H1 | Metadata | Schema | Notes |
|---|---|---|---|---|---|
| `/` | Muhammad Zaid Qasim — Software Developer | Hi, I'm **Muhammad Zaid Qasim** | Root inherit | Person (global) | Typing roles SSR-empty |
| `/about` | About — Muhammad Zaid Qasim | Engineering with purpose | ✅ | Person only | Name in meta desc, not H1 |
| `/experience` | Experience — … | Experience | ✅ | None | Strong content |
| `/projects` | Projects — … | Projects | ✅ | None | Client filter UI |
| `/projects/[slug]` ×9 | {name} — … | {project name} | ✅ partial | None | Good H1; no project schema |
| `/skills` | Skills — … | Skills | ✅ | None | Deep keyword content |
| `/services` | Services — … | Services | ✅ | None | Good commercial intent |
| `/education` | Education — … | Education | ✅ | None | Orphan from desktop nav |
| `/certifications` | Certifications — … | Certifications | ✅ | None | External credential links ✅ |
| `/achievements` | Achievements — … | Achievements | ✅ | None | Orphan from desktop nav |
| `/testimonials` | Testimonials — … | Testimonials | ✅ | None | **Thin/empty content** |
| `/contact` | Contact — … | Contact | ✅ | None | NAP present |
| `/privacy` | Privacy Policy — … | Privacy Policy | ✅ | None | Trust signal ✅ |
| `/api/contact` | — | — | — | — | Should be noindex/disallow |

---

## 18. File-by-File Analysis

### Configuration

| File | SEO relevance | Findings |
|---|---|---|
| `package.json` | Build/runtime | Next 15.5, React 19 — modern stack ✅ |
| `next.config.ts` | Critical | Empty — no headers, redirects, images config ❌ |
| `middleware.ts` | — | **Does not exist** ❌ |
| `tsconfig.json` | Neutral | Standard |
| `.env.example` | SEO URL | Documents `NEXT_PUBLIC_SITE_URL` ✅ |
| `eslint.config.mjs` | Neutral | — |
| `postcss.config.mjs` | Neutral | — |

---

### `src/lib/`

| File | Lines | Findings |
|---|---|---|
| `site.ts` | L1–22 | Central SEO config; default Vercel URL; title “Software Developer”; keywords missing several targets |
| `utils.ts` | — | Neutral |
| `format.ts` | — | Neutral |

---

### `src/app/`

| File | Key SEO elements | Issues |
|---|---|---|
| `layout.tsx` | Metadata, Person JSON-LD, skip link, fonts | Missing WebSite schema; OG image dimensions suboptimal |
| `page.tsx` | Homepage composition | No page metadata; hero client-rendered |
| `globals.css` | Focus styles, reduced motion | ✅ |
| `robots.ts` | Allow all | Should disallow `/api/` |
| `sitemap.ts` | 21 URLs | Dynamic lastModified |
| `about/page.tsx` | Metadata ✅, Image ✅, H2/H3 hierarchy ✅ | H1 not branded |
| `experience/page.tsx` | Rich content, semantic `<ol>` ✅ | H1 generic |
| `projects/page.tsx` | Metadata ✅ | Explorer is client component |
| `projects/[slug]/page.tsx` | SSG ✅, H1 ✅, `<aside>` ✅ | Minimal metadata; sidebar H2 hierarchy |
| `skills/page.tsx` | Metadata ✅, H2 categories | No FAQ schema opportunity |
| `services/page.tsx` | Metadata ✅ | Good commercial keywords |
| `education/page.tsx` | Metadata ✅ | Not in desktop nav |
| `certifications/page.tsx` | External links ✅ | Could add Credential schema |
| `achievements/page.tsx` | Metadata ✅ | Could add Event/Award schema |
| `testimonials/page.tsx` | Metadata ✅ | Empty = thin content |
| `contact/page.tsx` | NAP + social ✅ | Good entity signals |
| `privacy/page.tsx` | Trust ✅ | Good |
| `not-found.tsx` | H1 ✅ | No metadata/noindex |
| `error.tsx` | Client error UI | No metadata |
| `loading.tsx` | `role="status"` ✅ | Good a11y |
| `api/contact/route.ts` | POST handler | Should not be indexed |

---

### `src/data/` (content = SEO fuel)

| File | SEO value | Notes |
|---|---|---|
| `profile.ts` | **High** | Name, bios, roles, journey — primary entity source |
| `experience.ts` | **High** | Detailed responsibilities — strong E-E-A-T |
| `projects.ts` | **High** | 9 projects with rich descriptions |
| `skills.ts` | **High** | Missing React (web); has React Native |
| `services.ts` | Medium-High | Good service keywords |
| `education.ts` | Medium | NED + PAF-KIET |
| `certifications.ts` | Medium | HackerRank links |
| `achievements.ts` | Medium | Competition wins |
| `social.ts` | **High** | Entity links — handle mismatch issue |
| `contact.ts` | **High** | NAP consistency |
| `navigation.ts` | **High** | Desktop nav gap |
| `testimonials.ts` | Low (empty) | Hurts authoritativeness |

---

### `src/components/` (rendering & a11y)

| File | SEO/a11y impact |
|---|---|
| `layout/header.tsx` | Client nav; aria labels ✅; brand abbreviation |
| `layout/footer.tsx` | Strong internal links + NAP ✅ |
| `home/hero.tsx` | **Critical** — H1 with name ✅; typing roles SSR issue |
| `home/stats.tsx` | Stats content ✅ |
| `home/tech-marquee.tsx` | Tech keywords ✅; `aria-label` ✅ |
| `home/featured-projects.tsx` | Internal links ✅ |
| `home/skills-preview.tsx` | Keyword-rich badges ✅ |
| `home/journey.tsx` | Career narrative ✅ |
| `home/cta.tsx` | Internal links ✅ |
| `common/page-header.tsx` | H1 renderer for inner pages |
| `common/typing-effect.tsx` | **Critical SSR SEO gap** |
| `common/animated-counter.tsx` | Client-only animation |
| `projects/projects-explorer.tsx` | Client search — content still in DOM ✅ |
| `projects/project-card.tsx` | Internal links ✅; no images |
| `contact/contact-form.tsx` | Strong form a11y ✅ |
| `ui/section.tsx` | Semantic `<section>` ✅ |
| `ui/social-icons.tsx` | `aria-label` per link ✅ |
| `skills/skill-bar.tsx` | `progressbar` role ✅ |
| `motion/reveal.tsx` | Client wrapper — adds JS weight |

---

### `public/`

| Asset | Status |
|---|---|
| `favicon.ico` | ✅ Present (15 KB) |
| `images/profile.jpg` | ✅ Present (162 KB) — used for OG |
| `Muhammad_Zaid_Qasim_Resume.pdf` | ✅ SEO-friendly filename |
| OG image (landscape) | ❌ Missing |
| `manifest.json` | ❌ Missing |

---

## 19. Security Audit (SEO-adjacent)

| Check | Status |
|---|---|
| HTTPS | ✅ Assumed on Vercel |
| Security headers (CSP, HSTS, X-Frame-Options) | ❌ Not configured |
| XSS protection headers | ❌ Not configured |
| Mixed content | ✅ No hardcoded HTTP resources found |
| External links | ✅ `rel="noopener noreferrer"` |
| Contact form spam protection | ✅ Honeypot + validation |
| API route exposure | ⚠️ Crawlable, no rate-limit in code |

---

## 20. Prioritized Implementation Roadmap (for later)

When you’re ready to implement (not part of this audit):

1. **Custom domain + Search Console + Bing Webmaster**  
2. **Fix SSR role visibility** (static text + animation enhancement)  
3. **Align primary title/H1/schema with target profession labels**  
4. **Add WebSite + BreadcrumbList + Project schema**  
5. **Create landscape OG image; add per-project metadata**  
6. **Configure security headers; disallow `/api/` in robots**  
7. **Expand desktop nav; populate testimonials**  
8. **Align GitHub/LinkedIn handles and cross-link with full-name anchors**  
9. **Run Lighthouse + PageSpeed on production for measured CWV baseline**  

---

This audit is based entirely on repository source code. Production HTML output, live headers, and Core Web Vitals should be validated after deployment to confirm canonical URLs, metadata merging, and performance scores.
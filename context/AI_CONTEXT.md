# AI Context Summary

## Project purpose
- Personal portfolio website for Muhammad Zaid Qasim
- Showcases experience, projects, skills, services, education, certifications, achievements, and testimonials
- Includes a contact form that POSTs to a webhook-backed Google Apps Script

## Main technologies
- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- next-themes

## Framework / language
- Framework: Next.js 15
- Language: TypeScript
- Rendering model: server-first App Router with client components only where interactivity is required

## Styling system
- Tailwind CSS 4 via `@import "tailwindcss"`
- Global theme tokens in `src/app/globals.css`
- Light/dark/system theme via `next-themes`
- Custom utility classes such as `bg-grid`, `text-gradient`, `card-surface`

## Build tool / package manager
- Build: Next.js production build
- Package manager: npm
- Linting: ESLint (`eslint-config-next`)
- Formatting: Prettier

## Deployment
- Default target: Vercel
- Site URL defaults to `https://muhammad-zaid-qasim.vercel.app`
- Environment variables are expected for production URL and contact form forwarding

## Folder organization
- `src/app/`: route pages and app-wide layout/metadata
- `src/components/`: reusable UI, layout, home sections, motion, projects, SEO, contact
- `src/data/`: all portfolio content, navigation, profile, projects, skills, social, contact
- `src/lib/`: SEO/metadata/schema/site helpers and shared formatting utilities
- `src/types/`: shared TypeScript interfaces
- `public/`: static assets such as images and resume PDF

## Important reusable components
- `Header`: responsive site navigation and download-resume CTA
- `Footer`: footer navigation and address/links block
- `ThemeToggle`: dark/light/system switch
- `PageHeader`: reusable page intro header
- `Reveal`: animation wrapper for scroll reveal effects
- `ContactForm`: client-side contact form with honeypot and API submission
- `ProjectCard` / `ProjectsExplorer`: project listing UI
- UI primitives: `Container`, `Section`, `Badge`, `Button`, `Card`

## Coding conventions
- Content is mostly static and centralized in `src/data/`
- Route pages are thin orchestration layers; components render fields from data files
- Use server components by default; only add client components where needed
- Use path aliases such as `@/...` for imports
- SEO metadata is centralized through `src/lib/metadata.ts` and `src/lib/seo.ts`

## Important design decisions
- All portfolio content is data-driven rather than CMS-backed
- The site avoids authentication and database dependencies
- The contact flow is webhook-based, not backed by a local server or database
- Dynamic project detail pages use `generateStaticParams()` for static generation

## Known limitations
- No analytics pipeline
- No persistent backend or database
- Contact form depends on a configured `CONTACT_WEBHOOK_URL`
- SEO/site domain is currently defaulted to the Vercel subdomain unless overridden

## Overall project flow
1. Request hits a route under `src/app/`
2. The route page imports data from `src/data/` and renders section components
3. Shared layout (`layout.tsx`) injects sitewide metadata, header, footer, and JSON-LD
4. The contact page uses `ContactForm`, which POSTs to `/api/contact`
5. `/api/contact` validates input, blocks obvious spam, and forwards the payload to the configured webhook

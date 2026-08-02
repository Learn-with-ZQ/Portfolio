# AI Context Summary

## Project purpose
- Personal portfolio website for Muhammad Zaid Qasim
- Showcases experience, projects, skills, services, education, certifications, achievements, and testimonials
- Includes both a contact form and an auth-protected testimonial submission flow

## Main technologies
- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- next-themes
- next-auth with Google OAuth

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
- Requires environment variables for site URL, contact webhook, Google OAuth, NextAuth, and testimonial webhook

## Folder organization
- `src/app/`: route pages, app-wide layout, metadata routes, and API handlers
- `src/components/`: reusable UI, layout, home sections, motion, projects, testimonials, SEO, and contact
- `src/data/`: portfolio content, navigation, profile, projects, skills, social, contact, and testimonials
- `src/lib/`: auth, SEO, metadata, schema, testimonial loading, and shared helpers
- `src/types/`: shared TypeScript interfaces
- `public/`: static assets such as images and resume PDF

## Important reusable components
- `Header`: responsive site navigation and resume download CTA
- `Footer`: footer navigation and contact information
- `ThemeToggle`: light/dark/system switch
- `PageHeader`: reusable page intro header
- `Reveal`: animation wrapper for scroll-reveal effects
- `ContactForm`: client-side contact form with honeypot and webhook submission
- `TestimonialForm` / `TestimonialCard`: Google-authenticated testimonial submission and display
- `ProjectCard` / `ProjectsExplorer`: project listing UI
- UI primitives: `Container`, `Section`, `Badge`, `Button`, `Card`

## Coding conventions
- Content is mostly static and centralized in `src/data/`
- Route pages are thin orchestration layers; components render fields from data files
- Server components are the default; client components are used only where interactivity is needed
- Use path aliases such as `@/...` for imports
- SEO metadata is centralized through `src/lib/metadata.ts` and `src/lib/seo.ts`

## Important design decisions
- Portfolio content is data-driven rather than CMS-backed
- The site avoids a database and keeps business logic lightweight
- Contact and testimonial flows are webhook-based rather than backed by a local server or database
- Testimonials are rendered from a Google Sheet-backed flow and can fall back to the manual list in `src/data/testimonials.ts`
- Dynamic project detail pages use `generateStaticParams()` for static generation

## Known limitations
- No analytics pipeline
- No persistent application database
- Contact form depends on `CONTACT_WEBHOOK_URL`
- Testimonial submission depends on `TESTIMONIAL_WEBHOOK_URL` and Google OAuth credentials
- SEO/site domain is defaulted to the Vercel subdomain unless overridden

## Overall project flow
1. A request enters a route under `src/app/`
2. The page imports content from `src/data/` and renders section components
3. The shared layout injects sitewide metadata, header, footer, and JSON-LD
4. The contact page uses `ContactForm`, which POSTs to `/api/contact`
5. The testimonials page uses `TestimonialForm`, which signs in through Google and POSTs to `/api/testimonials`
6. The testimonials API validates the payload, blocks obvious spam, and forwards it to the configured webhook

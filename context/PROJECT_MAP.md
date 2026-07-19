# Project Map

## Top-level
- `src/`: application source code
- `public/`: static assets served directly by Next.js
- `docs/`: project-specific setup and deployment notes
- `context/`: AI-focused condensed project context

## `src/`
- `app/`: App Router pages, layout, global styles, metadata routes, and the contact API
- `components/`: UI, layout, home sections, motion, project cards, SEO helpers, and reusable primitive components
- `data/`: source-of-truth content for profile, projects, skills, services, navigation, testimonials, and contact details
- `lib/`: formatting, SEO, metadata, schema, and shared site helpers
- `types/`: shared TypeScript interfaces used across the app

## `src/app/`
- `about/`, `experience/`, `projects/`, `skills/`, `services/`, `contact/`, `education/`, `certifications/`, `achievements/`, `testimonials/`, `privacy/`: route folders for portfolio pages
- `api/contact/`: single server route for validating and forwarding contact form submissions
- `layout.tsx`: root layout, fonts, theme provider, header, footer, and JSON-LD bootstrap
- `globals.css`: Tailwind import, theme tokens, custom classes, and global behavior
- `not-found.tsx`: custom 404 page
- `error.tsx`: route error boundary UI
- `robots.ts` and `sitemap.ts`: SEO route generation

## `src/components/`
- `common/`: shared page/header/animation helpers
- `home/`: homepage sections such as hero, stats, marquee, featured projects, skills, journey, CTA
- `layout/`: header, footer, and theme toggle
- `projects/`: project listing and detail card components
- `contact/`: contact form
- `motion/`: reveal/animation wrapper
- `seo/`: JSON-LD renderer
- `skills/`: skill-specific UI widgets
- `ui/`: base reusable primitives like buttons, cards, container, section, badges, social icons
- `providers/`: theme provider

## `public/`
- `images/`: static images, including the profile image
- `Muhammad_Zaid_Qasim_Resume.pdf`: downloadable resume
- `favicon.ico`: app favicon

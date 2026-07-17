# Muhammad Zaid Qasim — Portfolio

A modern, premium developer portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Highlights

- **No database, no CMS** — all content lives in typed data files under `src/data/`. The only server code is a single API route that forwards contact-form submissions to a Google Sheet (see [docs/CONTACT_FORM_SETUP.md](docs/CONTACT_FORM_SETUP.md)).
- **App Router** with Server Components by default; Client Components only where interactivity requires them.
- **Dark / light / system theme** with persistence (`next-themes`).
- **Framer Motion** animations — scroll reveals, staggered grids, typing effect, animated counters — all respecting `prefers-reduced-motion`.
- **SEO-ready** — per-page metadata, Open Graph / Twitter cards, JSON-LD (`Person`), generated `sitemap.xml` and `robots.txt`, canonical URLs.
- **Accessible** — skip link, semantic landmarks, ARIA labels, keyboard-friendly navigation, visible focus states.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
```

## Editing content

All portfolio content is hardcoded in `src/data/`:

| File | Contents |
|---|---|
| `profile.ts` | Name, role, bio, tagline, stats, journey timeline |
| `experience.ts` | Work experience and responsibilities |
| `projects.ts` | Projects (set `featured: true` to pin on the home page) |
| `skills.ts` | Skill categories with proficiency levels |
| `education.ts` | Degrees and coursework |
| `certifications.ts` | Certifications and badges |
| `achievements.ts` | Competition wins and leadership roles |
| `services.ts` | Services offered |
| `testimonials.ts` | Testimonials (empty array renders a graceful empty state) |
| `social.ts` / `contact.ts` | Social links and contact details |
| `navigation.ts` | Header and footer navigation |

Site-wide SEO settings (URL, title, description) live in `src/lib/site.ts`.
Set `NEXT_PUBLIC_SITE_URL` in production to your real domain.

## Contact form

The contact form POSTs to `/api/contact`, which validates the input (plus a
honeypot spam check) and forwards it to a Google Apps Script that appends a row
to a Google Sheet — columns: Timestamp, Name, Email, Phone, Subject, Message.
Follow [docs/CONTACT_FORM_SETUP.md](docs/CONTACT_FORM_SETUP.md) to create the
sheet and set `CONTACT_WEBHOOK_URL` (see `.env.example`). No Google API key or
app password is required.

## Structure

```
src/
  app/          # App Router pages (each folder = a route)
  components/   # ui / layout / home / projects / skills / contact / motion / common
  data/         # ← all portfolio content (edit here)
  lib/          # site config + utilities
  types/        # shared TypeScript interfaces
public/         # profile photo, resume PDF, favicon
```

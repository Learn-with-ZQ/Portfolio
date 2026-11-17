# Muhammad Zaid Qasim — Portfolio

A modern, premium developer portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Highlights

- **Content from an API, with a safety net** — when `PORTFOLIO_API_URL` is set, content comes from a separate ASP.NET Core + PostgreSQL API (its own project, not in this repository), cached for 10 minutes so pages stay static. Without it, or whenever the API can't be reached, the site uses the typed data files under `src/data/`. The site's own server code is a few API routes: the contact form and testimonials (both saved through the same API: a site key for messages, the visitor's Google sign-in for testimonials), the chat assistant, and Google sign-in.
- **App Router** with Server Components by default; Client Components only where interactivity requires them.
- **Dark / light / system theme** with persistence (`next-themes`).
- **Framer Motion** animations — scroll reveals, staggered grids, typing effect, animated counters — all respecting `prefers-reduced-motion`.
- **SEO-ready** — per-page metadata and canonical URLs, Open Graph / Twitter cards, JSON-LD (`Person` and `WebSite`, plus `BreadcrumbList` and `CreativeWork` on project pages), generated `sitemap.xml` and `robots.txt`.
- **Accessible** — skip link, semantic landmarks, ARIA labels, keyboard-friendly navigation, visible focus states.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values — see below
npm run dev                  # http://localhost:3000
```

| Command         | What it does               |
| --------------- | -------------------------- |
| `npm run dev`   | Dev server on port 3000    |
| `npm run build` | Production build           |
| `npm start`     | Serve the production build |
| `npm run lint`  | ESLint                     |

Two things to know:

- Keep the dev server on **port 3000** — it's the registered Google OAuth callback.
- Stop `npm run dev` before running `npm run build`. Both write to `.next/`, and building while the dev server is running breaks it (`Cannot find module './NNN.js'`). If that happens, delete `.next/` and restart the dev server.

## Environment variables

Copy `.env.example` to `.env.local` for local development, and set the same variables on your host.

| Variable                                                                    | Used for                                                                    |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                                      | Canonical URLs, Open Graph, sitemap. Set to your real domain in production |
| `PORTFOLIO_API_SITE_KEY`                                                    | Contact form — the key the site sends the API (`X-Site-Key`)                |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`                                  | Google sign-in                                                              |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL`                                           | Auth.js sessions and callbacks                                              |
| `NEXT_PUBLIC_TWITTER_HANDLE`                                                | Optional — Twitter card attribution                                         |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_VERIFICATION` | Optional — search console verification                                      |
| `PORTFOLIO_API_URL`                                                         | Base URL of the API. Content falls back to `src/data/` without it; the contact form and testimonials need it |

## Editing content

With `PORTFOLIO_API_URL` set, the content API's database is the source: edit content
through the API, and changes appear on the site within 10 minutes, with no
redeploy. Pages read it through `src/lib/content.ts`, which falls back to the files
in `src/data/` if the API is down, so keep them roughly current. Without the API,
those files are the content:

| File                       | Contents                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `profile.ts`               | Name, role, bio, tagline, highlights, stats, journey timeline, mission and vision         |
| `experience.ts`            | Work experience and responsibilities                                                      |
| `projects.ts`              | Projects (set `featured: true` to pin on the home page)                                   |
| `skills.ts`                | Skill categories with proficiency levels                                                  |
| `education.ts`             | Degrees and coursework                                                                    |
| `certifications.ts`        | Certifications and badges                                                                 |
| `achievements.ts`          | Competition wins and leadership roles                                                     |
| `services.ts`              | Services offered                                                                          |
| `testimonials.ts`          | Fallback testimonials, shown only when the API can't be reached (empty by default)       |
| `social.ts` / `contact.ts` | Social links and contact details                                                          |
| `navigation.ts`            | Header and footer navigation                                                              |

Site-wide SEO settings (site URL, default title and description, keywords, social profiles) live in `src/lib/seo.ts`.

## Contact form

The contact form POSTs to `/api/contact`, which validates the input (plus a
honeypot spam check) and saves it through the API's `POST /api/messages`.
Visitors don't sign in; the site's server sends `PORTFOLIO_API_SITE_KEY` in
the `X-Site-Key` header, and the API refuses requests without it, so nobody
can post to the API directly. Messages are read with SQL on the API's
database; there is no admin screen.

## Testimonials and Google sign-in

Testimonials are written by visitors signed in with Google, one per Google
account, and the author can come back to edit theirs.

- Sign-in keeps the visitor's **Google ID token** in the encrypted Auth.js
  cookie (never in browser JavaScript). `/api/testimonials` sends it to the
  API's `PUT /api/testimonials/mine` as the bearer token.
- The API verifies it with Google and takes the name, email and photo from
  it. The browser never supplies identity fields.
- The form takes a phone number, subject, testimonial, rating, and an
  optional reference letter (PDF, DOC or DOCX, up to 4 MB, because Vercel
  refuses request bodies over 4.5 MB). The API stores the letter in Google
  Drive and the link in the database.
- Google ID tokens last an hour, so someone who returns later is asked to sign
  in again (one click) before they can see or edit their testimonial.

Setup: create Google OAuth credentials with
`http://localhost:3000/api/auth/callback/google` plus your production callback
URL, and set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET` and
`NEXTAUTH_URL`. The API must know the same client id.

### Publishing a testimonial

Every save, including an edit, puts the testimonial in review (`Pending`) and
off the site. It is approved or rejected with a SQL call on the API's
database. Approved testimonials appear within 10 minutes (the list is cached),
without a redeploy.

Only public fields are shown (name, photo, subject, message, rating, date,
reference link), never email, phone or Google ID. If the API can't be
reached, the site falls back to `src/data/testimonials.ts`.

## Structure

```
src/
  app/          # App Router pages and API routes (each folder = a route)
  components/   # ui / layout / common / motion / home / projects / skills /
                # testimonials / contact / seo / providers
  data/         # ← all portfolio content (edit here)
  lib/          # SEO config, metadata, JSON-LD, auth, testimonials loader, utilities
  types/        # shared TypeScript interfaces
public/         # profile photo, resume PDF
```

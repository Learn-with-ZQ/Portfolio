# Muhammad Zaid Qasim — Portfolio

A modern, premium developer portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Highlights

- **No database, no CMS** — all content lives in typed data files under `src/data/`. The only server code is three API routes: the contact form and testimonial submissions (both forwarded to Google Sheets through Apps Script), and Google sign-in.
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
| `CONTACT_WEBHOOK_URL`                                                       | Contact form                                                                |
| `TESTIMONIAL_WEBHOOK_URL`                                                   | Testimonial submissions and the live testimonials list                     |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`                                  | Google sign-in                                                              |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL`                                           | Auth.js sessions and callbacks                                              |
| `NEXT_PUBLIC_TWITTER_HANDLE`                                                | Optional — Twitter card attribution                                         |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_VERIFICATION` | Optional — search console verification                                      |

## Editing content

All portfolio content is hardcoded in `src/data/`:

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
| `testimonials.ts`          | Fallback testimonials, shown only when the Google Sheet can't be read (empty by default) |
| `social.ts` / `contact.ts` | Social links and contact details                                                          |
| `navigation.ts`            | Header and footer navigation                                                              |

Site-wide SEO settings (site URL, default title and description, keywords, social profiles) live in `src/lib/seo.ts`.

## Contact form

The contact form POSTs to `/api/contact`, which validates the input (plus a
honeypot spam check) and forwards it to a Google Apps Script web app that
appends a row to a Google Sheet — columns: Timestamp, Name, Email, Phone,
Subject, Message. No Google API key or app password is required.

To set it up, deploy an Apps Script on the sheet as a web app (execute as
yourself, access: anyone) and set `CONTACT_WEBHOOK_URL` to its URL. The script
receives JSON — `name`, `email`, `phone`, `subject`, `message`, `submittedAt` —
and must reply with `{ "ok": true }`; the API treats any other response as a
failure.

## Testimonials and Google sign-in

Testimonials can only be submitted by users signed in with Google. The browser
never supplies trusted identity fields: `/api/testimonials` reads them from the
server session, validates the form and the optional reference document (PDF,
DOC or DOCX, up to 5 MB), then forwards the submission to
`TESTIMONIAL_WEBHOOK_URL`.

1. Create Google OAuth credentials and add `http://localhost:3000/api/auth/callback/google` plus your production callback URL.
2. Deploy a **separate** Apps Script web app on the testimonials sheet — not the contact one — with two functions:
   - `doPost` receives JSON (`googleUserId`, `name`, `email`, `phone`, `subject`, `message`, `rating`, `provider`, `submittedAt`, and — when a document is attached — `fileName`, `fileType`, `fileBase64`). It saves any document to Google Drive, appends the row with **Approval Status** `Pending`, and replies `{ "ok": true }`.
   - `doGet` returns the approved rows as a JSON array of `{ id, name, subject, message, rating, createdAt, referenceDocumentUrl }` — public fields only.
3. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and `TESTIMONIAL_WEBHOOK_URL` (the web app's URL — the site uses it for both submitting and reading).

### Publishing a testimonial

Every submission lands in the sheet with **Approval Status** set to `Pending`.
To publish it, change that cell to `Approved`. The testimonials page reads the
sheet on every request, so it shows up without a redeploy. To hide one, change
the status back or delete the row.

Only approved rows are shown, and only their public fields (name, subject,
message, rating, date, reference link) — never email, phone, or Google ID. If
the sheet can't be reached, the site falls back to `src/data/testimonials.ts`.

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

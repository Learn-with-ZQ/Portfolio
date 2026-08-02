# Route Map

## Core site pages
- `/`: home page
  - Composes hero, stats, marquee, featured projects, skills preview, journey, and CTA sections
- `/about`: profile summary, mission, vision, highlights, and timeline
- `/experience`: professional history and deployment context
- `/projects`: project explorer listing all projects
- `/projects/[slug]`: dynamic project detail page
- `/skills`: technical skill map with proficiency levels
- `/services`: services offered
- `/education`: education timeline and credentials
- `/certifications`: certifications and badges
- `/achievements`: awards and wins
- `/testimonials`: testimonials section with Google sign-in and testimonial submission form
- `/testimonials/[id]`: dynamic testimonial detail page
- `/contact`: contact form and contact details
- `/privacy`: privacy policy page

## Navigation behavior
- Main nav is defined in `src/data/navigation.ts`
- Header and footer both use the same navigation data source
- Mobile navigation is handled by the header component and closes on route change

## Internal links
- Primary internal CTA destinations are `/projects`, `/skills`, `/contact`, `/about`, and `/testimonials`
- Project detail pages link back to `/projects`
- Testimonial cards link to `/testimonials/[id]`
- Resume download uses `profile.resumeUrl` from data

## Dynamic routes
- `src/app/projects/[slug]/page.tsx` renders a project detail page
- `src/app/testimonials/[id]/page.tsx` renders a testimonial detail page
- `generateStaticParams()` prebuilds all known project slugs from `src/data/projects.ts`

## 404 / error handling
- `src/app/not-found.tsx` provides a custom 404 experience
- `src/app/error.tsx` provides a route-level error UI
- `src/app/loading.tsx` handles the loading state shell

## API routes
- `/api/contact`: validates payloads and forwards them to `CONTACT_WEBHOOK_URL`
- `/api/testimonials`: requires a Google-authenticated session and forwards verified testimonials to `TESTIMONIAL_WEBHOOK_URL`
- `/api/auth/[...nextauth]`: NextAuth endpoint for Google sign-in and session handling

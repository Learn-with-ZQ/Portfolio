# Deployment Notes

## Build command
- `npm run build`

## Output folder
- Next.js production output is generated in the framework’s standard build directory

## Hosting platform
- Intended deployment target: Vercel
- The default production URL is set in `src/lib/seo.ts`

## Environment variables
- `NEXT_PUBLIC_SITE_URL`: production site origin
- `CONTACT_WEBHOOK_URL`: webhook endpoint for the contact form
- Optional SEO verification env vars may be used:
  - `GOOGLE_SITE_VERIFICATION`
  - `YANDEX_VERIFICATION`
  - `BING_SITE_VERIFICATION`

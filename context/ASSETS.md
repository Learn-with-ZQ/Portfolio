# Assets Summary

## Images
- `public/images/profile.jpg`: primary site/profile image used in SEO and layout context
- Other static asset files are served directly from `public/`

## Resume / documents
- `public/Muhammad_Zaid_Qasim_Resume.pdf`: downloadable resume asset

## Fonts
- Fonts are loaded from `next/font/google` via `Geist` and `Geist Mono`

## Static assets organization
- `public/images/`: image assets
- `public/`: top-level static files such as favicon and resume PDF

## Optimization strategy
- Use Next.js static asset handling for public files
- The site relies on the framework’s default image and asset optimization behavior
- No custom image pipeline or CDN configuration is present in the repo

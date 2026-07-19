# Styling Summary

## CSS system
- Tailwind CSS 4 is the main styling system
- `src/app/globals.css` bootstraps Tailwind and defines theme tokens
- Project-specific classes are added through CSS variables and small utility helpers

## Tailwind usage
- Utility classes are used extensively in components and route pages
- Custom theme values are exposed through `@theme inline`
- `tailwind-merge` and `clsx` are used for conditional class composition

## Global styles
- Global reset is effectively handled through Tailwind and app-level body styling
- Shared utilities include:
  - `bg-grid`
  - `text-gradient`
  - `bg-gradient-brand`
  - `glow-primary`
  - `card-surface`

## Theme
- Theme is managed by `next-themes`
- The site supports light, dark, and system theme mode
- Dark-mode colors are defined in `:root` and `.dark` token blocks

## Responsive strategy
- Mobile-first layouts with section and container wrappers
- `sm`, `md`, `lg` breakpoints are used for stacking, resizing, and navigation changes
- Header uses a collapsed mobile drawer at smaller widths

## Animations
- Framer Motion powers scroll reveal and staggered section animation
- Marquee animation is defined in the theme block for `TechMarquee`
- Motion is reduced automatically when the system prefers reduced motion

## Fonts
- `Geist` and `Geist Mono` are loaded from `next/font/google`
- Fonts are exposed as CSS custom variables for Tailwind usage

## Icons
- `lucide-react` is the main icon set
- `social-icons.tsx` defines custom social brand icons where needed

## Color palette
- High-level palette is centered on violet/indigo primary and cyan accent
- Theme variables map into semantic color tokens such as `background`, `foreground`, `muted`, `card`, `primary`, and `accent`

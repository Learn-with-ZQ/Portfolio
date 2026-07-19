# Reusable Components

## Layout and shell
- `Header`
  - Purpose: Responsive top navigation with active state, mobile drawer, and resume download CTA
  - Props: none
  - Dependencies: `next/link`, `next/navigation`, `framer-motion`, `lucide-react`, `mainNav`, `moreNav`, `profile`, `ThemeToggle`, `cn`
  - Used by: root layout and all pages

- `Footer`
  - Purpose: Footer navigation and contact/footer informational layout
  - Props: none
  - Dependencies: `footerNav`, `profile`, `Container`
  - Used by: root layout and all pages

- `ThemeToggle`
  - Purpose: Switches between light, dark, and system themes
  - Props: optional `className`
  - Dependencies: `next-themes`, `lucide-react`
  - Used by: header

## Page structure
- `PageHeader`
  - Purpose: Reusable section intro for content pages
  - Props: `eyebrow`, `title`, `description?`
  - Dependencies: `Container`, `Reveal`
  - Used by: most content pages

- `Container`
  - Purpose: Shared max-width wrapper for page sections
  - Props: `className?`, `children`
  - Dependencies: `cn`
  - Used by: many page/layout components

- `Section`
  - Purpose: Standardized section wrapper with spacing
  - Props: `id?`, `className?`, `children`
  - Dependencies: `Container`, `cn`
  - Used by: page sections and homepage blocks

## Primitives
- `Badge`
  - Purpose: Label/chip for categories, tags, statuses
  - Props: `variant?`, `children`
  - Dependencies: `cn`
  - Used by: projects, skills, certifications, experience, services

- `Button` / `ButtonLink`
  - Purpose: Standard CTA/button styling for forms and links
  - Props: `variant?`, `size?`, `children`, optional link-specific props
  - Dependencies: `cn`, `next/link`
  - Used by: many pages and home sections

- `Card`
  - Purpose: Wrapper for compact card layouts
  - Props: `className?`, `children`
  - Dependencies: `cn`
  - Used by: UI composition

- `SocialIcons`
  - Purpose: Social profile icon links
  - Props: `className?` and icon-specific options
  - Dependencies: `lucide-react`
  - Used by: footer or other contact surfaces

## Motion and interactions
- `Reveal`
  - Purpose: Scroll reveal animation wrapper with optional delay/direction
  - Props: `children`, `delay?`, `direction?`
  - Dependencies: `framer-motion`
  - Used by: most page sections and detail views

- `Stagger` / `StaggerItem`
  - Purpose: Coordinated stagger-group animation for lists
  - Dependencies: `framer-motion`
  - Used by: multiple list-heavy pages

## Home page
- `Hero`
  - Purpose: Intro hero with name, tagline, typing roles, CTAs, and background visual
  - Props: none
  - Dependencies: `typing effect`, `ButtonLink`, `Container`, `profile`, `socialLinks`
  - Used by: home page

- `Stats`
  - Purpose: Statistic cards for experience and delivery metrics
  - Props: none
  - Dependencies: `stats`, `Reveal`, `Stagger`
  - Used by: home page

- `TechMarquee`
  - Purpose: Horizontal marquee of technologies
  - Props: none
  - Dependencies: `heroTechnologies`
  - Used by: home page

- `FeaturedProjects`
  - Purpose: Home page project highlight grid
  - Props: none
  - Dependencies: `getFeaturedProjects`, `ProjectCard`, `Section`, `ButtonLink`
  - Used by: home page

- `SkillsPreview`
  - Purpose: Highlights skill groups with CTA to skills page
  - Props: none
  - Dependencies: `skills`, `Badge`, `Reveal`, `ButtonLink`
  - Used by: home page

- `Journey`
  - Purpose: Career timeline card set
  - Props: none
  - Dependencies: `journey`, `Section`, `Reveal`
  - Used by: home page

- `CallToAction`
  - Purpose: End-of-home CTA block to contact or view projects
  - Props: none
  - Dependencies: `ButtonLink`, `Section`
  - Used by: home page

## Projects
- `ProjectCard`
  - Purpose: Compact card for a single project item
  - Props: `project`
  - Dependencies: `Badge`, `Link`, `Project` type
  - Used by: project grid and featured-projects

- `ProjectsExplorer`
  - Purpose: Filterable project explorer with category buttons and cards
  - Props: none
  - Dependencies: `projects`, `ProjectCard`, `ButtonLink`
  - Used by: `/projects`

## Contact
- `ContactForm`
  - Purpose: User-facing contact form with validation, honeypot spam defense, and webhook submit
  - Props: none
  - Dependencies: `contactInfo`, `Button`, `cn`
  - Used by: `/contact`

## SEO
- `JsonLd`
  - Purpose: Renders structured data markup into the page
  - Props: `data`
  - Dependencies: none
  - Used by: layout and project detail pages

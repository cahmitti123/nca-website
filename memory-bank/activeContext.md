## Active Context — Current Focus

### Current work
Public site structure + UX polish:
- Public routes are organized into **Route Groups** under `app/(public)` to share layouts per page type without changing URLs.
- Shared group layouts provide consistent navigation/structure for:
  - Marketing pages
  - Product/service pages
  - Forms / contact flows
  - Portal hub pages
  - Legal pages
  - Blog/content pages

### Conventions (important)
- **SEO-first public rendering**: public routes under `app/(public)` must stay Server Components by default (no `"use client"` at the page/layout level). Interactive widgets should be isolated into small client components.

### Next steps
- Continue refining public page UI using the group layouts (clean, quiet, shadcn/ui).
- Expand/verify content + metadata/SEO on key public pages.



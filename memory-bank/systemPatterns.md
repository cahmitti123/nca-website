## System Patterns — Architecture & Conventions

### App architecture
- **Next.js App Router** with route separation:
  - Public routes: `app/(public)/...`
    - Organized with **Route Groups** (folder names wrapped in parentheses) to share layouts without changing URLs:
      - `app/(public)/(marketing)/...` + `app/(public)/(marketing)/(pages)/...`
      - `app/(public)/(products)/...`
      - `app/(public)/(forms)/...`
      - `app/(public)/(portal)/...`
      - `app/(public)/(legal)/...`
      - `app/(public)/(content)/...`
  - Admin routes: `app/(admin)/...`
- **Middleware protection** for `/admin/*` (except `/admin/login`), plus server-side authorization checks in actions/routes.

### Rendering conventions (SEO-first public)
- **Public routes must remain Server Components by default** to maximize SEO and ensure server pre-rendered HTML.
  - Avoid adding `"use client"` to `app/(public)/**/page.tsx` and `layout.tsx`.
  - If interactivity is required, isolate it into small client components rendered inside a server page/layout.
  - Avoid client-only rendering for primary content: `dynamic(..., { ssr: false })`, client-only data fetching for page content, or content populated in `useEffect`.
  - Use `metadata` / `generateMetadata` for SEO.

### Data + auth
- **Supabase Auth** manages authentication and admin sessions.
- **Drizzle ORM** (Postgres) manages application data:
  - `profiles` table for roles/permissions linked to `auth.users`
  - `leads` for form entries
  - `blog_posts` for content

### Role-based access (RBAC)
- Roles stored in `profiles.role`:
  - `admin`: can manage users + all content
  - `editor`: can manage blog content and view leads (exact permissions can evolve)
- Access control is enforced on the server (middleware + server actions).

### UI system
- Use **shadcn/ui components** for UI primitives.
- Styling: muted palette, subtle borders, glassy surfaces (backdrop blur) where appropriate.
- Avoid loud colors/animations; transitions ~300–500ms max.

### Public UI patterns (reusability)
- Shared full-site background/texture is provided by `components/public/site-background.tsx` and mounted in `app/(public)/layout.tsx`.
- Product/service pages use a reusable server component template:
  - `components/public/product-landing.tsx` (header + Pexels cover + main/side cards)
  - `components/public/bullet-list.tsx` for consistent feature lists.
- Hub/list pages can use:
  - `components/public/link-card.tsx` (optional image + CTA).
- Central data sources (avoid duplicating links/queries):
  - `lib/insurance-products.ts` for product links + labels + Pexels queries.
  - `lib/stock-images.ts` for shared Pexels query helpers + default locale/revalidate.



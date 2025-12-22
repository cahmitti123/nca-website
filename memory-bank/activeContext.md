## Active Context — Current Focus

### Current work
Build the admin foundation first:
- Admin authentication (Supabase Auth)
- Protected admin routes
- Database schema + Drizzle setup
- Admin CRUD:
  - Users
  - Leads
  - Blog posts (rich editor + image upload)

### Conventions (important)
- **SEO-first public rendering**: public routes under `app/(public)` must stay Server Components by default (no `"use client"` at the page/layout level). Interactive widgets should be isolated into small client components.

### Next steps
- Implement Drizzle schema + migrations
- Integrate Supabase clients (browser/server/admin)
- Implement `/admin/login` + middleware + RBAC checks
- Build admin UI skeleton + CRUD pages



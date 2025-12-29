## Tech Context — Stack & Setup

### Core stack
- **Next.js** App Router
- **React** + **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui**
- **Supabase**
  - Auth (admin login/session)
  - Storage (blog images)
  - Postgres database
- **Drizzle ORM** + drizzle-kit migrations

### Environment variables (placeholders)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- `DATABASE_URL` (server-only; Postgres connection string)
- `PEXELS_API_KEY` (server-only; optional, used for Pexels image placeholders in marketing UI)

### Package manager
- `pnpm` (preferred, repo includes `pnpm-lock.yaml`)





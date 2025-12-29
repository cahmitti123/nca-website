# Net Courtage Assurances (NCA) — Website

Modern Next.js website for **Net Courtage Assurances**, a French insurance broker.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: Supabase Auth
- **Database**: Postgres (Drizzle ORM)
- **UI**: shadcn/ui + Aceternity UI + Tailwind CSS v4
- **Hosting**: Vercel

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (server-only)
- `DATABASE_URL`: Postgres connection string (Supabase pooler)
- `ADMIN_SETUP_TOKEN`: Optional token to protect `/admin/setup` in production

### 3. Run database migrations

```bash
pnpm db:migrate
```

### 4. (Optional) Seed blog posts

```bash
pnpm db:seed
```

### 5. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── (admin)/          # Protected admin routes (auth + middleware)
│   ├── (auth)/       # Login, setup
│   └── (protected)/  # Users, leads, blog CRUD
└── (public)/         # Public marketing + content pages
components/
├── ui/               # shadcn + Aceternity primitives
├── public/           # Reusable full-bleed wrappers
└── forms/            # Quote request + complaint forms
lib/
├── supabase/         # Client factories (browser, server, admin)
├── auth/             # Admin role checks
├── partners.ts       # Partners data (logos, descriptions)
└── site-contact.ts   # Centralized contact info
db/
├── schema.ts         # Drizzle schema (profiles, leads, blog_posts)
└── migrations/       # SQL migrations
```

## Key Features

- **Public pages**: SEO-first (Server Components by default)
- **Admin interface**: protected by middleware + Supabase Auth (role-based)
- **Blog**: rich TipTap editor with image upload
- **Forms**: quote requests, contact, complaints → stored as leads
- **Theme**: light/dark toggle (Quicksand body + Figtree headings)

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Framework Preset**: Next.js
4. **Build Command**: `pnpm build` (or leave default)
5. **Output Directory**: `.next` (default)

### 3. Configure Environment Variables

In **Vercel Dashboard → Settings → Environment Variables**, add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `ADMIN_SETUP_TOKEN` (optional, for production `/admin/setup` protection)

### 4. Deploy

Vercel will auto-deploy on push to `main`. You can also trigger manual deploys from the dashboard.

### 5. Set up admin user

After first deployment, visit `https://<your-domain>/admin/setup` to create your first admin account.

## Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Start dev server (port 3000)                     |
| `pnpm build`         | Production build                                 |
| `pnpm start`         | Start production server                          |
| `pnpm lint`          | Run ESLint                                       |
| `pnpm db:generate`   | Generate Drizzle migrations from schema changes  |
| `pnpm db:migrate`    | Apply migrations to database                     |
| `pnpm db:seed`       | Seed blog posts (add `--dry-run` to preview)     |
| `pnpm db:import-wp-blog` | Import published posts from WordPress (add `--dry-run` / `--overwrite`) |

## Notes

- **Public pages** (`app/(public)/**`) must remain Server Components for SEO (no `"use client"` on route pages/layouts).
- **Admin pages** can be Client Components as needed (SEO not a concern).
- **Secrets**: never commit `.env.local` or `.env.production` (already in `.gitignore`).
- **Partners logos**: stored in `public/partners-logos/` and referenced via `lib/partners.ts`.
- **Contact info**: centralized in `lib/site-contact.ts` (update there to change site-wide).

## License

Proprietary — Net Courtage Assurances.

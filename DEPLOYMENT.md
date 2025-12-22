# Deployment Checklist — NCA Website

This guide helps you deploy the **Net Courtage Assurances** website to **Vercel** (or any Next.js-compatible hosting).

---

## ✅ Pre-Deployment Checklist

### 1. Environment Variables

Ensure all required env vars are set:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `DATABASE_URL` (Supabase Postgres pooler connection string)
- [ ] `ADMIN_SETUP_TOKEN` (optional, protects `/admin/setup` in production)

### 2. Database

- [ ] Migrations applied: `pnpm db:migrate`
- [ ] (Optional) Blog posts seeded: `pnpm db:seed`
- [ ] (Optional) Admin user created via `/admin/setup` (or manually in Supabase Auth)

### 3. Build & Lint

- [ ] Production build passes: `pnpm build`
- [ ] No TypeScript errors
- [ ] No critical linter warnings

### 4. Secrets

- [ ] No secrets committed (`.env.local` is in `.gitignore`)
- [ ] `.env.example` is up to date (for onboarding)

### 5. Content

- [ ] Replace `public/hero-placeholder.svg` with real hero image (or keep as-is)
- [ ] Update `lib/site-contact.ts` if contact details change
- [ ] Update `lib/partners.ts` if partner list changes
- [ ] Add missing partner logos to `public/partners-logos/` (e.g. Maxance)

---

## 🚀 Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as-is)
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: `.next` (default)

3. **Add Environment Variables**:
   - In Vercel Dashboard → **Settings → Environment Variables**
   - Add all vars from `.env.example`
   - Mark `SUPABASE_SERVICE_ROLE_KEY` and `DATABASE_URL` as **production-only** (don't expose to preview branches if desired)

4. **Deploy**:
   - Click **Deploy**
   - Wait for the build to complete (~2–3 min)

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Follow prompts to configure environment variables.

---

## 📦 Post-Deployment

### 1. Set up admin user

- Visit `https://<your-domain>/admin/setup`
- Create your first admin account
- If `ADMIN_SETUP_TOKEN` is set, you'll need to provide it

### 2. Test key flows

- [ ] Homepage loads (all sections visible, no errors)
- [ ] Admin login works (`/admin/login`)
- [ ] Blog CRUD works (`/admin/blog`)
- [ ] Leads CRUD works (`/admin/leads`)
- [ ] Quote request form submits (`/contact-reclamations/demande`)
- [ ] Blog posts render on public site (`/blog`, `/blog/<slug>`)

### 3. Configure custom domain (optional)

- In Vercel Dashboard → **Settings → Domains**
- Add your custom domain (e.g. `ncassurances.net`)
- Update DNS records as instructed by Vercel

### 4. Enable analytics (optional)

- Vercel Dashboard → **Analytics** tab
- Enable **Web Analytics** (privacy-friendly, no cookies)

---

## 🔧 Troubleshooting

### Build fails with "Cannot find module"

- Ensure `pnpm install` ran successfully
- Check `package.json` for missing dependencies

### Database connection fails

- Verify `DATABASE_URL` is correct (must use **transaction pooler** mode for Vercel)
- Check Supabase dashboard → **Settings → Database → Connection string**
- Use the **transaction** mode (not session mode)

### Admin login redirects to `/admin/login` in a loop

- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check Supabase dashboard → **Settings → API** for the correct values

### Images not loading

- Ensure `public/` folder is committed
- Check Next.js image optimization is enabled (default)

### TypeScript errors in production build

- Run `pnpm build` locally to catch errors before deploying
- Fix any `any` types or missing imports

---

## 📚 Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)

---

**Questions?** Contact the dev team or refer to `README.md` for project structure.


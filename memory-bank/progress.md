## Progress — Status & Known Issues

### Current status
- Repo initialized with Next.js App Router + Tailwind v4 + shadcn/ui components.
- Admin system implemented (auth + protected routes) with CRUD for users/leads/blog.
- Supabase + Drizzle integrated.
- Dark mode enabled via `next-themes` + global ThemeProvider.

### What works
- Baseline UI kit (shadcn/ui) and theme tokens in `app/globals.css`.
- Fixed admin shell: fixed navbar + fixed sidebar + scrollable content (ScrollArea).

### What’s next
- Build out public marketing pages (SEO-first Server Components).

### Known risks / decisions
- Blog editor format: use a structured editor (e.g., Tiptap) and store HTML + JSON for safe rendering and custom blocks.
- Storage policies: blog image upload must be configured (Supabase Storage bucket + policies); initial implementation may use server-side uploads.
- Public rendering convention: keep public pages server-rendered (Server Components by default) and isolate interactivity into small client components.



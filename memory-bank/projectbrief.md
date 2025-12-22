## Project Brief — NCA Website

### Overview
This repository contains the new website for **Net Courtage Assurances (NCA)**. It is a Next.js App Router application with:

- A **public marketing site** (Accueil, services, blog, legal pages, contact).
- A **protected admin section** for managing:
  - Users (admin/editor access)
  - Leads / form entries
  - Blog posts (rich editor + images)
  - Testimonials (later)

### Core Goals
- Build a fast, modern, SEO-friendly website.
- Provide a secure admin portal with authentication and role-based access.
- Store and manage content (blog + leads) in Postgres via **Drizzle ORM**.
- Host on **Vercel**.

### Non-Goals (for now)
- Full redesign parity with the existing public site (we’ll iterate).
- Multi-language (can be added later).
- Complex CRM automation (later).

### Security Requirements
- Use **Supabase Auth** for admin login.
- Never expose server credentials (service role key, JWT secret) to the client or git.
- Admin routes must be protected at the framework level (middleware + server-side checks).





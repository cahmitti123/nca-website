## Layouts & Navigation — UI Agent Guide (Public + Inner Pages + Portal)

### Goal of this document
This file explains **where to change what** in the layout system so an agent can make UI changes with minimal duplication.

Key principle: **Home has its own UX**, **all other public pages share one inner-pages system**, and **admin has its own layouts**.

---

### High-level mental model

#### 1) Root layout (site-wide)
- `app/layout.tsx`
  - Fonts, `<html>/<body>`, theme provider.
  - Avoid page-specific UI here.

#### 2) Public shell (all public routes)
- `app/(public)/layout.tsx`
  - Mounts the global `Navbar` + `Footer`.
  - Defines the global container width/padding for public pages.

#### 3) Home page (special)
- `app/(public)/(home)/page.tsx`
  - The homepage content (Hero, sections).
  - Home uses a **floating** navbar behavior (see Navbar section).

#### 4) Inner pages (everything except `/`)
Inner pages share:
- A **solid/sticky top navbar**
- A **second navbar row** for breadcrumbs + per-page controls
- A **shared layout grid** with a sticky sidebar on desktop (and a mobile menu sheet)

This is centralized in:
- `components/navbar.tsx` (top bar + second row)
- `components/public/inner-page-layout.tsx` (sticky sidebar + content grid + optional right sidebar)
- `components/public/split-page-layout.tsx` (special layout for forms)
- `components/public/inner-section-layout.tsx` (single config map for all inner sections)

---

### The “double navbar” (single source of truth)

#### File: `components/navbar.tsx`
This is the **one place** to change:
- **Home vs inner behavior** (home uses `variant="floating"`, inner uses `variant="solid"`)
- **Active state** for top nav items (accented pill + bold)
- **Breadcrumbs row** (second row) shown on inner pages
- **Per-page controls** for inner pages (right side of second row)
- Mobile “Menu” sheet per section (portal tree vs generic section links)

How it works (important for safe edits):
- **Inner page detection**: currently `pathname !== "/"`.
- **Active item logic**:
  - Assurances: `/portail/*` + product pages (`lib/insurance-products.ts`)
  - Blog: `/blog/*`
  - Contact: `/contactez-nous` + forms routes + services clients
- **Breadcrumbs**:
  - Portal: uses `lib/portal/portal-nav.ts` helpers
  - Other sections: uses a label map built from:
    - `lib/public-links.ts`
    - `lib/insurance-products.ts`
  - Avoids linking “fake” segments by only linking known routes.

#### File: `components/ui/resizable-navbar.tsx`
Controls the **visual behavior** of the navbar:
- `variant="floating"`: rounded, offset animation, blur/shadow on scroll
- `variant="solid"`: stable, no offset animation
- Active nav rendering/pill highlighting for desktop nav items.

---

### Shared layouts

#### File: `components/public/inner-page-layout.tsx`
This is the shared grid for standard inner pages:
- Desktop: 2 or 3-column layout.
- **Sticky Left Sidebar**: For navigation (`StickyRail` or custom). Independent scroll.
- **Main Content**: Center area.
- **Sticky Right Sidebar** (Optional): For TOC or secondary actions. Independent scroll.

#### File: `components/public/split-page-layout.tsx`
**New specialized layout for Forms**:
- Desktop: Split screen (Left fixed info/nav, Right scrollable content).
- Intended for high-focus tasks like filling out forms (`/forms/*`).

#### File: `components/public/sticky-rail.tsx`
Standard sidebar block:
- Standard list of links navigation.
- Can be used in `InnerPageLayout` or `SplitPageLayout`.

---

### “One config map” for all inner sections

#### File: `components/public/inner-section-layout.tsx`
This file is the **single place** to configure which sidebar/layout each section gets.

Sections:
- `content`: uses `InnerPageLayout` + `contentLinks`
- `forms`: uses `SplitPageLayout` + `formLinks`
- `legal`: uses `InnerPageLayout` + `legalLinks`
- `marketing`: uses `InnerPageLayout` + `marketingLinks`
- `products`: uses `InnerPageLayout` + product list
- `portal`: uses `InnerPageLayout` + custom `PortalSidebar`

If you add a new public section:
1) Add links in `lib/public-links.ts`
2) Add a section entry in `inner-section-layout.tsx`
3) Update `navbar.tsx` menu logic if needed

---

### Portal specifics (tree nav + pagination)

#### Source of truth
- `lib/portal/portal-nav.ts`
  - Portal tree structure (`PORTAL_NAV`)
  - Breadcrumbs helper (`getPortalBreadcrumbs`)
  - Prev/Next helper (`getPortalPrevNext`)
  - Section sibling nav helper (`getPortalSectionNav`)

#### UI components
- `components/public/portal-sidebar.tsx`
  - The portal desktop sidebar card (tree + subscribe + CTAs).
- `components/public/portal-nav-tree.tsx`
  - Tree view navigation (collapsible groups + active state).
- `components/public/portal-nav-sheet.tsx`
  - Mobile portal menu sheet.
- `components/public/portal-subscribe-mini-form.tsx`
  - Small email/updates form (stores a lead via server action).
- `app/(public)/(portal)/actions.ts`
  - Server action for the portal subscribe form.

---

### Thin route-group layouts (keep these minimal)
These files should stay as **one-liners** calling the shared system:
- `app/(public)/(content)/layout.tsx`
- `app/(public)/(forms)/layout.tsx`
- `app/(public)/(legal)/layout.tsx`
- `app/(public)/(marketing)/(pages)/layout.tsx`
- `app/(public)/(products)/layout.tsx`
- `app/(public)/(portal)/layout.tsx`

Do **not** reintroduce custom breadcrumb/title logic here — the global navbar second row owns it.

---

### Where to change common UI/UX behaviors

#### Change overall public container width/padding
- `app/(public)/layout.tsx` (the `<main className=...>` wrapper)

#### Change inner navbar second row content (breadcrumbs + per-page controls)
- `components/navbar.tsx`

Examples of “per-page controls” to add (recommended to do here):
- Search field on blog pages
- Filters/sort dropdowns for lists
- “Copy link” / share button
- Context CTA (e.g., “Demander un devis”) depending on section

#### Change sticky offsets (top spacing under navbar)
- `components/navbar.tsx` controls the total navbar height:
  - Home spacer is `h-12`
  - Inner pages spacer is `h-24` (2 rows)
- Sticky sidebar offsets:
  - `components/public/inner-page-layout.tsx` and `components/public/sticky-rail.tsx` use `top-24`

---

### Non-negotiable engineering constraints (public)
- **Public routes are Server Components by default**:
  - Avoid adding `"use client"` to `app/(public)/**/page.tsx` and `layout.tsx`.
  - If interactivity is needed, isolate it into small client components.
- Use **shadcn/ui** primitives.
- Keep **TypeScript strict**, no `any`, no ESLint disables to hide type errors.
- Do not commit secrets.



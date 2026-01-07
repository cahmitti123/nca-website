import type { ComponentType } from "react";

import { Building2, FileText, LibraryBig, ShieldCheck, Users } from "lucide-react";

export type PortalNavIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export type PortalNavItem = {
  label: string;
  href?: string;
  match?: "exact" | "prefix";
  icon?: PortalNavIcon;
  children?: PortalNavItem[];
};

export type PortalNavLink = {
  href: string;
  label: string;
  ancestors: Array<{ label: string; href?: string }>;
};

export const PORTAL_NAV: PortalNavItem[] = [
  {
    label: "Centre de ressources",
    href: "/portail",
    match: "exact",
    icon: LibraryBig,
  },
  {
    label: "Offres d’assurances",
    href: "/portail/offres",
    match: "exact",
    icon: ShieldCheck,
  },
  {
    label: "Assurances personnelles",
    icon: Users,
    children: [
      { label: "Seniors", href: "/portail/assurances-personnelles/seniors" },
      { label: "Santé", href: "/portail/assurances-personnelles/sante" },
      { label: "Emprunteur", href: "/portail/assurances-personnelles/emprunteur" },
    ],
  },
  {
    label: "Assurances entreprise",
    href: "/portail/assurances-entreprise",
    icon: Building2,
  },
  {
    label: "Ressources",
    icon: FileText,
    children: [
      { label: "Divers assurances", href: "/portail/divers-assurances" },
      { label: "Articles divers", href: "/portail/articles-divers" },
      { label: "Blog", href: "/blog" },
      { label: "Espace juridique", href: "/espace-juridique" },
    ],
  },
];

export function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function flattenPortalNavLinks(
  items: PortalNavItem[] = PORTAL_NAV,
  ancestors: Array<{ label: string; href?: string }> = [],
): PortalNavLink[] {
  const out: PortalNavLink[] = [];

  for (const item of items) {
    if (item.href) {
      out.push({
        href: normalizePathname(item.href),
        label: item.label,
        ancestors,
      });
    }

    if (item.children?.length) {
      const nextAncestors = [...ancestors, { label: item.label, href: item.href }];
      out.push(...flattenPortalNavLinks(item.children, nextAncestors));
    }
  }

  return out;
}

const ALL_LINKS = flattenPortalNavLinks();
const LINK_MAP = new Map<string, PortalNavLink>(ALL_LINKS.map((l) => [l.href, l]));

export const PORTAL_INTERNAL_LINKS = ALL_LINKS.filter((l) => l.href.startsWith("/portail"));

export function getPortalNavLink(href: string): PortalNavLink | null {
  const normalized = normalizePathname(href);
  return LINK_MAP.get(normalized) ?? null;
}

export type PortalBreadcrumb = { label: string; href?: string; current?: boolean };

export function getPortalBreadcrumbs(currentHref: string): PortalBreadcrumb[] {
  const href = normalizePathname(currentHref);
  const crumbs: PortalBreadcrumb[] = [{ label: "Accueil", href: "/" }];

  if (href === "/portail") {
    crumbs.push({ label: "Portail", current: true });
    return crumbs;
  }

  crumbs.push({ label: "Portail", href: "/portail" });

  const link = getPortalNavLink(href);
  if (!link) {
    crumbs.push({ label: "Page", current: true });
    return crumbs;
  }

  for (const ancestor of link.ancestors) {
    if (ancestor.href && normalizePathname(ancestor.href).startsWith("/portail") && ancestor.href !== "/portail") {
      crumbs.push({ label: ancestor.label, href: normalizePathname(ancestor.href) });
    } else if (!ancestor.href) {
      crumbs.push({ label: ancestor.label });
    }
  }

  crumbs.push({ label: link.label, current: true });
  return crumbs;
}

export function getPortalPrevNext(currentHref: string): {
  prev: PortalNavLink | null;
  next: PortalNavLink | null;
} {
  const href = normalizePathname(currentHref);
  const idx = PORTAL_INTERNAL_LINKS.findIndex((l) => l.href === href);
  if (idx === -1) return { prev: null, next: null };

  return {
    prev: idx > 0 ? PORTAL_INTERNAL_LINKS[idx - 1]! : null,
    next: idx < PORTAL_INTERNAL_LINKS.length - 1 ? PORTAL_INTERNAL_LINKS[idx + 1]! : null,
  };
}

function findWithParent(
  items: PortalNavItem[],
  targetHref: string,
  parent: PortalNavItem | null,
): { item: PortalNavItem; parent: PortalNavItem | null } | null {
  for (const item of items) {
    if (item.href && normalizePathname(item.href) === targetHref) return { item, parent };
    if (item.children?.length) {
      const found = findWithParent(item.children, targetHref, item);
      if (found) return found;
    }
  }
  return null;
}

export function getPortalSectionNav(currentHref: string): {
  label: string;
  items: Array<{ label: string; href: string }>;
} | null {
  const href = normalizePathname(currentHref);
  const found = findWithParent(PORTAL_NAV, href, null);
  const parent = found?.parent;
  if (!parent?.children?.length) return null;

  const items = parent.children
    .filter((child): child is PortalNavItem & { href: string } => typeof child.href === "string")
    .map((child) => ({ label: child.label, href: normalizePathname(child.href) }))
    .filter((child) => child.href.startsWith("/portail"));

  if (items.length < 2) return null;
  return { label: parent.label, items };
}






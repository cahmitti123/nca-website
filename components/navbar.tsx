"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { InnerPageNavSheet } from "@/components/public/inner-page-nav-sheet";
import { PortalNavSheet } from "@/components/public/portal-nav-sheet";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar as ResizableNavbar,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { cn } from "@/lib/utils";
import { insuranceProducts } from "@/lib/insurance-products";
import { contentLinks, formLinks, legalLinks, marketingLinks } from "@/lib/public-links";
import { getPortalBreadcrumbs } from "@/lib/portal/portal-nav";
import { SiteCommandMenu } from "@/components/site-command-menu";

type Crumb = { label: string; href?: string };

function titleizeSegment(segment: string) {
  const s = segment.replace(/-/g, " ");
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const isInnerPage = pathname !== "/";

  const normalizedPathname = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  const isFormsRoute =
    normalizedPathname.startsWith("/contact-reclamations") ||
    normalizedPathname.startsWith("/demander-un-devis") ||
    normalizedPathname.startsWith("/devis-") ||
    normalizedPathname.startsWith("/formulaire-") ||
    normalizedPathname.startsWith("/merci-") ||
    normalizedPathname.startsWith("/votre-");

  const isAssurancesActive =
    normalizedPathname.startsWith("/portail") ||
    insuranceProducts.some((p) => normalizedPathname === p.href || normalizedPathname.startsWith(`${p.href}/`));

  const isBlogActive = normalizedPathname === "/blog" || normalizedPathname.startsWith("/blog/");
  const isContactActive =
    normalizedPathname === "/contactez-nous" ||
    isFormsRoute ||
    normalizedPathname === "/services-clients-reclamations";

  const items = [
    { name: "Accueil", link: "/", active: normalizedPathname === "/" },
    { name: "Nos Solutions", link: "/nos-solutions", active: normalizedPathname === "/nos-solutions" || isAssurancesActive },
    { name: "Blog", link: "/blog", active: isBlogActive },
    { name: "Contact", link: "/contactez-nous", active: isContactActive },
    
  ] as const;

  const breadcrumbLabelByHref = React.useMemo(() => {
    const m = new Map<string, string>();
    for (const l of marketingLinks) m.set(l.href, l.label);
    for (const l of contentLinks) m.set(l.href, l.label);
    for (const l of legalLinks) m.set(l.href, l.label);
    for (const l of formLinks) m.set(l.href, l.label);
    for (const p of insuranceProducts) m.set(p.href, p.title);
    return m;
  }, []);

  const innerCrumbs = React.useMemo<Crumb[] | null>(() => {
    if (!isInnerPage) return null;

    if (normalizedPathname.startsWith("/portail")) {
      const portalCrumbs = getPortalBreadcrumbs(normalizedPathname);
      const mapped: Crumb[] = portalCrumbs.map((c) => ({ label: c.label, href: c.href }));
      // Ensure current page isn't a link.
      if (mapped.length) mapped[mapped.length - 1] = { label: mapped[mapped.length - 1]!.label };
      return mapped;
    }

    const crumbs: Crumb[] = [{ label: "Accueil", href: "/" }];

    const isProduct = insuranceProducts.some(
      (p) => normalizedPathname === p.href || normalizedPathname.startsWith(`${p.href}/`),
    );
    if (isProduct) {
      crumbs.push({ label: "Nos Solutions", href: "/nos-solutions" });
      crumbs.push({
        label: breadcrumbLabelByHref.get(normalizedPathname) ?? "Assurance",
      });
      return crumbs;
    }

    if (normalizedPathname === "/nos-solutions") {
      crumbs.push({ label: "Nos Solutions" });
      return crumbs;
    }

    const isBlog = normalizedPathname === "/blog" || normalizedPathname.startsWith("/blog/");
    if (isBlog) {
      crumbs.push({ label: "Blog", href: "/blog" });
      if (normalizedPathname !== "/blog") {
        const parts = normalizedPathname.split("/").filter(Boolean);
        const last = parts.length ? parts[parts.length - 1] : null;
        crumbs.push({ label: last ? titleizeSegment(last) : "Article" });
      }
      return crumbs;
    }

    const isLegal = legalLinks.some(
      (l) => normalizedPathname === l.href || normalizedPathname.startsWith(`${l.href}/`),
    );
    if (isLegal) {
      crumbs.push({ label: "Espace juridique", href: "/espace-juridique" });
      if (normalizedPathname !== "/espace-juridique") {
        const parts = normalizedPathname.split("/").filter(Boolean);
        const last = parts.length ? parts[parts.length - 1] : null;
        crumbs.push({
          label: breadcrumbLabelByHref.get(normalizedPathname) ?? (last ? titleizeSegment(last) : "Page"),
        });
      }
      return crumbs;
    }

    if (isFormsRoute) {
      crumbs.push({ label: "Contact", href: "/contactez-nous" });
      const label =
        breadcrumbLabelByHref.get(normalizedPathname) ??
        titleizeSegment(
          ((): string => {
            const parts = normalizedPathname.split("/").filter(Boolean);
            return parts.length ? parts[parts.length - 1]! : "Formulaire";
          })(),
        );
      crumbs.push({ label });
      return crumbs;
    }

    const segments = normalizedPathname.split("/").filter(Boolean);
    let current = "";
    for (const seg of segments) {
      current += `/${seg}`;
      const knownLabel = breadcrumbLabelByHref.get(current);
      crumbs.push({
        label: knownLabel ?? titleizeSegment(seg),
        href: knownLabel ? current : undefined,
      });
    }
    if (crumbs.length > 1) crumbs[crumbs.length - 1] = { label: crumbs[crumbs.length - 1]!.label };
    return crumbs;
  }, [breadcrumbLabelByHref, isFormsRoute, isInnerPage, normalizedPathname]);

  const innerMenu = React.useMemo<React.ReactNode>(() => {
    if (!isInnerPage) return null;

    // Portal: show the richer tree sheet.
    if (normalizedPathname.startsWith("/portail")) {
      return (
        <div className="lg:hidden">
          <PortalNavSheet />
        </div>
      );
    }

    // Determine section links for the inner menu.
    const isLegal = legalLinks.some((l) => normalizedPathname === l.href || normalizedPathname.startsWith(`${l.href}/`));
    const isForms =
      isFormsRoute ||
      formLinks.some((l) => normalizedPathname === l.href || normalizedPathname.startsWith(`${l.href}/`));
    const isContent =
      contentLinks.some((l) => normalizedPathname === l.href || normalizedPathname.startsWith(`${l.href}/`)) ||
      normalizedPathname.startsWith("/blog");
    const isMarketing =
      marketingLinks.some((l) => normalizedPathname === l.href || normalizedPathname.startsWith(`${l.href}/`));
    const isProduct = insuranceProducts.some(
      (p) => normalizedPathname === p.href || normalizedPathname.startsWith(`${p.href}/`),
    );

    if (isLegal) return <InnerPageNavSheet className="lg:hidden" title="Navigation rapide" links={legalLinks} />;
    if (isForms) return <InnerPageNavSheet className="lg:hidden" title="Démarches en ligne" links={formLinks} />;
    if (isContent) return <InnerPageNavSheet className="lg:hidden" title="Ressources" links={contentLinks} />;
    if (isMarketing) return <InnerPageNavSheet className="lg:hidden" title="Navigation" links={marketingLinks} />;
    if (isProduct) {
      const productLinks = insuranceProducts.map((p) => ({ label: p.title, href: p.href }));
      return <InnerPageNavSheet className="lg:hidden" title="Nos Assurances" links={productLinks} />;
    }

    return null;
  }, [isFormsRoute, isInnerPage, normalizedPathname]);

  return (
    <>
      {/* Spacer: keeps page content from sliding under the fixed navbar */}
      <div
        className={cn(
          "transition-[height] duration-200 ease-out",
          isInnerPage ? "h-24" : "h-12",
        )}
      />

      <ResizableNavbar
        variant={isInnerPage ? "solid" : "floating"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ease-out",
          isInnerPage
            ? "border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60"
            : null,
        )}
      >
        <NavBody>
          <NavbarLogo />
          <NavItems items={[...items]} />
          <div className="relative z-20 flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/admin">Admin</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/demander-un-devis">Demander un devis</Link>
            </Button>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="grid w-full gap-1">
              {items.map((item) => (
                <Button
                  key={item.link}
                  variant={item.active ? "secondary" : "ghost"}
                  size="sm"
                  className={cn("w-full justify-start", item.active ? "font-semibold" : undefined)}
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.link}>{item.name}</Link>
                </Button>
              ))}
            </div>

            <div className="grid w-full gap-2 pt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link href="/demander-un-devis" onClick={() => setIsOpen(false)}>
                  Demander un devis
                </Link>
              </Button>
            </div>
          </MobileNavMenu>
        </MobileNav>

        {isInnerPage && innerCrumbs?.length ? (
          <div className="border-t border-border/60 bg-background/90 supports-backdrop-filter:bg-background/30 backdrop-blur">
            <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-3 px-4">
              <Breadcrumb>
                <BreadcrumbList className="flex-nowrap text-xs sm:flex-wrap">
                  {innerCrumbs.map((crumb, idx) => {
                    const isLast = idx === innerCrumbs.length - 1;
                    return (
                      <React.Fragment key={`${crumb.label}-${idx}`}>
                        <BreadcrumbItem className="whitespace-nowrap">
                          {isLast || !crumb.href ? (
                            <BreadcrumbPage className="text-xs font-semibold">
                              {crumb.label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild className="text-xs">
                              <Link href={crumb.href}>{crumb.label}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast ? <BreadcrumbSeparator /> : null}
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-4">
                 <div className="hidden lg:flex items-center text-xs text-muted-foreground gap-2">
                    <span className="font-medium text-foreground">Besoin d'aide ?</span>
                    <a href="tel:0164074768" className="hover:text-primary transition-colors font-mono">01 64 07 47 68</a>
                 </div>
                 <div className="hidden sm:block">
                   <SiteCommandMenu />
                 </div>
                 {innerMenu}
              </div>
            </div>
          </div>
        ) : null}
      </ResizableNavbar>
    </>
  );
};

export default Navbar;

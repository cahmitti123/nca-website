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
import { Cookie, FileText, Home, Info, Mail, Newspaper, Phone, Scale, Shield } from "lucide-react";
import { siteContact } from "@/lib/site-contact";

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

  const isActiveHref = React.useCallback(
    (href: string) => normalizedPathname === href || normalizedPathname.startsWith(`${href}/`),
    [normalizedPathname],
  );

  const isComplaintRoute = isActiveHref("/contact-reclamations/reclamation");

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
  const isLegalActive = legalLinks.some((l) => isActiveHref(l.href)) || isComplaintRoute;

  const isContactActive = normalizedPathname === "/contactez-nous" || (isFormsRoute && !isComplaintRoute);

  const iconClassName = (active: boolean) =>
    cn(
      "size-4 text-muted-foreground/70 transition-colors",
      active
        ? "text-foreground"
        : "group-hover:text-primary group-hover/button:text-primary group-hover/dropdown-menu-item:text-primary",
    );


  const contactsDropdownItems: NonNullable<React.ComponentProps<typeof NavItems>["items"][number]["children"]> = [
    {
      name: "Appeler",
      link: `tel:${siteContact.phonePrimary.tel}`,
      active: false,
      icon: <Phone className={iconClassName(false)} aria-hidden="true" />,
    },
    {
      name: "Envoyer un email",
      link: `mailto:${siteContact.email}`,
      active: false,
      icon: <Mail className={iconClassName(false)} aria-hidden="true" />,
    },
      {
        name: "Services clients & réclamations",
        link: "/services-clients-reclamations",
        active: isActiveHref("/services-clients-reclamations"),
        icon: (
          <Phone
            className={iconClassName(isActiveHref("/services-clients-reclamations"))}
            aria-hidden="true"
          />
        ),
      },
  ];

  const legalDropdownItems: NonNullable<React.ComponentProps<typeof NavItems>["items"][number]["children"]> = [

    {
      name: "Espace juridique",
      link: "/espace-juridique",
      active: isActiveHref("/espace-juridique"),
      icon: <Scale className={iconClassName(isActiveHref("/espace-juridique"))} aria-hidden="true" />,
    },
    {
      name: "Services clients & réclamations",
      link: "/services-clients-reclamations",
      active: isActiveHref("/services-clients-reclamations"),
      icon: (
        <Phone
          className={iconClassName(isActiveHref("/services-clients-reclamations"))}
          aria-hidden="true"
        />
      ),
    },
    {
      name: "Mentions légales & CGU",
      link: "/mentions-legales-cgu",
      active: isActiveHref("/mentions-legales-cgu"),
      icon: (
        <Info className={iconClassName(isActiveHref("/mentions-legales-cgu"))} aria-hidden="true" />
      ),
    },
    {
      name: "Politique de confidentialité",
      link: "/politique-de-confidentialite",
      active: isActiveHref("/politique-de-confidentialite"),
      icon: (
        <FileText
          className={iconClassName(isActiveHref("/politique-de-confidentialite"))}
          aria-hidden="true"
        />
      ),
    },
    {
      name: "Gérer les cookies",
      link: "/gerer-les-cookies",
      active: isActiveHref("/gerer-les-cookies"),
      icon: (
        <Cookie className={iconClassName(isActiveHref("/gerer-les-cookies"))} aria-hidden="true" />
      ),
    },
  ];

  const items: React.ComponentProps<typeof NavItems>["items"] = [
    {
      name: "Accueil",
      link: "/",
      active: normalizedPathname === "/",
      icon: <Home className={iconClassName(normalizedPathname === "/")} aria-hidden="true" />,
    },
    {
      name: "Nos Solutions",
      link: "/nos-solutions",
      active: normalizedPathname === "/nos-solutions" || isAssurancesActive,
      icon: (
        <Shield
          className={iconClassName(normalizedPathname === "/nos-solutions" || isAssurancesActive)}
          aria-hidden="true"
        />
      ),
    },
    {
      name: "Espace juridique",
      active: isLegalActive,
      icon: <Scale className={iconClassName(isLegalActive)} aria-hidden="true" />,
      children: legalDropdownItems,
    },
    {
      name: "Blog",
      link: "/blog",
      active: isBlogActive,
      icon: <Newspaper className={iconClassName(isBlogActive)} aria-hidden="true" />,
    },
    // {
    //   name: "Contact",
    //   link: "/contactez-nous",
    //   active: isContactActive,
    //   icon: <Phone className={iconClassName(isContactActive)} aria-hidden="true" />,
    // },
    {
      name: "Contact",
      link: "/contactez-nous",
      active: isContactActive,
      icon: <Phone className={iconClassName(isContactActive)} aria-hidden="true" />,
      children: contactsDropdownItems,
    },
  ];

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
          "transition-[height] duration-200 ease-out ",
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
          <NavItems items={items} />
          <div className="relative z-20 flex items-center gap-2">
            <ThemeToggle />
            {/* <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/admin">Admin</Link>
            </Button> */}
            <Button size="sm" className="rounded-full" asChild>
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
              {items.map((item) => {
                if (item.children?.length) {
                  return (
                    <div key={item.name} className="pt-2">
                      <div
                        className={cn(
                          "px-2 pb-1 text-xs font-semibold uppercase tracking-wide",
                          item.active ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {item.name}
                      </div>
                      <div className="grid gap-1">
                        {item.link ? (
                          <Button
                            key={`${item.link}-top`}
                            variant={item.active ? "secondary" : "ghost"}
                            size="sm"
                            className={cn("w-full justify-start", item.active ? "font-semibold" : undefined)}
                            asChild
                            onClick={() => setIsOpen(false)}
                          >
                            <Link href={item.link}>
                              {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
                              {item.name}
                            </Link>
                          </Button>
                        ) : null}
                        {item.children.map((child) => (
                          <Button
                            key={child.link}
                            variant={child.active ? "secondary" : "ghost"}
                            size="sm"
                            className={cn("w-full justify-start", child.active ? "font-semibold" : undefined)}
                            asChild
                            onClick={() => setIsOpen(false)}
                          >
                            {child.link.startsWith("/") ? (
                              <Link href={child.link}>
                                {child.icon ? <span aria-hidden="true">{child.icon}</span> : null}
                                {child.name}
                              </Link>
                            ) : (
                              <a href={child.link}>
                                {child.icon ? <span aria-hidden="true">{child.icon}</span> : null}
                                {child.name}
                              </a>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.link) {
                  return (
                    <Button
                      key={item.link}
                      variant={item.active ? "secondary" : "ghost"}
                      size="sm"
                      className={cn("w-full justify-start", item.active ? "font-semibold text-primary" : undefined)}
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.link}>
                        {item.icon ? <span aria-hidden="true" className={item.active ? "text-primary" : "text-muted-foreground"}>{item.icon}</span> : null}
                        <span className={item.active ? "text-primary" : "text-muted-foreground"}>{item.name}</span>
                      </Link>
                    </Button>
                  );
                }

                return null;
              })}
            </div>

            <div className="grid w-full gap-2 pt-2">
              {/* <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              </Button> */}
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
                    <span className="font-medium text-foreground">Besoin d&apos;aide ?</span>
                    <a href={`tel:${siteContact.phonePrimary.tel}`} className="hover:text-primary transition-colors font-mono">{siteContact.phonePrimary.display}</a>
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

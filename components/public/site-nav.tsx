"use client";

import Link from "next/link";

import { IconMenu2 } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

const NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Santé & Prévoyance",
    children: [
      { label: "Assurances Santé", href: "/sante-prevoyance/mutuelle-sante" },
      { label: "Assurances Prévoyance", href: "/sante-prevoyance/prevoyance" },
    ],
  },
  { label: "Assurance Emprunteur", href: "/assurance-emprunteur" },
  {
    label: "Portail d’informations",
    children: [
      {
        label: "Assurances Personnelles",
        children: [
          { label: "Assurance seniors", href: "/portail/assurances-personnelles/seniors" },
          { label: "Assurances santé", href: "/portail/assurances-personnelles/sante" },
          { label: "Assurances emprunteur", href: "/portail/assurances-personnelles/emprunteur" },
          { label: "Assurances auto", href: "/assurance-auto" },
          { label: "Assurances motos", href: "/assurance-moto" },
        ],
      },
      {
        label: "Assurances Entreprise",
        children: [{ label: "Assurances entreprise", href: "/portail/assurances-entreprise" }],
      },
      {
        label: "Informations Utiles",
        children: [
          { label: "Divers assurances", href: "/portail/divers-assurances" },
          { label: "Espace Juridique", href: "/espace-juridique" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        label: "Offres et Liens",
        children: [
          { label: "Articles divers", href: "/portail/articles-divers" },
          { label: "Nos Partenaires", href: "/partenaires" },
          { label: "Offres d’assurances", href: "/portail/offres" },
        ],
      },
    ],
  },
  {
    label: "Contact & Réclamations",
    children: [
      { label: "Faire une demande", href: "/contact-reclamations/demande" },
      { label: "Déposer une réclamation", href: "/contact-reclamations/reclamation" },
    ],
  },
] as const;

function DesktopNavItem({ item }: { item: NavItem }) {
  if (item.href) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link href={item.href}>{item.label}</Link>
      </Button>
    );
  }

  if (item.children?.length) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" aria-label={item.label}>
            {item.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60">
          {item.children.map((child) => (
            <MobileMenuItem key={child.label} item={child} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
}

function MobileMenuItem({ item }: { item: NavItem }) {
  if (item.href) {
    return (
      <DropdownMenuItem asChild>
        <Link href={item.href}>{item.label}</Link>
      </DropdownMenuItem>
    );
  }

  if (item.children?.length) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-60">
          {item.children.map((child) => (
            <MobileMenuItem key={child.label} item={child} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return null;
}

export function SiteNav() {
  return (
    <div className="flex items-center gap-1">
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Open menu">
              <IconMenu2 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[min(24rem,calc(100vw-2rem))]">
            {NAV.map((item) => (
              <MobileMenuItem key={item.label} item={item} />
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/blog">Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/contact-reclamations/demande">Demander un devis</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="hidden items-center gap-0.5 md:flex">
        {NAV.slice(0, 4).map((item) => (
          <DesktopNavItem key={item.label} item={item} />
        ))}
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog">Blog</Link>
        </Button>
        <DesktopNavItem item={NAV[4]!} />
      </nav>

      <div className="ml-1 flex items-center gap-1">
        <ThemeToggle />
        <Button size="sm" className="hidden lg:inline-flex" asChild>
          <Link href="/contact-reclamations/demande">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}





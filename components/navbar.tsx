"use client";

import * as React from "react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const items = [
    { name: "Accueil", link: "/" },
    { name: "Assurances", link: "/portail/offres" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contactez-nous" },
  ] as const;

  return (
    <>
      {/* Spacer: keeps page content from sliding under the fixed navbar */}
      <div className="h-12" />

      <ResizableNavbar className="fixed inset-x-0 top-0 z-50">
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
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
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
      </ResizableNavbar>
    </>
  );
};

export default Navbar;

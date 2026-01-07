"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { StickyRailLink } from "@/components/public/sticky-rail";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";

export type InnerPageNavSheetProps = {
  title: string;
  description?: string;
  links: readonly StickyRailLink[];
  className?: string;
};

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function InnerPageNavSheet({ title, description, links, className }: InnerPageNavSheetProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2", className)}>
          <PanelLeft className="size-4" aria-hidden={true} />
          Menu
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="gap-0 p-0">
        <SheetHeader className="border-b border-border/60">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description ?? "Navigation de la section"}</SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
          <ScrollArea className="-mx-2 flex-1 px-2">
            <nav className="grid gap-1">
              {links.map((l) => {
                const isActive = normalizedPathname === normalizePathname(l.href);
                return (
                  <Button
                    key={l.href}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("w-full justify-start", isActive ? "font-semibold" : undefined)}
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href={l.href} aria-current={isActive ? "page" : undefined}>
                      {l.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>

          <Separator />

          <div className="grid gap-2">
            <Button size="sm" asChild onClick={() => setOpen(false)}>
              <Link href="/demander-un-devis">Demander un devis</Link>
            </Button>
            <Button size="sm" variant="outline" asChild onClick={() => setOpen(false)}>
              <Link href="/contactez-nous">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}



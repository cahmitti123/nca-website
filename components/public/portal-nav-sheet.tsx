"use client";

import * as React from "react";
import Link from "next/link";

import { PortalNavTree } from "@/components/public/portal-nav-tree";
import { PortalSubscribeMiniForm } from "@/components/public/portal-subscribe-mini-form";
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
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";

export function PortalNavSheet({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2", className)}>
          <PanelLeft className="size-4" aria-hidden="true" />
          Menu
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[min(24rem,calc(100vw-2rem))] gap-0 p-0">
        <SheetHeader className="border-b border-border/60">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Portail d’informations</SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
          <ScrollArea className="-mx-2 flex-1 px-2">
            <PortalNavTree onNavigate={() => setOpen(false)} />
          </ScrollArea>

          <Separator />

          <PortalSubscribeMiniForm />

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



import Link from "next/link";

import { PortalNavTree } from "@/components/public/portal-nav-tree";
import { PortalSubscribeMiniForm } from "@/components/public/portal-subscribe-mini-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function PortalSidebar() {
  return (
    <Card size="sm" className="h-full border-muted/60 bg-background/70 supports-backdrop-filter:bg-background/50">
      <CardHeader className="border-b border-border/60">
        <CardTitle className="font-heading tracking-tight">Portail</CardTitle>
        <CardDescription className="text-xs">Guides, ressources & offres.</CardDescription>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <ScrollArea className="-mx-2 flex-1 px-2">
          <PortalNavTree />
        </ScrollArea>

        <Separator />

        <div className="space-y-3">
          <PortalSubscribeMiniForm className="bg-background" />
          <div className="grid gap-2">
            <Button size="sm" asChild>
              <Link href="/demander-un-devis">Demander un devis</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/contactez-nous">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}






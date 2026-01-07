import * as React from "react";
import Link from "next/link";

import { BulletList } from "@/components/public/bullet-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPortalPrevNext } from "@/lib/portal/portal-nav";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type PortalPageProps = React.PropsWithChildren<{
  path: string;
  title: string;
  description?: React.ReactNode;
  kicker?: React.ReactNode;
  highlights?: string[];
}>;

function PortalPager({ path }: { path: string }) {
  const { prev, next } = getPortalPrevNext(path);

  if (!prev && !next) return null;

  return (
    <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
      {prev ? (
        <Button variant="outline" className="h-auto justify-start gap-2 py-2" asChild>
          <Link href={prev.href}>
            <ArrowLeft className="size-4 shrink-0" aria-hidden={true} />
            <span className="min-w-0">
              <span className="text-muted-foreground block text-xs">Précédent</span>
              <span className="block truncate text-sm font-medium">{prev.label}</span>
            </span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {next ? (
        <Button variant="outline" className="h-auto justify-start gap-2 py-2 sm:justify-end" asChild>
          <Link href={next.href}>
            <span className="min-w-0 text-right">
              <span className="text-muted-foreground block text-xs">Suivant</span>
              <span className="block truncate text-sm font-medium">{next.label}</span>
            </span>
            <ArrowRight className="size-4 shrink-0" aria-hidden={true} />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export function PortalPage({
  path,
  title,
  description,
  kicker = (
    <Badge variant="secondary" className="border-primary/15 bg-primary/10 text-primary">
      Portail info
    </Badge>
  ),
  highlights,
  children,
}: PortalPageProps) {
  return (
    <div className="space-y-8">
      {/* Title/breadcrumbs are handled by the global navbar (second row). */}
      <h1 className="sr-only">{title}</h1>

      {description ? (
        <Card className="border-muted/60 bg-muted/10">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Résumé</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div className="flex flex-wrap items-center gap-2">{kicker}</div>
            <div className="text-muted-foreground max-w-prose text-pretty text-sm leading-relaxed sm:text-base">
              {description}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Highlights / Key Points */}
      {highlights?.length ? (
        <Card className="border-muted/60 bg-muted/10">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Points clés</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <BulletList items={highlights} />
          </CardContent>
        </Card>
      ) : null}

      {/* Main Page Content */}
      <div className="space-y-8">{children}</div>

      {/* Footer / Pagination */}
      <div className="space-y-6">
        <Separator />
        <PortalPager path={path} />
      </div>
    </div>
  );
}

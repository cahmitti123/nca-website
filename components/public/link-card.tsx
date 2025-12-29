import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type LinkCardProps = {
  title: string;
  description?: string;
  href: string;
  ctaLabel?: string;
  ctaVariant?: "default" | "outline" | "ghost";
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
};

export function LinkCard({
  title,
  description,
  href,
  ctaLabel = "Voir",
  ctaVariant = "outline",
  image,
  className,
}: LinkCardProps) {
  return (
    <Card className={cn("border-muted/60 py-0", className)}>
      {image ? (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            unoptimized={image.src.endsWith(".svg")}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-transparent"
          />
        </div>
      ) : null}

      <CardHeader className={cn("pb-0", image ? "pt-4" : undefined)}>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
        <Button size="sm" variant={ctaVariant} asChild>
          <Link href={href}>{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}



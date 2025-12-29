import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPexelsImageUrl } from "@/lib/pexels";
import { siteContact } from "@/lib/site-contact";
import { cn } from "@/lib/utils";
import { PEXELS_DEFAULT_LOCALE, PEXELS_DEFAULT_REVALIDATE_SECONDS } from "@/lib/stock-images";
import { BulletList } from "./bullet-list";

export type ProductLandingAction = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost";
};

export type ProductLandingCard = {
  title: string;
  description?: string;
  bullets?: string[];
  actions?: ProductLandingAction[];
};

export type ProductLandingBreadcrumb = {
  label: string;
  href?: string;
};

export type ProductLandingProps = {
  breadcrumbs?: ProductLandingBreadcrumb[];
  badges?: string[];
  title: string;
  description: string;
  image?: {
    src?: string;
    query?: string;
    alt: string;
    fallbackSrc?: string;
  };
  primaryAction?: ProductLandingAction;
  secondaryAction?: ProductLandingAction;
  tertiaryAction?: ProductLandingAction;
  mainCard: ProductLandingCard;
  sideCard?: ProductLandingCard;
  extra?: React.ReactNode;
};

function ActionButton({ action, className }: { action: ProductLandingAction; className?: string }) {
  const variant = action.variant ?? "default";
  const isExternal = action.href.startsWith("tel:") || action.href.startsWith("mailto:");

  return (
    <Button
      size="lg"
      variant={variant}
      className={className}
      asChild
    >
      {isExternal ? (
        <a href={action.href}>{action.label}</a>
      ) : (
        <Link href={action.href}>{action.label}</Link>
      )}
    </Button>
  );
}

export async function ProductLanding({
  breadcrumbs,
  badges = [],
  title,
  description,
  image,
  primaryAction = { label: "Demander un devis", href: "/demander-un-devis" },
  secondaryAction = { label: "Appeler un expert", href: `tel:${siteContact.phonePrimary.tel}`, variant: "outline" },
  tertiaryAction,
  mainCard,
  sideCard,
  extra,
}: ProductLandingProps) {
  const imageUrl = image
    ? image.src
      ? image.src
      : image.query
        ? await getPexelsImageUrl(image.query, {
            orientation: "landscape",
            size: "large",
            locale: PEXELS_DEFAULT_LOCALE,
            revalidateSeconds: PEXELS_DEFAULT_REVALIDATE_SECONDS,
          })
        : null
    : null;

  return (
    <div className="space-y-10">
      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="space-y-4">
          {breadcrumbs?.length ? (
            <nav className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              {breadcrumbs.map((c, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={`${c.label}-${c.href ?? idx}`}>
                    {c.href && !isLast ? (
                      <Link className="hover:text-foreground transition-colors" href={c.href}>
                        {c.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-foreground" : undefined}>{c.label}</span>
                    )}
                    {!isLast ? <span aria-hidden="true">/</span> : null}
                  </React.Fragment>
                );
              })}
            </nav>
          ) : null}

          {badges.length ? (
            <div className="flex flex-wrap items-center gap-2">
              <div className="border-primary/15 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1">
                <span aria-hidden="true" className="bg-primary size-2 rounded-full animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wide">{badges[0]}</span>
              </div>
              {badges.slice(1).map((b) => (
                <Badge key={b} variant="outline" className="bg-background/60">
                  {b}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="space-y-2">
            <h1 className="font-heading text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-prose text-sm leading-relaxed sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <ActionButton action={primaryAction} />
            <ActionButton action={secondaryAction} />
            {tertiaryAction ? <ActionButton action={tertiaryAction} /> : null}
          </div>
        </div>

        {image ? (
          <div className="w-full lg:flex lg:justify-end">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl lg:max-w-xl">
              <Image
                src={imageUrl ?? image.fallbackSrc ?? "/hero-placeholder.svg"}
                alt={image.alt}
                fill
                priority={false}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={image.src ? "object-contain" : "object-cover"}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">{mainCard.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {mainCard.description ? (
              <p className="text-muted-foreground text-sm leading-relaxed">{mainCard.description}</p>
            ) : null}
            {mainCard.bullets?.length ? <BulletList items={mainCard.bullets} /> : null}
            {mainCard.actions?.length ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {mainCard.actions.map((a) => (
                  <ActionButton
                    key={`${a.href}-${a.label}`}
                    action={{ ...a, variant: a.variant ?? "outline" }}
                    className="h-9 px-3 text-sm"
                  />
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {sideCard ? (
          <Card
            className={cn(
              "border-muted/60 lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-hidden",
              sideCard.actions?.length ? "" : "",
            )}
          >
            <CardHeader className="pb-0">
              <CardTitle className="text-base">{sideCard.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col gap-4 pt-4">
              <div className="min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-gutter:stable]">
                <div className="space-y-4">
                  {sideCard.description ? (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {sideCard.description}
                    </p>
                  ) : null}
                  {sideCard.bullets?.length ? <BulletList items={sideCard.bullets} /> : null}
                </div>
              </div>

              {sideCard.actions?.length ? (
                <div className="border-border/60 border-t pt-3">
                  <div className="grid gap-2">
                    {sideCard.actions.map((a) => (
                      <Button
                        key={`${a.href}-${a.label}`}
                        size="sm"
                        variant={a.variant ?? "outline"}
                        className="w-full"
                        asChild
                      >
                        {a.href.startsWith("tel:") || a.href.startsWith("mailto:") ? (
                          <a href={a.href}>{a.label}</a>
                        ) : (
                          <Link href={a.href}>{a.label}</Link>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : null}
      </div>

      {extra ? <div className="pt-2">{extra}</div> : null}
    </div>
  );
}



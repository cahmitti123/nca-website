import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { type LucideIcon, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

export type BentoFeature = {
  title: string;
  description: string;
  icon?: LucideIcon;
  colSpan?: 1 | 2;
};

export type FAQItem = {
  question: string;
  answer: string;
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
  // New Props for Radical Layout
  features?: BentoFeature[];
  faq?: FAQItem[];
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
  features,
  faq,
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
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Immersive Hero Section */}
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {breadcrumbs?.length ? (
            <nav className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wider font-medium opacity-80">
              {breadcrumbs.map((c, idx) => {
                const isLast = idx === (breadcrumbs.length || 0) - 1;
                return (
                  <React.Fragment key={`${c.label}-${c.href ?? idx}`}>
                    {c.href && !isLast ? (
                      <Link className="hover:text-primary transition-colors" href={c.href}>
                        {c.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-foreground" : undefined}>{c.label}</span>
                    )}
                    {!isLast ? <span aria-hidden="true" className="text-border">/</span> : null}
                  </React.Fragment>
                );
              })}
            </nav>
          ) : null}

          <div className="space-y-6">
            {badges.length ? (
              <div className="flex flex-wrap items-center gap-3">
                <div className="border-primary/20 bg-primary/5 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm">
                  <span aria-hidden="true" className="bg-primary size-2 rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{badges[0]}</span>
                </div>
                {badges.slice(1).map((b) => (
                  <Badge key={b} variant="outline" className="bg-background/80 backdrop-blur-sm border-border/60">
                    {b}
                  </Badge>
                ))}
              </div>
            ) : null}

            <h1 className="font-heading text-balance text-5xl font-extrabold tracking-tight sm:text-6xl text-foreground leading-[1.1]">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-prose text-lg leading-relaxed sm:text-xl">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap pt-4">
            {primaryAction && <ActionButton action={{ ...primaryAction, variant: "default" }} className="h-12 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300" />}
            {secondaryAction && <ActionButton action={{ ...secondaryAction, variant: "outline" }} className="h-12 px-8 text-base bg-background/50 backdrop-blur border-border/60 hover:bg-background/80" />}
            {tertiaryAction && <ActionButton action={tertiaryAction} className="h-12" />}
          </div>
        </div>

        {image ? (
          <div className="w-full lg:flex lg:justify-end animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <div className="relative aspect-square lg:aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-muted/30 to-muted/10 ring-1 ring-border/50 shadow-2xl group mx-auto">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-50" />
              <Image
                src={imageUrl ?? image.fallbackSrc ?? "/hero-placeholder.svg"}
                alt={image.alt}
                fill
                priority={true}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={cn(
                  image.src ? "object-contain p-12 drop-shadow-2xl" : "object-cover",
                  "transition-transform duration-700 ease-out group-hover:scale-105"
                )}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-16">
         <div className="space-y-16">
           {/* 2. Bento Features (or Standard Card) */}
            {features?.length ? (
              <section className="space-y-6">
                 <div className="space-y-2">
                   <h2 className="text-2xl font-bold tracking-tight">Ce que nous couvrons</h2>
                   <p className="text-muted-foreground text-lg">{mainCard.description}</p>
                 </div>
                 <div className="grid gap-4 sm:grid-cols-2">
                    {features.map((feature, i) => (
                      <Card key={i} className={cn("border-muted/60 bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300", feature.colSpan === 2 ? "sm:col-span-2" : "")}>
                         <CardHeader className="pb-3">
                           {feature.icon ? (
                             <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                               <feature.icon className="size-5" />
                             </div>
                           ) : null}
                           <CardTitle className="text-lg">{feature.title}</CardTitle>
                         </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </section>
            ) : (
             <Card className="border-muted/60 shadow-sm">
                <CardHeader className="pb-4 border-b border-border/40 bg-muted/10">
                  <CardTitle className="text-xl">{mainCard.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {mainCard.description ? (
                    <p className="text-muted-foreground text-sm leading-relaxed">{mainCard.description}</p>
                  ) : null}
                  
                  {mainCard.bullets?.length ? (
                    <div className="rounded-xl border border-border/50 bg-muted/20 p-6">
                      <BulletList items={mainCard.bullets} columns={2} />
                    </div>
                  ) : null}

                  {mainCard.actions?.length ? (
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap pt-2">
                      {mainCard.actions.map((a) => (
                        <ActionButton
                          key={`${a.href}-${a.label}`}
                          action={{ ...a, variant: a.variant ?? "outline" }}
                          className="h-9 px-4 text-sm"
                        />
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            )}

            {/* 3. Detailed Prose Content */}
            {extra ? (
              <div className="rich-content prose prose-gray dark:prose-invert max-w-none pt-4">
                 {extra}
              </div>
            ) : null}

             {/* 4. FAQ Section */}
             {faq?.length ? (
               <section className="space-y-6 pt-8 border-t border-border/40">
                 <div className="flex items-center gap-3">
                   <div className="bg-primary/10 p-2 rounded-full text-primary"><HelpCircle className="size-5" /></div>
                   <h2 className="text-2xl font-bold tracking-tight">Questions fréquentes</h2>
                 </div>
                 <Accordion type="single" collapsible className="w-full">
                    {faq.map((item, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                 </Accordion>
               </section>
             ) : null}
         </div>

         {/* 5. Sticky Side Card */}
         <aside className="space-y-8">
            {sideCard ? (
              <Card
                className={cn(
                  "border-muted/60 lg:sticky lg:top-28 lg:self-start shadow-xl shadow-primary/5 bg-background/80 backdrop-blur-md overflow-hidden",
                )}
              >
                <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
                <CardHeader className="pb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Notre conseil</div>
                  <CardTitle className="text-xl">{sideCard.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 pt-2">
                  <div className="space-y-4">
                    {sideCard.description ? (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {sideCard.description}
                      </p>
                    ) : null}
                    {sideCard.bullets?.length ? <BulletList items={sideCard.bullets} /> : null}
                  </div>

                  {sideCard.actions?.length ? (
                    <div className="grid gap-3 pt-2">
                      {sideCard.actions.map((a) => (
                        <Button
                          key={`${a.href}-${a.label}`}
                          size="lg"
                          variant={a.variant ?? "default"}
                          className="w-full shadow-md font-semibold"
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
                  ) : null}
                </CardContent>
              </Card>
            ) : null}
            
            {/* Trust Signals in Sidebar */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 space-y-4 lg:sticky lg:top-[30rem]">
                <h4 className="font-semibold text-sm">Pourquoi nous ?</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                   <li className="flex gap-2">
                      <span className="text-primary">✓</span> Comparaison objective
                   </li>
                   <li className="flex gap-2">
                      <span className="text-primary">✓</span> Courtier local (77)
                   </li>
                   <li className="flex gap-2">
                      <span className="text-primary">✓</span> Service sinistre dédié
                   </li>
                </ul>
            </div>
         </aside>
      </div>
    </div>
  );
}



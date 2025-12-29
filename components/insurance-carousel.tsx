import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { GridBackground } from "@/components/ui/grid-background";
import { insuranceProducts } from "@/lib/insurance-products";
import { ShieldCheck } from "lucide-react";

export default function InsuranceCarousel() {
  const cards = insuranceProducts.slice(0, 6);
  const items = cards.map((c, index) => (
    <Card
      key={c.href}
      index={index}
      card={{
        category: c.category,
        title: c.title,
        src: c.illustrationSrc ?? c.fallbackCoverSrc,
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">{c.description}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="sm" asChild>
                <Link href={c.href}>En savoir plus</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/demander-un-devis">Demander un devis</Link>
              </Button>
            </div>
          </div>
        ),
      }}
    />
  ));

  return (
    <section className="space-y-10 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border">
          <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Nos assurances
          </h2>
          <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
            Un aperçu rapide de nos principales solutions. Cliquez pour voir le détail.
          </p>
        </div>
      </div>

      <GridBackground className="overflow-hidden rounded-2xl border bg-muted/10">
        <Carousel items={items} />
      </GridBackground>

      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap">
        <Button asChild>
          <Link href="/demander-un-devis">Je demande mon devis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/portail/offres">Voir toutes les offres</Link>
        </Button>
      </div>
    </section>
  );
}



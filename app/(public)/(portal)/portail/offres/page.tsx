import type { Metadata } from "next";
import Link from "next/link";

import { LinkCard } from "@/components/public/link-card";
import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { insuranceProducts } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Offres d’assurances | Portail | Net Courtage Assurances",
  description: "Offres d’assurances et liens utiles.",
};

export default function OffresPage() {
  return (
    <PageShell>
      <PageIntro
        title="Offres d’assurances"
        description={
          <>
            Découvrez nos offres principales et demandez un devis gratuit. Nous vous aidons à
            comparer les garanties, à comprendre les options, puis à choisir une couverture cohérente
            avec votre situation et votre budget.
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insuranceProducts.map((p) => (
          <LinkCard
            key={p.key}
            title={p.title}
            description={p.description}
            href={p.href}
            ctaLabel="Voir"
            image={{
              src: p.illustrationSrc ?? p.fallbackCoverSrc,
              alt: `Illustration : ${p.title}`,
            }}
          />
        ))}
      </div>

      <Button asChild>
        <Link href="/demander-un-devis">Demander un devis</Link>
      </Button>
    </PageShell>
  );
}





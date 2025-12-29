import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkCard } from "@/components/public/link-card";
import { getInsuranceProduct } from "@/lib/insurance-products";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Santé & Prévoyance | Net Courtage Assurances",
  description:
    "Assurances santé et prévoyance : des solutions personnalisées pour protéger votre santé et vos proches.",
};

export default function SantePrevoyancePage() {
  const sante = getInsuranceProduct("mutuelle-sante");
  const prev = getInsuranceProduct("assurance-prevoyance");

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Conseil personnalisé</Badge>
          <Badge variant="outline">Devis gratuit</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Santé &amp; Prévoyance</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          Protégez votre santé et anticipez les imprévus. Nous vous aidons à choisir une mutuelle
          adaptée (famille, senior, travailleurs indépendants) et des garanties de prévoyance
          cohérentes avec votre situation.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/contact-reclamations/demande">Demander un devis</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`tel:${siteContact.phonePrimary.tel}`}>Appeler un expert</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <LinkCard
          title="Assurances Santé"
          description="Une couverture sur mesure pour vos soins courants, hospitalisation, dentaire et optique."
          href="/sante-prevoyance/mutuelle-sante"
          ctaLabel="Voir la page"
          image={{
            src: sante?.illustrationSrc ?? "/cover-sante.svg",
            alt: "Assurances santé",
          }}
        />

        <LinkCard
          title="Assurances Prévoyance"
          description="Des solutions pour protéger vos proches en cas d'arrêt, d'invalidité ou de décès."
          href="/sante-prevoyance/prevoyance"
          ctaLabel="Voir la page"
          image={{
            src: prev?.illustrationSrc ?? prev?.fallbackCoverSrc ?? "/cover-prevoyance.svg",
            alt: "Assurances prévoyance",
          }}
        />
      </div>
    </div>
  );
}





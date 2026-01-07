import type { Metadata } from "next";
import Link from "next/link";

import { BulletList } from "@/components/public/bullet-list";
import { ContactCtaCard } from "@/components/public/contact-cta-card";
import { LinkCard } from "@/components/public/link-card";
import { PortalPage } from "@/components/public/portal-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insuranceProducts } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Offres d’assurances | Portail | Net Courtage Assurances",
  description: "Offres d’assurances et liens utiles.",
};

export default function OffresPage() {
  return (
    <PortalPage
      path="/portail/offres"
      title="Offres d’assurances"
      description={
        <>
          Découvrez nos offres principales et demandez un devis gratuit. Nous vous aidons à comparer
          les garanties, à comprendre les options, puis à choisir une couverture cohérente avec votre
          situation et votre budget.
        </>
      }
      highlights={[
        "Accès direct à nos principales offres et pages détaillées.",
        "Conseils pour comparer garanties, franchises et exclusions.",
        "Demande de devis simple, avec accompagnement si besoin.",
      ]}
    >
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Nos offres</h2>
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
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Bien comparer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <BulletList
              items={[
                "Clarifiez vos priorités (budget, niveau de protection, usage).",
                "Comparez garanties, exclusions et franchises, pas seulement le prix.",
                "Validez les délais (carence, résiliation, prise d’effet) avant de souscrire.",
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link href="/portail">Guides du portail</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/blog">Lire le blog</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <ContactCtaCard
          className="lg:col-span-1"
          title="Besoin d’un conseil ?"
          description="Décrivez votre besoin : on vous aide à cadrer les garanties utiles."
          primaryAction={{ label: "Demander un devis", href: "/contact-reclamations/demande" }}
          secondaryAction={{ label: "Contactez-nous", href: "/contactez-nous", variant: "outline" }}
        />
      </section>
    </PortalPage>
  );
}





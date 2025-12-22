import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { GridBackground } from "@/components/ui/grid-background";
import { ShieldCheck } from "lucide-react";

const cards = [
  {
    category: "Assurances personnelles",
    title: "Mutuelle Santé",
    src: "/cover-sante.svg",
    href: "/sante-prevoyance/mutuelle-sante",
    description:
      "Une couverture santé sur mesure, adaptée à votre budget et à vos priorités.",
  },
  {
    category: "Assurances personnelles",
    title: "Assurance Emprunteur",
    src: "/cover-emprunteur.svg",
    href: "/assurance-emprunteur",
    description:
      "Sécurisez votre crédit immobilier avec des garanties adaptées à votre projet.",
  },
  {
    category: "Assurances personnelles",
    title: "Assurance Auto",
    src: "/cover-auto.svg",
    href: "/assurance-auto",
    description: "Des options ajustées à votre véhicule et votre usage.",
  },
  {
    category: "Assurances personnelles",
    title: "Assurance Moto",
    src: "/cover-moto.svg",
    href: "/assurance-moto",
    description: "Comparez les garanties et trouvez une protection adaptée.",
  },
  {
    category: "Assurances personnelles",
    title: "Assurance Prévoyance",
    src: "/cover-prevoyance.svg",
    href: "/sante-prevoyance/prevoyance",
    description: "Anticipez l’imprévu et protégez vos proches.",
  },
  {
    category: "Assurances entreprise",
    title: "Garantie Décennale",
    src: "/cover-decennale.svg",
    href: "/garantie-decennale",
    description: "Sécurisez vos travaux sur le long terme avec une couverture adaptée.",
  },
] as const;

export default function InsuranceCarousel() {
  const items = cards.map((c, index) => (
    <Card
      key={c.href}
      index={index}
      card={{
        category: c.category,
        title: c.title,
        src: c.src,
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">{c.description}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="sm" asChild>
                <Link href={c.href}>En savoir plus</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/contact-reclamations/demande">Demander un devis</Link>
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
          <Link href="/contact-reclamations/demande">Je demande mon devis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/portail/offres">Voir toutes les offres</Link>
        </Button>
      </div>
    </section>
  );
}



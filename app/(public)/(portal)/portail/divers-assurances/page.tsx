import type { Metadata } from "next";
import Link from "next/link";

import { BulletList } from "@/components/public/bullet-list";
import { ContactCtaCard } from "@/components/public/contact-cta-card";
import { PortalPage } from "@/components/public/portal-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Divers assurances | Portail | Net Courtage Assurances",
  description: "Informations utiles et articles divers sur les assurances.",
};

export default function DiversAssurancesPage() {
  return (
    <PortalPage
      path="/portail/divers-assurances"
      title="Divers assurances"
      description="Informations utiles, rappels et liens pratiques pour mieux comprendre les assurances."
      highlights={[
        "Rappels clés pour lire un contrat : garanties, exclusions, franchises, délais.",
        "Ressources complémentaires : articles, documents, informations réglementaires.",
        "Un besoin précis ? Démarrez une demande et on vous recontacte rapidement.",
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Comprendre &amp; comparer</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <BulletList
              items={[
                "Garanties, franchises, exclusions : les points à vérifier.",
                "Les informations utiles avant une demande de devis.",
                "Choisir le bon niveau de protection au bon prix.",
              ]}
            />
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Aller plus loin</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
            <Button size="sm" variant="outline" asChild>
              <Link href="/blog">Nos articles</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/espace-juridique">Espace juridique</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contact-reclamations/demande">Demander un devis</Link>
            </Button>
          </CardContent>
        </Card>

        <ContactCtaCard
          className="sm:col-span-2 lg:col-span-1"
          title="Besoin d’un conseil ?"
          description="Expliquez votre situation : nous vous orientons vers la solution la plus adaptée."
          primaryAction={{ label: "Contactez-nous", href: "/contactez-nous", variant: "outline" }}
          secondaryAction={null}
        />
      </div>
    </PortalPage>
  );
}





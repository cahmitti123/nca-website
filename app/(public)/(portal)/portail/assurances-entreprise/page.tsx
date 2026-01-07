import type { Metadata } from "next";
import Link from "next/link";

import { ContactCtaCard } from "@/components/public/contact-cta-card";
import { PortalPage } from "@/components/public/portal-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Assurances entreprise | Portail | Net Courtage Assurances",
  description: "Solutions d’assurance pour les entreprises et les professionnels.",
};

export default function EntreprisePage() {
  return (
    <PortalPage
      path="/portail/assurances-entreprise"
      title="Assurances entreprise"
      description={
        <>
          Nous accompagnons les professionnels sur leurs besoins d’assurance. Décrivez votre activité
          et vos chantiers : nous vous orientons vers une solution adaptée.
        </>
      }
      highlights={[
        "Solutions adaptées aux professionnels, selon votre activité et vos risques.",
        "Aide au cadrage : garanties utiles, justificatifs, délais et franchises.",
        "Démarrez une demande de devis pour être recontacté rapidement.",
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Assurance décennale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Une couverture essentielle pour les professionnels du bâtiment.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/assurance-decennale">Voir la page</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Demander un devis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Décrivez votre besoin, nous vous recontactons rapidement.
            </p>
            <Button size="sm" asChild>
              <Link href="/contact-reclamations/demande">Ouvrir le formulaire</Link>
            </Button>
          </CardContent>
        </Card>

        <ContactCtaCard
          className="sm:col-span-2 lg:col-span-1"
          title="Besoin d’un conseil ?"
          description="Nous vous aidons à cadrer les garanties utiles et les justificatifs."
          primaryAction={{ label: "Contactez-nous", href: "/contactez-nous", variant: "outline" }}
          secondaryAction={null}
        />
      </div>
    </PortalPage>
  );
}





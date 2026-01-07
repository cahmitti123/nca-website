import type { Metadata } from "next";
import Link from "next/link";

import { PortalPage } from "@/components/public/portal-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Assurance seniors | Portail | Net Courtage Assurances",
  description: "Informations et conseils pour choisir une assurance adaptée aux seniors.",
};

export default function SeniorsPage() {
  return (
    <PortalPage
      path="/portail/assurances-personnelles/seniors"
      title="Assurance seniors"
      description={
        <>
          Des solutions de mutuelle santé adaptées aux besoins des seniors : hospitalisation, optique,
          dentaire et soins courants, selon vos priorités et votre budget.
        </>
      }
      highlights={[
        "Niveaux de garanties ajustés (hospitalisation, dentaire, optique, soins courants).",
        "Devis gratuit et accompagnement pour choisir une couverture cohérente.",
        "Démarrez une demande en ligne si vous avez un besoin précis.",
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Complémentaire santé senior</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Une couverture ajustée à vos besoins, avec un devis gratuit.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/complementaire-sante-senior">Voir la page</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Démarrer une demande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Décrivez votre situation : nous vous recontactons rapidement.
            </p>
            <Button size="sm" asChild>
              <Link href="/demander-un-devis-de-mutuelle-sante-pour-seniors">
                Demander un devis
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PortalPage>
  );
}





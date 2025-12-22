import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Assurance seniors | Portail | Net Courtage Assurances",
  description: "Informations et conseils pour choisir une assurance adaptée aux seniors.",
};

export default function SeniorsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Assurance seniors</h1>
        <p className="text-muted-foreground text-sm">
          Des solutions de mutuelle santé adaptées aux besoins des seniors : hospitalisation,
          optique, dentaire et soins courants, selon vos priorités et votre budget.
        </p>
      </div>

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
    </div>
  );
}





import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Assurance Auto | Net Courtage Assurances",
  description:
    "Assurance auto : comparez les offres et trouvez la formule adaptée (tiers, tous risques, options).",
};

export default function AssuranceAutoPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Auto</Badge>
          <Badge variant="outline">Tarifs compétitifs</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Assurance Auto</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          Trouver une assurance auto au bon tarif peut sembler complexe. Nous vous aidons à
          comparer les offres et à choisir une formule adaptée à votre véhicule, votre usage et
          votre budget.
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

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Formules &amp; options</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Tiers, tiers étendu, tous risques.</li>
              <li>Assistance, véhicule de remplacement, bris de glace.</li>
              <li>Conducteur principal, jeune conducteur, bonus/malus.</li>
              <li>Choix des franchises et niveau de protection.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Conseil</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Nous cherchons l’équilibre entre garanties utiles et budget, selon votre situation.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





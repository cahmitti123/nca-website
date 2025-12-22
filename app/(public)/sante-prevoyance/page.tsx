import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Santé & Prévoyance | Net Courtage Assurances",
  description:
    "Assurances santé et prévoyance : des solutions personnalisées pour protéger votre santé et vos proches.",
};

export default function SantePrevoyancePage() {
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
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Assurances Santé</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Une couverture sur mesure pour vos soins courants, hospitalisation, dentaire et
              optique.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/sante-prevoyance/mutuelle-sante">Voir la page</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Assurances Prévoyance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Des solutions pour protéger vos proches en cas d’arrêt, d’invalidité ou de décès.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/sante-prevoyance/prevoyance">Voir la page</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





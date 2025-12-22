import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Assurance Emprunteur | Net Courtage Assurances",
  description:
    "Assurance emprunteur : sécurisez votre crédit immobilier avec des garanties adaptées à votre situation.",
};

export default function AssuranceEmprunteurPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Crédit immobilier</Badge>
          <Badge variant="outline">Protection</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Assurance Emprunteur</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          L’assurance emprunteur protège votre prêt et votre famille en cas d’aléas (décès,
          invalidité, incapacité). Nous comparons les offres pour vous aider à trouver une
          protection cohérente avec votre budget et votre profil.
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
            <CardTitle className="text-base">Points clés</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Garanties : décès, PTIA, ITT, IPT (selon les contrats).</li>
              <li>Choix du niveau de couverture et des quotités.</li>
              <li>Analyse de votre situation (âge, profession, projet, antécédents).</li>
              <li>Accompagnement dans la compréhension du contrat.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Objectif</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Trouver la meilleure assurance emprunteur pour votre crédit, sans compromis sur les
            garanties essentielles.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





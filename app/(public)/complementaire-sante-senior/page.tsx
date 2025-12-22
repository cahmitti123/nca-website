import type { Metadata } from "next";
import Link from "next/link";

import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Complémentaire santé senior | Net Courtage Assurances",
  description:
    "Complémentaire santé senior : une couverture adaptée (hospitalisation, dentaire, optique) avec devis gratuit.",
};

export default function ComplementaireSanteSeniorPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Senior</Badge>
          <Badge variant="outline">Mutuelle santé</Badge>
          <Badge variant="outline">Devis gratuit</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Complémentaire santé senior</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          Nous vous aidons à choisir une complémentaire santé senior adaptée à vos besoins et à
          votre budget (hospitalisation, dentaire, optique). Objectif : une couverture claire et
          utile, sans superflu.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/sante-prevoyance/mutuelle-sante">Voir la mutuelle santé</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`tel:${siteContact.phonePrimary.tel}`}>Appeler un expert</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Ce que nous optimisons</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Hospitalisation : frais, honoraires, chambre particulière (selon contrat).</li>
              <li>Optique : renforts et plafonds adaptés.</li>
              <li>Dentaire : soins, prothèses, implants selon vos priorités.</li>
              <li>Soins courants : consultations, pharmacie, analyses.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Demander un devis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Remplissez le formulaire : nous vous recontactons pour affiner vos besoins.
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/contact-reclamations/demande">Formulaire général</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Formulaire mutuelle santé (senior)</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <QuoteRequestForm initialInsuranceType="Assurances Santé" lockInsuranceType />
        </CardContent>
      </Card>
    </div>
  );
}



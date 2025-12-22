import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Garantie Décennale | Net Courtage Assurances",
  description:
    "Garantie décennale : protégez vos travaux de construction sur le long terme avec une couverture adaptée.",
};

export default function GarantieDecennalePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Construction</Badge>
          <Badge variant="outline">Décennale</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Garantie Décennale</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          La garantie décennale est essentielle pour les professionnels du bâtiment. Nous vous
          accompagnons pour choisir une couverture adaptée à votre activité et à vos chantiers.
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
            <CardTitle className="text-base">Ce que nous cadrons</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Votre métier et le périmètre d’activité.</li>
              <li>Le chiffre d’affaires et la zone d’intervention.</li>
              <li>Les garanties et exclusions, selon vos chantiers.</li>
              <li>La mise en conformité des justificatifs.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Demande rapide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Décrivez votre activité et recevez une proposition adaptée.
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/contact-reclamations/demande">Faire une demande</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





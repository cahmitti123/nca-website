import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Divers assurances | Portail | Net Courtage Assurances",
  description: "Informations utiles et articles divers sur les assurances.",
};

export default function DiversAssurancesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Divers assurances</h1>
        <p className="text-muted-foreground text-sm">
          Informations utiles, rappels et liens pratiques pour mieux comprendre les assurances.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Comprendre &amp; comparer</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Garanties, franchises, exclusions : les points à vérifier.</li>
              <li>Les informations utiles avant une demande de devis.</li>
              <li>Choisir le bon niveau de protection au bon prix.</li>
            </ul>
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

        <Card className="border-muted/60 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Besoin d’un conseil ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Expliquez votre situation : nous vous orientons vers la solution la plus adaptée.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/contactez-nous">Contactez-nous</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





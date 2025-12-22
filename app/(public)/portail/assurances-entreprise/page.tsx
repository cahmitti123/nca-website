import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Assurances entreprise | Portail | Net Courtage Assurances",
  description: "Solutions d’assurance pour les entreprises et les professionnels.",
};

export default function EntreprisePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Assurances entreprise</h1>
        <p className="text-muted-foreground text-sm">
          Nous accompagnons les professionnels sur leurs besoins d’assurance. Décrivez votre
          activité et vos chantiers : nous vous orientons vers une solution adaptée.
        </p>
      </div>

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

        <Card className="border-muted/60 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Besoin d’un conseil ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Nous vous aidons à cadrer les garanties utiles et les justificatifs.
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





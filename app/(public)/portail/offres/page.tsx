import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Offres d’assurances | Portail | Net Courtage Assurances",
  description: "Offres d’assurances et liens utiles.",
};

export default function OffresPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Offres d’assurances</h1>
        <p className="text-muted-foreground text-sm">
          Découvrez nos offres principales et demandez un devis gratuit.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Mutuelle Santé</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Button size="sm" variant="outline" asChild>
              <Link href="/sante-prevoyance/mutuelle-sante">Voir</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Emprunteur</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Button size="sm" variant="outline" asChild>
              <Link href="/assurance-emprunteur">Voir</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Auto</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Button size="sm" variant="outline" asChild>
              <Link href="/assurance-auto">Voir</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Button asChild>
        <Link href="/contact-reclamations/demande">Demander un devis</Link>
      </Button>
    </div>
  );
}





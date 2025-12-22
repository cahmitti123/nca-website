import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact & Réclamations | Net Courtage Assurances",
  description: "Faire une demande de devis ou déposer une réclamation.",
};

export default function ContactReclamationsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Contact &amp; Réclamations</h1>
        <p className="text-muted-foreground text-sm">
          Choisissez le type de demande pour être orienté vers le bon formulaire.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Faire une demande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Demande de devis, question, ou besoin d’un conseil.
            </p>
            <Button size="sm" asChild>
              <Link href="/contact-reclamations/demande">Ouvrir le formulaire</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Déposer une réclamation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Partagez votre réclamation afin que nous puissions vous recontacter.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/contact-reclamations/reclamation">Ouvrir le formulaire</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





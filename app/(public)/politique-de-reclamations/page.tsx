import type { Metadata } from "next";
import Link from "next/link";

import { ComplaintForm } from "@/components/forms/complaint-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Politique de réclamations | Net Courtage Assurances",
  description:
    "Déposer une réclamation auprès de Net Courtage Assurances : sélection du service concerné et formulaire dédié.",
};

export default function PolitiqueDeReclamationsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Politique de réclamations</h1>
        <p className="text-muted-foreground text-sm">
          Chez Net Courtage Assurances, la satisfaction de nos clients est notre priorité. Nous
          nous engageons à répondre efficacement à toute demande ou réclamation.
        </p>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Formulaire de réclamation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <p className="text-muted-foreground text-sm">
            Sélectionnez le service concerné, laissez vos coordonnées, puis décrivez votre
            réclamation. Nous vous recontacterons rapidement.
          </p>
          <ComplaintForm />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild variant="outline">
          <Link href="/services-clients-reclamations">Services clients &amp; réclamations</Link>
        </Button>
        <Button asChild>
          <Link href="/contact-reclamations/demande">Faire une demande</Link>
        </Button>
      </div>
    </div>
  );
}



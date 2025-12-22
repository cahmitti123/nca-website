import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplaintForm } from "./complaint-form";

export const metadata: Metadata = {
  title: "Déposer une réclamation | Net Courtage Assurances",
  description: "Déposez une réclamation, nous vous recontacterons rapidement.",
};

export default function ReclamationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Déposer une réclamation</h1>
        <p className="text-muted-foreground text-sm">
          Décrivez votre situation afin que nous puissions traiter votre demande.
        </p>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Formulaire de réclamation</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ComplaintForm />
        </CardContent>
      </Card>
    </div>
  );
}





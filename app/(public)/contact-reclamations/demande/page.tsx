import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuoteRequestForm } from "./quote-request-form";

export const metadata: Metadata = {
  title: "Demander un devis | Net Courtage Assurances",
  description: "Demandez un devis gratuit et sans engagement.",
};

export default function DemandePage() {
  return (
    <div className="space-y-8 py-24">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Demander un devis</h1>
        <p className="text-muted-foreground text-sm">
          Remplissez le formulaire et un conseiller vous recontactera rapidement.
        </p>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Formulaire express</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <QuoteRequestForm />
        </CardContent>
      </Card>
    </div>
  );
}





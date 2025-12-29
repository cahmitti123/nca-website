import type { Metadata } from "next";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { QuoteRequestForm } from "./quote-request-form";

export const metadata: Metadata = {
  title: "Demander un devis | Net Courtage Assurances",
  description: "Demandez un devis gratuit et sans engagement.",
};

export default function DemandePage() {
  return (
    <PageShell className="space-y-10">
      <PageIntro
        align="center"
        kicker={
          <Badge variant="secondary" className="border-primary/15 bg-primary/10 text-primary">
            Devis gratuit
          </Badge>
        }
        title="Obtenez votre devis personnalisé"
        description="Remplissez ce formulaire en quelques instants. Un expert NCA étudiera votre dossier et vous contactera sous 24h."
      />

      <Card className="border-muted/60 overflow-hidden">
        <div
          aria-hidden="true"
          className="h-1.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
        />
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Formulaire</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <QuoteRequestForm />
          <div className="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-xs">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Vos informations sont confidentielles.
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}





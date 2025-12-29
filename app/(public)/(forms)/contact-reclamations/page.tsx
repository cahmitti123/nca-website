import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, MessageSquareText } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Réclamations | Net Courtage Assurances",
  description: "Faire une demande de devis ou déposer une réclamation.",
};

export default function ContactReclamationsPage() {
  return (
    <PageShell>
      <PageIntro
        align="center"
        kicker={
          <Badge variant="secondary" className="border-primary/15 bg-primary/10 text-primary">
            Contact
          </Badge>
        }
        title="Contact & Réclamations"
        description="Choisissez le type de demande pour être orienté vers le bon formulaire."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-muted/60 overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                <MessageSquareText className="size-4" aria-hidden="true" />
              </span>
              Faire une demande
            </CardTitle>
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

        <Card className="border-muted/60 overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                <AlertTriangle className="size-4" aria-hidden="true" />
              </span>
              Déposer une réclamation
            </CardTitle>
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
    </PageShell>
  );
}





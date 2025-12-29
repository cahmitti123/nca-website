import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Assurances santé | Portail | Net Courtage Assurances",
  description: "Informations utiles sur l’assurance santé et les mutuelles.",
};

export default function PortailSantePage() {
  return (
    <PageShell>
      <PageIntro
        title="Assurances santé"
        description="Pour une présentation complète, consultez notre page mutuelle santé."
      />

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Mutuelle Santé</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <p className="text-muted-foreground text-sm">
            Couverture sur mesure (soins courants, hospitalisation, dentaire, optique).
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/sante-prevoyance/mutuelle-sante">Voir la page</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact-reclamations/demande">Demander un devis</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}





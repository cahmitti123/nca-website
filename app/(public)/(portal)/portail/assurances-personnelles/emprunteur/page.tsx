import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Assurances emprunteur | Portail | Net Courtage Assurances",
  description: "Informations utiles sur l’assurance emprunteur.",
};

export default function PortailEmprunteurPage() {
  return (
    <PageShell>
      <PageIntro
        title="Assurances emprunteur"
        description="Pour une présentation complète, consultez notre page assurance emprunteur."
      />

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Assurance Emprunteur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <p className="text-muted-foreground text-sm">
            Protection du crédit immobilier (décès, invalidité, incapacité) selon les contrats.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/assurance-emprunteur">Voir la page</Link>
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





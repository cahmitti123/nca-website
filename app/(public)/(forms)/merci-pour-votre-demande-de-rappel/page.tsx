import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Merci | Net Courtage Assurances",
  description: "Merci pour votre demande. Un conseiller vous recontactera rapidement.",
};

export default function MerciPourVotreDemandeDeRappelPage() {
  return (
    <PageShell>
      <PageIntro
        title="Merci"
        description="Votre demande a bien été prise en compte. Un conseiller vous recontactera rapidement."
      />

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Et maintenant ?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
          <Button asChild>
            <Link href="/contact-reclamations/demande">Faire une autre demande</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/portail/offres">Voir nos offres</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/">Retour à l’accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}



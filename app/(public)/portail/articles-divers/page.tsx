import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Articles divers | Portail | Net Courtage Assurances",
  description: "Articles divers et ressources.",
};

export default function ArticlesDiversPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Articles divers</h1>
        <p className="text-muted-foreground text-sm">
          Retrouvez des conseils et des contenus utiles autour de l’assurance. Nos articles vous
          aident à mieux comprendre les garanties, les démarches et les points de vigilance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Blog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Consultez nos dernières publications et ressources.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/blog">Voir le blog</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Demander un devis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Une question ou un besoin précis ? Faites une demande et on vous recontacte.
            </p>
            <Button size="sm" asChild>
              <Link href="/contact-reclamations/demande">Ouvrir le formulaire</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





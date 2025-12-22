import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Portail d’informations | Net Courtage Assurances",
  description: "Informations utiles et ressources sur les assurances.",
};

export default function PortailPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Portail d’informations</h1>
        <p className="text-muted-foreground text-sm">
          Ressources et contenus pour mieux comprendre les assurances (particuliers et
          professionnels).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Assurances Personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Seniors, santé, emprunteur, auto et moto.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/portail/assurances-personnelles/seniors">Explorer</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Assurances Entreprise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">Solutions pour les professionnels.</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/portail/assurances-entreprise">Explorer</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Blog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Actualités et informations utiles en assurance.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/blog">Voir les articles</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





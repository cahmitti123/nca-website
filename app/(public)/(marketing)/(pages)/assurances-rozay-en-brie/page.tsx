import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Assurances à Rozay-en-Brie | Net Courtage Assurances",
  description:
    "Net Courtage Assurances (NCA), courtier en assurances à Rozay-en-Brie : devis gratuit, accompagnement personnalisé.",
};

export default function AssurancesRozayEnBriePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Rozay-en-Brie</Badge>
          <Badge variant="outline">Île-de-France</Badge>
          <Badge variant="outline">Devis gratuit</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Assurances à Rozay-en-Brie</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          Net Courtage Assurances (NCA) est basé à Rozay-en-Brie. Nous vous accompagnons pour
          comparer et souscrire des solutions adaptées à votre situation (particuliers et
          professionnels).
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/demander-un-devis">Demander un devis</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`tel:${siteContact.phonePrimary.tel}`}>Appeler un expert</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Nos solutions principales</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Mutuelle santé : couverture sur mesure (dentaire, optique, hospitalisation).</li>
              <li>Assurance emprunteur : protection du crédit immobilier (selon contrats).</li>
              <li>Auto &amp; moto : garanties ajustées à votre usage et votre budget.</li>
              <li>Prévoyance : protection en cas d’arrêt, invalidité ou décès.</li>
              <li>Décennale : couverture adaptée aux professionnels du bâtiment.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Coordonnées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm text-muted-foreground">
            <div>{siteContact.address}</div>
            <div>
              <a className="hover:text-foreground transition-colors" href={`tel:${siteContact.phonePrimary.tel}`}>
                {siteContact.phonePrimary.display}
              </a>{" "}
              ·{" "}
              <a className="hover:text-foreground transition-colors" href={`tel:${siteContact.phoneSecondary.tel}`}>
                {siteContact.phoneSecondary.display}
              </a>
            </div>
            <div>
              <a className="hover:text-foreground transition-colors" href={`mailto:${siteContact.email}`}>
                {siteContact.email}
              </a>
            </div>
            <div>Horaires : {siteContact.hours.display}</div>
            <div>
              <a
                className="underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
                href={siteContact.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Google Maps
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



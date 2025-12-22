import type { Metadata } from "next";
import Link from "next/link";

import Contact from "@/components/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Contactez-nous | Net Courtage Assurances",
  description:
    "Contactez Net Courtage Assurances (NCA) pour une demande de devis, une question ou une réclamation.",
};

export default function ContactezNousPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Contactez-nous</h1>
        <p className="text-muted-foreground text-sm">
          Une question, un devis, ou une réclamation ? Choisissez le bon formulaire ou contactez
          directement notre équipe.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-muted/60 md:col-span-2">
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
              <a
                className="hover:text-foreground transition-colors"
                href={`tel:${siteContact.phoneSecondary.tel}`}
              >
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
                className="hover:text-foreground transition-colors underline decoration-dotted underline-offset-4"
                href={siteContact.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ouvrir dans Google Maps
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Accès rapide</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-4">
            <Button asChild>
              <Link href="/contact-reclamations/demande">Faire une demande</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact-reclamations/reclamation">Déposer une réclamation</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/services-clients-reclamations">Services clients</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Contact />
    </div>
  );
}



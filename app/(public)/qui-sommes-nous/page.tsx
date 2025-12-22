import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Qui sommes-nous | Net Courtage Assurances",
  description:
    "Net Courtage Assurances (NCA) — courtier en assurances à Rozay-en-Brie. Accompagnement personnalisé depuis 2007.",
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Qui sommes-nous</h1>
        <p className="text-muted-foreground text-sm">
          Net Courtage Assurances (NCA) est un courtier en assurance basé à Rozay-en-Brie, en
          Île-de-France. Notre priorité : vous aider à choisir une couverture claire, adaptée et
          au bon prix.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Notre mission</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Nous comparons et proposons des solutions d’assurance pour particuliers et
            professionnels, en nous appuyant sur notre expérience et nos partenaires assureurs.
            Nous vous accompagnons de la demande de devis jusqu’au suivi.
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Besoin d’un conseil ? Faites une demande et nous vous recontactons.
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/contact-reclamations/demande">Demander un devis</Link>
            </Button>
            <Button size="sm" variant="outline" className="w-full" asChild>
              <a href={`tel:${siteContact.phonePrimary.tel}`}>Appeler</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





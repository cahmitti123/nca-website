import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Assurance Prévoyance | Net Courtage Assurances",
  description:
    "Assurance prévoyance : protégez vos proches et vos revenus en cas d’arrêt, d’invalidité ou de décès.",
};

export default function PrevoyancePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Prévoyance</Badge>
          <Badge variant="outline">Protection</Badge>
          <Badge variant="outline">Devis gratuit</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Assurance Prévoyance</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          La prévoyance vous protège en cas d’imprévu : arrêt de travail, invalidité, décès. Nous
          vous aidons à choisir des garanties cohérentes avec votre situation personnelle et
          professionnelle.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/contact-reclamations/demande">Demander un devis</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`tel:${siteContact.phonePrimary.tel}`}>Appeler un expert</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Garanties fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Indemnités journalières en cas d’arrêt de travail.</li>
              <li>Rente invalidité selon le niveau de couverture choisi.</li>
              <li>Capital décès pour protéger les proches.</li>
              <li>Options : hospitalisation, accidents de la vie, etc.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">À qui s’adresse-t-elle ?</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Indépendants, professions libérales, salariés : nous ajustons les garanties à votre
            statut et à vos besoins.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





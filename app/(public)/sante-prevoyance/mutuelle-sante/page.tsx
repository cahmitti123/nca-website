import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Mutuelle Santé | Net Courtage Assurances",
  description:
    "Mutuelle santé sur mesure : une couverture adaptée à vos besoins et à votre budget (famille, senior, indépendant).",
};

export default function MutuelleSantePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Santé</Badge>
          <Badge variant="outline">Sur mesure</Badge>
          <Badge variant="outline">Devis gratuit</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Mutuelle Santé</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          Nous vous aidons à choisir une mutuelle santé adaptée à vos besoins spécifiques et à
          votre budget. Notre objectif : une couverture claire, des garanties utiles et une
          expérience simple.
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
            <CardTitle className="text-base">Ce que nous optimisons</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Soins courants : consultations, pharmacie, analyses.</li>
              <li>Hospitalisation : chambre particulière, frais de séjour, honoraires.</li>
              <li>Dentaire et optique : renforts et plafonds adaptés.</li>
              <li>Garantie famille / senior : besoins spécifiques selon l’âge et la situation.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Besoin d’un conseil ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Dites-nous votre situation et vos priorités : nous vous orientons vers la meilleure
              formule.
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/contact-reclamations/demande">Faire une demande</Link>
            </Button>
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link href="/sante-prevoyance/prevoyance">Voir la prévoyance</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





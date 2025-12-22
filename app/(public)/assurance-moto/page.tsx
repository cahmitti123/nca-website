import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Assurance Moto | Net Courtage Assurances",
  description:
    "Assurance moto : comparez les garanties et trouvez une protection adaptée à votre usage et votre budget.",
};

export default function AssuranceMotoPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Moto</Badge>
          <Badge variant="outline">Protection</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Assurance Moto</h1>
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
          Trouvez une assurance moto au bon tarif en identifiant la couverture utile et en
          comparant les options. Nous vous accompagnons pour choisir une protection adaptée à
          votre profil et à votre véhicule.
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
            <CardTitle className="text-base">Ce que l’on compare</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-4">
              <li>Responsabilité civile et garanties conducteurs.</li>
              <li>Vol, incendie, dommages tous accidents.</li>
              <li>Assistance, équipement, options selon l’usage.</li>
              <li>Franchises et plafonds, selon votre budget.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">À savoir</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Nous adaptons la formule selon votre expérience, votre zone et votre fréquence
            d’utilisation.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





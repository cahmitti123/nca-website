import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Services clients & réclamations | Net Courtage Assurances",
  description: "Contact, suivi, et dépôt de réclamation.",
};

export default function CustomerServicePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Services clients &amp; réclamations</h1>
        <p className="text-muted-foreground text-sm">
          Pour une demande de devis, une question, ou une réclamation, utilisez les formulaires
          dédiés afin de gagner du temps.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Faire une demande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Demandez un devis gratuit ou posez une question à nos conseillers.
            </p>
            <Button size="sm" asChild>
              <Link href="/contact-reclamations/demande">Ouvrir le formulaire</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Déposer une réclamation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Déposez une réclamation, nous vous recontacterons rapidement.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/contact-reclamations/reclamation">Ouvrir le formulaire</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Coordonnées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 pt-4 text-sm text-muted-foreground">
          <div>{siteContact.address}</div>
          <div>
            <a
              className="hover:text-foreground transition-colors"
              href={`tel:${siteContact.phonePrimary.tel}`}
            >
              {siteContact.phonePrimary.display}
            </a>
          </div>
          <div>
            <a
              className="hover:text-foreground transition-colors"
              href={`tel:${siteContact.phoneSecondary.tel}`}
            >
              {siteContact.phoneSecondary.display}
            </a>
          </div>
          <div>
            <a
              className="hover:text-foreground transition-colors"
              href={`mailto:${siteContact.email}`}
            >
              {siteContact.email}
            </a>
          </div>
          <div>{siteContact.hours.display}</div>
        </CardContent>
      </Card>
    </div>
  );
}





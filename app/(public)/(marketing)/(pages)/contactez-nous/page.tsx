import type { Metadata } from "next";
import Link from "next/link";

import Contact from "@/components/contact";
import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Contactez-nous | Net Courtage Assurances",
  description:
    "Contactez Net Courtage Assurances : demande de devis, questions, réclamations. Téléphone, email et formulaires en ligne.",
};

export default function ContactezNousPage() {
  return (
    <PageShell className="space-y-12">
      <PageIntro
        kicker={
          <Badge variant="secondary" className="border-primary/15 bg-primary/10 text-primary">
            Contact
          </Badge>
        }
        title="Contactez-nous"
        description={
          <div className="space-y-2">
            <p>
              Une question, un devis, ou une réclamation ? Choisissez la bonne démarche et nous vous
              répondrons rapidement.
            </p>
            <p>
              Pour une demande de devis, privilégiez le formulaire : il nous permet de recueillir
              l’essentiel (profil, usage, priorités) et de comparer efficacement. Pour une réclamation,
              utilisez le parcours dédié afin de faciliter le traitement.
            </p>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-muted/60 md:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Coordonnées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm text-muted-foreground">
            <p className="max-w-prose leading-relaxed">
              Vous pouvez nous joindre par téléphone ou email. Nous sommes disponibles pendant nos
              horaires d’ouverture pour répondre à vos questions et vous accompagner dans votre demande.
            </p>
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
              <Link href="/demander-un-devis">Demander un devis</Link>
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
    </PageShell>
  );
}



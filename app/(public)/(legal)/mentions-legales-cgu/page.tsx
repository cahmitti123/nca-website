import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Mentions légales – CGU | Net Courtage Assurances",
  description: "Mentions légales et conditions générales d’utilisation (CGU).",
};

export default function LegalPage() {
  return (
    <PageShell>
      <PageIntro
        title="Mentions légales – CGU"
        description="Cette page regroupe les informations légales et les conditions d’utilisation du site."
      />

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">1. Présentation du site</CardTitle>
        </CardHeader>
        <CardContent className="rich-content pt-4">
          <p>
            En vertu de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
            l’économie numérique, il est précisé aux utilisateurs du site{" "}
            <strong>Net Courtage Assurances</strong> l’identité des différents intervenants.
          </p>

          <ul>
            <li>
              <strong>Propriétaire du site</strong> : NET COURTAGE ASSURANCES – SARL
            </li>
            <li>
              <strong>Siège social</strong> : 3 AVENUE DE L’EPI 77540 ROZAY EN BRIE
            </li>
            <li>
              <strong>SIRET</strong> : 499635152
            </li>
            <li>
              <strong>RCS</strong> : MEAUX B 499 635 142
            </li>
            <li>
              <strong>Forme juridique</strong> : Société à responsabilité limitée
            </li>
            <li>
              <strong>Capital social</strong> : 5 000,00 €
            </li>
            <li>
              <strong>TVA</strong> : FR37499635142
            </li>
            <li>
              <strong>Immatriculation ORIAS</strong> : 07031591
            </li>
            <li>
              <strong>Adresse ORIAS</strong> : 26 boulevard Haussmann 75009 Paris
            </li>
            <li>
              <strong>Directeur de publication</strong> : FRANCK LE DUC
            </li>
            <li>
              <strong>Déclaration CNIL</strong> : DPO-161292
            </li>
            <li>
              <strong>Contact</strong> :{" "}
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a> ·{" "}
              <a href={`tel:${siteContact.phonePrimary.tel}`}>
                {siteContact.phonePrimary.display}
              </a>
            </li>
            <li>
              <strong>Hébergeur</strong> : HOSTINGER
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">2. Conditions générales d’utilisation</CardTitle>
        </CardHeader>
        <CardContent className="rich-content pt-4">
          <p>
            L’utilisation du site implique l’acceptation pleine et entière des conditions
            générales d’utilisation décrites ci-après. Elles peuvent être modifiées à tout
            moment ; elles s’imposent néanmoins à l’utilisateur.
          </p>
          <p>
            Le site est normalement accessible à tout moment. Une interruption pour maintenance
            technique peut toutefois être décidée.
          </p>
          <p>
            Pour toute question, vous pouvez{" "}
            <Link className="text-primary underline underline-offset-4" href="/contactez-nous">
              nous contacter
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Données personnelles &amp; cookies</CardTitle>
        </CardHeader>
        <CardContent className="rich-content pt-4">
          <p>
            Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition,
            d’effacement, de limitation du traitement et de portabilité des données personnelles
            vous concernant.
          </p>
          <p>
            Pour exercer vos droits :{" "}
            <a href={`mailto:${siteContact.emails.donneesPersonnelles}`}>
              {siteContact.emails.donneesPersonnelles}
            </a>{" "}
            · DPO :{" "}
            <a href={`mailto:${siteContact.emails.dpo}`}>{siteContact.emails.dpo}</a>.
          </p>
          <p>
            Pour plus d’informations, consultez{" "}
            <Link className="text-primary underline underline-offset-4" href="/politique-de-confidentialite">
              notre politique de confidentialité
            </Link>{" "}
            et{" "}
            <Link className="text-primary underline underline-offset-4" href="/gerer-les-cookies">
              notre page “Gérer les cookies”
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild>
          <Link href="/demander-un-devis">Demander un devis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </PageShell>
  );
}





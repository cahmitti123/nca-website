import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Net Courtage Assurances",
  description: "Politique de confidentialité et informations RGPD.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Politique de confidentialité</h1>
        <p className="text-muted-foreground text-sm">
          Cette page décrit comment Net Courtage Assurances collecte et traite vos données
          personnelles (RGPD).
        </p>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Politique</CardTitle>
        </CardHeader>
        <CardContent className="rich-content pt-4">
          <h2>1. Introduction</h2>
          <p>
            La confidentialité des visiteurs de notre site web est très importante à nos yeux, et
            nous nous engageons à la protéger.
          </p>

          <h2>2. Collecte d’informations personnelles</h2>
          <p>Les types d’informations personnelles suivants peuvent être collectés :</p>
          <ul>
            <li>Nom</li>
            <li>Prénom</li>
            <li>Email</li>
            <li>Numéro de téléphone</li>
            <li>Adresse IP</li>
          </ul>
          <p>Les informations personnelles peuvent être collectées via :</p>
          <ul>
            <li>Formulaires de contact et de demande de devis</li>
            <li>Formulaire de réclamation</li>
            <li>Cookies</li>
          </ul>

          <h2>3. Utilisation de vos informations</h2>
          <p>
            Les informations personnelles transmises via nos formulaires sont utilisées pour
            traiter votre demande, vous recontacter et vous accompagner dans votre dossier.
          </p>
          <p>
            Sans votre consentement explicite, nous ne fournissons pas vos informations
            personnelles à des tierces parties pour leur marketing direct.
          </p>

          <h2>4. Divulgation</h2>
          <p>
            Nous pouvons divulguer vos informations personnelles à nos employés, dirigeants,
            assureurs, conseillers professionnels, agents, fournisseurs ou sous-traitants, dans la
            mesure où cela est raisonnablement nécessaire au traitement de votre demande.
          </p>
          <p>
            Nous pouvons également divulguer vos informations personnelles si la loi l’exige, dans
            le cadre d’une procédure judiciaire, ou pour établir, exercer ou défendre nos droits
            légaux.
          </p>

          <h2>Vos droits</h2>
          <p>
            Vous pouvez demander l’accès, la rectification ou la suppression de vos données en
            nous contactant : <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>.
          </p>
          <p>
            Pour toute question, vous pouvez aussi utiliser la page{" "}
            <Link className="text-primary underline underline-offset-4" href="/contactez-nous">
              contact
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild>
          <Link href="/contact-reclamations/demande">Nous contacter</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </div>
  );
}



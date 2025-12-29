import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Services clients & réclamations | Net Courtage Assurances",
  description:
    "Service clients et réclamations : contacts, délais de traitement, médiation et informations RGPD.",
};

export default function CustomerServicePage() {
  return (
    <PageShell>
      <PageIntro
        title={<>Services clients &amp; réclamations</>}
        description={
          <>
            Pour une demande de devis, une question, ou une réclamation, utilisez les formulaires
            dédiés afin de gagner du temps. Vous trouverez ci-dessous les contacts et informations
            utiles (délais, médiation, RGPD).
          </>
        }
      />

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
          <CardTitle className="text-base">Informations</CardTitle>
        </CardHeader>
        <CardContent className="rich-content pt-4">
          <h2>1. Service Clients</h2>
          <ul>
            <li>
              Email :{" "}
              <a href={`mailto:${siteContact.emails.serviceClients}`}>
                {siteContact.emails.serviceClients}
              </a>
            </li>
            <li>
              Téléphone :{" "}
              <a href={`tel:${siteContact.phonePrimary.tel}`}>
                {siteContact.phonePrimary.display}
              </a>
            </li>
          </ul>

          <h2>2. Service Réclamations</h2>
          <p>
            Vous pouvez nous adresser une réclamation assurance de personnes (santé, prévoyance) et
            assurance animale (mutuelle chien et chat).
          </p>
          <h3>Voie électronique</h3>
          <ul>
            <li>
              <a href={`mailto:${siteContact.emails.reclamations}`}>{siteContact.emails.reclamations}</a>
            </li>
            <li>
              <a href={`mailto:${siteContact.emails.suiviIard}`}>{siteContact.emails.suiviIard}</a>
            </li>
          </ul>
          <h3>Voie postale</h3>
          <ul>
            <li>{siteContact.address}</li>
          </ul>
          <h3>Via notre formulaire</h3>
          <p>
            <Link className="text-primary underline underline-offset-4" href="/politique-de-reclamations">
              Cliquez ici
            </Link>{" "}
            pour laisser votre réclamation.
          </p>
          <p>
            <em>
              Un accusé de réception vous sera envoyé dans un délai de 10 jours ouvrables à compter
              de la date d’envoi de votre réclamation.
            </em>
            <br />
            <em>
              Une réponse définitive vous sera apportée dans le délai de 2 mois à compter de la date
              d’envoi de votre réclamation.
            </em>
          </p>

          <h3>Médiation</h3>
          <p>
            Si la réponse ne vous convient pas ou si un différend persiste dans les deux mois
            suivant l’envoi de votre première réclamation écrite, vous pouvez vous adresser au
            médiateur de l’assurance :
          </p>
          <ul>
            <li>
              <strong>Médiateur de l’Assurance</strong> : {siteContact.mediator.name}
            </li>
            <li>
              <strong>Adresse</strong> : {siteContact.mediator.address}
            </li>
            <li>
              <strong>Email</strong> :{" "}
              <a href={`mailto:${siteContact.mediator.email}`}>{siteContact.mediator.email}</a>
            </li>
          </ul>
          <p>
            Vous pouvez également vous adresser à {siteContact.acpr.name} — {siteContact.acpr.address} —{" "}
            <a href={siteContact.acpr.url} target="_blank" rel="noreferrer">
              {siteContact.acpr.url}
            </a>
            , tél : {siteContact.acpr.tel} / fax : {siteContact.acpr.fax}.
          </p>
          <p>Ce site est soumis à la réglementation française et relève de la compétence des juridictions françaises.</p>

          <h2>3. Démarchage téléphonique</h2>
          <p>
            Conformément à l’article L121-34 du Code de la consommation, vous pouvez vous inscrire
            sur la liste d’opposition au démarchage téléphonique :{" "}
            <a href={siteContact.bloctelUrl} target="_blank" rel="noreferrer">
              {siteContact.bloctelUrl}
            </a>
            .
          </p>

          <h2>4. Données personnelles</h2>
          <p>
            Les informations recueillies font l’objet d’un traitement informatique destiné à
            fournir des devis de produits d’assurance.
          </p>
          <p>
            Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au
            RGPD, vous disposez des droits suivants : accès, rectification et suppression.
          </p>
          <p>
            Pour exercer vos droits :{" "}
            <a href={`mailto:${siteContact.emails.donneesPersonnelles}`}>
              {siteContact.emails.donneesPersonnelles}
            </a>
            .
          </p>

          <h2>5. Délégué à la protection des données (DPO)</h2>
          <p>
            Email : <a href={`mailto:${siteContact.emails.dpo}`}>{siteContact.emails.dpo}</a>
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}





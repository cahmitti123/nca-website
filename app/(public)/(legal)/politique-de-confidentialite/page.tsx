import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Net Courtage Assurances",
  description:
    "Politique de confidentialité (RGPD) : collecte, utilisation, conservation et droits des utilisateurs.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <PageIntro
        title="Politique de confidentialité"
        description={
          <>
            Cette page décrit comment Net Courtage Assurances collecte et traite vos données
            personnelles (RGPD).
          </>
        }
      />

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Politique</CardTitle>
        </CardHeader>
        <CardContent className="rich-content pt-4">
          <h2>1. Introduction</h2>
          <p>
            La confidentialité des visiteurs de notre site web est très importante à nos yeux, et
            nous nous engageons à la protéger. Cette politique détaille ce que nous faisons de vos
            informations personnelles chez NET COURTAGE ASSURANCES.
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
            Les informations personnelles qui nous sont fournies par le biais de notre site web
            seront utilisées dans les objectifs décrits dans cette politique ou dans les pages du
            site pertinentes.
          </p>
          <ul>
            <li>
              Finalités liées à l’exécution d’un contrat : les données sont collectées pour
              l’exécution d’un contrat ou la mise en place de mesures précontractuelles à la
              demande de l’utilisateur.
            </li>
          </ul>
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

          <h2>5. Transfert de données hors Union Européenne</h2>
          <p>
            Des données sont susceptibles de faire l’objet de transfert hors de l’Union Européenne.
            Ces transferts sont encadrés par les règles de protection et de sécurité des données.
            Une information précise sur les données transférées ainsi que sur les destinataires
            sera fournie sur simple demande de votre part.
          </p>

          <h2>6. Conservation de vos informations personnelles</h2>
          <p>
            Les informations personnelles que nous traitons à quelque fin que ce soit ne sont pas
            conservées plus longtemps que nécessaire à cette fin ou à ces fins.
          </p>
          <p>La durée de conservation des données est de 3 ans.</p>

          <h2>7. Sécurité de vos informations personnelles</h2>
          <p>
            Nous prendrons des précautions techniques et organisationnelles raisonnables pour
            empêcher la perte, l’abus ou l’altération de vos informations personnelles.
          </p>

          <h2>8. Les droits que vous avez sur vos données</h2>
          <p>
            Vous pouvez demander l’accès, la rectification ou la suppression de vos données en
            nous contactant :{" "}
            <a href={`mailto:${siteContact.emails.donneesPersonnelles}`}>
              {siteContact.emails.donneesPersonnelles}
            </a>
            .
          </p>
          <p>
            Vous pouvez également contacter le Délégué à la protection des données (DPO) :{" "}
            <a href={`mailto:${siteContact.emails.dpo}`}>{siteContact.emails.dpo}</a>.
          </p>

          <h2>9. Sites web tiers</h2>
          <p>
            Notre site web contient des liens hypertextes menant vers des sites web tiers. Nous
            n’avons aucun contrôle sur ces sites, et ne sommes pas responsables de leurs politiques
            de confidentialité ni de leurs pratiques.
          </p>

          <h2>10. Cookies</h2>
          <p>
            Notre site web utilise des cookies. Un cookie est un fichier contenant un identifiant
            (une chaîne de lettres et de chiffres) envoyé par un serveur web vers un navigateur web
            et stocké par le navigateur.
          </p>
          <p>
            Pour en savoir plus, vous pouvez consulter la page{" "}
            <Link className="text-primary underline underline-offset-4" href="/gerer-les-cookies">
              Gérer les cookies
            </Link>
            .
          </p>

          <h2>11. Modifications</h2>
          <p>
            Nous pouvons parfois mettre cette politique à jour en publiant une nouvelle version
            sur notre site web. Vous devez vérifier cette page régulièrement pour vous assurer de
            prendre connaissance de tout changement effectué à cette politique.
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
          <Link href="/demander-un-devis">Demander un devis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </PageShell>
  );
}



import type { Metadata } from "next";

import { ProductLanding } from "@/components/public/product-landing";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Garantie Décennale | Net Courtage Assurances",
  description:
    "Garantie décennale : protégez vos travaux de construction sur le long terme avec une couverture adaptée.",
};

import { HardHat, Ruler, ShieldAlert, FileCheck } from "lucide-react";

export default function GarantieDecennalePage() {
  const product = getInsuranceProduct("garantie-decennale");
  return (
    <ProductLanding
      badges={["Construction", "Décennale"]}
      title="Garantie Décennale"
      description="La garantie décennale est essentielle pour les professionnels du bâtiment. Nous vous accompagnons pour cadrer votre activité, constituer un dossier clair et obtenir une couverture adaptée à vos chantiers."
      image={{
        src: product?.illustrationSrc,
        alt: "Garantie décennale",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      mainCard={{
        title: "Ce que nous cadrons",
        description:
          "Chaque activité du bâtiment a ses spécificités. Notre rôle est de qualifier précisément votre périmètre d’intervention et de vous orienter vers une solution cohérente.",
      }}
      sideCard={{
        title: "Demande rapide",
        description:
          "Décrivez votre activité, vos travaux et votre zone : nous revenons vers vous avec une proposition adaptée.",
        bullets: ["Devis gratuit", "Dossier cadré", "Réponse rapide"],
        actions: [{ label: "Demander un devis", href: "/demander-un-devis" }],
      }}
      features={[
        {
          title: "Couverture 10 Ans",
          description: "Protège vos ouvrages pendant 10 ans après la réception des travaux. Obligatoire et serein.",
          icon: ShieldAlert,
          colSpan: 2,
        },
        {
          title: "Activités Ciblées",
          description: "Maçonnerie, plomberie, électricité... Nous adaptons le contrat à votre corps de métier exact.",
          icon: HardHat
        },
        {
          title: "Protection Juridique",
          description: "En cas de litige avec un client ou un fournisseur, vos frais de justice sont couverts (selon option).",
          icon: Ruler
        },
        {
          title: "Attestation Rapide",
          description: "Obtenez votre attestation décennale rapidement pour pouvoir commencer vos chantiers sans attendre.",
          icon: FileCheck
        }
      ]}
      faq={[
        {
          question: "L'assurance décennale est-elle obligatoire ?",
          answer: "OUI. Tout constructeur (artisan, entrepreneur, promoteur...) doit souscrire une assurance décennale avant l'ouverture du chantier."
        },
        {
          question: "Les sous-traitants sont-ils concernés ?",
          answer: "Le sous-traitant n'a pas d'obligation légale de décennale envers le maître d'ouvrage, mais il est responsable vis-à-vis de l'entreprise qui l'emploie. Il est donc vivement conseillé d'être assuré."
        },
        {
          question: "Que couvre exactement la garantie ?",
          answer: "Elle couvre les dommages qui compromettent la solidité de l'ouvrage ou qui le rendent impropre à sa destination."
        }
      ]}
      extra={
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold">Pourquoi la décennale est importante</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                La garantie décennale est couramment demandée dans le cadre des chantiers : elle vise à
                protéger l’ouvrage sur la durée, selon le périmètre prévu au contrat et la nature des
                travaux réalisés.
              </p>
              <p className="max-w-prose">
                Une attestation claire et un contrat bien cadré vous permettent d’avancer sereinement,
                en évitant les zones grises sur les activités couvertes.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Pour bien démarrer</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Plus le périmètre d’activité est précis, plus la proposition est pertinente. Nous
                vérifions avec vous les travaux réellement effectués et les justificatifs nécessaires.
              </p>
              <p className="max-w-prose text-xs leading-relaxed">
                Les garanties et exclusions varient selon les assureurs et les contrats.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Documents utiles pour un devis</h2>
            <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
              <p className="max-w-prose">Pour accélérer l’étude, préparez si possible (selon votre situation) :</p>
              <ul className="max-w-prose list-disc space-y-1 pl-4">
                <li>Votre activité détaillée (travaux réalisés, périmètre exact).</li>
                <li>Chiffre d’affaires et zone d’intervention.</li>
                <li>Justificatifs d’entreprise / identité (selon demande).</li>
                <li>Historique d’assurance et sinistralité si applicable.</li>
              </ul>
              <p className="max-w-prose text-xs leading-relaxed">
                Nous vous indiquons précisément les pièces nécessaires selon votre dossier.
              </p>
            </div>
          </section>
        </div>
      }
    />
  );
}





import type { Metadata } from "next";

import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { ProductLanding } from "@/components/public/product-landing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Complémentaire santé senior | Net Courtage Assurances",
  description:
    "Complémentaire santé senior : une couverture adaptée (hospitalisation, dentaire, optique) avec devis gratuit.",
};

export default function ComplementaireSanteSeniorPage() {
  const product = getInsuranceProduct("complementaire-sante-senior");
  return (
    <ProductLanding
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Assurances", href: "/portail/offres" },
        { label: "Complémentaire santé senior" },
      ]}
      badges={["Senior", "Mutuelle santé", "Devis gratuit"]}
      title="Complémentaire santé senior"
      description="Nous vous aidons à choisir une complémentaire santé senior adaptée à vos besoins et à votre budget (hospitalisation, dentaire, optique). Objectif : une couverture claire et utile, sans superflu."
      image={{
        src: product?.illustrationSrc,
        alt: "Complémentaire santé senior",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      primaryAction={{ label: "Voir la mutuelle santé", href: "/sante-prevoyance/mutuelle-sante" }}
      mainCard={{
        title: "Ce que nous optimisons",
        bullets: [
          "Hospitalisation : frais, honoraires, chambre particulière (selon contrat).",
          "Optique : renforts et plafonds adaptés.",
          "Dentaire : soins, prothèses, implants selon vos priorités.",
          "Soins courants : consultations, pharmacie, analyses.",
        ],
      }}
      sideCard={{
        title: "Demander un devis",
        description: "Remplissez le formulaire : nous vous recontactons pour affiner vos besoins.",
        actions: [{ label: "Formulaire général", href: "/contact-reclamations/demande" }],
      }}
      extra={
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Formulaire mutuelle santé (senior)</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <QuoteRequestForm initialInsuranceType="Assurances Santé" lockInsuranceType />
          </CardContent>
        </Card>
      }
    />
  );
}



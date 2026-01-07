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

import { Sunset, Eye, HeartHandshake, Pill } from "lucide-react";

export default function ComplementaireSanteSeniorPage() {
  const product = getInsuranceProduct("complementaire-sante-senior");
  return (
    <ProductLanding
      badges={["Senior", "Santé", "Retraite"]}
      title="Complémentaire Santé Senior"
      description="À la retraite, vos besoins de santé évoluent. Nous vous aidons à choisir une complémentaire adaptée à cette nouvelle étape (hospitalisation, auditif, cure thermale), sans payer pour des garanties inutiles (maternité, etc.)."
      image={{
        src: product?.illustrationSrc,
        alt: "Complémentaire santé senior",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      primaryAction={{ label: "Demander un devis", href: "/demander-un-devis" }}
      mainCard={{
        title: "Points de vigilance",
        bullets: [
           "Suppression des garanties inutiles (ex: maternité).",
           "Renfort sur l'hospitalisation et les dépassements d'honoraires.",
           "Prise en charge des cures thermales et médecines douces.",
           "Services d'assistance à domicile après hospitalisation."
        ],
      }}
      sideCard={{
        title: "Notre Conseil",
        description: "Anticipez ! Les tarifs augmentent avec l'âge. Souscrire tôt à une bonne mutuelle senior permet souvent de bloquer des tarifs plus avantageux.",
        actions: [{ label: "Comparer les offres", href: "/demander-un-devis" }],
      }}
      features={[
        {
          title: "0€ Reste à Charge",
          description: "Profitez du dispositif 100% Santé pour vos lunettes, appareils auditifs et prothèses dentaires.",
          icon: Eye,
          colSpan: 2,
        },
        {
          title: "Bien-être & Prévention",
          description: "Cures thermales, pédicure, ostéopathie... Des forfaits pour rester en forme longtemps.",
          icon: Sunset
        },
        {
          title: "Assistance Renforcée",
          description: "Aide ménagère, portage de repas... En cas de pépin, vous n'êtes pas seul.",
          icon: HeartHandshake
        },
        {
          title: "Médicaments",
          description: "Prise en charge optimale des médicaments, même ceux moins bien remboursés par la Sécu.",
          icon: Pill
        }
      ]}
      faq={[
        {
          question: "À quel âge passer sur une mutuelle senior ?",
          answer: "Il n'y a pas d'âge officiel, mais dès 55-60 ans, ou au moment du départ en retraite, il est crucial de réévaluer ses garanties pour ne plus payer pour la maternité ou l'orthodontie enfant."
        },
        {
          question: "Le tarif augmente-t-il chaque année ?",
          answer: "Généralement oui, indexé sur l'âge et le coût de la santé. Cependant, nous négocions pour limiter ces hausses ou trouver des contrats aux tarifs stabilisés."
        },
        {
          question: "Y a-t-il un questionnaire médical ?",
          answer: "Non, pour une complémentaire santé, il n'y a aucun questionnaire médical, quel que soit votre âge ou votre état de santé."
        }
      ]}
    />
  );
}



import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote-landing";

export const metadata: Metadata = {
  title: "Demander un devis | Net Courtage Assurances",
  description:
    "Obtenez un devis d’assurance dès maintenant. Découvrez comment notre couverture s’adapte à vos besoins. Demander un devis gratuit.",
};

export default function DemanderUnDevisPage() {
  return (
    <QuoteLanding
      title="Demander un devis"
      description="Prêt à faire des économies ? Remplissez le formulaire et comparez immédiatement."
    />
  );
}



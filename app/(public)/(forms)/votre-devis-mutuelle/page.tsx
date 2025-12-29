import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote-landing";

export const metadata: Metadata = {
  title: "Votre devis mutuelle | Net Courtage Assurances",
  description:
    "Votre devis mutuelle (gratuit, sans engagement) avec Net Courtage Assurances (NCA).",
};

export default function VotreDevisMutuellePage() {
  return (
    <QuoteLanding
      title="Votre devis mutuelle"
      description="Complétez le formulaire : nous vous guidons vers la formule la plus adaptée."
      form={{ initialInsuranceType: "Assurances Santé", lockInsuranceType: true }}
    />
  );
}



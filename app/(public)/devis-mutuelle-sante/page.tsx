import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote-landing";

export const metadata: Metadata = {
  title: "Devis mutuelle santé | Net Courtage Assurances",
  description:
    "Demandez un devis de mutuelle santé (gratuit, sans engagement) avec Net Courtage Assurances (NCA).",
};

export default function DevisMutuelleSantePage() {
  return (
    <QuoteLanding
      title="Devis mutuelle santé"
      description="Remplissez le formulaire pour recevoir une proposition adaptée à votre situation."
      form={{ initialInsuranceType: "Assurances Santé", lockInsuranceType: true }}
    />
  );
}



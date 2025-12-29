import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote-landing";

export const metadata: Metadata = {
  title: "Demander un devis de mutuelle santé | Net Courtage Assurances",
  description:
    "Demandez un devis de mutuelle santé (gratuit, sans engagement) avec Net Courtage Assurances (NCA).",
};

export default function DemanderUnDevisDeMutuelleSantePage() {
  return (
    <QuoteLanding
      title="Demander un devis de mutuelle santé"
      description="Indiquez vos informations : nous vous recontactons pour affiner la couverture et le budget."
      form={{ initialInsuranceType: "Assurances Santé", lockInsuranceType: true }}
    />
  );
}



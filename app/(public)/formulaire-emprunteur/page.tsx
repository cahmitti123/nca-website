import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote-landing";

export const metadata: Metadata = {
  title: "Formulaire emprunteur | Net Courtage Assurances",
  description:
    "Formulaire d’assurance emprunteur : demande gratuite et sans engagement avec Net Courtage Assurances (NCA).",
};

export default function FormulaireEmprunteurPage() {
  return (
    <QuoteLanding
      title="Formulaire assurance emprunteur"
      description="Renseignez vos informations pour être recontacté(e) et recevoir une proposition."
      form={{ initialInsuranceType: "Assurances Emprunteur", lockInsuranceType: true }}
    />
  );
}



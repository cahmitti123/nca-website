import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote-landing";

export const metadata: Metadata = {
  title: "Devis mutuelle santé pour seniors | Net Courtage Assurances",
  description:
    "Demandez un devis de mutuelle santé pour seniors (gratuit, sans engagement) avec Net Courtage Assurances (NCA).",
};

export default function DevisMutuelleSantePourSeniorsPage() {
  return (
    <QuoteLanding
      title="Devis mutuelle santé pour seniors"
      description="Recevez une proposition adaptée (hospitalisation, dentaire, optique) selon vos besoins."
      form={{ initialInsuranceType: "Assurances Santé", lockInsuranceType: true }}
    />
  );
}



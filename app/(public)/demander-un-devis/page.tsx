import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote-landing";

export const metadata: Metadata = {
  title: "Demander un devis | Net Courtage Assurances",
  description: "Demandez un devis gratuit et sans engagement avec Net Courtage Assurances (NCA).",
};

export default function DemanderUnDevisPage() {
  return (
    <QuoteLanding
      title="Demander un devis"
      description="Demandez un devis gratuit et sans engagement. Un conseiller vous recontactera rapidement."
    />
  );
}



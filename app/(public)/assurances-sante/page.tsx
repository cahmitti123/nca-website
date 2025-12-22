import type { Metadata } from "next";

import MutuelleSantePage from "@/app/(public)/sante-prevoyance/mutuelle-sante/page";

export const metadata: Metadata = {
  title: "Assurances santé | Net Courtage Assurances",
  description:
    "Assurances santé : découvrez nos solutions de mutuelle santé et demandez un devis gratuit.",
  alternates: {
    canonical: "/sante-prevoyance/mutuelle-sante",
  },
};

export default function AssurancesSanteAliasPage() {
  return <MutuelleSantePage />;
}



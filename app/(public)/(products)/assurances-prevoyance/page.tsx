import type { Metadata } from "next";

import PrevoyancePage from "../sante-prevoyance/prevoyance/page";

export const metadata: Metadata = {
  title: "Assurances prévoyance | Net Courtage Assurances",
  description:
    "Assurance Prévoyance : découvrez nos solutions de prévoyance et d’assurance décès-invalidité, ainsi que nos offres en mutuelle santé.",
  alternates: {
    canonical: "/sante-prevoyance/prevoyance",
  },
};

export default function AssurancesPrevoyanceAliasPage() {
  return <PrevoyancePage />;
}



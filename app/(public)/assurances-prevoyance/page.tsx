import type { Metadata } from "next";

import PrevoyancePage from "@/app/(public)/sante-prevoyance/prevoyance/page";

export const metadata: Metadata = {
  title: "Assurances prévoyance | Net Courtage Assurances",
  description:
    "Assurances prévoyance : protégez vos proches et vos revenus en cas d’imprévu (selon contrats).",
  alternates: {
    canonical: "/sante-prevoyance/prevoyance",
  },
};

export default function AssurancesPrevoyanceAliasPage() {
  return <PrevoyancePage />;
}



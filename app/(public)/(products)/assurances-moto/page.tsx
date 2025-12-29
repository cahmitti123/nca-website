import type { Metadata } from "next";

import AssuranceMotoPage from "../assurance-moto/page";

export const metadata: Metadata = {
  title: "Assurances moto | Net Courtage Assurances",
  description:
    "Découvrez les meilleures assurances moto en ligne et comparez-les pour trouver celle qui convient le mieux à vos besoins.",
  alternates: {
    canonical: "/assurance-moto",
  },
};

export default function AssurancesMotoAliasPage() {
  return <AssuranceMotoPage />;
}



import type { Metadata } from "next";

import AssuranceMotoPage from "@/app/(public)/assurance-moto/page";

export const metadata: Metadata = {
  title: "Assurances moto | Net Courtage Assurances",
  description:
    "Assurances moto : comparez les garanties et trouvez une protection adaptée à votre usage et votre budget.",
  alternates: {
    canonical: "/assurance-moto",
  },
};

export default function AssurancesMotoAliasPage() {
  return <AssuranceMotoPage />;
}



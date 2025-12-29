import type { Metadata } from "next";

import AssuranceEmprunteurPage from "../assurance-emprunteur/page";

export const metadata: Metadata = {
  title: "Emprunteur | Net Courtage Assurances",
  description:
    "Assurance emprunteur : sécurisez votre crédit immobilier avec des garanties adaptées à votre situation.",
  alternates: {
    canonical: "/assurance-emprunteur",
  },
};

export default function EmprunteurAliasPage() {
  return <AssuranceEmprunteurPage />;
}



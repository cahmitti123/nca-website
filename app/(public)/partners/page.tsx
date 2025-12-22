import type { Metadata } from "next";

import PartnersPage from "@/app/(public)/partenaires/page";

export const metadata: Metadata = {
  title: "Partners | Net Courtage Assurances",
  description: "Our insurance partners.",
  alternates: {
    canonical: "/partenaires",
  },
};

export default function PartnersAliasPage() {
  return <PartnersPage />;
}



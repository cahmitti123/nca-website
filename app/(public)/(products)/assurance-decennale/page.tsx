import type { Metadata } from "next";
import GarantieDecennalePage from "../garantie-decennale/page";

export const metadata: Metadata = {
  title: "Assurance décennale | Net Courtage Assurances",
  description:
    "Assurance décennale : protégez vos travaux de construction sur le long terme avec une couverture adaptée.",
  alternates: {
    canonical: "/garantie-decennale",
  },
};

export default function AssuranceDecennalePage() {
  return <GarantieDecennalePage />;
}



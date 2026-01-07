export type InsuranceProductKey =
  | "mutuelle-sante"
  | "assurance-emprunteur"
  | "assurance-auto"
  | "assurance-moto"
  | "assurance-prevoyance"
  | "garantie-decennale"
  | "complementaire-sante-senior";

export type InsuranceProduct = {
  key: InsuranceProductKey;
  label: string;
  title: string;
  href: string;
  category: string;
  group: "vehicle" | "health" | "property" | "other";
  description: string;
  illustrationSrc?: string;
  fallbackCoverSrc: string;
};

export const insuranceProducts: readonly InsuranceProduct[] = [
  {
    key: "mutuelle-sante",
    label: "Mutuelle santé",
    title: "Mutuelle Santé",
    href: "/sante-prevoyance/mutuelle-sante",
    category: "Assurances personnelles",
    group: "health",
    description: "Une couverture santé sur mesure, adaptée à votre budget et à vos priorités.",
    illustrationSrc: "/illustrations/mutuelle sante.png",
    fallbackCoverSrc: "/cover-sante.svg",
  },
  {
    key: "assurance-emprunteur",
    label: "Emprunteur",
    title: "Assurance Emprunteur",
    href: "/assurance-emprunteur",
    category: "Assurances personnelles",
    group: "property",
    description: "Sécurisez votre crédit immobilier avec des garanties adaptées à votre projet.",
    illustrationSrc: "/illustrations/embrunteur.png",
    fallbackCoverSrc: "/cover-emprunteur.svg",
  },
  {
    key: "assurance-auto",
    label: "Auto",
    title: "Assurance Auto",
    href: "/assurance-auto",
    category: "Assurances personnelles",
    group: "vehicle",
    description: "Des options ajustées à votre véhicule et votre usage.",
    illustrationSrc: "/illustrations/assurance auto.png",
    fallbackCoverSrc: "/cover-auto.svg",
  },
  {
    key: "assurance-moto",
    label: "Moto",
    title: "Assurance Moto",
    href: "/assurance-moto",
    category: "Assurances personnelles",
    group: "vehicle",
    description: "Comparez les garanties et trouvez une protection adaptée.",
    illustrationSrc: "/illustrations/assurance moto.png",
    fallbackCoverSrc: "/cover-moto.svg",
  },
  {
    key: "assurance-prevoyance",
    label: "Prévoyance",
    title: "Assurance Prévoyance",
    href: "/sante-prevoyance/prevoyance",
    category: "Assurances personnelles",
    group: "health",
    description: "Anticipez l'imprévu et protégez vos proches.",
    illustrationSrc: "/illustrations/hero_illustration_1.png",
    fallbackCoverSrc: "/cover-prevoyance.svg",
  },
  {
    key: "garantie-decennale",
    label: "Décennale",
    title: "Garantie Décennale",
    href: "/garantie-decennale",
    category: "Assurances entreprise",
    group: "property",
    description: "Sécurisez vos travaux sur le long terme avec une couverture adaptée.",
    illustrationSrc: "/illustrations/decenale.png",
    fallbackCoverSrc: "/cover-decennale.svg",
  },
  {
    key: "complementaire-sante-senior",
    label: "Senior",
    title: "Complémentaire santé senior",
    href: "/complementaire-sante-senior",
    category: "Assurances personnelles",
    group: "health",
    description: "Une couverture senior adaptée (hospitalisation, dentaire, optique) avec devis gratuit.",
    illustrationSrc: "/illustrations/mutuelle sante.png",
    fallbackCoverSrc: "/cover-sante.svg",
  },
];

export function getInsuranceProduct(key: InsuranceProductKey): InsuranceProduct | undefined {
  return insuranceProducts.find((p) => p.key === key);
}



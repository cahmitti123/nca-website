export type PublicNavLink = {
  label: string;
  href: string;
};

export const marketingLinks: readonly PublicNavLink[] = [
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Contact", href: "/contactez-nous" },
  { label: "Espace juridique", href: "/espace-juridique" },
  { label: "Blog", href: "/blog" },
];

export const contentLinks: readonly PublicNavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Espace juridique", href: "/espace-juridique" },
];

export const legalLinks: readonly PublicNavLink[] = [
  { label: "Espace juridique", href: "/espace-juridique" },
  { label: "Gérer les cookies", href: "/gerer-les-cookies" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Mentions légales & CGU", href: "/mentions-legales-cgu" },
  { label: "Politique de réclamations", href: "/politique-de-reclamations" },
  { label: "Services clients & réclamations", href: "/services-clients-reclamations" },
];

export const portalLinks: readonly PublicNavLink[] = [
  { label: "Portail (accueil)", href: "/portail" },
  { label: "Offres", href: "/portail/offres" },
  { label: "Assurances personnelles — santé", href: "/portail/assurances-personnelles/sante" },
  {
    label: "Assurances personnelles — emprunteur",
    href: "/portail/assurances-personnelles/emprunteur",
  },
  { label: "Assurances personnelles — seniors", href: "/portail/assurances-personnelles/seniors" },
  { label: "Assurances entreprise", href: "/portail/assurances-entreprise" },
  { label: "Divers assurances", href: "/portail/divers-assurances" },
  { label: "Articles divers", href: "/portail/articles-divers" },
];

export const formLinks: readonly PublicNavLink[] = [
  { label: "Demander un devis", href: "/demander-un-devis" },
  { label: "Déposer une réclamation", href: "/contact-reclamations/reclamation" },
  { label: "Services clients", href: "/services-clients-reclamations" },
];



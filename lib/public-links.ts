export type PublicNavLink = {
  label: string;
  href: string;
  iconName?: string;
};

export const marketingLinks: readonly PublicNavLink[] = [
  { label: "Qui sommes-nous", href: "/qui-sommes-nous", iconName: "Users" },
  { label: "Partenaires", href: "/partenaires", iconName: "Handshake" },
  { label: "Contact", href: "/contactez-nous", iconName: "Phone" },
  { label: "Espace juridique", href: "/espace-juridique", iconName: "Scale" },
  { label: "Blog", href: "/blog", iconName: "Newspaper" },
];

export const contentLinks: readonly PublicNavLink[] = [
  { label: "Blog", href: "/blog", iconName: "Newspaper" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous", iconName: "Users" },
  { label: "Partenaires", href: "/partenaires", iconName: "Handshake" },
  { label: "Espace juridique", href: "/espace-juridique", iconName: "Scale" },
];

export const legalLinks: readonly PublicNavLink[] = [
  { label: "Espace juridique", href: "/espace-juridique", iconName: "Scale" },
  { label: "Gérer les cookies", href: "/gerer-les-cookies", iconName: "Cookie" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite", iconName: "FileText" },
  { label: "Mentions légales & CGU", href: "/mentions-legales-cgu", iconName: "Info" },
  { label: "Politique de réclamations", href: "/politique-de-reclamations", iconName: "AlertCircle" },
  { label: "Services clients & réclamations", href: "/services-clients-reclamations", iconName: "Phone" },
];

export const portalLinks: readonly PublicNavLink[] = [
  { label: "Portail (accueil)", href: "/portail", iconName: "Home" },
  { label: "Offres", href: "/portail/offres", iconName: "LayoutDashboard" },
  { label: "Assurances personnelles — santé", href: "/portail/assurances-personnelles/sante", iconName: "Shield" },
  {
    label: "Assurances personnelles — emprunteur",
    href: "/portail/assurances-personnelles/emprunteur",
    iconName: "Shield",
  },
  { label: "Assurances personnelles — seniors", href: "/portail/assurances-personnelles/seniors", iconName: "Shield" },
  { label: "Assurances entreprise", href: "/portail/assurances-entreprise", iconName: "Shield" },
  { label: "Divers assurances", href: "/portail/divers-assurances", iconName: "Shield" },
  { label: "Articles divers", href: "/portail/articles-divers", iconName: "FileText" },
];

export const formLinks: readonly PublicNavLink[] = [
  { label: "Demander un devis", href: "/demander-un-devis", iconName: "FileCheck" },
  { label: "Déposer une réclamation", href: "/contact-reclamations/reclamation", iconName: "AlertCircle" },
  { label: "Services clients", href: "/services-clients-reclamations", iconName: "Phone" },
];



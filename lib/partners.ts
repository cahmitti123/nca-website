export type PartnerLogo = {
  /** Path under /public */
  src: string;
  alt: string;
  /**
   * Optional extra classes to apply to the rendered logo image (ex: fix contrast).
   * Keep this minimal and only when needed.
   */
  className?: string;
};

export type Partner = {
  name: string;
  description: string;
  tags: readonly string[];
  logo?: PartnerLogo;
};

export const partners: readonly Partner[] = [
  {
    name: "Groupe AMI 3F",
    description:
      "Courtier grossiste : solutions et offres pour accompagner les courtiers et distributeurs.",
    tags: ["Courtier grossiste", "Solutions innovantes"],
    // Only the white logo is available in assets; we force it to render dark for readability.
    logo: {
      src: "/partners-logos/Groupe AMI 3F-blanc.png",
      alt: "Logo Groupe AMI 3F",
      className: "brightness-0",
    },
  },
  {
    name: "Néoliane",
    description:
      "Partenaire assurance santé et prévoyance, avec des offres adaptées aux besoins du marché.",
    tags: ["Assurance", "Offres spécialisées"],
    logo: {
      src: "/partners-logos/Néoliane.svg",
      alt: "Logo Néoliane",
    },
  },
  {
    name: "Maxance",
    description:
      "Courtier grossiste : solutions d’assurance pour les particuliers et les professionnels.",
    tags: ["Courtier grossiste", "Expertise"],
  },
  {
    name: "JI Assure",
    description:
      "Partenaire assurance : accompagnement et offres pour mieux couvrir vos besoins.",
    tags: ["Assurance", "Accompagnement"],
    logo: {
      src: "/partners-logos/JL Assure.png",
      alt: "Logo JI Assure",
    },
  },
  {
    name: "Zéphir",
    description:
      "Courtier grossiste : solutions personnalisées, orientées simplicité et efficacité.",
    tags: ["Courtier grossiste", "Solutions personnalisées"],
    logo: {
      src: "/partners-logos/Zéphir.svg",
      alt: "Logo Zéphir",
    },
  },
  {
    name: "Zenioo",
    description:
      "Courtier grossiste : protection sur mesure, avec une approche orientée accompagnement.",
    tags: ["Courtier grossiste", "Protection sur mesure"],
    logo: {
      src: "/partners-logos/Zenioo.svg",
      alt: "Logo Zenioo",
    },
  },
  {
    name: "NetVox",
    description:
      "Plateforme et réseau partenaires : outils et services pour la distribution d’assurance.",
    tags: ["Assurance", "Réseau partenaires"],
    logo: {
      src: "/partners-logos/NetVox.png",
      alt: "Logo NetVox",
    },
  },
  {
    name: "Coverity",
    description:
      "Courtier grossiste : solutions performantes, avec un focus sur la lisibilité des garanties.",
    tags: ["Courtier grossiste", "Solutions performantes"],
    logo: {
      src: "/partners-logos/Coverity.png",
      alt: "Logo Coverity",
    },
  },
  {
    name: "Cegema",
    description:
      "Spécialiste assurance de personnes (mutuelle, santé, prévoyance) avec des offres dédiées.",
    tags: ["Mutuelle", "Assurance de personne"],
    logo: {
      src: "/partners-logos/Cegema.webp",
      alt: "Logo Cegema",
      className: "contrast-125 saturate-110",
    },
  },
  {
    name: "AirBag",
    description:
      "Courtier grossiste : partenaire pour la mise en place d’offres et de parcours simples.",
    tags: ["Courtier grossiste", "Partenaire"],
    logo: {
      src: "/partners-logos/AirBag.svg",
      alt: "Logo AirBag",
    },
  },
  {
    name: "Alptis",
    description:
      "Assureur et partenaire : solutions santé et prévoyance, avec des offres adaptées aux profils.",
    tags: ["Assureur", "Santé & prévoyance"],
  },
  {
    name: "APIVIA",
    description:
      "Mutuelle et partenaire : offres santé pour particuliers et professionnels.",
    tags: ["Mutuelle", "Santé"],
  },
  {
    name: "April",
    description:
      "Assureur : solutions d’assurance (santé, prévoyance, emprunteur…) selon les besoins.",
    tags: ["Assureur", "Offres spécialisées"],
  },
  {
    name: "ASAF",
    description:
      "Partenaire assurance : offres et accompagnement pour mieux protéger votre situation.",
    tags: ["Assurance", "Partenaire"],
  },
  {
    name: "ECA Assurances",
    description:
      "Assureur et partenaire : offres adaptées et parcours de souscription accompagnés.",
    tags: ["Assureur", "Partenaire"],
  },
  {
    name: "Eurodommage",
    description:
      "Assureur : solutions IARD et couverture selon votre profil et vos besoins.",
    tags: ["Assureur", "IARD"],
  },
  {
    name: "FFA",
    description:
      "Partenaire : informations et ressources au service de l’assurance (selon périmètre).",
    tags: ["Partenaire", "Assurance"],
  },
  {
    name: "FMA Assurances",
    description:
      "Assureur : offres d’assurance pour particuliers et professionnels, selon les besoins.",
    tags: ["Assureur", "Professionnels"],
  },
  {
    name: "Progeas",
    description:
      "Courtier grossiste : solutions d’assurance pour accompagner les courtiers et distributeurs.",
    tags: ["Courtier grossiste", "Réseau partenaires"],
  },
  {
    name: "Solly Azar",
    description:
      "Assureur : solutions d’assurance et accompagnement selon votre situation.",
    tags: ["Assureur", "Partenaire"],
  },
  {
    name: "Tetris",
    description:
      "Partenaire : solutions et outils pour accompagner la distribution d’assurance.",
    tags: ["Partenaire", "Solutions"],
  },
  {
    name: "Wazari Assurances",
    description:
      "Courtier grossiste : offres et solutions pour répondre à des besoins spécifiques.",
    tags: ["Courtier grossiste", "Offres"],
  },
] as const;



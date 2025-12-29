import type { Metadata } from "next";

import MutuelleSantePage from "../sante-prevoyance/mutuelle-sante/page";

export const metadata: Metadata = {
  title: "Mutuelle Santé | Net Courtage Assurances",
  description:
    "Trouvez votre mutuelle santé idéale avec Net Courtage Assurances. Découvrez nos formules sur mesure pour protéger votre santé et votre budget.",
  alternates: {
    canonical: "/sante-prevoyance/mutuelle-sante",
  },
};

export default function AssurancesSanteAliasPage() {
  return <MutuelleSantePage />;
}



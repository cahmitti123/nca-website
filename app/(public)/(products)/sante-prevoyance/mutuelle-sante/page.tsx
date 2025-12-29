import type { Metadata } from "next";

import { ProductLanding } from "@/components/public/product-landing";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Mutuelle Santé | Net Courtage Assurances",
  description:
    "Trouvez votre mutuelle santé idéale avec Net Courtage Assurances. Découvrez nos formules sur mesure pour protéger votre santé et votre budget.",
};

export default function MutuelleSantePage() {
  const product = getInsuranceProduct("mutuelle-sante");
  return (
    <ProductLanding
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Assurances", href: "/portail/offres" },
        { label: "Mutuelle Santé" },
      ]}
      badges={["Santé", "Sur mesure", "Devis gratuit"]}
      title="Mutuelle Santé"
      description="Chez Net Courtage Assurances, nous vous aidons à trouver une mutuelle santé adaptée à vos besoins et à votre budget. Notre rôle : clarifier vos priorités (soins courants, hospitalisation, dentaire, optique), comparer des solutions pertinentes et vous présenter une proposition lisible, sans superflu."
      image={{
        src: product?.illustrationSrc,
        alt: "Mutuelle santé",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      mainCard={{
        title: "Ce que nous optimisons",
        description:
          "Une bonne mutuelle complète la couverture de base de l’Assurance Maladie en fonction de votre situation. Nous cadrons avec vous les postes qui comptent vraiment, puis on ajuste le niveau de garanties au bon prix.",
        bullets: [
          "Soins courants : consultations, pharmacie, analyses.",
          "Hospitalisation : frais de séjour, honoraires, chambre particulière (selon contrats).",
          "Dentaire et optique : niveaux, plafonds et conditions de renouvellement.",
          "Services & confort : tiers payant, réseaux, assistance (selon offres).",
          "Famille / senior / indépendant : priorités différentes, couverture ajustée.",
          "Points de vigilance : exclusions, franchises, délais de carence.",
        ],
      }}
      sideCard={{
        title: "Besoin d’un conseil ?",
        description:
          "Décrivez votre situation et vos priorités : on compare, on explique les garanties, puis on vous oriente vers la formule la plus cohérente pour votre profil.",
        bullets: [
          "Devis gratuit, sans engagement",
          "Comparaison lisible des garanties",
          "Conseil personnalisé et réactif",
        ],
        actions: [
          { label: "Demander un devis", href: "/demander-un-devis" },
          { label: "Voir la prévoyance", href: "/sante-prevoyance/prevoyance", variant: "outline" },
        ],
      }}
      extra={
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold">Comprendre la complémentaire santé</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                En France, l’Assurance Maladie rembourse une partie des soins. Une mutuelle santé (ou
                complémentaire santé) vient compléter ces remboursements selon les garanties prévues au
                contrat.
              </p>
              <p className="max-w-prose">
                L’enjeu n’est pas seulement le tarif : il s’agit de choisir une couverture cohérente
                avec vos besoins réels, votre fréquence de soins et votre budget sur l’année. Une bonne
                formule, c’est celle qui rembourse bien sur les postes qui comptent pour vous.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Comparer efficacement</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Trouver la bonne formule peut être fastidieux. Nous vous aidons à comparer des offres et
                à comprendre ce qui change réellement : niveaux, plafonds, exclusions, délais de carence,
                services inclus, et conditions de renouvellement.
              </p>
              <p className="max-w-prose">
                Objectif : une proposition claire, alignée sur vos priorités — au meilleur équilibre{" "}
                <strong>garanties</strong> / <strong>budget</strong>.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Bonnes pratiques avant de choisir</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Pour accélérer la comparaison, préparez si possible votre contrat actuel (si vous en
                avez un) et notez les postes importants (optique, dentaire, hospitalisation, soins
                courants).
              </p>
              <ul className="max-w-prose list-disc space-y-2 pl-4">
                <li>
                  <strong>Vos priorités</strong> : ce que vous voulez optimiser (dentaire/optique,
                  hospitalisation, famille/senior, etc.).
                </li>
                <li>
                  <strong>Vos habitudes</strong> : fréquence de soins, spécialistes, lunettes, soins
                  dentaires, etc.
                </li>
                <li>
                  <strong>Les conditions</strong> : exclusions, délais, plafonds et limites (selon
                  contrats).
                </li>
              </ul>
              <p className="max-w-prose text-xs leading-relaxed">
                <strong>À noter :</strong> les garanties, conditions et délais varient selon les contrats.
                Un devis personnalisé permet de comparer précisément selon votre profil.
              </p>
            </div>
          </section>
        </div>
      }
    />
  );
}





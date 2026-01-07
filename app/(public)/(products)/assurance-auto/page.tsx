import type { Metadata } from "next";

import { ProductLanding } from "@/components/public/product-landing";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Assurance Auto | Net Courtage Assurances",
  description:
    "Découvrez les meilleures offres d’assurance auto chez Net Courtage Assurances. Protégez votre voiture et votre budget avec nos formules sur mesure.",
};

import { ShieldCheck, UserCheck, Wrench, AlertTriangle } from "lucide-react";

export default function AssuranceAutoPage() {
  const product = getInsuranceProduct("assurance-auto");
  return (
    <ProductLanding
      badges={["Auto", "Tarifs compétitifs"]}
      title="Assurance Auto"
      description="Assurer votre voiture à un tarif compétitif peut sembler complexe, mais c’est réalisable. Nous vous aidons à définir vos besoins, à comparer les garanties et à choisir une formule adaptée à votre véhicule, votre usage et votre budget."
      image={{
        src: product?.illustrationSrc,
        alt: "Assurance auto",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      mainCard={{
        title: "Formules & options",
        description: "Pour bien choisir, on part de l’essentiel (obligations, usage, valeur du véhicule), puis on ajuste le niveau de couverture.",
      }}
      sideCard={{
        title: "Notre Conseil Pro",
        description: "Ne payez pas pour des garanties inutiles. Pour une voiture de >10 ans, le 'Tiers Étendu' est souvent le meilleur rapport qualité/prix.",
        bullets: ["Audit gratuit", "Comparaison multi-assureurs", "Zéro frais cachés"],
        actions: [{ label: "Demander un devis", href: "/demander-un-devis" }],
      }}
      features={[
        {
          title: "Formules sur-mesure",
          description: "Du Tiers simple au Tous Risques intégral, choisissez le niveau exact de protection dont vous avez besoin.",
          icon: ShieldCheck,
          colSpan: 2,
        },
        {
          title: "Jeunes Conducteurs",
          description: "Des solutions pour limiter la surprime et démarrer avec un budget maîtrisé.",
          icon: UserCheck
        },
        {
          title: "Assistance 24/7",
          description: "Dépannage 0 km, véhicule de remplacement et assistance aux personnes inclus ou en option.",
          icon: Wrench
        },
        {
          title: "Garantie Conducteur",
          description: "Indispensable pour vous protéger vous-même en cas d'accident responsable.",
          icon: AlertTriangle
        }
      ]}
      faq={[
        {
          question: "Quelle différence entre Tiers et Tiers Étendu ?",
          answer: "Le Tiers couvre uniquement les dommages causés aux autres. Le Tiers Étendu ajoute généralement le bris de glace, le vol et l'incendie."
        },
        {
          question: "Puis-je assurer une voiture temporairement ?",
          answer: "Oui, nous proposons des assurances temporaires (de 1 à 90 jours) idéales pour le transit, l'export ou le prêt d'un véhicule."
        },
        {
          question: "Comment fonctionne le bonus-malus ?",
          answer: "Chaque année sans accident responsable, votre prime baisse de 5%. Au contraire, un accident responsable entraine une majoration de 25%."
        }
      ]}
      extra={
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold">Comment obtenir une assurance auto abordable ?</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Bien choisir son assurance auto, c’est obtenir une couverture adaptée à ses besoins sans
                se ruiner. Nous vous proposons une large gamme de solutions pour trouver une formule
                cohérente avec votre budget et vos exigences.
              </p>
              <p className="max-w-prose">
                Le tarif dépend notamment du profil du conducteur, du type de véhicule et du niveau de
                garanties. En cadrant ces éléments, on peut souvent améliorer le rapport garanties / prix.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Situations fréquentes</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Certaines situations demandent un cadrage spécifique : jeune conducteur, contrat
                temporaire, formule au kilomètre, ou besoin d’options renforcées. On vous aide à
                sélectionner les garanties utiles et à éviter le superflu, sans perdre en protection.
              </p>
              <ul className="max-w-prose list-disc space-y-2 pl-4">
                <li>
                  <strong>Jeune conducteur :</strong> des solutions adaptées pour obtenir un prix
                  raisonnable selon le véhicule et le profil.
                </li>
                <li>
                  <strong>Assurance temporaire :</strong> une couverture courte durée (ou pour un véhicule
                  spécifique) au meilleur équilibre garanties / budget.
                </li>
                <li>
                  <strong>Assurance au km :</strong> utile si vous roulez peu ; on vérifie les conditions,
                  les options et les limites.
                </li>
                <li>
                  <strong>Tous risques :</strong> pertinent pour un véhicule récent ou une recherche de
                  protection maximale (franchises, assistance, options…).
                </li>
              </ul>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Résiliation & changement d’assureur</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Selon votre situation, certaines règles facilitent la résiliation : la loi Châtel
                (rappel de l’échéance) et la loi Hamon (résiliation à tout moment après un an, selon
                conditions). Nous vous aidons à comparer et à préparer votre changement de contrat en
                limitant les démarches au strict nécessaire.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Ordres de prix (indicatif)</h2>
            <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
              <p className="max-w-prose">
                Le prix varie selon le conducteur, le véhicule et les garanties. À titre indicatif, nos
                partenaires constatent des ordres de prix moyens :
              </p>
              <ul className="max-w-prose list-disc space-y-1 pl-4">
                <li>Au tiers : ~180€ / an</li>
                <li>Intermédiaire : ~252€ / an</li>
                <li>Tous risques : ~445€ / an</li>
              </ul>
              <p className="max-w-prose text-xs leading-relaxed">
                Ces montants sont indicatifs et peuvent évoluer. Un devis personnalisé reste la base de
                comparaison.
              </p>
            </div>
          </section>
        </div>
      }
    />
  );
}





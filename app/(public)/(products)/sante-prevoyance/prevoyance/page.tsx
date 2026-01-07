import type { Metadata } from "next";

import { ProductLanding } from "@/components/public/product-landing";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Assurance Prévoyance | Net Courtage Assurances",
  description:
    "Assurance Prévoyance : découvrez nos solutions de prévoyance et d’assurance décès-invalidité, ainsi que nos offres en mutuelle santé.",
};

import { Umbrella, Hourglass, Heart, Activity } from "lucide-react";

export default function PrevoyancePage() {
  const product = getInsuranceProduct("assurance-prevoyance");
  return (
    <ProductLanding
      badges={["Prévoyance", "Protection", "Devis gratuit"]}
      title="Assurance Prévoyance"
      description="La prévoyance est essentielle pour protéger vos proches en cas d’imprévu. Nous vous aidons à choisir des garanties cohérentes avec votre situation, afin d’anticiper l’impact financier d’un arrêt, d’une invalidité ou d’un décès (selon contrats)."
      image={{
        src: product?.illustrationSrc,
        alt: "Assurance prévoyance",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      mainCard={{
        title: "Garanties fréquentes",
        description:
          "La prévoyance vise à compléter vos protections existantes. Selon vos besoins, on peut privilégier la protection des revenus, la protection des proches, ou des garanties spécifiques.",
      }}
      sideCard={{
        title: "À qui s’adresse-t-elle ?",
        description:
          "Indépendants, professions libérales, salariés : nous ajustons les garanties à votre statut et à vos besoins.",
        bullets: ["Devis gratuit", "Garanties expliquées clairement", "Conseil personnalisé"],
        actions: [{ label: "Demander un devis", href: "/demander-un-devis" }],
      }}
      features={[
        {
          title: "Maintien de Salaire",
          description: "En cas d'arrêt maladie ou d'accident, nous compensons la perte de revenus pour que vous puissiez continuer à vivre normalement.",
          icon: Activity,
          colSpan: 2,
        },
        {
          title: "Capital Décès",
          description: "Un montant garanti versé à vos bénéficiaires pour faire face aux premières nécessités et couvrir les droits de succession.",
          icon: Heart
        },
        {
          title: "Rente Invalidité",
          description: "Une rente mensuelle versée si vous ne pouvez plus exercer votre métier, pour sécuriser votre avenir.",
          icon: Hourglass
        },
        {
          title: "Accidents de la Vie",
          description: "Une couverture spécifique pour les accidents domestiques (bricolage, chute) souvent exclus des autres contrats.",
          icon: Umbrella
        }
      ]}
      faq={[
        {
          question: "Est-ce utile si je suis salarié ?",
          answer: "Oui, car la Sécurité Sociale et votre mutuelle d'entreprise ne couvrent souvent qu'une partie de votre salaire (souvent 50 à 70%). La prévoyance comble ce manque."
        },
        {
          question: "Qu'est-ce que la franchise ?",
          answer: "C'est le nombre de jours d'arrêt pendant lesquels vous n'êtes pas indemnisé. Pour les indépendants, nous proposons des franchises courtes (3, 15 ou 30 jours)."
        },
        {
          question: "Le capital décès est-il imposable ?",
          answer: "Non, le capital décès versé aux bénéficiaires désignés est généralement exonéré de droits de succession (selon la législation en vigueur et l'âge à la souscription)."
        }
      ]}
      extra={
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold">Assurance décès-invalidité</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                L’assurance décès-invalidité est un contrat qui vise à protéger financièrement vos
                proches en cas de décès ou de perte totale et irréversible d’autonomie suite à un
                accident (selon garanties).
              </p>
              <p className="max-w-prose">
                En cas de coup dur, un capital peut aider à faire face aux difficultés financières qui
                pourraient survenir. En choisissant une protection adaptée, vous anticipez l’impact
                financier d’un événement imprévu.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Assurance obsèques</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                L’assurance obsèques permet de prévoir et de financer ses funérailles à l’avance, afin
                de soulager financièrement et mentalement ses proches.
              </p>
              <p className="max-w-prose">
                Elle peut également vous permettre de choisir une entreprise de pompes funèbres et
                d’organiser certains détails selon vos souhaits (selon contrats).
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Garantie accident de la vie</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Les accidents de la vie courante peuvent avoir des conséquences dramatiques, tant sur
                le plan physique que financier. Une garantie accident de la vie peut vous protéger en
                cas d’accident domestique, bricolage, jardinage, sport, chute ou malaise (selon
                garanties).
              </p>
              <p className="max-w-prose">
                Selon le contrat, elle peut couvrir certains frais et contribuer à compenser une perte
                de revenus liée à une incapacité de travail temporaire ou permanente.
              </p>
              <p className="max-w-prose text-xs leading-relaxed">
                Les garanties, exclusions et délais varient selon les contrats. Un devis personnalisé
                permet de comparer précisément selon votre profil.
              </p>
            </div>
          </section>
        </div>
      }
    />
  );
}





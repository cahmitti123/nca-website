import type { Metadata } from "next";

import { ProductLanding } from "@/components/public/product-landing";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Assurance Emprunteur | Net Courtage Assurances",
  description:
    "Protégez votre investissement immobilier avec notre assurance emprunteur. Découvrez nos offres compétitives pour une protection personnalisée.",
};

export default function AssuranceEmprunteurPage() {
  const product = getInsuranceProduct("assurance-emprunteur");
  return (
    <ProductLanding
      breadcrumbs={[
        { label: "Accueil", href: "/" },
        { label: "Assurances", href: "/portail/offres" },
        { label: "Assurance Emprunteur" },
      ]}
      badges={["Crédit immobilier", "Protection"]}
      title="Assurance Emprunteur"
      description="Net Courtage Assurances vous propose une assurance emprunteur adaptée à vos besoins et à votre budget. L’objectif : protéger votre investissement et sécuriser votre projet immobilier en cas d’aléas (selon garanties), avec un contrat compréhensible et aligné sur votre situation."
      image={{
        src: product?.illustrationSrc,
        alt: "Assurance emprunteur",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      mainCard={{
        title: "Points clés",
        description:
          "L’achat d’un bien immobilier est un engagement important. Une assurance de prêt bien cadrée vise à protéger l’emprunteur et ses proches en cas d’événements de vie impactant la capacité de remboursement.",
        bullets: [
          "Garanties : décès, PTIA, ITT, IPT (selon les contrats).",
          "Choix du niveau de couverture et des quotités.",
          "Analyse de votre situation (âge, profession, projet, antécédents).",
          "Lecture des exclusions, délais et conditions de mise en jeu.",
          "Accompagnement pour comprendre le contrat avant signature.",
        ],
      }}
      sideCard={{
        title: "Notre approche",
        description:
          "Nous cadrons votre besoin, on compare les options pertinentes, puis on vous explique les garanties et les exclusions pour décider sereinement.",
        bullets: ["Devis gratuit et personnalisé", "Conseil sur mesure", "Accompagnement en cas de sinistre"],
        actions: [{ label: "Demander un devis", href: "/demander-un-devis" }],
      }}
      extra={
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold">Pourquoi souscrire une assurance emprunteur ?</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                L’achat d’une maison ou d’un appartement représente souvent un investissement majeur. Une
                assurance emprunteur vise à sécuriser ce projet : en cas d’incapacité de travail ou de
                décès, votre assurance peut prendre en charge tout ou partie des mensualités (selon
                garanties, conditions et exclusions).
              </p>
              <p className="max-w-prose">
                L’essentiel est de choisir une protection cohérente avec votre profil, votre budget et
                les exigences de votre financement, pour éviter les mauvaises surprises au moment où vous
                en avez besoin.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Une assurance sur mesure</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Chez Net Courtage Assurances, nous sommes à l’écoute de vos besoins et de vos attentes.
                Nous vous proposons une assurance de prêt sur mesure, adaptée à votre situation
                personnelle et professionnelle.
              </p>
              <p className="max-w-prose">
                Concrètement, on ajuste ensemble les garanties utiles, les quotités et les options, puis
                on valide les exclusions, délais et conditions de mise en jeu (selon contrats).
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Souscription simple & accompagnement</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Souscrire une assurance de prêt avec Net Courtage Assurances est simple : contactez-nous
                pour obtenir un devis gratuit et personnalisé en fonction de votre profil et de votre
                projet immobilier.
              </p>
              <p className="max-w-prose">
                Notre équipe vous accompagne à chaque étape de la souscription et vous aide à comprendre
                les garanties proposées ainsi que les exclusions éventuelles. En cas de sinistre, nous
                mettons tout en œuvre pour vous aider à faire valoir vos droits (selon le contrat
                souscrit).
              </p>
            </div>
          </section>
        </div>
      }
    />
  );
}





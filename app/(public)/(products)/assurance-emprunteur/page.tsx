import type { Metadata } from "next";

import { ProductLanding } from "@/components/public/product-landing";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Assurance Emprunteur | Net Courtage Assurances",
  description:
    "Protégez votre investissement immobilier avec notre assurance emprunteur. Découvrez nos offres compétitives pour une protection personnalisée.",
};

import { Home, PiggyBank, RefreshCw, FileText } from "lucide-react";

export default function AssuranceEmprunteurPage() {
  const product = getInsuranceProduct("assurance-emprunteur");
  return (
    <ProductLanding
      badges={["Crédit immobilier", "Protection"]}
      title="Assurance Emprunteur"
      description="Net Courtage Assurances vous propose une assurance emprunteur adaptée à vos besoins et à votre budget. L’objectif : protéger votre investissement et sécuriser votre projet immobilier en cas d’aléas, avec un contrat compréhensible et aligné sur votre situation."
      image={{
        src: product?.illustrationSrc,
        alt: "Assurance emprunteur",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      mainCard={{
        title: "Points clés",
        description:
          "L’achat d’un bien immobilier est un engagement important. Une assurance de prêt bien cadrée vise à protéger l’emprunteur et ses proches en cas d’événements de vie impactant la capacité de remboursement.",
      }}
      sideCard={{
        title: "Notre approche",
        description:
          "Nous cadrons votre besoin, on compare les options pertinentes, puis on vous explique les garanties et les exclusions pour décider sereinement.",
        bullets: ["Devis gratuit et personnalisé", "Conseil sur mesure", "Accompagnement en cas de sinistre"],
        actions: [{ label: "Demander un devis", href: "/demander-un-devis" }],
      }}
      features={[
        {
          title: "Économies Massives",
          description: "La délégation d'assurance permet souvent d'économiser des milliers d'euros par rapport à l'offre de votre banque, à garanties équivalentes.",
          icon: PiggyBank,
          colSpan: 2,
        },
        {
          title: "Loi Lemoine",
          description: "Vous pouvez désormais changer d'assurance de prêt à tout moment, sans frais ni pénalité. Nous gérons tout.",
          icon: RefreshCw
        },
        {
          title: "Formalités Simplifiées",
          description: "Dans de nombreux cas, plus besoin de questionnaire de santé (sous conditions de montant et d'âge).",
          icon: FileText
        },
        {
          title: "Garanties Pertinentes",
          description: "Décès, PTIA, IPT, ITT... Nous vous expliquons chaque acronyme pour que vous sachiez exactement ce que vous signez.",
          icon: Home
        }
      ]}
      faq={[
        {
          question: "La banque peut-elle refuser mon assurance externe ?",
          answer: "Non, si les garanties sont au moins équivalentes à celles qu'elle propose. Nous nous assurons de cette équivalence pour garantir l'acceptation."
        },
        {
          question: "Faut-il refaire tous les examens médicaux ?",
          answer: "Pas forcément ! Avec la Loi Lemoine, le questionnaire de santé est supprimé pour les prêts immobiliers de moins de 200 000 € (par assuré) dont le terme intervient avant 60 ans."
        },
        {
          question: "Quand puis-je changer d'assurance ?",
          answer: "À TOUT MOMENT. Depuis 2022, la résiliation est possible n'importe quand. N'attendez plus pour économiser."
        }
      ]}
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





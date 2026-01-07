import type { Metadata } from "next";

import { ProductLanding } from "@/components/public/product-landing";
import { getInsuranceProduct } from "@/lib/insurance-products";

export const metadata: Metadata = {
  title: "Assurance Moto | Net Courtage Assurances",
  description:
    "Découvrez les meilleures assurances moto en ligne et comparez-les pour trouver celle qui convient le mieux à vos besoins.",
};

import { Shield, Bike, CloudRain, User } from "lucide-react";

export default function AssuranceMotoPage() {
  const product = getInsuranceProduct("assurance-moto");
  return (
    <ProductLanding
      badges={["Moto", "Protection"]}
      title="Assurance Moto"
      description="Il est possible de trouver une assurance moto à un prix raisonnable en définissant précisément vos besoins et en comparant les offres. Selon votre profil et votre moto, on ajuste les garanties pour obtenir un contrat cohérent à un prix compétitif."
      image={{
        src: product?.illustrationSrc,
        alt: "Assurance moto",
        fallbackSrc: product?.fallbackCoverSrc,
      }}
      mainCard={{
        title: "Ce que l’on compare",
        description: "Nous passons en revue le niveau de couverture (tiers, vol/incendie, tous risques), les options utiles selon votre usage, et les paramètres clés.",
      }}
      sideCard={{
        title: "À savoir",
        description:
          "Nous adaptons la formule selon votre expérience, votre zone et votre fréquence d’utilisation.",
        bullets: ["Devis gratuit", "Comparaison des formules", "Explications claires des garanties"],
        actions: [{ label: "Demander un devis", href: "/demander-un-devis" }],
      }}
      features={[
        {
          title: "Protection du Pilote",
          description: "La garantie conducteur est essentielle. Nous veillons à ce qu'elle soit incluse et suffisante.",
          icon: User,
          colSpan: 2,
        },
        {
          title: "Garantie Équipement",
          description: "Casque, gants, blouson... Votre équipement coûte cher, assurez-le correctement.",
          icon: Shield
        },
        {
          title: "Assistance 0km",
          description: "En cas de panne ou de crevaison, même en bas de chez vous, vous êtes dépanné.",
          icon: Bike
        },
        {
          title: "Hivernage",
          description: "Suspension des garanties ou réduction de tarif si vous ne roulez pas l'hiver.",
          icon: CloudRain
        }
      ]}
      faq={[
        {
          question: "Quelle assurance moto est la moins chère ?",
          answer: "La formule d’assurance moto la moins coûteuse est la responsabilité civile, aussi connue sous le nom d’assurance au tiers. Cette formule représente la couverture minimale requise par la loi."
        },
        {
          question: "Comment calculer mon bonus moto ?",
          answer: "Le bonus moto est calculé en fonction de vos années sans accidents responsables. En général, chaque année sans sinistre vous permet de bénéficier d’un bonus de 5%. Pour connaître votre bonus moto actuel, vous pouvez demander un relevé d’informations à votre assurance."
        },
        {
          question: "Puis-je assurer une moto de collection ?",
          answer: "Oui, nous avons des offres spécifiques pour les véhicules de collection, avec des tarifs souvent très avantageux pour un usage loisir."
        }
      ]}
      extra={
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold">Comment trouver une assurance moto abordable ?</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Trouver une assurance moto à un tarif abordable peut sembler difficile, mais c’est
                possible en travaillant sur les bons critères : profil du conducteur, type de moto, et
                niveau de couverture souhaité.
              </p>
              <p className="max-w-prose">
                En ajustant ces critères en fonction de vos besoins réels, vous pouvez économiser sur la
                cotisation tout en conservant une protection cohérente.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Les formules d’assurance moto à connaître</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              <p className="max-w-prose">
                Lorsque vous souscrivez une assurance moto, vous avez le choix entre plusieurs formules.
                La plus économique est l’assurance <strong>au tiers</strong> (responsabilité civile).
              </p>
              <p className="max-w-prose">
                Si vous voulez une protection supplémentaire, l’option <strong>vol-incendie</strong> peut
                être pertinente. Enfin, la formule la plus complète est l’assurance{" "}
                <strong>tous risques</strong>, qui couvre également les dommages que vous pourriez subir
                vous-même (selon contrats).
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Quel est le coût d’une assurance moto ?</h2>
            <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
              <p className="max-w-prose">
                Les coûts varient selon le profil, la cylindrée, la zone et les garanties. D’après des
                données partenaires, voici des prix moyens constatés pour une moto{" "}
                <strong>125 cm³</strong> (indicatif) :
              </p>
              <ul className="max-w-prose list-disc space-y-1 pl-4">
                <li>Au tiers : à partir de 220€ / an</li>
                <li>Intermédiaire : à partir de 310€ / an</li>
                <li>Tous risques : à partir de 440€ / an</li>
              </ul>
              <p className="max-w-prose text-xs leading-relaxed">
                Ces montants sont indicatifs et susceptibles d’évoluer. Un devis personnalisé reste la
                référence.
              </p>
            </div>
          </section>

          <section className="border-muted/60 space-y-2 border-t pt-6">
            <h2 className="text-base font-semibold">Questions fréquentes</h2>
            <div className="space-y-2">
              <details className="rounded-lg border border-muted/60 bg-background/50 px-4 py-3">
                <summary className="cursor-pointer text-foreground font-medium">
                  Quelle assurance moto est la moins chère ?
                </summary>
                <div className="pt-2 text-muted-foreground text-sm leading-relaxed">
                  La formule d’assurance moto la moins coûteuse est la responsabilité civile, aussi
                  connue sous le nom d’assurance au tiers. Cette formule représente la couverture
                  minimale requise par la loi.
                </div>
              </details>

              <details className="rounded-lg border border-muted/60 bg-background/50 px-4 py-3">
                <summary className="cursor-pointer text-foreground font-medium">
                  Comment calculer mon bonus moto ?
                </summary>
                <div className="pt-2 text-muted-foreground text-sm leading-relaxed">
                  Le bonus moto est calculé en fonction de vos années sans accidents responsables. En
                  général, chaque année sans sinistre vous permet de bénéficier d’un bonus de 5%. Pour
                  connaître votre bonus moto actuel, vous pouvez demander un relevé d’informations à
                  votre assurance.
                </div>
              </details>
            </div>
          </section>
        </div>
      }
    />
  );
}





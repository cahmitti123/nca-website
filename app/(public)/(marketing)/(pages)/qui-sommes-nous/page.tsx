import type { Metadata } from "next";
import Image from "next/image"; // Added Image import

import { ContactCtaCard } from "@/components/public/contact-cta-card";
import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPexelsImageUrl } from "@/lib/pexels";
import { PEXELS_DEFAULT_LOCALE, PEXELS_DEFAULT_REVALIDATE_SECONDS } from "@/lib/stock-images";

export const metadata: Metadata = {
  title: "Qui sommes-nous | Net Courtage Assurances",
  description:
    "Net Courtage Assurances (NCA) — courtier en assurances à Rozay-en-Brie. Accompagnement personnalisé depuis 2007.",
};

export default async function AboutPage() {
  const teamImage = await getPexelsImageUrl("professional team meeting office", {
     orientation: "landscape",
     size: "large",
     locale: PEXELS_DEFAULT_LOCALE,
     revalidateSeconds: PEXELS_DEFAULT_REVALIDATE_SECONDS,
  });

  return (
    <PageShell className="max-w-5xl mx-auto">
      <PageIntro
        align="center"
        kicker={<span className="text-primary font-semibold uppercase tracking-wider text-xs">Notre Agence</span>}
        title="Qui sommes-nous"
        description={
          <>
            Net Courtage Assurances (NCA) est votre partenaire de confiance à Rozay-en-Brie. 
            Depuis 2007, nous simplifions l'assurance pour vous offrir clarté, économies et sérénité.
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start text-left">
        <div className="space-y-6">
          <Card className="border-muted/60 bg-primary/5 border-none shadow-sm">
             <CardHeader>
                <CardTitle className="text-xl text-primary">Notre Mission</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4 text-base text-muted-foreground leading-relaxed">
               <p>
                 Nous ne sommes pas juste des vendeurs de contrats. Notre mission est de démêler la complexité 
                 des assurances pour vous permettre de prendre les bonnes décisions.
               </p>
               <p>
                 Que vous soyez un particulier cherchant à protéger sa famille ou un professionnel sécurisant son activité, 
                 nous sommes là pour analyser, comparer et conseiller.
               </p>
             </CardContent>
          </Card>

          <Card className="border-muted/60">
            <CardHeader>
              <CardTitle className="text-lg">Pourquoi nous choisir ?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Indépendance totale vis-à-vis des compagnies",
                  "Expertise locale et proximité (77)",
                  "Accompagnement humain (pas de robots)",
                  "Service sinistre dédié et réactif"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="size-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
           <ContactCtaCard
            title="Besoin d'un audit ?"
            description="Passez nous voir à l'agence ou appelez-nous pour faire le point sur vos contrats actuels."
          />
           <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted/20 shadow-lg border border-border/50">
              {teamImage ? (
                  <Image 
                    src={teamImage} 
                    alt="L'équipe NCA à votre service" 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-medium">
                   Photo Équipe
                </div>
              )}
           </div>
        </div>
      </div>
    </PageShell>
  );
}





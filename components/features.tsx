import Link from "next/link";

import { BrandBand } from "@/components/public/brand-band";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BadgeCheck, MessageSquareText, Scale, Zap } from "lucide-react";

const Features = () => {
  return (
    <BrandBand variant="soft">
      <div className="space-y-10 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border">
          <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Pourquoi passer par NCA ?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
            Un accompagnement simple, transparent et adapté à votre situation. Nous vous aidons à
            comparer, à comprendre les garanties, et à choisir une couverture cohérente — sans
            complexité inutile.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative h-full rounded-2xl p-0.5">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <Card className="relative h-full border-muted/60">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Scale className="size-4 text-primary" aria-hidden="true" />
                Comparaison claire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4 text-sm text-muted-foreground sm:text-base">
              <p>
                Nous analysons vos besoins et comparons les solutions disponibles pour vous proposer
                des choix lisibles.
              </p>
              <p>
                <Tooltip content="La demande de devis n’implique aucune obligation.">
                  <span className="underline decoration-dotted underline-offset-4">
                    Sans engagement
                  </span>
                </Tooltip>{" "}
                et avec des explications compréhensibles.
              </p>
              <p>
                Vous savez ce qui est inclus, ce qui ne l’est pas, et ce qui change d’un niveau de
                couverture à l’autre.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative h-full rounded-2xl p-0.5">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <Card className="relative h-full border-muted/60">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <MessageSquareText className="size-4 text-primary" aria-hidden="true" />
                Conseil personnalisé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4 text-sm text-muted-foreground sm:text-base">
              <p>
                Un conseiller vous aide à choisir les garanties utiles (et éviter le
                superflu).
              </p>
              <p>
                Objectif : le bon niveau de protection au bon prix, en tenant compte de votre profil
                (usage, situation, priorités) et de votre budget.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative h-full rounded-2xl p-0.5 sm:col-span-2 lg:col-span-1">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <Card className="relative h-full border-muted/60">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Zap className="size-4 text-primary" aria-hidden="true" />
                Réactivité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4 text-sm text-muted-foreground sm:text-base">
              <p>Demandez un devis en quelques minutes, sans démarche compliquée.</p>
              <p>
                Nous vous recontactons rapidement pour finaliser votre dossier, répondre aux questions
                et valider les documents utiles.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap">
        <Button asChild>
          <Link href="/demander-un-devis">Je demande mon devis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/portail/offres">Découvrir nos assurances</Link>
        </Button>
      </div>
      </div>
    </BrandBand>
  );
};

export default Features;

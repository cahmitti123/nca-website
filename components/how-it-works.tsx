import Link from "next/link";
import type { ReactNode } from "react";

import { BrandBand } from "@/components/public/brand-band";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  FileText,
  SearchCheck,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <BrandBand variant="soft">
      <div className="space-y-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border">
            <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Comment ça marche
            </h2>
            <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
              Un parcours simple : vous décrivez votre besoin, nous comparons, puis on finalise
              ensemble. L’objectif : des options lisibles, des garanties expliquées clairement, et une
              décision sereine.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <StepBentoCard
            className="lg:col-span-5"
            step="01"
            icon={FileText}
            meta="2–3 min"
            title="Décrivez votre besoin"
            description="Remplissez une demande de devis en quelques minutes. On collecte l’essentiel (profil, usage, priorités) pour comparer efficacement — sans vous demander plus que nécessaire."
            bullets={[
              "Formulaire simple, mobile-first",
              "Devis gratuit et sans engagement",
              "Aucune obligation de souscription",
              "Réponse rapide de nos conseillers",
            ]}
          />

          <StepBentoCard
            className="lg:col-span-7"
            step="02"
            icon={SearchCheck}
            meta="Comparaison claire"
            title="Analyse & comparaison"
            description="Nous comparons garanties, options et niveaux de couverture selon votre profil. Vous recevez des choix lisibles, avec une explication des points qui font vraiment la différence."
            bullets={[
              "Garanties utiles, expliquées simplement",
              "Options pertinentes selon vos priorités",
              "Franchises, délais et exclusions clarifiés",
              "Optimisation du budget, sans superflu",
            ]}
          >
            <div className="grid gap-2 rounded-xl border border-border/60 bg-background/60 p-3 text-xs text-foreground/90 dark:bg-background/20 sm:grid-cols-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Garanties</span>
                <span className="font-medium">Priorisées</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Niveaux</span>
                <span className="font-medium">Comparés</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Franchises</span>
                <span className="font-medium">Clarifiées</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Délais</span>
                <span className="font-medium">Anticipés</span>
              </div>
            </div>
          </StepBentoCard>

          <StepBentoCard
            className="lg:col-span-7"
            step="03"
            icon={CheckCircle2}
            meta="Accompagnement"
            title="Validation & souscription"
            description="Vous choisissez. On vous accompagne pour finaliser le dossier, réunir les documents utiles, et mettre en place la couverture en toute clarté (selon contrats)."
            bullets={[
              "Aide à la décision, sans pression",
              "Dossier guidé et documents simplifiés",
              "Suivi après la mise en place",
            ]}
          />

          <CtaBentoCard className="lg:col-span-5" />
        </div>
      </div>
    </BrandBand>
  );
}

type StepBentoCardProps = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  meta?: string;
  bullets: readonly string[];
  className?: string;
  children?: ReactNode;
};

function StepBentoCard({
  step,
  title,
  description,
  icon: Icon,
  meta,
  bullets,
  className,
  children,
}: StepBentoCardProps) {
  return (
    <Card
      className={cn(
        "border-muted/60 bg-background/60 dark:bg-background/20 relative h-full overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-primary/10 blur-3xl"
      />

      <CardHeader className="pb-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-background text-foreground flex size-10 items-center justify-center rounded-xl border">
              <Icon className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-background/50">
                Étape {step}
              </Badge>
              {meta ? (
                <Badge variant="secondary" className="bg-secondary/60">
                  {meta}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>

        <CardTitle className="mt-4 text-lg leading-snug sm:text-xl">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 text-sm text-muted-foreground sm:text-base">
        <p className="leading-relaxed">{description}</p>

        {children ? <div className="pt-1">{children}</div> : null}

        <ul className="space-y-2">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function CtaBentoCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-primary text-primary-foreground",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary-foreground/15 via-transparent to-transparent"
      />

      <CardHeader className="pb-0">
        <div className="bg-primary-foreground/10 flex size-10 items-center justify-center rounded-xl border border-primary-foreground/20">
          <BadgeCheck className="size-5 text-primary-foreground" aria-hidden="true" />
        </div>
        <CardTitle className="mt-4 text-xl leading-snug sm:text-2xl">
          Démarrer en 2 minutes
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 text-sm sm:text-base">
        <p className="text-primary-foreground/90 leading-relaxed">
          Envoyez votre demande de devis. On revient vers vous rapidement avec des options claires,
          adaptées, et une lecture simple des garanties (et de leurs limites) pour décider sereinement.
        </p>

        <div className="flex flex-col gap-2">
          <Button
            asChild
            className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/demander-un-devis">
              Demander un devis
              <ArrowRight
                className="ml-2 size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>

          <Button
            variant="secondary"
            asChild
            className="border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15"
          >
            <Link href="/services-clients-reclamations">
              Services clients & réclamations
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

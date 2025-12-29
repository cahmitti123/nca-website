import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insuranceProducts } from "@/lib/insurance-products";
import { ArrowUpRight, Bike, Car, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Portail d’informations | Net Courtage Assurances",
  description: "Informations utiles et ressources sur les assurances.",
};

function SolutionCard(props: {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  tags?: string[];
}) {
  const Icon = props.icon;
  return (
    <Link href={props.href} className="group block">
      <Card className="border-muted/60 transition-shadow group-hover:shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <ArrowUpRight
              className="text-muted-foreground size-4 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>
          <CardTitle className="font-heading text-base">{props.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{props.description}</p>
          {props.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {props.tags.map((t) => (
                <Badge key={t} variant="secondary" className="bg-muted/40">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function PortailPage() {
  const moto = insuranceProducts.find((p) => p.key === "assurance-moto");
  const auto = insuranceProducts.find((p) => p.key === "assurance-auto");
  const sante = insuranceProducts.find((p) => p.key === "mutuelle-sante");

  return (
    <PageShell className="space-y-10">
      <PageIntro
        breadcrumbs={
          <>
            <Link href="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Portail d’informations</span>
          </>
        }
        kicker={
          <Badge variant="secondary" className="border-primary/15 bg-primary/10 text-primary">
            Portail info
          </Badge>
        }
        title="Centre de ressources"
        description={
          <div className="space-y-2">
            <p>
              Retrouvez ici nos guides pratiques, des explications claires sur vos contrats et les
              réponses aux questions les plus fréquentes.
            </p>
            <p>
              L’objectif est simple : vous aider à y voir clair avant une demande de devis (garanties,
              options, franchises, délais, exclusions) et à avancer avec les bonnes informations, sans
              jargon inutile.
            </p>
          </div>
        }
      />

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Nos solutions d’assurance
            </h2>
            <p className="text-muted-foreground text-sm">
              Un aperçu de nos principales solutions : cliquez pour voir le détail et comprendre les
              options selon votre profil.
            </p>
          </div>
          <Button variant="link" className="px-0 sm:self-end" asChild>
            <Link href="/portail/offres">Voir tout</Link>
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {moto ? (
            <SolutionCard
              title={moto.title}
              description={moto.description}
              href={moto.href}
              icon={Bike}
              tags={["Tous risques", "Jeunes conducteurs"]}
            />
          ) : null}
          {auto ? (
            <SolutionCard
              title={auto.title}
              description={auto.description}
              href={auto.href}
              icon={Car}
              tags={["Malussés", "Au tiers"]}
            />
          ) : null}
          {sante ? (
            <SolutionCard
              title={sante.title}
              description={sante.description}
              href={sante.href}
              icon={HeartPulse}
              tags={["Seniors", "Famille"]}
            />
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-semibold tracking-tight">Guides pratiques</h2>
          <p className="text-muted-foreground text-sm">
            Ressources utiles pour mieux comprendre, comparer, puis avancer avec une décision éclairée.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-muted/60 md:col-span-2">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Comment résilier son contrat d’assurance ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Les démarches, les délais, et les points à vérifier avant de changer de contrat (date
                d’échéance, garanties, franchises, et continuité de couverture).
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/blog">Lire les articles</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-muted/60">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Documents utiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Mentions légales, confidentialité, cookies, réclamations : toutes les informations
                réglementaires réunies au même endroit.
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/espace-juridique">Accéder</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}





import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { partners } from "@/lib/partners";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos partenaires | Net Courtage Assurances",
  description: "Nos partenaires assureurs et courtiers grossistes, pour des solutions adaptées à votre profil.",
};

export default function PartnersPage() {
  return (
    <PageShell>
      <PageIntro
        align="center"
        kicker={<span className="text-primary font-semibold uppercase tracking-wider text-xs">Réseau</span>}
        title="Nos partenaires de confiance"
        description="Nous collaborons avec les meilleures compagnies d'assurance pour négocier les offres les plus avantageuses pour vous."
        className="mb-12"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {partners.map((p) => (
          <Card key={p.name} className="border-muted/60 hover:border-primary/40 hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4 border-b border-border/40 bg-muted/5">
              {p.logo ? (
                <div className="mb-3 flex items-center justify-center h-16 w-full rounded-lg bg-white p-2 shadow-sm">
                  <div className="relative h-full w-full">
                    <Image
                      src={p.logo.src}
                      alt={p.logo.alt}
                      fill
                      sizes="200px"
                      className={cn("object-contain", p.logo.className)}
                    />
                  </div>
                </div>
              ) : null}
              <CardTitle className="text-base text-center">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <p className="text-muted-foreground text-xs leading-relaxed text-center line-clamp-3">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px] px-1.5 h-5 bg-muted/50">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center max-w-2xl mx-auto space-y-6 bg-muted/20 p-8 rounded-2xl border border-border/50">
        <h3 className="text-lg font-semibold">Une indépendance totale</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Cette liste n'est pas exhaustive. Notre indépendance nous permet de solliciter le partenaire 
          qui aura la meilleure réponse à <strong>votre</strong> besoin spécifique, sans conflit d'intérêt.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row justify-center pt-2 gap-4">
          <Button asChild size="lg">
            <Link href="/demander-un-devis">Comparer les offres</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/">Retour à l’accueil</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}





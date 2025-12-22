import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { partners } from "@/lib/partners";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos partenaires | Net Courtage Assurances",
  description: "Nos partenaires assureurs et comparateurs.",
};

export default function PartnersPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Nos partenaires</h1>
        <p className="text-muted-foreground text-sm">
          Nous collaborons avec des partenaires reconnus afin de proposer des solutions adaptées à
          vos besoins (particuliers et professionnels).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p) => (
          <Card key={p.name} className="border-muted/60">
            <CardHeader className="pb-0">
              {p.logo ? (
                <div className="mb-3 flex items-center justify-center rounded-xl border border-border/60 bg-primary/10 p-3 dark:bg-white/90">
                  <div className="relative h-10 w-full">
                    <Image
                      src={p.logo.src}
                      alt={p.logo.alt}
                      fill
                      sizes="320px"
                      className={cn("object-contain", p.logo.className)}
                    />
                  </div>
                </div>
              ) : null}
              <CardTitle className="text-base">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-muted-foreground text-sm">
        Liste indicative basée sur notre page « Partenaires d’assurances ». Pour connaître la
        solution la plus adaptée, demandez un devis : nous vous orientons vers le bon partenaire
        selon votre profil.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild>
          <Link href="/contact-reclamations/demande">Demander un devis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </div>
  );
}





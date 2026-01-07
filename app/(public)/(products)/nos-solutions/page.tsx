import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insuranceProducts } from "@/lib/insurance-products";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Toutes nos solutions | Net Courtage Assurances",
  description: "Découvrez notre gamme complète d’assurances pour particuliers et professionnels.",
};

// Group definitions for the hub
const SECTIONS = [
  {
    id: "vehicle",
    title: "Véhicules",
    description: "Roulez en toute sérénité avec nos offres sur-mesure.",
    products: insuranceProducts.filter((p) => p.group === "vehicle"),
  },
  {
    id: "health",
    title: "Santé & Famille",
    description: "Protégez-vous et vos proches à chaque étape de la vie.",
    products: insuranceProducts.filter((p) => p.group === "health"),
  },
  {
    id: "property",
    title: "Immobilier & Pro",
    description: "Sécurisez vos biens et votre activité professionnelle.",
    products: insuranceProducts.filter((p) => p.group === "property"),
  },
] as const;

export default function SolutionsHubPage() {
  return (
    <PageShell>
      <PageIntro
        title="Toutes nos solutions"
        description="Une couverture adaptée à chaque moment de votre vie. Explorez nos offres et trouvez la protection qu'il vous faut."
      />

      <div className="space-y-12">
        {SECTIONS.map((section) => (
          <section key={section.id} className="space-y-6">
            <div className="space-y-1 border-b border-border/40 pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{section.title}</h2>
              <p className="text-muted-foreground text-base max-w-prose">
                {section.description}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.products.map((product) => (
                <Link key={product.key} href={product.href} className="group block h-full">
                  <Card className="h-full border-muted/60 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="pb-4 relative">
                      <div className="mb-4 relative aspect-video w-full overflow-hidden rounded-lg bg-muted/20">
                          <Image
                            src={product.illustrationSrc ?? product.fallbackCoverSrc}
                            alt={product.title}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          />
                      </div>
                      <CardTitle className="flex items-center justify-between text-lg group-hover:text-primary transition-colors">
                        {product.label}
                        <ArrowRight className="size-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                         <Badge variant="secondary" className="text-xs font-normal">
                           {product.category}
                         </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

import Link from "next/link";

import { BrandBand } from "@/components/public/brand-band";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteContact } from "@/lib/site-contact";
import { ArrowRight, BadgeCheck, PhoneCall } from "lucide-react";

export function CtaBand() {
  return (
    <BrandBand variant="primary">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15">
              <BadgeCheck className="mr-1 size-3.5" aria-hidden="true" />
              Gratuit
            </Badge>
            <Badge className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15">
              Personnalisé
            </Badge>
            <Badge className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15">
              Efficace
            </Badge>
          </div>

          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Obtenez votre devis personnalisé dès maintenant
          </h2>
          <p className="max-w-prose text-pretty text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
            Décrivez votre besoin en quelques minutes : nous revenons vers vous avec des options
            claires, adaptées à votre profil, et des explications compréhensibles (garanties, niveaux,
            franchises, exclusions). Basés à Rozay-en-Brie, nous vous accompagnons avec
            professionnalisme, de la comparaison jusqu’à la mise en place.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/demander-un-devis">
              Demander mon devis <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href={`tel:${siteContact.phonePrimary.tel}`}>
              <PhoneCall className="mr-2 size-4" aria-hidden="true" />
              Appeler {siteContact.phonePrimary.display}
            </a>
          </Button>
          <div className="text-primary-foreground/80 text-xs">
            Ou {siteContact.phoneSecondary.display} · {siteContact.hours.display}
          </div>
        </div>
      </div>
    </BrandBand>
  );
}



import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FullBleed } from "@/components/public/full-bleed";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-words";
import { siteContact } from "@/lib/site-contact";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  PhoneCall,
  Scale,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function Hero() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Couverture adaptée",
      description: "Des garanties utiles, expliquées simplement.",
    },
    {
      icon: Scale,
      title: "Comparaison claire",
      description: "On compare pour vous, sans jargon inutile.",
    },
    {
      icon: UserRound,
      title: "Conseiller dédié",
      description: "Un interlocuteur pour vous guider du début à la fin.",
    },
  ] as const;

  return (
    <FullBleed>
      <section>
        <AuroraBackground className="min-h-dvh items-center justify-center rounded-none border-b px-4 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="gap-1">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Devis gratuit
                  </Badge>
                  <Badge variant="default" className="gap-1">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Sans engagement
                  </Badge>
                  <Badge variant="default" className="gap-1">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Conseillers experts
                  </Badge>
                </div>

                <h1 className="font-heading mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-7xl capitalize">
                  Votre courtier en assurance pour <br />
                  <FlipWords
                    words={[
                      "la mutuelle santé",
                      "l’emprunteur",
                      "l’auto",
                      "la moto",
                      "la prévoyance",
                      "la décennale",
                    ]}
                    className="px-0"
                  />
                </h1>

                <p className="text-muted-foreground mt-5 max-w-prose text-pretty text-base leading-relaxed font-medium sm:text-lg">
                  Net Courtage Assurances &quot; NCA &quot; vous accompagne pour comparer et
                  souscrire les solutions adaptées à votre profil, avec un service client
                  clair et réactif.
                </p>

                <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button asChild size="lg" className="group">
                    <Link href="/contact-reclamations/demande">
                      Demander un devis
                      <ArrowRight
                        className="ml-2 size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <a href={`tel:${siteContact.phonePrimary.tel}`}>
                      <PhoneCall className="mr-2 size-4" aria-hidden="true" />
                      Appeler un expert
                    </a>
                  </Button>
                  <Button variant="ghost" asChild size="lg">
                    <Link href="/portail/offres">Voir nos offres</Link>
                  </Button>
                </div>
              </div>

              <div className="w-full lg:flex lg:justify-end">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-muted/60 bg-muted/40 shadow-sm ring-1 ring-foreground/10 lg:max-w-xl">
                  <Image
                    src="/hero-placeholder.svg"
                    alt="Illustration (à venir)"
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="border-muted/60 bg-background/60 rounded-2xl border p-4 backdrop-blur"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-background text-foreground flex size-9 items-center justify-center rounded-md border">
                      <item.icon className="size-4 text-primary" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold">{item.title}</div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AuroraBackground>
      </section>
    </FullBleed>
  );
}

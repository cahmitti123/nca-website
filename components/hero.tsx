import Link from "next/link";
import Image from "next/image";

import { FullBleed } from "@/components/public/full-bleed";
import { FlipWords } from "@/components/ui/flip-words";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteContact } from "@/lib/site-contact";
import { ArrowUpRight, PhoneCall } from "lucide-react";

const HERO_WORDS = [
  "la mutuelle santé",
  "l'emprunteur",
  "l'auto",
  "la moto",
  "la prévoyance",
  "la décennale",
] as const;

export default function Hero() {

  return (
    <FullBleed>
      <section className="relative w-full overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(var(--primary)/0.08),transparent_60%)]"
        />

        <div className="mx-auto grid min-h-[calc(100dvh-3rem)] w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2 lg:gap-14 lg:py-0">
          <div className="my-auto">
              <Badge variant="secondary" className="rounded-full py-1 border-border" asChild>
                <Link href="/qui-sommes-nous">
                  Basés à Rozay-en-Brie · Depuis 2007{" "}
                  <ArrowUpRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </Badge>

              <h1 className="font-heading mt-6 max-w-[18ch] text-balance text-4xl font-extrabold capitalize leading-[1.15] tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                <span className=" text-foreground/80">
                  Votre courtier en assurance pour
                </span ><br />
                <span className="text-primary font-bold">
                  <FlipWords
                    duration={3200}
                    className="px-0 font-bold text-primary"
                    words={HERO_WORDS}
                  />
                </span>
              </h1>

              <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-foreground/75 sm:text-lg">
                Comparez, comprenez, puis choisissez une couverture adaptée à votre situation. Nous
                vous aidons à clarifier vos besoins, à lire les garanties (et leurs limites), et à
                sélectionner une formule cohérente avec votre budget — sans pression et sans jargon.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Button size="lg" className="rounded-full text-base" asChild>
                  <Link href="/demander-un-devis">
                    Demander un devis <ArrowUpRight className="ml-1 size-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-background/60 text-base shadow-none"
                  asChild
                >
                  <a href={`tel:${siteContact.phonePrimary.tel}`}>
                    <PhoneCall className="mr-2 size-5" aria-hidden="true" /> Appeler
                  </a>
                </Button>
              </div>

              <div className="text-muted-foreground mt-3 text-sm">
                Ou {siteContact.phoneSecondary.display} · {siteContact.hours.display}
              </div>
          </div>

          <div className="relative my-auto aspect-[5/4] w-full overflow-visible rounded-xl sm:aspect-[16/9]">
            <Image
              src="/illustrations/hero_illustration_1.png"
              alt="Famille protégée par les assurances NCA"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain scale-110"
            />
          </div>
        </div>
      </section>
    </FullBleed>
  );
}

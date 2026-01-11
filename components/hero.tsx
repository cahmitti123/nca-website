import Link from "next/link";
import Image from "next/image";

import { FullBleed } from "@/components/public/full-bleed";
import { FlipWords } from "@/components/ui/flip-words";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteContact } from "@/lib/site-contact";
import { ArrowRight, Car, CheckCircle2, Heart, Home, Phone, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { ButtonGroup } from "./ui/button-group";

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
      <section className="relative flex w-full min-h-[95dvh] flex-col justify-center overflow-hidden bg-transparent pt-24 pb-12 lg:pt-32 lg:pb-24">
        {/* Abstract Background Shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[500px] w-[500px] rounded-full bg-transparent blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-24 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl"
        />

        <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-8 flex items-center gap-3">
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-medium border-primary/20 bg-primary/5 text-primary" asChild>
                <Link href="/qui-sommes-nous">
                  <span className="size-1.5 bg-primary rounded-full inline-block mr-2 animate-pulse" />
                  Depuis 2007 à Rozay-en-Brie
                </Link>
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="size-3.5 fill-primary text-primary" />
                <span className="ml-1 text-xs font-semibold text-muted-foreground">4.9/5</span>
              </div>
            </div>

            <h1 className="font-heading text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
              Votre courtier en assurance pour <br className="hidden lg:block" />
              <span className="text-primary inline-block min-w-[280px]">
                <FlipWords
                  duration={3000}
                  className="px-0 text-primary"
                  words={HERO_WORDS}
                />
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Comparez et économisez sur vos contrats. Nous simplifions l&apos;assurance pour les particuliers et les professionnels, avec un accompagnement humain et transparent.
            </p>

            <div className="mt-10">
              <ButtonGroup className="rounded-xl p-1.5 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 ring-1 ring-black/5 w-full">
                <Button  variant="outline" className="rounded-lg px-8 text-base font-semibold  transition-all w-1/2 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" asChild>
                  <Link href="/demander-un-devis">
                    Obtenir mon devis
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  
                  className="rounded-lg px-6 text-base font-medium text-foreground/80 hover:text-foreground transition-colors w-1/2 "
                  asChild
                >
                  <a href={`tel:${siteContact.phonePrimary.tel}`}>
                    <Phone className="mr-2 size-4 opacity-70" />
                    Appeler un expert
                  </a>
                </Button>
              </ButtonGroup>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-medium text-foreground/80">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-50/30 px-4 py-2 shadow-sm backdrop-blur-md dark:border-emerald-800/30 dark:bg-emerald-900/20">
                <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <span>Devis gratuit</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/30 px-4 py-2 shadow-sm backdrop-blur-md dark:border-blue-800/30 dark:bg-blue-900/20">
                <div className="flex size-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <span>Sans engagement</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-50/30 px-4 py-2 shadow-sm backdrop-blur-md dark:border-amber-800/30 dark:bg-amber-900/20">
                <div className="flex size-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <Star className="size-3.5 fill-current" />
                </div>
                <span>100% Personnalisé</span>
              </div>
            </div>
          </div>

          {/* Right Column: Image Composition */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              {/* Column 1: Main Tall Image */}
              <div className="col-span-7 relative z-10">
                <div className="relative aspect-3/4 w-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl">
                  <Image
                    src="/illustrations/youssra/3.png"
                    alt="Protection famille"
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-20" />
                </div>
                
                {/* Floating Card: Mes Protections */}
                <div className="absolute -left-6 bottom-12 z-20 w-52 rounded-2xl bg-white/90 p-4 shadow-xl border border-white/50 backdrop-blur-md animate-in fade-in slide-in-from-left-4 duration-700 delay-300 dark:bg-card/90 dark:border-border/50">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mes Protections</span>
                    <ShieldCheck className="size-4 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-background/50 p-2 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30">
                          <Heart className="size-3.5" />
                        </div>
                        <span className="text-xs font-semibold">Santé</span>
                      </div>
                      <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background/50 p-2 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                          <Car className="size-3.5" />
                        </div>
                        <span className="text-xs font-semibold">Auto</span>
                      </div>
                      <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background/50 p-2 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                          <Home className="size-3.5" />
                        </div>
                        <span className="text-xs font-semibold">Habitat</span>
                      </div>
                      <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Stacked Images */}
              <div className="col-span-5 flex flex-col gap-4 lg:gap-6 pt-12 lg:pt-16">
                {/* Top Small Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-muted shadow-xl ring-1 ring-border/10">
                  <Image
                    src="/illustrations/youssra/5.png"
                    alt="Conseiller expert"
                    fill
                    sizes="(min-width: 1024px) 20vw, 30vw"
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Badge on Image */}
                  <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold shadow-sm backdrop-blur-sm">
                    Expert
                  </div>
                </div>

                {/* Bottom Small Image */}
                <div className="relative w-full">
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] bg-muted shadow-xl ring-1 ring-border/10">
                    <Image
                      src="/illustrations/youssra/1.png"
                      alt="Client satisfait"
                      fill
                      sizes="(min-width: 1024px) 20vw, 30vw"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  
                  {/* Floating Card: Economies */}
                  <div className="absolute -right-6 bottom-8 z-20 w-auto rounded-2xl bg-white/90 p-3.5 shadow-xl border border-white/50 backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-700 delay-500 dark:bg-card/90 dark:border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                        <TrendingUp className="size-5" />
                      </div>
                      <div className="pr-2">
                        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Economies</div>
                        <div className="text-sm font-bold text-foreground">-350€ <span className="text-[10px] font-normal text-muted-foreground">/an</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FullBleed>
  );
}

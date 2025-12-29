import { BrandBand } from "@/components/public/brand-band";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardContent } from "@/components/ui/card";
import { getPexelsImageUrls } from "@/lib/pexels";
import { Star } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  fallbackSrc: string;
};

const testimonialBase: Testimonial[] = [
  {
    quote: "Des explications claires et une proposition adaptée à mon dossier.",
    name: "Client NCA",
    designation: "Assurance emprunteur",
    fallbackSrc: "/avatar-n.svg",
  },
  {
    quote: "Réactifs et disponibles. J’ai pu comparer plusieurs options rapidement.",
    name: "Client NCA",
    designation: "Mutuelle santé",
    fallbackSrc: "/avatar-c.svg",
  },
  {
    quote: "Un accompagnement simple, sans pression, avec des garanties bien expliquées.",
    name: "Client NCA",
    designation: "Assurance auto",
    fallbackSrc: "/avatar-a.svg",
  },
  {
    quote: "De bons conseils, une présentation claire des garanties, et un suivi sérieux.",
    name: "Client NCA",
    designation: "Prévoyance",
    fallbackSrc: "/avatar-c.svg",
  },
  {
    quote: "On m’a proposé plusieurs scénarios, avec les avantages et limites expliqués.",
    name: "Client NCA",
    designation: "Assurance emprunteur",
    fallbackSrc: "/avatar-n.svg",
  },
  {
    quote: "Des échanges efficaces et un dossier géré sans relances interminables.",
    name: "Client NCA",
    designation: "Assurance auto",
    fallbackSrc: "/avatar-a.svg",
  },
  {
    quote: "Une recommandation pertinente, alignée sur mes besoins et mon budget.",
    name: "Client NCA",
    designation: "Mutuelle santé",
    fallbackSrc: "/avatar-c.svg",
  },
  {
    quote: "Une démarche simple, des réponses rapides, et une proposition bien cadrée.",
    name: "Client NCA",
    designation: "Assurance décennale",
    fallbackSrc: "/avatar-n.svg",
  },
  {
    quote: "J’ai apprécié la clarté des comparatifs et la transparence sur les exclusions.",
    name: "Client NCA",
    designation: "Responsabilité civile",
    fallbackSrc: "/avatar-a.svg",
  },
  {
    quote: "Un accompagnement professionnel du début à la fin, sans jargon inutile.",
    name: "Client NCA",
    designation: "Prévoyance",
    fallbackSrc: "/avatar-c.svg",
  },
  {
    quote: "Un vrai gain de temps: options triées, explications nettes, décision facilitée.",
    name: "Client NCA",
    designation: "Mutuelle santé",
    fallbackSrc: "/avatar-n.svg",
  },
  {
    quote: "Un suivi rassurant et des points d’étape clairs pendant toute la procédure.",
    name: "Client NCA",
    designation: "Assurance emprunteur",
    fallbackSrc: "/avatar-a.svg",
  },
  {
    quote: "Des échanges fluides et une solution adaptée, sans aller-retours inutiles.",
    name: "Client NCA",
    designation: "Assurance moto",
    fallbackSrc: "/avatar-n.svg",
  },
  {
    quote: "Conseils précis et démarche rapide: tout est structuré, on sait où on va.",
    name: "Client NCA",
    designation: "Assurance décennale",
    fallbackSrc: "/avatar-c.svg",
  },
  {
    quote: "Une comparaison utile et une proposition cohérente, avec des réponses fiables.",
    name: "Client NCA",
    designation: "Assurance auto",
    fallbackSrc: "/avatar-a.svg",
  },
  {
    quote: "Très clair sur les franchises et les points importants. Rien n’est laissé au hasard.",
    name: "Client NCA",
    designation: "Assurance habitation",
    fallbackSrc: "/avatar-n.svg",
  },
  {
    quote: "Une démarche structurée et des options bien expliquées, sans pression commerciale.",
    name: "Client NCA",
    designation: "Responsabilité civile",
    fallbackSrc: "/avatar-c.svg",
  },
  {
    quote: "Disponibles et pédagogues. J’ai compris les garanties avant de choisir.",
    name: "Client NCA",
    designation: "Mutuelle santé",
    fallbackSrc: "/avatar-a.svg",
  },
  {
    quote: "Un accompagnement efficace, avec un vrai sens du détail sur les conditions.",
    name: "Client NCA",
    designation: "Assurance emprunteur",
    fallbackSrc: "/avatar-n.svg",
  },
  {
    quote: "Conseils adaptés à mon activité, avec des garanties pertinentes et bien cadrées.",
    name: "Client NCA",
    designation: "Assurance professionnelle",
    fallbackSrc: "/avatar-c.svg",
  },
];

const Testimonials = async () => {
  const portraitUrls = await getPexelsImageUrls("portrait smiling professional", {
    perPage: testimonialBase.length,
    page: 1,
    orientation: "portrait",
    size: "medium",
    locale: "fr-FR",
    // Keep stable + avoid hitting the API too often.
    revalidateSeconds: 60 * 60 * 24 * 30,
  });

  const testimonials = testimonialBase.map((t, idx) => ({
    quote: t.quote,
    name: t.name,
    designation: t.designation,
    src: portraitUrls[idx] ?? t.fallbackSrc,
  }));

  const columns = 4;
  const columnItems = Array.from({ length: columns }, () => [] as (typeof testimonials)[number][]);
  for (const [idx, t] of testimonials.entries()) {
    columnItems[idx % columns]?.push(t);
  }
  

  const speeds = [25, 32, 19, 45, 28, 36];
  type CSSVarStyle = CSSProperties & { [key: `--${string}`]: string | number };

  return (
    <BrandBand variant="soft">
      <div className="space-y-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border">
            <Star className="size-5 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Retours clients
            </h2>
            <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
              Des exemples de retours sur notre accompagnement (comparaison, explications, suivi). Nous
              mettrons en avant des avis vérifiés dès qu’ils seront disponibles, en veillant à garder
              une présentation claire et utile.
            </p>
          </div>
          <div className="text-muted-foreground flex items-center justify-center gap-1 text-xs">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3.5 fill-primary text-primary" aria-hidden="true" />
            ))}
            <span className="ml-2">Satisfaction client</span>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {columnItems.map((items, colIdx) => (
            <div
              key={colIdx}
              className={[
                "relative h-120 overflow-hidden",
                // Fade testimonials at the top/bottom edges of each column.
                "mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
                "[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
              ].join(" ")}
            >
              <Marquee
                vertical
                reverse={colIdx % 2 === 1}
                pauseOnHover
                repeat={2}
                style={
                  {
                    "--duration": `${speeds[colIdx % speeds.length] ?? 40}s`,
                    "--gap": "0.75rem",
                  } as CSSVarStyle
                }
                className={[
                  "h-full p-2",
                ].join(" ")}
              >
                {items.map((t, idx) => (
                  <Card
                    key={`${colIdx}-${idx}`}
                    className="border-muted/60 bg-background/70 shadow-none ring-0 py-0"
                    size="sm"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {[0, 1, 2, 3, 4].map((starIdx) => (
                          <Star
                            key={starIdx}
                            className="size-3.5 fill-primary text-primary"
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                        “{t.quote}”
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <Image
                          src={t.src}
                          alt={t.name}
                          width={40}
                          height={40}
                          className="ring-foreground/10 size-10 rounded-full object-cover ring-1"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{t.name}</p>
                          <p className="text-muted-foreground truncate text-xs">
                            {t.designation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      </div>
    </BrandBand>
  );
};

export default Testimonials;



import { Marquee } from "@/components/ui/marquee";
import { DotBackground } from "@/components/ui/dot-background";
import { Building2 } from "lucide-react";
import { FullBleed } from "./public/full-bleed";
import Image from "next/image";
import { partners } from "@/lib/partners";
import { cn } from "@/lib/utils";

const LogoCloud = () => {
  const partnersWithLogos = partners.filter((p) => p.logo);

  return (
    <FullBleed>
    <DotBackground className="border-muted/60 bg-muted/10 overflow-hidden rounded-2xl border p-6 sm:p-8 ">
      <div className="space-y-4 py-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-background text-foreground flex size-10 items-center justify-center rounded-md border">
            <Building2 className="size-5 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Assureurs & partenaires
            </h2>
            <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
              Une sélection d&apos;acteurs reconnus pour vous proposer des solutions adaptées.
            </p>
          </div>
        </div>

        <div className="relative">
          <Marquee pauseOnHover className="[--duration:60s]">
            {partnersWithLogos.map((partner) => (
              <div
                key={partner.name}
                className="group relative flex items-center justify-center rounded-md border border-border/0 px-0 py-3 shadow-xs transition-colors cursor-pointer "
                title={partner.name}
              >
                <div className="relative h-6 w-32 ">
                  <Image
                    src={partner.logo!.src}
                    alt={partner.logo!.alt}
                    fill
                    sizes="144px"
                    className={cn(
                      // Simple visibility fix: subtle drop-shadow ensures light logos
                      // remain readable even on light backgrounds.
                      "object-contain drop-shadow grayscale-40 transition-[filter] duration-300 group-hover:grayscale-0",
                      partner.logo!.className,
                    )}
                  />
                </div>
              </div>
            ))}
          </Marquee>


        </div>
      </div>
    </DotBackground>
    </FullBleed>
  );
};

export default LogoCloud;

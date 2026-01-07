import { BrandBand } from "@/components/public/brand-band";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Eye, Handshake, MessageCircle, Timer } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type StatItem = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const statItems: readonly StatItem[] = [
  {
    title: "Clarté",
    description: "Des propositions lisibles, des garanties expliquées, et des choix assumés.",
    icon: Eye,
  },
  {
    title: "Accompagnement",
    description: "Un interlocuteur pour vous guider et répondre à vos questions.",
    icon: MessageCircle,
  },
  {
    title: "Efficacité",
    description: "Un parcours rapide pour obtenir un devis et finaliser votre dossier.",
    icon: Timer,
  },
] as const;

function StatCard({ title, description, icon: Icon }: StatItem) {
  return (
    <div className="border-muted/60 bg-background/80 text-foreground backdrop-blur-sm rounded-2xl border p-5 z-30">
      <div className="flex items-start gap-3">
        <div className="bg-background text-foreground flex size-9 shrink-0 aspect-square items-center justify-center rounded-md border">
          <Icon className="size-4 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-1">
          <div className="text-base font-semibold">{title}</div>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}

const Stats = () => {
  return (
    <BrandBand variant="primary" contain={false}>
      <BackgroundLines className="bg-transparent">
        <div className="relative z-20 mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border z-30">
              <Handshake className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Nos engagements
              </h2>
              <p className="mx-auto max-w-prose text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                Une expérience simple — de la demande de devis à la souscription.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statItems.map((item) => (
              <StatCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </BackgroundLines>
    </BrandBand>
  );
};

export default Stats;

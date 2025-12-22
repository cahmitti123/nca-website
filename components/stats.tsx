import { BrandBand } from "@/components/public/brand-band";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Eye, Handshake, MessageCircle, Timer } from "lucide-react";

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
            <div className="border-muted/60 bg-background/80 text-foreground backdrop-blur-sm rounded-2xl border p-5 z-30">
              <div className="flex items-start gap-3">
                <div className="bg-background text-foreground flex size-9 items-center justify-center rounded-md border">
                  <Eye className="size-4 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-semibold">Clarté</div>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    Des propositions lisibles, des garanties expliquées, et des choix
                    assumés.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-muted/60 bg-background/80 text-foreground backdrop-blur-sm rounded-2xl border p-5 z-30">
              <div className="flex items-start gap-3">
                <div className="bg-background text-foreground flex size-9 items-center justify-center rounded-md border">
                  <MessageCircle
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-semibold">Accompagnement</div>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    Un interlocuteur pour vous guider et répondre à vos questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-muted/60 bg-background/80 text-foreground backdrop-blur-sm rounded-2xl border p-5 z-30">
              <div className="flex items-start gap-3">
                <div className="bg-background text-foreground flex size-9 items-center justify-center rounded-md border">
                  <Timer className="size-4 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-semibold">Efficacité</div>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    Un parcours rapide pour obtenir un devis et finaliser votre
                    dossier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundLines>
    </BrandBand>
  );
};

export default Stats;

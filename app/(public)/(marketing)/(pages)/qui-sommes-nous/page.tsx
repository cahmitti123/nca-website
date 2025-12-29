import type { Metadata } from "next";

import { ContactCtaCard } from "@/components/public/contact-cta-card";
import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Qui sommes-nous | Net Courtage Assurances",
  description:
    "Net Courtage Assurances (NCA) — courtier en assurances à Rozay-en-Brie. Accompagnement personnalisé depuis 2007.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageIntro
        title="Qui sommes-nous"
        description={
          <>
            Net Courtage Assurances (NCA) est un courtier en assurance basé à Rozay-en-Brie, en
            Île-de-France. Notre priorité : vous aider à choisir une couverture claire, adaptée et
            au bon prix.
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-muted/60 lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Notre mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm text-muted-foreground">
            <p className="max-w-prose leading-relaxed">
              Nous comparons et proposons des solutions d’assurance pour particuliers et professionnels,
              en nous appuyant sur notre expérience et nos partenaires assureurs.
            </p>
            <p className="max-w-prose leading-relaxed">
              Notre rôle est de vous faire gagner du temps et de la clarté : comprendre les garanties,
              les niveaux, les franchises et les exclusions, puis choisir une protection cohérente avec
              votre situation.
            </p>
            <ul className="max-w-prose list-disc space-y-2 pl-4">
              <li>Analyse de votre besoin et de vos priorités.</li>
              <li>Comparaison d’options adaptées à votre profil.</li>
              <li>Explications lisibles avant toute décision.</li>
              <li>Accompagnement jusqu’à la souscription et le suivi.</li>
            </ul>
          </CardContent>
        </Card>

        <ContactCtaCard
          title="Contact"
          description="Besoin d’un conseil ? Faites une demande et nous vous recontactons."
          className="lg:self-start"
        />
      </div>
    </PageShell>
  );
}





import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Espace Juridique | Net Courtage Assurances",
  description: "Ressources juridiques et informations utiles.",
};

export default function EspaceJuridiquePage() {
  return (
    <PageShell>
      <PageIntro
        breadcrumbs={
          <>
            <Link href="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Espace juridique</span>
          </>
        }
        kicker={
          <Badge variant="secondary" className="border-primary/15 bg-primary/10 text-primary">
            Conformité
          </Badge>
        }
        title="Espace Juridique"
        description={
          <>
            Retrouvez ici les informations légales et les liens utiles (confidentialité, CGU,
            réclamations, contact).
          </>
        }
      />

      <div className="bg-background/60 border-muted/60 flex items-center gap-2 rounded-xl border px-3 py-2">
        <Search className="text-muted-foreground size-4" aria-hidden="true" />
        <Input
          aria-label="Rechercher un document"
          placeholder="Rechercher un document…"
          className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          disabled
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Gérer les cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Comprendre l’usage des cookies et modifier vos préférences.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/gerer-les-cookies">Consulter</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Politique de confidentialité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Informations sur la collecte et l’utilisation des données.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/politique-de-confidentialite">Consulter</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Mentions légales &amp; CGU</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">Informations légales et conditions.</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/mentions-legales-cgu">Consulter</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Services clients &amp; réclamations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Pour une question, un devis, ou déposer une réclamation.
            </p>
            <Button size="sm" asChild>
              <Link href="/services-clients-reclamations">Accéder</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Politique de réclamations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-muted-foreground text-sm">
              Déposer une réclamation via le formulaire dédié.
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/politique-de-reclamations">Accéder</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Accès rapide</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
          <Button size="sm" variant="outline" asChild>
            <Link href="/blog">Nos articles</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/contact-reclamations">Contact &amp; formulaires</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/demander-un-devis">Demander un devis</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}





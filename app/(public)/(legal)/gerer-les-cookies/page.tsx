import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro, PageShell } from "@/components/public/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Gérer les cookies | Net Courtage Assurances",
  description:
    "Politique relative aux cookies (date d’entrée en vigueur : 24 avril 2023, dernière mise à jour : 24 avril 2023).",
};

export default function CookiePolicyPage() {
  return (
    <PageShell>
      <PageIntro
        title="Gérer les cookies"
        description="Date d’entrée en vigueur : 24 avril 2023 — Dernière mise à jour : 24 avril 2023."
      />

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Politique relative aux cookies</CardTitle>
        </CardHeader>
        <CardContent className="rich-content pt-4">
          <h2>Qu’est-ce que les cookies ?</h2>
          <p>
            Cette politique relative aux cookies explique ce que sont les cookies et comment nous
            les utilisons, les types de cookies que nous utilisons, les informations que nous
            recueillons à l’aide des cookies et comment ces informations sont utilisées, ainsi que
            la façon de gérer les paramètres des cookies.
          </p>
          <p>
            Les cookies sont de petits fichiers texte utilisés pour stocker de petites quantités
            d’informations. Ils sont stockés sur votre appareil lorsque le site web est chargé
            dans votre navigateur. Ces cookies nous aident à faire fonctionner le site web
            correctement, à le rendre plus sûr, à fournir une meilleure expérience utilisateur et à
            comprendre comment le site web fonctionne et à analyser ce qui fonctionne et là où il
            doit être amélioré.
          </p>

          <h2>Comment utilisons-nous les cookies ?</h2>
          <p>
            Comme la plupart des services en ligne, notre site web utilise des cookies internes et
            tiers à plusieurs fins. Les cookies internes sont principalement nécessaires pour que le
            site web fonctionne correctement et ne collectent aucune de vos données personnelles
            identifiables.
          </p>
          <p>
            Les cookies tiers utilisés sur notre site web sont principalement destinés à comprendre
            comment le site web fonctionne, comment vous interagissez avec notre site web, à
            maintenir nos services sécurisés, à fournir des publicités pertinentes et, dans
            l’ensemble, à vous offrir une meilleure expérience utilisateur et à aider à accélérer
            vos futures interactions avec notre site web.
          </p>

          <h2>Gérer vos préférences</h2>
          <p>
            Vous pouvez modifier vos préférences de cookies à tout moment via la bannière de
            consentement (si elle est affichée), ou depuis les paramètres de votre navigateur.
          </p>
          <p>
            En plus de cela, les différents navigateurs fournissent différentes méthodes pour
            bloquer et supprimer les cookies utilisés par les sites web. Vous pouvez modifier les
            paramètres de votre navigateur pour bloquer/supprimer les cookies. Ci-dessous, vous
            trouverez des liens vers la documentation officielle de quelques navigateurs :
          </p>
          <ul>
            <li>
              Chrome :{" "}
              <a
                href="https://support.google.com/accounts/answer/32050"
                target="_blank"
                rel="noreferrer"
              >
                https://support.google.com/accounts/answer/32050
              </a>
            </li>
            <li>
              Safari :{" "}
              <a
                href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noreferrer"
              >
                https://support.apple.com/fr-fr/guide/safari/sfri11471/mac
              </a>
            </li>
            <li>
              Firefox :{" "}
              <a
                href="https://support.mozilla.org/fr/kb/effacer-les-cookies-et-les-donnees-des-sites-dans-firefox?redirectslug=effacer-les-cookies-pour-supprimer-les-informations-des-sites&redirectlocale=fr"
                target="_blank"
                rel="noreferrer"
              >
                https://support.mozilla.org/fr/kb/effacer-les-cookies-et-les-donnees-des-sites-dans-firefox
              </a>
            </li>
            <li>
              Internet Explorer :{" "}
              <a
                href="https://support.microsoft.com/fr-fr/topic/supprimer-et-g%C3%A9rer-les-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                target="_blank"
                rel="noreferrer"
              >
                https://support.microsoft.com/fr-fr/topic/supprimer-et-gerer-les-cookies
              </a>
            </li>
          </ul>
          <p>
            Si vous utilisez un autre navigateur web, veuillez consulter la documentation officielle
            de votre navigateur.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" asChild>
          <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
        </Button>
        <Button asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </PageShell>
  );
}





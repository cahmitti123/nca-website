import type { Metadata } from "next";

import { PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { siteContact } from "@/lib/site-contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplaintForm } from "./complaint-form";
import { Clock, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Déposer une réclamation | Net Courtage Assurances",
  description: "Déposez une réclamation, nous vous recontacterons rapidement.",
};

export default function ReclamationPage() {
  return (
    <PageShell className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="secondary" className="border-primary/15 bg-primary/10 text-primary">
              Service réclamation
            </Badge>
            <h1 className="font-heading text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Une réclamation ?{" "}
              <span className="text-primary block">Nous sommes à votre écoute.</span>
            </h1>
            <p className="text-muted-foreground text-pretty text-sm leading-relaxed sm:text-base">
              Décrivez votre situation afin que nous puissions traiter votre demande avec attention
              et équité.
            </p>
          </div>

          <Card className="border-muted/60">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Besoin d’aide immédiate ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-primary" aria-hidden="true" />
                <a
                  className="hover:text-foreground transition-colors"
                  href={`tel:${siteContact.phonePrimary.tel}`}
                >
                  {siteContact.phonePrimary.display}
                </a>
                <span className="text-muted-foreground/70">(appel non surtaxé)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-primary" aria-hidden="true" />
                <a
                  className="hover:text-foreground transition-colors"
                  href={`mailto:${siteContact.email}`}
                >
                  {siteContact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden="true" />
                <span>Lun–Ven : {siteContact.hours.display}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-muted/60 overflow-hidden">
          <div
            aria-hidden="true"
            className="h-1.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
          />
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Formulaire de réclamation</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ComplaintForm />
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}





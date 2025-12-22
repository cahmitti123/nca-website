import Link from "next/link";

import { QuoteRequestForm, type QuoteRequestFormProps } from "@/components/forms/quote-request-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type QuoteLandingProps = {
  title: string;
  description: string;
  form?: QuoteRequestFormProps;
};

export function QuoteLanding({ title, description, form }: QuoteLandingProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <Card className="border-muted/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Formulaire</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <QuoteRequestForm {...form} />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" asChild>
          <Link href="/services-clients-reclamations">Services clients &amp; réclamations</Link>
        </Button>
        <Button asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
    </div>
  );
}



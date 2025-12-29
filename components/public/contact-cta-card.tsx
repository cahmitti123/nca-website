import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContact } from "@/lib/site-contact";
import { cn } from "@/lib/utils";

export type ContactCtaAction = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost";
  className?: string;
};

export type ContactCtaCardProps = {
  title?: string;
  description?: string;
  primaryAction?: ContactCtaAction | null;
  secondaryAction?: ContactCtaAction | null;
  className?: string;
};

function ActionButton({ action }: { action: ContactCtaAction }) {
  const isExternal =
    action.href.startsWith("tel:") || action.href.startsWith("mailto:") || action.href.startsWith("http");

  return (
    <Button
      size="sm"
      variant={action.variant ?? "default"}
      className={cn("w-full", action.className)}
      asChild
    >
      {isExternal ? <a href={action.href}>{action.label}</a> : <Link href={action.href}>{action.label}</Link>}
    </Button>
  );
}

export function ContactCtaCard({
  title = "Besoin d’aide ?",
  description = "Un conseiller vous répond rapidement.",
  primaryAction = {
    label: "Demander un devis",
    href: "/contact-reclamations/demande",
    variant: "default",
  },
  secondaryAction = {
    label: "Appeler",
    href: `tel:${siteContact.phonePrimary.tel}`,
    variant: "outline",
    className: "bg-background/60",
  },
  className,
}: ContactCtaCardProps) {
  return (
    <Card className={cn("border-muted/60 bg-primary/5", className)}>
      <CardHeader className="pb-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4 text-sm text-muted-foreground">
        <p>{description}</p>
        <div className="grid gap-2">
          {primaryAction ? <ActionButton action={primaryAction} /> : null}
          {secondaryAction ? <ActionButton action={secondaryAction} /> : null}
        </div>
      </CardContent>
    </Card>
  );
}



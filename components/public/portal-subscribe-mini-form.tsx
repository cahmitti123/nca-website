"use client";

import * as React from "react";
import { useActionState } from "react";

import { subscribePortalUpdatesAction } from "@/app/(public)/(portal)/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type State = { ok?: boolean; error: string | null };
const initialState: State = { error: null };

export function PortalSubscribeMiniForm({ className }: { className?: string }) {
  const [state, formAction, isPending] = useActionState(subscribePortalUpdatesAction, initialState);

  return (
    <div className={cn("border-border/60 bg-muted/20 rounded-lg border p-3", className)}>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">Recevoir nos mises à jour</p>
        <p className="text-muted-foreground text-xs">
          Guides utiles, nouveautés et rappels (max 1 email/mois).
        </p>
      </div>

      <form action={formAction} className="mt-3 space-y-3">
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.com"
          required
        />

        <label className="flex items-start gap-2 text-xs leading-relaxed">
          <Checkbox id="portalSubscribeConsent" name="consentToContact" />
          <span className="text-muted-foreground">
            Je donne mon consentement pour être contacté(e) au sujet de ces contenus, conformément au
            RGPD.
          </span>
        </label>

        {state.ok ? (
          <p className="text-xs">Merci, votre inscription est enregistrée.</p>
        ) : state.error ? (
          <p className="text-destructive text-xs">{state.error}</p>
        ) : null}

        <Button type="submit" size="sm" className="w-full" disabled={isPending}>
          {isPending ? "Envoi…" : "S’abonner"}
        </Button>
      </form>
    </div>
  );
}






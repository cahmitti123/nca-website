"use client";

import * as React from "react";
import { useActionState } from "react";

import { submitComplaintAction } from "@/app/(public)/(forms)/contact-reclamations/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type State = { ok?: boolean; error: string | null };
const initialState: State = { error: null };

const complaintServiceOptions = [
  { value: "Santé", label: "Santé" },
  { value: "Prévoyance", label: "Prévoyance" },
  { value: "Assurance animale", label: "Assurance animale" },
  { value: "Automobile", label: "Automobile" },
  { value: "Habitation", label: "Habitation" },
  { value: "Emprunteur", label: "Emprunteur" },
  { value: "Décennale", label: "Décennale" },
] as const;

export function ComplaintForm() {
  const [insuranceType, setInsuranceType] = React.useState<string>("");
  const [state, formAction, isPending] = useActionState(submitComplaintAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-1.5">
        <Label htmlFor="insuranceType">Service concerné</Label>
        <input type="hidden" name="insuranceType" value={insuranceType} />
        <Select value={insuranceType} onValueChange={setInsuranceType}>
          <SelectTrigger id="insuranceType" className="w-full">
            <SelectValue placeholder="— Veuillez choisir une option —" />
          </SelectTrigger>
          <SelectContent>
            {complaintServiceOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input id="fullName" name="fullName" autoComplete="name" required />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">Votre e-mail</Label>
          <Input id="email" name="email" type="email" autoComplete="email" />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="subject">Objet</Label>
          <Input id="subject" name="subject" autoComplete="off" />
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="message">Merci de décrire votre réclamation</Label>
          <Textarea id="message" name="message" rows={6} required />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <Checkbox id="consentToContact" name="consentToContact" />
        <span>
          Je donne mon consentement pour être contacté(e) au sujet de ma réclamation, conformément
          au RGPD.
        </span>
      </label>

      {state.ok ? (
        <p className="text-sm">
          Merci, votre réclamation a bien été envoyée. Nous reviendrons vers vous rapidement.
        </p>
      ) : state.error ? (
        <p className="text-destructive text-sm">{state.error}</p>
      ) : null}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Envoi…" : "Envoyer"}
      </Button>
    </form>
  );
}



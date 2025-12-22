"use client";

import * as React from "react";
import { useActionState } from "react";

import { submitQuoteRequestAction } from "@/app/(public)/contact-reclamations/actions";
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

export type QuoteRequestFormProps = {
  initialInsuranceType?: string;
  lockInsuranceType?: boolean;
};

const insuranceTypeOptions = [
  { value: "Assurances Santé", label: "Assurances Santé" },
  { value: "Assurances Prévoyance", label: "Assurances Prévoyance" },
  { value: "Assurances Auto", label: "Assurances Auto" },
  { value: "Assurances Moto", label: "Assurances Moto" },
  { value: "Assurances Décennales", label: "Assurances Décennales" },
  { value: "Assurances Emprunteur", label: "Assurances Emprunteur" },
  { value: "Assurances Animalières", label: "Assurances Animalières" },
] as const;

export function QuoteRequestForm({
  initialInsuranceType,
  lockInsuranceType = false,
}: QuoteRequestFormProps = {}) {
  const initial =
    initialInsuranceType &&
    insuranceTypeOptions.some((opt) => opt.value === initialInsuranceType)
      ? initialInsuranceType
      : "";

  const [insuranceType, setInsuranceType] = React.useState<string>(initial);
  const [state, formAction, isPending] = useActionState(submitQuoteRequestAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      {lockInsuranceType ? (
        <div className="grid gap-1.5">
          <Label htmlFor="insuranceType">Type d’assurance</Label>
          <input type="hidden" name="insuranceType" value={insuranceType} />
          <div className="border-input bg-muted/20 text-sm rounded-md border px-3 py-2">
            {insuranceType || "—"}
          </div>
        </div>
      ) : (
        <div className="grid gap-1.5">
          <Label htmlFor="insuranceType">Type d’assurance</Label>
          <input type="hidden" name="insuranceType" value={insuranceType} />
          <Select value={insuranceType} onValueChange={setInsuranceType}>
            <SelectTrigger id="insuranceType" className="w-full">
              <SelectValue placeholder="— Veuillez choisir une option —" />
            </SelectTrigger>
            <SelectContent>
              {insuranceTypeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="fullName">Nom et prénom</Label>
          <Input id="fullName" name="fullName" autoComplete="name" required />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="birthDate">Date de naissance</Label>
          <Input id="birthDate" name="birthDate" type="date" />
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="postalCode">Code postal</Label>
          <Input id="postalCode" name="postalCode" inputMode="numeric" autoComplete="postal-code" />
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="message">Message (optionnel)</Label>
          <Textarea id="message" name="message" rows={4} />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <Checkbox id="consentToContact" name="consentToContact" />
        <span>
          Je donne mon consentement pour être contacté(e) au sujet de ma demande, conformément au
          RGPD.
        </span>
      </label>

      {state.ok ? (
        <p className="text-sm">
          Merci, votre demande a bien été envoyée. Un conseiller vous recontactera rapidement.
        </p>
      ) : state.error ? (
        <p className="text-destructive text-sm">{state.error}</p>
      ) : null}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Envoi…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}



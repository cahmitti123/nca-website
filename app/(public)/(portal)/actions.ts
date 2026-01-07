"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";

function asNonEmptyString(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const s = value.trim();
  return s.length ? s : null;
}

function isValidEmail(email: string) {
  // Simple pragmatic validation for basic forms.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribePortalUpdatesAction(
  _prevState: { ok?: boolean; error: string | null },
  formData: FormData,
): Promise<{ ok?: boolean; error: string | null }> {
  // Honeypot (spam)
  const company = asNonEmptyString(formData.get("company"));
  if (company) return { ok: true, error: null };

  const email = asNonEmptyString(formData.get("email"));
  const consentToContact = formData.get("consentToContact") === "on";

  if (!email) return { error: "Veuillez saisir votre email." };
  if (!isValidEmail(email)) return { error: "Veuillez saisir un email valide." };
  if (!consentToContact) return { error: "Veuillez accepter le consentement (RGPD)." };

  await db.insert(leads).values({
    source: "other",
    fullName: email,
    email,
    consentToContact,
    message: "Inscription — Portail d’informations",
    metadata: {
      form: "portal_subscribe",
    },
  });

  return { ok: true, error: null };
}






"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";

function asNonEmptyString(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const s = value.trim();
  return s.length ? s : null;
}

function parseDateOnly(value: FormDataEntryValue | null): Date | null {
  const s = asNonEmptyString(value);
  if (!s) return null;

  // Expect YYYY-MM-DD from <input type="date" />
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function submitQuoteRequestAction(
  _prevState: { ok?: boolean; error: string | null },
  formData: FormData
): Promise<{ ok?: boolean; error: string | null }> {
  // Honeypot (spam)
  const company = asNonEmptyString(formData.get("company"));
  if (company) return { ok: true, error: null };

  const insuranceType = asNonEmptyString(formData.get("insuranceType"));
  const fullName = asNonEmptyString(formData.get("fullName"));
  const email = asNonEmptyString(formData.get("email"));
  const phone = asNonEmptyString(formData.get("phone"));
  const birthDate = parseDateOnly(formData.get("birthDate"));
  const postalCode = asNonEmptyString(formData.get("postalCode"));
  const message = asNonEmptyString(formData.get("message"));
  const consentToContact = formData.get("consentToContact") === "on";

  if (!insuranceType) return { error: "Veuillez choisir un type d’assurance." };
  if (!fullName) return { error: "Veuillez saisir votre nom et prénom." };
  if (!email) return { error: "Veuillez saisir votre email." };
  if (!consentToContact) return { error: "Veuillez accepter le consentement (RGPD)." };

  await db.insert(leads).values({
    source: "quote_request",
    insuranceType,
    fullName,
    email,
    phone,
    birthDate,
    postalCode,
    message,
    consentToContact,
    metadata: {
      form: "quote_request",
    },
  });

  return { ok: true, error: null };
}

export async function submitComplaintAction(
  _prevState: { ok?: boolean; error: string | null },
  formData: FormData
): Promise<{ ok?: boolean; error: string | null }> {
  // Honeypot (spam)
  const company = asNonEmptyString(formData.get("company"));
  if (company) return { ok: true, error: null };

  const insuranceType = asNonEmptyString(formData.get("insuranceType"));
  const fullName = asNonEmptyString(formData.get("fullName"));
  const email = asNonEmptyString(formData.get("email"));
  const phone = asNonEmptyString(formData.get("phone"));
  const subject = asNonEmptyString(formData.get("subject"));
  const message = asNonEmptyString(formData.get("message"));
  const consentToContact = formData.get("consentToContact") === "on";

  if (!insuranceType) return { error: "Veuillez choisir le service concerné." };
  if (!fullName) return { error: "Veuillez saisir votre nom et prénom." };
  if (!message) return { error: "Veuillez décrire votre réclamation." };
  if (!email && !phone) return { error: "Veuillez fournir au moins un email ou un téléphone." };
  if (!consentToContact) return { error: "Veuillez accepter le consentement (RGPD)." };

  await db.insert(leads).values({
    source: "complaint",
    insuranceType,
    fullName,
    email,
    phone,
    message,
    consentToContact,
    metadata: {
      form: "complaint",
      subject,
    },
  });

  return { ok: true, error: null };
}





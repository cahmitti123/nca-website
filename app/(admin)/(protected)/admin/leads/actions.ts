"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { eq } from "drizzle-orm";

const statusValues = ["new", "in_progress", "won", "lost", "archived"] as const;
type LeadStatus = (typeof statusValues)[number];

function isLeadStatus(value: string): value is LeadStatus {
  return (statusValues as readonly string[]).includes(value);
}

export async function updateLeadAction(formData: FormData): Promise<void> {
  await requireAdmin({ allowedRoles: ["admin", "editor"] });

  const id = String(formData.get("id") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "");

  if (!id) return;
  if (!isLeadStatus(statusRaw)) return;

  await db
    .update(leads)
    .set({
      status: statusRaw,
      internalNotes: internalNotes.length ? internalNotes : null,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, id));

  redirect(`/admin/leads/${id}`);
}





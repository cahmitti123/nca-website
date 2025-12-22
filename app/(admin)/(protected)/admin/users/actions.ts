"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { requireAdmin, type AdminRole } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { eq } from "drizzle-orm";

export type InviteUserState = {
  error: string | null;
};

const roleValues: readonly AdminRole[] = ["admin", "editor"] as const;

function isAdminRole(value: string): value is AdminRole {
  return (roleValues as readonly string[]).includes(value);
}

export async function inviteUserAction(
  _prevState: InviteUserState,
  formData: FormData
): Promise<InviteUserState> {
  await requireAdmin({ allowedRoles: ["admin"] });

  const email = String(formData.get("email") ?? "").trim();
  const roleRaw = String(formData.get("role") ?? "").trim();

  if (!email) return { error: "Email is required." };
  if (!isAdminRole(roleRaw)) return { error: "Invalid role." };

  const supabaseAdmin = createSupabaseAdminClient();
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);

  if (error || !data?.user) {
    return { error: error?.message ?? "Failed to invite user." };
  }

  await db
    .insert(profiles)
    .values({
      id: data.user.id,
      email,
      role: roleRaw,
      disabled: false,
    })
    .onConflictDoUpdate({
      target: profiles.id,
      set: {
        email,
        role: roleRaw,
        disabled: false,
      },
    });

  redirect("/admin/users");
}

export async function updateUserRoleAction(formData: FormData): Promise<void> {
  await requireAdmin({ allowedRoles: ["admin"] });

  const id = String(formData.get("id") ?? "").trim();
  const roleRaw = String(formData.get("role") ?? "").trim();

  if (!id) return;
  if (!isAdminRole(roleRaw)) return;

  await db
    .update(profiles)
    .set({
      role: roleRaw,
      updatedAt: new Date(),
    })
    .where(eq(profiles.id, id));

  redirect(`/admin/users/${id}`);
}

export async function toggleUserDisabledAction(formData: FormData): Promise<void> {
  await requireAdmin({ allowedRoles: ["admin"] });

  const id = String(formData.get("id") ?? "").trim();
  const disabled = String(formData.get("disabled") ?? "").trim() === "true";

  if (!id) return;

  await db
    .update(profiles)
    .set({
      disabled,
      updatedAt: new Date(),
    })
    .where(eq(profiles.id, id));

  redirect(`/admin/users/${id}`);
}

export async function deleteUserAction(formData: FormData): Promise<void> {
  const { userId } = await requireAdmin({ allowedRoles: ["admin"] });

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  if (id === userId) {
    redirect(`/admin/users/${id}?error=self_delete`);
  }

  const supabaseAdmin = createSupabaseAdminClient();
  await supabaseAdmin.auth.admin.deleteUser(id);

  await db.delete(profiles).where(eq(profiles.id, id));

  redirect("/admin/users");
}





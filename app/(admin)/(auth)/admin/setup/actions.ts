"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";

export type SetupActionState = {
  error: string | null;
};

async function hasAnyAdmin(): Promise<boolean> {
  const rows = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.role, "admin"))
    .limit(1);
  return rows.length > 0;
}

function isSetupAllowed(token?: string | null): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const required = process.env.ADMIN_SETUP_TOKEN;
  if (!required) return false;
  return token === required;
}

export async function setupAdminAction(
  _prevState: SetupActionState,
  formData: FormData
): Promise<SetupActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const token = String(formData.get("token") ?? "").trim();

  if (!isSetupAllowed(token || null)) {
    return { error: "Setup is not enabled." };
  }

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (await hasAnyAdmin()) {
    redirect("/admin/login");
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data?.user) {
    return { error: error?.message ?? "Failed to create user." };
  }

  // Ensure profile exists and is admin
  await db
    .insert(profiles)
    .values({
      id: data.user.id,
      email,
      role: "admin",
      disabled: false,
    })
    .onConflictDoUpdate({
      target: profiles.id,
      set: {
        email,
        role: "admin",
        disabled: false,
      },
      where: and(eq(profiles.id, data.user.id)),
    });

  const supabase = await createServerSupabaseClient();
  const signIn = await supabase.auth.signInWithPassword({ email, password });

  if (signIn.error) {
    return { error: signIn.error.message };
  }

  redirect("/admin");
}



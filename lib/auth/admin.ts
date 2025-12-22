import { redirect } from "next/navigation";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export type AdminRole = "admin" | "editor";

export type AdminProfile = {
  id: string;
  email: string;
  role: AdminRole;
  disabled: boolean;
};

export async function requireAdmin(options?: {
  allowedRoles?: readonly AdminRole[];
}): Promise<{
  profile: AdminProfile;
  userId: string;
  userEmail: string | null;
}> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const rows = await db
    .select({
      id: profiles.id,
      email: profiles.email,
      role: profiles.role,
      disabled: profiles.disabled,
    })
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  const profile = rows[0];

  if (!profile) {
    redirect("/admin/login?error=unauthorized");
  }

  if (profile.disabled) {
    redirect("/admin/login?error=disabled");
  }

  const allowedRoles = options?.allowedRoles;
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    redirect("/admin/login?error=forbidden");
  }

  return {
    profile: profile as AdminProfile,
    userId: user.id,
    userEmail: user.email ?? null,
  };
}



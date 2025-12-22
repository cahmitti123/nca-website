import { redirect } from "next/navigation";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

import { SetupForm } from "./setup-form";

type SearchParams = {
  token?: string | string[];
};

async function hasAnyAdmin(): Promise<boolean> {
  const rows = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.role, "admin"))
    .limit(1);
  return rows.length > 0;
}

function isSetupAllowed(token?: string): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const required = process.env.ADMIN_SETUP_TOKEN;
  if (!required) return false;
  return token === required;
}

export default async function AdminSetupPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  if (await hasAnyAdmin()) {
    redirect("/admin/login");
  }

  const sp = await searchParams;
  const token = typeof sp?.token === "string" ? sp.token : undefined;

  if (!isSetupAllowed(token)) {
    return (
      <div className="text-muted-foreground text-sm">
        Setup is disabled.
      </div>
    );
  }

  return <SetupForm token={token} />;
}





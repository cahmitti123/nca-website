import Link from "next/link";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/admin";
import { eq } from "drizzle-orm";

import { UserSettingsForm } from "./user-settings-form";

type Params = {
  id: string;
};

type SearchParams = {
  error?: string | string[];
};

export default async function AdminUserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: Promise<SearchParams>;
}) {
  await requireAdmin({ allowedRoles: ["admin"] });

  const { id } = await params;
  const sp = await searchParams;
  const error = typeof sp?.error === "string" ? sp.error : undefined;

  const rows = await db
    .select({
      id: profiles.id,
      email: profiles.email,
      role: profiles.role,
      disabled: profiles.disabled,
      createdAt: profiles.createdAt,
    })
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);

  const user = rows[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">User</h1>
          <p className="text-muted-foreground text-sm">{user?.email ?? id}</p>
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/admin/users">Back</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <UserSettingsForm
              id={user.id}
              email={user.email}
              role={user.role}
              disabled={user.disabled}
              error={error}
            />
          ) : (
            <div className="text-muted-foreground text-sm">User not found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



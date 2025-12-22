import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/admin";

import { InviteUserForm } from "../invite-user-form";

export default async function AdminInviteUserPage() {
  await requireAdmin({ allowedRoles: ["admin"] });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">Invite user</h1>
          <p className="text-muted-foreground text-sm">
            Sends a Supabase invite email and creates the profile record.
          </p>
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/admin/users">Back</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">New user</CardTitle>
        </CardHeader>
        <CardContent>
          <InviteUserForm />
        </CardContent>
      </Card>
    </div>
  );
}



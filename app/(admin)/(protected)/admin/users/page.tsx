import Link from "next/link";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth/admin";
import { desc } from "drizzle-orm";

export default async function AdminUsersPage() {
  await requireAdmin({ allowedRoles: ["admin"] });

  const rows = await db
    .select({
      id: profiles.id,
      email: profiles.email,
      role: profiles.role,
      disabled: profiles.disabled,
      createdAt: profiles.createdAt,
    })
    .from(profiles)
    .orderBy(desc(profiles.createdAt))
    .limit(200);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">Users</h1>
          <p className="text-muted-foreground text-sm">
            Manage admin access and roles.
          </p>
        </div>
        <Button size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/admin/users/new">Invite user</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base">All users</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground text-sm">
                    No users yet.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">
                      <div className="grid gap-0.5">
                        <span className="truncate">{u.email}</span>
                        <span className="text-muted-foreground text-xs sm:hidden">
                          {u.role}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-sm sm:table-cell">{u.role}</TableCell>
                    <TableCell>
                      {u.disabled ? (
                        <Badge variant="secondary">Disabled</Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden text-sm md:table-cell">
                      {u.createdAt ? u.createdAt.toISOString().slice(0, 10) : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/users/${u.id}`}>Manage</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
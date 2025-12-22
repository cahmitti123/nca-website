import Link from "next/link";

import { db } from "@/db";
import { leads } from "@/db/schema";
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

function statusBadge(status: string) {
  switch (status) {
    case "new":
      return <Badge variant="outline">New</Badge>;
    case "in_progress":
      return <Badge variant="secondary">In progress</Badge>;
    case "won":
      return <Badge>Won</Badge>;
    case "lost":
      return <Badge variant="secondary">Lost</Badge>;
    case "archived":
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default async function AdminLeadsPage() {
  await requireAdmin({ allowedRoles: ["admin", "editor"] });

  const rows = await db
    .select({
      id: leads.id,
      fullName: leads.fullName,
      email: leads.email,
      phone: leads.phone,
      source: leads.source,
      status: leads.status,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(200);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold tracking-tight">Leads</h1>
        <p className="text-muted-foreground text-sm">
          Incoming requests and form entries.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Recent</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-muted-foreground text-sm">
                    No leads yet.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">
                      <div className="grid gap-0.5">
                        <span className="truncate">{l.fullName}</span>
                        <span className="text-muted-foreground text-xs sm:hidden">
                          {[l.email, l.phone].filter(Boolean).join(" • ") || "—"}
                        </span>
                        <span className="text-muted-foreground text-xs sm:hidden">
                          {String(l.source)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-sm sm:table-cell">{l.email ?? "—"}</TableCell>
                    <TableCell className="hidden text-sm md:table-cell">{l.phone ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground hidden text-sm lg:table-cell">
                      {String(l.source)}
                    </TableCell>
                    <TableCell>{statusBadge(String(l.status))}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/leads/${l.id}`}>Open</Link>
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
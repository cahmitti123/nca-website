import Link from "next/link";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { requireAdmin } from "@/lib/auth/admin";
import { eq } from "drizzle-orm";

import { LeadUpdateForm } from "./lead-update-form";

type Params = { id: string };

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  await requireAdmin({ allowedRoles: ["admin", "editor"] });

  const { id } = await params;

  const rows = await db
    .select({
      id: leads.id,
      fullName: leads.fullName,
      email: leads.email,
      phone: leads.phone,
      source: leads.source,
      insuranceType: leads.insuranceType,
      message: leads.message,
      postalCode: leads.postalCode,
      consentToContact: leads.consentToContact,
      status: leads.status,
      internalNotes: leads.internalNotes,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .where(eq(leads.id, id))
    .limit(1);

  const lead = rows[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">Lead</h1>
          <p className="text-muted-foreground text-sm">{lead?.fullName ?? id}</p>
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/admin/leads">Back</Link>
        </Button>
      </div>

      {!lead ? (
        <Card>
          <CardContent className="text-muted-foreground py-6 text-sm">
            Lead not found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{String(lead.source)}</Badge>
                <Badge variant="secondary">{String(lead.status)}</Badge>
              </div>

              <Separator />

              <div className="grid gap-2">
                <div className="text-muted-foreground text-xs">Contact</div>
                <div className="grid gap-1">
                  <div>{lead.email ?? "—"}</div>
                  <div>{lead.phone ?? "—"}</div>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="text-muted-foreground text-xs">Info</div>
                <div className="grid gap-1">
                  <div>Insurance: {lead.insuranceType ?? "—"}</div>
                  <div>Postal code: {lead.postalCode ?? "—"}</div>
                  <div>
                    Consent: {lead.consentToContact ? "Yes" : "No"}
                  </div>
                </div>
              </div>

              {lead.message ? (
                <div className="grid gap-2">
                  <div className="text-muted-foreground text-xs">Message</div>
                  <div className="whitespace-pre-wrap">{lead.message}</div>
                </div>
              ) : null}

              <div className="text-muted-foreground text-xs">
                Created: {lead.createdAt.toISOString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Update</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadUpdateForm
                id={lead.id}
                status={lead.status}
                internalNotes={lead.internalNotes}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}



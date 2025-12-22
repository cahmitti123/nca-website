"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { updateLeadAction } from "../actions";

type LeadStatus = "new" | "in_progress" | "won" | "lost" | "archived";

export function LeadUpdateForm(props: {
  id: string;
  status: LeadStatus;
  internalNotes: string | null;
}) {
  const [status, setStatus] = React.useState<LeadStatus>(props.status);

  return (
    <form action={updateLeadAction} className="space-y-4">
      <input type="hidden" name="id" value={props.id} />
      <input type="hidden" name="status" value={status} />

      <div className="grid gap-1.5">
        <Label>Status</Label>
        <Select value={status} onValueChange={(v) => setStatus(v as LeadStatus)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="internalNotes">Internal notes</Label>
        <Textarea
          id="internalNotes"
          name="internalNotes"
          defaultValue={props.internalNotes ?? ""}
          placeholder="Add notes for your team…"
          className="min-h-28"
        />
      </div>

      <Button type="submit" size="sm">
        Save
      </Button>
    </form>
  );
}





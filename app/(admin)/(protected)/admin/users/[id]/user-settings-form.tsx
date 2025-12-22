"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  deleteUserAction,
  toggleUserDisabledAction,
  updateUserRoleAction,
} from "../actions";

export function UserSettingsForm(props: {
  id: string;
  email: string;
  role: "admin" | "editor";
  disabled: boolean;
  error?: string;
}) {
  const [role, setRole] = React.useState<"admin" | "editor">(props.role);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{props.role}</Badge>
        {props.disabled ? <Badge variant="secondary">Disabled</Badge> : null}
        {props.error === "self_delete" ? (
          <span className="text-destructive text-xs">
            You can’t delete your own account.
          </span>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label>Role</Label>
        <form action={updateUserRoleAction} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={props.id} />
          <input type="hidden" name="role" value={role} />
          <Select value={role} onValueChange={(value) => setRole(value as "admin" | "editor")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <form action={toggleUserDisabledAction}>
          <input type="hidden" name="id" value={props.id} />
          <input
            type="hidden"
            name="disabled"
            value={props.disabled ? "false" : "true"}
          />
          <Button variant="outline" size="sm" type="submit">
            {props.disabled ? "Enable" : "Disable"}
          </Button>
        </form>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete user?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes the user from Supabase Auth and deletes the profile record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={deleteUserAction}>
                <input type="hidden" name="id" value={props.id} />
                <AlertDialogAction type="submit">Delete</AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}





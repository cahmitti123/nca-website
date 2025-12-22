"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { setupAdminAction, type SetupActionState } from "./actions";

const initialState: SetupActionState = { error: null };

export function SetupForm({ token }: { token?: string }) {
  const [state, formAction, isPending] = useActionState<SetupActionState, FormData>(
    setupAdminAction,
    initialState
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Initial admin setup</CardTitle>
        <CardDescription>
          Create the first admin user for this project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token" value={token ?? ""} />

          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
            />
          </div>

          {state.error ? (
            <p className="text-destructive text-xs">{state.error}</p>
          ) : null}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating…" : "Create admin"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}



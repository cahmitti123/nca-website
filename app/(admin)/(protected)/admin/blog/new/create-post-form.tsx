"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createBlogPostAction, type CreatePostState } from "../actions";

const initialState: CreatePostState = { error: null };

export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createBlogPostAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required placeholder="Article title" />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="slug">Slug (optional)</Label>
        <Input id="slug" name="slug" placeholder="ex: assurance-emprunteur-2025" />
      </div>

      {state.error ? <p className="text-destructive text-xs">{state.error}</p> : null}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating…" : "Create draft"}
      </Button>
    </form>
  );
}





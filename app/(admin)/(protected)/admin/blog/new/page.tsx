import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/admin";

import { CreatePostForm } from "./create-post-form";

export default async function AdminNewPostPage() {
  await requireAdmin({ allowedRoles: ["admin", "editor"] });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">New post</h1>
          <p className="text-muted-foreground text-sm">Create a draft article.</p>
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/admin/blog">Back</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Draft</CardTitle>
        </CardHeader>
        <CardContent>
          <CreatePostForm />
        </CardContent>
      </Card>
    </div>
  );
}



import Link from "next/link";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/admin";
import { eq } from "drizzle-orm";

import { PostEditorForm } from "./post-editor-form";

type Params = { id: string };

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  await requireAdmin({ allowedRoles: ["admin", "editor"] });

  const { id } = await params;

  const rows = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      coverImageUrl: blogPosts.coverImageUrl,
      status: blogPosts.status,
      contentHtml: blogPosts.contentHtml,
      contentJson: blogPosts.contentJson,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  const post = rows[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">Edit post</h1>
          <p className="text-muted-foreground text-sm">{post?.title ?? id}</p>
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/admin/blog">Back</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content</CardTitle>
        </CardHeader>
        <CardContent>
          {post ? (
            <PostEditorForm
              id={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              coverImageUrl={post.coverImageUrl}
              status={post.status}
              contentHtml={post.contentHtml}
              contentJson={post.contentJson}
            />
          ) : (
            <div className="text-muted-foreground text-sm">Post not found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



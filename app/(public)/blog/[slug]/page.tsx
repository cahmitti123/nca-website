import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { and, eq } from "drizzle-orm";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const rows = await db
    .select({
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      coverImageUrl: blogPosts.coverImageUrl,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
    .limit(1);

  const post = rows[0];

  if (!post) {
    return {
      title: "Article introuvable | Net Courtage Assurances",
    };
  }

  return {
    title: `${post.title} | Net Courtage Assurances`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const rows = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      coverImageUrl: blogPosts.coverImageUrl,
      contentHtml: blogPosts.contentHtml,
      status: blogPosts.status,
      publishedAt: blogPosts.publishedAt,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  const post = rows[0];

  if (!post) notFound();
  if (post.status !== "published") notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
          <p className="text-muted-foreground text-sm">
            {(post.publishedAt ?? post.updatedAt).toISOString().slice(0, 10)}
          </p>
        </div>
        <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/blog">Retour au blog</Link>
        </Button>
      </div>

      {post.excerpt ? (
        <Card className="border-muted/60">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Résumé</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">{post.excerpt}</CardContent>
        </Card>
      ) : null}

      <article className="rich-content">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  );
}



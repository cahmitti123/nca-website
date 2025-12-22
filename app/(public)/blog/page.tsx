import type { Metadata } from "next";
import Link from "next/link";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { desc, eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Blog | Net Courtage Assurances",
  description: "Actualités et conseils en assurance (santé, emprunteur, auto, prévoyance).",
};

export default async function PublicBlogPage() {
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      coverImageUrl: blogPosts.coverImageUrl,
      publishedAt: blogPosts.publishedAt,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.updatedAt))
    .limit(50);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-sm">
          Actualités, conseils et informations utiles pour mieux choisir votre assurance.
        </p>
      </div>

      {posts.length === 0 ? (
        <Card className="border-muted/60">
          <CardContent className="text-muted-foreground py-6 text-sm">
            Aucun article publié pour le moment.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.id} className="border-muted/60">
              <CardHeader className="pb-0">
                <CardTitle className="text-base">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {p.excerpt ? (
                  <p className="text-muted-foreground line-clamp-3 text-sm">{p.excerpt}</p>
                ) : null}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground text-xs">
                    {(p.publishedAt ?? p.updatedAt).toISOString().slice(0, 10)}
                  </span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/blog/${p.slug}`}>Lire</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}





import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { CtaBand } from "@/components/cta-band";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPexelsImageUrl } from "@/lib/pexels";
import {
  pexelsBlogQueryForSlug,
  PEXELS_DEFAULT_LOCALE,
  PEXELS_DEFAULT_REVALIDATE_SECONDS,
} from "@/lib/stock-images";
import { and, desc, eq } from "drizzle-orm";
import { CalendarDays, Clock, Newspaper } from "lucide-react";

type Params = { slug: string };

type TopicKey = "auto" | "moto" | "sante" | "prevoyance" | "emprunteur" | "pro" | "conseils";

const TOPIC_LABELS: Record<TopicKey, string> = {
  auto: "Assurance Auto",
  moto: "Moto",
  sante: "Santé",
  prevoyance: "Prévoyance",
  emprunteur: "Emprunteur",
  pro: "Professionnels",
  conseils: "Conseils",
};

function topicForSlug(slug: string): TopicKey {
  const s = slug.toLowerCase();
  if (s.includes("mutuelle") || s.includes("sante")) return "sante";
  if (s.includes("prevoyance")) return "prevoyance";
  if (s.includes("emprunteur") || s.includes("credit") || s.includes("immobilier")) return "emprunteur";
  if (s.includes("auto") || s.includes("voiture")) return "auto";
  if (s.includes("moto")) return "moto";
  if (s.includes("decennale") || s.includes("batiment") || s.includes("construction")) return "pro";
  return "conseils";
}

function estimateReadingMinutes(html: string): number {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 1;
  const words = text.split(" ").length;
  return Math.max(1, Math.round(words / 220));
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

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

  const ogImage =
    post.coverImageUrl ??
    (await getPexelsImageUrl(pexelsBlogQueryForSlug(slug), {
      orientation: "landscape",
      size: "large",
      locale: PEXELS_DEFAULT_LOCALE,
      revalidateSeconds: PEXELS_DEFAULT_REVALIDATE_SECONDS,
    })) ??
    undefined;

  return {
    title: `${post.title} | Net Courtage Assurances`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: ogImage ? [ogImage] : undefined,
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

  const topicKey = topicForSlug(slug);
  const topicLabel = TOPIC_LABELS[topicKey];
  const publishedDate = post.publishedAt ?? post.updatedAt;
  const readingMinutes = estimateReadingMinutes(post.contentHtml);

  const coverSrc =
    post.coverImageUrl ??
    (await getPexelsImageUrl(pexelsBlogQueryForSlug(slug), {
      orientation: "landscape",
      size: "large",
      locale: PEXELS_DEFAULT_LOCALE,
      revalidateSeconds: PEXELS_DEFAULT_REVALIDATE_SECONDS,
    }));

  const related = await (async () => {
    try {
      const candidates = await db
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
        .limit(24);

      const pool = candidates
        .filter((p) => p.slug !== slug)
        .map((p) => ({ ...p, topicKey: topicForSlug(p.slug) }));

      const sameTopic = pool.filter((p) => p.topicKey === topicKey);
      const other = pool.filter((p) => p.topicKey !== topicKey);
      return [...sameTopic, ...other].slice(0, 3);
    } catch {
      return [];
    }
  })();

  const relatedCovers = await Promise.all(
    related.map(async (p) => {
      if (p.coverImageUrl) return p.coverImageUrl;
      return await getPexelsImageUrl(pexelsBlogQueryForSlug(p.slug), {
        orientation: "landscape",
        size: "large",
        locale: PEXELS_DEFAULT_LOCALE,
        revalidateSeconds: PEXELS_DEFAULT_REVALIDATE_SECONDS,
      });
    }),
  );

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <nav className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <Link href="/" className="hover:text-foreground transition-colors">
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{topicLabel}</span>
        </nav>

        <div className="space-y-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{topicLabel}</Badge>
          </div>

          <h1 className="font-heading text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" aria-hidden="true" />
              {formatDate(publishedDate)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" aria-hidden="true" />
              {readingMinutes} min de lecture
            </span>
          </div>
        </div>
      </header>

      {coverSrc ? (
        <div className="ring-foreground/10 relative aspect-video w-full overflow-hidden rounded-3xl border border-muted/60 bg-muted shadow-sm ring-1">
          <Image
            src={coverSrc}
            alt={`Illustration : ${post.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent"
          />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-3xl space-y-6">
        {post.excerpt ? (
          <p className="text-muted-foreground text-pretty text-sm leading-relaxed sm:text-base">
            {post.excerpt}
          </p>
        ) : null}

        <article className="rich-content">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>

        <div className="border-border/60 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Newspaper className="size-4" aria-hidden="true" />
            {topicLabel}
          </div>
          <Button variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
            <Link href="/blog">Retour au blog</Link>
          </Button>
        </div>
      </div>

      {related.length ? (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-semibold tracking-tight">Articles similaires</h2>
            <p className="text-muted-foreground text-sm">
              Pour aller plus loin sur le même sujet.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, idx) => {
              const cover = relatedCovers[idx];
              const label = TOPIC_LABELS[p.topicKey];
              return (
                <Card key={p.id} className="group border-muted/60 overflow-hidden py-0">
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={`Illustration : ${p.title}`}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-muted to-muted/50" />
                      )}
                      <div className="absolute left-3 top-3">
                        <Badge className="bg-background/90 text-primary hover:bg-background/90">
                          {label}
                        </Badge>
                      </div>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-transparent"
                      />
                    </div>
                  </Link>

                  <CardHeader className="pb-0 pt-4">
                    <CardTitle className="font-heading text-base leading-snug">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {p.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4">
                    {p.excerpt ? (
                      <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                        {p.excerpt}
                      </p>
                    ) : null}
                    <div className="border-border/60 border-t pt-3">
                      <Button size="sm" variant="link" className="px-0" asChild>
                        <Link href={`/blog/${p.slug}`}>Lire l’article</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      <CtaBand />
    </div>
  );
}



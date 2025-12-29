import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { PageShell } from "@/components/public/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getPexelsImageUrls } from "@/lib/pexels";
import {
  pexelsBlogQueryForSlug,
  PEXELS_DEFAULT_LOCALE,
  PEXELS_DEFAULT_REVALIDATE_SECONDS,
} from "@/lib/stock-images";
import { desc, eq } from "drizzle-orm";
import { ChevronLeft, ChevronRight, Newspaper, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Net Courtage Assurances",
  description: "Actualités et conseils en assurance (santé, emprunteur, auto, prévoyance).",
};

type SearchParams = {
  topic?: string | string[];
  page?: string | string[];
};

type TopicKey = "all" | "auto" | "moto" | "sante" | "prevoyance" | "emprunteur" | "pro" | "conseils";

const TOPIC_DEFS: ReadonlyArray<{ key: Exclude<TopicKey, "all">; label: string }> = [
  { key: "auto", label: "Assurance Auto" },
  { key: "sante", label: "Santé" },
  { key: "moto", label: "Moto" },
  { key: "emprunteur", label: "Emprunteur" },
  { key: "prevoyance", label: "Prévoyance" },
  { key: "pro", label: "Professionnels" },
  { key: "conseils", label: "Conseils" },
];

function toSingle(value?: string | string[]): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function topicForSlug(slug: string): Exclude<TopicKey, "all"> {
  const s = slug.toLowerCase();
  if (s.includes("mutuelle") || s.includes("sante")) return "sante";
  if (s.includes("prevoyance")) return "prevoyance";
  if (s.includes("emprunteur") || s.includes("credit") || s.includes("immobilier")) return "emprunteur";
  if (s.includes("auto") || s.includes("voiture")) return "auto";
  if (s.includes("moto")) return "moto";
  if (s.includes("decennale") || s.includes("batiment") || s.includes("construction")) return "pro";
  return "conseils";
}

function normalizeTopic(value: string | undefined): TopicKey {
  const v = (value ?? "").toLowerCase().trim();
  if (v === "" || v === "all") return "all";
  if (TOPIC_DEFS.some((t) => t.key === v)) return v as Exclude<TopicKey, "all">;
  return "all";
}

function blogHref({ topic, page }: { topic: TopicKey; page?: number }) {
  const sp = new URLSearchParams();
  if (topic !== "all") sp.set("topic", topic);
  if (page && page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default async function PublicBlogPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const selectedTopic = normalizeTopic(toSingle(sp?.topic));

  const rawPage = Number.parseInt(toSingle(sp?.page) ?? "1", 10);
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const posts = await (async () => {
    try {
      return await db
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
        .limit(200);
    } catch {
      return [];
    }
  })();

  const enriched = posts.map((p) => ({
    ...p,
    topic: topicForSlug(p.slug),
  }));

  const topicCounts = new Map<Exclude<TopicKey, "all">, number>();
  for (const p of enriched) {
    topicCounts.set(p.topic, (topicCounts.get(p.topic) ?? 0) + 1);
  }

  const filtered =
    selectedTopic === "all" ? enriched : enriched.filter((p) => p.topic === selectedTopic);

  const PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const pagePosts = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  // Fill missing cover images using Pexels (grouped by topic to keep requests low).
  const topics = Array.from(
    new Set(pagePosts.filter((p) => !p.coverImageUrl).map((p) => pexelsBlogQueryForSlug(p.slug))),
  );

  const topicToImages = new Map<string, string[]>();
  await Promise.all(
    topics.map(async (topic) => {
      const urls = await getPexelsImageUrls(topic, {
        perPage: 8,
        page: 1,
        orientation: "landscape",
        size: "large",
        locale: PEXELS_DEFAULT_LOCALE,
        revalidateSeconds: PEXELS_DEFAULT_REVALIDATE_SECONDS,
      });
      topicToImages.set(topic, urls);
    }),
  );

  const topicCounters = new Map<string, number>();
  const coverUrls = pagePosts.map((p) => {
    if (p.coverImageUrl) return p.coverImageUrl;
    const topic = pexelsBlogQueryForSlug(p.slug);
    const urls = topicToImages.get(topic) ?? [];
    if (urls.length === 0) return null;
    const idx = topicCounters.get(topic) ?? 0;
    topicCounters.set(topic, idx + 1);
    return urls[idx % urls.length] ?? null;
  });

  return (
    <PageShell className="space-y-10">
      <div className="border-muted/60 bg-primary/5 relative overflow-hidden rounded-3xl border p-6 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(var(--primary)/0.16),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(oklch(var(--primary)/0.22)_0.8px,transparent_0.8px)] bg-size-[24px_24px]"
        />

        <div className="relative z-10 mx-auto max-w-2xl space-y-4 text-center">
          <div className="ring-border/60 bg-background/70 mx-auto flex size-12 items-center justify-center rounded-full ring-1">
            <Newspaper className="text-primary size-5" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Derniers articles
            </h1>
            <p className="text-muted-foreground text-pretty text-sm leading-relaxed sm:text-base">
              Conseils, actualités et guides pour mieux comprendre vos assurances et faire les bons
              choix.
            </p>
          </div>

          <div className="bg-background/70 border-muted/60 mx-auto flex max-w-xl items-center gap-2 rounded-full border px-4 py-2">
            <Search className="text-muted-foreground size-4" aria-hidden="true" />
            <Input
              aria-label="Rechercher un article"
              placeholder="Rechercher un article…"
              className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          variant={selectedTopic === "all" ? "default" : "outline"}
          className="rounded-full"
          asChild
        >
          <Link href={blogHref({ topic: "all" })}>Tout voir</Link>
        </Button>
        {TOPIC_DEFS.filter((t) => (topicCounts.get(t.key) ?? 0) > 0).map((t) => (
          <Button
            key={t.key}
            size="sm"
            variant={selectedTopic === t.key ? "default" : "outline"}
            className="rounded-full"
            asChild
          >
            <Link href={blogHref({ topic: t.key })}>{t.label}</Link>
          </Button>
        ))}
      </div>

      {posts.length === 0 ? (
        <Card className="border-muted/60">
          <CardContent className="text-muted-foreground py-6 text-sm">
            Aucun article publié pour le moment.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((p, idx) => {
            const coverSrc = coverUrls[idx];
            const topicLabel =
              TOPIC_DEFS.find((t) => t.key === p.topic)?.label ?? "Conseils";
            return (
              <Card key={p.id} className="group border-muted/60 overflow-hidden py-0">
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {coverSrc ? (
                      <Image
                        src={coverSrc}
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
                        {topicLabel}
                      </Badge>
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-transparent"
                    />
                  </div>
                </Link>

                <CardHeader className="pb-0 pt-4">
                  <CardTitle className="font-heading text-lg leading-snug">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {p.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="text-muted-foreground text-xs">
                    {(p.publishedAt ?? p.updatedAt).toISOString().slice(0, 10)}
                  </div>
                  {p.excerpt ? (
                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                      {p.excerpt}
                    </p>
                  ) : null}
                  <div className="border-border/60 flex items-center justify-between border-t pt-3">
                    <Button size="sm" variant="link" className="px-0" asChild>
                      <Link href={`/blog/${p.slug}`}>Lire l’article</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {posts.length > 0 && totalPages > 1 ? (
        <nav className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            disabled={currentPage <= 1}
            asChild
          >
            <Link
              href={blogHref({ topic: selectedTopic, page: Math.max(1, currentPage - 1) })}
              aria-label="Page précédente"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Link>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
            .map((n) => (
              <Button
                key={n}
                variant={n === currentPage ? "default" : "outline"}
                size="icon-sm"
                className="rounded-full"
                asChild
              >
                <Link href={blogHref({ topic: selectedTopic, page: n })} aria-label={`Page ${n}`}>
                  {n}
                </Link>
              </Button>
            ))}

          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            disabled={currentPage >= totalPages}
            asChild
          >
            <Link
              href={blogHref({ topic: selectedTopic, page: Math.min(totalPages, currentPage + 1) })}
              aria-label="Page suivante"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </nav>
      ) : null}
    </PageShell>
  );
}





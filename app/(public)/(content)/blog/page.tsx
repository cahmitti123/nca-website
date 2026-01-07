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
import { cn } from "@/lib/utils";
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
    <PageShell className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-primary/5 px-6 py-12 sm:px-12 sm:py-20">
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
         <div className="relative mx-auto max-w-2xl text-center space-y-6">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Le Blog <span className="text-primary">NCA</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Décrypter l&apos;assurance pour vous aider à protéger ce qui compte.
            </p>
             <div className="bg-background/80 backdrop-blur-sm border border-border/50 mx-auto flex max-w-md items-center gap-3 rounded-full px-4 py-2.5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="text-muted-foreground size-5" />
                <Input
                  placeholder="Rechercher un article..."
                  className="border-0 bg-transparent p-0 text-base shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-0"
                  disabled
                />
             </div>
         </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          size="sm"
          variant={selectedTopic === "all" ? "default" : "secondary"}
          className="rounded-full px-6 font-medium"
          asChild
        >
          <Link href={blogHref({ topic: "all" })}>Tous</Link>
        </Button>
        {TOPIC_DEFS.map((t) => (
           <Button
             key={t.key}
             size="sm"
             variant={selectedTopic === t.key ? "default" : "outline"}
             className={cn("rounded-full border-border/50", selectedTopic === t.key ? "" : "bg-transparent hover:bg-muted/50")}
             asChild
           >
             <Link href={blogHref({ topic: t.key })}>{t.label}</Link>
           </Button>
        ))}
      </div>

      {/* Content Grid */}
      {pagePosts.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted/50">
               <Newspaper className="size-8 text-muted-foreground/50" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Aucun article trouvé</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">Revenez bientôt pour découvrir nos nouveaux contenus.</p>
        </div>
      ) : (
        <div className="grid gap-8 space-y-8">
           {/* Hero Post (First item of first page) */}
           {currentPage === 1 && pagePosts[0] && (
               <Link href={`/blog/${pagePosts[0].slug}`} className="group relative isolate flex flex-col justify-end overflow-hidden rounded-[2rem] bg-gray-900 px-8 pb-8 pt-80 sm:px-12 sm:pb-12 lg:pt-96 transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
                  <Image
                     src={coverUrls[0] || ""}
                     alt={pagePosts[0].title}
                     fill
                     className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-[2rem] ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={(pagePosts[0].publishedAt ?? pagePosts[0].updatedAt).toISOString()} className="mr-8">
                      {(pagePosts[0].publishedAt ?? pagePosts[0].updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-foreground ring-1 ring-inset ring-primary/20">
                           {TOPIC_DEFS.find(t => t.key === pagePosts[0]?.topic)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl group-hover:text-primary transition-colors">
                    {pagePosts[0].title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg text-gray-300 line-clamp-2">
                     {pagePosts[0].excerpt}
                  </p>
               </Link>
           )}

           {/* Remaining Posts Grid */}
           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {(currentPage === 1 ? pagePosts.slice(1) : pagePosts).map((post, idx) => {
                 // Adjust index because we skipped 0 if page 1
                 const realIdx = currentPage === 1 ? idx + 1 : idx;
                 const cover = coverUrls[realIdx];
                 const topicLabel = TOPIC_DEFS.find((t) => t.key === post.topic)?.label ?? "Conseils";
                 
                 return (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col items-start justify-between rounded-2xl bg-card transition-all hover:-translate-y-1 hover:shadow-lg ring-1 ring-border/50 hover:ring-primary/20">
                       <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl bg-muted">
                          <Image
                             src={cover || ""}
                             alt={post.title}
                             fill
                             className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                             <span className="inline-flex items-center rounded-md bg-background/90 backdrop-blur px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                                {topicLabel}
                             </span>
                          </div>
                       </div>
                       <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-center gap-x-4 text-xs text-muted-foreground mb-3">
                             <time dateTime={(post.publishedAt ?? post.updatedAt).toISOString()}>
                               {(post.publishedAt ?? post.updatedAt).toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" })}
                             </time>
                             <span className="text-primary/10">&bull;</span>
                             <span>5 min de lecture</span>
                          </div>
                          <h3 className="font-heading text-xl font-semibold leading-snug group-hover:text-primary transition-colors mb-3">
                            {post.title}
                          </h3>
                          <p className="mt-auto line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>
                          <div className="mt-6 flex items-center font-medium text-primary text-sm group-hover:underline decoration-2 underline-offset-4">
                             Lire l&apos;article <ChevronRight className="ml-1 size-4" />
                          </div>
                       </div>
                    </Link>
                 )
              })}
           </div>
        </div>
      )}

      {/* Pagination (Keep existing logic but style it better) */}
      {posts.length > 0 && totalPages > 1 && (
        <nav className="flex items-center justify-center gap-4 pt-12">
            {/* Same pagination logic, just ensure button styles match */}
            <Button
                variant="ghost"
                size="icon"
                disabled={currentPage <= 1}
                asChild
            >
                <Link href={blogHref({ topic: selectedTopic, page: Math.max(1, currentPage - 1) })}>
                   <ChevronLeft className="size-5" />
                </Link>
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
                Page {currentPage} sur {totalPages}
            </span>
            <Button
                variant="ghost"
                size="icon"
                disabled={currentPage >= totalPages}
                asChild
            >
                <Link href={blogHref({ topic: selectedTopic, page: Math.min(totalPages, currentPage + 1) })}>
                   <ChevronRight className="size-5" />
                </Link>
            </Button>
        </nav>
      )}
    </PageShell>
  );
}





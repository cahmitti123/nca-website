import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPexelsImageUrl } from "@/lib/pexels";
import {
  pexelsBlogQueryForSlug,
  PEXELS_DEFAULT_LOCALE,
  PEXELS_DEFAULT_REVALIDATE_SECONDS,
} from "@/lib/stock-images";
import { and, desc, eq } from "drizzle-orm";
import { CalendarDays, Clock, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  // Extract headers for ToC
  const headers = Array.from(post.contentHtml.matchAll(/<h([2-3])[^>]*>(.*?)<\/h\1>/g)).map((match, index) => {
     const id = `heading-${index}`;
     // We need to inject IDs into the HTML to make anchors work.
     // This is a simple replace strategy suitable for this demo.
     return {
        id,
        level: Number(match[1]),
        text: match[2].replace(/<[^>]*>/g, ""), // strip inner HTML if any
        originalMatch: match[0]
     };
  });
  
  // Inject IDs into content
  let processedHtml = post.contentHtml;
  headers.forEach(h => {
      processedHtml = processedHtml.replace(h.originalMatch, `<h${h.level} id="${h.id}" class="scroll-mt-24 font-heading font-semibold tracking-tight text-foreground">${h.text}</h${h.level}>`);
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="relative space-y-8 py-10">
         <div className="mx-auto max-w-4xl text-center space-y-6">
             <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                   {topicLabel}
                </Badge>
                <span className="text-muted-foreground text-sm">&bull;</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                   <CalendarDays className="size-4" />
                   {formatDate(publishedDate)}
                </span>
             </div>
             
             <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                {post.title}
             </h1>

             {post.excerpt && (
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                   {post.excerpt}
                </p>
             )}

             <div className="flex items-center justify-center gap-4 pt-4">
                 <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-2 pr-5">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                       <Newspaper className="size-5 text-primary" />
                    </div>
                    <div className="text-left leading-tight">
                       <div className="text-sm font-semibold">Rédaction NCA</div>
                       <div className="text-xs text-muted-foreground">Équipe éditoriale</div>
                    </div>
                 </div>
                 <div className="h-8 w-px bg-border/60" />
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    {readingMinutes} min de lecture
                 </div>
             </div>
         </div>

         {/* Hero Image */}
         {coverSrc && (
            <div className="relative mx-auto mt-12 aspect-[21/9] w-full max-w-6xl overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-border/20">
               <Image
                  src={coverSrc}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
         )}
      </header>
      
      {/* Content Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            
            {/* Main Content */}
            <main className="min-w-0">
               <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-strong:text-foreground prose-strong:font-semibold">
                  <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
               </article>

               {/* Post Footer */}
               <div className="mt-12 flex items-center justify-between border-t py-6">
                  <div className="text-sm text-muted-foreground">
                     Publié dans <span className="font-medium text-foreground">{topicLabel}</span>
                  </div>
                  <Button variant="ghost" asChild>
                     <Link href="/blog">
                        <ChevronLeft className="mr-2 size-4" />
                        Retour au blog
                     </Link>
                  </Button>
               </div>
            </main>

            {/* Sidebar (Table of Contents) */}
            <aside className="hidden lg:block">
               <div className="sticky top-32 space-y-8">
                  {/* ToC Component */}
                  {headers.length > 0 && (
                      <div className="rounded-2xl border bg-card p-6 shadow-sm">
                         <h3 className="font-heading mb-4 text-lg font-semibold">Sommaire</h3>
                         <nav className="flex flex-col gap-2.5">
                            {headers.map(h => (
                               <a 
                                 key={h.id} 
                                 href={`#${h.id}`} 
                                 className={cn(
                                    "text-sm transition-colors hover:text-primary line-clamp-1",
                                    h.level === 3 ? "pl-4 text-muted-foreground" : "font-medium text-foreground/80"
                                 )}
                               >
                                  {h.text}
                               </a>
                            ))}
                         </nav>
                      </div>
                  )}

                  {/* Share / CTA Card */}
                  <div className="rounded-2xl border bg-primary/5 p-6 text-center">
                     <h3 className="font-heading mb-2 text-lg font-semibold">Besoin d'un conseil ?</h3>
                     <p className="mb-6 text-sm text-muted-foreground text-balance">
                        Nos experts sont là pour répondre à vos questions sur l'{topicLabel.toLowerCase()}.
                     </p>
                     <Button className="w-full rounded-full" asChild>
                        <Link href="/contactez-nous">Contactez-nous</Link>
                     </Button>
                  </div>
               </div>
            </aside>

         </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t">
            <div className="mb-10 flex items-center justify-between">
                <h2 className="font-heading text-3xl font-bold tracking-tight">Articles similaires</h2>
                <Button variant="outline" className="hidden sm:inline-flex rounded-full" asChild>
                   <Link href="/blog">Voir tout le blog</Link>
                </Button>
            </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {related.map((p, idx) => {
               const cover = relatedCovers[idx];
               const label = TOPIC_LABELS[p.topicKey];
               return (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/50 hover:ring-primary/20 hover:shadow-lg transition-all">
                     <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <Image
                           src={cover || ""}
                           alt={p.title}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3">
                           <Badge className="bg-background/90 text-foreground backdrop-blur-sm shadow-sm">{label}</Badge>
                        </div>
                     </div>
                     <div className="flex flex-1 flex-col p-5">
                       <h3 className="font-heading text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {p.title}
                       </h3>
                       <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                          {p.excerpt}
                       </p>
                       <div className="mt-auto flex items-center text-xs font-medium text-primary">
                          Lire l'article <ChevronRight className="ml-1 size-3.5" />
                       </div>
                     </div>
                  </Link>
               )
             })}
          </div>
        </section>
      )}
    </div>
  );
}

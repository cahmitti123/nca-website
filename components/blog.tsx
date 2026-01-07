import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPexelsImageUrl } from "@/lib/pexels";
import {
  pexelsBlogQueryForSlug,
  PEXELS_DEFAULT_LOCALE,
  PEXELS_DEFAULT_REVALIDATE_SECONDS,
} from "@/lib/stock-images";
import { Newspaper } from "lucide-react";

export type BlogPostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | null;
};

export default async function Blog({ posts }: { posts: BlogPostPreview[] }) {
  const coverSources = await Promise.all(
    posts.map(async (p) => {
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
    <section className="space-y-10 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border">
          <Newspaper className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Derniers articles
          </h2>
          <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
            Conseils et actualités pour mieux comprendre vos assurances.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="border-muted/60 flex h-40 items-center justify-center rounded-2xl border border-dashed bg-muted/10 text-muted-foreground text-sm">
          Aucun article publié pour le moment.
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, idx) => {
              const coverSrc = coverSources[idx];
              return (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-transparent bg-transparent transition-all hover:border-muted/60 hover:bg-muted/20 hover:shadow-sm"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                    {coverSrc ? (
                      <Image
                        src={coverSrc}
                        alt={`Illustration : ${p.title}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-muted to-muted/50 transition-transform duration-300 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px] font-normal">
                        Conseils
                      </Badge>
                      {p.publishedAt && (
                        <span className="text-muted-foreground text-xs">
                          {p.publishedAt.toLocaleDateString("fr-FR", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                      {p.excerpt || "Lire l’article."}
                    </p>
                    <div className="mt-auto pt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Lire la suite →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex w-full justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">Voir tous les articles</Link>
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

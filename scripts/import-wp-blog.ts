import * as dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { and, eq, inArray } from "drizzle-orm";

import { blogPosts } from "../db/schema";

dotenv.config({ path: ".env.local" });

type WpRendered = { rendered?: string };

type WpPost = {
  slug: string;
  date_gmt?: string;
  date?: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
};

type SeedOptions = {
  dryRun: boolean;
  overwrite: boolean;
  baseUrl: string;
  perPage: number;
  maxPages: number;
};

function parseOptions(argv: readonly string[]): SeedOptions {
  const args = new Set(argv);

  const getFlagValue = (flag: string): string | undefined => {
    const idx = argv.findIndex((a) => a === flag);
    if (idx === -1) return undefined;
    const v = argv[idx + 1];
    return v && !v.startsWith("--") ? v : undefined;
  };

  const baseUrl = getFlagValue("--base-url") ?? "https://ncassurances.net";
  const perPageRaw = Number.parseInt(getFlagValue("--per-page") ?? "100", 10);
  const perPage = Number.isFinite(perPageRaw) && perPageRaw > 0 ? Math.min(perPageRaw, 100) : 100;

  const maxPagesRaw = Number.parseInt(getFlagValue("--max-pages") ?? "50", 10);
  const maxPages = Number.isFinite(maxPagesRaw) && maxPagesRaw > 0 ? maxPagesRaw : 50;

  return {
    dryRun: args.has("--dry-run"),
    overwrite: args.has("--overwrite"),
    baseUrl,
    perPage,
    maxPages,
  };
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local before running db:import-wp-blog.",
    );
  }
  return databaseUrl;
}

function createDb(databaseUrl: string) {
  const isLocal =
    databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

  const sql = postgres(databaseUrl, {
    // Keep consistent with our app runtime (Supabase pooler transaction mode).
    prepare: false,
    ...(isLocal ? {} : { ssl: "require" as const }),
  });

  const db = drizzle(sql, { schema: { blogPosts } });
  return { db, sql };
}

function stripHtml(input: string): string {
  // Remove scripts/styles first
  const withoutScripts = input
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ");
  // Then drop all tags
  const withoutTags = withoutScripts.replace(/<[^>]+>/g, " ");
  // Collapse whitespace
  return withoutTags.replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(input: string): string {
  // Minimal entity decoding to keep dependencies small.
  const named: Record<string, string> = {
    nbsp: " ",
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
  };

  return input
    .replace(/&([a-z]+);/gi, (_m, name: string) => named[name.toLowerCase()] ?? _m)
    .replace(/&#(\d+);/g, (_m, num: string) => {
      const n = Number.parseInt(num, 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : _m;
    })
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex: string) => {
      const n = Number.parseInt(hex, 16);
      return Number.isFinite(n) ? String.fromCodePoint(n) : _m;
    });
}

function sanitizeHtml(input: string): string {
  // Keep WP HTML but strip scripts for safety (we render with dangerouslySetInnerHTML).
  return input.replace(/<script\b[\s\S]*?<\/script>/gi, "");
}

async function fetchWpPostsPage(params: {
  baseUrl: string;
  page: number;
  perPage: number;
}): Promise<readonly WpPost[]> {
  const url = new URL("/wp-json/wp/v2/posts", params.baseUrl);
  url.searchParams.set("per_page", String(params.perPage));
  url.searchParams.set("page", String(params.page));
  url.searchParams.set("status", "publish");
  url.searchParams.set("_fields", "slug,date,date_gmt,title,excerpt,content");

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    // WP returns 400 when page is out of bounds.
    if (res.status === 400) return [];
    throw new Error(`WP fetch failed: ${res.status} ${res.statusText}`);
  }

  const json: unknown = await res.json();
  if (!Array.isArray(json)) return [];
  return json as readonly WpPost[];
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const databaseUrl = getDatabaseUrl();
  const { db, sql } = createDb(databaseUrl);

  console.log(
    `Importing WP posts from ${options.baseUrl} (per_page=${options.perPage}, max_pages=${options.maxPages})`,
  );
  console.log(`Options: dryRun=${options.dryRun} overwrite=${options.overwrite}`);

  const all: WpPost[] = [];
  for (let page = 1; page <= options.maxPages; page += 1) {
    const batch = await fetchWpPostsPage({
      baseUrl: options.baseUrl,
      page,
      perPage: options.perPage,
    });
    if (batch.length === 0) break;
    all.push(...batch);
    console.log(`Fetched page ${page} (${batch.length} posts)`);
  }

  if (all.length === 0) {
    console.log("No posts fetched. Nothing to do.");
    await sql.end();
    return;
  }

  const slugs = Array.from(new Set(all.map((p) => p.slug).filter(Boolean)));
  const existing = await db
    .select({ id: blogPosts.id, slug: blogPosts.slug })
    .from(blogPosts)
    .where(inArray(blogPosts.slug, slugs));

  const existingBySlug = new Map<string, { id: string; slug: string }>();
  for (const row of existing) existingBySlug.set(row.slug, row);

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const p of all) {
    const slug = (p.slug ?? "").trim();
    if (!slug) continue;

    const titleRaw = p.title?.rendered ?? slug;
    const excerptRaw = p.excerpt?.rendered ?? "";
    const contentRaw = p.content?.rendered ?? "";

    const title = decodeHtmlEntities(stripHtml(titleRaw));
    const excerpt = excerptRaw ? decodeHtmlEntities(stripHtml(excerptRaw)) : null;
    const contentHtml = sanitizeHtml(contentRaw);

    const dateStr = p.date_gmt ?? p.date ?? null;
    const publishedAt = dateStr ? new Date(dateStr) : null;

    const existingRow = existingBySlug.get(slug);
    if (existingRow) {
      if (!options.overwrite) {
        skipped += 1;
        continue;
      }

      if (!options.dryRun) {
        await db
          .update(blogPosts)
          .set({
            title,
            excerpt,
            contentHtml,
            status: "published",
            publishedAt,
            updatedAt: new Date(),
          })
          .where(and(eq(blogPosts.id, existingRow.id), eq(blogPosts.slug, slug)));
      }

      updated += 1;
      continue;
    }

    if (!options.dryRun) {
      await db.insert(blogPosts).values({
        title,
        slug,
        excerpt,
        coverImageUrl: null,
        contentHtml,
        contentJson: null,
        status: "published",
        publishedAt,
      });
    }
    inserted += 1;
  }

  console.log(
    `Done. Inserted=${inserted} Updated=${updated} Skipped=${skipped} (total fetched=${all.length})`,
  );

  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});





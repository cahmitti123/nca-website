"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { and, eq, ne } from "drizzle-orm";

export type CreatePostState = {
  error: string | null;
};

export type SavePostState = {
  error: string | null;
};

export type UploadImageResult = {
  url: string | null;
  error: string | null;
};

function slugify(input: string): string {
  const base = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
  return base;
}

async function ensureUniqueSlug(initial: string, currentId?: string): Promise<string> {
  const base = initial || "post";

  // Try a few deterministic suffixes first
  for (let i = 0; i < 5; i += 1) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(
        currentId
          ? and(eq(blogPosts.slug, candidate), ne(blogPosts.id, currentId))
          : eq(blogPosts.slug, candidate)
      )
      .limit(1);
    if (existing.length === 0) return candidate;
  }

  // Fallback
  return `${base}-${Math.random().toString(16).slice(2, 8)}`;
}

export async function createBlogPostAction(
  _prevState: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const { profile } = await requireAdmin({ allowedRoles: ["admin", "editor"] });

  const titleRaw = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();

  if (!titleRaw) return { error: "Title is required." };

  const baseSlug = slugify(slugRaw || titleRaw);
  if (!baseSlug) return { error: "Could not generate a slug." };

  const slug = await ensureUniqueSlug(baseSlug);

  const inserted = await db
    .insert(blogPosts)
    .values({
      authorProfileId: profile.id,
      title: titleRaw,
      slug,
      status: "draft",
      contentHtml: "",
      contentJson: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning({ id: blogPosts.id });

  const id = inserted[0]?.id;
  if (!id) return { error: "Failed to create post." };

  redirect(`/admin/blog/${id}`);
}

const statusValues = ["draft", "published", "archived"] as const;
type PostStatus = (typeof statusValues)[number];

function isPostStatus(value: string): value is PostStatus {
  return (statusValues as readonly string[]).includes(value);
}

export async function saveBlogPostAction(
  _prevState: SavePostState,
  formData: FormData
): Promise<SavePostState> {
  const { profile } = await requireAdmin({ allowedRoles: ["admin", "editor"] });

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerptRaw = String(formData.get("excerpt") ?? "");
  const coverImageUrlRaw = String(formData.get("coverImageUrl") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "").trim();
  const contentHtml = String(formData.get("contentHtml") ?? "");
  const contentJsonRaw = String(formData.get("contentJson") ?? "").trim();

  if (!id) return { error: "Missing id." };
  if (!title) return { error: "Title is required." };
  if (!isPostStatus(statusRaw)) return { error: "Invalid status." };

  const baseSlug = slugify(slugRaw || title);
  if (!baseSlug) return { error: "Invalid slug." };

  const slug = await ensureUniqueSlug(baseSlug, id);

  let contentJson: Record<string, unknown> | null = null;
  if (contentJsonRaw) {
    try {
      contentJson = JSON.parse(contentJsonRaw) as Record<string, unknown>;
    } catch {
      return { error: "Invalid editor content." };
    }
  }

  const now = new Date();
  const publishedAt = statusRaw === "published" ? now : null;

  await db
    .update(blogPosts)
    .set({
      authorProfileId: profile.id,
      title,
      slug,
      excerpt: excerptRaw.length ? excerptRaw : null,
      coverImageUrl: coverImageUrlRaw.length ? coverImageUrlRaw : null,
      contentHtml,
      contentJson,
      status: statusRaw,
      publishedAt,
      updatedAt: now,
    })
    .where(eq(blogPosts.id, id));

  redirect(`/admin/blog/${id}`);
}

export async function uploadBlogImageAction(formData: FormData): Promise<UploadImageResult> {
  await requireAdmin({ allowedRoles: ["admin", "editor"] });

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { url: null, error: "No file provided." };
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const bucket = "blog";

  const createBucket = await supabaseAdmin.storage.createBucket(bucket, { public: true });
  if (createBucket.error && !/already exists/i.test(createBucket.error.message)) {
    return { url: null, error: createBucket.error.message };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const path = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${crypto.randomUUID()}-${safeName}`;

  const upload = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
      cacheControl: "3600",
    });

  if (upload.error) {
    return { url: null, error: upload.error.message };
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}



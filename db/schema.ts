import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const profileRoleEnum = pgEnum("profile_role", ["admin", "editor"]);

export const leadSourceEnum = pgEnum("lead_source", [
  "quote_request",
  "contact_request",
  "complaint",
  "other",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "in_progress",
  "won",
  "lost",
  "archived",
]);

export const blogPostStatusEnum = pgEnum("blog_post_status", [
  "draft",
  "published",
  "archived",
]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey(), // matches auth.users.id (Supabase)
    email: text("email").notNull(),
    role: profileRoleEnum("role").notNull().default("editor"),
    disabled: boolean("disabled").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    emailIdx: index("profiles_email_idx").on(t.email),
    roleIdx: index("profiles_role_idx").on(t.role),
  })
);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    source: leadSourceEnum("source").notNull().default("other"),
    insuranceType: text("insurance_type"),
    fullName: text("full_name").notNull(),
    email: text("email"),
    phone: text("phone"),
    birthDate: timestamp("birth_date", { withTimezone: false }),
    postalCode: text("postal_code"),
    message: text("message"),
    consentToContact: boolean("consent_to_contact").notNull().default(false),
    status: leadStatusEnum("status").notNull().default("new"),
    assignedToProfileId: uuid("assigned_to_profile_id").references(
      () => profiles.id,
      { onDelete: "set null" }
    ),
    internalNotes: text("internal_notes"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    createdAtIdx: index("leads_created_at_idx").on(t.createdAt),
    statusIdx: index("leads_status_idx").on(t.status),
    sourceIdx: index("leads_source_idx").on(t.source),
  })
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authorProfileId: uuid("author_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    coverImageUrl: text("cover_image_url"),
    contentHtml: text("content_html").notNull().default(""),
    contentJson: jsonb("content_json").$type<Record<string, unknown>>(),
    status: blogPostStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    slugIdx: index("blog_posts_slug_idx").on(t.slug),
    statusIdx: index("blog_posts_status_idx").on(t.status),
    createdAtIdx: index("blog_posts_created_at_idx").on(t.createdAt),
  })
);





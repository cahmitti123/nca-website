import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

type GlobalThisWithDb = typeof globalThis & {
  __ncaDbClient?: postgres.Sql;
};

const globalForDb = globalThis as GlobalThisWithDb;

const client =
  globalForDb.__ncaDbClient ??
  postgres(databaseUrl, {
    ssl: "require",
    // Supabase pooler transaction mode does not support prepared statements.
    // See: https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__ncaDbClient = client;
}

export const db = drizzle(client, { schema });



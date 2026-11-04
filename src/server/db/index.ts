import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL ?? "";
if (!connectionString && process.env.NEXT_PHASE !== "phase-production-build") {
  throw new Error("DATABASE_URL is not set");
}

// Reuse the connection across hot reloads in development.
const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};

// `prepare: false` is required for Supabase's transaction pooler (port 6543).
const client =
  globalForDb.client ?? postgres(connectionString, { prepare: false });
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });

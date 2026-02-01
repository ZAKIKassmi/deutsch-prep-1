import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// 1. Prevent multiple connections during Next.js Hot Reload
// We use 'globalThis' to cache the connection in development
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

// 2. Initialize the Postgres client
// If a connection already exists in the global scope (dev mode), use it.
const client =
  globalForDb.conn ??
  postgres(connectionString, {
    // 3. 'prepare: false' is required for Supabase Transaction mode
    // or serverless environments where prepared statements are not supported.
    prepare: false,
  });

// 4. Save the client to the global scope if we are in development
if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = client;
}

// 5. Initialize Drizzle
export const db = drizzle(client, { schema });

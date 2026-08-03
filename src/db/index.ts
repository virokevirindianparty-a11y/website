import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

/** Lazy so importing this module never throws at build/import time. */
export function getDb() {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Create a Neon project and add the connection string to .env.local.",
    );
  }
  cached = drizzle(neon(url), { schema });
  return cached;
}

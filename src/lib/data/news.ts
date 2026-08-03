import "server-only";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { newsPosts } from "@/db/schema";

export type NewsPost = typeof newsPosts.$inferSelect;

/** Returns [] instead of throwing when DATABASE_URL isn't configured yet. */
export async function listPublishedNews(limit?: number): Promise<NewsPost[]> {
  try {
    const query = getDb()
      .select()
      .from(newsPosts)
      .where(eq(newsPosts.published, true))
      .orderBy(desc(newsPosts.publishedAt));
    return limit ? await query.limit(limit) : await query;
  } catch {
    return [];
  }
}

export async function listAllNews(): Promise<NewsPost[]> {
  return getDb().select().from(newsPosts).orderBy(desc(newsPosts.createdAt));
}

export async function getNewsById(id: number): Promise<NewsPost | null> {
  const rows = await getDb().select().from(newsPosts).where(eq(newsPosts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const rows = await getDb()
      .select()
      .from(newsPosts)
      .where(eq(newsPosts.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

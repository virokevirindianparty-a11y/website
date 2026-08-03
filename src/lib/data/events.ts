import "server-only";
import { asc, desc, eq, gte } from "drizzle-orm";
import { getDb } from "@/db";
import { events } from "@/db/schema";

export type EventRow = typeof events.$inferSelect;

export async function listAllEvents(): Promise<EventRow[]> {
  return getDb().select().from(events).orderBy(desc(events.eventDate));
}

export async function getEventById(id: number): Promise<EventRow | null> {
  const rows = await getDb().select().from(events).where(eq(events.id, id)).limit(1);
  return rows[0] ?? null;
}

/** Returns [] instead of throwing when DATABASE_URL isn't configured yet. */
export async function listUpcomingEvents(limit?: number): Promise<EventRow[]> {
  try {
    const query = getDb()
      .select()
      .from(events)
      .where(gte(events.eventDate, new Date(Date.now() - 24 * 60 * 60 * 1000)))
      .orderBy(asc(events.eventDate));
    return limit ? await query.limit(limit) : await query;
  } catch {
    return [];
  }
}

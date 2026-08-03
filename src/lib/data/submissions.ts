import "server-only";
import { desc, sql } from "drizzle-orm";
import { getDb } from "@/db";
import {
  contactSubmissions,
  volunteerSubmissions,
  joinMemberSubmissions,
  donationInterest,
} from "@/db/schema";

export function listContactSubmissions() {
  return getDb().select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export function listVolunteerSubmissions() {
  return getDb().select().from(volunteerSubmissions).orderBy(desc(volunteerSubmissions.createdAt));
}

export function listJoinSubmissions() {
  return getDb().select().from(joinMemberSubmissions).orderBy(desc(joinMemberSubmissions.createdAt));
}

export function listDonationInterest() {
  return getDb().select().from(donationInterest).orderBy(desc(donationInterest.createdAt));
}

export async function getDashboardCounts() {
  const db = getDb();
  const [contact, volunteer, join, donate] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(contactSubmissions),
    db.select({ count: sql<number>`count(*)` }).from(volunteerSubmissions),
    db.select({ count: sql<number>`count(*)` }).from(joinMemberSubmissions),
    db.select({ count: sql<number>`count(*)` }).from(donationInterest),
  ]);
  return {
    contact: Number(contact[0]?.count ?? 0),
    volunteer: Number(volunteer[0]?.count ?? 0),
    join: Number(join[0]?.count ?? 0),
    donate: Number(donate[0]?.count ?? 0),
  };
}

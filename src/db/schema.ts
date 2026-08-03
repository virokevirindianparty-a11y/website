import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsPosts = pgTable("news_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  bodyEn: text("body_en").notNull(),
  bodyHi: text("body_hi").notNull(),
  coverImage: text("cover_image"),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionHi: text("description_hi").notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  coverImage: text("cover_image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const volunteerSubmissions = pgTable("volunteer_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 255 }),
  constituency: varchar("constituency", { length: 255 }),
  helpTypes: text("help_types").array().notNull().default([]),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const joinMemberSubmissions = pgTable("join_member_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  constituency: varchar("constituency", { length: 255 }).notNull(),
  motivation: text("motivation").notNull(),
  wantsToVolunteer: boolean("wants_to_volunteer").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const donationInterest = pgTable("donation_interest", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 255 }),
  amountRange: varchar("amount_range", { length: 64 }),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

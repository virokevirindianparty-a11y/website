CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(32),
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donation_interest" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"email" varchar(255),
	"amount_range" varchar(64),
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_hi" text NOT NULL,
	"description_en" text NOT NULL,
	"description_hi" text NOT NULL,
	"event_date" timestamp NOT NULL,
	"location" varchar(255) NOT NULL,
	"cover_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "join_member_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"constituency" varchar(255) NOT NULL,
	"motivation" text NOT NULL,
	"wants_to_volunteer" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title_en" text NOT NULL,
	"title_hi" text NOT NULL,
	"body_en" text NOT NULL,
	"body_hi" text NOT NULL,
	"cover_image" text,
	"published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "news_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "volunteer_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"email" varchar(255),
	"constituency" varchar(255),
	"help_types" text[] DEFAULT '{}' NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);

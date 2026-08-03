# Viro Ke Vir Indian Party — Website

Next.js 16 (App Router) + Tailwind CSS v4 + Neon Postgres (Drizzle ORM), bilingual (English/Hindi via next-intl).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Neon project at [neon.tech](https://neon.tech) and copy the connection string.
3. Copy `.env.example` to `.env.local` and fill in:
   - `DATABASE_URL` — the Neon connection string
   - `AUTH_SECRET` — random secret for signing admin session cookies (`node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)
   - `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` — used once by the seed script to create the first admin login
4. Push the schema to Neon and seed initial data:
   ```bash
   npm run db:push
   npm run db:seed
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
   Public site: [http://localhost:3000](http://localhost:3000) · Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Structure

- `src/app/[locale]/` — public site (English default, Hindi at `/hi/...`)
- `src/app/admin/` — admin dashboard (English-only, session-cookie protected)
- `src/db/schema.ts` — Drizzle schema (admin users, news, events, form submissions)
- `messages/en.json`, `messages/hi.json` — all site copy
- `src/lib/actions/` — Server Actions for forms and admin CRUD

## Scripts

- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint`
- `npm run db:generate` — generate a new migration after editing `src/db/schema.ts`
- `npm run db:push` — push schema to the database
- `npm run db:studio` — browse the database
- `npm run db:seed` — create the first admin user and sample content

## Notes

- Hindi copy in `messages/hi.json` is a first-pass translation — have a native speaker review it before launch, given the political context.
- `/donate` is a placeholder page with a "register interest" form — no payment gateway is wired in yet.
- Real photos and the logo were sourced from the party's old WordPress site (`wp-content/uploads`), not this repo.

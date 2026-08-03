import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "./schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set in .env.local");
  }
  const db = drizzle(neon(url), { schema });

  const email = process.env.ADMIN_SEED_EMAIL ?? "admin@virokevirindianparty.org";
  const password = process.env.ADMIN_SEED_PASSWORD ?? "change-this-password";
  const passwordHash = await bcrypt.hash(password, 12);

  await db
    .insert(schema.adminUsers)
    .values({ email, name: "VVIP Admin", passwordHash })
    .onConflictDoNothing({ target: schema.adminUsers.email });

  await db
    .insert(schema.events)
    .values([
      {
        titleEn: "Society Meeting",
        titleHi: "समाज सभा",
        descriptionEn:
          "A community gathering to discuss local concerns and party initiatives.",
        descriptionHi: "स्थानीय मुद्दों और पार्टी की पहलों पर चर्चा हेतु सामुदायिक सभा।",
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        location: "Amreli, Gujarat",
      },
      {
        titleEn: "Bike Rally",
        titleHi: "बाइक रैली",
        descriptionEn: "A rally to spread awareness about the party's mission.",
        descriptionHi: "पार्टी के मिशन के प्रति जागरूकता फैलाने हेतु रैली।",
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: "Amreli, Gujarat",
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(schema.newsPosts)
    .values({
      slug: "welcome-to-the-new-website",
      titleEn: "Welcome to the New VVIP Website",
      titleHi: "नई VVIP वेबसाइट पर आपका स्वागत है",
      bodyEn:
        "We've rebuilt our website from the ground up to better share our mission, ideology, and the work being done across Gujarat and beyond. Stay tuned for updates on events, campaigns, and party news.",
      bodyHi:
        "हमने अपने मिशन, विचारधारा और गुजरात सहित देशभर में हो रहे कार्यों को बेहतर ढंग से साझा करने के लिए अपनी वेबसाइट को नए सिरे से बनाया है। कार्यक्रमों, अभियानों और पार्टी की खबरों के लिए जुड़े रहें।",
      published: true,
    })
    .onConflictDoNothing({ target: schema.newsPosts.slug });

  console.log(`Seed complete. Admin login: ${email} / ${password}`);
  console.log("Change this password after first login.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

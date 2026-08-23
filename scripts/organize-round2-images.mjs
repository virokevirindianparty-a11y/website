import { unlink, rm } from "fs/promises";
import path from "path";
import sharp from "sharp";

const IMAGES = path.join(import.meta.dirname, "..", "public", "images");

async function convert(src, dest, opts) {
  await sharp(path.join(IMAGES, src))
    .resize({ width: opts.width, withoutEnlargement: true })
    .webp({ quality: opts.quality })
    .toFile(path.join(IMAGES, dest));
  console.log(`${src} -> ${dest}`);
}

await convert("payment.jpeg", "payment.webp", { width: 1200, quality: 90 });
await convert("election 2027.jpeg", "election-2027.webp", { width: 1200, quality: 85 });
await convert("vision/WhatsApp Image 2026-08-21 at 17.21.40.jpeg", "vision-en.webp", {
  width: 1200,
  quality: 85,
});
await convert("vision/WhatsApp Image 2026-08-21 at 16.57.58.jpeg", "vision-hi.webp", {
  width: 1200,
  quality: 85,
});
await convert("vision/WhatsApp Image 2026-08-19 at 08.24.31.jpeg", "election-2027-mission.webp", {
  width: 1200,
  quality: 85,
});

await unlink(path.join(IMAGES, "payment.jpeg"));
await unlink(path.join(IMAGES, "election 2027.jpeg"));
await rm(path.join(IMAGES, "vision"), { recursive: true, force: true });

console.log("Done.");

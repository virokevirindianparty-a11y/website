import { readdir, mkdir, unlink, rm } from "fs/promises";
import path from "path";
import sharp from "sharp";

const IMAGES = path.join(import.meta.dirname, "..", "public", "images");

async function convert(srcPath, destPath, opts) {
  await sharp(srcPath)
    .resize({ width: opts.width, withoutEnlargement: true })
    .webp({ quality: opts.quality })
    .toFile(destPath);
}

// --- Legal: append the 2 new images as 6.webp, 7.webp ---
const legalDir = path.join(IMAGES, "legal");
const newLegalFiles = [
  "WhatsApp Image 2026-08-24 at 14.21.33.jpeg",
  "WhatsApp Image 2026-08-24 at 14.21.34.jpeg",
];
let legalIndex = 6;
for (const file of newLegalFiles) {
  const src = path.join(legalDir, file);
  const dest = path.join(legalDir, `${legalIndex}.webp`);
  await convert(src, dest, { width: 1600, quality: 85 });
  await unlink(src);
  console.log(`legal: ${file} -> ${legalIndex}.webp`);
  legalIndex++;
}

// --- Team: explicit order matching each person's ID card number ---
const teamDir = path.join(IMAGES, "team");
const TEAM_MAP = [
  ["WhatsApp Image 2026-09-01 at 10.36.46.jpeg", "1"],
  ["WhatsApp Image 2026-09-01 at 10.36.46 (1).jpeg", "2"],
  ["WhatsApp Image 2026-09-01 at 10.36.46 (2).jpeg", "3"],
  ["WhatsApp Image 2026-09-01 at 10.36.47.jpeg", "4"],
];
for (const [file, slug] of TEAM_MAP) {
  const src = path.join(teamDir, file);
  const dest = path.join(teamDir, `${slug}.webp`);
  await convert(src, dest, { width: 900, quality: 85 });
  await unlink(src);
  console.log(`team: ${file} -> ${slug}.webp`);
}

// --- Election 2024 event gallery: sequential numbering ---
const eventSrcDir = path.join(IMAGES, "election 2024 event images");
const eventDestDir = path.join(IMAGES, "election-2024-event");
await mkdir(eventDestDir, { recursive: true });
const eventFiles = (await readdir(eventSrcDir)).filter((f) => /\.jpe?g$/i.test(f)).sort();
let eventIndex = 1;
for (const file of eventFiles) {
  const src = path.join(eventSrcDir, file);
  const dest = path.join(eventDestDir, `${eventIndex}.webp`);
  await convert(src, dest, { width: 1200, quality: 75 });
  await unlink(src);
  eventIndex++;
}
console.log(`election-2024-event: ${eventIndex - 1} images processed`);

await rm(eventSrcDir, { recursive: true, force: true });

console.log("Done.");

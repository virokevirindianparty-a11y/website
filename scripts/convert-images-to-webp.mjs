// One-off/reusable utility: converts every jpg/png in public/images to webp
// (resizing photos down to a max width) and removes the original files.
// Run with: node scripts/convert-images-to-webp.mjs
import { readdir, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.join(import.meta.dirname, "..", "public", "images");
const MAX_WIDTH = 1600;
const LOGO_FILES = new Set(["logo.png", "logo-wordmark.png"]);

async function convertFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const inputPath = path.join(IMAGES_DIR, filename);
  const outputPath = path.join(IMAGES_DIR, `${path.basename(filename, ext)}.webp`);
  const isLogo = LOGO_FILES.has(filename);

  let pipeline = sharp(inputPath);
  if (!isLogo) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  await pipeline
    .webp(isLogo ? { lossless: true } : { quality: 80 })
    .toFile(outputPath);
  await unlink(inputPath);

  console.log(`${filename} -> ${path.basename(outputPath)}`);
}

const files = await readdir(IMAGES_DIR);
for (const file of files) {
  await convertFile(file);
}
console.log("Done.");

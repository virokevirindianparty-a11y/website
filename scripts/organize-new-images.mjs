// One-off: processes the raw folders dropped into public/images
// (slideshow/, Steps/, legal/) into clean, numbered WebP assets, and
// moves the legal PDFs into public/documents. Operates file-by-file
// (not directory rename/rm) since some source dirs had a locked handle.
import { readdir, mkdir, unlink, copyFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..", "public");
const IMAGES = path.join(ROOT, "images");
const DOCS = path.join(ROOT, "documents");

async function convertImages(srcDir, destDir, { maxWidth, quality, sortNumeric, deleteSource }) {
  await mkdir(destDir, { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));

  files.sort((a, b) => {
    if (sortNumeric) {
      const na = Number(a.match(/\d+/)?.[0] ?? 0);
      const nb = Number(b.match(/\d+/)?.[0] ?? 0);
      return na - nb;
    }
    return a.localeCompare(b);
  });

  let i = 1;
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const outPath = path.join(destDir, `${i}.webp`);
    await sharp(srcPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);
    console.log(`${srcPath} -> ${outPath}`);
    if (deleteSource) await unlink(srcPath);
    i++;
  }
  return i - 1;
}

async function moveDocs(srcDir, destDir, names) {
  await mkdir(destDir, { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => f.toLowerCase().endsWith(".pdf")).sort();
  for (let i = 0; i < files.length; i++) {
    const srcPath = path.join(srcDir, files[i]);
    const dest = path.join(destDir, names[i] ?? `document-${i + 1}.pdf`);
    await copyFile(srcPath, dest);
    console.log(`${srcPath} -> ${dest}`);
    await unlink(srcPath);
  }
}

const slideshowCount = await convertImages(
  path.join(IMAGES, "slideshow"),
  path.join(IMAGES, "slideshow"),
  { maxWidth: 1920, quality: 78, sortNumeric: false, deleteSource: true },
);

const stepsCount = await convertImages(
  path.join(IMAGES, "Steps"),
  path.join(IMAGES, "steps"),
  { maxWidth: 1400, quality: 85, sortNumeric: true, deleteSource: true },
);

const legalCount = await convertImages(
  path.join(IMAGES, "legal"),
  path.join(IMAGES, "legal"),
  { maxWidth: 1600, quality: 85, sortNumeric: false, deleteSource: true },
);

await moveDocs(path.join(IMAGES, "legal"), DOCS, [
  "president-bio-en.pdf",
  "president-bio-hi.pdf",
]);

console.log({ slideshowCount, stepsCount, legalCount });

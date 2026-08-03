import "server-only";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { getMediaStore } from "./media-store";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

export class MediaUploadError extends Error {}

/**
 * Uploads a File to Netlify Blobs, downsizing and converting it to WebP
 * first so the site stays fast, and returns the URL to serve it from.
 */
export async function uploadImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new MediaUploadError("Only JPEG, PNG, WEBP or GIF images are allowed.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new MediaUploadError("Image must be smaller than 5MB.");
  }

  const original = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(original, { animated: true })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  const key = `${randomUUID()}.webp`;
  const store = getMediaStore();
  await store.set(key, new Blob([webp]), {
    metadata: { contentType: "image/webp" },
  });

  return `/api/media/${key}`;
}

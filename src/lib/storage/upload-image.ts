import "server-only";
import { randomUUID } from "crypto";
import { getMediaStore } from "./media-store";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export class MediaUploadError extends Error {}

/** Uploads a File to Netlify Blobs and returns the URL to serve it from. */
export async function uploadImage(file: File): Promise<string> {
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new MediaUploadError("Only JPEG, PNG, WEBP or GIF images are allowed.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new MediaUploadError("Image must be smaller than 5MB.");
  }

  const key = `${randomUUID()}.${ext}`;
  const store = getMediaStore();
  await store.set(key, await file.arrayBuffer(), {
    metadata: { contentType: file.type },
  });

  return `/api/media/${key}`;
}

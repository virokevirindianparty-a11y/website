import "server-only";
import { getStore } from "@netlify/blobs";

export const MEDIA_STORE_NAME = "media";

/**
 * Explicit siteID/token works both locally and on Netlify. Without them,
 * this only works when actually running on Netlify (automatic context).
 */
export function getMediaStore() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN;
  if (siteID && token) {
    return getStore({ name: MEDIA_STORE_NAME, siteID, token });
  }
  return getStore(MEDIA_STORE_NAME);
}

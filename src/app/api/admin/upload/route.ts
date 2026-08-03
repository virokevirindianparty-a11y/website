import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/require-admin";
import { uploadImage, MediaUploadError } from "@/lib/storage/upload-image";

// Uploaded as a raw binary body (not multipart/form-data) on purpose: Netlify's
// Next.js Runtime crashes handling multipart Server Action submissions that
// contain a File (its Node-http compat shim's IncomingMessage.socket is a
// read-only getter, which Node's stream pipeline/destroy internals choke on).
// A plain fetch() POST with the file as the body avoids that code path.
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  const data = await request.arrayBuffer();

  try {
    const url = await uploadImage(data, contentType);
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof MediaUploadError ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

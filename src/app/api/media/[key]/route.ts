import { NextResponse } from "next/server";
import { getMediaStore } from "@/lib/storage/media-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const store = getMediaStore();

  const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const contentType =
    typeof result.metadata?.contentType === "string"
      ? result.metadata.contentType
      : "application/octet-stream";

  return new NextResponse(result.data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

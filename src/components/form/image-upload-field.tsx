"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, AlertCircle } from "lucide-react";

export function ImageUploadField({ currentImage }: { currentImage?: string | null }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(currentImage ?? null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setStatus("uploading");
    setError(null);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Upload failed.");
      setImageUrl(body.url);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed.");
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-1.5">Cover image</label>
      <input type="hidden" name="coverImage" value={imageUrl ?? ""} />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        className="w-full text-sm rounded-lg border border-border bg-white px-4 py-2.5 file:mr-3 file:rounded-full file:border-0 file:bg-saffron/15 file:text-saffron-deep file:px-3 file:py-1.5 file:text-xs file:font-semibold"
      />
      <p className="text-xs text-muted mt-1">JPEG, PNG, WEBP or GIF, up to 5MB.</p>

      {status === "uploading" && (
        <p className="flex items-center gap-1.5 text-xs text-muted mt-2">
          <Loader2 size={14} className="animate-spin" /> Uploading...
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-1.5 text-xs text-red-700 mt-2">
          <AlertCircle size={14} /> {error}
        </p>
      )}

      {(preview || imageUrl) && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden mt-3 border border-border">
          <Image
            src={preview ?? imageUrl!}
            alt=""
            fill
            className="object-cover"
            unoptimized={!!preview}
          />
        </div>
      )}
    </div>
  );
}

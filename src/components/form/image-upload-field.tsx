"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageUploadField({ currentImage }: { currentImage?: string | null }) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-1.5">Cover image</label>
      <input type="hidden" name="existingCoverImage" value={currentImage ?? ""} />
      <input
        type="file"
        name="coverImageFile"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="w-full text-sm rounded-lg border border-border bg-white px-4 py-2.5 file:mr-3 file:rounded-full file:border-0 file:bg-saffron/15 file:text-saffron-deep file:px-3 file:py-1.5 file:text-xs file:font-semibold"
      />
      <p className="text-xs text-muted mt-1">JPEG, PNG, WEBP or GIF, up to 5MB.</p>

      {(preview || currentImage) && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden mt-3 border border-border">
          <Image src={preview ?? currentImage!} alt="" fill className="object-cover" unoptimized={!!preview} />
        </div>
      )}
    </div>
  );
}

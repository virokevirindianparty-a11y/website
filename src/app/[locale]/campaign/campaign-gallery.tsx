"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/lightbox";

const GALLERY = [
  "/images/campaign-photo-1.webp",
  "/images/campaign-photo-2.webp",
  "/images/community-event.webp",
];

const POSTERS = [
  "/images/campaign-mere-desh.webp",
  "/images/campaign-bharat-bhoomi.webp",
  "/images/campaign-hum-paida.webp",
];

export function CampaignGallery() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-5 mb-5">
        {GALLERY.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox({ images: GALLERY, index: i })}
            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm text-left"
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {POSTERS.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox({ images: POSTERS, index: i })}
            className="relative aspect-square rounded-xl overflow-hidden shadow-sm bg-white text-left"
          >
            <Image src={src} alt="" fill className="object-contain" />
          </button>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox((prev) => (prev ? { ...prev, index } : prev))}
        />
      )}
    </>
  );
}

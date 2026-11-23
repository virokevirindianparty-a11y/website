"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/lightbox";

export function ManifestoGallery({ pages }: { pages: Array<{ src: string; label: string }> }) {
  const [index, setIndex] = useState<number | null>(null);
  const images = pages.map((p) => p.src);

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {pages.map((page, i) => (
          <button
            key={page.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group bg-surface border border-border rounded-xl overflow-hidden text-left hover:border-saffron hover:-translate-y-1 transition-all"
          >
            <div className="relative w-full aspect-[1131/1600] bg-cream">
              <Image
                src={page.src}
                alt={page.label}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <p className="p-4 font-heading font-bold text-sm text-navy group-hover:text-saffron-deep transition-colors">
              {page.label}
            </p>
          </button>
        ))}
      </div>
      {index !== null && (
        <Lightbox images={images} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
      )}
    </>
  );
}

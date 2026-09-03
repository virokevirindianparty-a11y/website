"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      <div className="relative flex-1 flex items-center justify-center px-14 sm:px-20 min-h-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-1 sm:left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          className="relative w-full h-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src={images[index]} alt="" fill className="object-contain" sizes="100vw" priority />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-1 sm:right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <p className="text-center text-white/70 text-sm py-2">
        {index + 1} of {images.length}
      </p>

      <div
        className="flex gap-2 overflow-x-auto px-4 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => onNavigate(i)}
            className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 transition-all ${
              i === index
                ? "border-saffron"
                : "border-transparent opacity-50 hover:opacity-90"
            }`}
            aria-label={`Go to image ${i + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}

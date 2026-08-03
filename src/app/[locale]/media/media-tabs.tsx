"use client";

import { useState } from "react";
import Image from "next/image";

const PRINT_IMAGES = [
  "/images/print-media-1.webp",
  "/images/print-media-2.webp",
  "/images/print-media-3.webp",
  "/images/print-media-4.webp",
];

const ELECTRONIC_IMAGES = [
  "/images/electronic-media-1.webp",
  "/images/electronic-media-2.webp",
  "/images/electronic-media-3.webp",
  "/images/electronic-media-4.webp",
];

export function MediaTabs({
  printLabel,
  electronicLabel,
}: {
  printLabel: string;
  electronicLabel: string;
}) {
  const [tab, setTab] = useState<"print" | "electronic">("print");
  const images = tab === "print" ? PRINT_IMAGES : ELECTRONIC_IMAGES;

  return (
    <div>
      <div className="inline-flex rounded-full border border-border bg-cream p-1 mb-8">
        <button
          type="button"
          onClick={() => setTab("print")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === "print" ? "bg-navy text-white" : "text-navy/70"
          }`}
        >
          {printLabel}
        </button>
        <button
          type="button"
          onClick={() => setTab("electronic")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === "electronic" ? "bg-navy text-white" : "text-navy/70"
          }`}
        >
          {electronicLabel}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {images.map((src) => (
          <div key={src} className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

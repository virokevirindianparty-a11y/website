"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Download } from "lucide-react";
import { Lightbox } from "@/components/lightbox";

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

const LEGAL_IMAGES = [
  "/images/legal/1.webp",
  "/images/legal/2.webp",
  "/images/legal/3.webp",
  "/images/legal/4.webp",
  "/images/legal/5.webp",
  "/images/legal/6.webp",
  "/images/legal/7.webp",
];

const LEGAL_DOCUMENTS = [
  { href: "/documents/president-bio-en.pdf", label: "President's Biodata (English)" },
  { href: "/documents/president-bio-hi.pdf", label: "President's Biodata (Hindi)" },
];

const EVENT_2024_COUNT = 92;
const EVENT_2024_IMAGES = Array.from(
  { length: EVENT_2024_COUNT },
  (_, i) => `/images/election-2024-event/${i + 1}.webp`,
);

type Tab = "print" | "electronic" | "legal" | "election2024";

function ImageGrid({
  images,
  aspect,
  fit,
  onOpen,
}: {
  images: string[];
  aspect: string;
  fit: "cover" | "contain";
  onOpen: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => onOpen(i)}
          className={`relative ${aspect} rounded-xl overflow-hidden shadow-sm text-left ${
            fit === "contain" ? "bg-cream border border-border" : ""
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
        </button>
      ))}
    </div>
  );
}

export function MediaTabs({
  printLabel,
  electronicLabel,
  legalLabel,
  election2024Label,
}: {
  printLabel: string;
  electronicLabel: string;
  legalLabel: string;
  election2024Label: string;
}) {
  const [tab, setTab] = useState<Tab>("print");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "print", label: printLabel },
    { id: "electronic", label: electronicLabel },
    { id: "election2024", label: election2024Label },
    { id: "legal", label: legalLabel },
  ];

  return (
    <div>
      <div className="inline-flex flex-wrap rounded-full border border-border bg-cream p-1 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              tab === t.id ? "bg-navy text-white" : "text-navy/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "print" && (
        <ImageGrid
          images={PRINT_IMAGES}
          aspect="aspect-[3/2]"
          fit="cover"
          onOpen={(index) => setLightbox({ images: PRINT_IMAGES, index })}
        />
      )}

      {tab === "electronic" && (
        <ImageGrid
          images={ELECTRONIC_IMAGES}
          aspect="aspect-[3/2]"
          fit="cover"
          onOpen={(index) => setLightbox({ images: ELECTRONIC_IMAGES, index })}
        />
      )}

      {tab === "election2024" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {EVENT_2024_IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox({ images: EVENT_2024_IMAGES, index: i })}
              className="relative aspect-[3/2] rounded-lg overflow-hidden shadow-sm text-left"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                loading={i < 10 ? "eager" : "lazy"}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {tab === "legal" && (
        <div>
          <div className="mb-8">
            <ImageGrid
              images={LEGAL_IMAGES}
              aspect="aspect-[3/4]"
              fit="contain"
              onOpen={(index) => setLightbox({ images: LEGAL_IMAGES, index })}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {LEGAL_DOCUMENTS.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2.5 text-sm font-semibold text-navy hover:border-saffron hover:text-saffron-deep transition-colors"
              >
                <FileText size={16} className="text-saffron-dark shrink-0" />
                {doc.label}
                <Download size={14} className="text-muted" />
              </a>
            ))}
          </div>
        </div>
      )}

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox((prev) => (prev ? { ...prev, index } : prev))}
        />
      )}
    </div>
  );
}

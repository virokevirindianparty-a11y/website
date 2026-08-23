"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Download } from "lucide-react";

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
];

const LEGAL_DOCUMENTS = [
  { href: "/documents/president-bio-en.pdf", label: "President's Biodata (English)" },
  { href: "/documents/president-bio-hi.pdf", label: "President's Biodata (Hindi)" },
];

type Tab = "print" | "electronic" | "legal";

export function MediaTabs({
  printLabel,
  electronicLabel,
  legalLabel,
}: {
  printLabel: string;
  electronicLabel: string;
  legalLabel: string;
}) {
  const [tab, setTab] = useState<Tab>("print");

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "print", label: printLabel },
    { id: "electronic", label: electronicLabel },
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRINT_IMAGES.map((src) => (
            <div key={src} className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {tab === "electronic" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ELECTRONIC_IMAGES.map((src) => (
            <div key={src} className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {tab === "legal" && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {LEGAL_IMAGES.map((src) => (
              <div
                key={src}
                className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-cream border border-border"
              >
                <Image src={src} alt="" fill className="object-contain" />
              </div>
            ))}
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
    </div>
  );
}

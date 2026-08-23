"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_COUNT = 20;
const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) => `/images/steps/${i + 1}.webp`);

export function IdeologyBook() {
  const t = useTranslations("ideology");
  const [page, setPage] = useState(0);

  function go(delta: number) {
    setPage((p) => Math.min(Math.max(p + delta, 0), PAGE_COUNT - 1));
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-sm aspect-[1054/1492] rounded-md overflow-hidden shadow-xl border-[10px] border-white ring-1 ring-border">
        {PAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Page ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            priority={i === 0}
            className={`object-cover transition-opacity duration-300 ${
              i === page ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label="Previous page"
          className="p-2.5 rounded-full border border-border disabled:opacity-30 disabled:cursor-not-allowed hover:border-saffron hover:text-saffron-deep transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm font-semibold text-muted w-32 text-center">
          {t("bookPageLabel", { current: page + 1, total: PAGE_COUNT })}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={page === PAGE_COUNT - 1}
          aria-label="Next page"
          className="p-2.5 rounded-full border border-border disabled:opacity-30 disabled:cursor-not-allowed hover:border-saffron hover:text-saffron-deep transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

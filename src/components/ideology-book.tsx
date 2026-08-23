"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const PAGE_COUNT = 20;
const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) => `/images/steps/${i + 1}.webp`);

export function IdeologyBook() {
  const t = useTranslations("ideology");
  const [page, setPage] = useState(0);
  const captions = t.raw("bookPages") as string[];

  function go(delta: number) {
    setPage((p) => Math.min(Math.max(p + delta, 0), PAGE_COUNT - 1));
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 items-center text-left">
        <div className="relative w-full max-w-sm mx-auto md:mx-0 aspect-[1054/1492] rounded-md overflow-hidden shadow-xl border-[10px] border-white ring-1 ring-border">
          {PAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Page ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              priority={i === 0}
              className={`object-cover transition-opacity duration-300 ${
                i === page ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 md:p-7">
          <BookOpen className="text-saffron-dark mb-3" size={24} />
          <p className="text-navy leading-relaxed min-h-[6rem]">{captions[page]}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
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

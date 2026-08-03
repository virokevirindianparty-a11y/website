"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(next: "en" | "hi") {
    router.replace(
      // @ts-expect-error -- params shape is generic across dynamic pages
      { pathname, params },
      { locale: next },
    );
  }

  return (
    <div className="flex items-center rounded-full border border-border bg-cream p-0.5 text-xs font-semibold">
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === "en" ? "bg-navy text-white" : "text-navy/70"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchTo("hi")}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === "hi" ? "bg-navy text-white" : "text-navy/70"
        }`}
      >
        हि
      </button>
    </div>
  );
}

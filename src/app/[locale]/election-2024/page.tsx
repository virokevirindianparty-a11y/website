import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CANDIDATES } from "@/lib/data/candidates";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("election2024");
  return { title: t("title") };
}

// Links to a MyNeta name search rather than a specific profile: MyNeta
// candidate IDs can't be reliably guessed, and even name-only search often
// surfaces several different real people with the same name across
// constituencies/elections - a direct link risks showing the wrong person's
// affidavit under a candidate's name. The search page lets visitors confirm
// the right match themselves.
function mynetaSearchUrl(name: string) {
  return `https://myneta.info/search_myneta.php?q=${encodeURIComponent(name)}`;
}

export default async function Election2024Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("election2024");

  return (
    <>
      <PageHero
        eyebrow={t("candidateCount", { count: CANDIDATES.length })}
        title={t("title")}
        subtitle={t("intro")}
      />

      <section className="container-page py-14 md:py-20">
        <p className="text-xs text-muted mb-6">{t("mynetaNote")}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {CANDIDATES.map((candidate) => (
            <a
              key={candidate.slug}
              href={mynetaSearchUrl(candidate.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-saffron hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[3/4] bg-cream">
                <Image
                  src={`/images/candidates/${candidate.slug}.webp`}
                  alt={candidate.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-sm text-navy leading-snug group-hover:text-saffron-deep transition-colors">
                  {candidate.name}
                </h3>
                <p className="text-xs text-muted mt-1">
                  {candidate.constituency}
                  {candidate.number && ` (${candidate.number})`} · {candidate.state}
                </p>
                <p className="text-[11px] text-saffron-deep font-semibold mt-2 inline-flex items-center gap-1">
                  {t("mynetaLink")}
                  <ExternalLink size={11} />
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

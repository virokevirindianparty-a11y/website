import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/page-hero";
import { listPublishedNews } from "@/lib/data/news";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news");
  return { title: t("title") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const posts = await listPublishedNews();
  const isHindi = locale === "hi";

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20">
        {posts.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-saffron hover:-translate-y-1 transition-all"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/10]">
                    <Image src={post.coverImage} alt="" fill className="object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs font-semibold text-muted mb-2">
                    {new Date(post.publishedAt).toLocaleDateString(locale)}
                  </p>
                  <h2 className="font-heading font-bold text-navy group-hover:text-saffron-deep transition-colors">
                    {isHindi ? post.titleHi : post.titleEn}
                  </h2>
                  <p className="text-sm text-muted mt-2 line-clamp-3">
                    {isHindi ? post.bodyHi : post.bodyEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

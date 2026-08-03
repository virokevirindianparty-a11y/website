import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getNewsBySlug } from "@/lib/data/news";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  return { title: post?.titleEn ?? "News" };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const post = await getNewsBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const isHindi = locale === "hi";

  return (
    <article className="container-page py-14 md:py-20 max-w-3xl">
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-deep mb-8 hover:gap-2.5 transition-all"
      >
        <ArrowLeft size={16} />
        {t("backToNews")}
      </Link>

      {post.coverImage && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 shadow-sm">
          <Image src={post.coverImage} alt="" fill className="object-cover" />
        </div>
      )}

      <p className="text-sm font-semibold text-muted mb-2">
        {new Date(post.publishedAt).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="font-heading font-extrabold text-3xl text-navy mb-6">
        {isHindi ? post.titleHi : post.titleEn}
      </h1>
      <div className="text-muted leading-relaxed whitespace-pre-line">
        {isHindi ? post.bodyHi : post.bodyEn}
      </div>
    </article>
  );
}

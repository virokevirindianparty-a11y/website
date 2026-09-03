import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CampaignGallery } from "./campaign-gallery";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("campaign");
  return { title: t("title") };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("campaign");
  const points = t.raw("candidateQualityPoints") as string[];

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-navy mb-3">
            {t("candidateQualityTitle")}
          </h2>
          <p className="text-muted leading-relaxed mb-6">{t("candidateQualityIntro")}</p>
          <ul className="grid grid-cols-2 gap-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 bg-cream border border-border rounded-lg px-4 py-3 font-heading font-semibold text-navy text-sm"
              >
                <CheckCircle2 size={18} className="text-green shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/campaign-candidate-quality.webp"
            alt=""
            fill
            className="object-contain bg-black"
          />
        </div>
      </section>

      <section className="bg-cream border-y border-border py-14 md:py-20">
        <div className="container-page">
          <h2 className="font-heading font-extrabold text-2xl text-navy mb-8">
            {t("galleryTitle")}
          </h2>
          <CampaignGallery />
        </div>
      </section>
    </>
  );
}

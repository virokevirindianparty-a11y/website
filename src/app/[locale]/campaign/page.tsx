import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const dynamic = "force-static";

const GALLERY = [
  "/images/campaign-photo-1.jpg",
  "/images/campaign-photo-2.jpg",
  "/images/community-event.jpg",
];

const POSTERS = [
  "/images/campaign-mere-desh.png",
  "/images/campaign-bharat-bhoomi.png",
  "/images/campaign-hum-paida.png",
];

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
            src="/images/campaign-candidate-quality.png"
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
          <div className="grid sm:grid-cols-3 gap-5 mb-5">
            {GALLERY.map((src) => (
              <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {POSTERS.map((src) => (
              <div
                key={src}
                className="relative aspect-square rounded-xl overflow-hidden shadow-sm bg-white"
              >
                <Image src={src} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("constitution");
  return { title: t("title") };
}

export default async function ConstitutionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("constitution");
  const objectivePoints = t.raw("objectivePoints") as string[];

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20 max-w-3xl">
        <div className="mb-10">
          <h2 className="font-heading font-bold text-xl text-navy mb-2">
            {t("nameTitle")}
          </h2>
          <p className="text-muted leading-relaxed">{t("nameBody")}</p>
        </div>

        <div className="mb-10">
          <h2 className="font-heading font-bold text-xl text-navy mb-4">
            {t("objectiveTitle")}
          </h2>
          <ul className="space-y-3">
            {objectivePoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-muted leading-relaxed">
                <CheckCircle2 size={20} className="text-green shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-cream border border-border rounded-xl p-6">
          <h3 className="font-heading font-bold text-navy mb-1">{t("downloadTitle")}</h3>
          <p className="text-sm text-muted">{t("downloadBody")}</p>
        </div>
      </section>
    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Landmark, Scale, ShieldCheck, HeartHandshake, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const dynamic = "force-static";

const ICONS = [Landmark, Scale, ShieldCheck, HeartHandshake, Users];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ideology");
  return { title: t("title") };
}

export default async function IdeologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ideology");
  const pillars = t.raw("pillars") as Array<{ title: string; body: string }>;

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20">
        <h2 className="font-heading font-extrabold text-2xl text-navy mb-8">
          {t("pillarsTitle")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={pillar.title}
                className="bg-surface border border-border rounded-xl p-7 hover:border-saffron transition-colors"
              >
                <Icon className="text-saffron-dark mb-4" size={30} />
                <h3 className="font-heading font-bold text-lg text-navy mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted leading-relaxed">{pillar.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy text-white py-14 md:py-20">
        <div className="container-page">
          <h2 className="font-heading font-extrabold text-2xl mb-8 text-center">
            {t("slogansTitle")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="text-center bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="font-heading font-extrabold text-2xl text-saffron mb-2">
                {t("slogan1")}
              </p>
              <p className="text-white/70 text-sm">{t("slogan1Sub")}</p>
            </div>
            <div className="text-center bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="font-heading font-extrabold text-2xl text-saffron mb-2">
                {t("slogan2")}
              </p>
              <p className="text-white/70 text-sm">{t("slogan2Sub")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

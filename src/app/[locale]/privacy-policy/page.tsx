import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return { title: t("title") };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;

  return (
    <>
      <PageHero title={t("title")} subtitle={t("intro")} />
      <section className="container-page py-14 md:py-20 max-w-3xl space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-heading font-bold text-lg text-navy mb-2">
              {section.title}
            </h2>
            <p className="text-muted leading-relaxed">{section.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}

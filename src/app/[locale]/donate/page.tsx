import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DonateForm } from "./donate-form";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("donate");
  return { title: t("title") };
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("donate");

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <span className="inline-block bg-saffron/15 text-saffron-deep text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4">
            {t("comingSoonBadge")}
          </span>
          <h2 className="font-heading font-bold text-lg text-navy mb-2">
            {t("alternativeTitle")}
          </h2>
          <p className="text-sm text-muted mb-4">{t("alternativeBody")}</p>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-3 items-center">
              <Phone size={16} className="text-saffron-dark shrink-0" />
              <a href="tel:+917984964164" className="hover:text-saffron-deep">
                +91 79849 64164
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={16} className="text-saffron-dark shrink-0" />
              <a href="mailto:donate@virokevirindianparty.org" className="hover:text-saffron-deep break-all">
                donate@virokevirindianparty.org
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3 bg-surface border border-border rounded-xl p-7">
          <DonateForm />
        </div>
      </section>
    </>
  );
}

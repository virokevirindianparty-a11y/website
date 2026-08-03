import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "./contact-form";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">
            {t("officeTitle")}
          </h2>
          <ul className="space-y-4 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin size={18} className="text-saffron-dark shrink-0 mt-0.5" />
              <span>First Floor, B-2, Sarthi Complex-2, Manekpura, Liliya Road, Amreli, Gujarat-365601, India</span>
            </li>
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("team");
  return { title: t("title") };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");
  const members = t.raw("members") as Array<{ name: string; role: string }>;

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-surface border border-border rounded-xl p-8 text-center hover:border-saffron hover:-translate-y-1 transition-all"
            >
              <div className="tricolor-bar w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="bg-white/90 rounded-full w-16 h-16 flex items-center justify-center font-heading font-extrabold text-navy text-lg">
                  {initials(member.name)}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-navy">{member.name}</h3>
              <p className="text-saffron-dark text-sm font-semibold mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

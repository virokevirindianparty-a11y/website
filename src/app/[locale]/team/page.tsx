import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("team");
  return { title: t("title") };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");
  const members = t.raw("members") as Array<{ name: string; role: string; photo: string }>;

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-surface border border-border rounded-xl overflow-hidden text-center hover:border-saffron hover:-translate-y-1 transition-all"
            >
              <div className="relative w-full aspect-[900/1553]">
                <Image
                  src={`/images/team/${member.photo}.webp`}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-navy">{member.name}</h3>
                <p className="text-saffron-dark text-sm font-semibold mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

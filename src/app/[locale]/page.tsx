import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Users, Scale, Landmark, HeartHandshake, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { listPublishedNews } from "@/lib/data/news";
import { listUpcomingEvents } from "@/lib/data/events";

export const dynamic = "force-dynamic";

const PILLAR_ICONS = [Landmark, Scale, ShieldCheck, HeartHandshake, Users];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tIdeology = await getTranslations("ideology");

  const tCommon = await getTranslations("common");

  const [news, events] = await Promise.all([
    listPublishedNews(3),
    listUpcomingEvents(3),
  ]);

  const pillars = tIdeology.raw("pillars") as Array<{ title: string; body: string }>;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-rally.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
        </div>
        <div className="container-page relative py-20 md:py-32">
          <p className="text-saffron font-semibold text-xs md:text-sm tracking-widest uppercase mb-4">
            {t("heroEyebrow")}
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight max-w-3xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 text-white/85 text-base md:text-lg max-w-2xl">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/join"
              className="bg-saffron text-white font-heading font-semibold px-7 py-3 rounded-full shadow-md hover:bg-saffron-dark transition-colors inline-flex items-center gap-2"
            >
              {t("heroCtaPrimary")}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/ideology"
              className="bg-white/10 border border-white/30 text-white font-heading font-semibold px-7 py-3 rounded-full hover:bg-white/20 transition-colors"
            >
              {t("heroCtaSecondary")}
            </Link>
          </div>
          <p className="mt-10 font-heading text-lg md:text-xl italic text-saffron/90 max-w-xl">
            &ldquo;{t("motto")}&rdquo;
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-navy mb-4">
              {t("missionTitle")}
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              {t("missionBody")}
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/about-team.webp"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream border-y border-border py-16 md:py-24">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-navy">
              {t("pillarsTitle")}
            </h2>
            <Link
              href="/ideology"
              className="text-saffron-deep font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              {t("pillarsCta")}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
              return (
                <div
                  key={pillar.title}
                  className="bg-surface border border-border rounded-xl p-5 hover:border-saffron hover:-translate-y-1 transition-all"
                >
                  <Icon className="text-saffron-dark mb-3" size={26} />
                  <h3 className="font-heading font-bold text-sm text-navy mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-4">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24 grid md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-heading font-extrabold text-2xl text-navy">
              {t("newsTitle")}
            </h2>
            <Link href="/news" className="text-saffron-deep font-semibold text-sm">
              {tCommon("viewAll")}
            </Link>
          </div>
          {news.length === 0 ? (
            <p className="text-muted text-sm">{t("newsEmpty")}</p>
          ) : (
            <ul className="space-y-5">
              {news.map((post) => (
                <li key={post.id} className="border-b border-border pb-5">
                  <Link href={`/news/${post.slug}`} className="group">
                    <h3 className="font-heading font-bold text-navy group-hover:text-saffron-deep transition-colors">
                      {post.titleEn}
                    </h3>
                    <p className="text-sm text-muted mt-1 line-clamp-2">{post.bodyEn}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-heading font-extrabold text-2xl text-navy">
              {t("eventsTitle")}
            </h2>
            <Link href="/events" className="text-saffron-deep font-semibold text-sm">
              {tCommon("viewAll")}
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="text-muted text-sm">{t("eventsEmpty")}</p>
          ) : (
            <ul className="space-y-5">
              {events.map((event) => (
                <li key={event.id} className="border-b border-border pb-5">
                  <h3 className="font-heading font-bold text-navy">{event.titleEn}</h3>
                  <p className="text-sm text-muted mt-1">
                    {new Date(event.eventDate).toLocaleDateString(locale)} · {event.location}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-navy text-white py-16 md:py-20">
        <div className="container-page text-center">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl mb-3">
            {t("ctaTitle")}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">{t("ctaBody")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/join"
              className="bg-saffron text-white font-heading font-semibold px-7 py-3 rounded-full hover:bg-saffron-dark transition-colors"
            >
              {t("ctaJoin")}
            </Link>
            <Link
              href="/volunteer"
              className="bg-white text-navy font-heading font-semibold px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              {t("ctaVolunteer")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

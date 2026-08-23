import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Users,
  Scale,
  Landmark,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroSlideshow } from "@/components/hero-slideshow";
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
  const visionPoints = t.raw("visionPoints") as string[];
  const visionTags = t.raw("visionTags") as string[];
  const visionImage = locale === "hi" ? "/images/vision-hi.webp" : "/images/vision-en.webp";

  const election2027Contacts = [
    { name: "Laljibhai Bodar", role: t("election2027President"), phone: "9737536789" },
    { name: "Himmatbhai Ladumor", role: t("election2027StateHead"), phone: "9979942421" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <HeroSlideshow />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/35 to-navy/10" />
        </div>
        <div className="container-page relative py-10 sm:py-20 md:py-32">
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
          <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0 rounded-xl overflow-hidden shadow-md border border-border">
            <Image src="/images/payment.webp" alt="" fill className="object-contain bg-white" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-navy mb-4">
              {t("paymentTitle")}
            </h2>
            <p className="text-muted leading-relaxed mb-6">{t("paymentIntro")}</p>
            <div className="bg-cream border border-border rounded-xl p-5 mb-6">
              <h3 className="font-heading font-bold text-sm text-navy uppercase tracking-wide mb-3">
                {t("paymentDetailsTitle")}
              </h3>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {[
                  [t("paymentUpi"), "7984964164m@pnb"],
                  [t("paymentAccountName"), "Viro Ke Vir Indian Party"],
                  [t("paymentBank"), "Punjab National Bank"],
                  [t("paymentAccountNumber"), "0024002100029910"],
                  [t("paymentIfsc"), "PUNB0002400"],
                  [t("paymentSwift"), "PUNBINBBBNR"],
                  [t("paymentMobile"), "7984964164"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold text-muted">{label}</dt>
                    <dd className="text-navy font-semibold break-all">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-saffron text-white font-heading font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-saffron-dark transition-colors"
            >
              {t("paymentCta")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-16 md:py-24">
        <div className="container-page grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl mb-4">
              {t("visionTitle")}
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">{t("visionIntro")}</p>
            <ul className="space-y-3 mb-6">
              {visionPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                  <CheckCircle2 size={18} className="text-saffron shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-4">
              {visionTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="font-heading font-bold text-saffron">{t("visionTagline")}</p>
          </div>
          <div className="order-1 md:order-2 relative aspect-[3/4] max-w-md mx-auto rounded-xl overflow-hidden shadow-lg bg-white">
            <Image src={visionImage} alt="" fill className="object-contain" />
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0 rounded-xl overflow-hidden shadow-md bg-white">
            <Image src="/images/election-2027.webp" alt="" fill className="object-contain" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-navy mb-4">
              {t("election2027Title")}
            </h2>
            <p className="font-heading italic text-saffron-deep leading-relaxed mb-4">
              {t("election2027Intro")}
            </p>
            <p className="text-muted leading-relaxed mb-6">{t("election2027Body")}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {election2027Contacts.map((contact) => (
                <div
                  key={contact.name}
                  className="bg-cream border border-border rounded-xl p-4"
                >
                  <p className="font-heading font-bold text-navy">{contact.name}</p>
                  <p className="text-xs text-muted mb-2">{contact.role}</p>
                  <a
                    href={`tel:+91${contact.phone}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-deep hover:underline"
                  >
                    <Phone size={14} />
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
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

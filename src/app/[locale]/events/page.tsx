import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { listUpcomingEvents } from "@/lib/data/events";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("events");
  return { title: t("title") };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("events");
  const events = await listUpcomingEvents();
  const isHindi = locale === "hi";

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20">
        {events.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <div className="space-y-5 max-w-3xl">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-surface border border-border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="bg-cream border border-border rounded-lg px-4 py-3 text-center shrink-0 w-20">
                  <p className="font-heading font-extrabold text-navy text-xl">
                    {new Date(event.eventDate).getDate()}
                  </p>
                  <p className="text-xs font-semibold text-muted uppercase">
                    {new Date(event.eventDate).toLocaleDateString(locale, { month: "short" })}
                  </p>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-bold text-lg text-navy">
                    {isHindi ? event.titleHi : event.titleEn}
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    {isHindi ? event.descriptionHi : event.descriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs font-semibold text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-saffron-dark" />
                      {new Date(event.eventDate).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-saffron-dark" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

import Link from "next/link";
import { Users, HeartHandshake, Mail, Gift, Newspaper, CalendarDays } from "lucide-react";
import { getDashboardCounts } from "@/lib/data/submissions";
import { listAllNews } from "@/lib/data/news";
import { listAllEvents } from "@/lib/data/events";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [counts, news, events] = await Promise.all([
    getDashboardCounts(),
    listAllNews(),
    listAllEvents(),
  ]);

  const cards = [
    { label: "Join Applications", value: counts.join, icon: Users, href: "/admin/submissions#join" },
    { label: "Volunteers", value: counts.volunteer, icon: HeartHandshake, href: "/admin/submissions#volunteer" },
    { label: "Contact Messages", value: counts.contact, icon: Mail, href: "/admin/submissions#contact" },
    { label: "Donation Interest", value: counts.donate, icon: Gift, href: "/admin/submissions#donate" },
  ];

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-navy mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-surface border border-border rounded-xl p-5 hover:border-saffron transition-colors"
          >
            <card.icon className="text-saffron-dark mb-3" size={22} />
            <p className="text-2xl font-heading font-extrabold text-navy">{card.value}</p>
            <p className="text-xs text-muted font-semibold mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-navy flex items-center gap-2">
              <Newspaper size={18} className="text-saffron-dark" /> News
            </h2>
            <Link href="/admin/news" className="text-xs font-semibold text-saffron-deep">
              Manage
            </Link>
          </div>
          <p className="text-sm text-muted">{news.length} post(s)</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-navy flex items-center gap-2">
              <CalendarDays size={18} className="text-saffron-dark" /> Events
            </h2>
            <Link href="/admin/events" className="text-xs font-semibold text-saffron-deep">
              Manage
            </Link>
          </div>
          <p className="text-sm text-muted">{events.length} event(s)</p>
        </div>
      </div>
    </div>
  );
}

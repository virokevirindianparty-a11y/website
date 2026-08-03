import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Newspaper, CalendarDays, Inbox, LogOut } from "lucide-react";
import { montserrat, inter } from "@/lib/fonts";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { logoutAdmin } from "@/lib/actions/admin-auth";
import "../../globals.css";

export const metadata = { title: "Admin | VVIP" };

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-cream text-foreground">
        <aside className="hidden md:flex md:w-60 shrink-0 flex-col bg-navy text-white">
          <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
            <Image src="/images/logo.png" alt="VVIP" width={30} height={30} />
            <span className="font-heading font-bold text-sm">VVIP Admin</span>
          </div>
          <nav className="flex-1 py-4 px-3 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-3 py-4 border-t border-white/10">
            <p className="px-3 text-xs text-white/50 mb-2 truncate">{session.email}</p>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </form>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="md:hidden flex items-center justify-between px-4 h-14 bg-navy text-white">
            <span className="font-heading font-bold text-sm">VVIP Admin</span>
            <form action={logoutAdmin}>
              <button type="submit" className="text-xs font-semibold text-white/80">
                Log Out
              </button>
            </form>
          </header>
          <main className="p-5 md:p-8 max-w-5xl">{children}</main>
        </div>
      </body>
    </html>
  );
}

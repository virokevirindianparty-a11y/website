"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";

const NAV_LINKS: Array<{ href: string; key: string }> = [
  { href: "/about", key: "about" },
  { href: "/ideology", key: "ideology" },
  { href: "/campaign", key: "campaign" },
  { href: "/team", key: "team" },
  { href: "/media", key: "media" },
  { href: "/news", key: "news" },
  { href: "/events", key: "events" },
  { href: "/contact", key: "contact" },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur border-b border-border">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/images/logo.png" alt="VVIP" width={36} height={36} priority />
          <span className="font-heading font-extrabold text-navy text-lg leading-tight">
            Viro Ke Vir
            <span className="block text-xs font-semibold text-saffron-dark tracking-wide">
              INDIAN PARTY
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                  active
                    ? "bg-saffron/15 text-saffron-deep"
                    : "text-foreground/80 hover:bg-saffron/10 hover:text-saffron-deep"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/join"
            className="bg-saffron text-white px-5 py-2 rounded-full font-heading font-semibold text-sm shadow-sm hover:bg-saffron-dark transition-colors"
          >
            {t("join")}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-navy"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-surface">
          <nav className="container-page py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground/85 hover:bg-saffron/10"
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-2 bg-saffron text-white px-4 py-2.5 rounded-full font-heading font-semibold text-sm text-center"
            >
              {t("join")}
            </Link>
            <div className="mt-3 flex justify-center">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

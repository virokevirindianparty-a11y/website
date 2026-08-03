import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const QUICK_LINKS = [
  { href: "/about", key: "about" },
  { href: "/ideology", key: "ideology" },
  { href: "/constitution", key: "constitution" },
  { href: "/team", key: "team" },
  { href: "/news", key: "news" },
];

const GET_INVOLVED_LINKS = [
  { href: "/join", key: "join" },
  { href: "/volunteer", key: "volunteer" },
  { href: "/donate", key: "donate" },
  { href: "/events", key: "events" },
];

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="bg-navy text-white mt-16">
      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/images/logo.webp" alt="VVIP" width={32} height={32} />
            <span className="font-heading font-extrabold">Viro Ke Vir Indian Party</span>
          </div>
          <p className="text-sm text-white/70">{t("footer.tagline")}</p>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-saffron mb-3">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-saffron mb-3">
            {t("footer.getInvolved")}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {GET_INVOLVED_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                {t("footer.privacyPolicy")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-saffron mb-3">
            {t("footer.contactUs")}
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin size={18} className="shrink-0 text-saffron" />
              <span>First Floor, B-2, Sarthi Complex-2, Manekpura, Liliya Road, Amreli, Gujarat-365601</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone size={16} className="shrink-0 text-saffron" />
              <a href="tel:+917984964164" className="hover:text-white">
                +91 79849 64164
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <Mail size={16} className="shrink-0 text-saffron" />
              <a href="mailto:donate@virokevirindianparty.org" className="hover:text-white break-all">
                donate@virokevirindianparty.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
          <p>{t("footer.registered")}</p>
        </div>
      </div>
    </footer>
  );
}

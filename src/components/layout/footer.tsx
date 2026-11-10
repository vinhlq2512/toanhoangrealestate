import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  facebookPageUrl,
  lineProfileUrl,
  instagramUrl,
  tiktokUrl,
  googleMapsUrl,
  companyOfficeAddress,
  companyLegalName,
  companyPhone,
  companyEmail,
} from "@/lib/contact-links";
import {
  FacebookIcon,
  TikTokIcon,
  InstagramIcon,
  LineIcon,
} from "@/components/shared/social-icons";

const footerLanguages = [
  { code: "vi" as const, label: "Tiếng Việt 🇻🇳" },
  { code: "en" as const, label: "English 🇺🇸" },
  { code: "ja" as const, label: "日本語 🇯🇵" },
  { code: "zh" as const, label: "中文 🇨🇳" },
  { code: "id" as const, label: "Bahasa Indonesia 🇮🇩" },
  { code: "ne" as const, label: "नेपाली 🇳🇵" },
  { code: "my" as const, label: "မြန်မာ 🇲🇲" },
];

export function Footer() {
  const t = useTranslations("common");
  const nav = useTranslations("nav");

  const channels = [
    { label: "Facebook", href: facebookPageUrl, Icon: FacebookIcon },
    { label: "TikTok", href: tiktokUrl, Icon: TikTokIcon },
    { label: "Instagram", href: instagramUrl, Icon: InstagramIcon },
    { label: "LINE", href: lineProfileUrl, Icon: LineIcon },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Link href="/" className="brand-lockup">
            <Image
              src="/images/branding/logo.png"
              alt="TOANHOANG REAL ESTATE"
              width={40}
              height={40}
              className="brand-logo"
            />
            <span>
              {t("brand")}
              <small>{nav("tagline")}</small>
            </span>
          </Link>
          <p>{t("footerDescription")}</p>
          <a
            className="footer-location"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={16} />
            <span>{companyOfficeAddress}</span>
          </a>
          <a className="footer-contact-compact" href={`tel:${companyPhone.replace(/[^0-9+]/g, "")}`}>
            <Phone size={15} />
            <span>{companyPhone}</span>
          </a>
        </div>

        <div className="footer-col">
          <h2>{t("learnMore")}</h2>
          <Link href="/">{t("home")}</Link>
          <Link href="/properties">{t("apartments")}</Link>
          <Link href="/#areas">{t("areas")}</Link>
          <Link href="/faq">{t("faq")}</Link>
          <Link href="/contact">{t("contact")}</Link>
        </div>

        <div className="footer-col footer-connect">
          <h2>{t("connect")}</h2>
          <div className="footer-socials">
            {channels.map(({ label, href, Icon }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                key={label}
                title={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a href={`mailto:${companyEmail}`}>
            <Mail size={14} />
            <span>{companyEmail}</span>
            <ArrowUpRight size={14} />
          </a>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={14} />
            <span>{companyLegalName} (Google Maps)</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="footer-col footer-languages">
          <h2>{t("language")}</h2>
          <div className="footer-lang-list">
            {footerLanguages.map(({ code, label }) => (
              <Link href="/" locale={code} key={code} className="footer-lang-link">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          {t("copyright")} · {companyLegalName} · {t("location")}
        </span>
        <span className="footer-signoff">
          {nav("tagline")}{" "}
          <Image
            src="/images/branding/logo.png"
            alt="TOANHOANG REAL ESTATE"
            width={28}
            height={28}
            className="brand-logo-sm"
          />
        </span>
      </div>
    </footer>
  );
}

import { ArrowUpRight, Facebook, Instagram, MapPin, MessageCircle, Music2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { facebookPageUrl, lineAddFriendsUrl } from "@/lib/contact-links";

export function Footer() {
  const t = useTranslations("common");
  const nav = useTranslations("nav");
  const channels = [
    { label: "Facebook", Icon: Facebook },
    { label: "TikTok", Icon: Music2 },
    { label: "Instagram", Icon: Instagram },
    { label: "LINE", Icon: MessageCircle },
  ];
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-about"><Link href="/" className="brand-lockup"><span className="brand-mark"><span /></span><span>{t("brand")}<small>{nav("tagline")}</small></span></Link><p>{t("footerDescription")}</p><span className="footer-location"><MapPin size={16} />{t("location")}</span><a className="footer-contact-compact" href="tel:+81665689026">06-6568-9026</a></div>
      <div className="footer-col"><h2>{t("learnMore")}</h2><Link href="/">{t("home")}</Link><Link href="/properties">{t("apartments")}</Link><Link href="/#areas">{t("areas")}</Link><Link href="/faq">{t("faq")}</Link><Link href="/contact">{t("contact")}</Link></div>
      <div className="footer-col footer-connect"><h2>{t("connect")}</h2><div className="footer-socials">{channels.map(({ label, Icon }) => {
        const href = label === "Facebook" ? facebookPageUrl : label === "LINE" ? lineAddFriendsUrl : "/contact#social-contact";
        const external = href.startsWith("https://");
        return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={label} key={label}><Icon size={17} /></a>;
      })}</div><a href="mailto:genesis.estate.jp@gmail.com">genesis.estate.jp@gmail.com <ArrowUpRight size={14} /></a><a href="https://maps.google.com/?q=2-5-29+Sakuragawa+Naniwa+Osaka+556-0022" target="_blank" rel="noreferrer">{t("location")} <ArrowUpRight size={14} /></a></div>
      <div className="footer-col footer-languages"><h2>{t("language")}</h2><span>Tiếng Việt</span><span>English</span><span>中文</span></div>
    </div>
    <div className="container footer-bottom"><span>{t("copyright")} · 株式会社 GENESIS · {t("location")}</span><span className="footer-signoff">{nav("tagline")} <span className="brand-mark"><span /></span></span></div>
  </footer>;
}

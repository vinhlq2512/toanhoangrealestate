import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/shared/page-hero";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata(locale, "/contact", t("title"), t("description"));
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const c = await getTranslations("common");
  const address = "〒556-0022 大阪府大阪市浪速区桜川２丁目５−２９";
  const maps = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  return <>
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} image="/images/locations/kobe-city-at-night.png" size="compact" />
    <section className="contact-page"><div className="container">
      <div className="contact-channel-grid">
        <article className="contact-channel"><span className="channel-icon line-icon">LINE</span><div><p className="eyebrow">{t("lineTitle")}</p><h2>{t("lineTitle")}</h2><p>{t("lineText")}</p><a href="mailto:genesis.estate.jp@gmail.com?subject=Website%20enquiry" className="text-link">{t("email")} <ArrowUpRight size={16} /></a></div></article>
        <article className="contact-channel"><span className="channel-icon facebook-icon">f</span><div><p className="eyebrow">{t("facebookTitle")}</p><h2>{t("facebookTitle")}</h2><p>{t("facebookText")}</p><a href="mailto:genesis.estate.jp@gmail.com?subject=Website%20enquiry" className="text-link">{t("email")} <ArrowUpRight size={16} /></a></div></article>
      </div>
      <p className="channel-note">{t("channelsNote")}</p>
      <div className="contact-info-grid"><div className="contact-info-copy"><p className="eyebrow">TOANHOANG REAL ESTATE</p><h2>{t("infoTitle")}</h2><dl>
        <div><dt><span><MapPin size={17} /></span>{t("address")}</dt><dd>{address}</dd></div>
        <div><dt><span><Phone size={17} /></span>{t("phone")}</dt><dd><a href="tel:+81665689026">06-6568-9026</a></dd></div>
        <div><dt><span><Mail size={17} /></span>{t("email")}</dt><dd><a href="mailto:genesis.estate.jp@gmail.com">genesis.estate.jp@gmail.com</a></dd></div>
        <div><dt><span><Clock3 size={17} /></span>{t("hours")}</dt><dd>{t("hoursValue")}</dd></div>
        <div><dt><span><MapPin size={17} /></span>{t("legalName")}</dt><dd>株式会社 GENESIS</dd></div>
      </dl><a className="button button-gold" href={maps} target="_blank" rel="noreferrer">{t("map")}<ArrowUpRight size={17} /></a></div>
        <a className="map-card" href={maps} target="_blank" rel="noreferrer" aria-label={t("map")}><span className="map-pin"><MapPin size={26} /></span><strong>{c("location").toLocaleUpperCase(locale)}</strong><span>{address}</span><span className="map-card-link">{t("map")}<ArrowUpRight size={17} /></span></a>
      </div>
      <div className="social-contact" id="social-contact"><h2>{t("socialTitle")}</h2><div>{["facebook", "tiktok", "instagram", "line"].map((key) => <p key={key}>{t(key)}</p>)}</div></div>
      <p className="contact-closing">{t("closing")}</p>
    </div></section>
  </>;
}

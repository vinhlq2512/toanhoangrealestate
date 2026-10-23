import Image from "next/image";
import { ArrowRight, Building2, Search } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ContactBanner } from "@/components/shared/contact-banner";
import { PageHero } from "@/components/shared/page-hero";
import { pageMetadata } from "@/lib/metadata";

type Card = { title: string; subtitle?: string; text?: string; image: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });
  return pageMetadata(locale, "/properties", t("title"), t("description"));
}

export default async function PropertiesPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ keyword?: string }> }) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);
  const t = await getTranslations("properties");
  const c = await getTranslations("common");
  const rentalCards = t.raw("rentals") as Card[];
  const saleCards = t.raw("sale") as Card[];
  const business = t.raw("business") as string[];
  const keyword = (query.keyword ?? "").trim();
  const normalized = keyword.toLocaleLowerCase(locale);
  const includesQuery = (value: string) => {
    const normalizedValue = value.toLocaleLowerCase(locale);
    if (normalized.length > 2) return normalizedValue.includes(normalized);
    return normalizedValue.split(/[\s·・,;()_-]+/).some((word) => word.startsWith(normalized));
  };
  const matches = (card: Card) => !normalized || [card.title, card.subtitle ?? "", card.text ?? ""].some(includesQuery);
  const rentals = rentalCards.filter(matches);
  const sale = saleCards.filter(matches);
  const businessMatches = business.filter((item) => !normalized || includesQuery(item));
  const hasSearch = rentals.length + sale.length + businessMatches.length > 0;
  return <>
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} image="/images/locations/fuji-sunset-pagoda.png" />
    <section className="property-search-section"><div className="container">
      <form className="property-search" action="" method="get"><label htmlFor="keyword">{t("searchLabel")}</label><div className="search-row"><Search size={19} /><input id="keyword" type="search" name="keyword" placeholder={t("searchPlaceholder")} defaultValue={keyword} /><button type="submit">{t("searchButton")}<ArrowRight size={17} /></button></div></form>
      {keyword && <div className="search-status"><p>{t("results")}: <strong>{keyword}</strong></p><Link href="/properties">{t("clearSearch")}</Link></div>}
    </div></section>
    {!hasSearch ? <div className="container no-results"><p>{t("noResults")}</p><Link className="button button-gold" href="/contact">{c("contactUs")}</Link></div> : <>
      {rentals.length > 0 && <section className="property-section"><div className="container">
        <div className="section-heading heading-light"><div><p className="eyebrow">01</p><h2>{t("rentalTitle")}</h2><p>{t("rentalText")}</p></div><Link href="/properties/search" className="outline-link">{t("rentalCta")}<ArrowRight size={17} /></Link></div>
        <div className="property-grid">{rentals.map((card) => <article className="property-card" key={card.title}><div className="property-image"><Image src={card.image} alt={card.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" /><span className="image-number">{card.subtitle}</span></div><div className="property-card-copy"><h3>{card.title}</h3><p>{card.text}</p><Link href="/contact" aria-label={`${card.title} — ${c("contactUs")}`} className="round-arrow"><ArrowRight size={16} /></Link></div></article>)}</div>
      </div></section>}
      {businessMatches.length > 0 && <section className="business-section"><div className="container business-panel"><div className="business-copy"><p className="eyebrow">02</p><Building2 className="gold-icon" size={32} /><h2>{t("businessTitle")}</h2><p>{t("businessText")}</p><ul>{businessMatches.map((item) => <li key={item}><span />{item}</li>)}</ul><Link href="/contact" className="button button-gold">{t("businessCta")}<ArrowRight size={17} /></Link></div><div className="business-photo"><Image src={t("businessImage")} alt="" fill sizes="(max-width: 800px) 100vw, 45vw" /></div></div></section>}
      {sale.length > 0 && <section className="property-section sale-section"><div className="container"><div className="section-heading heading-light"><div><p className="eyebrow">03</p><h2>{t("saleTitle")}</h2><p>{t("saleText")}</p></div><Link href="/contact" className="outline-link">{t("saleCta")}<ArrowRight size={17} /></Link></div><div className="property-grid sale-grid">{sale.map((card) => <article className="property-card" key={card.title}><div className="property-image"><Image src={card.image} alt={card.title} fill sizes="(max-width: 640px) 100vw, 25vw" /></div><div className="property-card-copy"><h3>{card.title}</h3><Link href="/contact" aria-label={`${card.title} — ${c("contactUs")}`} className="round-arrow"><ArrowRight size={16} /></Link></div></article>)}</div></div></section>}
    </>}
    <p className="container property-disclaimer">{t("disclaimer")}</p>
    <ContactBanner title={t("ctaTitle")} text={t("ctaText")} buttonLabel={c("contactUs")} eyebrow={`${t("eyebrow")} · ${c("contactUs")}`} />
  </>;
}

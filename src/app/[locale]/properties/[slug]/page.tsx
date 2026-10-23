import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, MapPin, TrainFront } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { localize, sampleProperties } from "@/data/mock-properties";
import { pageMetadata } from "@/lib/metadata";

function formatPrice(locale: Locale, amount: number) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

export function generateStaticParams() {
  return sampleProperties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const property = sampleProperties.find((item) => item.slug === slug);
  if (!property) return {};
  const t = await getTranslations({ locale, namespace: "listing" });
  return { ...pageMetadata(locale, `/properties/${slug}`, localize(property.title, locale), t("sampleDetailNotice")), robots: { index: false, follow: true } };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const property = sampleProperties.find((item) => item.slug === slug);
  if (!property) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("listing");
  const common = await getTranslations("common");
  const related = sampleProperties.filter((item) => item.id !== property.id).slice(0, 3);
  return <>
    <section className="property-detail-page"><div className="container">
      <Link className="back-link" href="/properties/search"><ArrowLeft size={16} />{t("backToSearch")}</Link>
      <div className="demo-notice detail-notice"><span>!</span><p>{t("sampleDetailNotice")}</p></div>
      <div className="detail-title-row"><div><p className="eyebrow">{t("sampleLabel")} · {localize(property.neighborhood, locale)}</p><h1>{localize(property.title, locale)}</h1><p className="detail-address"><MapPin size={16} />{localize(property.address, locale)}</p></div><div className="detail-price">{formatPrice(locale, property.price)}<small>{t("perMonth")}</small></div></div>
      <div className="property-gallery"><div className="gallery-main"><Image src={property.images[0]} alt={localize(property.title, locale)} fill priority sizes="(max-width: 800px) 100vw, 65vw" /></div><div className="gallery-side"><Image src={property.images[1] ?? property.images[0]} alt="" fill sizes="(max-width: 800px) 50vw, 32vw" /></div></div>
      <div className="property-detail-layout"><div className="detail-main-column">
        <section className="detail-panel"><p className="eyebrow">{t("overview")}</p><h2>{t("detailTitle")}</h2><dl className="detail-facts">
          <div><dt>{t("listingType")}</dt><dd>{t("listingType")}</dd></div>
          <div><dt>{t("propertyType")}</dt><dd>{property.type === "house" ? t("house") : t("apartment")}</dd></div>
          <div><dt>{t("area")}</dt><dd>{localize(property.neighborhood, locale)}</dd></div>
          <div><dt>{t("floorPlanLabel")}</dt><dd>{property.floorPlan}</dd></div>
          <div><dt>{t("floorAreaLabel")}</dt><dd>{new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(property.floorArea)} m²</dd></div>
          <div><dt>{t("nearestStation")}</dt><dd>{localize(property.nearestStation, locale)} · {t("minuteWalk", { count: property.stationWalkMinutes })}</dd></div>
        </dl></section>
        <section className="detail-panel"><p className="eyebrow">{t("descriptionHeading")}</p><h2>{localize(property.title, locale)}</h2><p>{localize(property.description, locale)}</p></section>
        <section className="detail-panel"><p className="eyebrow">{t("amenities")}</p><h2>{t("amenities")}</h2><ul className="amenities-list">{property.amenities.map((amenity) => <li key={amenity[locale]}><Check size={17} />{localize(amenity, locale)}</li>)}</ul></section>
      </div><aside className="detail-contact-card"><p className="eyebrow">{t("agentRole")}</p><h2>{t("agentName")}</h2><p>{t("contactText")}</p><Link href="/contact" className="button button-gold">{t("contactNow")}<ArrowRight size={17} /></Link><a href="tel:+81665689026" className="detail-phone">06-6568-9026</a><span className="detail-email">genesis.estate.jp@gmail.com</span></aside></div>
    </div></section>
    <section className="related-section"><div className="container"><div className="section-heading heading-light"><div><p className="eyebrow">{t("sampleLabel")}</p><h2>{t("related")}</h2></div><Link className="text-link" href="/properties/search">{t("backToSearch")}<ArrowRight size={16} /></Link></div><div className="related-grid">{related.map((item) => <Link className="related-card" key={item.id} href={`/properties/${item.slug}`}><div><Image src={item.images[0]} alt={localize(item.title, locale)} fill sizes="(max-width: 680px) 100vw, 30vw" /></div><h3>{localize(item.title, locale)}</h3><p><TrainFront size={14} />{localize(item.neighborhood, locale)}</p><strong>{formatPrice(locale, item.price)}<small>{t("perMonth")}</small></strong></Link>)}</div><p className="detail-back-bottom"><MapPin size={15} />{common("location")}</p></div></section>
  </>;
}

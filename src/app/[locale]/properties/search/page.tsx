import Image from "next/image";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localize, sampleProperties, type PropertyArea, type PropertyType, type SampleProperty } from "@/data/mock-properties";
import { PageHero } from "@/components/shared/page-hero";
import { pageMetadata } from "@/lib/metadata";

type SearchParams = { keyword?: string; area?: string; type?: string; minPrice?: string; maxPrice?: string; minArea?: string; sort?: string; page?: string };
const perPage = 4;

function validNumber(value?: string) {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function price(locale: Locale, amount: number) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "listing" });
  return pageMetadata(locale, "/properties/search", t("title"), t("description"));
}

export default async function PropertySearchPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<SearchParams> }) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);
  const t = await getTranslations("listing");
  const c = await getTranslations("common");
  const keyword = (query.keyword ?? "").trim().toLocaleLowerCase(locale);
  const area = query.area === "osaka" || query.area === "kobe" ? query.area as PropertyArea : "all";
  const type = query.type === "apartment" || query.type === "house" ? query.type as PropertyType : "all";
  const minPrice = validNumber(query.minPrice);
  const maxPrice = validNumber(query.maxPrice);
  const minArea = validNumber(query.minArea);
  const sort = ["price-asc", "price-desc"].includes(query.sort ?? "") ? query.sort : "newest";
  const filtered = sampleProperties.filter((property) => {
    const searchable = [localize(property.title, locale), localize(property.description, locale), localize(property.neighborhood, locale), localize(property.nearestStation, locale), property.floorPlan].join(" ").toLocaleLowerCase(locale);
    return (!keyword || searchable.includes(keyword)) && (area === "all" || property.area === area) && (type === "all" || property.type === type) && (minPrice === undefined || property.price >= minPrice) && (maxPrice === undefined || property.price <= maxPrice) && (minArea === undefined || property.floorArea >= minArea);
  });
  filtered.sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : b.createdAt.localeCompare(a.createdAt));
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const page = Math.min(pageCount, Math.max(1, Math.floor(validNumber(query.page) ?? 1)));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const paginationHref = (pageNumber: number) => {
    const params = new URLSearchParams();
    for (const key of ["keyword", "area", "type", "minPrice", "maxPrice", "minArea", "sort"] as const) if (query[key]) params.set(key, query[key]!);
    params.set("page", String(pageNumber));
    return `/properties/search?${params.toString()}`;
  };
  const formatCount = (count: number) => t("resultCount", { count: new Intl.NumberFormat(locale).format(count) });

  return <>
    <PageHero eyebrow={t("sampleLabel")} title={t("title")} description={t("description")} image="/images/locations/fuji-sunset-pagoda.png" size="compact" />
    <section className="listing-page"><div className="container">
      <aside className="demo-notice"><span>!</span><p>{t("demoNotice")}</p></aside>
      <form className="listing-filters" action="" method="get">
        <h2>{t("searchLegend")}</h2>
        <div className="listing-filter-grid">
          <label className="filter-keyword"><span>{t("keyword")}</span><span className="filter-input"><Search size={16} /><input name="keyword" type="search" placeholder={t("keywordPlaceholder")} defaultValue={query.keyword} /></span></label>
          <label><span>{t("area")}</span><select name="area" defaultValue={area}><option value="all">{t("allAreas")}</option><option value="osaka">{t("osaka")}</option><option value="kobe">{t("kobe")}</option></select></label>
          <label><span>{t("propertyType")}</span><select name="type" defaultValue={type}><option value="all">{t("anyType")}</option><option value="apartment">{t("apartment")}</option><option value="house">{t("house")}</option></select></label>
          <label><span>{t("minPrice")}</span><input type="number" name="minPrice" min="0" step="1000" defaultValue={query.minPrice} /></label>
          <label><span>{t("maxPrice")}</span><input type="number" name="maxPrice" min="0" step="1000" defaultValue={query.maxPrice} /></label>
          <label><span>{t("minArea")}</span><input type="number" name="minArea" min="0" step="1" defaultValue={query.minArea} /></label>
          <label><span>{t("sort")}</span><select name="sort" defaultValue={sort}><option value="newest">{t("newest")}</option><option value="price-asc">{t("priceLow")}</option><option value="price-desc">{t("priceHigh")}</option></select></label>
        </div>
        <div className="filter-actions"><button type="submit" className="button button-gold">{t("applyFilters")}<ArrowRight size={17} /></button><Link href="/properties/search">{t("reset")}</Link></div>
      </form>
      <div className="listing-results-heading"><h2>{formatCount(filtered.length)}</h2><p>{t("sampleLabel")}</p></div>
      {pageItems.length === 0 ? <div className="listing-empty"><p>{t("noResults")}</p><Link className="button button-gold" href="/properties/search">{t("reset")}</Link></div> : <div className="listing-grid">
        {pageItems.map((property) => <SampleListingCard key={property.id} property={property} locale={locale} labels={{ listingType: t("listingType"), perMonth: t("perMonth"), details: t("details"), sampleLabel: t("sampleLabel"), minutes: t("minuteWalk", { count: property.stationWalkMinutes }) }} />)}
      </div>}
      {pageCount > 1 && <nav className="pagination" aria-label={t("resultCount", { count: filtered.length })}>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <Link key={number} href={paginationHref(number)} aria-current={number === page ? "page" : undefined} className={number === page ? "page-number current" : "page-number"}>{number}</Link>)}
      </nav>}
      <p className="listing-back"><MapPin size={15} />{t("neighborhood")} · <Link href="/properties">{c("properties")}</Link></p>
    </div></section>
  </>;
}

function SampleListingCard({ property, locale, labels }: { property: SampleProperty; locale: Locale; labels: { listingType: string; perMonth: string; details: string; sampleLabel: string; minutes: string } }) {
  return <article className="sample-listing-card">
    <Link href={`/properties/${property.slug}`} className="sample-listing-image"><Image src={property.images[0]} alt={localize(property.title, locale)} fill sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw" /><span>{labels.sampleLabel}</span></Link>
    <div className="sample-listing-content"><div className="listing-card-kicker"><span>{labels.listingType}</span><span>{property.floorPlan}</span></div><h3><Link href={`/properties/${property.slug}`}>{localize(property.title, locale)}</Link></h3><p className="listing-area">{localize(property.neighborhood, locale)}</p><div className="listing-price">{price(locale, property.price)}<small>{labels.perMonth}</small></div><div className="listing-stats"><span>{new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(property.floorArea)} m²</span><span>{property.floorPlan}</span><span>{labels.minutes}</span></div><Link href={`/properties/${property.slug}`} className="listing-details">{labels.details}<ArrowRight size={16} /></Link></div>
  </article>;
}

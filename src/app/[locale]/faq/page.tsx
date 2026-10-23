import { ChevronDown } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ContactBanner } from "@/components/shared/contact-banner";
import { PageHero } from "@/components/shared/page-hero";
import { pageMetadata } from "@/lib/metadata";

type FaqItem = { question: string; japanese: string; answer: string };
type FaqGroup = { title: string; subtitle: string; items: FaqItem[] };
const groupImages = ["/images/faq/faq-city-living-room.png", "/images/faq/fuji-lake-sunset.png", "/images/faq/city-living-room-sunset.png", "/images/faq/japan-rental-contract.png"];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return pageMetadata(locale, "/faq", t("title"), t("description"));
}

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const groups = t.raw("groups") as FaqGroup[];
  const categories = t.raw("categories") as string[];
  return <>
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={`${t("subtitle")} · ${t("description")}`} image="/images/backgrounds/japan-homes-sakura.jpg" />
    <section className="faq-page"><div className="container faq-groups">{groups.map((group, groupIndex) => <section className="faq-group" key={group.title}>
      <div className="faq-group-image"><div className="faq-count">{String(groupIndex + 1).padStart(2, "0")}</div><div><p className="eyebrow">{categories[groupIndex]}</p><h2>{group.title}</h2><p>{group.subtitle}</p></div><div className="faq-photo" style={{ backgroundImage: `url('${groupImages[groupIndex]}')` }} /></div>
      <div className="faq-list">{group.items.map((item) => <details className="faq-item" key={item.question}><summary><span className="faq-question">{item.question}{item.japanese && <small>{item.japanese}</small>}</span><span className="faq-chevron"><ChevronDown size={17} /></span></summary><div className="faq-answer"><p>{item.answer}</p></div></details>)}</div>
    </section>)}</div></section>
    <ContactBanner title={t("contactTitle")} text={t("contactText")} buttonLabel={t("contactTitle")} eyebrow={`${t("eyebrow")} · ${t("contactTitle")}`} />
  </>;
}

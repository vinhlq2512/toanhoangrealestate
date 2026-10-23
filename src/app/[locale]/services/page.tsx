import Image from "next/image";
import { ArrowRight, Check, Droplets, House, Plane, Sofa, UsersRound, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ContactBanner } from "@/components/shared/contact-banner";
import { PageHero } from "@/components/shared/page-hero";
import { pageMetadata } from "@/lib/metadata";

type Service = { title: string; description: string; points: string[]; image: string; cta: string };
const icons = [House, Zap, Sofa, Plane, UsersRound];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata(locale, "/services", t("title"), t("description"));
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const items = t.raw("items") as Service[];
  return <>
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} image="/images/backgrounds/japan-sakura-neighborhood.png" />
    <section className="services-section"><div className="container service-list">
      {items.map((item, i) => { const Icon = icons[i] ?? Droplets; return <article className="service-card" key={item.title}>
        <div className="service-card-top"><span className="service-number">{String(i + 1).padStart(2, "0")}</span><span className="service-icon"><Icon size={27} strokeWidth={1.6} /></span><h2>{item.title}</h2><span className="service-top-line" /></div>
        <div className="service-card-body"><div className="service-photo"><Image src={item.image} alt="" fill sizes="(max-width: 800px) 100vw, 35vw" /></div><div className="service-detail"><p>{item.description}</p><ul>{item.points.map((point) => <li key={point}><Check size={17} />{point}</li>)}</ul><Link className="button button-gold" href="/contact">{item.cta}<ArrowRight size={17} /></Link></div></div>
      </article>; })}
    </div></section>
    <ContactBanner title={t("ctaTitle")} text={t("ctaText")} buttonLabel={t("contactTitle")} eyebrow={`${t("eyebrow")} · ${t("contactTitle")}`} />
  </>;
}

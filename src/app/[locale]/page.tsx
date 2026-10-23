import Image from "next/image";
import { ArrowRight, Facebook, HeartHandshake, House, Instagram, Languages, MessageCircle, Music2, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Feature = { title: string; text: string };
type City = { name: string; native: string; image: string };

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const c = await getTranslations("common");
  const features = t.raw("features") as Feature[];
  const cities = t.raw("cities") as City[];
  const featurePhotos = ["/images/properties/osaka-apartment-interior.png", "/images/faq/japan-rental-contract.png", "/images/services/apartment-video-tour.png", "/images/services/multilingual-housing-consultation.png"];
  const badges = [t("support"), t("osaka"), t("free"), t("languages")];
  const icons = [ShieldCheck, House, HeartHandshake, Languages];
  const channels = [
    { name: "Facebook", description: t("socialFacebook"), Icon: Facebook },
    { name: "TikTok", description: t("socialTiktok"), Icon: Music2 },
    { name: "Instagram", description: t("socialInstagram"), Icon: Instagram },
    { name: "LINE", description: t("socialLine"), Icon: MessageCircle },
  ];
  return (
    <>
      <section className="home-hero">
        <div className="hero-media">
          <picture>
            <source media="(min-width: 721px)" srcSet="/images/backgrounds/home-hero-sakura-sunset-landscape.png" />
            <Image src="/images/backgrounds/home-hero-sakura-sunset.png" alt="Mount Fuji, a Japanese castle, and cherry blossoms at sunset" fill priority quality={90} sizes="100vw" className="cover-image" />
          </picture>
          <div className="hero-shade" />
        </div>
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1>{t.rich("title", { highlight: (chunks) => <span className="hero-highlight">{chunks}</span> })}</h1>
          </div>
          <div className="hero-details">
            <p className="hero-subtitle">{t("subtitle")}</p>
            <div className="hero-actions">
              <Link className="button button-blue" href="/contact#social-contact"><Facebook size={18} />{c("facebook")} <ArrowRight size={18} /></Link>
              <Link className="button button-green" href="/contact#social-contact"><MessageCircle size={18} />{c("line")} <ArrowRight size={18} /></Link>
            </div>
            <div className="hero-badges">
              {badges.map((badge, i) => { const Icon = icons[i]; return <span key={badge}><Icon size={17} />{badge}</span>; })}
            </div>
          </div>
        </div>
      </section>

      <section className="welcome-section" id="welcome">
        <div className="container welcome-grid">
          <div className="welcome-copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("introTitle")}</h2>
            <p>{t("introText")}</p>
            <Link className="button button-gold" href="/properties/search">{t("introCta")} <ArrowRight size={18} /></Link>
          </div>
          <div className="feature-grid">
            {features.map((feature, i) => {
              const Icon = [House, HeartHandshake, ArrowRight, Languages][i] ?? House;
              return <Link href={i === 1 ? "/services" : "/properties"} className="feature-card" key={feature.title}>
                <Image src={featurePhotos[i]} alt="" fill sizes="(max-width: 700px) 45vw, 25vw" className="feature-card-photo" />
                <span className="feature-card-shade" />
                <div className="feature-card-content"><Icon className="gold-icon" size={27} strokeWidth={1.6} /><h3>{feature.title}</h3><p>{feature.text}</p></div><span className="round-arrow"><ArrowRight size={16} /></span>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="areas-section" id="areas">
        <div className="container">
          <div className="section-heading heading-light"><div><p className="eyebrow">{t("eyebrow")}</p><h2>{t("areasTitle")}</h2><p>{t("areasText")}</p></div><Link className="text-link" href="/properties">{c("viewAll")} <ArrowRight size={16} /></Link></div>
          <div className="city-grid">{cities.map((city) => <Link href="/properties" className="city-card" key={city.name}>
            <Image src={city.image} alt={city.name} fill sizes="(max-width: 700px) 45vw, 16vw" />
            <span className="city-overlay"><strong>{city.name}</strong><small>{city.native}</small></span><span className="round-arrow"><ArrowRight size={16} /></span>
          </Link>)}</div>
        </div>
      </section>

      <section className="social-section">
        <div className="container social-layout">
          <div><p className="eyebrow">{t("eyebrow")}</p><h2>{t("socialTitle")}</h2><p>{t("socialText")}</p></div>
          <div className="channel-list">
            {channels.map(({ name, description, Icon }) => <Link href="/contact#social-contact" key={name} className={`channel-row channel-${name.toLowerCase()}`} aria-label={`${name}: ${description}`}>
              <span className="channel-icon"><Icon size={20} /></span>
              <span className="channel-copy"><strong>{name}</strong><small>{description}</small></span>
              <ArrowRight size={18} />
            </Link>)}
          </div>
        </div>
      </section>
    </>
  );
}

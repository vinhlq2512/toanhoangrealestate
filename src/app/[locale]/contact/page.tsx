import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/shared/page-hero";
import { pageMetadata } from "@/lib/metadata";
import {
  facebookPageUrl,
  linePhoneDisplay,
  lineProfileUrl,
  instagramUrl,
  tiktokUrl,
  googleMapsUrl,
  companyOfficeAddress,
  companyLegalName,
  companyPhone,
  companyEmail,
  googleMapsEmbedUrl,
} from "@/lib/contact-links";
import {
  FacebookIcon,
  TikTokIcon,
  InstagramIcon,
  LineIcon,
} from "@/components/shared/social-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata(locale, "/contact", t("title"), t("description"));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const c = await getTranslations("common");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        image="/images/locations/kobe-city-at-night.png"
        size="compact"
      />
      <section className="contact-page">
        <div className="container">
          <div className="contact-channel-grid contact-channel-grid-4">
            <article className="contact-channel">
              <span className="channel-icon line-icon">
                <LineIcon size={24} />
              </span>
              <div>
                <p className="eyebrow">{t("lineTitle")}</p>
                <h2>{t("lineTitle")}</h2>
                <p>{t("lineText")}</p>
                <p className="contact-number">
                  {t("linePhone")}: {linePhoneDisplay}
                </p>
                <a
                  href={lineProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {t("lineProfileLink")} <ArrowUpRight size={16} />
                </a>
              </div>
            </article>

            <article className="contact-channel">
              <span className="channel-icon facebook-icon">
                <FacebookIcon size={24} />
              </span>
              <div>
                <p className="eyebrow">{t("facebookTitle")}</p>
                <h2>{t("facebookTitle")}</h2>
                <p>{t("facebookText")}</p>
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {t("facebookTitle")} <ArrowUpRight size={16} />
                </a>
              </div>
            </article>

            <article className="contact-channel">
              <span className="channel-icon tiktok-icon">
                <TikTokIcon size={24} />
              </span>
              <div>
                <p className="eyebrow">TikTok</p>
                <h2>TikTok</h2>
                <p>{t("tiktok")}</p>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  @toanhoangrealestate <ArrowUpRight size={16} />
                </a>
              </div>
            </article>

            <article className="contact-channel">
              <span className="channel-icon instagram-icon">
                <InstagramIcon size={24} />
              </span>
              <div>
                <p className="eyebrow">Instagram</p>
                <h2>Instagram</h2>
                <p>{t("instagram")}</p>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  @toanhoang_realestate_osaka <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          </div>

          <p className="channel-note">{t("channelsNote")}</p>

          <div className="contact-info-grid">
            <div className="contact-info-copy">
              <p className="eyebrow">TOANHOANG REAL ESTATE</p>
              <h2>{t("infoTitle")}</h2>
              <dl>
                <div>
                  <dt>
                    <span>
                      <MapPin size={17} />
                    </span>
                    {t("address")}
                  </dt>
                  <dd>{companyOfficeAddress}</dd>
                </div>
                <div>
                  <dt>
                    <span>
                      <Phone size={17} />
                    </span>
                    {t("phone")}
                  </dt>
                  <dd>
                    <a href={`tel:${companyPhone.replace(/[^0-9+]/g, "")}`}>
                      {companyPhone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>
                    <span>
                      <Mail size={17} />
                    </span>
                    {t("email")}
                  </dt>
                  <dd>
                    <a href={`mailto:${companyEmail}`}>{companyEmail}</a>
                  </dd>
                </div>
                <div>
                  <dt>
                    <span>
                      <Clock3 size={17} />
                    </span>
                    {t("hours")}
                  </dt>
                  <dd>{t("hoursValue")}</dd>
                </div>
                <div>
                  <dt>
                    <span>
                      <MapPin size={17} />
                    </span>
                    {t("legalName")}
                  </dt>
                  <dd>{companyLegalName}</dd>
                </div>
              </dl>
              <a
                className="button button-gold"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("map")}
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="map-wrapper">
              <iframe
                title="Google Maps Location - 株式会社GENESIS"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px", borderRadius: "14px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="map-card-banner"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("map")}
              >
                <span className="map-pin">
                  <MapPin size={22} />
                </span>
                <span className="map-card-details">
                  <strong>{companyLegalName}</strong>
                  <span>{companyOfficeAddress}</span>
                </span>
                <span className="map-card-link">
                  {t("map")}
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>

          <div className="social-contact" id="social-contact">
            <h2>{t("socialTitle")}</h2>
            <div className="social-links-grid">
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <FacebookIcon size={18} />
                <span>{t("facebook")}</span>
                <ArrowUpRight size={15} />
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <TikTokIcon size={18} />
                <span>{t("tiktok")}</span>
                <ArrowUpRight size={15} />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <InstagramIcon size={18} />
                <span>{t("instagram")}</span>
                <ArrowUpRight size={15} />
              </a>
              <a
                href={lineProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <LineIcon size={18} />
                <span>
                  {t("line")} · {linePhoneDisplay}
                </span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <p className="contact-closing">{t("closing")}</p>
        </div>
      </section>
    </>
  );
}

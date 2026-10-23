import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollMotion } from "@/components/shared/scroll-motion";
import { pageKeywords } from "@/lib/seo-keywords";
import { socialImage } from "@/lib/metadata";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) return {};
  const t = await getTranslations({ locale: requested, namespace: "meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const locale = requested as Locale;
  const openGraphLocale: Record<Locale, string> = { vi: "vi_VN", en: "en_US", zh: "zh_CN", ja: "ja_JP" };
  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: { default: t("title"), template: `%s | TOANHOANG REAL ESTATE` },
    description: t("description"),
    ...(pageKeywords(locale, "/") ? { keywords: pageKeywords(locale, "/") } : {}),
    alternates: {
      canonical: `/${requested}`,
      languages: { vi: "/vi", en: "/en", zh: "/zh", ja: "/ja", "x-default": "/vi" },
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale[locale],
      alternateLocale: routing.locales.filter((code) => code !== locale).map((code) => openGraphLocale[code]),
      siteName: "TOANHOANG REAL ESTATE",
      title: t("title"),
      description: t("description"),
      url: `/${requested}`,
      images: [{ url: socialImage, width: 1672, height: 941, alt: "A home in Japan: Osaka city, Mount Fuji and cherry blossoms at sunset" }],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: [socialImage] },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return (
    <html lang={locale}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "TOANHOANG REAL ESTATE",
          legalName: "株式会社 GENESIS",
          ...(siteUrl ? { url: siteUrl, image: `${siteUrl}${socialImage}` } : {}),
          telephone: "+81665689026",
          email: "genesis.estate.jp@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2-5-29 Sakuragawa, Naniwa-ku",
            addressLocality: "Osaka",
            addressRegion: "Osaka",
            postalCode: "556-0022",
            addressCountry: "JP",
          },
          areaServed: ["Osaka", "Kobe", "Kyoto", "Nara"],
        }) }} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <ScrollMotion />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { pageKeywords } from "@/lib/seo-keywords";

export const socialImage = "/images/backgrounds/home-hero-sakura-sunset-landscape.png";

const openGraphLocales: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
};

const locales = routing.locales;

export function pageMetadata(locale: Locale, route: string, title: string, description: string): Metadata {
  const path = `/${locale}${route === "/" ? "" : route}`;
  const languages = Object.fromEntries(locales.map((code) => [code, `/${code}${route === "/" ? "" : route}`]));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const keywords = pageKeywords(locale, route);
  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path, languages: { ...languages, "x-default": `/vi${route === "/" ? "" : route}` } },
    openGraph: {
      type: "website",
      siteName: "TOANHOANG REAL ESTATE",
      locale: openGraphLocales[locale],
      title,
      description,
      url: path,
      images: [{ url: socialImage, width: 1672, height: 941, alt: "A home in Japan: Osaka city, Mount Fuji and cherry blossoms at sunset" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

const locales = routing.locales;

export function pageMetadata(locale: Locale, route: string, title: string, description: string): Metadata {
  const path = `/${locale}${route === "/" ? "" : route}`;
  const languages = Object.fromEntries(locales.map((code) => [code, `/${code}${route === "/" ? "" : route}`]));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return { ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}), title, description, alternates: { canonical: path, languages: { ...languages, "x-default": `/vi${route === "/" ? "" : route}` } }, openGraph: { type: "website", siteName: "TOANHOANG REAL ESTATE", locale, title, description, url: path } };
}

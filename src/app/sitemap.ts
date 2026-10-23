import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const routes = ["", "/services", "/properties", "/faq", "/contact"];
const locales = routing.locales;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];
  const now = new Date();
  return locales.flatMap((locale) => routes.map((route) => ({
    url: `${siteUrl}/${locale}${route}`,
    lastModified: now,
    alternates: { languages: Object.fromEntries(locales.map((language) => [language, `${siteUrl}/${language}${route}`])) },
  })));
}

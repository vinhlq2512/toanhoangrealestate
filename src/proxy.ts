import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, type Locale } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

function isLocale(value: string | undefined): value is Locale {
  return routing.locales.some((locale) => locale === value);
}

function localeFromCountry(request: NextRequest): Locale {
  const country = (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code")
  )?.trim().toUpperCase();

  if (!country) return routing.defaultLocale;
  if (country === "VN") return "vi";
  if (country === "CN") return "zh";
  if (country === "JP") return "ja";
  return "en";
}

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const manualLocale = request.cookies.get("SITE_LOCALE")?.value;
    const locale = isLocale(manualLocale)
      ? manualLocale
      : localeFromCountry(request);
    const destination = request.nextUrl.clone();
    destination.pathname = `/${locale}`;

    const response = NextResponse.redirect(destination);
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};

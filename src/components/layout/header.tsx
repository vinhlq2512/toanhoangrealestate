"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const locales: { id: Locale; label: string }[] = [{ id: "vi", label: "VI" }, { id: "en", label: "EN" }, { id: "zh", label: "中文" }, { id: "ja", label: "日本語" }];

export function Header() {
  const t = useTranslations("common");
  const navText = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const nav = [["home", "/"], ["apartments", "/properties"], ["areas", "/#areas"], ["faq", "/faq"], ["contact", "/contact"]] as const;
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand-lockup" aria-label={t("brand")} onClick={() => setOpen(false)}><span className="brand-mark"><span /></span><span>{t("brand")}<small>{navText("tagline")}</small></span></Link>
      <nav className={open ? "primary-nav is-open" : "primary-nav"} aria-label={t("brand")}>
        {nav.map(([key, href]) => {
          const active = href === "/" ? pathname === "/" : href !== "/#areas" && (pathname === href || pathname.startsWith(href));
          return <Link href={href} key={key} onClick={() => setOpen(false)} className={active ? "nav-link active" : "nav-link"}>{t(key)}</Link>;
        })}
      </nav>
      <div className="header-actions">
        <label className="language-select"><span className="sr-only">{t("language")}</span><select value={locale} onChange={(e) => {
          const nextLocale = e.target.value as Locale;
          const secure = window.location.protocol === "https:" ? "; Secure" : "";
          document.cookie = `SITE_LOCALE=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
          router.replace(`${pathname}${window.location.search}`, { locale: nextLocale });
        }} aria-label={t("language")}>
          {locales.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
        </select><ChevronDown size={14} /></label>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? t("close") : t("menu")} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>;
}

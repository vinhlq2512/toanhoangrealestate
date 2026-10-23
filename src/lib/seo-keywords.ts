import type { Locale } from "@/i18n/routing";

type KeywordPages = Record<string, string[]>;

const keywords: Partial<Record<Locale, KeywordPages>> = {
  en: {
    "/": [
      "apartment rentals Osaka",
      "help renting in Osaka as a foreign resident",
      "English rental support Osaka",
      "Kansai housing search for international residents",
    ],
    "/properties": [
      "rental housing Osaka international residents",
      "help finding an apartment in Osaka",
      "Kobe Kyoto Nara rental search",
      "English-speaking housing support Kansai",
    ],
    "/services": [
      "rental application support Osaka",
      "housing support for foreign residents Japan",
      "multilingual moving support Osaka",
    ],
    "/faq": [
      "renting in Japan as a foreign resident",
      "Japan rental costs and key money",
      "rental application documents Japan",
    ],
    "/contact": [
      "contact rental advisor Osaka",
      "English housing consultation Kansai",
      "help finding rentals Osaka foreign residents",
    ],
  },
  ja: {
    "/": [
      "大阪 賃貸 外国人",
      "外国人 部屋探し 大阪",
      "大阪 賃貸 英語相談",
      "関西 外国人 住まい探し",
    ],
    "/properties": [
      "大阪 賃貸 外国人 部屋探し",
      "神戸 賃貸 住まい探し",
      "京都 賃貸 住まい探し",
      "奈良 賃貸 住まい探し",
      "関西 賃貸 多言語サポート",
    ],
    "/services": [
      "大阪 賃貸 契約サポート",
      "外国人 日本 住まい探し",
      "大阪 引っ越し 多言語サポート",
    ],
    "/faq": [
      "日本 賃貸 外国人 よくある質問",
      "賃貸 初期費用 礼金 敷金",
      "賃貸 申込み 必要書類 外国人",
    ],
    "/contact": [
      "大阪 賃貸 相談 外国人",
      "大阪 英語 賃貸相談",
      "関西 外国人 部屋探し 問い合わせ",
    ],
  },
};

export function pageKeywords(locale: Locale, route: string): string[] | undefined {
  const localeKeywords = keywords[locale];
  if (!localeKeywords) return undefined;
  if (route.startsWith("/properties/")) return localeKeywords["/properties"];
  return localeKeywords[route];
}

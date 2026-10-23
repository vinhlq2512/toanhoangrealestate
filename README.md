# TOANHOANG REAL ESTATE

Multilingual website for the real-estate and everyday-life support service in Japan. The page structure follows the supplied homepage, services, property systems and FAQ mockups and the accompanying content document.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route chooses Vietnamese for Vietnam, Simplified Chinese for China, Japanese for Japan, and English for other countries based on the country code supplied by the hosting proxy. If no country code is available (as in local development), it falls back to Vietnamese. The language selector saves a visitor's manual choice. English, Simplified Chinese, and Japanese are available at `/en`, `/zh`, and `/ja`.

The proxy reads `x-vercel-ip-country`, `cf-ipcountry`, or `x-country-code`. Configure the hosting proxy to provide one of these headers for country-based language selection.

## Available commands

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the canonical deployed origin to resolve absolute canonical, Open Graph and social-card URLs, populate the sitemap, and add its reference to `robots.txt`. No property database, TikTok or Instagram profile URLs, authentication or contact-form backend were provided. The Facebook page and LINE phone-based contact are linked in the site. The property systems page follows the supplied categories; the separate search and detail pages use clearly labeled sample listings (not real inventory). The contact page uses the supplied phone, email and office address.

See [docs/asset-manifest.md](docs/asset-manifest.md) for the original-to-web asset mapping.

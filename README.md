# TOANHOANG REAL ESTATE

Multilingual website for the real-estate and everyday-life support service in Japan. The page structure follows the supplied homepage, services, property systems and FAQ mockups and the accompanying content document.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to Vietnamese; English and Simplified Chinese are available at `/en` and `/zh`.

## Available commands

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the canonical deployed origin to populate the sitemap and the sitemap reference in `robots.txt`. No property database, social-profile URLs, LINE account URL, authentication or contact-form backend were provided. The property systems page follows the supplied categories; the separate search and detail pages use clearly labeled sample listings (not real inventory). The contact page uses the supplied phone, email and office address.

See [docs/asset-manifest.md](docs/asset-manifest.md) for the original-to-web asset mapping.

# Salon Alain — Hair & Beauty by Alain Martinos

Premium salon website built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3.4**.
Fully static, no runtime dependencies beyond React, self-hosted fonts, lazy-loaded media.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain
(used for canonical URLs, sitemap, Open Graph and schema).

Deploys with zero configuration on Vercel; also works on Netlify, Cloudflare Pages or any Node host.

## Where to edit things

| What | File |
|---|---|
| Phone, WhatsApp, email, addresses, opening hours, social links, YouTube Shorts IDs | `src/lib/site.ts` |
| Every piece of text on the site (headings, biography, services, form labels…) | `src/content/en.ts` |
| Photos (paths, alt text, portfolio categories) | `src/lib/images.ts` + `public/images/` |
| Brand colours, fonts, type scale | `tailwind.config.ts` |
| Global CSS, reveal animations, silk texture | `src/app/globals.css` |
| SEO defaults + HairSalon schema | `src/app/layout.tsx` (per-page metadata lives in each `page.tsx`) |

### Replacing the placeholder photography

All images in `public/images/` are soft lavender placeholders. Replace them with real photos
**keeping the same file names**, or edit `src/lib/images.ts` to point at new files.
Keep `width`/`height` accurate so the layout never shifts while loading.
Next.js converts them to AVIF/WebP and generates responsive sizes automatically.

- `salon-01…06` — salon interiors (Hair Salon page + home preview)
- `work-01…12` — portfolio (each has `category` tags used by the filter)
- `alain-01…05` — portraits for the biography page
- `hero-*.jpg`, `contact.jpg`, `og.jpg` (1200×630 social sharing image)

### YouTube Shorts

Edit `site.shorts` in `src/lib/site.ts` with the real video IDs (the part after `youtube.com/shorts/`).
The section shows a thumbnail first and only loads the YouTube player when a visitor presses play.

### Contact form

By default the form composes a pre-filled **WhatsApp message** (nothing is lost, no backend needed).
To post to a service instead, set `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree, Basin, a CRM webhook,
or your own `/api/contact` route) — the form sends JSON with the fields
`name, phone, email, location, service, date, message`.

### Maps

Paste a Google Maps *embed* URL into `mapEmbed` for each location in `src/lib/site.ts`.
Until then an elegant placeholder is shown.

## Project structure

```
src/
  app/                  routes (each folder = one page, with its own metadata)
    page.tsx            Home
    about/  services/  hair-salon/  our-work/  alain-martinos/  contact/
    layout.tsx          fonts, navbar, footer, schema.org HairSalon
    sitemap.ts robots.ts not-found.tsx
  components/           Navbar · Footer · Button · SectionTitle · ServiceItem · Gallery (masonry +
                        filter + lightbox) · VideoShort · VideoShortsRow · LocationCard ·
                        SocialIcons · ContactForm · PageHero · CtaBand · Divider · Reveal · Logo
  content/en.ts         all copy (translation-ready)
  lib/                  site.ts (contact data) · images.ts (photo registry) · i18n.ts
  fonts/                self-hosted Cormorant Garamond + Manrope (OFL)
public/brand/           logo.jpg · am-pattern.jpg (silk texture used as backgrounds)
```

## Adding German / Arabic later

1. Copy `src/content/en.ts` → `de.ts` / `ar.ts` and translate.
2. Register them in `dictionaries` inside `src/lib/i18n.ts`.
3. Move `src/app/*` routes under `src/app/[locale]/` and add a middleware that redirects `/`
   to the visitor's language. `getDir("ar")` already returns `rtl` for the `<html dir>` attribute.

No component contains hard-coded text, so nothing else needs to change.

## Performance & accessibility notes

- Static export of every page; ~100 kB shared JS; no animation library (CSS transitions +
  a 40-line IntersectionObserver reveal). `prefers-reduced-motion` disables all motion.
- Fonts are self-hosted and preloaded through `next/font/local` (no Google request, no layout shift).
- Images: `next/image` with explicit sizes, lazy loading below the fold, AVIF/WebP.
- YouTube embeds are facades — no third-party JS until play.
- Semantic landmarks, skip link, focus-visible styles, keyboard-navigable lightbox and drawer,
  44 px+ tap targets, `aria-current` on active navigation.
- Schema.org `HairSalon` (site-wide), `Person` (Alain page), `ItemList` of services.

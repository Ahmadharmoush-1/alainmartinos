import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getContent, defaultLocale, getDir } from "@/lib/i18n";
import { SITE_URL, site } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SiteMusic } from "@/components/SiteMusic";

// Self-hosted fonts (no third-party request, preloaded, zero layout shift).
// Files live in src/fonts — OFL licensed (see LICENSE files there).
const serif = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "../fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
  ],
});

const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../fonts/manrope-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

const t = getContent(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Salon Alain – Hair & Beauty by Alain Martinos | Hairdresser Lebanon & Germany",
    template: t.meta.titleTemplate,
  },
  description: t.meta.defaultDescription,
  keywords: [
    "Alain Martinos", "Salon Alain", "Alain Martinos Hairdresser", "Hairdresser Lebanon",
    "Hair Salon Jounieh", "Hairdresser Zouk Mikael", "Lebanese Hairdresser Germany",
    "Hairdresser Germany", "Balayage Lebanon", "Hair Color Lebanon", "Salon Alain Lebanon", "Salon Alain Germany",
  ],
  applicationName: site.name,
  authors: [{ name: site.owner }],
  creator: site.owner,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_US",
    url: SITE_URL,
    title: "Salon Alain – Hair & Beauty by Alain Martinos",
    description: t.meta.defaultDescription,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Salon Alain – Hair & Beauty by Alain Martinos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Alain – Hair & Beauty by Alain Martinos",
    description: t.meta.defaultDescription,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/brand/logo.jpg", apple: "/brand/logo.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#1A0B2E",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${SITE_URL}/#salon`,
  name: site.fullName,
  alternateName: "Salon Alain",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.jpg`,
  image: `${SITE_URL}/images/og.jpg`,
  telephone: site.phone,
  email: site.email,
  priceRange: "$$$",
  founder: { "@type": "Person", name: site.owner, jobTitle: "Hairdresser & Visagist", url: `${SITE_URL}/alain-martinos` },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zouk Mikael – Jounieh",
    addressCountry: "LB",
  },
  areaServed: [
    { "@type": "Country", name: "Lebanon" },
    { "@type": "Country", name: "Germany" },
  ],
  sameAs: Object.values(site.social),
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale} dir={getDir(defaultLocale)} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#9B62B3] focus:px-5 focus:py-2.5 focus:text-[#1A0B2E]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteMusic />
         <WhatsAppButton />
      </body>
    </html>
  );
}

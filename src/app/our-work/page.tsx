import type { Metadata } from "next";
import Link from "next/link";
import { Gallery, type Category, type WorkNote } from "@/components/Gallery";
import { CtaBand } from "@/components/CtaBand";
import { getContent } from "@/lib/i18n";
import { workImages } from "@/lib/images";
import { site } from "@/lib/site";

const w = getContent().work;

export const metadata: Metadata = {
  title: `${w.title} – Balayage, Color & Transformations`,
  description: w.description,
  alternates: { canonical: "/our-work" },
  openGraph: {
    title: `${w.title} | Salon Alain`,
    description: w.description,
    url: "/our-work",
  },
};

/* =========================================================
   FILTER PILLS
========================================================= */

// const categories: readonly Category[] = [
//   { id: "all", label: "All Works" },
//   { id: "balayage", label: "Balayage" },
//   { id: "blonde", label: "Blonde" },
//   { id: "highlights", label: "Highlights" },
//   { id: "haircuts", label: "Haircuts" },
//   { id: "styling", label: "Styling" },
//   { id: "brunette", label: "Brunette" },
//   { id: "color", label: "Color" },
//   { id: "transformations", label: "Transformations" },
// ];

/* =========================================================
   ATELIER NOTES — keyed by the title in lib/images.ts
========================================================= */

const notes: Record<string, WorkNote> = {
  "Caramel balayage": {
    short: "Melted warm toffee gradients tailored for sunlit depth.",
    long: "Custom freehand sweeping technique infused with cold gloss treatment for maximum mirror sheen and dimension.",
  },
  "Luminous blonde": {
    short: "High-clarity platinum and pearl balance without brassiness.",
    long: "Multi-zone tone correction using bond-protecting elixir. Preserves silkiness while achieving high Nordic illumination.",
  },
  "Face-framing highlights": {
    short: "Artisanal contour ribbons illuminating facial features.",
    long: "Babylights micro-placement around cheekbones and jawline, engineered to mimic natural Aegean summer sunlight.",
  },
  "Precision bob": {
    short: "Architectural lines sculpted with classic Paris shears.",
    long: "Dry-cutting technique following natural cranial geometry to ensure effortless everyday movement and weightlessness.",
  },
  "Evening styling": {
    short: "Regal sculpted texture created for galas and nocturnal events.",
    long: "Effortless French undone texture fortified with structural thermal foundation for long-lasting red carpet wear.",
  },
  "Chocolate brunette": {
    short: "Deep cocoa depth infused with multidimensional velvet luster.",
    long: "Formulated with rich Italian pigments to deliver deep cool espresso undertones without flat opacity.",
  },
  "Dimensional color": {
    short: "Layered chromatic formulation yielding subtle tonal shifts.",
    long: "Layered lowlights and translucent glazes crafted to adapt smoothly under shifting outdoor and indoor light sources.",
  },
  "Honey balayage": {
    short: "Warm golden nectar highlights painted in soft organic waves.",
    long: "Gentle feathering with clay lightener, keeping the root naturally blended for an effortless six-month grow-out.",
  },
  "Long layers": {
    short: "Fluid kinetic tiers created to enhance natural bounce and body.",
    long: "Slid-cut internal graduation that eliminates bulk while retaining dense, luxurious density through ends.",
  },
  "Ash blonde highlights": {
    short: "Cool neutral micro-weaves neutralizing all brass undertones.",
    long: "High precision foil placement combined with an iced-lilac gloss to lock in crystal cool brightness.",
  },
  "Bridal styling": {
    short: "Timeless bridal architecture balancing romantic grace and hold.",
    long: "Sculpted to harmonize perfectly with gown necklines and veil placements, maintaining effortless elegance until dawn.",
  },
  "Complete transformation": {
    short: "Holistic color correction, deep rejuvenation, and new silhouette.",
    long: "A comprehensive six-hour master session featuring tone restoration, micro-layering, and deep molecular keratin recovery.",
  },
};

/* =========================================================
   ATELIER STATS
========================================================= */

const atelierStats = [
  { value: "100%", label: "Bespoke Tone" },
  { value: "20+", label: "Years Atelier" },
  { value: "Zouk Mikael", label: "Lebanon Studio" },
];

/* =========================================================
   ICONS
========================================================= */

function ArrowDown() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-[18px] w-[18px] shrink-0"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-6-6 6 6 6-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-[18px] w-[18px] shrink-0"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path strokeLinecap="round" d="M8 3.5V6.5M16 3.5V6.5M3.5 10h17" />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function OurWorkPage() {
  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-20";

  return (
    <div className="page-purple-background theme-purple flex w-full min-w-0 flex-col break-words">
      {/* =====================================================
          SECTION 1 — HERO
      ===================================================== */}

      <section
        aria-labelledby="portfolio-heading"
        className="relative flex w-full flex-col items-center justify-center overflow-hidden py-[4.5rem] pt-32 text-center sm:pt-36"
      >
        {/* Ambient violet glow orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[600px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-primary-container/20 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 top-0 -z-10 h-[220px] w-[320px] rounded-full bg-m3-secondary-container/30 blur-[90px]"
        />

        <div className={`${container} mx-auto flex max-w-4xl flex-col items-center`}>
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-m3-low px-5 py-1 shadow-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-m3-primary" />
            <span className="font-sans text-m3-eyebrow font-medium uppercase text-m3-tertiary">
              Salon Alain Martinos · Portfolio
            </span>
          </div>

          <h1
            id="portfolio-heading"
            className="mb-5 max-w-3xl font-serif text-m3-display-mobile !font-normal tracking-tight !text-m3-on-surface sm:text-m3-headline-lg lg:text-m3-display"
          >
            {w.heading}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl font-sans text-m3-body-lg font-light leading-relaxed text-m3-on-surface-variant">
            {w.subtitle} Crafted under the discerning eye of Parisian couture technique in our
            Lebanese atelier.
          </p>

          {/* Pill buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="#collection"
              className="flex items-center gap-1.5 rounded-full bg-m3-primary px-10 py-3 font-sans text-m3-label font-medium uppercase text-m3-on-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-m3-secondary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span>Explore Our Work</span>
              <ArrowDown />
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-1.5 rounded-full bg-m3-high px-10 py-3 font-sans text-m3-label font-medium uppercase text-m3-secondary shadow-sm transition-all duration-300 hover:bg-m3-variant hover:text-m3-on-surface"
            >
              <CalendarIcon />
              <span>Book an appointment</span>
            </Link>
          </div>

          {/* Atelier stats bar */}
          <div className="mt-[4.5rem] grid w-full max-w-xl grid-cols-3 gap-10 pt-10">
            {atelierStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-serif text-m3-headline-sm !font-normal text-m3-secondary">
                  {stat.value}
                </span>
                <span className="mt-1 font-sans text-m3-eyebrow font-medium uppercase text-m3-tertiary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 2 — THE COLLECTION
      ===================================================== */}

      <section
        id="collection"
        aria-labelledby="gallery-heading"
        className="relative w-full scroll-mt-24 bg-m3-low py-[4.5rem]"
      >
        <div className={container}>
          {/* Section header */}
          <div className="mb-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="flex flex-col">
              <span className="mb-1.5 font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
                The Collection
              </span>

              <h2
                id="gallery-heading"
                className="font-serif text-m3-headline-md !font-normal tracking-tight !text-m3-on-surface lg:text-m3-headline-lg"
              >
                Colour. Shape. Individuality.
              </h2>
            </div>

            <p className="max-w-md font-sans text-m3-body-md font-light text-m3-tertiary">
              Explore balayage, colour and transformations. Find inspiration for your next visit
              to Salon Alain.
            </p>
          </div>

          {/* Filters + 12-card grid + lightbox */}
          <Gallery images={workImages}  notes={notes} />
        </div>
      </section>

      {/* =====================================================
          SECTION 3 — CLOSING CTA
      ===================================================== */}

      <CtaBand />

      <p className="sr-only">
        Salon Alain Martinos portfolio — {site.locations[0].addressLines.join(", ")}
      </p>
    </div>
  );
}

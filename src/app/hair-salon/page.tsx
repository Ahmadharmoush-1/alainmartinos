import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Logo } from "@/components/Logo";
import { getContent } from "@/lib/i18n";
import { salonImages } from "@/lib/images";
import { site, whatsappHref } from "@/lib/site";

const s = getContent().salon;

// Paste the direct Google review URL here when available.
// When empty, the button uses each location's Google Maps link.
const GOOGLE_REVIEW_URL = "";

export const metadata: Metadata = {
  title: `${s.title} – Zouk Mikael, Jounieh & Germany`,
  description: s.description,
  alternates: {
    canonical: "/hair-salon",
  },
  openGraph: {
    title: `${s.title} | Salon Alain Hair & Beauty`,
    description: s.description,
    url: "/hair-salon",
  },
};

/* =========================================================
   SHARED CLASSES
========================================================= */

const styles = {
  container: "mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-20",

  section: "py-20 sm:py-24",

  /** Filled lilac pill — the Stitch primary action. */
  button:
    "group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-m3-primary px-8 py-3.5 font-sans text-m3-label font-medium uppercase text-m3-on-primary shadow-[0_16px_48px_-8px_rgba(26,11,46,0.7),0_0_24px_0_rgba(155,98,179,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-m3-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-m3-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0",

  /** Quiet pill — the Stitch secondary action. */
  buttonGhost:
    "group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-transparent px-8 py-3.5 font-sans text-m3-label font-medium uppercase text-m3-secondary transition-all duration-300 hover:bg-m3-container hover:text-m3-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-m3-primary motion-reduce:transition-none",

  /** Small pill used inside cards. */
  buttonSmall:
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-m3-primary px-5 py-2.5 font-sans text-m3-label font-medium uppercase text-m3-on-primary transition-colors hover:bg-m3-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-m3-primary motion-reduce:transition-none",

  /** Tracked lilac eyebrow. */
  eyebrow:
    "font-sans text-m3-eyebrow font-medium uppercase tracking-[0.25em] text-m3-secondary",

  /** Text link with a sliding arrow. */
  textLink:
    "group inline-flex items-center gap-3 font-sans text-m3-label font-medium uppercase text-m3-secondary transition-colors hover:text-m3-primary",
};

/* =========================================================
   GALLERY GEOMETRY
   The salon photographs were shot on a phone held sideways,
   so each tile carries its own rotation.
========================================================= */

type Rotation = 0 | 90 | -90 | 180;

const salonImageRotation: readonly Rotation[] = [90, 90, -90, 0, -90, -90];

const galleryLayout = [
  "aspect-[4/3] sm:col-span-2 lg:col-span-8 lg:aspect-[16/11]",
  "aspect-[4/3] lg:col-span-4 lg:aspect-auto",
  "aspect-[4/3] lg:col-span-4 lg:aspect-[4/5]",
  "aspect-[4/3] lg:col-span-4 lg:aspect-[4/5]",
  "aspect-[4/3] sm:col-span-2 lg:col-span-4 lg:aspect-[4/5]",
  "aspect-[16/10] sm:col-span-2 lg:col-span-12 sm:aspect-[21/9]",
];

/** The image used in the philosophy card — index 3 needs no rotation. */
const philosophyImage = salonImages[3] ?? salonImages[0];

/* =========================================================
   HERO STAT TICKER
========================================================= */

const heroStats = [
  { value: "25+", label: "Years Atelier" },
  { value: "Zouk Mikael", label: "Jounieh · Lebanon" },
  { value: "Haute Coiffure", label: "Artisan Standard" },
];

const philosophyStats = [
  { value: "25+", label: "Years of heritage", note: "Mastery refined across two decades of haute coiffure." },
  { value: "1:1", label: "Private styling", note: "Undivided attention in unhurried, private sittings." },
];

const motionStyles = `
  @keyframes salon-page-enter {
    from {
      opacity: 0;
      transform: translateY(16px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .salon-page .salon-hero-enter {
    animation: salon-page-enter 700ms ease-out both;
  }

  @media (prefers-reduced-motion: reduce) {
    .salon-page .salon-hero-enter,
    .salon-page .salon-reveal {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

/* =========================================================
   ICONS
========================================================= */

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`
        h-4 w-4 shrink-0
        ${
          down
            ? "rotate-90"
            : "motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        }
      `}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function MapPin() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4 shrink-0 text-m3-primary"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7.5V12l3 1.8" />
    </svg>
  );
}


function LocationIcon({ name }: { name: "phone" | "chat" | "mail" | "instagram" | "pin" | "clock" }) {
  const paths = {
    phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z",
    chat: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z",
    mail: "M3 5h18v14H3z M3 5l9 7 9-7",
    instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M17.5 6.5h.01",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z M12 6v6l4 2",
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d={paths[name]} /></svg>;
}

function Stars() {
  return (
    <span className="inline-flex gap-1 text-[#ffd166]" role="img" aria-label="Five stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="m12 2.6 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 17.5 6.2 20.6l1.1-6.5L2.6 9.5l6.5-1L12 2.6Z" />
        </svg>
      ))}
    </span>
  );
}

function IllustratedLocationMap({ id, title }: { id: string; title: string }) {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-90" preserveAspectRatio="xMidYMid meet" viewBox="0 0 700 500" fill="none">
      <defs><linearGradient id={`${id}-sea`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#150629" /><stop offset="1" stopColor="#231437" /></linearGradient><linearGradient id={`${id}-land`} x1=".2" y1="0" x2="1" y2="1"><stop stopColor="#27183b" /><stop offset="1" stopColor="#322346" /></linearGradient></defs>
      <rect width="700" height="500" fill={`url(#${id}-sea)`} /><path d="M280 0c10 90-10 140-30 190-20 50-40 80-15 130 25 50 55 100 35 180h430V0Z" fill={`url(#${id}-land)`} /><path d="M280 0c10 90-10 140-30 190-20 50-40 80-15 130 25 50 55 100 35 180" stroke="#633382" strokeWidth="3" /><path d="M370 30q50 90 30 210t30 240M480 0q50 150 30 290t50 210" stroke="#3d2e52" strokeDasharray="4 6" strokeWidth="1.5" /><path d="M260 220c30 10 70 0 110 15M252 240c38 20 88 35 138 50M280 160c40 10 80 0 130 15M270 330c40 15 90 20 150 10" stroke="#4d444f" strokeWidth="1.5" />
      <text x="80" y="210" fill="#4d444f" fontFamily="Georgia" fontSize="11" fontStyle="italic" letterSpacing="2">MEDITERRANEAN SEA</text><text x="340" y="90" fill="#998d9a" fontFamily="Arial" fontSize="9" letterSpacing="2">JOUNIEH BAY</text><circle cx="290" cy="230" r="38" fill="#eab2ff" fillOpacity=".08" /><circle cx="290" cy="230" r="22" fill="#b57acd" fillOpacity=".25" /><circle cx="290" cy="230" r="10" fill="#eab2ff" /><circle cx="290" cy="230" r="5" fill="#4c1564" /><text x="316" y="226" fill="#f7d8ff" fontFamily="Arial" fontSize="12" fontWeight="600" letterSpacing="1">SALON ALAIN HAIR & BEAUTY</text><text x="316" y="242" fill="#d3c0dd" fontFamily="Arial" fontSize="10">{title}</text>
    </svg>
  );
}

/* =========================================================
   GALLERY TILE
========================================================= */

function GalleryTile({
  src,
  alt,
  index,
  total,
  rotation,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  rotation: Rotation;
}) {
  const isSideways = rotation === 90 || rotation === -90;

  const wrapperStyle: CSSProperties = isSideways
    ? {
        width: "100cqh",
        height: "100cqw",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }
    : {
        inset: 0,
        transform: rotation === 180 ? "rotate(180deg)" : undefined,
      };

  const sizes =
    index === 5
      ? "(max-width: 1280px) 90vw, 1184px"
      : index === 0
        ? "(max-width: 1024px) 90vw, (max-width: 1280px) 60vw, 780px"
        : "(max-width: 768px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 380px";

  return (
    <figure
      className="group absolute inset-0 m-0 overflow-hidden rounded-lg bg-m3-container shadow-xl"
      style={{ containerType: "size" }}
    >
      <div className="absolute" style={wrapperStyle}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04]"
        />
      </div>

    
    </figure>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function HairSalonPage() {
  return (
    <div className="page-purple-background theme-purple salon-page min-w-0 break-words text-m3-on-surface">
      <style>{motionStyles}</style>

      {/* =====================================================
          SECTION 1 — HERO
      ===================================================== */}

      <section
        aria-labelledby="salon-heading"
        className="relative isolate flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-m3-surface px-6 pb-20 pt-32 text-center sm:pt-36"
      >
        {/* The salon's own photograph, sunk under the violet scrim */}
        <Image
          src="/images/footer-bg-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#4A2A72] mix-blend-multiply" />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-m3-surface/80" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-gradient-to-b from-m3-surface via-m3-surface/45 to-m3-surface"
        />

        {/* Atmospheric ambient violet glow circles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[600px] w-[600px] rounded-full bg-m3-secondary-container/30 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-primary/10 blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 -z-10 h-[550px] w-[550px] rounded-full bg-m3-variant/40 blur-[120px]"
        />

        <div className={`${styles.container} salon-hero-enter relative z-10`}>
          {/* Editorial brand emblem badge */}
          <div className="mb-6 flex flex-col items-center">
           

           
          </div>

          <h1
            id="salon-heading"
            className="mx-auto mb-6 max-w-4xl font-serif text-m3-display-mobile !font-normal tracking-tight !text-m3-on-surface sm:text-m3-headline-lg lg:text-m3-display"
          >
            {s.heading}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl font-sans text-m3-body-lg font-semibold leading-relaxed text-m3-tertiary">
            {s.subtitle}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className={styles.button}>
              Book an appointment
              <Arrow />
            </Link>

            <a href="#salon-gallery" className={styles.buttonGhost}>
              Explore the salon
              <Arrow down />
            </a>
          </div>

          {/* Architectural micro stat ticker */}
          <div className="mx-auto mt-16 flex w-full max-w-3xl items-center justify-around pt-8 text-center">
            {heroStats.map((stat, index) => (
              <div key={stat.label} className="flex items-center">
                {index > 0 && (
                  <span aria-hidden="true" className="mr-4 h-8 w-px bg-m3-outline-variant sm:mr-8" />
                )}

                <div>
                  <p className="font-serif text-m3-headline-sm !font-normal !text-m3-primary sm:text-m3-headline-md">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-sans text-m3-eyebrow font-medium uppercase text-m3-tertiary">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 2 — FOUNDER PULL QUOTE
      ===================================================== */}

      <section aria-label="Founder's philosophy" className="w-full bg-m3-surface py-20 sm:py-24">
        <div className={styles.container}>
          <Reveal className="salon-reveal mx-auto max-w-4xl text-center">
            <blockquote className="font-serif text-m3-headline-sm italic leading-snug text-m3-on-surface sm:text-m3-headline-md">
              “{s.pullQuote}”
            </blockquote>

          
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SECTION 3 — PHILOSOPHY & DESIGN
      ===================================================== */}

      {/* <section
        aria-labelledby="philosophy-heading"
        className={`w-full bg-m3-surface ${styles.section}`}
      >
        <div className={`${styles.container} grid grid-cols-1 items-center gap-10 lg:grid-cols-12`}>
        
          <Reveal className="salon-reveal flex flex-col items-start lg:col-span-7 lg:pr-8">
            <span className={`${styles.eyebrow} mb-4`}>Philosophy &amp; Design</span>

            <h2
              id="philosophy-heading"
              className="mb-6 font-serif text-m3-headline-md !font-normal leading-tight !text-m3-on-surface lg:text-m3-headline-lg"
            >
              An Atelier Designed for the Human Presence.
            </h2>

            {s.intro.map((paragraph, index) => (
              <p
                key={index}
                className={`font-sans font-semibold leading-relaxed text-m3-tertiary ${
                  index === 0 ? "mb-4 text-m3-body-lg" : "mb-8 text-m3-body-md"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <Link href="/alain-martinos" className={styles.textLink}>
              <span>Discover Alain Martinos</span>
              <Arrow />
            </Link>

        
            <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {philosophyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-m3-container p-6 shadow-md transition-all duration-300 hover:bg-m3-high"
                >
                  <p className="font-serif text-m3-headline-md !font-normal leading-none !text-m3-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-sans text-m3-eyebrow font-medium uppercase text-m3-on-surface">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-sans text-m3-body-sm font-semibold text-m3-tertiary">{stat.note}</p>
                </div>
              ))}
            </div>
          </Reveal>

      
          <Reveal delay={120} className="salon-reveal lg:col-span-5">
            <figure className="relative m-0 aspect-[4/5] w-full overflow-hidden rounded-lg bg-m3-container shadow-xl">
              <Image
                src={philosophyImage.src}
                alt={philosophyImage.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover object-center"
              />

              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#4A2A72] opacity-30 mix-blend-multiply" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-m3-lowest via-m3-low/40 to-transparent"
              />

              <figcaption className="absolute inset-x-5 bottom-5">
                <span className="block font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
                  The sanctuary area
                </span>
                <span className="mt-1 block font-sans text-m3-body-sm font-semibold text-m3-tertiary">
                  Designed by Alain Martinos · {site.locations[0].addressLines[0]}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section> */}

      {/* =====================================================
          SECTION 4 — THE EXPERIENCE
      ===================================================== */}

      <section
        aria-labelledby="experience-heading"
        className="w-full bg-m3-low pb-20 pt-0 sm:pb-24 sm:pt-0"
      >
        <div className={styles.container}>
          <Reveal className="salon-reveal mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className={styles.eyebrow}>The sanctuary</span>
              <h2
                id="experience-heading"
                className="mt-2 font-serif text-m3-headline-md !font-normal !text-m3-on-surface lg:text-m3-headline-lg"
              >
                {s.experience.title}
              </h2>
            </div>

            <p className="max-w-md font-sans text-m3-body-md font-semibold text-m3-tertiary">
              Thoughtful hospitality, private ambiance, and uncompromising technical artistry at
              every stage of your appointment.
            </p>
          </Reveal>

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {s.experience.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                delay={Math.min(index * 70, 210)}
                className="salon-reveal min-w-0 rounded-lg bg-m3-container p-6 shadow-md transition-all duration-300 hover:bg-m3-high sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="font-serif text-m3-headline-md !font-normal !text-m3-primary/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-m3-outline-variant" />
                </div>

                <h3 className="mt-6 font-serif text-m3-headline-sm !font-normal leading-tight !text-m3-on-surface">
                  {item.title}
                </h3>

                <p className="mt-4 font-sans text-m3-body-md font-semibold leading-relaxed text-m3-tertiary">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* =====================================================
          SECTION 5 — INSIDE THE SALON (GALLERY)
      ===================================================== */}

    <section
  id="salon-gallery"
  aria-labelledby="gallery-heading"
  className={`w-full scroll-mt-24 bg-m3-surface ${styles.section}`}
>
  <div className={styles.container}>
    <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <span className={styles.eyebrow}>Atelier tour</span>

        <h2
          id="gallery-heading"
          className="mt-2 font-serif text-m3-headline-md !font-normal !text-m3-on-surface lg:text-m3-headline-lg"
        >
          {s.galleryTitle}
        </h2>
      </div>

      <span className="font-sans text-m3-label font-medium text-m3-secondary">
        01 / {String(salonImages.length).padStart(2, "0")}
      </span>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
      {salonImages.map((image, index) => (
        <div
          key={image.src}
          className={`
            relative min-h-0 min-w-0 overflow-hidden
            ${galleryLayout[index] ?? "aspect-[4/3] lg:col-span-4 lg:aspect-[4/5]"}
          `}
        >
          <GalleryTile
            src={image.src}
            alt={image.alt}
            index={index}
            total={salonImages.length}
            rotation={salonImageRotation[index] ?? 0}
          />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* =====================================================
          SECTION 6 — OUR LOCATION
      ===================================================== */}

      <section aria-labelledby="locations-heading" className={`w-full ${styles.section}`}>
        <div className={styles.container}>
          <Reveal className="salon-reveal mb-9">
            <span className={styles.eyebrow}>Salon Alain Hair & Beauty</span>
            <h2 id="locations-heading" className="mt-2 font-serif text-m3-headline-md !font-normal leading-tight !text-m3-on-surface lg:text-m3-headline-lg">{s.locationsTitle}</h2>
            <p className="mt-3 max-w-xl font-sans text-m3-body-md font-semibold text-m3-tertiary">Find your salon and plan your visit.</p>
          </Reveal>

          <div className="grid gap-10">
            {site.locations.map((location, index) => {
              const reviewHref = GOOGLE_REVIEW_URL || location.mapLink;
              const details = [
                { label: "Phone", value: site.phone, href: site.phoneHref, icon: "phone" as const },
                { label: "WhatsApp", value: site.whatsapp, href: whatsappHref(), icon: "chat" as const },
                { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "mail" as const },
                { label: "Instagram", value: "@salon_alain_hair_and_beauty", href: site.social.instagram, icon: "instagram" as const },
              ];

              return (
                <Reveal key={location.id} delay={Math.min(index * 80, 240)} className="salon-reveal grid items-stretch gap-6 lg:grid-cols-12 lg:gap-9">
                  <article className="flex min-w-0 flex-col justify-between rounded-[32px] bg-[#27183b] p-7 text-[#eddcff] shadow-[0_18px_40px_rgba(16,5,31,0.25)] sm:p-10 lg:col-span-5">
                    <div>
                      <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.23em] text-[#e4b5ff]">{location.country}</p>
                      <h3 className="mt-3 font-serif text-2xl font-normal uppercase leading-[1.3] tracking-wide text-[#eddcff] sm:text-[1.65rem]">{location.title}</h3>
                      <address className="mt-3 not-italic leading-7 text-[#d3c0dd]">{location.addressLines.map((line, lineIndex) => <span key={lineIndex} className="block">{line}</span>)}</address>
                      {location.mapLink && <a href={location.mapLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.12em] text-[#e4b5ff] hover:text-[#f7d8ff]">View on Google Maps <Arrow /></a>}

                      <dl className="mt-7 grid gap-5 rounded-[18px] bg-[#231437] p-6">
                        {details.map((detail) => <div key={detail.label} className="flex min-w-0 items-start gap-3.5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#322346] text-[#eab2ff]"><LocationIcon name={detail.icon} /></span><div className="min-w-0"><dt className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-[#c0adca]">{detail.label}</dt><dd className="mt-1 break-words text-sm text-[#eddcff]"><a href={detail.href} target={detail.icon === "chat" || detail.icon === "instagram" ? "_blank" : undefined} rel={detail.icon === "chat" || detail.icon === "instagram" ? "noopener noreferrer" : undefined}>{detail.value}</a></dd></div></div>)}
                      </dl>
                    </div>
                    <div className="mt-7 rounded-[18px] bg-[#150629] p-6 text-sm text-[#d3c0dd]"><p className="mb-3 flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.13em] text-[#e4b5ff]"><LocationIcon name="clock" /> Salon Atelier Hours</p><p>Tuesday – Saturday: 10:00 – 19:00</p><p className="mt-1">Sunday &amp; Monday: Closed</p></div>
                  </article>

                  <article className="relative isolate flex min-h-[520px] min-w-0 flex-col justify-end overflow-hidden rounded-[32px] bg-[#150629] p-5 shadow-[0_24px_50px_rgba(16,5,31,0.4)] sm:p-6 lg:col-span-7">
                    <IllustratedLocationMap id={`salon-map-${index}`} title={location.addressLines[0] ?? location.country} />
                    <span className="absolute left-6 top-6 rounded-full border border-[#b57acd]/15 bg-[#150629]/60 px-3 py-1.5 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-[#d3c0dd]">Illustrated location map</span>
                    <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#b57acd]/10 bg-[#1a0b2e]/90 p-5 backdrop-blur-md"><span className="flex min-w-0 items-center gap-3 text-sm text-[#d3c0dd]"><i className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#eab2ff] shadow-[0_0_0_6px_rgba(234,178,255,0.09),0_0_20px_rgba(234,178,255,0.33)]" />{location.title}</span>{location.mapLink && <a href={location.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#633382] px-5 py-3 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-[#f7d8ff] transition-colors hover:bg-[#eab2ff] hover:text-[#4c1564]">Get directions <LocationIcon name="pin" /></a>}</div>
                  </article>

                  {reviewHref && (
                    <aside className="relative isolate overflow-hidden rounded-[32px] border border-[#b57acd]/40 bg-gradient-to-r from-[#2a1640] via-[#3a2158] to-[#27183b] p-7 shadow-[0_22px_60px_-20px_rgba(16,5,31,0.7)] sm:p-10 lg:col-span-12">
                      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[#eab2ff]/20 blur-[40px]" />
                      <div className="flex flex-wrap items-center justify-between gap-7">
                        <div className="max-w-2xl">
                          <Stars />
                          <p className="mt-3 font-sans text-[0.72rem] font-medium uppercase tracking-[0.23em] text-[#e4b5ff]">Your experience</p>
                          <h3 className="mt-2 font-serif text-2xl font-normal leading-tight text-[#eddcff] sm:text-3xl">Loved your visit? Tell Google.</h3>
                          <p className="mt-3 font-sans text-base font-semibold leading-relaxed text-[#d3c0dd]">A few words about your appointment helps other clients find Salon Alain Hair & Beauty. It takes less than a minute.</p>
                        </div>
                        <a href={reviewHref} target="_blank" rel="noopener noreferrer" aria-label={`Leave a Google review for ${location.title} (opens in a new tab)`} className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#eab2ff] px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.13em] text-[#4c1564] shadow-[0_0_34px_rgba(234,178,255,0.2)] transition hover:-translate-y-0.5 hover:bg-[#f7d8ff]">
                          Leave a Google review
                          <Arrow />
                        </a>
                      </div>
                    </aside>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 7 — CLOSING CTA
      ===================================================== */}

      <CtaBand />
    </div>
  );
}

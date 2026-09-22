import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";

import { getContent } from "@/lib/i18n";
import { SITE_URL, site } from "@/lib/site";

const t = getContent();
const s = t.services.page;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: `${s.title} – Haircuts, Color, Balayage & Vanish Laser`,
  description: s.description,

  alternates: {
    canonical: "/services",
  },

  openGraph: {
    title: `${s.title} | Salon Alain`,
    description: s.description,
    url: "/services",
  },
};

/* =========================================================
   STRUCTURED DATA
========================================================= */

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Salon Alain Hair & Beauty Services",
  itemListElement: s.groups
    .flatMap((group) => group.items.map((item) => ({
      "@type": "Service",
      name: item.name,
      description: item.desc || group.lead,
      serviceType: group.title,
      provider: { "@id": `${SITE_URL}/#salon` },
    })))
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item,
    })),
};

/* =========================================================
   ICONS — inline so the page keeps its self-hosted fonts
========================================================= */

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-m3-secondary" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-m3-primary" fill="currentColor">
      <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-m3-secondary" fill="currentColor">
      <path d="M12 3l2.6 6.2 6.7.5-5.1 4.4 1.6 6.5L12 17.1 6.2 20.6l1.6-6.5-5.1-4.4 6.7-.5L12 3z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =========================================================
   LASER PLATFORM DATA
========================================================= */

const wavelengths = [
  "Diode Laser ",
  "Alexandrite ",
  "Nd:YAG ",
];

const laserPoints = [
  "Calibrated for all Fitzpatrick skin prototypes (I through VI) and sensitive facial zones.",
  "Sub-zero sapphire contact cooling creates a virtually pain-free experience.",
  "Accessible rates structured transparently with private consultations.",
];

const laserSpecs = [
  { label: "Engineering", value: "United Kingdom" },
  { label: "Cooling Method", value: "Dual Dynamic Air & ICE" },
  { label: "Targeting", value: "Follicular Melanin Bulb" },
  { label: "Pulse Width", value: "Sub-millisecond Smart" },
];

/* =========================================================
   VANISH BODY AREAS — the salon's own photography
========================================================= */

const vanishAreas = [
  {
    name: "Face",
    note: "Lip, Chin, Beard",
    image: "/images/vanish-face.jpg",
  },
  {
    name: "Underarms",
    note: "Quick 10-Min",
    image: "/images/vanish-arms.jpg",
  },
  {
    name: "Arms",
    note: "Half & Full",
    image: "/images/vanish-arms-1.jpg",
  },
  {
    name: "Chest",
    note: "Sternum & Pectorals",
    image: "/images/vanish-chest.jpg",
  },
  {
    name: "Back",
    note: "Upper & Lumbar",
    image: "/images/vanish-back.jpg",
  },
  {
    name: "Legs",
    note: "Thighs & Calves",
    image: "/images/vanish-legs.jpg",
  },
  // {
  //   name: "Bikini",
  //   note: "Classic & Full",
  //   image: "/images/vanish-bikini.jpg",
  // },
];

/* =========================================================
   PAGE
========================================================= */

export default function ServicesPage() {
  return (
    <main className="services-purple-background theme-purple relative isolate w-full overflow-hidden bg-[#744394] text-m3-on-surface">
      {/* =====================================================
          ONE BACKGROUND FOR THE WHOLE PAGE
          The same purple artwork the home page uses. Every section
          below is transparent, so this single image shows through.
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/salon-purple-background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <style>{`
        /* No section paints its own fill any more. */
        .services-purple-background > section {
          background-color: transparent !important;
          background-image: none !important;
        }

        /* Cards, chips and accordions stay — as translucent glass, so the
           artwork keeps reading through them. */
        .services-purple-background :is(.bg-m3-container, .bg-m3-low, .bg-m3-high, .bg-m3-highest) {
          background-color: rgba(38, 18, 60, 0.42) !important;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .services-purple-background [class~="bg-m3-highest/80"] {
          background-color: rgba(38, 18, 60, 0.55) !important;
        }
        .services-purple-background :is([class~="hover:bg-m3-high"], [class~="hover:bg-m3-highest"]):hover {
          background-color: rgba(70, 38, 104, 0.62) !important;
        }

        /* Lift the quiet greys so they stay legible on the lighter artwork. */
        .services-purple-background :is(.text-m3-tertiary, .text-m3-outline) {
          color: #EFE2F8 !important;
        }
        .services-purple-background :is(h1, h2) {
          text-shadow: 0 2px 10px rgba(35, 12, 55, 0.45);
        }
      `}</style>

      {/* =====================================================
          SECTION 1 — HERO
      ===================================================== */}

     <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-[4.5rem] pt-32 sm:pt-40">
  {/* No photograph and no tint here — the page-wide artwork is the background. */}

<div className="container-page relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
 

  <h1 className="select-none font-serif text-m3-display-mobile uppercase !font-extrabold tracking-[0.18em] !text-white sm:text-m3-display">
    {s.heading}
  </h1>

</div>
</section>

      {/* =====================================================
          SECTION 2 — LASER FEATURE (BENTO SHOWCASE)
      ===================================================== */}

     <section id="vanish" className="w-full scroll-mt-24 py-10">
  <div className="container-page">
    <div className="relative mx-auto max-w-[1240px] rounded-xl bg-m3-container p-5 shadow-[0_24px_64px_-16px_rgba(26,11,46,0.8)] sm:p-8 lg:p-10">
      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
        {/* LEFT: offerings */}
        <Reveal className="flex min-w-0 flex-col items-start gap-5 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-m3-high px-3 py-2 font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-m3-secondary"
            />
            UK Medical-Grade Tri-Wave Platform
          </div>

          <h2 className="font-serif text-m3-headline-md !font-normal leading-[1.15] !text-m3-on-surface lg:text-m3-headline-lg">
            Goodbye Unwanted Hair.
            <br />
            <span className="italic text-m3-secondary">
              Hello Smooth Skin.
            </span>
          </h2>

          <p className="max-w-xl font-sans text-m3-body-lg font-semibold text-m3-tertiary">
            Advanced laser hair removal at Salon Alain Martinos Hair &amp;
            Beauty with our UK-manufactured laser system. Three distinct
            optical wavelengths orchestrated into one seamless, comfortable
            clinical session.
          </p>

          {/* Wavelengths */}
          <div className="w-full pt-1.5">
            <p className="mb-2 font-sans text-m3-eyebrow font-medium uppercase text-m3-outline">
              3 Integrated Wavelengths
            </p>

            <div className="flex flex-wrap gap-2">
              {wavelengths.map((wave) => (
                <div
                  key={wave}
                  className="flex items-center gap-1.5 rounded-full bg-m3-high px-5 py-2 font-sans text-m3-label font-medium text-m3-secondary shadow-sm"
                >
                  <SparkIcon />
                  {wave}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-3 pt-1.5 font-sans text-m3-body-md font-semibold text-m3-on-surface-variant">
            {laserPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="shrink-0">
                  <CheckIcon />
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col items-start gap-4 pt-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contact?service=Laser%20Hair%20Removal"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-m3-primary px-6 py-3 text-center font-sans text-m3-label font-medium uppercase text-m3-on-primary transition-colors duration-300 hover:bg-m3-secondary sm:w-auto"
            >
              Book Your Consultation
              <span className="shrink-0">
                <ArrowIcon />
              </span>
            </Link>

            <span className="font-sans text-m3-body-sm font-semibold text-m3-tertiary">
              Women &amp; Men Welcome
            </span>
          </div>
        </Reveal>

        {/* RIGHT: larger image, no purple card or glow */}
        <Reveal
          delay={150}
          className="w-full min-w-0 lg:col-span-6"
        >
          <div className="flex w-full flex-col items-center bg-transparent text-center">
            {/* Real layout space prevents clipping and overlapping */}
            <div className="relative w-full h-[440px] sm:h-[580px] lg:h-[720px]">
              <Image
                src="/images/vanish-machine.png"
                alt="Laser hair removal equipment at Salon Alain Martinos Hair & Beauty"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 560px"
                className="object-contain object-center"
              />
            </div>

            <p className="mx-auto mt-5 max-w-sm px-2 font-sans text-m3-body-sm font-semibold italic leading-relaxed text-m3-tertiary">
              &ldquo;Gentle on delicate skin, decisive on unwanted
              growth.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
</section>

      {/* =====================================================
          SECTION 3 — LASER TYPOGRAPHIC BANNER
      ===================================================== */}

      <section className="relative w-full overflow-hidden py-[4.5rem]">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left typographic stack */}
            <Reveal className="flex min-w-0 flex-col justify-center lg:col-span-6">
              <span className="mb-1.5 font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
                Clinical Philosophy
              </span>

              <p className="font-serif text-m3-headline-md font-light leading-[1.12] text-m3-on-surface lg:text-m3-headline-lg">
                Smooth.
                <br />
                Confidence.
                <br />
                <span className="italic text-m3-primary-container">For Everyone.</span>
              </p>

              <p className="mt-5 max-w-md font-sans text-m3-body-md font-semibold text-m3-tertiary">
                Gender-inclusive aesthetic laser care administered with utmost discretion,
                rigorous European hygienic standards, and tailored dermal energy dosing.
              </p>
            </Reveal>

            {/* Right typographic accent */}
            <Reveal delay={150} className="flex min-w-0 select-none flex-col justify-center lg:col-span-6 lg:items-end">
              <div className="flex flex-col text-right uppercase tracking-tight">
                <span className="font-serif text-m3-headline-lg font-light leading-none text-m3-variant/90 lg:text-m3-display">
                  Face
                </span>
                <span className="my-1 font-serif text-m3-headline-lg font-light leading-none text-plum-400 lg:text-m3-display">
                  &amp; Body
                </span>
                <span className="font-serif text-m3-headline-lg font-light leading-none text-m3-variant/90 lg:text-m3-display">
                  Treatments
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 4 — TREATABLE AREAS
      ===================================================== */}

     <section className="w-full py-[4.5rem]">
  <div className="container-page flex flex-col items-center text-center">
    <Reveal className="flex flex-col items-center">
      <span className="mb-1.5 font-sans text-m3-eyebrow font-medium uppercase text-m3-tertiary">
        Treatable Areas
      </span>

      <h2 className="font-serif text-m3-headline-md !font-normal !text-m3-on-surface lg:text-m3-headline-lg">
        Smooth Skin, Everywhere
      </h2>

      <p className="mt-1.5 max-w-2xl font-sans text-m3-body-lg font-semibold text-m3-tertiary">
        Professional laser hair removal for the face and body, tailored for
        both women and men with customizable spot sizes.
      </p>
    </Reveal>

    {/* Larger images and roomier cards */}
    <div className="mt-10 grid w-full max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {vanishAreas.map((area, i) => (
        <Reveal
          key={area.name}
          delay={i * 40}
          className="h-full min-w-0"
        >
          <div className="group flex h-full cursor-default flex-col items-center gap-3 rounded-2xl bg-m3-container px-3 py-6 transition-colors hover:bg-m3-high sm:p-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-m3-highest shadow-inner sm:h-28 sm:w-28 lg:h-32 lg:w-32">
              <Image
                src={area.image}
                alt={`${area.name} laser hair removal`}
                fill
                sizes="(max-width: 639px) 96px, (max-width: 1023px) 112px, 128px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <span className="mt-1 break-words font-sans text-m3-label font-medium uppercase text-m3-on-surface">
              {area.name}
            </span>

            <span className="font-sans text-xs font-semibold leading-relaxed text-m3-tertiary">
              {area.note}
            </span>
          </div>
        </Reveal>
      ))}

      {/* And more */}
      <Reveal
        delay={vanishAreas.length * 40}
        className="h-full min-w-0"
      >
        <div className="group flex h-full cursor-default flex-col items-center gap-3 rounded-2xl bg-m3-container px-3 py-6 transition-colors hover:bg-m3-high sm:p-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-m3-highest text-m3-secondary shadow-inner transition-colors group-hover:text-m3-primary sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <span
              aria-hidden="true"
              className="text-3xl tracking-[0.15em]"
            >
              •••
            </span>
          </div>

          <span className="mt-1 font-sans text-m3-label font-medium uppercase text-m3-on-surface">
            And More
          </span>

          <span className="font-sans text-xs font-semibold leading-relaxed text-m3-tertiary">
            Bespoke Areas
          </span>
        </div>
      </Reveal>
    </div>
  </div>
</section>
      {/* =====================================================
          SECTION 5 — FULL SERVICE MENU
          Native <details> accordion: exclusive open, no JavaScript.
      ===================================================== */}

      <section
        id="services-menu"
        aria-labelledby="services-title"
        className="services-menu w-full scroll-mt-28 py-[4.5rem]"
      >
        <div className="container-page mx-auto max-w-[1140px]">
          <Reveal className="mx-auto mb-[4.5rem] max-w-2xl text-center">
            <span className="font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
              Salon Alain Hair &amp; Beauty
            </span>

            <h2
              id="services-title"
              className="mt-1.5 font-serif text-m3-headline-md !font-normal !text-m3-on-surface lg:text-m3-headline-lg"
            >
              {s.subtitle}
            </h2>

            <p className="mt-1.5 font-sans text-m3-body-md font-semibold text-m3-tertiary">
              Explore a category to discover its services, artistry techniques, and book your
              appointment.
            </p>
          </Reveal>

          {/* Accordion stack */}
          <div className="flex flex-col gap-3">
            {s.groups.map((group, index) => {
              const signature = group.id === "signature";

              return (
                <details
                  key={group.id}
                  id={`service-${group.id}`}
                  {...{ name: "salon-service-categories" }}
                  className={`service-accordion-item min-w-0 scroll-mt-28 overflow-hidden rounded-lg transition-all duration-300 ${
                    signature
                      ? "bg-m3-high shadow-[0_0_32px_rgba(155,98,179,0.15)]"
                      : "bg-m3-container"
                  }`}
                >
                  <summary className="accordion-trigger group flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-m3-primary md:p-10">
                    <span className="flex min-w-0 items-baseline gap-5">
                      <span
                        aria-hidden="true"
                        className={`font-serif text-m3-headline-sm transition-colors ${
                          signature
                            ? "font-medium text-m3-secondary"
                            : "text-m3-tertiary-container group-hover:text-m3-primary"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">
                        {signature && (
                          <span className="mb-1 flex flex-wrap items-center gap-1.5">
                            <span className="rounded-full bg-m3-secondary px-1.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-m3-on-secondary">
                              Master Atelier
                            </span>
                            <span className="font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
                              Private Haute Coiffure
                            </span>
                          </span>
                        )}

                        <span className="block break-words font-serif text-m3-headline-sm !font-normal text-m3-on-surface transition-colors group-hover:text-m3-primary md:text-m3-headline-md">
                          {group.title}
                          {signature && (
                            <span className="hidden sm:inline"> · “Personally by Alain Martinos”</span>
                          )}
                        </span>

                        <span
                          className={`mt-1 block font-sans text-m3-body-sm ${
                            signature ? "text-m3-secondary" : "text-m3-tertiary"
                          }`}
                        >
                          {signature
                            ? `${group.items.length} Exclusive Creations`
                            : `${group.items.length} Services available`}
                          <span className="sr-only"> in {group.title}</span>
                        </span>
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`accordion-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[24px] font-light text-m3-secondary ${
                        signature ? "bg-m3-highest" : "bg-m3-high"
                      }`}
                    >
                      +
                    </span>
                  </summary>

                  <div
                    className={`accordion-content px-5 pb-10 pt-1.5 md:px-10 ${
                      signature ? "bg-m3-highest/80" : "bg-m3-high"
                    }`}
                  >
                    {signature ? (
                      <>
                        <div className="mb-5 rounded bg-m3-container p-3">
                          <p className="font-sans text-m3-body-md font-semibold italic text-m3-on-surface">
                            “{group.lead} Every signature service is executed exclusively and
                            personally by founder Alain Martinos.”
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          {group.items.map((item) => (
                            <a
                              key={item.name}
                              href={`/contact?service=${encodeURIComponent(`${group.title}: ${item.name}`)}`}
                              aria-label={`${s.bookThis}: ${group.title} — ${item.name}`}
                              className="flex flex-col gap-1.5 rounded bg-m3-container p-5 transition-colors hover:bg-m3-high focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-m3-primary"
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span className="font-serif text-m3-headline-sm font-normal text-m3-on-surface">
                                  {item.name}
                                </span>
                                <StarIcon />
                              </span>

                              {item.desc && (
                                <span className="font-sans text-m3-body-md font-semibold text-m3-tertiary">
                                  {item.desc}
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mb-5 max-w-xl font-sans text-m3-body-md font-semibold italic text-m3-secondary">
                          “{group.lead}”
                        </p>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {group.items.map((item) => (
                            <a
                              key={item.name}
                              href={`/contact?service=${encodeURIComponent(`${group.title}: ${item.name}`)}`}
                              aria-label={`${s.bookThis}: ${group.title} — ${item.name}`}
                              className="group/item flex min-h-[44px] items-start justify-between gap-3 rounded bg-m3-container p-3 transition-colors hover:bg-m3-highest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-m3-primary"
                            >
                              <span className="min-w-0">
                                <span className="block break-words font-sans text-m3-body-md font-medium text-m3-on-surface">
                                  {item.name}
                                </span>
                                {item.desc && (
                                  <span className="mt-0.5 block font-sans text-m3-body-sm font-semibold text-m3-tertiary">
                                    {item.desc}
                                  </span>
                                )}
                              </span>

                              <span
                                aria-hidden="true"
                                className="shrink-0 text-m3-primary motion-safe:transition-transform motion-safe:group-hover/item:translate-x-1"
                              >
                                ↗
                              </span>
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </details>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-10 text-center">
            <p className="font-sans text-m3-body-sm font-semibold italic text-m3-tertiary">* {s.priceNote}</p>
          </div>
        </div>

        <style>{`
          .services-menu .accordion-trigger { list-style: none; }
          .services-menu summary::-webkit-details-marker { display: none; }
          .services-menu summary::marker { content: ""; }
          .services-menu .accordion-icon { transition: transform 300ms ease; }
          .services-menu details[open] .accordion-icon { transform: rotate(45deg); }
          @keyframes services-accordion-enter {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .services-menu details[open] .accordion-content {
              animation: services-accordion-enter 240ms ease-out;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .services-menu *, .services-menu *::before, .services-menu *::after {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </section>

      {/* =====================================================
          SECTION 6 — CALL TO ACTION
      ===================================================== */}

      <section className="relative w-full overflow-hidden py-[4.5rem]">
        {/* Ambient radial bloom */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[500px] max-w-full rounded-full bg-m3-primary-container/20 blur-[120px]" />
        </div>

        <div className="container-page relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal className="flex flex-col items-center">
            <span className="mb-1.5 font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
              Salon Alain Hair & Beauty
            </span>

            <h2 className="font-serif text-m3-headline-md !font-normal leading-[1.15] !text-m3-on-surface lg:text-m3-headline-lg">
              Ready For Your Next Transformation?
            </h2>

            <p className="mt-3 max-w-xl font-sans text-m3-body-lg font-semibold text-m3-tertiary">
              Choose your treatment and book your private consultation with Alain Martinos and
              our team of master stylists in {site.locations[0].addressLines[0]}.
            </p>

            <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
              <Link
                href="/contact"
                className="flex items-center gap-1.5 rounded-full bg-m3-primary px-10 py-3 font-sans text-m3-label font-medium uppercase text-m3-on-primary shadow-[0_0_32px_rgba(234,178,255,0.35)] transition-all duration-300 hover:bg-m3-secondary"
              >
                Book Your Appointment
                <ArrowIcon />
              </Link>

              <a
                href={site.phoneHref}
                className="rounded-full bg-m3-high px-10 py-3 font-sans text-m3-label font-medium uppercase text-m3-on-surface transition-colors hover:bg-m3-highest"
              >
                Call: {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}

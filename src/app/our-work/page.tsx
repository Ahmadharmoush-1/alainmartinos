import type { Metadata } from "next";

import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";

import { getContent } from "@/lib/i18n";

import { site } from "@/lib/site";

const w = getContent().work;

export const metadata: Metadata = {
  title: `${w.title} – Balayage, Color & Transformations`,
  description: w.description,
  alternates: { canonical: "/our-work" },
  openGraph: {
    title: `${w.title} | Salon Alain Hair & Beauty`,
    description: w.description,
    url: "/our-work",
  },
};

/* =========================================================
   FEATURED PERSONAL IMAGE

   Replace ONLY this path with your real image path.
========================================================= */

const featuredMemoryImage = "/images/alain-with-mother.jpg";

/* =========================================================
   INSTAGRAM POSTS
========================================================= */

const instagramPosts = [
  "https://www.instagram.com/p/DKuMBilNmAY/",
  "https://www.instagram.com/p/DKuJ8_xNvQW/",
  "https://www.instagram.com/p/DKt6GRzNMGR/",
  "https://www.instagram.com/p/DDqBLmHNUGm/",
  "https://www.instagram.com/p/C7-IubHNhdh/",
  "https://www.instagram.com/p/DDpiEZoNnCq/",
  "https://www.instagram.com/p/C7-HxKhN656/",
  "https://www.instagram.com/p/C7FPGbONKLU/",
  "https://www.instagram.com/p/C6YaSeht5lO/",
  "https://www.instagram.com/p/C6WmHuaNnXS/",
  "https://www.instagram.com/p/C6Mp73eNTyt/",
  "https://www.instagram.com/p/C6JrpvAtDys/",
  "https://www.instagram.com/p/C6JLCBBN-84/",
  "https://www.instagram.com/p/Czb7CnVIRRz/",
  "https://www.instagram.com/p/Cza0CjcoqLJ/",
  "https://www.instagram.com/p/CzEjUvJIZfA/",
  "https://www.instagram.com/p/Cx_Lmv9oX3t/",
  "https://www.instagram.com/p/Cx_K0Igoxqd/",
  "https://www.instagram.com/p/CxYrX8qIjwz/",
  "https://www.instagram.com/p/CxYPtokIBZS/",
  "https://www.instagram.com/p/CxLxsB8oobQ/",
  "https://www.instagram.com/p/Cwdql1DI2C2/",
  "https://www.instagram.com/p/CwYOb4AoNiw/",
  "https://www.instagram.com/p/Cp4kQM7oIDn/",
  "https://www.instagram.com/p/CputLjqIFVq/",
  "https://www.instagram.com/p/Co1vayCoTYt/",
  "https://www.instagram.com/p/Ck_g_1KjEQN/",
  "https://www.instagram.com/p/Ck_VlzQjzA0/",
  "https://www.instagram.com/p/C7FNyMZtGn8/",
  "https://www.instagram.com/p/Cwsqy1qIK69/",
  "https://www.instagram.com/p/Ck_coR5Dcqw/",
  "https://www.instagram.com/p/Ck_U5h6DFjZ/",
  "https://www.instagram.com/p/Ck_Thc2jdGK/",
  "https://www.instagram.com/p/CkrUta_ICi4/",
  "https://www.instagram.com/p/CkrWjZNOUG9/",
  "https://www.instagram.com/p/CjPqAClo0Zs/",
  "https://www.instagram.com/p/CjNQXWBIUxz/",
  "https://www.instagram.com/p/Ch63PE7oOUZ/",
  "https://www.instagram.com/p/CfhdbiII_lB/",
  "https://www.instagram.com/p/CfhLOOIIB4O/",
  "https://www.instagram.com/p/CdGt8UHIJIl/",
  "https://www.instagram.com/p/CYqv01XIxMZ/",
  "https://www.instagram.com/p/CYqxe7VIxSO/",
  "https://www.instagram.com/p/CYqt9KGoRoV/",
  "https://www.instagram.com/p/CYquydfo5qH/",
  "https://www.instagram.com/p/CYqm76yo4Ru/",
  "https://www.instagram.com/p/CWbd3paIp1_/",
  "https://www.instagram.com/p/CWanaw7I9QL/",
  "https://www.instagram.com/p/CV6ATOjIums/",
  "https://www.instagram.com/p/CVyZsBWoPS3/",
  "https://www.instagram.com/p/CVyXs6nowOE/",
  "https://www.instagram.com/p/CVyVW4ooFzW/",
  "https://www.instagram.com/p/CVyT2Vqo5hK/",
  "https://www.instagram.com/p/CVa2ypQogNA/",
  "https://www.instagram.com/p/CTouL5vIMMv/",
  "https://www.instagram.com/p/CTnUabRIbbJ/",
  "https://www.instagram.com/p/CTnPHv1o77P/",
  "https://www.instagram.com/p/CTnIwAdIhyO/",
  "https://www.instagram.com/p/CkrTOdIOqso/",
  "https://www.instagram.com/p/CfhbgnTIucN/",
  "https://www.instagram.com/p/CWams9-IgIF/",
  "https://www.instagram.com/p/CTmpce9oWbA/",
  "https://www.instagram.com/p/CShuTdzon-j/",
  "https://www.instagram.com/p/CRoMEoDh0IG/",
  "https://www.instagram.com/p/CRJ6a5sBIrg/",
] as const;

function getInstagramEmbedUrl(postUrl: string) {
  return `${postUrl.replace(/\/$/, "")}/embed/captioned/`;
}

/* Split every Instagram post across three swipeable rows. */
const instagramRows = Array.from({ length: 3 }, (_, rowIndex) =>
  instagramPosts.filter((_, postIndex) => postIndex % 3 === rowIndex),
);

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
      strokeWidth="1.9"
      className="h-[19px] w-[19px] shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v16m-6-6 6 6 6-6"
      />
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
      strokeWidth="1.8"
      className="h-[19px] w-[19px] shrink-0"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path
        strokeLinecap="round"
        d="M8 3.5V6.5M16 3.5V6.5M3.5 10h17"
      />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function OurWorkPage() {
  const container =
    "mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-20";

  return (
    <div className="page-purple-background theme-purple flex w-full min-w-0 flex-col break-words">
      {/* =====================================================
          SECTION 1 — HERO
      ===================================================== */}

      <section
        aria-labelledby="portfolio-heading"
        className="relative flex w-full flex-col items-center justify-center overflow-hidden py-[4.5rem] pt-32 text-center sm:pt-36"
      >
        {/* Ambient violet glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[600px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-m3-primary-container/20 blur-[130px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 top-0 -z-10 h-[220px] w-[320px] rounded-full bg-m3-secondary-container/30 blur-[90px]"
        />

        <div
          className={`${container} mx-auto flex max-w-4xl flex-col items-center`}
        >
          {/* Main heading */}
          <h1
            id="portfolio-heading"
            className="mb-6 max-w-3xl font-serif text-m3-display-mobile !font-semibold tracking-tight !text-m3-on-surface sm:text-m3-headline-lg lg:text-m3-display"
          >
            {w.heading}
          </h1>

          {/* HERO SMALL TEXT — BIGGER + BOLDER */}
          <p className="mx-auto mb-11 max-w-2xl font-sans text-[17px] font-semibold leading-[1.75] text-m3-on-surface-variant sm:text-[19px] lg:text-[20px]">
            {w.subtitle} Crafted under the discerning eye of Parisian couture
            technique in our Lebanese atelier.
          </p>

          {/* Pill buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="#collection"
              className="flex items-center gap-2 rounded-full bg-m3-primary px-10 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-m3-on-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-m3-secondary sm:text-[14px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span>Explore Our Work</span>
              <ArrowDown />
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-m3-high px-10 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-m3-secondary shadow-sm transition-all duration-300 hover:bg-m3-variant hover:text-m3-on-surface sm:text-[14px]"
            >
              <CalendarIcon />
              <span>Book an appointment</span>
            </Link>
          </div>

          {/* Atelier stats */}
          <div className="mt-[4.5rem] grid w-full max-w-2xl grid-cols-3 gap-5 pt-10 sm:gap-10">
            {atelierStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-serif text-[24px] !font-semibold leading-tight text-m3-secondary sm:text-[28px]">
                  {stat.value}
                </span>

                {/* STATS SMALL TEXT — BIGGER + BOLDER */}
                <span className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-m3-tertiary sm:text-[13px]">
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
          <div className="mb-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col">
              {/* EYEBROW — BIGGER + BOLDER */}
              <span className="mb-2 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-m3-secondary sm:text-[14px]">
                The Collection
              </span>

              <h2
                id="gallery-heading"
                className="font-serif text-m3-headline-md !font-semibold tracking-tight !text-m3-on-surface lg:text-m3-headline-lg"
              >
                Colour. Shape. Individuality.
              </h2>
            </div>

            {/* COLLECTION SMALL DESCRIPTION — BIGGER + BOLDER */}
            <p className="max-w-[500px] font-sans text-[16px] font-semibold leading-[1.7] text-m3-tertiary sm:text-[17px] lg:text-[18px]">
              Explore balayage, colour and transformations. Find inspiration
              for your next visit to Salon Alain Hair &amp; Beauty.
            </p>
          </div>

          {/* =================================================
              FEATURED PERSONAL IMAGE — ALAIN & HIS MOTHER
          ================================================= */}

          <div className="relative mx-auto mt-14 flex w-full justify-center sm:mt-18 lg:mt-20">
            {/* Soft glow behind photograph */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-m3-primary/20 blur-[85px] sm:blur-[110px]"
            />

            <div className="relative w-full max-w-[760px]">
              {/* Large fine outer border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-[2rem] border border-white/10 sm:-inset-4 sm:rounded-[2.4rem]"
              />

              {/* Secondary fine border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1.5 rounded-[1.7rem] border border-m3-secondary/20 sm:-inset-2"
              />

              {/* Photograph */}
              <div className="relative overflow-hidden rounded-[1.5rem] bg-black/10 shadow-[0_30px_90px_rgba(20,5,35,0.30)] sm:rounded-[2rem]">
                <img
                  src={featuredMemoryImage}
                  alt="Alain Martinos with his mother"
                  loading="eager"
                  decoding="async"
                  className="block max-h-[760px] w-full object-contain"
                />

                {/* Subtle overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/10 via-transparent to-white/[0.04]"
                />

                {/* Inner hairline */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
                />
              </div>

              {/* =================================================
                  PERSONAL CAPTION
                  Bigger + Bold + Professional
              ================================================= */}

              <p className="mx-auto mt-8 max-w-[700px] text-center font-serif text-[20px] font-bold leading-[1.55] tracking-[0.01em] text-m3-on-surface sm:text-[22px] lg:text-[24px]">
                My first photograph with my mother — one of the earliest and
                most meaningful inspirations behind my journey into
                hairdressing.
              </p>

              {/* Elegant single divider */}
              <div
                aria-hidden="true"
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-m3-secondary/80 to-transparent sm:w-32"
              />
            </div>
          </div>

          {/* =================================================
              INSTAGRAM COLLECTION
          ================================================= */}

          <div className="mt-16 flex flex-col gap-6 sm:mt-20 sm:gap-8">
            {instagramRows.map((row, rowIndex) => (
              <div
                key={`instagram-row-${rowIndex}`}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
              >
                {row.map((postUrl, postIndex) => {
                  const postNumber = rowIndex + postIndex * 3 + 1;

                  return (
                    <article
                      key={postUrl}
                      className="relative w-[280px] shrink-0 snap-start overflow-hidden rounded-[1.25rem] bg-white sm:w-[360px] sm:rounded-[1.5rem]"
                    >
                      <iframe
                        title={`Salon Alain Instagram post ${postNumber}`}
                        src={getInstagramEmbedUrl(postUrl)}
                        className="block h-[500px] w-full border-0 sm:h-[620px]"
                        loading="lazy"
                        scrolling="no"
                        allow="encrypted-media"
                      />

                      <a
                        href={postUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open Salon Alain Instagram post ${postNumber}`}
                        className="absolute inset-0 z-10 rounded-[1.25rem] focus:outline-none focus-visible:ring-4 focus-visible:ring-m3-primary/70 sm:rounded-[1.5rem]"
                      >
                        <span className="sr-only">
                          Open this Instagram post
                        </span>
                      </a>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 3 — CLOSING CTA
      ===================================================== */}

      <CtaBand />

      <p className="sr-only">
        Salon Alain Hair &amp; Beauty portfolio —{" "}
        {site.locations[0].addressLines.join(", ")}
      </p>
    </div>
  );
}
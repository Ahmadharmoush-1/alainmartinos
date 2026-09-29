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
    title: `${w.title} | Salon Alain Hair & Beauty  `,
    description: w.description,
    url: "/our-work",
  },
};


/* =========================================================
   INSTAGRAM POSTS

   Paste Alain's 12 real Instagram post links below. The embed is served by
   Instagram, so its photo/video and caption always match the original post.
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

// Split every Instagram post across three swipeable rows.
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
          {/* <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-m3-low px-5 py-1 shadow-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-m3-primary" />
            <span className="font-sans text-m3-eyebrow font-medium uppercase text-m3-tertiary">
              Salon Alain Hair & Beauty - Alain Martinos · Portfolio
            </span>
          </div> */}

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
              to Salon Alain Hair & Beauty  .
            </p>
          </div>

          {/* Three clean, swipeable rows. Every post is included once. */}
          <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:gap-8">
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
                        <span className="sr-only">Open this Instagram post</span>
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
        Salon Alain Hair & Beauty portfolio — {site.locations[0].addressLines.join(", ")}
      </p>
    </div>
  );
}

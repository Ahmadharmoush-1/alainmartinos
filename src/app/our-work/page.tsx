import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { CtaBand } from "@/components/CtaBand";
import { getContent } from "@/lib/i18n";
import { workImages } from "@/lib/images";

// Complete replacement for app/our-work/page.tsx (or src/app/our-work/page.tsx).
// Keeps all portfolio images and the existing Gallery and CtaBand components.
// No new dependencies, client state or global stylesheet changes required.
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

const styles = {
  container: "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
  button:
    "inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#7028B5] bg-[#7028B5] px-7 py-3.5 text-center text-lg font-semibold leading-7 text-white shadow-sm transition-colors hover:border-[#571D90] hover:bg-[#571D90] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7028B5] motion-reduce:transition-none",
};

// Scope caption styling to captions so image overlays keep their own contrast.
// Interactive controls remain purple with white labels and icons.
const galleryTheme = `
  min-w-0 text-[#6527A7]
  [&_figure]:min-w-0
  [&_figcaption]:!text-lg [&_figcaption]:!font-semibold
  [&_figcaption]:!leading-7 [&_figcaption]:!text-[#6527A7]
  [&_figcaption]:!bg-[#F1E7FC]
  [&_figcaption_p]:!text-[#6527A7] [&_figcaption_span]:!text-[#6527A7]
  sm:[&_figcaption]:!text-xl sm:[&_figcaption]:!leading-8
  [&_button]:!border-[#7028B5] [&_button]:!bg-[#7028B5]
  [&_button]:!text-white [&_button_*]:!text-white
  [&_button:hover]:!bg-[#571D90]
  [&_button:focus-visible]:!outline-[#7028B5]
`;

const ctaTheme = `
  bg-[#5C2398] text-white
  [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white
  [&_h2]:!text-3xl [&_h2]:!font-semibold [&_h2]:!leading-tight
  sm:[&_h2]:!text-4xl lg:[&_h2]:!text-5xl
  [&_p]:!text-lg [&_p]:!leading-8 [&_p]:!text-white
  sm:[&_p]:!text-xl [&_span]:!text-white
  [&_strong]:!text-white [&_em]:!text-white
  [&_a]:!min-h-[52px] [&_a]:!rounded-full
  [&_a]:!border-[#7028B5] [&_a]:!bg-[#7028B5]
  [&_a]:!text-lg [&_a]:!font-semibold [&_a]:!text-white [&_a_*]:!text-white
  [&_a:hover]:!bg-[#571D90] [&_a:focus-visible]:!outline-[#7028B5]
  [&_button]:!border-[#7028B5] [&_button]:!bg-[#7028B5]
  [&_button]:!text-white [&_button_*]:!text-white
  [&_button:hover]:!bg-[#571D90]
`;

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={`h-5 w-5 shrink-0 ${down ? "rotate-90" : ""}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function OurWorkPage() {
  return (
    <div className="min-w-0 break-words bg-[#F1E7FC] text-[#6527A7]">
      {/* Introduction: clear title, generous spacing and direct actions. */}
      <section aria-labelledby="portfolio-heading" className="relative isolate overflow-hidden border-b border-[#C7A6EB] bg-gradient-to-br from-[#E6D5FA] via-[#DCC2F5] to-[#C59AE9] pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full border border-white/40 sm:h-[30rem] sm:w-[30rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full border border-[#A774D1]/30" />
        <div className={`${styles.container} text-center`}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6527A7]">Salon Alain · Portfolio</p>
          <h1 id="portfolio-heading" className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[#6527A7] sm:text-5xl lg:text-6xl">{w.heading}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6527A7] sm:text-xl">{w.subtitle}</p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href="#portfolio-gallery" className={styles.button}>Explore our work<Arrow down /></a>
            <Link href="/contact" className={styles.button}>Book an appointment<Arrow /></Link>
          </div>
        </div>
      </section>

      {/* Three desktop columns give individual images more room to breathe.
          The existing Gallery retains ownership of its mobile grid and interactions. */}
      <section id="portfolio-gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
        <div className={styles.container}>
          <header className="mb-8 grid gap-5 border-b border-[#C7A6EB] pb-7 lg:mb-10 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6527A7]">The collection</p>
              <h2 id="gallery-heading" className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#6527A7] sm:text-4xl">Colour. Shape. Individuality.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#6527A7] sm:text-xl">Explore balayage, colour and transformations. Find inspiration for your next visit to Salon Alain.</p>
          </header>
          <div className="rounded-[2rem] border border-[#C7A6EB] bg-gradient-to-br from-[#E4CFF8] to-[#D5B7F1] p-3 sm:p-5 lg:p-7">
            <div className={galleryTheme}>
              <Gallery images={workImages} columns={3} />
            </div>
          </div>
        </div>
      </section>

      {/* Preserve existing booking content while keeping actions purple and white. */}
      <div className={ctaTheme}><CtaBand /></div>
    </div>
  );
}

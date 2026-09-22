import Link from "next/link";

import { Reveal } from "./Reveal";
import { getContent } from "@/lib/i18n";
import { site } from "@/lib/site";

const t = getContent();

/** Appointment band used on the home page and page endings. */
export function CtaBand({
  heading = t.home.cta.heading,
  copy = t.home.cta.copy,
}: {
  heading?: string;
  copy?: string;
}) {
  const [lb] = site.locations;

  return (
    <section className="theme-purple relative overflow-hidden border-t border-night-line bg-night-raised">
      {/* Soft radial purple glow for depth. */}
      <div
        aria-hidden="true"
        className="glow-purple pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      <div className="container-page relative z-10 py-24 text-center sm:py-28 lg:py-32">
        <Reveal>
          <span
            aria-hidden="true"
            className="mx-auto block h-px w-24 bg-gradient-to-r from-transparent via-bright to-transparent"
          />

          <h2 className="mx-auto mt-10 max-w-3xl font-serif text-[2.2rem] font-light leading-[1.1] text-chalk sm:text-[3rem] lg:text-[3.4rem]">
            {heading}
          </h2>

         <p className="mx-auto mt-7 max-w-2xl font-sans text-[1rem] font-semibold leading-[1.85] text-lavender sm:text-[1.08rem]">
  {copy}
</p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={lb.bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-solid w-full sm:w-auto"
            >
              {t.home.cta.lebanon}
            </a>

            <Link href="/contact" className="pill pill-outline w-full sm:w-auto">
              {t.nav.book}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

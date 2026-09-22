import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { SectionTitle } from "@/components/SectionTitle";
import { VideoShortsRow } from "@/components/VideoShortsRow";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { getContent } from "@/lib/i18n";
import { workImages, videos } from "@/lib/images";
import { site } from "@/lib/site";

const t = getContent();

export const metadata: Metadata = {
  title: {
    absolute: "Salon Alain – Hair & Beauty by Alain Martinos | Hairdresser in Jounieh, Lebanon",
  },
  description: "Salon Alain Martinos in Zouk Mikael – Jounieh. Alain Martinos, Lebanese-German hairdresser and visagist with 25+ years of experience: haircuts, hair color, balayage, highlights and beauty transformations in Lebanon and Germany.",
  alternates: { canonical: "/" },
};

/** The three marks shown under the hero buttons. */
const heroMarks = [
  { value: "25+", label: "Years of artistry" },
  { value: "Zouk Mikael", label: "Jounieh, Lebanon" },
  { value: "Haute Coiffure", label: "" },
];

export default function HomePage() {
  const h = t.home;
  const lebanon = site.locations[0];

  return (
    <div className="theme-purple home-purple-background home-bold-white relative isolate overflow-hidden bg-[#744394]">
      {/* One lightweight background for the entire page, including mobile.
          Save salon-purple-background.webp in public/images first. */}
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
        .home-purple-background > section,
        .home-purple-background .home-background-cta,
        .home-purple-background .home-background-cta > section {
          background-color: transparent !important;
          background-image: none !important;
        }
        .home-purple-background .home-background-cta > section::before,
        .home-purple-background .home-background-cta > section::after {
          background: none !important;
        }
        .home-purple-background :is(h1, h2, .text-white, .text-white, .text-white) {
          text-shadow: 0 1px 4px rgba(35, 12, 55, 0.45);
        }

        /* Brighter, heavier text throughout this page and shared components. */
        .home-bold-white {
          color: #ffffff;
          font-weight: 700;
        }
        .home-bold-white :is(h1, h2, h3, h4, h5, h6, p, span, a, li, dt, dd, summary, button, label, small, strong, em, blockquote, figcaption) {
          color: #ffffff !important;
          font-weight: 700 !important;
        }
        .home-bold-white :is(h1, h2, h3, h4, h5, h6),
        .home-bold-white :is(h1, h2, h3, h4, h5, h6) :is(span, strong, em) {
          font-weight: 800 !important;
        }
        .home-bold-white .dropcap::first-letter {
          color: #ffffff !important;
          font-weight: 800 !important;
        }
        /* Keep white button labels readable against a dark purple fill. */
        .home-bold-white .pill-solid {
          background: #4a2a72 !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
          color: #ffffff !important;
          text-shadow: none;
        }
        .home-bold-white .pill-solid:hover {
          background: #60358d !important;
        }
        .home-bold-white .pill-outline {
          border-color: rgba(255, 255, 255, 0.75) !important;
        }
        .home-bold-white .link-lilac {
          color: #ffffff !important;
          text-decoration-color: rgba(255, 255, 255, 0.75) !important;
        }

        /* Slightly larger supporting copy, including shared component labels. */
        .home-bold-white .home-section-heading p {
          font-size: 1.125rem !important;
          line-height: 1.8 !important;
        }
        .home-bold-white .home-section-heading :is(.uppercase, .kicker),
        .home-bold-white .kicker {
          font-size: 0.875rem !important;
          line-height: 1.65 !important;
        }
        .home-bold-white :is(.text-xs, small) {
          font-size: 0.875rem !important;
          line-height: 1.65 !important;
        }
        .home-bold-white .text-sm {
          font-size: 1rem !important;
          line-height: 1.7 !important;
        }
        .home-bold-white :is(.pill, .link-lilac) {
          font-size: 0.9375rem !important;
          line-height: 1.6 !important;
        }
        .home-bold-white .home-background-cta p:not(.uppercase):not(.kicker) {
          font-size: max(1.125rem, 1em) !important;
          line-height: 1.8 !important;
        }
        @media (min-width: 640px) {
          .home-bold-white .home-section-heading p:not(.uppercase):not(.kicker) {
            font-size: 1.1875rem !important;
          }
        }
      `}</style>
      {/* =====================================================
          1 — HERO
          The shared purple artwork continues behind the hero and every section.
      ===================================================== */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32">
        <div className="container-page relative z-10 py-12 text-center sm:py-16">
          {/* Meta line */}
         

          {/* Circular brand badge */}
<div className="mt-8 animate-bloom">
  <Logo
    size={600}
    priority
    link={false}
    className="mx-auto h-[230px] w-[230px] shadow-[0_30px_70px_-30px_rgba(21,8,35,0.9)] sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px]"
  />
</div>

{/* Wordmark */}
{/* White wordmark */}
<div className="mt-7 animate-rise [animation-delay:150ms]">
  <span className="relative mx-auto block h-[120px] w-full max-w-[720px] sm:h-[170px] sm:max-w-[900px] lg:h-[200px] lg:max-w-[1100px]">
    <Image
      src="/images/logo.jpg?v=white-2"
      alt="Salon Alain Martinos – Hair & Beauty"
      fill
      priority
      unoptimized
      sizes="(max-width: 1024px) 90vw, 1100px"
      className="object-contain object-center"
    />
  </span>
</div>
 <p className="animate-rise font-sans text-[0.70rem] font-bold uppercase tracking-[0.3em] text-white sm:text-[0.9rem]">
            
           
            Zouk Mikael – Jounieh
           
           
          </p>
<h1 className="tagline-h1 mx-auto mt-9 max-w-4xl font-serif text-[1.7rem] font-bold italic leading-[1.15] tracking-tight text-white [text-wrap:balance] sm:text-[2.5rem] lg:text-[3rem]">
  <span className="tagline-slab inline-block">
    {h.hero.tagline.split(" ").map((word, i) => (
      <span
        key={`${word}-${i}`}
        className="tagline-word"
        style={{ animationDelay: `${420 + i * 90}ms` }}
      >
        {word}
      </span>
    ))}
    <span aria-hidden="true" className="tagline-shine" />
  </span>
</h1>

          <span
            aria-hidden="true"
            className="mx-auto mt-8 block h-px w-28 animate-rise bg-gradient-to-r from-transparent via-bright to-transparent [animation-delay:380ms]"
          />

          <p className="mx-auto mt-8 max-w-2xl animate-rise font-sans text-[0.9rem] font-bold leading-[1.8] text-white [animation-delay:460ms] sm:text-[1.1875rem]">
            {h.hero.copy}
          </p>

        

          {/* Three marks */}
          <div className="mx-auto mt-16 grid max-w-3xl animate-rise grid-cols-1 gap-px overflow-hidden rounded-2xl border border-night-line/70 bg-transparent [animation-delay:660ms] sm:grid-cols-3">
            {heroMarks.map((m) => (
              <div key={m.label} className="bg-night-base/35 px-5 py-6">
                <p className="font-serif text-2xl font-bold leading-none text-white sm:text-[1.7rem]">
                  {m.value}
                </p>
                <p className="mt-3 break-words font-sans text-[0.8rem] font-bold uppercase tracking-[0.25em] text-white">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#intro"
          aria-label={h.hero.scroll}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white sm:flex"
        >
          <span className="font-sans text-[0.8rem] font-bold uppercase tracking-[0.3em]">
            {h.hero.scroll}
          </span>
          <span aria-hidden="true" className="block h-10 w-px animate-drift bg-gradient-to-b from-bright to-transparent" />
        </a>
      </section>

      {/* =====================================================
          2 — INTRODUCTION
      ===================================================== */}
      <section id="intro" className="scroll-mt-24 border-t border-night-line/60 py-24 sm:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-14">
          {/* Portrait — same photograph, purple duotone frame */}
          <Reveal className="lg:col-span-5">
            <div className="duotone relative h-[480px] w-full rounded-[28px] border border-night-line/70 bg-night-card sm:h-[580px] lg:h-[640px]">
              <Image
                src="/images/alain-intro.jpg"
                alt="Alain Martinos"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="rounded-[28px] object-cover object-top"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-[28px] bg-gradient-to-t from-night-base to-transparent"
              />
            </div>
          </Reveal>

          {/* Copy + stat cards */}
          <div className="lg:col-span-7">
            <SectionTitle className="home-section-heading" light kicker={h.intro.kicker} title={h.intro.heading} />

            <Reveal delay={120} className="mt-9 space-y-6 font-sans text-[1.125rem] font-bold leading-[1.85] text-white sm:text-[1.1875rem]">
              <p className="dropcap">{h.intro.p1}</p>
              <p>{h.intro.p2}</p>
            </Reveal>

            <Reveal delay={200} className="mt-9">
              <Link href="/alain-martinos" className="link-lilac">
                {h.intro.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal delay={280} className="mt-12 space-y-3">
              {h.intro.facts.map((f, i) => (
                <div
                  key={f.label}
                  className="flex flex-wrap items-center gap-4 rounded-2xl sm:flex-nowrap sm:gap-6 border border-night-line/70 bg-night-card/40 px-6 py-5 transition-colors duration-500 hover:border-bright/45 hover:bg-night-hover/60 sm:px-8"
                >
                  <span aria-hidden="true" className="font-sans text-[0.8rem] tracking-[0.25em] text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="min-w-[4.5rem] font-serif text-4xl font-bold leading-none text-white sm:text-5xl">
                    {f.value}
                  </p>
                  <p className="font-sans text-[0.85rem] font-bold uppercase leading-relaxed tracking-[0.22em] text-white">
                    {f.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          3 — SERVICES PREVIEW
          Numbered full-width accordion, one row per category.
      ===================================================== */}
      <section className="home-services border-t border-night-line/60 bg-transparent py-24 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              light
              kicker={h.services.kicker}
              title={h.services.heading}
              subtitle={h.services.subtitle}
              className="home-section-heading !max-w-2xl"
            />
            <Reveal delay={120} className="shrink-0">
              <Link href="/services" className="link-lilac">
                {h.services.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 overflow-hidden rounded-[22px] border border-night-line">
            {t.services.page.groups.map((group, index) => (
              <details
                key={group.id}
                {...{ name: "home-service-categories" }}
                className={`home-service-category border-b border-night-line last:border-b-0 ${
                  group.id === "signature" ? "bg-night-hover/55" : "bg-night-card/40"
                }`}
              >
                <summary className="home-service-trigger grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-6 transition-colors duration-300 hover:bg-night-hover/60 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-7 sm:px-9 sm:py-7">
                  <span
                    aria-hidden="true"
                    className="font-serif text-2xl font-bold leading-none text-white sm:text-[2rem]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="block break-words font-serif text-xl font-bold leading-snug text-white sm:text-[1.6rem]">
                      {group.title}
                    </span>
                    <span className="mt-1.5 block font-sans text-[0.9rem] font-bold leading-relaxed text-white sm:text-[1rem]">
                      {group.id === "signature" ? "Personally by Alain Martinos" : group.lead}
                    </span>
                  </span>

                  <span className="hidden whitespace-nowrap rounded-full border border-night-line bg-night-base/60 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-white sm:inline-block">
                    {group.items.length} services
                  </span>

                  <span
                    aria-hidden="true"
                    className="home-service-icon flex h-9 w-9 items-center justify-center rounded-full border border-night-line text-lg font-bold text-white"
                  >
                    +
                  </span>
                </summary>

                <div className="home-service-content border-t border-night-line bg-night-hover/45 px-5 pb-7 pt-6 sm:px-9">
                  <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={`/contact?service=${encodeURIComponent(`${group.title}: ${item.name}`)}`}
                          aria-label={`${t.services.page.bookThis}: ${group.title} — ${item.name}`}
                          className="group flex min-h-[44px] items-center justify-between gap-4 border-b border-night-line/60 py-2.5 transition-colors duration-300 hover:border-bright/40"
                        >
                          <span className="min-w-0 font-sans text-[1.05rem] font-bold text-white transition-colors duration-300 group-hover:text-white">
                            {item.name}
                          </span>
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                          >
                            ↗
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>

        <style>{`
          .home-services .home-service-trigger { list-style: none; }
          .home-services summary::-webkit-details-marker { display: none; }
          .home-services summary::marker { content: ""; }
          .home-services .home-service-icon { transition: transform 220ms ease, background-color 220ms ease; }
          .home-services details[open] .home-service-icon { transform: rotate(45deg); background-color: rgba(192,139,224,0.14); }
          @keyframes home-service-enter {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .home-services details[open] .home-service-content {
              animation: home-service-enter 240ms ease-out;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .home-services *, .home-services *::before, .home-services *::after {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </section>

      {/* =====================================================
          4 — LASER HAIR REMOVAL FEATURE
      ===================================================== */}
      <section className="relative overflow-hidden border-t border-night-line/60 bg-transparent">

        <div className="container-page relative grid items-center gap-14 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <Reveal className="min-w-0 lg:col-span-7">
            <p className="kicker">Featured technology</p>

            <h2 className="mt-5 font-serif text-[2.1rem] font-bold uppercase leading-[1.08] text-white sm:text-[3rem] lg:text-[3.4rem]">
              Goodbye unwanted hair.
              <span className="mt-2 block text-white">Hello smooth skin.</span>
            </h2>

            <p className="mt-7 max-w-xl font-sans text-[1.125rem] font-bold leading-[1.85] text-white">
              Advanced laser hair removal at Salon Alain Martinos Hair &amp; Beauty
              with our UK-made machine.
            </p>

            <p className="mt-6 font-sans text-[0.85rem] font-bold uppercase tracking-[0.22em] text-white">
              3 technologies · one treatment experience
            </p>

            <ul className="mt-5 flex flex-wrap gap-3">
              {["Diode Laser", "Alexandrite", "Nd:YAG"].map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-bright/45 px-5 py-2.5 font-sans text-[0.9rem] font-bold tracking-[0.12em] text-white"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-xl font-sans text-[1.125rem] font-bold leading-[1.85] text-white">
              Suitable for a wide range of skin tones, facial areas and body hair,
              for women &amp; men — and all this at very reasonable prices.
            </p>

            <div className="mt-8 border-l border-night-line pl-6">
              <p className="max-w-xl font-sans text-[1.1rem] font-bold leading-[1.85] text-white">
                At Salon Alain Martinos, experienced care and attention to detail
                make every treatment personal. From targeted areas to full-body
                care, our treatments help reduce unwanted hair and simplify your
                beauty routine.
              </p>
            </div>

            <div className="mt-10">
              <Link href="/contact" className="pill pill-solid w-full sm:w-auto">
                Book your consultation
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={180} className="relative flex items-end justify-center lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-night-line/80 bg-night-raised/60 sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]"
            />
            <div className="duotone relative z-10 mx-auto flex w-full max-w-[460px] items-end justify-center rounded-[24px]">
              <img
                src="/images/vanish-machine.png"
                alt="Laser hair removal equipment at Salon Alain Martinos Hair & Beauty"
                loading="lazy"
                className="max-h-[460px] w-auto max-w-full object-contain drop-shadow-[0_30px_45px_rgba(21,8,35,0.65)] sm:max-h-[520px]"
              />
            </div>
            <p className="absolute right-0 top-6 z-20 hidden h-36 w-36 items-center justify-center rounded-full border border-night-line bg-night-base/70 text-center font-serif text-lg font-bold italic leading-snug text-white backdrop-blur-sm lg:flex">
              Smooth
              <br />
              confidence
              <br />
              awaits
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          5 — THE SALON
      ===================================================== */}
      <section className="border-t border-night-line/60 py-24 sm:py-32">
        <div className="container-page">
          <SectionTitle
            className="home-section-heading"
            light
            align="center"
            kicker={h.salon.kicker}
            title={h.salon.subtitle}
          />

       <Reveal delay={120} className="mx-auto mt-16 w-full max-w-6xl">
  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px]">
    <Image
      src="/images/salon-main.jpg"
      alt="Salon Alain interior"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
      className="object-cover object-center"
    />
  </div>
</Reveal>

        
        </div>
      </section>

      {/* =====================================================
          6 — PORTFOLIO PREVIEW
      ===================================================== */}
      <section className="border-t border-night-line/60 bg-transparent py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              light
              kicker={h.work.kicker}
              title={h.work.heading}
              subtitle={h.work.subtitle}
              className="home-section-heading !max-w-2xl"
            />
            <Reveal delay={120} className="shrink-0">
              <Link href="/our-work" className="link-lilac">
                {h.work.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workImages.slice(0, 6).map((img, i) => (
              <Reveal key={img.src} delay={i * 80}>
                <Link
                  href="/our-work"
                  className="group block overflow-hidden rounded-[20px] border border-night-line/80 bg-night-card/40 transition-colors duration-500 hover:border-bright/45"
                >
                  <span className="duotone relative block aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-plum-500/0 transition-colors duration-500 group-hover:bg-plum-500/25"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-night-line bg-night-base/75 px-3.5 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                      {img.category[0]}
                    </span>
                  </span>

                  <span className="flex items-center justify-between gap-3 px-5 py-5">
                    <span className="font-serif text-[1.15rem] font-bold text-white sm:text-[1.3rem]">
                      {img.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-white transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          7 — BEAUTY IN MOTION
      ===================================================== */}
      {/* <section className="border-t border-night-line/60 py-20 sm:py-28">
        <div className="container-page">
          <SectionTitle
            className="home-section-heading"
            light
            align="center"
            kicker={h.video.kicker}
            title={h.video.heading}
            subtitle={h.video.subtitle}
          />

          <div className="mt-12 [&_p]:!text-white">
            <VideoShortsRow shorts={videos} playLabel={h.video.play} badge="Salon Alain" />
          </div>

          <Reveal className="mt-12 text-center">
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-outline"
            >
              {h.video.cta}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section> */}

      {/* =====================================================
          8 — CLOSING CTA
      ===================================================== */}
      <div className="home-background-cta">
        <CtaBand />
      </div>

      <p className="sr-only">
        <Link href="/alain-martinos">Alain Martinos – hairdresser in Lebanon and Germany</Link>
      </p>
    </div>
  );
}

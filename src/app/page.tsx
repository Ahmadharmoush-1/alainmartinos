import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { Gallery } from "@/components/Gallery";
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
    absolute: "Salon Alain – Hair & Beauty by Alain Martinos | Hairdresser in Jounieh, Lebanon & Germany",
  },
  description: "Salon Alain Martinos in Zouk Mikael – Jounieh. Alain Martinos, Lebanese-German hairdresser and visagist with 25+ years of experience: haircuts, hair color, balayage, highlights and beauty transformations in Lebanon and Germany.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const h = t.home;

  return (
    <div className="text-plum-700 [&_h1]:!text-plum-700 [&_h1]:!font-black [&_h2]:!text-plum-700 [&_h2]:!font-bold [&_h3]:!text-plum-700 [&_h3]:!font-bold [&_h4]:!text-plum-700 [&_h4]:!font-bold [&_h5]:!text-plum-700 [&_h5]:!font-bold [&_h6]:!text-plum-700 [&_h6]:!font-bold [&_p]:!text-plum-700 [&_p]:!font-semibold [&_a]:!font-bold [&_strong]:!text-plum-700 [&_strong]:!font-bold [&_em]:!text-plum-700 [&_em]:!font-semibold [&_li]:!text-plum-700 [&_blockquote]:!text-plum-700 [&_blockquote]:!font-bold">
      {/* 1 — HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[url('/images/alain-bg.jpg')] bg-cover bg-center bg-no-repeat pt-24 sm:pb-16">
        <div className="absolute inset-0 bg-white/15" />
        <div className="container-page relative z-10 py-16 text-center sm:py-24">
          <div className="animate-bloom">
            <Logo size={400} priority link={false}
              className="mx-auto h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] shadow-[0_30px_60px_-30px_rgba(109,43,135,0.45)]" />
          </div>
          <h1 className="mt-10 animate-rise [animation-delay:200ms]">
            <span className="relative mx-auto block h-[160px] w-full max-w-[950px] sm:h-[200px] sm:max-w-[1100px] lg:h-[240px] lg:max-w-[1300px]">
              <Image src="/images/logo.jpg"
                alt="Salon Alain Martinos - Hair & Beauty by Alain Martinos"
                fill priority className="object-contain object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1300px" />
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-[1.55rem] !font-bold italic leading-snug !text-plum-700 animate-rise [animation-delay:380ms] sm:text-[1.9rem] lg:text-[2.2rem]">
            {h.hero.tagline}
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-[1.12rem] !font-semibold leading-[1.8] !text-plum-700 animate-rise [animation-delay:500ms] sm:text-[1.25rem] lg:text-[1.35rem]">
            {h.hero.copy}
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 animate-rise [animation-delay:620ms] sm:flex-row">
            <Button href="/contact" size="lg" className="w-full !text-base !font-extrabold sm:w-auto sm:!text-lg">
              {h.hero.ctaPrimary}
            </Button>
            <Button href="/our-work" variant="outline" size="lg" className="w-full !text-base !font-extrabold sm:w-auto sm:!text-lg">
              {h.hero.ctaSecondary}
            </Button>
          </div>
        </div>
        <a href="#intro" aria-label={h.hero.scroll}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 !text-plum-700 animate-rise [animation-delay:900ms] sm:flex">
          <span className="font-sans text-[0.82rem] font-extrabold uppercase tracking-[0.18em] !text-plum-700">{h.hero.scroll}</span>
          <span className="block h-10 w-[2px] bg-gradient-to-b from-plum-700 to-transparent animate-drift" />
        </a>
      </section>

      {/* 2 — INTRO / ALAIN */}
      <section id="intro" className="scroll-mt-20 py-24 sm:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 lg:col-start-1">
            <div className="relative mx-auto h-[600px] w-full overflow-hidden sm:h-[700px] lg:h-[780px]">
              <Image src="/images/alain-intro.jpg" alt="Alain Martinos" fill priority
                sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain object-center" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="[&_h2]:!text-4xl [&_h2]:!font-bold [&_h2]:!text-plum-700 sm:[&_h2]:!text-5xl lg:[&_h2]:!text-6xl [&_p]:!text-plum-700">
              <SectionTitle kicker={h.intro.kicker} title={h.intro.heading} />
            </div>
            <Reveal delay={120} className="mt-9 space-y-7 text-[1.18rem] !font-semibold leading-[1.9] !text-plum-700 sm:text-[1.28rem] lg:text-[1.35rem]">
              <p className="dropcap !text-plum-700 !font-semibold">{h.intro.p1}</p>
              <p className="!text-plum-700 !font-semibold">{h.intro.p2}</p>
            </Reveal>
            <Reveal delay={200} className="mt-10">
              <Button href="/alain-martinos" variant="ghost" className="!normal-case !text-xl !font-extrabold sm:!text-2xl">
                Discover Alain Martinos
              </Button>
            </Reveal>
            <Reveal delay={260} className="mt-14 grid grid-cols-3 gap-6 border-t-2 border-plum-300 pt-9">
              {h.intro.facts.map((f) => (
                <div key={f.label}>
                  <p className="font-serif !text-5xl !font-bold !text-plum-700 sm:!text-6xl">{f.value}</p>
                  <p className="mt-3 !text-[0.9rem] !font-bold leading-snug !text-plum-700 sm:!text-base">{f.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — COMPACT SERVICES */}
      <section className="home-services bg-plum-50/70 py-10 sm:py-14">
        <div className="container-page">
          {/* One heading and one link to the complete services page. */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl [&_h2]:!text-3xl [&_h2]:!font-bold [&_h2]:!text-plum-800 sm:[&_h2]:!text-4xl [&_p]:!text-sm [&_p]:!leading-6 [&_p]:!text-plum-700">
              <SectionTitle
                kicker={h.services.kicker}
                title={h.services.heading}
                subtitle={h.services.subtitle}
              />
            </div>
            <Button
              href="/services"
              variant="ghost"
              className="!inline-flex !min-h-[44px] !w-full !shrink-0 !items-center !justify-center !rounded-full !bg-plum-700 !px-6 !py-3 !text-sm !font-semibold !text-white hover:!bg-plum-800 sm:!w-auto [&_*]:!text-white"
            >
              {h.services.cta}
            </Button>
          </div>

          {/* All categories, without showing every service at once. */}
          <div className="mt-6 grid items-start gap-2.5 md:grid-cols-2 md:gap-3">
            {t.services.page.groups.map((group, index) => (
              <details
                key={group.id}
                {...{ name: "home-service-categories" }}
                className={`home-service-category min-w-0 rounded-2xl border border-plum-200/80 ${
                  group.id === "signature" ? "bg-[#f6eaf4]" : "bg-white"
                }`}
              >
                <summary className="home-service-trigger grid min-h-[66px] cursor-pointer grid-cols-[20px_minmax(0,1fr)_auto_20px] items-center gap-2.5 rounded-2xl px-4 py-3.5 text-plum-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum-700 sm:px-5">
                  <span aria-hidden="true" className="text-[11px] font-semibold tracking-widest text-plum-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block break-words text-[15px] font-semibold leading-6 sm:text-base">
                      {group.title}
                    </span>
                    {group.id === "signature" && (
                      <span className="mt-0.5 block text-xs leading-5 text-plum-700">
                        Personally by Alain Martinos
                      </span>
                    )}
                  </span>
                  <span className="text-xs tabular-nums text-plum-600">
                    <span aria-hidden="true">{group.items.length}</span>
                    <span className="sr-only">{group.items.length} services</span>
                  </span>
                  <span aria-hidden="true" className="home-service-icon text-center text-xl text-plum-700">+</span>
                </summary>

                <div className="home-service-content px-4 pb-4 sm:px-5 sm:pb-5">
                  <p className="border-t border-plum-200/70 pb-3 pt-4 !text-sm leading-6 !text-plum-700">
                    {group.lead}
                  </p>
                  <ul className="divide-y divide-plum-100">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={`/contact?service=${encodeURIComponent(`${group.title}: ${item.name}`)}`}
                          aria-label={`${t.services.page.bookThis}: ${group.title} — ${item.name}`}
                          className="group flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-sm leading-6 text-plum-800 transition-colors hover:bg-plum-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-700"
                        >
                          <span className="min-w-0">
                            <span className="block break-words font-medium">{item.name}</span>
                            {item.desc && (
                              <span className="mt-1 block text-xs leading-5 text-plum-700">{item.desc}</span>
                            )}
                          </span>
                          <span aria-hidden="true" className="shrink-0 text-plum-500 motion-safe:transition-transform motion-safe:group-hover:translate-x-1">↗</span>
                        </a>
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
          .home-services .home-service-icon { transition: transform 180ms ease; }
          .home-services details[open] .home-service-icon { transform: rotate(45deg); }
          .home-services details[open] { border-color: #b68aad; }
          @keyframes home-service-enter {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .home-services details[open] .home-service-content {
              animation: home-service-enter 220ms ease-out;
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

      {/* VANISH FEATURED TECHNOLOGY */}
      <section className="relative overflow-hidden border-t border-plum-200/60 bg-gradient-to-br from-[#f8eef8] via-[#f5e8f4] to-[#ead6e8]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-16 h-[420px] w-[420px] rounded-full bg-white/30 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 left-1/3 h-[500px] w-[500px] rounded-full bg-plum-200/20 blur-3xl" />
        <div className="container-page relative grid min-h-[650px] items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <Reveal className="min-w-0 lg:col-span-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold leading-[1.08] text-plum-800 sm:text-5xl lg:text-6xl">
                GOODBYE UNWANTED HAIR.
                <span className="mt-2 block">HELLO SMOOTH SKIN. 💜✨</span>
              </h2>
              <p className="mt-6 text-base leading-8 text-plum-700/80 sm:text-lg">
                Advanced laser hair removal at Salon Alain Martinos Hair &amp; Beauty
                with our UK-made machine.
              </p>
              <p className="mt-5 text-base font-bold leading-7 text-plum-800">
                3 technologies • One professional hair removal treatment
                experience designed with your comfort in mind:
              </p>
              <ul className="mt-4 space-y-3 text-base font-bold text-plum-800">
                <li>💜 Diode Laser</li>
                <li>💜 Alexandrite</li>
                <li>💜 Nd:YAG</li>
              </ul>
              <p className="mt-6 text-base leading-8 text-plum-700/80">
                Suitable for a wide range of skin tones, facial areas and
                body hair, for women &amp; men.
              </p>
              <p className="mt-4 text-base font-bold leading-7 text-plum-800">
                And all this at very reasonable prices. ✨
              </p>
              <div className="mt-6 border-l-2 border-plum-400 pl-5">
                <p className="text-base leading-8 text-plum-700/80">
                  At Salon Alain Martinos , experienced care and attention
                  to detail make every treatment personal.
                </p>
                <p className="mt-2 text-base leading-8 text-plum-700/80">
                  From targeted areas to full-body care, our treatments
                  help reduce unwanted hair and simplify your beauty routine.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/contact" className="group !inline-flex !w-full !items-center !justify-center !rounded-full !bg-plum-700 !px-6 !py-4 !text-base !font-bold !text-white hover:!bg-plum-800 sm:!w-auto sm:!px-8">
                  Book Your Consultation
                  <span aria-hidden="true" className="ml-2 inline-block text-xl text-white transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={180} className="relative flex items-end justify-center lg:col-span-6 lg:h-full">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 sm:h-[430px] sm:w-[430px] lg:h-[520px] lg:w-[520px]" />
            <div className="relative z-10 mx-auto flex w-full max-w-[520px] items-end justify-center">
              <img src="/images/vanish-machine.png"
                alt="Laser hair removal equipment at Salon Alain Martinos Hair & Beauty"
                loading="lazy" className="max-h-[520px] w-auto max-w-full object-contain drop-shadow-[0_30px_35px_rgba(76,26,72,0.18)] sm:max-h-[580px] lg:max-h-[620px]" />
            </div>
            <div className="absolute right-0 top-12 z-20 hidden h-40 w-40 items-center justify-center rounded-full border border-white/60 bg-white/45 p-6 text-center shadow-sm backdrop-blur-md sm:flex lg:right-2 lg:top-20">
              <p className="rotate-[-7deg] font-serif text-xl italic leading-snug text-plum-700">
                Smooth<br />Confidence<br />Awaits
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 — SALON */}
      <section className="bg-[#E4CBEA] py-24 sm:py-32">
        <div className="container-page">
          <div className="[&_h2]:!text-4xl [&_h2]:!font-bold [&_h2]:!text-plum-700 sm:[&_h2]:!text-5xl lg:[&_h2]:!text-6xl [&_p]:!text-[1.1rem] [&_p]:!font-semibold [&_p]:!text-plum-700 sm:[&_p]:!text-[1.2rem]">
            <SectionTitle title={h.salon.heading} subtitle={h.salon.subtitle} align="center" />
          </div>
          <div className="mx-auto mt-16 w-full max-w-6xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px]">
              <Image src="/images/salon-main.jpg" alt="Salon Alain interior" fill priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="rotate-0 scale-[1.8] object-contain object-center" />
            </div>
          </div>
          <Reveal className="mt-11 text-center">
            <Button href="/hair-salon" variant="outline" size="lg" className="!text-base !font-extrabold sm:!text-lg">{h.salon.cta}</Button>
          </Reveal>
        </div>
      </section>

      {/* 5 — OUR WORK */}
      <section className="border-t-2 border-plum-300 py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="[&_h2]:!text-4xl [&_h2]:!font-bold [&_h2]:!text-plum-700 sm:[&_h2]:!text-5xl lg:[&_h2]:!text-6xl [&_p]:!text-[1.1rem] [&_p]:!font-semibold [&_p]:!text-plum-700 sm:[&_p]:!text-[1.2rem]">
              <SectionTitle kicker={h.work.kicker} title={h.work.heading} subtitle={h.work.subtitle} />
            </div>
            <Reveal delay={150} className="shrink-0">
              <Button href="/our-work" variant="ghost" className="!text-base !font-extrabold sm:!text-lg">{h.work.cta}</Button>
            </Reveal>
          </div>
          <Reveal className="mt-16 [&_figcaption]:!text-xl [&_figcaption]:!font-bold [&_figcaption]:!text-plum-700 sm:[&_figcaption]:!text-2xl">
            <Gallery images={workImages.slice(0, 6)} columns={3} />
          </Reveal>
        </div>
      </section>

      {/* 6 — BEAUTY IN MOTION */}
      <section className="bg-plum-50/70 py-14 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="[&_h2]:!text-3xl [&_h2]:!font-bold [&_h2]:!text-plum-700 sm:[&_h2]:!text-5xl lg:[&_h2]:!text-6xl [&_p]:!text-base [&_p]:!font-medium [&_p]:!text-plum-700 sm:[&_p]:!text-lg">
            <SectionTitle kicker={h.video.kicker} title={h.video.heading} subtitle={h.video.subtitle} align="center" />
          </div>
          <div className="mt-7 sm:mt-10">
            <VideoShortsRow shorts={videos} playLabel={h.video.play} badge="Salon Alain" />
          </div>
          <Reveal className="mt-9 text-center sm:mt-12">
            <Button href={site.social.youtube} size="lg" className="!rounded-full !bg-plum-700 !text-base !font-extrabold !text-white hover:!bg-plum-800 [&_*]:!text-white sm:!text-lg">
              {h.video.cta}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 7 — CTA */}
      <div className="[&_h2]:!text-4xl [&_h2]:!font-bold sm:[&_h2]:!text-5xl lg:[&_h2]:!text-6xl [&_p]:!text-lg [&_p]:!font-semibold sm:[&_p]:!text-xl [&_a]:!font-extrabold">
        <CtaBand />
      </div>
      <p className="sr-only">
        <Link href="/alain-martinos">Alain Martinos – hairdresser in Lebanon and Germany</Link>
      </p>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceItem } from "@/components/ServiceItem";
import { Gallery } from "@/components/Gallery";
import { VideoShortsRow } from "@/components/VideoShortsRow";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { getContent } from "@/lib/i18n";
import { alainImages, salonImages, workImages } from "@/lib/images";
import { site } from "@/lib/site";
import { videos } from "@/lib/images";

const t = getContent();

export const metadata: Metadata = {
  title: { absolute: "Salon Alain – Hair & Beauty by Alain Martinos | Hairdresser in Jounieh, Lebanon & Germany" },
  description:
    "Salon Alain in Zouk Mikael – Jounieh. Alain Martinos, Lebanese-German hairdresser and visagist with 25+ years of experience: haircuts, hair color, balayage, highlights and beauty transformations in Lebanon and Germany.",
  alternates: { canonical: "/" },
};

const serviceTileImages = [workImages[3], workImages[6], workImages[0], workImages[2]];

export default function HomePage() {
  const h = t.home;
  return (
    <>
      {/* 1 — HERO */}
     <section
  className="
    relative
    flex
    min-h-[100svh]
    items-center
    overflow-hidden
    bg-[url('/images/alain-bg.jpg')]
    bg-cover
    bg-center
    bg-no-repeat
    pt-24
    sm:pb-16
  "
>
  {/* Soft overlay */}
  <div className="absolute inset-0 bg-white/15" />

  {/* CONTENT */}
  <div className="container-page relative z-10 py-16 text-center sm:py-24">

    <div className="animate-bloom">
      <Logo
        size={400}
        priority
        link={false}
        className="
          mx-auto
          h-[280px]
          w-[280px]
          sm:h-[400px]
          sm:w-[400px]
          shadow-[0_30px_60px_-30px_rgba(109,43,135,0.45)]
        "
      />
    </div>

    <h1 className="mt-10 animate-rise [animation-delay:200ms]">
      <span className="block font-sans text-[0.72rem] font-medium uppercase tracking-[0.34em] text-plum-700 sm:text-[0.8rem]">
        Salon Alain
      </span>

      {/* <span className="mt-4 block text-display-xl font-medium">
        {h.hero.line1}
      </span>

      <span className="mt-2 block font-serif text-2xl italic text-plum-700 sm:text-3xl">
        {h.hero.line2}
      </span> */}
    </h1>

    <p className="mx-auto mt-8 max-w-md font-serif text-2xl italic leading-snug text-ink/85 animate-rise [animation-delay:380ms] sm:text-3xl">
      {h.hero.tagline}
    </p>

    <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist animate-rise [animation-delay:500ms] sm:text-base">
      {h.hero.copy}
    </p>

    <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-rise [animation-delay:620ms] sm:flex-row">
      <Button
        href="/contact"
        size="lg"
        className="w-full sm:w-auto"
      >
        {h.hero.ctaPrimary}
      </Button>

      <Button
        href="/our-work"
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
      >
        {h.hero.ctaSecondary}
      </Button>
    </div>

  </div>

  {/* Scroll */}
  <a
    href="#intro"
    aria-label={h.hero.scroll}
    className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-plum-500 animate-rise [animation-delay:900ms] sm:flex"
  >
    <span className="font-sans text-[0.6rem] uppercase tracking-wider2">
      {h.hero.scroll}
    </span>

    <span className="block h-10 w-px bg-gradient-to-b from-plum-500 to-transparent animate-drift" />
  </a>
</section>

  <section id="intro" className="scroll-mt-20 py-24 sm:py-32">
  <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">

   {/* LEFT IMAGE */}
<div className="lg:col-span-6 lg:col-start-1">
  <div className="relative mx-auto h-[600px] w-full overflow-hidden sm:h-[700px] lg:h-[780px]">
    <Image
      src="/images/alain-intro.jpg"
      alt="Alain Martinos"
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-contain object-center"
    />
  </div>
</div>

    {/* RIGHT CONTENT */}
    <div className="lg:col-span-6 lg:col-start-7">
      <SectionTitle
        kicker={h.intro.kicker}
        title={h.intro.heading}
      />

      <Reveal
        delay={120}
        className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-ink/80"
      >
        <p className="dropcap">{h.intro.p1}</p>
        <p>{h.intro.p2}</p>
      </Reveal>

      <Reveal delay={200} className="mt-8">
        <Button href="/alain-martinos" variant="ghost">
          {h.intro.cta}
        </Button>
      </Reveal>

      <Reveal
        delay={260}
        className="mt-12 grid grid-cols-3 gap-6 border-t border-plum-200 pt-8"
      >
        {h.intro.facts.map((f) => (
          <div key={f.label}>
            <p className="font-serif text-4xl font-medium text-plum-700">
              {f.value}
            </p>

            <p className="mt-1 text-xs leading-snug text-mist">
              {f.label}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  </div>
</section>

      {/* 3 — SERVICES */}
      <section className="bg-plum-50/70 py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle kicker={h.services.kicker} title={h.services.heading} subtitle={h.services.subtitle} />
            <Reveal delay={150} className="shrink-0">
              <Button href="/services" variant="ghost">{h.services.cta}</Button>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
            {t.services.list.slice(0, 4).map((s, i) => (
              <ServiceItem
                key={s.slug}
                name={s.name}
                description={s.short}
                href={`/services#${s.group}`}
                image={{ src: serviceTileImages[i].src, alt: serviceTileImages[i].alt }}
                index={i}
              />
            ))}
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-plum-200 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.list.slice(4).map((s, i) => (
              <ServiceItem key={s.slug} name={s.name} description={s.short} href={`/services#${s.group}`} index={i} />
            ))}
          </div>
        </div>
      </section>
<section className="py-24 sm:py-32">
  <div className="container-page">

    <SectionTitle
      title={h.salon.heading}
      subtitle={h.salon.subtitle}
      align="center"
    />

    {/* SALON IMAGE */}
    <div className="mx-auto mt-14 w-full max-w-6xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px]">

        <Image
          src="/images/salon-main.jpg"
          alt="Salon Alain interior"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className="-rotate-90 scale-[1.8] object-contain object-center"
        />

      </div>
    </div>

    {/* BUTTON */}
    <Reveal className="mt-10 text-center">
      <Button
        href="/hair-salon"
        variant="outline"
        size="lg"
      >
        {h.salon.cta}
      </Button>
    </Reveal>

  </div>
</section>

      {/* 5 — OUR WORK */}
      <section className="border-t border-plum-200/70 py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle kicker={h.work.kicker} title={h.work.heading} subtitle={h.work.subtitle} />
            <Reveal delay={150} className="shrink-0">
              <Button href="/our-work" variant="ghost">{h.work.cta}</Button>
            </Reveal>
          </div>
          <Reveal className="mt-14">
            <Gallery images={workImages.slice(0, 6)} columns={3} />
          </Reveal>
        </div>
      </section>

    {/* 6 — BEAUTY IN MOTION */}

<section className="bg-plum-50/70 py-24 sm:py-32">
  <div className="container-page">

    <SectionTitle
      kicker={h.video.kicker}
      title={h.video.heading}
      subtitle={h.video.subtitle}
      align="center"
    />

    <div className="mt-14">
      <VideoShortsRow
        shorts={videos}
        playLabel={h.video.play}
      />
    </div>

    <Reveal className="mt-12 text-center">
      <Button
        href={site.social.youtube}
        variant="outline"
        size="lg"
      >
        {h.video.cta}
      </Button>
    </Reveal>

  </div>
</section>

      {/* 7 — CTA */}
      <CtaBand />

      <p className="sr-only">
        <Link href="/alain-martinos">Alain Martinos – hairdresser in Lebanon and Germany</Link>
      </p>
    </>
  );
}

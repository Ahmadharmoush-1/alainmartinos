import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/PageHero";
import { ServiceItem } from "@/components/ServiceItem";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";

import { getContent } from "@/lib/i18n";
import { heroImages, workImages } from "@/lib/images";
import { SITE_URL } from "@/lib/site";

const t = getContent();
const s = t.services.page;

export const metadata: Metadata = {
  title: `${s.title} – Haircuts, Color, Balayage & Styling`,
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

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Salon Alain services",

  itemListElement: s.groups.flatMap((g) =>
    g.items.map((it, i) => ({
      "@type": "Service",
      position: i + 1,
      name: it.name,
      description: it.desc,
      serviceType: g.title,

      provider: {
        "@id": `${SITE_URL}/#salon`,
      },
    }))
  ),
};

const groupImages = [
  workImages[3],
  workImages[6],
  workImages[0],
  workImages[7],
  workImages[4],
  workImages[11],
];

export default function ServicesPage() {
  return (
    <>
      {/* ========================================
          HERO
      ======================================== */}

      <PageHero
        kicker="Salon Alain"
        title={s.heading}
        subtitle={s.subtitle}
        image={heroImages.beautyLove}
        variant="band"
      />

      {/* ========================================
          FULL SERVICES BACKGROUND
      ======================================== */}

      <div className="relative overflow-hidden">
        {/* BACKGROUND IMAGE */}

        <div className="absolute inset-0 -z-20">
             <Image
      src="/images/sfooter-bg.jpg"
      alt=""
      fill
      sizes="100vw"
      className="object-cover object-center"
    />
        </div>

        {/* WHITE / CREAM OVERLAY
            Increase opacity if text is difficult to read.
        */}

        <div className="absolute inset-0 -z-10 bg-white/90" />

        {/* Optional soft gradient */}

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/30 via-white/10 to-white/50" />

        {/* ========================================
            INTRO
        ======================================== */}

        <section className="pt-20 sm:pt-24">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-serif text-2xl italic leading-relaxed text-ink/85 sm:text-[1.7rem]">
                {s.intro}
              </p>
            </Reveal>

            {/* In-page navigation */}

            <Reveal
              delay={100}
              className="no-scrollbar mt-12 flex justify-start gap-1 overflow-x-auto border-y border-plum-200/70 py-3 sm:justify-center"
            >
              {s.groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="link-line whitespace-nowrap px-3 py-1.5 font-sans text-[0.68rem] font-medium uppercase tracking-wider2 text-ink/70 transition-colors hover:text-plum-700"
                >
                  {g.title}
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ========================================
            SERVICES
        ======================================== */}

        <div className="container-page">
          {s.groups.map((g, gi) => {
            const img = groupImages[gi % groupImages.length];

            return (
              <section
                key={g.id}
                id={g.id}
                className="scroll-mt-24 border-t border-plum-200/60 py-16 sm:py-20"
              >
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  {/* LEFT SIDE */}

                  <div className="lg:col-span-4">
                    <Reveal className="lg:sticky lg:top-28">
                      <h2 className="text-display-md font-medium">
                        {g.title}
                      </h2>

                      <span
                        aria-hidden="true"
                        className="mt-5 block h-px w-14 bg-plum-500"
                      />

                      <p className="mt-5 font-serif text-xl italic leading-relaxed text-mist">
                        {g.lead}
                      </p>

                      {/* GROUP IMAGE */}

                      <div className="zoom-frame relative mt-8 hidden aspect-[4/5] overflow-hidden lg:block">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="30vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Reveal>
                  </div>

                  {/* SERVICE LIST */}

                  <ul className="lg:col-span-8">
                    {g.items.map((it, i) => (
                      <ServiceItem
                        key={it.name}
                        variant="row"
                        index={i}
                        name={it.name}
                        description={it.desc}
                        duration={it.duration}
                        price={it.price}
                        durationLabel={s.durationLabel}
                        priceLabel={s.priceLabel}
                        bookLabel={s.bookThis}
                        bookHref={`/contact?service=${encodeURIComponent(
                          it.name
                        )}`}
                      />
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}

          {/* PRICE NOTE */}

          <p className="pb-16 text-center text-sm text-mist">
            {s.priceNote}
          </p>
        </div>

        {/* ========================================
            BOOK APPOINTMENT
        ======================================== */}

        <section className="border-t border-plum-200/60 py-16 text-center">
          <div className="container-page">
            <Reveal>
              <Button href="/contact" size="lg">
                {t.common.bookAppointment}
              </Button>
            </Reveal>
          </div>
        </section>
      </div>

      {/* CTA */}

      <CtaBand />

      {/* STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}
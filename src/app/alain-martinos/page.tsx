import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { Divider } from "@/components/Divider";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";

import { getContent } from "@/lib/i18n";
import { alainImages } from "@/lib/images";
import { SITE_URL } from "@/lib/site";

const t = getContent();
const a = t.alain;

export const metadata: Metadata = {
  title: `${a.title} – Hairdresser, Visagist, Singer & Collector`,
  description: a.description,

  alternates: {
    canonical: "/alain-martinos",
  },

  openGraph: {
    title: `${a.title} | Salon Alain`,
    description: a.description,
    url: "/alain-martinos",
    type: "profile",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/alain-martinos#person`,
  name: "Alain Martinos",
  jobTitle: "Hairdresser & Visagist",
  description: a.description,
  nationality: ["Lebanese", "German"],
  url: `${SITE_URL}/alain-martinos`,
  image: `${SITE_URL}${alainImages[0].src}`,
  worksFor: {
    "@id": `${SITE_URL}/#salon`,
  },
  knowsAbout: [
    "Hairdressing",
    "Balayage",
    "Hair color",
    "Visagism",
    "Singing",
    "Barbie collecting",
    "Intellectual property law",
  ],
};

/* =========================================================
   CHAPTER HEADING
========================================================= */

function ChapterHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <Reveal>
      <p className="font-serif text-2xl italic text-plum-500">
        {number}
      </p>

      <h2 className="mt-2 text-display-lg font-medium">
        {title}
      </h2>

      <span
        aria-hidden="true"
        className="mt-6 block h-px w-16 bg-plum-500"
      />
    </Reveal>
  );
}

/* =========================================================
   PROSE
========================================================= */

function Prose({
  paragraphs,
  dropcap = false,
  delay = 120,
}: {
  paragraphs: readonly string[];
  dropcap?: boolean;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="space-y-5 text-[1.05rem] leading-[1.85] text-ink/80"
    >
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={dropcap && i === 0 ? "dropcap" : undefined}
        >
          {p}
        </p>
      ))}
    </Reveal>
  );
}

/* =========================================================
   PHOTO
========================================================= */

function Photo({
  img,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 40vw",
  delay = 0,
}: {
  img: (typeof alainImages)[number];
  className?: string;
  sizes?: string;
  delay?: number;
}) {
  return (
    <Reveal
      variant="image"
      delay={delay}
      className={`relative overflow-hidden ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        className="object-cover object-center"
      />
    </Reveal>
  );
}

/* =========================================================
   PULL QUOTE
========================================================= */

function PullQuote({
  text,
  light = false,
}: {
  text: string;
  light?: boolean;
}) {
  return (
    <Reveal className="my-6">
      <blockquote
        className={`border-l border-plum-500 pl-6 font-serif text-2xl italic leading-snug sm:text-3xl ${
          light ? "text-cream" : "text-plum-700"
        }`}
      >
        “{text}”
      </blockquote>
    </Reveal>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AlainPage() {
  const [
    passion,
    singer,
    collector,
    more,
    twoWorlds,
    education,
  ] = a.chapters;

  return (
    <>
      {/* =====================================================
          MAIN HERO / MASTHEAD
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
          pt-32
          sm:pt-40
        "
        style={{
          backgroundImage: "url('/images/footer-bg.jpg')",
        }}
      >
        {/* WHITE OVERLAY */}

        <div className="absolute inset-0 bg-white/55" />

        {/* SOFT LUXURY GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-white/50
            via-white/20
            to-transparent
          "
        />

        {/* CONTENT */}

        <div
          className="
            container-page
            relative
            z-10
            grid
            items-end
            gap-10
            pb-16
            lg:grid-cols-12
            lg:pb-24
          "
        >
          {/* LEFT */}

          <div className="lg:col-span-7">
            <p className="kicker animate-rise">
              Salon Alain · Founder
            </p>

            <h1
              className="
                mt-4
                text-display-xl
                font-medium
                animate-rise
                [animation-delay:120ms]
              "
            >
              {a.heading}
            </h1>

            <p
              className="
                mt-6
                flex
                flex-wrap
                gap-x-4
                gap-y-1
                font-serif
                text-xl
                italic
                text-plum-700
                animate-rise
                [animation-delay:240ms]
              "
            >
              {a.roles.map((r, i) => (
                <span key={r}>
                  {r}

                  {i < a.roles.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="ml-4 text-plum-300"
                    >
                      /
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* RIGHT — ALAIN */}

          <div className="lg:col-span-5">
            <div
              className="
                relative
                aspect-[4/5]
                w-full
                overflow-hidden
                rounded-[28px]
                animate-bloom
                [animation-delay:200ms]
              "
            >
              <Image
                src={alainImages[0].src}
                alt={alainImages[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          THESIS / INTRO
      ===================================================== */}

      <section className="py-20 sm:py-28">
        <div className="container-page mx-auto max-w-3xl">
          <Reveal>
            <p className="dropcap text-[1.1rem] leading-[1.85] text-ink/80">
              {a.intro}
            </p>
          </Reveal>

          <Reveal
            delay={150}
            className="my-12 text-center"
          >
            <Divider className="mb-8" />

            <p
              className="
                font-serif
                text-3xl
                font-medium
                italic
                leading-tight
                text-plum-700
                sm:text-4xl
              "
            >
              “{a.thesis}”
            </p>

            <Divider className="mt-8" />
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[1.1rem] leading-[1.85] text-ink/80">
              {a.introAfter}
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          I — A PASSION FOR BEAUTY
      ===================================================== */}

      <section
        id={passion.id}
        className="scroll-mt-24 py-20 sm:py-28"
      >
        <div
          className="
            container-page
            grid
            items-center
            gap-12
            lg:grid-cols-12
            lg:gap-16
          "
        >
          {/* LEFT — TEXT */}

          <div className="lg:col-span-7">
            <ChapterHeading
              number={passion.number}
              title={passion.title}
            />

            <div className="mt-8">
              <Prose paragraphs={passion.paragraphs} />
            </div>
          </div>

          {/* RIGHT — IMAGE */}

          <div className="lg:col-span-5">
            <div
              className="
                relative
                mx-auto
                aspect-[4/5]
                w-full
                max-w-[520px]
                overflow-hidden
                rounded-[28px]
              "
            >
              <Image
                src="/images/alain-portrait.jpg"
                alt="Alain Martinos"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-[1400ms]
                  hover:scale-[1.03]
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          II — THE SINGER
      ===================================================== */}

      <section
        id={singer.id}
        className="
          scroll-mt-24
          bg-plum-50/70
          py-20
          sm:py-28
        "
      >
        <div
          className="
            container-page
            grid
            gap-12
            lg:grid-cols-12
            lg:gap-16
          "
        >
          <div className="lg:order-2 lg:col-span-7">
            <ChapterHeading
              number={singer.number}
              title={singer.title}
            />

            <div className="mt-8">
              <Prose paragraphs={singer.paragraphs} />
            </div>
          </div>

          <div className="lg:order-1 lg:col-span-5">
            <Photo
              img={alainImages[2]}
              className="aspect-square"
            />

            <PullQuote text={singer.quote!} />
          </div>
        </div>
      </section>

      {/* =====================================================
          III — THE COLLECTOR
      ===================================================== */}

      <section
        id={collector.id}
        className="scroll-mt-24 py-20 sm:py-28"
      >
        <div className="container-page">
          <div
            className="
              grid
              gap-12
              lg:grid-cols-12
              lg:gap-16
            "
          >
            <div className="lg:col-span-7">
              <ChapterHeading
                number={collector.number}
                title={collector.title}
              />

              <div className="mt-8">
                <Prose paragraphs={collector.paragraphs} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Photo
                img={alainImages[3]}
                className="aspect-[4/5]"
              />
            </div>
          </div>

          {/* STUDIES */}

          <div
            className="
              mt-16
              grid
              gap-12
              border-t
              border-plum-200/60
              pt-14
              lg:grid-cols-12
            "
          >
            <Reveal className="lg:col-span-4">
              <p className="font-serif text-2xl font-medium text-plum-700">
                {collector.studies!.title}
              </p>

              <ul
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-x-6
                  gap-y-2
                  text-[0.95rem]
                  text-ink/80
                "
              >
                {collector.studies!.items.map((it) => (
                  <li
                    key={it}
                    className="
                      border-b
                      border-plum-200/60
                      py-2
                    "
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <Prose
                paragraphs={collector.closing!}
                delay={80}
              />

              <Reveal
                delay={160}
                className="
                  mt-10
                  grid
                  gap-6
                  sm:grid-cols-3
                "
              >
                {collector.triptych!.map((line) => (
                  <p
                    key={line}
                    className="
                      border-t
                      border-plum-700
                      pt-4
                      font-serif
                      text-xl
                      italic
                      leading-snug
                      text-plum-700
                    "
                  >
                    {line}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IV — MORE THAN A COLLECTION
      ===================================================== */}

      <section
        id={more.id}
        className="
          scroll-mt-24
          silk-bg-dark
          py-20
          text-cream
          sm:py-28
        "
      >
        <div
          className="
            container-page
            grid
            gap-12
            lg:grid-cols-12
            lg:gap-16
          "
        >
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-serif text-2xl italic text-plum-300">
                {more.number}
              </p>

              <h2 className="mt-2 text-display-lg font-medium text-cream">
                {more.title}
              </h2>

              <span
                aria-hidden="true"
                className="mt-6 block h-px w-16 bg-plum-300"
              />
            </Reveal>

            <Reveal
              delay={120}
              className="
                mt-8
                space-y-5
                text-[1.05rem]
                leading-[1.85]
                text-plum-100
              "
            >
              {more.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-plum-300/30 border-y border-plum-300/30">
              {more.lenses!.map((l, i) => (
                <Reveal
                  as="li"
                  key={l.role}
                  delay={i * 90}
                  className="
                    grid
                    gap-1
                    py-6
                    sm:grid-cols-5
                    sm:gap-6
                  "
                >
                  <span className="font-serif text-xl italic text-plum-200 sm:col-span-2">
                    {l.role}
                  </span>

                  <span className="text-plum-50 sm:col-span-3">
                    {l.what}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal
              delay={400}
              className="mt-10"
            >
              <p
                className="
                  font-serif
                  text-2xl
                  italic
                  leading-snug
                  text-cream
                  sm:text-3xl
                "
              >
                {more.closing![0]}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          V — A LIFE BETWEEN TWO WORLDS
      ===================================================== */}

      <section
        id={twoWorlds.id}
        className="scroll-mt-24 py-20 sm:py-28"
      >
        <div
          className="
            container-page
            grid
            items-center
            gap-12
            lg:grid-cols-12
            lg:gap-16
          "
        >
          {/* LEFT — DIRECT PATH IMAGE */}

          <div className="lg:col-span-5">
            <Reveal variant="image">
              <div
                className="
                  relative
                  aspect-[4/5]
                  w-full
                  overflow-hidden
                  rounded-[28px]
                "
              >
           <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px]">
  <Image
    src="/images/about-alain.jpg"
    alt="Alain Martinos between Lebanon and Germany"
    fill
    sizes="(max-width: 1024px) 100vw, 40vw"
    className="
      object-cover
      object-center
      transition-transform
      duration-[1400ms]
      ease-out
      hover:scale-[1.03]
    "
  />
</div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — TEXT */}

          <div className="lg:col-span-7">
            <ChapterHeading
              number={twoWorlds.number}
              title={twoWorlds.title}
            />

            <div className="mt-8">
              <Prose paragraphs={twoWorlds.paragraphs} />
            </div>

            <Reveal
              delay={200}
              className="
                mt-10
                border-l
                border-plum-500
                pl-6
              "
            >
              <p
                className="
                  font-sans
                  text-[0.65rem]
                  uppercase
                  tracking-wider2
                  text-plum-500
                "
              >
                He is
              </p>

              <ul
                className="
                  mt-3
                  font-serif
                  text-2xl
                  leading-snug
                  text-ink
                  sm:text-3xl
                "
              >
                {twoWorlds.identities!.map((identity) => (
                  <li key={identity}>
                    {identity}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-8">
              <Prose
                paragraphs={twoWorlds.closing!}
                delay={280}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INSPIRATION
      ===================================================== */}

      <section className="bg-plum-50/70 py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="text-center">
            <Divider className="mx-auto mb-8 max-w-xs" />

            <h2 className="text-display-lg font-medium">
              {a.inspiration.title}
            </h2>
          </Reveal>

          <ul
            className="
              mt-14
              grid
              gap-x-10
              gap-y-12
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {a.inspiration.items.map((it, i) => (
              <Reveal
                as="li"
                key={it.title}
                delay={i * 90}
                className="
                  border-t
                  border-plum-700
                  pt-5
                "
              >
                <h3 className="font-serif text-2xl font-medium leading-tight">
                  {it.title}
                </h3>

                <p className="mt-1 font-serif text-lg italic text-plum-500">
                  {it.sub}
                </p>

                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/75">
                  {it.desc}
                </p>
              </Reveal>
            ))}
          </ul>

          <div className="mx-auto mt-20 max-w-3xl text-center">
            <Reveal>
              <p className="text-[1.05rem] leading-[1.85] text-ink/80">
                {a.inspiration.resilience.lead}
              </p>
            </Reveal>

            <Reveal
              delay={150}
              className="
                mt-10
                space-y-2
                font-serif
                text-3xl
                font-medium
                leading-tight
                sm:text-4xl
              "
            >
              {a.inspiration.resilience.lines.map((line, i) => (
                <p
                  key={line}
                  className={
                    i ===
                    a.inspiration.resilience.lines.length - 1
                      ? "mt-6 italic text-plum-700"
                      : ""
                  }
                >
                  {line}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          THE MEANING
      ===================================================== */}

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <h2 className="text-display-lg font-medium">
                {a.meaning.title}
              </h2>

              <span
                aria-hidden="true"
                className="
                  mx-auto
                  mt-6
                  block
                  h-px
                  w-16
                  bg-plum-500
                "
              />
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-10 text-[1.05rem] leading-[1.85] text-ink/80">
                {a.meaning.lead}
              </p>
            </Reveal>

            <Reveal
              delay={180}
              className="
                mt-8
                font-serif
                text-2xl
                italic
                leading-relaxed
                text-plum-700
              "
            >
              {a.meaning.passions.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          <ul
            className="
              mx-auto
              mt-16
              grid
              max-w-5xl
              gap-8
              sm:grid-cols-2
            "
          >
            {a.meaning.arcs.map((arc, i) => (
              <Reveal
                as="li"
                key={arc.from}
                delay={i * 90}
                className="
                  border-t
                  border-plum-200
                  pt-5
                "
              >
                <p className="font-sans text-[0.68rem] uppercase tracking-wider2 text-plum-500">
                  {arc.from}
                </p>

                <p className="mt-2 font-serif text-2xl font-medium leading-snug">
                  {arc.to}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal
            className="
              mx-auto
              mt-16
              max-w-3xl
              text-center
              font-serif
              text-2xl
              leading-snug
              text-ink
              sm:text-3xl
            "
          >
            {a.meaning.closing.map((c) => (
              <p
                key={c}
                className="mt-3"
              >
                {c}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FINAL QUOTE
      ===================================================== */}

      <section
        className="
          silk-bg-dark
          relative
          overflow-hidden
          py-28
          text-center
          text-cream
          sm:py-40
        "
      >
        <div className="container-page">
          <Reveal>
            <Divider
              light
              className="mx-auto mb-12 max-w-xs"
            />

            <blockquote className="mx-auto max-w-4xl">
              {a.finalQuote.lines.map((line, i) => (
                <p
                  key={line}
                  className="
                    font-serif
                    text-3xl
                    font-medium
                    leading-tight
                    sm:text-5xl
                  "
                  style={{
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  {line}
                </p>
              ))}

              <footer
                className="
                  mt-10
                  font-sans
                  text-[0.72rem]
                  uppercase
                  tracking-[0.34em]
                  text-plum-200
                "
              >
                — {a.finalQuote.attribution}
              </footer>
            </blockquote>

            <Divider
              light
              className="mx-auto mt-12 max-w-xs"
            />

            <div className="mt-12">
              <Button
                href="/contact"
                variant="light"
                size="lg"
              >
                {a.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      {/* SEO STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
    </>
  );
}
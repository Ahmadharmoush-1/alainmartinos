import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { getContent } from "@/lib/i18n";
import { alainImages } from "@/lib/images";
import { SITE_URL } from "@/lib/site";

const a = getContent().alain;

export const metadata: Metadata = {
  title: `${a.title} – Hairdresser, Visagist, Singer & Collector`,
  description: a.description,
  alternates: {
    canonical: "/alain-martinos",
  },
  openGraph: {
    title: `${a.title} | Salon Alain Martinos`,
    description: a.description,
    url: "/alain-martinos",
    type: "profile",
  },
};

const portrait = alainImages[0];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/alain-martinos#person`,
  name: "Alain Martinos",
  jobTitle: "Hairdresser & Visagist",
  description: a.description,
  nationality: ["Lebanese", "German"],
  url: `${SITE_URL}/alain-martinos`,
  ...(portrait
    ? { image: new URL(portrait.src, SITE_URL).href }
    : {}),
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

const styles = {
  container: "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
  section: "py-16 sm:py-20 lg:py-24",
  heading:
    "font-serif text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.5rem] lg:text-[3.25rem]",
  prose: "space-y-5 text-lg leading-8 sm:text-xl",
  button:
    "inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border border-[#7028B5] bg-[#7028B5] px-7 py-3.5 text-center text-base font-bold leading-6 text-white shadow-sm transition-colors hover:border-[#571D90] hover:bg-[#571D90] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7028B5] motion-reduce:transition-none sm:text-lg",
};

type Chapter = {
  id: string;
  number: string;
  title: string;
  paragraphs: readonly string[];
  quote?: string;
  lenses?: readonly {
    role: string;
    what: string;
  }[];
  identities?: readonly string[];
  closing?: readonly string[];
};

type Portrait = {
  src: string;
  alt: string;
};

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={`h-5 w-5 shrink-0 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h16m-6-6 6 6-6 6"
      />
    </svg>
  );
}

function ContactButton({ label }: { label: string }) {
  return (
    <Link href="/contact" className={styles.button}>
      {label}
      <Arrow />
    </Link>
  );
}

function Prose({
  paragraphs,
  dark = false,
}: {
  paragraphs: readonly string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`${styles.prose} ${
        dark ? "text-white/90" : "text-[#6527A7]"
      }`}
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

function Photo({
  image,
  priority = false,
  square = false,
}: {
  image: Portrait;
  priority?: boolean;
  square?: boolean;
}) {
  return (
    <div
      className={`
        relative mx-auto w-full max-w-lg overflow-hidden
        rounded-[2rem] bg-[#D5B7F1]
        ${square ? "aspect-square" : "aspect-[4/5]"}
      `}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 90vw, 42vw"
        className="object-cover object-center"
      />
    </div>
  );
}

function PullQuote({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <blockquote
      className={`
        border-l-2 pl-5 font-serif text-[1.625rem]
        italic leading-snug sm:pl-6 sm:text-[2rem]
        ${
          dark
            ? "border-white/50 !text-white"
            : "border-[#A774D1] !text-[#6527A7]"
        }
      `}
    >
      “{text}”
    </blockquote>
  );
}

function ChapterSection({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const dark = index % 2 === 1;

  // Chapter II: singer — no image.
  // Chapter III: Barbie collector — dedicated collection photograph.
  const image: Portrait | undefined =
    index === 0
      ? {
          src: "/images/alain-intro.jpg",
          alt: "Alain Martinos",
        }
      : index === 2
        ? {
            src: "/images/alain-04.jpg",
            alt: "Alain Martinos’s Barbie collection",
          }
        : index === 4
          ? {
              src: "/images/about-alain.jpg",
              alt: "Alain Martinos between Lebanon and Germany",
            }
          : undefined;

  const hasLenses = Boolean(chapter.lenses?.length);
  const hasAside = Boolean(image || hasLenses);

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      className={`
        scroll-mt-28 border-t ${styles.section}
        ${
          dark
            ? "border-[#7040AD] bg-gradient-to-br from-[#51218A] via-[#662BA5] to-[#7436B5] text-white"
            : "border-[#C7A6EB] bg-gradient-to-br from-[#E6D5FA] to-[#D5B7F1] text-[#6527A7]"
        }
      `}
    >
      <div className={styles.container}>
        <div
          className={`
            grid gap-9 lg:gap-14
            ${
              hasAside
                ? "lg:grid-cols-12 lg:items-start"
                : "mx-auto max-w-3xl"
            }
          `}
        >
          {/* Chapter text */}
          <div
            className={`
              min-w-0
              ${hasAside ? "lg:col-span-7" : ""}
              ${image && index % 2 === 1 ? "lg:order-2" : ""}
            `}
          >
            <header>
              <p
                className={`
                  mb-4 text-sm font-bold uppercase tracking-[0.18em]
                  ${dark ? "text-white/80" : "text-[#6527A7]"}
                `}
              >
                <span className="sr-only">Chapter </span>
                {chapter.number}
              </p>

              <h2
                id={`${chapter.id}-heading`}
                className={`
                  ${styles.heading}
                  ${dark ? "!text-white" : "!text-[#6527A7]"}
                `}
              >
                {chapter.title}
              </h2>

              <span
                aria-hidden="true"
                className={`
                  mt-6 block h-px w-14
                  ${dark ? "bg-white/50" : "bg-[#A774D1]"}
                `}
              />
            </header>

            <div className="mt-7">
              <Prose paragraphs={chapter.paragraphs} dark={dark} />
            </div>

            {Boolean(chapter.identities?.length) && (
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#6527A7] to-[#7C3ABD] p-6 text-white sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/80">
                  He is
                </p>

                <ul className="mt-5 space-y-3 font-serif text-[1.625rem] font-semibold leading-tight text-white sm:text-[2rem]">
                  {chapter.identities?.map((identity) => (
                    <li key={identity}>{identity}</li>
                  ))}
                </ul>
              </div>
            )}

            {Boolean(chapter.closing?.length) && (
              <div className="mt-7">
                <Prose
                  paragraphs={chapter.closing ?? []}
                  dark={dark}
                />
              </div>
            )}

            {/* Singer quote stays below the text */}
            {chapter.quote && !image && (
              <div className="mt-8">
                <PullQuote text={chapter.quote} dark={dark} />
              </div>
            )}
          </div>

          {/* Chapter image / supporting content */}
          {hasAside && (
            <div
              className={`
                min-w-0 lg:col-span-5
                ${image && index % 2 === 1 ? "lg:order-1" : ""}
              `}
            >
              {image && <Photo image={image} />}

              {image && chapter.quote && (
                <div className="mt-7">
                  <PullQuote text={chapter.quote} dark={dark} />
                </div>
              )}

              {hasLenses && (
                <dl
                  className={`
                    divide-y rounded-3xl border px-6 sm:px-8
                    ${
                      dark
                        ? "divide-white/20 border-white/20 bg-white/10"
                        : "divide-[#C7A6EB] border-[#C7A6EB] bg-[#E4CFF8]"
                    }
                  `}
                >
                  {chapter.lenses?.map((lens) => (
                    <div key={lens.role} className="py-6">
                      <dt
                        className={`
                          font-serif text-[1.625rem]
                          font-semibold leading-tight
                          ${dark ? "!text-white" : "!text-[#6527A7]"}
                        `}
                      >
                        {lens.role}
                      </dt>

                      <dd
                        className={`
                          mt-3 text-lg leading-7
                          ${dark ? "text-white/90" : "text-[#6527A7]"}
                        `}
                      >
                        {lens.what}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AlainPage() {
  return (
    <div className="min-w-0 break-words bg-[#F1E7FC] !text-[#6527A7]">
      {/* Masthead */}
      <section
        aria-labelledby="alain-heading"
        className="
          relative isolate overflow-hidden bg-[#D7B7F3]
          pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pt-36
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-20
            bg-[url('/images/footer-bg.jpg')] bg-cover bg-center
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-10 bg-gradient-to-r
            from-[#E6D5FA]/95 via-[#D7B7F3]/90 to-[#BB8BE4]/90
          "
        />

        <div
          className={`
            ${styles.container}
            grid items-center gap-10 lg:grid-cols-12 lg:gap-16
          `}
        >
          <div className="min-w-0 lg:col-span-7">
            <h1
              id="alain-heading"
              className="
                mt-5 break-words font-serif text-[3.25rem]
                font-semibold leading-[1.08] tracking-tight
                !text-[#6527A7] sm:text-[4rem] lg:text-[4.75rem]
              "
            >
              {a.heading}
            </h1>

            <ul
              aria-label="Roles"
              className="mt-7 flex flex-wrap gap-2.5"
            >
              {a.roles.map((role) => (
                <li
                  key={role}
                  className="
                    rounded-full border border-[#B58ADC]
                    bg-[#EBDDFA] px-4 py-2
                    text-base font-medium text-[#6527A7]
                  "
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ContactButton label={a.cta} />
            </div>
          </div>

          {portrait && (
            <div className="lg:col-span-5">
              <Photo image={portrait} priority />
            </div>
          )}
        </div>
      </section>

      {/* Chapter navigation */}
      <nav
        aria-label="Biography chapters"
        className="border-y border-[#B58ADC] bg-[#DCC2F5]"
      >
        <ol
          className={`
            ${styles.container}
            grid gap-2 py-5 sm:grid-cols-2 lg:grid-cols-3
          `}
        >
          {a.chapters.map((chapter) => (
            <li key={chapter.id} className="min-w-0">
              <a
                href={`#${chapter.id}`}
                className="
                  flex min-h-[48px] items-center gap-3
                  rounded-xl px-3 py-3 text-base font-medium
                  leading-6 text-[#6527A7] transition-colors
                  hover:bg-[#C9A2EB]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#7028B5]
                  motion-reduce:transition-none
                "
              >
                <span className="w-9 shrink-0 text-sm font-bold text-[#6527A7]">
                  {chapter.number}
                </span>

                {chapter.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Introduction */}
      <section
        aria-label="Introduction"
        className={`
          ${styles.section}
          [&_p]:!text-[#6527A7]
          [&_strong]:!text-[#6527A7]
          [&_em]:!text-[#6527A7]
        `}
      >
        <div className={`${styles.container} max-w-4xl`}>
          <Prose paragraphs={[a.intro]} />

          <blockquote
            className="
              my-9 rounded-3xl border border-[#7439B3]
              bg-gradient-to-br from-[#6527A7] to-[#7938BB]
              px-6 py-8 text-center font-serif text-[2rem]
              italic leading-snug !text-white
              sm:px-10 sm:py-10 sm:text-[2.5rem]
            "
          >
            “{a.thesis}”
          </blockquote>

          <Prose paragraphs={[a.introAfter]} />
        </div>
      </section>

      {/* Biography chapters */}
      {a.chapters.map((chapter, index) => (
        <ChapterSection
          key={chapter.id}
          chapter={chapter}
          index={index}
        />
      ))}

      {/* Inspiration */}
      <section
        aria-labelledby="inspiration-heading"
        className={`
          border-t border-[#C7A6EB] bg-[#DDC3F5]
          ${styles.section}
          !text-[#6527A7]
          [&_h2]:!text-[#6527A7]
          [&_h3]:!text-[#6527A7]
          [&_p]:!text-[#6527A7]
          [&_li]:!text-[#6527A7]
          [&_span]:!text-[#6527A7]
          [&_strong]:!text-[#6527A7]
        `}
      >
        <div className={styles.container}>
          <h2
            id="inspiration-heading"
            className={`
              ${styles.heading}
              mx-auto max-w-3xl text-center !text-[#6527A7]
            `}
          >
            {a.inspiration.title}
          </h2>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {a.inspiration.items.map((item, index) => (
              <li
                key={item.title}
                className="
                  group min-w-0 rounded-3xl
                  border border-[#BE94E5]
                  bg-gradient-to-br from-[#F1E4FB]
                  via-[#E7D2F7] to-[#DDC3F5]
                  p-6 !text-[#6527A7]
                  shadow-[0_12px_35px_rgba(101,39,167,0.08)]
                  transition-all duration-500
                  hover:-translate-y-1 hover:border-[#A977D5]
                  hover:shadow-[0_20px_45px_rgba(101,39,167,0.14)]
                  sm:p-7 [&_*]:!text-[#6527A7]
                "
              >
                <span
                  aria-hidden="true"
                  className="!text-sm !font-bold tracking-widest !text-[#6527A7]/70"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-6 font-serif !text-[1.625rem] !font-semibold !leading-tight !text-[#6527A7]">
                  {item.title}
                </h3>

                <p className="mt-3 font-serif !text-2xl italic !leading-snug !text-[#6527A7]">
                  {item.sub}
                </p>

                <p className="mt-5 !text-lg !font-medium !leading-7 !text-[#6527A7]">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>

          {/* Resilience */}
          <div className="mx-auto mt-12 max-w-3xl text-center lg:mt-16 [&_p]:!text-[#6527A7]">
            <p className="!text-lg !font-medium !leading-8 !text-[#6527A7] sm:!text-xl">
              {a.inspiration.resilience.lead}
            </p>

            <div
              className="
                mt-7 space-y-3 font-serif !text-[1.625rem]
                !font-semibold !leading-snug !text-[#6527A7]
                sm:!text-[2rem] [&_p]:!text-[#6527A7]
              "
            >
              {a.inspiration.resilience.lines.map((line, index) => (
                <p
                  key={line}
                  className={`
                    !text-[#6527A7]
                    ${
                      index === a.inspiration.resilience.lines.length - 1
                        ? "italic"
                        : ""
                    }
                  `}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meaning */}
      <section
        aria-labelledby="meaning-heading"
        className={`
          ${styles.section}
          !text-[#6527A7]
          [&_h2]:!text-[#6527A7]
          [&_p]:!text-[#6527A7]
          [&_li]:!text-[#6527A7]
          [&_span]:!text-[#6527A7]
          [&_strong]:!text-[#6527A7]
          [&_svg]:!text-[#6527A7]
        `}
      >
        <div className={styles.container}>
          <div className="mx-auto max-w-3xl">
            <h2
              id="meaning-heading"
              className={`${styles.heading} text-center !text-[#6527A7]`}
            >
              {a.meaning.title}
            </h2>

            <p className="mt-7 !text-lg !font-medium !leading-8 !text-[#6527A7] sm:!text-xl">
              {a.meaning.lead}
            </p>

            <ul
              className="
                mt-7 space-y-3 border-l-2 border-[#C7A6EB]
                pl-6 font-serif !text-[1.625rem]
                !text-[#6527A7] italic leading-snug
                sm:!text-[2rem] [&_li]:!text-[#6527A7]
              "
            >
              {a.meaning.passions.map((passion) => (
                <li key={passion} className="!text-[#6527A7]">
                  {passion}
                </li>
              ))}
            </ul>
          </div>

          {/* Meaning cards */}
          <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {a.meaning.arcs.map((arc) => (
              <li
                key={arc.from}
                className="
                  rounded-3xl border border-[#BE94E5]
                  bg-[#DDC3F5] p-6 !text-[#6527A7]
                  sm:p-8 [&_*]:!text-[#6527A7]
                "
              >
                <p className="!text-sm !font-bold uppercase !leading-6 tracking-[0.14em] !text-[#6527A7]">
                  {arc.from}
                </p>

                <Arrow className="my-4 !text-[#6527A7]" />

                <p className="font-serif !text-[1.625rem] !font-semibold !leading-snug !text-[#6527A7] sm:!text-[2rem]">
                  {arc.to}
                </p>
              </li>
            ))}
          </ul>

          <div
            className="
              mx-auto mt-10 max-w-3xl space-y-4
              text-center font-serif !text-[1.625rem]
              !text-[#6527A7] leading-snug
              sm:!text-[2rem] [&_p]:!text-[#6527A7]
            "
          >
            {a.meaning.closing.map((line) => (
              <p key={line} className="!text-[#6527A7]">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section
        aria-label="A personal reflection"
        className={`
          border-t border-[#B58ADC] bg-gradient-to-br
          from-[#D5B5F2] via-[#DFC4F8] to-[#C59AE9]
          ${styles.section}
        `}
      >
        <div className={`${styles.container} text-center`}>
          <figure className="mx-auto max-w-4xl">
            <blockquote
              className="
                space-y-3 font-serif text-[2rem]
                font-semibold leading-tight tracking-tight
                !text-[#6527A7] [&_p]:!text-[#6527A7]
                sm:text-[2.5rem] lg:text-[3.25rem]
              "
            >
              {a.finalQuote.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </blockquote>

            <figcaption className="mt-7 text-sm font-bold uppercase leading-6 tracking-[0.18em] text-[#6527A7]">
              — {a.finalQuote.attribution}
            </figcaption>
          </figure>

          <div className="mt-9">
            <ContactButton label={a.cta} />
          </div>
        </div>
      </section>

      {/* Shared CTA */}
      <div
        className="
          [&_a]:!border-[#7028B5]
          [&_a]:!bg-[#7028B5]
          [&_a]:!text-white
          [&_a:hover]:!bg-[#571D90]
          [&_a_span]:!text-white
          [&_button]:!border-[#7028B5]
          [&_button]:!bg-[#7028B5]
          [&_button]:!text-white
          [&_button:hover]:!bg-[#571D90]
          [&_button_span]:!text-white
        "
      >
        <CtaBand />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
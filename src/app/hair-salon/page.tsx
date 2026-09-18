import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { getContent } from "@/lib/i18n";
import { salonImages } from "@/lib/images";
import { site } from "@/lib/site";

const s = getContent().salon;

export const metadata: Metadata = {
  title: `${s.title} – Zouk Mikael, Jounieh & Germany`,
  description: s.description,
  alternates: {
    canonical: "/hair-salon",
  },
  openGraph: {
    title: `${s.title} | Salon Alain Martinos`,
    description: s.description,
    url: "/hair-salon",
  },
};

const styles = {
  container: "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",

  section: "py-14 sm:py-20 lg:py-24",

  heading:
    "font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl",

  button:
    "group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#7028B5] bg-[#7028B5] px-7 py-3.5 text-center text-lg font-semibold leading-7 text-white shadow-sm transition-colors hover:border-[#571D90] hover:bg-[#571D90] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7028B5] motion-reduce:transition-none",

  locationButton:
    "group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#7028B5] !bg-[#7028B5] px-5 py-2.5 !text-sm font-semibold !text-white transition-colors hover:!bg-[#571D90] hover:border-[#571D90] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7028B5] motion-reduce:transition-none [&_svg]:!text-white",
};

type Rotation = 0 | 90 | -90 | 180;

const salonImageRotation: readonly Rotation[] = [
  90,
  90,
  -90,
  0,
  -90,
  -90,
];

const galleryLayout = [
  "aspect-[4/3] md:col-span-2 lg:col-span-8 lg:aspect-[16/11]",
  "aspect-[4/3] lg:col-span-4 lg:aspect-auto",
  "aspect-[4/3] lg:col-span-4 lg:aspect-[4/5]",
  "aspect-[4/3] lg:col-span-4 lg:aspect-[4/5]",
  "aspect-[4/3] md:col-span-2 lg:col-span-4 lg:aspect-[4/5]",
  "aspect-[16/10] md:col-span-2 lg:col-span-12 sm:aspect-[21/9]",
];

const motionStyles = `
  @keyframes salon-page-enter {
    from {
      opacity: 0;
      transform: translateY(16px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .salon-page .salon-hero-enter {
    animation: salon-page-enter 700ms ease-out both;
  }

  @media (prefers-reduced-motion: reduce) {
    .salon-page .salon-hero-enter,
    .salon-page .salon-reveal {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      visibility: visible !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

const ctaTheme = `
  bg-[#5C2398] text-white
  [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white
  [&_h2]:!text-3xl [&_h2]:!font-semibold [&_h2]:!leading-tight
  sm:[&_h2]:!text-4xl lg:[&_h2]:!text-5xl
  [&_p]:!text-lg [&_p]:!leading-8 [&_p]:!text-white
  sm:[&_p]:!text-xl
  [&_span]:!text-white [&_strong]:!text-white [&_em]:!text-white
  [&_a]:!min-h-[52px] [&_a]:!rounded-full
  [&_a]:!border-[#7028B5] [&_a]:!bg-[#7028B5]
  [&_a]:!text-lg [&_a]:!text-white [&_a_*]:!text-white
  [&_a:hover]:!bg-[#571D90]
  [&_button]:!border-[#7028B5] [&_button]:!bg-[#7028B5]
  [&_button]:!text-white [&_button_*]:!text-white
  [&_button:hover]:!bg-[#571D90]
`;

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`
        h-5 w-5 shrink-0
        ${
          down
            ? "rotate-90"
            : "motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        }
      `}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h16m-6-6 6 6-6 6"
      />
    </svg>
  );
}

function MapPin() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function SectionHeading({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <Reveal className="salon-reveal mx-auto max-w-3xl text-center">
      <h2
        id={id}
        className={`${styles.heading} text-[#6527A7]`}
      >
        {title}
      </h2>

      <span
        aria-hidden="true"
        className="mx-auto mt-6 block h-px w-16 bg-[#A774D1]"
      />
    </Reveal>
  );
}

function GalleryTile({
  src,
  alt,
  index,
  total,
  rotation,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  rotation: Rotation;
}) {
  const isSideways = rotation === 90 || rotation === -90;

  const wrapperStyle: CSSProperties = isSideways
    ? {
        width: "100cqh",
        height: "100cqw",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }
    : {
        inset: 0,
        transform: rotation === 180 ? "rotate(180deg)" : undefined,
      };

  const sizes =
    index === 5
      ? "(max-width: 1280px) 90vw, 1184px"
      : index === 0
        ? "(max-width: 1024px) 90vw, (max-width: 1280px) 60vw, 780px"
        : "(max-width: 768px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 380px";

  return (
    <figure
      className="
        group absolute inset-0 m-0 overflow-hidden
        rounded-3xl bg-[#D5B7F1]
        ring-1 ring-inset ring-[#A774D1]/40
      "
      style={{ containerType: "size" }}
    >
      <div className="absolute" style={wrapperStyle}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="
            object-cover object-center
            motion-safe:transition-transform
            motion-safe:duration-700
            motion-safe:group-hover:scale-[1.04]
          "
        />
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-t from-[#481B76]/95
          via-transparent to-transparent
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute left-4 top-4 rounded-full bg-[#6527A7]
          px-3 py-1.5 text-sm font-semibold
          tracking-[0.12em] text-white
          sm:left-5 sm:top-5
        "
      >
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </span>

      <figcaption
        className="
          absolute inset-x-4 bottom-4 font-serif
          text-xl font-semibold leading-snug text-white
          sm:inset-x-5 sm:bottom-5 sm:text-2xl
        "
      >
        {alt}
      </figcaption>
    </figure>
  );
}

export default function HairSalonPage() {
  return (
    <div className="salon-page min-w-0 break-words bg-[#F1E7FC] text-[#6527A7]">
      <style>{motionStyles}</style>

      {/* HERO */}
      <section
        aria-labelledby="salon-heading"
        className="
          relative isolate overflow-hidden bg-[#DCC2F5]
          pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36
        "
      >
        <Image
          src="/images/footer-bg-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-10 bg-gradient-to-br
            from-[#E6D5FA]/95 via-[#DCC2F5]/90 to-[#C59AE9]/90
          "
        />

        <div
          className={`${styles.container} salon-hero-enter text-center`}
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6527A7]">
            {s.title}
          </p>

          <h1
            id="salon-heading"
            className="
              mx-auto mt-5 max-w-4xl font-serif
              text-4xl font-semibold leading-tight tracking-tight
              text-[#6527A7] sm:text-5xl lg:text-6xl
            "
          >
            {s.heading}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6527A7] sm:text-xl">
            {s.subtitle}
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contact" className={styles.button}>
              Book an appointment
              <Arrow />
            </Link>

            <a href="#salon-gallery" className={styles.button}>
              Explore the salon
              <Arrow down />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        aria-label="About the salon"
        className={styles.section}
      >
        <div
          className={`
            ${styles.container}
            grid items-start gap-8 lg:grid-cols-12 lg:gap-12
          `}
        >
          <Reveal
            className="
              salon-reveal rounded-[2rem]
              bg-gradient-to-br from-[#5C2398] to-[#7938BB]
              p-7 sm:p-9 lg:col-span-5
            "
          >
            <blockquote className="font-serif text-3xl italic leading-snug text-white sm:text-4xl">
              “{s.pullQuote}”
            </blockquote>

            <span
              aria-hidden="true"
              className="mt-7 block h-px w-16 bg-white/50"
            />
          </Reveal>

          <Reveal
            delay={100}
            className="
              salon-reveal space-y-5 text-lg leading-8
              text-[#6527A7] sm:text-xl sm:leading-9
              lg:col-span-7 lg:pt-3
            "
          >
            {s.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        aria-labelledby="experience-heading"
        className={`
          border-y border-[#C7A6EB] bg-[#DDC3F5]
          ${styles.section}
        `}
      >
        <div className={styles.container}>
          <SectionHeading
            id="experience-heading"
            title={s.experience.title}
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {s.experience.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                delay={Math.min(index * 70, 210)}
                className="
                  salon-reveal min-w-0 rounded-3xl
                  border border-[#BE94E5] bg-[#F1E7FC]
                  p-6 sm:p-7
                  motion-safe:transition-shadow
                  motion-safe:duration-300 hover:shadow-lg
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    inline-flex h-11 w-11 items-center
                    justify-center rounded-full bg-[#7028B5]
                    text-base font-semibold text-white
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-[#6527A7] sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-lg leading-8 text-[#6527A7]">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="salon-gallery"
        aria-labelledby="gallery-heading"
        className={`
          scroll-mt-24 bg-gradient-to-br
          from-[#E4CFF8] to-[#D0ACEF]
          ${styles.section}
        `}
      >
        <div className={styles.container}>
          <SectionHeading
            id="gallery-heading"
            title={s.galleryTitle}
          />

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:gap-6">
            {salonImages.map((image, index) => (
              <Reveal
                key={image.src}
                delay={Math.min(index * 60, 240)}
                className={`
                  salon-reveal relative min-h-0 min-w-0
                  ${
                    galleryLayout[index] ??
                    "aspect-[4/3] lg:col-span-4 lg:aspect-[4/5]"
                  }
                `}
              >
                <GalleryTile
                  src={image.src}
                  alt={image.alt}
                  index={index}
                  total={salonImages.length}
                  rotation={salonImageRotation[index] ?? 0}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPACT LOCATIONS */}
     <section
  aria-labelledby="locations-heading"
  className="
    relative overflow-hidden border-t border-[#C7A6EB]/70
    bg-gradient-to-br from-[#EDE0F8] via-[#E5D2F4] to-[#DCC3EF]
    py-12 sm:py-16
  "
>
  {/* Background decoration */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none absolute -right-24 -top-24
      h-80 w-80 rounded-full bg-white/30 blur-3xl
    "
  />

  <div className={`${styles.container} relative`}>
    <div className="mx-auto max-w-5xl">
      {/* Section heading */}
      <Reveal className="salon-reveal">
        <div className="mb-7 sm:mb-8">
          <p
            className="
              mb-3 text-xs font-bold uppercase
              tracking-[0.22em] text-[#7938A7]
            "
          >
            Visit Salon Alain Martinos
          </p>

          <div className="flex items-center gap-5">
            <h2
              id="locations-heading"
              className="
                font-serif text-3xl font-semibold
                leading-tight tracking-tight text-[#542180]
                sm:text-4xl
              "
            >
              {s.locationsTitle}
            </h2>

            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-[#A774D1]/40 sm:block"
            />
          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B557B] sm:text-base">
            Find your salon, plan your visit, and let us take care
            of your next look.
          </p>
        </div>
      </Reveal>

      {/* Location cards */}
      <div
        className={`
          grid items-stretch gap-5 sm:gap-6
          ${
            site.locations.length === 1
              ? "mx-auto max-w-xl"
              : "md:grid-cols-2"
          }
        `}
      >
        {site.locations.map((location, index) => (
          <Reveal
            key={location.id}
            delay={Math.min(index * 80, 240)}
            className="salon-reveal min-w-0"
          >
            <article
              className="
                flex h-full flex-col overflow-hidden
                rounded-2xl border border-white/70
                bg-[#FFFCFF]
                shadow-[0_8px_30px_rgba(76,26,72,0.08)]
              "
            >
              {/* Location photograph */}
              <div className="relative h-48 overflow-hidden bg-[#CDB0E3] sm:h-52">
                <Image
                  src={`/images/locations.jpg`}
                  alt={`Salon Alain location in ${location.country}`}
                  fill
                  sizes={
                    site.locations.length === 1
                      ? "(max-width: 640px) 90vw, 576px"
                      : "(max-width: 768px) 90vw, 500px"
                  }
                  className="object-cover object-center"
                />

                {/* Contrast for text over the photograph */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0 bg-gradient-to-t
                    from-[#29123F]/90 via-[#29123F]/15 to-transparent
                  "
                />

                <span
                  className="
                    absolute left-4 top-4 rounded-full
                    border border-white/30 bg-[#351547]/60
                    px-3 py-1.5 text-[10px] font-bold uppercase
                    tracking-[0.18em] text-white backdrop-blur-sm
                  "
                >
                  Salon Alain Martinos Hair &amp; Beauty
                </span>

                <div className="absolute inset-x-5 bottom-5 flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10 shrink-0 items-center
                      justify-center rounded-xl border border-white/30
                      bg-white/15 text-white backdrop-blur-sm
                    "
                  >
                    <MapPin />
                  </div>

                  <h3
                    className="
                      font-serif text-2xl font-semibold
                      leading-tight !text-white sm:text-3xl
                    "
                  >
                    {location.country}
                  </h3>
                </div>
              </div>

              {/* Location information */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div>
                  <p
                    className="
                      text-[10px] font-bold uppercase
                      tracking-[0.18em] text-[#8A699E]
                    "
                  >
                    Find us
                  </p>

                  <address className="mt-2 text-sm not-italic leading-6 text-[#51415D]">
                    {location.addressLines.map((line, lineIndex) => (
                      <span key={lineIndex} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap gap-3 border-t border-[#EDE3F3] pt-5">
                    {location.mapLink && (
                      <a
                        href={location.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to our ${location.country} salon on Google Maps (opens in a new tab)`}
                        className="
                          inline-flex min-h-[44px] items-center
                          justify-center gap-2 rounded-full
                          !bg-[#7028B5] px-5 py-2.5
                          text-sm font-semibold !text-white
                          transition-colors hover:!bg-[#571D90]
                          focus-visible:outline focus-visible:outline-2
                          focus-visible:outline-offset-4
                          focus-visible:outline-[#7028B5]
                        "
                      >
                        Get directions

                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17 17 7M7 7h10v10"
                          />
                        </svg>
                      </a>
                    )}

                    <Link
                      href="/contact"
                      className="
                        inline-flex min-h-[44px] items-center
                        justify-center gap-2 rounded-full
                        !bg-[#7028B5] px-5 py-2.5
                        text-sm font-semibold !text-white
                        transition-colors hover:!bg-[#571D90]
                        focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-[#7028B5]
                      "
                    >
                      Book a visit

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14m-5-5 5 5-5 5"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* CTA */}
      <div className={ctaTheme}>
        <CtaBand />
      </div>
    </div>
  );
}s
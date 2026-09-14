import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LocationCard } from "@/components/LocationCard";
import { SectionTitle } from "@/components/SectionTitle";
import { CtaBand } from "@/components/CtaBand";

import { getContent } from "@/lib/i18n";
import { heroImages, salonImages } from "@/lib/images";
import { site } from "@/lib/site";

const t = getContent();
const s = t.salon;

export const metadata: Metadata = {
  title: `${s.title} – Zouk Mikael, Jounieh & Germany`,
  description: s.description,
  alternates: {
    canonical: "/hair-salon",
  },
  openGraph: {
    title: `${s.title} | Salon Alain`,
    description: s.description,
    url: "/hair-salon",
  },
};

/* -------------------------------------------------------------------------- */
/*  GALLERY CONFIG                                                             */
/* -------------------------------------------------------------------------- */

/*
  Rotation per image (in order of `salonImages`).

  0    = as-is
  90   = rotate right
  -90  = rotate left
  180  = flip upside down
*/
const salonImageRotation: Array<0 | 90 | -90 | 180> = [
  90, // image 1
  90, // image 2
  -90, // image 3
  0, // image 4
  -90, // image 5
  -90, // image 6
];

/*
  Editorial layout on a 12‑column grid (lg and up):

  ┌────────────────────────┬────────────┐
  │        01 (feature)    │     02     │
  ├────────┬───────┬───────┴────────────┤
  │   03   │   04  │         05         │
  ├────────┴───────┴────────────────────┤
  │            06 (cinematic)           │
  └─────────────────────────────────────┘
*/
const galleryLayout = [
  "md:col-span-2 lg:col-span-8 aspect-[4/3] lg:aspect-[16/11]",
  "lg:col-span-4 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-4 aspect-[4/5]",
  "lg:col-span-4 aspect-[4/5]",
  "md:col-span-2 lg:col-span-4 aspect-[4/3] lg:aspect-[4/5]",
  "md:col-span-2 lg:col-span-12 aspect-[16/10] sm:aspect-[21/9]",
];

/* -------------------------------------------------------------------------- */
/*  GALLERY TILE                                                               */
/* -------------------------------------------------------------------------- */

type GalleryTileProps = {
  src: string;
  alt: string;
  index: number;
  total: number;
  rotation: 0 | 90 | -90 | 180;
  className?: string;
  priority?: boolean;
};

function GalleryTile({
  src,
  alt,
  index,
  total,
  rotation,
  className = "",
  priority = false,
}: GalleryTileProps) {
  const isSideways = rotation === 90 || rotation === -90;

  /*
    For ±90° we swap the box: the inner wrapper is as wide as the tile is
    tall and as tall as the tile is wide (container‑query units), then we
    rotate it. object-cover then fills the frame exactly – no guessed scale.
  */
  const wrapperStyle: React.CSSProperties = isSideways
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

  const number = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <figure className={`group relative m-0 ${className}`}>
      {/* Frame */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[22px] bg-plum-100"
        style={{ containerType: "size" }}
      >
        <div className="absolute" style={wrapperStyle}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
            className="object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.06]"
          />
        </div>

        {/* Tonal grade – keeps whites soft, adds depth at the base */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-900/35 via-plum-900/0 to-plum-900/0 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Fine inset border */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/15" />

        {/* Corner index */}
        <span className="pointer-events-none absolute left-5 top-5 font-serif text-[11px] tracking-[0.28em] text-white/85">
          {number} / {count}
        </span>

        {/* Caption reveals on hover */}
        <figcaption className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 translate-y-2 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="max-w-[80%] font-serif text-[15px] italic leading-snug text-white/95">
            {alt}
          </span>
          <span className="h-px flex-1 bg-white/40" />
        </figcaption>
      </div>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function HairSalonPage() {
  return (
    <>
      {/* HERO */}
     <PageHero
  kicker={s.title}
  title={s.heading}
  subtitle={s.subtitle}
  image={{
    src: "/images/footer-bg.jpg",
    alt: "Salon Alain",
    width: 2000,
    height: 1200,
  }}
  variant="band"
/>

{/* INTRO */}
<section className="py-20 sm:py-28">
  <div className="container-page grid gap-12 lg:grid-cols-12">
    <Reveal className="lg:col-span-4">
      <p className="font-serif text-3xl font-medium leading-tight text-plum-700">
        “{s.pullQuote}”
      </p>
    </Reveal>

    <Reveal
      delay={120}
      className="space-y-5 text-[1.02rem] leading-[1.8] text-ink/80 lg:col-span-7 lg:col-start-6"
    >
      <p className="dropcap">{s.intro[0]}</p>
      <p>{s.intro[1]}</p>
    </Reveal>
  </div>
</section>

      {/* EXPERIENCE */}
      <section className="bg-plum-50/70 py-20 sm:py-28">
        <div className="container-page">
          <SectionTitle title={s.experience.title} align="center" />

          <ol className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {s.experience.items.map((it, i) => (
              <Reveal
                as="li"
                key={it.title}
                delay={i * 90}
                className="border-t border-plum-700 pt-5"
              >
                <span className="font-serif text-sm italic text-plum-500">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-2 font-serif text-2xl font-medium">
                  {it.title}
                </h3>

                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                  {it.desc}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* SALON GALLERY */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionTitle title={s.galleryTitle} align="center" />

          {/* Thin editorial rule under the title */}
          <div className="mx-auto mt-8 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-plum-200" />
            <span className="font-serif text-[11px] uppercase tracking-[0.32em] text-plum-500">
              Salon Alain
            </span>
            <span className="h-px flex-1 bg-plum-200" />
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:gap-6">
            {salonImages.map((image, index) => (
              <Reveal
                key={image.src}
                delay={index * 80}
                className={`${galleryLayout[index] ?? "lg:col-span-4 aspect-[4/5]"} min-h-0`}
              >
                <GalleryTile
                  src={image.src}
                  alt={image.alt}
                  index={index}
                  total={salonImages.length}
                  rotation={salonImageRotation[index] ?? 0}
                  className="h-full w-full"
                  priority={index === 0}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="border-t border-plum-200/70 py-20 sm:py-28">
        <div className="container-page">
          <SectionTitle title={s.locationsTitle} align="center" />

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            {site.locations.map((loc, i) => (
              <Reveal key={loc.id} delay={i * 100}>
                <LocationCard location={loc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
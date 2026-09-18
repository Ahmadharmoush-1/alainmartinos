import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";

import { getContent } from "@/lib/i18n";
import { heroImages, workImages } from "@/lib/images";
import { SITE_URL } from "@/lib/site";

const t = getContent();
const s = t.services.page;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: `${s.title} – Haircuts, Color, Balayage & Vanish Laser`,
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

/* =========================================================
   STRUCTURED DATA
========================================================= */

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

/* =========================================================
   SERVICE CATEGORY IMAGES
========================================================= */

const groupImages = [
  workImages[3],
  workImages[6],
  workImages[0],
  workImages[7],
  workImages[4],
  workImages[11],
];

/* =========================================================
   VANISH BODY AREAS
========================================================= */

const vanishAreas = [
  {
    name: "Face",
    image: "/images/vanish-face.jpg",
  },
  {
    name: "Underarms",
    image: "/images/vanish-arms.jpg",
  },
  {
    name: "Arms",
    image: "/images/vanish-arms-1.jpg",
  },
  {
    name: "Chest",
    image: "/images/vanish-chest.jpg",
  },
  {
    name: "Back",
    image: "/images/vanish-back.jpg",
  },
  {
    name: "Legs",
    image: "/images/vanish-legs.jpg",
  },
  // {
  //   name: "Bikini",
  //   image: "/images/vanish-bikini.jpg",
  // },
];

/* =========================================================
   PAGE
========================================================= */

export default function ServicesPage() {
  return (
    <main
      className="
        overflow-hidden
        bg-white
        text-plum-700

        [&_h1]:text-plum-700
        [&_h2]:text-plum-700
        [&_h3]:text-plum-700
        [&_h4]:text-plum-700

        [&_p]:text-plum-700
      "
    >
      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div
        className="
          [&_h1]:!text-5xl
          [&_h1]:!font-black
          [&_h1]:!leading-[1.02]

          sm:[&_h1]:!text-6xl
          lg:[&_h1]:!text-7xl

          [&_p]:!text-[1.15rem]
          [&_p]:!font-semibold

          sm:[&_p]:!text-[1.3rem]
        "
      >
        <PageHero
          kicker=""
          title={s.heading}
          
          image={heroImages.beautyLove}
          variant="band"
        />
      </div>

      {/* =====================================================
          VANISH
      ===================================================== */}

    <section
  id="vanish"
  className="
    relative scroll-mt-24 overflow-hidden
    bg-gradient-to-br from-[#fffafd] via-[#faeef8] to-[#eed9eb]
  "
>
  {/* Background decorations */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none absolute -right-32 -top-32
      h-[620px] w-[620px] rounded-full bg-white/35
    "
  />

  <div
    aria-hidden="true"
    className="
      pointer-events-none absolute -bottom-52 left-[35%]
      h-[600px] w-[600px] rounded-full bg-plum-300/15 blur-3xl
    "
  />

  <div
    className="
      container-page relative grid items-center gap-14 py-20
      lg:min-h-[700px] lg:grid-cols-12 lg:py-24
    "
  >
    {/* LEFT CONTENT */}
    <Reveal className="min-w-0 lg:col-span-5">
      <h2
        className="
          font-serif !text-4xl !font-black leading-[1.08]
          !text-plum-800 sm:!text-5xl lg:!text-5xl
        "
      >
        GOODBYE UNWANTED HAIR.
        <span className="mt-2 block">
          HELLO SMOOTH SKIN. 💜✨
        </span>
      </h2>

      <p
        className="
          mt-6 max-w-xl !text-[1.05rem] !font-medium
          leading-8 !text-plum-700/80
        "
      >
        Advanced laser hair removal at Salon Alain Martinos Hair &amp; Beauty
        with our UK-made machine.
      </p>

      <p className="mt-5 !text-base !font-bold leading-7 !text-plum-800">
        3 technologies • One professional hair removal treatment
        experience designed with your comfort in mind:
      </p>

      <ul className="mt-4 space-y-3 !text-base !font-bold !text-plum-800">
        <li>💜 Diode Laser</li>
        <li>💜 Alexandrite</li>
        <li>💜 Nd:YAG</li>
      </ul>

      <p
        className="
          mt-6 max-w-xl !text-[1.05rem] !font-medium
          leading-8 !text-plum-700/80
        "
      >
        Suitable for a wide range of skin tones, facial areas and
        body hair, for women &amp; men.
      </p>

      <p className="mt-4 !text-base !font-bold leading-7 !text-plum-800">
        And all this at very reasonable prices. ✨
      </p>

      <div className="mt-6 border-l-2 border-plum-400 pl-5">
        <p className="!text-base leading-8 !text-plum-700/80">
          At Alain Martinos Salon, experienced care and attention
          to detail make every treatment personal.
        </p>

        <p className="mt-2 !text-base leading-8 !text-plum-700/80">
          From targeted areas to full-body care, our treatments
          help reduce unwanted hair and simplify your beauty routine.
        </p>
      </div>

      {/* BUTTON */}
      <div className="mt-8">
        <Button
          href="/contact?service=Laser%20Hair%20Removal"
          size="lg"
          className="
            group !inline-flex !w-full !items-center !justify-center
            !rounded-full !bg-plum-700 !px-6 !py-4
            !text-base !font-black !text-white
            [&_*]:!text-white hover:!bg-plum-800
            sm:!w-auto sm:!px-8
          "
        >
          Book Your Consultation
          <span
            aria-hidden="true"
            className="
              ml-3 inline-block !text-white
              transition-transform duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </Button>
      </div>
    </Reveal>

    {/* RIGHT VISUAL */}
    <Reveal delay={150} className="relative min-w-0 lg:col-span-7">
  <div
    className="
      relative mx-auto w-full max-w-[760px]
      sm:min-h-[570px] lg:min-h-[650px]
    "
  >
    {/* Larger image on mobile */}
    <div
      className="
        relative z-10 h-[480px] w-full
        overflow-hidden rounded-3xl
        sm:absolute sm:bottom-0 sm:left-0
        sm:h-[92%] sm:w-[65%]
      "
    >
      <Image
        src="/images/vanish-machine.png"
        alt="Laser hair removal equipment at Salon Alain Martinos Hair & Beauty"
        fill
        priority
        sizes="(max-width: 640px) 95vw, (max-width: 1024px) 65vw, 40vw"
        className="rounded-3xl object-contain object-bottom"
      />
    </div>

    {/* Decorative text */}
    <div
      className="
        absolute right-5 top-0 z-30
        hidden -rotate-6 text-center sm:block
      "
    >
      <p
        className="
          font-serif !text-3xl !font-medium italic
          leading-tight !text-plum-800 lg:!text-4xl
        "
      >
        Smooth
        <br />
        Confidence
        <br />
        For Everyone
      </p>
    </div>

    {/* Treatment badge */}
    <div
      className="
        absolute right-0 top-[32%] z-30
        hidden h-28 w-28 items-center justify-center
        rounded-full bg-white/70 p-5 text-center
        shadow-sm backdrop-blur-md md:flex
      "
    >
      <p
        className="
          !text-[0.68rem] !font-black uppercase
          leading-5 tracking-[0.14em] !text-plum-600
        "
      >
        Face
        <br />
        &amp; Body
        <br />
        Treatments
      </p>
    </div>
  </div>
</Reveal>
  </div>
</section>

      {/* =====================================================
          VANISH BODY AREAS
      ===================================================== */}

      <section
        className="
          border-y
          border-plum-200/60

          bg-[#fffafd]

          py-16

          sm:py-20
        "
      >
        <div className="container-page">
          <Reveal className="text-center">
            <p
              className="
                !text-xs
                !font-black

                uppercase

                tracking-[0.28em]

                !text-plum-500
              "
            >
              Treatable Areas
            </p>

            <h2
              className="
                mt-3

                font-serif

                !text-4xl
                !font-black

                !text-plum-800

                sm:!text-5xl
              "
            >
              Smooth Skin, Everywhere
            </h2>

            <p
              className="
                mx-auto

                mt-4

                max-w-3xl

                !text-base
                !font-medium

                !text-plum-700/70

                sm:!text-lg
              "
            >
              Professional laser hair removal for the face and body, tailored
              for both women and men.
            </p>
          </Reveal>

          {/* BODY AREAS */}

          <div
            className="
              mt-10

              grid
              grid-cols-4

              gap-x-4
              gap-y-8

              sm:grid-cols-4
              lg:grid-cols-8
            "
          >
            {vanishAreas.map((area, i) => (
              <Reveal
                key={area.name}
                delay={i * 40}
              >
                <div className="text-center">
                  <div
                    className="
                      relative

                      mx-auto

                      aspect-square

                      w-full
                      max-w-[120px]

                      overflow-hidden

                      rounded-full

                      bg-plum-50
                    "
                  >
                    <Image
                      src={area.image}
                      alt={`${area.name} laser hair removal`}
                      fill
                      sizes="120px"
                      className="
                        object-cover

                        transition-transform
                        duration-700

                        hover:scale-105
                      "
                    />
                  </div>

                  <p
                    className="
                      mt-3

                      !text-sm
                      !font-black
                    "
                  >
                    {area.name}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* AND MORE */}

            <Reveal delay={300}>
              <div className="text-center">
                <div
                  className="
                    mx-auto

                    flex
                    aspect-square

                    w-full
                    max-w-[120px]

                    items-center
                    justify-center

                    rounded-full

                    bg-plum-100
                  "
                >
                  <span
                    className="
                      !text-3xl
                      !font-black

                      tracking-[0.15em]

                      !text-plum-700
                    "
                  >
                    •••
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    !text-sm
                    !font-black
                  "
                >
                  And More
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          SALON SERVICES INTRO
      ===================================================== */}

      <section
        className="
          relative

          overflow-hidden

          bg-white

          py-20

          sm:py-24
        "
      >
        {/* soft decoration */}

        <div
          className="
            pointer-events-none

            absolute
            -left-64
            top-10

            h-[500px]
            w-[500px]

            rounded-full

            bg-plum-100/40

            blur-3xl
          "
        />

        <div className="container-page relative">
          <Reveal
            className="
              flex

              flex-col

              gap-8

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div className="max-w-3xl">
              <p
                className="
                  !text-xs
                  !font-black

                  uppercase

                  tracking-[0.28em]

                  !text-plum-500
                "
              >
                Salon Alain Martinos
              </p>

              <h2
                className="
                  mt-4

                  font-serif

                  !text-4xl
                  !font-black

                  leading-tight

                  !text-plum-800

                  sm:!text-5xl
                  lg:!text-6xl
                "
              >
                Hair & Beauty Services
              </h2>

              <p
                className="
                  mt-5

                  max-w-2xl

                  !text-base
                  !font-medium

                  leading-8

                  !text-plum-700/75

                  sm:!text-lg
                "
              >
                Haircuts, colour, highlights, balayage, styling and professional
                beauty services — discover everything Salon Alain Martinos has to offer.
              </p>
            </div>

            <p
              className="
                hidden

                max-w-xs

                !text-sm
                !font-semibold

                leading-6

                !text-plum-700/60

                lg:block
              "
            >
              Scroll horizontally to explore our services.
            </p>
          </Reveal>

          {/* =================================================
              HORIZONTAL SERVICES
          ================================================= */}

          <div
            className="
              no-scrollbar

              -mx-5

              mt-12

              flex

              snap-x
              snap-mandatory

              gap-6

              overflow-x-auto

              px-5
              pb-8

              sm:-mx-8
              sm:px-8

              lg:-mx-[max(2rem,calc((100vw-1280px)/2))]
            "
          >
            {s.groups.map((group, index) => {
              const image =
                groupImages[index % groupImages.length];

              return (
                <Reveal
                  key={group.id}
                  delay={index * 60}
                  className="
                    min-w-[82vw]

                    snap-start

                    sm:min-w-[420px]

                    lg:min-w-[430px]
                  "
                >
                  <article
                    id={group.id}
                    className="
                      group/service

                      flex
                      h-full
                      flex-col

                      overflow-hidden

                      rounded-[28px]

                      border
                      border-plum-100

                      bg-[#fffafd]

                      shadow-[0_18px_60px_rgba(80,25,75,0.08)]

                      transition-all
                      duration-500

                      hover:-translate-y-1

                      hover:shadow-[0_24px_70px_rgba(80,25,75,0.13)]
                    "
                  >
                    {/* IMAGE */}

                    <div
                      className="
                        relative

                        aspect-[4/3]

                        overflow-hidden

                        bg-plum-50
                      "
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="430px"
                        className="
                          object-cover
                          object-center

                          transition-transform
                          duration-[1200ms]
                          ease-out

                          group-hover/service:scale-[1.04]
                        "
                      />

                      {/* IMAGE OVERLAY */}

                      <div
                        className="
                          absolute
                          inset-0

                          bg-gradient-to-t

                          from-black/30
                          via-transparent
                          to-transparent
                        "
                      />

                      {/* NUMBER */}

                      <div
                        className="
                          absolute

                          left-6
                          top-6

                          flex
                          h-11
                          w-11

                          items-center
                          justify-center

                          rounded-full

                          bg-white/90

                          text-sm
                          font-black
                          text-plum-700

                          shadow-sm

                          backdrop-blur-sm
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div
                      className="
                        flex
                        flex-1
                        flex-col

                        p-7

                        sm:p-8
                      "
                    >
                      {/* CATEGORY */}

                      <p
                        className="
                          !text-[0.68rem]
                          !font-black

                          uppercase

                          tracking-[0.22em]

                          !text-plum-500
                        "
                      >
                        Salon Service
                      </p>

                      {/* TITLE */}

                      <h3
                        className="
                          mt-3

                          font-serif

                          !text-3xl
                          !font-black

                          leading-tight

                          !text-plum-800

                          sm:!text-4xl
                        "
                      >
                        {group.title}
                      </h3>

                      {/* LEAD */}

                      <p
                        className="
                          mt-4

                          !text-[0.98rem]
                          !font-medium

                          leading-7

                          !text-plum-700/70
                        "
                      >
                        {group.lead}
                      </p>

                      {/* SMALL SERVICE LIST */}

                      <div
                        className="
                          mt-6

                          space-y-3

                          border-y
                          border-plum-200/70

                          py-5
                        "
                      >
                        {group.items.slice(0, 4).map((item) => (
                          <div
                            key={item.name}
                            className="
                              flex

                              items-center
                              justify-between

                              gap-4
                            "
                          >
                            <span
                              className="
                                !text-[0.9rem]
                                !font-bold

                                !text-plum-700
                              "
                            >
                              {item.name}
                            </span>

                            {item.price && (
                              <span
                                className="
                                  whitespace-nowrap

                                  !text-xs
                                  !font-black

                                  !text-plum-500
                                "
                              >
                                {item.price}
                              </span>
                            )}
                          </div>
                        ))}

                        {group.items.length > 4 && (
                          <p
                            className="
                              pt-1

                              !text-xs
                              !font-bold

                              !text-plum-500
                            "
                          >
                            + {group.items.length - 4} more services
                          </p>
                        )}
                      </div>

                      {/* ACTION */}

                      <div
                        className="
                          mt-auto

                          flex

                          items-center
                          justify-between

                          gap-4

                          pt-7
                        "
                      >
                        <Button
                          href={`/contact?service=${encodeURIComponent(
                            group.title
                          )}`}
                          className="
                            !rounded-full

                            !bg-plum-700

                            !px-6
                            !py-3

                            !text-sm
                            !font-black

                            !text-white

                            [&_*]:!text-white

                            hover:!bg-plum-800
                          "
                        >
                          Book Service

                          <span
                            className="
                              ml-2
                              !text-white
                            "
                          >
                            →
                          </span>
                        </Button>

                        <a
                          href={`#service-${group.id}`}
                          className="
                            hidden

                            !text-sm
                            !font-black

                            !text-plum-700

                            sm:inline
                          "
                        >
                          View details
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* SCROLL INDICATOR */}

          <div
            className="
              mt-3

              flex
              items-center
              justify-center

              gap-3
            "
          >
            <span
              className="
                h-[2px]
                w-16

                bg-plum-300
              "
            />

            <p
              className="
                !text-xs
                !font-black

                uppercase

                tracking-[0.18em]

                !text-plum-500
              "
            >
              Swipe to explore
            </p>

            <span
              className="
                h-[2px]
                w-16

                bg-plum-300
              "
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          COMPACT ALL SERVICES
      ===================================================== */}

      <section
        className="
          border-t
          border-plum-100

          bg-[#fdf9fc]

          py-20

          sm:py-24
        "
      >
        <div className="container-page">
          <Reveal className="text-center">
            <p
              className="
                !text-xs
                !font-black

                uppercase

                tracking-[0.25em]

                !text-plum-500
              "
            >
              Explore Our Treatments
            </p>

            <h2
              className="
                mt-4

                font-serif

                !text-4xl
                !font-black

                !text-plum-800

                sm:!text-5xl
              "
            >
              Everything You Need,
              <span className="block">All in One Place</span>
            </h2>
          </Reveal>

          {/* COMPACT COLUMNS */}

          <div
            className="
              mt-12

              grid

              gap-x-12
              gap-y-10

              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {s.groups.map((group) => (
              <Reveal key={group.id}>
                <div
                  id={`service-${group.id}`}
                  className="
                    scroll-mt-28

                    border-t-2
                    border-plum-300

                    pt-5
                  "
                >
                  <h3
                    className="
                      font-serif

                      !text-2xl
                      !font-black

                      !text-plum-800
                    "
                  >
                    {group.title}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <a
                        key={item.name}
                        href={`/contact?service=${encodeURIComponent(
                          item.name
                        )}`}
                        className="
                          group

                          flex

                          items-center
                          justify-between

                          gap-3

                          rounded-xl

                          px-3
                          py-2

                          transition-colors

                          hover:bg-plum-50
                        "
                      >
                        <span
                          className="
                            !text-sm
                            !font-semibold

                            !text-plum-700
                          "
                        >
                          {item.name}
                        </span>

                        <span
                          className="
                            translate-x-0

                            !text-plum-400

                            transition-transform

                            group-hover:translate-x-1
                          "
                        >
                          →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* PRICE NOTE */}

          <Reveal>
            <p
              className="
                mx-auto

                mt-14

                max-w-3xl

                text-center

                !text-sm
                !font-semibold

                leading-7

                !text-plum-600/75
              "
            >
              {s.priceNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          BOOKING CTA
      ===================================================== */}

      <section
        className="
          relative

          overflow-hidden

          bg-gradient-to-r
          from-[#3b093b]
          via-plum-800
          to-[#6c1d68]

          py-16
        "
      >
        {/* background effect */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-20

            [background:radial-gradient(circle_at_20%_100%,white,transparent_38%)]
          "
        />

        <div
          className="
            container-page

            relative

            flex

            flex-col

            gap-8

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                !text-xs
                !font-black

                uppercase

                tracking-[0.25em]

                !text-white/70
              "
            >
              Salon Alain Martinos
            </p>

            <h2
              className="
                mt-3

                max-w-2xl

                font-serif

                !text-4xl
                !font-black

                leading-tight

                !text-white

                sm:!text-5xl
              "
            >
              Ready for Your Next
              <span
                className="
                  block
                  !text-white
                "
              >
                Transformation?
              </span>
            </h2>

            <p
              className="
                mt-4

                max-w-xl

                !text-base
                !font-medium

                !text-white/80
              "
            >
              Choose your treatment and book your consultation with Salon
              Alain.
            </p>
          </div>

         <Button
  href="/contact"
  size="lg"
  className="
    shrink-0 !rounded-full
    !border-white !bg-white
    !px-9 !py-4 !text-base !font-black
    !text-plum-800 [&_*]:!text-plum-800
    hover:!bg-white hover:!text-plum-800
  "
>
  <span style={{ color: "#3b093b", WebkitTextFillColor: "#3b093b" }}>
    Book Your Appointment
  </span>

  <span
    aria-hidden="true"
    className="ml-3"
    style={{ color: "#3b093b", WebkitTextFillColor: "#3b093b" }}
  >
    →
  </span>
</Button>
        </div>
      </section>

      {/* =====================================================
          EXISTING CTA BAND
      ===================================================== */}

      {/* <div
        className="
          !text-white

          [&_h1]:!text-white
          [&_h2]:!text-white
          [&_h3]:!text-white
          [&_h4]:!text-white

          [&_p]:!text-white

          [&_a]:!text-white
          [&_a_*]:!text-white

          [&_span]:!text-white

          [&_strong]:!text-white

          [&_button]:!text-white
          [&_button_*]:!text-white
        "
      >
        <CtaBand />
      </div> */}

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </main>
  );
}
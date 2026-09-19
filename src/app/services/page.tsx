import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";

import { getContent } from "@/lib/i18n";
import { heroImages } from "@/lib/images";
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
  name: "Salon Alain Hair & Beauty Services",
  itemListElement: s.groups
    .flatMap((group) => group.items.map((item) => ({
      "@type": "Service",
      name: item.name,
      description: item.desc || group.lead,
      serviceType: group.title,
      provider: { "@id": `${SITE_URL}/#salon` },
    })))
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item,
    })),
};

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
      className="overflow-hidden bg-white text-plum-700 [&_h1]:text-plum-700 [&_h2]:text-plum-700 [&_h3]:text-plum-700 [&_h4]:text-plum-700 [&_p]:text-plum-700"
    >
      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div
        className="[&_h1]:!text-5xl [&_h1]:!font-black [&_h1]:!leading-[1.02] sm:[&_h1]:!text-6xl lg:[&_h1]:!text-7xl [&_p]:!text-[1.15rem] [&_p]:!font-semibold sm:[&_p]:!text-[1.3rem]"
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
  className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#fffafd] via-[#faeef8] to-[#eed9eb]"
>
  {/* Background decorations */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-32 -top-32 h-[620px] w-[620px] rounded-full bg-white/35"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-52 left-[35%] h-[600px] w-[600px] rounded-full bg-plum-300/15 blur-3xl"
  />

  <div
    className="container-page relative grid items-center gap-14 py-20 lg:min-h-[700px] lg:grid-cols-12 lg:py-24"
  >
    {/* LEFT CONTENT */}
    <Reveal className="min-w-0 lg:col-span-5">
      <h2
        className="font-serif !text-4xl !font-black leading-[1.08] !text-plum-800 sm:!text-5xl lg:!text-5xl"
      >
        GOODBYE UNWANTED HAIR.
        <span className="mt-2 block">
          HELLO SMOOTH SKIN. 💜✨
        </span>
      </h2>

      <p
        className="mt-6 max-w-xl !text-[1.05rem] !font-medium leading-8 !text-plum-700/80"
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
        className="mt-6 max-w-xl !text-[1.05rem] !font-medium leading-8 !text-plum-700/80"
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
          className="group !inline-flex !w-full !items-center !justify-center !rounded-full !bg-plum-700 !px-6 !py-4 !text-base !font-black !text-white [&_*]:!text-white hover:!bg-plum-800 sm:!w-auto sm:!px-8"
        >
          Book Your Consultation
          <span
            aria-hidden="true"
            className="ml-3 inline-block !text-white transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Button>
      </div>
    </Reveal>

    {/* RIGHT VISUAL */}
    <Reveal delay={150} className="relative min-w-0 lg:col-span-7">
  <div
    className="relative mx-auto w-full max-w-[760px] sm:min-h-[570px] lg:min-h-[650px]"
  >
    {/* Larger image on mobile */}
    <div
      className="relative z-10 h-[480px] w-full overflow-hidden rounded-3xl sm:absolute sm:bottom-0 sm:left-0 sm:h-[92%] sm:w-[65%]"
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
      className="absolute right-5 top-0 z-30 hidden -rotate-6 text-center sm:block"
    >
      <p
        className="font-serif !text-3xl !font-medium italic leading-tight !text-plum-800 lg:!text-4xl"
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
      className="absolute right-0 top-[32%] z-30 hidden h-28 w-28 items-center justify-center rounded-full bg-white/70 p-5 text-center shadow-sm backdrop-blur-md md:flex"
    >
      <p
        className="!text-[0.68rem] !font-black uppercase leading-5 tracking-[0.14em] !text-plum-600"
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
        className="border-y border-plum-200/60 bg-[#fffafd] py-16 sm:py-20"
      >
        <div className="container-page">
          <Reveal className="text-center">
            <p
              className="!text-xs !font-black uppercase tracking-[0.28em] !text-plum-500"
            >
              Treatable Areas
            </p>

            <h2
              className="mt-3 font-serif !text-4xl !font-black !text-plum-800 sm:!text-5xl"
            >
              Smooth Skin, Everywhere
            </h2>

            <p
              className="mx-auto mt-4 max-w-3xl !text-base !font-medium !text-plum-700/70 sm:!text-lg"
            >
              Professional laser hair removal for the face and body, tailored
              for both women and men.
            </p>
          </Reveal>

          {/* BODY AREAS */}

          <div
            className="mt-10 grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8"
          >
            {vanishAreas.map((area, i) => (
              <Reveal
                key={area.name}
                delay={i * 40}
              >
                <div className="text-center">
                  <div
                    className="relative mx-auto aspect-square w-full max-w-[120px] overflow-hidden rounded-full bg-plum-50"
                  >
                    <Image
                      src={area.image}
                      alt={`${area.name} laser hair removal`}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <p
                    className="mt-3 !text-sm !font-black"
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
                  className="mx-auto flex aspect-square w-full max-w-[120px] items-center justify-center rounded-full bg-plum-100"
                >
                  <span
                    className="!text-3xl !font-black tracking-[0.15em] !text-plum-700"
                  >
                    •••
                  </span>
                </div>

                <p
                  className="mt-3 !text-sm !font-black"
                >
                  And More
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Compact text-only service menu. Native accordions also work without JavaScript. */}
      <section id="services-menu" aria-labelledby="services-title"
        className="salon-menu scroll-mt-28 bg-[#fffafd] py-10 sm:py-14">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="!text-xs !font-bold uppercase tracking-[0.18em] !text-plum-600">
              Salon Alain Hair &amp; Beauty
            </p>
            <h2 id="services-title" className="mt-3 font-serif !text-3xl !font-bold leading-tight !text-plum-800 sm:!text-4xl">
              {s.subtitle}
            </h2>
            <p className="mt-3 !text-sm leading-6 !text-plum-700 sm:!text-base">
              Explore a category to discover its services and book your appointment.
            </p>
          </div>

          <div className="salon-category-grid mt-6">
            {s.groups.map((group, index) => (
              <details key={group.id} id={`service-${group.id}`}
                {...{ name: "salon-service-categories" }}
                className={`salon-category min-w-0 scroll-mt-28 rounded-2xl border border-plum-200/80 ${
                  group.id === "signature" ? "bg-[#f6eaf4]" : "bg-white"
                }`}>
                <summary className="salon-category-trigger rounded-2xl text-plum-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum-700">
                  <span aria-hidden="true" className="text-[11px] font-semibold tracking-widest text-plum-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block break-words text-[15px] font-semibold leading-6 sm:text-base">
                      {group.title}
                    </span>
                    {group.id === "signature" && (
                      <span className="mt-0.5 block text-xs leading-5 text-plum-700">Personally by Alain Martinos</span>
                    )}
                  </span>
                  <span className="salon-service-count text-xs tabular-nums text-plum-600">
                    <span aria-hidden="true">{group.items.length}</span>
                    <span className="sr-only">{group.items.length} services</span>
                  </span>
                  <span aria-hidden="true" className="salon-category-icon text-xl text-plum-700">+</span>
                </summary>

                <div className="salon-category-content px-4 pb-4 sm:px-5 sm:pb-5">
                  <p className="border-t border-plum-200/70 pb-3 pt-4 !text-sm leading-6 !text-plum-700">{group.lead}</p>
                  <ul className="divide-y divide-plum-100">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <a href={`/contact?service=${encodeURIComponent(`${group.title}: ${item.name}`)}`}
                          aria-label={`${s.bookThis}: ${group.title} — ${item.name}`}
                          className="group flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-sm leading-6 text-plum-800 transition-colors hover:bg-plum-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-700">
                          <span className="min-w-0">
                            <span className="block break-words font-medium">{item.name}</span>
                            {item.desc && <span className="mt-1 block text-xs leading-5 text-plum-700">{item.desc}</span>}
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
          <p className="mt-5 !text-xs leading-5 !text-plum-700">{s.priceNote}</p>
        </div>
      </section>

      <style>{`
        .salon-menu .salon-category-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: start;
          gap: 10px;
        }
        .salon-menu .salon-category-trigger {
          display: grid;
          grid-template-columns: 20px minmax(0, 1fr) auto 20px;
          align-items: center;
          gap: 10px;
          min-height: 66px;
          padding: 14px 16px;
          cursor: pointer;
          list-style: none;
        }
        .salon-menu summary::-webkit-details-marker { display: none; }
        .salon-menu summary::marker { content: ""; }
        .salon-menu .salon-category-icon { text-align: center; transition: transform 180ms ease; }
        .salon-menu details[open] .salon-category-icon { transform: rotate(45deg); }
        .salon-menu details[open] { border-color: #b68aad; }
        @media (min-width: 768px) {
          .salon-menu .salon-category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
          .salon-menu .salon-category-trigger { padding: 16px 20px; }
        }
        @keyframes salon-category-enter {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .salon-menu details[open] .salon-category-content { animation: salon-category-enter 220ms ease-out; }
        }
        @media (prefers-reduced-motion: reduce) {
          .salon-menu *, .salon-menu *::before, .salon-menu *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          BOOKING CTA
      ===================================================== */}

      <section
        className="relative overflow-hidden bg-gradient-to-r from-[#3b093b] via-plum-800 to-[#6c1d68] py-16"
      >
        {/* background effect */}

        <div
          className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_100%,white,transparent_38%)]"
        />

        <div
          className="container-page relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p
              className="!text-xs !font-black uppercase tracking-[0.25em] !text-white/70"
            >
              Salon Alain Martinos
            </p>

            <h2
              className="mt-3 max-w-2xl font-serif !text-4xl !font-black leading-tight !text-white sm:!text-5xl"
            >
              Ready for Your Next
              <span
                className="block !text-white"
              >
                Transformation?
              </span>
            </h2>

            <p
              className="mt-4 max-w-xl !text-base !font-medium !text-white/80"
            >
              Choose your treatment and book your consultation with Salon
              Alain.
            </p>
          </div>

         <Button
  href="/contact"
  size="lg"
  className="shrink-0 !rounded-full !border-white !bg-white !px-9 !py-4 !text-base !font-black !text-plum-800 [&_*]:!text-plum-800 hover:!bg-white hover:!text-plum-800"
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
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
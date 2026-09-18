import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Divider } from "./Divider";
import { getContent } from "@/lib/i18n";
import { site } from "@/lib/site";

const t = getContent();

/** Appointment band used on the home page and page endings. */
export function CtaBand({
  heading = t.home.cta.heading,
  copy = t.home.cta.copy,
}: {
  heading?: string;
  copy?: string;
}) {
  const [lb] = site.locations;

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[url('/images/services-purple-bg.png')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      {/* =================================================
          DARK PURPLE OVERLAY
      ================================================= */}
      <div
        className="
          absolute
          inset-0
          bg-[#12001F]/35
        "
      />

      {/* =================================================
          SOFT PURPLE GRADIENT
      ================================================= */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#220638]/20
          via-transparent
          to-[#12001F]/35
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}
     {/* =================================================
    CONTENT
================================================= */}
<div
  className="
    container-page
    relative
    z-10
    py-24
    text-center
    sm:py-32
    lg:py-36
  "
>
 <Reveal>
  {/* DIVIDER */}
  <Divider
    light
    className="
      mx-auto
      mb-10
      max-w-xs
      !border-white
    "
  />

  {/* HEADING */}
  <h2
    className="
      mx-auto
      max-w-4xl
      text-5xl
      !font-extrabold
      leading-[1.1]
      tracking-tight
      !text-white
      drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]
      sm:text-6xl
      lg:text-7xl
    "
    style={{
      color: "#ffffff",
    }}
  >
    <span
      className="!text-white"
      style={{ color: "#ffffff" }}
    >
      {heading}
    </span>
  </h2>

  {/* DESCRIPTION */}
  <p
    className="
      mx-auto
      mt-8
      max-w-3xl
      font-serif
      text-2xl
      !font-bold
      leading-[1.6]
      !text-white
      drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
      sm:text-3xl
      lg:text-[2.2rem]
    "
    style={{
      color: "#ffffff",
    }}
  >
    <span
      className="!text-white"
      style={{ color: "#ffffff" }}
    >
      {copy}
    </span>
  </p>

  {/* BUTTON */}
  <div
    className="
      mt-12
      flex
      flex-col
      items-center
      justify-center
      gap-4
      sm:flex-row
    "
  >
    <Button
      href={lb.bookHref}
      variant="outline"
      size="lg"
      className="
        w-full
        !border-2
        !border-white
        !bg-transparent
        !px-10
        !py-5
        !text-xl
        !font-extrabold
        !normal-case
        !text-white
        shadow-[0_10px_30px_rgba(0,0,0,0.3)]
        transition-all
        duration-300
        hover:!bg-white
        hover:!text-[#3A0A55]
        sm:w-auto
        sm:!text-2xl
      "
      style={{
        color: "#ffffff",
      }}
    >
      {t.home.cta.lebanon}
    </Button>
  </div>
</Reveal>
</div>
    </section>
  );
}
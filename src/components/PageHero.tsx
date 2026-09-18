import Image from "next/image";

import type { SiteImage } from "@/lib/images";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  image?: SiteImage;

  /** "band" = tall image with text overlaid; "plain" = text on purple background */
  variant?: "band" | "plain";
};

export function PageHero({
  kicker,
  title,
  subtitle,
  image,
  variant = "plain",
}: Props) {
  /* =========================================================
     BAND HERO
  ========================================================= */

  if (variant === "band" && image) {
    return (
      <section
        className="
          relative
          isolate
          flex
          min-h-[62vh]
          items-end
          overflow-hidden
          pt-24
        "
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            animate-bloom
          "
        />

        {/* IMAGE OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#E4CBEA]/90
            via-[#E4CBEA]/55
            to-[#E4CBEA]/20
          "
        />

        {/* CONTENT */}
        <div
          className="
            container-page
            relative
            pb-14
            pt-24

            !text-plum-700

            [&_h1]:!text-plum-700
            [&_p]:!text-plum-700
            [&_span]:!text-plum-700

            sm:pb-20
          "
        >
          {/* KICKER */}
          {kicker && (
            <p
              className="
                kicker
                mb-4
                animate-rise

                !text-base
                !font-extrabold
                !text-plum-700

                sm:!text-lg
              "
            >
              {kicker}
            </p>
          )}

          {/* TITLE */}
          <h1
            className="
              animate-rise
              [animation-delay:120ms]

              font-serif
              text-5xl
              font-black
              leading-[1.05]

              !text-plum-700

              sm:text-6xl
              lg:text-7xl
            "
          >
            {title}
          </h1>

          {/* SUBTITLE */}
          {subtitle && (
            <p
              className="
                mt-5
                max-w-2xl

                animate-rise
                [animation-delay:240ms]

                font-serif
                text-2xl
                font-bold
                italic
                leading-relaxed

                !text-plum-700

                sm:text-3xl
              "
            >
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  /* =========================================================
     PLAIN HERO
  ========================================================= */

  return (
    <section
      className="
        relative
        bg-[#E4CBEA]
        pt-32
        sm:pt-40
      "
    >
      <div
        className="
          container-page
          pb-14
          text-center

          !text-plum-700

          [&_h1]:!text-plum-700
          [&_p]:!text-plum-700
          [&_span]:!text-plum-700

          sm:pb-20
        "
      >
        {/* KICKER */}
        {kicker && (
          <p
            className="
              kicker
              mb-4
              animate-rise

              !text-base
              !font-extrabold
              !text-plum-700

              sm:!text-lg
            "
          >
            {kicker}
          </p>
        )}

        {/* TITLE */}
        <h1
          className="
            animate-rise
            [animation-delay:120ms]

            font-serif
            text-5xl
            font-black
            leading-[1.05]

            !text-plum-700

            sm:text-6xl
            lg:text-7xl
          "
        >
          {title}
        </h1>

        {/* SUBTITLE */}
        {subtitle && (
          <p
            className="
              mx-auto
              mt-5
              max-w-2xl

              animate-rise
              [animation-delay:240ms]

              font-serif
              text-2xl
              font-bold
              italic
              leading-relaxed

              !text-plum-700

              sm:text-3xl
            "
          >
            {subtitle}
          </p>
        )}

        {/* DIVIDER */}
        <span
          aria-hidden="true"
          className="
            mx-auto
            mt-8
            block
            h-[2px]
            w-16
            bg-plum-700

            animate-rise
            [animation-delay:360ms]
          "
        />
      </div>
    </section>
  );
}
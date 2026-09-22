import Image from "next/image";

import type { SiteImage } from "@/lib/images";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  image?: SiteImage;

  /** "band" = photograph behind a violet scrim; "plain" = type on deep purple */
  variant?: "band" | "plain";
};

/**
 * Page masthead. Editorial, centred, set on the deepest purple — the
 * photograph (when there is one) sits under a violet duotone scrim so the
 * band still reads as part of the all-purple system.
 */
export function PageHero({
  kicker,
  title,
  subtitle,
  image,
  variant = "plain",
}: Props) {
  const band = variant === "band" && image;

  return (
    <section
      className={`
        relative isolate flex items-center justify-center overflow-hidden
        bg-night-base pt-32 sm:pt-40
        ${band ? "min-h-[64vh] pb-20 sm:pb-24" : "pb-16 sm:pb-24"}
      `}
    >
      {band && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-bloom object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[#4A2A72] mix-blend-multiply" />
          <div aria-hidden="true" className="absolute inset-0 bg-night-base/70" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-night-base via-night-base/45 to-night-base"
          />
        </>
      )}

      {/* Soft radial glow for depth */}
      <div
        aria-hidden="true"
        className="glow-purple pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      <div className="container-page relative z-10 text-center">
        {kicker && (
          <p className="kicker mb-6 animate-rise">{kicker}</p>
        )}

        <h1 className="animate-rise font-serif text-[2.8rem] font-light uppercase leading-[1.04] tracking-[0.12em] text-chalk [animation-delay:120ms] sm:text-[4.2rem] lg:text-[5.2rem]">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-7 max-w-2xl animate-rise font-sans text-[0.95rem] font-light leading-[1.8] text-lavender [animation-delay:240ms] sm:text-[1.05rem]">
            {subtitle}
          </p>
        )}

        <span
          aria-hidden="true"
          className="mx-auto mt-10 block h-px w-24 animate-rise bg-gradient-to-r from-transparent via-bright to-transparent [animation-delay:360ms]"
        />
      </div>
    </section>
  );
}

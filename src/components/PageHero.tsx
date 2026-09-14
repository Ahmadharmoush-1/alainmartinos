import Image from "next/image";
import type { SiteImage } from "@/lib/images";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  image?: SiteImage;
  /** "band" = tall image with text overlaid; "plain" = text on silk background */
  variant?: "band" | "plain";
};

export function PageHero({ kicker, title, subtitle, image, variant = "plain" }: Props) {
  if (variant === "band" && image) {
    return (
      <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden pt-24">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover animate-bloom" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/20 to-transparent" />
        <div className="container-page relative pb-14 pt-24 text-cream sm:pb-20">
          {kicker && <p className="kicker mb-4 text-plum-200 animate-rise">{kicker}</p>}
          <h1 className="text-display-lg font-medium text-cream animate-rise [animation-delay:120ms]">{title}</h1>
          {subtitle && <p className="mt-4 max-w-xl font-serif text-2xl italic text-plum-100 animate-rise [animation-delay:240ms]">{subtitle}</p>}
        </div>
      </section>
    );
  }
  return (
    <section className="silk-bg relative pt-32 sm:pt-40">
      <div className="container-page pb-14 text-center sm:pb-20">
        {kicker && <p className="kicker mb-4 animate-rise">{kicker}</p>}
        <h1 className="text-display-lg font-medium animate-rise [animation-delay:120ms]">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl font-serif text-2xl italic text-mist animate-rise [animation-delay:240ms]">{subtitle}</p>}
        <span aria-hidden="true" className="mx-auto mt-8 block h-px w-14 bg-plum-500 animate-rise [animation-delay:360ms]" />
      </div>
    </section>
  );
}

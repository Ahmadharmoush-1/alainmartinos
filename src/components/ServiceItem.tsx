import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";

type Props = {
  name: string;
  description: string;
  href?: string;
  image?: { src: string; alt: string };
  index?: number;
  /** Compact list row (services page) vs. editorial tile (home). */
  variant?: "tile" | "row";
  duration?: string;
  price?: string;
  bookLabel?: string;
  bookHref?: string;
  durationLabel?: string;
  priceLabel?: string;
};

export function ServiceItem({
  name, description, href, image, index = 0, variant = "tile",
  duration, price, bookLabel, bookHref, durationLabel, priceLabel,
}: Props) {
  if (variant === "row") {
    return (
      <Reveal as="li" delay={index * 60} className="group grid gap-3 border-b border-plum-200/70 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6">
        <div className="sm:col-span-5">
          <h3 className="font-serif text-2xl font-medium leading-tight transition-colors duration-300 group-hover:text-plum-700">{name}</h3>
          {(duration || price) && (
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-sans text-[0.68rem] uppercase tracking-wide2 text-mist">
              {duration && <span>{durationLabel} {duration}</span>}
              {price && price !== "—" && <span>{priceLabel} {price}</span>}
            </p>
          )}
        </div>
        <p className="text-[0.95rem] leading-relaxed text-ink/75 sm:col-span-5">{description}</p>
        <div className="sm:col-span-2 sm:text-right">
          {bookHref && bookLabel && (
            <Link href={bookHref} className="link-line whitespace-nowrap font-sans text-[0.68rem] font-medium uppercase tracking-wider2 text-plum-700">
              {bookLabel}
            </Link>
          )}
        </div>
      </Reveal>
    );
  }

  const inner = (
    <>
      {image && (
        <div className="zoom-frame aspect-[4/5] w-full">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" loading="lazy" />
        </div>
      )}
      <div className="flex items-start justify-between gap-3 border-b border-plum-200/70 pb-3 pt-4 transition-colors duration-500 group-hover:border-plum-500 sm:pb-4 sm:pt-5">
        <h3 className="font-serif text-xl font-medium leading-tight transition-colors duration-300 group-hover:text-plum-700 sm:text-2xl">{name}</h3>
        <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-plum-300 transition-all duration-500 ease-luxe group-hover:w-10 group-hover:bg-plum-700" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-[0.95rem]">{description}</p>
    </>
  );

  return (
    <Reveal delay={index * 70} className="group">
      {href ? <Link href={href} className="block focus-visible:outline-plum-500">{inner}</Link> : inner}
    </Reveal>
  );
}

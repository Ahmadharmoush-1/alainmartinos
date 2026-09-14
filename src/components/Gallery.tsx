"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SiteImage, WorkImage } from "@/lib/images";
import { getContent } from "@/lib/i18n";

const t = getContent();

type Category = { id: string; label: string };

type Props = {
  images: (SiteImage | WorkImage)[];
  /** Pass categories to show the filter bar. Images must then carry `category`. */
  categories?: readonly Category[];
  columns?: 2 | 3 | 4;
  /** Show the image title on hover (WorkImage only). */
  captions?: boolean;
  className?: string;
};

function isWork(img: SiteImage | WorkImage): img is WorkImage {
  return "category" in img;
}

/**
 * Editorial masonry gallery (CSS columns) with optional category filtering and
 * an accessible fullscreen lightbox. Images lazy-load through next/image.
 */
export function Gallery({ images, categories, columns = 3, captions = true, className = "" }: Props) {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const visible = useMemo(
    () => (active === "all" ? images : images.filter((img) => isWork(img) && img.category.includes(active as WorkImage["category"][number]))),
    [images, active],
  );

  const changeCategory = (id: string) => {
    if (id === active) return;
    setFading(true);
    window.setTimeout(() => {
      setActive(id);
      setFading(false);
    }, 220);
  };

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? null : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const colClass = { 2: "sm:columns-2", 3: "columns-2 lg:columns-3", 4: "columns-2 lg:columns-3 xl:columns-4" }[columns];

  return (
    <div className={className}>
      {categories && (
        <div className="no-scrollbar -mx-5 mb-10 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0" role="tablist" aria-label="Filter portfolio">
          {categories.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => changeCategory(c.id)}
                className={`link-line whitespace-nowrap px-3 py-2 font-sans text-[0.7rem] font-medium uppercase tracking-wider2 transition-colors duration-300 ${
                  on ? "text-plum-700" : "text-ink/60 hover:text-plum-700"
                }`}
                aria-current={on ? "page" : undefined}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-16 text-center font-serif text-xl italic text-mist">{t.work.empty}</p>
      ) : (
        <div className={`${colClass} gap-4 transition-opacity duration-300 sm:gap-5 ${fading ? "opacity-0" : "opacity-100"}`}>
          {visible.map((img, i) => (
            <figure key={img.src + i} className="mb-4 break-inside-avoid sm:mb-5">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="zoom-frame group block w-full text-left focus-visible:outline-plum-500"
                aria-label={`Open image: ${isWork(img) ? img.title : img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full"
                  loading="lazy"
                />
                {captions && isWork(img) && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-plum-900/55 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-serif text-lg italic text-cream">{img.title}</span>
                    <span className="font-sans text-[0.62rem] uppercase tracking-wider2 text-plum-100">{img.category[0]}</span>
                  </figcaption>
                )}
              </button>
            </figure>
          ))}
        </div>
      )}

      {lightbox !== null && visible[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isWork(visible[lightbox]) ? visible[lightbox].title : visible[lightbox].alt}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-plum-900/92 p-4 backdrop-blur-sm animate-[bloom_0.4s_ease-out_both]"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.work.lightbox.close}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-cream/80 transition hover:text-cream"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>
          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label={t.work.lightbox.prev}
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/70 transition hover:text-cream sm:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label={t.work.lightbox.next}
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/70 transition hover:text-cream sm:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          )}
          <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              key={visible[lightbox].src}
              src={visible[lightbox].src}
              alt={visible[lightbox].alt}
              width={visible[lightbox].width}
              height={visible[lightbox].height}
              sizes="100vw"
              className="max-h-[82vh] w-auto max-w-full object-contain"
              priority
            />
            <figcaption className="mt-4 flex items-center justify-between text-cream/80">
              <span className="font-serif text-xl italic">{isWork(visible[lightbox]) ? (visible[lightbox] as WorkImage).title : visible[lightbox].alt}</span>
              <span className="font-sans text-[0.65rem] tracking-wider2">{lightbox + 1} / {visible.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

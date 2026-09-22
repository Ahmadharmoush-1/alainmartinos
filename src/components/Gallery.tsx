"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { WorkImage } from "@/lib/images";
import { getContent } from "@/lib/i18n";

const t = getContent();

export type Category = { id: string; label: string };

/** Per-look copy: the one-line card caption and the longer atelier note. */
export type WorkNote = { short: string; long: string };

type Props = {
  images: WorkImage[];
  /** Filter pills. The first entry should be the "all" pill. */
  categories?: readonly Category[];
  /** Keyed by image title. */
  notes?: Record<string, WorkNote>;
  className?: string;
};

/* =========================================================
   ICONS
========================================================= */

function NorthEast() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5 shrink-0"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4 shrink-0"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
    >
      <path strokeLinecap="round" d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-[18px] w-[18px] shrink-0"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path strokeLinecap="round" d="M8 3.5V6.5M16 3.5V6.5M3.5 10h17" />
    </svg>
  );
}

/* =========================================================
   PORTFOLIO GALLERY
   Filter pills, 12-card atelier grid with hover dossier,
   and a full-resolution lightbox.
========================================================= */

export function Gallery({ images, categories, notes = {}, className = "" }: Props) {
  const [active, setActive] = useState<string>(categories?.[0]?.id ?? "all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      active === "all"
        ? images
        : images.filter((img) => img.category.includes(active as WorkImage["category"][number])),
    [images, active],
  );

  /** Stable reference number, independent of the active filter. */
  const refOf = useCallback(
    (img: WorkImage) => `AM-${String(images.indexOf(img) + 1).padStart(2, "0")}`,
    [images],
  );

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close]);

  const current = lightbox !== null ? visible[lightbox] : null;
  const currentNote = current ? notes[current.title] : undefined;

  return (
    <div className={className}>
      {/* ---------- Filter pills ---------- */}
      {categories && (
        <div className="no-scrollbar w-full overflow-x-auto pb-3 pt-1.5">
          <div
            className="inline-flex items-center gap-2"
            role="tablist"
            aria-label="Filter portfolio"
          >
            {categories.map((c) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(c.id)}
                  className={`
                    whitespace-nowrap rounded-full px-5 py-2 font-sans text-m3-label
                    font-medium uppercase transition-all duration-300
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
                    focus-visible:outline-m3-primary
                    ${
                      on
                        ? "bg-m3-primary text-m3-on-primary shadow-sm"
                        : "bg-m3-container text-m3-tertiary hover:bg-m3-high hover:text-m3-on-surface"
                    }
                  `}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- Atelier light hint ---------- */}
      <div className="mt-3 flex items-center gap-2 text-m3-tertiary/70">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-4 w-4 shrink-0"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path strokeLinecap="round" d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5" />
        </svg>
        <span className="font-sans text-m3-body-sm italic">
          Click any work to view in high-resolution atelier light.
        </span>
      </div>

      {/* ---------- Grid ---------- */}
      {visible.length === 0 ? (
        <p className="py-16 text-center font-serif text-m3-headline-sm italic text-m3-tertiary">
          {t.work.empty}
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((img, i) => {
            const note = notes[img.title];

            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Open ${img.title} in high resolution`}
                className="group relative block overflow-hidden rounded-lg bg-m3-container text-left shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-m3-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* Photograph */}
                <span className="relative block aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                </span>

                {/* Default caption */}
                <span className="flex flex-col justify-between bg-m3-container p-5">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
                      {img.category[0]}
                    </span>
                    <span className="text-m3-tertiary transition-colors group-hover:text-m3-primary">
                      <NorthEast />
                    </span>
                  </span>

                  <span className="mt-1 block font-serif text-m3-headline-sm !font-normal text-m3-on-surface">
                    {img.title}
                  </span>

                  {note && (
                    <span className="mt-1 line-clamp-1 font-sans text-m3-body-sm font-light text-m3-on-surface-variant/80">
                      {note.short}
                    </span>
                  )}
                </span>

                {/* Hover dossier */}
                <span className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-m3-high/90 p-10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                  <span className="font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
                    Ref. {refOf(img)} · {img.category[0]}
                  </span>

                  <span className="block">
                    <span className="mb-2 block font-serif text-m3-headline-md !font-normal text-m3-on-surface">
                      {img.title}
                    </span>
                    {note && (
                      <span className="block font-sans text-m3-body-md font-light text-m3-on-surface-variant">
                        {note.long}
                      </span>
                    )}
                  </span>

                  <span className="flex items-center gap-2 font-sans text-m3-label font-medium uppercase text-m3-primary">
                    <span>Enlarge Masterpiece</span>
                    <FullscreenIcon />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ---------- Lightbox ---------- */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-m3-lowest/95 p-5 backdrop-blur-2xl animate-[bloom_0.3s_ease-out_both]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col gap-10 rounded-lg bg-m3-container p-6 shadow-2xl sm:p-10 md:flex-row"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t.work.lightbox.close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-m3-high text-m3-secondary transition-colors hover:text-m3-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-m3-primary"
            >
              <CloseIcon />
            </button>

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded md:w-1/2">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex w-full flex-col justify-between md:w-1/2">
              <div>
                <span className="font-sans text-m3-eyebrow font-medium uppercase text-m3-secondary">
                  {current.category[0]}
                </span>

                <h3 className="mb-3 mt-2 font-serif text-m3-headline-md !font-normal !text-m3-on-surface lg:text-m3-headline-lg">
                  {current.title}
                </h3>

                {currentNote && (
                  <p className="font-sans text-m3-body-md font-light leading-relaxed text-m3-on-surface-variant">
                    {currentNote.long}
                  </p>
                )}

                <div className="mt-5 rounded bg-m3-low p-3">
                  <span className="mb-1 block font-sans text-m3-eyebrow font-medium uppercase text-m3-tertiary">
                    Technique Notes
                  </span>
                  <p className="font-sans text-m3-body-sm text-m3-on-surface-variant">
                    Custom multi-tonal application with bond-building shield and diamond shine
                    sealant at Salon Alain Martinos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-5">
                <a
                  href={`/contact?service=${encodeURIComponent(current.title)}`}
                  className="inline-flex items-center gap-2 rounded-full bg-m3-primary px-5 py-3 font-sans text-m3-label font-medium uppercase text-m3-on-primary transition-colors hover:bg-m3-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-m3-primary"
                >
                  <CalendarIcon />
                  <span>Inquire About This Look</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

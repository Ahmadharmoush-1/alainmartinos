"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type CarouselSlide = {
  src: string;
  alt: string;
};

type Props = {
  slides: readonly CarouselSlide[];
  /** Class for each slide's frame, so the carousel inherits the host layout. */
  frameClassName?: string;
  sizes?: string;
  label?: string;
};

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      width="20"
      height="20"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

/**
 * Swipeable image carousel. Scroll-snap does the work, so touch swiping is
 * native; the arrows and dots are there for pointer and keyboard users.
 */
export function ChapterCarousel({
  slides,
  frameClassName = "am-photo",
  sizes = "(max-width: 639px) 90vw, (max-width: 1023px) 80vw, 55vw",
  label = "Image gallery",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);

  /** The slide currently nearest the track's centre, read from the DOM. */
  const nearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const slideEls = track.querySelectorAll<HTMLElement>("[data-slide]");
    if (!slideEls.length) return 0;

    const center = track.getBoundingClientRect().left + track.clientWidth / 2;

    let closest = 0;
    let closestDistance = Infinity;

    slideEls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const distance = Math.abs(center - (rect.left + rect.width / 2));
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });

    return closest;
  }, []);

  const measure = useCallback(() => {
    frameRef.current = null;
    const closest = nearestIndex();
    setIndex((previous) => (previous === closest ? previous : closest));
  }, [nearestIndex]);

  const schedule = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(measure);
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [measure, schedule]);

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = Math.max(0, Math.min(slides.length - 1, next));
      const el = track.querySelectorAll<HTMLElement>("[data-slide]")[clamped];
      if (!el) return;

      const trackRect = track.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset =
        elRect.left + elRect.width / 2 - (trackRect.left + track.clientWidth / 2);

      track.scrollTo({
        left: track.scrollLeft + offset,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    },
    [slides.length],
  );

  /**
   * Move relative to where the track actually is, not to the last rendered
   * index — smooth scrolling settles after the click, so state lags behind.
   */
  const step = useCallback(
    (delta: number) => {
      const target = nearestIndex() + delta;
      setIndex(Math.max(0, Math.min(slides.length - 1, target)));
      goTo(target);
    },
    [goTo, nearestIndex, slides.length],
  );

  if (!slides.length) return null;

  const multiple = slides.length > 1;

  return (
    <div className="am-carousel" role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className="am-carousel-track"
        tabIndex={multiple ? 0 : -1}
        onKeyDown={(event) => {
          if (!multiple) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            data-slide
            className="am-carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <div className={frameClassName}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={sizes}
                className="am-photo-image"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {multiple && (
        <>
          <button
            type="button"
            className="am-carousel-nav am-carousel-prev"
            onClick={() => step(-1)}
            disabled={index === 0}
            aria-label="Previous image"
          >
            <Chevron back />
          </button>

          <button
            type="button"
            className="am-carousel-nav am-carousel-next"
            onClick={() => step(1)}
            disabled={index === slides.length - 1}
            aria-label="Next image"
          >
            <Chevron />
          </button>

          <div className="am-carousel-dots">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`am-carousel-dot${i === index ? " is-active" : ""}`}
                onClick={() => { setIndex(i); goTo(i); }}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

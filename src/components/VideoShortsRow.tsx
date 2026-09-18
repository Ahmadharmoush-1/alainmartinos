"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VideoShort, type Priority, type ShortSource } from "./VideoShort";

export type Short = {
  src: string;
  title: string;
  poster?: string;
  sources?: readonly ShortSource[];
  mobileSources?: readonly ShortSource[];
};

type Props = {
  shorts: readonly Short[];
  playLabel?: string;
  badge?: string;
};

export function VideoShortsRow({
  shorts,
  playLabel = "Play video",
  badge = "Salon Alain",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [nearViewport, setNearViewport] = useState(false);

  /*
   * Measure the untransformed card wrappers.
   * Scaling an inner element does not affect which card is centered.
   */
  const measure = useCallback(() => {
    frameRef.current = null;

    const container = containerRef.current;
    if (!container) return;

    const cards =
      container.querySelectorAll<HTMLElement>("[data-video-card]");

    if (!cards.length) return;

    const rect = container.getBoundingClientRect();
    const center = rect.left + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const distance = Math.abs(
        center - (cardRect.left + cardRect.width / 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((previous) =>
      previous === closestIndex ? previous : closestIndex
    );
  }, []);

  const schedule = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(measure);
  }, [measure]);

  // Start preloading shortly before the section reaches the screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting);
      },
      {
        rootMargin: "500px 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    measure();

    container.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;

    resizeObserver?.observe(container);

    return () => {
      container.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [measure, schedule, shorts.length]);

  const scrollToVideo = (index: number) => {
    const container = containerRef.current;
    const card =
      container?.querySelectorAll<HTMLElement>("[data-video-card]")[index];

    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const offset =
      cardRect.left +
      cardRect.width / 2 -
      (containerRect.left + container.clientWidth / 2);

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  if (!shorts.length) return null;

  return (
    <div ref={sectionRef} className="relative w-full">
      <div
        ref={containerRef}
        role="region"
        aria-label="Salon videos"
        tabIndex={0}
        className="
          no-scrollbar relative flex w-full
          snap-x snap-mandatory items-center gap-3
          overflow-x-auto overscroll-x-contain
          py-5 sm:gap-5
          [--video-card-width:min(72vw,300px)]
          sm:[--video-card-width:310px]
          lg:[--video-card-width:330px]
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-plum-700
        "
        style={{
          paddingInline:
            "max(0px, calc((100% - var(--video-card-width)) / 2))",
        }}
      >
        {shorts.map((video, index) => {
          const distance = Math.abs(index - activeIndex);
          const isActive = index === activeIndex;

          const priority: Priority = !nearViewport
            ? "low"
            : distance === 0
              ? "high"
              : distance === 1
                ? "medium"
                : "low";

          return (
            <div
              key={video.src}
              data-video-card
              className="
                relative w-[var(--video-card-width)]
                shrink-0 snap-center
              "
            >
              <div
                className={`
                  transition-[transform,opacity] duration-300
                  motion-reduce:transition-none
                  ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.94] opacity-75"
                  }
                `}
              >
                <VideoShort
                  src={video.src}
                  title={video.title}
                  poster={video.poster}
                  sources={video.sources}
                  mobileSources={video.mobileSources}
                  playLabel={playLabel}
                  badge={badge}
                  priority={priority}
                  active={isActive && nearViewport}
                  eagerPoster={nearViewport && distance <= 1}
                />

                {/* Tap a side card to center it before playing. */}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => scrollToVideo(index)}
                    aria-label={`Select video: ${video.title}`}
                    className="
                      absolute inset-0 z-30
                      !rounded-[1.5rem] !border-0
                      !bg-transparent !p-0
                      focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-plum-700
                    "
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      {shorts.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => scrollToVideo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Previous video"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full bg-plum-700 !text-white
              hover:bg-plum-800
              disabled:cursor-not-allowed disabled:opacity-40
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-plum-700
            "
          >
            <span aria-hidden="true">←</span>
          </button>

          <p className="text-sm font-semibold text-plum-700">
            {activeIndex + 1} / {shorts.length}
          </p>

          <button
            type="button"
            onClick={() =>
              scrollToVideo(Math.min(shorts.length - 1, activeIndex + 1))
            }
            disabled={activeIndex === shorts.length - 1}
            aria-label="Next video"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full bg-plum-700 !text-white
              hover:bg-plum-800
              disabled:cursor-not-allowed disabled:opacity-40
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-plum-700
            "
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
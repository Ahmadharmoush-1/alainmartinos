"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ShortSource = {
  src: string;
  type: string;
};

export type Priority = "high" | "medium" | "low";

type Props = {
  src: string;
  title: string;
  poster?: string;
  sources?: readonly ShortSource[];
  mobileSources?: readonly ShortSource[];
  playLabel?: string;
  badge?: string;
  priority?: Priority;
  eagerPoster?: boolean;
  active?: boolean;
};

function allowsPrefetch() {
  const connection = (
    navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    }
  ).connection;

  return (
    !connection?.saveData &&
    !/^(slow-)?2g$/.test(connection?.effectiveType ?? "")
  );
}

export function VideoShort({
  src,
  title,
  poster,
  sources,
  mobileSources,
  playLabel = "Play video",
  badge = "Salon Alain",
  priority = "low",
  eagerPoster = false,
  active = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const attachedRef = useRef(false);
  const mountedRef = useRef(false);
  const attemptRef = useRef(0);

  const [started, setStarted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      attemptRef.current += 1;
    };
  }, []);

  /*
   * Attach a source only when needed.
   * Keep the selected rendition throughout playback so resizing
   * the browser does not restart the download.
   */
  const attachSource = useCallback(() => {
    const video = videoRef.current;
    if (!video) return null;
    if (attachedRef.current) return video;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const candidates =
      isMobile && mobileSources?.length
        ? mobileSources
        : sources?.length
          ? sources
          : [];

    const supported = candidates.find(
      (source) => video.canPlayType(source.type) !== ""
    );

    video.src = supported?.src ?? src;
    attachedRef.current = true;

    return video;
  }, [src, sources, mobileSources]);

  /*
   * The carousel grants preload priority only when it is
   * approaching the viewport.
   *
   * Do not repeatedly call load(): it resets media loading.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || started) return;

    const preload =
      priority === "high"
        ? allowsPrefetch()
          ? "auto"
          : "metadata"
        : priority === "medium" && allowsPrefetch()
          ? "metadata"
          : "none";

    video.preload = preload;

    if (preload !== "none") {
      attachSource();
    }
  }, [priority, started, attachSource]);

  // Stop playback when this card is no longer active.
  useEffect(() => {
    if (active) return;

    attemptRef.current += 1;
    videoRef.current?.pause();
    setStarted(false);
    setBuffering(false);
  }, [active]);

  // Also pause when the browser tab is hidden.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) return;

      attemptRef.current += 1;
      videoRef.current?.pause();
      setStarted(false);
      setBuffering(false);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
    };
  }, []);

  const warmOnIntent = () => {
    if (!active || !allowsPrefetch()) return;

    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";
    attachSource();
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video || !active) return;

    const attempt = ++attemptRef.current;

    setError(false);
    setStarted(true);
    setBuffering(true);

    video.preload = "auto";
    attachSource();

    // Reload only after an actual media error, when retrying.
    if (video.error) {
      video.load();
    }

    /*
     * Call play() directly inside the tap/click handler.
     * This preserves the user gesture on mobile browsers.
     */
    video.play().catch(() => {
      if (
        !mountedRef.current ||
        attempt !== attemptRef.current
      ) {
        return;
      }

      setStarted(false);
      setBuffering(false);
      setError(true);
    });
  };

  return (
    <article className="w-full">
      <div
        className="
          relative aspect-[9/16] w-full overflow-hidden
          rounded-[1.5rem] bg-plum-900
          shadow-[0_12px_35px_rgba(35,15,28,0.16)]
        "
      >
        {/* No source is attached until preloading or user interaction. */}
        <video
          ref={videoRef}
          preload="none"
          playsInline
          controls={started}
          aria-label={title}
          onPlaying={() => {
            setStarted(true);
            setBuffering(false);
            setError(false);
          }}
          onWaiting={() => {
            if (started) setBuffering(true);
          }}
          onCanPlay={() => setBuffering(false)}
          onPause={() => setBuffering(false)}
          onEnded={() => {
            setStarted(false);
            setBuffering(false);

            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
          }}
          onError={() => {
            setStarted(false);
            setBuffering(false);
            setError(true);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Lightweight poster stays visible until playback is requested. */}
        {poster && !started && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            draggable={false}
            loading={eagerPoster ? "eager" : "lazy"}
            decoding="async"
            className="
              pointer-events-none absolute inset-0
              h-full w-full object-cover
            "
          />
        )}

        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            onPointerEnter={warmOnIntent}
            onFocus={warmOnIntent}
            aria-label={`${playLabel}: ${title}`}
            className="
              absolute inset-0 z-10 h-full w-full
              !rounded-none !border-0 !bg-transparent
              !p-0 text-left
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-[-4px]
              focus-visible:outline-white
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute inset-0 bg-gradient-to-t
                from-black/75 via-black/5 to-black/15
              "
            />

            <span
              className="
                absolute left-3 top-3 rounded-full
                border border-white/30 bg-black/30
                px-3 py-1.5 text-[10px] font-bold
                uppercase tracking-[0.14em] !text-white
              "
            >
              {badge}
            </span>

            <span
              aria-hidden="true"
              className="
                absolute left-1/2 top-1/2
                flex h-14 w-14 -translate-x-1/2 -translate-y-1/2
                items-center justify-center rounded-full
                border border-white/70 bg-plum-700
                !text-white shadow-lg
                sm:h-16 sm:w-16
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-6 w-6 !text-white"
              >
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>

            <span className="absolute inset-x-0 bottom-0 block p-4 sm:p-5">
              <span
                className="
                  block font-serif text-xl font-bold italic
                  leading-tight !text-white sm:text-2xl
                "
              >
                {title}
              </span>

              <span
                className="
                  mt-2 block text-[10px] font-bold
                  uppercase tracking-[0.16em] !text-white
                "
              >
                {error ? "Unable to play — tap to retry" : playLabel}
              </span>
            </span>
          </button>
        )}

        {started && buffering && (
          <div
            role="status"
            className="
              pointer-events-none absolute inset-0 z-20
              flex items-center justify-center
            "
          >
            <span
              aria-hidden="true"
              className="
                h-10 w-10 animate-spin rounded-full
                border-2 border-white/30 border-t-white
                motion-reduce:animate-none
              "
            />
            <span className="sr-only">Loading video…</span>
          </div>
        )}
      </div>
    </article>
  );
}
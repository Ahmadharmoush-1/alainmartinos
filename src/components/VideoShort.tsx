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
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  return !connection?.saveData && !/^(slow-)?2g$/.test(connection?.effectiveType ?? "");
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
  const [loading, setLoading] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      attemptRef.current += 1;
    };
  }, []);

  const attachSource = useCallback(() => {
    const video = videoRef.current;
    if (!video || attachedRef.current) return video;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const candidates = isMobile && mobileSources?.length ? mobileSources : sources ?? [];
    const supported = candidates.find((source) => video.canPlayType(source.type) !== "");

    video.src = supported?.src ?? src;
    attachedRef.current = true;
    return video;
  }, [mobileSources, sources, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || started) return;

    const preload =
      priority === "high" ? (allowsPrefetch() ? "auto" : "metadata") :
      priority === "medium" && allowsPrefetch() ? "metadata" : "none";

    video.preload = preload;
    if (preload !== "none") attachSource();
  }, [attachSource, priority, started]);

  useEffect(() => {
    if (active) return;
    attemptRef.current += 1;
    videoRef.current?.pause();
    setStarted(false);
    setLoading(false);
    setBuffering(false);
  }, [active]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) return;
      attemptRef.current += 1;
      videoRef.current?.pause();
      setStarted(false);
      setLoading(false);
      setBuffering(false);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
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
    if (!video || !active || loading) return;

    const attempt = ++attemptRef.current;
    setError(false);
    setLoading(true);
    video.preload = "auto";
    attachSource();

    if (video.error) video.load();

    video.play().catch(() => {
      if (!mountedRef.current || attempt !== attemptRef.current) return;
      setLoading(false);
      setStarted(false);
      setError(true);
    });
  };

  const showPoster = Boolean(poster) && !started;

  return (
    <article className="w-full">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.5rem] bg-plum-900 shadow-[0_12px_35px_rgba(35,15,28,0.16)]">
        <video
          ref={videoRef}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          aria-label={title}
          onPlaying={() => {
            setStarted(true);
            setLoading(false);
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
            setLoading(false);
            setBuffering(false);
            if (videoRef.current) videoRef.current.currentTime = 0;
          }}
          onError={() => {
            setStarted(false);
            setLoading(false);
            setBuffering(false);
            setError(true);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {showPoster && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            draggable={false}
            loading={eagerPoster ? "eager" : "lazy"}
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        )}

        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            onPointerEnter={warmOnIntent}
            onFocus={warmOnIntent}
            disabled={loading}
            aria-label={`${playLabel}: ${title}`}
            className="absolute inset-0 z-10 h-full w-full !rounded-none !border-0 !bg-transparent !p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-bright disabled:cursor-wait"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/15" />
            <span className="absolute left-3 top-3 rounded-full border border-[#C08BE0]/40 bg-[#150823]/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] !text-[#F6EFFA]">
              {badge}
            </span>
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C08BE0]/70 bg-[#9B62B3] !text-[#F6EFFA] shadow-lg sm:h-16 sm:w-16">
              {loading ? (
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none" />
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6 !text-[#F6EFFA]"><path d="M8 5.5v13l11-6.5z" /></svg>
              )}
            </span>
            <span className="absolute inset-x-0 bottom-0 block p-4 sm:p-5">
              <span className="block font-serif text-xl font-bold italic leading-tight !text-[#F6EFFA] sm:text-2xl">{title}</span>
              <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.16em] !text-[#F6EFFA]">
                {loading ? "Loading video…" : error ? "Unable to play — tap to retry" : playLabel}
              </span>
            </span>
          </button>
        )}

        {started && buffering && (
          <div role="status" className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <span aria-hidden="true" className="h-10 w-10 animate-spin rounded-full border-2 border-[#C08BE0]/30 border-t-[#DCC8E6] motion-reduce:animate-none" />
            <span className="sr-only">Loading video…</span>
          </div>
        )}
      </div>
    </article>
  );
}

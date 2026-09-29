"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { claimAudio, releaseAudio } from "@/lib/audio-bus";

export type VoiceNote = {
  /** A file under /public, e.g. "/audio/voice-notes/note-1.mp3". */
  src: string;
  title: string;
  caption?: string;
};

type Props = {
  videos: readonly string[];
  voiceNotes?: readonly VoiceNote[];
};

/* =========================================================
   YOUTUBE
========================================================= */

/** Accepts watch?v=, youtu.be/, /shorts/, /embed/ and /live/ links. */
function getYouTubeId(raw: string): string | null {
  const value = raw.trim();

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || null;
    }

    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;

      const match = url.pathname.match(/\/(embed|shorts|v|live)\/([^/?#]+)/);
      if (match) return match[2];
    }
  } catch {
    /* not a URL — fall through to the loose match below */
  }

  return value.match(/[A-Za-z0-9_-]{11}/)?.[0] ?? null;
}

/**
 * YouTube rejects an embed with "Error 153" when it cannot verify which page
 * is framing it. Passing `origin` explicitly (and keeping the referrer intact
 * on the iframe) satisfies that check on localhost, tunnels and production
 * alike, because the value is read from the live location at click time.
 */
function buildEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
  });

  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

/* =========================================================
   SHARED SWIPE RAIL
========================================================= */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    rafRef.current = null;

    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards.length) return;

    const left = track.getBoundingClientRect().left;

    let closest = 0;
    let closestDistance = Infinity;

    cards.forEach((el, i) => {
      const distance = Math.abs(el.getBoundingClientRect().left - left);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });

    setIndex((previous) => (previous === closest ? previous : closest));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  // rAF keeps this cheap while scrolling, but it is throttled to zero in
  // background tabs and some embedded renderers, so a timeout backs it up.
  const schedule = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(measure);
    window.setTimeout(() => {
      if (rafRef.current !== null) measure();
    }, 120);
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
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [measure, schedule]);

  const step = useCallback((delta: number) => {
    const track = trackRef.current;
    if (!track) return;

    const first = track.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
    const amount = (first?.getBoundingClientRect().width ?? track.clientWidth * 0.8) + gap;

    track.scrollBy({
      left: delta * amount,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return { trackRef, index, atStart, atEnd, step };
}

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <path strokeLinecap="round" strokeLinejoin="round" d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

function Rail({
  label,
  hint,
  count,
  children,
}: {
  label: string;
  hint: string;
  count: number;
  children: React.ReactNode;
}) {
  const { trackRef, index, atStart, atEnd, step } = useRail();

  return (
    <div className={`am-rail${atStart ? " is-start" : ""}${atEnd ? " is-end" : ""}`}>
      <div className="am-rail-head">
        <p className="am-rail-label">{label}</p>

        <div className="am-rail-tools">
          <span className="am-rail-count" aria-hidden="true">
            {String(Math.min(index + 1, count)).padStart(2, "0")}
            <i>/</i>
            {String(count).padStart(2, "0")}
          </span>

          <button type="button" className="am-rail-nav" onClick={() => step(-1)} disabled={atStart} aria-label={`Previous — ${label}`}>
            <Chevron back />
          </button>
          <button type="button" className="am-rail-nav" onClick={() => step(1)} disabled={atEnd} aria-label={`Next — ${label}`}>
            <Chevron />
          </button>
        </div>
      </div>

      <div className="am-rail-viewport">
        <div
          ref={trackRef}
          className="am-rail-track"
          tabIndex={0}
          role="group"
          aria-label={`${label} — ${count} items, scrollable`}
          onKeyDown={(event) => {
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
          {children}
        </div>
      </div>

      <p className={`am-rail-hint${atEnd ? " is-done" : ""}`} aria-hidden="true">
        <span className="am-rail-hint-arrow">→</span>
        {atEnd ? "That’s all of them" : hint}
      </p>
    </div>
  );
}

/* =========================================================
   VIDEO CARD — thumbnail facade, swapped for the player on click
========================================================= */

function VideoCard({
  videoId,
  position,
  total,
  playing,
  onPlay,
}: {
  videoId: string;
  position: number;
  total: number;
  playing: boolean;
  onPlay: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  // The first few are always drawn, so the rail is never empty even if the
  // observer below is throttled or unavailable.
  const [near, setNear] = useState(position <= 3);

  // Beyond those, only fetch a thumbnail once the card is close to the
  // viewport, so a rail of 26 videos costs nothing until it is reached.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { root: el.closest(".am-rail-track"), rootMargin: "300px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const label = `Alain Martinos singing — video ${position} of ${total}`;

  return (
    <div ref={cardRef} data-card className="am-singer-card">
      {playing ? (
        <iframe
          src={buildEmbedUrl(videoId)}
          title={label}
          className="am-singer-player"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="am-singer-thumb" onClick={onPlay} aria-label={`Play ${label}`}>
          {near && (
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="am-singer-thumb-img"
            />
          )}
          <span aria-hidden="true" className="am-singer-scrim" />
          <span aria-hidden="true" className="am-singer-play">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
          <span aria-hidden="true" className="am-singer-index">
            {String(position).padStart(2, "0")}
          </span>
        </button>
      )}
    </div>
  );
}

/* =========================================================
   VOICE NOTE CARD
========================================================= */

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function VoiceNoteCard({
  note,
  position,
  playing,
  onToggle,
  onEnded,
}: {
  note: VoiceNote;
  position: number;
  playing: boolean;
  onToggle: () => void;
  onEnded: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.play().catch(() => setError(true));
    } else {
      audio.pause();
    }
  }, [playing]);

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div data-card className={`am-voice-card${playing ? " is-playing" : ""}`}>
      <audio
        ref={audioRef}
        src={note.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onEnded={() => {
          setTime(0);
          onEnded();
        }}
        onError={() => setError(true)}
      />

      <div className="am-voice-top">
        <button
          type="button"
          className="am-voice-button"
          onClick={onToggle}
          disabled={error}
          aria-label={`${playing ? "Pause" : "Play"} ${note.title}`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5.5v13l11-6.5z" /></svg>
          )}
        </button>

        <div className="am-voice-meta">
          <span className="am-voice-index">Voice note {String(position).padStart(2, "0")}</span>
          <strong className="am-voice-title">{note.title}</strong>
        </div>
      </div>

      {note.caption && <p className="am-voice-caption">{note.caption}</p>}

      <div className="am-voice-foot">
        <span
          className="am-voice-bar"
          role="progressbar"
          aria-label={`${note.title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span className="am-voice-bar-fill" style={{ width: `${progress}%` }} />
        </span>

        <span className="am-voice-time">
          {error ? "Unavailable" : `${formatTime(time)} / ${formatTime(duration)}`}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export function SingerMedia({ videos, voiceNotes = [] }: Props) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [playingNote, setPlayingNote] = useState<string | null>(null);

  // The YouTube iframe is cross-origin, so it fires no events we can hear.
  // Claim the audio bus for as long as a player is mounted, which is what
  // tells the background music to stay quiet. (The voice notes below are real
  // <audio> elements, so the bus picks those up on its own.)
  useEffect(() => {
    if (playingVideo) claimAudio("youtube-embed");
    else releaseAudio("youtube-embed");

    return () => releaseAudio("youtube-embed");
  }, [playingVideo]);

  const ids = videos.map(getYouTubeId).filter((id): id is string => Boolean(id));

  if (!ids.length && !voiceNotes.length) return null;

  return (
    <section className="am-singer" aria-label="Alain Martinos — performances">
      {/* Warm up the two origins the player needs, so the first tap is quick. */}
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />

      {ids.length > 0 && (
        <Rail label="Watch — performances" count={ids.length} hint={`Swipe for all ${ids.length} videos`}>
          {ids.map((videoId, i) => (
            <VideoCard
              key={videoId}
              videoId={videoId}
              position={i + 1}
              total={ids.length}
              playing={playingVideo === videoId}
              onPlay={() => {
                setPlayingNote(null);
                setPlayingVideo(videoId);
              }}
            />
          ))}
        </Rail>
      )}

      {voiceNotes.length > 0 && (
        <Rail label="Listen — voice notes" count={voiceNotes.length} hint={`Swipe for all ${voiceNotes.length} voice notes`}>
          {voiceNotes.map((note, i) => (
            <VoiceNoteCard
              key={note.src}
              note={note}
              position={i + 1}
              playing={playingNote === note.src}
              onToggle={() =>
                setPlayingNote((current) => (current === note.src ? null : note.src))
              }
              onEnded={() => setPlayingNote(null)}
            />
          ))}
        </Rail>
      )}
    </section>
  );
}

/** Kept so existing imports of the old name keep working. */
export const SingerVideoCarousel = SingerMedia;

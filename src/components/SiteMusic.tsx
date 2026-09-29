"use client";

import { useEffect, useRef } from "react";
import { setBackgroundMedia, subscribeAudioBus, watchMedia } from "@/lib/audio-bus";

/** Background music volume when nothing else is playing: 0.0 → 1.0 */
const BACKGROUND_VOLUME = 0.3;
const FADE_MS = 400;

export function SiteMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  /** Was the music actually playing when something else took over? */
  const resumeRef = useRef(false);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = BACKGROUND_VOLUME;

    // Start listening for every other player on the site, and make sure this
    // element is never mistaken for one of them.
    watchMedia();
    setBackgroundMedia(audio);

    /* ---------------------------------------------------------------
       Autoplay
    --------------------------------------------------------------- */

    const startMusic = async () => {
      try {
        await audio.play();
      } catch {
        // Most browsers block autoplay with sound.
        // In that case, start on the visitor's first interaction.
      }
    };

    startMusic();

    const startAfterInteraction = async () => {
      // Never fight a video or voice note for the speakers.
      if (!audio.paused || audio.dataset.ducked === "true") return;

      try {
        await audio.play();

        // Once music starts, we no longer need these listeners
        document.removeEventListener("click", startAfterInteraction);
        document.removeEventListener("touchstart", startAfterInteraction);
        document.removeEventListener("keydown", startAfterInteraction);
        document.removeEventListener("scroll", startAfterInteraction);
      } catch {
        // Browser still prevented playback
      }
    };

    document.addEventListener("click", startAfterInteraction);
    document.addEventListener("touchstart", startAfterInteraction);
    document.addEventListener("keydown", startAfterInteraction);
    document.addEventListener("scroll", startAfterInteraction);

    /* ---------------------------------------------------------------
       Ducking — fade out and pause while anything else plays
    --------------------------------------------------------------- */

    const clearFade = () => {
      if (fadeRef.current === null) return;
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    };

    const fadeTo = (target: number, onDone?: () => void) => {
      clearFade();

      const steps = 16;
      const from = audio.volume;
      const delta = (target - from) / steps;
      let done = 0;

      fadeRef.current = setInterval(() => {
        done += 1;
        const next = done >= steps ? target : from + delta * done;
        audio.volume = Math.min(1, Math.max(0, next));

        if (done >= steps) {
          clearFade();
          onDone?.();
        }
      }, FADE_MS / steps);
    };

    const unsubscribe = subscribeAudioBus((busy) => {
      if (busy) {
        // Remember whether it was genuinely playing, so a track the browser
        // never allowed to start does not suddenly begin later.
        resumeRef.current = !audio.paused;
        audio.dataset.ducked = "true";

        if (!audio.paused) {
          fadeTo(0, () => audio.pause());
        } else {
          audio.volume = 0;
        }
        return;
      }

      delete audio.dataset.ducked;

      if (!resumeRef.current) {
        audio.volume = BACKGROUND_VOLUME;
        return;
      }

      resumeRef.current = false;
      audio.volume = 0;
      audio
        .play()
        .then(() => fadeTo(BACKGROUND_VOLUME))
        .catch(() => {
          audio.volume = BACKGROUND_VOLUME;
        });
    });

    return () => {
      unsubscribe();
      clearFade();
      setBackgroundMedia(null);
      document.removeEventListener("click", startAfterInteraction);
      document.removeEventListener("touchstart", startAfterInteraction);
      document.removeEventListener("keydown", startAfterInteraction);
      document.removeEventListener("scroll", startAfterInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/salon-alain.mp3"
      autoPlay
      loop
      preload="auto"
    />
  );
}

"use client";

import { useEffect, useRef } from "react";

export function SiteMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // Background music volume: 0.0 → 1.0
    audio.volume = 0.3;

    // Try to start immediately
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
      if (!audio.paused) return;

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

    return () => {
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
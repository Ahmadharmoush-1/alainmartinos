"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  poster?: string;
  playLabel?: string;
};

export function VideoShort({
  src,
  title,
  poster,
  playLabel = "Play video",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);

  const handlePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      await video.play();
    } catch (error) {
      console.error("Video could not play:", src, error);
    }
  };

  return (
    <article className="group w-full">
      <div
        className="
          relative
          aspect-[9/16]
          w-full
          overflow-hidden
          rounded-[1.5rem]
          bg-black
          shadow-[0_20px_60px_rgba(35,15,28,0.16)]
          transition-all
          duration-700

          hover:-translate-y-1
          hover:shadow-[0_28px_80px_rgba(35,15,28,0.22)]
        "
      >
        {/* ACTUAL VIDEO */}

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          controls={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);

            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
          }}
          onError={(event) => {
            console.error(
              "Video error:",
              src,
              event.currentTarget.error
            );
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* CUSTOM COVER */}

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`${playLabel}: ${title}`}
            className="
              absolute
              inset-0
              z-10
              h-full
              w-full
              cursor-pointer
              text-left
            "
          >
            {/* DARK OVERLAY */}

            <span
              aria-hidden="true"
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/70
                via-black/5
                to-black/10
              "
            />

            {/* TOP LABEL */}

            <span
              className="
                absolute
                left-4
                top-4
                rounded-full
                border
                border-white/30
                bg-black/20
                px-3
                py-1.5
                font-sans
                text-[0.6rem]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white
                backdrop-blur-md
              "
            >
              Salon Alain
            </span>

            {/* PLAY BUTTON */}

            <span
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-16
                w-16
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/70
                bg-black/20
                text-white
                shadow-2xl
                backdrop-blur-md
                transition-all
                duration-500

                group-hover:scale-110
                group-hover:bg-white
                group-hover:text-plum-800

                sm:h-[4.5rem]
                sm:w-[4.5rem]
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-6 w-6"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>

            {/* TITLE */}

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <span
                className="
                  block
                  font-serif
                  text-xl
                  italic
                  leading-tight
                  text-white
                  drop-shadow-lg
                  sm:text-2xl
                "
              >
                {title}
              </span>

              <span
                className="
                  mt-2
                  block
                  font-sans
                  text-[0.6rem]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/70
                "
              >
                Watch video
              </span>
            </div>
          </button>
        )}
      </div>
    </article>
  );
}
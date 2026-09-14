import { VideoShort } from "./VideoShort";
import { Reveal } from "./Reveal";

type Short = {
  src: string;
  title: string;
  poster?: string;
};

type Props = {
  shorts: readonly Short[];
  playLabel?: string;
};

export function VideoShortsRow({
  shorts,
  playLabel = "Play video",
}: Props) {
  return (
    <div
      className="
        no-scrollbar
        -mx-5
        flex
        snap-x
        snap-mandatory
        gap-4
        overflow-x-auto
        px-5
        pb-3

        sm:mx-0
        sm:grid
        sm:grid-cols-2
        sm:gap-5
        sm:overflow-visible
        sm:px-0

        lg:grid-cols-4
        lg:gap-6
      "
    >
      {shorts.map((video, i) => (
        <Reveal
          key={video.src}
          delay={i * 90}
          className="
            w-[78vw]
            max-w-[320px]
            shrink-0
            snap-center

            sm:w-auto
            sm:max-w-none
          "
        >
          <VideoShort
            src={video.src}
            title={video.title}
            poster={video.poster}
            playLabel={playLabel}
          />
        </Reveal>
      ))}
    </div>
  );
}
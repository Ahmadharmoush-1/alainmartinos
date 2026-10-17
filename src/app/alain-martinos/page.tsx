import type { Metadata } from "next";

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { VideoShortsRow } from "@/components/VideoShortsRow";
import { ChapterCarousel } from "@/components/ChapterCarousel";

import { getContent } from "@/lib/i18n";
import { videos } from "@/lib/images";
import { coverSizes, fullSizeImageUrl, responsiveImage } from "@/lib/media";
import { SITE_URL } from "@/lib/site";

const a = getContent().alain;
const v = getContent().home.video;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: `${a.title} – Hairdresser, Visagist, Singer & Collector.`,
  description: a.description,
  alternates: {
    canonical: "/alain-martinos",
  },
  openGraph: {
    title: `${a.title} | Salon Alain Martinos`,
    description: a.description,
    url: "/alain-martinos",
    type: "profile",
  },
};

/* =========================================================
   TYPES
========================================================= */

type Chapter = {
  id: string;
  number: string;
  title: string;
  paragraphs: readonly string[];
  quote?: string;
  lenses?: readonly {
    role: string;
    what: string;
  }[];
  identities?: readonly string[];
  closing?: readonly string[];
};

type Portrait = {
  src: string;
  alt: string;
};

type VoiceNote = {
  src: string;
  title: string;
  caption: string;
};

/* =========================================================
   FOUNDER PORTRAIT
========================================================= */

const portrait: Portrait = {
  src: "/images/alain-between-sections-01.jpg",
  alt: "Alain Martinos in the salon",
};

/* =========================================================
   PERSON SCHEMA
========================================================= */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/alain-martinos#person`,
  name: "Alain Martinos",
  jobTitle: "Hairdresser & Visagist",
  description: a.description,
  nationality: ["Lebanese"],
  url: `${SITE_URL}/alain-martinos`,
  ...(portrait
    ? {
        image: new URL(portrait.src, SITE_URL).href,
      }
    : {}),
  worksFor: {
    "@id": `${SITE_URL}/#salon`,
  },
  knowsAbout: [
    "Hairdressing",
    "Balayage",
    "Hair color",
    "Visagism",
    "Singing",
    "Barbie collecting",
    "Intellectual property law",
  ],
};

/* =========================================================
   CHAPTER IMAGES
========================================================= */

const chapterImages: Partial<Record<number, Portrait>> = {
  0: {
    src: "/images/alainmartinos.jpg",
    alt: "Alain Martinos",
  },

  2: {
    src: "/images/alain-044.jpg",
    alt: "Alain Martinos’s Barbie collection",
  },

  4: {
    src: "/images/about-alain1.jpg",
    alt: "Alain Martinos between Lebanon and Germany",
  },
};

/* =========================================================
   TWO LARGE IMAGES BETWEEN PAGE SECTIONS

   Put your photos inside /public/images/ and change only the
   two `src` paths below. The images keep their original ratio.
========================================================= */

const betweenSectionImages: readonly Portrait[] = [
  {
    src: "/images/alainoncouch.jpg",
    alt: "Alain Martinos - featured salon photograph",
  },
  {
    src: "/images/alain-between-sections-02.jpg",
    alt: "Alain Martinos - featured editorial photograph",
  },
];

/* =========================================================
   BARBIE COLLECTION CAROUSEL
========================================================= */

const collectorSlides: readonly Portrait[] = [
  {
    src: "/images/alain-044.jpg",
    alt: "Part of Alain Martinos’s Barbie collection",
  },

  {
    src: "/images/barbie-collection-icon4.jpg",
    alt: "Alain Martinos’s Barbie collection",
  },

  {
    src: "/images/barbie-collection-icon.jpg",
    alt: "Barbie dolls from Alain Martinos’s collection",
  },
];

/* =========================================================
   PERSONAL BARBIE MILESTONES

   CHANGE ONLY THE TWO IMAGE PATHS BELOW.
========================================================= */

const collectorMilestones = [
  {
    src: "/images/my-first-barbie.jpg",

    alt: "Hawaii-Hawaiian Fun Barbie, Alain Martinos’s first Barbie as a child",

    title: "My First Barbie as a Kid",

    subtitle: "Hawaii-Hawaiian Fun Barbiee · 1990 · China Version",
  },

  {
    src: "/images/dream-date-barbie.jpg",

    alt:
      "Dream Date Soirée Barbie, the Barbie Alain Martinos dreamed of owning as a child",

    title:
      "The Barbie That I Never Owned as a Child — and the One That Took My Breath Away",

    subtitle: "Dream Date / Soirée Barbie · 1982 · Taiwan Version",
  },
] as const;

/* =========================================================
   ALAIN GALLERY
========================================================= */

const galleryImages: readonly Portrait[] = [
  {
    src: "/images/alain-gallery/01.jpg",
    alt: "Alain Martinos, portrait",
  },

  {
    src: "/images/alain-gallery/02.jpg",
    alt: "Alain Martinos at work in the salon",
  },

  {
    src: "/images/alain-gallery/03.jpg",
    alt: "Alain Martinos performing",
  },

  {
    src: "/images/alain-gallery/04.jpg",
    alt: "Alain Martinos between Lebanon and Germany",
  },
];

/* =========================================================
   VOICE NOTES - CUSTOM DISPLAY ORDER
========================================================= */

const voiceNotesDirectory = join(
  process.cwd(),
  "public",
  "audio",
  "voice-notes",
);

// Use exact filenames from public/audio/voice-notes (no folder prefix).
// These recordings appear first, in this order, and only once.
const preferredSongOrder: readonly string[] = [
  "Algani Ba3ed Youmein.mp3",
  "Ba3ed El Lyoum.mp3",
  "Cht2atellak Hayaty.mp3",
  "Ya Oumana Ya Maryam El 3zra2.mp3",
  "Chante ô mon amour.mp3",
  "A3tina Rabi.mp3",
  "Wa3adouni.mp3",
  "Kilmet Hob.mp3",
  "Ya Hobi le Ghab.mp3",
];

const singerVoiceNotes: readonly VoiceNote[] = existsSync(
  voiceNotesDirectory,
)
  ? [...new Set(
      readdirSync(voiceNotesDirectory).filter((fileName) =>
        fileName.toLowerCase().endsWith(".mp3"),
      ),
    )]
      .sort((first, second) => {
        const firstIndex = preferredSongOrder.indexOf(first);
        const secondIndex = preferredSongOrder.indexOf(second);

        // Both selected: follow the exact priority order.
        if (firstIndex !== -1 && secondIndex !== -1) {
          return firstIndex - secondIndex;
        }
        if (firstIndex !== -1) return -1;
        if (secondIndex !== -1) return 1;

        // Every other recording comes afterward, alphabetically.
        return first.localeCompare(second, "en", {
          numeric: true,
          sensitivity: "base",
        });
      })
      .map((fileName) => ({
        // Encode spaces and accented letters safely in the URL.
        src: `/audio/voice-notes/${encodeURIComponent(fileName)}`,

        // Display the EXACT filename (including the .mp3 extension).
        title: fileName.replace(/\.mp3$/i, ""),
        caption: "Alain Martinos",
      }))
  : [];

/* =========================================================
   COLLECTOR CHAPTER
========================================================= */

const collectorIndex = a.chapters.findIndex(
  (chapter) => chapter.id === "collector",
);

const collectorChapter =
  collectorIndex >= 0
    ? a.chapters[collectorIndex]
    : undefined;

/* =========================================================
   ICONS
========================================================= */

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h16m-6-6 6 6-6 6"
      />
    </svg>
  );
}

/* =========================================================
   CONTACT BUTTON
========================================================= */

function ContactButton({
  label,
}: {
  label: string;
}) {
  return (
    <Link href="/contact" className="am-button">
      {label}
      <Arrow />
    </Link>
  );
}

/* =========================================================
   PHOTO
========================================================= */

function Photo({
  image,
  priority = false,
  className = "",
}: {
  image: Portrait;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`am-photo ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 80vw, 55vw"
        className="am-photo-image"
      />
    </div>
  );
}

/* =========================================================
   FULL-SIZE SECTION IMAGE
   Natural image ratio, no cropping on mobile or desktop.
========================================================= */

function BetweenSectionImage({ image }: { image: Portrait }) {
  return (
    <section
      className="am-between-section-image am-container"
      aria-label={image.alt}
    >
      <figure className="am-between-section-figure">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}

/* =========================================================
   PROSE
========================================================= */

function Prose({
  paragraphs,
}: {
  paragraphs: readonly string[];
}) {
  return (
    <div className="am-prose">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

/* =========================================================
   PULL QUOTE
========================================================= */

function PullQuote({
  text,
}: {
  text: string;
}) {
  return (
    <blockquote className="am-quote">
      <p>“{text}”</p>
    </blockquote>
  );
}

/* =========================================================
   SINGER RECORDINGS
========================================================= */

function SingerRecordings({
  songs,
}: {
  songs: readonly VoiceNote[];
}) {
  if (songs.length === 0) return null;

  return (
    <section
      className="am-singer"
      aria-labelledby="am-recordings-title"
    >
    <div className="am-singer-image">
  <picture>
    <source
      media="(max-width: 768px)"
      srcSet={responsiveImage("/images/alainthesinger-mobile.jpg").srcSet ?? "/images/alainthesinger-mobile.jpg"}
      sizes="100vw"
      width={1024}
      height={1304}
    />

    <img
      {...responsiveImage("/images/alainthesinger.jpg")}
      sizes="(max-width: 768px) 100vw, 760px"
      width={1024}
      height={1536}
      loading="lazy"
      decoding="async"
      alt="Alain Martinos the Singer"
    />
  </picture>
</div>

      <section
        className="am-recordings"
        aria-labelledby="am-recordings-title"
      >
        <header className="am-recordings-header">
          <div>
            <p className="am-eyebrow">
              Music &amp; performance
            </p>

            <h3 id="am-recordings-title">
              Listen to Alain
            </h3>

            <p className="am-recordings-description">
              Explore Alain Martinos’s recordings.
            </p>
          </div>

          <span className="am-recordings-count">
            {songs.length} recordings
          </span>
        </header>

        <ol
          className="am-recordings-list"
          tabIndex={0}
          aria-label="Alain Martinos audio recordings"
        >
          {songs.map((song, index) => (
            <li
              className="am-recording"
              key={song.src}
            >
              <div className="am-recording-top">
                <span className="am-recording-number">
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 40 28"
                  fill="none"
                  className="am-recording-icon"
                >
                  <path
                    d="M3 12v4m6-9v14m6-18v22m6-12v2m6-10v18m6-13v8m4-5v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="am-recording-info">
                <h4>{song.title}</h4>
                <p>{song.caption}</p>
              </div>

              <audio
                controls
                preload="none"
                src={song.src}
                aria-label={`Play ${song.title} by Alain Martinos`}
              >
                Your browser does not support audio
                playback.
              </audio>
            </li>
          ))}
        </ol>

        <p className="am-recordings-hint">
          Scroll to explore all recordings
        </p>
      </section>
    </section>
  );
}

/* =========================================================
   PERSONAL BARBIE MILESTONES
========================================================= */

function CollectorMilestones() {
  return (
    <section
      className="am-collector-milestones"
      aria-labelledby="collector-milestones-title"
    >
      <header className="am-collector-milestones-intro">
        <p className="am-eyebrow">
          Personal Collection Milestones
        </p>

        <h3 id="collector-milestones-title">
          Two Dolls. Two Unforgettable Memories.
        </h3>

        <p className="am-collector-milestones-lead">
          Two Barbies that hold a particularly
          meaningful place in the story behind my
          collection.
        </p>
      </header>

      <div className="am-collector-milestones-grid">
        {collectorMilestones.map(
          (barbie, index) => (
            <figure
              key={barbie.src}
              className={`am-collector-milestone ${
                index === 1
                  ? "am-collector-milestone-offset"
                  : ""
              }`}
            >
              <div className="am-collector-milestone-image">
                <Image
                  src={barbie.src}
                  alt={barbie.alt}
                  fill
                  loading="lazy"
                  sizes={coverSizes(barbie.src, 3 / 4, "(max-width: 639px) calc(100vw - 16px), (max-width: 750px) 520px, (max-width: 1235px) 43vw, 530px")}
                  className="am-collector-milestone-img"
                />

                <span
                  className="am-collector-milestone-index"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>
              </div>

              <figcaption className="am-collector-milestone-caption">
                <strong>
                  {barbie.title}
                </strong>

                <span>
                  {barbie.subtitle}
                </span>
              </figcaption>
            </figure>
          ),
        )}
      </div>
    </section>
  );
}

/* =========================================================
   CHAPTER LINKS
========================================================= */

/* =========================================================
   BARBIE COLLECTING HAS NO GENDER
   Add your photo at public/images/barbie-community.jpg.
   Update the alt text below to describe the photo you choose.
   The existing collection photo is used until the new file exists.
========================================================= */

const hasCollectorCommunityImage = existsSync(
  join(process.cwd(), "public", "images", "barbie-community.jpg"),
);

const collectorCommunityImage: Portrait = {
  src: hasCollectorCommunityImage
    ? "/images/barbie-community.jpg"
    : "/images/alain-044.jpg",
  alt: hasCollectorCommunityImage
    ? "The international Barbie collecting community"
    : "Alain Martinos’s Barbie collection",
};

function CollectorPassionStory() {
  return (
    <section className="am-collector-story" aria-labelledby="collector-passion-title" lang="en">
      <header className="am-collector-story-header">
        
<h3
  id="collector-passion-title"
  className="font-serif italic text-[24px] font-semibold leading-tight sm:text-[28px] lg:text-[32px]"
>
  Barbie Collecting Has No Gender: A Passion Beyond Boundaries 💜
</h3>

      </header>
      <div className="am-collector-story-body">
        <section className="am-collector-story-section" aria-labelledby="collector-story-0">
          <h4 id="collector-story-0">{"From the Middle East to the International Barbie Collecting Community"}</h4>
          <div className="am-collector-story-prose">
            <p>{"Barbie is far more than a childhood toy. For adult collectors around the world, she represents fashion history, artistic creativity, design, nostalgia and a lifelong passion that transcends age, gender and cultural boundaries."}</p>
            <p>{"My name is Alain Martinos, and I am a Lebanese-German Barbie collector whose passion began in 2002. Today, my collection exceeds 10,000 Barbie dolls, reflecting more than two decades of dedication to preserving and celebrating Barbie’s extraordinary history."}</p>
            <p>{"My collection focuses particularly on Barbie dolls released between 1976 till 2003, a remarkable period encompassing iconic fashions, memorable face sculpts, changing hairstyles, diverse characters and some of the most beloved eras in Barbie’s history. I have a special appreciation for the vintage and classic dolls that represent Barbie’s evolution through fashion, beauty and popular culture."}</p>
            <p>{"As an adult male collector in the Middle East, I want to demonstrate that a passion for dolls is not defined by gender, nationality or society’s expectations."}</p>
          </div>
        </section>
        <section className="am-collector-story-section" aria-labelledby="collector-story-1">
          <h4 id="collector-story-1">{"Mattel Creations: Celebrating Collectors and Creativity"}</h4>
          <div className="am-collector-story-prose">
            <p>{"Through Mattel Creations and Barbie Signature, Mattel offers collectible dolls, limited editions, designer collaborations, vintage reproductions and tributes to cultural icons. These collections celebrate Barbie as a collectible object of fashion, design and art, appealing to adult enthusiasts who appreciate craftsmanship, rarity and cultural significance."}</p>
            <p>{"Barbie’s evolution and expanding diversity also invite us to challenge traditional stereotypes. A doll can inspire creativity, storytelling, fashion design and personal expression. There is no reason these interests should be restricted to one gender."}</p>
          </div>
        </section>
        <section className="am-collector-story-section" aria-labelledby="collector-story-2">
          <h4 id="collector-story-2">{"Adult Male Barbie Collectors: A Worldwide Community"}</h4>
          <div className="am-collector-story-prose">
            <p>{"Adult men are part of the international Barbie collecting community. They build extensive collections, research doll history, preserve rare editions, share their knowledge and attend conventions dedicated to their passion."}</p>
              <figure className="am-collector-story-photo">
                <figcaption className="am-collector-story-photo-title">
                  <span>Alain Martinos and Bettina Dorfmann — Barbie Convention in Germany</span>{" "}
                  <a
                    href="https://www.instagram.com/bettina.dorfmann.barbiepuppen/p/BLZXzN3jW34/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <time dateTime="2016-10-10">October 10, 2016</time>
                  </a>
                </figcaption>
                <div className="am-collector-story-image">
                  <Image
                    src={collectorCommunityImage.src}
                    alt={collectorCommunityImage.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 639px) calc(100vw - 16px), (max-width: 1235px) 89vw, 1100px"
                    className="am-collector-story-img"
                  />
                </div>
              </figure>
            <p>{"One remarkable example is Bettina Dorfmann, the renowned German Barbie collector whom I know personally through Barbie doll conventions in Germany. Recognised by Guinness World Records for her extraordinary Barbie collection, reported to exceed 18,000 dolls, Bettina is a prominent figure in the international collecting world."}</p>
            <p>{"As someone who owns more than 10,000 Barbie dolls myself, I feel connected to this international community of collectors who dedicate their time, knowledge and enthusiasm to preserving Barbie’s legacy."}</p>
            <p>{"International conventions, including the National Barbie Doll Collectors Convention in the United States and collector gatherings in Germany, bring enthusiasts together to exchange knowledge, discover rare dolls, celebrate fashion and build friendships across borders. These events demonstrate that Barbie collecting is an established adult collecting culture, shared by people from many different backgrounds, including men."}</p>
            <p>{"Although there is no reliable public statistic establishing the exact number of adult male Barbie collectors worldwide, their presence in the collecting community is undeniable."}</p>
          </div>
        </section>
        <section className="am-collector-story-section" aria-labelledby="collector-story-3">
          <h4 id="collector-story-3">{"Psychology, Identity and Freedom of Expression"}</h4>
          <div className="am-collector-story-prose">
            <p>{"Psychologically, hobbies can provide opportunities for enjoyment, creativity, connection and personal fulfilment. Research published in Nature Medicine in 2023 found an association between participation in hobbies and better measures of mental well-being among adults across 16 countries."}</p>
            <p>{"Collecting Barbie can involve historical research, organisation, aesthetic appreciation, photography, styling and the preservation of cultural objects. Like other collecting interests, it can become a meaningful part of someone’s personal identity."}</p>
            <p>{"Collecting dolls does not determine a man’s masculinity, sexual orientation or gender identity. A doll can be admired, styled, displayed, photographed, collected or played with by anyone. There is no single correct way to express masculinity, femininity or individuality."}</p>
          </div>
        </section>
        <section className="am-collector-story-section" aria-labelledby="collector-story-4">
          <h4 id="collector-story-4">{"Lebanon: Challenging Gender Stereotypes and Homophobia"}</h4>
          <div className="am-collector-story-prose">
            <p>{"In Lebanon, where conservative social expectations and homophobia can make authentic self-expression difficult, an adult man who collects Barbie may encounter misunderstanding, ridicule or prejudice."}</p>
            <p>{"I believe that no one should have to hide a meaningful passion simply because it does not conform to society’s expectations of how a man should behave. The value of a hobby should be measured by the joy, creativity and meaning it brings to the individual—not by gender stereotypes."}</p>
            <p>{"My collection is more than a number of dolls. It represents years of dedication, a deep appreciation of fashion and design, and a personal connection to an international community that shares my passion."}</p>
            <p>{"I hope to encourage a more open-minded society in which people can appreciate differences without judgment, where men can love dolls without shame, and where creativity is welcomed rather than questioned."}</p>
          </div>
        </section>
        <section className="am-collector-story-section am-collector-story-message" aria-labelledby="collector-story-5">
          <h4 id="collector-story-5">{"My Message to the World 💜"}</h4>
          <div className="am-collector-story-prose">
            <p>{"As a male Barbie collector from the Middle East with more than 10,000 dolls, particularly focused on the years 1976 till 2003, I stand for the freedom to pursue one’s passion openly and proudly."}</p>
            <p>{"Barbie belongs to everyone. Passion has no gender. Collecting has no age limit. And authenticity has no boundaries."}</p>
            <p>{"Because the freedom to love what you love should never depend on where you were born, how you identify or what society expects of you."}</p>
          </div>
        </section>
      </div>
    </section>
  );
}

function ChapterLinks() {
  return (
    <ol className="am-chapter-links">
      {a.chapters.map((chapter, index) => (
        <li key={chapter.id}>
          <a href={`#${chapter.id}`}>
            <span>
              {chapter.number}. {chapter.title}
            </span>

            <span
              className="am-nav-number"
              aria-hidden="true"
            >
              {String(index + 1).padStart(
                2,
                "0",
              )}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/* =========================================================
   CHAPTER SECTION
========================================================= */

function ChapterSection({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const image = chapterImages[index];
  const isCollector =
    chapter.id === "collector";

  return (
    <article
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      className={`am-chapter ${
        index % 2 === 1
          ? "am-chapter-card"
          : ""
      }`}
    >
      <header className="am-chapter-header">
        <div className="am-chapter-top">
          <span
            className="am-chapter-number"
            aria-hidden="true"
          >
            {String(index + 1).padStart(
              2,
              "0",
            )}
          </span>
        </div>

        <h2 id={`${chapter.id}-heading`}>
          {chapter.title}
        </h2>
      </header>

      <div
        className={`${
          index === 0
            ? "am-intro-columns "
            : ""
        }am-chapter-description`}
      >
        <Prose
          paragraphs={chapter.paragraphs}
        />
      </div>

      {chapter.title
        .toLowerCase()
        .includes("singer") && (
        <SingerRecordings
          songs={singerVoiceNotes}
        />
      )}

      {image && (
        <div
          className={
            isCollector
              ? "am-archive"
              : "am-chapter-visual"
          }
        >
          {isCollector ? (
            <ChapterCarousel
              slides={collectorSlides}
              label="Barbie collection"
            />
          ) : (
            <Photo image={image} />
          )}

          {isCollector && (
            <aside
              className="am-archive-note"
              aria-label="The collection"
            >
              <span className="am-eyebrow">
                The Living Archive
              </span>

              <strong>10,000+</strong>

              <p>
                Barbie dolls. A lifetime of
                beauty, fashion, and memories.
              </p>
            </aside>
          )}
        </div>
      )}

      {/* TWO SPECIAL BARBIES */}
      {isCollector && (
        <CollectorMilestones />
      )}

      {!!chapter.lenses?.length && (
        <dl className="am-lenses">
          {chapter.lenses.map(
            (lens, lensIndex) => (
              <div key={lens.role}>
                <span
                  className="am-eyebrow"
                  aria-hidden="true"
                >
                  0{lensIndex + 1}
                </span>

                <dt>{lens.role}</dt>

                <dd>{lens.what}</dd>
              </div>
            ),
          )}
        </dl>
      )}

      {!!chapter.identities?.length && (
        <div className="am-identities">
          <p className="am-eyebrow">
            Identity Manifesto
          </p>

          <p className="am-small">
            He is
          </p>

          <ul>
            {chapter.identities.map(
              (identity) => (
                <li key={identity}>
                  {identity}
                </li>
              ),
            )}
          </ul>
        </div>
      )}

      {!!chapter.closing?.length && (
        <Prose
          paragraphs={chapter.closing}
        />
      )}

      {chapter.quote && (
        <PullQuote
          text={chapter.quote}
        />
      )}
    </article>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AlainPage() {
  return (
    <div className="alain-editorial page-purple-background">
      <style>{pageCss}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="am-hero"
        aria-labelledby="alain-heading"
      >
        <div
          className="am-hero-background"
          aria-hidden="true"
        />

        <div className="am-container am-hero-content">
          <p className="am-eyebrow">
            Haute Coiffure · Visagisme · Collection
          </p>

          
<h1 id="alain-heading" className="italic">
  {a.heading}
</h1>


          <ul
            className="am-roles"
            aria-label="Roles"
          >
            {a.roles.map((role) => (
              <li key={role}>
                {role}
              </li>
            ))}
          </ul>

          <p className="am-hero-description">
            A life dedicated to transforming
            imagination into tangible beauty across
            Lebanon and Germany.
          </p>

          <div className="am-actions">
            <ContactButton label={a.cta} />

            <a
              href="#editorial-chronicle"
              className="am-button am-button-secondary"
            >
              Explore Monograph
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          BIOGRAPHY
      ===================================================== */}

      <section
        className="am-chronicle am-container"
        id="editorial-chronicle"
        aria-label="The Alain Martinos biography"
      >
        <div className="am-editorial-grid">
          <aside className="am-sidebar">
            <nav
              className="am-desktop-nav"
              aria-label="Biography chapters"
            >
              <p className="am-eyebrow">
                Chronicle Chapters
              </p>

              <ChapterLinks />

              <div className="am-sidebar-note">
                <p className="am-eyebrow">
                  Archive Note
                </p>

                <p>
                  Twenty-five years of hair,
                  beauty, music, and collecting.
                </p>
              </div>
            </nav>

            <details className="am-mobile-nav">
              <summary>
                Explore the chapters
                <span aria-hidden="true">
                  ＋
                </span>
              </summary>

              <nav aria-label="Biography chapters">
                <ChapterLinks />
              </nav>
            </details>

            {portrait && (
             
<figure className="am-founder mx-auto w-full">
  <div className="relative w-full overflow-hidden rounded-[22px] bg-[#27183b]">
    <Image
      src={portrait.src}
      alt={portrait.alt}
      width={1120}
      height={1372}
      priority
      sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 380px, 30vw"
      className="block h-auto w-full object-contain"
    />
  </div>

  <figcaption>
    Alain Martinos
  </figcaption>
</figure>

            )}
          </aside>

          <div className="am-editorial-flow">
            <div className="am-opening">
              <Prose
                paragraphs={[a.intro]}
              />

              <PullQuote text={a.thesis} />

              <Prose
                paragraphs={[
                  a.introAfter,
                ]}
              />
            </div>

            {a.chapters.map(
              (chapter, index) =>
                index === collectorIndex ? (
                  null
                ) : (
                  <ChapterSection
                    key={chapter.id}
                    chapter={chapter}
                    index={index}
                  />
                ),
            )}
          </div>
        </div>
      </section>

      {/* FIRST LARGE PHOTO - BETWEEN BIOGRAPHY AND INSPIRATION */}
      <BetweenSectionImage image={betweenSectionImages[0]} />

      {/* =====================================================
          INSPIRATION
      ===================================================== */}

      <section
        className="am-inspiration am-container"
        aria-labelledby="inspiration-heading"
      >
        <header className="am-section-header">
          <div>
            <p className="am-eyebrow">
              Pillars of Influence
            </p>

            <h2 id="inspiration-heading">
              {a.inspiration.title}
            </h2>
          </div>
        </header>

        <ul className="am-inspiration-grid">
          {a.inspiration.items.map(
            (item, index) => (
              <li key={item.title}>
                <span
                  className="am-card-number"
                  aria-hidden="true"
                >
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <h3>{item.title}</h3>

                <p className="am-eyebrow am-card-sub">
                  {item.sub}
                </p>

                <p className="am-card-description">
                  {item.desc}
                </p>
              </li>
            ),
          )}
        </ul>
      </section>

      {/* =====================================================
          MEANING
      ===================================================== */}

      <section
        className="am-meaning"
        aria-labelledby="meaning-heading"
      >
        <div className="am-container">
          <div className="am-resilience">
            <p className="am-eyebrow">
              The Continuous Thread
            </p>

            <p className="am-resilience-lead">
              {a.inspiration.resilience.lead}
            </p>

            <div className="am-resilience-lines">
              {a.inspiration.resilience.lines.map(
                (line) => (
                  <p key={line}>
                    {line}
                  </p>
                ),
              )}
            </div>

            <h2 id="meaning-heading">
              {a.meaning.title}
            </h2>

            <p className="am-meaning-lead">
              {a.meaning.lead}
            </p>

            <ul className="am-passions">
              {a.meaning.passions.map(
                (passion) => (
                  <li key={passion}>
                    {passion}
                  </li>
                ),
              )}
            </ul>
          </div>

          <ul className="am-arcs">
            {a.meaning.arcs.map(
              (arc) => (
                <li key={arc.from}>
                  <p className="am-arc-from">
                    {arc.from}
                  </p>

                  <Arrow />

                  <p className="am-arc-to">
                    {arc.to}
                  </p>
                </li>
              ),
            )}
          </ul>

          <div className="am-meaning-closing">
            {a.meaning.closing.map(
              (line) => (
                <p key={line}>
                  {line}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* SECOND LARGE PHOTO - BETWEEN MEANING AND FILMS */}
      <BetweenSectionImage image={betweenSectionImages[1]} />

      {/* =====================================================
          FILMS
      ===================================================== */}

      <section
        className="am-media am-container"
        aria-labelledby="films-heading"
      >
        <header className="am-section-header">
          <div>
            <p className="am-eyebrow">
              In Motion
            </p>

            <h2 id="films-heading">
              Alain Martinos Reels &amp; Videos
            </h2>

            <p className="am-media-lead">
              {v.subtitle}
            </p>
          </div>
        </header>

        <div className="am-video-rail">
          <VideoShortsRow
            shorts={videos}
            playLabel={v.play}
            badge="Salon Alain Hair & Beauty"
          />
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section
        className="am-media am-container"
        aria-labelledby="am-gallery-heading"
      >
        <header className="am-section-header">
          <div>
            <p className="am-eyebrow">
              The Gallery
            </p>

            <h2 id="am-gallery-heading">
              Alain Martinos Pictures &amp;
              Photoshoots
            </h2>

            <p className="am-media-lead">
              Moments from the atelier, the stage
              and the collection.
            </p>
          </div>
        </header>

        <ul className="am-gallery-grid">
          {galleryImages.map(
            (image) => (
              <li key={image.src}>
                <figure>
                  <div className="am-gallery-photo">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 46vw, (max-width: 1023px) 45vw, 30vw"
                      className="am-photo-image"
                    />
                  </div>
                </figure>
              </li>
            ),
          )}
        </ul>

        <div className="am-gallery-action">
          <Link
            href="/alain-gallery"
            className="am-button"
          >
            View full gallery
            <Arrow />
          </Link>
        </div>
      </section>

      {/* =====================================================
          BARBIE COLLECTOR
      ===================================================== */}

      {collectorChapter && (
        <section
          className="am-collector am-container"
          aria-label={
            collectorChapter.title
          }
        >
          <ChapterSection
            chapter={collectorChapter}
            index={collectorIndex}
          />

          <CollectorPassionStory />

          <a
            href="https://www.instagram.com/barbie80s/"
            target="_blank"
            rel="noopener noreferrer"
            className="am-instagram-collection"
            aria-label="Follow Alain Martinos on Instagram and see his Barbie collection (opens in a new tab)"
          >
            <span
              className="am-instagram-icon"
              aria-hidden="true"
            >
              <Image
                src="/images/barbie-collection-icon2.png"
                alt=""
                fill
                sizes="110px"
                className="object-cover scale-100"
              />
            </span>

            <span className="am-instagram-copy">
              <strong>
                Follow Alain on Instagram and See
                his Huge Barbie Collection
              </strong>

              <span />
            </span>

            <span
              className="am-instagram-arrow"
              aria-hidden="true"
            >
              <Arrow />
            </span>
          </a>
        </section>
      )}

      {/* =====================================================
          FINAL SIGNATURE
      ===================================================== */}

      <section
        className="am-signature am-container"
        id="booking"
        aria-label="A personal reflection"
      >
        <div className="am-signature-card">
          <figure>
            <blockquote>
              {a.finalQuote.lines.map(
                (line) => (
                  <p key={line}>
                    {line}
                  </p>
                ),
              )}
            </blockquote>

            <figcaption>
              — {a.finalQuote.attribution}
            </figcaption>
          </figure>

          <ContactButton label={a.cta} />
        </div>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            personSchema,
          ).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}

/* =========================================================
   PAGE CSS
========================================================= */

const pageCss = `

.alain-editorial{
  --am-bg:#1a0b2e;
  --am-panel:#231437;
  --am-raised:#27183b;
  --am-text:#eddcff;
  --am-muted:#d0c2d0;
  --am-accent:#e4b5ff;
  --am-line:#4d444f;

  min-width:0;
  background:var(--am-bg);
  color:var(--am-text);
  font-family:"Manrope",Arial,sans-serif;
  font-size:16px;
  line-height:1.7;
  overflow-wrap:anywhere;
}

.alain-editorial *{
  box-sizing:border-box;
}

.alain-editorial :is(
  h1,
  h2,
  h3,
  p,
  figure,
  blockquote,
  ul,
  ol,
  dl,
  dd
){
  margin:0;
}

.alain-editorial :is(ul,ol){
  padding:0;
  list-style:none;
}

.alain-editorial :is(h1,h2,h3){
  font-family:"EB Garamond",Georgia,serif;
  color:var(--am-text);
  font-weight:400;
  text-wrap:balance;
}

.alain-editorial h2{
  font-size:clamp(2rem,3.4vw,3.25rem);
  line-height:1.12;
  letter-spacing:.01em;
}

.alain-editorial h3{
  font-size:1.65rem;
  line-height:1.3;
}

.alain-editorial a{
  text-decoration:none;
  color:inherit;
}

.alain-editorial a:focus-visible,
.alain-editorial summary:focus-visible{
  outline:2px solid var(--am-accent);
  outline-offset:5px;
}

.alain-editorial ::selection{
  background:#633382;
  color:#fff;
}

.alain-editorial .am-container{
  width:min(100%,1440px);
  margin-inline:auto;
  padding-inline:clamp(20px,5.5vw,80px);
}

.alain-editorial .am-eyebrow{
  font-size:.7rem;
  font-weight:500;
  letter-spacing:.22em;
  text-transform:uppercase;
  line-height:1.7;
  color:var(--am-accent);
}

.alain-editorial :is(
  .am-prose,
  .am-hero-description,
  .am-sidebar-note,
  .am-archive-note p,
  .am-lenses dd,
  .am-card-description,
  .am-resilience-lead,
  .am-meaning-lead,
  .am-media-lead,
  .am-gallery-grid figcaption
){
  font-weight:600;
}

/* =========================================================
   HERO
========================================================= */

.alain-editorial .am-hero{
  position:relative;
  isolation:isolate;
  padding:
    clamp(88px,10vw,144px)
    0
    clamp(52px,7vw,96px);
  overflow:hidden;
}

.alain-editorial .am-hero-background{
  position:absolute;
  inset:0;
  z-index:-1;

  background:
    radial-gradient(
      ellipse at 50% 35%,
      rgba(99,51,130,.27),
      transparent 68%
    ),
    linear-gradient(
      rgba(26,11,46,.91),
      #1a0b2e
    ),
    url('${fullSizeImageUrl("/images/footer-bg.jpg")}')
    center/cover no-repeat;
}

.alain-editorial .am-hero-content{
  text-align:center;
}

.alain-editorial .am-hero h1{
  font-size:clamp(3.1rem,8.4vw,7rem);
  line-height:1;
  letter-spacing:-.035em;
  margin:20px auto 24px;
  max-width:1100px;
}

.alain-editorial .am-roles{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  justify-content:center;
  max-width:900px;
  margin:0 auto;
}

.alain-editorial .am-roles li{
  background:var(--am-raised);
  border:1px solid rgba(228,181,255,.08);
  border-radius:99px;
  padding:7px 17px;
  color:var(--am-accent);
  font-size:.73rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.alain-editorial .am-hero-description{
  max-width:640px;
  margin:26px auto 0;
  color:#d3c0dd;
  font-size:1.125rem;
  line-height:1.8;
}

.alain-editorial .am-actions{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:14px;
  margin-top:32px;
}

/* =========================================================
   BUTTONS
========================================================= */

.alain-editorial .am-button{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  min-height:48px;
  padding:14px 27px;

  border:1px solid transparent;
  border-radius:999px;

  background:#b57acd;
  color:#320047;

  font-size:.75rem;
  line-height:1.5;
  font-weight:600;
  letter-spacing:.1em;
  text-align:center;
  text-transform:uppercase;

  transition:
    background .2s,
    box-shadow .2s;

  max-width:100%;
}

.alain-editorial .am-button svg{
  flex:none;
}

.alain-editorial .am-button:hover{
  background:#eab2ff;
  box-shadow:0 0 28px #b57acd33;
}

.alain-editorial .am-button-secondary{
  background:var(--am-raised);
  color:var(--am-accent);
}

.alain-editorial .am-button-secondary:hover{
  background:#3d2e52;
}

/* =========================================================
   CHRONICLE
========================================================= */

.alain-editorial .am-chronicle{
  padding-block:24px 72px;
  scroll-margin-top:110px;
}

.alain-editorial .am-editorial-grid{
  display:grid;
  grid-template-columns:
    minmax(0,1fr)
    minmax(0,2fr);

  gap:clamp(28px,4vw,60px);
  align-items:start;
}

.alain-editorial .am-sidebar{
  position:sticky;
  top:110px;
  min-width:0;
}

.alain-editorial .am-desktop-nav{
  padding:28px;
  border-radius:24px;
  background:var(--am-panel);
  box-shadow:0 16px 40px #10051f44;
}

.alain-editorial .am-chapter-links{
  margin-top:14px;
}

.alain-editorial .am-chapter-links a{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:14px;

  min-height:48px;
  padding-block:10px;

  font-size:.84rem;
  line-height:1.55;
  color:var(--am-muted);
}

.alain-editorial .am-chapter-links a:hover{
  color:var(--am-accent);
}

.alain-editorial .am-nav-number{
  font-size:.65rem;
  letter-spacing:.08em;
  color:#c4adc9;
  flex:none;
}

.alain-editorial .am-sidebar-note{
  background:#15062966;
  padding:16px;
  border-radius:14px;
  margin-top:24px;
  font-size:.78rem;
  color:var(--am-muted);
}

.alain-editorial .am-sidebar-note .am-eyebrow{
  font-size:.6rem;
  margin-bottom:6px;
}

.alain-editorial .am-mobile-nav{
  display:none;
}

.alain-editorial .am-founder{
  margin-top:24px;
}

.alain-editorial .am-founder .am-photo{
  aspect-ratio:4/5;
  max-height:330px;
}

.alain-editorial .am-founder figcaption{
  display:flex;
  flex-direction:column;
  gap:4px;
  padding:16px 4px;

  font-family:Georgia,serif;
  font-size:1.3rem;
}

.alain-editorial .am-editorial-flow{
  display:flex;
  flex-direction:column;
  gap:64px;
  min-width:0;
}

.alain-editorial .am-opening{
  display:grid;
  gap:24px;
}

.alain-editorial .am-prose{
  color:var(--am-muted);
  line-height:1.85;
}

.alain-editorial .am-prose p + p{
  margin-top:20px;
}

.alain-editorial .am-opening > .am-prose:first-child{
  font-size:1.125rem;
  color:#d3c0dd;
}

/* =========================================================
   QUOTE
========================================================= */

.alain-editorial .am-quote{
  position:relative;
  overflow:hidden;
  border:0;
  border-radius:22px;
  background:var(--am-panel);
  padding:clamp(24px,3vw,40px);

  color:var(--am-text);

  font-family:"EB Garamond",Georgia,serif;
  font-size:clamp(1.55rem,2.7vw,2.25rem);
  font-style:italic;
  line-height:1.4;
}

.alain-editorial .am-quote:after{
  content:'”';
  position:absolute;
  right:10px;
  bottom:-50px;

  font-size:160px;
  line-height:1;

  color:#b57acd16;
  pointer-events:none;
}

/* =========================================================
   CHAPTERS
========================================================= */

.alain-editorial .am-chapter{
  scroll-margin-top:110px;
  display:grid;
  gap:24px;
  min-width:0;
}

.alain-editorial .am-chapter:target{
  outline:1px solid #b57acd66;
  outline-offset:12px;
  border-radius:20px;
}

.alain-editorial .am-chapter-card{
  background:var(--am-panel);
  padding:clamp(24px,3.4vw,48px);
  border-radius:24px;
  box-shadow:0 14px 40px #10051f33;
}

.alain-editorial .am-chapter-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
  min-height:80px;
}

.alain-editorial .am-chapter-number{
  font-family:Georgia,serif;
  font-size:clamp(4rem,6vw,5.5rem);
  line-height:1;
  color:#b57acd55;
  letter-spacing:-.04em;
}

.alain-editorial .am-chapter-header h2{
  margin-top:8px;
}

.alain-editorial .am-intro-columns .am-prose{
  columns:2;
  column-gap:24px;
}

.alain-editorial .am-intro-columns p{
  break-inside:avoid;
}

/* =========================================================
   PHOTOS
========================================================= */

.alain-editorial .am-photo{
  position:relative;
  width:100%;
  aspect-ratio:4/3;
  overflow:hidden;
  border-radius:22px;
  background:#27183b;
}

.alain-editorial .am-photo-image{
  object-fit:cover;
  object-position:center;
}

.alain-editorial .am-chapter-visual{
  max-width:580px;
  width:100%;
  margin-inline:auto;
}

.alain-editorial .am-chapter-visual .am-photo{
  aspect-ratio:4/5;
}

/* =========================================================
   LARGE PHOTOS BETWEEN SECTIONS
   Wide and fully visible, with no crop or fixed image height.
========================================================= */

.alain-editorial .am-between-section-image{
  padding-block:clamp(18px,3vw,40px) clamp(54px,7vw,90px);
}

.alain-editorial .am-between-section-figure{
  width:100%;
  max-width:1100px;
  margin-inline:auto;
  overflow:hidden;
  border:1px solid rgba(228,181,255,.18);
  border-radius:24px;
  background:var(--am-raised);
  box-shadow:0 24px 55px rgba(16,5,31,.35);
}

.alain-editorial .am-between-section-figure img{
  display:block;
  width:100%;
  height:auto;
  object-fit:contain;
}

@media(max-width:639px){
  .alain-editorial .am-between-section-image{
    padding-block:12px 44px;
  }

  .alain-editorial .am-between-section-figure{
    border-radius:18px;
  }
}

/* =========================================================
   BARBIE ARCHIVE
========================================================= */

.alain-editorial .am-archive{
  display:grid;
  grid-template-columns:
    minmax(0,1.4fr)
    minmax(0,1fr);

  gap:20px;
  align-items:center;
}

.alain-editorial .am-archive .am-photo{
  aspect-ratio:4/5;
}

.alain-editorial .am-archive-note{
  background:var(--am-panel);
  border-radius:22px;
  padding:24px;
}

.alain-editorial .am-archive-note strong{
  display:block;

  font-family:Georgia,serif;
  font-size:clamp(2.5rem,4vw,3.5rem);
  font-weight:400;
  line-height:1.2;

  margin:14px 0;
}

.alain-editorial .am-archive-note p{
  font-size:.8rem;
  color:#d3c0dd;
}

/* =========================================================
   PERSONAL BARBIE MILESTONES
========================================================= */

.alain-editorial .am-collector-milestones{
  position:relative;
  width:100%;
  margin-top:clamp(48px,7vw,82px);
  padding-top:clamp(36px,5vw,54px);
  border-top:1px solid rgba(228,181,255,.18);
}

.alain-editorial .am-collector-milestones:before{
  content:"";
  position:absolute;
  top:-1px;
  left:50%;
  width:120px;
  height:1px;
  transform:translateX(-50%);

  background:linear-gradient(
    90deg,
    transparent,
    var(--am-accent),
    transparent
  );
}

.alain-editorial .am-collector-milestones-intro{
  max-width:720px;
  margin:
    0 auto
    clamp(34px,5vw,52px);

  text-align:center;
}

.alain-editorial .am-collector-milestones-intro .am-eyebrow{
  margin-bottom:12px;
}

.alain-editorial .am-collector-milestones-intro h3{
  font-family:"EB Garamond",Georgia,serif;
  font-size:clamp(2rem,4vw,3rem);
  font-weight:500;
  line-height:1.15;
  color:var(--am-text);
}

.alain-editorial .am-collector-milestones-lead{
  max-width:620px;
  margin:16px auto 0;

  font-family:"EB Garamond",Georgia,serif;
  color:#d3c0dd;

  font-size:clamp(1.08rem,2vw,1.32rem);
  font-weight:600;
  line-height:1.55;
}

.alain-editorial .am-collector-milestones-grid{
  display:grid;
  grid-template-columns:
    repeat(2,minmax(0,1fr));

  gap:clamp(24px,4.5vw,52px);
  align-items:start;

  max-width:1100px;
  margin-inline:auto;
}

.alain-editorial .am-collector-milestone{
  min-width:0;
}

.alain-editorial .am-collector-milestone-offset{
  margin-top:58px;
}

.alain-editorial .am-collector-milestone-image{
  position:relative;
  width:100%;
  aspect-ratio:3/4;
  overflow:hidden;

  border:
    1px solid
    rgba(228,181,255,.18);

  border-radius:26px;

  background:
    radial-gradient(
      circle at 50% 30%,
      rgba(181,122,205,.18),
      transparent 58%
    ),
    #201032;

  box-shadow:
    0 24px 55px rgba(16,5,31,.4),
    0 0 0 1px rgba(255,255,255,.015);
}

.alain-editorial .am-collector-milestone-image:after{
  content:"";
  position:absolute;
  inset:0;
  z-index:1;

  pointer-events:none;
  border-radius:inherit;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.04),
      transparent 30%,
      rgba(14,4,26,.1)
    );
}

.alain-editorial .am-collector-milestone-img{
  object-fit:cover;
  object-position:center;
  padding:0;

  transition:
    transform .6s ease;
}

.alain-editorial
.am-collector-milestone:hover
.am-collector-milestone-img{
  transform:scale(1.025);
}

.alain-editorial .am-collector-milestone-index{
  position:absolute;
  z-index:2;
  top:17px;
  left:18px;

  display:grid;
  place-items:center;

  min-width:42px;
  height:31px;
  padding-inline:10px;

  border:
    1px solid
    rgba(228,181,255,.3);

  border-radius:999px;

  background:
    rgba(26,11,46,.75);

  backdrop-filter:blur(10px);

  font-family:
    "EB Garamond",
    Georgia,
    serif;

  color:var(--am-accent);

  font-size:.85rem;
  font-weight:600;
  letter-spacing:.08em;
}

.alain-editorial .am-collector-milestone-caption{
  padding:22px 8px 0;
  text-align:center;
}

/* SAME FONT FAMILY AS THE PAGE TITLES */
.alain-editorial .am-collector-milestone-caption strong{
  display:block;
  max-width:420px;
  margin-inline:auto;

  font-family:
    "EB Garamond",
    Georgia,
    serif;

  color:var(--am-text);

  font-size:
    clamp(
      1.5rem,
      2.5vw,
      2rem
    );

  font-weight:600;
  line-height:1.22;
  letter-spacing:.005em;

  text-wrap:balance;
}

.alain-editorial .am-collector-milestone-caption span{
  display:block;

  max-width:390px;
  margin:12px auto 0;

  font-family:
    "EB Garamond",
    Georgia,
    serif;

  color:var(--am-accent);

  font-size:
    clamp(
      1.02rem,
      1.7vw,
      1.18rem
    );

  font-weight:600;
  line-height:1.45;
  letter-spacing:.02em;
}

/* =========================================================
   CHAPTER DETAILS
========================================================= */

.alain-editorial .am-chapter-card .am-quote{
  background:#322346;
}

.alain-editorial .am-lenses{
  display:grid;
  grid-template-columns:
    repeat(2,minmax(0,1fr));
  gap:16px;
}

.alain-editorial .am-lenses > div{
  background:var(--am-raised);
  border-radius:18px;
  padding:24px;
}

.alain-editorial .am-lenses dt{
  font-family:Georgia,serif;
  font-size:1.55rem;
  margin:12px 0 8px;
  line-height:1.3;
}

.alain-editorial .am-lenses dd{
  font-size:.9rem;
  color:var(--am-muted);
  line-height:1.8;
}

.alain-editorial .am-identities{
  padding:32px;
  background:var(--am-panel);
  border-radius:22px;
}

.alain-editorial .am-small{
  font-size:.75rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:#c4adc9;
  margin:14px 0 10px;
}

.alain-editorial .am-identities li{
  font-family:Georgia,serif;
  font-size:clamp(1.7rem,3vw,2.4rem);
  line-height:1.35;
}

.alain-editorial .am-identities li:nth-child(even){
  color:var(--am-accent);
}

/* =========================================================
   INSPIRATION
========================================================= */

.alain-editorial .am-inspiration{
  padding-block:20px 80px;
}

.alain-editorial .am-section-header{
  margin-bottom:28px;
}

.alain-editorial .am-section-header h2{
  margin-top:8px;
}

.alain-editorial .am-inspiration-grid{
  display:grid;
  grid-template-columns:
    repeat(4,minmax(0,1fr));
  gap:20px;
}

.alain-editorial .am-inspiration-grid > li{
  padding:30px 26px;
  border-radius:24px;
  background:var(--am-panel);
  transition:background .2s;
}

.alain-editorial .am-inspiration-grid > li:hover{
  background:var(--am-raised);
}

.alain-editorial .am-card-number{
  display:block;
  font-family:Georgia,serif;
  font-size:2.75rem;
  color:#b57acd;
  line-height:1;
  margin-bottom:18px;
}

.alain-editorial .am-card-sub{
  margin-top:8px;
  font-size:.63rem;
  letter-spacing:.12em;
}

.alain-editorial .am-card-description{
  margin-top:24px;
  font-size:.875rem;
  line-height:1.85;
  color:var(--am-muted);
}

/* =========================================================
   MEANING
========================================================= */

.alain-editorial .am-meaning{
  padding:72px 0;
  background:var(--am-panel);
}

.alain-editorial .am-resilience{
  max-width:880px;
  margin-inline:auto;
  text-align:center;
}

.alain-editorial .am-resilience-lead{
  margin:20px auto 24px;
  max-width:720px;
  color:var(--am-muted);
}

.alain-editorial .am-resilience-lines{
  font-family:Georgia,serif;
  font-size:clamp(1.7rem,3vw,2.4rem);
  line-height:1.4;
  color:#d3c0dd;
}

.alain-editorial .am-resilience-lines p:nth-child(even){
  color:var(--am-accent);
}

.alain-editorial .am-resilience-lines p:last-child{
  font-size:clamp(2rem,3.6vw,3.25rem);
  color:var(--am-text);
  margin-top:16px;
}

.alain-editorial .am-resilience h2{
  margin-top:48px;
}

.alain-editorial .am-meaning-lead{
  margin-top:20px;
  color:var(--am-muted);
}

.alain-editorial .am-passions{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;

  gap:12px 24px;
  margin-top:28px;

  color:var(--am-accent);

  font-size:.73rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.alain-editorial .am-arcs{
  display:grid;
  gap:16px;

  max-width:1080px;
  margin:52px auto 0;
}

.alain-editorial .am-arcs li{
  display:grid;
  grid-template-columns:
    minmax(0,1fr)
    auto
    minmax(0,1fr);

  align-items:center;
  gap:24px;

  background:var(--am-raised);
  padding:28px 32px;
  border-radius:22px;
}

.alain-editorial .am-arc-from{
  font-family:Georgia,serif;
  font-size:1.65rem;
  line-height:1.35;
}

.alain-editorial .am-arc-to{
  color:var(--am-accent);
  font-size:1.05rem;
}

.alain-editorial .am-arcs svg{
  color:var(--am-accent);
}

.alain-editorial .am-meaning-closing{
  max-width:760px;
  margin:40px auto 0;

  text-align:center;

  font-family:Georgia,serif;
  font-size:1.5rem;
}

.alain-editorial .am-meaning-closing p + p{
  margin-top:12px;
}

/* =========================================================
   SIGNATURE
========================================================= */

.alain-editorial .am-signature{
  padding-block:80px;
}

.alain-editorial .am-signature-card{
  max-width:800px;
  margin:auto;

  padding:clamp(28px,5vw,64px);

  border-radius:32px;
  text-align:center;

  background:
    radial-gradient(
      ellipse at top,
      #63338244,
      transparent 65%
    ),
    var(--am-raised);

  box-shadow:
    0 24px 64px #10051f66,
    0 0 36px #b57acd15;
}

.alain-editorial .am-signature blockquote{
  font-family:Georgia,serif;
  font-size:clamp(1.65rem,3.3vw,2.6rem);
  line-height:1.4;
}

.alain-editorial .am-signature blockquote p + p{
  margin-top:8px;
}

.alain-editorial .am-signature blockquote p:last-child{
  color:#eab2ff;
}

.alain-editorial .am-signature figcaption{
  margin-top:26px;
  font-size:.7rem;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:var(--am-accent);
}

.alain-editorial .am-signature .am-button{
  margin-top:32px;
}

/* =========================================================
   MEDIA / COLLECTOR
========================================================= */

.alain-editorial .am-media{
  padding-block:12px 72px;
}

.alain-editorial .am-collector{
  padding-block:12px 72px;
}

.alain-editorial .am-instagram-collection{
  display:flex;
  align-items:center;
  gap:16px;

  width:min(100%,580px);
  margin:32px auto 0;

  padding:18px 20px;

  border:1px solid #b57acd66;
  border-radius:22px;

  background:
    linear-gradient(
      135deg,
      #3d174e,
      #25143c
    );

  box-shadow:
    0 12px 32px #10051f55,
    0 0 24px #b57acd22;

  transition:
    transform .25s ease,
    box-shadow .25s ease,
    border-color .25s ease;
}

.alain-editorial .am-instagram-collection:hover{
  transform:translateY(-3px);
  border-color:#eab2ff;

  box-shadow:
    0 18px 38px #10051f77,
    0 0 30px #eab2ff44;
}

.alain-editorial .am-instagram-icon{
  position:relative;
  display:grid;
  place-items:center;
  flex:none;

  width:46px;
  height:46px;

  overflow:hidden;
  border-radius:15px;

  background:
    linear-gradient(
      135deg,
      #eab2ff,
      #b57acd 58%,
      #633382
    );

  color:#301047;

  box-shadow:
    0 0 18px #eab2ff44;
}

.alain-editorial .am-instagram-icon svg{
  width:24px;
  height:24px;
}

.alain-editorial .am-instagram-copy{
  display:grid;
  gap:3px;
  min-width:0;
}

.alain-editorial .am-instagram-copy strong{
  font-family:Georgia,serif;
  font-size:1.28rem;
  font-weight:400;
  color:var(--am-text);
}

.alain-editorial .am-instagram-copy span{
  font-size:.76rem;
  font-weight:600;
  letter-spacing:.03em;
  color:#d3c0dd;
}

.alain-editorial .am-instagram-arrow{
  display:grid;
  place-items:center;
  flex:none;

  margin-left:auto;
  width:38px;
  height:38px;

  border-radius:50%;
  background:#eab2ff;
  color:#4c1564;
}

.alain-editorial .am-instagram-arrow svg{
  width:18px;
  height:18px;
}

.alain-editorial .am-media-lead{
  margin-top:14px;
  max-width:560px;

  color:var(--am-muted);

  font-size:1rem;
  line-height:1.8;
}

.alain-editorial .am-video-rail{
  margin-top:4px;
}

.alain-editorial .am-video-rail p{
  color:var(--am-accent);
}

/* =========================================================
   SINGER
========================================================= */
.alain-editorial .am-singer-image{
  width:100%;
  max-width:760px;
  margin:10px auto 34px;
  overflow:hidden;
  border-radius:22px;
}

.alain-editorial .am-singer-image picture{
  display:block;
  width:100%;
}

.alain-editorial .am-singer-image img{
  display:block;
  width:100%;
  height:auto;
}

/* MOBILE */
@media (max-width:768px){

  .alain-editorial .am-singer-image{
    width:100%;
    max-width:none;
    margin:10px auto 32px;
  }

  .alain-editorial .am-singer-image img{
    width:100%;
    height:auto;
  }
}

.alain-editorial .am-recordings{
  min-width:0;
  margin-top:32px;

  padding:
    clamp(20px,3vw,32px);

  border:1px solid #b57acd44;
  border-radius:24px;

  background:var(--am-panel);
}

.alain-editorial .am-recordings-header{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;

  gap:20px;
  margin-bottom:24px;
}

.alain-editorial .am-recordings-header h3{
  margin-top:6px;
  font-size:clamp(1.8rem,3vw,2.5rem);
  line-height:1.1;
}

.alain-editorial .am-recordings-description{
  margin-top:8px;
  color:var(--am-muted);
  font-size:.95rem;
}

.alain-editorial .am-recordings-count{
  flex:none;
  padding:7px 12px;

  border:1px solid #b57acd55;
  border-radius:99px;

  color:var(--am-accent);

  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.alain-editorial .am-recordings-list{
  display:grid;
  grid-template-columns:
    repeat(2,minmax(0,1fr));

  gap:12px;

  max-height:710px;

  overflow-y:auto;
  overscroll-behavior:contain;

  padding:2px 8px 2px 2px;

  scrollbar-color:
    #76548f transparent;
}

.alain-editorial .am-recordings-list:focus-visible{
  outline:2px solid var(--am-accent);
  outline-offset:3px;
  border-radius:16px;
}

.alain-editorial .am-recording{
  display:flex;
  flex-direction:column;

  min-width:0;
  gap:16px;
  padding:20px;

  border:1px solid #b57acd33;
  border-radius:18px;

  background:var(--am-raised);

  transition:border-color .2s;
}

.alain-editorial .am-recording:hover{
  border-color:#b57acd88;
}

.alain-editorial .am-recording-top{
  display:flex;
  align-items:center;
  justify-content:space-between;

  gap:16px;

  color:var(--am-accent);
}

.alain-editorial .am-recording-number{
  font-family:Georgia,serif;
  font-size:.85rem;
  letter-spacing:.12em;
}

.alain-editorial .am-recording-icon{
  width:40px;
  height:28px;
  flex:none;
  opacity:.8;
}

.alain-editorial .am-recording-info{
  min-width:0;
  flex:1;
}

.alain-editorial .am-recording-info h4{
  font-family:"EB Garamond",Georgia,serif;

  font-size:1.4rem;
  font-weight:400;
  line-height:1.2;

  color:var(--am-text);
  overflow-wrap:anywhere;
}

.alain-editorial .am-recording-info p{
  margin-top:5px;

  font-size:.76rem;
  letter-spacing:.1em;
  text-transform:uppercase;

  color:var(--am-muted);
}

.alain-editorial .am-recording audio{
  display:block;
  width:100%;
  height:42px;
  max-width:100%;
  color-scheme:dark;
}

.alain-editorial .am-recordings-hint{
  margin-top:14px;

  text-align:center;
  color:var(--am-muted);

  font-size:.74rem;
  letter-spacing:.08em;
}

/* =========================================================
   GALLERY
========================================================= */

.alain-editorial .am-gallery-grid{
  display:grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(min(100%,240px),1fr)
    );

  gap:18px;
}

.alain-editorial .am-gallery-grid > li{
  min-width:0;
}

.alain-editorial .am-gallery-photo{
  position:relative;
  width:100%;
  aspect-ratio:4/5;
  overflow:hidden;

  border-radius:22px;
  background:var(--am-raised);
}

.alain-editorial .am-gallery-grid img{
  object-fit:cover;
  object-position:center;

  transition:
    transform .7s ease;
}

.alain-editorial .am-gallery-grid li:hover img{
  transform:scale(1.04);
}

.alain-editorial .am-gallery-grid figcaption{
  display:flex;
  align-items:baseline;
  gap:12px;

  padding:14px 4px 0;

  font-size:.85rem;
  line-height:1.6;
  color:var(--am-muted);
}

.alain-editorial .am-gallery-index{
  flex:none;

  font-family:Georgia,serif;
  font-size:.95rem;

  color:#b57acd;
}

.alain-editorial .am-gallery-action{
  display:flex;
  justify-content:center;
  margin-top:32px;
}

/* =========================================================
   CAROUSEL
========================================================= */

.alain-editorial .am-carousel{
  position:relative;
  min-width:0;
}

.alain-editorial .am-carousel-track{
  display:flex;
  overflow-x:auto;

  scroll-snap-type:x mandatory;
  overscroll-behavior-x:contain;

  scrollbar-width:none;

  border-radius:22px;
}

.alain-editorial .am-carousel-track::-webkit-scrollbar{
  display:none;
}

.alain-editorial .am-carousel-track:focus-visible{
  outline:2px solid var(--am-accent);
  outline-offset:4px;
}

.alain-editorial .am-carousel-slide{
  flex:0 0 100%;
  min-width:0;
  scroll-snap-align:center;
}

.alain-editorial .am-carousel-nav{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  z-index:2;

  display:flex;
  align-items:center;
  justify-content:center;

  width:44px;
  height:44px;
  padding:0;

  border:1px solid #b57acd55;
  border-radius:50%;

  background:#1a0b2ecc;
  color:var(--am-accent);

  backdrop-filter:blur(8px);

  cursor:pointer;

  transition:
    background .2s,
    opacity .2s;
}

.alain-editorial .am-carousel-nav:hover:not(:disabled){
  background:#633382;
  color:#f7d8ff;
}

.alain-editorial .am-carousel-nav:disabled{
  opacity:.25;
  cursor:default;
}

.alain-editorial .am-carousel-prev{
  left:12px;
}

.alain-editorial .am-carousel-next{
  right:12px;
}

.alain-editorial .am-carousel-dots{
  display:flex;
  justify-content:center;
  align-items:center;

  gap:4px;
  margin-top:10px;
}

.alain-editorial .am-carousel-dot{
  position:relative;

  width:28px;
  height:32px;

  padding:0;
  border:0;

  background:none;
  cursor:pointer;
}

.alain-editorial .am-carousel-dot:before{
  content:"";

  position:absolute;
  left:50%;
  top:50%;

  transform:
    translate(-50%,-50%);

  width:8px;
  height:8px;

  border-radius:50%;
  background:#4d444f;

  transition:
    background .2s,
    width .2s;
}

.alain-editorial .am-carousel-dot.is-active:before{
  width:22px;
  border-radius:99px;
  background:var(--am-accent);
}

.alain-editorial .am-carousel-dot:focus-visible{
  outline:2px solid var(--am-accent);
  outline-offset:2px;
  border-radius:8px;
}

/* =========================================================
   RESPONSIVE — LARGE TABLETS
========================================================= */

@media(min-width:1024px) and (max-height:850px){

  .alain-editorial .am-sidebar{
    position:static;
  }

  .alain-editorial .am-desktop-nav{
    position:sticky;
    top:100px;
  }
}

@media(max-width:1100px){

  .alain-editorial .am-inspiration-grid{
    grid-template-columns:
      repeat(2,minmax(0,1fr));
  }

  .alain-editorial .am-desktop-nav{
    padding:22px;
  }
}

/* =========================================================
   RESPONSIVE — TABLET
========================================================= */

@media(max-width:1023px){

  .alain-editorial .am-editorial-grid{
    grid-template-columns:
      minmax(0,1fr);
  }

  .alain-editorial .am-sidebar{
    position:static;
  }

  .alain-editorial .am-desktop-nav{
    display:none;
  }

  .alain-editorial .am-mobile-nav{
    display:block;

    background:var(--am-panel);

    border:1px solid #b57acd33;
    border-radius:18px;

    padding:0 20px;
  }

  .alain-editorial .am-mobile-nav summary{
    display:flex;
    align-items:center;
    justify-content:space-between;

    gap:16px;

    cursor:pointer;
    min-height:56px;

    color:var(--am-accent);

    font-size:.85rem;
    list-style:none;
  }

  .alain-editorial
  .am-mobile-nav
  summary::-webkit-details-marker{
    display:none;
  }

  .alain-editorial
  .am-mobile-nav[open]
  summary span{
    transform:rotate(45deg);
  }

  .alain-editorial
  .am-mobile-nav
  .am-chapter-links{
    padding-bottom:14px;
    margin-top:0;
  }

  .alain-editorial .am-founder{
    max-width:380px;
    margin:28px auto 0;
  }

  .alain-editorial
  .am-founder
  .am-photo{
    max-height:none;
  }

  .alain-editorial
  .am-founder
  figcaption{
    text-align:center;
  }

  .alain-editorial
  .am-editorial-flow{
    gap:48px;
  }

  .alain-editorial .am-chronicle{
    padding-bottom:56px;
  }

  .alain-editorial .am-media{
    padding-bottom:56px;
  }
}

/* =========================================================
   RESPONSIVE — BARBIE MILESTONES
========================================================= */

@media(max-width:750px){

  .alain-editorial
  .am-collector-milestones{
    margin-top:44px;
    padding-top:36px;
  }

  .alain-editorial
  .am-collector-milestones-grid{
    grid-template-columns:
      minmax(0,1fr);

    gap:42px;
    max-width:520px;
  }

  .alain-editorial
  .am-collector-milestone-offset{
    margin-top:0;
  }

  .alain-editorial
  .am-collector-milestone-image{
    border-radius:20px;
  }

  .alain-editorial
  .am-collector-milestone-caption{
    padding-top:18px;
  }

  .alain-editorial
  .am-collector-milestone-caption
  strong{
    font-size:1.6rem;
  }

  .alain-editorial
  .am-collector-milestone-caption
  span{
    font-size:1.08rem;
  }

  .alain-editorial
  .am-recordings-header{
    align-items:flex-start;
    flex-direction:column;
  }

  .alain-editorial
  .am-recordings-list{
    grid-template-columns:
      minmax(0,1fr);

    max-height:600px;
  }

  .alain-editorial
  .am-recording{
    padding:18px;
  }
}

/* =========================================================
   RESPONSIVE — MOBILE
========================================================= */

@media(max-width:639px){

  .alain-editorial .am-hero{
    padding-top:88px;
    padding-bottom:44px;
  }

  .alain-editorial
  .am-hero
  .am-eyebrow{
    font-size:.62rem;
    letter-spacing:.16em;
  }

  .alain-editorial .am-roles{
    gap:7px;
  }

  .alain-editorial .am-roles li{
    font-size:.62rem;
    padding:7px 12px;
  }

  .alain-editorial
  .am-hero-description{
    font-size:1rem;
  }

  .alain-editorial .am-actions{
    flex-direction:column;
    gap:12px;
  }

  .alain-editorial
  .am-actions
  .am-button{
    width:100%;
  }

  .alain-editorial
  .am-intro-columns
  .am-prose{
    columns:1;
  }

  .alain-editorial
  .am-chapter-top{
    min-height:64px;
  }

  .alain-editorial
  .am-chapter-card{
    padding:24px 20px;
  }

  .alain-editorial
  .am-chapter{
    gap:22px;
  }

  .alain-editorial
  .am-archive{
    grid-template-columns:
      minmax(0,1fr);
  }

  .alain-editorial
  .am-archive-note{
    padding:24px;
  }

  .alain-editorial
  .am-archive-note strong{
    margin:8px 0;
  }

  .alain-editorial
  .am-lenses{
    grid-template-columns:
      minmax(0,1fr);
  }

  .alain-editorial
  .am-identities{
    padding:24px;
  }

  .alain-editorial
  .am-inspiration-grid{
    grid-template-columns:
      minmax(0,1fr);

    gap:14px;
  }

  .alain-editorial
  .am-inspiration-grid > li{
    padding:26px;
  }

  .alain-editorial
  .am-inspiration{
    padding-bottom:48px;
  }

  .alain-editorial
  .am-meaning{
    padding:48px 0;
  }

  .alain-editorial
  .am-arcs{
    margin-top:36px;
  }

  .alain-editorial
  .am-arcs li{
    grid-template-columns:
      minmax(0,1fr);

    gap:12px;
    padding:24px;
  }

  .alain-editorial
  .am-arcs svg{
    transform:rotate(90deg);
  }

  .alain-editorial
  .am-signature{
    padding-block:48px;
  }

  .alain-editorial
  .am-signature-card{
    border-radius:24px;
    padding:32px 22px;
  }

  .alain-editorial
  .am-signature
  .am-button{
    width:100%;
    padding-inline:18px;
  }

  .alain-editorial
  .am-passions{
    gap:12px;
    font-size:.68rem;
  }

  .alain-editorial
  .am-passions li{
    width:100%;
  }

  .alain-editorial
  .am-media,
  .alain-editorial
  .am-collector{
    padding-bottom:44px;
  }

  .alain-editorial
  .am-media-lead{
    font-size:.95rem;
  }

  .alain-editorial
  .am-gallery-grid{
    grid-template-columns:
      repeat(2,minmax(0,1fr));

    gap:12px;
  }

  .alain-editorial
  .am-gallery-photo{
    border-radius:16px;
  }

  .alain-editorial
  .am-gallery-grid
  figcaption{
    gap:8px;
    padding-top:10px;
    font-size:.74rem;
  }

  .alain-editorial
  .am-gallery-index{
    font-size:.8rem;
  }

  .alain-editorial
  .am-gallery-action
  .am-button{
    width:100%;
  }

  .alain-editorial
  .am-instagram-collection{
    align-items:flex-start;
    padding:16px;
  }

  .alain-editorial
  .am-instagram-copy
  strong{
    font-size:1.1rem;
  }

  .alain-editorial
  .am-instagram-copy
  span{
    font-size:.7rem;
  }

  .alain-editorial
  .am-instagram-arrow{
    display:none;
  }

  .alain-editorial
  .am-carousel-nav{
    width:38px;
    height:38px;
  }

  .alain-editorial
  .am-carousel-prev{
    left:8px;
  }

  .alain-editorial
  .am-carousel-next{
    right:8px;
  }
}

/* =========================================================
   REDUCED MOTION
========================================================= */

@media(prefers-reduced-motion:reduce){

  .alain-editorial *{
    transition:none!important;
    animation:none!important;
    scroll-behavior:auto!important;
  }
}

/* =========================================================
   BARBIE COLLECTING HAS NO GENDER
   Premium, responsive editorial story styling
   All styling is scoped to this page.
========================================================= */

.alain-editorial .am-collector-story {
  width: 100%;
  min-width: 0;
  margin-top: clamp(36px, 6vw, 80px);
  padding-top: clamp(28px, 5vw, 60px);
  border-top: 1px solid var(--am-line);
}

.alain-editorial .am-collector-story-header,
.alain-editorial .am-collector-story-body {
  width: min(100%, 1100px);
  min-width: 0;
  margin-inline: auto;
}

.alain-editorial .am-collector-story-header {
  margin-bottom: clamp(28px, 4vw, 44px);
  text-align: center;
}

.alain-editorial .am-collector-story-header h3 {
  max-width: 940px;
  margin-inline: auto;
  font-family: "EB Garamond", Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: clamp(28px, 3.4vw, 42px);
  line-height: 1.18;
  letter-spacing: -0.025em;
  color: #f8edff;
  text-wrap: balance;
  overflow-wrap: break-word;
}

.alain-editorial .am-collector-story-body {
  display: grid;
  gap: clamp(24px, 4vw, 42px);
  counter-reset: story-section;
}

/* Subtle numbered chapter cards */
.alain-editorial .am-collector-story-section {
  counter-increment: story-section;
  position: relative;
  isolation: isolate;
  min-width: 0;
  overflow: hidden;
  padding: clamp(26px, 4vw, 54px);
  border: 1px solid rgba(228, 181, 255, .22);
  border-radius: 28px;
  background: linear-gradient(145deg, rgba(49, 25, 70, .84), rgba(23, 11, 39, .88));
  box-shadow: 0 20px 60px -35px rgba(5, 0, 17, .75);
}

.alain-editorial .am-collector-story-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 2px;
  background: linear-gradient(90deg, #e4b5ff, rgba(228, 181, 255, 0));
  pointer-events: none;
}

.alain-editorial .am-collector-story-section:nth-child(even) {
  background: linear-gradient(135deg, rgba(37, 19, 57, .92), rgba(26, 12, 43, .85));
}

/* Large editorial headings with elegant numbering */
.alain-editorial .am-collector-story-section h4 {
  width: 100%;
  max-width: 850px;
  margin: 0 0 25px;
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(27px, 3.1vw, 42px);
  font-style: italic;
  font-weight: 700;
  line-height: 1.23;
  letter-spacing: -0.03em;
  color: #f8edff;
  text-wrap: balance;
}

.alain-editorial .am-collector-story-section h4::before {
  content: "CHAPTER " counter(story-section, decimal-leading-zero);
  display: block;
  margin-bottom: 15px;
  font-family: "Manrope", Arial, sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  letter-spacing: .2em;
  line-height: 1.5;
  color: #e4b5ff;
}

/* Calm, readable long-form typography */
.alain-editorial .am-collector-story-prose {
  display: block;
  width: 100%;
  min-width: 0;
  color: #d9c9e7;
  text-align: left;
}

.alain-editorial .am-collector-story-prose > p {
  max-width: 78ch;
  margin: 0;
  font-family: "Manrope", Arial, sans-serif;
  font-size: clamp(16px, 1.35vw, 18px);
  font-weight: 600;
  line-height: 1.95;
  letter-spacing: .005em;
  color: #d9c9e7;
  text-wrap: pretty;
}

.alain-editorial .am-collector-story-prose > p + p {
  margin-top: 22px;
}

.alain-editorial .am-collector-story-prose > p:first-child {
  color: #f0e4f7;
  font-weight: 650;
}

/* Drop cap on the very first paragraph only */
.alain-editorial .am-collector-story-section:first-child
.am-collector-story-prose > p:first-child::first-letter {
  float: left;
  margin: 5px 12px 0 0;
  font-family: "EB Garamond", Georgia, serif;
  font-size: 67px;
  font-style: italic;
  font-weight: 700;
  line-height: .9;
  color: #e4b5ff;
}

/* Barbie convention photo and caption */
.alain-editorial .am-collector-story-photo {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 35px auto;
  padding: clamp(12px, 2vw, 22px);
  border: 1px solid rgba(228, 181, 255, .25);
  border-radius: 25px;
  background: rgba(12, 5, 24, .6);
  box-shadow: 0 24px 65px -30px rgba(0, 0, 0, .6);
}

.alain-editorial .am-collector-story-photo-title {
  margin: 0 0 20px;
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(19px, 2vw, 27px);
  font-style: italic;
  font-weight: 700;
  line-height: 1.4;
  color: #f7e8ff;
  text-wrap: balance;
}

.alain-editorial .am-collector-story-photo-title span {
  display: block;
}

.alain-editorial .am-collector-story-photo-title a {
  display: inline-block;
  margin-top: 9px;
  font-family: "Manrope", Arial, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  color: #e4b5ff;
  text-decoration: underline;
  text-decoration-color: rgba(228, 181, 255, .5);
  text-underline-offset: 5px;
  transition: color .2s ease;
}

.alain-editorial .am-collector-story-photo-title a:hover {
  color: #fff;
}

.alain-editorial .am-collector-story-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 1px solid rgba(228, 181, 255, .2);
  border-radius: 19px;
  background: var(--am-panel);
}

.alain-editorial .am-collector-story-img {
  object-fit: cover;
  object-position: center;
}

/* Highlight the closing message */
.alain-editorial .am-collector-story-message {
  border-color: rgba(228, 181, 255, .4);
  background: linear-gradient(135deg, #351d50 0%, #231236 55%, #160b27 100%);
  box-shadow: 0 25px 75px -35px rgba(160, 94, 194, .35);
}

.alain-editorial .am-collector-story-message h4 {
  color: #fff;
}

.alain-editorial .am-collector-story-message
.am-collector-story-prose > p:nth-child(2) {
  max-width: 850px;
  margin: 28px 0;
  padding-left: 23px;
  border-left: 3px solid #e4b5ff;
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(21px, 2.4vw, 31px);
  font-style: italic;
  font-weight: 700;
  line-height: 1.55;
  color: #fff;
}

/* Responsive photo, typography, and chapter spacing */
@media (max-width: 639px) {
  .alain-editorial .am-collector-milestones-grid {
    width: calc(100% + 24px);
    max-width: none;
    margin-inline: -12px;
  }

  .alain-editorial .am-collector-milestone-caption {
    padding-inline: 12px;
  }

  .alain-editorial .am-collector-story-body {
    gap: 22px;
    padding-inline: 0;
  }

  .alain-editorial .am-collector-story-section {
    padding: 24px 20px;
    border-radius: 22px;
  }

  .alain-editorial .am-collector-story-section h4 {
    margin-bottom: 20px;
    font-size: 26px;
    line-height: 1.3;
  }

  .alain-editorial .am-collector-story-section h4::before {
    margin-bottom: 12px;
    font-size: 10px;
  }

  .alain-editorial .am-collector-story-prose > p {
    font-size: 16px;
    line-height: 1.85;
  }

  .alain-editorial .am-collector-story-prose > p + p {
    margin-top: 19px;
  }

  .alain-editorial .am-collector-story-section:first-child
  .am-collector-story-prose > p:first-child::first-letter {
    font-size: 52px;
    margin-right: 9px;
  }

  .alain-editorial .am-collector-story-photo {
    margin: 26px 0;
    padding: 10px;
    border-radius: 18px;
  }

  .alain-editorial .am-collector-story-photo-title {
    margin-bottom: 15px;
    font-size: 19px;s
    line-height: 1.45;
  }

  .alain-editorial .am-collector-story-image {
    border-radius: 13px;
  }

  .alain-editorial .am-collector-story-message
  .am-collector-story-prose > p:nth-child(2) {
    padding-left: 16px;
    font-size: 22px;
    line-height: 1.5;
  }
}
`;

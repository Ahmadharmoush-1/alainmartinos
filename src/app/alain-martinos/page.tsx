import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { VideoShortsRow } from "@/components/VideoShortsRow";
import { getContent } from "@/lib/i18n";
import { videos } from "@/lib/images";
import { SITE_URL } from "@/lib/site";

const a = getContent().alain;
const v = getContent().home.video;

export const metadata: Metadata = {
  title: `${a.title} – Hairdresser, Visagist, Singer & Collector`,
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

/**
 * The large founder portrait in the sidebar.
 * Declared here (not pulled from lib/images.ts) so every image this page
 * renders lives in one place — see `chapterImages` below for the rest.
 */
const portrait: Portrait = {
  src: "/images/alain-intro.jpg",
  alt: "Alain Martinos in the salon",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/alain-martinos#person`,
  name: "Alain Martinos",
  jobTitle: "Hairdresser & Visagist",
  description: a.description,
  nationality: ["Lebanese" ],
  url: `${SITE_URL}/alain-martinos`,
  ...(portrait
    ? { image: new URL(portrait.src, SITE_URL).href }
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


// Drop-in replacement for app/alain-martinos/page.tsx.
// Keep your existing shared layout, image registry, and translated content.
const chapterImages: Partial<Record<number, Portrait>> = {
  0: { src: "/images/alainmartinos.jpg", alt: "Alain Martinos" },
  2: { src: "/images/alain-044.jpg", alt: "Alain Martinos’s Barbie collection" },
  4: { src: "/images/about-alain1.jpg", alt: "Alain Martinos between Lebanon and Germany" },
};

/**
 * The Alain Martinos gallery. These are the portraits not already used by
 * `chapterImages` or the sidebar `portrait` — add or reorder freely.
 */
const galleryImages: readonly Portrait[] = [
  { src: "/images/alain-gallery/01.jpg", alt: "Alain Martinos, portrait" },
  { src: "/images/alain-gallery/02.jpg", alt: "Alain Martinos at work in the salon" },
  { src: "/images/alain-gallery/03.jpg", alt: "Alain Martinos performing" },
  { src: "/images/alain-gallery/04.jpg", alt: "Alain Martinos between Lebanon and Germany" },
];

/**
 * The Barbie collector chapter is lifted out of the chronicle and rendered
 * near the end of the page instead, under the gallery. Its original index is
 * preserved so `chapterImages` and the "10,000+" archive layout still match.
 */
const collectorIndex = a.chapters.findIndex((chapter) => chapter.id === "collector");
const collectorChapter = collectorIndex >= 0 ? a.chapters[collectorIndex] : undefined;

function Arrow() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}

function ContactButton({ label }: { label: string }) {
  return <Link href="/contact" className="am-button">{label}<Arrow /></Link>;
}

function Photo({ image, priority = false, className = "" }: { image: Portrait; priority?: boolean; className?: string }) {
  return (
    <div className={`am-photo ${className}`}>
      <Image src={image.src} alt={image.alt} fill priority={priority}
        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 80vw, 55vw"
        className="am-photo-image" />
    </div>
  );
}

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return <div className="am-prose">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
}

function PullQuote({ text }: { text: string }) {
  return <blockquote className="am-quote"><p>“{text}”</p></blockquote>;
}

function ChapterLinks() {
  return (
    <ol className="am-chapter-links">
      {a.chapters.map((chapter, index) => (
        <li key={chapter.id}>
          <a href={`#${chapter.id}`}>
            <span>{chapter.number}. {chapter.title}</span>
            <span className="am-nav-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function ChapterSection({ chapter, index }: { chapter: Chapter; index: number }) {
  const image = chapterImages[index];
  return (
    <article id={chapter.id} aria-labelledby={`${chapter.id}-heading`}
      className={`am-chapter ${index % 2 === 1 ? "am-chapter-card" : ""}`}>
      <header className="am-chapter-header">
        <div className="am-chapter-top">
          {/* <p className="am-eyebrow">Chapter {chapter.number}</p> */}
          <span className="am-chapter-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2 id={`${chapter.id}-heading`}>{chapter.title}</h2>
      </header>
      <div
  className={`${index === 0 ? "am-intro-columns " : ""}am-chapter-description`}
>
        <Prose paragraphs={chapter.paragraphs} />
      </div>
      {image && (
        <div className={index === 2 ? "am-archive" : "am-chapter-visual"}>
          <Photo image={image} />
          {index === 2 && <aside className="am-archive-note" aria-label="The collection">
            <span className="am-eyebrow">The Living Archive</span>
            <strong>10,000+</strong>
            <p>Barbie dolls. A lifetime of beauty, fashion, and memories.</p>
          </aside>}
        </div>
      )}
      {!!chapter.lenses?.length && (
        <dl className="am-lenses">{chapter.lenses.map((lens, lensIndex) => (
          <div key={lens.role}>
            <span className="am-eyebrow" aria-hidden="true">0{lensIndex + 1}</span>
            <dt>{lens.role}</dt><dd>{lens.what}</dd>
          </div>
        ))}</dl>
      )}
      {!!chapter.identities?.length && (
        <div className="am-identities">
          <p className="am-eyebrow">Identity Manifesto</p><p className="am-small">He is</p>
          <ul>{chapter.identities.map(identity => <li key={identity}>{identity}</li>)}</ul>
        </div>
      )}
      {!!chapter.closing?.length && <Prose paragraphs={chapter.closing} />}
      {chapter.quote && <PullQuote text={chapter.quote} />}
    </article>
  );
}

export default function AlainPage() {
  return (
    <div className="alain-editorial page-purple-background">
      <style>{pageCss}</style>
      <section className="am-hero" aria-labelledby="alain-heading">
        <div className="am-hero-background" aria-hidden="true" />
        <div className="am-container am-hero-content">
          <p className="am-eyebrow">Haute Coiffure · Visagisme · Collection</p>
          <h1 id="alain-heading">{a.heading}</h1>
          <ul className="am-roles" aria-label="Roles">{a.roles.map(role => <li key={role}>{role}</li>)}</ul>
          <p className="am-hero-description">A life dedicated to transforming imagination into tangible beauty across Lebanon and Germany.</p>
          <div className="am-actions">
            <ContactButton label={a.cta} />
            <a href="#editorial-chronicle" className="am-button am-button-secondary">Explore Monograph</a>
          </div>
        </div>
      </section>

      <section className="am-chronicle am-container" id="editorial-chronicle" aria-label="The Alain Martinos biography">
        <div className="am-editorial-grid">
          <aside className="am-sidebar">
            <nav className="am-desktop-nav" aria-label="Biography chapters">
              <p className="am-eyebrow">Chronicle Chapters</p>
              <ChapterLinks />
              <div className="am-sidebar-note"><p className="am-eyebrow">Archive Note</p><p>Twenty-five years of hair, beauty, music, and collecting.</p></div>
            </nav>
            <details className="am-mobile-nav">
              <summary>Explore the chapters <span aria-hidden="true">＋</span></summary>
              <nav aria-label="Biography chapters"><ChapterLinks /></nav>
            </details>
            {portrait && <figure className="am-founder">
              <Photo image={portrait} priority />
              <figcaption>Alain Martinos</figcaption>
            </figure>}
          </aside>
          <div className="am-editorial-flow">
            <div className="am-opening"><Prose paragraphs={[a.intro]} /><PullQuote text={a.thesis} /><Prose paragraphs={[a.introAfter]} /></div>
            {a.chapters.map((chapter, index) =>
              index === collectorIndex
                ? null
                : <ChapterSection key={chapter.id} chapter={chapter} index={index} />
            )}
          </div>
        </div>
      </section>

      <section className="am-inspiration am-container" aria-labelledby="inspiration-heading">
        <header className="am-section-header"><div><p className="am-eyebrow">Pillars of Influence</p><h2 id="inspiration-heading">{a.inspiration.title}</h2></div></header>
        <ul className="am-inspiration-grid">{a.inspiration.items.map((item, index) => (
          <li key={item.title}><span className="am-card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3><p className="am-eyebrow am-card-sub">{item.sub}</p><p className="am-card-description">{item.desc}</p>
          </li>
        ))}</ul>
      </section>

      <section className="am-meaning" aria-labelledby="meaning-heading">
        <div className="am-container">
          <div className="am-resilience">
            <p className="am-eyebrow">The Continuous Thread</p>
            <p className="am-resilience-lead">{a.inspiration.resilience.lead}</p>
            <div className="am-resilience-lines">{a.inspiration.resilience.lines.map(line => <p key={line}>{line}</p>)}</div>
            <h2 id="meaning-heading">{a.meaning.title}</h2><p className="am-meaning-lead">{a.meaning.lead}</p>
            <ul className="am-passions">{a.meaning.passions.map(passion => <li key={passion}>{passion}</li>)}</ul>
          </div>
          <ul className="am-arcs">{a.meaning.arcs.map(arc => (
            <li key={arc.from}><p className="am-arc-from">{arc.from}</p><Arrow /><p className="am-arc-to">{arc.to}</p></li>
          ))}</ul>
          <div className="am-meaning-closing">{a.meaning.closing.map(line => <p key={line}>{line}</p>)}</div>
        </div>
      </section>

      {/* FILMS */}
      <section className="am-media am-container" aria-labelledby="films-heading">
        <header className="am-section-header">
          <div>
            <p className="am-eyebrow">In Motion</p>
            <h2 id="films-heading">Alain Martinos Reels & Videos</h2>
            <p className="am-media-lead">{v.subtitle}</p>
          </div>
        </header>
        <div className="am-video-rail">
          <VideoShortsRow shorts={videos} playLabel={v.play} badge="Salon Alain Hair & Beauty   " />
        </div>
      </section>

      {/* GALLERY */}
      <section className="am-media am-container" aria-labelledby="am-gallery-heading">
        <header className="am-section-header">
          <div>
            <p className="am-eyebrow">The Gallery</p>
            <h2 id="am-gallery-heading">Alain Martinos Pictures & Photoshoots</h2>
            <p className="am-media-lead">Moments from the atelier, the stage and the collection.</p>
          </div>
        </header>
        <ul className="am-gallery-grid">
          {galleryImages.map((image, index) => (
            <li key={image.src}>
              <figure>
                <div className="am-gallery-photo">
                  <Image src={image.src} alt={image.alt} fill loading="lazy"
                    sizes="(max-width: 639px) 46vw, (max-width: 1023px) 45vw, 30vw"
                    className="am-photo-image" />
                </div>
               
              </figure>
            </li>
          ))}
        </ul>
        <div className="am-gallery-action">
          <Link href="/alain-gallery" className="am-button">
            View full gallery
            <Arrow />
          </Link>
        </div>
      </section>

      {/* BARBIE COLLECTOR — moved here from the chronicle */}
      {collectorChapter && (
        <section className="am-collector am-container" aria-label={collectorChapter.title}>
          <ChapterSection chapter={collectorChapter} index={collectorIndex} />
          <a
            href="https://www.instagram.com/barbie80s/"
            target="_blank"
            rel="noopener noreferrer"
            className="am-instagram-collection"
            aria-label="Follow Alain Martinos on Instagram and see his Barbie collection (opens in a new tab)"
          >
      <span className="am-instagram-icon" aria-hidden="true">
  <Image
    src="/images/barbie-collection-icon2.png"
    alt=""
    fill
    sizes="90px"
    className="object-cover scale-100"
  />
</span>
            <span className="am-instagram-copy">
              <strong>Follow Alain on Instagram and See his Huge Barbie Collection</strong>
              <span></span>
            </span>
            <span className="am-instagram-arrow" aria-hidden="true"><Arrow /></span>
          </a>
        </section>
      )}

      <section className="am-signature am-container" id="booking" aria-label="A personal reflection">
        <div className="am-signature-card">
          <figure><blockquote>{a.finalQuote.lines.map(line => <p key={line}>{line}</p>)}</blockquote><figcaption>— {a.finalQuote.attribution}</figcaption></figure>
          <ContactButton label={a.cta} />
        </div>
      </section>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
    </div>
  );
}

// Scoped styles keep the design independent of the Stitch Tailwind CDN/config.
// This remains a server component so the existing metadata export keeps working.
const pageCss = `
.alain-editorial{--am-bg:#1a0b2e;--am-panel:#231437;--am-raised:#27183b;--am-text:#eddcff;--am-muted:#d0c2d0;--am-accent:#e4b5ff;--am-line:#4d444f;min-width:0;background:var(--am-bg);color:var(--am-text);font-family:"Manrope",Arial,sans-serif;font-size:16px;line-height:1.7;overflow-wrap:anywhere}
.alain-editorial *{box-sizing:border-box}
.alain-editorial :is(h1,h2,h3,p,figure,blockquote,ul,ol,dl,dd){margin:0}
.alain-editorial :is(ul,ol){padding:0;list-style:none}
.alain-editorial :is(h1,h2,h3){font-family:"EB Garamond",Georgia,serif;color:var(--am-text);font-weight:400;text-wrap:balance}
.alain-editorial h2{font-size:clamp(2rem,3.4vw,3.25rem);line-height:1.12;letter-spacing:.01em}
.alain-editorial h3{font-size:1.65rem;line-height:1.3}
.alain-editorial a{text-decoration:none;color:inherit}
.alain-editorial a:focus-visible,.alain-editorial summary:focus-visible{outline:2px solid var(--am-accent);outline-offset:5px}
.alain-editorial ::selection{background:#633382;color:#fff}
.alain-editorial .am-container{width:min(100%,1440px);margin-inline:auto;padding-inline:clamp(20px,5.5vw,80px)}
.alain-editorial .am-eyebrow{font-size:.7rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;line-height:1.7;color:var(--am-accent)}
.alain-editorial :is(.am-prose,.am-hero-description,.am-sidebar-note,.am-archive-note p,.am-lenses dd,.am-card-description,.am-resilience-lead,.am-meaning-lead,.am-media-lead,.am-gallery-grid figcaption){font-weight:600}
.alain-editorial .am-hero{position:relative;isolation:isolate;padding:clamp(88px,10vw,144px) 0 clamp(52px,7vw,96px);overflow:hidden}
.alain-editorial .am-hero-background{position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 50% 35%,rgba(99,51,130,.27),transparent 68%),linear-gradient(rgba(26,11,46,.91),#1a0b2e),url('/images/footer-bg.jpg') center/cover no-repeat}
.alain-editorial .am-hero-content{text-align:center}
.alain-editorial .am-hero h1{font-size:clamp(3.1rem,8.4vw,7rem);line-height:1;letter-spacing:-.035em;margin:20px auto 24px;max-width:1100px}
.alain-editorial .am-roles{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:900px;margin:0 auto}
.alain-editorial .am-roles li{background:var(--am-raised);border:1px solid rgba(228,181,255,.08);border-radius:99px;padding:7px 17px;color:var(--am-accent);font-size:.73rem;letter-spacing:.08em;text-transform:uppercase}
.alain-editorial .am-hero-description{max-width:640px;margin:26px auto 0;color:#d3c0dd;font-size:1.125rem;line-height:1.8}
.alain-editorial .am-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:32px}
.alain-editorial .am-button{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:48px;padding:14px 27px;border:1px solid transparent;border-radius:999px;background:#b57acd;color:#320047;font-size:.75rem;line-height:1.5;font-weight:600;letter-spacing:.1em;text-align:center;text-transform:uppercase;transition:background .2s,box-shadow .2s;max-width:100%}
.alain-editorial .am-button svg{flex:none}
.alain-editorial .am-button:hover{background:#eab2ff;box-shadow:0 0 28px #b57acd33}
.alain-editorial .am-button-secondary{background:var(--am-raised);color:var(--am-accent)}
.alain-editorial .am-button-secondary:hover{background:#3d2e52}
.alain-editorial .am-chronicle{padding-block:24px 72px;scroll-margin-top:110px}
.alain-editorial .am-editorial-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:clamp(28px,4vw,60px);align-items:start}
.alain-editorial .am-sidebar{position:sticky;top:110px;min-width:0}
.alain-editorial .am-desktop-nav{padding:28px;border-radius:24px;background:var(--am-panel);box-shadow:0 16px 40px #10051f44}
.alain-editorial .am-chapter-links{margin-top:14px}
.alain-editorial .am-chapter-links a{display:flex;justify-content:space-between;align-items:center;gap:14px;min-height:48px;padding-block:10px;font-size:.84rem;line-height:1.55;color:var(--am-muted)}
.alain-editorial .am-chapter-links a:hover{color:var(--am-accent)}
.alain-editorial .am-nav-number{font-size:.65rem;letter-spacing:.08em;color:#c4adc9;flex:none}
.alain-editorial .am-sidebar-note{background:#15062966;padding:16px;border-radius:14px;margin-top:24px;font-size:.78rem;color:var(--am-muted)}
.alain-editorial .am-sidebar-note .am-eyebrow{font-size:.6rem;margin-bottom:6px}
.alain-editorial .am-mobile-nav{display:none}
.alain-editorial .am-founder{margin-top:24px}
.alain-editorial .am-founder .am-photo{aspect-ratio:4/5;max-height:330px}
.alain-editorial .am-founder figcaption{display:flex;flex-direction:column;gap:4px;padding:16px 4px;font-family:Georgia,serif;font-size:1.3rem}
.alain-editorial .am-founder figcaption .am-eyebrow{font-family:Arial,sans-serif;font-size:.6rem}
.alain-editorial .am-editorial-flow{display:flex;flex-direction:column;gap:64px;min-width:0}
.alain-editorial .am-opening{display:grid;gap:24px}
.alain-editorial .am-prose{color:var(--am-muted);line-height:1.85}
.alain-editorial .am-prose p+p{margin-top:20px}
.alain-editorial .am-opening>.am-prose:first-child{font-size:1.125rem;color:#d3c0dd}
.alain-editorial .am-quote{position:relative;overflow:hidden;border:0;border-radius:22px;background:var(--am-panel);padding:clamp(24px,3vw,40px);color:var(--am-text);font-family:"EB Garamond",Georgia,serif;font-size:clamp(1.55rem,2.7vw,2.25rem);font-style:italic;line-height:1.4}
.alain-editorial .am-quote:after{content:'”';position:absolute;right:10px;bottom:-50px;font-size:160px;line-height:1;color:#b57acd16;pointer-events:none}
.alain-editorial .am-chapter{scroll-margin-top:110px;display:grid;gap:24px;min-width:0}
.alain-editorial .am-chapter:target{outline:1px solid #b57acd66;outline-offset:12px;border-radius:20px}
.alain-editorial .am-chapter-card{background:var(--am-panel);padding:clamp(24px,3.4vw,48px);border-radius:24px;box-shadow:0 14px 40px #10051f33}
.alain-editorial .am-chapter-top{display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:80px}
.alain-editorial .am-chapter-number{font-family:Georgia,serif;font-size:clamp(4rem,6vw,5.5rem);line-height:1;color:#b57acd55;letter-spacing:-.04em}
.alain-editorial .am-chapter-header h2{margin-top:8px}
.alain-editorial .am-intro-columns .am-prose{columns:2;column-gap:24px}
.alain-editorial .am-intro-columns p{break-inside:avoid}
.alain-editorial .am-photo{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:22px;background:#27183b}
.alain-editorial .am-photo-image{object-fit:cover;object-position:center}
.alain-editorial .am-chapter-visual{max-width:580px;width:100%;margin-inline:auto}
.alain-editorial .am-chapter-visual .am-photo{aspect-ratio:4/5}
.alain-editorial .am-archive{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:20px;align-items:center}
.alain-editorial .am-archive .am-photo{aspect-ratio:4/5}
.alain-editorial .am-archive-note{background:var(--am-panel);border-radius:22px;padding:24px}
.alain-editorial .am-archive-note strong{display:block;font-family:Georgia,serif;font-size:clamp(2.5rem,4vw,3.5rem);font-weight:400;line-height:1.2;margin:14px 0}
.alain-editorial .am-archive-note p{font-size:.8rem;color:#d3c0dd}
.alain-editorial .am-chapter-card .am-quote{background:#322346}
.alain-editorial .am-lenses{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.alain-editorial .am-lenses>div{background:var(--am-raised);border-radius:18px;padding:24px}
.alain-editorial .am-lenses dt{font-family:Georgia,serif;font-size:1.55rem;margin:12px 0 8px;line-height:1.3}
.alain-editorial .am-lenses dd{font-size:.9rem;color:var(--am-muted);line-height:1.8}
.alain-editorial .am-identities{padding:32px;background:var(--am-panel);border-radius:22px}
.alain-editorial .am-small{font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:#c4adc9;margin:14px 0 10px}
.alain-editorial .am-identities li{font-family:Georgia,serif;font-size:clamp(1.7rem,3vw,2.4rem);line-height:1.35}
.alain-editorial .am-identities li:nth-child(even){color:var(--am-accent)}
.alain-editorial .am-inspiration{padding-block:20px 80px}
.alain-editorial .am-section-header{margin-bottom:28px}
.alain-editorial .am-section-header h2{margin-top:8px}
.alain-editorial .am-inspiration-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.alain-editorial .am-inspiration-grid>li{padding:30px 26px;border-radius:24px;background:var(--am-panel);transition:background .2s}
.alain-editorial .am-inspiration-grid>li:hover{background:var(--am-raised)}
.alain-editorial .am-card-number{display:block;font-family:Georgia,serif;font-size:2.75rem;color:#b57acd;line-height:1;margin-bottom:18px}
.alain-editorial .am-card-sub{margin-top:8px;font-size:.63rem;letter-spacing:.12em}
.alain-editorial .am-card-description{margin-top:24px;font-size:.875rem;line-height:1.85;color:var(--am-muted)}
.alain-editorial .am-meaning{padding:72px 0;background:var(--am-panel)}
.alain-editorial .am-resilience{max-width:880px;margin-inline:auto;text-align:center}
.alain-editorial .am-resilience-lead{margin:20px auto 24px;max-width:720px;color:var(--am-muted)}
.alain-editorial .am-resilience-lines{font-family:Georgia,serif;font-size:clamp(1.7rem,3vw,2.4rem);line-height:1.4;color:#d3c0dd}
.alain-editorial .am-resilience-lines p:nth-child(even){color:var(--am-accent)}
.alain-editorial .am-resilience-lines p:last-child{font-size:clamp(2rem,3.6vw,3.25rem);color:var(--am-text);margin-top:16px}
.alain-editorial .am-resilience h2{margin-top:48px}
.alain-editorial .am-meaning-lead{margin-top:20px;color:var(--am-muted)}
.alain-editorial .am-passions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 24px;margin-top:28px;color:var(--am-accent);font-size:.73rem;letter-spacing:.08em;text-transform:uppercase}
.alain-editorial .am-arcs{display:grid;gap:16px;max-width:1080px;margin:52px auto 0}
.alain-editorial .am-arcs li{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:24px;background:var(--am-raised);padding:28px 32px;border-radius:22px}
.alain-editorial .am-arc-from{font-family:Georgia,serif;font-size:1.65rem;line-height:1.35}
.alain-editorial .am-arc-to{color:var(--am-accent);font-size:1.05rem}
.alain-editorial .am-arcs svg{color:var(--am-accent)}
.alain-editorial .am-meaning-closing{max-width:760px;margin:40px auto 0;text-align:center;font-family:Georgia,serif;font-size:1.5rem}
.alain-editorial .am-meaning-closing p+p{margin-top:12px}
.alain-editorial .am-signature{padding-block:80px}
.alain-editorial .am-signature-card{max-width:800px;margin:auto;padding:clamp(28px,5vw,64px);border-radius:32px;text-align:center;background:radial-gradient(ellipse at top,#63338244,transparent 65%),var(--am-raised);box-shadow:0 24px 64px #10051f66,0 0 36px #b57acd15}
.alain-editorial .am-signature blockquote{font-family:Georgia,serif;font-size:clamp(1.65rem,3.3vw,2.6rem);line-height:1.4}
.alain-editorial .am-signature blockquote p+p{margin-top:8px}
.alain-editorial .am-signature blockquote p:last-child{color:#eab2ff}
.alain-editorial .am-signature figcaption{margin-top:26px;font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:var(--am-accent)}
.alain-editorial .am-signature .am-button{margin-top:32px}
@media(min-width:1024px) and (max-height:850px){.alain-editorial .am-sidebar{position:static}.alain-editorial .am-desktop-nav{position:sticky;top:100px}}
@media(max-width:1100px){.alain-editorial .am-inspiration-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.alain-editorial .am-desktop-nav{padding:22px}}
@media(max-width:1023px){.alain-editorial .am-editorial-grid{grid-template-columns:minmax(0,1fr)}.alain-editorial .am-sidebar{position:static}.alain-editorial .am-desktop-nav{display:none}.alain-editorial .am-mobile-nav{display:block;background:var(--am-panel);border:1px solid #b57acd33;border-radius:18px;padding:0 20px}.alain-editorial .am-mobile-nav summary{display:flex;align-items:center;justify-content:space-between;gap:16px;cursor:pointer;min-height:56px;color:var(--am-accent);font-size:.85rem;list-style:none}.alain-editorial .am-mobile-nav summary::-webkit-details-marker{display:none}.alain-editorial .am-mobile-nav[open] summary span{transform:rotate(45deg)}.alain-editorial .am-mobile-nav .am-chapter-links{padding-bottom:14px;margin-top:0}.alain-editorial .am-founder{max-width:380px;margin:28px auto 0}.alain-editorial .am-founder .am-photo{max-height:none}.alain-editorial .am-founder figcaption{text-align:center}.alain-editorial .am-editorial-flow{gap:48px}.alain-editorial .am-chronicle{padding-bottom:56px}}
@media(max-width:639px){.alain-editorial .am-hero{padding-top:88px;padding-bottom:44px}.alain-editorial .am-hero .am-eyebrow{font-size:.62rem;letter-spacing:.16em}.alain-editorial .am-roles{gap:7px}.alain-editorial .am-roles li{font-size:.62rem;padding:7px 12px}.alain-editorial .am-hero-description{font-size:1rem}.alain-editorial .am-actions{flex-direction:column;gap:12px}.alain-editorial .am-actions .am-button{width:100%}.alain-editorial .am-intro-columns .am-prose{columns:1}.alain-editorial .am-chapter-top{min-height:64px}.alain-editorial .am-chapter-card{padding:24px 20px}.alain-editorial .am-chapter{gap:22px}.alain-editorial .am-archive{grid-template-columns:minmax(0,1fr)}.alain-editorial .am-archive-note{padding:24px}.alain-editorial .am-archive-note strong{margin:8px 0}.alain-editorial .am-lenses{grid-template-columns:minmax(0,1fr)}.alain-editorial .am-identities{padding:24px}.alain-editorial .am-inspiration-grid{grid-template-columns:minmax(0,1fr);gap:14px}.alain-editorial .am-inspiration-grid>li{padding:26px}.alain-editorial .am-inspiration{padding-bottom:48px}.alain-editorial .am-meaning{padding:48px 0}.alain-editorial .am-arcs{margin-top:36px}.alain-editorial .am-arcs li{grid-template-columns:minmax(0,1fr);gap:12px;padding:24px}.alain-editorial .am-arcs svg{transform:rotate(90deg)}.alain-editorial .am-signature{padding-block:48px}.alain-editorial .am-signature-card{border-radius:24px;padding:32px 22px}.alain-editorial .am-signature .am-button{width:100%;padding-inline:18px}.alain-editorial .am-passions{gap:12px;font-size:.68rem}.alain-editorial .am-passions li{width:100%}}
.alain-editorial .am-media{padding-block:12px 72px}
.alain-editorial .am-collector{padding-block:12px 72px}
.alain-editorial .am-instagram-collection{display:flex;align-items:center;gap:16px;width:min(100%,580px);margin:32px auto 0;padding:18px 20px;border:1px solid #b57acd66;border-radius:22px;background:linear-gradient(135deg,#3d174e,#25143c);box-shadow:0 12px 32px #10051f55,0 0 24px #b57acd22;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
.alain-editorial .am-instagram-collection:hover{transform:translateY(-3px);border-color:#eab2ff;box-shadow:0 18px 38px #10051f77,0 0 30px #eab2ff44}
.alain-editorial .am-instagram-icon{display:grid;place-items:center;flex:none;width:46px;height:46px;border-radius:15px;background:linear-gradient(135deg,#eab2ff,#b57acd 58%,#633382);color:#301047;box-shadow:0 0 18px #eab2ff44}
.alain-editorial .am-instagram-icon svg{width:24px;height:24px}
.alain-editorial .am-instagram-copy{display:grid;gap:3px;min-width:0}
.alain-editorial .am-instagram-copy strong{font-family:Georgia,serif;font-size:1.28rem;font-weight:400;color:var(--am-text)}
.alain-editorial .am-instagram-copy span{font-size:.76rem;font-weight:600;letter-spacing:.03em;color:#d3c0dd}
.alain-editorial .am-instagram-arrow{display:grid;place-items:center;flex:none;margin-left:auto;width:38px;height:38px;border-radius:50%;background:#eab2ff;color:#4c1564}
.alain-editorial .am-instagram-arrow svg{width:18px;height:18px}
.alain-editorial .am-media-lead{margin-top:14px;max-width:560px;color:var(--am-muted);font-size:1rem;line-height:1.8}
.alain-editorial .am-video-rail{margin-top:4px}
.alain-editorial .am-video-rail p{color:var(--am-accent)}
.alain-editorial .am-gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:18px}
.alain-editorial .am-gallery-grid>li{min-width:0}
.alain-editorial .am-gallery-photo{position:relative;width:100%;aspect-ratio:4/5;overflow:hidden;border-radius:22px;background:var(--am-raised)}
.alain-editorial .am-gallery-grid img{object-fit:cover;object-position:center;transition:transform .7s ease}
.alain-editorial .am-gallery-grid li:hover img{transform:scale(1.04)}
.alain-editorial .am-gallery-grid figcaption{display:flex;align-items:baseline;gap:12px;padding:14px 4px 0;font-size:.85rem;line-height:1.6;color:var(--am-muted)}
.alain-editorial .am-gallery-index{flex:none;font-family:Georgia,serif;font-size:.95rem;color:#b57acd}
.alain-editorial .am-gallery-action{display:flex;justify-content:center;margin-top:32px}
@media(max-width:1023px){.alain-editorial .am-media{padding-bottom:56px}}
@media(max-width:639px){.alain-editorial .am-media,.alain-editorial .am-collector{padding-bottom:44px}.alain-editorial .am-media-lead{font-size:.95rem}.alain-editorial .am-gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.alain-editorial .am-gallery-photo{border-radius:16px}.alain-editorial .am-gallery-grid figcaption{gap:8px;padding-top:10px;font-size:.74rem}.alain-editorial .am-gallery-index{font-size:.8rem}.alain-editorial .am-gallery-action .am-button{width:100%}.alain-editorial .am-instagram-collection{align-items:flex-start;padding:16px}.alain-editorial .am-instagram-copy strong{font-size:1.1rem}.alain-editorial .am-instagram-copy span{font-size:.7rem}.alain-editorial .am-instagram-arrow{display:none}}
@media(prefers-reduced-motion:reduce){.alain-editorial *{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;

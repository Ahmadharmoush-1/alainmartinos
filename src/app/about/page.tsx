import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { CtaBand } from "@/components/CtaBand";
import { getContent } from "@/lib/i18n";
import { alainImages, heroImages, salonImages } from "@/lib/images";

const t = getContent();

export const metadata: Metadata = {
  title: t.about.title,
  description: t.about.description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${t.about.title} | Salon Alain`, description: t.about.description, url: "/about" },
};

const sectionImages = [salonImages[0], alainImages[1], salonImages[3], alainImages[4], salonImages[5]];

export default function AboutPage() {
  const a = t.about;
  return (
    <div className="page-purple-background theme-purple">
      <PageHero kicker="Salon Alain" title={a.heading} subtitle={a.subtitle} image={heroImages.about} variant="band" />

      <div className="container-page">
        {a.sections.map((s, i) => {
          const img = sectionImages[i % sectionImages.length];
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-night-line/60 py-20 last:border-0 sm:py-28">
              <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <Reveal className="zoom-frame aspect-[4/5]">
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" loading="lazy" />
                  </Reveal>
                </div>
                <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <Reveal>
                    <h2 className="text-display-md font-medium">{s.title}</h2>
                    <span aria-hidden="true" className="mt-6 block h-px w-14 bg-plum-500" />
                  </Reveal>
                  <Reveal delay={120} className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-lavender/80">
                    {s.body.map((p, j) => <p key={j}>{p}</p>)}
                  </Reveal>
                  {"quote" in s && s.quote && (
                    <Reveal delay={200} className="mt-8 border-l border-plum-500 pl-6">
                      <p className="font-serif text-2xl italic leading-snug text-lavender">“{s.quote}”</p>
                    </Reveal>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Why Salon Alain */}
      <section className="silk-bg py-24 sm:py-32">
        <div className="container-page">
          <Reveal className="text-center">
            <Divider className="mx-auto mb-8 max-w-xs" />
            <h2 className="text-display-md font-medium">{a.why.title}</h2>
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2">
            {a.why.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="border-t border-plum-700 pt-5">
                <h3 className="font-serif text-2xl font-medium">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-lavender/75">{p.desc}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-14 text-center">
            <Button href="/alain-martinos" size="lg">{a.cta}</Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

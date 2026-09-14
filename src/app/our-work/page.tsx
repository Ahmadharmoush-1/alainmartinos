import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { getContent } from "@/lib/i18n";
import { workImages } from "@/lib/images";

const t = getContent();
const w = t.work;

export const metadata: Metadata = {
  title: `${w.title} – Balayage, Color & Transformations`,
  description: w.description,
  alternates: { canonical: "/our-work" },
  openGraph: { title: `${w.title} | Salon Alain`, description: w.description, url: "/our-work" },
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero kicker="Portfolio" title={w.heading} subtitle={w.subtitle} />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <Gallery images={workImages} columns={4} />
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

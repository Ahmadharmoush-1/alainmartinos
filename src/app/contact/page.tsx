import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SocialIcons } from "@/components/SocialIcons";
import { getContent } from "@/lib/i18n";
import { heroImages } from "@/lib/images";
import { site, whatsappHref } from "@/lib/site";

const t = getContent();
const c = t.contact;

export const metadata: Metadata = {
  title: `${c.title} – Book an Appointment`,
  description: c.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${c.title} | Salon Alain`, description: c.description, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker={c.title} title={c.heading} subtitle={c.subtitle} />

      <section className="pb-24 pt-8 sm:pb-32">
        <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Details */}
          <aside className="lg:col-span-4">
            <Reveal>
              <Button href={whatsappHref(c.whatsappMessage)} size="lg" className="w-full">{c.whatsapp}</Button>
            </Reveal>

            <Reveal delay={100} className="mt-12 space-y-8">
              {site.locations.map((loc) => (
                <div key={loc.id} className="border-t border-plum-700 pt-4">
                  <p className="kicker">{loc.country}</p>
                  <p className="mt-2 font-serif text-2xl font-medium">{loc.title}</p>
                  <address className="mt-2 not-italic text-ink/75">
                    {loc.addressLines.map((l, i) => <span key={i} className="block">{l}</span>)}
                  </address>
                </div>
              ))}
            </Reveal>

            <Reveal delay={180} className="mt-10">
              <dl className="space-y-4 text-[0.95rem]">
                <div className="flex justify-between gap-4 border-b border-plum-200/70 pb-3">
                  <dt className="text-mist">{c.details.phone}</dt>
                  <dd><a href={site.phoneHref} className="link-line text-plum-700">{site.phone}</a></dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-plum-200/70 pb-3">
                  <dt className="text-mist">{c.details.whatsapp}</dt>
                  <dd><a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-line text-plum-700">{site.whatsapp}</a></dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-plum-200/70 pb-3">
                  <dt className="text-mist">{c.details.instagram}</dt>
                  <dd><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-line text-plum-700">@salonalain</a></dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-plum-200/70 pb-3">
                  <dt className="text-mist">{c.details.email}</dt>
                  <dd><a href={`mailto:${site.email}`} className="link-line text-plum-700">{site.email}</a></dd>
                </div>
              </dl>
              <SocialIcons className="mt-8" />
            </Reveal>

            <Reveal variant="image" delay={240} className="zoom-frame mt-12 hidden aspect-[7/8] lg:block">
              <Image src={heroImages.contact.src} alt={heroImages.contact.alt} fill sizes="30vw" className="object-cover" loading="lazy" />
            </Reveal>
          </aside>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

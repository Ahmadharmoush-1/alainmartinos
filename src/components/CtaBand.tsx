import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Divider } from "./Divider";
import { getContent } from "@/lib/i18n";
import { site } from "@/lib/site";

const t = getContent();

/** Deep-purple appointment band used on the home page and page endings. */
export function CtaBand({ heading = t.home.cta.heading, copy = t.home.cta.copy }: { heading?: string; copy?: string }) {
  const [lb, de] = site.locations;
  return (
    <section className="silk-bg-dark relative text-cream">
      <div className="container-page py-24 text-center sm:py-32">
        <Reveal>
          <Divider light className="mx-auto mb-10 max-w-xs" />
          <h2 className="mx-auto max-w-3xl text-display-lg font-medium text-cream">{heading}</h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-plum-100 sm:text-2xl">{copy}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={lb.bookHref} variant="light" size="lg" className="w-full sm:w-auto">{t.home.cta.lebanon}</Button>
            <Button href={de.bookHref} variant="light" size="lg" className="w-full sm:w-auto">{t.home.cta.germany}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

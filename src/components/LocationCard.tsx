import { Button } from "./Button";
import { site } from "@/lib/site";
import { getContent } from "@/lib/i18n";

const t = getContent();
type Location = (typeof site.locations)[number];

export function LocationCard({ location, showMap = true }: { location: Location; showMap?: boolean }) {
  return (
    <article className="border-t border-plum-700 pt-6">
      <p className="kicker">{location.country}</p>
      <h3 className="mt-2 text-display-sm font-medium">{location.title}</h3>
      <address className="mt-4 not-italic leading-relaxed text-ink/80">
        {location.addressLines.map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </address>

      {showMap && (
        <div className="mt-6 aspect-[4/3] w-full overflow-hidden bg-plum-50">
          {location.mapEmbed ? (
            <iframe
              src={location.mapEmbed}
              title={`Map – ${location.title}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          ) : (
            <div className="silk-bg flex h-full w-full flex-col items-center justify-center gap-2 text-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-plum-500" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11z" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
              <span className="font-serif text-lg italic text-plum-700">{t.salon.mapPlaceholder}</span>
            </div>
          )}
        </div>
      )}

      <dl className="mt-6 space-y-2 text-sm">
        <dt className="font-sans text-[0.65rem] font-medium uppercase tracking-wider2 text-plum-500">{t.salon.hoursTitle}</dt>
        {location.hours.map((h) => (
          <dd key={h.days} className="flex justify-between gap-4 border-b border-plum-200/60 pb-2 text-ink/80">
            <span>{h.days}</span>
            <span className="text-plum-700">{h.time}</span>
          </dd>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={location.bookHref} size="md">{t.salon.book}</Button>
        {location.mapLink && (
          <Button href={location.mapLink} variant="ghost">{t.salon.openInMaps}</Button>
        )}
      </div>
    </article>
  );
}

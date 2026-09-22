import Link from "next/link";

import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";

import { getContent } from "@/lib/i18n";
import { site, whatsappHref } from "@/lib/site";

const t = getContent();

const colTitle =
  "font-sans text-[0.62rem] font-medium uppercase tracking-[0.25em] text-lilac";

export function Footer() {
  const year = new Date().getFullYear();
  const lebanon = site.locations[0];

  return (
    <footer className="theme-purple relative overflow-hidden border-t border-night-line bg-night-deep">
      <div
        aria-hidden="true"
        className="glow-purple pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full"
      />

      <div className="container-page relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* =====================================================
              BRAND
          ===================================================== */}

          <div className="lg:col-span-4">
            <Logo size={80} />

            <p className="mt-6 font-serif text-2xl font-light leading-tight text-chalk sm:text-3xl">
              Salon Alain
            </p>

            <p className="mt-3 max-w-sm font-serif text-lg font-light italic leading-relaxed text-dusk sm:text-xl">
              {t.footer.tagline}
            </p>

            {/* SOCIAL ICONS */}

            <div className="mt-8">
              <SocialIcons className="footer-social-icons" />
            </div>
          </div>

          {/* =====================================================
              NAVIGATION
          ===================================================== */}

          <div className="lg:col-span-2">
            <h2 className={colTitle}>{t.footer.navTitle}</h2>

            <ul className="mt-6 space-y-3.5">
              {t.nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                      link-line
                      font-sans
                      text-[0.95rem]
                      font-light
                      text-lavender
                      transition-colors
                      duration-300
                      hover:text-bright
                    "
                  >
                    {item.label.replace(" Us", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              LOCATIONS
          ===================================================== */}

          <div className="lg:col-span-3">
            <h2 className={colTitle}>{t.footer.locationsTitle}</h2>

            <div className="mt-6 space-y-7">
              {site.locations.map((loc) => (
                <div key={loc.id}>
                  <p className="font-serif text-xl font-light text-chalk">
                    {loc.country}
                  </p>

                {loc.mapLink ? (
  <>
    <a
      href={loc.mapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        mt-2 inline-block font-sans text-[0.95rem]
        font-light leading-relaxed text-lavender
        transition-colors duration-300 hover:text-bright
      "
    >
      {loc.addressLines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}

      <span className="mt-3 inline-block font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em] text-bright">
        View on Google Maps →
      </span>
    </a>

    {loc.id === lebanon.id && (
      <div className="mt-5 rounded-2xl border border-bright/25 bg-night-raised/80 p-4 shadow-[0_0_28px_rgba(228,181,255,0.14)]">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bright/15 text-bright">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="m12 2.6 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 17.5 6.2 20.6l1.1-6.5L2.6 9.5l6.5-1L12 2.6Z" />
            </svg>
          </span>

          <div>
            <p className="font-sans text-sm font-semibold text-chalk">
              Loved your visit?
            </p>

            <p className="mt-1 font-sans text-xs font-semibold leading-relaxed text-lavender">
              Your Google review helps more clients discover Salon Alain
              Martinos.
            </p>

            <a
              href={loc.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4 inline-flex items-center gap-2 rounded-full
                bg-bright px-4 py-2.5 font-sans text-[0.62rem]
                font-bold uppercase tracking-[0.14em] text-night-deep
                shadow-[0_0_20px_rgba(228,181,255,0.42)]
                transition-all duration-300 hover:-translate-y-0.5
                hover:bg-white hover:shadow-[0_0_28px_rgba(228,181,255,0.7)]
              "
            >
              Rate us on Google
              <span aria-hidden="true">★★★★★</span>
            </a>
          </div>
        </div>
      </div>
    )}
  </>
) : (
  <p className="mt-2 font-sans text-[0.95rem] font-light leading-relaxed text-lavender">
    {loc.addressLines.map((line, i) => (
      <span key={i} className="block">
        {line}
      </span>
    ))}
  </p>
)}
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================
              CONTACT
          ===================================================== */}

          <div className="lg:col-span-3">
            <h2 className={colTitle}>{t.footer.contactTitle}</h2>

            <ul className="mt-6 space-y-4 font-sans text-[0.95rem] font-light text-lavender">
              {/* PHONE */}

              <li>
                <a
                  href={site.phoneHref}
                  className="link-line transition-colors duration-300 hover:text-bright"
                >
                  {site.phone}
                </a>
              </li>

              {/* WHATSAPP */}

              <li>
                <a
                  href={whatsappHref(
                    "Hello Salon Alain Martinos, I would like to book an appointment."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    transition-colors
                    duration-300
                    hover:text-bright
                  "
                >
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="h-5 w-5 shrink-0 text-bright"
                    aria-hidden="true"
                  >
                    <path d="M16.04 3C9.43 3 4.06 8.37 4.06 14.98c0 2.11.55 4.17 1.59 5.98L3 29l8.27-2.58a11.93 11.93 0 0 0 5.76 1.47h.01C23.65 27.89 29 22.52 29 15.91 29 9.3 23.64 3 16.04 3Zm0 22.86h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.91 1.53 1.31-4.79-.24-.39a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.91 7.02c0 5.47-4.45 9.92-9.07 10.5Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.93 8.93 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
                  </svg>

                  <span>WhatsApp {site.whatsapp}</span>
                </a>
              </li>

              {/* EMAIL */}

              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-line transition-colors duration-300 hover:text-bright"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            {/* HOURS */}

            <h2 className={`mt-10 ${colTitle}`}>{t.footer.hoursTitle}</h2>

            <ul className="mt-6 space-y-3 font-sans text-[0.9rem] font-light text-lavender">
              {lebanon.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex justify-between gap-4 border-b border-night-line pb-3"
                >
                  <span>{h.days}</span>
                  <span className="text-bright">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <div
          className="
            mt-16
            flex
            flex-col
            items-center
            justify-between
            gap-3
            border-t
            border-night-line
            pt-7
            text-center
            font-sans
            text-[0.72rem]
            font-light
            text-dusk
            sm:flex-row
            sm:text-left
          "
        >
          <p>{t.footer.copyright.replace("{year}", String(year))}</p>

          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

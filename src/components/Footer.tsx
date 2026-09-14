import Link from "next/link";

import { Logo } from "./Logo";

import { SocialIcons } from "./SocialIcons";

import { getContent } from "@/lib/i18n";

import { site, whatsappHref } from "@/lib/site";

const t = getContent();

export function Footer() {
  const year = new Date().getFullYear();

  const lebanon = site.locations[0];

  return (
    <footer
      className="relative overflow-hidden border-t border-plum-200/70 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/footer-bg.jpg')",
      }}
    >
      {/* White transparent overlay */}
      <div className="absolute inset-0 bg-white/80" />

      <div className="container-page relative z-10 py-16 lg:py-20">

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo size={72} />

            <p className="mt-6 font-serif text-2xl font-medium text-plum-700">
              Salon Alain
            </p>

            <p className="mt-1 font-serif text-lg italic text-mist">
              {t.footer.tagline}
            </p>

            <SocialIcons className="mt-8" />
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">

            <h2 className="font-sans text-[0.68rem] font-medium uppercase tracking-wider2 text-plum-500">
              {t.footer.navTitle}
            </h2>

            <ul className="mt-5 space-y-3">
              {t.nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-line text-sm text-ink/80 hover:text-plum-700"
                  >
                    {item.label.replace(" Us", "")}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Locations */}
          <div className="lg:col-span-3">

            <h2 className="font-sans text-[0.68rem] font-medium uppercase tracking-wider2 text-plum-500">
              {t.footer.locationsTitle}
            </h2>

            <div className="mt-5 space-y-6">

              {site.locations.map((loc) => (
                <div key={loc.id}>

                  <p className="font-serif text-lg font-medium text-plum-700">
                    {loc.country}
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-ink/80">
                    {loc.addressLines.map((l, i) => (
                      <span key={i} className="block">
                        {l}
                      </span>
                    ))}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Contact */}
          <div className="lg:col-span-3">

            <h2 className="font-sans text-[0.68rem] font-medium uppercase tracking-wider2 text-plum-500">
              {t.footer.contactTitle}
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-ink/80">

              <li>
                <a
                  href={site.phoneHref}
                  className="link-line hover:text-plum-700"
                >
                  {site.phone}
                </a>
              </li>

              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line hover:text-plum-700"
                >
                  WhatsApp {site.whatsapp}
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-line hover:text-plum-700"
                >
                  {site.email}
                </a>
              </li>

            </ul>

            <h2 className="mt-8 font-sans text-[0.68rem] font-medium uppercase tracking-wider2 text-plum-500">
              {t.footer.hoursTitle}
            </h2>

            <ul className="mt-5 space-y-2 text-sm text-ink/80">

              {lebanon.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex justify-between gap-4 border-b border-plum-200/60 pb-2"
                >
                  <span>{h.days}</span>

                  <span className="text-plum-700">
                    {h.time}
                  </span>
                </li>
              ))}

            </ul>

          </div>

        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-plum-200/70 pt-6 text-center text-xs text-mist sm:flex-row sm:text-left">

          <p>
            {t.footer.copyright.replace("{year}", String(year))}
          </p>

          <p>
            {t.footer.rights}
          </p>

        </div>

      </div>
    </footer>
  );
}
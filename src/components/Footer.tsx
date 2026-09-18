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
      className="
        relative
        overflow-hidden
        border-t
        border-plum-200/70
        bg-cover
        bg-center
        bg-no-repeat
      "
      // style={{
      //   backgroundImage: "url('/images/footer-bg.jpg')",
      // }}
    >
      {/* White transparent overlay */}
      <div className="absolute inset-0 bg-white/80" />

      <div className="container-page relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">

          {/* =====================================================
              BRAND
          ===================================================== */}

          <div className="lg:col-span-4">
            <Logo size={90} />

            <p
              className="
                mt-6
                font-serif
                text-3xl
                font-bold
                leading-tight
                text-plum-700
                sm:text-4xl
              "
            >
              Salon Alain Martinos
            </p>

            <p
              className="
                mt-2
                max-w-sm
                font-serif
                text-xl
                font-semibold
                italic
                leading-relaxed
                text-ink/75
                sm:text-2xl
              "
            >
              {t.footer.tagline}
            </p>

            {/* SOCIAL ICONS */}

            <div className="mt-9">
              <SocialIcons className="footer-social-icons" />
            </div>
          </div>

          {/* =====================================================
              NAVIGATION
          ===================================================== */}

          <div className="lg:col-span-2">
            <h2
              className="
                font-sans
                text-[0.8rem]
                font-extrabold
                uppercase
                tracking-[0.18em]
                text-plum-600
                sm:text-[0.9rem]
              "
            >
              {t.footer.navTitle}
            </h2>

            <ul className="mt-6 space-y-4">
              {t.nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                      link-line
                      text-base
                      font-semibold
                      text-ink/85
                      transition-colors
                      duration-300
                      hover:text-plum-700
                      sm:text-[1.05rem]
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
            <h2
              className="
                font-sans
                text-[0.8rem]
                font-extrabold
                uppercase
                tracking-[0.18em]
                text-plum-600
                sm:text-[0.9rem]
              "
            >
              {t.footer.locationsTitle}
            </h2>

            <div className="mt-6 space-y-7">
              {site.locations.map((loc) => (
                <div key={loc.id}>
                  <p
                    className="
                      font-serif
                      text-xl
                      font-bold
                      text-plum-700
                      sm:text-2xl
                    "
                  >
                    {loc.country}
                  </p>

                  {loc.mapLink ? (
                    <a
                      href={loc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-2
                        inline-block
                        text-[1rem]
                        font-medium
                        leading-relaxed
                        text-ink/80
                        transition-colors
                        duration-300
                        hover:text-plum-700
                      "
                    >
                      {loc.addressLines.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}

                      <span
                        className="
                          mt-2
                          inline-block
                          text-[0.72rem]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-plum-600
                        "
                      >
                        View on Google Maps →
                      </span>
                    </a>
                  ) : (
                    <p
                      className="
                        mt-2
                        text-[1rem]
                        font-medium
                        leading-relaxed
                        text-ink/80
                      "
                    >
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
            <h2
              className="
                font-sans
                text-[0.8rem]
                font-extrabold
                uppercase
                tracking-[0.18em]
                text-plum-600
                sm:text-[0.9rem]
              "
            >
              {t.footer.contactTitle}
            </h2>

            <ul
              className="
                mt-6
                space-y-4
                text-[1rem]
                font-semibold
                text-ink/85
                sm:text-[1.05rem]
              "
            >
              {/* PHONE */}

              <li>
                <a
                  href={site.phoneHref}
                  className="
                    link-line
                    transition-colors
                    duration-300
                    hover:text-plum-700
                  "
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
                    hover:text-plum-700
                  "
                >
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="
                      h-6
                      w-6
                      shrink-0
                      sm:h-7
                      sm:w-7
                    "
                    aria-hidden="true"
                  >
                    <path d="M16.04 3C9.43 3 4.06 8.37 4.06 14.98c0 2.11.55 4.17 1.59 5.98L3 29l8.27-2.58a11.93 11.93 0 0 0 5.76 1.47h.01C23.65 27.89 29 22.52 29 15.91 29 9.3 23.64 3 16.04 3Zm0 22.86h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.91 1.53 1.31-4.79-.24-.39a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.91 7.02c0 5.47-4.45 9.92-9.07 10.5Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.93 8.93 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
                  </svg>

                  <span>
                    WhatsApp {site.whatsapp}
                  </span>
                </a>
              </li>

              {/* EMAIL */}

              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="
                    link-line
                    transition-colors
                    duration-300
                    hover:text-plum-700
                  "
                >
                  {site.email}
                </a>
              </li>
            </ul>

            {/* HOURS */}

            <h2
              className="
                mt-10
                font-sans
                text-[0.8rem]
                font-extrabold
                uppercase
                tracking-[0.18em]
                text-plum-600
                sm:text-[0.9rem]
              "
            >
              {t.footer.hoursTitle}
            </h2>

            <ul
              className="
                mt-6
                space-y-3
                text-[0.95rem]
                font-medium
                text-ink/80
                sm:text-base
              "
            >
              {lebanon.hours.map((h) => (
                <li
                  key={h.days}
                  className="
                    flex
                    justify-between
                    gap-4
                    border-b
                    border-plum-200/60
                    pb-3
                  "
                >
                  <span className="font-semibold">
                    {h.days}
                  </span>

                  <span className="font-bold text-plum-700">
                    {h.time}
                  </span>
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
            border-plum-200/70
            pt-7
            text-center
            text-[0.8rem]
            font-medium
            text-ink/60
            sm:flex-row
            sm:text-left
            sm:text-sm
          "
        >
          <p>
            {t.footer.copyright.replace(
              "{year}",
              String(year)
            )}
          </p>

          <p>
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
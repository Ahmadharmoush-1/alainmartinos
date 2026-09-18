import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { SocialIcons } from "@/components/SocialIcons";
import { getContent } from "@/lib/i18n";
import { heroImages } from "@/lib/images";
import { site, whatsappHref } from "@/lib/site";

const c = getContent().contact;

export const metadata: Metadata = {
  title: `${c.title} – Book an Appointment`,
  description: c.description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `${c.title} | Salon Alain Martinos`,
    description: c.description,
    url: "/contact",
  },
};

const styles = {
  container: "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",

  heading:
    "font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",

  button:
    "inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#7028B5] bg-[#7028B5] px-6 py-3.5 text-center text-lg font-semibold leading-7 text-white shadow-sm transition-colors hover:border-[#571D90] hover:bg-[#571D90] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7028B5] motion-reduce:transition-none",

  link:
    "rounded-sm text-[#6527A7] underline decoration-[#B58ADC] underline-offset-4 transition-colors hover:text-[#7028B5] hover:decoration-[#7028B5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7028B5] motion-reduce:transition-none",
};

const formTheme = `
  min-w-0 text-lg leading-8 text-[#6527A7]
  [&_form]:min-w-0 [&_fieldset]:min-w-0 [&_fieldset]:max-w-full
  [&_h1]:!text-[#6527A7] [&_h2]:!text-[#6527A7] [&_h3]:!text-[#6527A7]
  [&_h1]:!text-3xl [&_h2]:!text-3xl [&_h3]:!text-2xl
  [&_h1]:!leading-tight [&_h2]:!leading-tight [&_h3]:!leading-tight
  [&_h1]:!font-semibold [&_h2]:!font-semibold [&_h3]:!font-semibold
  sm:[&_h2]:!text-4xl
  [&_p]:!text-lg [&_p]:!leading-8 [&_p]:!text-[#6527A7]
  [&_label]:!text-lg [&_label]:!font-semibold [&_label]:!text-[#6527A7]
  [&_legend]:!text-[#6527A7] [&_small]:!text-[#6527A7]
  [&_span]:!text-[#6527A7] [&_li]:!text-[#6527A7]
  [&_a]:!text-[#6527A7] [&_strong]:!text-[#6527A7]
  [&_input]:!min-w-0 [&_input]:!max-w-full [&_input]:!text-lg
  [&_input]:!text-[#6527A7] [&_input]:!accent-[#7028B5]
  [&_textarea]:!min-w-0 [&_textarea]:!max-w-full [&_textarea]:!text-lg
  [&_textarea]:!text-[#6527A7] [&_textarea]:!leading-8
  [&_select]:!min-w-0 [&_select]:!max-w-full [&_select]:!text-lg
  [&_select]:!text-[#6527A7] [&_option]:!text-[#6527A7]
  [&_input]:!border-[#C7A6EB]
  [&_textarea]:!border-[#C7A6EB]
  [&_select]:!border-[#C7A6EB]
  [&_input]:!bg-white [&_textarea]:!bg-white
  [&_select]:!bg-white [&_option]:!bg-white
  [&_input::placeholder]:!text-[#8054A8]
  [&_textarea::placeholder]:!text-[#8054A8]
  [&_input:focus-visible]:!outline-[#7028B5]
  [&_textarea:focus-visible]:!outline-[#7028B5]
  [&_select:focus-visible]:!outline-[#7028B5]
  [&_button]:!min-h-[52px] [&_button]:!max-w-full
  [&_button]:!whitespace-normal [&_button]:!rounded-full
  [&_button]:!border-[#7028B5] [&_button]:!bg-[#7028B5]
  [&_button]:!px-6 [&_button]:!py-3
  [&_button]:!text-lg [&_button]:!font-semibold
  [&_button]:!text-white [&_button_*]:!text-white
  [&_button:hover]:!border-[#571D90]
  [&_button:hover]:!bg-[#571D90]
  [&_button:focus-visible]:!outline-[#7028B5]
  [&_button:disabled]:!cursor-not-allowed
  [&_button:disabled]:!opacity-60
  [&_[role=alert]]:!text-[#6527A7]
  [&_[role=status]]:!text-[#6527A7]
`;

// Scoped to the social icons on this contact page.
const socialIconStyles = `
  .contact-social-icons ul {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    gap: 12px !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
  }

  .contact-social-icons li {
    display: flex !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .contact-social-icons a,
  .contact-social-icons a:hover,
  .contact-social-icons a:focus,
  .contact-social-icons a:active {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    min-height: 48px !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 50% !important;
    background: transparent !important;
    box-shadow: none !important;
    text-decoration: none !important;
    --tw-ring-offset-width: 0px !important;
    --tw-ring-offset-shadow: 0 0 transparent !important;
    --tw-ring-shadow: 0 0 transparent !important;
  }

  .contact-social-icons a::before,
  .contact-social-icons a::after {
    display: none !important;
  }

  .contact-social-icons a > span {
    display: block !important;
    width: 48px !important;
    height: 48px !important;
    overflow: hidden !important;
    border-radius: 50% !important;
    background: transparent !important;
  }

  .contact-social-icons img {
    display: block !important;
    width: 48px !important;
    height: 48px !important;
    max-width: 48px !important;
    border: 0 !important;
    border-radius: 50% !important;
    clip-path: circle(50%) !important;
    object-fit: contain !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  .contact-social-icons a:focus-visible {
    outline: 2px solid #51415D !important;
    outline-offset: 4px !important;
  }
`;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`h-5 w-5 shrink-0 ${diagonal ? "-rotate-45" : ""}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h16m-6-6 6 6-6 6"
      />
    </svg>
  );
}

export default function ContactPage() {
  const contactDetails = [
    {
      label: c.details.phone,
      value: site.phone,
      href: site.phoneHref,
      external: false,
    },
    {
      label: c.details.whatsapp,
      value: site.whatsapp,
      href: whatsappHref(),
      external: true,
    },
    {
      label: c.details.instagram,
      value: "@salon_alain_hair_and_beauty",
      href: site.social.instagram,
      external: true,
    },
    {
      label: c.details.email,
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
  ];

  return (
    <div className="min-w-0 break-words bg-[#F1E7FC] text-[#6527A7]">
      <style>{socialIconStyles}</style>

      {/* HERO */}
      <section
        aria-labelledby="contact-heading"
        className="
          relative isolate overflow-hidden
          bg-gradient-to-br from-[#E6D5FA]
          via-[#DCC2F5] to-[#C59AE9]
          pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pt-36
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -right-24 -top-24 -z-10
            h-80 w-80 rounded-full border border-white/40
            sm:h-[28rem] sm:w-[28rem]
          "
        />

        <div className={`${styles.container} text-center`}>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6527A7]">
            {c.title}
          </p>

          <h1
            id="contact-heading"
            className="
              mx-auto mt-5 max-w-4xl font-serif
              text-4xl font-semibold leading-tight tracking-tight
              text-[#6527A7] sm:text-5xl lg:text-6xl
            "
          >
            {c.heading}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6527A7] sm:text-xl">
            {c.subtitle}
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappHref(c.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              {c.whatsapp}
              <Arrow diagonal />
            </a>

            <a href="#contact-form" className={styles.button}>
              Send a message
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM AND DETAILS */}
      <div
        className={`
          ${styles.container}
          grid items-start gap-7 py-12 sm:py-16
          lg:grid-cols-12 lg:gap-8 lg:py-20
        `}
      >
        <section
          id="contact-form"
          aria-label="Appointment enquiry form"
          className="
            min-w-0 scroll-mt-28 rounded-[2rem]
            border border-[#D6BDF0] bg-[#FAF6FF]
            p-5 shadow-sm sm:p-8 lg:col-span-7 lg:p-10
          "
        >
          <div className={formTheme}>
            <ContactForm />
          </div>
        </section>

        <aside
          aria-labelledby="contact-details-heading"
          className="min-w-0 space-y-7 lg:col-span-5"
        >
          

        
        </aside>
      </div>

      {/* LOCATIONS */}
      <section
        aria-labelledby="locations-heading"
        className="
          border-t border-[#C7A6EB]
          bg-gradient-to-br from-[#DDC3F5] to-[#D0ACEF]
          py-14 sm:py-20
        "
      >
        <div className={styles.container}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6527A7]">
              Salon Alain
            </p>

            <h2
              id="locations-heading"
              className={`mt-4 ${styles.heading} text-[#6527A7]`}
            >
              Our location
            </h2>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {site.locations.map((location) => (
              <article
                key={location.id}
                aria-labelledby={`location-${location.id}`}
                className="
                  flex min-w-0 flex-col rounded-[2rem]
                  border border-[#BE94E5] bg-[#F1E7FC]
                  p-6 sm:p-8
                "
              >
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6527A7]">
                  {location.country}
                </p>

                <h3
                  id={`location-${location.id}`}
                  className="
                    mt-3 font-serif text-3xl font-semibold
                    leading-tight text-[#6527A7] sm:text-4xl
                  "
                >
                  {location.title}
                </h3>

                <address className="mb-7 mt-5 text-lg not-italic leading-8 text-[#6527A7] sm:text-xl">
                  {location.addressLines.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                {location.mapLink && (
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${location.title} on Google Maps (opens in a new tab)`}
                    className={`
                      ${styles.button}
                      mt-auto w-full self-start sm:w-auto
                    `}
                  >
                    View on Google Maps
                    <Arrow diagonal />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>s
      </section>
    </div>
  );
}
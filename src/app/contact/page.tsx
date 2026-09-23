import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialIcons } from "@/components/SocialIcons";
import { getContent } from "@/lib/i18n";
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

/**
 * Where the "Leave a Google review" button sends people.
 *
 * Left empty, it falls back to the same Google Maps URL the map card uses.
 * To drop clients straight into the review dialog instead, paste either the
 * short link from Google Business Profile → "Ask for reviews", or
 * https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
 */
const GOOGLE_REVIEW_URL = "";

type IconName = "arrow" | "phone" | "chat" | "mail" | "pin" | "clock" | "calendar" | "instagram";
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    arrow: "M5 12h14m-6-6 6 6-6 6",
    phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z",
    chat: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z",
    mail: "M3 5h18v14H3z M3 5l9 7 9-7",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z M12 6v6l4 2",
    calendar: "M4 5h16v16H4z M16 3v4M8 3v4M4 11h16",
    instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M17.5 6.5h.01",
  };
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

function Stars() {
  return (
    <span className="contact-review-stars" role="img" aria-label="Five stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2.6 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 17.5 6.2 20.6l1.1-6.5L2.6 9.5l6.5-1L12 2.6Z" />
        </svg>
      ))}
    </span>
  );
}

function IllustratedMap({ id, country, isLebanon }: { id: string; country: string; isLebanon: boolean }) {
  return (
<svg className="contact-map-art" aria-hidden="true" preserveAspectRatio="xMidYMid meet" fill="none" viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<defs>

<linearGradient id={`${id}-seaGrad`} x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#150629"></stop>
<stop offset="100%" stopColor="#231437"></stop>
</linearGradient>

<linearGradient id={`${id}-landGrad`} x1="20%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#27183b"></stop>
<stop offset="100%" stopColor="#322346"></stop>
</linearGradient>

<filter height="200%" id={`${id}-purpleGlow`} width="200%" x="-50%" y="-50%">
<feGaussianBlur in="SourceGraphic" result="blur1" stdDeviation="6"></feGaussianBlur>
<feMerge>
<feMergeNode in="blur1"></feMergeNode>
<feMergeNode in="SourceGraphic"></feMergeNode>
</feMerge>
</filter>
</defs>

<rect fill={`url(#${id}-seaGrad)`} height="500" width="700"></rect>

<path d="M 280,0 C 290,90 270,140 250,190 C 230,240 210,270 235,320 C 260,370 290,420 270,500 L 700,500 L 700,0 Z" fill={`url(#${id}-landGrad)`}></path>

<path d="M 280,0 C 290,90 270,140 250,190 C 230,240 210,270 235,320 C 260,370 290,420 270,500" fill="none" opacity="0.6" stroke="#4d444f" strokeWidth="2.5"></path>

<path d="M 370,30 Q 420,120 400,240 T 430,480" fill="none" stroke="#3d2e52" strokeDasharray="4 6" strokeWidth="1.5"></path>
<path d="M 480,0 Q 530,150 510,290 T 560,500" fill="none" stroke="#3d2e52" strokeDasharray="3 5" strokeWidth="1.5"></path>

<path d="M 295,0 L 285,90 C 275,140 260,180 252,220 C 242,270 255,330 278,390 L 305,500" fill="none" stroke="#633382" strokeLinecap="round" strokeWidth="3"></path>
<path d="M 295,0 L 285,90 C 275,140 260,180 252,220 C 242,270 255,330 278,390 L 305,500" fill="none" opacity="0.7" stroke="#b57acd" strokeLinecap="round" strokeWidth="1"></path>

<path d="M 260,220 C 290,230 330,220 370,235" fill="none" stroke="#4d444f" strokeWidth="1.5"></path>
<path d="M 252,240 C 290,260 340,275 390,290" fill="none" stroke="#4d444f" strokeWidth="1.5"></path>
<path d="M 280,160 C 320,170 360,160 410,175" fill="none" stroke="#4d444f" strokeWidth="1.5"></path>
<path d="M 270,330 C 310,345 360,350 420,340" fill="none" stroke="#4d444f" strokeWidth="1.5"></path>

<line opacity="0.4" stroke="#322346" strokeWidth="1" x1="80" x2="160" y1="120" y2="120"></line>
<line opacity="0.4" stroke="#322346" strokeWidth="1" x1="60" x2="140" y1="260" y2="260"></line>
<line opacity="0.4" stroke="#322346" strokeWidth="1" x1="90" x2="180" y1="400" y2="400"></line>

<g transform="translate(290, 230)">

<circle cx="0" cy="0" fill="#eab2ff" fillOpacity="0.08" r="38">


</circle>
<circle cx="0" cy="0" fill="#b57acd" fillOpacity="0.25" r="22"></circle>
<circle cx="0" cy="0" fill="#eab2ff" filter={`url(#${id}-purpleGlow)`} r="10"></circle>
<circle cx="0" cy="0" fill="#4c1564" r="5"></circle>
</g>

<text fill="#f7d8ff" fontFamily="Manrope" fontSize="12" fontWeight="600" letterSpacing="0.1em" x="316" y="226">Salon Alain Hair & Beauty – Alain Martinos</text>
<text fill="#d3c0dd" fontFamily="Manrope" fontSize="10" letterSpacing="0.05em" x="316" y="242">{isLebanon ? "Zouk Mikael · Jounieh" : country}</text>
<text fill="#4d444f" fontFamily="EB Garamond" fontSize="11" fontStyle="italic" letterSpacing="0.15em" x="80" y="210">{isLebanon ? "MEDITERRANEAN SEA" : ""}</text>
<text fill="#998d9a" fontFamily="Manrope" fontSize="9" letterSpacing="0.2em" x="340" y="90">{isLebanon ? "JOUNIEH BAY" : ""}</text>
<text fill="#998d9a" fontFamily="Manrope" fontSize="9" letterSpacing="0.2em" x="430" y="320">{isLebanon ? "KESERWAN MT." : ""}</text>
</svg>
  );
}

export default function ContactPage() {
  const contactDetails: { label: string; value: string; href: string; external: boolean; icon: IconName }[] = [
    { label: c.details.phone, value: site.phone, href: site.phoneHref, external: false, icon: "phone" },
    { label: c.details.whatsapp, value: site.whatsapp, href: whatsappHref(), external: true, icon: "chat" },
    { label: c.details.email, value: site.email, href: `mailto:${site.email}`, external: false, icon: "mail" },
    { label: c.details.instagram, value: "@salon_alain_hair_and_beauty", href: site.social.instagram, external: true, icon: "instagram" },
  ];

  return (
    <div className="contact-editorial page-purple-background">
      <style>{contactStyles}</style>
      <section className="contact-hero" aria-labelledby="contact-heading">
        <div className="contact-container">
           
          <p className="contact-eyebrow">{c.title}</p>
          <h1 id="contact-heading">{c.heading}</h1>
          <p className="contact-subtitle">{c.subtitle}</p>
          <div className="contact-actions">
            <a href={whatsappHref(c.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="contact-button"><Icon name="chat" />{c.whatsapp}</a>
            <a href="#contact-form" className="contact-button contact-button-secondary"><Icon name="mail" />Send a message</a>
          </div>
        </div>
      </section>

    <figure className="contact-location-feature-image">
  <img src="/images/contact-alain.jpg" alt="Alain Martinos at the salon" />
</figure>

      <section className="contact-locations contact-container" aria-labelledby="locations-heading">
        <header className="contact-location-heading"><p className="contact-eyebrow">Salon Alain</p><h2 id="locations-heading">Our Location{site.locations.length > 1 ? "s" : ""}</h2><p>Find your salon and plan your visit.</p></header>
        <div className="contact-location-list">
          {site.locations.map((location, index) => {
            const isLebanon = /lebanon|liban|لبنان|zouk|jounieh/i.test([location.country, location.title, ...location.addressLines].join(" "));
            const reviewHref = GOOGLE_REVIEW_URL || location.mapLink;
            return (
              <article className="contact-location-grid" key={location.id} aria-labelledby={`location-${location.id}`}>
                <div className="contact-location-card">
                  <div>
                    <p className="contact-eyebrow">{location.country}</p>
                    <h3 id={`location-${location.id}`}>{location.title}</h3>
                    <address>{location.addressLines.map((line, lineIndex) => <span key={lineIndex}>{line}</span>)}</address>
                    {location.mapLink && <a className="contact-map-link" href={location.mapLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${location.title} on Google Maps (opens in a new tab)`}>View on Google Maps <Icon name="arrow" /></a>}
                    <dl className="contact-directory">
                      {contactDetails.map(detail => <div key={detail.icon} className="contact-directory-row">
                        <span className="contact-icon"><Icon name={detail.icon} /></span>
                        <div><dt>{detail.label}</dt><dd><a href={detail.href} target={detail.external ? "_blank" : undefined} rel={detail.external ? "noopener noreferrer" : undefined}>{detail.value}</a></dd></div>
                      </div>)}
                    </dl>
                  </div>
                  <div className="contact-hours">
                    <p className="contact-hours-title"><Icon name="clock" /><span>Salon Atelier Hours</span></p>
                    {isLebanon ? <><p><strong>Tuesday – Saturday:</strong> 10:00 – 19:00</p><p>Sunday &amp; Monday: Closed</p></> : <p>Contact us to confirm availability and arrange your appointment.</p>}
                  </div>
                </div>
                <div className="contact-map" role="group" aria-label={`Illustrated location card for ${location.title}`}>
                  <IllustratedMap id={`contact-map-${index}`} country={location.country} isLebanon={isLebanon} />
                  <span className="contact-map-caption">Illustrated location map</span>
                  <div className="contact-map-controller">
                    <div className="contact-map-identity"><span className="contact-map-dot" aria-hidden="true" /><div><span>{location.title}</span></div></div>
                    {location.mapLink && <a className="contact-directions" href={location.mapLink} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${location.title} (opens in a new tab)`}>Get directions <Icon name="pin" /></a>}
                  </div>
                </div>

                {reviewHref && (
                  <aside className="contact-review" aria-labelledby={`review-${location.id}`}>
                    <span className="contact-review-glow" aria-hidden="true" />
                    <div className="contact-review-body">
                      <Stars />
                      <p className="contact-eyebrow">Your experience</p>
                      <h3 id={`review-${location.id}`}>Loved your visit? Tell Google.</h3>
                      <p>
                        A few words about your appointment helps other clients in {location.addressLines[0]} find
                        Alain Martinos — and it means a great deal to the whole team. It takes less than a minute.
                      </p>
                    </div>
                    <a
                      className="contact-review-button"
                      href={reviewHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Leave a Google review for ${location.title} (opens in a new tab)`}
                    >
                      Leave a Google review
                      <Icon name="arrow" />
                    </a>
                  </aside>
                )}
              </article>
            );
          })}
        </div>
        <div className="contact-social"><p className="contact-eyebrow">Follow Us On Social Media</p><div className="contact-social-icons"><SocialIcons /></div></div>
      </section>  <section id="contact-form" className="contact-form-section" aria-label="Appointment enquiry form">
        <div className="contact-container">
          <div className="contact-form-layout contact-form-layout-solo">
            <div className="contact-form-card">
              <div className="contact-form-intro"><p className="contact-eyebrow">Haute Coiffure Reservation</p><span className="contact-icon contact-calendar"><Icon name="calendar" /></span></div>
              {/* Keep the existing form component and its submission/validation behavior. */}
              <div className="contact-form-theme"><ContactForm /></div>
              <p className="contact-form-note">Prefer to talk? Send us a <a href={whatsappHref(c.whatsappMessage)} target="_blank" rel="noopener noreferrer">WhatsApp message</a> and we will reply personally.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

// Scoped CSS: no CDN, extra package, or Tailwind configuration changes required.
const contactStyles = `
.contact-editorial{--contact-bg:#1a0b2e;--contact-panel:#27183b;--contact-low:#231437;--contact-text:#eddcff;--contact-muted:#d3c0dd;--contact-primary:#eab2ff;min-width:0;overflow-wrap:anywhere;background:var(--contact-bg);color:var(--contact-text);font-family:"Manrope",Arial,sans-serif;line-height:1.7}
.contact-editorial *{box-sizing:border-box}
.contact-editorial :is(h1,h2,h3,p,dl,dd){margin:0}
.contact-editorial :is(h1,h2,h3){font-family:"EB Garamond",Georgia,serif;font-weight:400;color:var(--contact-text);text-wrap:balance}
.contact-editorial a{color:inherit;text-decoration:none}
.contact-editorial a:focus-visible{outline:2px solid var(--contact-primary);outline-offset:5px}
.contact-editorial .contact-container{width:min(100%,1440px);padding-inline:clamp(20px,5.5vw,80px);margin-inline:auto}
.contact-editorial .contact-eyebrow{color:#e4b5ff;font-size:.72rem;font-weight:500;line-height:1.7;text-transform:uppercase;letter-spacing:.23em}
.contact-editorial :is(.contact-subtitle,.contact-form-note,.contact-location-heading>p:last-child,.contact-location-card address,.contact-directory dd,.contact-hours,.contact-map-identity span:not(.contact-map-dot),.contact-review-body>p:last-child){font-weight:600}
.contact-editorial .contact-hero{position:relative;padding:clamp(90px,10vw,140px) 0 72px;text-align:center;background:radial-gradient(ellipse at 50% 50%,#b57acd20,transparent 65%),radial-gradient(ellipse at 90% 0%,#63338235,transparent 45%)}
.contact-editorial .contact-hero h1{max-width:940px;margin:20px auto;font-size:clamp(2.8rem,6vw,4.5rem);line-height:1.06;letter-spacing:-.025em}
.contact-editorial .contact-subtitle{max-width:660px;margin:auto;font-size:1.125rem;line-height:1.85;color:var(--contact-muted)}
.contact-editorial .contact-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:18px;margin-top:34px}
.contact-editorial .contact-button{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:50px;padding:15px 30px;border-radius:999px;background:#eab2ff;color:#4c1564;font-size:.75rem;line-height:1.5;font-weight:600;letter-spacing:.13em;text-transform:uppercase;text-align:center;box-shadow:0 0 30px #eab2ff20;transition:background .2s,box-shadow .2s}
.contact-editorial .contact-button:hover{background:#f7d8ff;box-shadow:0 0 34px #eab2ff35}
.contact-editorial .contact-button-secondary{background:#322346;color:#e4b5ff;box-shadow:none}
.contact-editorial .contact-button-secondary:hover{background:#3d2e52}
.contact-editorial .contact-button svg{flex:none}
.contact-editorial .contact-form-section{padding-block:72px;background:var(--contact-low);scroll-margin-top:100px}
.contact-editorial .contact-form-layout{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(320px,.95fr);align-items:stretch;gap:clamp(24px,4vw,56px);max-width:1240px;margin-inline:auto}
.contact-editorial .contact-form-layout-solo{display:block;max-width:768px}
.contact-editorial .contact-form-card{min-width:0;margin:0;padding:clamp(24px,4vw,48px);border-radius:40px;background:var(--contact-panel);box-shadow:0 20px 60px -15px #150629cc,0 0 40px #b57acd15}
.contact-editorial .contact-location-feature-image{display:block;margin:0 auto 8px;overflow:hidden;border-radius:32px;background:#150629;box-shadow:0 20px 60px -15px #150629cc}
.contact-editorial .contact-location-feature-image img{display:block;width:100%;height:auto;max-height:680px;object-fit:contain;object-position:center}
.contact-editorial .contact-form-image{position:relative;isolation:isolate;min-height:100%;margin:0;overflow:hidden;border-radius:40px;background:#150629;box-shadow:0 20px 60px -15px #150629cc}
.contact-editorial .contact-form-image:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent 38%,#150629e8 100%)}
.contact-editorial .contact-form-image img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:contain;object-position:center}
.contact-editorial .contact-form-image figcaption{position:absolute;right:clamp(22px,3vw,36px);bottom:clamp(22px,3vw,36px);left:clamp(22px,3vw,36px)}
.contact-editorial .contact-form-image figcaption>p:last-child{margin-top:7px;font-family:"EB Garamond",Georgia,serif;font-size:clamp(1.9rem,3vw,2.8rem);line-height:1.05;color:#fff;text-wrap:balance}
.contact-editorial .contact-form-intro{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:20px}
.contact-editorial .contact-icon{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;flex:none;border-radius:50%;color:var(--contact-primary);background:#322346}
.contact-editorial .contact-calendar{width:48px;height:48px}
.contact-editorial .contact-form-theme{min-width:0;color:var(--contact-text)}
.contact-editorial .contact-form-theme :is(form,fieldset){min-width:0;max-width:100%}
.contact-editorial .contact-form-theme :is(h1,h2,h3){color:var(--contact-text)!important;font-weight:400!important;font-size:clamp(1.75rem,3vw,2.25rem)!important;line-height:1.25!important}
.contact-editorial .contact-form-theme :is(p,legend,small){color:var(--contact-muted)}
.contact-editorial .contact-form-theme label{color:#e4b5ff!important;font-size:.75rem!important;letter-spacing:.1em;text-transform:uppercase;line-height:1.6!important}
.contact-editorial .contact-form-theme :is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=submit]),textarea,select){width:100%!important;min-width:0!important;max-width:100%!important;min-height:52px;padding:15px 18px!important;border:1px solid #695373!important;border-radius:20px!important;background:#3d2e52!important;color:var(--contact-text)!important;font:inherit!important;font-size:16px!important;line-height:1.6!important;box-shadow:none!important;color-scheme:dark}
.contact-editorial .contact-form-theme textarea{min-height:150px;resize:vertical}
.contact-editorial .contact-form-theme option{background:#3d2e52;color:var(--contact-text)}
.contact-editorial .contact-form-theme :is(input,textarea)::placeholder{color:#c3afcb!important;opacity:1}
.contact-editorial .contact-form-theme :is(input,select,textarea):focus-visible{outline:2px solid #eab2ff!important;outline-offset:3px}
.contact-editorial .contact-form-theme :is(input[type=checkbox],input[type=radio]){accent-color:#eab2ff}
.contact-editorial .contact-form-theme :is(button[type=submit],button:not([type]),input[type=submit]){display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:52px;max-width:100%;padding:16px 24px!important;border:0!important;border-radius:999px!important;background:#eab2ff!important;color:#4c1564!important;white-space:normal;font-size:.8rem!important;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.contact-editorial .contact-form-theme :is(button,input[type=submit]):disabled{opacity:.6;cursor:not-allowed}
.contact-editorial .contact-form-theme [aria-invalid=true]{border-color:#ffb4ab!important}
.contact-editorial .contact-form-theme [role=alert]{color:#ffdad6!important}
.contact-editorial .contact-form-theme [role=status]{color:#eddcff!important}
.contact-editorial .contact-form-note{margin-top:24px;font-size:.875rem;text-align:center;color:var(--contact-muted)}
.contact-editorial .contact-form-note a{text-decoration:underline;text-underline-offset:4px;color:#e4b5ff}
.contact-editorial .contact-locations{padding-block:72px}
.contact-editorial .contact-location-heading{max-width:700px;margin-bottom:36px}
.contact-editorial .contact-location-heading h2{font-size:clamp(2.3rem,4vw,3.25rem);line-height:1.15;margin:10px 0 14px}
.contact-editorial .contact-location-heading>p:last-child{color:var(--contact-muted);font-size:1.125rem}
.contact-editorial .contact-location-list{display:grid;gap:40px}
.contact-editorial .contact-location-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:stretch;gap:40px}
.contact-editorial .contact-location-card{min-width:0;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(26px,3vw,40px);border-radius:32px;background:var(--contact-panel);box-shadow:0 18px 40px #10051f40}
.contact-editorial .contact-location-card h3{font-size:1.65rem;line-height:1.3;letter-spacing:.035em;margin:10px 0 12px;text-transform:uppercase}
.contact-editorial .contact-location-card address{font-style:normal;color:var(--contact-muted);font-size:1rem;line-height:1.8}
.contact-editorial .contact-location-card address span{display:block}
.contact-editorial .contact-map-link{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin-top:12px;font-size:.73rem;line-height:1.6;letter-spacing:.12em;text-transform:uppercase;color:#e4b5ff}
.contact-editorial .contact-map-link:hover{color:#f7d8ff}
.contact-editorial .contact-map-link svg{flex:none}
.contact-editorial .contact-directory{display:grid;gap:20px;margin-top:24px;padding:24px;border-radius:18px;background:var(--contact-low)}
.contact-editorial .contact-directory-row{display:flex;align-items:flex-start;gap:14px;min-width:0}
.contact-editorial .contact-directory-row>div{min-width:0}
.contact-editorial .contact-directory dt{font-size:.65rem;text-transform:uppercase;letter-spacing:.16em;color:#c0adca}
.contact-editorial .contact-directory dd{font-size:.94rem;line-height:1.7}
.contact-editorial .contact-directory a{display:inline-block;min-height:32px;padding-top:3px;overflow-wrap:anywhere}
.contact-editorial .contact-directory a:hover{color:#eab2ff}
.contact-editorial .contact-hours{margin-top:28px;padding:24px;border-radius:18px;background:#150629;font-size:.84rem;color:var(--contact-muted)}
.contact-editorial .contact-hours-title{display:flex;gap:12px;align-items:center;margin-bottom:12px;color:#e4b5ff;font-size:.7rem;letter-spacing:.13em;text-transform:uppercase}
.contact-editorial .contact-hours-title svg{flex:none}
.contact-editorial .contact-hours strong{font-weight:500;color:#e4b5ff}
.contact-editorial .contact-map{position:relative;isolation:isolate;display:flex;flex-direction:column;justify-content:flex-end;min-width:0;min-height:540px;overflow:hidden;padding:24px;border-radius:32px;background:#150629;box-shadow:0 24px 50px #10051f66}
.contact-editorial .contact-map-art{position:absolute;inset:0;width:100%;height:100%;z-index:-1;opacity:.9}
.contact-editorial .contact-map-caption{position:absolute;top:24px;left:24px;font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:#d3c0dd;background:#15062999;border:1px solid #b57acd20;border-radius:99px;padding:6px 12px}
.contact-editorial .contact-map-controller{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:18px;padding:20px;border-radius:22px;background:#1a0b2ee6;border:1px solid #b57acd1a;backdrop-filter:blur(12px);box-shadow:0 10px 30px #10051f44}
.contact-editorial .contact-map-identity{display:flex;align-items:center;gap:14px;min-width:0;flex:1 1 160px}
.contact-editorial .contact-map-identity>div{min-width:0}
.contact-editorial .contact-map-identity p{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;line-height:1.5}
.contact-editorial .contact-map-identity span:not(.contact-map-dot){font-size:.8rem;color:#d3c0dd}
.contact-editorial .contact-map-dot{flex:none;width:9px;height:9px;background:#eab2ff;border-radius:50%;box-shadow:0 0 0 6px #eab2ff16,0 0 20px #eab2ff55}
.contact-editorial .contact-directions{display:inline-flex;justify-content:center;align-items:center;gap:8px;min-height:46px;padding:12px 18px;border-radius:99px;background:#633382;color:#f7d8ff;font-size:.66rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;text-align:center;transition:background .2s}
.contact-editorial .contact-directions:hover{background:#eab2ff;color:#4c1564}
.contact-editorial .contact-directions svg{flex:none;width:16px;height:16px}
.contact-editorial .contact-review{grid-column:1/-1;position:relative;isolation:isolate;overflow:hidden;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:28px;padding:clamp(26px,3vw,40px);border-radius:32px;border:1px solid #b57acd40;background:linear-gradient(120deg,#2a1640 0%,#3a2158 48%,#27183b 100%);box-shadow:0 22px 60px -20px #10051faa,0 0 0 1px #eab2ff14,0 0 46px #b57acd22}
.contact-editorial .contact-review-glow{position:absolute;z-index:-1;top:-45%;right:-8%;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,#eab2ff40,transparent 68%);filter:blur(40px);pointer-events:none;animation:contact-review-breathe 6s ease-in-out infinite}
@keyframes contact-review-breathe{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.09)}}
.contact-editorial .contact-review-body{min-width:0;flex:1 1 320px}
.contact-editorial .contact-review-stars{display:inline-flex;gap:3px;margin-bottom:10px;color:#ffd166}
.contact-editorial .contact-review-stars svg{flex:none}
.contact-editorial .contact-review h3{font-size:clamp(1.5rem,2.4vw,2rem);line-height:1.22;margin:8px 0 10px}
.contact-editorial .contact-review-body>p:last-child{max-width:58ch;font-size:.96rem;color:var(--contact-muted)}
.contact-editorial .contact-review-button{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:16px 30px;border-radius:999px;background:#eab2ff;color:#4c1564;font-size:.73rem;font-weight:600;letter-spacing:.13em;text-transform:uppercase;text-align:center;box-shadow:0 0 34px #eab2ff33;transition:background .2s,box-shadow .2s,transform .2s}
.contact-editorial .contact-review-button:hover{background:#f7d8ff;box-shadow:0 0 44px #eab2ff55;transform:translateY(-1px)}
.contact-editorial .contact-review-button svg{flex:none}
.contact-editorial .contact-social{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:20px;margin-top:44px}
.contact-editorial .contact-social-icons ul{display:flex!important;flex-wrap:wrap;align-items:center;gap:12px;margin:0!important;padding:0!important;list-style:none}
.contact-editorial .contact-social-icons li{display:flex;margin:0;padding:0}
.contact-editorial .contact-social-icons a{display:inline-flex!important;align-items:center;justify-content:center;width:48px;height:48px;padding:0!important;border:0!important;border-radius:50%;background:transparent!important;box-shadow:none!important}
.contact-editorial .contact-social-icons a:before,.contact-editorial .contact-social-icons a:after{display:none!important}
.contact-editorial .contact-social-icons a>span{display:block;width:48px;height:48px;border-radius:50%;overflow:hidden}
.contact-editorial .contact-social-icons img{width:48px!important;height:48px!important;border-radius:50%;object-fit:contain;clip-path:circle(50%)}
@media(max-width:1100px){.contact-editorial .contact-location-grid{gap:24px}.contact-editorial .contact-location-card{padding:26px}.contact-editorial .contact-directory{padding:20px}.contact-editorial .contact-map{padding:20px}.contact-editorial .contact-review{padding:26px;gap:24px}}
@media(max-width:900px){.contact-editorial .contact-form-layout{grid-template-columns:minmax(0,1fr)}.contact-editorial .contact-form-image{order:-1;min-height:520px}.contact-editorial .contact-location-grid{grid-template-columns:minmax(0,1fr)}.contact-editorial .contact-map{min-height:460px}.contact-editorial .contact-map-art{object-fit:cover}.contact-editorial .contact-location-card{padding:32px}.contact-editorial .contact-directory{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:639px){.contact-editorial .contact-hero{padding:90px 0 48px}.contact-editorial .contact-subtitle{font-size:1rem}.contact-editorial .contact-actions{flex-direction:column;gap:12px;margin-top:28px}.contact-editorial .contact-button{width:100%;padding-inline:20px;font-size:.7rem}.contact-editorial .contact-form-section{padding-block:40px}.contact-editorial .contact-form-layout{gap:20px}.contact-editorial .contact-form-card{padding:26px 20px;border-radius:28px}.contact-editorial .contact-form-image{min-height:380px;border-radius:28px}.contact-editorial .contact-form-intro .contact-eyebrow{font-size:.6rem;letter-spacing:.14em}.contact-editorial .contact-locations{padding-block:48px}.contact-editorial .contact-location-heading{margin-bottom:26px}.contact-editorial .contact-location-heading>p:last-child{font-size:1rem}.contact-editorial .contact-location-card{padding:26px 20px;border-radius:26px}.contact-editorial .contact-directory{grid-template-columns:minmax(0,1fr);padding:20px 16px}.contact-editorial .contact-directory a{min-height:44px}.contact-editorial .contact-hours{padding:22px 18px}.contact-editorial .contact-map{min-height:440px;padding:16px;border-radius:26px}.contact-editorial .contact-map-art{height:300px;top:20px}.contact-editorial .contact-map-caption{top:16px;left:16px;font-size:.55rem}.contact-editorial .contact-map-controller{flex-direction:column;align-items:stretch;gap:16px;padding:18px;border-radius:20px}.contact-editorial .contact-map-identity{flex:auto}.contact-editorial .contact-directions{width:100%;min-height:48px}.contact-editorial .contact-review{padding:26px 20px;border-radius:26px;gap:20px}.contact-editorial .contact-review-glow{width:280px;height:280px}.contact-editorial .contact-review-button{width:100%;min-height:52px}.contact-editorial .contact-social{flex-direction:column}.contact-editorial .contact-location-list{gap:32px}}
@media(prefers-reduced-motion:reduce){.contact-editorial *{transition:none!important;animation:none!important}}
`;

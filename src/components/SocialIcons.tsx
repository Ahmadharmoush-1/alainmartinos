import { site, whatsappHref } from "@/lib/site";

const icons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M14 8.5V6.8c0-.9.4-1.3 1.3-1.3H17V2.5h-2.6C11.6 2.5 10.5 4 10.5 6.5v2H8v3h2.5v10h3.5v-10h2.6l.4-3H14z" strokeLinejoin="round" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" strokeLinecap="round" />
      <path d="M14 3c.4 2.7 2.2 4.5 5 4.8" strokeLinecap="round" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M4 20l1.2-4A8.5 8.5 0 1 1 8.4 19L4 20z" strokeLinejoin="round" />
      <path d="M9.2 8.8c.2-.5.5-.5.8-.5h.5l.7 1.7-.6.8c.5 1 1.5 2 2.6 2.5l.8-.7 1.7.8v.5c0 .4-.3.8-.7 1-.6.3-1.4.3-2.4-.2a8 8 0 0 1-3.6-3.6c-.5-1.1-.4-1.9.2-2.3z" strokeLinejoin="round" />
    </svg>
  ),
};

const links: { key: keyof typeof icons; label: string; href: string }[] = [
  { key: "instagram", label: "Instagram", href: site.social.instagram },
  { key: "facebook", label: "Facebook", href: site.social.facebook },
  { key: "tiktok", label: "TikTok", href: site.social.tiktok },
  { key: "youtube", label: "YouTube", href: site.social.youtube },
  { key: "whatsapp", label: "WhatsApp", href: whatsappHref() },
];

export function SocialIcons({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            title={l.label}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ease-luxe hover:-translate-y-0.5 ${
              light
                ? "border-plum-300/50 text-plum-100 hover:border-cream hover:bg-cream hover:text-plum-700"
                : "border-plum-200 text-plum-700 hover:border-plum-700 hover:bg-plum-700 hover:text-cream"
            }`}
          >
            <span className="h-[18px] w-[18px]">{icons[l.key]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

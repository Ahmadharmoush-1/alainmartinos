import { site, whatsappHref } from "@/lib/site";

const links = [
  {
    key: "instagram",
    label: "Instagram",
    href: site.social.instagram,
    icon: "/images/social/instagram.jpg",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: site.social.facebook,
    icon: "/images/social/facebook.jpg",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: site.social.tiktok,
    icon: "/images/social/tiktok.jpg",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: site.social.youtube,
    icon: "/images/social/youtube.jpg",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: whatsappHref(),
    icon: "/images/social/whatsapp.jpg",
  },
];

type SocialIconsProps = {
  className?: string;
  light?: boolean;
};

export function SocialIcons({
  className = "",
}: SocialIconsProps) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map((link) => (
        <li key={link.key} className="flex">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in a new tab)`}
            title={link.label}
            className="
              inline-flex h-[52px] w-[52px] shrink-0
              items-center justify-center
              !rounded-none !border-0 !bg-transparent
              !p-0 !shadow-none
              transition-opacity duration-200
              hover:!bg-transparent hover:opacity-75
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-plum-700
            "
          >
            <img
  src={link.icon}
  alt=""
  width={48}
  height={48}
  className="block h-[48px] w-[48px] !rounded-none object-contain"
/>
          </a>
        </li>
      ))}
    </ul>
  );
}
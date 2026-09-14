import Image from "next/image";
import Link from "next/link";

type Props = { size?: number; className?: string; priority?: boolean; link?: boolean };

/** The circular Salon Alain logo. Source file: /public/brand/logo.jpg */
export function Logo({ size = 64, className = "", priority = false, link = true }: Props) {
  const img = (
    <Image
      src="/brand/logo.jpg"
      alt="Salon Alain – hair & beauty"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full ${className}`}
      sizes={`${size}px`}
    />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label="Salon Alain – home" className="inline-flex shrink-0">
      {img}
    </Link>
  );
}

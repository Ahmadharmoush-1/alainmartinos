import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-3 font-sans text-[0.72rem] font-medium uppercase tracking-wider2 transition-all duration-500 ease-luxe focus-visible:outline-plum-500 disabled:opacity-60 disabled:cursor-not-allowed select-none";

const sizes: Record<Size, string> = {
  md: "px-7 py-3.5 min-h-[48px]",
  lg: "px-9 py-4 min-h-[54px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-plum-700 text-cream hover:bg-plum-500 hover:-translate-y-px shadow-[0_10px_30px_-18px_rgba(109,43,135,0.7)]",
  outline: "border border-plum-700 text-plum-700 hover:bg-plum-700 hover:text-cream hover:-translate-y-px",
  ghost: "text-plum-700 px-0 py-2 min-h-0 gap-2",
  light: "border border-cream/70 text-cream hover:bg-cream hover:text-plum-700 hover:-translate-y-px",
};

const Arrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
};

type LinkProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;
type NativeProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button(props: LinkProps | NativeProps) {
  const { children, variant = "primary", size = "md", className = "", arrow = variant === "ghost" } = props;
  const cls = `${base} ${variant === "ghost" ? "" : sizes[size]} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, arrow: _a, children: _ch, ...rest } = props;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...rest}>
          <span>{children}</span>
          {arrow && <Arrow />}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        <span>{children}</span>
        {arrow && <Arrow />}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, arrow: _a, children: _ch, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}

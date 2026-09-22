import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "outline" | "ghost" | "light";

type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-sans text-[0.7rem] font-medium uppercase leading-none tracking-[0.22em] transition-all duration-500 ease-luxe focus-visible:outline-bright disabled:opacity-60 disabled:cursor-not-allowed select-none";

const sizes: Record<Size, string> = {
  md: "px-7 min-h-[48px]",
  lg: "px-9 min-h-[54px]",
};

/* =========================================================
   BUTTON VARIANTS — all-purple system
   primary/light = filled lilac pill with deep-purple ink
   outline/ghost = hairline lilac pill on the purple surface
========================================================= */

const SOLID =
  "bg-[#9B62B3] !text-[#1A0B2E] border border-[#9B62B3] hover:bg-[#C08BE0] hover:border-[#C08BE0] hover:-translate-y-px shadow-[0_18px_40px_-22px_rgba(155,98,179,0.9)]";

const HAIRLINE =
  "bg-transparent !text-[#DCC8E6] border border-[#C08BE0] hover:border-[#DCC8E6] hover:bg-[#C08BE0]/12 hover:!text-[#F6EFFA] hover:-translate-y-px";

const variants: Record<Variant, string> = {
  primary: SOLID,
  light: SOLID,
  outline: HAIRLINE,
  ghost: HAIRLINE,
};

const Arrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="
      h-3.5
      w-3.5
      shrink-0
      transition-transform
      duration-500
      ease-luxe
      group-hover:translate-x-1
    "
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path
      d="M3 12h17M14 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
} & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children"
  >;

type NativeProps = CommonProps & {
  href?: undefined;
} & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
  >;

export function Button(props: LinkProps | NativeProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    arrow = variant === "ghost",
  } = props;

  const cls = `
    ${base}
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `;

  /* =========================================================
      LINK BUTTON
  ========================================================= */

  if (props.href !== undefined) {
    const {
      href,
      variant: _v,
      size: _s,
      className: _c,
      arrow: _a,
      children: _ch,
      ...rest
    } = props;

    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...rest}
        >
          <span>{children}</span>

          {arrow && <Arrow />}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cls}
        {...rest}
      >
        <span>{children}</span>

        {arrow && <Arrow />}
      </Link>
    );
  }

  /* =========================================================
      NATIVE BUTTON
  ========================================================= */

  const {
    variant: _v,
    size: _s,
    className: _c,
    arrow: _a,
    children: _ch,
    ...rest
  } = props;

  return (
    <button
      className={cls}
      {...rest}
    >
      <span>{children}</span>

      {arrow && <Arrow />}
    </button>
  );
}
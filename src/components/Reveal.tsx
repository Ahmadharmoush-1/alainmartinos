"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Use "image" for a clip-path curtain reveal on media frames. */
  variant?: "fade" | "image";
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Lightweight scroll reveal: adds `.is-visible` once the element enters the
 * viewport. Pure CSS transitions — no animation library, respects
 * prefers-reduced-motion via globals.css.
 */
export function Reveal({ children, variant = "fade", delay = 0, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = variant === "image" ? "reveal-img" : "reveal";
  return (
    <Tag
      ref={ref}
      className={`${base} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

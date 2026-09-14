"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { getContent } from "@/lib/i18n";

const t = getContent();

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation and lock body scroll while it's open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        solid ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(220,200,230,0.6)]" : "bg-transparent"
      }`}
    >
      <div className={`container-page flex items-center justify-between transition-all duration-500 ${solid ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24"}`}>
        <div className="flex items-center gap-3">
          <Logo size={solid ? 44 : 52} priority className="transition-all duration-500" />
          <span className="hidden font-serif text-lg font-medium tracking-wide text-plum-700 sm:block">Salon Alain</span>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {t.nav.items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-line font-sans text-[0.7rem] font-medium uppercase tracking-wider2 transition-colors duration-300 ${
                  active ? "text-plum-700" : "text-ink/75 hover:text-plum-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" className="hidden md:inline-flex" size="md">
            {t.nav.book}
          </Button>
          <button
            type="button"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-12 w-12 items-center justify-center text-plum-700 xl:hidden"
          >
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-all duration-500 ease-luxe ${open ? "top-2 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-2 h-px w-6 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-4 h-px w-6 bg-current transition-all duration-500 ease-luxe ${open ? "top-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer — a sibling of the header (not a child) so the header's
          backdrop-filter does not become its containing block. */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-cream/95 backdrop-blur-lg transition-all duration-500 ease-luxe xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8">
          {t.nav.items.map((item, i) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                className={`border-b border-plum-100 py-4 font-serif text-3xl font-medium transition-all duration-700 ease-luxe ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                } ${active ? "text-plum-700" : "text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-8">
            <Button href="/contact" size="lg" className="w-full" tabIndex={open ? 0 : -1}>
              {t.nav.book}
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}

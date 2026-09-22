"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";
import { getContent } from "@/lib/i18n";

const t = getContent();

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      {/* =====================================================
          HEADER — deep aubergine, hairline bottom border
      ===================================================== */}

      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          transition-all
          duration-500
          ease-luxe

          ${
            solid
              ? "border-night-line bg-night-base/95 backdrop-blur-md"
              : "border-transparent bg-night-base/55 backdrop-blur-sm"
          }
        `}
      >
        <div
          className={`
            container-page
            flex
            items-center
            justify-between
            gap-4
            transition-all
            duration-500

            ${solid ? "h-[4.5rem] lg:h-[5rem]" : "h-20 lg:h-[5.75rem]"}
          `}
        >
          {/* =================================================
              LOGO + BRAND
          ================================================= */}

          <div className="flex min-w-0 items-center gap-3.5">
            <Logo
              size={solid ? 48 : 58}
              priority
              className="transition-all duration-500"
            />

            <span
              className="
                hidden
                truncate
                font-serif
                text-lg
                font-light
                tracking-[0.06em]
                text-chalk
                sm:block
                lg:text-xl
              "
            >
              Salon Alain Martinos
            </span>
          </div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            aria-label="Main"
            className="
              hidden
              items-center
              gap-8
              xl:flex
            "
          >
            {t.nav.items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    link-line

                    font-sans
                    text-[0.7rem]
                    font-medium
                    uppercase
                    tracking-[0.22em]

                    transition-colors
                    duration-300

                    ${active ? "text-bright" : "text-lilac hover:text-chalk"}
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="flex items-center gap-3">
            {/* BOOK BUTTON */}

            <Link
              href="/contact"
              className="pill pill-solid hidden !min-h-[44px] !px-6 !text-[0.62rem] md:inline-flex"
            >
              {t.nav.book}
            </Link>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                text-bright
                xl:hidden
              "
            >
              <span className="sr-only">
                {open ? t.nav.close : t.nav.menu}
              </span>

              <span
                aria-hidden="true"
                className="
                  relative
                  block
                  h-5
                  w-7
                "
              >
                {/* TOP */}

                <span
                  className={`
                    absolute
                    left-0
                    top-0
                    h-px
                    w-7
                    rounded-full
                    bg-current
                    transition-all
                    duration-500
                    ease-luxe

                    ${open ? "top-[9px] rotate-45" : ""}
                  `}
                />

                {/* MIDDLE */}

                <span
                  className={`
                    absolute
                    left-0
                    top-[9px]
                    h-px
                    w-7
                    rounded-full
                    bg-current
                    transition-all
                    duration-300

                    ${open ? "opacity-0" : ""}
                  `}
                />

                {/* BOTTOM */}

                <span
                  className={`
                    absolute
                    left-0
                    top-[18px]
                    h-px
                    w-7
                    rounded-full
                    bg-current
                    transition-all
                    duration-500
                    ease-luxe

                    ${open ? "top-[9px] -rotate-45" : ""}
                  `}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU — full-screen purple overlay
      ===================================================== */}

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`
          fixed
          inset-x-0
          bottom-0
          top-[4.5rem]
          z-40

          flex
          flex-col

          bg-night-base/98
          backdrop-blur-xl

          transition-all
          duration-500
          ease-luxe

          xl:hidden

          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      >
        <nav
          aria-label="Mobile"
          className="
            container-page
            flex
            flex-1
            flex-col
            justify-center
            gap-1
            overflow-y-auto
            py-8
          "
        >
          {t.nav.items.map((item, i) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? 0 : -1}
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                }}
                className={`
                  border-b
                  border-night-line
                  py-5

                  font-serif
                  text-[2rem]
                  font-light
                  leading-tight

                  transition-all
                  duration-700
                  ease-luxe

                  sm:text-[2.3rem]

                  ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

                  ${active ? "text-bright" : "text-chalk hover:text-bright"}
                `}
              >
                {item.label}
              </Link>
            );
          })}

          {/* MOBILE BOOK BUTTON */}

          <div className="pt-10">
            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              className="pill pill-solid w-full"
            >
              {t.nav.book}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

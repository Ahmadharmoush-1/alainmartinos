import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — derived from the Salon Alain logo and AM visual.
        plum: {
          50: "#F6EFF8", // very light lavender
          100: "#EEE3F2",
          200: "#DCC8E6", // soft lavender
          300: "#C4A6D6",
          400: "#AF84C4",
          500: "#9B62B3", // primary purple
          600: "#84479F",
          700: "#6D2B87", // deep luxury purple
          800: "#4F1E62",
          900: "#341340",
        },
        // All-purple (dark aubergine) surface system — no white anywhere.
        night: {
          deep: "#150823",   // footer, deepest purple
          base: "#1A0B2E",   // page background
          raised: "#241040", // alternate section background
          card: "#2E1550",   // card / panel / accordion surface
          hover: "#3B1C64",  // hover / active surface
          line: "#4A2A72",   // hairlines, borders, dividers
        },
        // Material-3 palette from the Stitch mockups (same #1A0B2E base as `night`).
        m3: {
          surface: "#1A0B2E",
          bright: "#413257",
          lowest: "#150629",
          low: "#231437",
          container: "#27183B",
          high: "#322346",
          highest: "#3D2E52",
          variant: "#3D2E52",
          outline: "#998D9A",
          "outline-variant": "#4D444F",
          primary: "#EAB2FF",
          "primary-container": "#B57ACD",
          "on-primary": "#4C1564",
          secondary: "#E4B5FF",
          "secondary-container": "#633382",
          "on-secondary": "#481867",
          tertiary: "#D3C0DD",
          "tertiary-container": "#9C8AA6",
          "on-surface": "#EDDCFF",
          "on-surface-variant": "#D0C2D0",
        },
        lilac: "#DCC8E6",    // eyebrow labels, captions, meta
        bright: "#C08BE0",   // links, icons, highlights
        lavender: "#EBDFF5", // body text (never pure white)
        chalk: "#F6EFFA",    // heading text
        dusk: "#B79ACF",     // muted / secondary text
        cream: "#FFFDFB", // warm white
        ink: "#29252C", // charcoal text
        mist: "#6F6675", // muted text
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.9rem, 3.6vw, 3rem)", { lineHeight: "1.08" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.15" }],
        // Stitch / Material-3 type scale
        "m3-display": ["4.5rem", { lineHeight: "4.75rem", letterSpacing: "-0.015em" }],
        "m3-display-stat": ["5.5rem", { lineHeight: "5.5rem", letterSpacing: "-0.02em" }],
        "m3-display-mobile": ["2.75rem", { lineHeight: "3.125rem", letterSpacing: "-0.01em" }],
        "m3-headline-lg": ["3.25rem", { lineHeight: "3.625rem", letterSpacing: "0.01em" }],
        "m3-headline-md": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "0.02em" }],
        "m3-headline-sm": ["1.625rem", { lineHeight: "2.125rem", letterSpacing: "0.02em" }],
        "m3-body-lg": ["1.125rem", { lineHeight: "1.9rem", letterSpacing: "0.01em" }],
        "m3-body-md": ["1rem", { lineHeight: "1.7rem", letterSpacing: "0.01em" }],
        "m3-body-sm": ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0.015em" }],
        "m3-label": ["0.8125rem", { lineHeight: "1rem", letterSpacing: "0.15em" }],
        "m3-eyebrow": ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.25em" }],
      },
      letterSpacing: {
        wider2: "0.22em",
        wide2: "0.14em",
      },
      maxWidth: {
        page: "80rem",
        prose2: "42rem",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bloom: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        rise: "rise 1s cubic-bezier(0.22, 1, 0.36, 1) both",
        bloom: "bloom 1.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        drift: "drift 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

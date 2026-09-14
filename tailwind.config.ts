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

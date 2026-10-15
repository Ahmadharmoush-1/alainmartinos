import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./src/lib/image-sizes.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  images: {
    // The static export has no image server, so responsive copies are built
    // ahead of time by scripts/optimize-images.mjs (run before every build)
    // and this loader points each srcset width at the right one.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes,
    imageSizes,
    // YouTube thumbnails for the lazy "Beauty in Motion" facade.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Multilingual roadmap: when German / Arabic content is ready, switch to
  // locale-prefixed routes (`/de`, `/ar`) via a `[locale]` app segment and
  // middleware. All copy already lives in `src/content/<locale>.ts` so no
  // component needs to change — only the routing layer.
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve modern formats automatically (AVIF first, WebP fallback).
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    // YouTube thumbnails for the lazy "Beauty in Motion" facade.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Multilingual roadmap: when German / Arabic content is ready, switch to
  // locale-prefixed routes (`/de`, `/ar`) via a `[locale]` app segment and
  // middleware. All copy already lives in `src/content/<locale>.ts` so no
  // component needs to change — only the routing layer.
};

export default nextConfig;

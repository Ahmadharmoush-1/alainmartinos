import { imageUrl } from "./media";

/**
 * next/image loader for the static export: points every srcset width at the
 * matching pre-built copy from scripts/optimize-images.mjs (or the original).
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  return imageUrl(src, width);
}

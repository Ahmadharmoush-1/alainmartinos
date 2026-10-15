/**
 * Lookup for the responsive image copies made at build time by
 * scripts/optimize-images.mjs (see that file for how they are produced).
 *
 * Every helper falls back to the original path when an image has no entry
 * (for example a photo added while `next dev` is already running), so a
 * missing copy can never break an image.
 */
import manifestJson from "./media-manifest.json";
import imageSizes from "./image-sizes.json";

type Entry = {
  /** Content hash in the copies' file names. */
  h: string;
  /** Intrinsic width / height of the original. */
  w: number;
  ht: number;
  /** Copies exist only below this width; above it the original is lighter. */
  c?: number;
  /** A full-size copy exists (lossless copy of a PNG, or a video poster). */
  f?: 1;
};

const hasCopy = (entry: Entry, w: number) => w < entry.w && (!entry.c || w < entry.c);

const manifest = manifestJson as Record<string, Entry>;

export const IMAGE_WIDTHS: readonly number[] = [
  ...new Set([...imageSizes.imageSizes, ...imageSizes.deviceSizes]),
].sort((a, b) => a - b);

function lookup(src: string) {
  const path = src.split(/[?#]/)[0];
  return { path, entry: manifest[path] as Entry | undefined };
}

const copyUrl = (path: string, entry: Entry, size: number | "full") =>
  `/optimized${path.replace(/\.[^./]+$/, "")}.${entry.h}.${size}.webp`;

/** The best file for an image drawn `width` device pixels wide. */
export function imageUrl(src: string, width: number): string {
  const { path, entry } = lookup(src);
  if (!entry) return src;

  const size = IMAGE_WIDTHS.find((w) => w >= width && hasCopy(entry, w));
  if (size) return copyUrl(path, entry, size);
  return entry.f ? copyUrl(path, entry, "full") : src;
}

/** The image at its full original resolution (a lossless copy when smaller). */
export function fullSizeImageUrl(src: string): string {
  const { path, entry } = lookup(src);
  return entry?.f ? copyUrl(path, entry, "full") : src;
}

/** `src` + `srcSet` for a plain <img> / <source>; pair it with `sizes`. */
export function responsiveImage(src: string): { src: string; srcSet?: string } {
  const { path, entry } = lookup(src);
  if (!entry) return { src };

  const candidates = IMAGE_WIDTHS.filter((w) => hasCopy(entry, w)).map(
    (w) => `${copyUrl(path, entry, w)} ${w}w`,
  );
  const full = fullSizeImageUrl(src);
  candidates.push(`${full} ${entry.w}w`);

  return { src: full, srcSet: candidates.join(", ") };
}

/**
 * `sizes` for an image drawn with `object-fit: cover` in a box of the given
 * aspect ratio (width / height). When the image is wider than its box, cover
 * draws it wider than the box, so every width in `sizes` is scaled by that
 * factor — otherwise the browser would pick a copy smaller than it draws.
 */
export function coverSizes(src: string, boxRatio: number, sizes: string): string {
  const { entry } = lookup(src);
  if (!entry) return sizes;
  const factor = entry.w / entry.ht / boxRatio;
  if (factor <= 1) return sizes;

  return sizes
    .split(",")
    .map((part) => {
      const m = part.trim().match(/^((?:\([^)]*\)\s*(?:and\s*)?)+)?(.+)$/);
      if (!m) return part;
      return `${m[1] ?? ""}calc(${m[2].trim()} * ${factor.toFixed(3)})`;
    })
    .join(", ");
}

/**
 * Poster for a file in /public/videos, made from a frame of that video by
 * scripts/generate-video-posters.mjs. Undefined when none was generated.
 */
export function videoPoster(videoSrc: string) {
  const name = videoSrc.split(/[?#]/)[0].split("/").pop()?.replace(/\.[^.]+$/, "");
  if (!name || !manifest[`/posters/${name}.jpg`]) return undefined;
  return { ...responsiveImage(`/posters/${name}.jpg`), key: `/posters/${name}.jpg` };
}

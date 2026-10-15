/**
 * Build-time responsive images for the static export.
 *
 * `output: "export"` has no image server, so this script does ahead of time
 * what Next's optimizer would do on request. Original files in public/ are
 * never modified — the browser simply gets an appropriately sized copy.
 *
 *  - Smaller sizes (every Next srcset width below the original's width) are
 *    WebP at quality 95 with sharp chroma. Each one is compared with the
 *    original resized to the same width; anything below SSIM 0.98 or
 *    PSNR 40 dB (smooth gradients, flat artwork) is re-encoded lossless.
 *    Sizes under 256px, and images with transparency, are always lossless.
 *  - At full size, JPEG originals are served untouched. PNG originals (several
 *    files here are PNGs with a .jpg/.webp name) get a WebP copy through the
 *    same gate — lossless (pixel-identical) whenever the lossy one would not
 *    be visually identical, or always with FULL_SIZE_LOSSLESS — used only
 *    when it really is smaller.
 *  - Video posters (media-src/video-posters, made by generate-video-posters)
 *    are frames of the already-compressed videos and get the same treatment
 *    at every size, including full size.
 *
 * Output: public/optimized/** with a content hash in each name (safe to cache
 * forever) and src/lib/media-manifest.json, read by src/lib/media.ts.
 * Unchanged images are skipped, so re-runs take a moment. Runs before every
 * build and dev start; `node scripts/verify-images.mjs` re-checks everything.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { compareRgba, passes } from "./image-metrics.mjs";

const root = path.resolve(import.meta.dirname, "..");
const outRoot = path.join(root, "public", "optimized");
const manifestPath = path.join(root, "src", "lib", "media-manifest.json");
const { deviceSizes, imageSizes } = JSON.parse(
  fs.readFileSync(path.join(root, "src", "lib", "image-sizes.json"), "utf8"),
);
const widths = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

const LOSSY = { quality: 95, smartSubsample: true, effort: 5 };
const LOSSLESS = { lossless: true, exact: true, effort: 5 };
/** Thumbnail sizes are tiny either way, so they are simply lossless. */
const LOSSLESS_BELOW = 256;
/**
 * Full-size copies of PNG originals: when false they go through the same
 * quality gate as every other copy (so smooth artwork such as the page
 * background can be served at a fraction of the size, still visually
 * identical); when true they are always pixel-identical lossless copies.
 */
const FULL_SIZE_LOSSLESS = false;
/** Bump when the settings above change, so every copy is re-encoded. */
const SETTINGS = `q95-ll256-exact-gate-full${FULL_SIZE_LOSSLESS ? "ll" : "gated"}`;

/** [source dir, URL prefix used in the code, output sub-folder, kind] */
const groups = [
  [path.join(root, "public", "images"), "/images", "images", "photo"],
  [path.join(root, "public", "brand"), "/brand", "brand", "photo"],
  [path.join(root, "media-src", "video-posters"), "/posters", "posters", "poster"],
];

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
      )
    : [];

const manifest = {};
/** Last run's manifest: remembers which copies were not worth keeping. */
const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const keep = new Set();
let written = 0;
let gated = 0;

const pipeline = (input, width) => {
  const img = sharp(input).rotate().keepIccProfile();
  return width ? img.resize({ width, kernel: "lanczos3" }) : img;
};

const rgba = (img) => img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

/** Encodes one copy, falling back to lossless if the lossy one is not faithful. */
async function encode(input, file, width, lossless) {
  keep.add(file);
  if (fs.existsSync(file)) return fs.statSync(file).size;

  let buffer = await pipeline(input, width).webp(lossless ? LOSSLESS : LOSSY).toBuffer();
  if (!lossless) {
    const reference = await rgba(pipeline(input, width));
    const encoded = await rgba(sharp(buffer));
    const result = compareRgba(reference.data, encoded.data, reference.info.width, reference.info.height);
    if (!passes(result)) {
      buffer = await pipeline(input, width).webp(LOSSLESS).toBuffer();
      gated += 1;
    }
  }

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buffer);
  written += 1;
  return buffer.length;
}

async function processImage(file, srcDir, urlPrefix, outSub, kind) {
  const rel = path.relative(srcDir, file).split(path.sep).join("/");
  const url = `${urlPrefix}/${rel}`;
  const input = fs.readFileSync(file);
  const hash = createHash("sha1").update(SETTINGS).update(input).digest("hex").slice(0, 8);
  const meta = await sharp(input).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const width = swap ? meta.height : meta.width;
  const height = swap ? meta.width : meta.height;

  const losslessSource = meta.format === "png" || meta.format === "gif";
  const base = path.join(outRoot, outSub, `${rel.replace(/\.[^.]+$/, "")}.${hash}`);

  // A copy is only worth serving while it is lighter than the original file
  // (well-compressed JPEGs can be smaller than a faithful copy). File size
  // grows with width, so from the first copy that is not lighter onwards the
  // original is used instead — recorded as `c` in the manifest.
  const known = previous[url]?.h === hash ? previous[url] : undefined;
  let cap = known?.c;
  for (const w of widths.filter((w) => w < width && (!cap || w < cap))) {
    const file = `${base}.${w}.webp`;
    const size = await encode(input, file, w, meta.hasAlpha || w < LOSSLESS_BELOW);
    if (kind !== "poster" && size >= input.length) {
      fs.rmSync(file, { force: true });
      keep.delete(file);
      cap = w;
      break;
    }
  }

  // Full size: lossless copy for lossless originals, gated lossy copy for
  // posters, otherwise the original file itself.
  let full = false;
  if (kind === "poster") {
    await encode(input, `${base}.full.webp`, null, false);
    full = true;
  } else if (losslessSource && !(known && !known.f)) {
    const size = await encode(input, `${base}.full.webp`, null, FULL_SIZE_LOSSLESS || meta.hasAlpha);
    full = size < input.length;
    if (!full) {
      fs.rmSync(`${base}.full.webp`, { force: true });
      keep.delete(`${base}.full.webp`);
    }
  }

  manifest[url] = { h: hash, w: width, ht: height, ...(cap ? { c: cap } : {}), ...(full ? { f: 1 } : {}) };
}

const jobs = [];
for (const [dir, prefix, sub, kind] of groups) {
  for (const file of walk(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
    jobs.push(() => processImage(file, dir, prefix, sub, kind));
  }
}

// A few images at a time; libvips already threads each one.
const queue = [...jobs];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) await queue.shift()();
  }),
);

// Drop copies of images that were removed or replaced.
let pruned = 0;
for (const file of walk(outRoot)) {
  if (!keep.has(file)) {
    fs.rmSync(file);
    pruned += 1;
  }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
const json = JSON.stringify(sorted, null, 1) + "\n";
if (!fs.existsSync(manifestPath) || fs.readFileSync(manifestPath, "utf8") !== json) {
  fs.writeFileSync(manifestPath, json);
}

console.log(
  `optimize-images: ${Object.keys(manifest).length} images, ${written} files written` +
    `${gated ? ` (${gated} kept lossless by the quality gate)` : ""}, ${pruned} stale removed`,
);

/**
 * Re-checks every file made by optimize-images.mjs against its original.
 *
 *  - Every copy is compared with the original at the same width (what the
 *    browser would otherwise draw on screen): it must be pixel-identical or
 *    clear the same gate the pipeline uses (SSIM 0.98 on luma, PSNR 40 dB).
 *
 *   node scripts/verify-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { compareRgba, passes, QUALITY_GATE } from "./image-metrics.mjs";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "src", "lib", "media-manifest.json"), "utf8"));

const sourceFor = (url) =>
  url.startsWith("/posters/")
    ? path.join(root, "media-src", "video-posters", url.slice("/posters/".length))
    : path.join(root, "public", url);

const rgba = (img) => img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

let failures = 0;
let checked = 0;
let identical = 0;
let worst = { ssim: 1, psnr: Infinity };

for (const [url, entry] of Object.entries(manifest)) {
  const original = sharp(sourceFor(url)).rotate();
  const base = path.join(root, "public", "optimized", url.replace(/\.[^.]+$/, `.${entry.h}`));
  const dir = path.dirname(base);
  const prefix = path.basename(base) + ".";
  const copies = fs.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith(".webp"));

  for (const file of copies) {
    const b = await rgba(sharp(path.join(dir, file)));
    const full = file.endsWith(".full.webp");
    const a = await rgba(full ? original.clone() : original.clone().resize({ width: b.info.width, kernel: "lanczos3" }));
    const r = compareRgba(a.data, b.data, b.info.width, b.info.height);
    checked += 1;

    if (r.maxDiff === 0) identical += 1;
    const ok = r.maxDiff === 0 || passes(r);
    if (!ok) {
      failures += 1;
      console.log(`FAIL ${file} SSIM ${r.ssim.toFixed(4)} PSNR ${r.psnr.toFixed(1)} dB max diff ${r.maxDiff}`);
    }
    if (r.ssim < worst.ssim) worst = { ...r, file };
  }
}

console.log(
  `${checked} copies checked, ${identical} pixel-identical; ` +
    `${failures ? `${failures} FAILED` : `all pass the gate (SSIM ≥ ${QUALITY_GATE.ssim}, PSNR ≥ ${QUALITY_GATE.psnr} dB)`}. ` +
    `Lowest SSIM ${worst.ssim.toFixed(4)} (PSNR ${worst.psnr.toFixed(1)} dB) in ${worst.file}`,
);
process.exit(failures ? 1 : 0);

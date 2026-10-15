/**
 * Extracts one still frame from every video in public/videos and saves it as
 * a high-quality poster master in media-src/video-posters/<video-name>.jpg.
 *
 * The videos themselves are only read, never rewritten. Run this once after
 * adding or replacing a video (it needs ffmpeg, so it is not part of the
 * Netlify build — commit the generated posters):
 *
 *   node scripts/generate-video-posters.mjs [path/to/ffmpeg]
 *
 * Frame choice: by default the frame at 0.1s — the exact moment the player
 * starts from (see VideoShort's `#t=0.1`), so the poster hands over to the
 * playing video without a visible jump. If that frame is near-black or flat
 * (a fade-in or title card), the first clearly lit, detailed frame after it is
 * used instead. POSTER_TIME below pins a specific moment for any video.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const ffmpeg = process.argv[2] || process.env.FFMPEG || "ffmpeg";
const root = path.resolve(import.meta.dirname, "..");
const videosDir = path.join(root, "public", "videos");
const outDir = path.join(root, "media-src", "video-posters");

/**
 * Optional per-video override, in seconds. These three open on an empty
 * floor or a motion-blurred close-up, so a clearer moment represents them.
 */
const POSTER_TIME = {
  "alain-video-3": 6,
  "alain-video-8": 6,
  "alain-video-9": 8,
};

const CANDIDATE_TIMES = [0.1, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8];

fs.mkdirSync(outDir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "posters-"));

async function frameStats(file) {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  let sum = 0;
  let sumSq = 0;
  for (const v of data) {
    sum += v;
    sumSq += v * v;
  }
  const n = data.length;
  const mean = sum / n;
  const stdev = Math.sqrt(sumSq / n - mean * mean);

  // Laplacian energy as a cheap focus measure (higher = sharper).
  let lap = 0;
  const w = info.width;
  for (let y = 1; y < info.height - 1; y += 2) {
    for (let x = 1; x < w - 1; x += 2) {
      const i = y * w + x;
      const l = 4 * data[i] - data[i - 1] - data[i + 1] - data[i - w] - data[i + w];
      lap += l * l;
    }
  }
  return { mean, stdev, sharpness: lap / ((info.width / 2) * (info.height / 2)) };
}

const grab = (video, t, out) =>
  execFileSync(ffmpeg, ["-v", "error", "-y", "-ss", String(t), "-i", video, "-frames:v", "1", out]);

const usable = (s) => s.mean > 32 && s.stdev > 18;

for (const name of fs.readdirSync(videosDir).filter((f) => f.endsWith(".mp4")).sort()) {
  const video = path.join(videosDir, name);
  const base = name.replace(/\.mp4$/, "");
  const times = POSTER_TIME[base] != null ? [POSTER_TIME[base]] : CANDIDATE_TIMES;

  let chosen = null;
  for (const t of times) {
    const frame = path.join(tmp, `${base}-${t}.png`);
    grab(video, t, frame);
    const stats = await frameStats(frame);
    if (!chosen) chosen = { t, frame, stats }; // fallback: first candidate
    if (POSTER_TIME[base] != null || usable(stats)) {
      chosen = { t, frame, stats };
      break;
    }
  }

  // 4:4:4 chroma and q95 keep the master visually identical to the decoded
  // frame; the image pipeline derives the served sizes from it.
  await sharp(chosen.frame)
    .jpeg({ quality: 95, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(path.join(outDir, `${base}.jpg`));

  console.log(
    `${name}: t=${chosen.t}s mean=${chosen.stats.mean.toFixed(0)} stdev=${chosen.stats.stdev.toFixed(0)} sharp=${chosen.stats.sharpness.toFixed(0)}`,
  );
}

fs.rmSync(tmp, { recursive: true, force: true });

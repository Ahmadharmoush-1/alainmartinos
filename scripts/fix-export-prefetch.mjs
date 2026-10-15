/**
 * Next 16's static export writes route segment data in folders, e.g.
 *   out/services/__next.services/__PAGE__.txt
 * while the client router prefetches the flattened name
 *   /services/__next.services.__PAGE__.txt
 * On a plain static host that request 404s (and downloads the 404 page) for
 * every link on screen, and the prefetch is lost. This copies each segment
 * file to the flattened name as well. Runs after every build.
 */
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "..", "out");

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );

let copied = 0;
for (const file of walk(out)) {
  const rel = path.relative(out, file).split(path.sep);
  const i = rel.findIndex((part) => part.startsWith("__next."));
  if (i === -1 || i === rel.length - 1 || !file.endsWith(".txt")) continue;

  const flat = path.join(out, ...rel.slice(0, i), rel.slice(i).join("."));
  if (!fs.existsSync(flat)) {
    fs.copyFileSync(file, flat);
    copied += 1;
  }
}

console.log(`fix-export-prefetch: ${copied} segment files made reachable`);

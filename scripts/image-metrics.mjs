/**
 * Image similarity for the image pipeline's quality gate.
 * Inputs are raw RGBA buffers of equal size. Transparent pixels are composited
 * over the site's dark purple first, so they are compared as they are seen.
 */
const BG = [26, 11, 46];

export const QUALITY_GATE = { ssim: 0.98, psnr: 40 };

export function compareRgba(a, b, width, height) {
  const n = width * height;
  let se = 0;
  let maxDiff = 0;
  const lumaA = new Float64Array(n);
  const lumaB = new Float64Array(n);

  for (let i = 0; i < n; i += 1) {
    const aa = a[i * 4 + 3] / 255;
    const ab = b[i * 4 + 3] / 255;
    let ya = 0;
    let yb = 0;
    for (let c = 0; c < 3; c += 1) {
      const va = a[i * 4 + c] * aa + BG[c] * (1 - aa);
      const vb = b[i * 4 + c] * ab + BG[c] * (1 - ab);
      se += (va - vb) ** 2;
      maxDiff = Math.max(maxDiff, Math.abs(a[i * 4 + c] - b[i * 4 + c]), Math.abs(a[i * 4 + 3] - b[i * 4 + 3]));
      const k = c === 0 ? 0.299 : c === 1 ? 0.587 : 0.114;
      ya += k * va;
      yb += k * vb;
    }
    lumaA[i] = ya;
    lumaB[i] = yb;
  }

  const mse = se / (n * 3);
  const psnr = mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse);

  // Mean SSIM over 8x8 windows of luma.
  const C1 = (0.01 * 255) ** 2;
  const C2 = (0.03 * 255) ** 2;
  let total = 0;
  let windows = 0;
  for (let y = 0; y + 8 <= height; y += 8) {
    for (let x = 0; x + 8 <= width; x += 8) {
      let ma = 0;
      let mb = 0;
      for (let j = 0; j < 8; j += 1) {
        for (let i = 0; i < 8; i += 1) {
          ma += lumaA[(y + j) * width + x + i];
          mb += lumaB[(y + j) * width + x + i];
        }
      }
      ma /= 64;
      mb /= 64;
      let va = 0;
      let vb = 0;
      let cov = 0;
      for (let j = 0; j < 8; j += 1) {
        for (let i = 0; i < 8; i += 1) {
          const da = lumaA[(y + j) * width + x + i] - ma;
          const db = lumaB[(y + j) * width + x + i] - mb;
          va += da * da;
          vb += db * db;
          cov += da * db;
        }
      }
      va /= 63;
      vb /= 63;
      cov /= 63;
      total += ((2 * ma * mb + C1) * (2 * cov + C2)) / ((ma * ma + mb * mb + C1) * (va + vb + C2));
      windows += 1;
    }
  }

  return { psnr, ssim: windows ? total / windows : 1, maxDiff };
}

export const passes = (r) => r.ssim >= QUALITY_GATE.ssim && r.psnr >= QUALITY_GATE.psnr;

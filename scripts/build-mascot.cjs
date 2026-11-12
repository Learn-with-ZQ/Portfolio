// Builds the corner mascot sheets from characters/<name>/{directions,reactions}.png
// (drawn on flat green, 3x3 each): keys out the green, aligns all 18 cells on the
// shoulders so the body never jumps between sheets, writes 600px webp sheets.
// Usage: node scripts/build-mascot.cjs characters/zaid public/mascots zaid
const sharp = require("sharp");
const C = 200; // output cell size (96px CSS at 2x)

async function keyed(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  // Background colour: median of the four corner patches.
  const samples = [];
  for (const [x0, y0] of [[2, 2], [w - 12, 2], [2, h - 12], [w - 12, h - 12]])
    for (let y = y0; y < y0 + 10; y++) for (let x = x0; x < x0 + 10; x++) { const i = (y * w + x) * 3; samples.push([data[i], data[i + 1], data[i + 2]]); }
  const med = (k) => samples.map((s) => s[k]).sort((a, b) => a - b)[samples.length >> 1];
  const B = [med(0), med(1), med(2)];
  const spillB = B[1] - Math.max(B[0], B[2]);
  const out = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    const spill = g - Math.max(r, b);
    let a = spill <= 0 ? 1 : 1 - spill / spillB;
    a = a < 0.06 ? 0 : a > 0.96 ? 1 : a;
    let R = r, G = g, Bl = b;
    if (a > 0 && a < 1) { // un-mix the green from edge pixels
      R = (r - (1 - a) * B[0]) / a; G = (g - (1 - a) * B[1]) / a; Bl = (b - (1 - a) * B[2]) / a;
    }
    if (G > Math.max(R, Bl)) G = Math.max(R, Bl); // despill
    out[p * 4] = Math.max(0, Math.min(255, Math.round(R)));
    out[p * 4 + 1] = Math.max(0, Math.min(255, Math.round(G)));
    out[p * 4 + 2] = Math.max(0, Math.min(255, Math.round(Bl)));
    out[p * 4 + 3] = Math.round(a * 255);
  }
  return { rgba: out, w, h, bg: B };
}

function measure(sheet, col, row) {
  const cs = sheet.w / 3, x0 = Math.round(col * cs), y0 = Math.round(row * cs), n = Math.round(cs);
  const A = (x, y) => sheet.rgba[((y0 + y) * sheet.w + (x0 + x)) * 4 + 3];
  let bottom = -1, top = n;
  for (let y = 0; y < n; y++) { let c = 0; for (let x = 0; x < n; x++) if (A(x, y) > 128) c++; if (c > 20) { bottom = y; if (y < top) top = y; } }
  const line = bottom - 6; // a few rows above the flat cut
  let l = n, r = -1;
  for (let x = 0; x < n; x++) if (A(x, line) > 128) { if (x < l) l = x; if (x > r) r = x; }
  return { x0, y0, n, bottom, top, left: l, right: r, width: r - l + 1, cx: (l + r) / 2 };
}

async function main() {
  const [srcDir, outDir, name] = process.argv.slice(2);
  const sheets = {};
  for (const kind of ["directions", "reactions"]) sheets[kind] = await keyed(`${srcDir}/${kind}.png`);
  const cells = [];
  for (const kind of ["directions", "reactions"]) for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) cells.push({ kind, row, col, m: measure(sheets[kind], col, row) });
  const widths = cells.map((c) => c.m.width).sort((a, b) => a - b);
  const targetW = widths[widths.length >> 1];
  const n = cells[0].m.n;
  const baseRatio = cells.map((c) => c.m.bottom / n).sort((a, b) => a - b)[cells.length >> 1];
  const targetBottom = baseRatio * C;
  console.log("bg", sheets.directions.bg.join(","), "/", sheets.reactions.bg.join(","), "| shoulder width median", targetW, "| baseline", (baseRatio * 100).toFixed(1) + "%");
  for (const kind of ["directions", "reactions"]) {
    const sheet = sheets[kind];
    const tiles = [];
    for (const c of cells.filter((c) => c.kind === kind)) {
      const { m } = c;
      // Isolate the cell (with a transparent margin) so neighbours can't bleed in.
      const pad = 80;
      const cellBuf = await sharp(sheet.rgba, { raw: { width: sheet.w, height: sheet.h, channels: 4 } })
        .extract({ left: m.x0, top: m.y0, width: m.n, height: m.n })
        .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .raw().toBuffer();
      const k = (C / n) * (targetW / m.width); // output px per source px
      const srcSize = Math.round(C / k);
      const sx = Math.round(pad + m.cx - (C / 2) / k), sy = Math.round(pad + m.bottom - targetBottom / k);
      const tile = await sharp(cellBuf, { raw: { width: m.n + 2 * pad, height: m.n + 2 * pad, channels: 4 } })
        .extract({ left: Math.max(0, sx), top: Math.max(0, sy), width: Math.min(srcSize, m.n + 2 * pad - Math.max(0, sx)), height: Math.min(srcSize, m.n + 2 * pad - Math.max(0, sy)) })
        .resize(C, C, { kernel: "lanczos3", fit: "fill" }).png().toBuffer();
      tiles.push({ input: tile, left: c.col * C, top: c.row * C });
      console.log(kind.padEnd(10), `r${c.row}c${c.col}`, "shoulders", m.width + "px", "centre", m.cx.toFixed(1), "bottom", m.bottom, "top", m.top, "scale", (targetW / m.width).toFixed(3));
    }
    await sharp({ create: { width: 3 * C, height: 3 * C, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite(tiles).webp({ quality: 84, alphaQuality: 95, effort: 6 }).toFile(`${outDir}/${name}-${kind}.webp`);
  }
  console.log("written");
}

// scripts/build-favicon.cjs reuses the keying.
module.exports = { keyed };
if (require.main === module) main();

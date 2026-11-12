// Builds the site icons from the mascot's front-facing cell in
// characters/<name>/directions.png: Zaid's cartoon head on the brand blue.
//   src/app/favicon.ico    16/32/48, round (browser tabs, bookmarks)
//   src/app/icon.png       192, round (Android, search results)
//   src/app/apple-icon.png 180, square (iOS rounds the corners itself)
// Usage: node scripts/build-favicon.cjs characters/zaid
const fs = require("node:fs");
const sharp = require("sharp");
const { keyed } = require("./build-mascot.cjs");

const BLUE = "#1D4ED8"; // --primary (light)
const BIG = 512;

const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${BIG}" height="${BIG}">${body}</svg>`);
const circle = (fill) => svg(`<circle cx="${BIG / 2}" cy="${BIG / 2}" r="${BIG / 2}" fill="${fill}"/>`);

/** Square crop of the head, hair to neck, from the centre cell. */
async function head(srcDir) {
  const sheet = await keyed(`${srcDir}/directions.png`);
  const n = Math.round(sheet.w / 3);
  const A = (x, y) => sheet.rgba[((n + y) * sheet.w + (n + x)) * 4 + 3];
  let top = -1;
  let widest = 0;
  let cx = n / 2;
  for (let y = 0; y < n; y++) {
    let l = n;
    let r = -1;
    for (let x = 0; x < n; x++) if (A(x, y) > 128) { if (x < l) l = x; if (x > r) r = x; }
    if (r < 0) continue;
    if (top < 0) top = y;
    // The hair and ears are the widest part of the head, in its top half.
    if (y < top + n * 0.5 && r - l > widest) { widest = r - l; cx = (l + r) / 2; }
  }
  const side = Math.round(widest * 1.12);
  return sharp(sheet.rgba, { raw: { width: sheet.w, height: sheet.h, channels: 4 } })
    .extract({ left: Math.round(n + cx - side / 2), top: Math.round(n + top - side * 0.03), width: side, height: side })
    .png()
    .toBuffer();
}

/** The head on a background, at BIG px; the neck runs off the bottom edge. */
async function compose(face, { round, scale }) {
  const size = Math.round(BIG * scale);
  const resized = await sharp(face).resize(size, size, { kernel: "lanczos3" }).png().toBuffer();
  const background = round ? circle(BLUE) : svg(`<rect width="${BIG}" height="${BIG}" fill="${BLUE}"/>`);
  const flat = await sharp({ create: { width: BIG, height: BIG, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: background }, { input: resized, left: Math.round((BIG - size) / 2), top: BIG - size }])
    .png()
    .toBuffer();
  // Clip to the circle so the hair doesn't stick out past it.
  return round ? sharp(flat).composite([{ input: circle("#fff"), blend: "dest-in" }]).png().toBuffer() : flat;
}

// Palette PNGs: a quarter of the size, no visible change on flat cartoon colours.
const at = (big, px) =>
  sharp(big).resize(px, px, { kernel: "lanczos3" }).png({ palette: true, quality: 95, effort: 10 }).toBuffer();

/** An .ico holding PNG images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ px, png }, i) => {
    const e = 6 + 16 * i;
    header[e] = px >= 256 ? 0 : px;
    header[e + 1] = px >= 256 ? 0 : px;
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(png.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.png)]);
}

(async () => {
  const [srcDir] = process.argv.slice(2);
  const face = await head(srcDir);
  const round = await compose(face, { round: true, scale: 0.92 });
  const square = await compose(face, { round: false, scale: 0.86 });

  // Largest first: Next.js reads the first entry for the <link sizes> it writes.
  const sizes = [48, 32, 16];
  const images = await Promise.all(sizes.map(async (px) => ({ px, png: await at(round, px) })));
  fs.writeFileSync("src/app/favicon.ico", ico(images));
  fs.writeFileSync("src/app/icon.png", await at(round, 192));
  fs.writeFileSync("src/app/apple-icon.png", await at(square, 180));
  console.log("written: src/app/favicon.ico, icon.png, apple-icon.png");
})();

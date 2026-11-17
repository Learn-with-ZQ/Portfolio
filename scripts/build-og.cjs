// Builds the link-preview image (Open Graph / Twitter), 1200×630:
//   public/og-image.png
// The old preview was the 960×1280 portrait, which LinkedIn, WhatsApp and X
// crop to a 1.91:1 strip through the middle of the face (audit U23).
// Dark band colours from globals.css; the four-stage chain is the Net 2 Bank
// diagram, the site's signature. Rebuild after a name/role change:
//   node scripts/build-og.cjs
const sharp = require("sharp");

const W = 1200;
const H = 630;
const OBSIDIAN = "#0B1B33"; // navy band
const SLATE = "#13284A";
const INK = "#F1F3F6";
const MUTED = "#A9B4C4";
const CYAN = "#E8C35A"; // gold (was cyan)
const RULE = "#6E7D93";
const FONT = "Archivo, 'Segoe UI', Arial, sans-serif";

// Text content mirrors src/data/profile.ts (name, role, company, location).
// Two lines, so the name clears the portrait on the right.
const nameLines = ["Muhammad Zaid", "Qasim"];
const role = "Software Developer at E-Creatorz, Karachi";
const line = "Banking, ERP and campus systems in .NET and SQL Server";
const url = "muhammadzaidqasim.vercel.app";

const stages = ["Maker", "Checker", "Signatory", "Releasor"];
const chain = stages
  .map((label, i) => {
    const x = 72 + i * 170;
    const done = i < 3;
    const node = `<rect x="${x}" y="416" width="140" height="56" rx="8" fill="${SLATE}" stroke="${done ? CYAN : RULE}" stroke-width="2" ${done ? "" : 'stroke-dasharray="6 6"'}/>
      <text x="${x + 70}" y="451" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="600" fill="${done ? INK : MUTED}">${label}</text>`;
    const link = i < 3 ? `<line x1="${x + 140}" y1="444" x2="${x + 170}" y2="444" stroke="${i < 2 ? CYAN : RULE}" stroke-width="2"/>` : "";
    return node + link;
  })
  .join("");

const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${OBSIDIAN}"/>
  <text font-family="${FONT}" font-size="80" font-weight="700" fill="${INK}" letter-spacing="-1.5">
    <tspan x="72" y="150">${nameLines[0]}</tspan>
    <tspan x="72" y="236">${nameLines[1]}</tspan>
  </text>
  <text x="72" y="300" font-family="${FONT}" font-size="34" font-weight="600" fill="${INK}">${role}</text>
  <text x="72" y="346" font-family="${FONT}" font-size="28" fill="${MUTED}">${line}</text>
  ${chain}
  <line x1="72" y1="534" x2="${W - 72}" y2="534" stroke="${RULE}" stroke-opacity="0.5" stroke-width="1"/>
  <text x="72" y="578" font-family="${FONT}" font-size="26" font-weight="600" fill="${CYAN}">${url}</text>
</svg>`);

async function main() {
  // The portrait, in full colour as on the site, in a rounded frame on the right.
  const PW = 260;
  const PH = 320;
  const mask = Buffer.from(`<svg width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" rx="14" fill="#fff"/></svg>`);
  const portrait = await sharp("public/images/profile.jpg")
    .resize(PW, PH, { fit: "cover", position: "top" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(card)
    .composite([{ input: portrait, left: W - 72 - PW, top: 72 }])
    .png({ compressionLevel: 9 })
    .toFile("public/og-image.png");
  console.log("wrote public/og-image.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

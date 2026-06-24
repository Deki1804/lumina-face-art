import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const master = path.join(root, "public", "images", "favicon-master.png");
const appDir = path.join(root, "app");

const CREAM = "#faf6f0";
const FOREST = "#3d5a3e";
const GOLD = "#c9a84c";

/** Pure L monogram — no vine, star, heart or logo text. Survives 16×16. */
function lMonogramSvg(size, { goldRing = false, lScale = 0.78 } = {}) {
  const fontSize = (100 * lScale * 0.95).toFixed(2);
  const baselineY = (50 + fontSize * 0.34).toFixed(2);
  const ring =
    goldRing && size >= 48
      ? `<circle cx="50" cy="50" r="44" fill="none" stroke="${GOLD}" stroke-width="1.6"/>`
      : "";

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${CREAM}"/>
  ${ring}
  <text
    x="50"
    y="${baselineY}"
    font-family="Georgia, 'Times New Roman', 'Palatino Linotype', Palatino, serif"
    font-size="${fontSize}"
    font-weight="700"
    fill="${FOREST}"
    text-anchor="middle"
  >L</text>
</svg>`);
}

async function renderIcon(size, opts = {}) {
  let pipeline = sharp(lMonogramSvg(size, opts)).resize(size, size, {
    kernel: sharp.kernel.lanczos3,
  });

  if (size <= 48) {
    pipeline = pipeline.sharpen({ sigma: 0.35, m1: 0.5, m2: 0.15 });
  }

  return pipeline.png().toBuffer();
}

/** Master asset — big L + thin gold ring (for previews / larger contexts) */
const master512 = await renderIcon(512, { goldRing: true, lScale: 0.72 });
writeFileSync(master, master512);

/** Browser tab — L only, no ring, maximum legibility */
const icon16 = await renderIcon(16, { goldRing: false, lScale: 0.84 });
const icon32 = await renderIcon(32, { goldRing: false, lScale: 0.82 });
const icon48 = await renderIcon(48, { goldRing: false, lScale: 0.8 });

const icon512 = master512;
const icon180 = await renderIcon(180, { goldRing: true, lScale: 0.74 });

writeFileSync(path.join(appDir, "icon.png"), icon512);
writeFileSync(path.join(appDir, "apple-icon.png"), icon180);
writeFileSync(
  path.join(appDir, "favicon.ico"),
  await toIco([icon16, icon32, icon48])
);

console.log("✓ Generated simple L favicons → public/images/favicon-master.png");
console.log("  app/favicon.ico (16, 32, 48) — L only");
console.log("  app/icon.png (512), app/apple-icon.png (180)");

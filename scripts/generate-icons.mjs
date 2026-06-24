import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const monogramSource = path.join(root, "public", "images", "card-back.png");
const appDir = path.join(root, "app");

/** Circular "L" monogram from business card back — readable at 16px */
async function monogramCrop(size) {
  const meta = await sharp(monogramSource).metadata();
  const w = meta.width ?? 1559;
  const h = meta.height ?? 1009;

  const cropSize = Math.round(w * 0.17);
  const left = Math.round(w / 2 - cropSize / 2);
  const top = Math.round(h * 0.09);

  return sharp(monogramSource)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize(size, size, {
      fit: "cover",
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: size <= 48 ? 0.8 : 0.4 })
    .png()
    .toBuffer();
}

const icon512 = await monogramCrop(512);
const icon180 = await monogramCrop(180);
const icon32 = await monogramCrop(32);
const icon16 = await monogramCrop(16);
const icon48 = await monogramCrop(48);

writeFileSync(path.join(appDir, "icon.png"), icon512);
writeFileSync(path.join(appDir, "apple-icon.png"), icon180);
writeFileSync(
  path.join(appDir, "favicon.ico"),
  await toIco([icon16, icon32, icon48])
);

console.log("✓ Generated favicons from L monogram (card-back crop)");

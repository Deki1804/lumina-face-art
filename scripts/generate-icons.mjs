import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public", "images", "logo.png");
const appDir = path.join(root, "app");

async function cropped(size) {
  const meta = await sharp(input).metadata();
  const min = Math.min(meta.width ?? 512, meta.height ?? 512);
  const cropSize = Math.round(min * 0.84);
  const left = Math.round(((meta.width ?? 512) - cropSize) / 2);
  const top = Math.round(((meta.height ?? 512) - cropSize) / 2);

  return sharp(input)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
}

const icon512 = await cropped(512);
const icon180 = await cropped(180);
const icon32 = await cropped(32);
const icon16 = await cropped(16);
const icon48 = await cropped(48);

writeFileSync(path.join(appDir, "icon.png"), icon512);
writeFileSync(path.join(appDir, "apple-icon.png"), icon180);
writeFileSync(
  path.join(appDir, "favicon.ico"),
  await toIco([icon16, icon32, icon48])
);

console.log("✓ Generated app/favicon.ico, app/icon.png, app/apple-icon.png");

import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public", "images", "favicon-source.png");
const appDir = path.join(root, "app");

async function resizeIcon(size) {
  return sharp(source)
    .resize(size, size, {
      fit: "contain",
      background: { r: 250, g: 246, b: 240, alpha: 1 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();
}

const icon512 = await resizeIcon(512);
const icon180 = await resizeIcon(180);
const icon32 = await resizeIcon(32);
const icon16 = await resizeIcon(16);
const icon48 = await resizeIcon(48);

writeFileSync(path.join(appDir, "icon.png"), icon512);
writeFileSync(path.join(appDir, "apple-icon.png"), icon180);
writeFileSync(
  path.join(appDir, "favicon.ico"),
  await toIco([icon16, icon32, icon48])
);

console.log("✓ Generated favicons from public/images/favicon-source.png");

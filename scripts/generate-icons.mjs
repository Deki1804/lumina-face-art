import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public", "images", "favicon-source.png");
const appDir = path.join(root, "app");

const CREAM = { r: 250, g: 246, b: 240, alpha: 1 };

async function cropCenter(ratio) {
  const { width, height } = await sharp(source).metadata();
  const cropW = Math.round(width * ratio);
  const cropH = Math.round(height * ratio);
  const left = Math.round((width - cropW) / 2);
  const top = Math.round((height - cropH) / 2);

  return sharp(source).extract({ left, top, width: cropW, height: cropH });
}

async function resizeFullIcon(size) {
  return sharp(source)
    .resize(size, size, {
      fit: "contain",
      background: CREAM,
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();
}

/** Tighter crop on the L — drops thin outer gold rings that blur at 16–32px */
async function resizeTabIcon(size, { cropRatio = 0.58, sharpen = true } = {}) {
  let pipeline = (await cropCenter(cropRatio)).resize(size, size, {
    fit: "contain",
    background: CREAM,
    kernel: sharp.kernel.lanczos3,
  });

  if (sharpen && size <= 48) {
    pipeline = pipeline.sharpen({ sigma: 0.6, m1: 0.5, m2: 0.25 });
  }

  return pipeline.png().toBuffer();
}

const icon512 = await resizeTabIcon(512, { cropRatio: 0.62, sharpen: false });
const icon180 = await resizeFullIcon(180);
const icon48 = await resizeTabIcon(48, { cropRatio: 0.6 });
const icon32 = await resizeTabIcon(32, { cropRatio: 0.56 });
const icon16 = await resizeTabIcon(16, { cropRatio: 0.52 });

writeFileSync(path.join(appDir, "icon.png"), icon512);
writeFileSync(path.join(appDir, "apple-icon.png"), icon180);
writeFileSync(
  path.join(appDir, "favicon.ico"),
  await toIco([icon16, icon32, icon48])
);

console.log("✓ Generated tab-optimized favicons from public/images/favicon-source.png");

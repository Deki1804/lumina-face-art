import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");

// Must match lib/profile.ts → websiteUrl
const url = "https://luminafaceart.vercel.app";

const options = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: {
    dark: "#3d5a3e",
    light: "#faf6f0",
  },
};

mkdirSync(outDir, { recursive: true });

// Print-ready PNG (vizitka / NFC referenca)
await QRCode.toFile(path.join(outDir, "qr-code.png"), url, {
  ...options,
  width: 1200,
});

// Manji preview za web / dokumentaciju
await QRCode.toFile(path.join(outDir, "qr-code-sm.png"), url, {
  ...options,
  width: 400,
});

// SVG za dizajnere (Illustrator / Canva)
const svg = await QRCode.toString(url, {
  ...options,
  type: "svg",
});
writeFileSync(path.join(outDir, "qr-code.svg"), svg, "utf8");

console.log(`✓ QR kod generiran za: ${url}`);
console.log("  public/images/qr-code.png      (1200px, za print)");
console.log("  public/images/qr-code-sm.png   (400px, preview)");
console.log("  public/images/qr-code.svg      (vector)");

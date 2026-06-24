import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, "..", "public", "images", "gallery");
const outputFile = path.join(__dirname, "..", "lib", "gallery.ts");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function getGalleryImages() {
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
    return [];
  }

  return fs
    .readdirSync(galleryDir)
    .filter((file) =>
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b, "hr"));
}

const images = getGalleryImages();

const entries = images
  .map((file, index) => {
    const src = `/images/gallery/${file}`;
    const alt = `Lumina Face Art rad ${index + 1}`;
    return `  {\n    src: "${src}",\n    alt: "${alt}",\n  }`;
  })
  .join(",\n");

const content = `export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
${entries}
];
`;

fs.writeFileSync(outputFile, content, "utf8");

console.log(
  images.length > 0
    ? `✓ Generirano ${images.length} slika u lib/gallery.ts`
    : "✓ lib/gallery.ts ažuriran (nema slika u galeriji)"
);

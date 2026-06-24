import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, "..", "public", "images", "gallery");
const outputFile = path.join(__dirname, "..", "lib", "gallery.ts");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

const CATEGORIES = [
  {
    id: "rodjendani",
    title: "Rođendani",
    description: "Oslikavanje lica za dječje rođendane.",
  },
  {
    id: "eventi",
    title: "Eventi",
    description: "Face painting za vrtiće, fešte i posebne prigode.",
  },
  {
    id: "motivi",
    title: "Motivi",
    description: "Primjeri motiva, likova, leptira, vila i čarobnih detalja.",
  },
];

function getCategoryImages(categoryId) {
  const categoryDir = path.join(galleryDir, categoryId);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  return fs
    .readdirSync(categoryDir)
    .filter((file) =>
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b, "hr"));
}

function escapeString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const groups = CATEGORIES.map((category) => {
  const files = getCategoryImages(category.id);

  const images = files.map((file, index) => {
    const src = `/images/gallery/${category.id}/${file}`;
    const alt = `${category.title} — rad ${index + 1}`;

    return `      {
        src: "${escapeString(src)}",
        alt: "${escapeString(alt)}",
        category: "${category.id}",
      }`;
  });

  return `  {
    id: "${category.id}",
    title: "${escapeString(category.title)}",
    description: "${escapeString(category.description)}",
    images: [
${images.join(",\n")}
    ],
  }`;
});

const content = `export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

export type GalleryGroup = {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

export const galleryGroups: GalleryGroup[] = [
${groups.join(",\n")}
];
`;

if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

for (const category of CATEGORIES) {
  const categoryDir = path.join(galleryDir, category.id);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
}

fs.writeFileSync(outputFile, content, "utf8");

const totalImages = CATEGORIES.reduce(
  (sum, category) => sum + getCategoryImages(category.id).length,
  0
);

console.log(
  totalImages > 0
    ? `✓ Generirano ${totalImages} slika u ${CATEGORIES.length} kategorija → lib/gallery.ts`
    : "✓ lib/gallery.ts ažuriran (nema slika u galeriji)"
);

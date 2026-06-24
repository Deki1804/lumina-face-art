import Image from "next/image";
import Link from "next/link";
import { EmptyGalleryState } from "@/components/EmptyGalleryState";
import { galleryGroups, type GalleryImage } from "@/lib/gallery";

function getPreviewImages(limit = 4): GalleryImage[] {
  const activeGroups = galleryGroups.filter((group) => group.images.length > 0);
  if (activeGroups.length === 0) return [];

  const preview: GalleryImage[] = [];
  let round = 0;

  while (preview.length < limit) {
    let added = false;

    for (const group of activeGroups) {
      const image = group.images[round];
      if (image) {
        preview.push(image);
        added = true;
        if (preview.length >= limit) break;
      }
    }

    if (!added) break;
    round++;
  }

  return preview;
}

export function GalleryPreview() {
  const previewImages = getPreviewImages(4);
  const hasImages = previewImages.length > 0;

  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-lg">
        <h2
          className="mb-1 text-center text-xl font-bold text-forest sm:text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Galerija radova
        </h2>
        <p className="mb-6 text-center text-sm text-forest/65">
          Primjeri oslikavanja lica i čarobnih detalja.
        </p>

        {hasImages ? (
          <div className="mb-6 grid grid-cols-2 gap-3">
            {previewImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-square overflow-hidden rounded-xl border border-sage/30 shadow-[0_2px_12px_rgba(168,197,160,0.15)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 45vw, 200px"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-5">
            <EmptyGalleryState />
          </div>
        )}

        <div className="text-center">
          <Link
            href="/gallery"
            className="btn-press inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-forest/20 bg-forest px-6 py-3 text-sm font-semibold text-cream shadow-[0_4px_16px_rgba(61,90,62,0.2)] transition-all hover:bg-forest-light"
          >
            Pogledaj galeriju
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

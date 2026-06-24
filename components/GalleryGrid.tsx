"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyGalleryState } from "@/components/EmptyGalleryState";
import type { GalleryGroup, GalleryImage } from "@/lib/gallery";

type GalleryGridProps = {
  groups: GalleryGroup[];
};

function ImageTile({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative aspect-square overflow-hidden rounded-xl border border-sage/30 shadow-[0_2px_12px_rgba(168,197,160,0.15)] transition-shadow hover:shadow-[0_4px_20px_rgba(168,197,160,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 45vw, 220px"
      />
    </button>
  );
}

export function GalleryGrid({ groups }: GalleryGridProps) {
  const activeGroups = useMemo(
    () => groups.filter((group) => group.images.length > 0),
    [groups]
  );

  const allImages = useMemo(
    () => activeGroups.flatMap((group) => group.images),
    [activeGroups]
  );

  const imageIndexBySrc = useMemo(() => {
    const map = new Map<string, number>();
    allImages.forEach((image, index) => map.set(image.src, index));
    return map;
  }, [allImages]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + allImages.length) % allImages.length
    );
  }, [allImages.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i + 1) % allImages.length
    );
  }, [allImages.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, showPrev, showNext]);

  if (allImages.length === 0) {
    return <EmptyGalleryState />;
  }

  const activeImage = activeIndex !== null ? allImages[activeIndex] : null;

  return (
    <>
      <div className="space-y-10">
        {activeGroups.map((group) => (
          <section key={group.id} aria-labelledby={`gallery-${group.id}`}>
            <h2
              id={`gallery-${group.id}`}
              className="mb-1 text-lg font-bold text-forest sm:text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {group.title}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-forest/65">
              {group.description}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {group.images.map((image) => (
                <ImageTile
                  key={image.src}
                  image={image}
                  index={imageIndexBySrc.get(image.src) ?? 0}
                  onOpen={setActiveIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {activeImage && (
        <div
          className="lightbox-enter fixed inset-0 z-50 flex items-center justify-center bg-forest/80 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Pregled slike"
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream/20 text-cream text-xl backdrop-blur-sm transition-colors hover:bg-cream/30"
            aria-label="Zatvori"
          >
            ×
          </button>

          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/20 text-cream text-xl backdrop-blur-sm transition-colors hover:bg-cream/30 sm:left-6"
                aria-label="Prethodna slika"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/20 text-cream text-xl backdrop-blur-sm transition-colors hover:bg-cream/30 sm:right-6"
                aria-label="Sljedeća slika"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative max-h-[85dvh] w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-gold/30 shadow-2xl">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain bg-cream"
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

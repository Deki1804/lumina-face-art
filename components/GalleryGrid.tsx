"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { EmptyGalleryState } from "@/components/EmptyGalleryState";
import type { GalleryImage } from "@/lib/gallery";

type GalleryGridProps = {
  images: GalleryImage[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

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

  if (images.length === 0) {
    return <EmptyGalleryState />;
  }

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
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

          {images.length > 1 && (
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

import Link from "next/link";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Footer } from "@/components/Footer";
import { LogoEmblem } from "@/components/LogoEmblem";
import { galleryImages } from "@/lib/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerija radova | LUMINA Face Art",
  description:
    "Primjeri oslikavanja lica i čarobnih detalja za rođendane i evente.",
};

export default function GalleryPage() {
  return (
    <main className="relative z-10 min-h-dvh overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-2xl">
        <header className="px-5 pt-8 pb-4 text-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm text-forest/60 transition-colors hover:text-forest"
          >
            ← Natrag na kontakt
          </Link>

          <LogoEmblem size="sm" className="mb-4" priority />

          <h1
            className="mb-2 text-2xl font-bold text-forest sm:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Galerija radova
          </h1>
          <p className="text-sm leading-relaxed text-forest/65">
            Primjeri oslikavanja lica i čarobnih detalja za rođendane i evente.
          </p>
          <div className="gold-line mx-auto mt-4 w-24" />
        </header>

        <section className="px-5 py-6">
          <GalleryGrid images={galleryImages} />
        </section>

        <div className="px-5 pb-6 text-center">
          <Link
            href="/"
            className="btn-press inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-forest/20 bg-forest px-6 py-3 text-sm font-semibold text-cream shadow-[0_4px_16px_rgba(61,90,62,0.2)] transition-all hover:bg-forest-light"
          >
            ← Natrag na kontakt
          </Link>
        </div>

        <Footer />
      </div>
    </main>
  );
}

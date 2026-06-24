import Link from "next/link";
import { Footer } from "@/components/Footer";
import { LogoEmblem } from "@/components/LogoEmblem";
import { isConsentFormReady } from "@/lib/consent";
import { profile } from "@/lib/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privola za objavu fotografija",
  description:
    "Online privola za fotografiranje i objavu fotografija — LUMINA Face Art.",
};

export default function PrivolaPage() {
  const formReady = isConsentFormReady();

  return (
    <main className="relative z-10 min-h-dvh overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-lg">
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
            Privola za objavu fotografija
          </h1>
          <div className="gold-line mx-auto mt-4 w-24" />
        </header>

        <section className="px-5 py-4">
          {formReady ? (
            <div className="rounded-2xl border border-sage/30 bg-cream-dark/50 px-5 py-5 shadow-[0_2px_16px_rgba(168,197,160,0.12)]">
              <p className="mb-5 text-sm leading-relaxed text-forest/75">
                Radi zaštite privatnosti djece i odraslih, fotografije se
                objavljuju samo uz privolu. Klikom na gumb možete ispuniti
                kratki online obrazac za privolu za fotografiranje i/ili objavu
                fotografija na Lumina web stranici i društvenim mrežama.
              </p>

              <a
                href={profile.consentFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press mb-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-forest/20 bg-forest px-6 py-3 text-sm font-semibold text-cream shadow-[0_4px_16px_rgba(61,90,62,0.2)] transition-all hover:bg-forest-light"
              >
                Otvori obrazac privole
                <span aria-hidden="true">↗</span>
              </a>

              <p className="text-center text-xs leading-relaxed text-forest/55">
                Odgovori se spremaju u Google obrazac vlasnice. Lumina stranica
                ne pohranjuje osobne podatke iz obrasca.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-sage/30 bg-cream-dark/50 px-5 py-5 text-center shadow-[0_2px_16px_rgba(168,197,160,0.12)]">
              <p className="mb-1 text-sm font-medium text-forest/80">
                Online privola je u pripremi.
              </p>
              <p className="text-sm leading-relaxed text-forest/65">
                Za sada se privola dogovara izravno s vlasnicom.
              </p>
            </div>
          )}
        </section>

        <div className="flex flex-col items-center gap-2.5 px-5 pb-6">
          <Link
            href="/"
            className="btn-press inline-flex min-h-[48px] w-full max-w-md items-center justify-center gap-2 rounded-2xl border border-forest/20 bg-forest px-6 py-3 text-sm font-semibold text-cream shadow-[0_4px_16px_rgba(61,90,62,0.2)] transition-all hover:bg-forest-light"
          >
            ← Natrag na kontakt
          </Link>

          {!formReady && (
            <div className="grid w-full max-w-md grid-cols-2 gap-2.5">
              <a
                href={`tel:${profile.phoneLink}`}
                className="btn-press flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-forest bg-forest px-3 py-2.5 text-xs font-semibold text-cream shadow-[0_4px_16px_rgba(61,90,62,0.2)] transition-all hover:bg-forest-light sm:rounded-2xl sm:text-sm"
              >
                <span aria-hidden="true">📞</span>
                Nazovi
              </a>
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-forest bg-forest px-3 py-2.5 text-xs font-semibold text-cream shadow-[0_4px_16px_rgba(61,90,62,0.2)] transition-all hover:bg-forest-light sm:rounded-2xl sm:text-sm"
              >
                <span aria-hidden="true">💬</span>
                WhatsApp
              </a>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </main>
  );
}

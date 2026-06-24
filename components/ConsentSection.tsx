import Link from "next/link";
import { isConsentFormReady } from "@/lib/consent";
import { profile } from "@/lib/profile";

export function ConsentSection() {
  if (!profile.consentEnabled) return null;

  const formReady = isConsentFormReady();

  return (
    <section className="px-5 pb-2 pt-1" aria-labelledby="consent-heading">
      <div className="mx-auto max-w-md rounded-2xl border border-gold/25 bg-gold/[0.06] px-4 py-4 shadow-[0_2px_12px_rgba(201,168,76,0.1)]">
        <h2
          id="consent-heading"
          className="mb-1 text-center text-sm font-bold text-forest sm:text-base"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Privola za fotografije
        </h2>
        <p className="mb-3 text-center text-xs leading-relaxed text-forest/65 sm:text-sm">
          Za objavu fotografija djece i odraslih moguće je ispuniti kratku online
          privolu.
        </p>

        {formReady ? (
          <a
            href={profile.consentFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ispunite online privolu za fotografiranje i objavu fotografija"
            className="btn-press flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/15 px-4 py-2.5 text-xs font-semibold text-forest shadow-[0_2px_12px_rgba(201,168,76,0.15)] transition-all hover:bg-gold/25 sm:min-h-[50px] sm:rounded-2xl sm:text-sm"
          >
            <span aria-hidden="true">📋</span>
            <span>Privola za fotografije</span>
          </a>
        ) : (
          <Link
            href="/privola"
            aria-label="Ispunite online privolu za fotografiranje i objavu fotografija"
            className="btn-press flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/15 px-4 py-2.5 text-xs font-semibold text-forest shadow-[0_2px_12px_rgba(201,168,76,0.15)] transition-all hover:bg-gold/25 sm:min-h-[50px] sm:rounded-2xl sm:text-sm"
          >
            <span aria-hidden="true">📋</span>
            <span>Privola za fotografije</span>
          </Link>
        )}
      </div>
    </section>
  );
}

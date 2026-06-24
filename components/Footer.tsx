import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-sage/20 px-5 py-8 text-center">
      <div className="mb-4 flex items-center justify-center gap-2 text-gold/70" aria-hidden="true">
        <span className="text-xs">✦</span>
        <span className="gold-line w-12" />
        <span className="text-xs text-burgundy/60">♥</span>
        <span className="gold-line w-12" />
        <span className="text-xs">✦</span>
      </div>

      <p
        className="mb-1 text-base font-semibold text-forest"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {profile.brand}
      </p>
      <p className="mb-1 text-xs text-forest/55 sm:text-sm">{profile.tagline}</p>
      <p className="mb-4 text-sm text-forest/65">{profile.location}</p>

      <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
        <a
          href={`tel:${profile.phoneLink}`}
          className="text-forest/70 underline-offset-2 transition-colors hover:text-forest hover:underline"
        >
          {profile.phone}
        </a>
        <span className="text-sage/60" aria-hidden="true">
          ·
        </span>
        <a
          href={profile.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest/70 underline-offset-2 transition-colors hover:text-forest hover:underline"
        >
          @{profile.instagram}
        </a>
      </div>

      <p className="text-xs tracking-wide text-forest/45">Digitalna vizitka</p>
    </footer>
  );
}

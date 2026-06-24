import { LogoEmblem } from "@/components/LogoEmblem";
import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <section className="relative px-5 pt-8 pb-5 text-center sm:pt-10 sm:pb-6">
      <LogoEmblem size="md" className="mb-4 sm:mb-5" priority />

      <p className="mb-1 text-xs tracking-wide text-forest/70 sm:text-sm">
        {profile.name}
      </p>

      <h1
        className="mb-2 text-2xl font-bold tracking-wide text-forest sm:text-3xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {profile.brand}
      </h1>

      <div className="gold-line mx-auto mb-3 w-20 sm:mb-4 sm:w-24" />

      <p className="mb-3 text-sm font-medium text-forest-light sm:text-base">
        {profile.tagline}
      </p>

      <p className="mx-auto max-w-xs text-xs leading-relaxed text-forest/75 sm:max-w-sm sm:text-sm">
        {profile.description}
      </p>
    </section>
  );
}

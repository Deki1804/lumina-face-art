import { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description: string;
  icon: string;
};

export function SectionCard({ title, description, icon }: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-sage/30 bg-cream-dark/50 p-5 shadow-[0_2px_16px_rgba(168,197,160,0.12)] backdrop-blur-sm transition-shadow hover:shadow-[0_4px_20px_rgba(168,197,160,0.2)]">
      <div className="mb-3 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/20 text-xl"
          aria-hidden="true"
        >
          {icon}
        </span>
        <h3
          className="text-base font-semibold text-forest"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-forest/70">{description}</p>
    </div>
  );
}

type SectionWrapperProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function SectionWrapper({ title, subtitle, children }: SectionWrapperProps) {
  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-lg">
        <h2
          className="mb-1 text-center text-xl font-bold text-forest sm:text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mb-6 text-center text-sm text-forest/65">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-6" />}
        {children}
      </div>
    </section>
  );
}

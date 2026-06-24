import { profile } from "@/lib/profile";

type ContactAction = {
  label: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary" | "accent";
  download?: string;
  external?: boolean;
  fullWidth?: boolean;
};

const contactActions: ContactAction[] = [
  {
    label: "Nazovi",
    href: `tel:${profile.phoneLink}`,
    icon: "📞",
    variant: "primary",
  },
  {
    label: "WhatsApp",
    href: profile.whatsappUrl,
    icon: "💬",
    variant: "primary",
    external: true,
  },
  {
    label: "Instagram",
    href: profile.instagramUrl,
    icon: "📸",
    variant: "secondary",
    external: true,
  },
  {
    label: "Facebook",
    href: profile.facebookUrl,
    icon: "👍",
    variant: "secondary",
    external: true,
  },
  {
    label: "E-mail",
    href: `mailto:${profile.email}`,
    icon: "✉️",
    variant: "secondary",
  },
  {
    label: "Spremi kontakt",
    href: profile.vcardPath,
    icon: "📇",
    variant: "accent",
    download: "Melita-Lumina-Face-Art.vcf",
    fullWidth: true,
  },
];

const variantStyles = {
  primary:
    "bg-forest text-cream border-forest shadow-[0_4px_16px_rgba(61,90,62,0.25)] hover:bg-forest-light",
  secondary:
    "bg-cream-dark/80 text-forest border-sage/50 shadow-[0_2px_12px_rgba(168,197,160,0.2)] hover:bg-sage/20",
  accent:
    "bg-gold/15 text-forest border-gold/40 shadow-[0_2px_12px_rgba(201,168,76,0.2)] hover:bg-gold/25",
};

export function ContactButtons() {
  return (
    <section className="px-5 py-3 sm:py-4">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5 sm:gap-3">
        {contactActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            {...(action.download ? { download: action.download } : {})}
            {...(action.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`btn-press flex min-h-[50px] items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-200 sm:min-h-[54px] sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm ${variantStyles[action.variant]} ${action.fullWidth ? "col-span-2" : ""}`}
          >
            <span className="text-base sm:text-lg" aria-hidden="true">
              {action.icon}
            </span>
            <span>{action.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";

type LogoEmblemProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const sizes = {
  sm: { box: "h-[4.5rem] w-[4.5rem]", ring: "ring-2", image: 72 },
  md: { box: "h-[8rem] w-[8rem] sm:h-[8.75rem] sm:w-[8.75rem]", ring: "ring-[3px]", image: 140 },
  lg: { box: "h-[9rem] w-[9rem] sm:h-[10rem] sm:w-[10rem]", ring: "ring-[3px]", image: 160 },
};

export function LogoEmblem({
  size = "md",
  className = "",
  priority = false,
}: LogoEmblemProps) {
  const s = sizes[size];

  return (
    <div className={`relative mx-auto ${s.box} ${className}`}>
      {/* Soft outer glow */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.14) 0%, rgba(168,197,160,0.1) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Circular emblem frame */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-full ${s.ring} ring-gold/20 ring-offset-2 ring-offset-cream shadow-[0_6px_28px_rgba(61,90,62,0.1),0_2px_12px_rgba(201,168,76,0.12)]`}
      >
        <Image
          src="/images/logo.png"
          alt="LUMINA Face Art"
          width={s.image}
          height={s.image}
          className="h-full w-full scale-[1.12] object-cover object-center"
          priority={priority}
        />
      </div>
    </div>
  );
}

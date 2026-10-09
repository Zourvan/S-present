"use client";

const LOGO_SRC = "/brand/ronagen-logo.svg";

const SIZES = {
  chrome: { w: 40, h: 32, className: "h-8 w-10" },
  header: { w: 40, h: 32, className: "h-8 w-10" },
  hero: {
    w: 140,
    h: 114,
    className: "h-[var(--logo-hero-h)] w-auto max-h-[120px]",
  },
  presenter: {
    w: 150,
    h: 122,
    className: "h-[var(--logo-presenter-h)] w-auto max-h-[132px]",
  },
  thanks: {
    w: 130,
    h: 105,
    className: "h-[var(--logo-thanks-h)] w-auto max-h-[108px]",
  },
} as const;

export function BrandLogo({
  size = "hero",
  className = "",
  priority = false,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  priority?: boolean;
}) {
  const cfg = SIZES[size];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Ronagen"
      width={cfg.w}
      height={cfg.h}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={`object-contain ${cfg.className} ${className}`}
    />
  );
}

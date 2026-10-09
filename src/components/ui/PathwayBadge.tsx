"use client";

import { useApp } from "@/lib/providers/AppProviders";

export function PathwayBadge({
  pathway,
}: {
  pathway: "oral" | "biotech" | "shared";
}) {
  const { strings } = useApp();
  const label =
    pathway === "oral"
      ? strings.oral
      : pathway === "biotech"
        ? strings.biotech
        : strings.shared;
  const cls =
    pathway === "oral"
      ? "bg-[var(--oral-coral)]/15 text-[var(--oral-coral)] border-[var(--oral-coral)]/40"
      : pathway === "biotech"
        ? "bg-[var(--biotech-burgundy)]/15 text-[var(--biotech-burgundy)] border-[var(--biotech-burgundy)]/40"
        : "bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)] border-[var(--brand-cyan)]/40";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-wide md:text-sm ${cls}`}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background:
            pathway === "oral"
              ? "var(--oral-coral)"
              : pathway === "biotech"
                ? "var(--biotech-burgundy)"
                : "var(--brand-cyan)",
        }}
        aria-hidden
      />
      {label}
    </span>
  );
}

export function PathwayLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      <PathwayBadge pathway="oral" />
      <PathwayBadge pathway="biotech" />
      <PathwayBadge pathway="shared" />
    </div>
  );
}

"use client";

import type { ReactNode } from "react";

export function KeyInsight({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <div className="accent-rule mt-2 shrink-0" aria-hidden />
      <div className="min-w-0">
        {label ? (
          <p className="text-[0.65em] font-bold uppercase tracking-[0.08em] text-[var(--slide-kicker)]">
            {label}
          </p>
        ) : null}
        <p className="text-[1.05em] font-semibold leading-snug text-[var(--slide-title)]">
          {children}
        </p>
      </div>
    </div>
  );
}

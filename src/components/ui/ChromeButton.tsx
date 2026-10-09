"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function ChromeButton({
  children,
  active,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`inline-flex touch-manipulation items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cyan)] disabled:opacity-40 ${
        active
          ? "border-[var(--brand-cyan)] bg-[var(--brand-cyan)] text-white"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--chrome-fg)] hover:border-[var(--brand-cyan)]"
      } ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

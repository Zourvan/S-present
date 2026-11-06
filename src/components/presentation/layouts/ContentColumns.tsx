"use client";

import type { ReactNode } from "react";

export function ContentColumns({
  children,
  cols = 2,
  className = "",
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const grid =
    cols === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : cols === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`grid gap-3 ${grid} ${className}`}>{children}</div>
  );
}

export function SplitPane({
  left,
  right,
  leftTitle,
  rightTitle,
  className = "",
}: {
  left: ReactNode;
  right: ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  className?: string;
}) {
  return (
    <div className={`grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 ${className}`}>
      <section className="min-h-0 rounded-lg border border-[var(--border)] bg-[var(--surface)]/80 p-3">
        {leftTitle ? (
          <h3 className="mb-2 text-[0.85em] font-bold uppercase tracking-wide text-[var(--slide-kicker)]">
            {leftTitle}
          </h3>
        ) : null}
        {left}
      </section>
      <section className="min-h-0 rounded-lg border border-[var(--border)] bg-[var(--surface)]/80 p-3">
        {rightTitle ? (
          <h3 className="mb-2 text-[0.85em] font-bold uppercase tracking-wide text-[var(--slide-kicker)]">
            {rightTitle}
          </h3>
        ) : null}
        {right}
      </section>
    </div>
  );
}

export function PillarCard({
  index,
  title,
  body,
}: {
  index?: number | string;
  title: string;
  body?: string;
}) {
  return (
    <div className="flex h-full flex-col gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
      {index !== undefined ? (
        <span className="text-[0.7em] font-bold tracking-wide text-[var(--brand-cyan)]">
          {index}
        </span>
      ) : null}
      <h3 className="text-[0.95em] font-bold leading-snug text-[var(--slide-title)]">
        {title}
      </h3>
      {body ? (
        <p className="slide-body-text text-[0.85em] leading-snug">{body}</p>
      ) : null}
    </div>
  );
}

export function ConceptPanel({
  title,
  body,
  tone = "default",
}: {
  title: string;
  body: string;
  tone?: "default" | "oral" | "cyan" | "warn";
}) {
  const accent =
    tone === "oral"
      ? "border-s-[var(--oral-coral)]"
      : tone === "warn"
        ? "border-s-[var(--warn-red)]"
        : "border-s-[var(--brand-cyan)]";

  return (
    <div
      className={`rounded-lg border border-[var(--border)] border-s-4 bg-[var(--surface)] px-3 py-2.5 ${accent}`}
    >
      <h3 className="text-[0.95em] font-bold text-[var(--slide-title)]">{title}</h3>
      <p className="slide-body-text mt-1 text-[0.85em] leading-snug">{body}</p>
    </div>
  );
}

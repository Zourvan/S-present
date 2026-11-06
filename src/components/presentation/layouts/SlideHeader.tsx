"use client";

import type { ReactNode } from "react";
import { KeyInsight } from "./KeyInsight";

export function SlideHeader({
  kicker,
  title,
  keyMessage,
  keyMessageLabel,
}: {
  kicker?: string;
  title: string;
  keyMessage?: string;
  keyMessageLabel?: string;
}) {
  return (
    <header className="mb-2 shrink-0 text-start">
      {kicker ? <p className="slide-kicker mb-1">{kicker}</p> : null}
      <h2 className="max-w-[28ch] text-[1.45em] font-bold tracking-tight text-[var(--slide-title)] sm:max-w-none">
        {title}
      </h2>
      {keyMessage ? (
        <KeyInsight label={keyMessageLabel} className="mt-1.5">
          {keyMessage}
        </KeyInsight>
      ) : null}
    </header>
  );
}

export function SlideHeaderSlot({ children }: { children: ReactNode }) {
  return <div className="mb-3 shrink-0">{children}</div>;
}

"use client";

import type { TableData } from "@/lib/types";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./Reveal";

export function ComparisonTable({
  table,
  revealStep,
}: {
  table: TableData;
  revealStep: number;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <div className="h-full max-h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      {table.caption ? (
        <p className="border-b border-[var(--border)] bg-[var(--bg-cream)] px-3 py-1.5 text-sm font-semibold text-[var(--text-ink)]">
          {table.caption}
        </p>
      ) : null}
      <div className="slide-table-wrap max-h-full">
        <table className="w-full table-fixed border-collapse text-start">
          <thead>
            <tr className="bg-[var(--brand-cyan)]/15">
              {table.headers.map((h) => (
                <th
                  key={h}
                  className="border-b-2 border-[var(--brand-cyan)]/30 px-2.5 py-2 text-[0.85em] font-bold leading-snug text-[var(--text-ink)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => {
              const visible = revealStep > i || revealStep >= 99;
              return (
                <motion.tr
                  key={i}
                  className="odd:bg-[var(--surface)] even:bg-[var(--bg-cream)]/55"
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0.28,
                  }}
                  transition={reduce ? { duration: 0 } : { duration: 0.3 }}
                >
                  {row.map((cell, j) => (
                    <td
                      key={`${i}-${j}`}
                      className={`border-b border-[var(--border)] px-2.5 py-2 align-middle text-[0.9em] leading-snug text-[var(--text-ink)] ${
                        j === 0 ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

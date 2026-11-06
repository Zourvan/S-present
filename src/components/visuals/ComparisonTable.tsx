"use client";

import type { TableData } from "@/lib/types";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./Reveal";

export function ComparisonTable({
  table,
  revealStep,
  fill = false,
}: {
  table: TableData;
  revealStep: number;
  /** Stretch to parent height and size rows to fit the frame. */
  fill?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const rowCount = table.rows.length;
  const dense = rowCount >= 7;
  const sparse = rowCount <= 4;
  const colCount = Math.max(table.headers.length, 1);
  // Narrow first column when it looks like an index / chapter column.
  const firstNarrow =
    colCount >= 2 &&
    table.headers[0].length <= 12 &&
    table.rows.every((r) => (r[0]?.length ?? 0) <= 4);

  const headClass = dense
    ? "px-2.5 py-2 text-[0.85em]"
    : fill && sparse
      ? "px-4 py-4 text-[1.15em]"
      : fill
        ? "px-3.5 py-3 text-[1.02em]"
        : "px-3 py-2.5 text-[0.95em]";

  const cellClass = dense
    ? "px-2.5 py-1.5 text-[0.95em]"
    : fill && sparse
      ? "px-4 py-5 text-[1.3em]"
      : fill
        ? "px-3.5 py-3.5 text-[1.15em]"
        : "px-3 py-2.5 text-[1.08em]";

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] ${
        fill ? "flex min-h-0 h-full flex-col" : ""
      }`}
    >
      {table.caption ? (
        <p className="shrink-0 border-b border-[var(--border)] px-3 py-2 text-[0.9em] font-medium leading-snug text-[var(--text-muted)]">
          {table.caption}
        </p>
      ) : null}
      <div
        className={`slide-table-wrap min-h-0 ${fill ? "flex-1 overflow-hidden" : "max-h-full"}`}
      >
        <table
          className={`w-full table-fixed border-collapse text-start ${
            fill ? "h-full" : ""
          }`}
        >
          {firstNarrow ? (
            <colgroup>
              <col style={{ width: colCount === 2 ? "18%" : "14%" }} />
              {Array.from({ length: colCount - 1 }, (_, i) => (
                <col key={i} />
              ))}
            </colgroup>
          ) : null}
          <thead>
            <tr className="bg-[var(--surface-elevated)]">
              {table.headers.map((h) => (
                <th
                  key={h}
                  className={`border-b-2 border-[var(--brand-cyan)]/25 font-bold leading-snug text-[var(--slide-kicker)] ${headClass}`}
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
                  className="odd:bg-[var(--surface)] even:bg-[var(--surface-elevated)]/60"
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0.18,
                  }}
                  transition={reduce ? { duration: 0 } : { duration: 0.28 }}
                  aria-hidden={!visible}
                >
                  {row.map((cell, j) => (
                    <td
                      key={`${i}-${j}`}
                      className={`border-b border-[var(--border)] align-middle leading-snug text-[var(--text-ink)] ${cellClass} ${
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

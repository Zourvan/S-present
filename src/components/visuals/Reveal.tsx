"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore, type ReactNode } from "react";

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function RevealItem({
  index,
  revealStep,
  children,
  className = "",
}: {
  index: number;
  revealStep: number;
  children: ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const visible = revealStep > index || revealStep >= 99;

  // Keep layout space so grids/tables do not collapse; dim unrevealed steps.
  if (reduce) {
    return (
      <div
        className={className}
        style={{ opacity: visible ? 1 : 0.16 }}
        aria-hidden={!visible}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0.16,
        y: visible ? 0 : 6,
      }}
      transition={{
        duration: 0.28,
        delay: visible ? Math.min(index * 0.025, 0.15) : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden={!visible}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedPath({
  d,
  color,
  delay = 0,
  visible = true,
}: {
  d: string;
  color: string;
  delay?: number;
  visible?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const exporting =
    typeof document !== "undefined" &&
    document.documentElement.dataset.slideExport === "true";

  if (reduce || exporting) {
    return (
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={visible ? 1 : 0}
      />
    );
  }

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

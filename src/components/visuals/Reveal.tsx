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

function usePrefersReducedMotion(): boolean {
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

  if (reduce) {
    return (
      <div className={className} style={{ opacity: visible ? 1 : 0.25 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0.2,
        y: visible ? 0 : 8,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
    document.documentElement.dataset.slideExport === "1";
  if (reduce || exporting || !visible) {
    return (
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={3}
        opacity={visible ? 1 : 0.2}
      />
    );
  }
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: "easeInOut" }}
    />
  );
}

export { usePrefersReducedMotion };

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const SLIDE_DESIGN_W = 1280;
export const SLIDE_DESIGN_H_MIN = 720;
export const SLIDE_DESIGN_H_MAX = 900;
/** Default / export canvas height (16:9). */
export const SLIDE_DESIGN_H = SLIDE_DESIGN_H_MIN;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Contain-fit a 1280-wide design canvas into the available frame.
 * Design height grows (up to 900) when the frame is taller than 16:9 so
 * tall/narrow chrome fills vertically instead of letterboxing.
 */
export function SlideStage({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [designH, setDesignH] = useState(SLIDE_DESIGN_H_MIN);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      const aspectH = Math.round((SLIDE_DESIGN_W * height) / width);
      const nextH = clamp(aspectH, SLIDE_DESIGN_H_MIN, SLIDE_DESIGN_H_MAX);
      const nextScale = Math.min(
        width / SLIDE_DESIGN_W,
        height / nextH,
      );
      setDesignH(nextH);
      setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden"
    >
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width: SLIDE_DESIGN_W,
          height: designH,
          ["--slide-h" as string]: `${designH}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        data-slide-scale={scale.toFixed(3)}
        data-slide-h={designH}
      >
        {children}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { flushSync } from "react-dom";
import type { Slide } from "@/lib/types";
import { SlideRenderer } from "./SlideRenderer";

export type SlideCaptureApi = {
  capture: (
    slides: Slide[],
    onProgress?: (done: number, total: number) => void,
  ) => Promise<string[]>;
};

const CAPTURE_W = 1280;
const CAPTURE_H = 720;

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function edgesReady(root: HTMLElement) {
  if (!root.querySelector(".react-flow")) return true;
  const paths = [...root.querySelectorAll<SVGPathElement>(".react-flow__edge-path")];
  if (paths.length === 0) return false;
  return paths.every((path) => {
    const nums = (path.getAttribute("d") || "").match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
    if (nums.length < 4) return false;
    const dx = Math.abs(nums[0] - nums[nums.length - 2]);
    const dy = Math.abs(nums[1] - nums[nums.length - 1]);
    return dx > 40 || dy > 40;
  });
}

function flowNodesFit(root: HTMLElement) {
  const pane = root.querySelector(".react-flow");
  if (!pane) return true;
  const nodes = pane.querySelectorAll<HTMLElement>(".react-flow__node");
  if (nodes.length === 0) return false;
  const box = pane.getBoundingClientRect();
  if (box.width < 10 || box.height < 10) return false;
  for (const el of nodes) {
    const r = el.getBoundingClientRect();
    if (r.width < 2) return false;
    if (r.left < box.left - 8 || r.right > box.right + 8) return false;
    if (r.top < box.top - 8 || r.bottom > box.bottom + 8) return false;
  }
  return true;
}

export function SlideCapture({
  apiRef,
}: {
  apiRef: MutableRefObject<SlideCaptureApi | null>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState<Slide | null>(null);

  useEffect(() => {
    apiRef.current = {
      async capture(slides, onProgress) {
        const { toJpeg } = await import("html-to-image");
        if (document.fonts?.ready) await document.fonts.ready;
        document.documentElement.dataset.slideExport = "1";
        const images: string[] = [];
        try {
          for (let i = 0; i < slides.length; i++) {
            flushSync(() => setSlide(slides[i]));
            await nextFrame();
            await nextFrame();
            const node = hostRef.current;
            if (!node) throw new Error("Capture host missing");
            const layoutDeadline = performance.now() + 2000;
            while (
              (!flowNodesFit(node) || !edgesReady(node)) &&
              performance.now() < layoutDeadline
            ) {
              await delay(40);
            }
            await delay(60);
            const dataUrl = await toJpeg(node, {
              quality: 0.86,
              pixelRatio: 2,
              width: CAPTURE_W,
              height: CAPTURE_H,
              backgroundColor: "#fff9f2",
              cacheBust: true,
              style: { zoom: "1" },
            });
            images.push(dataUrl);
            onProgress?.(i + 1, slides.length);
          }
          return images;
        } finally {
          delete document.documentElement.dataset.slideExport;
          setSlide(null);
        }
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef]);

  return (
    <div
      ref={hostRef}
      className="export-capture"
      aria-hidden
      data-no-nav
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: CAPTURE_W,
        height: CAPTURE_H,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {slide ? <SlideRenderer slide={slide} revealStep={99} /> : null}
    </div>
  );
}

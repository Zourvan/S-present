"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
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

export function SlideCapture({
  api,
}: {
  api: MutableRefObject<SlideCaptureApi | null>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState<Slide | null>(null);

  useEffect(() => {
    api.current = {
      async capture(slides, onProgress) {
        const { default: html2canvas } = await import("html2canvas");
        if (document.fonts?.ready) await document.fonts.ready;
        const images: string[] = [];
        try {
          for (let i = 0; i < slides.length; i++) {
            setSlide(slides[i]);
            await nextFrame();
            await nextFrame();
            await delay(420);
            const node = hostRef.current;
            if (!node) throw new Error("Capture host missing");
            const canvas = await html2canvas(node, {
              scale: 2,
              useCORS: true,
              backgroundColor: "#fff9f2",
              logging: false,
              width: CAPTURE_W,
              height: CAPTURE_H,
              windowWidth: CAPTURE_W,
              windowHeight: CAPTURE_H,
              onclone: (doc) => {
                doc.querySelectorAll<HTMLElement>(".slide-stage").forEach((el) => {
                  el.style.zoom = "1";
                });
              },
            });
            images.push(canvas.toDataURL("image/jpeg", 0.86));
            onProgress?.(i + 1, slides.length);
          }
          return images;
        } finally {
          setSlide(null);
        }
      },
    };
    return () => {
      api.current = null;
    };
  }, [api]);

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

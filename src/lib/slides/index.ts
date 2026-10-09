import type { SectionId, Slide } from "../types";
import { openSlides } from "./section-open";
import { foundationsSlides } from "./section-foundations";
import { operationsSlides } from "./section-operations";
import { manufacturingSlides } from "./section-manufacturing";
import { qcSlides } from "./section-qc";
import { lifecycleSlides } from "./section-lifecycle";
import { closeSlides } from "./section-close";

export const SLIDES: Slide[] = [
  ...openSlides,
  ...foundationsSlides,
  ...operationsSlides,
  ...manufacturingSlides,
  ...qcSlides,
  ...lifecycleSlides,
  ...closeSlides,
];

export const TOTAL_SLIDES = SLIDES.length;

export type SlideSectionGroup = {
  section: SectionId;
  slides: Slide[];
};

const SECTION_ORDER: SectionId[] = [
  "open",
  "foundations",
  "operations",
  "manufacturing",
  "qcValidation",
  "lifecycle",
  "close",
];

/** Table-of-contents grouping: sections in presentation order with their slides. */
export function getSlidesGroupedBySection(): SlideSectionGroup[] {
  return SECTION_ORDER.map((section) => ({
    section,
    slides: SLIDES.filter((s) => s.section === section),
  })).filter((group) => group.slides.length > 0);
}

/** 1-based slide index as shown in UI (slide.number). */
export function getSlideByIndex(index: number): Slide | undefined {
  if (!Number.isFinite(index) || index < 1 || index > TOTAL_SLIDES) {
    return undefined;
  }
  return SLIDES.find((s) => s.number === index);
}

/** Zero-based array index for navigation arrays. */
export function getSlideByArrayIndex(arrayIndex: number): Slide | undefined {
  if (arrayIndex < 0 || arrayIndex >= SLIDES.length) {
    return undefined;
  }
  return SLIDES[arrayIndex];
}

export {
  openSlides,
  foundationsSlides,
  operationsSlides,
  manufacturingSlides,
  qcSlides,
  lifecycleSlides,
  closeSlides,
};

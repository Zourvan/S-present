import type { Locale, Slide } from "../types";
import { SLIDE_FA } from "./fa-index";
import { mergeVisualData } from "./locale";

export function resolveSlide(slide: Slide, locale: Locale): Slide {
  if (locale !== "fa") return slide;
  const o = SLIDE_FA[slide.id];
  if (!o) return slide;
  return {
    ...slide,
    title: o.title ?? slide.title,
    keyMessage: o.keyMessage ?? slide.keyMessage,
    content: o.content ?? slide.content,
    speakerNotes: o.speakerNotes ?? slide.speakerNotes,
    visualData: mergeVisualData(slide.visualData, o.visualData),
  };
}

export function resolveSlides(slides: Slide[], locale: Locale): Slide[] {
  return slides.map((s) => resolveSlide(s, locale));
}

import type { VisualData } from "../types";

export type SlideFaOverride = {
  title?: string;
  keyMessage?: string;
  content?: string[];
  speakerNotes?: string;
  visualData?: VisualData;
};

export function mergeVisualData(
  base?: VisualData,
  override?: VisualData,
): VisualData | undefined {
  if (!override) return base;
  if (!base) return override;
  return { ...base, ...override };
}

import type { SlideFaOverride } from "./locale";
import { openSlidesFa } from "./section-open.fa";
import { foundationsSlidesFa } from "./section-foundations.fa";
import { operationsSlidesFa } from "./section-operations.fa";
import { manufacturingSlidesFa } from "./section-manufacturing.fa";
import { qcSlidesFa } from "./section-qc.fa";
import { deviationsSlidesFa } from "./section-deviations.fa";
import { lifecycleSlidesFa } from "./section-lifecycle.fa";
import { closeSlidesFa } from "./section-close.fa";

export const SLIDE_FA: Record<string, SlideFaOverride> = {
  ...openSlidesFa,
  ...foundationsSlidesFa,
  ...operationsSlidesFa,
  ...manufacturingSlidesFa,
  ...qcSlidesFa,
  ...deviationsSlidesFa,
  ...lifecycleSlidesFa,
  ...closeSlidesFa,
};

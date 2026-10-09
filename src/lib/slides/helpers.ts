import type { Slide, VisualData } from "../types";

export function slide(
  number: number,
  partial: {
    id: string;
    section: Slide["section"];
    title: string;
    keyMessage?: string;
    content: string[];
    visualType: Slide["visualType"];
    visualData?: VisualData;
    references?: string[];
    speakerNotes?: string;
    revealSteps?: number;
  },
): Slide {
  return {
    number,
    revealSteps: partial.revealSteps ?? Math.min(partial.content.length, 6),
    ...partial,
  };
}

/**
 * Highest revealStep needed so every on-screen RevealItem can become visible
 * (`visible` when revealStep > index). Must match what VisualBlock actually renders.
 */
export function getMaxReveal(slide: Slide): number {
  const declared = Math.max(slide.revealSteps ?? 1, 1);
  const vd = slide.visualData;
  const contentLen = slide.content?.length ?? 0;

  switch (slide.visualType) {
    case "titleHero": {
      // SplitPathways steps use index 0..n-1 → need revealStep > n-1
      const left = vd?.leftSteps?.length ?? 0;
      const right = vd?.rightSteps?.length ?? 0;
      const shared = vd?.shared?.length ?? 0;
      // shared pills use index i + 2
      return Math.max(
        declared,
        left,
        right,
        shared > 0 ? shared + 2 : 1,
        1,
      );
    }
    case "presenter":
      return Math.max(declared, 2);
    case "thanksQa": {
      const q = vd?.questions?.length ?? 0;
      if (q > 0) return Math.max(declared, 2 + q);
      return Math.max(declared, vd?.closing ? 3 : 2);
    }
    case "monitoringChart":
      // Chart at index 0, then content bullets from index 1
      return Math.max(1 + contentLen, 1);
    case "riskMatrix":
    case "responsibilityMatrix":
      return 1;
    case "flow":
    case "processSteps":
      if (vd?.flow?.nodes?.length) {
        return Math.max(declared, vd.flow.nodes.length);
      }
      return Math.max(declared, contentLen, 1);
    case "cycle":
    case "lifecycle":
    case "relationship": {
      const layers = vd?.layers?.length ?? contentLen;
      const items = vd?.items?.length ?? 0;
      return Math.max(declared, layers, items, 1);
    }
    case "hierarchy":
      return Math.max(declared, vd?.layers?.length ?? contentLen, 1);
    case "overviewGrid":
      return Math.max(declared, vd?.items?.length ?? contentLen, 1);
    case "comparisonTable":
      return Math.max(declared, vd?.table?.rows?.length ?? 1, 1);
    case "taxonomy":
      return Math.max(declared, vd?.callout ? 7 : 2);
    case "splitPathways": {
      const left = vd?.leftSteps?.length ?? 0;
      const right = vd?.rightSteps?.length ?? 0;
      const shared = vd?.shared?.length ?? 0;
      // shared items use index i + 2
      return Math.max(declared, left, right, shared > 0 ? shared + 2 : 1, 1);
    }
    case "dashboard":
      return Math.max(
        declared,
        vd?.kpis?.length ?? 0,
        vd?.maturityLevels?.length ?? 0,
        1,
      );
    case "roadmap":
      return Math.max(declared, vd?.phases?.length ?? 1, 1);
    case "decisionTree":
      return Math.max(declared, vd?.items?.length ?? contentLen, 1);
    case "callout":
      return Math.max(declared, contentLen + (vd?.callout ? 1 : 0), 1);
    case "deviationLifecycle":
    case "containmentTree":
    case "riskPrioritization":
    case "evidenceMap":
    case "fishbone":
    case "oosWorkflow":
    case "impactCompare":
    case "capaDesign":
    case "capaClosure":
    case "investigationCase":
      return declared;
    case "references": {
      const takeaways = vd?.takeaways?.length ?? 0;
      return Math.max(declared, takeaways + 2, 1);
    }
    case "bullets":
    default: {
      let n = contentLen;
      if (vd?.table?.rows?.length) n = Math.max(n, vd.table.rows.length);
      if (vd?.flow?.nodes?.length) n = Math.max(n, vd.flow.nodes.length);
      if (vd?.callout) n = Math.max(n, contentLen + 1);
      return Math.max(declared, n, 1);
    }
  }
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import { bindStageGestures } from "./stage-gestures";

export function useStageGestures(
  onAdvance: () => void,
  onRetreat: () => void,
) {
  const advanceRef = useRef(onAdvance);
  const retreatRef = useRef(onRetreat);
  const cleanupRef = useRef<(() => void) | null>(null);
  advanceRef.current = onAdvance;
  retreatRef.current = onRetreat;

  const setNode = useCallback((node: HTMLElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    if (!node) return;
    cleanupRef.current = bindStageGestures(node, {
      advance: () => advanceRef.current(),
      retreat: () => retreatRef.current(),
    });
  }, []);

  useEffect(() => () => cleanupRef.current?.(), []);

  return setNode;
}

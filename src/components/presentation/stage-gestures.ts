export type StageGestureAction = "advance" | "retreat" | "none";

export type StageGestureInput = {
  pointerType: string;
  dx: number;
  dy: number;
  elapsedMs: number;
  width: number;
  offsetX: number;
  /** Swipes that start on a browser-chrome edge are left to the OS. */
  fromScreenEdge: boolean;
  blockHorizontal: boolean;
  blockVertical: boolean;
};

const TAP_SLOP = 16;
const TAP_MAX_MS = 650;
const SWIPE_DISTANCE = 48;
const FLICK_DISTANCE = 28;
const FLICK_MAX_MS = 280;
const SWIPE_MAX_MS = 1200;
const AXIS_RATIO = 1.2;

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[role='button']",
  "[contenteditable='true']",
].join(",");

export function stageGestureAction(input: StageGestureInput): StageGestureAction {
  const absX = Math.abs(input.dx);
  const absY = Math.abs(input.dy);
  const touchLike =
    input.pointerType === "touch" || input.pointerType === "pen";

  if (
    touchLike &&
    !input.fromScreenEdge &&
    input.elapsedMs <= SWIPE_MAX_MS
  ) {
    const horizontal = absX > absY * AXIS_RATIO;
    const vertical = absY > absX * AXIS_RATIO;
    const flicked =
      input.elapsedMs > 0 &&
      input.elapsedMs <= FLICK_MAX_MS &&
      Math.max(absX, absY) >= FLICK_DISTANCE;

    if (
      horizontal &&
      !input.blockHorizontal &&
      (absX >= SWIPE_DISTANCE || (flicked && absX >= FLICK_DISTANCE))
    ) {
      return input.dx < 0 ? "advance" : "retreat";
    }
    if (
      vertical &&
      !input.blockVertical &&
      (absY >= SWIPE_DISTANCE || (flicked && absY >= FLICK_DISTANCE))
    ) {
      return input.dy < 0 ? "advance" : "retreat";
    }
  }

  const tap =
    absX <= TAP_SLOP &&
    absY <= TAP_SLOP &&
    input.elapsedMs <= (touchLike ? TAP_MAX_MS : 1500) &&
    input.width > 0;
  if (!tap) return "none";
  if (input.offsetX > input.width * 0.55) return "advance";
  if (input.offsetX < input.width * 0.45) return "retreat";
  return "none";
}

export function isInteractiveTarget(
  target: EventTarget | null,
  boundary: Element,
): boolean {
  if (!(target instanceof Element)) return false;
  const hit = target.closest(INTERACTIVE_SELECTOR);
  return Boolean(hit && boundary.contains(hit));
}

export function isNoNavTarget(
  target: EventTarget | null,
  boundary: Element,
): boolean {
  if (!(target instanceof Element)) return false;
  const hit = target.closest("[data-no-nav]");
  return Boolean(hit && boundary.contains(hit));
}

export function findScroller(
  target: EventTarget | null,
  boundary: Element,
  axis: "x" | "y",
): HTMLElement | null {
  let el = target instanceof Element ? target : null;
  while (el && el !== boundary) {
    if (el instanceof HTMLElement) {
      const style = getComputedStyle(el);
      const overflow = axis === "x" ? style.overflowX : style.overflowY;
      const scrolls =
        overflow === "auto" || overflow === "scroll" || overflow === "overlay";
      if (scrolls) {
        const room =
          axis === "x"
            ? el.scrollWidth - el.clientWidth
            : el.scrollHeight - el.clientHeight;
        if (room > 4) return el;
      }
    }
    el = el.parentElement;
  }
  return null;
}

export function startsAtScreenEdge(x: number, y: number): boolean {
  const side = 28;
  return (
    x < side ||
    x > window.innerWidth - side ||
    y < 12 ||
    y > window.innerHeight - 12
  );
}

type GestureState = {
  id: number;
  pointerType: string;
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  t: number;
  interactive: boolean;
  noNav: boolean;
  fromScreenEdge: boolean;
  scrollerX: HTMLElement | null;
  scrollerY: HTMLElement | null;
  axis: "x" | "y" | null;
  scrolled: boolean;
};

type GestureHandlers = {
  advance: () => void;
  retreat: () => void;
};

export function bindStageGestures(
  el: HTMLElement,
  handlers: GestureHandlers,
): () => void {
  let gesture: GestureState | null = null;
  const pointers = new Set<number>();
  let suppressClick = false;

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointers.add(event.pointerId);
    if (pointers.size > 1) {
      gesture = null;
      return;
    }
    const interactive = isInteractiveTarget(event.target, el);
    gesture = {
      id: event.pointerId,
      pointerType: event.pointerType,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      t: event.timeStamp,
      interactive,
      noNav: isNoNavTarget(event.target, el),
      fromScreenEdge: startsAtScreenEdge(event.clientX, event.clientY),
      scrollerX: findScroller(event.target, el, "x"),
      scrollerY: findScroller(event.target, el, "y"),
      axis: null,
      scrolled: false,
    };
    if (!interactive && event.pointerType !== "mouse") {
      try {
        el.setPointerCapture(event.pointerId);
      } catch {
        /* capture is optional; pointerup still bubbles in most cases */
      }
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    const current = gesture;
    if (!current || current.id !== event.pointerId || current.interactive) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.axis && Math.hypot(dx, dy) > 10) {
      current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (current.axis === "x" && current.scrollerX) {
      current.scrollerX.scrollLeft -= event.clientX - current.lastX;
      current.scrolled = true;
    } else if (current.axis === "y" && current.scrollerY) {
      current.scrollerY.scrollTop -= event.clientY - current.lastY;
      current.scrolled = true;
    }
    current.lastX = event.clientX;
    current.lastY = event.clientY;
    if (current.pointerType !== "mouse" && event.cancelable) {
      event.preventDefault();
    }
  };

  const finish = (event: PointerEvent, commit: boolean) => {
    pointers.delete(event.pointerId);
    const current = gesture;
    if (!current || current.id !== event.pointerId) {
      if (pointers.size === 0) gesture = null;
      return;
    }
    gesture = null;
    if (!commit || current.interactive || pointers.size > 0) return;

    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    const moved = Math.hypot(dx, dy) > TAP_SLOP;
    if (current.scrolled || current.noNav) {
      if (moved) {
        suppressClick = true;
        window.setTimeout(() => {
          suppressClick = false;
        }, 450);
      }
      return;
    }

    const rect = el.getBoundingClientRect();
    const action = stageGestureAction({
      pointerType: current.pointerType,
      dx,
      dy,
      elapsedMs: event.timeStamp - current.t,
      width: rect.width,
      offsetX: event.clientX - rect.left,
      fromScreenEdge: current.fromScreenEdge,
      blockHorizontal: Boolean(current.scrollerX),
      blockVertical: Boolean(current.scrollerY),
    });
    if (moved || action !== "none") {
      suppressClick = true;
      window.setTimeout(() => {
        suppressClick = false;
      }, 450);
    }
    if (action === "advance") handlers.advance();
    else if (action === "retreat") handlers.retreat();
  };

  const onPointerUp = (event: PointerEvent) => finish(event, true);
  const onPointerCancel = (event: PointerEvent) => finish(event, false);

  const onClickCapture = (event: MouseEvent) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const onTouchMove = (event: TouchEvent) => {
    if (gesture?.interactive) return;
    if (event.cancelable) event.preventDefault();
  };

  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("pointermove", onPointerMove, { passive: false });
  el.addEventListener("pointerup", onPointerUp);
  el.addEventListener("pointercancel", onPointerCancel);
  el.addEventListener("click", onClickCapture, true);
  el.addEventListener("touchmove", onTouchMove, { passive: false });

  return () => {
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("pointerup", onPointerUp);
    el.removeEventListener("pointercancel", onPointerCancel);
    el.removeEventListener("click", onClickCapture, true);
    el.removeEventListener("touchmove", onTouchMove);
  };
}

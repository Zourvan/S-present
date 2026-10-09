"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ReactFlow,
  EdgeLabelRenderer,
  useReactFlow,
  ReactFlowProvider,
  getSmoothStepPath,
  Position,
  type Node,
  type Edge,
  type EdgeProps,
  type NodeProps,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { FlowData, FlowNode, Locale } from "@/lib/types";
import { useApp } from "@/lib/providers/AppProviders";

type Pathway = FlowNode["pathway"];

const EDGE_STROKE = "#00adc8";
const EDGE_STROKE_DIM = "rgba(0, 173, 200, 0.42)";
const DESIGN_W = 1180;
const GUTTER = 56;
const GAP_X = 64;
const GAP_Y = 54;
const TOP_PAD = 36;
const BOTTOM_PAD = 20;
const ARROW = 16;
const TOP_LANE = 12;
const LANE_DROP = 36;

type SlideFlowNodeData = {
  label: string;
  pathway?: Pathway;
  visible: boolean;
  locale: Locale;
};

type FlowEdgeData = {
  lit: boolean;
  animate: boolean;
  feedback?: boolean;
  laneY?: number;
  gutterX?: number;
  topY?: number;
};

type Box = { x: number; y: number; w: number; h: number };
type ArrowDir = "up" | "down" | "left" | "right";

function pathwayBorder(pathway?: Pathway): string {
  if (pathway === "oral") return "#d66270";
  if (pathway === "biotech") return "#7d0a1b";
  return "#00adc8";
}

function pathwayText(pathway?: Pathway): string {
  if (pathway === "oral") return "#d66270";
  if (pathway === "biotech") return "#7d0a1b";
  return "#008a9e";
}

/** Pack into 2–3 columns so long chains become multiple rows. */
function columnCount(n: number) {
  if (n <= 1) return 1;
  if (n <= 3) return n;
  if (n === 4) return 2;
  return 3;
}

function nodeHeight(label: string, width: number) {
  const chars = Math.max(10, Math.floor((width - 28) / 8.2));
  const lines = Math.min(3, Math.max(1, Math.ceil(label.length / chars)));
  return 26 + lines * 22;
}

function SlideFlowNode({ data }: NodeProps) {
  const d = data as SlideFlowNodeData;
  const style: CSSProperties = {
    opacity: d.visible ? 1 : 0.38,
    borderColor: pathwayBorder(d.pathway),
    color: pathwayText(d.pathway),
    transition: "opacity 0.35s ease",
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center rounded-xl border-[2.5px] bg-[var(--surface)] px-3 py-2 text-center shadow-sm"
      style={style}
      dir={d.locale === "fa" ? "rtl" : "ltr"}
    >
      <Handle id="left-target" type="target" position={Position.Left} isConnectable={false} className="slide-flow-handle" style={{ top: "50%" }} />
      <Handle id="left-target-a" type="target" position={Position.Left} isConnectable={false} className="slide-flow-handle" style={{ top: "32%" }} />
      <Handle id="left-target-b" type="target" position={Position.Left} isConnectable={false} className="slide-flow-handle" style={{ top: "68%" }} />
      <Handle id="left-source" type="source" position={Position.Left} isConnectable={false} className="slide-flow-handle" style={{ top: "50%" }} />
      <Handle id="right-target" type="target" position={Position.Right} isConnectable={false} className="slide-flow-handle" style={{ top: "50%" }} />
      <Handle id="right-source" type="source" position={Position.Right} isConnectable={false} className="slide-flow-handle" style={{ top: "50%" }} />
      <Handle id="right-source-a" type="source" position={Position.Right} isConnectable={false} className="slide-flow-handle" style={{ top: "32%" }} />
      <Handle id="right-source-b" type="source" position={Position.Right} isConnectable={false} className="slide-flow-handle" style={{ top: "68%" }} />
      <Handle id="top-target" type="target" position={Position.Top} isConnectable={false} className="slide-flow-handle" style={{ left: "50%" }} />
      <Handle id="top-target-a" type="target" position={Position.Top} isConnectable={false} className="slide-flow-handle" style={{ left: "32%" }} />
      <Handle id="top-target-b" type="target" position={Position.Top} isConnectable={false} className="slide-flow-handle" style={{ left: "68%" }} />
      <Handle id="top-source" type="source" position={Position.Top} isConnectable={false} className="slide-flow-handle" style={{ left: "50%" }} />
      <Handle id="bottom-target" type="target" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" style={{ left: "50%" }} />
      <Handle id="bottom-target-a" type="target" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" style={{ left: "32%" }} />
      <Handle id="bottom-target-b" type="target" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" style={{ left: "68%" }} />
      <Handle id="bottom-source" type="source" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" style={{ left: "50%" }} />
      <Handle id="bottom-source-a" type="source" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" style={{ left: "32%" }} />
      <Handle id="bottom-source-b" type="source" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" style={{ left: "68%" }} />
      <p className="text-[0.92rem] font-bold leading-snug">{d.label}</p>
    </div>
  );
}

function FlowBoundsNode() {
  return <div className="h-full w-full" />;
}

const nodeTypes = { slideFlow: SlideFlowNode, flowBounds: FlowBoundsNode };

function tipOutside(x: number, y: number, position: Position) {
  const pad = 2;
  switch (position) {
    case Position.Left:
      return { x: x - pad, y, dir: "right" as const };
    case Position.Right:
      return { x: x + pad, y, dir: "left" as const };
    case Position.Top:
      return { x, y: y - pad, dir: "down" as const };
    default:
      return { x, y: y + pad, dir: "up" as const };
  }
}

function lineEnd(x: number, y: number, dir: ArrowDir) {
  if (dir === "right") return { x: x - ARROW, y };
  if (dir === "left") return { x: x + ARROW, y };
  if (dir === "down") return { x, y: y - ARROW };
  return { x, y: y + ARROW };
}

function ArrowHead({
  x,
  y,
  dir,
  color,
}: {
  x: number;
  y: number;
  dir: ArrowDir;
  color: string;
}) {
  const s = ARROW;
  const w = s * 0.62;
  let points = "";
  if (dir === "right") points = `${x},${y} ${x - s},${y - w} ${x - s},${y + w}`;
  else if (dir === "left") points = `${x},${y} ${x + s},${y - w} ${x + s},${y + w}`;
  else if (dir === "down") points = `${x},${y} ${x - w},${y - s} ${x + w},${y - s}`;
  else points = `${x},${y} ${x - w},${y + s} ${x + w},${y + s}`;
  return <polygon points={points} fill={color} stroke={color} strokeWidth={1} />;
}

function roundedOrtho(points: Array<[number, number]>, radius: number) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const v1x = x1 - x0;
    const v1y = y1 - y0;
    const v2x = x2 - x1;
    const v2y = y2 - y1;
    const len1 = Math.hypot(v1x, v1y);
    const len2 = Math.hypot(v2x, v2y);
    if (len1 < 1 || len2 < 1) {
      d += ` L ${x1} ${y1}`;
      continue;
    }
    const r = Math.min(radius, len1 / 2, len2 / 2);
    const bx = x1 - (v1x / len1) * r;
    const by = y1 - (v1y / len1) * r;
    const ax = x1 + (v2x / len2) * r;
    const ay = y1 + (v2y / len2) * r;
    d += ` L ${bx} ${by} Q ${x1} ${y1} ${ax} ${ay}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

function EdgeStroke({
  d,
  color,
  width,
  animate,
}: {
  d: string;
  color: string;
  width: number;
  animate: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={animate ? "slide-flow-edge-motion" : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function FlowEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const edgeData = (data ?? {}) as FlowEdgeData;
  const color = edgeData.lit ? EDGE_STROKE : EDGE_STROKE_DIM;
  const animate = Boolean(edgeData.animate && edgeData.lit);

  if (edgeData.feedback) {
    const laneY = edgeData.laneY ?? Math.max(sourceY, targetY) + LANE_DROP + 20;
    const gutterX = edgeData.gutterX ?? 18;
    const topY = edgeData.topY ?? TOP_LANE;
    const tip = tipOutside(targetX, targetY, targetPosition);
    const end = lineEnd(tip.x, tip.y, tip.dir);
    const d = roundedOrtho(
      [
        [sourceX, sourceY],
        [sourceX, laneY],
        [gutterX, laneY],
        [gutterX, topY],
        [targetX, topY],
        [end.x, end.y],
      ],
      16,
    );
    const labelX = (sourceX + gutterX) / 2;
    return (
      <>
        <EdgeStroke d={d} color={color} width={3.75} animate={animate} />
        <ArrowHead x={tip.x} y={tip.y} dir={tip.dir} color={color} />
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan rounded-full border border-[#00adc8] bg-[var(--surface)] px-1.5 py-0.5 text-sm font-bold leading-none text-[#008a9e] shadow-sm"
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${laneY}px)`,
              pointerEvents: "none",
            }}
          >
            ↻
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }

  const tip = tipOutside(targetX, targetY, targetPosition);
  const end = lineEnd(tip.x, tip.y, tip.dir);
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX: end.x,
    targetY: end.y,
    targetPosition,
    borderRadius: 16,
    offset: 22,
  });

  return (
    <>
      <EdgeStroke d={path} color={color} width={3.75} animate={animate} />
      <ArrowHead x={tip.x} y={tip.y} dir={tip.dir} color={color} />
    </>
  );
}

function pickSlot(index: number, total: number): "" | "-a" | "-b" {
  if (total <= 1) return "";
  if (total === 2) return index === 0 ? "-a" : "-b";
  if (index === 0) return "-a";
  if (index === total - 1) return "-b";
  return "";
}

const edgeTypes = { flowStep: FlowEdge };

function ranksOf(ids: string[], links: Array<{ from: string; to: string }>) {
  const parents = new Map<string, string[]>();
  ids.forEach((id) => parents.set(id, []));
  for (const link of links) parents.get(link.to)?.push(link.from);
  const rank = new Map<string, number>();
  const visiting = new Set<string>();

  const rankOf = (id: string): number => {
    const known = rank.get(id);
    if (known != null) return known;
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const incoming = parents.get(id) ?? [];
    const value = incoming.length === 0 ? 0 : Math.max(...incoming.map(rankOf)) + 1;
    visiting.delete(id);
    rank.set(id, value);
    return value;
  };

  ids.forEach(rankOf);
  return rank;
}

function visualOrder(ids: string[], rtl: boolean) {
  return rtl ? [...ids].reverse() : ids;
}

function buildGraph(
  steps: Array<{ id: string; label: string; pathway?: Pathway }>,
  opts: {
    locale: Locale;
    revealStep: number;
    cycle: boolean;
    links: Array<{ from: string; to: string }>;
    animate: boolean;
  },
): { nodes: Node[]; edges: Edge[]; layoutHeight: number; rows: number } {
  const n = steps.length;
  if (n === 0) return { nodes: [], edges: [], layoutHeight: 0, rows: 0 };

  const rtl = opts.locale === "fa";
  const cols = columnCount(n);
  const inner = DESIGN_W - GUTTER * 2;
  const nodeW = Math.min(400, Math.floor((inner - (cols - 1) * GAP_X) / cols));
  const rank = ranksOf(
    steps.map((step) => step.id),
    opts.links,
  );
  const indexOf = new Map(steps.map((step, index) => [step.id, index]));
  const labelOf = new Map(steps.map((step) => [step.id, step.label]));

  const byRank = new Map<number, string[]>();
  for (const step of steps) {
    const r = rank.get(step.id) ?? 0;
    const list = byRank.get(r) ?? [];
    list.push(step.id);
    byRank.set(r, list);
  }

  const rows: string[][] = [];
  let packed: string[] = [];
  const flush = () => {
    if (!packed.length) return;
    rows.push(packed);
    packed = [];
  };

  for (const r of [...byRank.keys()].sort((a, b) => a - b)) {
    const group = byRank.get(r) ?? [];
    if (group.length > 1) {
      flush();
      for (let i = 0; i < group.length; i += cols) {
        rows.push(group.slice(i, i + cols));
      }
    } else if (group[0]) {
      if (packed.length >= cols) flush();
      packed.push(group[0]);
    }
  }
  flush();

  const boxes = new Map<string, Box>();
  let y = TOP_PAD;
  rows.forEach((row) => {
    const rowH = Math.max(
      ...row.map((id) => nodeHeight(labelOf.get(id) ?? "", nodeW)),
    );
    const order = visualOrder(row, rtl);
    const rowWidth = order.length * nodeW + (order.length - 1) * GAP_X;
    const startX = GUTTER + (inner - rowWidth) / 2;
    order.forEach((id, i) => {
      boxes.set(id, {
        x: startX + i * (nodeW + GAP_X),
        y,
        w: nodeW,
        h: rowH,
      });
    });
    y += rowH + GAP_Y;
  });

  const contentBottom = y - GAP_Y;
  const laneY = contentBottom + LANE_DROP;
  const layoutHeight = opts.cycle
    ? laneY + BOTTOM_PAD + 8
    : contentBottom + BOTTOM_PAD;

  const nodes: Node[] = [
    {
      id: "__flow_bounds",
      type: "flowBounds",
      position: { x: 0, y: 0 },
      data: {},
      draggable: false,
      selectable: false,
      connectable: false,
      focusable: false,
      zIndex: -1,
      style: {
        width: DESIGN_W,
        height: layoutHeight,
        opacity: 0,
        pointerEvents: "none",
        background: "transparent",
        border: "none",
      },
    },
    ...steps.map((step) => {
      const box = boxes.get(step.id)!;
      return {
        id: step.id,
        type: "slideFlow",
        position: { x: box.x, y: box.y },
        data: {
          label: step.label,
          pathway: step.pathway,
          visible:
            opts.revealStep > (indexOf.get(step.id) ?? 0) || opts.revealStep >= 99,
          locale: opts.locale,
        } satisfies SlideFlowNodeData,
        draggable: false,
        selectable: false,
        connectable: false,
        zIndex: 2,
        style: { width: box.w, height: box.h },
      };
    }),
  ];

  const outCount = new Map<string, number>();
  const inCount = new Map<string, number>();
  const outIndex = new Map<string, number>();
  const inIndex = new Map<string, number>();
  for (const link of opts.links) {
    outCount.set(link.from, (outCount.get(link.from) ?? 0) + 1);
    inCount.set(link.to, (inCount.get(link.to) ?? 0) + 1);
  }

  const edges: Edge[] = opts.links.map((link) => {
    const source = boxes.get(link.from);
    const target = boxes.get(link.to);
    const targetIndex = indexOf.get(link.to) ?? 0;
    const lit = opts.revealStep > targetIndex || opts.revealStep >= 99;
    const oi = outIndex.get(link.from) ?? 0;
    outIndex.set(link.from, oi + 1);
    const ii = inIndex.get(link.to) ?? 0;
    inIndex.set(link.to, ii + 1);
    const oSlot = pickSlot(oi, outCount.get(link.from) ?? 1);
    const iSlot = pickSlot(ii, inCount.get(link.to) ?? 1);

    let sourceHandle = `right-source${oSlot}`;
    let targetHandle = `left-target${iSlot}`;

    if (source && target) {
      const sameRow = Math.abs(source.y - target.y) < 4;
      if (sameRow) {
        const targetOnRight = target.x >= source.x;
        sourceHandle = targetOnRight ? `right-source${oSlot}` : `left-source`;
        targetHandle = targetOnRight ? `left-target${iSlot}` : `right-target`;
      } else if (target.y > source.y) {
        sourceHandle = `bottom-source${oSlot}`;
        targetHandle = `top-target${iSlot}`;
      } else {
        sourceHandle = `top-source`;
        targetHandle = `bottom-target${iSlot}`;
      }
    }

    return {
      id: `e-${link.from}-${link.to}`,
      source: link.from,
      target: link.to,
      sourceHandle,
      targetHandle,
      type: "flowStep",
      zIndex: 1,
      data: { lit, animate: opts.animate } satisfies FlowEdgeData,
    };
  });

  if (opts.cycle && n > 1) {
    const last = steps[n - 1].id;
    const first = steps[0].id;
    const lit = opts.revealStep > n - 1 || opts.revealStep >= 99;
    edges.push({
      id: `e-cycle-${last}-${first}`,
      source: last,
      target: first,
      sourceHandle: "bottom-source",
      targetHandle: "top-target",
      type: "flowStep",
      zIndex: 1,
      data: {
        lit,
        animate: opts.animate,
        feedback: true,
        laneY,
        gutterX: 18,
        topY: TOP_LANE,
      } satisfies FlowEdgeData,
    });
  }

  return { nodes, edges, layoutHeight, rows: rows.length };
}

function FitViewOnChange({ deps }: { deps: string }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const fit = () => {
      void fitView({ padding: 0.1, duration: 0, includeHiddenNodes: true });
    };
    const id = window.setTimeout(fit, 24);
    window.addEventListener("resize", fit);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", fit);
    };
  }, [deps, fitView]);
  return null;
}

export function SlideFlow({
  flow,
  layers,
  revealStep,
  cycle = false,
  height = 0,
  title,
}: {
  flow?: FlowData;
  layers?: string[];
  revealStep: number;
  cycle?: boolean;
  height?: number;
  title?: string;
}) {
  const { locale } = useApp();
  const hostRef = useRef<HTMLDivElement>(null);
  const [sizeKey, setSizeKey] = useState("0");
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(document.documentElement.dataset.slideExport !== "1");
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSizeKey(`${Math.round(el.clientWidth)}x${Math.round(el.clientHeight)}`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const steps = useMemo(() => {
    if (flow?.nodes?.length) {
      return flow.nodes.map((node) => ({
        id: node.id,
        label: node.label,
        pathway: node.pathway,
      }));
    }
    return (layers ?? []).map((label, i) => ({
      id: `layer-${i}`,
      label,
      pathway: "shared" as Pathway,
    }));
  }, [flow, layers]);

  const links = useMemo(() => {
    if (flow?.edges?.length) return flow.edges;
    const sequential: Array<{ from: string; to: string }> = [];
    for (let i = 0; i < steps.length - 1; i++) {
      sequential.push({ from: steps[i].id, to: steps[i + 1].id });
    }
    return sequential;
  }, [flow, steps]);

  const layout = useMemo(
    () => buildGraph(steps, { locale, revealStep, cycle, links, animate }),
    [steps, locale, revealStep, cycle, links, animate],
  );

  const canvasHeight = Math.min(
    400,
    Math.max(
      height,
      88 + layout.rows * 118 + (cycle ? 56 : 12),
      cycle ? 230 : 170,
    ),
  );

  if (!steps.length) return null;

  const heading = title ?? flow?.title;
  const depKey = `${locale}:${steps.map((s) => s.id).join("|")}:${cycle}:${canvasHeight}:${sizeKey}:${revealStep}`;

  return (
    <div className="flex w-full flex-col gap-2">
      {heading ? (
        <p className="text-center text-sm font-bold text-[var(--brand-cyan-dark)] md:text-base">
          {heading}
        </p>
      ) : null}
      <div
        ref={hostRef}
        className="slide-flow-canvas relative w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-cream)_55%,var(--surface))]"
        style={{ height: canvasHeight }}
        dir="ltr"
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={layout.nodes}
            edges={layout.edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            fitViewOptions={{ padding: 0.1, includeHiddenNodes: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            edgesFocusable={false}
            nodesFocusable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            minZoom={0.12}
            maxZoom={1.4}
            onlyRenderVisibleElements={false}
          >
            <FitViewOnChange deps={depKey} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

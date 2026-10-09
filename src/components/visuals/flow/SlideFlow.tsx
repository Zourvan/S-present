"use client";

import { useEffect, useMemo, useCallback, type CSSProperties } from "react";
import {
  ReactFlow,
  Background,
  BaseEdge,
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
const EDGE_STROKE_DIM = "rgba(0, 173, 200, 0.38)";
const DESIGN_W = 1160;
const GAP_X = 72;
const GAP_Y = 68;
const PAD = 16;
const ARROW = 13;
const LANE_DROP = 42;

type SlideFlowNodeData = {
  label: string;
  pathway?: Pathway;
  visible: boolean;
  locale: Locale;
};

type FlowEdgeData = {
  lit: boolean;
  feedback?: boolean;
  laneY?: number;
};

type Box = { x: number; y: number; w: number; h: number };

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

function columnCount(n: number) {
  if (n <= 1) return 1;
  if (n === 2 || n === 4) return 2;
  return 3;
}

function nodeHeight(label: string, width: number) {
  const chars = Math.max(14, Math.floor((width - 28) / 7.6));
  const lines = Math.min(6, Math.max(1, Math.ceil(label.length / chars)));
  return 18 + lines * 22;
}

function SlideFlowNode({ data }: NodeProps) {
  const d = data as SlideFlowNodeData;
  const border = pathwayBorder(d.pathway);
  const color = pathwayText(d.pathway);
  const style: CSSProperties = {
    opacity: d.visible ? 1 : 0.38,
    borderColor: border,
    color,
    transition: "opacity 0.35s ease",
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center rounded-xl border-[2.5px] bg-[var(--surface)] px-3 py-2 text-center shadow-sm"
      style={style}
      dir={d.locale === "fa" ? "rtl" : "ltr"}
    >
      <Handle id="left-target" type="target" position={Position.Left} isConnectable={false} className="slide-flow-handle" />
      <Handle id="left-source" type="source" position={Position.Left} isConnectable={false} className="slide-flow-handle" />
      <Handle id="right-target" type="target" position={Position.Right} isConnectable={false} className="slide-flow-handle" />
      <Handle id="right-source" type="source" position={Position.Right} isConnectable={false} className="slide-flow-handle" />
      <Handle id="top-target" type="target" position={Position.Top} isConnectable={false} className="slide-flow-handle" />
      <Handle id="top-source" type="source" position={Position.Top} isConnectable={false} className="slide-flow-handle" />
      <Handle id="bottom-target" type="target" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" />
      <Handle id="bottom-source" type="source" position={Position.Bottom} isConnectable={false} className="slide-flow-handle" />
      <p className="text-[0.92rem] font-bold leading-snug">{d.label}</p>
    </div>
  );
}

function FlowBoundsNode() {
  return <div className="h-full w-full" />;
}

const nodeTypes = { slideFlow: SlideFlowNode, flowBounds: FlowBoundsNode };

type ArrowDir = "up" | "down" | "left" | "right";

function approach(x: number, y: number, position: Position, gap: number) {
  switch (position) {
    case Position.Left:
      return { x: x - gap, y, dir: "right" as const };
    case Position.Right:
      return { x: x + gap, y, dir: "left" as const };
    case Position.Top:
      return { x, y: y - gap, dir: "down" as const };
    default:
      return { x, y: y + gap, dir: "up" as const };
  }
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
  return (
    <polygon points={points} fill={color} stroke={color} strokeWidth={1} />
  );
}

function feedbackPath(
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  laneY: number,
) {
  const y = Math.max(laneY, sy + 24, ty + 24);
  const endY = ty + ARROW;
  const dir = tx >= sx ? 1 : -1;
  const span = Math.abs(tx - sx);
  const radius = Math.min(14, span / 2 || 0, Math.max(0, (y - sy) / 2));
  if (span < 8) {
    const jog = 48 * (sx < DESIGN_W / 2 ? 1 : -1);
    return {
      d: `M ${sx} ${sy} L ${sx} ${y} L ${sx + jog} ${y} L ${tx + jog} ${endY} L ${tx} ${endY}`,
      labelX: sx + jog / 2,
      labelY: y,
    };
  }
  return {
    d: [
      `M ${sx} ${sy}`,
      `L ${sx} ${y - radius}`,
      `Q ${sx} ${y} ${sx + dir * radius} ${y}`,
      `L ${tx - dir * radius} ${y}`,
      `Q ${tx} ${y} ${tx} ${y - radius}`,
      `L ${tx} ${endY}`,
    ].join(" "),
    labelX: (sx + tx) / 2,
    labelY: y,
  };
}

function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
}: EdgeProps) {
  const edgeData = (data ?? {}) as FlowEdgeData;
  const color =
    (style?.stroke as string | undefined) ??
    (edgeData.lit ? EDGE_STROKE : EDGE_STROKE_DIM);

  if (edgeData.feedback) {
    const laneY = edgeData.laneY ?? Math.max(sourceY, targetY) + LANE_DROP;
    const back = feedbackPath(sourceX, sourceY, targetX, targetY, laneY);
    return (
      <>
        <BaseEdge
          id={id}
          path={back.d}
          style={{ stroke: color, strokeWidth: 3.25, fill: "none" }}
        />
        <ArrowHead x={targetX} y={targetY} dir="up" color={color} />
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan rounded-full border border-[#00adc8] bg-[var(--surface)] px-1.5 py-0.5 text-sm font-bold leading-none text-[#008a9e]"
            style={{
              position: "absolute",
              transform: `translate(-50%, -130%) translate(${back.labelX}px, ${back.labelY}px)`,
              pointerEvents: "none",
            }}
          >
            ↻
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }

  const end = approach(targetX, targetY, targetPosition, ARROW);
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX: end.x,
    targetY: end.y,
    targetPosition,
    borderRadius: 14,
    offset: 12,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{ stroke: color, strokeWidth: 3.5, fill: "none" }}
      />
      <ArrowHead x={targetX} y={targetY} dir={end.dir} color={color} />
    </>
  );
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
    const value =
      incoming.length === 0 ? 0 : Math.max(...incoming.map(rankOf)) + 1;
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
  },
): { nodes: Node[]; edges: Edge[]; canvasHeight: number } {
  const n = steps.length;
  if (n === 0) return { nodes: [], edges: [], canvasHeight: 0 };

  const rtl = opts.locale === "fa";
  const cols = columnCount(n);
  const nodeW = Math.min(400, Math.floor((DESIGN_W - (cols - 1) * GAP_X) / cols));
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
  let y = PAD;
  rows.forEach((row) => {
    const rowH = Math.max(
      ...row.map((id) => nodeHeight(labelOf.get(id) ?? "", nodeW)),
    );
    const order = visualOrder(row, rtl);
    const rowWidth = order.length * nodeW + (order.length - 1) * GAP_X;
    const startX = (DESIGN_W - rowWidth) / 2;
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
  const layoutHeight = (opts.cycle ? laneY + 28 : contentBottom + PAD);

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
          visible: opts.revealStep > (indexOf.get(step.id) ?? 0) || opts.revealStep >= 99,
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

  const edges: Edge[] = opts.links.map((link) => {
    const source = boxes.get(link.from);
    const target = boxes.get(link.to);
    const targetIndex = indexOf.get(link.to) ?? 0;
    const lit = opts.revealStep > targetIndex || opts.revealStep >= 99;
    let sourceHandle = "right-source";
    let targetHandle = "left-target";
    let sourcePosition = Position.Right;
    let targetPosition = Position.Left;

    if (source && target) {
      const sameRow = Math.abs(source.y - target.y) < 4;
      if (sameRow) {
        const targetOnRight = target.x >= source.x;
        sourceHandle = targetOnRight ? "right-source" : "left-source";
        targetHandle = targetOnRight ? "left-target" : "right-target";
        sourcePosition = targetOnRight ? Position.Right : Position.Left;
        targetPosition = targetOnRight ? Position.Left : Position.Right;
      } else if (target.y > source.y) {
        sourceHandle = "bottom-source";
        targetHandle = "top-target";
        sourcePosition = Position.Bottom;
        targetPosition = Position.Top;
      } else {
        sourceHandle = "top-source";
        targetHandle = "bottom-target";
        sourcePosition = Position.Top;
        targetPosition = Position.Bottom;
      }
    }

    return {
      id: `e-${link.from}-${link.to}`,
      source: link.from,
      target: link.to,
      sourceHandle,
      targetHandle,
      sourcePosition,
      targetPosition,
      type: "flowStep",
      animated: lit,
      zIndex: 1,
      data: { lit } satisfies FlowEdgeData,
      style: { stroke: lit ? EDGE_STROKE : EDGE_STROKE_DIM },
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
      targetHandle: "bottom-target",
      sourcePosition: Position.Bottom,
      targetPosition: Position.Bottom,
      type: "flowStep",
      animated: lit,
      zIndex: 3,
      data: { lit, feedback: true, laneY } satisfies FlowEdgeData,
      style: { stroke: lit ? EDGE_STROKE : EDGE_STROKE_DIM },
    });
  }

  return { nodes, edges, canvasHeight: layoutHeight };
}

function FitViewOnChange({ deps }: { deps: string }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const id = window.setTimeout(() => {
      void fitView({ padding: 0.04, duration: 0, includeHiddenNodes: true });
    }, 30);
    return () => window.clearTimeout(id);
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
    () => buildGraph(steps, { locale, revealStep, cycle, links }),
    [steps, locale, revealStep, cycle, links],
  );

  const canvasHeight = Math.min(400, Math.max(height, layout.canvasHeight));

  const onInit = useCallback(
    (instance: { fitView: (opts?: object) => void }) => {
      instance.fitView({ padding: 0.04, includeHiddenNodes: true });
    },
    [],
  );

  if (!steps.length) return null;

  const heading = title ?? flow?.title;
  const depKey = `${locale}:${steps.map((step) => step.id).join("|")}:${cycle}:${canvasHeight}`;

  return (
    <div className="flex w-full flex-col gap-2">
      {heading ? (
        <p className="text-center text-sm font-bold text-[var(--brand-cyan-dark)] md:text-base">
          {heading}
        </p>
      ) : null}
      <div
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
            onInit={onInit}
            fitView
            fitViewOptions={{ padding: 0.04, includeHiddenNodes: true }}
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
            proOptions={{ hideAttribution: true }}
            minZoom={0.2}
            maxZoom={1.5}
          >
            <Background gap={18} size={1} color="rgba(232, 213, 196, 0.85)" />
            <FitViewOnChange deps={depKey} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

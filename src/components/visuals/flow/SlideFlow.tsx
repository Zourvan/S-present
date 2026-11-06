"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Position,
  Handle,
  type Node,
  type Edge,
  type EdgeProps,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { FlowData, FlowNode, Locale } from "@/lib/types";
import { useApp } from "@/lib/providers/AppProviders";
import { toLocaleDigits } from "@/lib/i18n/digits";

type Pathway = FlowNode["pathway"];

const CYAN = "#00adc8";
const CYAN_ACTIVE = "#008a9e";
const CYAN_SOFT = "#5aa9b8";
const CYAN_SOFT_BORDER = "#6eb4c0";
const DESIGN_W = 1180;
const SIDE_PAD = 22;
const TOP_PAD = 16;
const BOTTOM_PAD = 16;
const GAP_X = 48;
const NODE_H_BASE = 112;
const NODE_H_WITH_BODY = 168;
const MAX_CANVAS_H = 460;
const MIN_CANVAS_H = 220;
const ARROW = 12;
/** Pull arrow tips/tails slightly into the card border so they read as docked. */
const EDGE_INSET = 2;

type SlideFlowNodeData = {
  label: string;
  body?: string;
  index: number;
  pathway?: Pathway;
  active: boolean;
  locale: Locale;
};

type FlowEdgeData = {
  lit: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function SlideFlowNode({ data }: NodeProps) {
  const d = data as SlideFlowNodeData;
  const active = d.active;

  return (
    <div
      className={`box-border flex h-full w-full flex-col items-center justify-center rounded-xl bg-white text-center transition-[border-color,box-shadow,color] duration-300 ${
        active
          ? "border-[2.5px] shadow-[0_6px_16px_rgba(0,138,158,0.14)]"
          : "border-2 shadow-[0_3px_10px_rgba(26,18,20,0.06)]"
      }`}
      style={{
        borderColor: active ? CYAN : CYAN_SOFT_BORDER,
        padding: d.body ? "10px 14px" : "14px 16px",
      }}
      dir={d.locale === "fa" ? "rtl" : "ltr"}
    >
      {/* Handles exist only so React Flow registers ports; edge geometry is layout-driven. */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        isConnectable={false}
        className="slide-flow-handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        isConnectable={false}
        className="slide-flow-handle"
      />

      <div className="flex max-w-full flex-col items-center justify-center gap-2 px-0.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.78em] font-extrabold leading-none text-white"
          style={{ background: active ? CYAN : CYAN_SOFT }}
        >
          {toLocaleDigits(d.index + 1, d.locale)}
        </span>
        <p
          className="w-full text-[1.05em] font-extrabold leading-[1.2] text-balance"
          style={{ color: active ? CYAN_ACTIVE : CYAN_SOFT }}
        >
          {d.label}
        </p>
        {d.body ? (
          <p
            className="w-full text-[0.7em] font-medium leading-snug text-balance"
            style={{ color: active ? "#7a6a66" : "#8aaeb6" }}
          >
            {d.body}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function FlowBoundsNode() {
  return <div className="h-full w-full" />;
}

/**
 * Geometry comes from layout constants (not measured handles) so CSS scale
 * on the design canvas cannot leave arrows floating mid-gap.
 */
function FlowEdge({ data }: EdgeProps) {
  const edge = data as FlowEdgeData | undefined;
  if (!edge) return null;

  const lit = Boolean(edge.lit);
  const color = lit ? CYAN_ACTIVE : CYAN_SOFT;
  const { x1, y1, x2, y2 } = edge;

  const tipX = x2;
  const tipY = y2;
  const shaftEndX = Math.max(x1, tipX - ARROW);
  const d = `M ${x1} ${y1} L ${shaftEndX} ${tipY}`;
  const head = `${tipX},${tipY} ${tipX - ARROW},${tipY - ARROW * 0.52} ${tipX - ARROW},${tipY + ARROW * 0.52}`;

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="butt"
      />
      <polygon points={head} fill={color} />
    </g>
  );
}

const nodeTypes = { slideFlow: SlideFlowNode, flowBounds: FlowBoundsNode };
const edgeTypes = { flowStep: FlowEdge };

type Step = {
  id: string;
  label: string;
  body?: string;
  pathway?: Pathway;
};

function buildHorizontalGraph(
  steps: Step[],
  opts: {
    locale: Locale;
    revealStep: number;
    links: Array<{ from: string; to: string }>;
  },
): { nodes: Node[]; edges: Edge[]; layoutHeight: number; layoutWidth: number } {
  const n = steps.length;
  if (n === 0) {
    return { nodes: [], edges: [], layoutHeight: 0, layoutWidth: DESIGN_W };
  }

  const hasBody = steps.some((s) => Boolean(s.body));
  const nodeH = hasBody ? NODE_H_WITH_BODY : NODE_H_BASE;
  const inner = DESIGN_W - SIDE_PAD * 2;
  const nodeW = Math.min(
    n <= 4 ? 248 : n <= 5 ? 200 : 168,
    Math.floor((inner - (n - 1) * GAP_X) / n),
  );
  const rowWidth = n * nodeW + (n - 1) * GAP_X;
  const startX = SIDE_PAD + Math.max(0, (inner - rowWidth) / 2);
  const y = TOP_PAD;
  const yMid = y + nodeH / 2;
  const layoutHeight = TOP_PAD + nodeH + BOTTOM_PAD;
  const indexOf = new Map(steps.map((step, i) => [step.id, i]));

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
    ...steps.map((step, i) => {
      const active = opts.revealStep > i || opts.revealStep >= 99;
      return {
        id: step.id,
        type: "slideFlow",
        position: { x: startX + i * (nodeW + GAP_X), y },
        data: {
          label: step.label,
          body: step.body,
          index: i,
          pathway: step.pathway,
          active,
          locale: opts.locale,
        } satisfies SlideFlowNodeData,
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        zIndex: 2,
        style: { width: nodeW, height: nodeH },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    }),
  ];

  const edges: Edge[] = opts.links.map((link) => {
    const fromIndex = indexOf.get(link.from) ?? 0;
    const toIndex = indexOf.get(link.to) ?? 0;
    const lit = opts.revealStep > toIndex || opts.revealStep >= 99;
    const x1 = startX + fromIndex * (nodeW + GAP_X) + nodeW - EDGE_INSET;
    const x2 = startX + toIndex * (nodeW + GAP_X) + EDGE_INSET;

    return {
      id: `e-${link.from}-${link.to}`,
      source: link.from,
      target: link.to,
      sourceHandle: "source",
      targetHandle: "target",
      type: "flowStep",
      zIndex: 1,
      markerEnd: undefined,
      data: {
        lit,
        x1,
        y1: yMid,
        x2,
        y2: yMid,
      } satisfies FlowEdgeData,
    };
  });

  return { nodes, edges, layoutHeight, layoutWidth: DESIGN_W };
}

export function SlideFlow({
  flow,
  layers,
  items,
  revealStep,
  height = 0,
  title,
}: {
  flow?: FlowData;
  layers?: string[];
  items?: Array<{ title: string; body?: string }>;
  revealStep: number;
  cycle?: boolean;
  height?: number;
  title?: string;
}) {
  const { locale } = useApp();
  const hostRef = useRef<HTMLDivElement>(null);
  const [hostW, setHostW] = useState(0);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => setHostW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const steps = useMemo<Step[]>(() => {
    if (flow?.nodes?.length) {
      return flow.nodes.map((node) => ({
        id: node.id,
        label: node.label,
        body: node.body,
        pathway: node.pathway,
      }));
    }
    if (items?.length) {
      return items.map((item, i) => ({
        id: `item-${i}`,
        label: item.title,
        body: item.body,
        pathway: "shared" as Pathway,
      }));
    }
    return (layers ?? []).map((label, i) => ({
      id: `layer-${i}`,
      label,
      pathway: "shared" as Pathway,
    }));
  }, [flow, layers, items]);

  const links = useMemo(() => {
    if (flow?.edges?.length) return flow.edges;
    const sequential: Array<{ from: string; to: string }> = [];
    for (let i = 0; i < steps.length - 1; i++) {
      sequential.push({ from: steps[i].id, to: steps[i + 1].id });
    }
    return sequential;
  }, [flow, steps]);

  const layout = useMemo(
    () => buildHorizontalGraph(steps, { locale, revealStep, links }),
    [steps, locale, revealStep, links],
  );

  if (!steps.length) return null;

  const heading = title ?? flow?.title;
  const maxH = height > 0 ? height : MAX_CANVAS_H;
  const scale =
    hostW > 0
      ? Math.min(
          hostW / layout.layoutWidth,
          maxH / Math.max(layout.layoutHeight, 1),
        )
      : 1;
  const displayW = Math.max(1, Math.round(layout.layoutWidth * scale));
  const displayH = Math.max(1, Math.round(layout.layoutHeight * scale));

  return (
    <div className="flex w-full flex-col gap-1.5">
      {heading ? (
        <p className="text-center text-sm font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)] md:text-base">
          {heading}
        </p>
      ) : null}
      <div
        ref={hostRef}
        className="slide-flow-canvas relative flex w-full justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-cream)_55%,white)]"
        style={{
          height: displayH,
          visibility: hostW > 0 ? "visible" : "hidden",
        }}
        dir="ltr"
      >
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: displayW, height: displayH }}
        >
          <div
            className="absolute top-0 left-0"
            style={{
              width: layout.layoutWidth,
              height: layout.layoutHeight,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <ReactFlowProvider>
              <ReactFlow
                nodes={layout.nodes}
                edges={layout.edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                style={{
                  width: layout.layoutWidth,
                  height: layout.layoutHeight,
                  background: "transparent",
                }}
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                edgesFocusable={false}
                nodesFocusable={false}
                panOnDrag={false}
                panOnScroll={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling
                minZoom={1}
                maxZoom={1}
                onlyRenderVisibleElements={false}
                defaultEdgeOptions={{ type: "flowStep" }}
              />
            </ReactFlowProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

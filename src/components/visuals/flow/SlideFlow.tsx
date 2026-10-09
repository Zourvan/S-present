"use client";

import { useEffect, useMemo, useCallback, type CSSProperties } from "react";
import {
  ReactFlow,
  Background,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  Position,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { FlowData, FlowNode, Locale } from "@/lib/types";
import { useApp } from "@/lib/providers/AppProviders";

type Pathway = FlowNode["pathway"];

type SlideFlowNodeData = {
  label: string;
  pathway?: Pathway;
  visible: boolean;
  locale: Locale;
  rtl: boolean;
};

function pathwayBorder(pathway?: Pathway): string {
  if (pathway === "oral") return "var(--oral-coral)";
  if (pathway === "biotech") return "var(--biotech-burgundy)";
  return "var(--brand-cyan)";
}

function pathwayText(pathway?: Pathway): string {
  if (pathway === "oral") return "var(--oral-coral)";
  if (pathway === "biotech") return "var(--biotech-burgundy)";
  return "var(--brand-cyan-dark)";
}

function SlideFlowNode({ data }: NodeProps) {
  const d = data as SlideFlowNodeData;
  const border = pathwayBorder(d.pathway);
  const color = pathwayText(d.pathway);
  const style: CSSProperties = {
    opacity: d.visible ? 1 : 0.28,
    borderColor: border,
    color,
    transform: d.visible ? "translateY(0)" : "translateY(6px)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  };

  // Flow leaves toward the next step: LTR → right side; RTL → left side.
  const sourcePos = d.rtl ? Position.Left : Position.Right;
  const targetPos = d.rtl ? Position.Right : Position.Left;

  return (
    <div
      className="max-w-[240px] rounded-xl border-[2.5px] bg-[var(--surface)] px-3.5 py-3 text-center shadow-sm"
      style={style}
      dir={d.locale === "fa" ? "rtl" : "ltr"}
    >
      <Handle
        type="target"
        position={targetPos}
        className="!h-2.5 !w-2.5 !border-0 !bg-[var(--brand-cyan)]"
      />
      <p className="text-[0.95rem] font-bold leading-snug">{d.label}</p>
      <Handle
        type="source"
        position={sourcePos}
        className="!h-2.5 !w-2.5 !border-0 !bg-[var(--brand-cyan)]"
      />
    </div>
  );
}

const nodeTypes = { slideFlow: SlideFlowNode };

const NODE_W = 210;
const NODE_GAP = 64;
const NODE_Y = 40;

function buildGraph(
  steps: Array<{ id: string; label: string; pathway?: Pathway }>,
  opts: {
    locale: Locale;
    revealStep: number;
    cycle: boolean;
  },
): { nodes: Node[]; edges: Edge[] } {
  const n = steps.length;
  if (n === 0) return { nodes: [], edges: [] };

  const rtl = opts.locale === "fa";
  const totalW = n * NODE_W + Math.max(0, n - 1) * NODE_GAP;
  const offsetX = -totalW / 2 + NODE_W / 2;

  const nodes: Node[] = steps.map((step, i) => {
    // EN: i=0 left. FA: i=0 right (reading order).
    const slot = rtl ? n - 1 - i : i;
    return {
      id: step.id,
      type: "slideFlow",
      position: {
        x: offsetX + slot * (NODE_W + NODE_GAP),
        y: NODE_Y,
      },
      data: {
        label: step.label,
        pathway: step.pathway,
        visible: opts.revealStep > i || opts.revealStep >= 99,
        locale: opts.locale,
        rtl,
      } satisfies SlideFlowNodeData,
      sourcePosition: rtl ? Position.Left : Position.Right,
      targetPosition: rtl ? Position.Right : Position.Left,
      draggable: false,
      selectable: false,
      connectable: false,
      style: { width: NODE_W },
    };
  });

  const edges: Edge[] = [];
  for (let i = 0; i < n - 1; i++) {
    const from = steps[i].id;
    const to = steps[i + 1].id;
    const visible = opts.revealStep > i + 1 || opts.revealStep >= 99;
    edges.push({
      id: `e-${from}-${to}`,
      source: from,
      target: to,
      type: "smoothstep",
      animated: visible,
      style: {
        stroke: "var(--brand-cyan)",
        strokeWidth: 3.5,
        opacity: visible ? 1 : 0.22,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "var(--brand-cyan)",
        width: 20,
        height: 20,
      },
    });
  }

  if (opts.cycle && n > 1) {
    const last = steps[n - 1].id;
    const first = steps[0].id;
    const visible = opts.revealStep > n - 1 || opts.revealStep >= 99;
    edges.push({
      id: `e-cycle-${last}-${first}`,
      source: last,
      target: first,
      type: "smoothstep",
      animated: visible,
      style: {
        stroke: "var(--brand-cyan)",
        strokeWidth: 2.75,
        strokeDasharray: "7 5",
        opacity: visible ? 0.95 : 0.22,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "var(--brand-cyan)",
        width: 18,
        height: 18,
      },
      label: "↻",
      labelStyle: {
        fill: "var(--brand-cyan-dark)",
        fontWeight: 700,
        fontSize: 16,
      },
      labelBgStyle: { fill: "var(--bg-ivory)", fillOpacity: 0.92 },
      labelBgPadding: [4, 6] as [number, number],
    });
  }

  return { nodes, edges };
}

function FitViewOnChange({ deps }: { deps: string }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      void fitView({ padding: 0.2, duration: 180 });
    });
    return () => cancelAnimationFrame(id);
  }, [deps, fitView]);
  return null;
}

export function SlideFlow({
  flow,
  layers,
  revealStep,
  cycle = false,
  height = 220,
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
      return flow.nodes.map((n) => ({
        id: n.id,
        label: n.label,
        pathway: n.pathway,
      }));
    }
    return (layers ?? []).map((label, i) => ({
      id: `layer-${i}`,
      label,
      pathway: "shared" as Pathway,
    }));
  }, [flow, layers]);

  const { nodes, edges } = useMemo(
    () => buildGraph(steps, { locale, revealStep, cycle }),
    [steps, locale, revealStep, cycle],
  );

  const onInit = useCallback(() => {}, []);

  if (!steps.length) return null;

  const heading = title ?? flow?.title;
  const depKey = `${locale}:${steps.map((s) => s.id).join("|")}:${cycle}:${height}:${revealStep}`;

  return (
    <div className="flex w-full flex-col gap-2">
      {heading ? (
        <p className="text-center text-sm font-bold text-[var(--brand-cyan-dark)] md:text-base">
          {heading}
        </p>
      ) : null}
      <div
        className="slide-flow-canvas relative w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-cream)_55%,var(--surface))]"
        style={{ height }}
        dir="ltr"
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onInit={onInit}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling
            proOptions={{ hideAttribution: true }}
            minZoom={0.3}
            maxZoom={1.5}
          >
            <Background
              gap={18}
              size={1}
              color="color-mix(in srgb, var(--border) 65%, transparent)"
            />
            <FitViewOnChange deps={depKey} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

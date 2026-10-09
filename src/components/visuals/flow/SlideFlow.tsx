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

/** Solid colors — SVG stroke/markers often ignore CSS variables. */
const EDGE_STROKE = "#00adc8";
const EDGE_STROKE_DIM = "rgba(0, 173, 200, 0.35)";

type SlideFlowNodeData = {
  label: string;
  pathway?: Pathway;
  visible: boolean;
  locale: Locale;
  rtl: boolean;
};

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

function SlideFlowNode({ data }: NodeProps) {
  const d = data as SlideFlowNodeData;
  const border = pathwayBorder(d.pathway);
  const color = pathwayText(d.pathway);
  const style: CSSProperties = {
    opacity: d.visible ? 1 : 0.35,
    borderColor: border,
    color,
    transition: "opacity 0.35s ease",
  };

  const sourcePos = d.rtl ? Position.Left : Position.Right;
  const targetPos = d.rtl ? Position.Right : Position.Left;

  return (
    <div
      className="relative rounded-xl border-[2.5px] bg-[var(--surface)] px-3.5 py-3 text-center shadow-sm"
      style={{ ...style, width: "100%" }}
      dir={d.locale === "fa" ? "rtl" : "ltr"}
    >
      <Handle
        id="target"
        type="target"
        position={targetPos}
        isConnectable={false}
        className="slide-flow-handle"
      />
      <p className="text-[0.95rem] font-bold leading-snug">{d.label}</p>
      <Handle
        id="source"
        type="source"
        position={sourcePos}
        isConnectable={false}
        className="slide-flow-handle"
      />
    </div>
  );
}

const nodeTypes = { slideFlow: SlideFlowNode };

const NODE_W = 200;
const NODE_GAP = 72;
const NODE_Y = 36;

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
    // Show arrow once the destination step is revealed (or always dimly)
    const lit = opts.revealStep > i + 1 || opts.revealStep >= 99;
    edges.push({
      id: `e-${from}-${to}`,
      source: from,
      target: to,
      sourceHandle: "source",
      targetHandle: "target",
      type: "smoothstep",
      animated: lit,
      zIndex: 10,
      style: {
        stroke: lit ? EDGE_STROKE : EDGE_STROKE_DIM,
        strokeWidth: 4,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 22,
        height: 22,
        color: lit ? EDGE_STROKE : EDGE_STROKE_DIM,
      },
    });
  }

  if (opts.cycle && n > 1) {
    const last = steps[n - 1].id;
    const first = steps[0].id;
    const lit = opts.revealStep > n - 1 || opts.revealStep >= 99;
    edges.push({
      id: `e-cycle-${last}-${first}`,
      source: last,
      target: first,
      sourceHandle: "source",
      targetHandle: "target",
      type: "smoothstep",
      animated: lit,
      zIndex: 10,
      style: {
        stroke: lit ? EDGE_STROKE : EDGE_STROKE_DIM,
        strokeWidth: 3.5,
        strokeDasharray: "8 5",
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: lit ? EDGE_STROKE : EDGE_STROKE_DIM,
      },
      label: "↻",
      labelStyle: {
        fill: "#008a9e",
        fontWeight: 700,
        fontSize: 16,
      },
      labelBgStyle: { fill: "#fff9f2", fillOpacity: 0.95 },
      labelBgPadding: [4, 6] as [number, number],
    });
  }

  return { nodes, edges };
}

function FitViewOnChange({ deps }: { deps: string }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const id = window.setTimeout(() => {
      void fitView({ padding: 0.22, duration: 160, includeHiddenNodes: true });
    }, 40);
    return () => window.clearTimeout(id);
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

  const onInit = useCallback(
    (instance: { fitView: (opts?: object) => void }) => {
      instance.fitView({ padding: 0.22, includeHiddenNodes: true });
    },
    [],
  );

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
            fitViewOptions={{ padding: 0.22, includeHiddenNodes: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            edgesFocusable={false}
            nodesFocusable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling
            proOptions={{ hideAttribution: true }}
            minZoom={0.25}
            maxZoom={1.6}
            defaultEdgeOptions={{
              type: "smoothstep",
              style: { stroke: EDGE_STROKE, strokeWidth: 4 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: EDGE_STROKE,
                width: 22,
                height: 22,
              },
            }}
          >
            <Background
              gap={18}
              size={1}
              color="rgba(232, 213, 196, 0.85)"
            />
            <FitViewOnChange deps={depKey} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

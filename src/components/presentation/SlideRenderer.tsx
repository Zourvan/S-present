"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale, Slide } from "@/lib/types";
import { TOTAL_SLIDES } from "@/lib/slides";
import { formatSystemDate } from "@/lib/system-date";
import { REFERENCES, REFERENCE_DATE } from "@/lib/references";
import { useApp } from "@/lib/providers/AppProviders";
import { PathwayLegend } from "@/components/ui/PathwayBadge";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { RevealItem } from "@/components/visuals/Reveal";
import { ComparisonTable } from "@/components/visuals/ComparisonTable";
import { ProcessFlow, SplitPathways } from "@/components/visuals/ProcessFlow";
import {
  MonitoringChart,
  RiskMatrixVisual,
  KpiDashboard,
} from "@/components/visuals/Charts";
import { RoadmapGantt } from "@/components/visuals/Roadmap";
import {
  CycleDiagram,
  HierarchyLayers,
  OverviewGrid,
  TaxonomyAxes,
  ResponsibilityMatrix,
  DecisionTree,
} from "@/components/visuals/Diagrams";
import { DeviationVisual } from "@/components/visuals/DeviationVisuals";
import { SlideFlow } from "@/components/visuals/flow/SlideFlow";
import { toLocaleDigits } from "@/lib/i18n/digits";

const CITATION_PREVIEW = 2;
const LIBRARY_PREVIEW = 6;
/** Grow ceiling so sparse slides fill the frame without looking sparse. */
const FIT_SCALE_MAX = 1.55;

function useSystemDate(locale: Locale): string {
  return useSyncExternalStore(
    () => () => {},
    () => formatSystemDate(new Date(), locale),
    () => "",
  );
}

function BulletList({
  items,
  revealStep,
  startIndex = 0,
}: {
  items: string[];
  revealStep: number;
  startIndex?: number;
}) {
  return (
    <ul className="space-y-2.5 pe-1 sm:space-y-3">
      {items.map((item, i) => (
        <RevealItem key={item} index={startIndex + i} revealStep={revealStep}>
          <li className="flex gap-3 text-[1.15em] font-semibold leading-snug sm:text-[1.2em]">
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
            <span className="min-w-0">{item}</span>
          </li>
        </RevealItem>
      ))}
    </ul>
  );
}

/**
 * Fits body content to the slide frame: grows sparse slides, shrinks dense ones,
 * top-aligned, never scrolls inside the canvas.
 */
function SlideBodyFit({
  fitKey,
  children,
}: {
  fitKey: string;
  children: ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = outer.clientHeight;
        const zoomNow = Number.parseFloat(inner.style.zoom || "1") || 1;
        // zoom changes reported scrollHeight — recover natural size
        const needed = inner.scrollHeight / zoomNow;
        if (available <= 0 || needed <= 0) {
          setScale(1);
          return;
        }
        const raw = available / needed;
        // Grow up to MAX; when shrinking, allow below FIT_SCALE_MIN so content never clips.
        const next =
          raw >= 1
            ? Math.min(FIT_SCALE_MAX, raw)
            : Math.max(0.52, raw);
        setScale((prev) => (Math.abs(prev - next) < 0.01 ? prev : next));
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [fitKey]);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.zoom = String(scale);
  }, [scale]);

  return (
    <div
      ref={outerRef}
      className="relative min-h-0 w-full flex-1 overflow-hidden"
    >
      <div
        ref={innerRef}
        className="w-full"
        data-fit-scale={scale.toFixed(3)}
      >
        {children}
      </div>
    </div>
  );
}

function SlideChrome({ slide }: { slide: Slide }) {
  const { strings, locale } = useApp();
  const brandName = locale === "fa" ? strings.brandFa : strings.brand;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-3">
      <div className="flex items-center gap-2">
        <BrandLogo size="chrome" />
        <span className="text-xs font-bold tracking-wide text-[var(--brand-cyan)]">
          {brandName}
        </span>
      </div>
      <span className="rounded bg-[var(--bg-cream)] px-2 py-0.5 text-xs font-bold text-[var(--text-ink)]">
        {toLocaleDigits(String(slide.number).padStart(2, "0"), locale)} /{" "}
        {toLocaleDigits(String(TOTAL_SLIDES).padStart(2, "0"), locale)}
      </span>
    </div>
  );
}

function CitationFooter({ refs }: { refs?: string[] }) {
  const { strings } = useApp();
  const [expanded, setExpanded] = useState(false);
  if (!refs?.length) return null;

  const resolved = refs
    .map((id) => ({ id, ref: REFERENCES.find((r) => r.id === id) }))
    .filter((x) => x.ref);
  const hasMore = resolved.length > CITATION_PREVIEW;
  const visible = expanded ? resolved : resolved.slice(0, CITATION_PREVIEW);

  return (
    <div
      className="relative mt-auto shrink-0 border-t border-[var(--border)] pt-1.5"
      data-no-nav
    >
      <div className="flex h-7 items-center gap-2 overflow-hidden">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-[11px] font-medium">
          {visible.map(({ id, ref }) => (
            <a
              key={id}
              href={ref!.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto shrink-0 truncate text-[var(--brand-cyan)] underline-offset-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              [{id}] {ref!.name}
            </a>
          ))}
        </div>
        {hasMore ? (
          <button
            type="button"
            className="pointer-events-auto shrink-0 rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--brand-cyan-dark)] hover:border-[var(--brand-cyan)]"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
          >
            {expanded ? strings.fewerReferences : strings.moreReferences}
          </button>
        ) : null}
      </div>
      {expanded && hasMore ? (
        <div
          className="absolute inset-x-0 bottom-full z-20 mb-1 max-h-40 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg"
          data-no-nav
        >
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {resolved.map(({ id, ref }) => (
              <a
                key={id}
                href={ref!.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold hover:border-[var(--brand-cyan)]"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="font-bold text-[var(--brand-cyan)]">[{id}]</span>{" "}
                {ref!.name}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ReferenceLibraryPanel() {
  const { strings } = useApp();
  const [expanded, setExpanded] = useState(false);
  const hasMore = REFERENCES.length > LIBRARY_PREVIEW;
  const visible = expanded
    ? REFERENCES
    : REFERENCES.slice(0, LIBRARY_PREVIEW);

  return (
    <div data-no-nav>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold uppercase text-[var(--text-ink)]">
          {strings.referenceLibrary} · {strings.verifiedReferenceDate}:{" "}
          {REFERENCE_DATE}
        </p>
        {hasMore ? (
          <button
            type="button"
            className="rounded border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-bold text-[var(--brand-cyan-dark)] hover:border-[var(--brand-cyan)]"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
          >
            {expanded ? strings.fewerReferences : strings.moreReferences}
          </button>
        ) : null}
      </div>
      <div
        className={`grid grid-cols-2 gap-1 overflow-hidden transition-[max-height] ${
          expanded ? "max-h-[200px] overflow-y-auto" : "max-h-[7.5rem]"
        }`}
      >
        {visible.map((r) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[11px] font-semibold leading-snug hover:border-[var(--brand-cyan)]"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-bold text-[var(--brand-cyan)]">[{r.id}]</span>{" "}
            {r.name}
          </a>
        ))}
      </div>
    </div>
  );
}

function VisualBlock({
  slide,
  revealStep,
}: {
  slide: Slide;
  revealStep: number;
}) {
  const { strings, locale } = useApp();
  const vd = slide.visualData ?? {};
  const brandName = locale === "fa" ? strings.brandFa : strings.brand;
  const systemDate = useSystemDate(locale);

  switch (slide.visualType) {
    case "titleHero": {
      const hasPathways =
        (vd.leftSteps?.length ?? 0) > 0 || (vd.rightSteps?.length ?? 0) > 0;
      const supporting = vd.supporting ?? slide.content;
      return (
        <div className="flex h-full flex-col justify-center gap-2.5">
          <RevealItem index={0} revealStep={revealStep}>
            <div className="text-center">
              <BrandLogo
                size="hero"
                priority
                className="mx-auto mb-2 drop-shadow-sm"
              />
              <h1 className="text-[1.75em] font-bold leading-tight tracking-tight text-[var(--text-ink)]">
                {slide.title}
              </h1>
              <p className="mx-auto mt-1 max-w-3xl text-[0.95em] font-medium leading-snug text-[var(--text-muted)]">
                {vd.subtitle ?? slide.keyMessage}
              </p>
              {vd.presenter ? (
                <p className="mt-1.5 text-sm font-medium text-[var(--text-muted)]">
                  {vd.presenter.name}
                  {vd.presenter.role ? ` · ${vd.presenter.role}` : ""}
                </p>
              ) : null}
              <p className="mt-1.5 text-base font-semibold text-[var(--brand-cyan)]">
                {systemDate ? `${systemDate} · ${brandName}` : brandName}
              </p>
            </div>
          </RevealItem>
          {hasPathways ? (
            <>
              <RevealItem index={1} revealStep={revealStep}>
                <div className="flex justify-center">
                  <PathwayLegend />
                </div>
              </RevealItem>
              <RevealItem index={2} revealStep={revealStep}>
                <SplitPathways
                  leftTitle={vd.leftTitle}
                  rightTitle={vd.rightTitle}
                  leftSteps={vd.leftSteps}
                  rightSteps={vd.rightSteps}
                  shared={vd.shared}
                  revealStep={Math.max(revealStep, 3)}
                  compact
                />
              </RevealItem>
            </>
          ) : supporting.length ? (
            <RevealItem index={1} revealStep={revealStep}>
              <ul className="mx-auto mt-1 max-w-2xl space-y-1.5 text-center text-[0.95em] font-medium text-[var(--text-ink)]">
                {supporting.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RevealItem>
          ) : null}
        </div>
      );
    }

    case "presenter": {
      const p = vd.presenter;
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <BrandLogo size="presenter" className="drop-shadow-md" />
          <h1 className="text-2xl font-bold">{strings.presenter}</h1>
          <div className="grid w-full max-w-xl gap-3">
            {[
              { label: strings.name, value: p?.name },
              { label: strings.role, value: p?.role },
            ].map((row, i) => (
              <RevealItem key={row.label} index={i} revealStep={revealStep}>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-start">
                  <p className="text-xs font-bold uppercase text-[var(--brand-cyan-dark)] md:text-sm">
                    {row.label}
                  </p>
                  <p className="text-xl font-bold md:text-2xl">{row.value}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      );
    }

    case "thanksQa": {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <BrandLogo size="thanks" className="drop-shadow-sm" />
          <RevealItem index={0} revealStep={revealStep}>
            <h1 className="text-3xl font-bold text-[var(--brand-cyan)]">
              {strings.thanks}
            </h1>
          </RevealItem>
          <RevealItem index={1} revealStep={revealStep}>
            <p className="text-xl font-semibold">{strings.questions}</p>
          </RevealItem>
          {vd.closing ? (
            <RevealItem index={2} revealStep={revealStep}>
              <p className="max-w-2xl text-sm italic text-[var(--text-muted)]">
                “{vd.closing}”
              </p>
            </RevealItem>
          ) : null}
          {vd.questions?.length ? (
            <ul className="mt-2 space-y-1.5 text-start text-sm font-medium md:text-base">
              {vd.questions.map((q, i) => (
                <RevealItem key={q} index={i + 2} revealStep={revealStep}>
                  <li>• {q}</li>
                </RevealItem>
              ))}
            </ul>
          ) : null}
        </div>
      );
    }

    case "references":
      return (
        <div className="flex w-full flex-col justify-center gap-2.5">
          {vd.takeaways?.length ? (
            <div>
              <p className="mb-1 text-sm font-bold uppercase text-[var(--brand-cyan-dark)]">
                {strings.keyTakeaways}
              </p>
              <BulletList items={vd.takeaways} revealStep={revealStep} />
            </div>
          ) : null}
          {vd.closing ? (
            <RevealItem
              index={vd.takeaways?.length ?? 0}
              revealStep={revealStep}
            >
              <p className="rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2.5 text-sm font-medium italic md:text-base">
                “{vd.closing}”
              </p>
            </RevealItem>
          ) : null}
          <RevealItem
            index={(vd.takeaways?.length ?? 0) + 1}
            revealStep={revealStep}
          >
            <ReferenceLibraryPanel />
          </RevealItem>
        </div>
      );

    case "comparisonTable":
      return vd.table ? (
        <div className="flex h-full min-h-0 w-full flex-col gap-2">
          <ComparisonTable
            table={vd.table}
            revealStep={revealStep}
            fill
          />
          {vd.callout ? (
            <RevealItem
              index={vd.table.rows.length}
              revealStep={revealStep}
            >
              <div className="shrink-0 rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2 text-sm font-semibold md:text-base">
                {vd.callout}
              </div>
            </RevealItem>
          ) : null}
        </div>
      ) : null;

    case "flow":
    case "processSteps":
      return (
        <div className="flex h-full min-h-0 w-full flex-col gap-3">
          {vd.flow ? (
            <div className="shrink-0">
              <ProcessFlow flow={vd.flow} revealStep={revealStep} />
            </div>
          ) : vd.items ? (
            <OverviewGrid items={vd.items} revealStep={revealStep} />
          ) : (
            <BulletList items={slide.content} revealStep={revealStep} />
          )}
          {slide.content.length && vd.flow ? (
            <ul className="grid min-h-0 grid-cols-1 gap-1.5 sm:grid-cols-2">
              {slide.content.map((item, i) => (
                <RevealItem
                  key={item}
                  index={vd.flow!.nodes.length + i}
                  revealStep={revealStep}
                >
                  <li className="flex gap-2 text-[0.9em] font-medium leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
                    <span className="min-w-0">{item}</span>
                  </li>
                </RevealItem>
              ))}
            </ul>
          ) : null}
          {vd.callout ? (
            <RevealItem
              index={
                (vd.flow?.nodes.length ?? 0) +
                (vd.flow && slide.content.length ? slide.content.length : 0)
              }
              revealStep={revealStep}
            >
              <div className="mt-auto shrink-0 rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2 text-[0.95em] font-semibold leading-snug">
                {vd.callout}
              </div>
            </RevealItem>
          ) : null}
        </div>
      );

    case "splitPathways":
      return (
        <div className="flex w-full flex-col justify-center">
          <SplitPathways
            leftTitle={vd.leftTitle}
            rightTitle={vd.rightTitle}
            leftSteps={vd.leftSteps}
            rightSteps={vd.rightSteps}
            shared={vd.shared}
            revealStep={revealStep}
          />
        </div>
      );

    case "overviewGrid":
      return (
        <div className="flex h-full flex-col justify-center">
          <OverviewGrid
            items={vd.items ?? slide.content.map((c) => ({ title: c }))}
            revealStep={revealStep}
          />
        </div>
      );

    case "taxonomy":
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          {vd.axes ? (
            <TaxonomyAxes
              axes={vd.axes}
              callout={vd.callout}
              revealStep={revealStep}
            />
          ) : (
            <OverviewGrid
              items={vd.items ?? slide.content.map((c) => ({ title: c }))}
              revealStep={revealStep}
            />
          )}
          {vd.callout ? (
            <RevealItem index={6} revealStep={revealStep}>
              <div className="rounded-md border-s-4 border-[var(--oral-coral)] bg-[var(--oral-coral)]/10 px-3 py-2.5 text-sm font-semibold md:text-base">
                {vd.callout}
              </div>
            </RevealItem>
          ) : null}
          <div className="flex justify-center">
            <PathwayLegend />
          </div>
        </div>
      );

    case "cycle":
      return (
        <div className="flex w-full flex-col gap-2.5">
          {vd.layers?.length ? (
            <CycleDiagram layers={vd.layers} revealStep={revealStep} />
          ) : vd.items?.length ? (
            <CycleDiagram
              layers={vd.items.map((item) => item.title)}
              revealStep={revealStep}
            />
          ) : null}
          {vd.callout ? (
            <div className="rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2 text-[0.95em] font-semibold leading-snug">
              {vd.callout}
            </div>
          ) : null}
        </div>
      );

    case "lifecycle":
      return (
        <div className="flex h-full min-h-0 w-full flex-col gap-3">
          {vd.items?.length ? (
            <SlideFlow
              revealStep={revealStep}
              items={vd.items.map((item) => ({
                title: item.title,
                body: item.body,
              }))}
            />
          ) : vd.layers?.length ? (
            <SlideFlow layers={vd.layers} revealStep={revealStep} />
          ) : vd.flow ? (
            <ProcessFlow flow={vd.flow} revealStep={revealStep} />
          ) : null}
          {slide.content.length ? (
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {slide.content.map((item, i) => (
                <RevealItem key={item} index={i + (vd.items?.length ?? 0)} revealStep={revealStep}>
                  <li className="flex gap-2 text-[0.9em] font-medium leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
                    <span className="min-w-0">{item}</span>
                  </li>
                </RevealItem>
              ))}
            </ul>
          ) : null}
          {vd.callout ? (
            <div className="mt-auto shrink-0 rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2 text-[0.95em] font-semibold leading-snug">
              {vd.callout}
            </div>
          ) : null}
        </div>
      );

    case "relationship":
      return (
        <div className="flex h-full min-h-0 w-full flex-col gap-2">
          {vd.items?.length ? (
            <OverviewGrid
              items={vd.items}
              revealStep={revealStep}
              compact
              fill
            />
          ) : null}
          {vd.flow ? (
            <ProcessFlow flow={vd.flow} revealStep={revealStep} />
          ) : null}
          {vd.callout ? (
            <div className="shrink-0 rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2 text-[0.85em] font-semibold leading-snug">
              {vd.callout}
            </div>
          ) : null}
        </div>
      );

    case "hierarchy":
      return (
        <div className="flex h-full flex-col justify-center">
          <HierarchyLayers
            layers={vd.layers ?? slide.content}
            revealStep={revealStep}
          />
        </div>
      );

    case "riskMatrix":
      return (
        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <RiskMatrixVisual revealStep={revealStep} />
        </div>
      );

    case "responsibilityMatrix":
      return (
        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <ResponsibilityMatrix matrix={vd.matrix} revealStep={revealStep} />
        </div>
      );

    case "decisionTree":
    case "investigation":
      return (
        <div className="flex w-full flex-col justify-center">
          <DecisionTree
            items={vd.items ?? slide.content.map((c) => ({ title: c }))}
            revealStep={revealStep}
          />
        </div>
      );

    case "monitoringChart":
      return (
        <div className="flex w-full flex-col justify-center gap-2 sm:gap-3">
          <div className="shrink-0">
            <MonitoringChart
              labels={vd.chart?.labels ?? ["W1", "W2", "W3", "W4", "W5", "W6"]}
              series={vd.chart?.series ?? [12, 14, 11, 22, 13, 12]}
              excursionIndexes={vd.chart?.excursionIndexes ?? [3]}
              note={vd.chart?.note}
              revealStep={revealStep}
            />
          </div>
          {slide.content.length > 0 ? (
            <BulletList
              items={slide.content}
              revealStep={revealStep}
              startIndex={1}
            />
          ) : null}
        </div>
      );

    case "dashboard":
      return (
        <div className="flex w-full flex-col justify-center">
          <KpiDashboard
            kpis={vd.kpis}
            maturityLevels={vd.maturityLevels}
            revealStep={revealStep}
          />
        </div>
      );

    case "roadmap":
      return (
        <div className="flex h-full min-h-0 flex-col justify-center">
          <RoadmapGantt phases={vd.phases} revealStep={revealStep} />
        </div>
      );

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
      return (
        <DeviationVisual
          type={slide.visualType}
          data={vd}
          revealStep={revealStep}
        />
      );

    case "callout":
      return (
        <div className="flex w-full flex-col gap-4">
          <BulletList items={slide.content} revealStep={revealStep} />
          {vd.callout ? (
            <RevealItem index={slide.content.length} revealStep={revealStep}>
              <div className="rounded-md border-s-4 border-[var(--oral-coral)] bg-[var(--oral-coral)]/10 px-3.5 py-2.5 text-[1.05em] font-semibold leading-snug">
                {vd.callout}
              </div>
            </RevealItem>
          ) : null}
        </div>
      );

    case "bullets":
    default:
      return (
        <div className="flex w-full flex-col gap-4">
          <BulletList items={slide.content} revealStep={revealStep} />
          {vd.table ? (
            <ComparisonTable table={vd.table} revealStep={revealStep} />
          ) : null}
          {vd.flow ? (
            <ProcessFlow flow={vd.flow} revealStep={revealStep} />
          ) : null}
          {vd.callout ? (
            <div className="rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3.5 py-2.5 text-[1.05em] font-semibold leading-snug">
              {vd.callout}
            </div>
          ) : null}
        </div>
      );
  }
}

export function SlideRenderer({
  slide,
  revealStep,
  compact = false,
}: {
  slide: Slide;
  revealStep: number;
  compact?: boolean;
}) {
  const { strings, typeScale, locale } = useApp();
  const isSpecial =
    slide.visualType === "titleHero" ||
    slide.visualType === "presenter" ||
    slide.visualType === "thanksQa";

  const fillBody = useMemo(
    () =>
      slide.visualType === "riskMatrix" ||
      slide.visualType === "responsibilityMatrix" ||
      slide.visualType === "roadmap" ||
      slide.visualType === "overviewGrid" ||
      slide.visualType === "hierarchy" ||
      slide.visualType === "taxonomy" ||
      slide.visualType === "comparisonTable" ||
      slide.visualType === "relationship" ||
      slide.visualType === "lifecycle" ||
      slide.visualType === "processSteps" ||
      slide.visualType === "flow",
    [slide.visualType],
  );

  const fitKey = `${slide.id}:${revealStep}:${typeScale}:${locale}:${compact ? "c" : "f"}`;

  return (
    <article
      className={`slide-stage relative flex h-full w-full flex-col overflow-hidden rounded-xl px-6 pb-3 ${
        compact ? "pt-4" : isSpecial ? "pt-5" : "pt-14"
      }`}
      data-slide-id={slide.id}
      style={{ width: "var(--slide-w)", height: "var(--slide-h)" }}
    >
      {!isSpecial ? <SlideChrome slide={slide} /> : null}

      {!isSpecial ? (
        <header className="mb-2 shrink-0 text-start">
          <h2 className="text-[1.4em] font-bold leading-tight tracking-tight">
            {slide.title}
          </h2>
          {slide.keyMessage ? (
            <div className="mt-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <p className="text-[0.7em] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
                {strings.keyMessage}
              </p>
              <p className="mt-0.5 text-[0.95em] font-medium leading-snug text-[var(--text-muted)]">
                {slide.keyMessage}
              </p>
            </div>
          ) : null}
        </header>
      ) : null}

      {isSpecial ? (
        <div className="min-h-0 w-full flex-1 overflow-hidden">
          <VisualBlock slide={slide} revealStep={revealStep} />
        </div>
      ) : fillBody ? (
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
          <VisualBlock slide={slide} revealStep={revealStep} />
        </div>
      ) : (
        <SlideBodyFit fitKey={fitKey}>
          <VisualBlock slide={slide} revealStep={revealStep} />
        </SlideBodyFit>
      )}

      {!isSpecial ? <CitationFooter refs={slide.references} /> : null}
    </article>
  );
}

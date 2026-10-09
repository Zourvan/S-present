"use client";

import { useEffect, useMemo, useState } from "react";
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
import { toLocaleDigits } from "@/lib/i18n/digits";

const CITATION_PREVIEW = 2;
const LIBRARY_PREVIEW = 6;

function useSystemDate(locale: Locale): string {
  const [label, setLabel] = useState("");
  useEffect(() => {
    setLabel(formatSystemDate(new Date(), locale));
  }, [locale]);
  return label;
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
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <RevealItem key={item} index={startIndex + i} revealStep={revealStep}>
          <li className="flex gap-2.5 text-[1.1rem] font-medium leading-relaxed">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
            <span>{item}</span>
          </li>
        </RevealItem>
      ))}
    </ul>
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
    case "titleHero":
      return (
        <div className="flex h-full flex-col justify-center gap-2.5">
          <RevealItem index={0} revealStep={revealStep}>
            <div className="text-center">
              <BrandLogo
                size="hero"
                priority
                className="mx-auto mb-2 drop-shadow-sm"
              />
              <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-[var(--text-ink)]">
                {slide.title}
              </h1>
              <p className="mx-auto mt-1 max-w-3xl text-[0.95rem] font-medium leading-snug text-[var(--text-muted)]">
                {vd.subtitle ?? slide.keyMessage}
              </p>
              <p className="mt-1.5 text-base font-semibold text-[var(--brand-cyan)]">
                {systemDate ? `${systemDate} · ${brandName}` : brandName}
              </p>
            </div>
          </RevealItem>
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
        </div>
      );

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
        <div className="flex h-full flex-col justify-center gap-3">
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
        <div className="flex h-full flex-col justify-center">
          <ComparisonTable table={vd.table} revealStep={revealStep} />
        </div>
      ) : null;

    case "flow":
    case "processSteps":
      return (
        <div className="flex h-full flex-col justify-center">
          {vd.flow ? (
            <ProcessFlow flow={vd.flow} revealStep={revealStep} />
          ) : vd.items ? (
            <OverviewGrid items={vd.items} revealStep={revealStep} />
          ) : (
            <BulletList items={slide.content} revealStep={revealStep} />
          )}
        </div>
      );

    case "splitPathways":
      return (
        <div className="flex h-full flex-col justify-center">
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
    case "lifecycle":
    case "relationship":
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          {(vd.layers?.length || slide.content.length) && !vd.flow ? (
            <CycleDiagram
              layers={vd.layers ?? slide.content}
              revealStep={revealStep}
            />
          ) : null}
          {vd.items ? (
            <OverviewGrid items={vd.items} revealStep={revealStep} />
          ) : null}
          {vd.flow ? (
            <ProcessFlow flow={vd.flow} revealStep={revealStep} />
          ) : null}
          {vd.callout ? (
            <div className="rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2.5 text-sm font-semibold md:text-base">
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
        <div className="flex h-full flex-col justify-center">
          <DecisionTree
            items={vd.items ?? slide.content.map((c) => ({ title: c }))}
            revealStep={revealStep}
          />
        </div>
      );

    case "monitoringChart":
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          <MonitoringChart
            labels={vd.chart?.labels ?? ["W1", "W2", "W3", "W4", "W5", "W6"]}
            series={vd.chart?.series ?? [12, 14, 11, 22, 13, 12]}
            excursionIndexes={vd.chart?.excursionIndexes ?? [3]}
            note={vd.chart?.note}
            revealStep={revealStep}
          />
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
        <div className="flex h-full flex-col justify-center">
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
        <div className="flex h-full flex-col justify-center gap-3">
          <BulletList items={slide.content} revealStep={revealStep} />
          {vd.callout ? (
            <RevealItem index={slide.content.length} revealStep={revealStep}>
              <div className="rounded-md border-s-4 border-[var(--oral-coral)] bg-[var(--oral-coral)]/10 px-3 py-2.5 text-sm font-semibold md:text-base">
                {vd.callout}
              </div>
            </RevealItem>
          ) : null}
        </div>
      );

    case "bullets":
    default:
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          <BulletList items={slide.content} revealStep={revealStep} />
          {vd.table ? (
            <ComparisonTable table={vd.table} revealStep={revealStep} />
          ) : null}
          {vd.flow ? (
            <ProcessFlow flow={vd.flow} revealStep={revealStep} />
          ) : null}
          {vd.callout ? (
            <div className="rounded-md border-s-4 border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 px-3 py-2.5 text-sm font-semibold md:text-base">
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
  const { strings } = useApp();
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
      slide.visualType === "taxonomy",
    [slide.visualType],
  );

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
          <h2 className="text-[1.35rem] font-bold leading-tight tracking-tight">
            {slide.title}
          </h2>
          {slide.keyMessage ? (
            <div className="mt-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <p className="text-[0.7rem] font-bold uppercase tracking-wide text-[var(--brand-cyan-dark)]">
                {strings.keyMessage}
              </p>
              <p className="mt-0.5 text-[0.9rem] font-medium leading-snug text-[var(--text-muted)]">
                {slide.keyMessage}
              </p>
            </div>
          ) : null}
        </header>
      ) : null}

      <div
        className={`min-h-0 flex-1 overflow-hidden ${
          fillBody ? "flex flex-col" : ""
        }`}
      >
        <VisualBlock slide={slide} revealStep={revealStep} />
      </div>

      {!isSpecial ? <CitationFooter refs={slide.references} /> : null}
    </article>
  );
}

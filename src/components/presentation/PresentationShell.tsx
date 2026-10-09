"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type WheelEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SLIDES, TOTAL_SLIDES, getSlidesGroupedBySection } from "@/lib/slides";
import { getMaxReveal } from "@/lib/slides/helpers";
import { resolveSlide, resolveSlides } from "@/lib/slides/resolve";
import { useApp } from "@/lib/providers/AppProviders";
import { ChromeButton } from "@/components/ui/ChromeButton";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SlideRenderer } from "./SlideRenderer";
import { SlideStage } from "./SlideStage";
import { exportPresentationPdf } from "@/lib/export/pdf";
import { exportPresentationPptx } from "@/lib/export/pptx";
import { usePrefersReducedMotion } from "@/components/visuals/Reveal";
import { fromLocaleDigits, toLocaleDigits } from "@/lib/i18n/digits";
import {
  TYPE_SCALE_MAX,
  TYPE_SCALE_MIN,
} from "@/lib/providers/AppProviders";

export function PresentationShell() {
  const {
    strings,
    locale,
    theme,
    toggleLocale,
    toggleTheme,
    typeScale,
    textBold,
    bumpTypeScale,
    toggleTextBold,
  } = useApp();
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [revealStep, setRevealStep] = useState(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [exporting, setExporting] = useState<"pdf" | "pptx" | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(1);
  const [jumpValue, setJumpValue] = useState("1");
  const wheelLock = useRef(false);

  const slide = useMemo(() => {
    const base = SLIDES[index];
    return base ? resolveSlide(base, locale) : undefined;
  }, [index, locale]);
  const maxReveal = slide ? getMaxReveal(slide) : 1;
  const groups = useMemo(() => getSlidesGroupedBySection(), []);
  const presenterName = useMemo(() => {
    const source = SLIDES.find((item) => item.id === "s01-presenter");
    if (!source) return "";
    return resolveSlide(source, locale).visualData?.presenter?.name ?? "";
  }, [locale]);

  useEffect(() => {
    setJumpValue(toLocaleDigits(index + 1, locale));
  }, [index, locale]);

  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, nextIndex));
      setDirection(clamped >= index ? 1 : -1);
      setIndex(clamped);
      setRevealStep(1);
    },
    [index],
  );

  const advance = useCallback(() => {
    if (revealStep < maxReveal) {
      setRevealStep((s) => s + 1);
      return;
    }
    if (index < TOTAL_SLIDES - 1) {
      setDirection(1);
      setIndex((i) => i + 1);
      setRevealStep(1);
    }
  }, [revealStep, maxReveal, index]);

  const retreat = useCallback(() => {
    if (revealStep > 1) {
      setRevealStep((s) => s - 1);
      return;
    }
    if (index > 0) {
      setDirection(-1);
      setIndex((i) => i - 1);
      const prev = SLIDES[index - 1];
      setRevealStep(prev ? getMaxReveal(prev) : 1);
    }
  }, [revealStep, index]);

  const closeOverlays = useCallback(() => {
    setTocOpen(false);
    setNotesOpen(false);
    setExportOpen(false);
    setMoreOpen(false);
  }, []);

  const jumpToSlideNumber = useCallback(() => {
    const n = Number.parseInt(fromLocaleDigits(jumpValue.trim()), 10);
    if (!Number.isFinite(n) || n < 1 || n > TOTAL_SLIDES) return false;
    goTo(n - 1);
    return true;
  }, [jumpValue, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "Escape") {
        closeOverlays();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        retreat();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        advance();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(TOTAL_SLIDES - 1);
      } else if (e.key.toLowerCase() === "f") {
        void toggleFullscreen();
      } else if (e.key.toLowerCase() === "n") {
        setNotesOpen((v) => !v);
      } else if (e.key.toLowerCase() === "c") {
        setTocOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat, goTo, closeOverlays]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }

  function onWheel(e: WheelEvent) {
    if (wheelLock.current) return;
    if (Math.abs(e.deltaY) < 20) return;
    wheelLock.current = true;
    if (e.deltaY > 0) advance();
    else retreat();
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 350);
  }

  function onStageClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.closest("a,button,input,textarea,[data-no-nav]")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width * 0.55) advance();
    else if (x < rect.width * 0.45) retreat();
  }

  async function handleExport(kind: "pdf" | "pptx") {
    setExporting(kind);
    try {
      const exportSlides = resolveSlides(SLIDES, locale);
      if (kind === "pdf") await exportPresentationPdf(exportSlides);
      else await exportPresentationPptx(exportSlides);
    } catch (err) {
      console.error(err);
      alert(kind === "pdf" ? "PDF export failed." : "PPTX export failed.");
    } finally {
      setExporting(null);
      setExportOpen(false);
    }
  }

  if (!slide) return null;

  return (
    <div
      className="flex h-dvh flex-col bg-[var(--bg-cream)] text-[var(--chrome-fg)]"
      data-presentation-fs={isFullscreen ? "true" : "false"}
    >
      <header className="presentation-chrome no-print relative z-40 flex shrink-0 items-center gap-1.5 border-b border-[var(--border)] bg-[var(--chrome-bg)] px-2 py-1.5 backdrop-blur sm:gap-2 sm:px-3 sm:py-2">
        <div className="me-auto flex min-w-0 items-center gap-2">
          <BrandLogo size="header" className="shrink-0" />
          <span className="truncate text-sm font-bold text-[var(--brand-cyan)]">
            {locale === "fa" ? strings.brandFa : strings.brand}
          </span>
          <span className="hidden text-xs text-[var(--text-muted)] lg:inline">
            {strings.appTitle}
          </span>
          {presenterName ? (
            <span className="shrink-0 text-sm font-semibold text-[var(--text-ink)]">
              <span className="mx-1 text-[var(--text-muted)]" aria-hidden>
                ·
              </span>
              {presenterName}
            </span>
          ) : null}
        </div>

        {/* Primary actions — always visible */}
        <ChromeButton
          onClick={() => setTocOpen(true)}
          aria-label={strings.contents}
          className="max-sm:px-2"
        >
          <span className="sm:hidden">☰</span>
          <span className="hidden sm:inline">{strings.contents}</span>
        </ChromeButton>
        <ChromeButton
          onClick={() => void toggleFullscreen()}
          className="max-sm:px-2"
        >
          <span className="sm:hidden">{isFullscreen ? "✕" : "⛶"}</span>
          <span className="hidden sm:inline">
            {isFullscreen ? strings.exitFullscreen : strings.fullscreen}
          </span>
        </ChromeButton>

        {/* Type controls — compact, always visible */}
        <div className="flex items-center gap-1" data-no-nav>
          <ChromeButton
            onClick={() => bumpTypeScale(-1)}
            disabled={typeScale <= TYPE_SCALE_MIN}
            aria-label={strings.fontSmaller}
            title={strings.fontSmaller}
            className="px-2"
          >
            A−
          </ChromeButton>
          <ChromeButton
            onClick={() => bumpTypeScale(1)}
            disabled={typeScale >= TYPE_SCALE_MAX}
            aria-label={strings.fontLarger}
            title={strings.fontLarger}
            className="px-2"
          >
            A+
          </ChromeButton>
          <ChromeButton
            onClick={toggleTextBold}
            active={textBold}
            aria-label={textBold ? strings.textBoldOff : strings.textBold}
            title={textBold ? strings.textBoldOff : strings.textBold}
            className="px-2 font-extrabold"
          >
            B
          </ChromeButton>
        </div>

        {/* Secondary — desktop row / mobile overflow */}
        <div className="relative hidden items-center gap-2 md:flex">
          <ChromeButton
            onClick={() => setNotesOpen((v) => !v)}
            active={notesOpen}
            aria-label={strings.notes}
          >
            {strings.notes}
          </ChromeButton>
          <ChromeButton onClick={toggleTheme}>
            {theme === "light" ? strings.dark : strings.light}
          </ChromeButton>
          <ChromeButton onClick={toggleLocale}>
            {locale === "en" ? "FA" : "EN"}
          </ChromeButton>
          <div className="relative">
            <ChromeButton
              onClick={() => setExportOpen((v) => !v)}
              active={exportOpen}
            >
              {exporting ? strings.exporting : strings.export}
            </ChromeButton>
            {exportOpen ? (
              <div
                className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg"
                data-no-nav
              >
                <button
                  type="button"
                  className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                  disabled={Boolean(exporting)}
                  onClick={() => void handleExport("pdf")}
                >
                  {strings.exportPdf}
                </button>
                <button
                  type="button"
                  className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                  disabled={Boolean(exporting)}
                  onClick={() => void handleExport("pptx")}
                >
                  {strings.exportPptx}
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative md:hidden">
          <ChromeButton
            onClick={() => setMoreOpen((v) => !v)}
            active={moreOpen}
            aria-label="More"
            className="px-2"
          >
            ···
          </ChromeButton>
          {moreOpen ? (
            <div
              className="absolute right-0 z-50 mt-1 w-44 rounded-md border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg"
              data-no-nav
            >
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                onClick={() => {
                  bumpTypeScale(-1);
                  setMoreOpen(false);
                }}
                disabled={typeScale <= TYPE_SCALE_MIN}
              >
                {strings.fontSmaller}
              </button>
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                onClick={() => {
                  bumpTypeScale(1);
                  setMoreOpen(false);
                }}
                disabled={typeScale >= TYPE_SCALE_MAX}
              >
                {strings.fontLarger}
              </button>
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                onClick={() => {
                  toggleTextBold();
                  setMoreOpen(false);
                }}
              >
                {textBold ? strings.textBoldOff : strings.textBold}
              </button>
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                onClick={() => {
                  setNotesOpen((v) => !v);
                  setMoreOpen(false);
                }}
              >
                {strings.notes}
              </button>
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                onClick={() => {
                  toggleTheme();
                  setMoreOpen(false);
                }}
              >
                {theme === "light" ? strings.dark : strings.light}
              </button>
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                onClick={() => {
                  toggleLocale();
                  setMoreOpen(false);
                }}
              >
                {locale === "en" ? "FA" : "EN"}
              </button>
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                disabled={Boolean(exporting)}
                onClick={() => void handleExport("pdf")}
              >
                {strings.exportPdf}
              </button>
              <button
                type="button"
                className="block w-full rounded px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--bg-cream)]"
                disabled={Boolean(exporting)}
                onClick={() => void handleExport("pptx")}
              >
                {strings.exportPptx}
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <main
          className="presentation-main relative flex min-h-0 min-w-0 flex-1 items-stretch justify-center p-2 sm:p-3 md:p-4"
          onWheel={onWheel}
          onClick={onStageClick}
        >
          <SlideStage>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                className="h-full w-full"
                custom={direction}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: direction > 0 ? 48 : -48 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, x: direction > 0 ? -48 : 48 }
                }
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <SlideRenderer slide={slide} revealStep={revealStep} />
              </motion.div>
            </AnimatePresence>
          </SlideStage>
        </main>

        {notesOpen ? (
          <aside
            className="presentation-chrome no-print w-64 shrink-0 overflow-y-auto border-s border-[var(--border)] bg-[var(--surface)] p-3 text-xs sm:w-72"
            data-no-nav
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold">{strings.notes}</h3>
              <ChromeButton onClick={() => setNotesOpen(false)}>
                {strings.close}
              </ChromeButton>
            </div>
            <p className="leading-relaxed text-[var(--text-muted)]">
              {slide.speakerNotes || strings.noNotes}
            </p>
          </aside>
        ) : null}
      </div>

      <footer className="presentation-chrome no-print flex shrink-0 items-center gap-2 border-t border-[var(--border)] bg-[var(--chrome-bg)] px-2 py-1.5 sm:gap-3 sm:px-3 sm:py-2">
        <ChromeButton
          onClick={retreat}
          disabled={index === 0 && revealStep <= 1}
          className="max-sm:px-2"
        >
          <span className="sm:hidden">←</span>
          <span className="hidden sm:inline">{strings.previous}</span>
        </ChromeButton>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-2 text-[11px] font-medium text-[var(--text-ink)] sm:text-xs md:text-sm">
            <span className="shrink-0 tabular-nums">
              {strings.progress} {toLocaleDigits(index + 1, locale)}{" "}
              {strings.of} {toLocaleDigits(TOTAL_SLIDES, locale)}
            </span>
            <span className="truncate ps-2 max-sm:hidden">{slide.title}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--brand-cyan)] transition-all"
              style={{ width: `${((index + 1) / TOTAL_SLIDES) * 100}%` }}
            />
          </div>
        </div>
        <form
          className="flex shrink-0 items-center gap-1"
          data-no-nav
          onSubmit={(e) => {
            e.preventDefault();
            jumpToSlideNumber();
          }}
        >
          <label className="sr-only" htmlFor="jump-slide-input">
            {strings.goToSlide}
          </label>
          <input
            id="jump-slide-input"
            type="text"
            inputMode="numeric"
            placeholder={strings.goToSlidePlaceholder}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            className="w-14 rounded-md border border-[var(--border)] bg-[var(--surface)] px-1.5 py-1 text-center text-xs font-semibold tabular-nums text-[var(--text-ink)] outline-none focus:border-[var(--brand-cyan)] sm:w-16"
          />
          <ChromeButton type="submit" className="max-sm:px-2" aria-label={strings.goToSlide}>
            {strings.go}
          </ChromeButton>
        </form>
        <ChromeButton
          onClick={advance}
          disabled={index === TOTAL_SLIDES - 1 && revealStep >= maxReveal}
          className="max-sm:px-2"
        >
          <span className="sm:hidden">→</span>
          <span className="hidden sm:inline">{strings.next}</span>
        </ChromeButton>
      </footer>

      {/* Floating exit fullscreen control */}
      {isFullscreen ? (
        <button
          type="button"
          className="no-print fixed right-3 top-3 z-50 rounded-md border border-[var(--border)] bg-[var(--surface)]/90 px-2.5 py-1.5 text-xs font-semibold shadow backdrop-blur hover:border-[var(--brand-cyan)]"
          onClick={() => void toggleFullscreen()}
          data-no-nav
        >
          {strings.exitFullscreen}
        </button>
      ) : null}

      <p className="no-print sr-only">{strings.clickHint}</p>

      {tocOpen ? (
        <div
          className="no-print fixed inset-0 z-50 flex justify-end bg-black/40"
          onClick={closeOverlays}
        >
          <nav
            className="h-full w-full max-w-md overflow-y-auto bg-[var(--surface)] p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            data-no-nav
            aria-label={strings.contents}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold">{strings.contents}</h2>
              <ChromeButton onClick={closeOverlays}>{strings.close}</ChromeButton>
            </div>
            <form
              className="mb-4 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (jumpToSlideNumber()) closeOverlays();
              }}
            >
              <label className="sr-only" htmlFor="toc-jump-slide-input">
                {strings.goToSlide}
              </label>
              <input
                id="toc-jump-slide-input"
                type="text"
                inputMode="numeric"
                placeholder={`${toLocaleDigits(1, locale)}–${toLocaleDigits(TOTAL_SLIDES, locale)}`}
                value={jumpValue}
                onChange={(e) => setJumpValue(e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-[var(--border)] bg-[var(--bg-cream)] px-2 py-1.5 text-xs font-semibold tabular-nums text-[var(--text-ink)] outline-none focus:border-[var(--brand-cyan)]"
              />
              <ChromeButton type="submit">{strings.goToSlide}</ChromeButton>
            </form>
            {groups.map((group) => (
              <div key={group.section} className="mb-4">
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-cyan)]">
                  {strings.sections[group.section]}
                </h3>
                <ul className="space-y-0.5">
                  {group.slides.map((s) => {
                    const localized = resolveSlide(s, locale);
                    return (
                    <li key={s.id}>
                      <button
                        type="button"
                        className={`flex w-full items-start gap-2 rounded px-2 py-1.5 text-start text-xs hover:bg-[var(--bg-cream)] ${
                          s.number === slide.number
                            ? "bg-[var(--brand-cyan)]/15 font-semibold text-[var(--brand-cyan)]"
                            : ""
                        }`}
                        onClick={() => {
                          goTo(s.number - 1);
                          closeOverlays();
                        }}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 min-w-7 shrink-0 items-center justify-center rounded px-1 text-[11px] font-bold tabular-nums ${
                            s.number === slide.number
                              ? "bg-[var(--brand-cyan)] text-white"
                              : "bg-[var(--bg-cream)] text-[var(--text-ink)]"
                          }`}
                        >
                          {toLocaleDigits(s.number, locale)}
                        </span>
                        <span className="min-w-0 flex-1 leading-snug">
                          {localized.title}
                        </span>
                      </button>
                    </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

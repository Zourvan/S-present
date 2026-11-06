# GMP Presentation

Interactive slide deck for **Ronagen** (روناژن): *GMP & GDP Fundamentals and Key Pharmaceutical Quality Systems*. It covers EU GMP Part I, EU GDP, and linked quality systems (QRM, deviation, CAPA, change). The interface is available in English and Persian.

## Requirements

- Node.js 20.9 or later
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is taken, use the URL printed by Next.js.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Typecheck, lint, and build |

## Controls

| Action | How |
| --- | --- |
| Next reveal, then next slide | Right arrow, Page Down, Space, or Enter |
| Previous reveal, then previous slide | Left arrow or Page Up |
| First / last slide | Home / End |
| Table of contents | `C` |
| Speaker notes | `N` |
| Fullscreen | `F` |
| Close overlays | Escape |

Click the left or right edge of the stage to move, and scroll to step through reveals. The toolbar also switches light and dark theme, English and Persian, and exports the deck.

## Deck

The deck is **43 slides**, assembled in `src/lib/slides/index.ts`.

| Section | File |
| --- | --- |
| Opening | `src/lib/slides/section-open.ts` |
| Foundations | `src/lib/slides/section-foundations.ts` |
| EU GMP chapters & label control | `src/lib/slides/section-operations.ts` |
| GDP in storage & distribution | `src/lib/slides/section-manufacturing.ts` |
| Key quality systems | `src/lib/slides/section-qc.ts` |
| Audit, case study & closing | `src/lib/slides/section-close.ts` |

English is the source language. Persian copy lives in the matching `*.fa.ts` files and is merged at runtime by `src/lib/slides/resolve.ts`.

Pathway colors: oral (coral), biotech (burgundy), shared controls (Ronagen cyan).

## Editing content

Presenter name and role are in `src/lib/slides/section-open.ts` (`s01-title` → `visualData.presenter`). The Persian presenter fields are in `src/lib/slides/section-open.fa.ts`.

To change a slide, edit its English object, then the matching override in the `*.fa.ts` file if Persian should differ. UI chrome strings are in `src/lib/i18n/strings.ts`.

The logo is `public/brand/ronagen-logo.svg`. Persian text uses Vazirmatn from `public/fonts/`.

## Export

Use **Export** in the toolbar to download a PDF (`jspdf`) or a PowerPoint file (`pptxgenjs`). Export logic is in `src/lib/export/`.

## Project layout

```
src/app/                       Next.js App Router entry
src/components/presentation/   shell, stage, slide renderer, layouts
src/components/visuals/        charts, flows, and diagrams
src/lib/slides/                slide content (English and Persian)
src/lib/export/                PDF and PowerPoint export
src/lib/i18n/                  interface strings
public/brand/                  logo
public/fonts/                  Source Sans 3 and Vazirmatn
```

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS v4, Framer Motion, Recharts, and `@xyflow/react`.

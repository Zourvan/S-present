export type Locale = "en" | "fa";
export type ThemeMode = "light" | "dark";

export type SectionId =
  | "open"
  | "foundations"
  | "operations"
  | "manufacturing"
  | "qcValidation"
  | "lifecycle"
  | "close";

export type VisualType =
  | "titleHero"
  | "presenter"
  | "bullets"
  | "overviewGrid"
  | "taxonomy"
  | "cycle"
  | "hierarchy"
  | "lifecycle"
  | "riskMatrix"
  | "relationship"
  | "responsibilityMatrix"
  | "comparisonTable"
  | "flow"
  | "splitPathways"
  | "processSteps"
  | "decisionTree"
  | "monitoringChart"
  | "dashboard"
  | "roadmap"
  | "investigation"
  | "references"
  | "thanksQa"
  | "callout"
  | "deviationLifecycle"
  | "containmentTree"
  | "riskPrioritization"
  | "evidenceMap"
  | "fishbone"
  | "oosWorkflow"
  | "impactCompare"
  | "capaDesign"
  | "capaClosure"
  | "investigationCase";

export type ToneName = "amber" | "red" | "violet";

export interface SlideBlock {
  heading: string;
  points: string[];
}

export interface ToneStep {
  label: string;
  detail?: string;
  tone?: ToneName;
  caption?: string;
}

export interface ToneBranch {
  label: string;
  steps: string[];
  tone?: ToneName;
}

export interface TableData {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface FlowNode {
  id: string;
  label: string;
  pathway?: "oral" | "biotech" | "shared";
}

export interface FlowData {
  nodes: FlowNode[];
  edges?: Array<{ from: string; to: string }>;
  title?: string;
}

export interface VisualData {
  bullets?: string[];
  callout?: string;
  table?: TableData;
  flow?: FlowData;
  items?: Array<{ title: string; body?: string; icon?: string }>;
  layers?: string[];
  axes?: { x: string; y: string; cells: string[][] };
  matrix?: { rows: string[]; cols: string[]; cells: string[][] };
  phases?: Array<{
    name: string;
    period: string;
    activities: string[];
    deliverables: string[];
  }>;
  takeaways?: string[];
  closing?: string;
  presenter?: {
    name: string;
    role: string;
  };
  subtitle?: string;
  supporting?: string[];
  date?: string;
  legend?: Array<{ label: string; pathway: "oral" | "biotech" | "shared" }>;
  chart?: {
    labels: string[];
    series: number[];
    excursionIndexes?: number[];
    note?: string;
  };
  kpis?: Array<{ label: string; value: string; kind?: "leading" | "lagging" }>;
  maturityLevels?: string[];
  leftTitle?: string;
  rightTitle?: string;
  leftSteps?: string[];
  rightSteps?: string[];
  shared?: string[];
  questions?: string[];
  blocks?: SlideBlock[];
  stages?: ToneStep[];
  branches?: ToneBranch[];
  nodes?: string[];
  contributors?: string[];
  bones?: string[];
  effect?: string;
  framework?: string[];
  frameworkNote?: string;
  links?: string[];
  badge?: string;
  sourceIds?: string[];
}

export interface Slide {
  id: string;
  number: number;
  section: SectionId;
  title: string;
  keyMessage?: string;
  content: string[];
  visualType: VisualType;
  visualData?: VisualData;
  references?: string[];
  speakerNotes?: string;
  revealSteps?: number;
}

export interface ReferenceEntry {
  id: string;
  name: string;
  url: string;
  topic: string;
}

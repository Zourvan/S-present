import { slide } from "./helpers";

export const closeSlides = [
  slide(37, {
    id: "s37-audit-types",
    section: "close",
    title: "Self-Inspection, Audit, and Inspection",
    keyMessage: "Common ground: evaluate objective evidence and identify gaps.",
    content: [],
    visualType: "comparisonTable",
    visualData: {
      table: {
        headers: ["Type", "Performed by", "Focus"],
        rows: [
          [
            "Self-inspection / internal audit",
            "Competent persons with appropriate independence",
            "Internal compliance and performance",
          ],
          [
            "Second-party audit",
            "Customer or activity owner",
            "Supplier or contractor qualification",
          ],
          [
            "Regulatory inspection",
            "Competent authority",
            "Compliance with legal requirements",
          ],
        ],
      },
    },
    references: ["R1", "R2"],
    speakerNotes: "Reference: EU GMP Chapters 7 and 9; EU GDP Chapters 7 and 8.",
    revealSteps: 3,
  }),
  slide(38, {
    id: "s38-effective-pqs-evidence",
    section: "close",
    title: "Evidence of an Effective Quality System",
    keyMessage: "For every activity, ask five questions.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Five evidence questions",
        nodes: [
          { id: "r", label: "Requirement" },
          { id: "p", label: "Procedure" },
          { id: "a", label: "Practice" },
          { id: "rec", label: "Record" },
          { id: "e", label: "Effectiveness" },
        ],
        edges: [
          { from: "r", to: "p" },
          { from: "p", to: "a" },
          { from: "a", to: "rec" },
          { from: "rec", to: "e" },
        ],
      },
      callout:
        "Label example: label-control procedure, issue and reconciliation records, discrepancy review, and labelling-error trends. This model is a training framework for this presentation; it is not an official EudraLex chapter title.",
    },
    speakerNotes:
      "Walk through the label example briefly if time allows.",
    revealSteps: 6,
  }),
  slide(39, {
    id: "s39-inspection-behavior",
    section: "close",
    title: "Professional Behaviour During Inspection",
    keyMessage:
      "Sustainable inspection readiness comes from correct daily operation of the system.",
    content: [],
    visualType: "overviewGrid",
    visualData: {
      items: [
        {
          title: "Accurate answers",
          body: "Answer honestly and within your responsibility.",
        },
        {
          title: "Clarify first",
          body: "Clarify ambiguous questions before answering.",
        },
        {
          title: "No guessing",
          body: "Do not offer unverified information.",
        },
        {
          title: "Controlled documents",
          body: "Provide documents through controlled channels.",
        },
        {
          title: "Correct promptly",
          body: "Correct an incorrect answer transparently.",
        },
        {
          title: "Never falsify",
          body: "Never falsify, conceal, or backdate.",
        },
      ],
    },
    speakerNotes:
      "Practical advice based on documentation and data-integrity principles.",
    revealSteps: 6,
  }),
  slide(40, {
    id: "s40-case-temp-excursion",
    section: "close",
    title: "Case Study: Temperature Excursion",
    keyMessage: "Neither automatic rejection nor acceptance without evidence.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Assessment path",
        nodes: [
          { id: "r", label: "Record & hold" },
          { id: "s", label: "Scope & duration" },
          { id: "d", label: "Data integrity" },
          { id: "p", label: "Prior / stability" },
          { id: "a", label: "Documented assessment" },
          { id: "c", label: "CAPA / change" },
        ],
        edges: [
          { from: "r", to: "s" },
          { from: "s", to: "d" },
          { from: "d", to: "p" },
          { from: "p", to: "a" },
          { from: "a", to: "c" },
        ],
      },
      callout:
        "Hypothetical scenario: a product stored at 2–8 °C was held for about 90 minutes at up to 12 °C. Numbers in this example are not acceptance criteria.",
    },
    references: ["R2", "R3"],
    speakerNotes:
      "Reference: EU GDP Chapters 1, 3 and 9; ICH Q9(R1). Links back to warehouse and transport control.",
    revealSteps: 7,
  }),
  slide(41, {
    id: "s41-five-behaviors",
    section: "close",
    title: "Summary: Five Key Behaviours",
    keyMessage:
      "GMP and GDP are not merely a set of forms; they are a framework for patient protection.",
    content: [],
    visualType: "overviewGrid",
    visualData: {
      items: [
        {
          title: "1. Compliance",
          body: "Act per valid procedures within competence.",
        },
        {
          title: "2. Transparency",
          body: "Do not hide errors or unfavourable data.",
        },
        {
          title: "3. Traceability",
          body: "Record operations and decisions accurately and promptly.",
        },
        {
          title: "4. Evidence-based decisions",
          body: "Scientific justification for product status and actions.",
        },
        {
          title: "5. Continual improvement",
          body: "Address causes and evaluate action effectiveness.",
        },
      ],
    },
    revealSteps: 5,
  }),
  slide(42, {
    id: "s42-references",
    section: "close",
    title: "References",
    keyMessage:
      "Confirm the version and effective date of each document before formal delivery. Competent-authority, destination-market, and site SOP requirements also apply.",
    content: [],
    visualType: "references",
    visualData: {
      takeaways: [
        "Primary GMP: EudraLex Volume 4, Part I — Basic Requirements, Chapters 1–9",
        "Related annexes: Annex 11 (Computerised Systems), Annex 15 (Qualification and Validation), Annex 16 (QP Certification and Batch Release)",
        "GDP: European Commission 2013/C 343/01 — Good Distribution Practice",
        "Supplementary: ICH Q9(R1), ICH Q10, PIC/S PI 041",
      ],
      closing:
        "Confirm the version and effective date of each document before formal delivery. Competent-authority, destination-market, and site SOP requirements also apply.",
    },
    references: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"],
    speakerNotes:
      "Point to the in-app reference library for official URLs.",
    revealSteps: 5,
  }),
  slide(43, {
    id: "s43-thanks",
    section: "close",
    title: "Thank You",
    content: [],
    visualType: "thanksQa",
    visualData: {
      closing:
        "Quality is built into the process and preserved across the supply chain — for the patient.",
      questions: [
        "Where do GMP and GDP meet most often in your daily work?",
        "Which system — QRM, deviation, CAPA, or change — needs the clearest next step?",
      ],
    },
    speakerNotes:
      "Close with questions. Invite one concrete example from the audience if time allows.",
    revealSteps: 5,
  }),
];

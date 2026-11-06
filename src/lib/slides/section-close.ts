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
        caption: "Common ground: evaluate objective evidence and identify gaps.",
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
    content: [
      "Requirement: what is required?",
      "Procedure: what is the approved method?",
      "Practice: what is done in practice?",
      "Record: what evidence of execution exists?",
      "Effectiveness: how do we know the control worked?",
    ],
    visualType: "relationship",
    visualData: {
      items: [
        { title: "1. Requirement", body: "What is required?" },
        { title: "2. Procedure", body: "What is the approved method?" },
        { title: "3. Practice", body: "What is done in practice?" },
        { title: "4. Record", body: "What evidence of execution exists?" },
        {
          title: "5. Effectiveness",
          body: "How do we know the control worked?",
        },
      ],
      callout:
        "Label example: label-control procedure, issue and reconciliation records, discrepancy review, and labelling-error trends. This model is a training framework for this presentation; it is not an official EudraLex chapter title.",
    },
    speakerNotes:
      "Walk through the label example briefly if time allows.",
    revealSteps: 5,
  }),
  slide(39, {
    id: "s39-inspection-behavior",
    section: "close",
    title: "Professional Behaviour During Inspection",
    keyMessage:
      "Sustainable inspection readiness comes from correct daily operation of the system.",
    content: [
      "Answer accurately, honestly, and within your responsibility.",
      "Clarify the question before answering if it is ambiguous.",
      "Do not guess or offer unverified information.",
      "Provide documents through controlled channels.",
      "Correct an incorrect answer transparently and promptly.",
      "Never falsify, conceal, or backdate.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Sustainable inspection readiness comes from correct daily operation of the system.",
    },
    speakerNotes:
      "Practical advice based on documentation and data-integrity principles.",
    revealSteps: 7,
  }),
  slide(40, {
    id: "s40-case-temp-excursion",
    section: "close",
    title: "Case Study: Temperature Excursion",
    keyMessage: "Neither automatic rejection nor acceptance without evidence.",
    content: [
      "Record the event and control product status.",
      "Review scope, duration, and data integrity.",
      "Review prior excursions and related stability information.",
      "Documented assessment by competent persons.",
      "Decision by persons with authority.",
      "Cause investigation, CAPA, and need for change.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Hypothetical scenario: a product stored at 2–8 °C was held for about 90 minutes at up to 12 °C. Numbers in this example are not acceptance criteria. Neither automatic rejection nor acceptance without evidence.",
    },
    references: ["R2", "R3"],
    speakerNotes:
      "Reference: EU GDP Chapters 1, 3 and 9; ICH Q9(R1).",
    revealSteps: 7,
  }),
  slide(41, {
    id: "s41-five-behaviors",
    section: "close",
    title: "Summary: Five Key Behaviours",
    keyMessage:
      "GMP and GDP are not merely a set of forms; they are a framework for patient protection.",
    content: [
      "Compliance — act per valid procedures within competence.",
      "Transparency — do not hide errors or unfavourable data.",
      "Traceability — record operations and decisions accurately and promptly.",
      "Evidence-based decisions — scientific justification for product status and actions.",
      "Continual improvement — address causes and evaluate action effectiveness.",
    ],
    visualType: "relationship",
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
      callout:
        "GMP and GDP are not merely a set of forms; they are a framework for patient protection.",
    },
    revealSteps: 6,
  }),
  slide(42, {
    id: "s42-references",
    section: "close",
    title: "References",
    keyMessage:
      "Confirm the version and effective date of each document before formal delivery. Competent-authority, destination-market, and site SOP requirements also apply.",
    content: [
      "EudraLex Volume 4, Part I — Chapters 1–9",
      "Annex 11, Annex 15, Annex 16",
      "EU GDP 2013/C 343/01",
      "ICH Q9(R1) and ICH Q10",
      "PIC/S PI 041",
    ],
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
];

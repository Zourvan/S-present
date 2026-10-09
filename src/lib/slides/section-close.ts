import { slide } from "./helpers";

export const closeSlides = [
  slide(62, {
    id: "s51-key-takeaways",
    section: "close",
    title: "Key Takeaways and Reference Framework",
    keyMessage:
      "Ronagen GMP success integrates a shared PQS with pathway-specific science, validated processes, and lifecycle quality management.",
    content: [
      "GMP protects patients through documented control—not through final testing alone.",
      "Conventional oral and biotechnology pathways share quality systems but differ in unit operations, specs, and sterile scope.",
      "QRM, QbD, validation, and data integrity form the technical backbone of modern GMP.",
      "Quality events, supplier oversight, and comparability (biotech) sustain the validated state after launch.",
      "Implementation follows phased organizational planning; cited regulations accessed via references R1–R24 (as of 9 October 2026).",
    ],
    visualType: "references",
    visualData: {
      takeaways: [
        "Establish PQS first, then scale product-specific manufacturing modules.",
        "Apply sterile / Annex 1 controls only where the product and process require sterility.",
        "Validate processes and analytical methods with lifecycle maintenance (CPV, Q14).",
        "Govern changes and deviations with CAPA effectiveness—not checkbox closure.",
        "Use official references [R1–R24] for authoritative detail beyond this training overview.",
      ],
      closing:
        "This presentation supports Ronagen’s GMP implementation journey; site-specific procedures and registrations remain the binding source of compliance.",
    },
    references: [
      "R1",
      "R2",
      "R3",
      "R4",
      "R5",
      "R6",
      "R7",
      "R8",
      "R9",
      "R10",
      "R11",
      "R12",
      "R13",
      "R14",
      "R15",
      "R16",
      "R17",
      "R18",
      "R19",
      "R20",
      "R21",
      "R22",
      "R23",
      "R24",
    ],
    speakerNotes:
      "Direct audience to in-app reference list for URLs. Remind that numeric limits and acceptance criteria come from Ronagen validated documents, not this deck.",
    revealSteps: 5,
  }),
  slide(63, {
    id: "s52-thanks-qa",
    section: "close",
    title: "Thank You — Questions & Discussion",
    keyMessage:
      "Open discussion on Ronagen priorities: oral launch, biotech scale-up, sterile strategy, or inspection readiness.",
    content: [
      "Thank you for your attention.",
      "Questions on regulatory mapping, validation strategy, or implementation phasing are welcome.",
      "Contact the quality leadership team for follow-up working sessions.",
      "Ronagen — روناژن",
    ],
    visualType: "thanksQa",
    visualData: {
      questions: [
        "Which product pathway is the near-term Ronagen priority?",
        "What is the current gap assessment status against EU / US GMP?",
        "Where are the highest-risk data integrity or validation gaps?",
        "How will CMO versus in-house manufacturing be governed?",
      ],
      closing:
        "GMP is not a documentation project. It is a risk-based, evidence-driven system for consistently manufacturing products that meet their required quality standards.",
      date: "9 October 2026",
    },
    speakerNotes:
      "Pause for Q&A. Capture action items for post-training CAPA or training records if delivered formally.",
    revealSteps: 3,
  }),
];

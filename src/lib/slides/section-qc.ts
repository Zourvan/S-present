import { slide } from "./helpers";

export const qcSlides = [
  slide(29, {
    id: "s29-four-systems",
    section: "qcValidation",
    title: "Four Systems; Four Questions",
    keyMessage:
      "These systems are linked, but they do not replace one another.",
    content: [],
    visualType: "comparisonTable",
    visualData: {
      table: {
        headers: ["System", "Core question"],
        rows: [
          [
            "Quality risk management",
            "What risk exists and how should it be controlled?",
          ],
          [
            "Deviation management",
            "What departure from a requirement or approved procedure occurred?",
          ],
          [
            "CAPA",
            "How do we address the cause of a real or potential problem?",
          ],
          [
            "Change control",
            "How do we implement a planned change in a controlled way?",
          ],
        ],
        caption: "These systems are linked, but they do not replace one another.",
      },
    },
    references: ["R1", "R3", "R4"],
    speakerNotes: "Reference: EU GMP Chapter 1; ICH Q9(R1); ICH Q10.",
    revealSteps: 4,
  }),
  slide(30, {
    id: "s30-qrm",
    section: "qcValidation",
    title: "Quality Risk Management",
    keyMessage:
      "QRM is not a tool to justify unacceptable practice or to bypass requirements.",
    content: [
      "Decisions rest on scientific knowledge and patient protection.",
      "Formality and documentation are proportionate to risk.",
    ],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "QRM process",
        nodes: [
          { id: "id", label: "Identify" },
          { id: "an", label: "Analyse" },
          { id: "ev", label: "Evaluate" },
          { id: "ct", label: "Control" },
          { id: "rv", label: "Communicate & review" },
        ],
        edges: [
          { from: "id", to: "an" },
          { from: "an", to: "ev" },
          { from: "ev", to: "ct" },
          { from: "ct", to: "rv" },
        ],
      },
      callout:
        "QRM is not a tool to justify unacceptable practice or to bypass requirements.",
    },
    references: ["R3"],
    speakerNotes: "Reference: ICH Q9(R1), sections 3 and 4.",
    revealSteps: 6,
  }),
  slide(31, {
    id: "s31-deviation-mgmt",
    section: "qcValidation",
    title: "Deviation Management",
    content: [
      "Classification follows the approved procedure and potential impact.",
      "Preserve evidence and document decisions throughout.",
    ],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "General path",
        nodes: [
          { id: "r", label: "Report" },
          { id: "c", label: "Immediate control" },
          { id: "i", label: "Impact assessment" },
          { id: "a", label: "Cause investigation" },
          { id: "act", label: "Action" },
          { id: "cl", label: "Approve & close" },
        ],
        edges: [
          { from: "r", to: "c" },
          { from: "c", to: "i" },
          { from: "i", to: "a" },
          { from: "a", to: "act" },
          { from: "act", to: "cl" },
        ],
      },
      callout:
        "A deviation may relate to process, equipment, materials, documentation, or storage conditions. Classification follows the approved procedure and potential impact.",
    },
    references: ["R1", "R2"],
    speakerNotes: "Reference: EU GMP Chapter 1; EU GDP Chapter 1.",
    revealSteps: 6,
  }),
  slide(32, {
    id: "s32-product-impact",
    section: "qcValidation",
    title: "Product Impact Assessment",
    keyMessage:
      "Product impact assessment and root-cause investigation are different, complementary activities.",
    content: [
      "Which batches, materials, or systems are involved?",
      "What are the start and end times of the event?",
      "Which quality attributes may be affected?",
      "Are other batches or products also involved?",
      "Is there enough data for a decision?",
      "Is immediate action or notification required?",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Product impact assessment and root-cause investigation are different, complementary activities.",
    },
    references: ["R1", "R3"],
    speakerNotes: "Reference: EU GMP Chapters 1 and 8; ICH Q9(R1).",
    revealSteps: 7,
  }),
  slide(33, {
    id: "s33-rca",
    section: "qcValidation",
    title: "Root Cause Analysis — RCA",
    keyMessage:
      "“Human error” should not be the stopping point when method, design, or system weaknesses remain.",
    content: [
      "Evidence sources: records and chronology; process and equipment data; interviews with relevant people; recent changes and similar-event trends.",
      "Example tools: Five Whys and Fishbone.",
    ],
    visualType: "relationship",
    visualData: {
      items: [
        { title: "Records & chronology", body: "What happened, in order" },
        { title: "Process & equipment data", body: "Objective measurements" },
        { title: "Interviews", body: "Context from people involved" },
        { title: "Changes & trends", body: "Similar prior events" },
      ],
      callout:
        "“Human error” should not be the stopping point when method, design, or system weaknesses remain. Example tools: Five Whys and Fishbone.",
    },
    references: ["R1", "R4"],
    speakerNotes: "Reference: EU GMP Chapter 1; ICH Q10 section 3.2.2.",
    revealSteps: 5,
  }),
  slide(34, {
    id: "s34-capa",
    section: "qcValidation",
    title: "CAPA and Its Effectiveness",
    keyMessage: "Completing an action is not the same as proving it was effective.",
    content: [
      "Every action needs an owner, due date, evidence of completion, and effectiveness criteria.",
    ],
    visualType: "comparisonTable",
    visualData: {
      table: {
        headers: ["Action type", "Purpose"],
        rows: [
          ["Correction", "Fix or control the observed problem"],
          [
            "Corrective Action",
            "Remove the cause of an occurred problem and prevent recurrence",
          ],
          [
            "Preventive Action",
            "Remove the cause of a potential problem and prevent occurrence",
          ],
        ],
        caption: "Completing an action is not the same as proving it was effective.",
      },
      callout:
        "Retraining is appropriate only when linked to the identified cause or weakness.",
    },
    references: ["R4", "R1"],
    speakerNotes: "Reference: ICH Q10 section 3.2.2; EU GMP Chapter 1.",
    revealSteps: 3,
  }),
  slide(35, {
    id: "s35-change-control",
    section: "qcValidation",
    title: "Change Control",
    content: [
      "Assess product quality, patient safety, validated status, and regulatory impact before approval.",
      "Cover documentation, training, supply, manufacture, testing, and distribution.",
    ],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Change-control path",
        nodes: [
          { id: "req", label: "Request" },
          { id: "eval", label: "Evaluate & Approve" },
          { id: "impl", label: "Implement" },
          { id: "post", label: "Post-Implementation Review" },
        ],
        edges: [
          { from: "req", to: "eval" },
          { from: "eval", to: "impl" },
          { from: "impl", to: "post" },
        ],
      },
      callout:
        "Label example: an artwork change needs version control, a changeover timing plan, and disposition of prior stock.",
    },
    references: ["R4", "R1", "R6"],
    speakerNotes:
      "Assess impact before implementation. Reference: ICH Q10 section 3.2.3; EU GMP Chapter 1 and Annex 15.",
    revealSteps: 5,
  }),
  slide(36, {
    id: "s36-integrated-example",
    section: "qcValidation",
    title: "Integrated Example: Replacing a Cold-Store Monitoring System",
    content: [],
    visualType: "comparisonTable",
    visualData: {
      table: {
        headers: ["Stage", "Activity"],
        rows: [
          ["Identify the problem", "Record the related disturbance or event"],
          ["Risk assessment", "Assess impact on data and products"],
          ["Cause investigation", "Identify equipment, software, or method weakness"],
          ["CAPA", "Define actions proportionate to the cause"],
          ["Change control", "Evaluate and approve the replacement system"],
          [
            "Implement & follow up",
            "Test, qualify/validate as needed, train, and check effectiveness",
          ],
        ],
        caption:
          "For computerised systems, also review related Annex 11 requirements.",
      },
    },
    references: ["R5", "R6", "R4"],
    speakerNotes: "Reference: EU GMP Annexes 11 and 15; ICH Q10.",
    revealSteps: 6,
  }),
];

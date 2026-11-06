import { slide } from "./helpers";

export const operationsSlides = [
  slide(8, {
    id: "s08-nine-chapters-map",
    section: "operations",
    title: "Map of the Nine EU GMP Chapters — Part I",
    keyMessage:
      "Nine basic-requirement chapters; annexes provide complementary requirements.",
    content: [],
    visualType: "overviewGrid",
    visualData: {
      items: [
        { title: "Ch.1 PQS", body: "Pharmaceutical Quality System" },
        { title: "Ch.2 Personnel", body: "Competence and organisation" },
        { title: "Ch.3 Premises", body: "Premises and equipment" },
        { title: "Ch.4 Documentation", body: "Instructions and records" },
        { title: "Ch.5 Production", body: "Controlled operations" },
        { title: "Ch.6 QC", body: "Quality Control" },
        { title: "Ch.7 Outsourced", body: "Outsourced activities" },
        { title: "Ch.8 Complaints", body: "Defects and recalls" },
        { title: "Ch.9 Self-inspection", body: "Internal verification" },
      ],
    },
    references: ["R1"],
    speakerNotes: "Reference: EudraLex Volume 4, Part I.",
    revealSteps: 9,
  }),
  slide(9, {
    id: "s09-ch1-pqs",
    section: "operations",
    title: "Chapter 1: Pharmaceutical Quality System",
    keyMessage: "The system must provide assurance across manufacture and control.",
    content: [],
    visualType: "overviewGrid",
    visualData: {
      items: [
        {
          title: "Intended use",
          body: "Product manufactured suitably for its intended use.",
        },
        {
          title: "Regulatory fit",
          body: "Marketing authorisation and applicable requirements met.",
        },
        {
          title: "Process control",
          body: "Processes defined and under control.",
        },
        {
          title: "Deviations",
          body: "Investigated with appropriate actions.",
        },
        {
          title: "Changes",
          body: "Evaluated and approved before implementation.",
        },
        {
          title: "Review",
          body: "Product quality and system effectiveness reviewed.",
        },
      ],
      callout:
        "Example: Product Quality Review (PQR) examines trends, process consistency, and improvement needs.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 1.",
    revealSteps: 7,
  }),
  slide(10, {
    id: "s10-ch2-personnel",
    section: "operations",
    title: "Chapter 2: Personnel",
    keyMessage:
      "Attending training alone does not prove competence to perform the work.",
    content: [],
    visualType: "splitPathways",
    visualData: {
      leftTitle: "Organisation requirements",
      rightTitle: "Competence proof",
      leftSteps: [
        "Sufficient competent personnel",
        "Clear structure and job descriptions",
        "Independence of production and QC roles",
      ],
      rightSteps: [
        "Role-appropriate initial and ongoing training",
        "Assessment of training effectiveness",
        "Hygiene, gowning, and entry rules observed",
      ],
      shared: ["Competence is demonstrated, not assumed"],
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 2.",
    revealSteps: 4,
  }),
  slide(11, {
    id: "s11-ch3-premises",
    section: "operations",
    title: "Chapter 3: Premises and Equipment",
    keyMessage: "Design, status control, and maintenance protect product quality.",
    content: [
      "Design and layout suited to the operations.",
      "Reduced likelihood of error, contamination, and cross-contamination.",
      "Effective cleaning and maintenance possible.",
      "Appropriate environmental conditions.",
      "Control of equipment status and measuring instruments.",
    ],
    visualType: "relationship",
    visualData: {
      items: [
        {
          title: "Qualification",
          body: "Confirm suitability and correct performance.",
        },
        {
          title: "Calibration",
          body: "Relate an instrument reading to a reference.",
        },
        {
          title: "Preventive maintenance",
          body: "Planned maintenance to reduce failures.",
        },
      ],
    },
    references: ["R1", "R6"],
    speakerNotes: "Reference: EU GMP Chapter 3; Annex 15.",
    revealSteps: 5,
  }),
  slide(12, {
    id: "s12-ch4-documentation",
    section: "operations",
    title: "Chapter 4: Documentation",
    keyMessage:
      "Instructions say what should be done; records show what was done.",
    content: [],
    visualType: "splitPathways",
    visualData: {
      leftTitle: "Instructions",
      rightTitle: "Records / Reports",
      leftSteps: [
        "Specifications",
        "Manufacturing & packaging instructions",
        "SOPs and protocols",
      ],
      rightSteps: [
        "Batch and equipment records",
        "Test results",
        "Investigation & validation reports",
      ],
      shared: [
        "Approval · Version control · Contemporaneous recording · Traceability",
      ],
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 4.",
    revealSteps: 4,
  }),
  slide(13, {
    id: "s13-data-integrity",
    section: "operations",
    title: "Data Integrity — ALCOA+",
    keyMessage:
      "ALCOA+: attributable, legible, contemporaneous, original, accurate — plus complete, consistent, enduring, available.",
    content: [],
    visualType: "relationship",
    visualData: {
      items: [
        { title: "Attributable", body: "Who performed the action" },
        { title: "Legible", body: "Readable and permanent" },
        { title: "Contemporaneous", body: "Recorded at the time" },
        { title: "Original", body: "Primary record or certified copy" },
        { title: "Accurate", body: "Correct and truthful" },
      ],
      callout:
        "Plus: complete, consistent, enduring, available. Controls: unique accounts, access control, primary data/metadata retention, risk-based audit-trail review — which does not replace reviewing original data.",
    },
    references: ["R1", "R5", "R8"],
    speakerNotes:
      "Reference: EU GMP Chapter 4 and Annex 11; PIC/S PI 041.",
    revealSteps: 6,
  }),
  slide(14, {
    id: "s14-ch5-production",
    section: "operations",
    title: "Chapter 5: Production",
    keyMessage: "Controlled operations prevent mix-ups and contamination.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Production control points",
        nodes: [
          { id: "m", label: "Materials & status" },
          { id: "i", label: "Approved instructions" },
          { id: "c", label: "Contamination control" },
          { id: "p", label: "IPC & parameters" },
          { id: "y", label: "Yield & reconcile" },
          { id: "k", label: "Packaging control" },
        ],
        edges: [
          { from: "m", to: "i" },
          { from: "i", to: "c" },
          { from: "c", to: "p" },
          { from: "p", to: "y" },
          { from: "y", to: "k" },
        ],
      },
      callout:
        "Example: an unexplained discrepancy in label counts can signal mix-up or mislabelling risk.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 5.",
    revealSteps: 7,
  }),
  slide(15, {
    id: "s15-status-labelling",
    section: "operations",
    title: "Identification & Status Labelling",
    keyMessage: "Unclear identity or status is not permission to use.",
    content: [],
    visualType: "overviewGrid",
    visualData: {
      items: [
        {
          title: "Identifiable",
          body: "Materials, containers, and in-process products must be identifiable.",
        },
        {
          title: "Batch context",
          body: "Name or code and batch number as appropriate to the stage.",
        },
        {
          title: "Clear status",
          body: "Quarantine, released, or rejected must be unambiguous.",
        },
        {
          title: "Equipment",
          body: "Equipment and its status identified where needed.",
        },
        {
          title: "Legibility",
          body: "Information legible, clear, and free of contradiction.",
        },
        {
          title: "Relabelling",
          body: "Controlled, with preserved traceability.",
        },
      ],
    },
    references: ["R1"],
    speakerNotes:
      "Colour alone is not enough; there is no single global colour scheme for all organisations. In some cases, validated electronic control can reduce the need for physical labels if related requirements and control effectiveness are met. Reference: EU GMP Chapter 5; Chapter 3 for equipment.",
    revealSteps: 6,
  }),
  slide(16, {
    id: "s16-label-control",
    section: "operations",
    title: "Label & Printed Packaging Material Control",
    keyMessage: "A correct label on the wrong product is also dangerous.",
    content: [
      "Only approved artwork/text and the current version.",
      "Secure storage; access limited to authorised persons.",
      "Reconcile issued, used, returned, and destroyed quantities.",
    ],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Control cycle",
        nodes: [
          { id: "a", label: "Approved artwork" },
          { id: "b", label: "Receipt & storage" },
          { id: "c", label: "Issue" },
          { id: "d", label: "Line control" },
          { id: "e", label: "Reconciliation" },
          { id: "f", label: "Disposition" },
        ],
        edges: [
          { from: "a", to: "b" },
          { from: "b", to: "c" },
          { from: "c", to: "d" },
          { from: "d", to: "e" },
          { from: "e", to: "f" },
        ],
      },
    },
    references: ["R1"],
    speakerNotes:
      "Verify variable data such as batch number and expiry as required. Significant or unusual reconciliation discrepancies must be investigated and acceptably justified before release. Remaining items with batch-specific information are destroyed per requirements with destruction recorded. Return of items without batch data to stores must follow the approved procedure. Legal label content also depends on approved product text and destination-market rules; Chapter 5 alone does not cover all of this. Reference: EU GMP Chapter 5 Packaging Materials / Packaging Operations; Chapter 4 for document control.",
    revealSteps: 6,
  }),
  slide(17, {
    id: "s17-ch6-qc",
    section: "operations",
    title: "Chapter 6: Quality Control",
    keyMessage:
      "In the EU, batch certification by a QP is not the same as performing tests or QC approval alone.",
    content: [
      "Sampling and specifications.",
      "Test methods and recording of results.",
      "Investigation of non-conforming or unexpected results.",
      "Ongoing stability programme.",
      "Participation in quality decisions.",
      "Prevent use or supply before required evaluations and approvals are complete.",
    ],
    visualType: "comparisonTable",
    visualData: {
      table: {
        headers: ["QC activity", "What it assures"],
        rows: [
          ["Sampling & specifications", "Defined attributes are tested against approved criteria"],
          ["Methods & results", "Reliable execution and recorded evidence"],
          ["OOS / unexpected results", "Investigation before disposition"],
          ["Stability programme", "Ongoing product quality over shelf life"],
          ["Quality decisions", "QC participation in release-related judgements"],
          ["Hold until approved", "No use or supply before required approvals"],
        ],
      },
      callout:
        "Important distinction: QP batch certification is not the same as performing tests or QC approval alone.",
    },
    references: ["R1", "R7"],
    speakerNotes: "Reference: EU GMP Chapter 6; Annex 16.",
    revealSteps: 7,
  }),
  slide(18, {
    id: "s18-ch7-outsourced",
    section: "operations",
    title: "Chapter 7: Outsourced Activities",
    keyMessage:
      "Outsourcing an activity does not remove responsibility for overseeing its quality.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Oversight cycle",
        nodes: [
          { id: "s", label: "Define scope" },
          { id: "a", label: "Assess capability" },
          { id: "c", label: "Contract" },
          { id: "e", label: "Exchange info" },
          { id: "m", label: "Monitor" },
          { id: "ch", label: "Control changes" },
        ],
        edges: [
          { from: "s", to: "a" },
          { from: "a", to: "c" },
          { from: "c", to: "e" },
          { from: "e", to: "m" },
          { from: "m", to: "ch" },
        ],
      },
      callout:
        "Examples: contract manufacture or testing, and printing of related packaging materials.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 7.",
    revealSteps: 7,
  }),
  slide(19, {
    id: "s19-ch8-complaints-recalls",
    section: "operations",
    title: "Chapter 8: Complaints, Quality Defects and Product Recalls",
    keyMessage:
      "Not every complaint is a quality defect; every complaint still needs appropriate evaluation.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Complaint to action",
        nodes: [
          { id: "r", label: "Record" },
          { id: "e", label: "Evaluate" },
          { id: "i", label: "Investigate" },
          { id: "b", label: "Batch impact" },
          { id: "a", label: "Actions" },
          { id: "n", label: "Notify / recall" },
        ],
        edges: [
          { from: "r", to: "e" },
          { from: "e", to: "i" },
          { from: "i", to: "b" },
          { from: "b", to: "a" },
          { from: "a", to: "n" },
        ],
      },
      callout:
        "Maintain recall readiness and evaluate the effectiveness of recall arrangements.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 8.",
    revealSteps: 7,
  }),
  slide(20, {
    id: "s20-ch9-self-inspection",
    section: "operations",
    title: "Chapter 9: Self Inspection",
    keyMessage:
      "An effective outcome is not only a report; it is demonstrable system correction.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Self-inspection loop",
        nodes: [
          { id: "p", label: "Programme" },
          { id: "c", label: "Competent auditors" },
          { id: "f", label: "Findings" },
          { id: "a", label: "Actions" },
          { id: "u", label: "Follow-up" },
        ],
        edges: [
          { from: "p", to: "c" },
          { from: "c", to: "f" },
          { from: "f", to: "a" },
          { from: "a", to: "u" },
        ],
      },
      callout:
        "Example areas: personnel, documentation, production, QC, equipment, distribution, and recall.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 9.",
    revealSteps: 6,
  }),
];

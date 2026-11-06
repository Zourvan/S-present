import { slide } from "./helpers";

export const operationsSlides = [
  slide(8, {
    id: "s08-nine-chapters-map",
    section: "operations",
    title: "Map of the Nine EU GMP Chapters — Part I",
    content: [],
    visualType: "comparisonTable",
    visualData: {
      table: {
        headers: ["Chapter", "Title"],
        rows: [
          ["1", "Pharmaceutical Quality System"],
          ["2", "Personnel"],
          ["3", "Premises and Equipment"],
          ["4", "Documentation"],
          ["5", "Production"],
          ["6", "Quality Control"],
          ["7", "Outsourced Activities"],
          ["8", "Complaints, Quality Defects and Product Recalls"],
          ["9", "Self Inspection"],
        ],
        caption:
          "These are the nine basic-requirement chapters; annexes provide related complementary requirements.",
      },
    },
    references: ["R1"],
    speakerNotes: "Reference: EudraLex Volume 4, Part I.",
    revealSteps: 9,
  }),
  slide(9, {
    id: "s09-ch1-pqs",
    section: "operations",
    title: "Chapter 1: Pharmaceutical Quality System",
    keyMessage: "The system must provide assurance that:",
    content: [
      "The product is manufactured suitably for its intended use.",
      "Marketing authorisation and applicable regulatory requirements are met.",
      "Processes are defined and under control.",
      "Deviations are investigated and appropriate actions are taken.",
      "Changes are evaluated and approved before implementation.",
      "Product quality and system effectiveness are reviewed.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Example: Product Quality Review (PQR) to examine trends, process consistency, and improvement needs.",
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
    content: [
      "Sufficient numbers of competent personnel.",
      "Clear organisational structure and job descriptions.",
      "Independence of production and quality-control responsibilities from each other.",
      "Initial and ongoing training appropriate to the role.",
      "Assessment of the practical effectiveness of training.",
      "Personal hygiene, gowning, and entry requirements observed.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Attending training alone does not prove competence to perform the work.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 2.",
    revealSteps: 7,
  }),
  slide(11, {
    id: "s11-ch3-premises",
    section: "operations",
    title: "Chapter 3: Premises and Equipment",
    content: [
      "Design and layout suited to the operations.",
      "Reduced likelihood of error, contamination, and cross-contamination.",
      "Effective cleaning and maintenance possible.",
      "Appropriate environmental conditions.",
      "Control of equipment status and measuring instruments.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Distinct concepts — Qualification: confirm suitability and correct performance. Calibration: relate an instrument reading to a reference. Preventive Maintenance: planned maintenance to reduce failures.",
    },
    references: ["R1", "R6"],
    speakerNotes: "Reference: EU GMP Chapter 3; Annex 15.",
    revealSteps: 6,
  }),
  slide(12, {
    id: "s12-ch4-documentation",
    section: "operations",
    title: "Chapter 4: Documentation",
    keyMessage:
      "Instructions say what should be done; records show what was done.",
    content: [
      "Instructions: specifications; manufacturing and packaging instructions; SOPs and protocols.",
      "Records / reports: batch and equipment records; test results; investigation and validation reports.",
      "Requirements: approval, version control, contemporaneous recording, traceability, and appropriate retention.",
    ],
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
      shared: ["Approval · Version control · Contemporaneous recording · Traceability"],
      callout:
        "Instructions say what should be done; records show what was done.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 4.",
    revealSteps: 4,
  }),
  slide(13, {
    id: "s13-data-integrity",
    section: "operations",
    title: "Data Integrity — ALCOA+",
    keyMessage: "ALCOA+: attributable, legible, contemporaneous, original, accurate — plus complete, consistent, enduring, available.",
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
    revealSteps: 7,
  }),
  slide(14, {
    id: "s14-ch5-production",
    section: "operations",
    title: "Chapter 5: Production",
    content: [
      "Use materials with defined identity and status.",
      "Perform operations according to approved instructions.",
      "Control contamination and cross-contamination based on risk.",
      "Record parameters and in-process controls.",
      "Review yields and reconcile quantities as required.",
      "Control packaging and prevent mix-ups.",
    ],
    visualType: "callout",
    visualData: {
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
    content: [
      "Materials, containers, and products in process must be identifiable.",
      "Necessary information such as name or code and batch number should appear as appropriate to the stage.",
      "Status must be clear: quarantine, released, or rejected.",
      "Equipment and its status should be identified where needed.",
      "Information must be legible, clear, and free of contradiction.",
      "Relabelling must be controlled and preserve traceability.",
    ],
    visualType: "callout",
    visualData: {
      callout: "Unclear identity or status is not permission to use.",
    },
    references: ["R1"],
    speakerNotes:
      "Colour alone is not enough; there is no single global colour scheme for all organisations. In some cases, validated electronic control can reduce the need for physical labels if related requirements and control effectiveness are met. Reference: EU GMP Chapter 5; Chapter 3 for equipment.",
    revealSteps: 7,
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
      callout: "A correct label on the wrong product is also dangerous.",
    },
    references: ["R1"],
    speakerNotes:
      "Verify variable data such as batch number and expiry as required. Significant or unusual reconciliation discrepancies must be investigated and acceptably justified before release. Remaining items with batch-specific information are destroyed per requirements with destruction recorded. Return of items without batch data to stores must follow the approved procedure. Legal label content also depends on approved product text and destination-market rules; Chapter 5 alone does not cover all of this. Reference: EU GMP Chapter 5 Packaging Materials / Packaging Operations; Chapter 4 for document control.",
    revealSteps: 7,
  }),
  slide(17, {
    id: "s17-ch6-qc",
    section: "operations",
    title: "Chapter 6: Quality Control",
    content: [
      "Sampling and specifications.",
      "Test methods and recording of results.",
      "Investigation of non-conforming or unexpected results.",
      "Ongoing stability programme.",
      "Participation in quality decisions.",
      "Prevent use or supply before required evaluations and approvals are complete.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Important distinction: in the EU, batch certification by a QP is not the same as performing tests or QC approval alone.",
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
    content: [
      "Clearly define the scope of the activity.",
      "Assess contractor competence and capability.",
      "Written contract defining responsibilities.",
      "Information exchange and access to records.",
      "Performance monitoring and periodic review.",
      "Control of changes and further subcontracting.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Examples: contract manufacture or testing, and printing of related packaging materials. Outsourcing an activity does not remove responsibility for overseeing its quality.",
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
    content: [
      "Record and evaluate complaints or quality-defect information.",
      "Risk- and evidence-based investigation.",
      "Assess possible involvement of other batches or products.",
      "Determine cause and appropriate actions.",
      "Notify competent authorities where required.",
      "Recall readiness and evaluation of recall arrangements’ effectiveness.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Not every complaint is a quality defect; every complaint still needs appropriate evaluation.",
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
    content: [
      "A programme covering GMP-related activities.",
      "Competent persons with appropriate independence.",
      "Document observations and findings.",
      "Define action, owner, and due date.",
      "Follow up implementation of actions.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Example areas: personnel, documentation, production, QC, equipment, distribution, and recall. An effective outcome is not only a report; it is demonstrable system correction.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapter 9.",
    revealSteps: 6,
  }),
];

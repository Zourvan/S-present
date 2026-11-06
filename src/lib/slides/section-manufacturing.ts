import { slide } from "./helpers";

export const manufacturingSlides = [
  slide(21, {
    id: "s21-gdp-scope",
    section: "manufacturing",
    title: "GDP Purpose and Scope",
    keyMessage:
      "Preserve product quality, integrity, and traceability throughout distribution.",
    content: [
      "Authorised supply chain.",
      "Appropriate storage and transport conditions.",
      "Clear product identity and status.",
      "Reliable, traceable records.",
      "Control of contractors.",
      "Management of returns, recalls, and products suspected of falsification.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Preserve product quality, integrity, and traceability throughout distribution.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, introduction and Chapter 1.",
    revealSteps: 7,
  }),
  slide(22, {
    id: "s22-supply-chain-qualification",
    section: "manufacturing",
    title: "Qualification of Supply-Chain Parties",
    content: [
      "Verify supplier authorisation and qualification.",
      "Confirm customer / recipient qualification.",
      "Assess contractors proportionate to risk.",
      "Review approval status of parties.",
      "Review orders and unusual trading patterns.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Example: an unknown source, unusual price, or atypical supply route needs investigation.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapters 5 and 7.",
    revealSteps: 6,
  }),
  slide(23, {
    id: "s23-receipt-status",
    section: "manufacturing",
    title: "Receipt and Product Status Control",
    content: [
      "Match order, documents, and product.",
      "Identity, quantity, and batch information.",
      "Packaging integrity and absence of tampering signs.",
      "Evidence of transport conditions as appropriate to the product.",
      "Status of damaged or suspect items.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Products with special conditions should be moved to a suitable location as a priority after required checks.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 5.",
    revealSteps: 6,
  }),
  slide(24, {
    id: "s24-warehouse-conditions",
    section: "manufacturing",
    title: "Warehouse Condition Control — Temperature Mapping & Monitoring",
    keyMessage:
      "A thermostat set-point does not prove conditions throughout the warehouse.",
    content: [
      "Storage conditions matching product requirements.",
      "Initial mapping under representative conditions.",
      "Sensor placement based on mapping results.",
      "Assess need to remapp after significant changes.",
      "Calibration, maintenance, and alarm testing.",
      "Designate who responds to alarms.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "A thermostat set-point does not prove conditions throughout the warehouse.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 3.",
    revealSteps: 7,
  }),
  slide(25, {
    id: "s25-inventory-status",
    section: "manufacturing",
    title: "Inventory Management and Status Segregation",
    content: [
      "Inventory rotation based on FEFO.",
      "Control of expiry and storage conditions.",
      "Segregate saleable stock from items under investigation or not for sale.",
      "Reconcile physical and system inventory.",
      "Investigate and record discrepancies.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Sensitive groups: returns, rejected, expired, recalled, and suspected falsified. Electronic segregation instead of physical is only considerable where adequacy, validation, and group-specific requirements are met.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapters 3 and 5.",
    revealSteps: 6,
  }),
  slide(26, {
    id: "s26-transport-cold-chain",
    section: "manufacturing",
    title: "Transport and Cold Chain",
    keyMessage:
      "Having a data logger alone does not mean the cold chain is controlled.",
    content: [
      "Risk-assess route and transport conditions.",
      "Select suitable vehicle and packaging.",
      "Use qualified equipment where needed.",
      "Maintain and monitor required conditions.",
      "Report delays, damage, and excursions.",
      "Define responsibilities at delivery and handover.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Having a data logger alone does not mean the cold chain is controlled.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 9.",
    revealSteps: 7,
  }),
  slide(27, {
    id: "s27-returns-falsified",
    section: "manufacturing",
    title: "Returns and Products Suspected of Falsification",
    content: [
      "Identity and packaging integrity.",
      "Supply and delivery history.",
      "Storage and transport conditions after delivery.",
      "Elapsed time and remaining shelf life.",
      "Adequacy of evidence that quality was preserved.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Before returning goods to saleable stock, complete the checks above. Products suspected of falsification must be controlled and reported per requirements.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 6.",
    revealSteps: 6,
  }),
  slide(28, {
    id: "s28-traceability-recall",
    section: "manufacturing",
    title: "Traceability and Recall Readiness",
    content: [
      "Supplier and recipient.",
      "Product identity and batch information as required.",
      "Quantity, date, and related dispatch information.",
    ],
    visualType: "relationship",
    visualData: {
      items: [
        {
          title: "Clear roles & communication",
          body: "Responsibilities and contacts defined for effective recall.",
        },
        {
          title: "Rapid record access",
          body: "Records available quickly when needed.",
        },
        {
          title: "Quantity reconciliation",
          body: "Distributed vs recovered quantities reconciled.",
        },
        {
          title: "Evaluate arrangements",
          body: "Recall arrangements are assessed for effectiveness.",
        },
      ],
      callout:
        "Records must enable tracing of supplier and recipient; product identity and batch information; quantity, date, and related dispatch information.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapters 4 to 6.",
    revealSteps: 4,
  }),
];

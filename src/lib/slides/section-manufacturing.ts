import { slide } from "./helpers";

export const manufacturingSlides = [
  slide(21, {
    id: "s21-gdp-scope",
    section: "manufacturing",
    title: "GDP Purpose and Scope",
    keyMessage:
      "Preserve product quality, integrity, and traceability throughout distribution.",
    content: [],
    visualType: "overviewGrid",
    visualData: {
      items: [
        { title: "Authorised chain", body: "Authorised supply chain." },
        {
          title: "Conditions",
          body: "Appropriate storage and transport conditions.",
        },
        {
          title: "Identity & status",
          body: "Clear product identity and status.",
        },
        {
          title: "Records",
          body: "Reliable, traceable records.",
        },
        {
          title: "Contractors",
          body: "Control of contractors.",
        },
        {
          title: "Returns & falsified",
          body: "Manage returns, recalls, and suspected falsification.",
        },
      ],
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, introduction and Chapter 1.",
    revealSteps: 6,
  }),
  slide(22, {
    id: "s22-supply-chain-qualification",
    section: "manufacturing",
    title: "Qualification of Supply-Chain Parties",
    keyMessage:
      "An unknown source, unusual price, or atypical supply route needs investigation.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Qualify and monitor",
        nodes: [
          { id: "v", label: "Verify supplier" },
          { id: "c", label: "Confirm recipient" },
          { id: "a", label: "Assess contractors" },
          { id: "r", label: "Review status" },
          { id: "p", label: "Review patterns" },
        ],
        edges: [
          { from: "v", to: "c" },
          { from: "c", to: "a" },
          { from: "a", to: "r" },
          { from: "r", to: "p" },
        ],
      },
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
    keyMessage:
      "Products with special conditions should move to a suitable location as a priority after required checks.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Receipt checks",
        nodes: [
          { id: "m", label: "Match docs" },
          { id: "i", label: "Identity & batch" },
          { id: "p", label: "Pack integrity" },
          { id: "t", label: "Transport evidence" },
          { id: "s", label: "Status decision" },
        ],
        edges: [
          { from: "m", to: "i" },
          { from: "i", to: "p" },
          { from: "p", to: "t" },
          { from: "t", to: "s" },
        ],
      },
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 5.",
    revealSteps: 5,
  }),
  slide(24, {
    id: "s24-warehouse-conditions",
    section: "manufacturing",
    title: "Warehouse Condition Control — Temperature Mapping & Monitoring",
    keyMessage:
      "A thermostat set-point does not prove conditions throughout the warehouse.",
    content: [],
    visualType: "hierarchy",
    visualData: {
      layers: [
        "Product storage requirements",
        "Mapping under representative conditions",
        "Sensor placement from mapping results",
        "Ongoing monitoring, calibration, and alarm response",
      ],
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 3.",
    revealSteps: 5,
  }),
  slide(25, {
    id: "s25-inventory-status",
    section: "manufacturing",
    title: "Inventory Management and Status Segregation",
    keyMessage:
      "Segregate saleable stock from items under investigation or not for sale.",
    content: [],
    visualType: "relationship",
    visualData: {
      items: [
        {
          title: "FEFO & expiry",
          body: "Inventory rotation based on FEFO; control expiry and storage conditions.",
        },
        {
          title: "Saleable stock",
          body: "Segregate saleable stock from items under investigation or not for sale.",
        },
        {
          title: "Sensitive groups",
          body: "Returns, rejected, expired, recalled, and suspected falsified.",
        },
        {
          title: "Reconciliation",
          body: "Reconcile physical and system inventory; investigate discrepancies.",
        },
      ],
      callout:
        "Electronic segregation instead of physical is only considerable where adequacy, validation, and group-specific requirements are met.",
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapters 3 and 5.",
    revealSteps: 5,
  }),
  slide(26, {
    id: "s26-transport-cold-chain",
    section: "manufacturing",
    title: "Transport and Cold Chain",
    keyMessage:
      "Having a data logger alone does not mean the cold chain is controlled.",
    content: [],
    visualType: "processSteps",
    visualData: {
      flow: {
        title: "Cold-chain control",
        nodes: [
          { id: "r", label: "Risk-assess route" },
          { id: "v", label: "Vehicle & pack" },
          { id: "q", label: "Qualified equipment" },
          { id: "m", label: "Monitor conditions" },
          { id: "e", label: "Report excursions" },
          { id: "h", label: "Handover roles" },
        ],
        edges: [
          { from: "r", to: "v" },
          { from: "v", to: "q" },
          { from: "q", to: "m" },
          { from: "m", to: "e" },
          { from: "e", to: "h" },
        ],
      },
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 9.",
    revealSteps: 6,
  }),
  slide(27, {
    id: "s27-returns-falsified",
    section: "manufacturing",
    title: "Returns and Products Suspected of Falsification",
    keyMessage:
      "Before returning goods to saleable stock, complete the required checks.",
    content: [],
    visualType: "decisionTree",
    visualData: {
      items: [
        { title: "Identity & packaging", body: "Confirm integrity." },
        { title: "Supply history", body: "Review delivery history." },
        {
          title: "Conditions after delivery",
          body: "Storage and transport conditions.",
        },
        {
          title: "Shelf life remaining",
          body: "Elapsed time and remaining life.",
        },
        {
          title: "Evidence of quality",
          body: "Adequacy of evidence that quality was preserved.",
        },
        {
          title: "Suspected falsified",
          body: "Control and report per requirements.",
        },
      ],
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapter 6.",
    revealSteps: 6,
  }),
  slide(28, {
    id: "s28-traceability-recall",
    section: "manufacturing",
    title: "Traceability and Recall Readiness",
    keyMessage:
      "Records must enable tracing of supplier, recipient, product, batch, quantity, and dispatch.",
    content: [],
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
    },
    references: ["R2"],
    speakerNotes: "Reference: EU GDP, Chapters 4 to 6.",
    revealSteps: 4,
  }),
];

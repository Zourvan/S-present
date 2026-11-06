import { slide } from "./helpers";

export const foundationsSlides = [
  slide(2, {
    id: "s02-learning-objectives",
    section: "foundations",
    title: "Learning Objectives",
    keyMessage: "By the end of this session we will be able to:",
    content: [
      "Explain the difference and relationship between GMP and GDP.",
      "Recognize the main requirements of the nine EU GMP chapters.",
      "Understand the role of documentation and data integrity.",
      "State the principles of identification, labelling, and label control.",
      "Recognize the links between deviation, risk, CAPA, and change.",
      "Select an appropriate first response when facing a quality event.",
    ],
    visualType: "bullets",
    speakerNotes:
      "Use this slide to set expectations; return to these bullets in the closing summary.",
    revealSteps: 6,
  }),
  slide(3, {
    id: "s03-final-test-not-enough",
    section: "foundations",
    title: "Why Final Testing Alone Is Not Enough",
    keyMessage: "Quality cannot be assured by final testing alone.",
    content: [
      "Testing is performed on samples and defined attributes.",
      "Not all process errors are revealed by final testing.",
      "Labelling errors, mix-ups, or data defects may go undetected.",
      "Quality must be built into the process and preserved along the chain.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Passing laboratory results do not replace process compliance with GMP.",
    },
    references: ["R1"],
    speakerNotes: "Reference: EU GMP, Chapters 1 and 6.",
    revealSteps: 5,
  }),
  slide(4, {
    id: "s04-patient-quality",
    section: "foundations",
    title: "Medicine Quality from the Patient’s Perspective",
    keyMessage: "Ultimate goal: patient protection",
    content: [
      "Correct identity throughout its authorised shelf life.",
      "Appropriate strength or amount of active substance.",
      "Relevant purity and microbiological quality requirements met.",
      "Expected performance delivered.",
      "Supplied in suitable packaging with correct information.",
    ],
    visualType: "callout",
    visualData: {
      callout: "Ultimate goal: patient protection",
    },
    references: ["R1", "R3"],
    speakerNotes:
      "Critical quality attributes depend on product type; for example, sterility is not required for every dosage form. Reference: EU GMP Chapter 1; ICH Q9(R1).",
    revealSteps: 6,
  }),
  slide(5, {
    id: "s05-gmp-vs-gdp",
    section: "foundations",
    title: "Difference and Relationship: GMP and GDP",
    keyMessage:
      "Shared goal: control activities that affect quality and protect the patient.",
    content: [
      "GDP here means Good Distribution Practice; good documentation practice is denoted GDocP.",
    ],
    visualType: "comparisonTable",
    visualData: {
      table: {
        headers: ["Topic", "GMP", "GDP"],
        rows: [
          ["Title", "Good Manufacturing Practice", "Good Distribution Practice"],
          [
            "Focus",
            "Consistent manufacture and control of the product",
            "Preserving product quality and integrity",
          ],
          [
            "Example activities",
            "Manufacture, packaging, quality control",
            "Receipt, storage, supply, and transport",
          ],
          [
            "Example risks",
            "Contamination, mix-up, process error",
            "Temperature excursion, damage, broken traceability",
          ],
        ],
        caption: "Shared goal: control quality-affecting activities and protect patients.",
      },
    },
    references: ["R1", "R2"],
    speakerNotes:
      "Clarify GDocP vs GDP if the audience confuses documentation with distribution. Reference: EU GMP Chapter 1; EU GDP introduction and Chapter 1.",
    revealSteps: 4,
  }),
  slide(6, {
    id: "s06-pqs-lifecycle",
    section: "foundations",
    title: "Quality System Across the Product Lifecycle",
    keyMessage: "Pharmaceutical Quality System — PQS",
    content: [
      "Product and process knowledge is managed.",
      "Quality risks are identified and controlled.",
      "Process performance and product quality are monitored.",
      "Problems and changes are managed systematically.",
      "Improvement opportunities are identified.",
    ],
    visualType: "lifecycle",
    visualData: {
      items: [
        { title: "Development", body: "Build product and process knowledge" },
        { title: "Tech transfer", body: "Move knowledge into operations" },
        { title: "Commercial manufacture", body: "Monitor and control" },
        { title: "Discontinuation", body: "Manage end of supply" },
      ],
      callout:
        "ICH Q10 enablers: knowledge management and quality risk management.",
    },
    references: ["R4"],
    speakerNotes: "Reference: ICH Q10, sections 1 and 3.",
    revealSteps: 5,
  }),
  slide(7, {
    id: "s07-management-culture",
    section: "foundations",
    title: "Management Responsibility and Quality Culture",
    keyMessage:
      "Quality culture is shaped by daily decisions and behaviours of management and staff.",
    content: [
      "Provide resources and competent personnel.",
      "Define and communicate responsibilities and authorities.",
      "Support transparent reporting of errors and unusual conditions.",
      "Prevent production pressure from overriding quality requirements.",
      "Review quality-system performance and effectiveness.",
    ],
    visualType: "callout",
    visualData: {
      callout:
        "Quality culture is shaped by daily decisions and behaviours of management and staff.",
    },
    references: ["R1", "R4"],
    speakerNotes:
      "Fair review without rushed blame does not mean removing accountability. Reference: EU GMP Chapter 1; ICH Q10 section 2.",
    revealSteps: 6,
  }),
];

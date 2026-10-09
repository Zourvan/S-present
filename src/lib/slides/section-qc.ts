import { slide } from "./helpers";

export const qcSlides = [
  slide(34, {
    id: "s33-qc-organization",
    section: "qcValidation",
    title: "Quality Control Laboratory Organization",
    keyMessage:
      "The QC unit must be independent from production and possess adequate facilities, trained staff, and approved procedures.",
    content: [
      "Sample handling, chain of custody, and storage conditions preserve sample integrity until testing completes.",
      "Reference standards, reagents, and culture media qualified with traceability and expiry control.",
      "OOS and OOT results investigated before batch disposition—no averaging of failing results to pass.",
      "Biotech labs add bioassays, cell-based potency, and specialized containment where needed.",
      "Oral product labs emphasize dissolution, content uniformity, and related substances per Q6A.",
    ],
    visualType: "responsibilityMatrix",
    visualData: {
      matrix: {
        rows: ["Sample management", "Analytical testing", "Stability", "Microbiology", "QA review"],
        cols: ["Execute", "Approve method", "Investigate OOS", "Release batch"],
        cells: [
          ["R", "C", "I", "I"],
          ["R", "C", "C", "I"],
          ["R", "C", "C", "I"],
          ["R", "C", "C", "I"],
          ["C", "A", "R", "R"],
        ],
      },
      callout: "Illustrative matrix—align with Ronagen QC/QA SOPs.",
    },
    references: ["R4", "R1", "R13"],
    speakerNotes:
      "Stress independence: production cannot release its own test results without QC unit concurrence per 21 CFR 211.",
    revealSteps: 4,
  }),
  slide(35, {
    id: "s34-sampling-strategy",
    section: "qcValidation",
    title: "Sampling Plans and Testing Strategy",
    keyMessage:
      "Representative sampling and a registration-aligned test panel confirm each lot meets specifications before release.",
    content: [
      "Sampling SOPs define locations, tools, and container increments to avoid contamination and bias.",
      "Reduced testing and skip-lot programs require prior agreement with authorities and robust supplier history.",
      "Biotech release testing often includes identity, purity, potency, impurities, and general tests per Q6B monograph style.",
      "Oral finished products test per pharmacopoeial and dossier tests (assay, dissolution, microbial limits where applicable).",
      "Retain samples stored for mandated periods to enable future investigations.",
    ],
    visualType: "processSteps",
    visualData: {
      items: [
        { title: "Sample", body: "Representative draw" },
        { title: "Register", body: "LIMS / logbook entry" },
        { title: "Test", body: "Validated procedures" },
        { title: "Review", body: "Specification comparison" },
        { title: "Report", body: "COA / batch record link" },
      ],
    },
    references: ["R4", "R11", "R12"],
    speakerNotes:
      "Sterile products add sterility and endotoxin testing—only when product requires.",
    revealSteps: 5,
  }),
  slide(36, {
    id: "s35-analytical-validation",
    section: "qcValidation",
    title: "Analytical Procedure Validation (ICH Q2(R2) / Q14)",
    keyMessage:
      "Validated analytical methods provide documented evidence that procedures are fit for intended use across the lifecycle.",
    content: [
      "Validation parameters (specificity, linearity, accuracy, precision, range, robustness) selected per method type.",
      "Q14 encourages analytical procedure development with defined design space and lifecycle management.",
      "Transfer of validated methods to QC or contract labs requires documented comparability.",
      "Biotech assays (ELISA, cell potency) need additional attention to reference material stability and system suitability.",
      "Revalidation triggered by significant method or equipment changes.",
    ],
    visualType: "comparisonTable",
    visualData: {
      table: {
        caption: "Typical validation emphasis (illustrative)",
        headers: ["Method type", "Key parameters", "Pathway"],
        rows: [
          ["HPLC assay", "Specificity, linearity, accuracy", "Oral / biotech"],
          ["Dissolution", "Robustness, discrimination", "Oral"],
          ["Cell-based potency", "Precision, reference standard", "Biotech"],
          ["qPCR adventitious", "Specificity, LOD qualification", "Biotech"],
        ],
      },
    },
    references: ["R13", "R14", "R6"],
    speakerNotes:
      "Avoid citing acceptance criteria numbers—those live in validation protocols and registrations.",
    revealSteps: 4,
  }),
  slide(37, {
    id: "s36-specifications",
    section: "qcValidation",
    title: "Specifications: Chemical (Q6A) vs Biological (Q6B)",
    keyMessage:
      "Specifications translate control strategy into measurable criteria justified by development data and stability.",
    content: [
      "Q6A covers new drug substances and products (chemical) including universal and specific tests.",
      "Q6B addresses biotechnological/biological products with emphasis on characterization and lot release panels.",
      "Acceptance criteria must be justified—not copied from pharmacopoeia without product-specific data.",
      "Periodic or skip testing only where scientifically supported and approved.",
      "Specification changes follow change control and regulatory reporting per Q12 categorization where implemented.",
    ],
    visualType: "splitPathways",
    visualData: {
      leftTitle: "Q6A — chemical focus",
      rightTitle: "Q6B — biological focus",
      leftSteps: [
        "Related substances / impurities",
        "Assay and dissolution",
        "Water content / physical tests",
      ],
      rightSteps: [
        "Potency and purity profiles",
        "Size variants / aggregation",
        "Glycosylation where CQA",
      ],
      shared: ["Identity", "General quality attributes", "Stability-indicating methods"],
    },
    references: ["R11", "R12", "R6"],
    speakerNotes:
      "Highlight that biologics often use multi-attribute methods and platform specs with product-specific brackets.",
    revealSteps: 4,
  }),
  slide(38, {
    id: "s37-stability",
    section: "qcValidation",
    title: "Stability Studies and Shelf-Life Justification",
    keyMessage:
      "ICH stability guidelines support retest periods and shelf-life claims with statistically sound data under defined storage.",
    content: [
      "Long-term, accelerated, and stress studies characterize degradation pathways and support specifications.",
      "Storage conditions labeled per ICH zones and product requirements (including cold chain for some biologics).",
      "Ongoing stability program monitors commercial batches on a rolling basis.",
      "Post-approval commitments track stability per registration obligations.",
      "Stability failures trigger investigation and potential field action assessment.",
    ],
    visualType: "monitoringChart",
    visualData: {
      chart: {
        labels: ["M0", "M3", "M6", "M9", "M12", "M18", "M24"],
        series: [100, 98, 97, 96, 95, 94, 93],
        note: "Illustrative potency %—not product-specific acceptance limits.",
      },
    },
    references: ["R6", "R11", "R12"],
    speakerNotes:
      "Do not infer shelf life from the chart—it is fictional for format demonstration.",
    revealSteps: 4,
  }),
  slide(39, {
    id: "s38-process-validation",
    section: "qcValidation",
    title: "Process Validation Lifecycle",
    keyMessage:
      "FDA process validation guidance defines three stages: process design, process qualification, and continued process verification.",
    content: [
      "Stage 1 — Process design captures knowledge from development and risk assessment (Q8/Q9).",
      "Stage 2 — Process performance qualification (PPQ) confirms reproducibility at commercial scale before routine release.",
      "Stage 3 — Continued process verification monitors intra-batch and inter-batch variation.",
      "Biotech PPQ often spans multiple consecutive lots with comprehensive attribute testing.",
      "Oral solid PPQ may bracket strengths and pack sizes with justified worst-case coverage.",
    ],
    visualType: "lifecycle",
    visualData: {
      items: [
        { title: "Stage 1", body: "Design & control strategy" },
        { title: "Stage 2", body: "PPQ / qualification lots" },
        { title: "Stage 3", body: "CPV & trending" },
      ],
    },
    references: ["R7", "R17", "R6"],
    speakerNotes:
      "Legacy term ‘three batches’ is insufficient alone—justify number of PPQ lots with risk and statistics.",
    revealSteps: 3,
  }),
  slide(40, {
    id: "s39-continued-verification",
    section: "qcValidation",
    title: "Continued Process Verification (CPV)",
    keyMessage:
      "Ongoing monitoring confirms the process remains in a state of control after initial validation.",
    content: [
      "CPV plans define parameters, attributes, sampling frequency, and statistical rules.",
      "Annual product review (APR / PQR) aggregates batches, deviations, OOS, complaints, and stability.",
      "Signal detection triggers engineering or QA review before drift becomes non-conformance.",
      "Biotech CPV includes trending of cell culture performance and purification yields.",
      "Oral CPV emphasizes compression weights, dissolution, and related substances trends.",
    ],
    visualType: "dashboard",
    visualData: {
      kpis: [
        { label: "CPP within control", value: "Control chart status", kind: "leading" },
        { label: "CQA capability", value: "CpK / PpK where used", kind: "lagging" },
        { label: "Deviation rate", value: "Quality system health", kind: "leading" },
        { label: "APR actions closed", value: "Management follow-through", kind: "lagging" },
      ],
      callout: "Illustrative KPI labels—define thresholds in Ronagen CPV protocols.",
    },
    references: ["R7", "R6"],
    speakerNotes:
      "Capability indices require sufficient data—do not quote numeric CpK values in training without real studies.",
    revealSteps: 4,
  }),
  slide(41, {
    id: "s40-computerized-systems",
    section: "qcValidation",
    title: "Computerized Systems and CSV",
    keyMessage:
      "GAMP 5 principles and 21 CFR Part 11 / EU Annex 11 expectations apply when systems create or modify GMP records.",
    content: [
      "Risk-based validation proportional to system impact on patient safety, product quality, and data integrity.",
      "User requirements, functional specs, IQ/OQ/PQ, and traceability matrices documented.",
      "Access control, audit trails, backup, and disaster recovery tested periodically.",
      "Bioprocess data historians and LIMS integrations require interface validation.",
      "Vendor SaaS solutions need quality agreements and periodic review of supplier compliance.",
    ],
    visualType: "hierarchy",
    visualData: {
      layers: [
        "Infrastructure qualification (servers, network)",
        "Application validation (MES, LIMS, ERP GMP modules)",
        "Operational controls (SOPs, training, change control)",
        "Periodic review & revalidation triggers",
      ],
    },
    references: ["R8", "R4", "R17"],
    speakerNotes:
      "CSV scope creep is common—maintain validated system inventory with GxP criticality rating.",
    revealSteps: 4,
  }),
  slide(42, {
    id: "s41-batch-release",
    section: "qcValidation",
    title: "Batch Record Review, QP Release, and Certification",
    keyMessage:
      "No batch reaches market until production records, QC results, and deviations are reviewed and approved per regional law.",
    content: [
      "EU requires Qualified Person certification before release to market.",
      "US relies on QC unit approval and responsible person signatures per 21 CFR 211.192.",
      "Review checklist covers completeness, calculations, label reconciliation, and deviation closure status.",
      "Biotech release may require additional review of cell culture records and viral clearance lot linkage.",
      "Rejected batches quarantined and dispositioned per SOP—destruction documented.",
    ],
    visualType: "decisionTree",
    visualData: {
      items: [
        { title: "Complete BPR?", body: "No → hold for documentation" },
        { title: "All tests pass?", body: "No → OOS investigation" },
        { title: "Open critical deviations?", body: "Yes → no release" },
        { title: "QP / QC approval", body: "Release to market or QP certification" },
      ],
    },
    references: ["R1", "R4", "R16"],
    speakerNotes:
      "Export markets may require separate release steps—Ronagen must maintain country-specific matrices.",
    revealSteps: 4,
  }),
];

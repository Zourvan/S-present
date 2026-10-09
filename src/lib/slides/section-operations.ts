import { slide } from "./helpers";

export const operationsSlides = [
  slide(11, {
    id: "s10-personnel-training",
    section: "operations",
    title: "Personnel Qualification and GMP Training",
    keyMessage:
      "Qualified, trained personnel are a prerequisite for consistent GMP performance across oral and biotech operations.",
    content: [
      "Job descriptions define GMP responsibilities; hiring and periodic re-qualification demonstrate competency.",
      "Initial and ongoing training covers GMP principles, hygiene, procedures, and role-specific tasks with documented attendance.",
      "Training effectiveness should be verified (e.g., assessment, supervised execution) before independent work.",
      "Consultants and contractors must be qualified and supervised under written agreements.",
      "Biotech roles may require additional training on aseptic technique, biosafety, and cell-handling where applicable.",
    ],
    visualType: "processSteps",
    visualData: {
      items: [
        { title: "Define competency", body: "Role-based curricula" },
        { title: "Deliver training", body: "Classroom + on-the-job" },
        { title: "Assess", body: "Tests / practical sign-off" },
        { title: "Maintain", body: "Annual refresh & change-driven updates" },
      ],
    },
    references: ["R1", "R4", "R15", "R16"],
    speakerNotes:
      "Training records are frequent inspection findings—ensure versioning aligns with current SOPs.",
    revealSteps: 4,
  }),
  slide(12, {
    id: "s11-hygiene-gowning",
    section: "operations",
    title: "Personnel Hygiene and Contamination Control",
    keyMessage:
      "Hygiene programs limit microbial and particulate introduction; gowning rigor scales with cleanroom classification where used.",
    content: [
      "Health and hygiene rules restrict ill personnel and cosmetic use in manufacturing areas.",
      "Non-sterile oral areas require clean attire and hand hygiene; controlled areas use defined gowning per facility classification.",
      "Sterile and aseptic operations require graded gowning, gloving, and behavior per Annex 1 / FDA aseptic guidance.",
      "Biotech upstream may use closed systems with biosafety levels; downstream and fill-finish may share sterile-area controls.",
      "Environmental monitoring trends validate hygiene and gowning effectiveness—not a substitute for robust process design.",
    ],
    visualType: "comparisonTable",
    visualData: {
      table: {
        caption: "Illustrative hygiene emphasis by area type",
        headers: ["Area type", "Typical focus", "Sterile-specific?"],
        rows: [
          ["Oral solid general", "Dust control, cross-contamination", "No"],
          ["Oral controlled humidity", "Moisture & microbial control", "No"],
          ["Biotech closed processing", "Biosafety, single-use discipline", "Often no in upstream"],
          ["Aseptic fill-finish", "Grades A/B gowning, interventions", "Yes"],
        ],
      },
    },
    references: ["R1", "R2", "R16", "R18"],
    speakerNotes:
      "Clarify that not every biotech step is sterile—match gowning SOPs to qualified room grades actually in use.",
    revealSteps: 4,
  }),
  slide(13, {
    id: "s12-facilities-layout",
    section: "operations",
    title: "Facilities Design, Layout, and Flow",
    keyMessage:
      "Logical material and personnel flows prevent mix-ups and contamination; design supports cleaning and maintenance access.",
    content: [
      "Buildings must be suitable for intended operations with sufficient space, lighting, and segregation of incompatible activities.",
      "Dedicated or campaign-based segregation prevents cross-contamination between APIs, sensitizing agents, or live organisms.",
      "Biotech facilities separate cell culture, purification, and fill areas with air-handling and pressure cascades as designed.",
      "Oral solid facilities segregate dispensing, processing, and packaging with dust extraction where needed.",
      "Qualification (DQ/IQ/OQ/PQ) confirms design intent before routine GMP use.",
    ],
    visualType: "flow",
    visualData: {
      flow: {
        title: "Conceptual material flow (shared principles)",
        nodes: [
          { id: "recv", label: "Receive & quarantine", pathway: "shared" },
          { id: "disp", label: "Dispense / weigh", pathway: "shared" },
          { id: "mfg", label: "Manufacture", pathway: "oral" },
          { id: "bio", label: "Bioprocess", pathway: "biotech" },
          { id: "pack", label: "Pack & label", pathway: "shared" },
          { id: "ship", label: "Released storage", pathway: "shared" },
        ],
        edges: [
          { from: "recv", to: "disp" },
          { from: "disp", to: "mfg" },
          { from: "disp", to: "bio" },
          { from: "mfg", to: "pack" },
          { from: "bio", to: "pack" },
          { from: "pack", to: "ship" },
        ],
      },
    },
    references: ["R1", "R4", "R17", "R16"],
    speakerNotes:
      "Facility diagrams in validation packages should match as-built layouts; update after renovations.",
    revealSteps: 4,
  }),
  slide(14, {
    id: "s13-utilities-hvac",
    section: "operations",
    title: "Utilities, HVAC, and Environmental Classification",
    keyMessage:
      "Qualified utilities and HVAC deliver air, water, and gases suitable for product contact and environmental control.",
    content: [
      "Pharmaceutical water systems (PW/WFI) require validated generation, storage, and distribution with monitoring.",
      "Compressed gases and nitrogen used in bioprocessing must meet quality attributes and point-of-use filters where required.",
      "HVAC maintains pressure differentials, temperature, humidity, and particulate counts per qualified cleanroom grades.",
      "Sterile zones (Grades A–D concept per Annex 1) apply to aseptic processing—not typical oral tablet rooms.",
      "Utility failures trigger predefined responses; re-qualification may be needed after major repairs.",
    ],
    visualType: "hierarchy",
    visualData: {
      layers: [
        "Grade A — critical zone (aseptic manipulation)",
        "Grade B — background to Grade A aseptic filling",
        "Grade C / D — less critical clean steps or preparation",
        "Controlled non-classified — many oral processing rooms",
        "Utilities layer — WFI, clean steam, HVAC qualification",
      ],
      callout: "Annex 1 grading applies where sterile manufacture is performed.",
    },
    references: ["R1", "R2", "R17", "R18"],
    speakerNotes:
      "Avoid quoting specific particle count limits from memory—reference current Annex 1 and site qualification reports.",
    revealSteps: 4,
  }),
  slide(15, {
    id: "s14-equipment-qualification",
    section: "operations",
    title: "Equipment Qualification (DQ / IQ / OQ / PQ)",
    keyMessage:
      "Annex 15 and industry practice require qualification evidence that equipment consistently performs for intended use.",
    content: [
      "Design Qualification (DQ) links user requirements to vendor design for new or modified equipment.",
      "Installation Qualification (IQ) documents as-installed configuration against specifications.",
      "Operational Qualification (OQ) challenges equipment functions across operating ranges.",
      "Performance Qualification (PQ) demonstrates consistent performance in routine or simulated process conditions.",
      "Bioreactors, chromatography skids, and tablet presses each carry product-specific qualification protocols.",
    ],
    visualType: "processSteps",
    visualData: {
      items: [
        { title: "DQ", body: "Requirements traceability" },
        { title: "IQ", body: "Installation & calibration hooks" },
        { title: "OQ", body: "Functional limits" },
        { title: "PQ", body: "Process-intended performance" },
        { title: "Requalification", body: "Change / periodic review triggers" },
      ],
    },
    references: ["R7", "R17"],
    speakerNotes:
      "Qualification is not the same as process validation—both are needed but answer different questions.",
    revealSteps: 5,
  }),
  slide(16, {
    id: "s15-calibration-maintenance",
    section: "operations",
    title: "Calibration, Maintenance, and Equipment Status",
    keyMessage:
      "Measuring and production equipment remain fit for use through scheduled calibration and preventive maintenance.",
    content: [
      "Calibration programs trace standards to national or international references with defined frequencies.",
      "Out-of-tolerance results trigger impact assessment on batches since last successful calibration.",
      "Preventive maintenance reduces unplanned downtime; work orders document parts, lubricants, and clearance to operate.",
      "Equipment status labels (clean, dirty, out of service) prevent mix-ups at point of use.",
      "Computerized maintenance management systems require validated access and audit trails when used for GMP decisions.",
    ],
    visualType: "bullets",
    visualData: {
      bullets: [
        "Master equipment list with criticality ranking",
        "Calibration due-date control with alerts",
        "Maintenance SOPs aligned with vendor manuals",
        "Post-maintenance cleaning and line clearance before release",
      ],
    },
    references: ["R4", "R8", "R17"],
    speakerNotes:
      "Shared instruments between R&D and GMP must have clear status control to avoid unqualified use.",
    revealSteps: 4,
  }),
  slide(17, {
    id: "s16-materials-warehouse",
    section: "operations",
    title: "Materials Control, Warehousing, and Dispensing",
    keyMessage:
      "Identity, status, and traceability of starting materials prevent mix-ups from receipt through batch incorporation.",
    content: [
      "Suppliers are approved via quality agreements and periodic re-evaluation; COAs verified against specifications.",
      "Receipt quarantine until sampling and QC release; status labels visible at all storage locations.",
      "FIFO/FEFO or risk-based stock rotation for APIs, excipients, and packaging components.",
      "Dispensing under second-person verification or equivalent controls for critical weights.",
      "Biotech raw materials (media, resins, single-use assemblies) require lot traceability and often cold-chain monitoring.",
    ],
    visualType: "flow",
    visualData: {
      flow: {
        title: "Material status flow",
        nodes: [
          { id: "q", label: "Quarantine", pathway: "shared" },
          { id: "t", label: "Sample / test", pathway: "shared" },
          { id: "r", label: "Released", pathway: "shared" },
          { id: "rj", label: "Rejected", pathway: "shared" },
        ],
        edges: [
          { from: "q", to: "t" },
          { from: "t", to: "r" },
          { from: "t", to: "rj" },
        ],
      },
    },
    references: ["R1", "R4", "R11", "R16"],
    speakerNotes:
      "API starting materials for biotech (e.g., chemically synthesized fragments) still follow material control principles.",
    revealSteps: 4,
  }),
  slide(18, {
    id: "s17-production-operations",
    section: "operations",
    title: "Production Operations and In-Process Control",
    keyMessage:
      "Controlled operations transform approved materials into intermediates and bulk product with documented IPCs.",
    content: [
      "Master batch records define sequence, equipment, parameters, and yields; operators record contemporaneous data.",
      "In-process controls (weight variation, blend time, bioreactor parameters) confirm process remains in validated state.",
      "Line clearance between products or batches prevents mix-ups and label errors.",
      "Reprocessing and rework follow predefined procedures with QA approval—not ad hoc recovery.",
      "Biotech operations emphasize closed processing, single-use integrity checks, and hold-time studies.",
    ],
    visualType: "dashboard",
    visualData: {
      kpis: [
        { label: "Batch right-first-time", value: "Leading indicator", kind: "leading" },
        { label: "IPC excursions", value: "Process drift signal", kind: "leading" },
        { label: "Yield vs validated range", value: "Continued verification", kind: "lagging" },
        { label: "Schedule adherence", value: "Operational", kind: "leading" },
      ],
      callout: "KPI labels are illustrative—Ronagen should define site-specific metrics.",
    },
    references: ["R4", "R7", "R16"],
    speakerNotes:
      "Dashboard numbers should not be fabricated in this deck—use real site data when presenting internally.",
    revealSteps: 4,
  }),
  slide(19, {
    id: "s18-documentation-di",
    section: "operations",
    title: "Documentation, Records, and Data Integrity",
    keyMessage:
      "Complete, accurate records provide the evidence chain for batch release and demonstrate CGMP compliance.",
    content: [
      "Batch production records, logbooks, and electronic systems must support reconstruction of each manufacturing step.",
      "ALCOA+ principles apply to paper and electronic data; metadata and audit trails are part of the record.",
      "FDA and EU expectations address shared logins, blank forms, unofficial spreadsheets, and deletion without trace.",
      "Records retention aligns with regulatory and business requirements; accessible for inspection.",
      "Biotech data sets (chromatography, cell culture trends) require defined review and backup strategies.",
    ],
    visualType: "callout",
    visualData: {
      callout: "If it was not documented contemporaneously, it did not happen in the eyes of the regulator.",
      bullets: [
        "Controlled templates and version management",
        "Review and approval signatures (electronic or wet)",
        "Periodic data integrity audits",
        "Training on prohibited practices (e.g., backdating)",
      ],
    },
    references: ["R4", "R8", "R1"],
    speakerNotes:
      "Highlight recent inspection trends on hybrid paper/electronic workflows—common gap area during Ronagen scale-up.",
    revealSteps: 4,
  }),
];

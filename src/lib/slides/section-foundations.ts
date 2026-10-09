import { slide } from "./helpers";

export const foundationsSlides = [
  slide(3, {
    id: "s02-executive",
    section: "foundations",
    title: "Executive Overview: GMP Purpose and Scope",
    keyMessage:
      "GMP translates pharmaceutical quality systems into controlled manufacturing that consistently meets approved specifications and protects patients.",
    content: [
      "Good Manufacturing Practice (GMP) is the minimum standard for methods, facilities, and controls used in manufacture, processing, packing, and holding of drug products.",
      "Scope spans conventional oral finished products and biotechnology-derived drug substances and products; sterile requirements apply only where the dosage form or process demands sterility.",
      "Implementation rests on a Pharmaceutical Quality System (PQS) aligned with ICH Q10, not on isolated checklist compliance.",
      "Regulatory frameworks (EU GMP, US CGMP, WHO GMP) share common principles; site-specific interpretation and national requirements still govern.",
      "This presentation supports Ronagen implementation planning—timelines are organizational estimates, not statutory deadlines.",
    ],
    visualType: "overviewGrid",
    visualData: {
      items: [
        {
          title: "Patient safety",
          body: "Consistent quality reduces risk of substandard or contaminated medicines.",
        },
        {
          title: "Regulatory compliance",
          body: "Demonstrable control of processes, materials, and records.",
        },
        {
          title: "Business continuity",
          body: "Robust systems reduce deviations, recalls, and supply disruption.",
        },
        {
          title: "Dual pathways",
          body: "Shared PQS with product-specific controls for oral vs biotech.",
        },
      ],
    },
    references: ["R1", "R3", "R4", "R15"],
    speakerNotes:
      "Frame GMP as risk-based control, not bureaucracy. Clarify that Ronagen may operate one or both pathways; do not imply current GMP certification status.",
    revealSteps: 5,
  }),
  slide(4, {
    id: "s03-product-taxonomy",
    section: "foundations",
    title: "Product Taxonomy: Conventional Oral vs Biotechnology-Derived",
    keyMessage:
      "Regulatory expectations diverge by product type—classification drives applicable annexes, validation depth, and QC strategy.",
    content: [
      "Conventional oral medicines: small-molecule APIs and finished dosage forms (tablets, capsules, liquids) governed primarily by general GMP chapters and ICH Q6A.",
      "Biotechnology-derived products: proteins, monoclonal antibodies, vaccines, and advanced therapies from living systems—additional controls for cell banks, viral safety, and comparability (ICH Q5 series, Q6B).",
      "Hybrid products (e.g., peptides, complex biologics in oral delivery) require case-by-case mapping to the dominant regulatory paradigm.",
      "Sterile manufacturing (Annex 1 / aseptic guidance) applies to sterile injectables and certain ophthalmic/biotech fill-finish—not to typical non-sterile oral solid dose lines.",
      "Pathway labels in visuals indicate focus areas; both may share warehousing, QC labs, and quality systems where justified.",
    ],
    visualType: "taxonomy",
    visualData: {
      legend: [
        { label: "Conventional oral", pathway: "oral" },
        { label: "Biotechnology-derived", pathway: "biotech" },
        { label: "Shared PQS elements", pathway: "shared" },
      ],
      items: [
        { title: "Small-molecule API", body: "Chemical synthesis, impurity control, Q6A specs" },
        { title: "Oral finished dose", body: "Blend, granulation, compression, coating, pack" },
        { title: "Recombinant protein / mAb", body: "Cell line, upstream, downstream, formulation" },
        { title: "Vaccines / complex biologics", body: "Seed lots, inactivation, adjuvants, cold chain" },
      ],
    },
    references: ["R1", "R5", "R6", "R11", "R12", "R16"],
    speakerNotes:
      "Stress that ‘biotech’ does not automatically mean sterile—many biologics are lyophilized or liquid injectables requiring Annex 1, while oral biologics remain rare. Avoid over-generalizing.",
    revealSteps: 5,
  }),
  slide(5, {
    id: "s04-regulatory-framework",
    section: "foundations",
    title: "Regulatory Framework: EU, US, and WHO Alignment",
    keyMessage:
      "Harmonized ICH guidelines sit atop region-specific GMP regulations; global sites must map all applicable layers.",
    content: [
      "EU: EudraLex Volume 4 (Chapters 1–9, Part II APIs, Annexes 1–19 as applicable).",
      "US: 21 CFR Parts 210/211 (finished pharmaceuticals), Part 600 series entry for biological products, plus FDA guidance.",
      "WHO: TRS GMP annexes support national regulatory authority expectations in many markets.",
      "ICH Q7–Q14 provide science-based quality guidelines referenced by major authorities.",
      "Marketing authorization and national inspectorates define which annexes and pharmacopoeial standards bind each product.",
    ],
    visualType: "hierarchy",
    visualData: {
      layers: [
        "National law & marketing authorization",
        "Regional GMP rules (EU / US / WHO)",
        "ICH quality guidelines (Q8–Q14, Q5, Q6)",
        "Product-specific annexes (e.g., Annex 1 sterile, Annex 15 validation)",
        "Site quality manual & procedures",
      ],
    },
    references: ["R1", "R3", "R4", "R5", "R6", "R15"],
    speakerNotes:
      "Reference date for cited URLs: 9 October 2026. Do not claim live regulatory re-verification in this session.",
    revealSteps: 5,
  }),
  slide(6, {
    id: "s05-pqs",
    section: "foundations",
    title: "Pharmaceutical Quality System (PQS)",
    keyMessage:
      "ICH Q10 defines the PQS as management responsibilities, resources, and continual improvement over the product lifecycle.",
    content: [
      "Management commitment and quality policy cascade to measurable objectives and resource allocation.",
      "Process performance and product quality monitoring feed management review and CAPA.",
      "Change management and knowledge management link development, tech transfer, and commercial manufacture.",
      "PQS integrates GMP with pharmaceutical development (Q8), QRM (Q9), and quality systems elements (Q10).",
      "Oral and biotech operations share PQS backbone; product-specific modules address process and control differences.",
    ],
    visualType: "cycle",
    visualData: {
      items: [
        { title: "Pharmaceutical development", body: "Q8 / QbD knowledge" },
        { title: "Technology transfer", body: "Scaled control strategy" },
        { title: "Commercial manufacture", body: "GMP execution" },
        { title: "Product discontinuation", body: "Retention & change closure" },
      ],
      callout: "Continual improvement closes the loop via CAPA and management review.",
    },
    references: ["R6", "R15", "R19"],
    speakerNotes:
      "Emphasize that a written quality manual alone is insufficient—evidence of operation (records, metrics, audits) demonstrates PQS maturity.",
    revealSteps: 5,
  }),
  slide(7, {
    id: "s06-quality-risk-management",
    section: "foundations",
    title: "Quality Risk Management (QRM)",
    keyMessage:
      "ICH Q9 requires proactive identification, assessment, control, and review of risks to quality across the lifecycle.",
    content: [
      "Risk assessment tools (FMEA, FTA, HACCP-style analysis) prioritize controls commensurate with severity, probability, and detectability.",
      "QRM informs facility design, process design, validation extent, and contamination control strategy—not a one-time exercise.",
      "Documented rationale supports inspector dialogue; risk acceptability must align with patient safety and regulatory expectations.",
      "Biotech adds risks: adventitious agents, product-related impurities, and supply chain for critical raw materials.",
      "Oral solid dose risks often center on cross-contamination, blend uniformity, and moisture-sensitive APIs.",
    ],
    visualType: "riskMatrix",
    visualData: {
      axes: {
        x: "Detectability (low → high)",
        y: "Severity × probability (low → high)",
        cells: [
          ["Monitor", "Mitigate", "Priority control"],
          ["Accept with rationale", "Reduce risk", "Mandatory CAPA"],
          ["Document", "Validate control", "Stop / redesign"],
        ],
      },
      callout: "Illustrative matrix—for training only; site assessments use validated scoring.",
    },
    references: ["R6", "R17"],
    speakerNotes:
      "Explicitly label the matrix as illustrative. Never substitute a generic matrix for product-specific risk files.",
    revealSteps: 4,
  }),
  slide(8, {
    id: "s07-gmp-principles",
    section: "foundations",
    title: "Core GMP Principles and Responsibilities",
    keyMessage:
      "Clear accountability, validated processes, qualified personnel, and complete records underpin every batch release decision.",
    content: [
      "Manufacturing and quality units must be independent; batch release authority rests with the Qualified Person / authorized release function per region.",
      "Written procedures control every operational step; deviations require investigation before repeat operations.",
      "Materials, labels, and packaging components are quarantined until released by QC or defined procedures.",
      "Self-inspection and supplier qualification extend control beyond the physical site fence.",
      "Data must be attributable, legible, contemporaneous, original, and accurate (ALCOA+) with audit trails where computerized.",
    ],
    visualType: "responsibilityMatrix",
    visualData: {
      matrix: {
        rows: ["Production", "Quality Control", "Quality Assurance", "Engineering", "Management"],
        cols: ["Execute batch", "Test & release", "Audit & CAPA", "Qualify equipment", "Resource PQS"],
        cells: [
          ["R", "C", "I", "C", "I"],
          ["C", "R", "C", "I", "I"],
          ["A", "C", "R", "C", "C"],
          ["C", "I", "C", "R", "I"],
          ["I", "I", "A", "I", "R"],
        ],
      },
      callout: "R = Responsible, A = Accountable, C = Consulted, I = Informed (illustrative RACI).",
    },
    references: ["R1", "R4", "R8", "R15"],
    speakerNotes:
      "Adapt RACI to Ronagen’s actual org chart. QP terminology is EU-specific; US uses QC unit and authorized release.",
    revealSteps: 5,
  }),
  slide(9, {
    id: "s08-qbd-overview",
    section: "foundations",
    title: "Quality by Design (QbD): Lifecycle Perspective",
    keyMessage:
      "ICH Q8 describes QbD as systematic development building quality into the product via defined quality target product profile and control strategy.",
    content: [
      "Quality Target Product Profile (QTPP) summarizes intended use, route, and quality attributes of the drug product.",
      "Critical Quality Attributes (CQAs) are physical, chemical, biological, or microbiological properties that should be controlled.",
      "Design space and control strategy link material attributes and process parameters to CQAs.",
      "QbD is expected for new chemical entities and increasingly for biologics comparability and post-approval changes (Q12).",
      "Legacy products may implement QbD elements retrospectively through knowledge management and process validation.",
    ],
    visualType: "lifecycle",
    visualData: {
      items: [
        { title: "Define QTPP", body: "Patient and label claims" },
        { title: "Identify CQAs", body: "Risk-ranked attributes" },
        { title: "Link CPPs & MAT", body: "Process and material controls" },
        { title: "Control strategy", body: "Monitoring & specs" },
        { title: "Lifecycle", body: "Change under Q12 where applicable" },
      ],
    },
    references: ["R6", "R19"],
    speakerNotes:
      "QbD depth varies by product class; biologics emphasize attribute control and comparability rather than classical design space for small molecules.",
    revealSteps: 5,
  }),
  slide(10, {
    id: "s09-qbd-elements",
    section: "foundations",
    title: "QbD Elements: CQAs, CPPs, and Control Strategy",
    keyMessage:
      "A documented control strategy demonstrates how commercial manufacturing maintains CQAs within approved limits.",
    content: [
      "Critical Process Parameters (CPPs) and critical material attributes are identified through development and risk assessment.",
      "In-process controls and specifications form a layered defense— not reliance on final testing alone.",
      "For oral products: dissolution, content uniformity, and impurity profiles often drive CQAs.",
      "For biotech: potency, purity, glycosylation, aggregation, and bioburden/endotoxin (where relevant) dominate CQA sets.",
      "Regulatory submissions encode the control strategy; post-approval changes must assess impact on validated state.",
    ],
    visualType: "relationship",
    visualData: {
      flow: {
        title: "Control strategy linkage (conceptual)",
        nodes: [
          { id: "qtpp", label: "QTPP", pathway: "shared" },
          { id: "cqa", label: "CQAs", pathway: "shared" },
          { id: "cpp", label: "CPPs / PAR", pathway: "oral" },
          { id: "cppb", label: "Upstream / downstream CPPs", pathway: "biotech" },
          { id: "ipc", label: "IPC & specs", pathway: "shared" },
        ],
        edges: [
          { from: "qtpp", to: "cqa" },
          { from: "cqa", to: "cpp" },
          { from: "cqa", to: "cppb" },
          { from: "cpp", to: "ipc" },
          { from: "cppb", to: "ipc" },
        ],
      },
    },
    references: ["R6", "R10", "R11", "R12"],
    speakerNotes:
      "Do not invent numerical design-space limits in training—cite approved registration documents for commercial products.",
    revealSteps: 4,
  }),
];

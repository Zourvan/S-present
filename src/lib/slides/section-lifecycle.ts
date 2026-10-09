import { slide } from "./helpers";
import { deviationDetailSlides } from "./section-deviations";

export const lifecycleSlides = [
  slide(43, {
    id: "s42-deviations-investigations",
    section: "lifecycle",
    title: "Deviations, Investigations, and CAPA",
    keyMessage:
      "Unplanned departures from approved instructions require timely investigation, impact assessment, and corrective action.",
    content: [
      "Deviation classification drives investigation depth and regulatory reporting timelines where applicable.",
      "Root cause tools (5-Why, Ishikawa) supported by evidence—not conclusions without data.",
      "CAPA effectiveness verified after implementation; ineffective CAPA re-opened.",
      "Biotech deviations may affect cell bank integrity, bioreactor contamination, or viral filter integrity.",
      "Oral deviations often involve blend uniformity, label mix-ups, or cleaning failures.",
    ],
    visualType: "investigation",
    visualData: {
      items: [
        { title: "Detect", body: "Line, lab, or audit finding" },
        { title: "Contain", body: "Quarantine affected material" },
        { title: "Investigate", body: "Root cause & impact" },
        { title: "Correct", body: "CAPA with owners & dates" },
        { title: "Verify", body: "Effectiveness check" },
      ],
    },
    references: ["R1", "R4", "R15"],
    speakerNotes:
      "Avoid closing deviations with ‘operator error’ without systemic corrective measures.",
    revealSteps: 5,
  }),
  ...deviationDetailSlides,
  slide(54, {
    id: "s43-change-control",
    section: "lifecycle",
    title: "Change Control and Post-Approval Management",
    keyMessage:
      "ICH Q12 enables structured post-approval change management when implemented with regulatory commitments.",
    content: [
      "Changes categorized by potential impact on validated state, registration, and patient risk.",
      "Technical assessments include revalidation, stability, and comparability triggers for biologics.",
      "Regulatory reporting (variation, supplement) per approved change categorization.",
      "Temporary changes (e.g., equipment substitute) require predefined limits and restoration plans.",
      "Knowledge management captures lessons for similar future changes.",
    ],
    visualType: "flow",
    visualData: {
      flow: {
        title: "Change control flow",
        nodes: [
          { id: "req", label: "Change request", pathway: "shared" },
          { id: "assess", label: "Impact assessment", pathway: "shared" },
          { id: "approve", label: "QA approval", pathway: "shared" },
          { id: "impl", label: "Implement & verify", pathway: "shared" },
          { id: "reg", label: "Regulatory submission (if needed)", pathway: "shared" },
        ],
        edges: [
          { from: "req", to: "assess" },
          { from: "assess", to: "approve" },
          { from: "approve", to: "impl" },
          { from: "impl", to: "reg" },
        ],
      },
    },
    references: ["R19", "R10", "R6"],
    speakerNotes:
      "Q12 establishment conditions are optional by region—confirm Ronagen marketing authorizations.",
    revealSteps: 4,
  }),
  slide(55, {
    id: "s44-complaints-recalls",
    section: "lifecycle",
    title: "Complaints, Recalls, and Field Alerts",
    keyMessage:
      "Market feedback closes the quality loop; serious quality defects trigger rapid assessment and regulatory notification.",
    content: [
      "Complaint handling SOPs define intake, medical evaluation, investigation, and trending.",
      "Recall classification and execution plans protect patients and meet authority timelines.",
      "Biotech complaints may involve immunogenicity signals requiring pharmacovigilance interface.",
      "Oral complaints often relate to appearance, packaging, or dissolution performance.",
      "Mock recall exercises test traceability and communication readiness.",
    ],
    visualType: "processSteps",
    visualData: {
      items: [
        { title: "Receive", body: "Log and triage" },
        { title: "Investigate", body: "Batch trace & test retain" },
        { title: "Decide", body: "Field action if warranted" },
        { title: "Report", body: "Authorities & customers" },
        { title: "Trend", body: "APR / signal detection" },
      ],
    },
    references: ["R4", "R1"],
    speakerNotes:
      "Coordinate with pharmacovigilance for adverse events vs quality complaints.",
    revealSteps: 5,
  }),
  slide(56, {
    id: "s45-supplier-cmo",
    section: "lifecycle",
    title: "Supplier Quality and Contract Manufacturing",
    keyMessage:
      "GMP responsibility cannot be outsourced—sponsors and MA holders remain accountable for contract operations.",
    content: [
      "Quality agreements define responsibilities, change notification, and audit rights.",
      "Initial and periodic audits of API, CMO, and critical service providers.",
      "Technology transfer packages ensure CMO executes approved master records.",
      "Biotech CMO oversight includes cell bank custody, viral safety, and fill-finish capability alignment.",
      "Oral CMO focus: blend uniformity data, cleaning validation, and packaging controls.",
    ],
    visualType: "relationship",
    visualData: {
      flow: {
        title: "Sponsor–CMO oversight",
        nodes: [
          { id: "sponsor", label: "Marketing authorization holder", pathway: "shared" },
          { id: "qa", label: "QA / supplier quality", pathway: "shared" },
          { id: "cmo", label: "Contract manufacturer", pathway: "shared" },
          { id: "reg", label: "Regulatory dossier", pathway: "shared" },
        ],
        edges: [
          { from: "sponsor", to: "qa" },
          { from: "qa", to: "cmo" },
          { from: "cmo", to: "reg" },
        ],
      },
    },
    references: ["R1", "R4", "R16"],
    speakerNotes:
      "Dual sourcing requires comparability or equivalence evidence per product type.",
    revealSteps: 4,
  }),
  slide(57, {
    id: "s46-audit-inspection",
    section: "lifecycle",
    title: "Self-Inspection and Regulatory Inspection Readiness",
    keyMessage:
      "Proactive audits detect gaps before regulators do; inspection readiness is a continuous state, not a project.",
    content: [
      "Self-inspection program covers all GMP areas on a risk-based schedule with independent reviewers where possible.",
      "Inspection readiness includes data integrity walks, mock interviews, and document retrieval drills.",
      "483 / observation responses require root cause and sustained remediation evidence.",
      "Biotech sites prepare subject matter experts for aseptic processing and viral safety topics when applicable.",
      "Oral sites emphasize cross-contamination, OOS trends, and packaging controls.",
    ],
    visualType: "bullets",
    visualData: {
      bullets: [
        "Master list of open CAPAs and aging deviations",
        "Validation status summary current within 30 days",
        "Training compliance report",
        "EM and utilities trend summaries (where sterile areas exist)",
        "Reference library with controlled versions",
      ],
    },
    references: ["R1", "R4", "R8"],
    speakerNotes:
      "visualType checklist may render as bullets component—content is readiness themes.",
    revealSteps: 4,
  }),
  slide(58, {
    id: "s47-comparability-biotech",
    section: "lifecycle",
    title: "Comparability for Biotechnological Products",
    keyMessage:
      "ICH Q5E guides comparability exercises when manufacturing process changes may affect quality, safety, or efficacy.",
    content: [
      "Comparability protocol defines attributes, analytical panel, and acceptance logic before change execution.",
      "Side-by-side testing of pre- and post-change material at sufficient scale.",
      "Non-clinical or clinical bridging only when analytical data insufficient to conclude comparability.",
      "Not typically applied to conventional small-molecule oral products where Q6A impurity profiles suffice.",
      "Post-approval changes under Q12 may reference established conditions to streamline reporting.",
    ],
    visualType: "comparisonTable",
    visualData: {
      table: {
        caption: "Change impact lens (illustrative)",
        headers: ["Change type", "Oral small molecule", "Biologic"],
        rows: [
          ["Equipment move", "Revalidation + stability", "Comparability + PPQ"],
          ["Scale-up", "Dissolution / uniformity focus", "Attribute & glycan panel"],
          ["Site transfer", "Tech transfer package", "Extensive analytics ± clinical"],
        ],
      },
    },
    references: ["R10", "R12", "R19"],
    speakerNotes:
      "Comparability is science- and product-specific—avoid one-size analytical panels.",
    revealSteps: 4,
  }),
  slide(59, {
    id: "s48-quality-metrics",
    section: "lifecycle",
    title: "Quality Metrics and Management Review",
    keyMessage:
      "Management review uses leading and lagging indicators to drive resource decisions and continual improvement.",
    content: [
      "Metrics span deviations, CAPA aging, right-first-time batches, complaint rates, and audit findings.",
      "Management review minutes document decisions, resource allocation, and escalation.",
      "Biotech adds bioreactor success rate and contamination event frequency where relevant.",
      "Targets should be realistic benchmarks—not arbitrary quotas that incentivize under-reporting.",
      "Trends feed quality culture and Ronagen strategic planning.",
    ],
    visualType: "dashboard",
    visualData: {
      kpis: [
        { label: "Open critical CAPAs", value: "Count & age", kind: "leading" },
        { label: "Repeat deviations", value: "Systemic signal", kind: "leading" },
        { label: "Lot release cycle time", value: "Operational", kind: "lagging" },
        { label: "Training compliance %", value: "Enabler metric", kind: "leading" },
      ],
      callout: "Illustrative dashboard—populate with Ronagen quality intelligence.",
    },
    references: ["R6", "R15"],
    speakerNotes:
      "Never fabricate metric values in external presentations; use anonymized aggregates internally.",
    revealSteps: 4,
  }),
  slide(60, {
    id: "s49-implementation-governance",
    section: "lifecycle",
    title: "GMP Implementation Governance at Ronagen",
    keyMessage:
      "Successful implementation requires executive sponsorship, cross-functional teams, and phased deliverables tied to risk.",
    content: [
      "Steering committee sets priority by product pipeline (oral vs biotech) and market entry timelines.",
      "Workstreams: quality system, facilities, validation, IT, training, and regulatory affairs.",
      "Gap assessments against EU/US/WHO expectations produce prioritized remediation backlogs.",
      "Communication plan aligns Persian- and English-speaking teams on shared GMP vocabulary (UI bilingual, content English).",
      "Success measured by audit outcomes, release reliability, and closed gaps—not slide completion alone.",
    ],
    visualType: "overviewGrid",
    visualData: {
      items: [
        { title: "Quality system", body: "SOPs, PQS, pharmacovigilance interface" },
        { title: "Operations", body: "Facilities, equipment, supply chain" },
        { title: "Product-specific", body: "Oral line vs bioprocess modules" },
        { title: "Digital", body: "LIMS, MES, data integrity" },
      ],
    },
    references: ["R15", "R16", "R1"],
    speakerNotes:
      "Timelines discussed on the next slide are organizational estimates subject to budget and scope approval.",
    revealSteps: 4,
  }),
  slide(61, {
    id: "s50-implementation-roadmap",
    section: "lifecycle",
    title: "Implementation Roadmap (Organizational Estimate)",
    keyMessage:
      "Phased implementation reduces parallel risk; durations are planning estimates—not regulatory mandates.",
    content: [
      "Phase 1 — Foundation: PQS documentation, training framework, and gap assessment.",
      "Phase 2 — Infrastructure: facility qualification, utilities, and laboratory readiness.",
      "Phase 3 — Process readiness: validation protocols, tech transfer, and supplier qualification.",
      "Phase 4 — Commercial pilot: PPQ batches, release pathways, and inspection rehearsal.",
      "Phase 5 — Continuous improvement: CPV maturity, Q12 change management, and metric optimization.",
    ],
    visualType: "roadmap",
    visualData: {
      phases: [
        {
          name: "Phase 1 — Foundation",
          period: "Months 1–6 (estimate)",
          activities: ["PQS charter", "Gap assessment", "Core SOP rollout", "Training academy"],
          deliverables: ["Quality manual", "Remediation backlog", "Training matrix"],
        },
        {
          name: "Phase 2 — Infrastructure",
          period: "Months 4–12 (estimate)",
          activities: ["DQ/IQ/OQ utilities", "Lab instrument qualification", "Warehouse controls"],
          deliverables: ["Qualification summaries", "EM program (where needed)"],
        },
        {
          name: "Phase 3 — Process readiness",
          period: "Months 10–18 (estimate)",
          activities: ["Process validation protocols", "Cleaning validation", "CMO audits"],
          deliverables: ["Approved validation packages", "Tech transfer reports"],
        },
        {
          name: "Phase 4 — Commercial pilot",
          period: "Months 16–24 (estimate)",
          activities: ["PPQ execution", "Batch release drills", "Mock inspection"],
          deliverables: ["PPQ report", "Release SOPs proven in practice"],
        },
        {
          name: "Phase 5 — Sustain",
          period: "Ongoing",
          activities: ["CPV dashboards", "Management review", "Q12 lifecycle changes"],
          deliverables: ["APR outputs", "Mature CAPA system", "Inspection readiness"],
        },
      ],
      callout: "Overlapping phases reflect realistic resourcing—not sequential waterfall only.",
    },
    references: ["R7", "R17", "R19"],
    speakerNotes:
      "Adjust months to Ronagen board-approved plan. Emphasize these are not legal deadlines.",
    revealSteps: 5,
  }),
];

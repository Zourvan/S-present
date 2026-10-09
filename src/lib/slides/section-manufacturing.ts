import { slide } from "./helpers";

export const manufacturingSlides = [
  slide(20, {
    id: "s19-manufacturing-pathways",
    section: "manufacturing",
    title: "Manufacturing Pathways: Oral Solid vs Bioprocess",
    keyMessage:
      "Distinct unit operations share GMP documentation and release discipline while differing in process risks and controls.",
    content: [
      "Conventional oral: API receipt, dispensing, granulation/blending, compression/encapsulation, coating, packaging.",
      "Biotechnology: cell bank vial thaw, seed train, production bioreactor, harvest, purification, formulation, fill-finish.",
      "Shared: batch record control, deviation management, IPC, cleaning, and QP / quality release.",
      "Sterile fill-finish and aseptic steps apply only on pathways producing sterile drug products.",
      "Technology transfer must map control strategy elements to each pathway’s equipment and scale.",
    ],
    visualType: "splitPathways",
    visualData: {
      leftTitle: "Conventional oral finished dose",
      rightTitle: "Biotechnology-derived",
      leftSteps: [
        "Dispense API & excipients",
        "Blend / granulate / dry",
        "Compress or encapsulate",
        "Coat (if applicable)",
        "Primary & secondary pack",
      ],
      rightSteps: [
        "Cell bank & seed expansion",
        "Production culture / expression",
        "Harvest & clarification",
        "Purification (chromatography)",
        "Formulate / sterile or non-sterile fill",
      ],
      shared: [
        "Batch documentation",
        "In-process controls",
        "Cleaning & line clearance",
        "QC sampling & release",
      ],
      legend: [
        { label: "Oral pathway", pathway: "oral" },
        { label: "Biotech pathway", pathway: "biotech" },
        { label: "Shared GMP", pathway: "shared" },
      ],
    },
    references: ["R1", "R4", "R5", "R16"],
    speakerNotes:
      "Master slide 18 equivalent. Walk through shared controls before diving into pathway-specific modules.",
    revealSteps: 5,
  }),
  slide(21, {
    id: "s20-api-small-molecule",
    section: "manufacturing",
    title: "Small-Molecule API Manufacturing (Oral Chain)",
    keyMessage:
      "API GMP (ICH Q7, EU Part II) establishes impurity control and traceability feeding oral finished-product sites.",
    content: [
      "Starting materials and reagents are qualified; synthetic route defines impurity profile and control points.",
      "Critical steps include reaction control, crystallization, drying, and milling with IPC and release testing.",
      "Change control evaluates impact on registered starting materials, intermediates, and specifications.",
      "API sites may be separate from finished dose—technical agreements define responsibilities and COA reliance.",
      "Not the primary focus for in-house biotech cell-culture API unless hybrid synthetic steps exist.",
    ],
    visualType: "processSteps",
    visualData: {
      items: [
        { title: "Synthesis", body: "Controlled reactions & IPC" },
        { title: "Isolation", body: "Crystallization / extraction" },
        { title: "Purification", body: "Impurity clearance" },
        { title: "Release", body: "Spec vs Q6A / registration" },
      ],
    },
    references: ["R6", "R11", "R1"],
    speakerNotes:
      "If Ronagen only formulates purchased API, emphasize incoming API qualification and skip deep synthesis detail.",
    revealSteps: 4,
  }),
  slide(22, {
    id: "s21-oral-solid-dose",
    section: "manufacturing",
    title: "Oral Solid Dosage: Granulation, Compression, Coating",
    keyMessage:
      "Unit operations must deliver content uniformity, physical stability, and bioavailability per approved dossier.",
    content: [
      "Wet or dry granulation controls particle size distribution and blend uniformity for low-dose potent compounds.",
      "Compression parameters (force, pre-compression) link to hardness, friability, and dissolution CQAs.",
      "Film coating manages appearance, moisture barrier, and modified release where designed.",
      "Hold times and environmental conditions are validated when materials are exposed between steps.",
      "Cross-contamination control uses dedicated equipment, cleaning validation, or campaign sequencing with rationale.",
    ],
    visualType: "flow",
    visualData: {
      flow: {
        title: "Typical oral solid sequence",
        nodes: [
          { id: "b", label: "Blend", pathway: "oral" },
          { id: "g", label: "Granulate", pathway: "oral" },
          { id: "d", label: "Dry / size", pathway: "oral" },
          { id: "l", label: "Lubricate & compress", pathway: "oral" },
          { id: "c", label: "Coat", pathway: "oral" },
        ],
        edges: [
          { from: "b", to: "g" },
          { from: "g", to: "d" },
          { from: "d", to: "l" },
          { from: "l", to: "c" },
        ],
      },
    },
    references: ["R4", "R6", "R11"],
    speakerNotes:
      "Direct compression routes skip granulation—adjust narrative to actual registered process.",
    revealSteps: 4,
  }),
  slide(23, {
    id: "s22-liquids-semisolids",
    section: "manufacturing",
    title: "Oral Liquids, Suspensions, and Semisolids",
    keyMessage:
      "Homogeneity, microbial control, and container closure integrity define GMP controls for non-solid oral forms.",
    content: [
      "Vessel cleaning and sanitization prevent microbial proliferation and cross-contamination.",
      "Mixing times and speeds validated for uniform API distribution in suspensions and emulsions.",
      "Preservatives and antimicrobial effectiveness testing where applicable per pharmacopoeia and registration.",
      "Filling controls manage volume/weight and particulate matter per compendial expectations.",
      "Distinct from sterile injectable liquids—non-sterile oral liquids do not require aseptic processing unless specified.",
    ],
    visualType: "bullets",
    visualData: {
      bullets: [
        "Validated mixing and hold times",
        "Microbial limits monitoring program",
        "Primary container compatibility studies",
        "Labeling for storage conditions",
      ],
    },
    references: ["R4", "R11"],
    speakerNotes:
      "Contrast with WFI-based injectable manufacturing to avoid sterile/ non-sterile confusion.",
    revealSteps: 4,
  }),
  slide(24, {
    id: "s23-packaging-labeling",
    section: "manufacturing",
    title: "Packaging, Labeling, and Serialization",
    keyMessage:
      "Packaging operations prevent mix-ups; labels and leaflets must match approved artwork and market language.",
    content: [
      "Line clearance verifies removal of previous batch materials, labels, and coding components.",
      "On-line verification (barcode, vision systems) confirms code, expiry, and serial numbers where mandated.",
      "Tamper-evident features and child-resistant packaging per regional requirements.",
      "Biotech cold-chain products require validated shippers and temperature monitors for distribution qualification.",
      "Serialization and aggregation rules vary by market—implement per legal obligations, not this training deck.",
    ],
    visualType: "processSteps",
    visualData: {
      items: [
        { title: "Primary pack", body: "Bottle, blister, vial (product-dependent)" },
        { title: "Secondary pack", body: "Carton, insert" },
        { title: "Verify", body: "Vision / manual checks" },
        { title: "Ship", body: "Released FG warehouse" },
      ],
    },
    references: ["R1", "R4"],
    speakerNotes:
      "Serialization numeric requirements are jurisdiction-specific—reference Ronagen market list.",
    revealSteps: 4,
  }),
  slide(25, {
    id: "s24-cell-banking",
    section: "manufacturing",
    title: "Cell Banking and Seed Lots (Biotechnology)",
    keyMessage:
      "Master and working cell banks provide traceable, characterized starting material for each bioprocess campaign.",
    content: [
      "Master Cell Bank (MCB) and Working Cell Bank (WCB) established under controlled conditions with full documentation.",
      "Characterization includes identity, purity, stability, and absence of adventitious agents per ICH Q5A scope.",
      "Storage in qualified cryogenic or controlled freezers with alarm monitoring and inventory control.",
      "Seed train expansion links vial thaw to production bioreactor with passage limits defined in registration.",
      "Cell banking facilities may be centralized—transport agreements must maintain chain of custody and temperature.",
    ],
    visualType: "lifecycle",
    visualData: {
      items: [
        { title: "MCB", body: "Single source of truth" },
        { title: "WCB", body: "Routine manufacturing entry" },
        { title: "Seed train", body: "Controlled expansions" },
        { title: "Production", body: "Harvest lot linkage" },
      ],
    },
    references: ["R5", "R9", "R16"],
    speakerNotes:
      "Viral safety testing scope depends on cell substrate and product type—follow Q5A(R2) and dossier commitments.",
    revealSteps: 4,
  }),
  slide(26, {
    id: "s25-upstream-processing",
    section: "manufacturing",
    title: "Upstream Bioprocessing",
    keyMessage:
      "Bioreactor operations control nutrients, pH, dissolved oxygen, and contamination risk to deliver consistent titre and quality.",
    content: [
      "Media and feed preparation under GMP with filtration and bioburden control appropriate to process stage.",
      "Bioreactor parameters (temperature, agitation, gassing) monitored as CPPs linked to CQAs such as glycosylation or aggregation precursors.",
      "Aseptic additions to closed systems reduce open interventions; single-use systems require integrity testing discipline.",
      "Harvest timing and cell viability impact downstream load and impurity profile.",
      "Biosafety level and waste inactivation per institutional and regulatory requirements for live organisms.",
    ],
    visualType: "monitoringChart",
    visualData: {
      chart: {
        labels: ["T0", "T1", "T2", "T3", "T4", "Harvest"],
        series: [0.2, 0.5, 1.1, 2.0, 2.8, 3.2],
        excursionIndexes: [2],
        note: "Illustrative titre trend—not real batch data.",
      },
    },
    references: ["R5", "R16", "R9"],
    speakerNotes:
      "Chart is fictional for teaching—never present synthetic data as actual batch records.",
    revealSteps: 4,
  }),
  slide(27, {
    id: "s26-downstream-purification",
    section: "manufacturing",
    title: "Downstream Purification and Viral Clearance",
    keyMessage:
      "Purification removes process- and product-related impurities; viral clearance studies support safety claims.",
    content: [
      "Typical unit operations: clarification, capture chromatography, polishing steps, viral filtration, concentration, formulation.",
      "Resin and membrane lifecycle managed with cleaning, storage, and reuse limits validated.",
      "Viral clearance validation uses scaled-down models and qualified spiking studies where required by Q5A.",
      "Hold times for intermediates at each stage validated to prevent degradation or microbial growth.",
      "Pool release tests bridge upstream variability to final drug substance specifications (Q6B).",
    ],
    visualType: "flow",
    visualData: {
      flow: {
        title: "Conceptual downstream train",
        nodes: [
          { id: "h", label: "Harvest", pathway: "biotech" },
          { id: "cap", label: "Capture", pathway: "biotech" },
          { id: "pol", label: "Polish", pathway: "biotech" },
          { id: "vf", label: "Viral filter", pathway: "biotech" },
          { id: "ds", label: "Drug substance", pathway: "biotech" },
        ],
        edges: [
          { from: "h", to: "cap" },
          { from: "cap", to: "pol" },
          { from: "pol", to: "vf" },
          { from: "vf", to: "ds" },
        ],
      },
    },
    references: ["R9", "R12", "R16"],
    speakerNotes:
      "Monoclonal antibody platforms differ from vaccines—tailor examples to Ronagen portfolio.",
    revealSteps: 4,
  }),
  slide(28, {
    id: "s27-formulation-fill-biotech",
    section: "manufacturing",
    title: "Biotech Formulation and Fill-Finish",
    keyMessage:
      "Drug product manufacture links drug substance to final container with stability-preserving excipients and controlled filling.",
    content: [
      "Formulation development defines buffers, stabilizers, and surfactants to maintain potency and purity shelf life.",
      "Fill-finish may be sterile (vials, prefilled syringes) or non-sterile depending on product—match controls accordingly.",
      "Lyophilization cycles validated for cake structure and reconstitution where used.",
      "Container closure integrity verified for sterile products; visual inspection programs for particulates.",
      "Batch size and pooling rules documented to ensure traceability to drug substance lots.",
    ],
    visualType: "comparisonTable",
    visualData: {
      table: {
        caption: "Fill-finish control emphasis (illustrative)",
        headers: ["Product presentation", "Sterile GMP annex", "Typical extra controls"],
        rows: [
          ["Oral tablet (biologic N/A)", "No", "Standard oral GMP"],
          ["Liquid biologic vial", "Yes (Annex 1)", "Aseptic simulation, CCI"],
          ["Lyophilized mAb", "Yes", "Lyophilizer qualification, reconstitution IPC"],
        ],
      },
    },
    references: ["R2", "R12", "R18", "R16"],
    speakerNotes:
      "Ronagen must map each SKU to sterile vs non-sterile requirements—do not assume all biologics share one fill line.",
    revealSteps: 4,
  }),
  slide(29, {
    id: "s28-viral-adventitious-safety",
    section: "manufacturing",
    title: "Viral and Adventitious Agent Safety",
    keyMessage:
      "Biotechnology products require layered controls: sourcing, testing, and clearance to mitigate viral risk.",
    content: [
      "Raw materials of animal origin controlled per TSE and viral risk assessments where applicable.",
      "Cell bank and bulk testing programs defined in registration and Q5A principles.",
      "Downstream viral inactivation or removal steps validated with model viruses representative of risk.",
      "Detection methods (PCR, in vitro assays) qualified for intended sensitivity—not generic kit use without validation.",
      "Oral small molecules generally outside Q5A viral clearance scope unless biologically derived materials are used.",
    ],
    visualType: "hierarchy",
    visualData: {
      layers: [
        "Prevention — sourcing & closed processing",
        "Detection — lot testing & monitoring",
        "Removal — validated clearance steps",
        "Assurance — overall safety narrative in dossier",
      ],
    },
    references: ["R9", "R16"],
    speakerNotes:
      "Distinguish viral safety (biotech) from routine microbial limits testing (oral non-sterile).",
    revealSteps: 4,
  }),
  slide(30, {
    id: "s29-sterile-manufacturing",
    section: "manufacturing",
    title: "Sterile Manufacturing Principles (When Applicable)",
    keyMessage:
      "Sterile products demand contamination control strategy (CCS) integrating facility, process, and personnel elements.",
    content: [
      "Applies to sterile injectables, some ophthalmics, and sterile biologics—not standard oral tablet manufacturing.",
      "Terminal sterilization preferred where product stability allows; otherwise aseptic processing with rigorous environmental control.",
      "Media fills (process simulation) validate aseptic assembly at defined intervals.",
      "Container closure validation demonstrates protection over shelf life.",
      "Annex 1 (EU) and FDA aseptic guidance define contemporary expectations for CCS documentation.",
    ],
    visualType: "callout",
    visualData: {
      callout: "Apply this slide only where the product and process require sterility assurance.",
      bullets: [
        "Contamination control strategy document",
        "Qualified cleanroom monitoring",
        "Sterilization process validation",
        "Deviation escalation for any sterility breach",
      ],
    },
    references: ["R2", "R18", "R1"],
    speakerNotes:
      "Inspectors expect holistic CCS—not isolated EM tables without process linkage.",
    revealSteps: 4,
  }),
  slide(31, {
    id: "s30-aseptic-ccs",
    section: "manufacturing",
    title: "Aseptic Processing and Contamination Control Strategy",
    keyMessage:
      "Aseptic operations minimize manual interventions; every intervention is assessed for microbial and particulate risk.",
    content: [
      "Grade A air supply protects exposed product during critical steps.",
      "RABS or isolators reduce human-borne contamination versus open cleanrooms where justified.",
      "Transfer disinfection, stopper processing, and component preparation qualified.",
      "Trending of EM, personnel monitoring, and media fill results feeds CCS review.",
      "Biotech fill lines often combine aseptic filling with cold chain for unstable proteins.",
    ],
    visualType: "riskMatrix",
    visualData: {
      axes: {
        x: "Process complexity",
        y: "Intervention frequency",
        cells: [
          ["Standard monitoring", "Enhanced EM", "Media fill focus"],
          ["SOP reinforcement", "RABS/isolator review", "CAPA mandatory"],
          ["Design change", "Line redesign", "Stop shipment assessment"],
        ],
      },
      callout: "Illustrative prioritization for aseptic risk discussions.",
    },
    references: ["R2", "R18"],
    speakerNotes:
      "Matrix is training aid only; CCS uses science-based risk assessment per product.",
    revealSteps: 4,
  }),
  slide(32, {
    id: "s31-cleaning-validation",
    section: "manufacturing",
    title: "Cleaning Validation and Cross-Contamination Control",
    keyMessage:
      "Validated cleaning demonstrates removal of API, degradants, and cleaning agents to safe levels for next product or batch.",
    content: [
      "Health-based exposure limits (HBEL / ADE) increasingly guide shared equipment acceptance for potent compounds.",
      "Cleaning procedures developed with solubility, contact materials, and worst-case product/bracketing strategy.",
      "Analytical methods (e.g., HPLC, TOC) validated at appropriate sensitivity for residue verification.",
      "Biotech cleaning addresses protein residues and bioburden on reusable hardware; single-use reduces but does not eliminate validation scope.",
      "Visual clean alone is insufficient where quantitative limits apply.",
    ],
    visualType: "decisionTree",
    visualData: {
      items: [
        { title: "Dedicated equipment?", body: "Yes → maintenance cleaning only" },
        { title: "Shared equipment", body: "Define worst-case matrix" },
        { title: "Visually clean?", body: "Required but not sufficient alone" },
        { title: "Analytical swab/rinse", body: "Compare to validated limit" },
        { title: "Release line", body: "QA approval to next campaign" },
      ],
    },
    references: ["R4", "R17", "R1"],
    speakerNotes:
      "Do not state numeric residue limits in this deck—cite Ronagen validated limits per product.",
    revealSteps: 5,
  }),
  slide(33, {
    id: "s32-continuous-manufacturing",
    section: "manufacturing",
    title: "Continuous Manufacturing (Where Applicable)",
    keyMessage:
      "ICH Q13 provides a framework for continuous drug substance and drug product manufacture with real-time control.",
    content: [
      "Relevant primarily to certain oral solid and chemical processes adopting continuous lines—not classical batch bioreactors.",
      "Control strategy uses PAT, feed-forward/back control, and defined material traceability across residence time distribution.",
      "Regulatory submissions describe batch definition, diversion logic, and state of control.",
      "Legacy batch facilities may adopt hybrid approaches; change management under Q12 where registered.",
      "Ronagen adoption is optional and product-specific—timeline estimates are implementation planning only.",
    ],
    visualType: "flow",
    visualData: {
      flow: {
        title: "Conceptual continuous oral line",
        nodes: [
          { id: "feed", label: "Continuous feed", pathway: "oral" },
          { id: "blend", label: "Inline blend", pathway: "oral" },
          { id: "comp", label: "Continuous compression", pathway: "oral" },
          { id: "pat", label: "PAT monitoring", pathway: "shared" },
          { id: "divert", label: "Divert off-spec", pathway: "shared" },
        ],
        edges: [
          { from: "feed", to: "blend" },
          { from: "blend", to: "comp" },
          { from: "comp", to: "pat" },
          { from: "pat", to: "divert" },
        ],
      },
    },
    references: ["R20", "R6", "R19"],
    speakerNotes:
      "Biotech continuous processing (perfusion) is a different discussion—mention only if Ronagen uses perfusion platforms.",
    revealSteps: 4,
  }),
];

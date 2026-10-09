import { slide } from "./helpers";

/**
 * Library IDs for this section (the existing R1–R20 map is unchanged):
 * ICH Q10 → R21 · ICH Q9(R1) → R22 · FDA OOS May 2022 → R23
 * EU GMP Volume 4 → R1 · FDA quality-systems CGMP guidance → R24
 * 21 CFR 211 → R4, cited where the US legal investigation duty is in scope.
 */
export const deviationDetailSlides = [
  slide(44, {
    id: "s-dev-definitions",
    section: "lifecycle",
    title: "Deviation Management: Definitions, Classification, and Lifecycle",
    keyMessage:
      "Every departure from an approved instruction, procedure, specification, or defined process requirement must be evaluated and documented according to the applicable quality system.",
    content: [
      "A deviation is an observed departure from an approved or established requirement.",
      "Examples include incorrect process execution, an unexpected alarm, a missed processing step, or an out-of-range parameter.",
      "Unexpected events, discrepancies, and relevant quality signals enter a documented assessment.",
      "Event types include manufacturing, equipment, laboratory, data-integrity, environmental, and material or labeling discrepancies.",
      "Critical, major, and minor labels apply only where the site procedure defines them, using potential quality impact and risk.",
      "Those labels and any thresholds are not universal across regulators or companies.",
      "Lifecycle: detection, immediate recording, triage, investigation, impact assessment, CAPA, effectiveness verification, and closure.",
      "Risk escalation is a separate path when potential critical product-quality risk is identified.",
    ],
    visualType: "deviationLifecycle",
    visualData: {
      blocks: [
        {
          heading: "What is a deviation?",
          points: [
            "An observed departure from an approved or established requirement.",
            "Examples: incorrect process execution, an unexpected alarm, a missed processing step, or an out-of-range parameter.",
            "Unexpected events, discrepancies, and relevant quality signals enter the appropriate documented assessment.",
          ],
        },
        {
          heading: "Types of events",
          points: [
            "Manufacturing and process deviations",
            "Equipment and utility deviations",
            "Laboratory deviations",
            "Documentation and data-integrity events",
            "Environmental or microbiological excursions",
            "Material, packaging, and labeling discrepancies",
          ],
        },
        {
          heading: "Classification",
          points: [
            "Critical, major, or minor — where the site’s approved procedure defines those categories.",
            "Classification considers potential quality impact and risk.",
            "Labels and thresholds are not universal across regulators or companies.",
          ],
        },
      ],
      stages: [
        { label: "Detection", caption: "Event", tone: "amber" },
        { label: "Immediate recording", caption: "Event", tone: "amber" },
        { label: "Triage", caption: "Event", tone: "amber" },
        { label: "Investigation", caption: "Investigation", tone: "amber" },
        { label: "Impact assessment", caption: "Investigation", tone: "amber" },
        { label: "CAPA", caption: "QMS control", tone: "violet" },
        { label: "Effectiveness verification", caption: "QMS control", tone: "violet" },
        { label: "Closure", caption: "QMS control", tone: "violet" },
      ],
      branches: [
        {
          label: "Risk escalation",
          tone: "red",
          steps: [
            "Use when triage identifies a potential critical product-quality or patient risk. Escalation does not replace recording, investigation, or the later quality-system controls.",
          ],
        },
      ],
      callout:
        "An investigation is not complete merely because an event has been recorded or an explanation has been proposed.",
    },
    references: ["R21", "R1", "R24"],
    speakerNotes:
      "Distinguish an unplanned deviation from a prospectively assessed planned deviation where the applicable QMS permits it. An unapproved departure must not be legitimized retrospectively by relabeling it as planned. All events must be assessed according to applicable procedures and regulations. ICH Q10 [R21] is a quality-system model and states it is not intended to create expectations beyond current GMP; content beyond GMP is optional. EU GMP Chapters 1 and 8 [R1] are GMP expectations where EudraLex Volume 4 applies. FDA’s October 2006 quality-systems guidance [R24] is nonbinding and does not replace 21 CFR Parts 210 and 211. References: [R21], [R1], [R24].",
    revealSteps: 5,
  }),
  slide(45, {
    id: "s-dev-containment",
    section: "lifecycle",
    title: "Immediate Response, Containment, and Escalation",
    keyMessage:
      "The first response must protect patients, preserve evidence, and prevent further uncontrolled processing or distribution.",
    content: [
      "Protect: assess immediate personnel, process, and product risks, and stop or suspend the affected operation when warranted.",
      "Prevent further unintended use or distribution of potentially affected material.",
      "Contain: segregate affected materials, intermediates, and batches, and apply a documented hold or quarantine through the authorized process.",
      "Identify potentially related equipment, rooms, utilities, and production periods.",
      "Preserve original records, electronic data, audit trails, alarms, instrument outputs, and relevant samples.",
      "Record the timeline and known facts without reconstructing or altering the original evidence.",
      "Escalate to QA and operational owners, and to authorized decision-makers when critical product-quality risk is possible.",
      "Assess whether distributed batches, regulatory notification, or other urgent action may be required.",
    ],
    visualType: "containmentTree",
    visualData: {
      blocks: [
        {
          heading: "Protect",
          points: [
            "Assess immediate personnel, process, and product risks.",
            "Stop or safely suspend the affected operation when warranted.",
            "Prevent further unintended use or distribution of potentially affected material.",
          ],
        },
        {
          heading: "Contain",
          points: [
            "Identify and segregate affected materials, intermediates, and batches where appropriate.",
            "Apply a documented hold or quarantine through the authorized process.",
            "Identify potentially related equipment, rooms, utilities, and production periods.",
          ],
        },
        {
          heading: "Preserve",
          points: [
            "Secure original records, electronic data, audit trails, alarms, and instrument outputs.",
            "Preserve relevant samples where appropriate and under suitable conditions.",
            "Record the timeline and known facts without reconstructing or altering the original evidence.",
          ],
        },
        {
          heading: "Escalate",
          points: [
            "Notify QA and relevant operational owners promptly.",
            "Escalate potential critical product-quality risks to authorized decision-makers.",
            "Assess whether distributed batches, regulatory notification, or other urgent action may be required.",
          ],
        },
      ],
      branches: [
        {
          label: "Yes — immediate risk",
          tone: "red",
          steps: ["Contain", "Escalate", "Assess product and patient impact"],
        },
        {
          label: "Uncertain",
          tone: "amber",
          steps: ["Apply precautionary controls", "Obtain QA / risk assessment"],
        },
        {
          label: "No apparent immediate impact",
          tone: "violet",
          steps: ["Document", "Evaluate", "Proceed under approved controls"],
        },
      ],
    },
    references: ["R21", "R22", "R1"],
    speakerNotes:
      "Containment is not equivalent to CAPA. It limits immediate exposure while the cause and wider implications are assessed. Only appropriately authorized personnel may determine disposition, restart, or release under the applicable quality system. ICH Q10 [R21] and ICH Q9(R1) [R22] are guidelines and do not themselves set a universal clock for containment or escalation. Where EU GMP applies, Chapter 1 expects deviations to be reported and investigated through the PQS [R1]. References: [R21], [R22], [R1].",
    revealSteps: 2,
  }),
  slide(46, {
    id: "s-dev-risk",
    section: "lifecycle",
    title: "Risk-Based Classification and Investigation Prioritization",
    keyMessage:
      "Investigation depth, formality, urgency, and documentation must be proportionate to the potential risk to patients and product quality.",
    content: [
      "Evaluate severity, occurrence, detectability, scope, recurrence, and uncertainty.",
      "Severity is the potential consequence for patient safety and product quality.",
      "A low event frequency does not by itself establish low risk.",
      "Prioritize immediate containment and investigation of high-risk events.",
      "Expand the investigation when scope is uncertain or evidence indicates a systemic issue.",
      "Record assumptions, evidence, rationale, and residual risk, and reassess when new evidence appears.",
      "The 5×5 matrix is a training illustration, not a regulatory scoring system or a set of acceptance criteria.",
      "Uncertain scope or potentially serious patient impact is escalated even if a matrix cell looks lower.",
    ],
    visualType: "riskPrioritization",
    visualData: {
      blocks: [
        {
          heading: "Factors to evaluate",
          points: [
            "Severity: potential consequences for patient safety and product quality.",
            "Occurrence: available evidence about likelihood and recurrence.",
            "Detectability: whether existing controls could reliably detect the failure before impact.",
            "Scope: potentially affected batches, products, operations, equipment, and sites.",
            "Recurrence: previous similar deviations, CAPAs, trends, or warning signals.",
            "Uncertainty: important unknowns that could influence the risk assessment.",
          ],
        },
        {
          heading: "Risk-based decisions",
          points: [
            "Prioritize immediate containment and investigation of high-risk events.",
            "Expand the investigation when the affected scope is uncertain or evidence indicates a systemic issue.",
            "Record assumptions, evidence, rationale, and residual risk.",
            "Reassess classification when new evidence becomes available.",
          ],
        },
      ],
      callout:
        "Uncertain scope or potentially serious patient impact is escalated to authorized decision-makers. Do not treat a lower cell as permission to stop.",
    },
    references: ["R22", "R21"],
    speakerNotes:
      "The matrix is a training illustration, not a universal regulatory scoring system. If detectability or other factors are used, explain the site’s approved method and avoid counting the same risk twice. A low event frequency does not automatically imply low risk. The severity of potential harm and the strength of the evidence must also be considered. ICH Q9(R1) [R22], adopted 18 January 2023 and effective in the EU from 26 July 2023, provides principles and tools. It does not create new expectations beyond existing requirements and does not mandate this matrix, numeric cutoffs, or a single formality level. ICH Q10 [R21] links CAPA and continual improvement to the PQS model. References: [R22], [R21].",
    revealSteps: 3,
  }),
  slide(47, {
    id: "s-dev-scope",
    section: "lifecycle",
    title: "Investigation Planning, Evidence Collection, and Scope",
    keyMessage:
      "A defensible investigation begins with a clear question, a defined scope, preserved evidence, and assigned responsibilities.",
    content: [
      "Define the event and the requirement that was not met, then establish a factual chronology.",
      "Identify affected and potentially affected batches, materials, systems, and time periods.",
      "Assign a qualified cross-functional team and the records, interviews, tests, and technical assessments required.",
      "Define decision criteria, milestones, and approval responsibilities.",
      "Evidence may include batch records, equipment and utility records, original laboratory data and audit trails, monitoring data, material records, training records, and prior deviations or CAPAs.",
      "Map evidence across process, people, equipment, materials, measurement, and environment.",
      "QA, Production, QC, Engineering, and Validation contribute according to the event.",
    ],
    visualType: "evidenceMap",
    visualData: {
      blocks: [
        {
          heading: "Investigation plan",
          points: [
            "Define the event and the requirement that was not met.",
            "Establish a factual chronology.",
            "Identify affected and potentially affected batches, materials, systems, and time periods.",
            "Assign a qualified, cross-functional investigation team.",
            "Identify required records, interviews, tests, and technical assessments.",
            "Define decision criteria, milestones, and approval responsibilities.",
          ],
        },
        {
          heading: "Evidence sources",
          points: [
            "Also use executed batch records, approved procedures, equipment and utility history, original laboratory records and audit trails, environmental and process monitoring, material and supplier records, training and qualification records, and relevant historical deviations and CAPAs.",
          ],
        },
      ],
      nodes: [
        "Process",
        "People",
        "Equipment",
        "Materials",
        "Measurement",
        "Environment",
      ],
      contributors: ["QA", "Production", "QC", "Engineering", "Validation"],
    },
    references: ["R21", "R23", "R24"],
    speakerNotes:
      "Distinguish established facts, hypotheses, assumptions, and missing evidence. Interviews can provide useful context but should not replace contemporaneous records, objective data, or technical evaluation. Include an assessment of similar events and potentially affected operations at other sites or contractors where relevant. The May 2022 FDA OOS guidance [R23] is relevant when the event is a chemistry-based laboratory OOS result in its stated scope; it does not define a universal evidence checklist for every deviation. Q10 [R21] and the FDA quality-systems guidance [R24] describe system expectations; [R24] does not replace 21 CFR Parts 210 and 211. References: [R21], [R23], [R24].",
    revealSteps: 2,
  }),
  slide(48, {
    id: "s-dev-rca",
    section: "lifecycle",
    title: "Root Cause Analysis: From Symptoms to Systemic Causes",
    keyMessage:
      "CAPA must address a scientifically supported cause or set of causes, not merely the visible symptom.",
    content: [
      "Tools include Five Whys, fishbone analysis, fault trees, process mapping, comparative batch and trend analysis, and justified hypothesis testing.",
      "Separate the immediate cause, contributing factors, an evidence-supported root cause, and what remains unknown.",
      "Common failures include blame without process review, human error without system factors, training as the only action, treating correlation as causation, and closing with material uncertainty undocumented.",
      "Hypothetical fishbone: tablet-weight variation. Branches are potential causes and require evidence.",
      "No branch on this slide is a verified root cause.",
    ],
    visualType: "fishbone",
    visualData: {
      blocks: [
        {
          heading: "Investigation methods",
          points: [
            "Five Whys",
            "Fishbone / Ishikawa analysis",
            "Fault-tree analysis",
            "Process mapping",
            "Comparative batch and trend analysis",
            "Hypothesis testing and technical experiments, where justified",
          ],
        },
        {
          heading: "Cause assessment",
          points: [
            "Immediate cause: what directly preceded the event?",
            "Contributing factors: what increased the likelihood or impact?",
            "Root cause: what underlying factor or system weakness is supported by evidence?",
            "Unknown or inconclusive: what could not be established, and why?",
          ],
        },
        {
          heading: "Common investigation failures",
          points: [
            "Assigning blame without examining process conditions.",
            "Concluding “human error” without assessing underlying system factors.",
            "Repeating training as the only corrective action.",
            "Treating correlation as proof of causation.",
            "Closing an investigation without documenting material uncertainty.",
          ],
        },
      ],
      bones: [
        "Blend properties",
        "Machine setup",
        "Feeder performance",
        "Measurement reliability",
        "Operator instructions",
        "Environmental or material conditions",
      ],
      effect: "tablet-weight variation",
    },
    references: ["R21", "R22", "R24"],
    speakerNotes:
      "No single root-cause tool is required for every investigation. Use tools appropriate to the event, process complexity, and risk. Where the definitive cause cannot be established, document the investigation limitations, plausible contributing factors, risk mitigation, and rationale for subsequent action. The tablet-weight fishbone is hypothetical. Every branch is labeled as a potential cause requiring evidence; none is presented as verified. Fishbone categories such as people, equipment, methods, materials, measurement, and environment are a thinking aid from quality practice, not a mandated checklist in Q9(R1) [R22], Q10 [R21], or the FDA quality-systems guidance [R24]. References: [R21], [R22], [R24].",
    revealSteps: 3,
  }),
  slide(49, {
    id: "s-dev-oos",
    section: "lifecycle",
    title: "Laboratory Investigations: OOS, OOT, and Unexpected Results",
    keyMessage:
      "Unexpected laboratory results require a documented scientific investigation; results must not be discarded simply because a repeat test passes.",
    content: [
      "OOS: a result outside an established specification or acceptance criterion, including relevant in-process laboratory results outside established criteria.",
      "OOT: a result or pattern inconsistent with an appropriately established trend. An OOT result is not automatically an OOS result.",
      "Preserve the original result and raw data, then complete the initial laboratory assessment.",
      "Examine analytical execution, instrument status, calculations, reagents, standards, and sample handling.",
      "If a laboratory cause is not demonstrated, expand to manufacturing, sampling, materials, and process history as appropriate.",
      "Assess product impact, document the conclusion, and implement CAPA where warranted.",
      "The FDA May 2022 OOS document is guidance for its stated laboratory scope. It is not a universal OOT regulation.",
    ],
    visualType: "oosWorkflow",
    visualData: {
      blocks: [
        {
          heading: "Out-of-specification (OOS)",
          points: [
            "A result outside an established specification or acceptance criterion.",
            "Includes relevant in-process laboratory results outside established criteria.",
            "Requires investigation under the applicable procedure.",
          ],
        },
        {
          heading: "Out-of-trend (OOT)",
          points: [
            "A result or pattern inconsistent with an appropriately established trend.",
            "Evaluate under the site procedure and the relevant product or process context.",
            "An OOT result is not automatically an OOS result.",
          ],
        },
        {
          heading: "Investigation workflow",
          points: [
            "Preserve the original result and associated raw data.",
            "Conduct the initial laboratory assessment.",
            "Examine analytical execution, instrument status, calculations, reagents, standards, and sample handling.",
            "If a laboratory root cause is not established, expand to manufacturing, sampling, materials, and process history as appropriate.",
            "Assess product impact and document the conclusion.",
            "Implement CAPA where warranted.",
          ],
        },
      ],
      branches: [
        {
          label: "Yes — laboratory cause established",
          tone: "amber",
          steps: [
            "Document the evidence, assess impact, and determine appropriate follow-up.",
          ],
        },
        {
          label: "No — laboratory cause not established",
          tone: "violet",
          steps: [
            "Proceed to a full investigation involving production and other relevant functions.",
          ],
        },
      ],
      callout:
        "OOT signal → trend review → risk-based investigation. This path is separate. An OOT result is not automatically an OOS result.",
    },
    references: ["R23", "R21", "R24", "R4"],
    speakerNotes:
      "Follow the FDA May 2022 OOS guidance [R23] within its scope and relevant jurisdictional requirements. That Level 2 revision addresses chemistry-based laboratory testing of drugs regulated by CDER, including relevant in-process laboratory results. It states FDA’s current thinking and, except where it cites a regulation, its recommendations are not themselves legal duties. For US finished pharmaceuticals, 21 CFR 211.192 [R4] requires a thorough investigation of unexplained discrepancies and of any failure of a batch or component to meet specifications, when Part 211 applies. Do not repeatedly test until a passing result is obtained. Retesting or resampling must be scientifically justified, authorized, documented, and performed according to approved procedures. An original result may be invalidated only when the evidence supports the documented conclusion. OOT handling should be governed by applicable procedures and relevant data. The FDA OOS document must not be misrepresented as a universal standalone OOT regulation. Q10 [R21] and the quality-systems guidance [R24] frame the wider system; [R24] does not replace Parts 210 and 211. References: [R23], [R21], [R24], [R4].",
    revealSteps: 3,
  }),
  slide(50, {
    id: "s-dev-impact",
    section: "lifecycle",
    title: "Product Impact Assessment: Conventional Oral vs Biotechnology-Derived Products",
    keyMessage:
      "Every investigation must determine the potential impact on product quality, related batches, and patients—not simply identify why an event occurred.",
    content: [
      "Assess identity, strength, purity, potency, contamination or impurity risk, data reliability, related batches and periods, distributed product, stability commitments, and whether additional controls, notification, or recall may be required.",
      "Hypothetical oral example: unexpected tablet dissolution. Review blend, granulation, compression, materials, original laboratory records, and trends.",
      "Hypothetical biotechnology example: unexpected bioburden or potency trend. Review biological starting materials, upstream monitoring, holds, purification, filtration, and contamination-control records.",
      "The comparison matrix is illustrative. It is not a set of specifications or acceptance criteria.",
      "An abnormal process result does not by itself prove that a released product is defective.",
    ],
    visualType: "impactCompare",
    visualData: {
      blocks: [
        {
          heading: "Impact assessment dimensions",
          points: [
            "Identity, strength, purity, potency, and other relevant quality attributes",
            "Safety-related contamination or impurity risks",
            "Process and analytical data reliability",
            "Potentially affected batches, materials, and manufacturing periods",
            "Previously released or distributed batches",
            "Stability, shelf life, and other quality commitments",
            "Need for additional controls, notification, recall, or other action under applicable requirements",
          ],
        },
        {
          heading: "Conventional oral medicine",
          points: [
            "Event: unexpected tablet dissolution results.",
            "Investigate blend and granulation history, compression parameters and equipment condition, relevant raw-material attributes, original laboratory records, and similar batches and trends.",
            "Potential impact: dissolution performance, dosage-unit quality, and the significance of the result for the affected product.",
          ],
        },
        {
          heading: "Biotechnology-derived medicine",
          points: [
            "Event: unexpected bioburden or potency trend during processing.",
            "Investigate biological starting materials and relevant cell-bank or seed records, upstream monitoring, intermediate handling and holds, purification and filtration history, and analytical and contamination-control records.",
            "Potential impact: product-specific purity, potency, contamination risk, process performance, and the quality of related batches.",
          ],
        },
      ],
      table: {
        caption:
          "Illustrative comparison — not product specifications or acceptance criteria",
        headers: [
          "Assessment dimension",
          "Conventional oral medicine",
          "Biotechnology-derived medicine",
        ],
        rows: [
          [
            "Process evidence",
            "Dispensing, blending, compression, dissolution-related records",
            "Biological process history, purification, intermediates, product-specific testing",
          ],
          [
            "Key quality questions",
            "Dosage-unit performance, assay, impurities, contamination where relevant",
            "Biological activity, product-related variants, impurities, contamination where relevant",
          ],
          [
            "Scope assessment",
            "Related equipment, batches, products, and time periods",
            "Related process runs, intermediates, batches, and potentially affected biological materials",
          ],
          [
            "Decision basis",
            "Product specifications, process knowledge, and investigation evidence",
            "Product-specific quality attributes, process knowledge, and investigation evidence",
          ],
        ],
      },
    },
    references: ["R21", "R22", "R23", "R1"],
    speakerNotes:
      "These examples are illustrative. Not every biological process has the same contamination-control requirements, and the presence of an abnormal process result does not by itself establish that a released product is defective. The decision must be supported by scientifically justified evidence and the applicable quality and regulatory framework. Do not read the matrix as a universal specification or as a finding that either product class is defective. Q10 [R21] and Q9(R1) [R22] inform how impact and risk are reasoned about; they are guidelines. The OOS guidance [R23] applies only inside its laboratory scope. EU GMP [R1] supplies the GMP framework where it is in force, including investigation of deviations and quality defects. References: [R21], [R22], [R23], [R1].",
    revealSteps: 3,
  }),
  slide(51, {
    id: "s-dev-capa-design",
    section: "lifecycle",
    title: "CAPA Design: Containment, Correction, Corrective Action, and Prevention",
    keyMessage:
      "Effective CAPA addresses the cause of a problem, reduces the likelihood of recurrence, and verifies that the actions work.",
    content: [
      "Containment limits further impact, for example a documented hold.",
      "Correction fixes the identified immediate problem, for example a verified data-entry error corrected through the approved traceable process.",
      "Corrective action addresses an identified cause of an existing deviation, for example a deficient equipment-control mechanism after the cause is demonstrated.",
      "Preventive or proactive action addresses a potential problem or emerging risk, for example a justified control improvement on comparable equipment that shares the risk.",
      "A CAPA plan records the evidence-supported cause, measurable actions, owner, risk-based priority, due date, resources, completion evidence, and effectiveness criteria.",
      "A practical intervention order is design, then technical controls, then procedures, then training. That order is not a regulatory mandate.",
      "Training alone is insufficient when evidence shows a design, procedure, resource, equipment, or systemic control failure.",
    ],
    visualType: "capaDesign",
    visualData: {
      blocks: [
        {
          heading: "Containment",
          points: [
            "Immediate measures to limit further impact.",
            "Example: placing potentially affected material on hold.",
          ],
        },
        {
          heading: "Correction",
          points: [
            "Fixes the identified immediate problem.",
            "Example: correcting a verified data-entry error through the approved traceable process.",
          ],
        },
        {
          heading: "Corrective action",
          points: [
            "Addresses an identified cause of an existing deviation or nonconformity.",
            "Example: modifying a deficient equipment-control mechanism after the cause has been demonstrated.",
          ],
        },
        {
          heading: "Preventive or proactive action",
          points: [
            "Addresses a potential problem or emerging risk before recurrence or occurrence, as applicable to the QMS.",
            "Example: a justified control improvement on other comparable equipment where a shared risk exists.",
          ],
        },
        {
          heading: "CAPA plan elements",
          points: [
            "Evidence-supported cause",
            "Specific and measurable actions",
            "Responsible owner",
            "Risk-based priority",
            "Due date",
            "Required resources",
            "Completion evidence",
            "Defined effectiveness criteria",
          ],
        },
      ],
      stages: [
        { label: "Contain", tone: "amber" },
        { label: "Correct", tone: "amber" },
        { label: "Eliminate or control the demonstrated cause", tone: "violet" },
        { label: "Verify effectiveness", tone: "violet" },
      ],
      frameworkNote:
        "Practical prioritization framework — not an absolute regulatory mandate",
      framework: [
        "Process or equipment design improvement, where justified.",
        "Technical or system-level controls.",
        "Procedures and administrative controls.",
        "Training and awareness as appropriate.",
      ],
    },
    references: ["R21", "R22", "R24"],
    speakerNotes:
      "CAPA terminology can vary across quality systems. Follow the site’s approved definitions while preserving the essential distinction between immediate containment, correction of an existing issue, and action addressing causes or future risks. Training alone is insufficient when the evidence indicates a design, procedure, resource, equipment, or systemic control failure. The four-layer model and the intervention hierarchy are teaching devices. Q10 [R21] describes a CAPA system inside a PQS model and does not add legal requirements beyond GMP. Q9(R1) [R22] supports proportionate, evidence-based decisions. The FDA quality-systems guidance [R24] is nonbinding and explicitly does not replace 21 CFR Parts 210 and 211. No universal CAPA closure interval is stated here. References: [R21], [R22], [R24].",
    revealSteps: 3,
  }),
  slide(52, {
    id: "s-dev-capa-closure",
    section: "lifecycle",
    title: "CAPA Execution, Effectiveness Checks, and Closure",
    keyMessage:
      "Completion of corrective actions is not equivalent to demonstrated effectiveness.",
    content: [
      "Approve the plan, implement actions under change control where required, and retain evidence of implementation.",
      "Update procedures, training, equipment, validation, or other controlled elements where the change requires it, and reassess related risks.",
      "Define measurable effectiveness criteria and the required evidence before implementation.",
      "Set an observation period justified by process frequency and risk. Review recurrence, similar events, trends, and relevant quality attributes.",
      "Use an independent or appropriately authorized reviewer where warranted.",
      "If the CAPA is not effective, reopen or escalate, reassess the cause hypothesis, expand scope where appropriate, and revise the actions and criteria.",
      "Overdue actions and overdue effectiveness assessments escalate under the approved QMS. This slide sets no universal overdue interval.",
    ],
    visualType: "capaClosure",
    visualData: {
      blocks: [
        {
          heading: "CAPA execution",
          points: [
            "Approve the action plan and responsibilities.",
            "Implement actions under appropriate change control.",
            "Update procedures, training, equipment, validation, or other controlled elements where required.",
            "Retain evidence of implementation and reassess related risks.",
          ],
        },
        {
          heading: "Effectiveness verification",
          points: [
            "Define measurable criteria and the required evidence before implementation.",
            "Define an observation period appropriate to process frequency and risk.",
            "Review recurrence, similar events, process trends, and relevant quality attributes.",
            "Use an independent or appropriately authorized reviewer where warranted.",
          ],
        },
        {
          heading: "Ineffective CAPA",
          points: [
            "Reopen or escalate the issue under the QMS.",
            "Reassess the root-cause hypothesis and expand the scope where appropriate.",
            "Revise the action plan and effectiveness criteria.",
          ],
        },
      ],
      stages: [
        { label: "CAPA approved", tone: "violet" },
        { label: "Action implemented", tone: "violet" },
        { label: "Evidence reviewed", tone: "violet" },
        { label: "Observation period", tone: "amber" },
        { label: "Effectiveness assessment", tone: "amber" },
      ],
      branches: [
        {
          label: "Effective",
          tone: "violet",
          steps: ["Approve closure under the site procedure."],
        },
        {
          label: "Not effective",
          tone: "red",
          steps: [
            "Reopen the investigation or CAPA.",
            "Reassess the cause.",
            "Revise the actions.",
          ],
        },
      ],
      callout:
        "Overdue actions and overdue effectiveness assessments are escalated according to the approved QMS. No universal closure period is set here.",
    },
    references: ["R21", "R22", "R24"],
    speakerNotes:
      "The effectiveness-check period must be justified for the type of action and the rate at which relevant events could reasonably recur. Training completion or an absence of recurrence over an unsuitable short period does not automatically demonstrate effectiveness. Q10 [R21] expects the CAPA system to include effectiveness checks as part of the PQS model; that model is guidance and does not publish a required number of days. Q9(R1) [R22] supports matching the depth of verification to risk. The FDA quality-systems guidance [R24] discusses evaluation activities, including corrective and preventive action, as recommendations aligned with CGMP. It does not replace Parts 210 and 211 and does not set a closure clock. References: [R21], [R22], [R24].",
    revealSteps: 2,
  }),
  slide(53, {
    id: "s-dev-case",
    section: "lifecycle",
    title: "Investigation Report, CAPA Governance, and Worked Case",
    keyMessage:
      "A deviation can be considered adequately resolved only when the investigation, impact assessment, decisions, and required follow-up are documented and appropriately approved.",
    content: [
      "A practical report covers the event, the requirement missed, containment, scope and chronology, evidence, cause or documented uncertainty, impact, CAPA, owners and effectiveness criteria, and the approval to close.",
      "Governance trends repeat deviations, looks for systemic weakness, escalates significant risk, checks CAPA effectiveness, and feeds outcomes into risk management and continual improvement.",
      "Hypothetical oral case: an unexpected dissolution result. Original laboratory data are preserved. The laboratory review finds no demonstrated analytical error. Manufacturing review finds an abnormal compression-related trend and, in this fictional example, an equipment-control issue.",
      "Potential CAPA: correct that demonstrated control deficiency, evaluate related equipment or batches, and verify effectiveness against predefined criteria.",
      "The same report structure applies to an unexpected biological-process trend, using evidence relevant to that platform.",
      "Investigation closure, batch disposition, and CAPA closure are distinct decisions.",
    ],
    visualType: "investigationCase",
    visualData: {
      badge: "Hypothetical — fictional equipment-control example",
      blocks: [
        {
          heading: "Investigation report lifecycle",
          points: [
            "Event description, identifier, and detection date",
            "Approved requirement and actual observation",
            "Initial containment and escalation",
            "Investigation scope and chronology",
            "Evidence reviewed and technical assessments",
            "Root cause, contributing factors, or documented uncertainty",
            "Product and batch impact assessment",
            "Correction and CAPA plan",
            "Owners, milestones, and effectiveness criteria",
            "Conclusions, approvals, and closure justification",
          ],
        },
        {
          heading: "Quality governance",
          points: [
            "Trend repeat deviations and recurring causes.",
            "Identify systemic weaknesses across products and areas.",
            "Escalate significant risks to appropriate management.",
            "Verify CAPA effectiveness and monitor overdue commitments.",
            "Feed outcomes into risk management and continual improvement.",
          ],
        },
        {
          heading: "Worked case — oral manufacturing",
          points: [
            "Event: an unexpected tablet-dissolution result during release testing.",
            "Original laboratory data are preserved.",
            "Laboratory review finds no demonstrated analytical error.",
            "Manufacturing review identifies an abnormal compression-related trend.",
            "Further evidence, in this fictional example only, establishes an equipment-control issue.",
            "Related batches and product impact are assessed.",
            "Potential CAPA: correct the demonstrated control deficiency, evaluate related equipment or batches, and verify effectiveness against predefined technical and quality criteria.",
            "Close only after the applicable assessment and approval requirements are met.",
          ],
        },
        {
          heading: "Biotechnology comparison",
          points: [
            "An unexpected biological-process or product-quality trend uses the same report structure, with evidence for that platform, processing history, product attributes, contamination risks, and related intermediates or batches.",
          ],
        },
      ],
      links: [
        "Product impact",
        "Root cause",
        "CAPA",
        "Effectiveness",
        "Quality-system learning",
      ],
      sourceIds: ["R21", "R22", "R23", "R1"],
    },
    references: ["R21", "R22", "R23", "R1", "R24"],
    speakerNotes:
      "The worked case is hypothetical. Clearly label the equipment-control issue as a fictional example and do not imply that the same cause or CAPA applies to all dissolution failures. Investigation closure, batch disposition, and CAPA closure may be related but are distinct decisions. Their authorization and sequence must follow applicable regulations and the site’s approved procedures. A biotechnology comparison on this slide is also illustrative: contamination-control evidence depends on the specific process. Q10 [R21] and Q9(R1) [R22] are guidelines. The OOS guidance [R23] applies when the triggering result is an OOS laboratory result in its scope. EU GMP Chapters 1 and 8 [R1] frame deviation handling, CAPA, and quality-defect investigation where EU GMP applies. The FDA quality-systems guidance [R24] remains nonbinding. References: [R21], [R22], [R23], [R1], [R24].",
    revealSteps: 3,
  }),
];

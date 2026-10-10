import type { Locale, Slide, VisualData } from "../types";
import { REFERENCES, REFERENCE_DATE } from "../references";
import { t } from "../i18n/strings";

function mermaidLabel(text: string): string {
  return text
    .replace(/\\/g, "/")
    .replace(/"/g, "'")
    .replace(/[[\]{}|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fence(lang: string, body: string): string {
  return `\n\`\`\`${lang}\n${body.trim()}\n\`\`\`\n`;
}

function mermaid(body: string): string {
  return fence("mermaid", body);
}

function bullets(items: string[]): string {
  if (!items.length) return "";
  return items.map((item) => `- ${item}`).join("\n") + "\n";
}

function mdTable(headers: string[], rows: string[][]): string {
  const esc = (cell: string) => cell.replace(/\|/g, "\\|").replace(/\n/g, " ");
  const head = `| ${headers.map(esc).join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(esc).join(" | ")} |`).join("\n");
  return `${head}\n${sep}\n${body}\n`;
}

function flowDiagram(
  nodes: Array<{ id: string; label: string }>,
  edges?: Array<{ from: string; to: string }>,
  direction: "LR" | "TB" = "LR",
): string {
  if (!nodes.length) return "";
  const idMap = new Map<string, string>();
  nodes.forEach((node, i) => {
    idMap.set(node.id, `n${i}`);
  });
  const lines = [`flowchart ${direction}`];
  for (const node of nodes) {
    const id = idMap.get(node.id)!;
    lines.push(`  ${id}["${mermaidLabel(node.label)}"]`);
  }
  if (edges?.length) {
    for (const edge of edges) {
      const from = idMap.get(edge.from);
      const to = idMap.get(edge.to);
      if (from && to) lines.push(`  ${from} --> ${to}`);
    }
  } else {
    for (let i = 0; i < nodes.length - 1; i++) {
      lines.push(`  n${i} --> n${i + 1}`);
    }
  }
  return mermaid(lines.join("\n"));
}

function sequenceFromLabels(labels: string[], direction: "LR" | "TB" = "LR"): string {
  return flowDiagram(
    labels.map((label, i) => ({ id: `s${i}`, label })),
    undefined,
    direction,
  );
}

function cycleDiagram(labels: string[]): string {
  if (labels.length < 2) return sequenceFromLabels(labels, "TB");
  const lines = ["flowchart LR"];
  labels.forEach((label, i) => {
    lines.push(`  c${i}["${mermaidLabel(label)}"]`);
  });
  for (let i = 0; i < labels.length - 1; i++) {
    lines.push(`  c${i} --> c${i + 1}`);
  }
  lines.push(`  c${labels.length - 1} --> c0`);
  return mermaid(lines.join("\n"));
}

function splitPathwaysDiagram(vd: VisualData): string {
  const left = vd.leftSteps ?? [];
  const right = vd.rightSteps ?? [];
  const shared = vd.shared ?? [];
  if (!left.length && !right.length && !shared.length) return "";

  const lines = ["flowchart TB"];
  lines.push(`  subgraph Oral["${mermaidLabel(vd.leftTitle ?? "Oral")}"]`);
  left.forEach((step, i) => {
    lines.push(`    o${i}["${mermaidLabel(step)}"]`);
  });
  for (let i = 0; i < left.length - 1; i++) lines.push(`    o${i} --> o${i + 1}`);
  lines.push("  end");

  lines.push(`  subgraph Biotech["${mermaidLabel(vd.rightTitle ?? "Biotech")}"]`);
  right.forEach((step, i) => {
    lines.push(`    b${i}["${mermaidLabel(step)}"]`);
  });
  for (let i = 0; i < right.length - 1; i++) lines.push(`    b${i} --> b${i + 1}`);
  lines.push("  end");

  if (shared.length) {
    lines.push(`  subgraph Shared["${mermaidLabel("Shared GMP")}"]`);
    shared.forEach((step, i) => {
      lines.push(`    s${i}["${mermaidLabel(step)}"]`);
    });
    lines.push("  end");
    if (left.length) lines.push(`  o${left.length - 1} --> s0`);
    if (right.length) lines.push(`  b${right.length - 1} --> s0`);
  }

  return mermaid(lines.join("\n"));
}

function decisionTreeDiagram(items: Array<{ title: string; body?: string }>): string {
  if (!items.length) return "";
  const lines = ["flowchart TD", `  root["${mermaidLabel("Decision")}"]`];
  items.forEach((item, i) => {
    const label = item.body ? `${item.title}: ${item.body}` : item.title;
    lines.push(`  d${i}["${mermaidLabel(label)}"]`);
    lines.push(`  root --> d${i}`);
  });
  return mermaid(lines.join("\n"));
}

function fishboneDiagram(effect: string, bones: string[]): string {
  if (!bones.length) return "";
  const lines = ["flowchart LR", `  effect(["${mermaidLabel(effect || "Effect")}"])`];
  bones.forEach((bone, i) => {
    lines.push(`  bone${i}["${mermaidLabel(bone)}"]`);
    lines.push(`  bone${i} --> effect`);
  });
  return mermaid(lines.join("\n"));
}

function roadmapDiagram(
  phases: Array<{ name: string; period: string; activities: string[] }>,
): string {
  if (!phases.length) return "";
  const lines = ["timeline"];
  lines.push("  title Implementation roadmap");
  for (const phase of phases) {
    const period = mermaidLabel(phase.period || phase.name);
    const acts =
      phase.activities.length > 0
        ? phase.activities.map(mermaidLabel).join(" : ")
        : mermaidLabel(phase.name);
    lines.push(`  ${period} : ${acts}`);
  }
  return mermaid(lines.join("\n"));
}

function stagesDiagram(
  stages: Array<{ label: string; caption?: string }>,
): string {
  if (!stages.length) return "";
  return sequenceFromLabels(
    stages.map((s) => (s.caption ? `${s.label} (${s.caption})` : s.label)),
    "LR",
  );
}

function visualMarkdown(slide: Slide, strings: ReturnType<typeof t>): string {
  const vd = slide.visualData ?? {};
  const parts: string[] = [];

  switch (slide.visualType) {
    case "titleHero":
    case "splitPathways":
      parts.push(splitPathwaysDiagram(vd));
      break;

    case "flow":
    case "processSteps":
      if (vd.flow?.nodes?.length) {
        if (vd.flow.title) parts.push(`**${vd.flow.title}**\n`);
        parts.push(flowDiagram(vd.flow.nodes, vd.flow.edges));
      } else if (vd.items?.length) {
        parts.push(
          sequenceFromLabels(vd.items.map((item) => item.title)),
        );
        parts.push(
          bullets(
            vd.items.map((item) =>
              item.body ? `**${item.title}** — ${item.body}` : item.title,
            ),
          ),
        );
      } else if (vd.layers?.length) {
        parts.push(sequenceFromLabels(vd.layers, "TB"));
      }
      break;

    case "cycle":
    case "lifecycle":
    case "relationship": {
      const labels =
        vd.layers?.length
          ? vd.layers
          : vd.items?.map((item) => item.title) ??
            (vd.flow?.nodes?.map((n) => n.label) ?? []);
      if (slide.visualType === "cycle" && labels.length) {
        parts.push(cycleDiagram(labels));
      } else if (vd.flow?.nodes?.length) {
        parts.push(flowDiagram(vd.flow.nodes, vd.flow.edges));
      } else if (labels.length) {
        parts.push(sequenceFromLabels(labels, "LR"));
      }
      if (vd.items?.length) {
        parts.push(
          bullets(
            vd.items.map((item) =>
              item.body ? `**${item.title}** — ${item.body}` : item.title,
            ),
          ),
        );
      }
      break;
    }

    case "hierarchy":
      if (vd.layers?.length) parts.push(sequenceFromLabels(vd.layers, "TB"));
      break;

    case "overviewGrid":
    case "taxonomy":
      if (vd.items?.length) {
        parts.push(
          bullets(
            vd.items.map((item) =>
              item.body ? `**${item.title}** — ${item.body}` : item.title,
            ),
          ),
        );
      }
      break;

    case "comparisonTable":
      if (vd.table) {
        parts.push(mdTable(vd.table.headers, vd.table.rows));
        if (vd.table.caption) parts.push(`*${vd.table.caption}*\n`);
      }
      break;

    case "responsibilityMatrix":
      if (vd.matrix) {
        const headers = [strings.function, ...vd.matrix.cols];
        const rows = vd.matrix.rows.map((row, i) => [
          row,
          ...(vd.matrix!.cells[i] ?? vd.matrix!.cols.map(() => "")),
        ]);
        parts.push(mdTable(headers, rows));
      }
      break;

    case "decisionTree":
    case "investigation":
    case "containmentTree":
      if (vd.items?.length) {
        parts.push(decisionTreeDiagram(vd.items));
      } else if (vd.blocks?.length) {
        for (const block of vd.blocks) {
          parts.push(`### ${block.heading}\n`);
          parts.push(bullets(block.points));
        }
      }
      break;

    case "riskMatrix":
    case "riskPrioritization":
      if (vd.axes?.cells?.length) {
        const cols = vd.axes.cells[0]?.length ?? 0;
        const colHeaders = Array.from({ length: cols }, (_, i) => String(i + 1));
        parts.push(`**${vd.axes.y} ↓ / ${vd.axes.x} →**\n`);
        parts.push(
          mdTable(
            ["", ...colHeaders],
            vd.axes.cells.map((row, i) => [
              String(vd.axes!.cells.length - i),
              ...row,
            ]),
          ),
        );
      }
      break;

    case "monitoringChart":
      if (vd.chart) {
        parts.push(
          mdTable(
            ["Point", ...vd.chart.labels],
            [["Value", ...vd.chart.series.map(String)]],
          ),
        );
        if (vd.chart.note) parts.push(`*${vd.chart.note}*\n`);
      }
      break;

    case "dashboard":
      if (vd.kpis?.length) {
        parts.push(
          mdTable(
            [strings.indicator, "Value", "Kind"],
            vd.kpis.map((k) => [
              k.label,
              k.value,
              k.kind === "leading"
                ? strings.leading
                : k.kind === "lagging"
                  ? strings.lagging
                  : "",
            ]),
          ),
        );
      }
      if (vd.maturityLevels?.length) {
        parts.push(sequenceFromLabels(vd.maturityLevels, "LR"));
      }
      break;

    case "roadmap":
      if (vd.phases?.length) {
        parts.push(roadmapDiagram(vd.phases));
        for (const phase of vd.phases) {
          parts.push(`### ${phase.name} (${phase.period})\n`);
          if (phase.activities.length) {
            parts.push(`**${strings.activities}**\n`);
            parts.push(bullets(phase.activities));
          }
          if (phase.deliverables.length) {
            parts.push(`**${strings.deliverables}**\n`);
            parts.push(bullets(phase.deliverables));
          }
        }
      }
      break;

    case "presenter":
      if (vd.presenter) {
        parts.push(`- **${strings.name}:** ${vd.presenter.name}`);
        parts.push(`- **${strings.role}:** ${vd.presenter.role}\n`);
      }
      break;

    case "references":
      if (vd.takeaways?.length) {
        parts.push(`### ${strings.keyTakeaways}\n`);
        parts.push(bullets(vd.takeaways));
      }
      if (vd.closing) parts.push(`> ${vd.closing}\n`);
      break;

    case "thanksQa":
      parts.push(`## ${strings.thanks}\n`);
      parts.push(`### ${strings.questions}\n`);
      if (vd.questions?.length) parts.push(bullets(vd.questions));
      if (vd.closing) parts.push(`> ${vd.closing}\n`);
      break;

    case "deviationLifecycle":
    case "oosWorkflow":
    case "capaDesign":
    case "capaClosure":
    case "investigationCase":
    case "impactCompare":
      if (vd.stages?.length) parts.push(stagesDiagram(vd.stages));
      if (vd.blocks?.length) {
        for (const block of vd.blocks) {
          parts.push(`### ${block.heading}\n`);
          parts.push(bullets(block.points));
        }
      }
      if (vd.branches?.length) {
        for (const branch of vd.branches) {
          parts.push(`### ${branch.label}\n`);
          parts.push(bullets(branch.steps));
        }
      }
      if (vd.framework?.length) parts.push(bullets(vd.framework));
      break;

    case "evidenceMap":
      if (vd.nodes?.length) {
        parts.push(sequenceFromLabels(vd.nodes, "TB"));
      }
      if (vd.links?.length) parts.push(bullets(vd.links));
      break;

    case "fishbone":
      parts.push(
        fishboneDiagram(
          vd.effect ?? slide.title,
          vd.bones ?? vd.contributors ?? [],
        ),
      );
      break;

    case "callout":
    case "bullets":
    default:
      break;
  }

  if (vd.callout) parts.push(`> **${vd.callout}**\n`);

  return parts.filter(Boolean).join("\n");
}

function slideToMarkdown(
  slide: Slide,
  strings: ReturnType<typeof t>,
): string {
  const lines: string[] = [];
  lines.push(`## ${slide.number}. ${slide.title}`);
  lines.push("");
  if (slide.keyMessage) {
    lines.push(`> **${strings.keyMessage}:** ${slide.keyMessage}`);
    lines.push("");
  }
  if (slide.content.length) {
    lines.push(bullets(slide.content).trimEnd());
    lines.push("");
  }
  const visual = visualMarkdown(slide, strings).trim();
  if (visual) {
    lines.push(visual);
    lines.push("");
  }
  if (slide.references?.length) {
    const refs = slide.references
      .map((id) => {
        const ref = REFERENCES.find((r) => r.id === id);
        return ref ? `- [${id}] [${ref.name}](${ref.url})` : `- [${id}]`;
      })
      .join("\n");
    lines.push(`**${strings.references}**`);
    lines.push("");
    lines.push(refs);
    lines.push("");
  }
  if (slide.speakerNotes) {
    lines.push(`<details><summary>${strings.notes}</summary>`);
    lines.push("");
    lines.push(slide.speakerNotes);
    lines.push("");
    lines.push("</details>");
    lines.push("");
  }
  lines.push("---");
  lines.push("");
  return lines.join("\n");
}

export function buildPresentationMarkdown(
  slides: Slide[],
  locale: Locale,
): string {
  const strings = t(locale);
  const brand = locale === "fa" ? strings.brandFa : strings.brand;
  const title =
    locale === "fa"
      ? "GMP در تولید دارو"
      : "GMP in Pharmaceutical Manufacturing";

  const toc = slides
    .map((s) => `- [${s.number}. ${s.title}](#${anchor(s)})`)
    .join("\n");

  const body = slides.map((s) => slideToMarkdown(s, strings)).join("\n");

  const library = REFERENCES.map(
    (r) => `- **[${r.id}]** [${r.name}](${r.url}) — ${r.topic}`,
  ).join("\n");

  return [
    `# ${title}`,
    "",
    `**${brand}** · ${strings.appTitle}`,
    "",
    `${strings.verifiedReferenceDate}: ${REFERENCE_DATE}`,
    "",
    "> Diagrams use [Mermaid](https://mermaid.js.org/) fences and render in GitHub, GitLab, Obsidian, and other Mermaid-capable viewers.",
    "",
    "## Contents",
    "",
    toc,
    "",
    "---",
    "",
    body.trimEnd(),
    "",
    `## ${strings.referenceLibrary}`,
    "",
    library,
    "",
  ].join("\n");
}

function anchor(slide: Slide): string {
  const slug = `${slide.number}-${slide.title}`
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
  return slug;
}

export async function exportPresentationMarkdown(
  slides: Slide[],
  locale: Locale,
): Promise<void> {
  const markdown = buildPresentationMarkdown(slides, locale);
  const { saveAs } = await import("file-saver");
  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });
  saveAs(blob, `Ronagen-GMP-${locale}.md`);
}

import type { Slide } from "../types";
import { REFERENCES, REFERENCE_DATE } from "../references";

const CYAN = "00ADC8";
const CORAL = "D66270";
const BURGUNDY = "7D0A1B";
const IVORY = "FFF9F2";
const INK = "1A1214";

export async function exportPresentationPptx(slides: Slide[]): Promise<void> {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
  pptx.layout = "WIDE";
  pptx.author = "Ronagen";
  pptx.title = "GMP in Pharmaceutical Manufacturing";
  pptx.subject = `Reference date ${REFERENCE_DATE}`;

  for (const slide of slides) {
    const s = pptx.addSlide();
    s.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: IVORY },
    });

    s.addText("Ronagen · روناژن", {
      x: 0.4,
      y: 0.2,
      w: 4,
      h: 0.3,
      fontSize: 10,
      color: CYAN,
      bold: true,
    });
    s.addText(`${slide.number} / ${slides.length}`, {
      x: 11.5,
      y: 0.2,
      w: 1.4,
      h: 0.3,
      fontSize: 10,
      color: "5C4A4E",
      align: "right",
    });

    s.addText(slide.title, {
      x: 0.4,
      y: 0.55,
      w: 12.5,
      h: 0.55,
      fontSize: 24,
      bold: true,
      color: INK,
    });

    if (slide.keyMessage) {
      s.addText(slide.keyMessage, {
        x: 0.4,
        y: 1.1,
        w: 12.5,
        h: 0.45,
        fontSize: 12,
        color: "5C4A4E",
        italic: true,
      });
    }

    const bullets = slide.content.slice(0, 8).map((c) => ({
      text: c,
      options: { bullet: true, breakLine: true },
    }));

    if (bullets.length) {
      s.addText(bullets, {
        x: 0.5,
        y: 1.7,
        w: 7.5,
        h: 4.5,
        fontSize: 14,
        color: INK,
        valign: "top",
      });
    }

    // Pathway color legend strip
    s.addShape(pptx.ShapeType.rect, {
      x: 8.4,
      y: 1.7,
      w: 4.4,
      h: 0.35,
      fill: { color: CORAL },
    });
    s.addText("Conventional Oral", {
      x: 8.4,
      y: 1.7,
      w: 4.4,
      h: 0.35,
      fontSize: 11,
      color: "FFFFFF",
      align: "center",
      valign: "middle",
      bold: true,
    });
    s.addShape(pptx.ShapeType.rect, {
      x: 8.4,
      y: 2.15,
      w: 4.4,
      h: 0.35,
      fill: { color: BURGUNDY },
    });
    s.addText("Biotechnology-Derived", {
      x: 8.4,
      y: 2.15,
      w: 4.4,
      h: 0.35,
      fontSize: 11,
      color: "FFFFFF",
      align: "center",
      valign: "middle",
      bold: true,
    });
    s.addShape(pptx.ShapeType.rect, {
      x: 8.4,
      y: 2.6,
      w: 4.4,
      h: 0.35,
      fill: { color: CYAN },
    });
    s.addText("Shared GMP Controls", {
      x: 8.4,
      y: 2.6,
      w: 4.4,
      h: 0.35,
      fontSize: 11,
      color: "FFFFFF",
      align: "center",
      valign: "middle",
      bold: true,
    });

    if (slide.visualData?.table) {
      const table = slide.visualData.table;
      s.addTable(
        [
          table.headers.map((h) => ({
            text: h,
            options: { bold: true, fill: { color: CYAN }, color: "FFFFFF" },
          })),
          ...table.rows.map((row) =>
            row.map((cell) => ({ text: cell, options: { color: INK } })),
          ),
        ],
        {
          x: 8.4,
          y: 3.1,
          w: 4.4,
          colW: table.headers.map(() => 4.4 / table.headers.length),
          border: { type: "solid", pt: 0.5, color: "E8D5C4" },
          fontSize: 9,
        },
      );
    }

    if (slide.references?.length) {
      s.addText(
        slide.references.map((id) => `[${id}]`).join(" "),
        {
          x: 0.4,
          y: 7.05,
          w: 12.5,
          h: 0.3,
          fontSize: 9,
          color: CYAN,
        },
      );
    }
  }

  // Appendix references slide
  const refSlide = pptx.addSlide();
  refSlide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
    fill: { color: IVORY },
  });
  refSlide.addText(`Authoritative References · ${REFERENCE_DATE}`, {
    x: 0.4,
    y: 0.3,
    w: 12,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: INK,
  });
  refSlide.addText(
    REFERENCES.map((r) => ({
      text: `[${r.id}] ${r.name} — ${r.url}`,
      options: { breakLine: true },
    })),
    {
      x: 0.4,
      y: 0.9,
      w: 12.5,
      h: 6.2,
      fontSize: 9,
      color: INK,
      valign: "top",
    },
  );

  await pptx.writeFile({ fileName: "Ronagen-GMP-Presentation.pptx" });
}

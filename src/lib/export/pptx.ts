import type { Slide } from "../types";
import { REFERENCE_DATE } from "../references";

function toPptxImage(dataUrl: string) {
  const marker = "base64,";
  const index = dataUrl.indexOf(marker);
  if (index === -1) return dataUrl;
  const mime = dataUrl.slice(5, index - 1);
  return `${mime};${dataUrl.slice(index)}`;
}

export async function exportPresentationPptx(
  slides: Slide[],
  images: string[],
  locale: "en" | "fa",
): Promise<void> {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
  pptx.layout = "WIDE";
  pptx.author = "Ronagen";
  pptx.title =
    locale === "fa"
      ? "GMP در تولید دارو"
      : "GMP in Pharmaceutical Manufacturing";
  pptx.subject = `Reference date ${REFERENCE_DATE}`;

  slides.forEach((slide, index) => {
    const page = pptx.addSlide();
    const image = images[index];
    if (image) {
      page.addImage({
        data: toPptxImage(image),
        x: 0,
        y: 0,
        w: 13.333,
        h: 7.5,
      });
    }
    if (slide.speakerNotes) page.addNotes(slide.speakerNotes);
  });

  await pptx.writeFile({ fileName: `Ronagen-GMP-${locale}.pptx` });
}

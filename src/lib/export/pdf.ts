import type { Slide } from "../types";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slideToHtml(slide: Slide, total: number): string {
  const bullets = slide.content
    .map((c) => `<li style="margin:6px 0;font-size:18px;line-height:1.35;">${escapeHtml(c)}</li>`)
    .join("");
  const key = slide.keyMessage
    ? `<p style="font-size:14px;color:#5c4a4e;margin:8px 0 16px;font-style:italic;">${escapeHtml(slide.keyMessage)}</p>`
    : "";
  const refs = slide.references?.length
    ? `<p style="position:absolute;bottom:24px;left:48px;right:48px;font-size:11px;color:#00ADC8;">${slide.references.map((r) => `[${escapeHtml(r)}]`).join(" ")}</p>`
    : "";

  return `<div style="position:relative;width:1280px;height:720px;padding:40px 48px;box-sizing:border-box;background:#FFF9F2;color:#1A1214;font-family:'Segoe UI',Source Sans 3,sans-serif;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <span style="font-size:12px;font-weight:700;color:#00ADC8;">Ronagen · روناژن</span>
      <span style="font-size:12px;color:#5c4a4e;">${slide.number} / ${total}</span>
    </div>
    <h1 style="font-size:32px;margin:0;line-height:1.2;">${escapeHtml(slide.title)}</h1>
    ${key}
    <ul style="margin:0;padding-left:22px;">${bullets}</ul>
    ${refs}
  </div>`;
}

export async function exportPresentationPdf(slides: Slide[]): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const host = document.createElement("div");
  host.style.cssText =
    "position:fixed;left:-10000px;top:0;width:1280px;height:720px;z-index:-1;overflow:hidden;";
  document.body.appendChild(host);

  try {
    for (let i = 0; i < slides.length; i++) {
      host.innerHTML = slideToHtml(slides[i], slides.length);
      const target = host.firstElementChild as HTMLElement;
      const canvas = await html2canvas(target, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#FFF9F2",
        logging: false,
        width: 1280,
        height: 720,
      });
      const img = canvas.toDataURL("image/jpeg", 0.9);
      if (i > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", 0, 0, pageW, pageH);
    }

    pdf.save("Ronagen-GMP-Presentation.pdf");
  } finally {
    document.body.removeChild(host);
  }
}

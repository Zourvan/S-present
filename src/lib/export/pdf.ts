const PAGE_W = 960;
const PAGE_H = 540;

export async function exportPresentationPdf(
  images: string[],
  locale: "en" | "fa",
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [PAGE_W, PAGE_H],
  });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  images.forEach((image, index) => {
    if (index > 0) pdf.addPage([pageW, pageH], "landscape");
    pdf.addImage(image, "JPEG", 0, 0, pageW, pageH);
  });

  pdf.save(`Ronagen-GMP-${locale}.pdf`);
}

import type { ReferenceEntry } from "./types";

export const REFERENCES: ReferenceEntry[] = [
  {
    id: "R1",
    name: "European Commission — EudraLex Volume 4, Part I",
    url: "https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en",
    topic: "Basic Requirements for Medicinal Products — Chapters 1–9",
  },
  {
    id: "R2",
    name: "European Commission — 2013/C 343/01 (EU GDP Guidelines)",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52013XC1123%2801%29",
    topic: "Guidelines on Good Distribution Practice of Medicinal Products for Human Use",
  },
  {
    id: "R3",
    name: "ICH Q9(R1) — Quality Risk Management",
    url: "https://www.ich.org/page/quality-guidelines",
    topic: "Quality risk management principles and process",
  },
  {
    id: "R4",
    name: "ICH Q10 — Pharmaceutical Quality System",
    url: "https://www.ich.org/page/quality-guidelines",
    topic: "PQS model across the product lifecycle",
  },
  {
    id: "R5",
    name: "EU GMP Annex 11 — Computerised Systems",
    url: "https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en",
    topic: "Computerised systems used in GMP activities",
  },
  {
    id: "R6",
    name: "EU GMP Annex 15 — Qualification and Validation",
    url: "https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en",
    topic: "Qualification and validation principles",
  },
  {
    id: "R7",
    name: "EU GMP Annex 16 — Certification by a Qualified Person and Batch Release",
    url: "https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en",
    topic: "QP certification and batch release",
  },
  {
    id: "R8",
    name: "PIC/S PI 041 — Good Practices for Data Management and Integrity",
    url: "https://picscheme.org/en/publications",
    topic: "Data management and integrity expectations",
  },
];

export const REFERENCE_DATE = "6 November 2026";

export function getReference(id: string): ReferenceEntry | undefined {
  return REFERENCES.find((r) => r.id === id);
}

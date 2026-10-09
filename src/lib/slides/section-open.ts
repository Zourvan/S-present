import { slide } from "./helpers";

export const openSlides = [
  slide(1, {
    id: "s00-title",
    section: "open",
    title: "GMP in Pharmaceutical Manufacturing",
    keyMessage:
      "A Comprehensive Implementation Framework for Conventional Oral Medicines and Biotechnology-Derived Products",
    content: [
      "Regulatory compliance",
      "Process control",
      "Product quality",
      "Patient safety",
      "Sustainable GMP implementation",
    ],
    visualType: "titleHero",
    visualData: {
      subtitle:
        "A Comprehensive Implementation Framework for Conventional Oral Medicines and Biotechnology-Derived Products",
      supporting: [
        "Regulatory compliance",
        "Process control",
        "Product quality",
        "Patient safety",
        "Sustainable GMP implementation",
      ],
      leftTitle: "Conventional Oral",
      rightTitle: "Biotechnology-Derived",
      leftSteps: ["API", "Blend / Granulate", "Compress / Fill", "Package"],
      rightSteps: ["Cell bank", "Upstream", "Downstream", "Formulate / Fill"],
      shared: ["Pharmaceutical Quality System"],
    },
    speakerNotes:
      "Opening slide. Emphasize shared PQS with product-specific controls. Do not claim global certification.",
    revealSteps: 4,
  }),
  slide(2, {
    id: "s01-presenter",
    section: "open",
    title: "Presenter Introduction",
    content: [
      "Name and organizational role",
      "Ronagen — روناژن",
      "GMP training for manufacturing and quality professionals",
    ],
    visualType: "presenter",
    visualData: {
      presenter: {
        name: "Elham Afsahi",
        role: "Quality Assurance Expert",
      },
    },
    speakerNotes: "Replace placeholders with the presenter’s real credentials before delivery.",
    revealSteps: 2,
  }),
];

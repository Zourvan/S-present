import { slide } from "./helpers";

export const openSlides = [
  slide(1, {
    id: "s01-title",
    section: "open",
    title: "GMP & GDP Fundamentals and Key Pharmaceutical Quality Systems",
    keyMessage:
      "From controlled manufacture to preserving quality across the supply chain",
    content: [],
    visualType: "titleHero",
    visualData: {
      subtitle:
        "From controlled manufacture to preserving quality across the supply chain",
      supporting: [
        "EudraLex Volume 4 — Part I",
        "EU GDP Guidelines",
        "ICH Q9(R1) & ICH Q10",
      ],
      presenter: {
        name: "Presenter name | Organizational unit",
        role: "Date",
      },
    },
    speakerNotes:
      "Scientific basis: GMP follows the nine chapters of Part I, EudraLex Volume 4. GDP comes from the EU distribution guideline; supplementary material from ICH and PIC/S.",
    revealSteps: 2,
  }),
];

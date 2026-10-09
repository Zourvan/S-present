import fs from "fs";

const raw = fs.readFileSync("public/brand/ronagen-logo.svg", "utf8");
const vb = (raw.match(/viewBox="([^"]+)"/) || [])[1] || "0 0 1100 892";

// Keep full path elements (opening tag + attributes + closing), do not drop artwork.
const paths = [...raw.matchAll(/<path\b[\s\S]*?<\/path>/g)].map((m) => m[0]);

if (paths.length < 1) {
  console.error("No paths found — aborting so artwork is not lost.");
  process.exit(1);
}

const clean = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="1100" height="892" role="img" aria-label="Ronagen">
${paths.join("\n")}
</svg>
`;

fs.writeFileSync("public/brand/ronagen-logo.svg", clean);
console.log("Wrote clean SVG with", paths.length, "paths,", clean.length, "bytes");
paths.forEach((p, i) => {
  const fill = (p.match(/fill="([^"]+)"/) || [])[1];
  console.log(i, "fill", fill, "chars", p.length);
});

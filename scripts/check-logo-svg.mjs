import fs from "fs";

const raw = fs.readFileSync("public/brand/ronagen-logo.svg", "utf8");
console.log("bytes", raw.length);
console.log("starts", JSON.stringify(raw.slice(0, 140)));
console.log("ends", JSON.stringify(raw.slice(-100)));

const openSvg = (raw.match(/<svg\b/g) || []).length;
const closeSvg = (raw.match(/<\/svg>/g) || []).length;
const openPath = (raw.match(/<path\b/g) || []).length;
const closePath = (raw.match(/<\/path>/g) || []).length;
const openG = (raw.match(/<g\b/g) || []).length;
const closeG = (raw.match(/<\/g>/g) || []).length;
console.log({ openSvg, closeSvg, openPath, closePath, openG, closeG });

console.log("rootHasXmlns", /^\s*<svg[^>]*xmlns=/.test(raw));
console.log("rootHasViewBox", /^\s*<svg[^>]*viewBox=/.test(raw));
console.log(
  "viewBoxes",
  [...raw.matchAll(/viewBox="([^"]+)"/g)].map((m) => m[1]),
);
console.log(
  "fills",
  [...raw.matchAll(/fill="([^"]+)"/g)].map((m) => m[1]),
);
console.log("selfClosingPaths", (raw.match(/<path[^>]*\/>/g) || []).length);

// Well-formed enough for browsers: tags balanced + paths have d=
const ds = [...raw.matchAll(/<path[^>]*\bd="/g)].length;
console.log("pathsWithD", ds);

const tagsOk =
  openSvg === closeSvg &&
  openPath === closePath &&
  openG === closeG &&
  openSvg >= 1 &&
  openPath === 2;
console.log("structureOk", tagsOk);

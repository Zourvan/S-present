import fs from "fs";
import sharp from "sharp";

const svg = fs.readFileSync("public/brand/ronagen-logo.svg");
const out = "scripts/ronagen-logo-preview.png";
await sharp(svg)
  .resize(440, 356, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile(out);
console.log("ok", out);

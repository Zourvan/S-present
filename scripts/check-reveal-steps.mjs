import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = "src/lib/slides";
const files = readdirSync(dir).filter((f) => f.startsWith("section-"));

const issues = [];
for (const file of files) {
  const src = readFileSync(join(dir, file), "utf8");
  // Rough parse: find content arrays and nearby revealSteps
  const slideBlocks = src.split(/slide\(\d+/).slice(1);
  for (const block of slideBlocks) {
    const id = (block.match(/id:\s*"([^"]+)"/) || [])[1];
    const title = (block.match(/title:\s*"([^"]+)"/) || [])[1];
    const contentMatch = block.match(/content:\s*\[([\s\S]*?)\],/);
    const revealMatch = block.match(/revealSteps:\s*(\d+)/);
    if (!contentMatch || !revealMatch) continue;
    const contentLen = (contentMatch[1].match(/"[^"]+"/g) || []).length;
    const reveal = Number(revealMatch[1]);
    if (contentLen > reveal) {
      issues.push({ file, id, title, contentLen, reveal });
    }
  }
}

console.log("slides where content.length > revealSteps:");
for (const i of issues) {
  console.log(
    `- ${i.id} (${i.title}): content=${i.contentLen} revealSteps=${i.reveal}`,
  );
}
console.log("count", issues.length);

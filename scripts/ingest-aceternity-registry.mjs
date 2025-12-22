import fs from "node:fs/promises";
import path from "node:path";

const URLS = [
  "https://ui.aceternity.com/registry/apple-cards-carousel-demo.json",
  "https://ui.aceternity.com/registry/resizable-navbar-demo.json",
  "https://ui.aceternity.com/registry/flip-words-demo.json",
  "https://ui.aceternity.com/registry/dotted-glow-background-demo.json",
  "https://ui.aceternity.com/registry/background-lines-demo.json",
  "https://ui.aceternity.com/registry/aurora-background-demo.json",
  "https://ui.aceternity.com/registry/canvas-reveal-effect-demo.json",
  "https://ui.aceternity.com/registry/svg-mask-effect-demo.json",
  "https://ui.aceternity.com/registry/tracing-beam-demo.json",
  // "Grid and Dot Backgrounds" page links to this registry slug
  "https://ui.aceternity.com/registry/grid-background-demo.json",
  "https://ui.aceternity.com/registry/glowing-effect-demo.json",
  "https://ui.aceternity.com/registry/tooltip-card-demo.json",
  "https://ui.aceternity.com/registry/card-stack-demo.json",
  "https://ui.aceternity.com/registry/animated-testimonials-demo.json",
];

function transformContent(content) {
  // Aceternity currently points to `motion/react` (Motion 11/Framer v12 style).
  // We use `framer-motion` directly in this repo.
  return content
    .replaceAll('from "motion/react"', 'from "framer-motion"')
    .replaceAll("from 'motion/react'", "from 'framer-motion'")
    .replaceAll('from "motion"', 'from "framer-motion"')
    .replaceAll("from 'motion'", "from 'framer-motion'");
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${url} => ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

const written = [];

for (const url of URLS) {
  const json = await fetchJson(url);
  const files = Array.isArray(json.files) ? json.files : [];

  for (const file of files) {
    const target = file.target ?? file.path;
    const outPath = path.join(process.cwd(), target);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    const content = transformContent(String(file.content ?? ""));
    await fs.writeFile(outPath, content, "utf8");
    written.push(target);
  }
}

console.log(`WROTE ${written.length} files`);
console.log([...new Set(written)].sort().join("\n"));



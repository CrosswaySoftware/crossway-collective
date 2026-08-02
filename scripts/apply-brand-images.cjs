#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const mapPath = path.join(__dirname, "brand-image-map.json");
const srcRoot = path.join(root, "public/newimage-webp");
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));

const used = new Set();
let total = 0;

for (const [slug, items] of Object.entries(map)) {
  const destDir = path.join(root, "public/images", slug);
  fs.mkdirSync(destDir, { recursive: true });

  // Remove old numbered assets
  for (const f of fs.readdirSync(destDir)) {
    if (/^\d+\.(jpg|jpeg|png|webp)$/i.test(f)) fs.unlinkSync(path.join(destDir, f));
  }

  items.forEach((item, i) => {
    const src = path.join(srcRoot, item.src);
    const dest = path.join(destDir, `${i + 1}.webp`);
    if (!fs.existsSync(src)) {
      console.error(`Missing source: ${item.src}`);
      process.exitCode = 1;
      return;
    }
    if (used.has(item.src)) {
      console.error(`Duplicate assignment: ${item.src}`);
      process.exitCode = 1;
      return;
    }
    used.add(item.src);
    fs.copyFileSync(src, dest);
    total++;
    console.log(`${slug}/${i + 1}.webp ← ${item.src}`);
  });
}

console.log(`\nApplied ${total} images across ${Object.keys(map).length} brands.`);

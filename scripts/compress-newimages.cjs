#!/usr/bin/env node
/**
 * Compress raster images from one folder and write WebP copies to another folder.
 *
 * Usage:
 *   node scripts/compress-newimages.cjs
 *   node scripts/compress-newimages.cjs --dry-run
 *   node scripts/compress-newimages.cjs --quality 75 --max-long-edge 1920
 *   node scripts/compress-newimages.cjs --max-kb 250
 *
 * Defaults:
 *   input:  public/newimage
 *   output: public/newimage-webp
 *
 * Requires: npm install sharp --save-dev
 */

const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("Missing dependency: sharp. Run: npm install sharp --save-dev");
  process.exit(1);
}

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);
const SKIP_NAMES = new Set([".DS_Store"]);

function parseArgs(argv) {
  const opts = {
    dryRun: false,
    force: false,
    quality: 75,
    pngQuality: 78,
    maxLongEdge: 1920,
    maxOutputKb: 0,
    inputDir: "public/newimage",
    outputDir: "public/newimage-webp",
    projectRoot: path.resolve(__dirname, ".."),
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--force") opts.force = true;
    else if (a === "--quality") opts.quality = Number(argv[++i]);
    else if (a === "--png-quality") opts.pngQuality = Number(argv[++i]);
    else if (a === "--max-long-edge") opts.maxLongEdge = Number(argv[++i]);
    else if (a === "--max-kb") opts.maxOutputKb = Number(argv[++i]);
    else if (a === "--no-resize") opts.maxLongEdge = 0;
    else if (a === "--input-dir") opts.inputDir = argv[++i];
    else if (a === "--output-dir") opts.outputDir = argv[++i];
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/compress-newimages.cjs [options]

Options:
  --dry-run              List actions only
  --force                Re-encode even if output exists
  --quality <n>          WebP quality (default: 75)
  --png-quality <n>      WebP quality for PNG/alpha (default: 78)
  --max-long-edge <px>   Resize longest side (default: 1920, 0 = no resize)
  --max-kb <n>           Target max output size per file in KiB
  --input-dir <dir>      Source folder (default: public/newimage)
  --output-dir <dir>     Destination folder (default: public/newimage-webp)
`);
      process.exit(0);
    }
  }

  return opts;
}

function walkFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_NAMES.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out;
}

function bytesLabel(bytes) {
  const b = Number(bytes);
  if (!Number.isFinite(b) || b < 0) return "?";
  if (b < 1024) return `${b} B`;
  const kb = b / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

async function encodeToWebpBuffer(inputBuf, inputPath, metaPre, resizeEdge, photoQ, pngQ) {
  let pipeline = sharp(inputBuf, { failOn: "none" }).rotate();
  if (resizeEdge > 0 && metaPre.width && metaPre.height) {
    const longEdge = Math.max(metaPre.width, metaPre.height);
    if (longEdge > resizeEdge) {
      pipeline = pipeline.resize({
        width: resizeEdge,
        height: resizeEdge,
        fit: "inside",
        withoutEnlargement: true,
      });
    }
  }

  const ext = path.extname(inputPath).toLowerCase();
  const isPng = ext === ".png" || metaPre.format === "png";
  const webpOpts = { effort: 6, smartSubsample: true };
  const hasAlpha = metaPre.has_alpha ?? metaPre.hasAlpha;

  if (hasAlpha || isPng) {
    webpOpts.quality = pngQ;
    if (hasAlpha) webpOpts.alphaQuality = 100;
  } else {
    webpOpts.quality = photoQ;
  }

  const buf = await pipeline.webp(webpOpts).toBuffer();
  const scaledDown = Boolean(
    resizeEdge > 0 &&
      metaPre.width &&
      metaPre.height &&
      Math.max(metaPre.width, metaPre.height) > resizeEdge,
  );

  return { buf, scaledDown };
}

async function encodeUnderBudget(inputBuf, inputPath, metaPre, opts, targetBytes) {
  let edge = Number(opts.maxLongEdge) > 0 ? Number(opts.maxLongEdge) : 2560;
  let photoQ = opts.quality;
  let pngQ = opts.pngQuality;
  const minEdge = 960;
  const minPhotoQ = 48;
  const minPngQ = 50;
  let best = null;
  let bestLen = Infinity;
  let lastScaled = false;

  for (let iter = 0; iter < 42; iter++) {
    const { buf, scaledDown } = await encodeToWebpBuffer(
      inputBuf,
      inputPath,
      metaPre,
      edge,
      photoQ,
      pngQ,
    );
    lastScaled = scaledDown;
    if (buf.length < bestLen) {
      bestLen = buf.length;
      best = buf;
    }
    if (buf.length <= targetBytes) {
      return { buf, scaledDown, budgetNote: `≤${opts.maxOutputKb}KB @ ${edge}px q${photoQ}` };
    }

    if (photoQ > minPhotoQ + 3) {
      photoQ -= 3;
      pngQ = Math.max(minPngQ, pngQ - 3);
    } else if (edge > minEdge + 64) {
      edge = Math.max(minEdge, Math.round(edge * 0.9));
    } else if (photoQ > minPhotoQ) {
      photoQ -= 2;
      pngQ = Math.max(minPngQ, pngQ - 2);
    } else if (edge > minEdge) {
      edge = Math.max(minEdge, Math.round(edge * 0.92));
    } else {
      break;
    }
  }

  return {
    buf: best,
    scaledDown: lastScaled,
    budgetNote: `closest to ${opts.maxOutputKb}KB (${bestLen ? bytesLabel(bestLen) : "?"})`,
  };
}

async function convertOne(inputPath, outPath, opts) {
  const inputBuf = fs.readFileSync(inputPath);
  const metaPre = await sharp(inputBuf, { failOn: "none" }).metadata();
  const cap = Number(opts.maxLongEdge) || 0;
  const targetBytes = opts.maxOutputKb > 0 ? opts.maxOutputKb * 1024 : 0;

  let buf;
  let scaledDown;
  let budgetNote = "";

  if (targetBytes > 0) {
    const bud = await encodeUnderBudget(inputBuf, inputPath, metaPre, opts, targetBytes);
    buf = bud.buf;
    scaledDown = bud.scaledDown;
    budgetNote = bud.budgetNote;
  } else {
    const out = await encodeToWebpBuffer(inputBuf, inputPath, metaPre, cap, opts.quality, opts.pngQuality);
    buf = out.buf;
    scaledDown = out.scaledDown;
  }

  if (!opts.dryRun) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, buf);
  }

  return { outBytes: buf.length, scaledDown, budgetNote };
}

async function main() {
  const opts = parseArgs(process.argv);
  const inputRoot = path.join(opts.projectRoot, opts.inputDir);
  const outputRoot = path.join(opts.projectRoot, opts.outputDir);

  if (!fs.existsSync(inputRoot)) {
    console.error(`Input directory not found: ${inputRoot}`);
    process.exit(1);
  }

  const files = walkFiles(inputRoot).filter((f) => RASTER_EXT.has(path.extname(f).toLowerCase()));
  console.log(`Input:  ${opts.inputDir}/ (${files.length} files)`);
  console.log(`Output: ${opts.outputDir}/`);
  console.log(`Settings: quality=${opts.quality}, maxLongEdge=${opts.maxLongEdge || "none"}, maxKb=${opts.maxOutputKb || "none"}\n`);

  let totalIn = 0;
  let totalOut = 0;
  let processed = 0;

  for (const inputPath of files) {
    const rel = path.relative(inputRoot, inputPath);
    const base = rel.slice(0, rel.length - path.extname(rel).length);
    const outPath = path.join(outputRoot, `${base}.webp`);

    if (!opts.force && !opts.dryRun && fs.existsSync(outPath)) {
      const stIn = fs.statSync(inputPath);
      const stOut = fs.statSync(outPath);
      if (stOut.mtimeMs >= stIn.mtimeMs) {
        console.log(`SKIP ${rel} (webp up to date)`);
        continue;
      }
    }

    const inBytes = fs.statSync(inputPath).size;
    if (opts.dryRun) {
      console.log(`[dry-run] ${rel} → ${path.relative(outputRoot, outPath)}`);
      processed++;
      continue;
    }

    try {
      const { outBytes, scaledDown, budgetNote } = await convertOne(inputPath, outPath, opts);
      totalIn += inBytes;
      totalOut += outBytes;
      processed++;
      const pct = inBytes ? (((inBytes - outBytes) / inBytes) * 100).toFixed(1) : "0";
      const note = budgetNote
        ? ` [${budgetNote}]`
        : scaledDown && opts.maxLongEdge > 0
          ? ` [scaled ≤${opts.maxLongEdge}px]`
          : "";
      console.log(
        `WRITE ${rel}  ${bytesLabel(inBytes)} → ${bytesLabel(outBytes)} (${pct}% smaller)${note}`,
      );
    } catch (e) {
      console.error(`FAIL ${rel}:`, e.message || e);
      process.exitCode = 1;
    }
  }

  if (opts.dryRun) {
    console.log(`\nDry-run: ${processed} file(s) would be converted.`);
  } else {
    console.log(`\nDone. Converted ${processed} file(s).`);
    if (totalIn > 0) {
      const saved = totalIn - totalOut;
      const pctAll = ((saved / totalIn) * 100).toFixed(1);
      console.log(
        `Total: ${bytesLabel(totalIn)} → ${bytesLabel(totalOut)} (${pctAll}% smaller, ${bytesLabel(saved)} saved)`,
      );
      console.log(`Output folder: ${opts.outputDir}/`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Two Lines to Your Past Self — make.fun entry.
// Writes exactly two lines to $MAKEFUN_OUTPUT_DIR/entry.txt:
// line 1 warns the past self about one specific moment,
// line 2 says in one sentence why that moment mattered.
const fs = require("node:fs");
const path = require("node:path");

const LINE1 = "Don't say 'I'm fine' when she asks what's wrong at the kitchen table that Tuesday night.";
const LINE2 = "That one lie builds the wall between you, and it takes you three years to tear it down.";

const text = LINE1 + "\n" + LINE2;

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const outPath = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, text, "utf8");

// Guard: 1-280 code points, exactly 2 lines, not whitespace-only.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error("entry must be 1-280 characters, got " + codePoints);
}
const lines = text.split("\n");
if (lines.length !== 2) {
  throw new Error("entry must be exactly 2 lines, got " + lines.length);
}
if (!text.trim()) {
  throw new Error("entry must not be whitespace-only");
}
if (lines.some((line) => !line.trim())) {
  throw new Error("each line must contain non-whitespace text");
}

// Round-trip validation: read back exactly what was just written.
const roundTrip = fs.readFileSync(outPath, "utf8");
if (roundTrip !== text) {
  throw new Error("round-trip mismatch: written output differs from entry text");
}

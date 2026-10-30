import { readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { report, walkFiles } from "./kit";

/**
 * CF-SHIFT-1 (INC-1005, foundations-turn-r1a.md items 1–4) — OPENING OR CLOSING AN
 * OVERLAY NEVER MOVES THE PAGE. One mechanism, in src/styles.css alone:
 *  - the root reserves the scrollbar's gutter (`scrollbar-gutter: stable` on html);
 *  - the scroll-lock library's own compensation is neutralised beside it
 *    (`html body[data-scroll-locked] { margin-right: 0 !important }`).
 * Nothing else under src/ sets a gutter or styles the lock's attribute or variable.
 * The fix never turns an overlay's modality off (ruling 3); the two non-modal overlays that
 * predate it (app-rail.tsx's menu sheet, row-actions.tsx's menu) are reported, not judged here.
 */
type Finding = { file: string; line: number; what: string };

const STYLES = "src/styles.css";
const GUTTER = /html\s*\{[^}]*scrollbar-gutter:\s*stable/;
const NEUTRAL = /html\s+body\[data-scroll-locked\]\s*\{[^}]*margin-right:\s*0\s*!important/;
const ELSEWHERE = /scrollbar-gutter|data-scroll-locked|removed-body-scroll-bar-size/;

export function shiftFindings(files: { name: string; text: string }[]): Finding[] {
  const found: Finding[] = [];
  const styles = files.find((file) => file.name === STYLES);
  const css = (styles?.text ?? "").replace(/\/\*[\s\S]*?\*\//g, "");
  if (!GUTTER.test(css))
    found.push({ file: STYLES, line: 1, what: "the root's `scrollbar-gutter: stable` is missing" });
  if (!NEUTRAL.test(css))
    found.push({
      file: STYLES,
      line: 1,
      what: "the scroll lock's margin compensation is not neutralised",
    });
  for (const file of files) {
    if (file.name === STYLES) continue;
    file.text.split("\n").forEach((text, index) => {
      if (ELSEWHERE.test(text))
        found.push({
          file: file.name,
          line: index + 1,
          what: "a second overlay-shift mechanism (only src/styles.css, CF-SHIFT-1)",
        });
    });
  }
  return found;
}

describe("CF-SHIFT-1 overlay shift", () => {
  it("src/styles.css holds the one mechanism and nothing else under src/ adds another", () => {
    const root = process.cwd();
    const files = walkFiles([join(root, "src")], {
      ext: ["css", "ts", "tsx"],
      skipTests: true,
    }).map((file) => ({
      name: relative(root, file).split(sep).join("/"),
      text: readFileSync(file, "utf8"),
    }));
    const found = shiftFindings(files);
    expect(found, report(found)).toEqual([]);
  });

  it("self-test: a planted overlay compensation and a missing gutter are refused", () => {
    const found = shiftFindings([
      { name: STYLES, text: "html { overflow-x: hidden; }" },
      {
        name: "src/components/planted.tsx",
        text: 'style={{ scrollbarGutter: "stable" }} scrollbar-gutter',
      },
      { name: "src/planted.css", text: "body[data-scroll-locked] { margin-right: 0 }" },
    ]);
    expect(found.map((f) => f.what)).toEqual([
      "the root's `scrollbar-gutter: stable` is missing",
      "the scroll lock's margin compensation is not neutralised",
      "a second overlay-shift mechanism (only src/styles.css, CF-SHIFT-1)",
      "a second overlay-shift mechanism (only src/styles.css, CF-SHIFT-1)",
    ]);
  });
});

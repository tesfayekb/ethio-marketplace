import { readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { report, walkFiles } from "./kit";

/**
 * CF-SHIFT-1 (INC-1005, foundations-turn-r1a.md items 1–4) — OPENING OR CLOSING AN
 * OVERLAY NEVER MOVES THE PAGE. One mechanism, in src/styles.css alone:
 *  - the scroll-lock library's own compensation is neutralised
 *    (`html body[data-scroll-locked] { margin-right: 0 !important }`);
 *  - no `scrollbar-gutter` anywhere under src/, src/styles.css included (INC-1007: a
 *    reserved gutter narrowed every page by its width).
 * Nothing else under src/ styles the lock's attribute or variable.
 * The fix never turns an overlay's modality off (ruling 3); the two non-modal overlays that
 * predate it (app-rail.tsx's menu sheet, row-actions.tsx's menu) are reported, not judged here.
 */
type Finding = { file: string; line: number; what: string };

const STYLES = "src/styles.css";
const GUTTER = /scrollbar-gutter/;
const NEUTRAL = /html\s+body\[data-scroll-locked\]\s*\{[^}]*margin-right:\s*0\s*!important/;
const ELSEWHERE = /data-scroll-locked|removed-body-scroll-bar-size/;
const GUTTER_WHAT = "a scrollbar gutter is reserved (INC-1007: it narrows every page by its width)";

export function shiftFindings(files: { name: string; text: string }[]): Finding[] {
  const found: Finding[] = [];
  const styles = files.find((file) => file.name === STYLES);
  const css = (styles?.text ?? "").replace(/\/\*[\s\S]*?\*\//g, "");
  if (!NEUTRAL.test(css))
    found.push({
      file: STYLES,
      line: 1,
      what: "the scroll lock's margin compensation is not neutralised",
    });
  for (const file of files) {
    file.text.split("\n").forEach((text, index) => {
      if (GUTTER.test(text) && !(file.name === STYLES && /^\s*(\/\*|\*)/.test(text)))
        found.push({ file: file.name, line: index + 1, what: GUTTER_WHAT });
      if (file.name !== STYLES && ELSEWHERE.test(text))
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

  it("self-test: a missing neutralisation, a gutter put back and a second mechanism are refused", () => {
    expect(
      shiftFindings([{ name: STYLES, text: "html { overflow-x: hidden; }" }]).map((f) => f.what),
    ).toEqual(["the scroll lock's margin compensation is not neutralised"]);
    expect(
      shiftFindings([
        {
          name: STYLES,
          text: "html { scrollbar-gutter: stable; }\nhtml body[data-scroll-locked] { margin-right: 0 !important; }",
        },
      ]).map((f) => f.what),
    ).toEqual([GUTTER_WHAT]);
    expect(
      shiftFindings([
        { name: STYLES, text: "html body[data-scroll-locked] { margin-right: 0 !important; }" },
        { name: "src/planted.css", text: "body[data-scroll-locked] { margin-right: 0 }" },
        { name: "src/components/planted.tsx", text: 'className="[scrollbar-gutter:stable]"' },
      ]).map((f) => f.what),
    ).toEqual(["a second overlay-shift mechanism (only src/styles.css, CF-SHIFT-1)", GUTTER_WHAT]);
  });
});

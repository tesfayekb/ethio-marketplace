import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, report } from "./kit";

/**
 * CF-BAND-1 (D258; Foundations turn R1d-c) — ONE HEIGHT FOR EVERY BAND ROW. The rows, by
 * definition every full-width row of the shell's sub-band and the menu's band: the panel
 * tabs row, the breadcrumb row, the location row and the menu's band. Each carries
 * `data-band-row` and reads BAND_ROW (src/components/shell/band-row.ts). The census refuses:
 *  - a band-row file whose row is missing its `data-band-row` mark or BAND_ROW;
 *  - a literal height (h-*, min-h-*, max-h-*) on a band row's own tag;
 *  - a second source: BAND_ROW declared, or its value written, anywhere but band-row.ts.
 *
 * CF-BAR-1 (D256; Foundations turn R1d-c) — ONE SPACING SCALE FOR THE TOP BAR from 768 px.
 * The band, by definition: AppHeader (app-header.tsx) and the shell's band up to the rail
 * (app-shell.tsx, from `shell-band` to `<AppRail />`). The census refuses:
 *  - a negative margin anywhere in the band;
 *  - a gap or margin from 768 px (md:gap-*, md:m*-*) other than BAR_GAP / BAR_INSET
 *    (src/components/shell/bar-spacing.ts), or a second declaration of either.
 */
type Finding = { file: string; line: number; what: string };
type File = { name: string; text: string };

export const BAND_HOME = "src/components/shell/band-row.ts";
export const BAR_HOME = "src/components/shell/bar-spacing.ts";
/** Each band-row file and how many band rows it draws. */
export const BAND_FILES: Record<string, number> = {
  "src/components/app-shell.tsx": 1,
  "src/components/shell/panel-tabs.tsx": 1,
  "src/components/shell/panel-header.tsx": 2,
  "src/components/shell/location-selector.tsx": 1,
};
const HEADER = "src/components/shell/app-header.tsx";
const SHELL = "src/components/app-shell.tsx";

const LITERAL_HEIGHT = /(?:^|[\s"'`])(?:min-|max-)?h-(?:\d|\[|px\b|full\b|screen\b|auto\b)/;
const NEGATIVE_MARGIN = /(?:^|[\s"'`:])-m[trblxyse]?-\S/;
const OWN_BAR_SPACE = /(?:^|[\s"'`])md:(?:gap(?:-[xy])?|m[trblxyse]?)-\S/;

/** The opening tag around a `data-band-row` mark: from its `<` to the closing `>`. */
function tagAround(code: string, at: number): string {
  const start = code.lastIndexOf("<", at);
  let depth = 0;
  for (let i = at; i < code.length; i++) {
    const c = code[i];
    if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === ">" && depth === 0) return code.slice(start, i + 1);
  }
  return code.slice(start);
}
const lineOf = (code: string, at: number) => code.slice(0, at).split("\n").length;

export function bandFindings(files: File[]): Finding[] {
  const findings: Finding[] = [];
  const byName = new Map(files.map((file) => [file.name, file.text]));
  for (const [name, expected] of Object.entries(BAND_FILES)) {
    const text = byName.get(name);
    if (text === undefined) continue;
    const code = codeOf(text);
    const marks = [...code.matchAll(/data-band-row=/g)].map((m) => m.index ?? 0);
    if (marks.length !== expected)
      findings.push({
        file: name,
        line: 1,
        what: `${marks.length} band row(s) marked data-band-row, ${expected} expected (D258)`,
      });
    const viaBand = /const BAND = `[^`]*\$\{BAND_ROW\}/.test(code);
    for (const at of marks) {
      const tag = tagAround(code, at);
      const line = lineOf(code, at);
      if (!/\bBAND_ROW\b/.test(tag) && !(viaBand && /\bBAND\b/.test(tag)))
        findings.push({ file: name, line, what: "a band row that does not read BAND_ROW (D258)" });
      if (LITERAL_HEIGHT.test(tag))
        findings.push({ file: name, line, what: "a literal height on a band row (D258)" });
    }
  }
  for (const file of files) {
    if (file.name === BAND_HOME) continue;
    const code = codeOf(file.text);
    if (/\bconst BAND_ROW\s*=/.test(code) || /h-10 min-h-10 max-h-10/.test(code))
      findings.push({ file: file.name, line: 1, what: "a second source of the band row's height (D258)" });
  }
  return findings;
}

export function barFindings(files: File[]): Finding[] {
  const findings: Finding[] = [];
  for (const file of files) {
    const code = codeOf(file.text);
    if (file.name !== BAR_HOME && /\bconst BAR_(?:GAP|INSET)\s*=/.test(code))
      findings.push({ file: file.name, line: 1, what: "a second source of the bar's spacing (D256)" });
    let region: { text: string; offset: number } | null = null;
    if (file.name === HEADER) region = { text: code, offset: 0 };
    if (file.name === SHELL) {
      const start = code.indexOf('data-testid="shell-band"');
      const end = code.indexOf("<AppRail />", start);
      if (start >= 0 && end > start) region = { text: code.slice(start, end), offset: start };
      else findings.push({ file: SHELL, line: 1, what: "the shell's band is not found (D256)" });
    }
    if (!region) continue;
    const base = lineOf(code, region.offset);
    region.text.split("\n").forEach((text, index) => {
      if (NEGATIVE_MARGIN.test(text))
        findings.push({ file: file.name, line: base + index, what: "a negative margin in the top bar (D256)" });
      if (OWN_BAR_SPACE.test(text))
        findings.push({
          file: file.name,
          line: base + index,
          what: "a gap or margin of its own in the top bar, not BAR_GAP (D256)",
        });
    });
  }
  return findings;
}

const read = (name: string): File => ({ name, text: readFileSync(name, "utf8") });

describe("CF-BAND-1 one height for every band row", () => {
  it("every band row reads BAND_ROW, carries no literal height, and has one source", () => {
    const names = [...Object.keys(BAND_FILES), HEADER, "src/components/shell/app-rail.tsx"];
    const findings = bandFindings(names.map(read));
    expect(findings, report(findings)).toEqual([]);
  });

  it("self-test: a literal height, a missing mark and a second source are refused", () => {
    const findings = bandFindings([
      {
        name: "src/components/shell/panel-tabs.tsx",
        text: '<div data-band-row="" className={cn("flex h-11", BAND_ROW)}>',
      },
      { name: "src/components/shell/location-selector.tsx", text: '<div className="h-8" />' },
      { name: "src/components/planted.tsx", text: 'export const BAND_ROW = "h-10 min-h-10 max-h-10";' },
    ]);
    expect(findings.map((f) => `${f.file} ${f.what}`)).toEqual([
      "src/components/shell/panel-tabs.tsx a literal height on a band row (D258)",
      "src/components/shell/location-selector.tsx 0 band row(s) marked data-band-row, 1 expected (D258)",
      "src/components/planted.tsx a second source of the band row's height (D258)",
    ]);
  });
});

describe("CF-BAR-1 one spacing scale for the top bar", () => {
  it("the band has no negative margin and no gap of its own", () => {
    const findings = barFindings([read(HEADER), read(SHELL)]);
    expect(findings, report(findings)).toEqual([]);
  });

  it("self-test: a negative margin, a gap of its own and a second scale are refused", () => {
    const findings = barFindings([
      {
        name: HEADER,
        text: '<header className={cn("flex", BAR_GAP)}>\n<Link className="-ms-1 inline-flex" />\n<div className="md:gap-3" />',
      },
      { name: "src/components/planted.ts", text: 'export const BAR_GAP = "md:gap-3";' },
    ]);
    expect(findings.map((f) => `${f.file}:${f.line} ${f.what}`)).toEqual([
      `${HEADER}:2 a negative margin in the top bar (D256)`,
      `${HEADER}:3 a gap or margin of its own in the top bar, not BAR_GAP (D256)`,
      "src/components/planted.ts:1 a second source of the bar's spacing (D256)",
    ]);
  });
});

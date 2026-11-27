import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { pageRoutes } from "./failure-crawl";
import { TREE_SCAN_MS, report } from "./kit";
import {
  ALLOWLIST,
  CENSUS,
  MANIFEST,
  allowlistFindings,
  answersOf,
  floorFindings,
  manifestFindings,
  namedTestFindings,
  owedKeys,
  pageFindings,
  parseManifest,
  readAllowances,
  sha256Of,
  testIdOf,
  testTitles,
  titlesIn,
  ufRowsOf,
  unnamedPages,
  userFacingFindings,
} from "./user-facing";

/**
 * INC-1278, DEC-459, DEC-482, DEC-493 (CF-UF-1…5) — THE USER-FACING LIST. Every control, event and
 * list row a person meets is a row of scripts/conformance/user-facing-manifest.txt; a row is
 * answered by a browser test or a component test; a row with no test, and a page route no screen
 * names, has its line in scripts/conformance/user-facing-allowlist.txt, which only shrinks. The
 * reader (user-facing.ts) reads the files and the tests' titles and never runs a test.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

function tempFile(text: string): string {
  const dir = mkdtempSync(join(tmpdir(), "user-facing-"));
  temps.push(dir);
  const path = join(dir, "allowlist.txt");
  writeFileSync(path, text);
  return path;
}

/** What the repository holds now: the list, the census bytes, the tests' titles, the page routes. */
function tree() {
  const manifestText = readFileSync(join(ROOT, MANIFEST), "utf8");
  const manifest = parseManifest(manifestText);
  const census = readFileSync(join(ROOT, CENSUS));
  const titles = testTitles(ROOT);
  const answers = answersOf(titles);
  const routes = pageRoutes(ROOT);
  const owed = owedKeys(manifest, answers, routes);
  return { manifestText, manifest, census, titles, answers, routes, owed };
}

describe("the user-facing list (CF-UF)", () => {
  it(
    "CF-UF-1 the census copy is the one the header names; every row id is unique, of its grammar and under a declared screen; every allowlist key is a row or a page",
    () => {
      const { manifest, census } = tree();
      expect(report(manifestFindings(manifest, census))).toBe("");
      expect(manifest.sha).toBe(sha256Of(census));
      expect(manifest.screens.length).toBeGreaterThan(0);
      expect(manifest.rows.length).toBeGreaterThan(0);
      expect(new Set(manifest.rows.map((row) => row.id)).size).toBe(manifest.rows.length);
      const keys = readFileSync(join(ROOT, ALLOWLIST), "utf8")
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"))
        .map((line) => (line.split("|")[0] ?? "").trim());
      const rows = new Set(manifest.rows.map((row) => row.id));
      expect(
        keys.filter((key) => !rows.has(key) && !/^page \/\S*$/.test(key)),
        "an allowlist key that is neither a row id nor `page <path>`",
      ).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-UF-2 every test id a row names is a test id the tree holds",
    () => {
      const { manifest, answers } = tree();
      expect(report(namedTestFindings(manifest, answers))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-UF-3 a row no test answers has its allowlist line; a line for an answered row is stale; permanent is for a row the census gives nothing to do, or a development page",
    () => {
      const { manifest, answers, owed } = tree();
      const { allowances, findings } = readAllowances(owed, join(ROOT, ALLOWLIST));
      expect(report(findings)).toBe("");
      expect(report(allowlistFindings(manifest, answers, allowances))).toBe("");
      // the list and the allowlist agree key for key: nothing owed lacks a line, no line owes nothing
      expect([...allowances.keys()].sort()).toEqual([...owed].sort());
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-UF-4 every page route is named by a screen line or has a `page` line; no screen names a path that is no page route",
    () => {
      const { manifest, routes, owed } = tree();
      const { allowances } = readAllowances(owed, join(ROOT, ALLOWLIST));
      expect(report(pageFindings(manifest, routes, allowances))).toBe("");
      const named = new Set(manifest.screens.flatMap((screen) => screen.pages));
      expect(
        routes.filter((route) => !named.has(route) && !allowances.has(`page ${route}`)),
      ).toEqual([]);
      expect(report(userFacingFindings(ROOT))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-UF-5 planted: a row whose only test id is removed; a uf: title that answers an allowlisted row; a new page route with no screen; a duplicate row id; a census copy one byte off; a reader that finds no test; a permanent line for a row that must do something",
    () => {
      const { manifestText, manifest, census, titles, answers, routes, owed } = tree();
      const real = join(ROOT, ALLOWLIST);
      const { allowances } = readAllowances(owed, real);

      // a row whose only test id is removed: the id is named and no test holds it, the row is owed
      const sole = manifest.rows.find(
        (row) =>
          row.tests.length === 1 &&
          row.tests.every((id) => answers.ids.has(id)) &&
          !answers.uf.has(row.id),
      );
      if (sole === undefined) throw new Error("no row names exactly one test id");
      const gone = sole.tests[0] ?? "";
      const without = titles.filter(({ title }) => testIdOf(title) !== gone);
      const removed = answersOf(without);
      expect(report(namedTestFindings(manifest, removed))).toContain(
        `row ${sole.id} names ${gone}, which no test of e2e/ or src/ carries`,
      );
      expect(owedKeys(manifest, removed, routes)).toContain(sole.id);
      expect(report(allowlistFindings(manifest, removed, allowances))).toContain(
        `row ${sole.id} has no test and no allowlist line`,
      );

      // a uf: title that answers an allowlisted row: the row is answered, its line is stale
      const listed = manifest.rows.find((row) => owed.includes(row.id) && row.tests.length === 0);
      if (listed === undefined) throw new Error("no allowlisted row without a test id");
      const answeredNow = answersOf([
        ...titles,
        { file: "e2e/planted.spec.ts", line: 1, title: `PLANTED-1 a title with uf:${listed.id}` },
      ]);
      const owedNow = owedKeys(manifest, answeredNow, routes);
      expect(owedNow).not.toContain(listed.id);
      const stale = readAllowances(owedNow, real);
      expect(report(stale.findings)).toContain("stale allowance");
      expect(report(stale.findings)).toContain(listed.id);

      // a new page route with no screen: it is named by nothing and has no line
      expect(unnamedPages(manifest, [...routes, "/planted"])).toContain("/planted");
      expect(report(pageFindings(manifest, [...routes, "/planted"], allowances))).toContain(
        "the page route /planted is named by no screen",
      );

      // a screen that names a path that is no page route
      const stray = parseManifest(
        manifestText.replace(/^(screen S2 \| )\/l\/\$slug/m, "$1/l/$slug /planted-path"),
      );
      expect(report(pageFindings(stray, routes, allowances))).toContain(
        "screen S2 names /planted-path, which is no page route",
      );

      // a duplicate row id, and a row under no screen
      const twice = parseManifest(`${manifestText}\n${manifest.rows[0]?.id ?? ""} | - | again\n`);
      expect(report(twice.findings)).toContain(`row ${manifest.rows[0]?.id} is listed twice`);
      const orphan = parseManifest(`${manifestText}\nS99.1 | - | no screen\n`);
      expect(report(orphan.findings)).toContain("row S99.1 is under no declared screen");

      // a census copy one byte off
      expect(
        report(manifestFindings(manifest, Buffer.concat([census, Buffer.from(" ")]))),
      ).toContain("is not the manifest header's");
      expect(report(manifestFindings(manifest, null))).toContain("the census copy is missing");

      // a reader that finds no test fails
      expect(report(floorFindings([], answersOf([])))).toContain("found no test title");
      expect(
        report(
          floorFindings([{ file: "e2e/x.spec.ts", line: 1, title: "no id here" }], answersOf([])),
        ),
      ).toContain("found no test id");

      // permanent: only the census's "names nothing" rows and development pages
      const pinned = tempFile(
        `${listed.id} | because I say so | permanent\npage /planted | a page | permanent\n`,
      );
      const refused = readAllowances([listed.id, "page /planted"], pinned);
      expect(refused.findings).toEqual([]);
      const judged = report(allowlistFindings(manifest, answers, refused.allowances, pinned));
      expect(judged).toContain(`${listed.id}: permanent is only for a row`);
      expect(judged).toContain("page /planted: permanent is only for a development page");
    },
    TREE_SCAN_MS,
  );

  it("CF-UF-5b the reader's own grammar: wrapped and skipped titles are tests, describe is not, an id ends at a non-word character, a uf: token is whole", () => {
    // The planted source is built, never written out, so this file holds no test call of its own
    // for the repository's test-id check (scripts/test-ids.ts) to read.
    const quote = (title: string) => JSON.stringify(title);
    const file = [
      `test(${quote("FS-14 a plain title")}, () => {});`,
      "it(",
      `  ${quote("FV-AM-1: wrapped by the formatter")},`,
      "  () => {},",
      ");",
      `test.skip(${quote("SAI-9 skipped")}, () => {});`,
      `test.fixme(${quote("PW-110a fixme")}, () => {});`,
      `test.describe(${quote("DESC-1 a group")}, () => {});`,
      `expect(/x/.test(${quote("NOTATEST-1 a regex call")})).toBe(true);`,
      `test(\`TPL-7 a template\`, () => {});`,
    ].join("\n");
    const titles = titlesIn("e2e/planted.spec.ts", file);
    expect(titles.map(({ title }) => testIdOf(title))).toEqual([
      "FS-14",
      "FV-AM-1",
      "SAI-9",
      "PW-110a",
      "TPL-7",
    ]);
    expect(titles.map(({ line }) => line)).toEqual([1, 2, 6, 7, 10]);
    expect(testIdOf("FS-14a stays one id")).toBe("FS-14a");
    expect(testIdOf("FS-14-extra is no id")).toBeNull();
    expect(testIdOf("FS-14x2 is no id")).toBeNull();
    expect(testIdOf("a title FS-14 that does not begin with its id")).toBeNull();
    expect(testIdOf("INC-1278: ends at the colon")).toBe("INC-1278");
    expect(ufRowsOf("a title uf:S1.5 and uf:A28.1, (uf:A29.2) xuf:S1.1 uf: uf:")).toEqual([
      "S1.5",
      "A28.1",
      "A29.2",
    ]);
  });
});

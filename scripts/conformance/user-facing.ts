import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

import { pageRoutes } from "./failure-crawl";
import { errorText } from "../../src/lib/error-text";
import { type Allowance, readAllowlist, walkFiles } from "./kit";

/**
 * INC-1278, DEC-459, DEC-482, DEC-493 — THE USER-FACING LIST'S READER.
 *
 * Every control, event and list row a person meets is one row of
 * `scripts/conformance/user-facing-manifest.txt`; a row is answered by a test (a browser test or a
 * component test — DEC-493), and a row with no test, or a page route no screen names, has its line
 * in `scripts/conformance/user-facing-allowlist.txt`. This file reads the two files and the tests'
 * titles; `user-facing.test.ts` judges them (CF-UF-1 to 5). It reads and never runs a test.
 *
 * The files' grammar (docs/features/user-facing-list.md):
 *   screen <id> | <page paths, space-separated, or -> | <heading>
 *   <row id> | <test ids, comma-separated, or -> | <the control or event>
 * A row id is `<screen id>.<n>`. A test answers a row when its id is in the row's second cell, or
 * when its title carries `uf:<row id>` as a whole token. A test's id is the leading token of its
 * title that matches TEST_ID, followed by a character that is neither a word character nor a
 * hyphen, or by the end of the title.
 */

export const MANIFEST = "scripts/conformance/user-facing-manifest.txt";
export const ALLOWLIST = "scripts/conformance/user-facing-allowlist.txt";
/** The census the rows come from, kept byte for byte; its sha256 is in the manifest's header. */
export const CENSUS = "docs/governance/census/user-facing-8d64790.md";

/** The one `until` word an allowance may carry that never expires. */
const PERMANENT_REASON = /^the census names nothing this row must do\b/;
/** The folders whose test files answer rows (DEC-493): browser tests and component tests. */
const TEST_ROOTS = ["e2e", "src"];
const TEST_FILE = /\.(?:spec\.ts|test\.tsx?)$/;

/** `S1`…`S14`, `S6a`…`S6e`, `S7s1`…`S7s8`, `A1`…`A29`. */
export const SCREEN_ID = /^(?:S(?:\d{1,2}[a-e]?|7s[1-8])|A\d{1,2})$/;
/** A test's id: `FS-14`, `FV-AM-1`, `SAI-9`, `PW-110a`. */
export const TEST_ID = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-[A-Z]?\d+[a-z]?/;

export type Finding = { file: string; line: number; what: string };
export type Screen = { id: string; pages: string[]; heading: string; line: number };
export type Row = { id: string; screen: string; tests: string[]; text: string; line: number };
export type Manifest = {
  /** The census sha256 the header names, or null when it names none. */
  sha: string | null;
  screens: Screen[];
  rows: Row[];
  findings: Finding[];
};

/** The manifest's text read into screens and rows; a line that fits no grammar is a finding. */
export function parseManifest(text: string, file: string = MANIFEST): Manifest {
  const manifest: Manifest = { sha: null, screens: [], rows: [], findings: [] };
  const header: string[] = [];
  const find = (line: number, what: string) => manifest.findings.push({ file, line, what });
  const seenScreens = new Set<string>();
  const seenRows = new Set<string>();
  text.split(/\r?\n/).forEach((raw, index) => {
    const line = index + 1;
    if (raw.trim() === "") return;
    if (raw.startsWith("#")) {
      header.push(raw.replace(/^#\s?/, ""));
      return;
    }
    const cells = raw.split(" | ");
    if (cells.length < 3 || cells.slice(0, 2).some((cell) => cell.trim() === "")) {
      find(line, `expected three cells (key | tests or pages | text): ${raw}`);
      return;
    }
    const [key = "", second = ""] = cells.map((cell) => cell.trim());
    const rest = cells.slice(2).join(" | ").trim();
    const screen = /^screen (\S+)$/.exec(key);
    if (screen?.[1] !== undefined) {
      const id = screen[1];
      if (!SCREEN_ID.test(id)) find(line, `screen id ${id} is not of the grammar`);
      if (seenScreens.has(id)) find(line, `screen ${id} is declared twice`);
      seenScreens.add(id);
      const pages = second === "-" ? [] : second.split(/\s+/);
      for (const page of pages)
        if (!page.startsWith("/")) find(line, `screen ${id}: ${page} is not a page path`);
      manifest.screens.push({ id, pages, heading: rest, line });
      return;
    }
    const row = /^(.+)\.(\d+)$/.exec(key);
    if (row?.[1] === undefined) {
      find(line, `${key} is neither a screen line nor a row id (<screen>.<n>)`);
      return;
    }
    if (seenRows.has(key)) find(line, `row ${key} is listed twice`);
    seenRows.add(key);
    const tests = second === "-" ? [] : second.split(",").map((id) => id.trim());
    for (const id of tests)
      if (!TEST_ID.test(id) || TEST_ID.exec(id)?.[0] !== id)
        find(line, `row ${key}: ${id} is not a test id`);
    manifest.rows.push({ id: key, screen: row[1], tests, text: rest, line });
  });
  const declared = new Set(manifest.screens.map((screen) => screen.id));
  for (const row of manifest.rows)
    if (!declared.has(row.screen)) find(row.line, `row ${row.id} is under no declared screen`);
  manifest.sha = /\bsha256\s+([0-9a-f]{64})\b/.exec(header.join(" "))?.[1] ?? null;
  return manifest;
}

export type TestTitle = { file: string; line: number; title: string };

/**
 * The first argument of every `test(` / `it(` call of one file's text, `.skip`, `.fixme`, `.fail`
 * and `.only` included (`describe` is not a test). The whole text is read at once, so a title the
 * formatter wrapped onto the line after the call is read too; the line is the call's own.
 */
const TITLE_CALL =
  /(?<![\w$.])(?:test|it)(?:\.(?:skip|fixme|fail|only))?\(\s*(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;

export function titlesIn(file: string, text: string): TestTitle[] {
  const titles: TestTitle[] = [];
  for (const match of text.matchAll(TITLE_CALL)) {
    const line = text.slice(0, match.index).split("\n").length;
    titles.push({ file, line, title: match[2] ?? "" });
  }
  return titles;
}

/** Every test title of the browser and component tests under `root`. */
export function testTitles(root: string): TestTitle[] {
  const titles: TestTitle[] = [];
  const files = walkFiles(
    TEST_ROOTS.map((base) => join(root, base)),
    { ext: ["ts", "tsx"] },
  ).filter((file) => TEST_FILE.test(file));
  for (const full of files)
    titles.push(...titlesIn(relative(root, full), readFileSync(full, "utf8")));
  return titles;
}

/** A title's id: its leading token when that is a test id and ends there. */
export function testIdOf(title: string): string | null {
  const id = TEST_ID.exec(title)?.[0];
  if (id === undefined) return null;
  const next = title.charAt(id.length);
  return next === "" || !/[\w-]/.test(next) ? id : null;
}

/** The row ids a title answers by `uf:<row id>` — each a whole token (set apart by spaces or marks). */
export function ufRowsOf(title: string): string[] {
  const rows: string[] = [];
  for (const token of title.split(/[\s,;()[\]{}"'`]+/))
    if (token.startsWith("uf:") && token.length > 3) rows.push(token.slice(3));
  return rows;
}

export type Answers = {
  /** Test id → the files that hold a test with it. */
  ids: Map<string, string[]>;
  /** Row id → the files that hold a test whose title carries `uf:<row id>`. */
  uf: Map<string, string[]>;
};

export function answersOf(titles: TestTitle[]): Answers {
  const answers: Answers = { ids: new Map(), uf: new Map() };
  const add = (map: Map<string, string[]>, key: string, file: string) =>
    map.set(key, [...(map.get(key) ?? []), file]);
  for (const { file, title } of titles) {
    const id = testIdOf(title);
    if (id !== null) add(answers.ids, id, file);
    for (const row of ufRowsOf(title)) add(answers.uf, row, file);
  }
  return answers;
}

/** True when a test answers the row: one of its ids is held, or a title carries `uf:<its id>`. */
export function answered(row: Row, answers: Answers): boolean {
  return row.tests.some((id) => answers.ids.has(id)) || answers.uf.has(row.id);
}

/**
 * A reader that finds nothing proves nothing (INC-1308): the census fails when the tree's titles
 * give no test, or titles give no test id.
 */
export function floorFindings(titles: TestTitle[], answers: Answers): Finding[] {
  if (titles.length === 0)
    return [{ file: "e2e", line: 1, what: "the reader found no test title under e2e/ or src/" }];
  if (answers.ids.size === 0)
    return [{ file: "e2e", line: 1, what: "the reader found no test id in any test title" }];
  return [];
}

/** The sha256 of a file's bytes. */
export function sha256Of(bytes: Buffer | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

/** CF-UF-1 — the census copy is the one the header names; ids, screens and grammar are sound. */
export function manifestFindings(manifest: Manifest, censusBytes: Buffer | null): Finding[] {
  const findings = [...manifest.findings];
  if (manifest.screens.length === 0 || manifest.rows.length === 0)
    findings.push({ file: MANIFEST, line: 1, what: "the manifest holds no screen or no row" });
  if (manifest.sha === null)
    findings.push({ file: MANIFEST, line: 1, what: "the header names no census sha256" });
  else if (censusBytes === null)
    findings.push({ file: CENSUS, line: 1, what: "the census copy is missing" });
  else if (sha256Of(censusBytes) !== manifest.sha)
    findings.push({
      file: CENSUS,
      line: 1,
      what: `the census copy's sha256 ${sha256Of(censusBytes)} is not the manifest header's ${manifest.sha}`,
    });
  return findings;
}

/** CF-UF-2 — every test id a row names is a test id the tree holds; a `uf:` token names a row. */
export function namedTestFindings(manifest: Manifest, answers: Answers): Finding[] {
  const findings: Finding[] = [];
  for (const row of manifest.rows)
    for (const id of row.tests)
      if (!answers.ids.has(id))
        findings.push({
          file: MANIFEST,
          line: row.line,
          what: `row ${row.id} names ${id}, which no test of e2e/ or src/ carries`,
        });
  const known = new Set(manifest.rows.map((row) => row.id));
  for (const id of answers.uf.keys())
    if (!known.has(id))
      findings.push({
        file: (answers.uf.get(id) ?? [])[0] ?? MANIFEST,
        line: 1,
        what: `a title carries uf:${id}, which is no row of the list`,
      });
  return findings;
}

/** The pages no screen names: a page route that is on no screen line. */
export function unnamedPages(manifest: Manifest, routes: string[]): string[] {
  const named = new Set(manifest.screens.flatMap((screen) => screen.pages));
  return routes.filter((route) => !named.has(route));
}

/** A path a screen names that is no page route. */
export function strayPages(manifest: Manifest, routes: string[]): Screen[] {
  const known = new Set(routes);
  return manifest.screens.filter((screen) => screen.pages.some((page) => !known.has(page)));
}

/** CF-UF-4 — every page route is named by a screen or has a `page` line; no screen names a stray. */
export function pageFindings(
  manifest: Manifest,
  routes: string[],
  allowances: Map<string, Allowance>,
): Finding[] {
  const findings: Finding[] = [];
  const known = new Set(routes);
  for (const screen of manifest.screens)
    for (const page of screen.pages)
      if (!known.has(page))
        findings.push({
          file: MANIFEST,
          line: screen.line,
          what: `screen ${screen.id} names ${page}, which is no page route of src/routeTree.gen.ts`,
        });
  for (const route of unnamedPages(manifest, routes))
    if (!allowances.has(`page ${route}`))
      findings.push({
        file: ALLOWLIST,
        line: 1,
        what: `the page route ${route} is named by no screen and has no \`page ${route}\` line`,
      });
  return findings;
}

/** The allowlist keys the tree owes: each row no test answers, each page route no screen names. */
export function owedKeys(manifest: Manifest, answers: Answers, routes: string[]): string[] {
  return [
    ...manifest.rows.filter((row) => !answered(row, answers)).map((row) => row.id),
    ...unnamedPages(manifest, routes).map((route) => `page ${route}`),
  ];
}

/** The allowlist's lines, read by the kit against the keys the tree owes; a refusal is a finding. */
export function readAllowances(
  keys: string[],
  allowlist: string = ALLOWLIST,
): { allowances: Map<string, Allowance>; findings: Finding[] } {
  try {
    return { allowances: readAllowlist(allowlist, keys, { permanent: true }), findings: [] };
  } catch (error) {
    return {
      allowances: new Map(),
      findings: [{ file: allowlist, line: 1, what: errorText(error) }],
    };
  }
}

/**
 * CF-UF-3 — a row no test answers has its allowlist line; a line for an answered row or a named
 * page is stale (the kit fails it); the kit's grammar holds; `permanent` only for a row whose
 * census cell names nothing it must do, or for a development page.
 */
export function allowlistFindings(
  manifest: Manifest,
  answers: Answers,
  allowances: Map<string, Allowance>,
  allowlist: string = ALLOWLIST,
): Finding[] {
  const findings: Finding[] = [];
  for (const row of manifest.rows)
    if (!answered(row, answers) && !allowances.has(row.id))
      findings.push({
        file: MANIFEST,
        line: row.line,
        what: `row ${row.id} has no test and no allowlist line`,
      });
  for (const { key, reason, until, line } of allowances.values()) {
    if (until !== "permanent") continue;
    const page = key.startsWith("page ");
    const permitted = page ? key.startsWith("page /dev/") : PERMANENT_REASON.test(reason);
    if (!permitted)
      findings.push({
        file: allowlist,
        line,
        what: page
          ? `${key}: permanent is only for a development page (/dev/…)`
          : `${key}: permanent is only for a row whose census cell names nothing it must do`,
      });
  }
  return findings;
}

/** Every finding of the repository at `root`, CF-UF-1 to 4 in order. */
export function userFacingFindings(root: string): Finding[] {
  const manifest = parseManifest(readFileSync(join(root, MANIFEST), "utf8"));
  const census = existsSync(join(root, CENSUS)) ? readFileSync(join(root, CENSUS)) : null;
  const titles = testTitles(root);
  const answers = answersOf(titles);
  const routes = pageRoutes(root);
  const owed = owedKeys(manifest, answers, routes);
  const { allowances, findings: unread } = readAllowances(owed, join(root, ALLOWLIST));
  return [
    ...manifestFindings(manifest, census),
    ...floorFindings(titles, answers),
    ...namedTestFindings(manifest, answers),
    ...unread,
    ...allowlistFindings(manifest, answers, allowances),
    ...pageFindings(manifest, routes, allowances),
  ];
}

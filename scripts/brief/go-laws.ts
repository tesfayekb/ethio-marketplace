/**
 * DEC-361, housekeeping turn 2 (ruling 1, D324) — THE GO LAWS: a brief's claims about the tree are
 * checked by a script, not by the supervisor's eye. One law per function; each answers findings
 * `{ law, file, line, text }` (allowlist key `<file>:<line> <text>`). Two callers, one copy of each
 * law: scripts/conformance/briefs.test.ts (the text laws on the brief in force and its rulings, and
 * every law on planted fixtures) and scripts/brief/check-go.ts (every law on one file and a named
 * tree root — the supervisor's pre-send run, and the executor's at STEP 0 on the tree as saved).
 *
 * Text laws: CF-BRIEF-1 base line, CF-BRIEF-2 stop rule, CF-BRIEF-3 scope (the law brief (12) names),
 * CF-BRIEF-11 title (a code span after "Commit", "first line:" or "commit ("), CF-BRIEF-13 allowance,
 * CF-BRIEF-15 census items, CF-BRIEF-16 a SCOPE path rule 00 forbids, CF-BRIEF-17 a ruling saved bare. Tree laws: CF-BRIEF-3's K1 clause (a "(new)" test whose name the tree
 * holds), CF-BRIEF-5 cited path, CF-BRIEF-6 cited line, CF-BRIEF-7 free id, CF-BRIEF-8 option,
 * CF-BRIEF-9 assert, CF-BRIEF-10 count. CF-BRIEF-4 and CF-BRIEF-14 are the self-tests in briefs.test.ts.
 * The window rules of CF-BRIEF-2 stand: a double-quoted (straight or curly) or code-span quotation
 * is not a claim (laws 2, 7, 10; law 11 keeps code spans, the titles' own form), and a sentence
 * with a negation word is not a claim (laws 2, 7). The laws guard carelessness, not evasion.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { walkFiles } from "../conformance/kit";
import { authored, exactWord, flaggedPattern, pattern } from "../lib/pattern";

export type Finding = { law: string; file: string; line: number; text: string };
export type Ruling = { file: string; text: string };

const PHRASE = /\b(?:any red|any growth|at or below|must be green|zero failures)\b/i;
const STOP = /\bSTOP\b/;
const NEGATION = /\b(?:never|not|no|none|forbidden|refuses)\b/i;
const QUOTED = /"[^"\n]*"|“[^”\n]*”|`[^`\n]*`/g;
const DOUBLE_QUOTED = /"[^"\n]*"|“[^”\n]*”/g;
const SENTENCE = /(?<=[.;!?])\s+/;
const FULL_SENTENCE = /(?<=[.!?])\s+/;
const CODE_FILE = /(?<![\w/.-])((?:src|e2e|scripts)\/[\w$./-]*[\w$-]\.(?:tsx?|mjs|sh))(?![\w/*])/g;
const FORBIDDEN_PATH =
  /(?<![\w/.-])(\.claude\/[\w$./*-]*|CLAUDE\.md|supabase\/migrations\/[\w$./*-]*)/g;
const FLAGS = /\bFLAGS:([^.\n]*)/;
const TREE_PREFIX = /(?:src|e2e|scripts|docs|supabase|\.github|\.cursor)\//;
const CITED_PATH = pattern`^${TREE_PREFIX}[^\\s\`]*$`;
const CITATION = flaggedPattern(
  "g",
)`(?<![\\w/.-])\`?(${TREE_PREFIX}[\\w$./*-]*[\\w$*-])\`? ?((?::\\d+)(?:\\s*(?:→|,|–)\\s*:\\d+)*)`;
const MADE_HERE = /\bnew\b|\bcreated here\b|\bbuilt as\b|\bbuilt here\b/i;
const ID_RUN = /[^\w$-]+/;
const ID_HEAD = /^[A-Z]{2,6}$/;
const ID_MIDDLE = /^[A-Z0-9]+$/;
const ID_TAIL = /^\d+$/;
const ID_WORD = /^\W*(?:new|free|gains)\W*$/i;
const COUNT_CLAUSE = /COUNT:\s*(\d+)\s*:=\s*(?:`([^`\n]+)`|([^\n;]+))/g;
const BARE_COUNT =
  /(?<![\w.:-])(\d+)\s+(files|steps|lines|modules|specs|tests|warnings|chunks|pages)\b/g;
const READ_COMMANDS = new Set([
  "rg",
  "grep",
  "find",
  "ls",
  "wc",
  "sort",
  "uniq",
  "cut",
  "head",
  "tail",
]);
const GIT_READS = new Set(["show", "log", "diff", "ls-files"]);
const CODE_WRITES =
  /\b(?:open|write\w*|unlink\w*|remove|rm\w*|rename\w*|mkdir\w*|spawn\w*|exec\w*|system|subprocess|Bun\.write)\b/;
const TITLE = /(?<!`)\b(?:Commit|first line):?\s*\(?`([^`\n]+)`/gi;
const NEW_TEST = /([\w$./-]*[\w$-]\.(?:test\.tsx?|selftest\.sh|spec\.ts))`?\s*\(new\)/g;
const TITLE_MAX = 72;
const SEARCHED = ["src", "e2e", "scripts"];
const TEXT_EXT = ["ts", "tsx", "mjs", "js", "cjs", "sh", "sql", "txt", "json", "md", "yml", "yaml"];
export const COUNT_DEADLINE_MS = 20_000;
export const CENSUS_MARKER = /<!--\s*CENSUS-ITEM:\s*([\w-]+)\s*-->/g;
const EXEMPT_TITLE = /\b(?:RECORDS|RULES) TURN\b/i;

function linesOf(text: string): string[] {
  return text.split("\n");
}

/** CF-BRIEF-1 — the brief's own base line. */
export function baseFindings(text: string, file: string): Finding[] {
  return /Base: dev [0-9a-f]{7,40}\b/.test(text)
    ? []
    : [{ law: "CF-BRIEF-1", file, line: 1, text: "carries no `Base: dev <sha>` line" }];
}

/** CF-BRIEF-2 — a sentence that makes a phrase an absolute STOP. */
export function stopRuleFindings(text: string, file: string): Finding[] {
  const findings: Finding[] = [];
  linesOf(text).forEach((content, index) => {
    for (const sentence of content.split(SENTENCE)) {
      const phrase = PHRASE.exec(sentence.replace(QUOTED, ""))?.[0];
      if (phrase === undefined || !STOP.test(sentence) || NEGATION.test(sentence)) continue;
      findings.push({ law: "CF-BRIEF-2", file, line: index + 1, text: phrase.toLowerCase() });
    }
  });
  return findings;
}

/** The SCOPE paragraph: its first line's index and its text, or null. */
function scopeOf(text: string): { start: number; scope: string } | null {
  const lines = linesOf(text);
  const start = lines.findIndex((l) => /^SCOPE\b/.test(l));
  if (start < 0) return null;
  const end = lines.findIndex((l, i) => i > start && l.trim() === "");
  return { start, scope: lines.slice(start, end < 0 ? lines.length : end).join("\n") };
}

/** CF-BRIEF-3 — each single code file the SCOPE paragraph names comes with its test. */
export function scopeFindings(text: string, file: string): Finding[] {
  const paragraph = scopeOf(text);
  if (paragraph === null) return [];
  const { start, scope } = paragraph;
  const named = [...scope.matchAll(CODE_FILE)].map((m) => m[1]);
  const findings: Finding[] = [];
  for (const path of new Set(named)) {
    if (/\.(?:test|spec)\.tsx?$/.test(path)) continue;
    const stem = path.replace(/\.(?:tsx?|mjs|sh)$/, "");
    const ownTest = named.some((g) => g === `${stem}.test.ts` || g === `${stem}.test.tsx`);
    const spec = path.startsWith("e2e/") && named.some((g) => g.endsWith(".spec.ts"));
    if (!ownTest && !spec)
      findings.push({
        law: "CF-BRIEF-3",
        file,
        line: start + 1,
        text: `SCOPE names ${path} without its test`,
      });
  }
  return findings;
}

/**
 * CF-BRIEF-16 (housekeeping turn 3c, S588) — the SCOPE paragraph names no path rule 00 forbids the
 * executor: nothing under `.claude/`, no `CLAUDE.md`, and nothing under `supabase/migrations/` while
 * the brief's FLAGS carry `no-migration`. A sentence with a negation word, "nothing" or a condition
 * ("only with", the GO template's own SCOPE sentence) is not a claim.
 */
export function forbiddenScopeFindings(text: string, file: string): Finding[] {
  const paragraph = scopeOf(text);
  if (paragraph === null) return [];
  const noMigration = /\bno-migration\b/.test(FLAGS.exec(text)?.[1] ?? "");
  const findings: Finding[] = [];
  linesOf(paragraph.scope).forEach((content, offset) => {
    for (const sentence of content.split(SENTENCE)) {
      if (NEGATION.test(sentence) || /\b(?:nothing|only with)\b/i.test(sentence)) continue;
      for (const match of sentence.matchAll(FORBIDDEN_PATH)) {
        const path = match[1];
        if (path.startsWith("supabase/") && !noMigration) continue;
        findings.push({
          law: "CF-BRIEF-16",
          file,
          line: paragraph.start + offset + 1,
          text: `SCOPE names ${path}, which rule 00 forbids the executor`,
        });
      }
    }
  });
  return findings;
}

/**
 * CF-BRIEF-17 (the pictures turn, ruling 2) — a ruling is saved bare: its file begins with the
 * ruling's own first line, `RULING — …`, never a heading or a fence of the saver's (its sha256 is then
 * the file's). Judged on the rulings of the brief in force, as the other text laws are.
 */
export function rulingFormFindings(text: string, file: string): Finding[] {
  const first = linesOf(text)[0] ?? "";
  return first.startsWith("RULING — ")
    ? []
    : [
        {
          law: "CF-BRIEF-17",
          file,
          line: 1,
          text: `a ruling saved with a wrapper: its first line is \`${first.slice(0, 40)}\`, not "RULING — "`,
        },
      ];
}

/**
 * CF-BRIEF-3, the K1 clause (S581) — SCOPE names a test, self-test or spec "(new)" whose file name
 * the tree already holds under src/, e2e/ or scripts/: the stem has its test, which the turn extends.
 */
export function newTestFindings(text: string, file: string, root: string): Finding[] {
  const paragraph = scopeOf(text);
  if (paragraph === null) return [];
  const names = new Set(
    [...paragraph.scope.matchAll(NEW_TEST)].map((m) => basename(m[1] ?? "")).filter(Boolean),
  );
  if (names.size === 0) return [];
  const files = SEARCHED.flatMap((dir) => filesUnder(root, dir));
  return [...names].flatMap((name) =>
    files
      .filter((path) => basename(path) === name)
      .map((path) => ({
        law: "CF-BRIEF-3",
        file,
        line: paragraph.start + 1,
        text: `SCOPE names ${name} (new); the tree holds ${path}`,
      })),
  );
}

/** The brief's title: its first line of text (a saved brief's heading and fence skipped). */
export function titleOf(text: string): string {
  return linesOf(text).find((l) => l.trim() !== "" && !/^(?:#|`{3,})/.test(l.trim())) ?? "";
}

/** CF-BRIEF-11 — every commit title the brief dictates fits the executor's 72 characters. */
export function titleFindings(text: string, file: string): Finding[] {
  const findings: Finding[] = [];
  linesOf(text).forEach((content, index) => {
    for (const match of content.replace(DOUBLE_QUOTED, "").matchAll(TITLE)) {
      const title = match[1];
      if (title.length > TITLE_MAX)
        findings.push({
          law: "CF-BRIEF-11",
          file,
          line: index + 1,
          text: `dictates a commit title of ${title.length} characters: ${title}`,
        });
    }
  });
  return findings;
}

/** CF-BRIEF-13 — the brief allowlist holds lines keyed only to the given brief files. */
export function allowanceFindings(
  allowlist: string,
  allowlistFile: string,
  briefFiles: string[],
): Finding[] {
  const findings: Finding[] = [];
  linesOf(allowlist).forEach((content, index) => {
    const trimmed = content.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const key = trimmed.split("|")[0].trim();
    const keyed = /^(.+?):\d+ /.exec(key)?.[1] ?? key;
    if (!briefFiles.includes(keyed))
      findings.push({
        law: "CF-BRIEF-13",
        file: allowlistFile,
        line: index + 1,
        text: `keyed to ${keyed}, not the brief in force or its rulings`,
      });
  });
  return findings;
}

/** The census items the GO template marks (`<!-- CENSUS-ITEM: <key> -->`). */
export function templateKeys(template: string): string[] {
  return [...template.matchAll(CENSUS_MARKER)].map((m) => m[1]);
}

function stepOneOf(text: string): { line: number; text: string } | null {
  const lines = linesOf(text);
  const start = lines.findIndex((l) => /^STEP 1\b/.test(l));
  if (start < 0) return null;
  const end = lines.findIndex((l, i) => i > start && (l.trim() === "" || /^STEP \d/.test(l)));
  return { line: start + 1, text: lines.slice(start, end < 0 ? lines.length : end).join("\n") };
}

/**
 * CF-BRIEF-15 — the brief's STEP 1 names every census item of the template by its key word
 * (case-insensitive; a hyphen may be a space), or the STEP 1 or a ruling answers it on a line
 * `CENSUS-ITEM <key>: …` ("not applicable — <why>", "covered — …", "named …"). The one exception:
 * a brief whose title says RECORDS TURN or RULES TURN (records-only or exact-copy-only).
 */
export function censusFindings(
  text: string,
  file: string,
  rulings: Ruling[],
  keys: string[],
): Finding[] {
  if (keys.length === 0)
    return [{ law: "CF-BRIEF-15", file, line: 1, text: "the GO template marks no census item" }];
  if (EXEMPT_TITLE.test(titleOf(text))) return [];
  const step = stepOneOf(text);
  if (step === null) return [{ law: "CF-BRIEF-15", file, line: 1, text: "carries no STEP 1" }];
  const answers = [step.text, ...rulings.map((r) => r.text)].join("\n");
  return keys
    .filter((key) => {
      const pieces = key.split("-");
      const spaced = (before: string, after: string): RegExp =>
        flaggedPattern("i")([before, ...pieces.slice(1).map(() => "[- ]"), after], ...pieces);
      return (
        !spaced("(?<![\\w-])", "(?![\\w-])").test(step.text) &&
        !spaced("CENSUS-ITEM ", ":").test(answers)
      );
    })
    .map((key) => ({
      law: "CF-BRIEF-15",
      file,
      line: step.line,
      text: `STEP 1 does not name the census item ${key}`,
    }));
}

/** A root the tree laws can read: a git tree, or a `git show` snapshot with the repository's markers. */
export function treeRootProblem(root: string): string | null {
  if (!existsSync(root) || !statSync(root).isDirectory())
    return `the root ${root} is not a directory`;
  if (existsSync(join(root, ".git"))) return null;
  if (existsSync(join(root, "AGENTS.md")) && existsSync(join(root, "roadmap.md"))) return null;
  return `the root ${root} is not a git tree`;
}

function globRegex(glob: string): RegExp {
  const tokens = glob.split(/(\*\*|\*)/);
  const pieces = tokens.filter((_, i) => i % 2 === 0);
  const stars = tokens.filter((_, i) => i % 2 === 1).map((t) => (t === "**" ? ".*" : "[^/]*"));
  return pattern(["^", ...stars, "$"], ...pieces);
}

/** The text files under one folder of the tree, root-relative (the kit's walker). */
function filesUnder(root: string, dir: string): string[] {
  const full = join(root, dir);
  if (!existsSync(full) || !statSync(full).isDirectory()) return [];
  return walkFiles([full], { ext: TEXT_EXT }).map((f) => relative(root, f).split("\\").join("/"));
}

/** The tree's files a path or glob names (a directory: every text file under it). */
function filesAt(root: string, path: string): string[] {
  const clean = path.replace(/\/$/, "");
  if (!clean.includes("*")) {
    const full = join(root, clean);
    if (!existsSync(full)) return [];
    return statSync(full).isDirectory() ? filesUnder(root, clean) : [clean];
  }
  const fixed = clean.slice(0, clean.indexOf("*")).replace(/\/[^/]*$/, "");
  const rx = globRegex(clean);
  return filesUnder(root, fixed).filter((f) => rx.test(f));
}

function pathPresent(root: string, path: string): boolean {
  if (!path.includes("*")) return existsSync(join(root, path.replace(/\/$/, "")));
  return filesAt(root, path).length > 0;
}

/**
 * CF-BRIEF-5 — every backticked tree path exists, unless the brief says it makes it. The brief's own
 * path is not judged: STEP 0 saves it, so the commit STEP 0 began from (check-go's `--at`) lacks it.
 */
export function citedPathFindings(text: string, file: string, root: string): Finding[] {
  const own = file.split("\\").join("/");
  const lines = linesOf(text);
  const scopeStart = lines.findIndex((l) => /^SCOPE\b/.test(l));
  const scopeEnd = lines.findIndex((l, i) => i > scopeStart && l.trim() === "");
  const scope =
    scopeStart < 0
      ? ""
      : lines.slice(scopeStart, scopeEnd < 0 ? lines.length : scopeEnd).join("\n");
  const markedNew = (path: string) => pattern`${path}\`?\\s*\\(new\\)`.test(scope);
  const findings: Finding[] = [];
  lines.forEach((content, index) => {
    for (const sentence of content.split(FULL_SENTENCE)) {
      for (const span of sentence.matchAll(/`([^`\n]+)`/g)) {
        const path = span[1].trim().replace(/:\d+$/, "");
        if (!CITED_PATH.test(path) || /[<>{}]/.test(path) || pathPresent(root, path)) continue;
        if (own === path || own.endsWith(`/${path}`)) continue;
        if (MADE_HERE.test(sentence) || sentence.includes("(new)") || markedNew(path)) continue;
        findings.push({
          law: "CF-BRIEF-5",
          file,
          line: index + 1,
          text: `cites ${path}, not in the tree`,
        });
      }
    }
  });
  return findings;
}

function nameOf(span: string): string | null {
  return /[A-Za-z_$][\w$-]*/.exec(span)?.[0] ?? null;
}

/** The names a citation at `at` (its match start) in `sentence` is about. */
function citedNames(sentence: string, at: number, after: number): string[] {
  const names: string[] = [];
  const before = sentence.slice(0, at);
  const lead = /(?:\(\s*|\s+at\s+)$/.exec(before);
  if (lead !== null) {
    const head = before.slice(0, lead.index).trimEnd();
    const run = /((?:`[^`\n]+`(?:\s*(?:\/|,|and)\s*)?)+)$/.exec(head);
    if (run !== null) {
      for (const m of run[1].matchAll(/`([^`\n]+)`/g)) {
        const name = nameOf(m[1]);
        if (name !== null) names.push(name);
      }
    } else {
      const bare = /([A-Za-z][\w-]*)$/.exec(head);
      if (bare !== null) names.push(bare[1]);
    }
  }
  const next = /`([^`\n]+)`/.exec(sentence.slice(after));
  if (next !== null) {
    const name = nameOf(next[1]);
    if (name !== null) names.push(name);
  }
  return names;
}

/** CF-BRIEF-6 — a cited `path :N` holds the cited name on line N, or two lines either side. */
export function citedLineFindings(text: string, file: string, root: string): Finding[] {
  const findings: Finding[] = [];
  linesOf(text).forEach((content, index) => {
    for (const sentence of content.split(SENTENCE)) {
      for (const citation of sentence.matchAll(CITATION)) {
        const path = citation[1];
        const at = citation.index ?? 0;
        const names = citedNames(sentence, at, at + citation[0].length);
        if (names.length === 0) continue;
        const numbers = [...citation[2].matchAll(/:(\d+)/g)].map((m) => Number(m[1]));
        const full = join(root, path);
        if (!existsSync(full) || statSync(full).isDirectory()) {
          findings.push({
            law: "CF-BRIEF-6",
            file,
            line: index + 1,
            text: `cites ${path}, a file the tree cannot read`,
          });
          continue;
        }
        const cited = linesOf(readFileSync(full, "utf8"));
        for (const n of numbers) {
          const window = cited.slice(Math.max(0, n - 3), n + 2).join("\n");
          if (names.some((name) => window.includes(name))) continue;
          findings.push({
            law: "CF-BRIEF-6",
            file,
            line: index + 1,
            text: `${path} :${n} holds "${(cited[n - 1] ?? "").trim()}", not ${names.join(" / ")}`,
          });
        }
      }
    }
  });
  return findings;
}

/**
 * A test id: a run of word characters, `$` and `-` whose `-`-separated tokens are `[A-Z]{2,6}`, zero or
 * more `[A-Z0-9]+`, then `\d+` — each token judged by a flat anchored class (linear; alert #453).
 */
export function isTestId(run: string): boolean {
  const tokens = run.split("-");
  const head = tokens.shift();
  const tail = tokens.pop();
  if (head === undefined || tail === undefined) return false;
  return ID_HEAD.test(head) && ID_TAIL.test(tail) && tokens.every((token) => ID_MIDDLE.test(token));
}

/** CF-BRIEF-7 — every test id the brief calls new, free or gained appears nowhere under src/, e2e/, scripts/. */
export function freeIdFindings(text: string, file: string, root: string): Finding[] {
  const claimed: Array<{ id: string; line: number }> = [];
  linesOf(text).forEach((content, index) => {
    // The window counts words across a `;` (`(new; CF-X-1 …`); a negation exempts its own sentence.
    const words = content
      .replace(QUOTED, "")
      .split(SENTENCE)
      .flatMap((sentence) => {
        const negated = NEGATION.test(sentence);
        return sentence
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => ({ word, negated }));
      });
    words.forEach(({ word, negated }, i) => {
      if (negated) return;
      const near = words.some((w, j) => j !== i && Math.abs(j - i) <= 3 && ID_WORD.test(w.word));
      if (!near) return;
      for (const id of word.split(ID_RUN).filter(isTestId)) claimed.push({ id, line: index + 1 });
    });
  });
  if (claimed.length === 0) return [];
  const used = new Set<string>();
  const files = SEARCHED.flatMap((dir) => filesUnder(root, dir));
  const ids = [...new Set(claimed.map((c) => c.id))];
  const patterns = ids.map((id) => ({ id, rx: exactWord(id) }));
  for (const rel of files) {
    const body = readFileSync(join(root, rel), "utf8");
    for (const { id, rx } of patterns) if (!used.has(id) && rx.test(body)) used.add(id);
  }
  return claimed
    .filter((c) => used.has(c.id))
    .map((c) => ({
      law: "CF-BRIEF-7",
      file,
      line: c.line,
      text: `calls ${c.id} new or free; the tree already uses it`,
    }));
}

/** CF-BRIEF-8 — `OPTION: <name> in <d.ts path>` names an option there with no `@deprecated` above it. */
export function optionFindings(text: string, file: string, root: string): Finding[] {
  const findings: Finding[] = [];
  linesOf(text).forEach((content, index) => {
    const m = /^OPTION:\s*`?([\w$]+)`?\s+in\s+`?([^`\s]+)`?/.exec(content.trim());
    if (m === null) return;
    const [, name, path] = m;
    const push = (what: string) =>
      findings.push({ law: "CF-BRIEF-8", file, line: index + 1, text: what });
    const full = join(root, path);
    if (!existsSync(full) || statSync(full).isDirectory()) {
      push(`names ${path}, a file the tree cannot read`);
      return;
    }
    const lines = linesOf(readFileSync(full, "utf8"));
    const declared = pattern`(?<![\\w$.])${name}\\??\\s*:`;
    const sites = lines.flatMap((l, i) => (declared.test(l) ? [i] : []));
    if (sites.length === 0) {
      push(`names the option ${name}, which ${path} does not declare`);
      return;
    }
    const deprecated = (i: number): boolean => {
      let j = i - 1;
      while (j >= 0 && lines[j].trim() === "") j--;
      if (j < 0 || !lines[j].trim().endsWith("*/")) return false;
      const end = j;
      while (j >= 0 && !lines[j].includes("/*")) j--;
      return lines.slice(Math.max(0, j), end + 1).some((l) => l.includes("@deprecated"));
    };
    if (sites.every(deprecated)) push(`names the option ${name}, @deprecated in ${path}`);
  });
  return findings;
}

/** CF-BRIEF-9 — `ASSERT-PRESENT: <regex> in <path>` / `ASSERT-ABSENT: …` hold on the tree. */
export function assertFindings(text: string, file: string, root: string): Finding[] {
  const findings: Finding[] = [];
  linesOf(text).forEach((content, index) => {
    const m = /^ASSERT-(PRESENT|ABSENT):\s*(.+?)\s+in\s+(\S+)\s*$/.exec(content.trim());
    if (m === null) return;
    const [, kind, rawPattern, rawPath] = m;
    const pattern = rawPattern.replace(/^`(.*)`$/, "$1");
    const path = rawPath.replace(/^`(.*)`$/, "$1");
    const push = (what: string) =>
      findings.push({ law: "CF-BRIEF-9", file, line: index + 1, text: what });
    let rx: RegExp;
    try {
      rx = authored(pattern, "m");
    } catch {
      push(`ASSERT-${kind} carries a pattern that does not compile: ${pattern}`);
      return;
    }
    const files = filesAt(root, path);
    if (files.length === 0) {
      push(`ASSERT-${kind} names ${path}, which the tree does not hold`);
      return;
    }
    const hits = files.filter((f) => rx.test(readFileSync(join(root, f), "utf8")));
    if (kind === "PRESENT" && hits.length === 0)
      push(`ASSERT-PRESENT ${pattern} is absent from ${path}`);
    if (kind === "ABSENT" && hits.length > 0)
      push(`ASSERT-ABSENT ${pattern} is present in ${hits.slice(0, 3).join(", ")}`);
  });
  return findings;
}

/** Why a COUNT command is not a read-only shell line, or null when it is. */
export function countCommandRefusal(command: string): string | null {
  if (/[>;&`\n]|\$\(/.test(command)) return "carries a redirect, a chain or a substitution";
  const unquoted = command.replace(/"(?:[^"\\]|\\.)*"|'[^']*'/g, '""');
  if (/\b(?:rm|mv|cp|curl)\b|\bsed\s+-i\b/.test(unquoted)) return "carries a write";
  for (const segment of command.split("|")) {
    const words = segment.trim().split(/\s+/);
    const [head, verb] = words;
    if (READ_COMMANDS.has(head)) {
      if (head === "find" && /\s-(?:delete|exec|execdir|ok|fprint\w*)\b/.test(segment))
        return "carries a write";
      continue;
    }
    if (head === "git" && GIT_READS.has(verb)) continue;
    if ((head === "python3" && verb === "-c") || (head === "bun" && verb === "-e")) {
      if (CODE_WRITES.test(segment)) return "carries a write";
      continue;
    }
    return `runs ${head}, not a read-only command`;
  }
  return null;
}

/** A COUNT command whose first segment is a git read: it reads history, which a snapshot lacks. */
export function isGitRead(command: string): boolean {
  const [head, verb] = (command.split("|")[0] ?? "").trim().split(/\s+/);
  return head === "git" && GIT_READS.has(verb);
}

/**
 * CF-BRIEF-10 — a count is a `COUNT: N := COMMAND` whose COMMAND prints N; a bare count is refused.
 * A git read runs in `repository` (check-go's `--at`: the repository, not its snapshot).
 */
export function countFindings(
  text: string,
  file: string,
  root: string,
  repository: string = root,
): Finding[] {
  const findings: Finding[] = [];
  linesOf(text).forEach((content, index) => {
    const push = (what: string) =>
      findings.push({ law: "CF-BRIEF-10", file, line: index + 1, text: what });
    for (const bare of content.replace(COUNT_CLAUSE, "").replace(QUOTED, "").matchAll(BARE_COUNT))
      push(`a bare count "${bare[1]} ${bare[2]}" — write COUNT: N := COMMAND`);
    for (const clause of content.matchAll(COUNT_CLAUSE)) {
      const expected = Number(clause[1]);
      const command = (clause[2] ?? clause[3]).trim();
      const refusal = countCommandRefusal(command);
      if (refusal !== null) {
        push(`COUNT ${expected} := ${command} — refused: ${refusal}`);
        continue;
      }
      const run = spawnSync("/bin/sh", ["-c", command], {
        cwd: isGitRead(command) ? repository : root,
        encoding: "utf8",
        timeout: COUNT_DEADLINE_MS,
      });
      if (run.error !== undefined || run.signal !== null) {
        push(
          `COUNT ${expected} := ${command} — did not finish: ${run.error?.message ?? run.signal}`,
        );
        continue;
      }
      const last = run.stdout.trimEnd().split("\n").pop() ?? "";
      const printed = /\d+/.exec(last)?.[0];
      if (printed === undefined || Number(printed) !== expected)
        push(`COUNT ${expected} := ${command} — prints ${printed ?? `no number ("${last}")`}`);
    }
  });
  return findings;
}

/** Every text law over one brief or ruling (laws 1, 2, 3, 11, 16). */
export function textFindings(text: string, file: string): Finding[] {
  return [
    ...baseFindings(text, file),
    ...stopRuleFindings(text, file),
    ...scopeFindings(text, file),
    ...titleFindings(text, file),
    ...forbiddenScopeFindings(text, file),
  ];
}

/**
 * Every tree law over one brief or ruling (law 3's K1 clause, laws 5 → 10); a root the laws cannot
 * read fails each. `repository` (check-go's `--at`): where a COUNT that is a git read runs.
 */
export function treeFindings(
  text: string,
  file: string,
  root: string,
  repository: string = root,
): Finding[] {
  const problem = treeRootProblem(root);
  if (problem !== null)
    return [
      "CF-BRIEF-3",
      "CF-BRIEF-5",
      "CF-BRIEF-6",
      "CF-BRIEF-7",
      "CF-BRIEF-8",
      "CF-BRIEF-9",
      "CF-BRIEF-10",
    ].map((law) => ({ law, file, line: 1, text: problem }));
  return [
    ...newTestFindings(text, file, root),
    ...citedPathFindings(text, file, root),
    ...citedLineFindings(text, file, root),
    ...freeIdFindings(text, file, root),
    ...optionFindings(text, file, root),
    ...assertFindings(text, file, root),
    ...countFindings(text, file, root, repository),
  ];
}

export function keyOf(f: Finding): string {
  return `${f.file}:${f.line} ${f.text}`;
}

/** Findings in the conformance kit's `report` shape. */
export function asReported(
  findings: Finding[],
): Array<{ file: string; line: number; what: string }> {
  return findings.map((f) => ({ file: f.file, line: f.line, what: `${f.law} ${f.text}` }));
}

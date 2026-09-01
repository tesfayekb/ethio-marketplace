#!/usr/bin/env bun
/**
 * U1e PART 1 — E2E FAILURE REPORTER.
 *
 * CI red on E2E used to mean a courier trip: download the Playwright artifact,
 * unzip it, read the HTML report. This script turns the machine-readable JSON
 * reporter output into ONE committed markdown file the supervisor reads by
 * clone: docs/tracking/e2e-last-failure.md.
 *
 * U2a / INC-083 rule 2 — EVIDENCE COMES FROM error-context.md, NOT FROM STEPS.
 * Playwright's JSON reporter emits NO `steps` array (verified against a real
 * captured run: scripts/fixtures/e2e-results-sample.json, `steps: 0` on every
 * result), so the old failed-step walker and the "last steps before timeout"
 * block could never fire. Both are REMOVED. What Playwright does write for a
 * failure is test-results/<slug>/error-context.md — the page snapshot at the
 * moment of death — and CI now uploads those; the reporter quotes each
 * failure's last 20 lines.
 *
 * Laws it honours:
 *  - F1/F4: nothing secret is ever written. Anything shaped like an auth-token
 *    storage key or a JWT is redacted before it reaches the file.
 *  - Guard self-test (docs/features/ci-guards.md): SELF_TEST=1 renders REAL
 *    captured fixtures and asserts both failures, the quoted context and the
 *    missing-context branch are present — a reporter that only ever prints "no
 *    failures" proves nothing. CLASS RULE: reporter fixtures are captured from
 *    real output, never authored from assumption.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";

/**
 * INC-108 — THE OUTPUT PATH AND THE SOURCE LABEL ARE INPUTS, NOT CONSTANTS.
 * The nightly runs the same reporter over its own artifacts and commits the
 * evidence next to its heartbeat, so the destination file (E2E_OUT_PATH) and
 * the single-source label (E2E_SOURCE_LABEL, e.g. `nightly`) are read from the
 * environment. Defaults are the per-push contract, unchanged.
 */
const OUT = process.env["E2E_OUT_PATH"] ?? "docs/tracking/e2e-last-failure.md";
const SINGLE_SOURCE_LABEL = process.env["E2E_SOURCE_LABEL"] ?? "all";
const FIXTURE = "scripts/fixtures/e2e-results-sample.json";
const CONTEXT_FIXTURE = "scripts/fixtures/e2e-context-sample";
/** INC-084g — the describe-nested shape, captured from a real Playwright run. */
const DESCRIBE_FIXTURE = "scripts/fixtures/e2e-context-sample-describe";

const LAYOUT_FIXTURES = "scripts/fixtures";
const MALFORMED_FIXTURE = "scripts/fixtures/e2e-results-malformed.json";
/**
 * INC-086 — a REAL zero-test results.json, captured by running Playwright with
 * an impossible `--grep` (`"suites": []`, every stat 0). Same shape a job
 * leaves behind when its webServer or global setup dies before any test runs.
 */
const EMPTY_FIXTURE = "scripts/fixtures/e2e-results-empty.json";

type PwResult = { status?: string; error?: { message?: string } };
type PwTest = { projectName?: string; status?: string; results?: PwResult[] };
type PwSpec = { title?: string; ok?: boolean; file?: string; tests?: PwTest[] };
type PwSuite = { title?: string; file?: string; specs?: PwSpec[]; suites?: PwSuite[] };
type PwJson = { suites?: PwSuite[]; stats?: { expected?: number; skipped?: number } };

// eslint-disable-next-line no-control-regex -- stripping real ANSI colour codes is the point
const ANSI = /\u001b\[[0-9;]*m/g;
const JWT = /\beyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\b/g;
const STORAGE_KEY = /sb-[A-Za-z0-9-]+-auth-token/g;

export function redact(input: string): string {
  return input.replace(ANSI, "").replace(JWT, "[redacted-jwt]").replace(STORAGE_KEY, "[redacted]");
}

/* -------------------------------------------------------------------------- */
/* error-context.md location                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Playwright's own output-directory sanitiser: every character outside
 * [A-Za-z0-9_-] collapses to a single dash, and leading/trailing dashes are
 * trimmed. (Observed verbatim on the captured run: "CAP-1 a missing testid
 * fails with a locator error" -> "CAP-1-a-missing-testid-fails-with-a-locator-error".)
 */
export function sanitizeSlug(input: string): string {
  return input
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** `e2e/admin-roles.spec.ts` -> `admin-roles` (Playwright drops the extensions). */
function specBase(file: string): string {
  const base = file.split("/").pop() ?? file;
  return base.replace(/\.(spec|test)\.[tj]sx?$/, "").replace(/\.[tj]sx?$/, "");
}

/**
 * THE MATCHING RULE (stated, because it is the whole mechanism).
 *
 * INC-084g — the slug carries the WHOLE titlePath, not just the test title.
 * Playwright names a failure's output directory
 *   `<spec-base>-<describe…>-<test-title>-<project>`
 * sanitised as above, and — when that exceeds its length budget — TRUNCATES
 * the middle, splicing in a five-hex-digit hash. Both shapes are real captures:
 *   `tmp-capture-CAP-1-a-missin-57ad1--fails-with-a-locator-error-desktop-1280`
 *   `tmp-capture-describe-panel-d893b-d-failure-records-its-chain-desktop-1280`
 * The second one's head (`tmp-capture-describe-panel`) only matches once the
 * describe title ("panel-scoped chrome") is part of the core — building the
 * core from the bare test title, as the first live read did, misses every
 * describe-nested failure, which is nearly all of them.
 *
 * So a candidate directory matches a failure when
 *   1. it ends with `-<sanitised project name>`, and
 *   2. the remainder either equals the sanitised
 *      `<spec-base>-<titlePath joined>` core, or splits at some `-<5 hex>-`
 *      marker into a prefix and a suffix of it.
 * Anything else is not this failure's directory, and the reporter says so
 * rather than quoting a neighbour's snapshot.
 */
type ContextSpec = { file: string; titlePath: string[]; project: string };

function contextCore(spec: ContextSpec): string {
  return sanitizeSlug([specBase(spec.file), ...spec.titlePath].join("-"));
}

export function matchContextDir(candidates: string[], spec: ContextSpec): string | null {
  const core = contextCore(spec);
  const projectSlug = sanitizeSlug(spec.project);
  const suffix = `-${projectSlug}`;

  for (const candidate of candidates) {
    if (!candidate.endsWith(suffix)) continue;
    const body = candidate.slice(0, candidate.length - suffix.length);
    if (body === core) return candidate;

    const marker = /-[0-9a-f]{5}-/g;
    let hit: RegExpExecArray | null;
    while ((hit = marker.exec(body)) !== null) {
      const head = body.slice(0, hit.index);
      const tail = body.slice(hit.index + hit[0].length);
      if (core.startsWith(head) && core.endsWith(tail)) return candidate;
    }
  }

  // DEC-018 FALLBACK — CONTAINMENT, not equality. Playwright's truncation does
  // not always leave a clean `-<5 hex>-` seam (an apostrophe collapses to a
  // dash, and the hash can absorb a neighbouring dash), so the prefix/suffix
  // splice above misses shapes like the switcher slug. Last resort: strip the
  // hash tokens from the candidate and accept it when what remains is a
  // SUBSEQUENCE of the expected slug's tokens — order-preserving, so it can
  // still never match a different test's directory.
  for (const candidate of candidates) {
    if (!candidate.endsWith(suffix)) continue;
    const body = candidate.slice(0, candidate.length - suffix.length);
    if (isTokenSubsequence(body, core)) return candidate;
  }
  return null;
}

/** `a-b-c` tokens minus 5-hex hash tokens, in order, contained in the core. */
export function isTokenSubsequence(body: string, core: string): boolean {
  const tokens = body.split("-").filter((t) => t.length > 0 && !/^[0-9a-f]{5}$/.test(t));
  const coreTokens = core.split("-").filter((t) => t.length > 0);
  if (tokens.length === 0) return false;
  let i = 0;
  for (const token of coreTokens) {
    if (token === tokens[i]) i += 1;
    if (i === tokens.length) return true;
  }
  return false;
}

/** The human-readable slug a failure WOULD have; printed when nothing matches. */
export function contextSlug(spec: ContextSpec): string {
  return `${contextCore(spec)}-${sanitizeSlug(spec.project)}`;
}

/**
 * Walks a downloaded artifact root and indexes every error-context.md by the
 * name of the directory that holds it (the Playwright slug).
 */
export function collectContextFiles(root: string): Map<string, string> {
  const found = new Map<string, string>();
  const walk = (dir: string, depth: number) => {
    if (depth > 8) return;
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return; // an absent or unreadable root is simply "no context uploaded"
    }
    for (const entry of entries) {
      const path = `${dir}/${entry}`;
      let isDir = false;
      try {
        isDir = statSync(path).isDirectory();
      } catch {
        continue;
      }
      if (isDir) {
        walk(path, depth + 1);
      } else if (entry === "error-context.md") {
        const slug = dir.split("/").pop() ?? dir;
        if (!found.has(slug)) found.set(slug, path);
      }
    }
  };
  walk(root, 0);
  return found;
}

/**
 * INC-084f — WHEN ZERO CONTEXT FILES ARE FOUND, THE SEARCH NAMES ITSELF.
 * The layout fixtures were absent in CI (excluded by an unanchored
 * `test-results/` ignore) and the only signal was "found 0". A zero result now
 * prints the glob it looked for and every path it actually walked, so the next
 * environment gap is diagnosable from the log alone.
 */
export function describeSearch(root: string): string[] {
  const seen: string[] = [];
  const walk = (dir: string, depth: number) => {
    if (depth > 8) return;
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      seen.push(`${dir} (unreadable or absent)`);
      return;
    }
    if (entries.length === 0) seen.push(`${dir} (empty)`);
    for (const entry of entries) {
      const path = `${dir}/${entry}`;
      let isDir = false;
      try {
        isDir = statSync(path).isDirectory();
      } catch {
        seen.push(`${path} (unstatable)`);
        continue;
      }
      if (isDir) walk(path, depth + 1);
      else seen.push(path);
    }
  };
  walk(root, 0);
  return seen;
}

/** Prints the glob + every walked path when a context search came back empty. */
export function reportEmptySearch(root: string, label: string): void {
  const paths = describeSearch(root);
  console.error(`${label}: 0 context files found.`);
  console.error(`  glob: ${root}/**/error-context.md`);
  if (paths.length === 0) {
    console.error(`  searched: nothing — \`${root}\` does not exist or is empty.`);
    return;
  }
  for (const path of paths) console.error(`  searched: ${path}`);
}

/** Last `count` lines of a context file, redacted. */
export function contextTail(path: string, count = 20): string {
  const text = redact(readFileSync(path, "utf8"));
  return text.replace(/\s+$/, "").split("\n").slice(-count).join("\n");
}

/* -------------------------------------------------------------------------- */
/* collection + rendering                                                       */
/* -------------------------------------------------------------------------- */

type Failure = {
  project: string;
  title: string;
  message: string;
  /** Spec file as the JSON reporter records it, e.g. `admin-roles.spec.ts`. */
  file: string;
  /** Bare test title (no suite trail) — kept for display/debugging. */
  specTitle: string;
  /**
   * INC-084g — describe chain + test title, exactly as Playwright joins them
   * into the output-directory slug. The FILE suite (whose title is the file
   * name) is excluded: the slug already opens with the spec base.
   */
  titlePath: string[];
};

/**
 * DEC-028 / INC-117 — QUARANTINE PREDICATE. A test tagged `@global-state`
 * mutates a surface shared by every concurrent project (the language roster,
 * the publication gate). Those specs run in the serial nightly ONLY; their
 * failures are reported and labeled, never gating, until the DEC-026
 * component-test layer covers their logic.
 */
export function isQuarantined(title: string): boolean {
  return title.includes("@global-state");
}

/** DEC-028 — the verdict split every consumer (nightly, operator) reads. */
export function classifyFailures<T extends { title: string }>(
  failures: T[],
): { gating: T[]; quarantined: T[] } {
  return {
    gating: failures.filter((f) => !isQuarantined(f.title)),
    quarantined: failures.filter((f) => isQuarantined(f.title)),
  };
}

export function collect(json: PwJson): { failures: Failure[]; passed: number; skipped: number } {
  const failures: Failure[] = [];

  const walk = (suite: PwSuite, trail: string[], file: string, isRoot: boolean) => {
    const suiteFile = suite.file ?? file;
    // The root suite IS the spec file (title === file name); it contributes the
    // spec base, never a describe segment.
    const isFileSuite = isRoot || suite.title === suiteFile || suite.title === file;
    const path = suite.title && !isFileSuite ? [...trail, suite.title] : trail;
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        const status = test.status ?? "";
        if (status === "expected" || status === "skipped") continue;
        const result = (test.results ?? []).find((r) => r.status && r.status !== "passed");
        const raw = result?.error?.message ?? "(no error message captured)";
        const message = redact(raw).split("\n").slice(0, 40).join("\n");
        const specTitle = spec.title ?? "(untitled)";
        failures.push({
          project: test.projectName ?? "unknown",
          title: redact([suiteFile, ...path, specTitle].filter(Boolean).join(" › ")),
          message,
          file: spec.file ?? suiteFile,
          specTitle,
          titlePath: [...path, specTitle],
        });
      }
    }
    for (const child of suite.suites ?? []) walk(child, path, suiteFile, false);
  };

  for (const suite of json.suites ?? []) walk(suite, [], suite.file ?? "", true);

  return {
    failures,
    passed: json.stats?.expected ?? 0,
    skipped: json.stats?.skipped ?? 0,
  };
}

/**
 * One CI job that produced (or failed to produce) test results. INC-081: the
 * merged report must name WHICH job a failure came from, and must quote a red
 * job that produced no results at all instead of silently counting it as zero.
 */
export type Source = {
  /** Human label: "smoke" or "shard 3". */
  label: string;
  json: PwJson | null;
  /** Last lines of the job log, already redacted, when results are missing. */
  logTail: string | null;
  /**
   * DEC-018 — every `[ssr-error]` line the job's log carried, redacted. The
   * server logs the true exception behind a failed page delivery; quoting it
   * is INDEPENDENT of whether an error-context.md matched.
   */
  serverErrors?: string[];
  /**
   * INC-085f — every `[client-error]` line the job's log carried, redacted. A
   * client crash during hydration leaves the server log silent; this is the
   * only channel that names it.
   */
  clientErrors?: string[];
};

/**
 * INC-085f — ONE tag-grep for every runtime-error channel. `[ssr-error]` is
 * the server's voice, `[client-error]` the browser's (pageerror + console
 * errors, printed by the e2e fixture on failure). Both are greppable from the
 * same job log by the same rule, capped so one bad run cannot flood.
 */
export function grepTag(text: string | null, tag: string, limit = 20): string[] {
  if (!text) return [];
  const lines = text.split("\n").filter((line) => line.includes(tag));
  return collapseConsecutive(lines.map((line) => redact(line.trim()))).slice(-limit);
}

/** INC-085i — preserve the evidence while making repeated loops readable. */
export function collapseConsecutive(lines: string[]): string[] {
  const collapsed: string[] = [];
  for (const line of lines) {
    const previous = collapsed.at(-1);
    if (!previous) {
      collapsed.push(line);
      continue;
    }
    const match = previous.match(/^(.*) ×(\d+)$/);
    const previousLine = match?.[1] ?? previous;
    if (previousLine === line) {
      const count = Number(match?.[2] ?? "1") + 1;
      collapsed[collapsed.length - 1] = `${line} ×${count}`;
    } else {
      collapsed.push(line);
    }
  }
  return collapsed;
}

/** Every `[ssr-error]` line in a job log. */
export function grepSsrErrors(text: string | null, limit = 20): string[] {
  return grepTag(text, "[ssr-error]", limit);
}

/** Every `[client-error]` line in a job log (INC-085f). */
export function grepClientErrors(text: string | null, limit = 20): string[] {
  return grepTag(text, "[client-error]", limit);
}

/**
 * INC-088 — WHAT A ZERO-TEST SOURCE'S LOG MUST SHOW.
 *
 * A runner that died in `webServer` prints its cause EARLY (the boot banner,
 * the crash) and then floods the tail with unrelated retry/teardown noise — a
 * raw 40-line tail quoted the noise and hid the cause. The wrangler
 * compatibility-date crash was invisible for exactly this reason: the asset
 * table alone is longer than 40 lines.
 *
 * The summary is therefore two bands, in order:
 *  1. every ERROR-shaped line from the FULL log (capped at 30, oldest kept —
 *     the FIRST error is the cause, later ones are consequences);
 *  2. the final 10 lines, so the exit status is still visible.
 */
const ERROR_LINE = /✘|ERROR|error:|Error:|exited with code/;
const ERROR_LINE_CAP = 30;
const LOG_TAIL_LINES = 10;

export function summarizeLog(text: string | null): string | null {
  if (!text) return null;
  const lines = text.split("\n");
  const errors = collapseConsecutive(
    lines
      .filter((line) => ERROR_LINE.test(line))
      .map((line) => redact(line.trimEnd()))
      .filter((line) => line.trim().length > 0),
  ).slice(0, ERROR_LINE_CAP);
  const tail = lines
    .slice(-LOG_TAIL_LINES)
    .map((line) => redact(line.trimEnd()))
    .join("\n")
    .trim();
  const parts: string[] = [];
  if (errors.length > 0) parts.push(`--- error lines (${errors.length}) ---`, ...errors);
  parts.push(`--- final ${LOG_TAIL_LINES} lines ---`, tail || "(empty)");
  return parts.join("\n");
}

/**
 * INC-088 — PLATFORM-ORIGIN LABEL. Lovable's own auto-pushes land on main with
 * a fixed commit subject; a red run on such a commit is very likely not ours.
 * One string check, no heuristics, and it only ever ADDS a hint.
 */
const PLATFORM_COMMIT_SUBJECTS = ["Lovable update", "Work in progress"];

export function isPlatformOriginCommit(message: string | undefined): boolean {
  if (!message) return false;
  const subject = message.split("\n")[0]?.trim() ?? "";
  return PLATFORM_COMMIT_SUBJECTS.includes(subject);
}

/**
 * INC-086 — HOW MANY TESTS THIS FILE ACTUALLY RECORDS.
 * A results.json from a runner that died before executing anything parses
 * perfectly and contains `"suites": []` (real capture:
 * scripts/fixtures/e2e-results-empty.json, stats all zero). Treating that as
 * "has results" is how run 32564655998 published "Failed 0 · Sources without
 * results: none" while six jobs were red. Counting is structural — the suite
 * tree, not `stats` — so a reporter-shape change cannot fake a non-zero count.
 */
export function countTests(json: PwJson): number {
  let total = 0;
  const walk = (suite: PwSuite) => {
    for (const spec of suite.specs ?? []) total += (spec.tests ?? []).length;
    for (const child of suite.suites ?? []) walk(child);
  };
  for (const suite of json.suites ?? []) walk(suite);
  return total;
}

/** `e2e-results-smoke` → `smoke`; `e2e-results-3` → `shard 3`. */
export function sourceLabel(artifactDir: string): string {
  const id = artifactDir.replace(/^e2e-results-/, "");
  return /^\d+$/.test(id) ? `shard ${id}` : id;
}

/** Run identity carried into every rendered report. */
export type ReportMeta = {
  runId: string;
  runUrl: string;
  sha: string;
  /** INC-088 — the head commit's message, for the PLATFORM-ORIGIN? hint. */
  commitMessage?: string;
  /**
   * INC-100 — the GitHub run ATTEMPT this report describes. Re-runs used to be
   * blind: upload-artifact@v4 refused to replace attempt-1 artifacts, the
   * merged reporter downloaded nothing and published a wipeout that looked
   * exactly like "no tests ran". Every report now names its attempt, so a
   * wipeout on attempt >= 2 reads as "artifact contract broken".
   */
  attempt?: string;
};

/** INC-100 — the attempt line every rendered report carries. */
export function attemptLine(meta: ReportMeta): string {
  return `- Attempt: ${meta.attempt && meta.attempt.trim() !== "" ? meta.attempt.trim() : "1"}`;
}

export function renderSources(
  sources: Source[],
  meta: ReportMeta,
  contexts: Map<string, string> = new Map(),
): string {
  let passed = 0;
  let skipped = 0;
  const failures: (Failure & { source: string })[] = [];
  /**
   * INC-086 — THREE-WAY CLASSIFICATION PER SOURCE:
   *  (a) results with >= 1 test  -> normal path;
   *  (b) no parseable results    -> "no results file";
   *  (c) results parse, 0 tests  -> "produced no tests" (the runner died in
   *      webServer/global setup). (b) and (c) are BOTH sources without results
   *      and both are quoted; neither may be counted as a clean zero.
   */
  const silent: { source: Source; kind: "missing" | "zero-test" }[] = [];

  for (const source of sources) {
    if (!source.json) {
      silent.push({ source, kind: "missing" });
      continue;
    }
    if (countTests(source.json) === 0) {
      silent.push({ source, kind: "zero-test" });
      continue;
    }
    const collected = collect(source.json);
    passed += collected.passed;
    skipped += collected.skipped;
    for (const f of collected.failures) failures.push({ ...f, source: source.label });
  }

  const lines = [
    "# Last E2E failure (auto-generated — do not edit by hand)",
    "",
    `- Run: ${meta.runUrl || meta.runId}`,
    `- Commit: \`${meta.sha}\``,
    ...(isPlatformOriginCommit(meta.commitMessage)
      ? [
          `- PLATFORM-ORIGIN? the head commit's subject is \`${meta.commitMessage?.split("\n")[0]?.trim()}\` — a Lovable auto-push, so suspect platform-injected code before ours.`,
        ]
      : []),
    attemptLine(meta),
    `- Written (UTC): ${new Date().toISOString()}`,
    `- Passed: ${passed} · Skipped: ${skipped} · Failed: ${failures.length}`,
    // DEC-028 — the verdict line: quarantined failures are excluded from it.
    `- Gating failures: ${classifyFailures(failures).gating.length} · Quarantined (@global-state, INC-117, non-gating): ${classifyFailures(failures).quarantined.length}`,
    `- Sources without results: ${silent.length === 0 ? "none" : silent.map((s) => s.source.label).join(", ")}`,
    "",
  ];

  if (failures.length === 0 && silent.length === 0) {
    lines.push("No failed tests were recorded in the JSON reporter output.", "");
    return lines.join("\n");
  }

  const candidates = [...contexts.keys()];

  for (const f of failures) {
    // U4g-30 (INC-117) — QUARANTINE LABEL ONLY. A test tagged `@global-state`
    // shares a single global surface (the language roster, the publication
    // gate) with every concurrent project, so its red can be an artefact of a
    // sibling's legitimate mutation. The reporter LABELS it; gating stays with
    // the operator until the DEC-026 component-test layer covers the logic.
    // DEC-028 makes that formal: the label ALSO removes the failure from the
    // verdict (see classifyFailures + the verdict file written by main).
    const quarantined = isQuarantined(f.title);
    lines.push(
      `## ${f.title}`,
      "",
      ...(quarantined ? ["- Class: **quarantined global-state** (INC-117, non-gating)", ""] : []),
      `- Source: \`${f.source}\``,
      `- Project: \`${f.project}\``,
      "",
      "```text",
      f.message,
      "```",
      "",
    );

    // INC-083 rule 2: the page snapshot Playwright wrote at the moment of
    // death is the diagnosable evidence — quote it, or say plainly that it is
    // missing. Never leave a failure body without one of the two.
    const spec = { file: f.file, titlePath: f.titlePath, project: f.project };
    const dir = matchContextDir(candidates, spec);
    const slug = contextSlug(spec);
    if (dir) {
      lines.push("Context:", "", "```text", contextTail(contexts.get(dir)!), "```", "");
    } else {
      lines.push(`Context: context file not found for \`${slug}\``, "");
    }
  }

  // DEC-018 — SERVER ERRORS, per source, quoted whether or not any context
  // file matched. INC-085d: the cause was logged but unhearable.
  for (const source of sources) {
    const failed =
      failures.some((f) => f.source === source.label) || silent.some((s) => s.source === source);
    if (!failed) continue;
    const ssr = collapseConsecutive(source.serverErrors ?? []);
    lines.push(
      `## Server errors: ${source.label}`,
      "",
      ...(ssr.length === 0
        ? [`No \`[ssr-error]\` lines in the \`${source.label}\` log (or no log was uploaded).`, ""]
        : ["```text", ...ssr, "```", ""]),
    );
    // INC-085f — the browser's channel, quoted next to the server's. A blank
    // ARIA snapshot with no server error is a CLIENT crash; these lines name it.
    const client = collapseConsecutive(source.clientErrors ?? []);
    lines.push(
      `## Client errors: ${source.label}`,
      "",
      ...(client.length === 0
        ? [
            `No \`[client-error]\` lines in the \`${source.label}\` log (or no log was uploaded).`,
            "",
          ]
        : ["```text", ...client, "```", ""]),
    );
  }

  // Law F4: a red job that wrote no results is quoted, never counted as zero.
  // INC-086: "wrote a results.json containing zero tests" is the same thing —
  // the runner died before executing, so its own log IS the evidence.
  for (const { source: s, kind } of silent) {
    const heading =
      kind === "missing"
        ? `## ${s.label}: no results file`
        : `## ${s.label}: results file with zero tests`;
    const sentence =
      kind === "missing"
        ? `${s.label}: no results file — the process failed outside test results (setup/teardown/preflight).`
        : `${s.label}: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.`;
    lines.push(
      heading,
      "",
      sentence,
      "",
      "```text",
      s.logTail ?? "(no log tail was uploaded for this source)",
      "```",
      "",
    );
    const ssr = collapseConsecutive(s.serverErrors ?? []);
    if (ssr.length > 0) lines.push("```text", ...ssr, "```", "");
    const clientLines = collapseConsecutive(s.clientErrors ?? []);
    if (clientLines.length > 0) lines.push("```text", ...clientLines, "```", "");
  }

  return lines.join("\n");
}

export function render(json: PwJson, meta: ReportMeta): string {
  return renderSources(
    [{ label: "all", json, logTail: null, serverErrors: [], clientErrors: [] }],
    meta,
  );
}

export function renderGreen(meta: ReportMeta): string {
  return [
    "# Last E2E failure (auto-generated — do not edit by hand)",
    "",
    `last E2E run ${meta.runId} passed`,
    "",
    `- Run: ${meta.runUrl || meta.runId}`,
    `- Commit: \`${meta.sha}\``,
    attemptLine(meta),
    `- Written (UTC): ${new Date().toISOString()}`,
    "",
  ].join("\n");
}

/**
 * NEVER-SILENT LAW (INC-084e). The reporter's first live run died namelessly:
 * a source's results.json was unreadable, the exception escaped `main`, no
 * file was written, and the only visible signal was the ABSENCE of a report
 * commit while ci-status published normally. A reporter that can die without
 * naming itself is worse than no reporter, so every crash now renders into the
 * very file everyone reads — header, error, and a best-effort titles-only
 * failure list scraped from whatever results.json can still be parsed.
 */
export function renderCrash(error: unknown, meta: ReportMeta, titles: string[]): string {
  const err = error instanceof Error ? error : new Error(String(error));
  const firstStackLine = (err.stack ?? "").split("\n")[1]?.trim() ?? "(no stack)";
  return [
    "# Last E2E failure (auto-generated — do not edit by hand)",
    "",
    `- Run: ${meta.runUrl || meta.runId}`,
    `- Commit: \`${meta.sha}\``,
    attemptLine(meta),
    `- Written (UTC): ${new Date().toISOString()}`,
    "",
    `REPORTER ERROR: ${redact(err.message)} — ${redact(firstStackLine)}`,
    "",
    "## Best-effort failure list (titles only)",
    "",
    ...(titles.length === 0
      ? ["(no failure titles could be recovered from the results files)"]
      : titles.map((t) => `- ${redact(t)}`)),
    "",
  ].join("\n");
}

/**
 * Titles-only rescue pass for the crash path: reads every results.json it can,
 * ignores every one it cannot, and never throws.
 */
export async function rescueTitles(resultsDir: string | undefined): Promise<string[]> {
  const titles: string[] = [];
  if (!resultsDir) return titles;
  let entries: string[] = [];
  try {
    entries = readdirSync(resultsDir);
  } catch {
    return titles;
  }
  for (const entry of entries) {
    const parsed = await readJson(`${resultsDir}/${entry}/results.json`);
    if (!parsed.json) continue;
    try {
      for (const f of collect(parsed.json).failures)
        titles.push(`${sourceLabel(entry)}: ${f.title}`);
    } catch {
      /* a shape we cannot walk contributes nothing; it must never throw */
    }
  }
  return titles;
}

/**
 * Reads a results.json defensively. ROOT CAUSE OF INC-084e: an empty or
 * truncated results.json (a job killed mid-write) made `file.json()` throw
 * from `main`, killing the reporter before it wrote anything. A source we
 * cannot parse is now exactly what it is — a source without usable results —
 * and it is QUOTED in the report, never silently counted as zero.
 */
export async function readJson(
  path: string,
): Promise<{ json: PwJson | null; error: string | null }> {
  const file = Bun.file(path);
  if (!(await file.exists())) return { json: null, error: null };
  try {
    return { json: (await file.json()) as PwJson, error: null };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { json: null, error: `results.json exists but could not be parsed: ${redact(message)}` };
  }
}

/** The whole job log, redacted; `null` when the artifact was not uploaded. */
async function readLog(path: string): Promise<string | null> {
  const file = Bun.file(path);
  if (!(await file.exists())) return null;
  return redact(await file.text());
}

async function main() {
  const meta: ReportMeta = {
    runId: process.env["GITHUB_RUN_ID"] ?? "local",
    runUrl: process.env["E2E_RUN_URL"] ?? "",
    sha: process.env["GITHUB_SHA"] ?? "local",
    commitMessage: process.env["E2E_HEAD_COMMIT_MESSAGE"] ?? "",
    attempt: process.env["GITHUB_RUN_ATTEMPT"] ?? "1",
  };

  if (process.env["SELF_TEST"] === "1") {
    // BOTH fixtures are REAL captured output (a two-failure Playwright run:
    // one locator failure with a page snapshot, one test-level timeout whose
    // context directory is deliberately NOT bundled).
    const fixture = (await Bun.file(FIXTURE).json()) as PwJson;
    const contexts = collectContextFiles(CONTEXT_FIXTURE);
    if (contexts.size !== 1) {
      // INC-084f: a 0-found result must name the glob and every walked path —
      // that is exactly the signal the untracked-fixture failure lacked.
      if (contexts.size === 0) reportEmptySearch(CONTEXT_FIXTURE, "sample fixture");
      console.error(`SELF-TEST FAILED — expected 1 bundled context file, found ${contexts.size}.`);
      process.exit(1);
    }
    const out = renderSources(
      [
        {
          label: "shard 2",
          json: fixture,
          logTail: null,
          // DEC-018: server errors are quoted for a source that DID produce
          // results — independent of context matching.
          serverErrors: [
            "[ssr-error] /admin/users TypeError: boom at ssr.mjs:1",
            "[ssr-error] /admin/users TypeError: boom at ssr.mjs:1",
          ],
          // INC-085f — the browser channel must reach the report too.
          clientErrors: [
            "[client-error] TypeError: t is not a function at chunk-abc.js:1",
            "[client-error] TypeError: t is not a function at chunk-abc.js:1",
          ],
        },
        { label: "smoke", json: null, logTail: "Error: browserType.launch failed\nexit code 1" },
      ],
      { runId: "self-test", runUrl: "", sha: "self-test" },
      contexts,
    );
    const required = [
      "CAP-1 a missing testid fails with a locator error",
      "CAP-2 a test-level timeout records no failed step",
      "Test timeout of 20000ms exceeded.",
      "- Source: `shard 2`",
      // The quoted tail of the REAL page snapshot.
      "Context:",
      "© 2026 ethio.com — All rights reserved.",
      // The no-context branch, named by the slug it looked for.
      "Context: context file not found for `tmp-capture-CAP-2-a-test-level-timeout-records-no-failed-step-desktop-1280`",
      "smoke: no results file — the process failed outside test results (setup/teardown/preflight).",
      "browserType.launch failed",
      // DEC-018 — the [ssr-error] grep must reach the report for a FAILED
      // source that produced results, and a source without any must say so.
      "## Server errors: shard 2",
      "[ssr-error] /admin/users TypeError: boom at ssr.mjs:1 ×2",
      "No `[ssr-error]` lines in the `smoke` log",
      // INC-085f — client-error quoting, and the explicit absence sentence.
      "## Client errors: shard 2",
      "[client-error] TypeError: t is not a function at chunk-abc.js:1 ×2",
      "No `[client-error]` lines in the `smoke` log",
    ];
    const missing = required.filter((needle) => !out.includes(needle));
    if (missing.length > 0) {
      console.error("SELF-TEST FAILED — missing from rendered report:", missing);
      process.exit(1);
    }
    // INC-086 — THE WIPEOUT CASE. Every source wrote a results.json that
    // parses and records ZERO tests (real capture: an impossible --grep, the
    // same shape a dead webServer leaves behind). The old reporter printed
    // "Failed 0 · Sources without results: none" and quoted nothing.
    const emptyJson = (await Bun.file(EMPTY_FIXTURE).json()) as PwJson;
    if (countTests(emptyJson) !== 0 || countTests(fixture) !== 2) {
      console.error("SELF-TEST FAILED — countTests miscounted the captured fixtures.");
      process.exit(1);
    }
    const wipeout = renderSources(
      [
        {
          label: "shard 1",
          json: emptyJson,
          logTail: "Error: Timed out waiting 120000ms from config.webServer.\nexit code 1",
          serverErrors: ["[ssr-error] / TypeError: dead at ssr.mjs:9"],
          clientErrors: ["[client-error] ReferenceError: hydrate is not defined"],
        },
        { label: "smoke", json: emptyJson, logTail: "Error: No tests found", serverErrors: [] },
      ],
      { runId: "self-test", runUrl: "", sha: "self-test" },
      new Map(),
    );
    for (const needle of [
      "- Passed: 0 · Skipped: 0 · Failed: 0",
      "- Sources without results: shard 1, smoke",
      "## shard 1: results file with zero tests",
      "shard 1: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.",
      "Timed out waiting 120000ms from config.webServer.",
      "[ssr-error] / TypeError: dead at ssr.mjs:9",
      "[client-error] ReferenceError: hydrate is not defined",
      "## smoke: results file with zero tests",
      "Error: No tests found",
    ]) {
      if (!wipeout.includes(needle)) {
        console.error(`SELF-TEST FAILED — wipeout report missing: ${needle}`);
        process.exit(1);
      }
    }
    if (wipeout.includes("Sources without results: none")) {
      console.error("SELF-TEST FAILED — wipeout header still claims every source reported.");
      process.exit(1);
    }

    // DEC-018 — GREP + CONTAINMENT FALLBACK. The switcher slug is the shape
    // that defeated the prefix/suffix splice: the apostrophe token vanished in
    // truncation, leaving no clean `-<5 hex>-` seam.
    if (
      grepSsrErrors("noise\n[ssr-error] /c/slug Error: nope\nmore noise").length !== 1 ||
      grepSsrErrors(null).length !== 0
    ) {
      console.error("SELF-TEST FAILED — [ssr-error] grep did not isolate the server lines.");
      process.exit(1);
    }
    if (
      grepClientErrors("noise\n[client-error] TypeError: boom\n[ssr-error] other").length !== 1 ||
      grepClientErrors(null).length !== 0 ||
      grepTag("a\n[client-error] one\n[client-error] two", "[client-error]", 1).length !== 1
    ) {
      console.error("SELF-TEST FAILED — [client-error] grep did not isolate the browser lines.");
      process.exit(1);
    }
    const switcherSlug = "shell-panel-switcher-the-switcher-drawer-opens-mobile-360";
    const switcherMatch = matchContextDir([switcherSlug], {
      file: "e2e/shell.spec.ts",
      titlePath: ["panel switcher", "the switcher's drawer opens"],
      project: "mobile-360",
    });
    if (switcherMatch !== switcherSlug) {
      console.error("SELF-TEST FAILED — containment fallback missed the switcher slug.");
      process.exit(1);
    }
    if (
      matchContextDir(["shell-panel-switcher-a-different-test-mobile-360"], {
        file: "e2e/shell.spec.ts",
        titlePath: ["panel switcher", "the switcher's drawer opens"],
        project: "mobile-360",
      }) !== null
    ) {
      console.error("SELF-TEST FAILED — containment fallback matched a foreign directory.");
      process.exit(1);
    }

    if (
      sourceLabel("e2e-results-3") !== "shard 3" ||
      sourceLabel("e2e-results-smoke") !== "smoke"
    ) {
      console.error("SELF-TEST FAILED — source labelling is wrong.");
      process.exit(1);
    }
    if (out.includes("eyJhbGciOi") || /sb-[a-z]+-auth-token/.test(out)) {
      console.error("SELF-TEST FAILED — secret-shaped text survived redaction.");
      process.exit(1);
    }

    // INC-084e — LIVE-SHAPE REHEARSAL. actions/download-artifact@v4 with a
    // `pattern` and merge-multiple:false drops EACH artifact into its own
    // subdirectory named after the artifact; with merge-multiple:true they
    // land flat; when no artifact matches, the path is an empty directory.
    // All three shapes are permanent fixtures, because "it works on my
    // hand-made directory" is exactly how the first live run died.
    const layouts: [string, string, number][] = [
      ["per-artifact subdir", `${LAYOUT_FIXTURES}/e2e-context-layout-subdir`, 1],
      ["merged flat", `${LAYOUT_FIXTURES}/e2e-context-layout-flat`, 1],
      ["zero artifacts", `${LAYOUT_FIXTURES}/e2e-context-layout-empty`, 0],
      ["missing directory", `${LAYOUT_FIXTURES}/e2e-context-layout-absent`, 0],
    ];
    for (const [name, path, expectedCount] of layouts) {
      const found = collectContextFiles(path);
      if (found.size !== expectedCount) {
        if (found.size === 0) reportEmptySearch(path, `layout "${name}"`);
        console.error(
          `SELF-TEST FAILED — layout "${name}": expected ${expectedCount} context file(s), found ${found.size}.`,
        );
        process.exit(1);
      }
      // Every layout must still RENDER, with the missing-context branch when
      // nothing matches — never a crash.
      const rendered = renderSources(
        [{ label: "smoke", json: fixture, logTail: null }],
        { runId: "self-test", runUrl: "", sha: "self-test" },
        found,
      );
      if (!rendered.includes("CAP-1 a missing testid fails with a locator error")) {
        console.error(`SELF-TEST FAILED — layout "${name}" rendered no failure body.`);
        process.exit(1);
      }
      if (expectedCount === 0 && !rendered.includes("Context: context file not found for")) {
        console.error(`SELF-TEST FAILED — layout "${name}" lost the missing-context branch.`);
        process.exit(1);
      }
      console.log(`  layout OK — ${name}: ${found.size} context file(s), report rendered.`);
    }

    // INC-084g — DESCRIBE-NESTED SHAPE (real capture). The slug carries the
    // describe title, so a matcher built from the bare test title finds
    // nothing. This fixture fails loudly if that regression ever returns.
    const describeJson = (await Bun.file(`${DESCRIBE_FIXTURE}/results.json`).json()) as PwJson;
    const describeContexts = collectContextFiles(DESCRIBE_FIXTURE);
    if (describeContexts.size !== 1) {
      if (describeContexts.size === 0) reportEmptySearch(DESCRIBE_FIXTURE, "describe fixture");
      console.error(
        `SELF-TEST FAILED — expected 1 describe-nested context file, found ${describeContexts.size}.`,
      );
      process.exit(1);
    }
    const describeOut = renderSources(
      [{ label: "shard 1", json: describeJson, logTail: null }],
      { runId: "self-test", runUrl: "", sha: "self-test" },
      describeContexts,
    );
    if (
      describeOut.includes("context file not found") ||
      !describeOut.includes("panel-scoped chrome › CAP-3")
    ) {
      console.error(
        "SELF-TEST FAILED — describe-nested failure did not resolve its error-context (titlePath matching regressed).",
      );
      process.exit(1);
    }
    // INC-088 — BANNER-THEN-CRASH. The cause is printed near the TOP of the
    // log and the tail is 35 lines of "waiting for the web server": a raw tail
    // quotes only the noise. The summary must carry the workerd error AND the
    // final lines, and must collapse the repeated wait line.
    const bootLog = await Bun.file("scripts/fixtures/e2e-log-boot-crash.log.txt").text();
    const bootSummary = summarizeLog(bootLog) ?? "";
    for (const needle of [
      "--- error lines",
      "newest date supported by this server binary",
      "The Workers runtime failed to start",
      "--- final 10 lines ---",
      "Timed out waiting 120000ms from config.webServer.",
    ]) {
      if (!bootSummary.includes(needle)) {
        console.error(`SELF-TEST FAILED — zero-test log summary missing: ${needle}`);
        process.exit(1);
      }
    }
    const errorBand = bootSummary.split("--- final 10 lines ---")[0] ?? "";
    if (errorBand.includes("waiting for the web server")) {
      console.error("SELF-TEST FAILED — wait noise leaked into the error band.");
      process.exit(1);
    }
    const bootReport = renderSources(
      [{ label: "shard 2", json: { suites: [] }, logTail: bootSummary }],
      { runId: "self-test", runUrl: "", sha: "self-test", commitMessage: "Lovable update" },
    );
    if (
      !bootReport.includes("results file with zero tests") ||
      !bootReport.includes("The Workers runtime failed to start") ||
      !bootReport.includes("PLATFORM-ORIGIN?")
    ) {
      console.error(
        "SELF-TEST FAILED — the zero-test report lost the summarized log or the PLATFORM-ORIGIN? hint.",
      );
      process.exit(1);
    }
    if (isPlatformOriginCommit("fix(e2e): serve on node")) {
      console.error("SELF-TEST FAILED — PLATFORM-ORIGIN? fired on a human commit.");
      process.exit(1);
    }

    // NEVER-SILENT LAW: a malformed results.json is (a) survivable as a source
    // and (b) renderable as a REPORTER ERROR when something does escape.
    const malformed = await readJson(MALFORMED_FIXTURE);
    if (malformed.json !== null || !malformed.error) {
      console.error("SELF-TEST FAILED — malformed results.json was not reported as unparseable.");
      process.exit(1);
    }
    const crash = renderCrash(new Error("boom while rendering"), meta, [
      "smoke: shell.spec.ts › drawer switcher",
    ]);
    for (const needle of [
      "REPORTER ERROR: boom while rendering",
      "## Best-effort failure list (titles only)",
      "- smoke: shell.spec.ts › drawer switcher",
      "- Commit: `",
    ]) {
      if (!crash.includes(needle)) {
        console.error(`SELF-TEST FAILED — crash report missing: ${needle}`);
        process.exit(1);
      }
    }

    // INC-100 — THE ATTEMPT LINE. A re-run whose artifacts could not overwrite
    // attempt 1's reads as an empty download; the header must name the attempt
    // so that emptiness is legible as a broken artifact contract rather than
    // "no tests ran". Fixture: the same wipeout shape, rendered on attempt 2.
    const attemptMeta: ReportMeta = {
      runId: "self-test",
      runUrl: "",
      sha: "self-test",
      attempt: "2",
    };
    const rerun = renderSources(
      [{ label: "shard 1", json: emptyJson, logTail: null, serverErrors: [], clientErrors: [] }],
      attemptMeta,
      new Map(),
    );
    for (const needle of ["- Attempt: 2", "- Passed: 0 · Skipped: 0 · Failed: 0"]) {
      if (!rerun.includes(needle)) {
        console.error(`SELF-TEST FAILED — re-run report missing: ${needle}`);
        process.exit(1);
      }
    }
    if (
      !renderGreen(attemptMeta).includes("- Attempt: 2") ||
      !renderCrash(new Error("boom"), attemptMeta, []).includes("- Attempt: 2") ||
      !renderGreen({ runId: "self-test", runUrl: "", sha: "self-test" }).includes("- Attempt: 1")
    ) {
      console.error("SELF-TEST FAILED — a rendered report did not name its attempt.");
      process.exit(1);
    }

    // DEC-028 — THE VERDICT SPLIT, in both directions. A quarantined red must
    // be rendered AND labeled AND excluded from `gating`; an ordinary red must
    // still gate. A predicate that only ever returns one answer proves nothing.
    const quarantinedFixture = {
      title: "e2e/admin-translations.spec.ts › TR-17 @global-state roster",
    };
    const gatingFixture = { title: "e2e/shell.spec.ts › SH-1 rail renders" };
    const split = classifyFailures([quarantinedFixture, gatingFixture]);
    if (
      split.gating.length !== 1 ||
      split.quarantined.length !== 1 ||
      split.gating[0] !== gatingFixture ||
      !isQuarantined(quarantinedFixture.title) ||
      isQuarantined(gatingFixture.title)
    ) {
      console.error("SELF-TEST FAILED — DEC-028 verdict split misclassified a failure.");
      process.exit(1);
    }

    console.log(
      "Self-test OK: attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).",
    );
    return;
  }

  if (process.env["E2E_GREEN"] === "1") {
    await Bun.write(OUT, renderGreen(meta));
    // DEC-028 — a green run still publishes its verdict, so a consumer never
    // has to treat a missing verdict file as "probably green".
    const greenVerdict = process.env["E2E_VERDICT_PATH"];
    if (greenVerdict) await Bun.write(greenVerdict, "gating=0\nquarantined=0\nsilent=0\n");
    console.log(`Wrote ${OUT} (green run ${meta.runId}).`);
    return;
  }

  // SHARDED RUNS: every source (smoke tier + four shards) uploads its own
  // results.json, so the reporter reads them ALL, labels each failure with its
  // source, and quotes the log tail of any source that produced no results.
  const dir = process.env["E2E_RESULTS_DIR"];
  const logsDir = process.env["E2E_LOGS_DIR"];
  const contextsDir = process.env["E2E_CONTEXT_DIR"];
  // DEC-023-B — OPTIONAL SOURCES. An id may carry a trailing `?` ("changed?"),
  // meaning: label and read it exactly like any other source WHEN it uploaded
  // results, and omit it silently when it did not. The changed-spec fast lane
  // skips cleanly on branches that touched no spec, and a skipped signal-only
  // lane must not render as a missing-source alarm. Required ids keep their
  // old behaviour: absence is still reported.
  const expected = (process.env["E2E_EXPECTED_SOURCES"] ?? "smoke,1,2,3,4")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => ({ id: s.replace(/\?$/, ""), optional: s.endsWith("?") }));

  const sources: Source[] = [];
  let found = 0;

  if (dir) {
    for (const { id, optional } of expected) {
      const parsed = await readJson(`${dir}/e2e-results-${id}/results.json`);
      if (optional && !parsed.json && !parsed.error) continue;
      // INC-086: "found" means USABLE results (>= 1 recorded test), so the
      // console line cannot claim a source reported when it reported nothing.
      if (parsed.json && countTests(parsed.json) > 0) found += 1;

      // DEC-018: the log is read for EVERY source, not only for sources that
      // produced no results — `[ssr-error]` lines matter most next to a
      // failure that DID get recorded.
      const log = logsDir ? await readLog(`${logsDir}/e2e-log-${id}/${id}.log`) : null;
      // INC-088: error lines from the WHOLE log first, then the final 10 —
      // never a bare tail, which quotes the noise and hides the cause.
      const tail = summarizeLog(log);

      sources.push({
        label: sourceLabel(`e2e-results-${id}`),
        json: parsed.json,
        // INC-086: a zero-test source needs its log tail too, so it is kept for
        // every source and only rendered where a source has no usable results.
        logTail: parsed.error ?? tail,
        serverErrors: grepSsrErrors(log),
        clientErrors: grepClientErrors(log),
      });
    }
  } else {
    const path = process.env["E2E_RESULTS_JSON"] ?? "test-results/results.json";
    const parsed = await readJson(path);
    if (parsed.json && countTests(parsed.json) > 0) found += 1;
    sources.push({
      label: SINGLE_SOURCE_LABEL,
      json: parsed.json,
      logTail: parsed.error,
      serverErrors: [],
      clientErrors: [],
    });
  }

  const contexts = contextsDir ? collectContextFiles(contextsDir) : new Map<string, string>();
  if (contextsDir && contexts.size === 0) reportEmptySearch(contextsDir, "context download");

  await Bun.write(OUT, renderSources(sources, meta, contexts));
  console.log(
    `Wrote ${OUT} (${found}/${sources.length} source(s) with usable results, ${contexts.size} context file(s) found).`,
  );

  // DEC-028 — THE VERDICT FILE. The nightly (the only lane that runs
  // `@global-state` specs) decides its heartbeat from THIS, not from the raw
  // Playwright exit code, so a quarantined red is reported and labeled without
  // flipping the conclusion. `gating=` is the only field a verdict may read.
  const verdictPath = process.env["E2E_VERDICT_PATH"];
  if (verdictPath) {
    const all = sources.flatMap((s) => (s.json ? collect(s.json).failures : []));
    const { gating, quarantined } = classifyFailures(all);
    // A source that produced no results at all is NEVER quarantinable: the
    // runner died, which is a gating condition of its own (law F4).
    const silentSources = sources.filter((s) => !s.json || countTests(s.json) === 0).length;
    const gatingCount = gating.length + silentSources;
    await Bun.write(
      verdictPath,
      `gating=${gatingCount}\nquarantined=${quarantined.length}\nsilent=${silentSources}\n`,
    );
    console.log(
      `Verdict: gating=${gatingCount} quarantined=${quarantined.length} silent=${silentSources} (${verdictPath}).`,
    );
  }
}

/**
 * THE WRAPPER (INC-084e). Whatever happens inside `main`, this file gets
 * written and the process exit code tells the truth. Self-test failures keep
 * their own `process.exit(1)` path (they must not overwrite the live report).
 */
if (import.meta.main) {
  try {
    await main();
  } catch (error) {
    const meta = {
      runId: process.env["GITHUB_RUN_ID"] ?? "local",
      runUrl: process.env["E2E_RUN_URL"] ?? "",
      sha: process.env["GITHUB_SHA"] ?? "local",
      attempt: process.env["GITHUB_RUN_ATTEMPT"] ?? "1",
    };
    let titles: string[] = [];
    try {
      titles = await rescueTitles(process.env["E2E_RESULTS_DIR"]);
    } catch {
      /* the rescue pass is best-effort by definition */
    }
    try {
      await Bun.write(OUT, renderCrash(error, meta, titles));
      console.error(`REPORTER ERROR written to ${OUT}.`);
    } catch (writeError) {
      console.error("REPORTER ERROR could not be written:", writeError);
    }
    console.error(error);
    process.exit(1);
  }
}

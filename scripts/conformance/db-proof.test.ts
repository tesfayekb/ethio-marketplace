import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { report, walkFiles } from "./kit";
import { readWorkflow } from "./workflow-reader";

/**
 * DEC-343 (turn db-proof) — CF-DBP: ONE PREPARATION AND ONE SET OF DATABASE STEPS FOR CI AND db:proof.
 *   1. The working copy (the bucket seed, the skipped file, the named patches, the hosted-platform and
 *      account fixtures) is made only by scripts/ci/prepare-local-backend.sh: the lane job's
 *      "Prepare temporary working copy" step calls it, and no other workflow or script carries the
 *      fixtures' text.
 *   2. The holds, the DEC-340 capture, the restore and the ledger check live only in
 *      scripts/ci/local-backend-db.sh: the start step sources it and calls them in DEC-313's order
 *      (hold → migration up → capture on failure → restore → ledger); no other file defines them.
 *   3. scripts/db-proof.sh reaches nothing but the local stack: it clears the caller's SUPABASE_*,
 *      VITE_* and E2E_* names, runs no `link`, `login`, `db push`, `status -o env` or `--db-url`,
 *      names no address but the CLI's release download, and carries a pinned checksum of the
 *      workflow's CLI version for every platform it runs on.
 */

const WORKFLOW = ".github/workflows/local-backend-proof.yml";
const PREPARE = "scripts/ci/prepare-local-backend.sh";
const LIBRARY = "scripts/ci/local-backend-db.sh";
const DB_PROOF = "scripts/db-proof.sh";
const PREPARE_STEP = "Prepare temporary working copy";
const START_STEP = "Start backend and apply all migrations";
/** Text only the working copy's fixtures and patches carry. */
const FIXTURE_TEXT = [
  "INSERT INTO storage.buckets",
  "patch_copy",
  "__BOOTSTRAP_EMAIL__",
  "rls_auto_enable()",
];
/** Text only the shared database steps carry. */
const DATABASE_TEXT = [
  /\b(?:admin_sql|hold_background_work|restore_background_work|db_error_capture|ledger_check)\s*\(\)/,
  /alter system set cron\.launch_active_jobs/,
];
const ORDER = [
  "source scripts/ci/local-backend-db.sh",
  "hold_background_work",
  "migration up --local",
  "db_error_capture ",
  "restore_background_work",
  "ledger_check ",
];
const PLATFORMS = ["darwin_arm64", "linux_amd64"];
const FORBIDDEN =
  /\bsupabase link\b|\s(?:link|login)\b|\bdb push\b|status -o env|--db-url|\bpsql\b|postgres(?:ql)?:\/\//;
const RELEASES = "https://github.com/supabase/cli/releases/download/";

type Finding = { file: string; line: number; what: string };
type Source = { file: string; text: string };

/** The command lines of a text: its lines without comments. */
function commandLines(text: string): Array<{ line: number; text: string }> {
  return text
    .split("\n")
    .map((t, i) => ({ line: i + 1, text: t }))
    .filter(({ text: t }) => !/^\s*#/.test(t));
}

function proofStep(source: Source, name: string) {
  const job = readWorkflow(source.file, source.text).find((j) => j.id === "proof");
  return job?.steps.find((s) => s.text.includes(`name: ${name}\n`));
}

/** Rules 1 and 2 over the workflow and every other workflow and script. */
export function sharedStepFindings(workflow: Source, others: Source[]): Finding[] {
  const findings: Finding[] = [];
  const prepare = proofStep(workflow, PREPARE_STEP);
  if (!prepare?.text.includes(`bash ${PREPARE} .ci-local local-backend-working-copy.txt`))
    findings.push({
      file: workflow.file,
      line: prepare?.line ?? 0,
      what: `"${PREPARE_STEP}" does not call ${PREPARE}`,
    });
  const start = proofStep(workflow, START_STEP);
  const startText = start?.text ?? "";
  let at = -1;
  for (const call of ORDER) {
    const next = startText.indexOf(call, at + 1);
    if (next < 0) {
      findings.push({
        file: workflow.file,
        line: start?.line ?? 0,
        what: `"${START_STEP}" lacks \`${call.trim()}\` after the step before it`,
      });
      break;
    }
    at = next;
  }
  for (const source of [workflow, ...others]) {
    for (const { line, text } of commandLines(source.text)) {
      if (source.file !== PREPARE && FIXTURE_TEXT.some((marker) => text.includes(marker)))
        findings.push({
          file: source.file,
          line,
          what: "the working copy's fixtures outside " + PREPARE,
        });
      if (source.file !== LIBRARY && DATABASE_TEXT.some((pattern) => pattern.test(text)))
        findings.push({ file: source.file, line, what: "a database step outside " + LIBRARY });
    }
  }
  return findings;
}

/** Rule 3 over db-proof.sh, against the workflow's CLI pin. */
export function dbProofFindings(dbProof: Source, workflow: Source): Finding[] {
  const findings: Finding[] = [];
  const add = (line: number, what: string) => findings.push({ file: dbProof.file, line, what });
  const version = /^ {2}SUPABASE_CLI_VERSION: (\S+)$/m.exec(workflow.text)?.[1];
  if (!version) add(0, `${workflow.file} names no SUPABASE_CLI_VERSION`);
  for (const platform of PLATFORMS)
    if (
      version &&
      !new RegExp(
        `^\\s*${version.replace(/\./g, "\\.")}/${platform}\\) echo [0-9a-f]{64} ;;$`,
        "m",
      ).test(dbProof.text)
    )
      add(0, `no pinned checksum for CLI ${version ?? "?"} on ${platform}`);
  if (!/case "\$name" in SUPABASE_\* \| VITE_\* \| E2E_\*/.test(dbProof.text))
    add(0, "the caller's SUPABASE_*, VITE_* and E2E_* names are not cleared");
  for (const [needed, what] of [
    [`bash ${PREPARE} `, "the working copy is not made by " + PREPARE],
    [`source ${LIBRARY}`, "the database steps are not sourced from " + LIBRARY],
    [
      "node scripts/ci/start-failure-excerpt.mjs ",
      "the failure is not cut by start-failure-excerpt.mjs",
    ],
  ] as const)
    if (!dbProof.text.includes(needed)) add(0, what);
  for (const { line, text } of commandLines(dbProof.text)) {
    if (FORBIDDEN.test(text)) add(line, `a command outside the local stack: ${text.trim()}`);
    for (const url of text.match(/https?:\/\/\S+/g) ?? [])
      if (!url.startsWith(RELEASES))
        add(line, `an address other than the CLI's release download: ${url}`);
  }
  return findings;
}

const read = (file: string): Source => ({ file, text: readFileSync(file, "utf8") });
const others = [
  ...walkFiles([".github/workflows"], { ext: ["yml"] }).filter((f) => f !== WORKFLOW),
  ...walkFiles(["scripts"], { ext: ["sh", "ts", "mjs"] }).filter((f) => !f.endsWith(".test.ts")),
].map(read);

describe("one preparation and one set of database steps for CI and db:proof (DEC-343)", () => {
  it("CF-DBP-1 the workflow calls the shared preparation and database steps, in DEC-313's order", () => {
    console.log(`[db-proof] files read: ${String(others.length + 1)}`);
    expect(report(sharedStepFindings(read(WORKFLOW), others))).toBe("");
  });

  it("CF-DBP-2 db:proof reaches only the local stack and pins the workflow's CLI", () => {
    expect(report(dbProofFindings(read(DB_PROOF), read(WORKFLOW)))).toBe("");
  });

  it("CF-DBP-3 planted: an inline fixture, an inline hold and a step out of order fail", () => {
    const workflow = read(WORKFLOW);
    const inline = {
      file: WORKFLOW,
      text: workflow.text.replace(
        `bash ${PREPARE} .ci-local local-backend-working-copy.txt`,
        "cat > x.sql <<'SQL'\n          INSERT INTO storage.buckets (id) VALUES ('a');\n          SQL",
      ),
    };
    expect(sharedStepFindings(inline, []).map((f) => f.what)).toEqual([
      `"${PREPARE_STEP}" does not call ${PREPARE}`,
      "the working copy's fixtures outside " + PREPARE,
    ]);
    const hold = { file: "scripts/planted.sh", text: "admin_sql() { :; }\n" };
    expect(sharedStepFindings(workflow, [hold]).map((f) => f.what)).toEqual([
      "a database step outside " + LIBRARY,
    ]);
    const late = {
      file: WORKFLOW,
      text: workflow.text
        .replace("          hold_background_work\n", "")
        .replace(
          "          restore_background_work\n",
          "          restore_background_work\n          hold_background_work\n",
        ),
    };
    expect(sharedStepFindings(late, []).map((f) => f.what)).toEqual([
      `"${START_STEP}" lacks \`migration up --local\` after the step before it`,
    ]);
  });

  it("CF-DBP-4 planted: a remote command, another address, a kept environment and a missing pin fail", () => {
    const dbProof = read(DB_PROOF);
    const workflow = read(WORKFLOW);
    const remote = {
      file: DB_PROOF,
      text: `${dbProof.text}"$cli" db push --db-url "postgresql://x"\ncurl https://example.invalid/x\n`,
    };
    expect(dbProofFindings(remote, workflow).map((f) => f.what)).toEqual([
      'a command outside the local stack: "$cli" db push --db-url "postgresql://x"',
      "an address other than the CLI's release download: https://example.invalid/x",
    ]);
    const kept = {
      file: DB_PROOF,
      text: dbProof.text.replace("SUPABASE_* | VITE_* | E2E_*", "PG*"),
    };
    expect(dbProofFindings(kept, workflow).map((f) => f.what)).toEqual([
      "the caller's SUPABASE_*, VITE_* and E2E_* names are not cleared",
    ]);
    const bumped = {
      file: WORKFLOW,
      text: workflow.text.replace(/^( {2}SUPABASE_CLI_VERSION: )\S+$/m, "$19.9.9"),
    };
    expect(dbProofFindings(dbProof, bumped).map((f) => f.what)).toEqual(
      PLATFORMS.map((p) => `no pinned checksum for CLI 9.9.9 on ${p}`),
    );
  });
});

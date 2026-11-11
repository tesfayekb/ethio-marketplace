import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { report, walkFiles } from "./kit";
import { readWorkflow } from "./workflow-reader";
import { checksCacheRoot } from "../ci/checks-cache";

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
 *   4. INC-1063: on every start kind (cold, restart, warm), after the start and before the holds and
 *      `migration up`, db:proof reads the stack's published ports from Docker (scripts/db-proof-ports.sh)
 *      and refuses — the stack stopped with --no-backup — when any binds beyond 127.0.0.1 or ::1.
 *   5. INC-1063: the CLI's start (the one call that creates containers) runs with
 *      scripts/db-proof-docker.sh first on PATH as `docker`; it gives each `-p` / `--publish` value
 *      without an address 127.0.0.1 and runs the real docker by the absolute path db:proof resolved
 *      before, never through PATH.
 *   6. Housekeeping turn 3 (ruling 1 Q16): the checks' cache root is one constant — db:proof reads
 *      scripts/ci/checks-cache.ts's CHECKS_CACHE through `bun -e` and never spells the root itself; an
 *      empty ETHIO_CHECKS_CACHE is unset in both.
 */

const WORKFLOW = ".github/workflows/local-backend-proof.yml";
const PREPARE = "scripts/ci/prepare-local-backend.sh";
const LIBRARY = "scripts/ci/local-backend-db.sh";
const DB_PROOF = "scripts/db-proof.sh";
const PORTS = "scripts/db-proof-ports.sh";
const PORTS_REFUSAL =
  "the stack's ports are open beyond this computer — the docker wrapper did not reach every mapping (has the pinned CLI's argument form changed?); nothing applied";
const WRAPPER = "scripts/db-proof-docker.sh";
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
        `^\\s*${version.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")}/${platform}\\) echo [0-9a-f]{64} ;;$`,
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

/** Rule 4 over db-proof.sh: the port check, at the top level, between the start and the holds. */
export function portCheckFindings(dbProof: Source): Finding[] {
  const findings: Finding[] = [];
  const add = (what: string) => findings.push({ file: dbProof.file, line: 0, what });
  const lines = dbProof.text.split("\n");
  const at = (pattern: RegExp) => lines.findIndex((l) => pattern.test(l));
  const lastStart = lines.reduce((last, l, i) => (/"\$cli" start /.test(l) ? i : last), -1);
  const check = at(/^refusal=\$\(printf '%s\\n' "\$ports" \| ports_refusal\)$/);
  const hold = at(/^hold_background_work /);
  const apply = at(/"\$cli" migration up --local/);
  if (!dbProof.text.includes(`source ${PORTS}\n`)) add(`${PORTS} is not sourced`);
  if (!/^ports=\$\(stack_ports "\$PROJECT"\) \|\| \{$/m.test(dbProof.text))
    add("the published ports are not read from Docker by stack_ports");
  if (check < 0) add("no top-level port check (refusal=$(… | ports_refusal)) on every start kind");
  else {
    if (check < lastStart) add("the port check runs before the stack's start");
    if (hold < 0 || apply < 0 || check > hold || check > apply)
      add("the port check runs after the holds or `migration up`");
    if (
      !/^ {2}stop_stack --no-backup\n(?: {2}.*\n)* {2}not_run "\$refusal"$/m.test(
        lines.slice(check).join("\n"),
      )
    )
      add("a refused port check does not stop the stack with --no-backup and answer NOT RUN");
  }
  return findings;
}

/**
 * Rule 5 over db-proof.sh and the wrapper: the real docker is resolved by absolute path before the
 * start, the start alone runs with the wrapper first on PATH, and the wrapper runs only that path.
 */
export function wrapperFindings(dbProof: Source, wrapper: Source): Finding[] {
  const findings: Finding[] = [];
  const lines = dbProof.text.split("\n");
  const resolved = lines.findIndex((l) => /^REAL_DOCKER=\$\(command -v docker\)$/.test(l));
  const linked = lines.findIndex((l) =>
    l.includes(`ln -sf "$PWD/${WRAPPER}" "$DOCKER_WRAPPER_BIN/docker"`),
  );
  const starts = lines.map((l, i) => ({ l, i })).filter(({ l }) => /"\$cli" start /.test(l));
  const add = (file: string, what: string) => findings.push({ file, line: 0, what });
  if (resolved < 0) add(dbProof.file, "the real docker is not resolved by `command -v docker`");
  if (linked < 0) add(dbProof.file, `${WRAPPER} is not linked as docker`);
  if (starts.length === 0) add(dbProof.file, "no start of the pinned CLI");
  for (const { i } of starts) {
    const call = `${lines[i - 1] ?? ""}\n${lines[i] ?? ""}`;
    if (!call.includes('PATH="$DOCKER_WRAPPER_BIN:$PATH" DB_PROOF_REAL_DOCKER="$REAL_DOCKER"'))
      add(dbProof.file, "the start runs without the wrapper first on PATH");
    if (resolved > i || linked > i)
      add(dbProof.file, "the real docker or the wrapper is set up after the start");
  }
  if (lines.some((l) => /^\s*(?:export\s+)?PATH=\S*\s*$/.test(l)))
    add(dbProof.file, "PATH is changed for more than the start");
  const commands = commandLines(wrapper.text).map((c) => c.text);
  if (!commands.some((c) => /^real="\$\{DB_PROOF_REAL_DOCKER:-\}"$/.test(c)))
    add(wrapper.file, "the wrapper does not take the real docker from DB_PROOF_REAL_DOCKER");
  if (commands.some((c) => /\bcommand -v\b|\bwhich\b|\bexec docker\b|^\s*docker\s/.test(c)))
    add(wrapper.file, "the wrapper resolves docker through PATH");
  if (commands.some((c) => /\bexec\b/.test(c) && !/\bexec "\$real"/.test(c)))
    add(wrapper.file, "the wrapper runs something other than the real docker");
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

  it("CF-DBP-5 every start kind meets the port check before any migration applies (INC-1063); planted copies fail", () => {
    const dbProof = read(DB_PROOF);
    expect(report(portCheckFindings(dbProof))).toBe("");
    const check = "refusal=$(printf '%s\\n' \"$ports\" | ports_refusal)\n";
    const without = { file: DB_PROOF, text: dbProof.text.replace(check, "") };
    expect(portCheckFindings(without).map((f) => f.what)).toEqual([
      "no top-level port check (refusal=$(… | ports_refusal)) on every start kind",
    ]);
    const late = {
      file: DB_PROOF,
      text: dbProof.text
        .replace(check, "")
        .replace("record_applied\necho", `record_applied\n${check}echo`),
    };
    expect(portCheckFindings(late).map((f) => f.what)).toEqual([
      "the port check runs after the holds or `migration up`",
      "a refused port check does not stop the stack with --no-backup and answer NOT RUN",
    ]);
    const coldOnly = { file: DB_PROOF, text: dbProof.text.replace(check, `  ${check}`) };
    expect(portCheckFindings(coldOnly).map((f) => f.what)).toEqual([
      "no top-level port check (refusal=$(… | ports_refusal)) on every start kind",
    ]);
  });

  it("CF-DBP-6 the check's parser refuses a mapping on every interface and passes 127.0.0.1 and ::1", () => {
    const parse = (input: string) =>
      spawnSync("bash", ["-c", `source ${PORTS} && ports_refusal`], { input, encoding: "utf8" });
    // `docker inspect` in stack_ports' format, captured from a container published with no host address.
    const open = parse("/saas-adminer 8080/tcp=0.0.0.0:8080 8080/tcp=:::8080\n");
    expect([open.status, open.stdout.trim()]).toEqual([0, PORTS_REFUSAL]);
    const local = parse("/saas-adminer 8080/tcp=127.0.0.1:8080 8080/tcp=::1:8080\n");
    expect([local.status, local.stdout]).toEqual([0, ""]);
  });

  it("CF-DBP-7 the wrapper gives every unaddressed mapping 127.0.0.1, and only the start runs it (INC-1063)", () => {
    const dir = mkdtempSync(join(tmpdir(), "db-proof-wrapper-"));
    try {
      const echo = join(dir, "real-docker");
      writeFileSync(echo, '#!/bin/sh\nprintf "%s\\n" "$@"\n');
      chmodSync(echo, 0o755);
      const wrap = (args: string[], real = echo) =>
        spawnSync("bash", [WRAPPER, ...args], {
          encoding: "utf8",
          env: { ...process.env, DB_PROOF_REAL_DOCKER: real },
        });
      const run = wrap([
        "run",
        "-p",
        "31322:5432",
        "-p",
        "31321:8443/tcp",
        "-p=31324:8025",
        "--publish",
        "31324:8025",
        "--publish=1:2",
        "-p",
        "127.0.0.1:1:2",
        "-p",
        "[::1]:1:2",
        "-e",
        "X=1:2",
        "image",
      ]);
      expect([run.status, run.stdout.trim().split("\n")]).toEqual([
        0,
        [
          "run",
          "-p",
          "127.0.0.1:31322:5432",
          "-p",
          "127.0.0.1:31321:8443/tcp",
          "-p=127.0.0.1:31324:8025",
          "--publish",
          "127.0.0.1:31324:8025",
          "--publish=127.0.0.1:1:2",
          "-p",
          "127.0.0.1:1:2",
          "-p",
          "[::1]:1:2",
          "-e",
          "X=1:2",
          "image",
        ],
      ]);
      const other = wrap(["exec", "c", "psql", "-p", "31322:5432"]);
      expect(other.stdout.trim().split("\n")).toEqual(["exec", "c", "psql", "-p", "31322:5432"]);
      const missing = wrap(["ps"], "");
      expect([missing.status, missing.stdout, missing.stderr.trim().split("\n").length]).toEqual([
        127,
        "",
        1,
      ]);
      expect(wrap(["ps"], join(process.cwd(), WRAPPER)).status).toBe(127);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    const dbProof = read(DB_PROOF);
    const wrapper = read(WRAPPER);
    expect(report(wrapperFindings(dbProof, wrapper))).toBe("");
    const bare = {
      file: DB_PROOF,
      text: dbProof.text.replace(
        'PATH="$DOCKER_WRAPPER_BIN:$PATH" DB_PROOF_REAL_DOCKER="$REAL_DOCKER" \\\n',
        "",
      ),
    };
    expect(wrapperFindings(bare, wrapper).map((f) => f.what)).toEqual([
      "the start runs without the wrapper first on PATH",
    ]);
    const throughPath = {
      file: WRAPPER,
      text: wrapper.text.replace('exec "$real" ${args[@]+"${args[@]}"}', 'exec docker "$@"'),
    };
    expect(wrapperFindings(dbProof, throughPath).map((f) => f.what)).toEqual([
      "the wrapper resolves docker through PATH",
      "the wrapper runs something other than the real docker",
    ]);
    const late = {
      file: DB_PROOF,
      text: dbProof.text
        .replace("REAL_DOCKER=$(command -v docker)\n", "")
        .replace("record_applied\necho", "record_applied\nREAL_DOCKER=$(command -v docker)\necho"),
    };
    expect(wrapperFindings(late, wrapper).map((f) => f.what)).toEqual([
      "the real docker or the wrapper is set up after the start",
    ]);
  });

  it("CF-DBP-8 db:proof's cache root is the checks' constant: planted, none and empty agree", () => {
    const text = readFileSync(DB_PROOF, "utf8");
    expect(text).not.toContain("${ETHIO_CHECKS_CACHE");
    expect(text).not.toContain(".cache/ethio-checks");
    const line = text.split("\n").find((l) => l.startsWith("checks_cache=$(")) ?? "";
    const read = line.replace(/ \|\|$/, "");
    expect(read).toContain("bun -e");
    expect(text).toContain('cli_dir="$checks_cache/supabase-cli/');
    const home = homedir();
    for (const value of ["/planted/cache-root", undefined, ""]) {
      const env: Record<string, string> = { PATH: process.env["PATH"] ?? "", HOME: home };
      if (value !== undefined) env["ETHIO_CHECKS_CACHE"] = value;
      const run = spawnSync("bash", ["-c", `${read}\nprintf '%s' "$checks_cache"`], {
        encoding: "utf8",
        env,
        timeout: 20_000,
      });
      expect([run.status, run.stdout], run.stderr).toEqual([0, checksCacheRoot(value, home)]);
    }
    expect(checksCacheRoot("", "/h")).toBe("/h/.cache/ethio-checks");
    expect(checksCacheRoot("/x", "/h")).toBe("/x");
  });
});

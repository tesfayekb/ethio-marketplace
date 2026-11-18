import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { AUDIT_EXCEPTIONS_FILE, EXCEPTION_CEILING_DAYS, parseExceptions } from "./audit-exceptions";

/**
 * DEC-405 — the audit gate's exception list, proven on planted lines. The gate (scripts/audit-gate.sh)
 * runs here as CI runs it, with a stand-in `bun audit` first on the PATH that reports the advisories
 * named in FAKE_ADVISORIES unless they arrive as `--ignore=`; every other `bun` call is the real one.
 * Exactly one advisory service verdict is the real one: CI's dependency-audit job.
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GATE_MS = 30_000;
const LISTED = "GHSA-aaaa-bbbb-cccc";
const UNLISTED = "GHSA-dddd-eeee-ffff";

const today = (): string => new Date().toISOString().slice(0, 10);
const inDays = (days: number): string =>
  new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
const line = (id: string, until: string, decision = "DEC-405"): string =>
  `${id} | a planted reason | until ${until} | ${decision}`;

function realBun(): string {
  const found = spawnSync("bash", ["-c", "command -v bun"], { encoding: "utf8" });
  return found.stdout.trim();
}

/** Runs the real gate over a planted list; returns its verdict, its text and what `bun audit` was given. */
function runGate(
  list: string,
  advisories: string[],
): { status: number | null; out: string; auditArgs: string | undefined } {
  const dir = mkdtempSync(join(tmpdir(), "audit-gate-"));
  const log = join(dir, "args.log");
  const shim = join(dir, "bun");
  writeFileSync(
    shim,
    [
      "#!/usr/bin/env bash",
      'if [ "$1" = "audit" ]; then',
      '  echo "$@" >"$FAKE_ARGS_LOG"',
      '  ignored=" "',
      '  for a in "$@"; do case "$a" in --ignore=*) ignored="$ignored${a#--ignore=} ";; esac; done',
      "  found=0",
      "  for id in $FAKE_ADVISORIES; do",
      '    case "$ignored" in',
      '      *" $id "*) ;;',
      '      *) echo "high: planted finding - https://github.com/advisories/$id"; found=1 ;;',
      "    esac",
      "  done",
      '  [ "$found" = 1 ] && exit 1',
      "  exit 0",
      "fi",
      'exec "$REAL_BUN" "$@"',
      "",
    ].join("\n"),
  );
  chmodSync(shim, 0o755);
  const listFile = join(dir, "audit-exceptions.txt");
  writeFileSync(listFile, list);
  const result = spawnSync("bash", ["scripts/audit-gate.sh"], {
    cwd: ROOT,
    encoding: "utf8",
    env: {
      ...process.env,
      PATH: `${dir}:${process.env.PATH ?? ""}`,
      REAL_BUN: realBun(),
      FAKE_ADVISORIES: advisories.join(" "),
      FAKE_ARGS_LOG: log,
      AUDIT_EXCEPTIONS_FILE: listFile,
    },
  });
  return {
    status: result.status,
    out: `${result.stdout}${result.stderr}`,
    auditArgs: existsSync(log) ? readFileSync(log, "utf8").trim() : undefined,
  };
}

describe("the audit gate's exception list (DEC-405)", () => {
  it(
    "AGX-1 a valid line passes, becomes its --ignore and prints a warning naming it",
    () => {
      const until = inDays(7);
      const run = runGate(line(LISTED, until), [LISTED]);
      expect(run.status).toBe(0);
      expect(run.auditArgs).toContain(`--ignore=${LISTED}`);
      expect(run.out).toContain(`::warning::${LISTED} is held out of the audit until ${until}`);
      expect(run.out).toContain("(DEC-405)");
      expect(run.out).toContain("No high or critical advisories beyond the recorded exceptions.");
    },
    GATE_MS,
  );

  it(
    "AGX-2 an expired line fails the gate by naming itself, before any audit",
    () => {
      const run = runGate(`# comment\n${line(LISTED, inDays(-1))}\n`, [LISTED]);
      expect(run.status).toBe(1);
      expect(run.out).toMatch(/audit-exceptions\.txt:2 expired/);
      expect(run.auditArgs).toBeUndefined();
    },
    GATE_MS,
  );

  it(
    "AGX-3 a malformed line fails the gate: three cells, a bad id, a date that is not ISO",
    () => {
      const planted = [
        `${LISTED} | reason | until ${inDays(3)}`,
        `GHSA-nope | reason | until ${inDays(3)} | DEC-405`,
        `${LISTED} | reason | until 02-12-2026 | DEC-405`,
        `${LISTED} | reason | ${inDays(3)} | DEC-405`,
        `${LISTED} | reason | until 2026-02-30 | DEC-405`,
      ];
      for (const planted_line of planted) {
        const run = runGate(`${planted_line}\n`, [LISTED]);
        expect(run.status, planted_line).toBe(1);
        expect(run.out, planted_line).toMatch(/audit-exceptions\.txt:1 malformed/);
        expect(run.auditArgs, planted_line).toBeUndefined();
      }
    },
    GATE_MS,
  );

  it(
    "AGX-4 a line without a DEC fails the gate",
    () => {
      for (const decision of ["", "decided", "INC-1194"]) {
        const run = runGate(`${line(LISTED, inDays(3), decision)}\n`, [LISTED]);
        expect(run.status, decision).toBe(1);
        expect(run.out, decision).toMatch(/audit-exceptions\.txt:1 (undecided|malformed)/);
        expect(run.auditArgs, decision).toBeUndefined();
      }
    },
    GATE_MS,
  );

  it(
    "AGX-5 an advisory that is not listed still fails the gate",
    () => {
      const run = runGate(line(LISTED, inDays(3)), [LISTED, UNLISTED]);
      expect(run.status).toBe(1);
      expect(run.out).toContain(UNLISTED);
      expect(run.out).not.toContain(`planted finding - https://github.com/advisories/${LISTED}`);
      expect(run.out).toContain("High or critical vulnerabilities reported by 'bun audit'.");
    },
    GATE_MS,
  );

  it(
    "AGX-6 an empty list is the plain gate: no --ignore, a finding fails, none passes",
    () => {
      const clean = runGate("# nothing listed\n", []);
      expect(clean.status).toBe(0);
      expect(clean.auditArgs).not.toContain("--ignore");
      expect(clean.out).toContain("No high or critical advisories.");
      expect(runGate("# nothing listed\n", [LISTED]).status).toBe(1);
    },
    GATE_MS,
  );

  it("AGX-7 an expiry beyond the ceiling fails; the ceiling day itself passes", () => {
    const beyond = parseExceptions(line(LISTED, inDays(EXCEPTION_CEILING_DAYS + 1)), today());
    expect(beyond.exceptions).toEqual([]);
    expect(beyond.problems).toHaveLength(1);
    expect(beyond.problems[0]).toContain(`expiry beyond ${EXCEPTION_CEILING_DAYS} days`);
    const at = parseExceptions(line(LISTED, inDays(EXCEPTION_CEILING_DAYS)), today());
    expect(at.problems).toEqual([]);
    expect(at.exceptions.map((e) => e.id)).toEqual([LISTED]);
    const lastDay = parseExceptions(line(LISTED, today()), today());
    expect(lastDay.problems).toEqual([]);
  });

  it("AGX-8 a duplicate advisory and a second valid line are judged line by line", () => {
    const text = [line(LISTED, inDays(2)), line(UNLISTED, inDays(2)), line(LISTED, inDays(3))].join(
      "\n",
    );
    const read = parseExceptions(text, today());
    expect(read.exceptions.map((e) => [e.id, e.line])).toEqual([
      [LISTED, 1],
      [UNLISTED, 2],
    ]);
    expect(read.problems).toHaveLength(1);
    expect(read.problems[0]).toContain("audit-exceptions.txt:3 duplicate advisory");
  });

  it("AGX-9 the committed list is valid today, and holds only advisories it names by id", () => {
    const read = parseExceptions(readFileSync(join(ROOT, AUDIT_EXCEPTIONS_FILE), "utf8"), today());
    expect(read.problems).toEqual([]);
    expect(read.exceptions.map((e) => e.id)).toEqual(["GHSA-fc5q-39xc-vjpf"]);
    expect(read.exceptions.every((e) => e.decision === "DEC-405")).toBe(true);
  });

  it("AGX-10 the gate is the one reader of the list, and CI's audit job runs the gate", () => {
    const gate = readFileSync(join(ROOT, "scripts/audit-gate.sh"), "utf8");
    expect(gate).toContain("scripts/audit-exceptions.ts");
    expect(gate).toContain("--ignore=");
    expect(readFileSync(join(ROOT, ".github/workflows/ci.yml"), "utf8")).toContain(
      "bash scripts/audit-gate.sh",
    );
  });
});

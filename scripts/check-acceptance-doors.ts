/** DEC-215 / D227: the live catalogue, not a hand-count, defines signed-in write doors. */
import { readFileSync } from "node:fs";

const classes = ["legal", "account", "staff", "draft", "signal", "helper", "owed", "guarded", "takedown"] as const;
type Class = (typeof classes)[number];
type Door = { fn: string; volatility: string; checks: boolean };
type Allowance = { fn: string; className: string; reason: string };

function inspect(catalogue: string, allowlist: string) {
  const failures: string[] = [];
  const doors = new Map<string, Door>();
  for (const line of catalogue.split(/\r?\n/).filter((line) => line.trim())) {
    const parts = line.split("\t");
    const [fn, volatility, checks] = parts;
    if (
      parts.length !== 3 ||
      !fn ||
      !["v", "s", "i"].includes(volatility ?? "") ||
      !["t", "f"].includes(checks ?? "")
    ) {
      failures.push(`${fn ?? "catalogue"}: malformed catalogue row`);
      continue;
    }
    if (doors.has(fn)) failures.push(`${fn}: duplicate catalogue row`);
    doors.set(fn, { fn, volatility: volatility ?? "", checks: checks === "t" });
  }
  if (!doors.size) failures.push("catalogue: empty census");
  const allowances = new Map<string, Allowance>();
  const counts = new Map<Class, number>(classes.map((name) => [name, 0]));
  for (const line of allowlist.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const parts = line.split("|").map((part) => part.trim());
    const [fn, className, reason] = parts;
    if (parts.length !== 3 || !fn || !className || !reason) {
      failures.push(`${fn ?? "allowlist"}: malformed allowance`);
      continue;
    }
    if (allowances.has(fn)) failures.push(`${fn}: duplicate allowance`);
    allowances.set(fn, { fn, className, reason });
    const knownClass = classes.find((name) => name === className);
    if (!knownClass) failures.push(`${fn}: unknown class ${className}`);
    else counts.set(knownClass, (counts.get(knownClass) ?? 0) + 1);
    if (className === "owed" && !reason.includes("INC-807"))
      failures.push(`${fn}: owed allowance must name INC-807`);
    if (
      (className === "guarded" || className === "takedown") &&
      (!reason.includes("DEC-216") || !/\bLG-\d+\b/.test(reason))
    )
      failures.push(`${fn}: ${className} allowance must name DEC-216 and an LG test id`);
    const door = doors.get(fn);
    if (!door) failures.push(`${fn}: stale allowance (function absent)`);
    else if (door.volatility !== "v") failures.push(`${fn}: stale allowance (not VOLATILE)`);
    else if (door.checks) failures.push(`${fn}: stale allowance (now checks acceptance)`);
  }
  const writes = [...doors.values()].filter((door) => door.volatility === "v");
  for (const door of writes) {
    if (!door.checks && !allowances.has(door.fn))
      failures.push(`${door.fn}: missing acceptance check and allowance`);
  }
  const checked = writes.filter((door) => door.checks).length;
  const summary = `Acceptance-doors guard OK (${writes.length} write doors: ${checked} check, ${allowances.size} allowlisted — legal ${counts.get("legal")}, account ${counts.get("account")}, staff ${counts.get("staff")}, draft ${counts.get("draft")}, signal ${counts.get("signal")}, helper ${counts.get("helper")}; owed ${counts.get("owed")}, guarded ${counts.get("guarded")}, takedown ${counts.get("takedown")})`;
  return { failures, summary };
}

if (process.env["SELF_TEST"] === "1") {
  // The bad fixture separates its catalogue and allowance with one blank line.
  const [catalogue, allowance] = readFileSync(
    "scripts/fixtures/acceptance-doors-bad.tsv",
    "utf8",
  ).split(/\r?\n\r?\n/);
  const result = inspect(catalogue ?? "", allowance ?? "");
  if (
    !result.failures.some((failure) => failure.startsWith("e2e_acceptance_unchecked(): missing")) ||
    !result.failures.some((failure) => failure.startsWith("e2e_acceptance_absent(): stale")) ||
    !result.failures.some((failure) => failure.startsWith("e2e_acceptance_guarded(): guarded"))
  ) {
    console.error(
      "Acceptance-doors self-test FAILED: bad fixture was not refused for all three functions",
    );
    process.exit(1);
  }
  for (const failure of result.failures)
    console.log(`Acceptance-doors self-test refused: ${failure}`);
  console.log("Acceptance-doors self-test OK: all three bad fixture functions refused");
} else {
  const path = process.argv[2];
  if (!path) throw new Error("Acceptance-doors guard requires a catalogue TSV path");
  const result = inspect(
    readFileSync(path, "utf8"),
    readFileSync("scripts/acceptance-doors-allowlist.txt", "utf8"),
  );
  if (result.failures.length) {
    for (const failure of result.failures) console.error(`Acceptance-doors guard FAIL: ${failure}`);
    process.exit(1);
  }
  console.log(result.summary);
}

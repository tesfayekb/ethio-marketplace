/** DEC-241: live authenticated write doors must name a caller gate. */
import { readFileSync } from "node:fs";

function inspect(catalogue: string, allowlist: string) {
  const failures: string[] = [];
  const doors = new Map<string, { volatility: string; gated: boolean }>();
  for (const line of catalogue.split(/\r?\n/).filter((line) => line.trim())) {
    const parts = line.split("\t");
    const [fn, volatility, gated] = parts;
    if (
      parts.length !== 3 ||
      !fn ||
      !/^[^|\t]+\(.*\)$/.test(fn) ||
      !["v", "s", "i"].includes(volatility ?? "") ||
      !["t", "f"].includes(gated ?? "")
    ) {
      failures.push(`${fn ?? "catalogue"}: malformed catalogue row`);
      continue;
    }
    if (doors.has(fn)) failures.push(`${fn}: duplicate catalogue row`);
    doors.set(fn, { volatility: volatility ?? "", gated: gated === "t" });
  }
  if (!doors.size) failures.push("catalogue: empty census");
  const allowances = new Set<string>();
  const today = new Date().toISOString().slice(0, 10);
  for (const line of allowlist.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const parts = line.split("|").map((part) => part.trim());
    const [fn, reason, until] = parts;
    if (parts.length !== 3 || !fn || !/^[^|\t]+\(.*\)$/.test(fn) || !reason || !until) {
      failures.push(`${fn ?? "allowlist"}: malformed allowance`);
      continue;
    }
    if (allowances.has(fn)) failures.push(`${fn}: duplicate allowance`);
    allowances.add(fn);
    if (/^\d{4}-\d{2}-\d{2}$/.test(until)) {
      const date = new Date(`${until}T00:00:00Z`);
      if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== until)
        failures.push(`${fn}: invalid until date`);
      else if (until < today) failures.push(`${fn}: expired allowance (${until})`);
    } else if (!/^(INC|DEC)-\d+$/.test(until)) failures.push(`${fn}: invalid until marker`);
    const door = doors.get(fn);
    if (!door) failures.push(`${fn}: stale allowance (function absent)`);
    else if (door.volatility !== "v") failures.push(`${fn}: stale allowance (not VOLATILE)`);
    else if (door.gated) failures.push(`${fn}: stale allowance (now gated)`);
  }
  const writes = [...doors.entries()].filter(([, door]) => door.volatility === "v");
  for (const [fn, door] of writes)
    if (!door.gated && !allowances.has(fn)) failures.push(`${fn}: no caller gate and no allowance`);
  const gated = writes.filter(([, door]) => door.gated).length;
  return {
    failures,
    summary: `Caller-gates guard OK (${writes.length} write doors: ${gated} gated, ${allowances.size} allowlisted)`,
  };
}

if (process.env["SELF_TEST"] === "1") {
  const [catalogue, allowance] = readFileSync(
    "scripts/fixtures/caller-gates-bad.tsv",
    "utf8",
  ).split(/\r?\n\r?\n/);
  const result = inspect(catalogue ?? "", allowance ?? "");
  if (
    !result.failures.some((line) => line.startsWith("e2e_gate_unchecked(): no caller")) ||
    !result.failures.some((line) => line.startsWith("e2e_gate_absent(): stale")) ||
    !result.failures.some((line) => line.startsWith("e2e_gate_expired(): expired"))
  ) {
    console.error("Caller-gates self-test FAILED: not all planted cases refused");
    process.exit(1);
  }
  console.log("Caller-gates self-test OK: all three bad fixture functions refused");
} else {
  const path = process.argv[2];
  if (!path) throw new Error("Caller-gates guard requires a catalogue TSV path");
  const result = inspect(
    readFileSync(path, "utf8"),
    readFileSync("scripts/caller-gates-allowlist.txt", "utf8"),
  );
  if (result.failures.length) {
    for (const line of result.failures) console.error(`Caller-gates guard FAIL: ${line}`);
    process.exit(1);
  }
  console.log(result.summary);
}

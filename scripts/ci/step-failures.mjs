// INC-992 (Foundations turn N1b-3, C3) — THE ONE MECHANISM BY WHICH A LANE STEP'S FAILURE REACHES
// THE EVIDENCE. INC-984 (the outbound-calls guard) and INC-992 (lane 8, no results and no cause)
// are one class: a step failed and nothing said which. "Name failed steps", the lane job's last
// step before "Write lane evidence" (`if: always()`), runs this with STEPS_JSON = toJSON(steps):
// every step whose outcome is not success or skipped is named by its id and outcome, with the last
// lines its run shell kept (scripts/ci/step-shell.sh), appended to local-backend-failure.txt — the
// file "Write lane evidence" carries as "- Step failure:" and the merge publishes under
// "## Lane N" in docs/tracking/local-backend-proof.md (redacted there). Plain Node, no packages:
// it must run when the install itself failed. A step that `uses:` an action keeps no log; it is
// named with its outcome and says so.
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const TAIL_LINES = 20;
const OK = new Set(["success", "skipped"]);

/** The evidence lines for every failed step, in the steps' order. */
export function failedStepLines(stepsJson, logDir) {
  let steps;
  try {
    steps = JSON.parse(stepsJson || "{}");
  } catch {
    return ["Name failed steps: STEPS_JSON unreadable"];
  }
  const out = [];
  for (const [id, step] of Object.entries(steps ?? {})) {
    const outcome = step && typeof step.outcome === "string" ? step.outcome : "unknown";
    if (OK.has(outcome)) continue;
    out.push(`Step ${id}: outcome ${outcome}`);
    const log = join(logDir, `${id}.log`);
    if (!existsSync(log)) {
      out.push(`  (no log kept by step ${id})`);
      continue;
    }
    const lines = readFileSync(log, "utf8").replace(/\n+$/, "").split("\n");
    for (const line of lines.slice(-TAIL_LINES)) out.push(`  ${line.slice(0, 300)}`);
  }
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const lines = failedStepLines(
    process.env.STEPS_JSON ?? "",
    join(process.env.RUNNER_TEMP ?? "/tmp", "step-logs"),
  );
  if (lines.length > 0)
    appendFileSync(process.env.FAILURE_FILE ?? "local-backend-failure.txt", lines.join("\n") + "\n");
  console.log(`Name failed steps: ${lines.filter((l) => l.startsWith("Step ")).length} failed`);
}

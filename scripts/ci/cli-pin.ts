/**
 * INC-1106 (housekeeping turn 3, ruling 2) — THE ONE READER OF THE CLI PIN. The lanes' workflow
 * declares `SUPABASE_CLI_VERSION` once at its top (CF-CI-IMG-5); this module is the one place that
 * knows the line's form. The outbound-calls guard, db-proof.sh (through `bun -e`) and every test that
 * needs the version read it here; CF-CI-IMG-7 refuses a second reader.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const PIN_WORKFLOW = ".github/workflows/local-backend-proof.yml";

/** The pinned CLI version in a workflow's text, or null when the text has no pin line. */
export function cliPin(workflowText: string): string | null {
  return /^ {2}SUPABASE_CLI_VERSION: (\S+)$/m.exec(workflowText)?.[1] ?? null;
}

/** The pinned CLI version read from the lanes' workflow under `root`, or null. */
export function readCliPin(root: string = process.cwd()): string | null {
  return cliPin(readFileSync(join(root, PIN_WORKFLOW), "utf8"));
}

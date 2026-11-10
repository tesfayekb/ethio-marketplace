/**
 * The local checks' cache root: the runner's logs, base builds and pinned tools, and the laws
 * step's Semgrep rules and venv. Never under /tmp, which the machine sweeps (INC-1098).
 * scripts/db-proof.sh :99 spells the same root in shell.
 */
import { homedir } from "node:os";
import { join } from "node:path";

export const CHECKS_CACHE =
  process.env.ETHIO_CHECKS_CACHE ?? join(homedir(), ".cache", "ethio-checks");

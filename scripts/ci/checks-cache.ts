/**
 * The local checks' cache root: the runner's logs, base builds and pinned tools, and the laws
 * step's Semgrep rules and venv. Never under /tmp, which the machine sweeps (INC-1098).
 * scripts/db-proof.sh reads CHECKS_CACHE through `bun -e`; an empty ETHIO_CHECKS_CACHE is unset,
 * as shell's `:-` reads it (CF-DBP-8).
 */
import { homedir } from "node:os";
import { join } from "node:path";

export function checksCacheRoot(value: string | undefined, home: string): string {
  return value || join(home, ".cache", "ethio-checks");
}

export const CHECKS_CACHE = checksCacheRoot(process.env.ETHIO_CHECKS_CACHE, homedir());

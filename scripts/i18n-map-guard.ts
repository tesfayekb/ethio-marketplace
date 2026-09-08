/**
 * IE-3c PART A — THE MAP IS PART OF THE RECIPE (A6 class rule).
 *
 * CI fails a landing whose committed i18n usage maps no longer match the tree.
 * `e2e:local` now runs this guard FIRST, so a stale map fails on the operator's
 * own machine, before the suite spends seven minutes proving something else.
 *
 * The check is drift, not git state: hash both artifacts, regenerate them, hash
 * again. A changed byte means the committed map was stale — it has just been
 * rewritten, and the run stops so the fresh map travels with the change.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAPS = [
  join(ROOT, "docs", "generated", "i18n-usage.json"),
  join(ROOT, "public", "i18n-usage.json"),
];

function digest(path: string): string {
  if (!existsSync(path)) return "missing";
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const before = MAPS.map(digest);
const generated = spawnSync("bun", ["run", join(ROOT, "scripts", "i18n-usage-map.ts")], {
  cwd: ROOT,
  stdio: "inherit",
});
if (generated.status !== 0) {
  console.error("[i18n:map-guard] the usage map generator failed.");
  process.exit(generated.status ?? 1);
}
const after = MAPS.map(digest);

const drifted = MAPS.filter((_path, index) => before[index] !== after[index]);
if (drifted.length > 0) {
  console.error(
    "[i18n:map-guard] the committed usage maps were stale and have been regenerated:\n" +
      drifted.map((path) => `  - ${path.slice(ROOT.length + 1)}`).join("\n") +
      "\nCommit the regenerated maps with this change (A6), then run again.",
  );
  process.exit(1);
}
console.log("[i18n:map-guard] usage maps match the tree.");

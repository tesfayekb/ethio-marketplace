/**
 * Bundle 3 step 23 (DEC-108) — NO ROOT PAGE MAY LOOK LIKE A SELLER NAME.
 *
 * A seller's page will live at ethio.com/<name>. Every first path segment under
 * src/routes must therefore be shorter than five characters, or contain a
 * hyphen, or be a word in scripts/site-words.txt (which the seller-name rules
 * refuse as a name). Pathless layouts (`_x`), `__root`, `index` and README are
 * not segments. A dynamic first segment (`$x`) is refused: it would claim every
 * name before the seller page exists.
 *
 *   bun run scripts/check-root-routes.ts             # checks the tree
 *   bun run scripts/check-root-routes.ts --self-test # checks the fixtures
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** The first URL segment a route file or folder name claims, or null for none. */
export function firstSegment(entry: string): string | null {
  const base = entry.replace(/\.(tsx|ts|jsx|js)$/, "");
  if (base === "__root" || base === "index" || base === "README.md" || base.startsWith("_")) {
    return null;
  }
  const head = base.split(".")[0] ?? "";
  if (head === "" || head === "index") return null;
  return head.replace(/_$/, "");
}

/** Why a segment is refused, or null when it is allowed. */
export function segmentRefusal(segment: string, siteWords: ReadonlySet<string>): string | null {
  if (segment.startsWith("$")) return "dynamic first segment";
  if (segment.length < 5) return null;
  if (segment.includes("-")) return null;
  if (siteWords.has(segment)) return null;
  return "five or more characters, no hyphen, not a site word";
}

function readSiteWords(): Set<string> {
  return new Set(
    readFileSync("scripts/site-words.txt", "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== ""),
  );
}

function check(entries: string[], words: ReadonlySet<string>): string[] {
  const problems: string[] = [];
  for (const entry of entries) {
    const segment = firstSegment(entry);
    if (segment === null) continue;
    const why = segmentRefusal(segment, words);
    if (why !== null) problems.push(`${entry} → /${segment}: ${why}`);
  }
  return problems;
}

function selfTest(): number {
  const words = new Set(["account", "admin", "settings"]);
  const pass = [
    "__root.tsx",
    "index.tsx",
    "README.md",
    "_authenticated",
    "account.tsx",
    "admin.users_.$userId.tsx",
    "auth_.callback.tsx",
    "c.$slug.tsx",
    "post_.$listingId.tsx",
    "api",
    "help-centre.tsx",
  ];
  const fail = ["abebephones.tsx", "selam.tsx", "$name.tsx", "telebirr_.x.tsx"];
  const passProblems = check(pass, words);
  const failProblems = fail.filter((entry) => check([entry], words).length === 0);
  if (passProblems.length > 0 || failProblems.length > 0) {
    console.error("[root-routes] self-test failed", { passProblems, failProblems });
    return 1;
  }
  console.log(`[root-routes] self-test: ${pass.length} allowed, ${fail.length} refused`);
  return 0;
}

function main(): number {
  if (process.argv.includes("--self-test")) return selfTest();
  const entries = readdirSync(join("src", "routes"));
  const problems = check(entries, readSiteWords());
  if (problems.length > 0) {
    for (const line of problems) console.error(`[root-routes] ${line}`);
    return 1;
  }
  console.log(`[root-routes] ${entries.length} entries; every root segment is safe.`);
  return 0;
}

if (import.meta.main) process.exit(main());

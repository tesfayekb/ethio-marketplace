import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import { findingKey, LEVEL_READER_HOMES, levelFindings } from "./listing-levels";

/**
 * P-1b (CF-LEVEL-1) — one level resolver, no baked-in tier: `level_perks_for`
 * in SQL and the one admin reader of the level rows; no module names a level
 * by a literal tier word. Allowances (`reader:<file>` / `tier:<file> | reason |
 * until`) in listing-levels-allowlist.txt; a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "listing-levels-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "listing-levels-"));
  temps.push(root);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

describe("one level resolver (CF-LEVEL-1)", () => {
  it(
    "CFL-1 the tree reads the levels through the resolver and the one admin reader, and names no tier word beyond the allowlist",
    () => {
      const findings = levelFindings(ROOT);
      const allowed = readAllowlist(ALLOWLIST, findings.map(findingKey));
      const unexcused = findings.filter((finding) => !allowed.has(findingKey(finding)));
      expect(
        unexcused.map(
          (finding) => `${finding.file}:${finding.line} ${finding.kind} — ${finding.what}`,
        ),
      ).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("CFL-2 a planted read of either level table, a planted resolver call and a planted tier word are each found; the one reader, a catalog key and the session's tier are not", () => {
    const root = tree({
      "src/features/promote/levels-service.ts": `
export async function levels(client: { from: (t: string) => unknown }) {
  return client.from("listing_packages");
}
export async function perks(client: { from: (t: string) => unknown }) {
  return client.from('level_overrides');
}
`,
      "src/features/promote/use-perks.ts": `
export const call = (rpc: (n: string) => unknown) => rpc("level_perks_for");
`,
      "src/features/promote/tier-words.ts": `
export const paid = (tier: string) => tier === "featured" || tier === 'premium';
export const base = (listing: { tier: string }) => listing.tier === "regular";
export const label = (t: (k: string) => string) => t("tier.premium");
`,
      "src/features/session/policy.ts": `
export type SessionTier = "staff" | "regular";
export const isStaff = (kind: string) => kind !== "regular";
`,
      [LEVEL_READER_HOMES[0] ?? ""]: `
export async function listMonetisation(rpc: (n: string) => unknown) {
  // The console's one read: every row shown as data, none picked.
  return rpc("admin_list_monetisation");
}
export const perks = (rpc: (n: string) => unknown) => rpc("level_perks_for");
`,
    });
    const found = levelFindings(root).map(
      (finding) => `${finding.kind}:${finding.file}:${finding.line}`,
    );
    expect(found).toEqual([
      "reader:src/features/promote/levels-service.ts:3",
      "reader:src/features/promote/levels-service.ts:6",
      "tier:src/features/promote/tier-words.ts:2",
      "tier:src/features/promote/tier-words.ts:3",
      "reader:src/features/promote/use-perks.ts:2",
    ]);
  });

  it("CFL-3 a spec and a test beside a file are not consumers; a comment does not count", () => {
    const root = tree({
      "e2e/levels.spec.ts": `const x = client.from("listing_packages"); const t = "featured";`,
      "src/features/promote/levels-service.test.ts": `const y = rpc("level_perks_for");`,
      "src/features/promote/notes.ts": `
// the resolver is level_perks_for; a screen never reads level_overrides
/* 'featured' and 'premium' are rows, not words */
export const hint = 1;
`,
    });
    expect(levelFindings(root)).toEqual([]);
  });
});

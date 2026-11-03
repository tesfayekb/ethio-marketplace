import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import { findingKey, priceFindings, PRICE_READER_HOMES } from "./package-price";

/**
 * P-1 (CF-PRICE-1), extended by P-1b — one price resolver: `product_price_for`
 * (and its wrapper `package_price_for`) in SQL and the one admin reader of the
 * price rows (`admin_list_monetisation` through the monetisation service); no
 * screen computes a price or a credit cost. Allowances
 * (`reader:<file>` / `arithmetic:<file> | reason | until`) in
 * package-price-allowlist.txt; a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "package-price-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "package-price-"));
  temps.push(root);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

describe("one price resolver (CF-PRICE-1)", () => {
  it(
    "CFP-1 the tree reads prices through the resolver and the one admin reader, and computes none",
    () => {
      const findings = priceFindings(ROOT);
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

  it("CFP-2 a planted read of package_prices, a planted call of either resolver or of the console rpc, and a planted computation on an amount or a credit cost are each found; the one reader, a shown amount, a shown credit cost and an ad's own price are not", () => {
    const root = tree({
      "src/features/promote/promote-service.ts": `
export async function price(client: { from: (t: string) => unknown }) {
  return client.from("package_prices");
}
`,
      "src/features/promote/use-price.ts": `
export const call = (rpc: (n: string) => unknown) => rpc("package_price_for");
export const core = (rpc: (n: string) => unknown) => rpc("product_price_for");
export const console = (rpc: (n: string) => unknown) => rpc("admin_list_monetisation");
`,
      "src/features/promote/discount.ts": `
import type { PriceRow } from "@/features/admin-monetisation/monetisation-service";
export function discounted(row: PriceRow) {
  return row.amount * 0.9;
}
export function taxed(amount: number) {
  return 1.15 * amount;
}
export function doubled(row: PriceRow) {
  return row.creditCost * 2;
}
`,
      "src/features/ad-page/asking.ts": `
export function asking(listing: { amount: number }) {
  return listing.amount * 2;
}
`,
      [PRICE_READER_HOMES[0] ?? ""]: `
export async function listMonetisation(rpc: (n: string) => unknown) {
  // The console's one read: every row shown as data, none picked.
  return rpc("admin_list_monetisation");
}
`,
      "src/features/promote/shown.tsx": `
import type { PriceRow } from "@/features/admin-monetisation/monetisation-service";
export const label = (row: PriceRow) => (row.amount === 0 ? "free" : String(row.amount));
export const credits = (row: PriceRow) => String(row.creditCost);
export const id = (row: PriceRow) => \`price-\${row.id}-amount\`;
`,
    });
    const found = priceFindings(root).map(
      (finding) => `${finding.kind}:${finding.file}:${finding.line}`,
    );
    expect(found).toEqual([
      "arithmetic:src/features/promote/discount.ts:4",
      "arithmetic:src/features/promote/discount.ts:7",
      "arithmetic:src/features/promote/discount.ts:10",
      "reader:src/features/promote/promote-service.ts:3",
      "reader:src/features/promote/use-price.ts:2",
      "reader:src/features/promote/use-price.ts:3",
      "reader:src/features/promote/use-price.ts:4",
    ]);
  });

  it("CFP-3 a spec and a test beside a file are not consumers; a comment does not count", () => {
    const root = tree({
      "e2e/promote.spec.ts": `const x = client.from("package_prices");`,
      "src/features/promote/promote-service.test.ts": `const y = row.amount * 2;`,
      "src/features/promote/notes.ts": `
// the resolver is package_price_for; a screen never reads package_prices
/* amount * days is the resolver's */
export const hint = 1;
`,
    });
    expect(priceFindings(root)).toEqual([]);
  });
});

import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

import { codeOf, walkFiles } from "./kit";

/**
 * P-1 (CF-PRICE-1) — ONE PRICE RESOLVER. An ad's package price is only ever the
 * SQL `package_price_for(listing, package)`; the browser never reads the price
 * rows to pick one and never computes a price. The census, over `src/`,
 * `e2e/helpers/` and `scripts/` (specs are the harness's own reads, excepted by
 * rule; tests beside a file are not consumers):
 *
 *  - `reader`: a `package_prices` table read (`.from("package_prices")`) or a
 *    `package_price_for` call anywhere but the one admin reader
 *    (`src/features/admin-packages/packages-service.ts`, which lists a package's
 *    rows for the console and picks none);
 *  - `arithmetic`: in a file that handles package prices (it names
 *    `package_prices`, `package_price_for`, `PriceRow` or the packages seam),
 *    `amount` as an operand of `+ - * / %` (prettier's spacing) — a screen shows
 *    the stored amount as data; a computed price is the resolver's alone. An
 *    ad's own asking price (`listings.amount`) is another concern and not read.
 *
 * The generated client types (src/integrations/supabase/**) name every function
 * and are not a consumer.
 *
 * Allowances live in package-price-allowlist.txt (`key | reason | until`).
 */

export const PRICE_READER_HOMES: readonly string[] = [
  "src/features/admin-packages/packages-service.ts",
];

export type PriceFinding = {
  file: string;
  line: number;
  kind: "reader" | "arithmetic";
  what: string;
};

const READ_FORMS = [/\.from\(\s*["'`]package_prices["'`]\s*\)/, /\bpackage_price_for\b/] as const;

/** A file that handles package prices: only there is `amount` a package price. */
const TOUCHES_PACKAGE_PRICES = /package_prices|package_price_for|\bPriceRow\b|packages-service/;

/** `amount` (or `x.amount`) beside a spaced arithmetic operator (prettier's form). */
const ARITHMETIC_FORMS = [/\bamount\b\s+[-+*/%]\s+/, /\s[-+*/%]\s+(?:\w+\.)?\bamount\b/] as const;

export function priceFindingsIn(root: string, file: string): PriceFinding[] {
  const rel = relative(root, file).split("\\").join("/");
  const code = codeOf(readFileSync(file, "utf8"));
  const handlesPrices = TOUCHES_PACKAGE_PRICES.test(code);
  const lines = code.split("\n");
  const findings: PriceFinding[] = [];
  lines.forEach((text, index) => {
    const line = index + 1;
    if (!PRICE_READER_HOMES.includes(rel) && READ_FORMS.some((form) => form.test(text))) {
      findings.push({
        file: rel,
        line,
        kind: "reader",
        what: "reads package_prices or calls package_price_for outside the one reader",
      });
    }
    if (handlesPrices && ARITHMETIC_FORMS.some((form) => form.test(text))) {
      findings.push({
        file: rel,
        line,
        kind: "arithmetic",
        what: "computes with a price amount; a price is the resolver's alone",
      });
    }
  });
  return findings;
}

export function priceFindings(root: string): PriceFinding[] {
  const roots = [join(root, "src"), join(root, "e2e", "helpers"), join(root, "scripts")].filter(
    (dir) => existsSync(dir),
  );
  const files = walkFiles(roots, {
    ext: ["ts", "tsx", "mjs"],
    skipTests: true,
    skip: /scripts[\\/]conformance[\\/]package-price|src[\\/]integrations[\\/]supabase[\\/]/,
  });
  return files.flatMap((file) => priceFindingsIn(root, file));
}

export function findingKey(finding: PriceFinding): string {
  return `${finding.kind}:${finding.file}`;
}

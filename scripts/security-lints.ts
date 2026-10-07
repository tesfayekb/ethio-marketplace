/**
 * Bundle 7 ES7 — the nightly database lints (DEC-132 layer B, option ii;
 * DEC-148 — the rule was frozen before the numbers existed).
 *
 * Reads the five counts of public.security_lints() from ethio-staging through
 * the service-role REST the global setup already uses (E2E_SUPABASE_URL,
 * E2E_SUPABASE_SERVICE_ROLE_KEY), prints `name level count` lines and compares
 * them with scripts/security-lints-baseline.json:
 *   - an ERROR-class count above its baseline fails (exit 1);
 *   - a WARN-class count above its baseline prints one warning, does not fail;
 *   - a count below its baseline prints "baseline can be lowered", does not fail;
 *   - a name missing from either side is an error — never read as zero.
 * Counts only: no object name ever reaches the log (DEC-132 rule 2).
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export type LintLevel = "ERROR" | "WARN";

export interface LintCount {
  name: string;
  level: LintLevel;
  count: number;
}

export type Baseline = Record<string, number>;

export interface Verdict {
  lines: string[];
  failed: boolean;
}

const PROD_REF = "zwmvxvzzvjvtdcfcwiuf";

/** The pure comparison (unit-tested). */
export function compareLints(current: LintCount[], baseline: Baseline): Verdict {
  const lines: string[] = [];
  let failed = false;
  const seen = new Set<string>();

  for (const lint of current) {
    seen.add(lint.name);
    lines.push(`${lint.name} ${lint.level} ${lint.count}`);
    const base = baseline[lint.name];
    if (base === undefined) {
      lines.push(`::error::${lint.name}: no baseline for this name`);
      failed = true;
      continue;
    }
    if (!Number.isInteger(lint.count) || lint.count < 0) {
      lines.push(`::error::${lint.name}: the count could not be read`);
      failed = true;
      continue;
    }
    if (lint.count > base) {
      if (lint.level === "ERROR") {
        lines.push(`::error::${lint.name} ${lint.count} is above its baseline ${base}`);
        failed = true;
      } else {
        lines.push(`::warning::${lint.name} ${lint.count} is above its baseline ${base}`);
      }
    } else if (lint.count < base) {
      lines.push(`${lint.name}: baseline can be lowered (${base} → ${lint.count})`);
    }
  }

  for (const name of Object.keys(baseline)) {
    if (!seen.has(name)) {
      lines.push(`::error::${name}: missing from the database's answer`);
      failed = true;
    }
  }

  return { lines, failed };
}

/** Reads the answer as the door returns it; anything malformed is refused. */
export function parseLints(raw: unknown): LintCount[] {
  if (!Array.isArray(raw)) throw new Error("security_lints() did not answer an array");
  return raw.map((entry: unknown) => {
    const row = entry as { name?: unknown; level?: unknown; count?: unknown };
    if (typeof row.name !== "string" || (row.level !== "ERROR" && row.level !== "WARN")) {
      throw new Error("security_lints() answered an entry without a name or level");
    }
    return { name: row.name, level: row.level, count: Number(row.count) };
  });
}

async function main(): Promise<number> {
  const url = process.env["E2E_SUPABASE_URL"] ?? "";
  const key = process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"] ?? "";
  if (url === "" || key === "") {
    console.error("::error::E2E_SUPABASE_URL and E2E_SUPABASE_SERVICE_ROLE_KEY must be set.");
    return 1;
  }
  if (url.includes(PROD_REF)) {
    console.error("::error::Refusing to read lints from ethio-prod; point at staging.");
    return 1;
  }
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/security_lints`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: "{}",
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(`::error::security_lints() answered HTTP ${response.status}`);
    return 1;
  }
  const current = parseLints(await response.json());
  const here = dirname(fileURLToPath(import.meta.url));
  const baseline = JSON.parse(
    readFileSync(join(here, "security-lints-baseline.json"), "utf8"),
  ) as Baseline;
  const verdict = compareLints(current, baseline);
  for (const line of verdict.lines) console.log(line);
  return verdict.failed ? 1 : 0;
}

if (process.argv[1] && process.argv[1].includes("security-lints")) {
  main()
    .then((code) => process.exit(code))
    .catch((err: unknown) => {
      console.error(`::error::${err instanceof Error ? err.message : String(err)}`);
      process.exit(1);
    });
}

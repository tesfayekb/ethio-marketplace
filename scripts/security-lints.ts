/**
 * Bundle 7 ES7 — the nightly database lints (DEC-132 layer B, option ii;
 * DEC-148 — the rule was frozen before the numbers existed).
 *
 * DEC-240: reads counts through REST or --tsv from CI's temporary backend.
 * Reads the five counts of public.security_lints() from ethio-staging through
 * the service-role REST the global setup already uses (E2E_SUPABASE_URL,
 * E2E_SUPABASE_SERVICE_ROLE_KEY), prints `name level count` lines and compares
 * them with scripts/security-lints-baseline.json:
 *   - an ERROR-class count above its baseline fails (exit 1);
 *   - a WARN-class count above its baseline prints one warning, does not fail;
 *   - a count below its baseline prints "baseline can be lowered", does not fail;
 *   - a name missing from either side is an error — never read as zero.
 * DEC-310: anon execute is compared by name to the one public-surface list,
 * not a count baseline. Unlisted findings print counts and a read-only query
 * only; stale names already on the public list may be printed (DEC-132).
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { errorText } from "../src/lib/error-text";
import { coversRole, parseSurface, type SurfaceEntry } from "./public-surface";

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

/** Live catalogue distinguishes functions from tables and columns; extensions excluded. */
export const SURFACE_QUERY = `select p.proname as name, 'function' as kind,
has_function_privilege('anon', p.oid, 'EXECUTE')::text as anon
from pg_proc p where p.pronamespace = 'public'::regnamespace
and not exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e')
union all select c.relname, 'relation', 'false' from pg_class c where c.relnamespace = 'public'::regnamespace
union all select c.relname || '.' || a.attname, 'column', 'false' from pg_attribute a join pg_class c on c.oid = a.attrelid
where c.relnamespace = 'public'::regnamespace and a.attnum > 0 and not a.attisdropped order by 1, 2;`;

export interface SurfaceObject {
  name: string;
  kind: "function" | "relation" | "column";
  anon: boolean;
}

export function parseSurfaceTsv(text: string): SurfaceObject[] {
  if (!text.trim()) throw new Error("public surface: empty catalogue answer");
  return text
    .trimEnd()
    .split(/\r?\n/)
    .map((line) => {
      const [name, kind, anon, extra] = line.split("\t");
      if (
        !name ||
        (kind !== "function" && kind !== "relation" && kind !== "column") ||
        (anon !== "true" && anon !== "false" && anon !== "t" && anon !== "f") ||
        extra !== undefined
      )
        throw new Error("public surface: malformed catalogue row");
      return { name, kind, anon: anon === "true" || anon === "t" };
    });
}

/** No unlisted name, hash or artifact is emitted. PUBLIC covers anon by inheritance. */
export function compareSurface(current: SurfaceObject[], entries: SurfaceEntry[]): Verdict {
  const unlisted = new Set(
    current
      .filter(
        (row) =>
          row.kind === "function" &&
          row.anon &&
          !entries.some((entry) => entry.name === row.name && coversRole(entry, "anon")),
      )
      .map((row) => row.name),
  );
  const live = new Set(current.map((row) => row.name));
  const stale = [
    ...new Set(entries.filter((entry) => !live.has(entry.name)).map((entry) => entry.name)),
  ];
  const lines = [
    `public surface: ${unlisted.size} unlisted anon functions; ${stale.length} stale lines`,
  ];
  if (unlisted.size > 0) {
    lines.push(`::error::public surface: ${unlisted.size} unlisted anon functions`);
    lines.push(
      `Read-only catalogue query (compare anon=true function rows with the allowlist): ${SURFACE_QUERY}`,
    );
  }
  for (const name of stale) lines.push(`::error::public surface: stale line ${name}`);
  return { lines, failed: unlisted.size > 0 || stale.length > 0 };
}

const PROD_REF = "zwmvxvzzvjvtdcfcwiuf";

/** The pure comparison (unit-tested). */
export function compareLints(current: LintCount[], baseline: Baseline): Verdict {
  const lines: string[] = [];
  let failed = false;
  const seen = new Set<string>();

  for (const lint of current) {
    // The database still returns this count; DEC-310 replaces its baseline only.
    if (lint.name === "function_executable_by_anon") continue;
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
    if (!entry || typeof entry !== "object")
      throw new Error("security_lints() answered a malformed entry");
    const row = entry as { name?: unknown; level?: unknown; count?: unknown };
    if (typeof row.name !== "string" || (row.level !== "ERROR" && row.level !== "WARN")) {
      throw new Error("security_lints() answered an entry without a name or level");
    }
    const count =
      typeof row.count === "number"
        ? row.count
        : typeof row.count === "string" && /^\d+$/.test(row.count)
          ? Number(row.count)
          : Number.NaN;
    if (!Number.isSafeInteger(count) || count < 0)
      throw new Error("security_lints() answered a non-integer count");
    return { name: row.name, level: row.level, count };
  });
}

/** psql -At -F tab output follows the same validation as REST. */
export function parseLintTsv(text: string): LintCount[] {
  const lines = text.replace(/\r?\n$/, "").split(/\r?\n/);
  return parseLints(
    lines.map((line) => {
      const parts = line.split("\t");
      if (parts.length !== 3) throw new Error("security_lints() answered a malformed TSV row");
      const [name, level, count] = parts;
      return { name, level, count };
    }),
  );
}

async function main(): Promise<number> {
  let current: LintCount[];
  let surface: SurfaceObject[] | undefined;
  if (process.argv[2] === "--tsv") {
    const path = process.argv[3];
    const surfacePath = process.argv[4];
    if (!path || !surfacePath || process.argv.length !== 5)
      throw new Error("--tsv requires lint and catalogue paths");
    current = parseLintTsv(readFileSync(path, "utf8"));
    surface = parseSurfaceTsv(readFileSync(surfacePath, "utf8"));
  } else {
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
    current = parseLints(await response.json());
  }
  const here = dirname(fileURLToPath(import.meta.url));
  const baseline = JSON.parse(
    readFileSync(join(here, "security-lints-baseline.json"), "utf8"),
  ) as Baseline;
  const verdict = compareLints(current, baseline);
  if (surface) {
    const surfaceVerdict = compareSurface(
      surface,
      parseSurface(readFileSync(join(here, "public-surface-allowlist.txt"), "utf8")),
    );
    verdict.lines.push(...surfaceVerdict.lines);
    verdict.failed ||= surfaceVerdict.failed;
  } else {
    verdict.lines.push(
      "public surface: NOT RUN — nightly REST has no live catalogue; smoke --tsv is the DEC-310 caller",
    );
  }
  for (const line of verdict.lines) console.log(line);
  return verdict.failed ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  (process.argv[2] === "--surface-query"
    ? Promise.resolve().then(() => {
        console.log(SURFACE_QUERY);
        return 0;
      })
    : main()
  )
    .then((code) => process.exit(code))
    .catch((err: unknown) => {
      console.error(`::error::${errorText(err)}`);
      process.exit(1);
    });
}

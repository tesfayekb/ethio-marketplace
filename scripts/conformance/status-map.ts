import { readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { walkFiles } from "./kit";
import { sqlCodeOf } from "./perm-vocabulary";
import { lastDeclarations, type LastDeclaration } from "./plan-seam";

/**
 * P-2 (a) (CF-STATUS-1, INC-1057, ruling 10 H4) — EVERY STATUS AN AD CAN HOLD
 * HAS ITS PLACE IN THE TWO READERS THAT GROUP ADS BY STATUS. `listings_status_check`
 * is the one list of statuses; My listings groups them through the one mapper
 * `listing_group_of(text)` (a CASE whose ELSE raises), and the admin's console
 * through `admin_list_listings`' view arrays (`WHEN 'all' THEN ARRAY[…]`). A
 * status the mapper's CASE does not name would raise for every seller holding
 * such an ad; one the admin's arrays do not name is an ad no view lists — both
 * silent until a person is hurt (INC-1057: 'paused' landed with neither).
 *
 * The census reads the migrations in order: the LAST `ADD CONSTRAINT
 * listings_status_check CHECK (status IN (…))` gives the statuses; plan-seam's
 * last declarations give the two bodies (comments blanked, DO blocks removed).
 * Findings, keyed `<fn>:<status>`:
 *   - `listing_group_of:<status>` — a status with no `WHEN '<status>' THEN` in the
 *     mapper's body, or a `WHEN` literal that is no status (a typo maps nothing);
 *   - `admin_list_listings:<status>` — a status named by no `ARRAY[…]` of the body
 *     and not excluded by name there (`l.status <> '<status>'` — the drafts' line:
 *     a draft is the seller's own and is shown to no one else), or an ARRAY
 *     literal that is no status.
 * A reader absent from the tree is a finding of its own (`<fn>:missing`).
 * Allowances in status-map-allowlist.txt (`key | reason | until`); the census
 * found none at landing.
 */

export const STATUS_READERS = ["listing_group_of", "admin_list_listings"] as const;
export type StatusReader = (typeof STATUS_READERS)[number];

export type StatusMapFinding = {
  fn: StatusReader;
  /** The status (or `missing` when the reader has no declaration). */
  status: string;
  /** The migration (root-relative) holding the reader's last declaration, or the check's. */
  file: string;
  line: number;
  what: "unmapped" | "unknown" | "missing";
};

export function findingKey(finding: StatusMapFinding): string {
  return `${finding.fn}:${finding.status}`;
}

const STATUS_CHECK =
  /\bADD\s+CONSTRAINT\s+listings_status_check\s+CHECK\s*\(\s*status\s+IN\s*\(([^)]*)\)/gi;
const LITERAL = /'([a-z_]+)'/g;
const WHEN_LITERAL = /\bWHEN\s+'([a-z_]+)'\s+THEN\b/gi;
const ARRAY_LITERALS = /\bARRAY\s*\[([^\]]*)\]/gi;
const EXCLUDED_BY_NAME = /\bstatus\s*<>\s*'([a-z_]+)'/gi;

function literalsOf(text: string): string[] {
  return Array.from(text.matchAll(LITERAL), (match) => match[1] ?? "");
}

export type StatusCheck = { statuses: string[]; file: string; line: number };

/** The statuses of the LAST `listings_status_check` declared across the migrations, in file order. */
export function statusCheckOf(root: string): StatusCheck | undefined {
  let found: StatusCheck | undefined;
  const files = walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] });
  for (const file of files) {
    const code = sqlCodeOf(readFileSync(file, "utf8"));
    for (const match of code.matchAll(STATUS_CHECK)) {
      const line = code.slice(0, match.index ?? 0).split("\n").length;
      found = {
        statuses: literalsOf(match[1] ?? ""),
        file: file
          .slice(root.length + 1)
          .split("\\")
          .join("/"),
        line,
      };
    }
  }
  return found;
}

/** The statuses the mapper's CASE names (`WHEN '<status>' THEN`). */
export function mappedStatusesOf(body: string): string[] {
  return Array.from(body.matchAll(WHEN_LITERAL), (match) => match[1] ?? "");
}

/** The statuses the admin reader's views name (every `ARRAY[…]` literal), and those it excludes by name. */
export function viewStatusesOf(body: string): { named: string[]; excluded: string[] } {
  const named: string[] = [];
  for (const match of body.matchAll(ARRAY_LITERALS)) named.push(...literalsOf(match[1] ?? ""));
  const excluded = Array.from(body.matchAll(EXCLUDED_BY_NAME), (match) => match[1] ?? "");
  return { named, excluded };
}

/** The findings of a tree: the check's statuses against the two readers' last declarations. */
export function statusMapFindings(
  root: string,
  last: Map<string, LastDeclaration> = lastDeclarations(root),
): StatusMapFinding[] {
  const check = statusCheckOf(root);
  if (check === undefined) return [];
  const statuses = new Set(check.statuses);
  const findings: StatusMapFinding[] = [];
  const judge = (fn: StatusReader, named: string[], excluded: string[]) => {
    const declaration = last.get(fn);
    if (declaration === undefined) {
      findings.push({ fn, status: "missing", file: check.file, line: check.line, what: "missing" });
      return;
    }
    const covered = new Set([...named, ...excluded]);
    for (const status of check.statuses) {
      if (!covered.has(status))
        findings.push({
          fn,
          status,
          file: declaration.file,
          line: declaration.line,
          what: "unmapped",
        });
    }
    for (const literal of new Set(named)) {
      if (!statuses.has(literal))
        findings.push({
          fn,
          status: literal,
          file: declaration.file,
          line: declaration.line,
          what: "unknown",
        });
    }
  };
  const mapper = last.get("listing_group_of");
  judge("listing_group_of", mapper === undefined ? [] : mappedStatusesOf(mapper.body), []);
  const admin = last.get("admin_list_listings");
  const views = admin === undefined ? { named: [], excluded: [] } : viewStatusesOf(admin.body);
  judge("admin_list_listings", views.named, views.excluded);
  return findings;
}

export function describeFinding(finding: StatusMapFinding): string {
  const where = `${basename(finding.file)}:${finding.line}`;
  switch (finding.what) {
    case "missing":
      return `${where} ${finding.fn} has no declaration in the tree`;
    case "unknown":
      return `${where} ${finding.fn} names '${finding.status}', which listings_status_check does not`;
    default:
      return `${where} ${finding.fn} gives '${finding.status}' no place`;
  }
}

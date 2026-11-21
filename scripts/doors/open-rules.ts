import { flaggedPattern } from "../lib/pattern";
import type { ComputedOpenRule, OpenRule } from "./policies";

/**
 * Cursor bundle 1, item 6 (INC-1166, second half; ruling 1 answer 4, ruling 2 answer 3) — EVERY READ
 * RULE THAT ADMITS EVERYONE IS A DECISION SOMEBODY WROTE DOWN. An open rule is a standing policy whose
 * text holds `USING (true)` or `WITH CHECK (true)` (policies.ts `openRulesOf`, over the migration
 * reader). scripts/doors/open-rules.txt lists each, one line:
 *
 *   <table> <policy> | <command> to <roles> | grants <role>:<privilege>[(<columns>)] … or none | <reason>
 *
 * - `<table> <policy>` — the policy as the migrations name it. `(computed)` stands for a policy built
 *   by dynamic SQL, which the reader cannot name: the line names the table, and the statement's text
 *   must name the same table (`ON public.<table>`).
 * - `<command> to <roles>` — the policy's FOR (ALL when it names none) and TO roles, lower-case,
 *   sorted, comma-joined (`public` when it names none).
 * - `grants …` — the browser roles' privileges on the table as the LIVE catalogue holds them
 *   (live-open-rules.sql): `anon` then `authenticated`, each privilege alphabetical, a privilege held
 *   by column alone with its columns in parentheses, comma-joined and sorted (a table-level privilege
 *   has none); `none` when neither role holds any. The static run judges the field's form; the smoke
 *   lane's live run judges its content (`open-rule-grants`).
 * - `<reason>` — why everyone may read it; free text without `|`.
 *
 * Four finding kinds, each planted in check-doors' self-test (DEC-334): `open-rule-undeclared` (a
 * standing open rule with no line, or whose command or roles differ from its line, or a malformed
 * line), `open-rule-gone` (a line whose policy no longer stands), `open-rule-computed` (an open
 * policy built by dynamic SQL that no `(computed)` line names) and `open-rule-grants` (live: a
 * line's grants differ from the catalogue's).
 */

export const OPEN_RULE_KINDS = [
  "open-rule-undeclared",
  "open-rule-gone",
  "open-rule-computed",
  "open-rule-grants",
] as const;
export type OpenRuleKind = (typeof OPEN_RULE_KINDS)[number];
export type OpenRuleFinding = { kind: OpenRuleKind; key: string; what: string; where: string };

export const COMPUTED_POLICY = "(computed)";
const BROWSER_ROLES = ["anon", "authenticated"] as const;
const PRIVILEGES = [
  "DELETE",
  "INSERT",
  "REFERENCES",
  "SELECT",
  "TRIGGER",
  "TRUNCATE",
  "UPDATE",
] as const;
const COLUMN_PRIVILEGES: readonly string[] = ["INSERT", "REFERENCES", "SELECT", "UPDATE"];
const COMMANDS = ["ALL", "DELETE", "INSERT", "SELECT", "UPDATE"];
const IDENT = /^[a-z_][a-z0-9_]*$/;
const GRANT_ENTRY = /^(anon|authenticated):([A-Z]+)(?:\(([a-z0-9_,]+)\))?$/;

export type OpenRuleLine = {
  table: string;
  policy: string;
  command: string;
  roles: string;
  /** The canonical grants field (`none` or the entries joined by a space). */
  grants: string;
  reason: string;
  line: number;
};
export type OpenRulesFile = {
  lines: Map<string, OpenRuleLine>;
  errors: Array<{ line: number; what: string }>;
};

/** A grants field in canonical form, or the reason it is not one. */
function grantsError(field: string): string | null {
  if (field === "none") return null;
  const entries = field.split(" ");
  const keys: string[] = [];
  for (const entry of entries) {
    const match = GRANT_ENTRY.exec(entry);
    if (match === null)
      return `grants entry ${entry} is not role:PRIVILEGE or role:PRIVILEGE(columns)`;
    const [, role = "", privilege = "", columns] = match;
    if (!(PRIVILEGES as readonly string[]).includes(privilege))
      return `grants entry ${entry} names an unknown privilege`;
    if (columns !== undefined) {
      if (!COLUMN_PRIVILEGES.includes(privilege))
        return `grants entry ${entry}: ${privilege} has no column form`;
      const names = columns.split(",");
      if (
        names.some((name) => !IDENT.test(name)) ||
        names.join(",") !== [...new Set(names)].sort().join(",")
      )
        return `grants entry ${entry}: columns are not unique, sorted identifiers`;
    }
    keys.push(`${role} ${privilege}`);
  }
  const order = keys.map((key) => {
    const [role = "", privilege = ""] = key.split(" ");
    return `${BROWSER_ROLES.indexOf(role as (typeof BROWSER_ROLES)[number])} ${PRIVILEGES.indexOf(privilege as (typeof PRIVILEGES)[number])}`;
  });
  const sorted = [...order].sort((a, b) => {
    const [ar = 0, ap = 0] = a.split(" ").map(Number);
    const [br = 0, bp = 0] = b.split(" ").map(Number);
    return ar - br || ap - bp;
  });
  if (order.join("|") !== sorted.join("|") || new Set(keys).size !== keys.length)
    return "grants entries are not unique, anon before authenticated, each privilege alphabetical";
  return null;
}

/** The lines of open-rules.txt; a malformed line is an error, never a skipped rule. */
export function parseOpenRules(text: string): OpenRulesFile {
  const file: OpenRulesFile = { lines: new Map(), errors: [] };
  text.split("\n").forEach((raw, index) => {
    const line = index + 1;
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed.startsWith("#")) return;
    const fail = (what: string) => file.errors.push({ line, what });
    const cells = trimmed.split(" | ").map((cell) => cell.trim());
    if (cells.length !== 4 || cells.some((cell) => cell === "")) {
      fail("expected `table policy | command to roles | grants … | reason`");
      return;
    }
    const [subject = "", rule = "", grantsCell = "", reason = ""] = cells;
    const [table = "", policy = "", ...extra] = subject.split(" ");
    if (!IDENT.test(table) || policy === "" || extra.length > 0) {
      fail(`malformed subject ${subject}`);
      return;
    }
    if (policy !== COMPUTED_POLICY && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(policy)) {
      fail(`malformed policy name ${policy}`);
      return;
    }
    const ruleMatch = /^([A-Z]+) to ([a-z_,]+)$/.exec(rule);
    const command = ruleMatch?.[1] ?? "";
    const roles = ruleMatch?.[2] ?? "";
    if (
      ruleMatch === null ||
      !COMMANDS.includes(command) ||
      roles.split(",").some((role) => !IDENT.test(role)) ||
      roles !== [...new Set(roles.split(","))].sort().join(",")
    ) {
      fail(`malformed rule ${rule}: expected COMMAND to role,role (roles sorted)`);
      return;
    }
    if (!grantsCell.startsWith("grants ")) {
      fail(`malformed grants cell ${grantsCell}`);
      return;
    }
    const grants = grantsCell.slice("grants ".length);
    const bad = grantsError(grants);
    if (bad !== null) {
      fail(bad);
      return;
    }
    if (reason.includes("|")) {
      fail("the reason holds no `|`");
      return;
    }
    const key = `${table} ${policy}`;
    if (file.lines.has(key)) {
      fail(`duplicate line ${key}`);
      return;
    }
    file.lines.set(key, { table, policy, command, roles, grants, reason, line });
  });
  return file;
}

/** The live grants of a live-open-rules.sql answer, by table, as canonical grants fields. */
export function liveGrants(tsv: string): Map<string, string> {
  const rows = new Map<string, Map<string, string>>();
  tsv
    .split("\n")
    .filter((row) => row.trim() !== "")
    .forEach((row, index) => {
      const cells = row.split("\t");
      const [table = "", role = "", privilege = "", columns = ""] = cells;
      if (
        cells.length !== 4 ||
        !IDENT.test(table) ||
        !(BROWSER_ROLES as readonly string[]).includes(role) ||
        !(PRIVILEGES as readonly string[]).includes(privilege) ||
        columns === "" ||
        (columns !== "*" && columns.split(",").some((name) => !IDENT.test(name)))
      )
        throw new Error(`live-open-rules row ${String(index + 1)} is malformed: ${row}`);
      const held = rows.get(table) ?? new Map<string, string>();
      held.set(`${role} ${privilege}`, columns);
      rows.set(table, held);
    });
  const answer = new Map<string, string>();
  for (const [table, held] of rows) {
    const entries: string[] = [];
    for (const role of BROWSER_ROLES)
      for (const privilege of PRIVILEGES) {
        const columns = held.get(`${role} ${privilege}`);
        if (columns === undefined) continue;
        entries.push(`${role}:${privilege}${columns === "*" ? "" : `(${columns})`}`);
      }
    answer.set(table, entries.join(" "));
  }
  return answer;
}

export type OpenRuleEvidence = {
  /** The open rules standing after the migrations (policies.ts). */
  standing: OpenRule[];
  /** The open policy statements the reader cannot name (policies.ts). */
  computed: ComputedOpenRule[];
  /** open-rules.txt, parsed. */
  file: OpenRulesFile;
  /** The live grants by table (live only); a table absent from the map holds none. */
  live?: Map<string, string>;
};

const FILE = "scripts/doors/open-rules.txt";

/** Every finding of the open rules against their file (and, live, against the catalogue's grants). */
export function openRuleFindings(evidence: OpenRuleEvidence): OpenRuleFinding[] {
  const found: OpenRuleFinding[] = [];
  const { standing, computed, file } = evidence;
  for (const error of file.errors)
    found.push({
      kind: "open-rule-undeclared",
      key: `open-rules.txt:${String(error.line)}`,
      what: `malformed line: ${error.what}`,
      where: `${FILE}:${String(error.line)}`,
    });
  const standsAs = new Map(standing.map((rule) => [`${rule.table} ${rule.policy}`, rule]));
  for (const rule of standing) {
    const key = `${rule.table} ${rule.policy}`;
    const line = file.lines.get(key);
    if (line === undefined) {
      found.push({
        kind: "open-rule-undeclared",
        key,
        what: `an open rule (${rule.command} to ${rule.roles}) with no line in open-rules.txt`,
        where: rule.file,
      });
      continue;
    }
    if (line.command !== rule.command || line.roles !== rule.roles)
      found.push({
        kind: "open-rule-undeclared",
        key,
        what: `the policy is ${rule.command} to ${rule.roles}; its line says ${line.command} to ${line.roles}`,
        where: `${FILE}:${String(line.line)}`,
      });
  }
  const cleared = new Set<string>();
  for (const open of computed) {
    const named = [...file.lines.values()].find(
      (line) =>
        line.policy === COMPUTED_POLICY &&
        flaggedPattern("i")`\\bON\\s+(?:public\\.)?"?${line.table}"?\\b`.test(open.text),
    );
    if (named !== undefined) {
      cleared.add(`${named.table} ${named.policy}`);
      continue;
    }
    found.push({
      kind: "open-rule-computed",
      key: `${open.file}:${String(open.line)}`,
      what: "an open policy built by dynamic SQL, which the reader cannot name, and no (computed) line names its table",
      where: `${open.file}:${String(open.line)}`,
    });
  }
  for (const line of file.lines.values()) {
    const key = `${line.table} ${line.policy}`;
    const stands = line.policy === COMPUTED_POLICY ? cleared.has(key) : standsAs.has(key);
    if (!stands)
      found.push({
        kind: "open-rule-gone",
        key,
        what: "a line whose policy no longer stands as an open rule",
        where: `${FILE}:${String(line.line)}`,
      });
    else if (evidence.live !== undefined) {
      const live = evidence.live.get(line.table) ?? "none";
      if (live !== line.grants)
        found.push({
          kind: "open-rule-grants",
          key,
          what: `the line says grants ${line.grants}; the live catalogue says ${live}`,
          where: `${FILE}:${String(line.line)}`,
        });
    }
  }
  return found;
}

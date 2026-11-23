import type { RoleRule } from "./policies";

/**
 * Cursor bundle 4 (INC-1242; ruling 1 decision 19) — A ROLE RULE ON A TABLE IS A DOOR BYPASS. A role
 * rule is a standing policy whose text calls `has_permission(`, `has_permission_scoped(` or `is_super_admin(`
 * (policies.ts `roleRulesOf`, over the migration reader): a holder of the permission reads or writes the table
 * straight, past what a door owes — the caller check, the deactivation test, the country reach. Three laws:
 *
 * - a role rule on a table of schema `public` FAILS outright, and no line can declare it
 *   (`staff-rule-on-table`);
 * - a role rule elsewhere (the storage schema's bucket rules) stands only as a declared line of
 *   scripts/doors/staff-rules.txt (`staff-rule-undeclared`), one line:
 *
 *     <schema.table> <policy> | <command> to <roles> | reader <file:line> | <reason>
 *
 *   `<command> to <roles>` is the policy's FOR (ALL when it names none) and TO roles, lower-case, sorted,
 *   comma-joined (`public` when it names none); `reader` names the file and line of the browser code that
 *   needs the rule; the reason is free text without `|`;
 * - a line whose policy no longer stands as a role rule fails (`staff-rule-gone`).
 *
 * Two halves, one judge: the static half reads the migrations; the live half (cursor-bundle-5, ACT-032) reads
 * the live catalogue's `pg_policies` (live-staff-rules.sql, `liveRoleRules`) on the smoke lane and judges it
 * against the same file. Each kind is planted in check-doors' self-test (DEC-334).
 */

export const STAFF_RULE_KINDS = [
  "staff-rule-on-table",
  "staff-rule-undeclared",
  "staff-rule-gone",
] as const;
export type StaffRuleKind = (typeof STAFF_RULE_KINDS)[number];
export type StaffRuleFinding = { kind: StaffRuleKind; key: string; what: string; where: string };

const FILE = "scripts/doors/staff-rules.txt";
const COMMANDS = ["ALL", "DELETE", "INSERT", "SELECT", "UPDATE"];
const IDENT = /^[a-z_][a-z0-9_]*$/;
const READER = /^reader (\S+):([1-9][0-9]*)$/;

export type StaffRuleLine = {
  table: string;
  policy: string;
  command: string;
  roles: string;
  /** The reader's file and line, as the line gives them. */
  reader: { file: string; line: number };
  reason: string;
  line: number;
};
export type StaffRulesFile = {
  lines: Map<string, StaffRuleLine>;
  errors: Array<{ line: number; what: string }>;
};

/** The lines of staff-rules.txt; a malformed line is an error, never a skipped rule. */
export function parseStaffRules(text: string): StaffRulesFile {
  const file: StaffRulesFile = { lines: new Map(), errors: [] };
  text.split("\n").forEach((raw, index) => {
    const line = index + 1;
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed.startsWith("#")) return;
    const fail = (what: string) => file.errors.push({ line, what });
    const cells = trimmed.split(" | ").map((cell) => cell.trim());
    if (cells.length !== 4 || cells.some((cell) => cell === "")) {
      fail("expected `schema.table policy | command to roles | reader file:line | reason`");
      return;
    }
    const [subject = "", rule = "", readerCell = "", reason = ""] = cells;
    const [qualified = "", policy = "", ...extra] = subject.split(" ");
    const [schema = "", table = "", ...more] = qualified.split(".");
    if (
      !IDENT.test(schema) ||
      !IDENT.test(table) ||
      more.length > 0 ||
      !/^[A-Za-z_][A-Za-z0-9_]*$/.test(policy) ||
      extra.length > 0
    ) {
      fail(`malformed subject ${subject}`);
      return;
    }
    if (schema === "public") {
      fail(`${qualified}: a role rule on a table of schema public is declared by no line`);
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
    const readerMatch = READER.exec(readerCell);
    if (readerMatch === null) {
      fail(`malformed reader cell ${readerCell}: expected reader file:line`);
      return;
    }
    if (reason.includes("|")) {
      fail("the reason holds no `|`");
      return;
    }
    const key = `${qualified} ${policy}`;
    if (file.lines.has(key)) {
      fail(`duplicate line ${key}`);
      return;
    }
    file.lines.set(key, {
      table: qualified,
      policy,
      command,
      roles,
      reader: { file: readerMatch[1] ?? "", line: Number(readerMatch[2]) },
      reason,
      line,
    });
  });
  return file;
}

/**
 * The role rules of a live-staff-rules.sql answer (ACT-032): one row per standing policy that calls a
 * role helper — schema, table, policy, command, roles. The table reads as the migrations' census names
 * it (bare for schema public, `schema.table` otherwise), so the live and the static half judge by the
 * same code. A malformed row throws: a live answer the guard cannot read judges nothing and fails.
 */
export function liveRoleRules(tsv: string): RoleRule[] {
  const rules: RoleRule[] = [];
  tsv
    .split(/\r?\n/)
    .filter((row) => row.trim() !== "")
    .forEach((row, index) => {
      const cells = row.split("\t");
      const [schema = "", table = "", policy = "", command = "", roles = ""] = cells;
      if (
        cells.length !== 5 ||
        !IDENT.test(schema) ||
        !IDENT.test(table) ||
        policy === "" ||
        !COMMANDS.includes(command) ||
        roles === "" ||
        roles.split(",").some((role) => !IDENT.test(role))
      )
        throw new Error(`live-staff-rules row ${String(index + 1)} is malformed: ${row}`);
      rules.push({
        table: schema === "public" ? table : `${schema}.${table}`,
        policy,
        command,
        roles,
        file: "the live catalogue (pg_policies)",
      });
    });
  return rules.sort((a, b) => `${a.table} ${a.policy}`.localeCompare(`${b.table} ${b.policy}`));
}

export type StaffRuleEvidence = {
  /** The role rules standing after the migrations (policies.ts). */
  standing: RoleRule[];
  /** staff-rules.txt, parsed. */
  file: StaffRulesFile;
};

/** Every finding of the standing role rules against their file. */
export function staffRuleFindings(evidence: StaffRuleEvidence): StaffRuleFinding[] {
  const found: StaffRuleFinding[] = [];
  const { standing, file } = evidence;
  for (const error of file.errors)
    found.push({
      kind: "staff-rule-undeclared",
      key: `staff-rules.txt:${String(error.line)}`,
      what: `malformed line: ${error.what}`,
      where: `${FILE}:${String(error.line)}`,
    });
  const standsAs = new Map(standing.map((rule) => [`${rule.table} ${rule.policy}`, rule]));
  for (const rule of standing) {
    const key = `${rule.table} ${rule.policy}`;
    if (!rule.table.includes(".")) {
      found.push({
        kind: "staff-rule-on-table",
        key,
        what: `a role rule (${rule.command} to ${rule.roles}) on a table of schema public: the read or write goes through a door`,
        where: rule.file,
      });
      continue;
    }
    const line = file.lines.get(key);
    if (line === undefined) {
      found.push({
        kind: "staff-rule-undeclared",
        key,
        what: `a role rule (${rule.command} to ${rule.roles}) with no line in staff-rules.txt`,
        where: rule.file,
      });
      continue;
    }
    if (line.command !== rule.command || line.roles !== rule.roles)
      found.push({
        kind: "staff-rule-undeclared",
        key,
        what: `the policy is ${rule.command} to ${rule.roles}; its line says ${line.command} to ${line.roles}`,
        where: `${FILE}:${String(line.line)}`,
      });
  }
  for (const line of file.lines.values()) {
    const key = `${line.table} ${line.policy}`;
    if (!standsAs.has(key))
      found.push({
        kind: "staff-rule-gone",
        key,
        what: "a line whose policy no longer stands as a role rule",
        where: `${FILE}:${String(line.line)}`,
      });
  }
  return found;
}

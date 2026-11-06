/**
 * Foundations 1 (DEC-333) — THE DOOR MANIFEST'S GRAMMAR. One line per
 * browser-callable function of schema public (every function `anon`,
 * `authenticated` or PUBLIC may EXECUTE in the migrations' last grant state,
 * trigger functions aside), hand-kept and double-entry: the line says what the
 * door OWES, the body's `door_context(...)` call carries the same literals, and
 * `scripts/check-doors.ts` fails on any disagreement — statically from the last
 * declarations (scripts/doors/catalogue.ts) and live from the catalogue of CI's
 * temporary backend (the smoke lane).
 *
 *   name(arg types) | class | roles | permission | step-up | dial | audit | country | acceptance | codes | reason
 *
 * - `name(arg types)` — the key as `regprocedure::text` prints it.
 * - `class` — owner | staff | public-door | public-reader | signed-in-reader |
 *   staff-reader | helper. The class fixes the gates owed.
 * - `roles` — `anon,authenticated` (public-door, public-reader) or `authenticated`.
 * - `permission` — `resource:action` (staff, staff-reader) or `-`.
 * - `step-up` — `row` (the permission row decides), `none:<record>` (a recorded
 *   opt-out: DEC-336 allows the two of D129 and C2h, no third) or `-`.
 * - `dial` — the rate_dials action (every door has one, DEC-336) or `-` (a reader, a helper).
 * - `audit` — the audit action the door writes, or `-`.
 * - `country` — `arg:<argument>` (the door takes a country: scope mode match),
 *   `row:<table.column>` (its target row carries one: match), `filter` (a list
 *   reader narrows by the caller's scope), `global` (configuration: only a
 *   global grant passes) or `-` (owner, public, helper: no staff scope).
 * - `acceptance` — the acceptance guard's class word (legal, account, staff,
 *   draft, signal, helper, guarded, takedown), `checks` for a door that names
 *   legal_acceptance_pending( or legal_certify( itself, or `-` (a reader).
 * - `codes` — the door's OWN refusal codes besides the shared gate codes,
 *   comma-separated, or `-`.
 * - `reason` — free text; required for `helper` (policy | invoker-chain | none |
 *   caller:<where>) and for every `none:` step-up.
 */

export const DOOR_CLASSES = [
  "owner",
  "staff",
  "public-door",
  "public-reader",
  "signed-in-reader",
  "staff-reader",
  "helper",
] as const;
export type DoorClass = (typeof DOOR_CLASSES)[number];

export const ACCEPTANCE_WORDS = [
  "legal",
  "account",
  "staff",
  "draft",
  "signal",
  "helper",
  "guarded",
  "takedown",
  "checks",
] as const;
export type AcceptanceWord = (typeof ACCEPTANCE_WORDS)[number];

export const HELPER_REASONS = ["policy", "invoker-chain", "none"] as const;

/** The classes door_context knows (`p_class`), by manifest class. */
export const CONTEXT_CLASS: Record<DoorClass, string | null> = {
  owner: "owner",
  staff: "staff",
  "public-door": "public",
  "public-reader": "public",
  "signed-in-reader": "reader",
  "staff-reader": "staff-reader",
  helper: null,
};

export type ScopeMode = "none" | "match" | "global" | "filter";

export type ManifestLine = {
  key: string;
  name: string;
  class: DoorClass;
  roles: Array<"anon" | "authenticated">;
  permission: { resource: string; action: string } | null;
  stepUp: "row" | { none: string } | null;
  dial: string | null;
  audit: string | null;
  country:
    | { kind: "arg"; argument: string }
    | { kind: "row"; column: string }
    | { kind: "filter" }
    | { kind: "global" }
    | null;
  acceptance: AcceptanceWord | null;
  codes: string[];
  reason: string;
  line: number;
};

export type ManifestError = { line: number; what: string };

export type Manifest = { lines: Map<string, ManifestLine>; errors: ManifestError[] };

const KEY = /^[a-z][a-z0-9_]*\((?:[a-z][a-z0-9 _]*(?:\[\])*(?:,[a-z][a-z0-9 _]*(?:\[\])*)*)?\)$/;
const PERMISSION = /^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$/;
const NAME_WORD = /^[a-z][a-z0-9_]*$/;
const CODE = /^[a-z][A-Za-z]*$/;

/** The scope mode a line's country column maps to (the body's `p_scope_mode`). */
export function scopeModeOf(line: Pick<ManifestLine, "country">): ScopeMode {
  if (line.country === null) return "none";
  if (line.country.kind === "filter") return "filter";
  if (line.country.kind === "global") return "global";
  return "match";
}

function parseLine(text: string, line: number): { value?: ManifestLine; error?: string } {
  const cells = text.split("|").map((cell) => cell.trim());
  if (cells.length !== 11) return { error: `expected eleven cells, found ${cells.length}` };
  const [key, cls, roles, permission, stepUp, dial, audit, country, acceptance, codes, reason] =
    cells as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ];
  if (!KEY.test(key)) return { error: `malformed key ${key}` };
  if (!(DOOR_CLASSES as readonly string[]).includes(cls)) return { error: `unknown class ${cls}` };
  const roleList = roles.split(",").map((role) => role.trim());
  if (
    roleList.some((role) => role !== "anon" && role !== "authenticated") ||
    new Set(roleList).size !== roleList.length
  )
    return { error: `malformed roles ${roles}` };
  let permissionValue: ManifestLine["permission"] = null;
  if (permission !== "-") {
    if (!PERMISSION.test(permission)) return { error: `malformed permission ${permission}` };
    const [resource, action] = permission.split(":") as [string, string];
    permissionValue = { resource, action };
  }
  let stepUpValue: ManifestLine["stepUp"] = null;
  if (stepUp === "row") stepUpValue = "row";
  else if (stepUp.startsWith("none:")) {
    const record = stepUp.slice(5);
    if (record === "") return { error: "a none: step-up names its record" };
    stepUpValue = { none: record };
  } else if (stepUp !== "-") return { error: `malformed step-up ${stepUp}` };
  if (dial !== "-" && !NAME_WORD.test(dial)) return { error: `malformed dial ${dial}` };
  if (audit !== "-" && !/^[a-z][A-Za-z0-9_.-]*$/.test(audit))
    return { error: `malformed audit ${audit}` };
  let countryValue: ManifestLine["country"] = null;
  if (country.startsWith("arg:")) {
    const argument = country.slice(4);
    if (!NAME_WORD.test(argument)) return { error: `malformed country ${country}` };
    countryValue = { kind: "arg", argument };
  } else if (country.startsWith("row:")) {
    const column = country.slice(4);
    if (!/^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/.test(column))
      return { error: `malformed country ${country}` };
    countryValue = { kind: "row", column };
  } else if (country === "filter") countryValue = { kind: "filter" };
  else if (country === "global") countryValue = { kind: "global" };
  else if (country !== "-") return { error: `malformed country ${country}` };
  let acceptanceValue: ManifestLine["acceptance"] = null;
  if (acceptance !== "-") {
    if (!(ACCEPTANCE_WORDS as readonly string[]).includes(acceptance))
      return { error: `unknown acceptance ${acceptance}` };
    acceptanceValue = acceptance as AcceptanceWord;
  }
  const codeList = codes === "-" ? [] : codes.split(",").map((code) => code.trim());
  if (codeList.some((code) => !CODE.test(code))) return { error: `malformed codes ${codes}` };
  if (reason === "") return { error: "an empty reason cell" };
  const value: ManifestLine = {
    key,
    name: key.slice(0, key.indexOf("(")),
    class: cls as DoorClass,
    roles: roleList as Array<"anon" | "authenticated">,
    permission: permissionValue,
    stepUp: stepUpValue,
    dial,
    audit: audit === "-" ? null : audit,
    country: countryValue,
    acceptance: acceptanceValue,
    codes: codeList,
    reason,
    line,
  };
  value.dial = dial === "-" ? null : dial;
  return { value };
}

/** The class-level rules a line obeys on its own (before any body is read). */
export function lineRuleErrors(line: ManifestLine): string[] {
  const errors: string[] = [];
  const isPublic = line.class === "public-door" || line.class === "public-reader";
  if (isPublic && !line.roles.includes("anon")) errors.push("a public line names anon");
  if (!isPublic && line.roles.includes("anon")) errors.push("only a public line names anon");
  const isStaff = line.class === "staff" || line.class === "staff-reader";
  if (isStaff && line.permission === null) errors.push("a staff line names its permission");
  if (!isStaff && line.permission !== null) errors.push("only a staff line names a permission");
  if (line.class === "staff" && line.stepUp === null)
    errors.push("a staff door's step-up is row or none:<record>");
  if (line.class !== "staff" && line.stepUp !== null)
    errors.push("only a staff door names a step-up");
  const isDoor = line.class === "owner" || line.class === "staff" || line.class === "public-door";
  if (isDoor && line.dial === null) errors.push("every door spends a dial (DEC-336)");
  if (!isDoor && line.dial !== null && line.class !== "helper")
    errors.push("a reader spends no dial");
  if (isStaff && line.country === null) errors.push("a staff line names its country scope");
  if (!isStaff && line.country !== null) errors.push("only a staff line names a country scope");
  if (line.class === "owner" || line.class === "staff") {
    if (line.acceptance === null) errors.push("a signed-in write door names its acceptance class");
  } else if (line.acceptance !== null && line.class !== "public-door" && line.class !== "helper")
    errors.push("only a write door names an acceptance class");
  if (line.class === "helper") {
    const word = line.reason.split(/[\s:]/)[0] ?? "";
    if (!(HELPER_REASONS as readonly string[]).includes(word))
      errors.push("a helper's reason starts with policy, invoker-chain or none");
  }
  if (line.stepUp !== null && line.stepUp !== "row" && line.reason === "-")
    errors.push("a none: step-up carries its reason");
  return errors;
}

/** Every line of a manifest text; malformed lines and duplicate keys are errors, never silently skipped. */
export function parseManifest(text: string): Manifest {
  const lines = new Map<string, ManifestLine>();
  const errors: ManifestError[] = [];
  text.split(/\r?\n/).forEach((content, index) => {
    const line = index + 1;
    if (!content.trim() || content.trimStart().startsWith("#")) return;
    const parsed = parseLine(content, line);
    if (parsed.value === undefined) {
      errors.push({ line, what: parsed.error ?? "malformed line" });
      return;
    }
    if (lines.has(parsed.value.key)) {
      errors.push({ line, what: `duplicate line for ${parsed.value.key}` });
      return;
    }
    for (const what of lineRuleErrors(parsed.value)) errors.push({ line, what });
    lines.set(parsed.value.key, parsed.value);
  });
  return { lines, errors };
}

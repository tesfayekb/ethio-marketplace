import { policiesOf } from "../doors/policies";
import { flaggedPattern } from "../lib/pattern";

/**
 * CF-RLS-1 (cursor bundle 6, ruling 2 decision 4; widened by cursor-bundle-7a Part 3, INC-1283) —
 * A POLICY ASKS WHO IS SIGNED IN, AND WHAT THEY HOLD, ONCE PER QUERY. A function called bare inside
 * a row policy runs once per row; wrapped as `(SELECT auth.uid())` Postgres plans it as an InitPlan
 * and runs it once. The class is the one the Supabase performance advisor's `auth_rls_initplan`
 * lint names: `auth.uid()`, `auth.jwt()`, `auth.role()` and `current_setting(`, and — since the
 * staff-session rule (DEC-461) reads the session's factors on each call — the permission functions.
 *
 * Wrapped means directly inside `(SELECT …)`, or inside the arguments of a permission function that
 * is itself directly inside `(SELECT …)` (`(SELECT public.has_permission(auth.uid(), …))`: the
 * whole call is the InitPlan). A call inside any other subquery (`EXISTS (SELECT 1 FROM … WHERE
 * x = auth.uid())`) is bare: it runs once per row of that subquery.
 *
 * The policies are read in their last standing state by the reader the door judge uses
 * (`policiesOf`, scripts/doors/policies.ts, `ALTER POLICY` included), never by a pattern of their
 * own over the files.
 */

export type PolicyFinding = { policy: string; call: string };

/** The permission functions a policy must not call bare. */
const PERMISSION_FUNCTIONS = [
  "has_permission",
  "has_permission_scoped",
  "has_permission_core",
  "has_permission_scoped_core",
  "staff_session_holds",
  "my_permission_answer",
];

/** The advisor's other names: who is signed in, and a setting read per row. */
const AUTH_FUNCTIONS = ["auth.uid", "auth.jwt", "auth.role", "current_setting"];

/** Whether the call opening at `at` stands directly inside `(SELECT `. */
const inSelect = (text: string, at: number): boolean => /\(\s*SELECT\s+$/i.test(text.slice(0, at));

/**
 * Whether `at` lies inside the argument list of a permission function that is directly inside
 * `(SELECT `: walk back over the open parentheses around `at`.
 */
function insideWrappedPermission(text: string, at: number): boolean {
  let depth = 0;
  for (let i = at - 1; i >= 0; i--) {
    const ch = text.charAt(i);
    if (ch === ")") depth++;
    else if (ch === "(") {
      if (depth > 0) {
        depth--;
        continue;
      }
      const name = /\b(?:public\.)?([a-z_]+)\s*$/i.exec(text.slice(0, i));
      if (name !== null && PERMISSION_FUNCTIONS.includes((name[1] ?? "").toLowerCase()))
        if (inSelect(text, name.index)) return true;
    }
  }
  return false;
}

/** Every bare call: a call of a listed function not wrapped as above. */
export function unwrappedPolicyCalls(files: Array<{ file: string; sql: string }>): PolicyFinding[] {
  const findings: PolicyFinding[] = [];
  const callOf = flaggedPattern("gi");
  for (const [policy, texts] of policiesOf(files))
    for (const text of texts)
      for (const name of [...PERMISSION_FUNCTIONS, ...AUTH_FUNCTIONS]) {
        const call = callOf`(?<![\\w.])(?:public\\.)?(${name})\\s*\\(`;
        for (const match of text.matchAll(call)) {
          const at = match.index ?? 0;
          if (inSelect(text, at)) continue;
          if (AUTH_FUNCTIONS.includes(name) && insideWrappedPermission(text, at)) continue;
          findings.push({ policy, call: match[1] ?? "" });
        }
      }
  return findings.sort((a, b) => `${a.policy} ${a.call}`.localeCompare(`${b.policy} ${b.call}`));
}

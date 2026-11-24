import { policiesOf } from "../doors/policies";

/**
 * CF-RLS-1 (cursor bundle 6, ruling 2 decision 4) — A POLICY ASKS A PERMISSION ONCE PER QUERY.
 * A permission function called bare inside a row policy runs once per row; wrapped as
 * `(SELECT public.has_permission(…))` Postgres plans it as an InitPlan and runs it once. After the
 * staff-session rule (DEC-461) each call also reads the session's factors, so the bare form is a
 * per-row cost the wrapped form does not pay.
 *
 * The policies are read in their last standing state by the reader the door judge uses
 * (`policiesOf`, scripts/doors/policies.ts), never by a pattern of their own over the files.
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

/** Every bare call: a call of a permission function not directly inside `(SELECT …)`. */
export function unwrappedPermissionCalls(
  files: Array<{ file: string; sql: string }>,
): PolicyFinding[] {
  const findings: PolicyFinding[] = [];
  const names = PERMISSION_FUNCTIONS.join("|");
  const call = new RegExp(`\\b(?:public\\.)?(${names})\\s*\\(`, "gi");
  for (const [policy, texts] of policiesOf(files))
    for (const text of texts)
      for (const match of text.matchAll(call)) {
        const before = text.slice(0, match.index ?? 0);
        if (/\(\s*SELECT\s+$/i.test(before)) continue;
        findings.push({ policy, call: match[1] ?? "" });
      }
  return findings.sort((a, b) => `${a.policy} ${a.call}`.localeCompare(`${b.policy} ${b.call}`));
}

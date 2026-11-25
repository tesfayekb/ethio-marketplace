import type { LastDeclaration } from "./migration-reader";

/**
 * CF-GRANT-1 (cursor bundle 7a, DEC-466) — A PERMISSION READER READS A GRANT EXACTLY. The role matrix the Roles
 * console edits is the whole truth of what the server allows, so a function that reads `role_permissions` answers
 * for an action only from a grant of THAT action. A grant of `manage` answers when `manage` is asked and never in
 * place of another action: `p.action IN (p_action, 'manage')`, or a second branch `p.action = 'manage'` beside
 * `p.action = p_action`, lets a grant the matrix shows as one thing allow another.
 *
 * Read over every function's last declaration (`lastDeclarations`, scripts/conformance/migration-reader.ts, comments
 * and DO blocks already removed). A body is a permission reader when it names `role_permissions`. Not findings: a
 * list of literals that names `manage` among other literals (`user_has_translation_permission` chooses which
 * actions make a translator target: a named list, not an asked action), and a door that asks `manage` by name
 * (`door_context('staff', 'translations', 'manage', …)`, an argument, not a comparison).
 */

export type GrantFinding = { fn: string; file: string; line: number; what: string };

type Reader = Pick<LastDeclaration, "body" | "file" | "bodyLine">;

const IN_LIST = /\baction\s+IN\s*\(([^)]*)\)/gi;
const EQUALS_MANAGE = /\baction\s*=\s*'manage'/i;
const EQUALS_ASKED = /\baction\s*=\s*(?!')[A-Za-z_]/i;

/** The 1-based line of `offset` inside the declaration's body. */
const lineIn = (reader: Reader, offset: number) =>
  reader.bodyLine + reader.body.slice(0, offset).split("\n").length - 1;

/** CF-GRANT-1 — every permission reader whose last declaration matches `manage` in place of the asked action. */
export function manageInPlaceOfAsked(declarations: ReadonlyMap<string, Reader>): GrantFinding[] {
  const findings: GrantFinding[] = [];
  for (const [fn, reader] of [...declarations].sort(([a], [b]) => a.localeCompare(b))) {
    const { body, file } = reader;
    if (!/\brole_permissions\b/i.test(body)) continue;
    for (const match of body.matchAll(IN_LIST)) {
      const items = (match[1] ?? "").split(",").map((item) => item.trim());
      const names = items.some((item) => item.toLowerCase() === "'manage'");
      const asked = items.some((item) => item !== "" && !item.startsWith("'"));
      if (names && asked)
        findings.push({
          fn,
          file,
          line: lineIn(reader, match.index ?? 0),
          what: "matches `manage` in a list beside the asked action",
        });
    }
    const literal = EQUALS_MANAGE.exec(body);
    if (literal !== null && EQUALS_ASKED.test(body))
      findings.push({
        fn,
        file,
        line: lineIn(reader, literal.index),
        what: "matches `manage` as a second branch beside the asked action",
      });
  }
  return findings;
}

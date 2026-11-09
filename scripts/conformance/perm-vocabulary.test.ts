import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import {
  findingKey,
  insertStatements,
  resourceDeletes,
  seededVocabulary,
  snakeLiterals,
  vocabularyFindings,
} from "./perm-vocabulary";

/**
 * P-1 (CF-PERM-1) — every resource and action a migration seeds has its
 * `admin.roles.perm.*` key in en-admin.ts AND am-admin.ts, so the roles
 * console's matrix never falls back to the raw English value. Allowances
 * (`resource:<name>` / `action:<name> | reason | until`) in
 * perm-vocabulary-allowlist.txt; a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "perm-vocabulary-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of files under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "perm-vocabulary-"));
  temps.push(root);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

const LOCALE = (keys: string[]) =>
  `export const x = {\n${keys.map((key) => `  "${key}": "x",`).join("\n")}\n} as const;\n`;

describe("the permission matrix's vocabulary (CF-PERM-1)", () => {
  it(
    "PV-1 every seeded resource and action has its key in en-admin.ts and am-admin.ts",
    () => {
      const findings = vocabularyFindings(ROOT);
      const allowed = readAllowlist(ALLOWLIST, findings.map(findingKey));
      const unexcused = findings.filter((finding) => !allowed.has(findingKey(finding)));
      expect(
        unexcused.map((finding) =>
          finding.lingering === undefined
            ? `${finding.file}: ${finding.kind} '${finding.name}' has no admin.roles.perm.${finding.kind}.${finding.name} in ${finding.missing.join(", ")}`
            : `${finding.file}: retired ${finding.kind} '${finding.name}' still has admin.roles.perm.${finding.kind}.${finding.name} in ${finding.lingering.join(", ")}`,
        ),
      ).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("PV-2 the census reads the seeds' forms: VALUES lists, SELECT … WHERE, CROSS JOIN VALUES, CASE arrays; comments and display names are not names", () => {
    const sql = `
-- INSERT INTO public.resources (name) VALUES ('commented_out');
INSERT INTO public.resources (name, display_name) VALUES
  ('admin_panel','Admin Panel'),
  ('roles','Roles');
INSERT INTO public.permissions (resource_id, action)
SELECT res.id, a.action FROM public.resources res
CROSS JOIN LATERAL (SELECT unnest(CASE
  WHEN res.name IN ('admin_panel') THEN ARRAY['access']
  ELSE ARRAY['view','manage'] END) AS action) a
ON CONFLICT (resource_id, action) DO NOTHING;
INSERT INTO public.resources (name, display_name, description)
SELECT 'impersonation', 'Impersonation', 'Acting as another user'
 WHERE NOT EXISTS (SELECT 1 FROM public.resources WHERE name = 'impersonation');
INSERT INTO public.permissions (resource_id, action, description, requires_step_up)
SELECT res.id, 'use', 'Impersonate another user', true FROM public.resources res
 WHERE res.name = 'impersonation';
INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, v.action, v.descr, v.step_up, true FROM public.resources r
  CROSS JOIN (VALUES ('view', 'See it', false), ('export', 'Export it', true)) AS v(action, descr, step_up)
 WHERE r.name = 'roles';
/* INSERT INTO public.permissions … ('blocked') */
`;
    expect(insertStatements(sql, "resources")).toHaveLength(2);
    expect(insertStatements(sql, "permissions")).toHaveLength(3);
    expect(snakeLiterals("('admin_panel','Admin Panel'), ('x_1', 'Two words')")).toEqual([
      "admin_panel",
      "x_1",
    ]);
    const root = tree({ "supabase/migrations/1.sql": sql });
    const seeded = seededVocabulary(root);
    expect([...seeded.resources.keys()].sort()).toEqual(["admin_panel", "impersonation", "roles"]);
    expect([...seeded.actions.keys()].sort()).toEqual([
      "access",
      "export",
      "manage",
      "use",
      "view",
    ]);
  });

  it("PV-3 a planted resource and a planted action without their keys are findings, naming the locale files that miss them; keyed names are not", () => {
    const root = tree({
      "supabase/migrations/1.sql": `
INSERT INTO public.resources (name, display_name) VALUES ('planted_res', 'Planted');
INSERT INTO public.permissions (resource_id, action)
SELECT r.id, 'planted_act' FROM public.resources r WHERE r.name = 'planted_res';
INSERT INTO public.resources (name, display_name) VALUES ('keyed_res', 'Keyed');
INSERT INTO public.permissions (resource_id, action)
SELECT r.id, 'view' FROM public.resources r WHERE r.name = 'keyed_res';
`,
      "src/i18n/locales/en-admin.ts": LOCALE([
        "admin.roles.perm.resource.keyed_res",
        "admin.roles.perm.action.view",
        "admin.roles.perm.resource.planted_res",
      ]),
      "src/i18n/locales/am-admin.ts": LOCALE([
        "admin.roles.perm.resource.keyed_res",
        "admin.roles.perm.action.view",
      ]),
    });
    const findings = vocabularyFindings(root);
    expect(findings.map((finding) => [findingKey(finding), finding.missing])).toEqual([
      ["action:planted_act", ["src/i18n/locales/en-admin.ts", "src/i18n/locales/am-admin.ts"]],
      ["resource:planted_res", ["src/i18n/locales/am-admin.ts"]],
    ]);
    expect(findings[0]?.file).toBe("supabase/migrations/1.sql");
  });

  it("PV-4 the real tree seeds the resources the matrix knows, packages among them (P-1)", () => {
    const seeded = seededVocabulary(ROOT);
    for (const name of ["listings", "packages", "roles"]) {
      expect(seeded.resources.has(name), `resource ${name}`).toBe(true);
    }
    for (const name of ["view", "update", "enforce", "import"]) {
      expect(seeded.actions.has(name), `action ${name}`).toBe(true);
    }
    expect(seeded.actions.has("packages")).toBe(false);
  });

  const SEED_GONE = `
INSERT INTO public.resources (name, display_name) VALUES ('gone_res', 'Gone');
INSERT INTO public.permissions (resource_id, action)
SELECT r.id, 'view' FROM public.resources r WHERE r.name = 'gone_res';
`;

  it("PV-5 a resource a later file deletes, whose key a locale file keeps, is a finding naming that file", () => {
    const root = tree({
      "supabase/migrations/1.sql": SEED_GONE,
      "supabase/migrations/2.sql": "DELETE FROM public.resources WHERE name = 'gone_res';\n",
      "src/i18n/locales/en-admin.ts": LOCALE([
        "admin.roles.perm.resource.gone_res",
        "admin.roles.perm.action.view",
      ]),
      "src/i18n/locales/am-admin.ts": LOCALE(["admin.roles.perm.action.view"]),
    });
    const findings = vocabularyFindings(root);
    expect(findings.map((finding) => [findingKey(finding), finding.lingering])).toEqual([
      ["retired:resource:gone_res", ["src/i18n/locales/en-admin.ts"]],
    ]);
    expect(findings[0]?.file).toBe("supabase/migrations/2.sql");
  });

  it("PV-6 the same deletion with its key gone from both locale files is no finding, and the resource leaves the vocabulary", () => {
    const root = tree({
      "supabase/migrations/1.sql": SEED_GONE,
      "supabase/migrations/2.sql": "DELETE FROM public.resources WHERE name = 'gone_res';\n",
      "src/i18n/locales/en-admin.ts": LOCALE(["admin.roles.perm.action.view"]),
      "src/i18n/locales/am-admin.ts": LOCALE(["admin.roles.perm.action.view"]),
    });
    expect(vocabularyFindings(root)).toEqual([]);
    const seeded = seededVocabulary(root);
    expect(seeded.resources.has("gone_res")).toBe(false);
    expect([...seeded.retired.keys()]).toEqual(["gone_res"]);
    expect(seeded.actions.has("gone_res")).toBe(false);
  });

  it("PV-7 a deletion inside a DO block is read; one in a comment is not", () => {
    const sql = `
-- DELETE FROM public.resources WHERE name = 'kept_res';
DO $retire$
BEGIN
  DELETE FROM public.resources WHERE name = 'gone_res';
END $retire$;
`;
    expect(resourceDeletes(sql)).toHaveLength(1);
    const root = tree({
      "supabase/migrations/1.sql": `${SEED_GONE}INSERT INTO public.resources (name) VALUES ('kept_res');\n`,
      "supabase/migrations/2.sql": sql,
    });
    const seeded = seededVocabulary(root);
    expect([...seeded.resources.keys()]).toEqual(["kept_res"]);
    expect([...seeded.retired.keys()]).toEqual(["gone_res"]);
  });
});

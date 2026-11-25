import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { walkFiles } from "./kit";
import { unwrappedPermissionCalls } from "./rls-initplan";

/**
 * CF-RLS-1 (cursor bundle 6, ruling 2 decision 4) — no standing policy calls a permission function
 * outside `(SELECT …)`. Proven on a planted policy; wired by this test's own run (rls-initplan.ts).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const migrations = () =>
  walkFiles([join(ROOT, "supabase", "migrations")], { ext: ["sql"] }).map((file) => ({
    file,
    sql: readFileSync(file, "utf8"),
  }));

describe("CF-RLS-1 — a policy asks a permission once per query", () => {
  it("CF-RLS-1a: no standing policy calls a permission function bare", () => {
    expect(unwrappedPermissionCalls(migrations())).toEqual([]);
  });

  it("CF-RLS-1b: a planted bare call is found, a wrapped one is not", () => {
    const planted = [
      {
        file: "planted.sql",
        sql: [
          "CREATE POLICY bare_rule ON public.things FOR SELECT TO authenticated",
          "  USING (public.has_permission(auth.uid(), 'things', 'read'));",
          "CREATE POLICY wrapped_rule ON public.things FOR SELECT TO authenticated",
          "  USING ((SELECT public.has_permission(auth.uid(), 'things', 'read')));",
          "CREATE POLICY mixed_rule ON public.things FOR UPDATE TO authenticated",
          "  USING ((SELECT public.has_permission(auth.uid(), 'a', 'b')) AND has_permission_scoped(auth.uid(), 'a', 'b', NULL));",
        ].join("\n"),
      },
    ];
    expect(unwrappedPermissionCalls(planted)).toEqual([
      { policy: "bare_rule", call: "has_permission" },
      { policy: "mixed_rule", call: "has_permission_scoped" },
    ]);
  });

  it("CF-RLS-1c: a later migration that wraps the call clears the earlier bare one", () => {
    const files = [
      {
        file: "a.sql",
        sql: "CREATE POLICY p ON public.t FOR SELECT USING (public.has_permission(auth.uid(), 'x', 'y'));",
      },
      {
        file: "b.sql",
        sql: "DROP POLICY p ON public.t; CREATE POLICY p ON public.t FOR SELECT USING ((SELECT public.has_permission(auth.uid(), 'x', 'y')));",
      },
    ];
    expect(unwrappedPermissionCalls(files)).toEqual([]);
  });
});

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { walkFiles } from "./kit";
import { unwrappedPolicyCalls } from "./rls-initplan";

/**
 * CF-RLS-1 (cursor bundle 6, ruling 2 decision 4; widened by cursor-bundle-7a Part 3) — no standing
 * policy calls a permission function, `auth.uid()`, `auth.jwt()`, `auth.role()` or `current_setting(`
 * outside `(SELECT …)`. Proven on planted policies; wired by this test's own run (rls-initplan.ts).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const migrations = () =>
  walkFiles([join(ROOT, "supabase", "migrations")], { ext: ["sql"] }).map((file) => ({
    file,
    sql: readFileSync(file, "utf8"),
  }));

describe("CF-RLS-1 — a policy asks who is signed in, and what they hold, once per query", () => {
  it("CF-RLS-1a: no standing policy calls a permission function or an auth function bare", () => {
    expect(unwrappedPolicyCalls(migrations())).toEqual([]);
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
    // The arguments' `auth.uid()` of a bare permission call is itself bare; of a wrapped one it is not.
    expect(unwrappedPolicyCalls(planted)).toEqual([
      { policy: "bare_rule", call: "auth.uid" },
      { policy: "bare_rule", call: "has_permission" },
      { policy: "mixed_rule", call: "auth.uid" },
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
    expect(unwrappedPolicyCalls(files)).toEqual([]);
  });

  it("CF-RLS-1d: each of the advisor's four names is found bare and passes wrapped (INC-1283)", () => {
    const policy = (name: string, using: string) => ({
      file: `${name}.sql`,
      sql: `CREATE POLICY ${name} ON public.things FOR SELECT TO authenticated USING (${using});`,
    });
    const bare = [
      policy("bare_uid", "auth.uid() = owner_id"),
      policy("bare_jwt", "auth.jwt() ->> 'role' = 'x'"),
      policy("bare_role", "auth.role() = 'authenticated'"),
      policy("bare_setting", "current_setting('request.x', true) = 'y'"),
    ];
    expect(unwrappedPolicyCalls(bare)).toEqual([
      { policy: "bare_jwt", call: "auth.jwt" },
      { policy: "bare_role", call: "auth.role" },
      { policy: "bare_setting", call: "current_setting" },
      { policy: "bare_uid", call: "auth.uid" },
    ]);
    const wrapped = [
      policy("w_uid", "(SELECT auth.uid()) = owner_id"),
      policy("w_jwt", "(SELECT auth.jwt()) ->> 'role' = 'x'"),
      policy("w_role", "(select auth.role()) = 'authenticated'"),
      policy("w_setting", "( SELECT current_setting('request.x', true) ) = 'y'"),
      policy("w_permission", "(SELECT public.has_permission(auth.uid(), 'a', 'b'))"),
    ];
    expect(unwrappedPolicyCalls(wrapped)).toEqual([]);
    // A call inside another subquery runs once per row of that subquery: it is bare.
    expect(
      unwrappedPolicyCalls([
        policy(
          "exists_uid",
          "EXISTS (SELECT 1 FROM public.l WHERE l.id = things.l_id AND l.seller_id = auth.uid())",
        ),
        policy("name_alike", "my_auth.uid_like(1) AND current_settings(2)"),
      ]),
    ).toEqual([{ policy: "exists_uid", call: "auth.uid" }]);
  });

  it("CF-RLS-1e: a policy an ALTER rewrites is judged by the new text, and an ALTER the reader cannot take apart throws (INC-1300)", () => {
    const create = {
      file: "a.sql",
      sql: "CREATE POLICY p ON public.t FOR SELECT TO authenticated USING (auth.uid() = owner_id);",
    };
    const wrap = {
      file: "b.sql",
      sql: "ALTER POLICY p ON public.t USING ((SELECT auth.uid()) = owner_id);",
    };
    expect(unwrappedPolicyCalls([create])).toEqual([{ policy: "p", call: "auth.uid" }]);
    expect(unwrappedPolicyCalls([create, wrap])).toEqual([]);
    const unwrap = {
      file: "c.sql",
      sql: "ALTER POLICY p ON public.t USING (auth.uid() = owner_id);",
    };
    expect(unwrappedPolicyCalls([create, wrap, unwrap])).toEqual([
      { policy: "p", call: "auth.uid" },
    ]);
    const broken = {
      file: "d.sql",
      sql: "ALTER POLICY p ON public.t USING ((SELECT auth.uid()) = owner_id",
    };
    expect(() => unwrappedPolicyCalls([create, wrap, broken])).toThrow(/cannot take apart/);
  });
});

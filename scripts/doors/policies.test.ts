import { describe, expect, it } from "vitest";

import { openRulesOf, policiesOf, roleRulesOf } from "./policies";

/**
 * Cursor-bundle-7a Part 3 (ruling 1 decision 7, INC-1300) — THE POLICY READER LEARNS `ALTER POLICY`.
 * Planted statements only: the reader's own behaviour on a policy an ALTER rewrites, renames or
 * cannot be read. (The tree's policies are judged by check-doors and CF-RLS-1, which read through it.)
 */

const create = (sql: string) => ({ file: "a.sql", sql });
const later = (sql: string, file = "b.sql") => ({ file, sql });

const BASE =
  "CREATE POLICY p ON public.t FOR SELECT TO authenticated USING (auth.uid() = owner_id);";

const textOf = (files: Array<{ file: string; sql: string }>, name = "p") =>
  (policiesOf(files).get(name) ?? []).join(" | ");

describe("policiesOf reads ALTER POLICY (INC-1300)", () => {
  it("POL-ALTER-1 an ALTER's USING replaces the policy's expression and keeps its command and roles", () => {
    const text = textOf([
      create(BASE),
      later("ALTER POLICY p ON public.t USING ((SELECT auth.uid()) = owner_id);"),
    ]);
    expect(text).toBe(
      "CREATE POLICY p ON public.t FOR SELECT TO authenticated USING ((SELECT auth.uid()) = owner_id);",
    );
    // The old text no longer stands: an open rule it was not, one an ALTER makes is.
    expect(openRulesOf([create(BASE)]).standing).toEqual([]);
    const opened = openRulesOf([create(BASE), later("ALTER POLICY p ON public.t USING (true);")]);
    expect(opened.standing).toEqual([
      { table: "t", policy: "p", command: "SELECT", roles: "authenticated", file: "a.sql" },
    ]);
    expect(
      openRulesOf([
        create(BASE),
        later("ALTER POLICY p ON public.t USING (true);"),
        later("ALTER POLICY p ON public.t USING (auth.uid() = owner_id);", "c.sql"),
      ]).standing,
    ).toEqual([]);
  });

  it("POL-ALTER-2 an ALTER of one clause keeps the other; TO replaces the roles; the last statement wins", () => {
    const both = create(
      "CREATE POLICY q ON public.t FOR ALL TO authenticated USING (a = 1) WITH CHECK (b = 2);",
    );
    expect(textOf([both, later("ALTER POLICY q ON public.t WITH CHECK (b = 3);")], "q")).toBe(
      "CREATE POLICY q ON public.t FOR ALL TO authenticated USING (a = 1) WITH CHECK (b = 3);",
    );
    expect(textOf([both, later("ALTER POLICY q ON public.t USING (a = (SELECT 4));")], "q")).toBe(
      "CREATE POLICY q ON public.t FOR ALL TO authenticated USING (a = (SELECT 4)) WITH CHECK (b = 2);",
    );
    expect(textOf([both, later("ALTER POLICY q ON public.t TO anon, service_role;")], "q")).toBe(
      "CREATE POLICY q ON public.t FOR ALL TO anon, service_role USING (a = 1) WITH CHECK (b = 2);",
    );
    expect(
      textOf(
        [
          both,
          later("ALTER POLICY q ON public.t USING (a = 5);"),
          later("ALTER POLICY q ON public.t USING (a = 6) WITH CHECK (b = 7);", "c.sql"),
        ],
        "q",
      ),
    ).toBe(
      "CREATE POLICY q ON public.t FOR ALL TO authenticated USING (a = 6) WITH CHECK (b = 7);",
    );
    // A role rule an ALTER introduces is a role rule; one it removes is not.
    const role = [
      create(BASE),
      later("ALTER POLICY p ON public.t USING (public.has_permission(auth.uid(), 'a', 'b'));"),
    ];
    expect(roleRulesOf(role).map((rule) => rule.policy)).toEqual(["p"]);
    expect(
      roleRulesOf([...role, later("ALTER POLICY p ON public.t USING (false);", "c.sql")]),
    ).toEqual([]);
  });

  it("POL-ALTER-3 parentheses and quotes in a clause are read as a clause: a string holding a bracket does not end it", () => {
    const text = textOf([
      create(BASE),
      later("ALTER POLICY p ON public.t USING (x = ')' AND f((1), 'it''s (' ) IS NULL);"),
    ]);
    expect(text).toBe(
      "CREATE POLICY p ON public.t FOR SELECT TO authenticated USING (x = ')' AND f((1), 'it''s (' ) IS NULL);",
    );
  });

  it("POL-ALTER-4 RENAME TO renames the standing policy; a dropped policy has none left to alter", () => {
    const renamed = [create(BASE), later("ALTER POLICY p ON public.t RENAME TO p2;")];
    expect(policiesOf(renamed).has("p")).toBe(false);
    expect(textOf(renamed, "p2")).toBe(
      "CREATE POLICY p2 ON public.t FOR SELECT TO authenticated USING (auth.uid() = owner_id);",
    );
    const dropped = [create(BASE), later("DROP POLICY p ON public.t;")];
    expect(() =>
      policiesOf([...dropped, later("ALTER POLICY p ON public.t USING (true);", "c.sql")]),
    ).toThrow(/no standing policy/);
    expect(() => policiesOf([later("ALTER POLICY ghost ON public.t USING (true);")])).toThrow(
      /no standing policy/,
    );
  });

  it("POL-ALTER-5 an ALTER the reader cannot take apart throws, and one built by dynamic SQL is not read", () => {
    const bad = (sql: string) => () => policiesOf([create(BASE), later(sql)]);
    // no closing `;`, a clause that never closes, a clause named twice, text it does not know, nothing changed
    expect(bad("ALTER POLICY p ON public.t USING (true)")).toThrow(/cannot take apart/);
    expect(bad("ALTER POLICY p ON public.t USING ((true);")).toThrow(/cannot be read/);
    expect(bad("ALTER POLICY p ON public.t USING (a) USING (b);")).toThrow(/cannot be read/);
    expect(bad("ALTER POLICY p ON public.t FOR INSERT USING (a);")).toThrow(/cannot be read/);
    expect(bad("ALTER POLICY p ON public.t;")).toThrow(/cannot be read/);
    // dynamic: a placeholder in the head, as a CREATE's is skipped
    const dynamic = later(
      "DO $d$ BEGIN EXECUTE format('ALTER POLICY %I ON public.%I USING (%s)', 'p', 't', 'true'); END $d$;",
    );
    expect(textOf([create(BASE), dynamic])).toBe(textOf([create(BASE)]));
    // comments are not statements
    expect(
      textOf([create(BASE), later("-- ALTER POLICY p ON public.t USING (true)\nSELECT 1;")]),
    ).toBe(textOf([create(BASE)]));
  });

  it("POL-ALTER-6 an open ALTER built by dynamic SQL is listed beside the open CREATEs it resembles", () => {
    const planted = openRulesOf([
      create(BASE),
      later("DO $d$ BEGIN EXECUTE 'ALTER POLICY p ON public.%I USING (true)'; END $d$;"),
    ]);
    expect(planted.computed).toHaveLength(1);
    expect(planted.computed[0]?.file).toBe("b.sql");
  });
});

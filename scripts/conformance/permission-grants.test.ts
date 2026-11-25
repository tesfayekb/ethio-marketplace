import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { TREE_SCAN_MS } from "./kit";
import { lastDeclarations } from "./migration-reader";
import { manageInPlaceOfAsked } from "./permission-grants";

/**
 * CF-GRANT-1 (cursor bundle 7a, DEC-466) — no permission reader answers for an action from a grant of `manage`.
 * Proven on planted bodies in the two forms the permission cores once held; wired by this test's own run
 * (permission-grants.ts). No allowlist: a reader that matches `manage` in place of the asked action is fixed.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const reader = (body: string) => ({ body, file: "planted.sql", bodyLine: 10 });

describe("CF-GRANT-1 — a permission reader reads a grant exactly", () => {
  it(
    "CFPG-1 no last declaration matches `manage` in place of the asked action",
    () => {
      expect(manageInPlaceOfAsked(lastDeclarations(ROOT))).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("CFPG-2 a planted `p.action IN (p_action, 'manage')` is found, with its line", () => {
    const planted = new Map([
      [
        "planted_scope",
        reader(
          [
            "SELECT 1 FROM public.role_permissions rp",
            "  JOIN public.permissions p ON p.id = rp.permission_id",
            " WHERE p.action IN (p_action, 'manage')",
          ].join("\n"),
        ),
      ],
    ]);
    expect(manageInPlaceOfAsked(planted)).toEqual([
      {
        fn: "planted_scope",
        file: "planted.sql",
        line: 12,
        what: "matches `manage` in a list beside the asked action",
      },
    ]);
  });

  it("CFPG-3 a planted second branch `p.action = 'manage'` beside `p.action = p_action` is found", () => {
    const planted = new Map([
      [
        "planted_core",
        reader(
          [
            "SELECT EXISTS (SELECT 1 FROM public.role_permissions rp JOIN public.permissions p ON p.id = rp.permission_id",
            "  WHERE p.action = p_action)",
            "  OR EXISTS (SELECT 1 FROM public.role_permissions rp JOIN public.permissions p ON p.id = rp.permission_id",
            "  WHERE p.action = 'manage')",
          ].join("\n"),
        ),
      ],
    ]);
    expect(manageInPlaceOfAsked(planted).map((finding) => [finding.fn, finding.line])).toEqual([
      ["planted_core", 13],
    ]);
  });

  it("CFPG-4 a list of literals that names `manage`, a door asking `manage` by name and a body that reads no grants are not findings", () => {
    const planted = new Map([
      [
        "named_list",
        reader(
          "SELECT 1 FROM public.role_permissions rp JOIN public.permissions p ON p.id = rp.permission_id WHERE p.action IN ('view', 'update', 'manage')",
        ),
      ],
      [
        "named_door",
        reader("PERFORM public.door_context('staff', 'translations', 'manage', NULL)"),
      ],
      ["not_a_reader", reader("SELECT 1 WHERE x.action IN (p_action, 'manage')")],
      [
        "exact",
        reader(
          "SELECT 1 FROM public.role_permissions rp JOIN public.permissions p ON p.id = rp.permission_id WHERE p.action = p_action",
        ),
      ],
    ]);
    expect(manageInPlaceOfAsked(planted)).toEqual([]);
  });
});

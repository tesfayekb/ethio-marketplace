import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { ROUTE_PERMISSIONS } from "../../src/features/permissions/door-permissions.generated";
import {
  floorProblem,
  hookCalls,
  namedRoutes,
  permissionComparisons,
  routeOf,
} from "./door-permissions";
import { readAllowlist, report, TREE_SCAN_MS, typedProgram } from "./kit";

/**
 * INC-1281 (cursor bundle 7c, Part 3) — A CONTROL SHOWS WHAT ITS DOOR ALLOWS, THROUGH ONE HOOK.
 * `useMayCall` (src/features/permissions/use-may-call.ts) answers from the manifest's permission
 * (door-permissions.generated.ts, scripts/doors/door-types.ts); this census (door-permissions.ts)
 * judges the copies:
 *   DPM-1 every permission comparison of browser code that is not the hook carries its line;
 *   DPM-2 a planted file's comparisons are each found, and a new one fails as unlisted;
 *   DPM-3 a hook call naming a door the manifest lacks, a door that asks no permission, a route
 *         that is not one or a method the route lacks does not compile;
 *   DPM-4 every API path browser code writes names a route the generated data answers; every
 *         route admin code names declares its permission (none is OPEN);
 *   DPM-5 (INC-1308) the floor reads the copies and the hook's calls: a reader that finds nothing
 *         fails it, and a copy moved onto the hook keeps the count.
 * Exceptions: scripts/conformance/door-permissions-allowlist.txt (`key | reason | until`;
 * `permanent` allowed for a page, section or link gate; a stale line fails).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "door-permissions-allowlist.txt");
/** The census's floor at birth (80 comparisons): a reading that finds less is broken. It reads
 *  the copies and the hook's calls together, so moving a copy onto the hook keeps it (INC-1308). */
const COMPARISON_FLOOR = 70;
const ROUTES = Object.keys(ROUTE_PERMISSIONS);
const ADMIN = /^src\/(?:features\/admin|routes\/admin)/;

const PLANTED_PATH = "src/features/planted-door-permissions.tsx";
const PLANTED_COMPARISONS = [
  'import { ADMIN_PANEL_PERMISSION } from "@/features/permissions/service";',
  "",
  "export function planted(permissions: string[], has: (slug: string) => boolean, head: string) {",
  "  return [",
  '    permissions.includes("x:y"),',
  '    has("x:y"),',
  '    permissions.some((slug) => slug === "listings:review"),',
  "    permissions.includes(ADMIN_PANEL_PERMISSION),",
  '    { permission: "x:y" },',
  '    head === "og:title",',
  '    head.includes("http://"),',
  "  ];",
  "}",
  "",
].join("\n");

/** One gate, as a copy and then moved onto the hook (the work an `until INC-1281` line plans). */
const PLANTED_COPY = [
  'import { usePermissions } from "@/features/permissions/usePermissions";',
  "",
  "export function Gate() {",
  "  const { has } = usePermissions();",
  '  return has("listings:review");',
  "}",
  "",
].join("\n");
const PLANTED_MOVED = [
  'import { useMayCall } from "@/features/permissions/use-may-call";',
  "",
  "export function Gate() {",
  "  const { mayCall } = useMayCall();",
  '  return mayCall({ door: "admin_reorder_categories" });',
  "}",
  "",
].join("\n");

const PLANTED_CALLS = [
  'import { useMayCall } from "@/features/permissions/use-may-call";',
  "",
  "export function KnownDoor() {",
  "  const { mayCall } = useMayCall();",
  '  return mayCall({ door: "admin_reorder_categories" });',
  "}",
  "export function KnownRoute() {",
  "  const { mayCall } = useMayCall();",
  '  return mayCall({ route: "/api/translate", method: "POST" });',
  "}",
  "export function UnknownDoor() {",
  "  const { mayCall } = useMayCall();",
  '  return mayCall({ door: "admin_no_such_door" });',
  "}",
  "export function UnpermissionedDoor() {",
  "  const { mayCall } = useMayCall();",
  '  return mayCall({ door: "copy_my_listing" });',
  "}",
  "export function UnknownRoute() {",
  "  const { mayCall } = useMayCall();",
  '  return mayCall({ route: "/api/no-such-route", method: "GET" });',
  "}",
  "export function UnknownMethod() {",
  "  const { mayCall } = useMayCall();",
  '  return mayCall({ route: "/api/feed", method: "POST" });',
  "}",
  "",
].join("\n");

describe("door permissions (cursor bundle 7c Part 3, INC-1281)", () => {
  it(
    "DPM-1 every permission comparison of browser code that is not the hook carries its allowlist line",
    () => {
      const found = permissionComparisons(ROOT);
      expect(floorProblem(found, hookCalls(ROOT), COMPARISON_FLOOR)).toBeNull();
      const allowed = readAllowlist(
        ALLOWLIST,
        found.map((finding) => finding.key),
        { permanent: true },
      );
      const unlisted = found.filter((finding) => !allowed.has(finding.key));
      expect(
        report(unlisted.map(({ file, line, key }) => ({ file, line, what: `unlisted: ${key}` }))),
      ).toBe("");
      for (const allowance of allowed.values())
        if (allowance.until !== "permanent")
          expect(allowance.until, allowance.key).toBe("INC-1281");
    },
    TREE_SCAN_MS,
  );

  it(
    "DPM-2 a planted file's comparisons are each found, a lookalike is not, and a new one fails as unlisted",
    () => {
      const found = permissionComparisons(ROOT, { path: PLANTED_PATH, text: PLANTED_COMPARISONS });
      const mine = found.filter((finding) => finding.file === PLANTED_PATH);
      expect(mine.map(({ key, form }) => `${form} ${key}`)).toEqual([
        `call ${PLANTED_PATH} x:y`,
        `call ${PLANTED_PATH} x:y#2`,
        `equality ${PLANTED_PATH} listings:review`,
        `call ${PLANTED_PATH} ADMIN_PANEL_PERMISSION`,
        `gate ${PLANTED_PATH} x:y#3`,
      ]);
      const listed = new Set(
        readAllowlist(
          ALLOWLIST,
          permissionComparisons(ROOT).map((finding) => finding.key),
          { permanent: true },
        ).keys(),
      );
      expect(mine.filter((finding) => !listed.has(finding.key)).length).toBe(mine.length);
    },
    TREE_SCAN_MS,
  );

  it(
    "DPM-3 a hook call naming an unknown or unpermissioned door, an unknown route or a method the route lacks does not compile",
    () => {
      const program = typedProgram(ROOT, { path: PLANTED_PATH, text: PLANTED_CALLS });
      const source = program.getSourceFile(join(ROOT, PLANTED_PATH));
      expect(source).toBeDefined();
      const failing = new Set<string>();
      for (const diagnostic of ts.getPreEmitDiagnostics(program, source)) {
        if (diagnostic.file !== source || diagnostic.start === undefined) continue;
        const before = PLANTED_CALLS.slice(0, diagnostic.start);
        const name = [...before.matchAll(/export function (\w+)/g)].at(-1)?.[1];
        if (name !== undefined) failing.add(name);
      }
      expect([...failing].sort()).toEqual([
        "UnknownDoor",
        "UnknownMethod",
        "UnknownRoute",
        "UnpermissionedDoor",
      ]);
    },
    TREE_SCAN_MS,
  );

  it(
    "DPM-4 every API path browser code writes names a generated route, and admin code names no OPEN route",
    () => {
      expect(routeOf("/api/no-such-route", ROUTES)).toBeNull();
      expect(routeOf("/api/listings/photos/\u0000", ROUTES)).toBe("/api/listings/photos/$id");
      const named = namedRoutes(ROOT, ROUTES);
      expect(named.length).toBeGreaterThan(20);
      const unknown = named.filter((path) => path.route === null);
      expect(
        report(unknown.map(({ file, line, text }) => ({ file, line, what: `no route: ${text}` }))),
      ).toBe("");
      const table = new Map<string, Readonly<Record<string, string | null>>>(
        Object.entries(ROUTE_PERMISSIONS),
      );
      const open = named.filter((path) => {
        const methods = path.route === null ? undefined : table.get(path.route);
        if (!ADMIN.test(path.file) || methods === undefined) return false;
        return Object.values(methods).some((permission) => permission === null);
      });
      expect(
        report(open.map(({ file, line, text }) => ({ file, line, what: `OPEN: ${text}` }))),
      ).toBe("");
    },
    TREE_SCAN_MS,
  );

  it(
    "DPM-5 the floor fails a reader that finds nothing, and holds when a copy moves onto the hook",
    () => {
      const empty = mkdtempSync(join(tmpdir(), "door-permissions-"));
      try {
        mkdirSync(join(empty, "src"));
        mkdirSync(join(empty, "scripts", "doors"), { recursive: true });
        writeFileSync(join(empty, "src", "nothing.ts"), "export const nothing = 1;\n");
        copyFileSync(
          join(ROOT, "scripts", "doors", "manifest.txt"),
          join(empty, "scripts", "doors", "manifest.txt"),
        );
        expect(
          floorProblem(permissionComparisons(empty), hookCalls(empty), COMPARISON_FLOOR),
        ).toMatch(/0 comparisons and 0 hook calls \(0\), under its floor of 70/);
      } finally {
        rmSync(empty, { recursive: true, force: true });
      }

      const copy = { path: PLANTED_PATH, text: PLANTED_COPY };
      const moved = { path: PLANTED_PATH, text: PLANTED_MOVED };
      const before = permissionComparisons(ROOT, copy);
      const after = permissionComparisons(ROOT, moved);
      expect(after.length).toBe(before.length - 1);
      expect(after.length + hookCalls(ROOT, moved).length).toBe(
        before.length + hookCalls(ROOT, copy).length,
      );
      expect(floorProblem(after, hookCalls(ROOT, moved), before.length)).toBeNull();
      expect(floorProblem(after, [], before.length)).not.toBeNull();
    },
    TREE_SCAN_MS,
  );
});

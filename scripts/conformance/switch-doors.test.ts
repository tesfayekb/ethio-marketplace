import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readPlacedAllowlist, report, TREE_SCAN_MS, typedProgram } from "./kit";
import { readSwitches, writingDoors } from "./switch-doors";

/**
 * INC-1310 (cursor-bundle-8c-3b, DEC-507) — EACH SWITCH NAMES THE DOOR ITS CONTROL CALLS.
 * switch-doors.ts reads every `mayCall({ … })` switch, the regions it gates and the writing calls
 * each region reaches:
 *   SWD-1 no switch of browser code gates a region that makes a write and never reaches the
 *         switch's own door or route, unless its line is in switch-doors-allowlist.txt;
 *   SWD-2 the reading's floor: a reading that finds fewer switches or regions is broken;
 *   SWD-3 planted: a switch naming one door over a control that calls another is found — through
 *         a prop followed into the child, an alias, a negation, a rest-of-function return and a
 *         hook's returned property — and a switch that names the control's own door is quiet;
 *   SWD-4 planted: a route is compared without its query, and a read-only region is quiet;
 *   SWD-5 an allowlist line whose place no longer has the finding fails (a stale line).
 * What the guard cannot see (a control that only sets state, a dialog drawn elsewhere that makes
 * the call, a call whose door is not a literal) is named in docs/features/ci-guards.md.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "switch-doors-allowlist.txt");
/** The reading's floor at birth (102 switches, 195 regions): a reading that finds less is broken. */
const SWITCH_FLOOR = 90;
const REGION_FLOOR = 170;

const PLANTED_PATH = "src/features/planted-switch-doors.tsx";
const PLANTED = [
  'import { useMayCall } from "@/features/permissions/use-may-call";',
  "",
  "declare const client: { rpc: (name: string, args?: unknown) => Promise<unknown> };",
  "declare function callRoute(path: string, init?: { method?: string }): Promise<unknown>;",
  "",
  "function useRoleSave() {",
  '  const save = () => client.rpc("admin_update_role");',
  '  const remove = () => client.rpc("admin_delete_role");',
  "  return { save, remove };",
  "}",
  "",
  "function MetaCard({ editable }: { editable: boolean }) {",
  "  const { save } = useRoleSave();",
  "  return editable ? <button onClick={() => void save()} /> : null;",
  "}",
  "",
  "function Gone({ hidden }: { hidden: boolean }) {",
  "  const { remove } = useRoleSave();",
  "  if (hidden) return null;",
  "  return <button onClick={() => void remove()} />;",
  "}",
  "",
  "export function WrongProp() {",
  "  const { mayCall } = useMayCall();",
  '  const mayWrongProp = mayCall({ door: "admin_set_role_permission" });',
  "  return <MetaCard editable={mayWrongProp} />;",
  "}",
  "",
  "export function PairedProp() {",
  "  const { mayCall } = useMayCall();",
  '  const mayPairedProp = mayCall({ door: "admin_update_role" });',
  "  return <MetaCard editable={mayPairedProp} />;",
  "}",
  "",
  "export function WrongAlias() {",
  "  const { mayCall } = useMayCall();",
  '  const mayWrongAlias = mayCall({ door: "admin_set_role_permission" });',
  "  const editable = mayWrongAlias && true;",
  "  return editable ? <button onClick={() => void client.rpc('admin_update_role')} /> : null;",
  "}",
  "",
  "export function WrongNegated() {",
  "  const { mayCall } = useMayCall();",
  '  const mayWrongNegated = mayCall({ door: "admin_set_role_permission" });',
  "  return <Gone hidden={!mayWrongNegated} />;",
  "}",
  "",
  "export function WrongReturn() {",
  "  const { mayCall } = useMayCall();",
  '  const mayWrongReturn = mayCall({ door: "admin_set_role_permission" });',
  "  if (!mayWrongReturn) return null;",
  "  return <button onClick={() => void client.rpc('admin_update_role')} />;",
  "}",
  "",
  "export function PairedHookProperty() {",
  "  const { mayCall } = useMayCall();",
  '  const mayPairedHookProperty = mayCall({ door: "admin_delete_role" });',
  "  const { remove } = useRoleSave();",
  "  return mayPairedHookProperty ? <button onClick={() => void remove()} /> : null;",
  "}",
  "",
  "export function WrongHookProperty() {",
  "  const { mayCall } = useMayCall();",
  '  const mayWrongHookProperty = mayCall({ door: "admin_update_role" });',
  "  const { remove } = useRoleSave();",
  "  return mayWrongHookProperty ? <button onClick={() => void remove()} /> : null;",
  "}",
  "",
  "export function ReadOnlyRegion() {",
  "  const { mayCall } = useMayCall();",
  '  const mayReadOnly = mayCall({ door: "admin_set_role_permission" });',
  "  return mayReadOnly ? <span>words</span> : null;",
  "}",
  "",
  "export function RouteWithQuery() {",
  "  const { mayCall } = useMayCall();",
  '  const mayRoute = mayCall({ route: "/api/admin/locations/import", method: "POST" });',
  "  return mayRoute ? (",
  "    <button",
  "      onClick={() =>",
  '        void callRoute("/api/admin/locations/import?file=places", { method: "POST" })',
  "      }",
  "    />",
  "  ) : null;",
  "}",
  "",
  "export function WrongRoute() {",
  "  const { mayCall } = useMayCall();",
  '  const mayWrongRoute = mayCall({ route: "/api/admin/locations/import", method: "POST" });',
  "  return mayWrongRoute ? (",
  '    <button onClick={() => void callRoute("/api/admin/categories/import", { method: "POST" })} />',
  "  ) : null;",
  "}",
  "",
].join("\n");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

function tempFile(text: string): string {
  const dir = mkdtempSync(join(tmpdir(), "switch-doors-"));
  temps.push(dir);
  const path = join(dir, "allowlist.txt");
  writeFileSync(path, text);
  return path;
}

const planted = () =>
  readSwitches(typedProgram(ROOT, { path: PLANTED_PATH, text: PLANTED }), ROOT, PLANTED_PATH);

describe("each switch names the door its control calls (INC-1310)", () => {
  it(
    "SWD-1 no switch gates a write it does not name, outside the allowlist",
    () => {
      const reading = readSwitches(typedProgram(ROOT), ROOT);
      const allowed = readPlacedAllowlist(
        ALLOWLIST,
        reading.findings.map((finding) => `${finding.file}:${String(finding.line)}`),
        { root: ROOT },
      );
      const unlisted = reading.findings.filter(
        (finding) => !allowed.has(`${finding.file}:${String(finding.line)}`),
      );
      expect(report(unlisted)).toBe("");
    },
    TREE_SCAN_MS * 2,
  );

  it(
    "SWD-2 the reading finds the switches and regions the tree has (a floor)",
    () => {
      const reading = readSwitches(typedProgram(ROOT), ROOT);
      expect(reading.switches).toBeGreaterThanOrEqual(SWITCH_FLOOR);
      expect(reading.regions).toBeGreaterThanOrEqual(REGION_FLOOR);
      expect(writingDoors(ROOT).has("admin_update_role")).toBe(true);
    },
    TREE_SCAN_MS * 2,
  );

  it(
    "SWD-3 a switch over a control that calls another door is found, however the value travels",
    () => {
      const reading = planted();
      const named = reading.findings.map((finding) => finding.what.split(" names ")[0]).sort();
      expect(named).toEqual([
        "mayWrongAlias",
        "mayWrongHookProperty",
        "mayWrongNegated",
        "mayWrongProp",
        "mayWrongReturn",
        "mayWrongRoute",
      ]);
      // Each finding says which door the region calls.
      expect(
        reading.findings.find((finding) => finding.what.startsWith("mayWrongProp "))?.what,
      ).toContain("door:admin_update_role");
      expect(
        reading.findings.find((finding) => finding.what.startsWith("mayWrongHookProperty "))?.what,
      ).toContain("door:admin_delete_role");
    },
    TREE_SCAN_MS,
  );

  it(
    "SWD-4 a switch that names its control's door or route is quiet, a route's query aside",
    () => {
      const reading = planted();
      const named = new Set(reading.findings.map((finding) => finding.what.split(" names ")[0]));
      for (const quiet of ["mayPairedProp", "mayPairedHookProperty", "mayReadOnly", "mayRoute"])
        expect(named.has(quiet)).toBe(false);
      expect(reading.switches).toBe(10);
    },
    TREE_SCAN_MS,
  );

  it(
    "SWD-5 an allowlist line whose place has no finding fails as stale",
    () => {
      const path = tempFile(
        'src/routes/admin.tsx#testid="admin-permissions-failed" | a reason | 2099-01-01\n',
      );
      const found = planted().findings.map((finding) => `${finding.file}:${String(finding.line)}`);
      expect(() => readPlacedAllowlist(path, found, { root: ROOT })).toThrow(/stale allowance/);
    },
    TREE_SCAN_MS,
  );
});

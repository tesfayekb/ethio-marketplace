import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-1345 (cursor-bundle-8c-3b, DEC-506) — A FAILED PERMISSION READ IS NEVER "NO PERMISSION".
 * `usePermissions` (src/features/permissions/usePermissions.ts) answers `{ permissions, loading,
 * error, retry, has }`; a reader that takes the grants without the failure takes a failed read
 * for an empty one. This census reads every call of the hook in browser code (src/, tests and the
 * hook's own file aside; `scripts/` is not read) and fails each whose result does not take `error`:
 *   PRD-1 every reader in the tree takes `error` (destructured, or `<name>.error` read);
 *   PRD-2 the reading's floor: it finds the readers the tree has;
 *   PRD-3 a planted file's readers are each judged: a destructuring without `error`, a bound
 *         result never read for `error` and a call whose result is dropped fail; a destructuring
 *         with `error` and a bound result whose `.error` is read pass.
 * The hook's own switch (use-may-call.ts) is one of the readers; screens call it through
 * `useMayCall`, which reads `error` and answers as a typed refusal.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
/** The census's floor at birth: the shell, the admin gate and the switch hook. */
const READER_FLOOR = 3;

type Reader = { file: string; line: number; what: string };

function readersIn(file: string, text?: string): { found: number; faults: Reader[] } {
  let found = 0;
  const faults: Reader[] = [];
  visitTs(
    file,
    (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isIdentifier(node.expression) ||
        node.expression.text !== "usePermissions"
      )
        return;
      found += 1;
      const at = {
        file: relative(ROOT, file).split("\\").join("/"),
        line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
      };
      const parent = node.parent;
      if (ts.isVariableDeclaration(parent) && ts.isObjectBindingPattern(parent.name)) {
        const names = parent.name.elements.map((element) =>
          (element.propertyName ?? element.name).getText(),
        );
        if (!names.includes("error"))
          faults.push({ ...at, what: "usePermissions() is read without its `error`" });
        return;
      }
      if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
        const bound = parent.name.text;
        let read = false;
        const visit = (child: ts.Node) => {
          if (
            ts.isPropertyAccessExpression(child) &&
            ts.isIdentifier(child.expression) &&
            child.expression.text === bound &&
            child.name.text === "error"
          )
            read = true;
          ts.forEachChild(child, visit);
        };
        visit(source);
        if (!read)
          faults.push({
            ...at,
            what: `usePermissions() is bound to ${bound} and never read for error`,
          });
        return;
      }
      faults.push({ ...at, what: "usePermissions() is called and its result is dropped" });
    },
    text,
  );
  return { found, faults };
}

const PLANTED_PATH = join(ROOT, "src", "features", "planted-permission-readers.tsx");
const PLANTED = [
  'import { usePermissions } from "@/features/permissions/usePermissions";',
  "",
  "export function Gate({ user }: { user: object | null }) {",
  "  const { permissions, loading } = usePermissions({ enabled: user !== null });",
  "  return loading ? null : permissions.length;",
  "}",
  "",
  "export function Bound() {",
  "  const state = usePermissions();",
  "  return state.permissions.length;",
  "}",
  "",
  "export function Dropped() {",
  "  usePermissions();",
  "  return null;",
  "}",
  "",
  "export function Reads() {",
  "  const { permissions, error } = usePermissions();",
  "  return error === null ? permissions.length : -1;",
  "}",
  "",
  "export function BoundReads() {",
  "  const held = usePermissions();",
  "  return held.error === null ? held.permissions.length : -1;",
  "}",
  "",
].join("\n");

describe("a failed permission read is never no permission (INC-1345)", () => {
  const sources = () =>
    walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"], skipTests: true }).filter(
      (file) => !file.endsWith("/features/permissions/usePermissions.ts"),
    );

  it(
    "PRD-1 every reader of usePermissions in the tree takes error",
    () => {
      const faults = sources().flatMap((file) => readersIn(file).faults);
      expect(report(faults)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it(
    "PRD-2 the reading finds the readers the tree has (a floor)",
    () => {
      const found = sources().reduce((sum, file) => sum + readersIn(file).found, 0);
      expect(found).toBeGreaterThanOrEqual(READER_FLOOR);
    },
    TREE_SCAN_MS,
  );

  it("PRD-3 a planted file's readers are each judged", () => {
    const { found, faults } = readersIn(PLANTED_PATH, PLANTED);
    expect(found).toBe(5);
    expect(faults.map((fault) => fault.line)).toEqual([4, 9, 14]);
  });
});

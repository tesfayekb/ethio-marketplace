import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { allowlistKeys, formFindings, formsCensus, type FormFinding, type FormLaw } from "./forms";
import { readAllowlist, report, TREE_SCAN_MS } from "./kit";

/**
 * DEC-339 (Foundations 2, wave 1) — THE FORM KIT'S FIVE LAWS, judged on every non-test file under
 * src/ by the census in forms.ts. A finding is the kit's own file, a kind DEC-338 exempts, or its
 * law-and-file line in scripts/conformance/forms-allowlist.txt, keyed with the file's count so the
 * list only falls (a count that rises is a new finding; one that falls leaves the line stale).
 * Each law is proven on a planted bypass, read from memory through the same census.
 */

const ALLOWLIST = "scripts/conformance/forms-allowlist.txt";

let tree: FormFinding[] | null = null;
function treeFindings(): FormFinding[] {
  tree ??= formsCensus(process.cwd());
  return tree;
}

/** The tree's findings of one law that no allowlist line excuses (the whole list is validated). */
function unexcused(law: FormLaw, findings: FormFinding[], allowlist = ALLOWLIST): FormFinding[] {
  const keys = allowlistKeys(findings);
  const allowed = readAllowlist(allowlist, keys.keys());
  return [...keys]
    .filter(([key]) => !allowed.has(key))
    .flatMap(([, list]) => list)
    .filter((finding) => finding.law === law);
}

function planted(file: string, text: string, law: FormLaw): string {
  return report(formFindings(file, text).filter((finding) => finding.law === law));
}

describe("the form kit's laws (DEC-339)", () => {
  it(
    "CF-FORM-1 every control sits in the one Field, is not an answer by kind (DEC-338), or is an allowlist line",
    () => {
      expect(report(unexcused("CF-FORM-1", treeFindings()))).toBe("");
      const file = "src/features/x/form.tsx";
      const text = [
        'import { Field } from "@/components/forms/field";',
        "export const A = () => <div>",
        '  <input id="bare" />',
        '  <FormField label="x"><Input id="old" /></FormField>',
        '  <Field id="t" label="t" required refusal={null}>{(c) => <input {...c} />}</Field>',
        '  <input type="file" />',
        '  <input type="search" />',
        '  <input role="searchbox" />',
        "  <TableToolbar><NativeSelect /></TableToolbar>",
        "  <DataTable toolbar={<Input />} />",
        "</div>;",
      ].join("\n");
      expect(planted(file, text, "CF-FORM-1")).toBe(
        [
          "src/features/x/form.tsx:3 <input> outside the one Field",
          "src/features/x/form.tsx:4 <Input> outside the one Field (inside FormField)",
        ].join("\n"),
      );
      expect(planted("src/components/forms/x.tsx", text, "CF-FORM-1")).toBe("");
      expect(planted("src/components/ui/input.tsx", text, "CF-FORM-1")).toBe("");
      expect(planted("src/components/shell/data-table.tsx", text, "CF-FORM-1")).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-FORM-2 every <form> carries noValidate", () => {
    expect(report(unexcused("CF-FORM-2", treeFindings()))).toBe("");
    const text = [
      "export const A = () => <>",
      "  <form onSubmit={go}><button /></form>",
      "  <form noValidate onSubmit={go}><button /></form>",
      "</>;",
    ].join("\n");
    expect(planted("src/features/x/form.tsx", text, "CF-FORM-2")).toBe(
      "src/features/x/form.tsx:2 <form> without noValidate",
    );
  });

  it("CF-FORM-3 a refusal reaches a screen only through the one reader", () => {
    expect(report(unexcused("CF-FORM-3", treeFindings()))).toBe("");
    const text = [
      'import type { MessageKey } from "@/i18n";',
      'export function saveErrorKey(error: unknown) { return "common.error"; }',
      'export const useSaveError = () => "common.error";',
      "export function SaveErrorLine() { return null; }",
      'function words(message: string): MessageKey { return "common.error"; }',
      "export function readErrorKey(error: unknown) { return readRefusal(error, FAMILY).key; }",
      "export function total(count: number): number { return count; }",
    ].join("\n");
    expect(planted("src/features/x/errors.ts", text, "CF-FORM-3")).toBe(
      [
        "src/features/x/errors.ts:2 saveErrorKey maps a refusal outside the one reader",
        "src/features/x/errors.ts:3 useSaveError maps a refusal outside the one reader",
        "src/features/x/errors.ts:4 SaveErrorLine maps a refusal outside the one reader",
        "src/features/x/errors.ts:5 words maps a refusal outside the one reader",
      ].join("\n"),
    );
    expect(planted("src/lib/refusal.ts", text, "CF-FORM-3")).toBe("");
  });

  it("CF-FORM-4 typed numbers pass the one parser: no sentinel, no parse of a control's own value", () => {
    expect(report(unexcused("CF-FORM-4", treeFindings()))).toBe("");
    const text = [
      "const numberOrZero = (raw: string) => Number(raw);",
      'const a = Number(text === "" ? "0" : text);',
      "const b = parseInt(raw, 10) || 0;",
      "const c = Number(raw) ?? 0;",
      "export const A = () => <input onChange={(event) => set(Number(event.target.value))} />;",
      "export const B = () => <select onChange={(event) => set(Number(event.target.value))} />;",
      "const d = Number(row.count);",
    ].join("\n");
    expect(planted("src/features/x/parse.tsx", text, "CF-FORM-4")).toBe(
      [
        "src/features/x/parse.tsx:1 numberOrZero (a sentinel parse)",
        'src/features/x/parse.tsx:2 Number(… ? "0" : …) (a blank read as zero)',
        "src/features/x/parse.tsx:3 a parse defaulted to 0 (a sentinel)",
        "src/features/x/parse.tsx:4 a parse defaulted to 0 (a sentinel)",
        "src/features/x/parse.tsx:5 Number(<a typed control's value>) outside the one parser",
      ].join("\n"),
    );
    expect(
      planted("src/lib/parse-input.ts", text.split("\n").slice(0, 4).join("\n"), "CF-FORM-4"),
    ).toBe("");
  });

  it("CF-FORM-5 one control class: no local field or control class outside the kit", () => {
    expect(report(unexcused("CF-FORM-5", treeFindings()))).toBe("");
    const text = [
      'const fieldClass = "h-11 border";',
      'export const dialogControlClass = "h-9";',
      "function controlClass(refused: boolean) { return refused ? 'a' : 'b'; }",
      'const buttonClass = "h-11";',
    ].join("\n");
    expect(planted("src/features/x/look.ts", text, "CF-FORM-5")).toBe(
      [
        "src/features/x/look.ts:1 fieldClass (a local field or control class)",
        "src/features/x/look.ts:2 dialogControlClass (a local field or control class)",
        "src/features/x/look.ts:3 controlClass (a local field or control class)",
      ].join("\n"),
    );
    expect(planted("src/components/forms/control-class.ts", text, "CF-FORM-5")).toBe("");
  });

  it("CF-FORM-5b the allowlist only falls: a risen count is a finding, a fallen one a stale line", () => {
    const file = "src/features/x/form.tsx";
    const two = formFindings(file, "export const A = () => <><input /><input /></>;");
    const three = formFindings(file, "export const A = () => <><input /><input /><input /></>;");
    const one = formFindings(file, "export const A = () => <><input /></>;");
    const dir = mkdtempSync(join(tmpdir(), "cf-form-"));
    try {
      const path = join(dir, "allowlist.txt");
      writeFileSync(path, `CF-FORM-1 ${file} (2) | planted | DEC-339\n`);
      expect(unexcused("CF-FORM-1", two, path)).toEqual([]);
      expect(() => unexcused("CF-FORM-1", three, path)).toThrow("stale allowance");
      expect(() => unexcused("CF-FORM-1", one, path)).toThrow("stale allowance");
      writeFileSync(path, `CF-FORM-1 ${file} (2) | planted | 2020-01-01\n`);
      expect(() => unexcused("CF-FORM-1", two, path)).toThrow("expired allowance");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

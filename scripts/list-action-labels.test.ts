import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

import { ROOT, flagsOf, readAllowlist, readTree, rowsOf, scan } from "./list-action-labels";

const sample = (text: string) => scan([{ file: "src/sample.tsx", text }]).uses;

describe("action label check — samples", () => {
  it("flags a four-word button and not a three-word one", () => {
    expect(flagsOf("button", "Add a new place", "ቦታ")).toContain("over3");
    expect(flagsOf("button", "Add new place", "ቦታ")).toEqual([]);
  });

  it("does not count a FormField label as an action label", () => {
    const uses = sample(
      `export function Page() { return <FormField label={t("x.name")}><input /></FormField>; }`,
    );
    const rows = rowsOf(uses, { "x.name": "The name of this long field" }, { "x.name": "ስም" });
    expect(rows).toHaveLength(1);
    expect(rows[0]!.kind).toBe("field");
    expect(rows[0]!.flags).toEqual([]);
  });

  it("flags an article and a bracket", () => {
    expect(flagsOf("button", "Add the pin", "ምልክት")).toContain("article");
    expect(flagsOf("menu", "Save (draft)", "አስቀምጥ")).toContain("bracket");
  });

  it("flags a five-word Amharic label", () => {
    expect(flagsOf("button", "Save", "አንድ ሁለት ሶስት አራት አምስት")).toContain("am_over4");
    expect(flagsOf("button", "Save", "አንድ ሁለት ሶስት አራት")).toEqual([]);
  });

  it("counts a button's own words", () => {
    const uses = sample(`export function P() { return <Button>{t("x.go")}</Button>; }`);
    expect(uses.get("x.go")?.[0]?.kind).toBe("button");
  });
});

describe("action label check — the real tree", () => {
  it("flags no action label outside the allowlist", () => {
    const allow = readAllowlist(
      readFileSync(join(ROOT, "scripts/action-label-allowlist.txt"), "utf8"),
    );
    const rows = rowsOf(
      scan(readTree()).uses,
      en as Record<string, string>,
      am as unknown as Record<string, string>,
    );
    const flagged = rows
      .filter((r) => r.flags.length > 0 && !allow.has(r.key))
      .map((r) => `${r.key}: ${r.flags.join(" ")}`);
    expect(flagged).toEqual([]);
  });

  it("reads the verb bars' run-time label keys as buttons", () => {
    const uses = scan(readTree()).uses;
    expect(uses.get("admin.locations.action.createChild")?.some((u) => u.kind === "button")).toBe(
      true,
    );
    expect(uses.get("admin.locations.action.activate")?.some((u) => u.kind === "button")).toBe(
      true,
    );
  });
});

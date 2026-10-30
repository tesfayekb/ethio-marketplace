import { readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, walkFiles } from "./kit";

/**
 * Records turn R8 / R1b, Part A (G0.4 — a class fix carries its guard).
 *
 * CF-E2E-WAIT-1 (INC-1004, DEC-301) — the wait for the language menu to close lives only in
 * switchLanguage (e2e/helpers/ui.ts). A spec that writes `getByRole("menu")` … `toHaveCount(0)`
 * within three lines of a `switchLanguage(` call is a hand copy of it.
 *
 * CF-E2E-PLACE-1 (INC-948) — a test chooses a city in the posting form's place step through
 * pickCity (e2e/helpers/posting.ts). A spec that walks the region picker by itself (a loop that
 * selects a `post-where-region` picker by a loop variable) or counts the city picker's options
 * with a bare `count()` (which never waits) bypasses it.
 *
 * A recorded exception is a line in e2e-waits-allowlist.txt: `file:line | reason | until`.
 */
type Finding = { file: string; line: number; what: string };

const MENU_WAIT = /getByRole\(\s*["']menu["']\s*\)[\s\S]*?toHaveCount\(\s*0\s*\)/;
const SWITCH = /\bswitchLanguage\(/;
const NEAR = 3;
const ALLOWLIST = "scripts/conformance/e2e-waits-allowlist.txt";

/** Names bound to `getByTestId("<testid>")` in a file. */
function boundTo(text: string, testid: string): Set<string> {
  const names = new Set<string>();
  const re = new RegExp(
    String.raw`(?:const|let)\s+(\w+)\s*=\s*[\w.]*getByTestId\(\s*["']${testid}["']\s*\)`,
    "g",
  );
  for (const match of text.matchAll(re)) if (match[1]) names.add(match[1]);
  return names;
}

export function waitFindings(files: { name: string; text: string }[]): Finding[] {
  const found: Finding[] = [];
  for (const { name, text } of files) {
    const lines = text.split("\n");
    // CF-E2E-WAIT-1
    lines.forEach((line, index) => {
      if (!MENU_WAIT.test(line)) return;
      const from = Math.max(0, index - NEAR);
      const near = lines.slice(from, index + NEAR + 1).some((l) => SWITCH.test(l));
      if (near)
        found.push({
          file: name,
          line: index + 1,
          what: "a hand-written menu-closed wait beside switchLanguage (CF-E2E-WAIT-1, INC-1004)",
        });
    });
    // CF-E2E-PLACE-1
    const regions = boundTo(text, "post-where-region");
    const cities = boundTo(text, "post-where-city");
    lines.forEach((line, index) => {
      const bareCount =
        /\.count\(\)/.test(line) &&
        (/getByTestId\(\s*["']post-where-city["']\s*\)/.test(line) ||
          [...cities].some((c) => new RegExp(String.raw`\b${c}\.locator\(`).test(line)));
      if (bareCount)
        found.push({
          file: name,
          line: index + 1,
          what: "a bare count() on the city picker's options; use pickCity (CF-E2E-PLACE-1, INC-948)",
        });
      for (const region of regions) {
        const select = new RegExp(String.raw`\b${region}\.selectOption\(\s*([A-Za-z_]\w*)\s*\)`);
        if (!select.test(line)) continue;
        const loop = lines.slice(Math.max(0, index - NEAR), index).some((l) => /\bfor\s*\(/.test(l));
        if (loop)
          found.push({
            file: name,
            line: index + 1,
            what: "a loop walks the region picker; use pickCity (CF-E2E-PLACE-1, INC-948)",
          });
      }
    });
  }
  return found;
}

describe("CF-E2E-WAIT-1 and CF-E2E-PLACE-1", () => {
  it("no spec copies the menu-closed wait or walks the place step's region picker", () => {
    const root = process.cwd();
    const files = walkFiles([join(root, "e2e")], { ext: ["ts"] })
      .map((file) => relative(root, file).split(sep).join("/"))
      .filter((name) => !name.startsWith("e2e/helpers/"))
      .map((name) => ({ name, text: readFileSync(join(root, name), "utf8") }));
    const all = waitFindings(files);
    const allowed = readAllowlist(
      ALLOWLIST,
      all.map((f) => `${f.file}:${f.line}`),
    );
    const found = all.filter((f) => !allowed.has(`${f.file}:${f.line}`));
    expect(found, report(found)).toEqual([]);
  });

  it("self-test: a planted menu wait and a planted region walk are refused", () => {
    const planted = waitFindings([
      {
        name: "e2e/planted-menu.spec.ts",
        text: [
          'await switchLanguage(page, "am");',
          'await expect(page.getByRole("menu")).toHaveCount(0);',
          'await switchLanguage(page, "en");',
        ].join("\n"),
      },
      {
        name: "e2e/planted-walk.spec.ts",
        text: [
          'const region = page.getByTestId("post-where-region");',
          "for (const value of values) {",
          "  await region.selectOption(value);",
          '  const cityPicker = page.getByTestId("post-where-city");',
          "  if ((await cityPicker.locator(`option[value=\"${city.id}\"]`).count()) === 1) {",
          "  }",
          "}",
        ].join("\n"),
      },
      {
        name: "e2e/clean.spec.ts",
        text: [
          'await page.getByTestId("post-where-region").selectOption(chain.region.id);',
          'await page.getByTestId("post-where-city").selectOption(chain.city.id);',
          'await expect(page.getByRole("menu")).toHaveCount(0);',
        ].join("\n"),
      },
    ]);
    expect(planted.map((f) => `${f.file}:${f.line}`)).toEqual([
      "e2e/planted-menu.spec.ts:2",
      "e2e/planted-walk.spec.ts:5",
      "e2e/planted-walk.spec.ts:3",
    ]);
  });
});

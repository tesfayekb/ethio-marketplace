import { readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-SUB-1 (DEC-288, D240; turn R1b) — SUB-ITEMS OPEN IN A SIDE PANEL, NEVER IN PLACE.
 * One mechanism: submenu-signal.ts (the trigger's first-paint half) and submenu-impl.tsx
 * (the panel, fetched through the overlay loader). The census refuses:
 *  - a rail row that draws its children in place (`<RailRow … depth={depth + 1}`): each
 *    file's count of such sites lives in submenu-allowlist.txt as "<file> (<count>)" and
 *    only falls (the admin groups and the phone split move in R1c/R1d);
 *  - the marketplace tree drilling in place on the persistent rail (CategoryNav's level
 *    is the phone menu's alone);
 *  - a hover intent or side panel built outside the mechanism (its timings by name);
 *  - D244 (INC-1008; R1c): a panel that is never placed again on a resize, or a deeper
 *    level whose floor is 0 (under the top bar) instead of its parent's.
 */
type Finding = { file: string; line: number; what: string };

const NESTED = /<RailRow\b[^>]*depth=\{depth \+ 1\}/;
const MECHANISM = new Set([
  "src/components/ui/submenu-impl.tsx",
  "src/components/ui/submenu-geometry.ts",
  "src/components/shell/submenu/submenu-signal.ts",
]);
const OWN_INTENT = /SUBMENU_(?:OPEN|CLOSE)_MS|inSafeTriangle|placePanel/;
const RAIL = "src/components/shell/app-rail.tsx";
const LEVEL_GATE = /const level = variant === "menu" && levelId/;
const IMPL = "src/components/ui/submenu-impl.tsx";
const RESIZE = /addEventListener\("resize"/;
const FLOOR_ZERO = /depth === 0 \?[^:\n]+:\s*0\b/;

export function submenuFindings(files: { name: string; text: string }[]): {
  counts: Map<string, number>;
  findings: Finding[];
} {
  const counts = new Map<string, number>();
  const findings: Finding[] = [];
  for (const file of files) {
    const code = file.name.endsWith(".css") ? file.text : codeOf(file.text);
    code.split("\n").forEach((text, index) => {
      if (NESTED.test(text)) counts.set(file.name, (counts.get(file.name) ?? 0) + 1);
      if (!MECHANISM.has(file.name) && OWN_INTENT.test(text))
        findings.push({
          file: file.name,
          line: index + 1,
          what: "a hover intent or side panel outside the sub-menu mechanism (CF-SUB-1)",
        });
    });
    if (file.name === IMPL && !RESIZE.test(code))
      findings.push({
        file: IMPL,
        line: 1,
        what: "a panel is never placed again when the window is resized (D244)",
      });
    if (file.name === IMPL && FLOOR_ZERO.test(code))
      findings.push({
        file: IMPL,
        line: 1,
        what: "a deeper panel's floor is 0, under the top bar (D244)",
      });
    if (file.name === RAIL && !LEVEL_GATE.test(code))
      findings.push({
        file: RAIL,
        line: 1,
        what: "the marketplace tree drills in place on the persistent rail (DEC-288)",
      });
  }
  return { counts, findings };
}

const keyOf = (file: string, count: number) => `${file} (${count})`;

describe("CF-SUB-1 sub-items open in a side panel", () => {
  it(
    "no rail draws sub-items in place beyond its falling count, and no second mechanism exists",
    () => {
      const root = process.cwd();
      const files = walkFiles([join(root, "src")], { ext: ["ts", "tsx"], skipTests: true }).map(
        (file) => ({
          name: relative(root, file).split(sep).join("/"),
          text: readFileSync(file, "utf8"),
        }),
      );
      const { counts, findings } = submenuFindings(files);
      const keys = [...counts].map(([file, count]) => keyOf(file, count));
      const allowed = readAllowlist("scripts/conformance/submenu-allowlist.txt", keys);
      const unallowed: Finding[] = keys
        .filter((key) => !allowed.has(key))
        .map((key) => ({ file: key, line: 1, what: "sub-items drawn in place (DEC-288, D240)" }));
      console.log(`[CF-SUB-1] in-place sites: ${keys.join(", ") || "none"}`);
      const all = [...findings, ...unallowed];
      expect(all, report(all)).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("self-test: a planted in-place list, a rail that drills and a second intent are refused", () => {
    const { counts, findings } = submenuFindings([
      {
        name: RAIL,
        text: "const level = levelId ? tree.byId.get(levelId) : undefined;\n<RailRow key={c.key} node={c} depth={depth + 1} />",
      },
      { name: "src/components/planted.tsx", text: "setTimeout(open, SUBMENU_OPEN_MS);" },
      {
        name: "src/components/ui/submenu-impl.tsx",
        text: 'setTimeout(open, SUBMENU_OPEN_MS); window.addEventListener("resize", f);',
      },
    ]);
    expect([...counts]).toEqual([[RAIL, 1]]);
    expect(findings.map((f) => f.what)).toEqual([
      "the marketplace tree drills in place on the persistent rail (DEC-288)",
      "a hover intent or side panel outside the sub-menu mechanism (CF-SUB-1)",
    ]);
  });

  it("self-test (D244): a panel placed once, and a deeper floor of 0, are refused", () => {
    const { findings } = submenuFindings([
      {
        name: "src/components/ui/submenu-impl.tsx",
        text: "const placed = placePanel({ minTop: Math.max(0, depth === 0 ? edge.top : 0) });",
      },
    ]);
    expect(findings.map((f) => f.what)).toEqual([
      "a panel is never placed again when the window is resized (D244)",
      "a deeper panel's floor is 0, under the top bar (D244)",
    ]);
  });
});

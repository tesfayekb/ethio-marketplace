import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, walkFiles, TREE_SCAN_MS } from "./kit";

/**
 * CF-AREA-1 (D267, turn F4a, DEC-315) — ONE READER OF THE VISIBLE AREA. An open list's room
 * comes only from src/lib/visible-area.ts. The domain, by definition: every non-test file in
 * src. The census refuses:
 *  - a placement read of the chrome (a querySelector naming `data-chrome`, the phone bottom
 *    bar `bottom-bar`, the form action bar `form-layout-actions`, or from turn S5 the shell's
 *    bands `shell-band` / `shell-subband`) outside visible-area.ts;
 *  - a DropdownMenuContent or PopoverContent given its own collisionPadding (each owner reads
 *    the area on open; F4a-2 adds the popover);
 *  - an import of visible-area.ts outside its readers — the facade's on-demand impls (the
 *    menu's, and from turn S6-3 the popover's, popover-impl.tsx) and the searchable picker;
 *    from turn S5 the ad page's section bar (listing-detail.tsx) reads it by a dynamic import
 *    only (loadOnce, ruling 1 answer 2), so the first download stays without it.
 * Exceptions are lines `key | reason | until` in visible-area-allowlist.txt (empty, ruled).
 */
type Finding = { file: string; line: number; what: string };
type Src = { name: string; text: string };

export const AREA_MODULE = "src/lib/visible-area.ts";
export const AREA_READERS = new Set([
  "src/components/ui/dropdown-menu-impl.tsx",
  "src/components/searchable-picker.tsx",
  "src/components/ui/popover-impl.tsx",
]);
/** Readers that fetch the module on demand only (a dynamic import, never `from`). */
export const AREA_ON_DEMAND = new Set(["src/features/posting/preview/listing-detail.tsx"]);
const CHROME_READ =
  /querySelector(?:All)?\s*(?:<[^>()]*>)?\(\s*["'`][^"'`]*(?:data-chrome|data-testid=\\?["']?(?:bottom-bar|form-layout-actions|shell-band|shell-subband)\\?["']?\])/g;
const OWN_PADDING = /<(?:DropdownMenuContent|PopoverContent)\b[^>]*\bcollisionPadding\s*=/g;
const IMPORTS_AREA = /from\s+["'](?:@\/lib\/visible-area|[./]+lib\/visible-area)["']/g;
const FETCHES_AREA = /import\(\s*["'](?:@\/lib\/visible-area|[./]+lib\/visible-area)["']\s*\)/g;

export function areaFindings(files: Src[]): { findings: Finding[]; keys: string[] } {
  const findings: Finding[] = [];
  const keys: string[] = [];
  for (const { name, text } of files) {
    if (name === AREA_MODULE) continue;
    const code = codeOf(text);
    const push = (index: number, part: string, what: string) => {
      keys.push(`${name}#${part}`);
      findings.push({ file: name, line: code.slice(0, index).split("\n").length, what });
    };
    for (const m of code.matchAll(CHROME_READ))
      push(m.index ?? 0, "chrome", "reads the chrome itself; use visibleArea() (D267)");
    if (
      name !== "src/components/ui/dropdown-menu-impl.tsx" &&
      name !== "src/components/ui/popover-impl.tsx"
    )
      for (const m of code.matchAll(OWN_PADDING))
        push(m.index ?? 0, "padding", "a menu with its own collisionPadding (D267)");
    if (!AREA_READERS.has(name))
      for (const m of code.matchAll(IMPORTS_AREA))
        push(m.index ?? 0, "import", "imports visible-area.ts outside its on-demand readers");
    if (!AREA_READERS.has(name) && !AREA_ON_DEMAND.has(name))
      for (const m of code.matchAll(FETCHES_AREA))
        push(m.index ?? 0, "fetch", "fetches visible-area.ts outside its on-demand readers");
  }
  return { findings, keys };
}

describe("CF-AREA-1 — an open list's room comes from one reader (D267)", () => {
  it(
    "the tree: no own chrome read, no own menu padding, no first-paint import",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).map((name) => ({
        name: name.split("\\").join("/"),
        text: readFileSync(name, "utf8"),
      }));
      const { findings, keys } = areaFindings(files);
      const allowed = readAllowlist("scripts/conformance/visible-area-allowlist.txt", keys);
      expect(allowed.size).toBe(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("VA-1: a planted read of the bottom bar for placement fails", () => {
    const { findings } = areaFindings([
      {
        name: "src/x.tsx",
        text: `const b = document.querySelector<HTMLElement>('[data-testid="bottom-bar"]');`,
      },
    ]);
    expect(report(findings)).toContain("reads the chrome itself");
  });

  it("VA-2: a planted menu with its own collision padding fails", () => {
    const { findings } = areaFindings([
      {
        name: "src/x.tsx",
        text: `const a = <DropdownMenuContent collisionPadding={16}>x</DropdownMenuContent>;`,
      },
    ]);
    expect(report(findings)).toContain("own collisionPadding");
    const popover = areaFindings([
      {
        name: "src/x.tsx",
        text: `const a = <PopoverContent collisionPadding={16}>x</PopoverContent>;`,
      },
    ]);
    expect(report(popover.findings)).toContain("own collisionPadding");
  });

  it("VA-3: a planted first-paint import fails; the two readers and a clean file pass", () => {
    const planted = areaFindings([
      {
        name: "src/components/shell/app-header.tsx",
        text: `import { visibleArea } from "@/lib/visible-area";`,
      },
    ]);
    expect(report(planted.findings)).toContain("outside its on-demand readers");
    const clean = areaFindings([
      {
        name: "src/components/searchable-picker.tsx",
        text: `import { visibleArea } from "@/lib/visible-area";`,
      },
      {
        name: "src/y.tsx",
        text: `const a = <DropdownMenuContent align="end">x</DropdownMenuContent>;`,
      },
    ]);
    expect(clean.findings).toEqual([]);
  });

  it("VA-4: the popover's facade reading the area fails; its on-demand impl passes (turn S6-3)", () => {
    const text = `import { collisionPaddingNow } from "@/lib/visible-area";`;
    const { keys } = areaFindings([
      { name: "src/components/ui/popover.tsx", text },
      { name: "src/components/ui/popover-impl.tsx", text },
    ]);
    expect(keys).toEqual(["src/components/ui/popover.tsx#import"]);
  });

  it("VA-5: a planted read of the shell's sub-band for a sticky offset fails (turn S5)", () => {
    const { findings } = areaFindings([
      {
        name: "src/features/posting/preview/listing-detail.tsx",
        text: `const s = document.querySelector<HTMLElement>('[data-testid="shell-subband"]');`,
      },
    ]);
    expect(report(findings)).toContain("reads the chrome itself");
  });

  it("VA-6: the ad page fetches the area on demand only; its static import and a stranger's fetch fail (turn S5)", () => {
    const fetches = `const AREA = loadOnce(() => import("@/lib/visible-area"));`;
    const { keys } = areaFindings([
      { name: "src/features/posting/preview/listing-detail.tsx", text: fetches },
      {
        name: "src/routes/l.$slug.tsx",
        text: `import { watchChromeTop } from "@/lib/visible-area";`,
      },
      {
        name: "src/features/posting/preview/photo-gallery.tsx",
        text: `import { watchChromeTop } from "@/lib/visible-area";`,
      },
      { name: "src/components/shell/app-header.tsx", text: fetches },
    ]);
    expect(keys).toEqual([
      "src/routes/l.$slug.tsx#import",
      "src/features/posting/preview/photo-gallery.tsx#import",
      "src/components/shell/app-header.tsx#fetch",
    ]);
    const statically = areaFindings([
      {
        name: "src/features/posting/preview/listing-detail.tsx",
        text: `import { watchChromeTop } from "@/lib/visible-area";`,
      },
    ]);
    expect(statically.keys).toEqual(["src/features/posting/preview/listing-detail.tsx#import"]);
  });
});

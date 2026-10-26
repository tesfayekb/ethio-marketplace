# Foundations — turn 32b, ruling 1: D1's proof inside SCOPE; INC-910 — the E2E colour reader reads oklab (turn 33's CI red): brief (saved unchanged, 2026-10-26)

```text
RULING — FOUNDATIONS TURN 32b, STOP 1 (2026-10-26; INC-908; INC-910; S431, the supervisor's slip: the brief's D1 planted its proof in src/components/app-shell.tsx, a file outside its SCOPE, and said vaul and cmdk had no importer; anchors located at ba37841d81e43ec78123c49eb27f6fcd1f849e05). Tier A. No migration. No new string. No package change. No file deleted. No AGENTS.md change. Base: dev ba37841d81e43ec78123c49eb27f6fcd1f849e05 (your stop landing). This brief replaces docs/governance/briefs/foundations-turn-32b.md as the brief in force for the rest of the turn: every part of that saved file not yet done — D1's proof, Part E, THE CHECKS, THE END-TO-END CHECK and THE COMPLETION REPORT — is done from it exactly as written (its sha256 stays dbffb3ff686d5943b5575033f9e1606339097850160eff6b46b7869ccdac119c), with the changes below. Order: STEP 0; R1; R2; then Part E, THE CHECKS (R3), THE END-TO-END CHECK (with R2c), the report (R4) and the landing.
BASE: ba37841d81e43ec78123c49eb27f6fcd1f849e05
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
src/components/ui/overlay-facade.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/ui/modal-facade.test.tsx
scripts/check-marketplace-imports.mjs
e2e/helpers/colors.ts
src/test/e2e-colors.test.ts
SCOPE-END

THE SYSTEM (G0) — the concern this ruling adds (INC-908's header in foundations-turn-32b.md stands).
CONCERN: a test reads a colour as a person sees it — every form in which the browser reports a computed colour is read the same way.
MECHANISM: e2e/helpers/colors.ts (`fillOf`, `isRedFill`, `isGoldFill`) reads oklch() and rgb() only (:19, :25, :34, :40 at BASE). Chromium reports every colour Tailwind mixes as oklab(): a hovered `bg-destructive/90` (src/components/ui/button.tsx :14) computes to `oklab(0.5 0.158405 0.0896211 / 0.9)` — measured in the workspace's Chromium — so a red button under the resting pointer reads "not red". R2 puts one reader, `okLchOf` (oklch() and oklab() as chroma, hue and alpha), under both predicates; a fill a person sees as its colour is at least half opaque (a 10% wash is not); rgb() keeps its reading.
CONSUMERS (grep at BASE: every call of `isRedFill` or `isGoldFill`): e2e/admin-translations-governance.spec.ts TR-31; e2e/admin-attributes-library.spec.ts AT-6, AT-79; e2e/admin-screening.spec.ts SC-12, SC-14; e2e/admin-categories-home.spec.ts CT-39; e2e/photo-pipeline.spec.ts PP-19; e2e/admin-locations.spec.ts LT-5; e2e/admin-categories-lifecycle.spec.ts CT-13 — all through the reader; no spec parses oklch() or oklab() itself. The specs that compare a computed colour with a token's own computed value (e2e/post-wizard-where.spec.ts :52-:54, :564-:566, :640; e2e/shell.spec.ts :950-:979; e2e/my-listings-ad.spec.ts :934; e2e/post-wizard-specs.spec.ts :1996, :2011, :2071; e2e/photo-pipeline.spec.ts :1023; e2e/admin-attributes-library.spec.ts :550, :566) compare like with like and read no form — K2, left.
COVERED HERE: every consumer above (the change is inside the reader). LEFT: none.
CONFORMANCE GUARD: NEW src/test/e2e-colors.test.ts (EC-1…5: the red and gold tokens and their hovered mixes as Chromium reports them; a 10% wash, the primary green, a grey and an unknown form are no red fill; rgb() keeps its reading; oklab's a and b as chroma and hue, a percentage alpha), red first against BASE's reader (R2a).
EXCEPTIONS: none.
FIVE LENSES — security: none (test code only) · performance: none · failure modes: a form the reader does not know still reads false (EC-3), never a guess · consistency: one reader for every form, both predicates · future growth: a new colour family is one predicate over `okLchOf`; the Sage redesign's colours come through the same tokens and Tailwind mixes.
FORWARD-SCAN: the Sage redesign (before Stage 2) restyles through the same tokens — the reader takes its mixes. REGISTER: none (a test helper; the records turn lists it).

INC-910 (registered 2026-10-26): turn 33's run 40259346793 on fe0ceee failed on one test — e2e/admin-translations-governance.spec.ts TR-31, mobile-360, lane 3: "TR-31: the delete confirmation is not red", the poll false for its whole 10 s; every other job and test passed (2201 passed). Cause: the reader's forms (above). The pointer rests where the roster's Delete was clicked, and turn 33's device fonts — the only change since the green run 40255222082 — moved the dialog's Delete button under it (a hypothesis R2 makes moot: a red at 90% is red). Class: concern "a test reads a drawn colour"; mechanism e2e/helpers/colors.ts.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-32b-r1.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-32b-r1.md (Foundations turn 32b, ruling 1: D1's proof inside SCOPE; INC-910 — the E2E colour reader reads oklab, turn 33's CI red)` (everything after it stays). Tick nothing else. Commit: `turn 32b: ruling 1 saved`.

R1. D1's planted proof, inside SCOPE (never committed): add the line `import "vaul";` as the first line of src/components/ui/overlay-facade.tsx (the weight guard reaches it from src/components/app-shell.tsx through the overlay facades) and run `node scripts/check-marketplace-imports.mjs` — it must print `findings: 1` and `  src/components/ui/overlay-facade.tsx imports vaul`; paste both; then `git checkout -- src/components/ui/overlay-facade.tsx`, check its sha256 is 41fe33c859ce982bfef8097ab93d3392ccbaaff7c0fb68ab2c7fa090ca1d919e, and run the guard again: `findings: 0`. Your correction is accepted and goes in the report: src/components/ui/drawer.tsx :2 imports vaul and src/components/ui/command.tsx :5 imports cmdk; nothing imports either wrapper, so neither package reaches a page today.

R2. INC-910 (A1 of foundations-turn-32b.md: a red on BASE is fixed first at its root) — before Part E.
R2a. NEW src/test/e2e-colors.test.ts (sha256 c67471c705736bd0daa2c60a7d0fdd64302b2a893fd2c654692d5a54ded8d25a):
FILE-BEGIN src/test/e2e-colors.test.ts
/**
 * INC-910 — the E2E colour reader (e2e/helpers/colors.ts). A browser reports a
 * colour Tailwind mixes (`bg-destructive/90` on hover, every `/NN` opacity) as
 * oklab(); the reader takes oklch(), oklab() and rgb() alike, and a fill a
 * person sees as a colour is at least half opaque.
 */
import { describe, expect, it } from "vitest";

import { isGoldFill, isRedFill, okLchOf } from "../../e2e/helpers/colors";

describe("the E2E colour reader (INC-910)", () => {
  it("EC-1 the red tokens, light and dark, and their hovered 90% mix as Chromium reports it, are red", () => {
    expect(isRedFill("oklch(0.5 0.182 29.5)")).toBe(true);
    expect(isRedFill("oklch(0.704 0.191 22.216)")).toBe(true);
    expect(isRedFill("oklab(0.5 0.158405 0.0896211 / 0.9)")).toBe(true);
  });

  it("EC-2 the gold tokens and their hovered mix are gold, and not red", () => {
    expect(isGoldFill("oklch(0.681 0.13 72.5)")).toBe(true);
    expect(isGoldFill("oklch(0.769 0.128 78.3)")).toBe(true);
    expect(isGoldFill("oklab(0.681 0.039091 0.123986 / 0.9)")).toBe(true);
    expect(isRedFill("oklch(0.681 0.13 72.5)")).toBe(false);
  });

  it("EC-3 a pale wash (10%), the primary green, a grey and an unknown form are no red fill", () => {
    expect(isRedFill("oklab(0.5 0.158405 0.0896211 / 0.1)")).toBe(false);
    expect(isRedFill("oklch(0.52 0.11 163)")).toBe(false);
    expect(isRedFill("oklab(0.52 -0.105 0.032 / 0.9)")).toBe(false);
    expect(isRedFill("oklch(0.97 0 0)")).toBe(false);
    expect(isRedFill("color(srgb 1 0 0)")).toBe(false);
  });

  it("EC-4 rgb() keeps its reading", () => {
    expect(isRedFill("rgb(180, 35, 24)")).toBe(true);
    expect(isGoldFill("rgb(201, 138, 43)")).toBe(true);
    expect(isRedFill("rgb(255, 255, 255)")).toBe(false);
  });

  it("EC-5 oklab's a and b become chroma and hue, a percentage alpha is read", () => {
    const lch = okLchOf("oklab(0.5 0.158405 0.0896211 / 90%)");
    expect(lch?.chroma).toBeCloseTo(0.182, 3);
    expect(lch?.hue).toBeCloseTo(29.5, 1);
    expect(lch?.alpha).toBeCloseTo(0.9, 5);
    expect(okLchOf("oklab(0.52 -0.105 -0.032)")?.hue).toBeGreaterThan(180);
    expect(okLchOf("rgb(1, 2, 3)")).toBeNull();
  });
});
FILE-END src/test/e2e-colors.test.ts
Red first: `bunx vitest run src/test/e2e-colors.test.ts` against BASE's reader — EC-1, EC-2 and EC-5 fail (EC-5 with `TypeError: okLchOf is not a function`), EC-3 and EC-4 pass; paste the lines. The red test is committed only with R2b.
R2b. e2e/helpers/colors.ts, its whole text (sha256 328d4eda9951cac9cfb6503f4175ddfe7710235e1e7c23bc097ab7e136e994ab):
FILE-BEGIN e2e/helpers/colors.ts
import type { Locator } from "@playwright/test";

/**
 * Bundle 11 A3 — a button's fill as a person sees it (the browser's computed
 * background colour), and whether that fill is the destructive red. The app's
 * red is oklch(0.5 0.182 29.5) in light and oklch(0.704 0.191 22.216) in dark
 * (src/styles.css); the primary green sits near hue 163. A browser reports the
 * colour as oklch(), as oklab() — every colour Tailwind mixes, such as a hovered
 * `bg-destructive/90` (INC-910) — or as rgb(); all three are read.
 */
export async function fillOf(locator: Locator): Promise<string> {
  return locator.evaluate((element) => getComputedStyle(element).backgroundColor);
}

/** A colour as OKLCH's chroma and hue (degrees, 0–360) with its alpha (0–1). */
export interface OkLch {
  chroma: number;
  hue: number;
  alpha: number;
}

function alphaOf(raw: string | undefined): number {
  if (raw === undefined) return 1;
  return raw.endsWith("%") ? Number(raw.slice(0, -1)) / 100 : Number(raw);
}

/**
 * INC-910 — oklch() and oklab() read as chroma, hue and alpha (oklab's a and b
 * are the same chroma and hue in Cartesian form); null for any other form.
 */
export function okLchOf(color: string): OkLch | null {
  const lch = /^oklch\(\s*[\d.]+%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i.exec(color);
  if (lch) return { chroma: Number(lch[1]), hue: Number(lch[2]), alpha: alphaOf(lch[3]) };
  const lab = /^oklab\(\s*[\d.]+%?\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i.exec(
    color,
  );
  if (lab) {
    const a = Number(lab[1]);
    const b = Number(lab[2]);
    const degrees = (Math.atan2(b, a) * 180) / Math.PI;
    return {
      chroma: Math.hypot(a, b),
      hue: degrees < 0 ? degrees + 360 : degrees,
      alpha: alphaOf(lab[3]),
    };
  }
  return null;
}

/** A fill a person sees as its colour is at least half opaque (a 10% wash is not). */
const SEEN_ALPHA = 0.5;

/**
 * D163 — whether a colour is the system's gold: oklch(0.681 0.13 72.5) in light
 * and oklch(0.769 0.128 78.3) in dark (src/styles.css; #C98A2B and #E0A94A).
 */
export function isGoldFill(color: string): boolean {
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.08 && lch.hue >= 60 && lch.hue <= 95;
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return red >= 150 && red > green && green >= 100 && green - blue >= 40;
  }
  return false;
}

export function isRedFill(color: string): boolean {
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.1 && (lch.hue <= 45 || lch.hue >= 340);
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return red >= 150 && red - green >= 60 && red - blue >= 60;
  }
  return false;
}
FILE-END e2e/helpers/colors.ts
Then `bunx vitest run src/test/e2e-colors.test.ts` (5 passed; paste), `bun run typecheck`, `bun run lint`. Commit: `turn 32b: INC-910 — the E2E colour reader reads oklab`.
R2c. touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. The reader's nine tests by id, each spec file alone, both projects, 0 retries, through `bun run e2e:local -- <spec file> --grep "<ids>"`: e2e/admin-translations-governance.spec.ts "TR-31 "; e2e/admin-attributes-library.spec.ts "AT-6 |AT-79 "; e2e/admin-screening.spec.ts "SC-12 |SC-14 "; e2e/admin-categories-home.spec.ts "CT-39 "; e2e/photo-pipeline.spec.ts "PP-19 "; e2e/admin-locations.spec.ts "LT-5 "; e2e/admin-categories-lifecycle.spec.ts "CT-13 "; paste every count line and the server log's `[ssr-error]` count. These run with THE END-TO-END CHECK.

R3. THE CHECKS of foundations-turn-32b.md, as written, with two changes: `bun run test:unit` now expects 306 files, 1904 tests, every one passed (the supervisor's run of this tree: the brief's 305 / 1899 and EC-1…5); and after its hash list run `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-32b-r1.md | sha256sum -c` — these two lines print OK:
328d4eda9951cac9cfb6503f4175ddfe7710235e1e7c23bc097ab7e136e994ab  e2e/helpers/colors.ts
c67471c705736bd0daa2c60a7d0fdd64302b2a893fd2c654692d5a54ded8d25a  src/test/e2e-colors.test.ts

R4. THE COMPLETION REPORT is docs/governance/reports/foundations-turn-32b-r1.report.md (land.ts names the report after the brief in force), with the twelve headings of .claude/rules/60-report.md, covering the whole turn — everything foundations-turn-32b.md asks of its report, plus R1's proof lines, R2a's red lines, R2b's green line, R2c's count lines and INC-910 under Departures; the roadmap's turn-32b line is ticked as foundations-turn-32b.md says. Commit it on its own (`turn 32b: report`), run bun .claude/hooks/land.ts with a Bash timeout of 1800000 ms, and END THE TURN when it prints LANDED or HELD; the supervisor reads the run.
```

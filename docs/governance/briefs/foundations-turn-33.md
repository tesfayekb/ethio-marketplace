# Foundations — turn 33: speed S10 — the device's own fonts: no page downloads a font (D234, DEC-262): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS BUNDLE — TURN 33 (2026-10-26; DEC-237; D234 — the operator: "it should be the fastest, lightweight … VERY IMPORTANT"; DEC-262 — the operator's decision of 2026-10-26, "all as recommended": fonts option (a), the device's own fonts, 0 KB; anchors located at c38e953557b995369ab117cc12961d45f3981266). Tier B (the stylesheet's tokens and the document head; no data, no door), with a Tier A guard (the first paint). No migration. No new string. No package change. No file deleted. AGENTS.md: one new line, Fonts (D5). Base: dev c38e953557b995369ab117cc12961d45f3981266 (turn 32's final commit). Checked by script against AGENTS.md: no new control; no map read by an outside key; no silent catch; no `!`; no `.first()` in e2e. ONE TURN. Parts, IN THIS ORDER: A — orient and CI first; STEP 0; B — the census and the device's fonts (one commit); C — the browser; D — docs, register, changelog, AGENTS.md; then THE CHECKS, THE END-TO-END CHECK, the report and the landing.
BASE: c38e953557b995369ab117cc12961d45f3981266
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/styles.css
src/routes/__root.tsx
scripts/conformance/fonts.test.ts
e2e/fonts.spec.ts
scripts/e2e-select.ts
AGENTS.md
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a page's typeface — every page draws with the device's own fonts through one stack per role, and no page downloads a font.
MECHANISM: src/styles.css's tokens `--font-sans` and `--font-display` (`@theme inline`, :116-:117 at BASE) and its base rules (`body` :360, `h1`–`h3` :366); Tailwind's `font-sans` and `font-display` read them. Part B makes `--font-sans` the device's stack and `--font-display` the same (`var(--font-sans)`), and removes the two Google Fonts stylesheets and their preconnects from src/routes/__root.tsx (:340-:344, :354-:361 at BASE). The standard: the platform UI stacks the large design systems use (GitHub's and Bootstrap's), with the Ethiopic faces each platform ships named per glyph; `system-ui` left out (on Windows it follows the system's locale font).
CONSUMERS (grep at BASE, every file under src/, public/, e2e/ and scripts/ that names a font family, a web-font host, `@font-face`, a font file or `fontFamily`): src/routes/__root.tsx :340-:344 (the comment and the two preconnects), :354-:361 (the two stylesheets); src/styles.css :112-:117 (the comment and the two tokens), :360, :366 (the base rules); `font-display` users — src/components/brand/logo.tsx :72 (the wordmark), src/features/posting/preview/listing-detail.tsx :697, :1054, :1082, :1115 — they keep the class; src/components/shell/use-footer-inset.ts :99-:100 (`document.fonts.ready`, which resolves at once with no web font — kept); e2e/helpers/ui.ts :1465 (measures text with the element's own font, D104 — kept). No `@font-face`, font file, `font-[…]` class or `fontFamily:` exists under src/ or public/; no service worker or CSP names a font host.
COVERED HERE: every consumer above. LEFT: none. The records that describe the old fonts — docs/features/design-foundation.md (Typography, Verified posture) and docs/features/performance-strategy.md (the font bullet) — are rewritten in Part D; the ledger's history stays.
CONFORMANCE GUARD: NEW scripts/conformance/fonts.test.ts — CF-FT-1 (every source and stylesheet under src/ and public/, tests aside, and every font file there: a web-font host, `@font-face`, a font file, a family set by name, a font token outside src/styles.css each fail); CF-FT-2 (the two tokens pinned; the base rules use them); CF-FT-3 (the census on a planted tree). Shown red at BASE (B2: exactly the four Google Fonts lines). The browser's side: NEW e2e/fonts.spec.ts FTE-1, in the selector's house-style area.
EXCEPTIONS: none.
FIVE LENSES — security: two third-party origins leave every page (no font request leaks a visit to Google); nothing new is read or sent · performance: the first paint no longer waits on two render-blocking stylesheets from another origin (ESTIMATE 1–1.5 s sooner on the lab's phone over slow 4G; judged on the lab after Publish); every page 87 KB lighter, an Amharic ad page up to 281 KB (turn 23's lab); the supervisor's build: the entry 254.1 → 253.9 KiB, CSS 20.5 KiB, no page ceiling moves · failure modes: a device without an Ethiopic face falls back to the browser's own fallback, as a blocked font server already did · consistency: one stack, two roles, one census; the wordmark and every heading keep their weights; tests measure the visible characters with the element's own font (D104) · future growth: a new script's face joins the stack; a brand face, if ever chosen, is an ADR — one self-hosted, subset, non-blocking file, one token change and one allowlist line in the census.
FORWARD-SCAN: the operator's UI redesign before Stage 2 picks its look on these tokens; DEC-261 (turns 34–35) and DEC-263 (edge caching) touch none of these files. REGISTER: docs/governance/mechanisms.md row 49 (D2).

WHY
- Turn 23's lab found two Google Fonts stylesheets in front of every first paint and 87 KB of Latin fonts on every page (281 KB with the three Ethiopic weights on an Amharic ad page). The operator chose the device's own fonts: 0 KB, nothing to wait for.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-33.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-33.md (Foundations turn 33: speed S10 — the device's own fonts: no page downloads a font — D234, DEC-262)` (everything after it stays); the line that begins "  - [x] Turn 32 (docs/governance/briefs/foundations-turn-32.md" is replaced by this line:
  - [x] Turn 32 (docs/governance/briefs/foundations-turn-32.md; no migration; the Claude Code executor) — speed S9: the dialogs' code on demand (DEC-260) — Dialog, Sheet and AlertDialog on facades (dialog-primitive.tsx, alert-dialog-primitive.tsx) over ModalRoot / ModalTrigger / ModalPart; their Radix code joins overlays-impl.ts; the phone rail and the toolbar panel on the facade; CF-OV extended; OVF-11…16; OVE-3; the entry 260.0 → 254.1 KiB. Final HEAD c38e9535; CI run 40255222082: SUCCESS, every job, and main promoted to c38e9535; unit 304 files / 1894 passed; browser 16 passed / 4 project skips; the executor's reviewer found INC-908 (turn 32b).
and the line that begins "  - [ ] Turn 33 — speed S10" is replaced by these two lines:
  - [ ] Turn 33 (docs/governance/briefs/foundations-turn-33.md; no migration; the Claude Code executor) — speed S10: the phone's own fonts (DEC-262, the operator 2026-10-26): the render-blocking Google Fonts stylesheets and the web-font families leave; the device's font stack for every script, Amharic on the phone's Ethiopic font; no layout or behaviour change.
  - [ ] Turn 32b (after turn 33; no migration; the Claude Code executor) — INC-908: a modal whose code fails to download tells its owner it did not open (ModalRoot), so the next opening asks again — found by the executor's reviewer of turn 32; OVF-17 and OVF-18 red first; the weight guard forbids vaul and cmdk on the first paint.
On line 3, also replace exactly `Before Stage 2: the operator's major UI redesign (the operator, 2026-10-22);` with `Before Stage 2: the operator's major UI redesign — the Sage 3D look and feel and the left rail's new behaviour (the operator, 2026-10-22; his design files of 2026-10-25; the display face decided then, a DEC owed — a brand face returns only as one self-hosted, subset, non-blocking file through the CF-FT allowlist);`. Tick nothing else. Commit: `turn 33: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B–D, one commit per part; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN. Do not stop anywhere else. A STOP (a rule conflict, a file outside SCOPE, a census hit this brief did not anticipate, an environment limit) is landed as 00-executor-protocol.md says: commit what is green, write docs/governance/reports/foundations-turn-33.stop-<n>.md, commit it, land, end the turn; the supervisor answers in this session with "continue" or a numbered ruling.
- EXACT TEXT (INC-907): every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text — apply it with your file-editing tool; every line this brief gives is copied, never paraphrased. Copy each block from the saved brief (docs/governance/briefs/foundations-turn-33.md), never from memory or a summary of it: if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's own hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- RED FIRST (G38): B2 runs the new census against BASE's styles.css and __root.tsx and shows it red before B3–B4 change them; the red census is never committed.
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn adds e2e/fonts.spec.ts (read-only: no rows).
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/features/design-foundation.md, docs/features/performance-strategy.md, docs/features/ci-guards.md, docs/_changelog.md, docs/governance/mechanisms.md, roadmap.md, the brief and the report. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each part's commit, `bun run typecheck`, `bun run lint` and the tests the part touched pass.
- Known limits: EXH-11, EXH-12, EXH-17 and EXH-19 have timed out in sandboxes (INC-890); if one times out here, paste its failure line under Limits and do not change, skip or work around it. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS; the tests each part touches as you go; THE END-TO-END CHECK's tests through `bun run e2e:local -- <spec file>`, both projects, 2 workers, fake mode, 0 retries, each Bash call with a timeout of 1800000 ms; stop any preview server a killed run left on port 4173 before the next run; no local repeat runs (DEC-184); a run that is killed or cut short is reported as such and never re-run in the background (S407). When `node scripts/check-bundle-size.mjs` fails after your build, paste its whole output and STOP — never move a ceiling yourself.
- Behaviour contract: every page shows what it shows today, at the same sizes, weights, colours and places; only the typeface of the text changes (the device's own); no request reaches a font server and no font file is downloaded. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every place under src/, public/, e2e/ and scripts/ that names a font family, a web-font host, `@font-face`, a font file or sets a family by name (none may remain outside src/styles.css's tokens, the census's own test file and e2e/fonts.spec.ts); K3 the census, its test and FTE-1 land with the change; K4 no literal language code; K5, K6 do not arise.
- Tests (G27, G38): no real row (FTE-1 only reads the home and terms pages); no assertion loosened; the census is shown red at BASE (B2).
- If any rule of yours conflicts with this text, STOP and quote that rule's exact words in a stop report.

PART A — ORIENT AND CI FIRST.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says (fetch; local dev brought level as a fast-forward — the session setup did it at startup; git switch dev); paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. Read CI with the two-step check (.claude/rules/40-ci-evidence.md): git show origin/ci-evidence:docs/tracking/ci-status.md | head -6, then e2e-last-failure.md and guards-last-failure.md the same way; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE c38e9535 (turn 32) — run 40255222082, SUCCESS on every job; main promoted). A red on BASE is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part C.

PART B — THE CENSUS AND THE DEVICE'S FONTS (ONE COMMIT).
B1. NEW scripts/conformance/fonts.test.ts (sha256 d9624cb3dc85a7b6d03d7eca9b04cf98d5a82e125669f72cb32b033a4a657b75):
FILE-BEGIN scripts/conformance/fonts.test.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * DEC-262 (Foundations turn 33; D234 speed S10) — NO PAGE DOWNLOADS A FONT. Every
 * page draws with the device's own fonts through the two tokens src/styles.css
 * defines (--font-sans; --font-display, the same stack). Nothing under src/ or
 * public/ names a web-font host, declares @font-face or ships a font file; a
 * font family is set only through the tokens (Tailwind's font-sans and
 * font-display, or `font-family: var(--font-…)`), never by name.
 */
type Finding = { file: string; line: number; what: string };

const FONT_HOST = /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net/;
const FONT_FILE = /\.(?:woff2?|ttf|otf|eot)$/i;
const TOKENS = "src/styles.css";
const RULE = "(DEC-262: the device's own fonts; no page downloads a font)";

/** Every way a file under src/ or public/ could bring a web font back or set a family by name. */
export function fontFindings(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    if (FONT_FILE.test(name)) {
      found.push({ file: name, line: 1, what: `is a font file ${RULE}` });
      continue;
    }
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((text, index) => {
        const line = index + 1;
        if (FONT_HOST.test(text))
          found.push({ file: name, line, what: `names a web-font host ${RULE}` });
        if (/@font-face/.test(text))
          found.push({ file: name, line, what: `declares @font-face ${RULE}` });
        if (/\bfontFamily\s*:|\bfont-\[/.test(text))
          found.push({
            file: name,
            line,
            what: `sets a font family by name; use font-sans or font-display ${RULE}`,
          });
        const family = /font-family\s*:\s*([^;]*)/.exec(text);
        if (family !== null && !/^var\(--font-(?:sans|display)\)$/.test(family[1].trim()))
          found.push({
            file: name,
            line,
            what: `sets a font family by name; use var(--font-sans) or var(--font-display) ${RULE}`,
          });
        if (/--font-(?:sans|display)\s*:/.test(text) && name !== TOKENS)
          found.push({ file: name, line, what: `defines a font token outside ${TOKENS} ${RULE}` });
      });
  }
  return found;
}

const ROOT = process.cwd();
const TEXT = ["ts", "tsx", "css", "html", "js", "mjs", "svg"];
const FONTS = ["woff", "woff2", "ttf", "otf", "eot"];

describe("no page downloads a font (DEC-262)", () => {
  it(
    "CF-FT-1 nothing under src/ or public/ names a web-font host, declares @font-face, ships a font file or sets a family by name",
    () => {
      const files = [
        ...walkFiles(["src", "public"], { ext: TEXT, skipTests: true }),
        ...walkFiles(["src", "public"], { ext: FONTS }),
      ].map((file) => join(ROOT, file));
      console.log(`[CF-FT-1] files read: ${files.length}`);
      expect(files.length).toBeGreaterThanOrEqual(500);
      expect(report(fontFindings(files, ROOT))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-FT-2 the two tokens are the device's stack and the base rules use them", () => {
    const css = readFileSync(TOKENS, "utf8");
    const sans = /--font-sans:\s*([^;]+);/.exec(css);
    expect(sans?.[1].replace(/\s+/g, " ").trim()).toBe(
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial, "Noto Sans Ethiopic", Kefa, Nyala, Ebrima, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
    );
    expect(/--font-display:\s*([^;]+);/.exec(css)?.[1].trim()).toBe("var(--font-sans)");
    expect(css).toContain("font-family: var(--font-sans);");
    expect(css).toContain("font-family: var(--font-display);");
  });

  it("CF-FT-3 planted: a font host, @font-face, a font file, a family by name and a token outside styles.css each fail; the tokens pass", () => {
    const dir = join(ROOT, "node_modules/.cache/fonts-census");
    mkdirSync(join(dir, "src/features"), { recursive: true });
    mkdirSync(join(dir, "public/fonts"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/features/bad.css"),
        '@font-face { font-family: "Inter"; src: url(/fonts/inter.woff2); }\n.title { font-family: "Inter", sans-serif; }\n:root { --font-sans: Inter; }\n',
      );
      writeFileSync(
        join(dir, "src/features/bad.tsx"),
        'export const link = { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter" };\nexport const style = { fontFamily: "Inter" };\nexport const cls = "font-[Inter]";\n',
      );
      writeFileSync(join(dir, "public/fonts/inter.woff2"), "");
      writeFileSync(
        join(dir, "src/features/good.css"),
        "body { font-family: var(--font-sans); }\nh1 { font-family: var(--font-display); }\n",
      );
      const files = [
        ...walkFiles([join(dir, "src"), join(dir, "public")], { ext: TEXT }),
        ...walkFiles([join(dir, "src"), join(dir, "public")], { ext: FONTS }),
      ];
      expect(report(fontFindings(files, dir))).toBe(
        [
          `public/fonts/inter.woff2:1 is a font file ${RULE}`,
          `src/features/bad.css:1 declares @font-face ${RULE}`,
          `src/features/bad.css:1 sets a font family by name; use var(--font-sans) or var(--font-display) ${RULE}`,
          `src/features/bad.css:2 sets a font family by name; use var(--font-sans) or var(--font-display) ${RULE}`,
          `src/features/bad.css:3 defines a font token outside ${TOKENS} ${RULE}`,
          `src/features/bad.tsx:1 names a web-font host ${RULE}`,
          `src/features/bad.tsx:2 sets a font family by name; use font-sans or font-display ${RULE}`,
          `src/features/bad.tsx:3 sets a font family by name; use font-sans or font-display ${RULE}`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/fonts.test.ts
B2. Red first (never committed red): run `bunx vitest run scripts/conformance/fonts.test.ts -t "CF-FT-1"` on BASE's styles.css and __root.tsx — it must fail with exactly these four findings; paste them:
src/routes/__root.tsx:343 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
src/routes/__root.tsx:344 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
src/routes/__root.tsx:356 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
src/routes/__root.tsx:360 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
B3. src/styles.css, this edit (the two tokens become the device's stack):
EDIT src/styles.css #1
OLD-BEGIN
   * Typography. Inter carries Latin; Noto Sans Ethiopic carries Ge'ez —
   * Inter has NO Ethiopic glyphs, so Amharic (and any Ge'ez codepoint in mixed
   * text) falls through to Noto per-glyph automatically.
OLD-END
NEW-BEGIN
   * Typography (DEC-262, Foundations turn 33): the device's own fonts — no page
   * downloads a font. Latin and the interface take the platform's UI face (San
   * Francisco on Apple devices, Segoe UI on Windows, Roboto on Android); Ge'ez
   * falls through per glyph to the platform's Ethiopic face (Noto Sans Ethiopic
   * on Android and Linux, Kefa on Apple devices, Nyala or Ebrima on Windows), so
   * a mixed Amharic and Latin string needs no language class. `system-ui` is left
   * out on purpose: on Windows it follows the system's locale font. Headings share
   * the stack and keep their weight classes; scripts/conformance/fonts.test.ts
   * judges (CF-FT).
NEW-END
EDIT src/styles.css #2
OLD-BEGIN
  --font-sans: "Inter", "Noto Sans Ethiopic", system-ui, sans-serif;
  --font-display: "Bricolage Grotesque", "Noto Sans Ethiopic", system-ui, sans-serif;
OLD-END
NEW-BEGIN
  --font-sans:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial,
    "Noto Sans Ethiopic", Kefa, Nyala, Ebrima, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Noto Color Emoji";
  --font-display: var(--font-sans);
NEW-END
B4. src/routes/__root.tsx, these edits (the two preconnects and the two stylesheets leave):
EDIT src/routes/__root.tsx #1
OLD-BEGIN
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // Fonts: Inter (Latin body), Bricolage Grotesque (display), Noto Sans
      // Ethiopic (Ge'ez). Loaded as <link> — Lightning CSS cannot resolve a
      // remote @import from src/styles.css.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // DEC-195 — an early connection to the photo server's origin (the
OLD-END
NEW-BEGIN
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // DEC-262 — no web font: the page draws with the device's own fonts
      // (src/styles.css --font-sans), so nothing waits on a font server.
      // DEC-195 — an early connection to the photo server's origin (the
NEW-END
EDIT src/routes/__root.tsx #2
OLD-BEGIN
          ]),
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600&display=swap&subset=ethiopic",
      },
    ],
OLD-END
NEW-BEGIN
          ]),
    ],
NEW-END
Now `bunx vitest run scripts/conformance/fonts.test.ts --reporter=verbose` (CF-FT-1…3 passed; paste the lines), `bun run typecheck`, `bun run lint`. Commit: `turn 33 part B: the device's own fonts, and the census`.

PART C — THE BROWSER.
C1. NEW e2e/fonts.spec.ts (sha256 6bd297ba726fb4577f74a44f1ef8a8aae008e3e22b7ecf22e90e9182595740bd):
FILE-BEGIN e2e/fonts.spec.ts
import { expect, test } from "./fixtures";

import { gotoReady } from "./helpers/ui";

/**
 * DEC-262 (Foundations turn 33) — THE DEVICE'S OWN FONTS IN THE BROWSER. A page
 * asks for no font: no request reaches a web-font host and none is for a font
 * file, and the body and the display face (the header's wordmark, as every
 * heading) draw with the device's stack from src/styles.css. Read-only: no rows
 * are written.
 */

/** A request for a font: by the browser's own resource type, by host or by file name. */
const FONT_REQUEST =
  /fonts\.googleapis\.com|fonts\.gstatic\.com|\.(?:woff2?|ttf|otf|eot)(?:[?#]|$)/i;

/** The start of --font-sans in src/styles.css (CF-FT-2 pins the whole stack). */
const DEVICE_STACK = /^-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,/;

test.describe("FONTS — the device's own (DEC-262)", () => {
  test("FTE-1 the home page and the terms page ask for no font and draw with the device's stack", async ({
    page,
  }) => {
    const asked: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "font" || FONT_REQUEST.test(request.url()))
        asked.push(request.url());
    });
    for (const path of ["/", "/terms"]) {
      await gotoReady(page, path);
      const families = await page.evaluate(() => {
        const wordmark = document.querySelector('[data-testid="logo-wordmark"]');
        return {
          body: getComputedStyle(document.body).fontFamily,
          display: wordmark === null ? null : getComputedStyle(wordmark).fontFamily,
        };
      });
      expect(families.body, `${path}: the body`).toMatch(DEVICE_STACK);
      expect(families.display, `${path}: the wordmark (font-display)`).toMatch(DEVICE_STACK);
    }
    expect(asked, "no font was asked for").toEqual([]);
  });
});
FILE-END e2e/fonts.spec.ts
C2. scripts/e2e-select.ts, this edit (the house-style area selects the new spec):
EDIT scripts/e2e-select.ts #1
OLD-BEGIN
    specs: ["e2e/house-style.spec.ts", "e2e/overlays.spec.ts"],
OLD-END
NEW-BEGIN
    specs: ["e2e/house-style.spec.ts", "e2e/overlays.spec.ts", "e2e/fonts.spec.ts"],
NEW-END
Then `bun run scripts/e2e-select.ts --self-test` (OK). Commit: `turn 33 part C: FTE-1`.

PART D — DOCS.
D1. docs/features/design-foundation.md, these edits (the typography and the posture's performance line):
EDIT docs/features/design-foundation.md #1
OLD-BEGIN
- `--font-sans`: `Inter, "Noto Sans Ethiopic", system-ui, sans-serif`
- `--font-display`: `Bricolage Grotesque, "Noto Sans Ethiopic", system-ui, sans-serif`
  (headings + logo wordmark)
OLD-END
NEW-BEGIN
The device's own fonts (DEC-262, Foundations turn 33): no page downloads a font.
NEW-END
EDIT docs/features/design-foundation.md #2
OLD-BEGIN
**Ge'ez fallback rule:** Inter carries no Ethiopic glyphs. Browsers resolve font
stacks _per glyph_, so Latin renders in Inter and every Ge'ez codepoint falls
through to Noto Sans Ethiopic automatically — no locale-conditional class is
needed, and mixed Amharic/Latin strings render correctly. The shell smoke spec
asserts a rendered `U+1200–U+137F` heading after the language toggle.
OLD-END
NEW-BEGIN
- `--font-sans`, the device's stack (CF-FT-2 pins it):
NEW-END
EDIT docs/features/design-foundation.md #3
OLD-BEGIN
Fonts load as `<link rel="stylesheet">` in `src/routes/__root.tsx`'s `head()`
with `display=swap` (Lightning CSS cannot resolve a remote `@import` from
`src/styles.css`); Noto is requested with `subset=ethiopic`.
OLD-END
NEW-BEGIN
  ```css
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial,
  "Noto Sans Ethiopic", Kefa, Nyala, Ebrima, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Noto Color Emoji"
  ```

- `--font-display`: `var(--font-sans)` (headings and the logo wordmark keep their
  weight classes)

**Ge'ez fallback rule:** browsers resolve a font stack _per glyph_, so Latin
renders in the platform's UI face (San Francisco on Apple devices, Segoe UI on
Windows, Roboto on Android) and every Ge'ez codepoint falls through to the
platform's Ethiopic face (Noto Sans Ethiopic on Android and Linux, Kefa on Apple
devices, Nyala or Ebrima on Windows) — no locale-conditional class is needed, and
mixed Amharic/Latin strings render correctly. `system-ui` is left out on purpose:
on Windows it follows the system's locale font. The shell smoke spec asserts a
rendered `U+1200–U+137F` heading after the language toggle.

Nothing names a web-font host, declares `@font-face` or ships a font file, and a
family is set only through the two tokens (`scripts/conformance/fonts.test.ts`,
CF-FT-1…3; `e2e/fonts.spec.ts`, FTE-1). A brand face, if one is ever chosen, is
an ADR: one self-hosted, subset, non-blocking file and one token change.
NEW-END
EDIT docs/features/design-foundation.md #4
OLD-BEGIN
Performance: fonts are `display=swap`, Noto Sans Ethiopic subset to `ethiopic` and
Inter to `latin`, so neither pulls the other's glyphs and none blocks first paint.
OLD-END
NEW-BEGIN
Performance: no web font since DEC-262 (Foundations turn 33) — the two render-blocking
font stylesheets and about 87 KB of Latin fonts (281 KB with the Ethiopic weights on
an Amharic ad page, turn 23's lab) left every page.
NEW-END
D2. docs/governance/mechanisms.md: directly after the line that begins "| 48 |", this line:
| 49 | A page's typeface: one font stack per role, the device's own — no page downloads a font (D234, DEC-262) | the tokens `--font-sans` and `--font-display` (= `var(--font-sans)`) in `src/styles.css` (`@theme inline`) and its base rules (`body`; `h1`–`h3`); Tailwind's `font-sans` and `font-display` — Latin in the platform's UI face, Ge'ez per glyph in the platform's Ethiopic face | `scripts/conformance/fonts.test.ts` (CF-FT-1…3: no web-font host, `@font-face`, font file, family by name or token outside styles.css; the two tokens pinned); `e2e/fonts.spec.ts` (FTE-1) | none | a new script's face joins the stack; a brand face, if ever chosen, is an ADR — one self-hosted, subset, non-blocking file, one token change and one allowlist line in the census | the visible change: English text and headings in the device's face; Foundations turn 33 |
D3. docs/features/performance-strategy.md, this edit (the old font bullet) and the new section at its end:
EDIT docs/features/performance-strategy.md #1
OLD-BEGIN
  Zero decorative bytes on every page.
- **Font subsetting + `display: swap`.** Noto Sans Ethiopic ships only Ge'ez glyphs, Inter
  only Latin; text never blocks render waiting for fonts.
- **A CI bundle-size budget** (currently ~156 KiB JS / ~13 KiB CSS gzipped, well under the
OLD-END
NEW-BEGIN
  Zero decorative bytes on every page.
- **No web font (DEC-262).** Every page draws with the device's own fonts; nothing waits on a
  font server (§16).
- **A CI bundle-size budget** (currently ~156 KiB JS / ~13 KiB CSS gzipped, well under the
NEW-END
EDIT docs/features/performance-strategy.md #2
OLD-BEGIN
Next: the popover and the select — and the hover card, the context menu, the menubar and the navigation menu that turn 31's K2 list names — still import Radix directly; the same parts take them.
OLD-END
NEW-BEGIN
Next: the popover and the select — and the hover card, the context menu, the menubar and the navigation menu that turn 31's K2 list names — still import Radix directly; the same parts take them.

## 16. The device's own fonts (D234, Foundations turn 33)

DEC-262 (the operator, 2026-10-26: "all as recommended"): turn 23's lab found two Google Fonts stylesheets in front of every first paint (src/routes/__root.tsx) — render-blocking whatever their `display=swap` said — and 87 KB of Latin fonts on every page, 281 KB with the three Ethiopic weights on an Amharic ad page. Both stylesheets, their two preconnects and the three web-font families are gone: `--font-sans` in src/styles.css is the device's stack, and `--font-display` is the same stack (headings and the wordmark keep their weights).

- Latin and the interface take the platform's UI face (San Francisco on Apple devices, Segoe UI on Windows, Roboto on Android); Ge'ez falls through per glyph to the platform's Ethiopic face (Noto Sans Ethiopic on Android and Linux, Kefa on Apple devices, Nyala or Ebrima on Windows). `system-ui` is left out on purpose: on Windows it follows the system's locale font.
- The visible change is the typeface of English text and headings; no layout, size, weight, colour or behaviour changes. Tests that measure text measure the visible characters with the element's own font (D104), so a face change moves no rule.
- The gain is judged on the lab after Publish (the D234 judge): the first paint no longer waits on two stylesheets from another origin — ESTIMATE 1–1.5 s sooner on the lab's phone over slow 4G — and every page is 87 KB lighter, an Amharic ad page up to 281 KB.
- The guard: `scripts/conformance/fonts.test.ts` (CF-FT-1 — nothing under src/ or public/ names a web-font host, declares `@font-face`, ships a font file or sets a family by name; CF-FT-2 — the two tokens; CF-FT-3 — the census on a planted tree) and `e2e/fonts.spec.ts` (FTE-1 — the home and terms pages ask for no font and draw with the stack).
NEW-END
D4. docs/features/ci-guards.md, at its end:
APPEND-BEGIN docs/features/ci-guards.md
## DEC-262 — the font census

`scripts/conformance/fonts.test.ts`: CF-FT-1 reads every source and stylesheet under src/ and public/ (tests aside) and every font file there — a web-font host (Google Fonts, Typekit, Bunny), an `@font-face`, a font file (`.woff`, `.woff2`, `.ttf`, `.otf`, `.eot`), a family set by name (`fontFamily:`, a `font-[…]` class, a `font-family:` that is not `var(--font-sans)` or `var(--font-display)`) or a font token defined outside src/styles.css each fail; CF-FT-2 pins the two tokens (the device's stack; `--font-display` = `var(--font-sans)`) and the base rules that use them; CF-FT-3 proves the census on a planted tree. Shown red against turn 32's tree (the four Google Fonts lines in `src/routes/__root.tsx`). The browser's side is `e2e/fonts.spec.ts` FTE-1, in the selector's house-style area.
APPEND-END docs/features/ci-guards.md
docs/_changelog.md, at its end:
APPEND-BEGIN docs/_changelog.md
- Foundations turn 33 (2026-10-26) — speed S10 (D234), DEC-262: the device's own fonts — the two Google Fonts stylesheets and their preconnects leave src/routes/__root.tsx; `--font-sans` in src/styles.css is the device's stack (Latin in the platform's UI face, Ge'ez per glyph in the platform's Ethiopic face) and `--font-display` the same; no page downloads a font (87 KB on every page, up to 281 KB on an Amharic ad page, two render-blocking requests); scripts/conformance/fonts.test.ts (CF-FT-1…3) and e2e/fonts.spec.ts (FTE-1) keep it so; design-foundation.md's typography rewritten. No migration, new string or package change.
APPEND-END docs/_changelog.md
D5. AGENTS.md: directly after the line that begins "- Overlays (DEC-259, DEC-260):", add exactly this one line (AGENTS.md then counts 8003 bytes by `wc -c AGENTS.md`):
- Fonts (DEC-262): no page downloads a font; every family comes from src/styles.css's --font-sans / --font-display (the device's stack; Tailwind font-sans, font-display) — no web-font host, @font-face, font file or family by name anywhere else; scripts/conformance/fonts.test.ts judges.

At the end, roadmap.md's turn-33 line `[x]` with the last code commit and the unit totals appended. Commit: `turn 33 part D: docs, register, changelog, AGENTS.md`.

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-33.md | sha256sum -c` — every line prints OK (the list below; a FAILED line is fixed by copying its block again from the saved brief, never by editing an expectation); `git diff <START> --stat -- src/components src/features` (empty: no consumer changes); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals — the supervisor's run: 305 files, 1897 tests, every one passed); `bun run i18n:usage` and `bun run i18n:map-guard` (the maps do not move: 1736 keys across 586 files (395 dynamic call sites)); `bun run build`; `node scripts/check-bundle-size.mjs` (it must pass; the supervisor's build printed `JS: 253.9 KiB / 257 KiB — ok`); `node scripts/check-marketplace-imports.mjs` (findings: 0); `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
7deb4a3fb19b322e8af6479f3cb17299ad7c50759391bb994b8460b7768db055  src/styles.css
1489836fac4db69dd111d11a14e661af2ef735472a2933fcf6c2b7ffc1458190  src/routes/__root.tsx
1a2678d600aae4fade217ea508cb05623b83d5e3fb4b655bc986236ef03d60d4  scripts/e2e-select.ts
290887e02e5d4c727b8154a53380a5d6d7d2f37a9b92c220f079b1878b2c2276  docs/features/design-foundation.md
737d60cc7db1d4a6b4cda80cc89b08e4d1be274d85ad2f1dacd4196c8cbeb915  docs/features/performance-strategy.md
9718c53b4b6f7488ab191de4fb96bcb73f1a2509504f8a94f814a240fb1ca1a6  docs/features/ci-guards.md
8b26cbc7e879e2b8fdd2ddcf589797a7043f1b438e07a3fdfbc832d9268098de  docs/_changelog.md
6a31d963d3ab9a330dd1f9a073dff89db0151c81df17fe4d6412712754090c2a  AGENTS.md
77d049bfa5537a46b0bdd78efabf28c1d6a3f251c5189c1f24564a5e4dbb40b5  docs/governance/mechanisms.md
d9624cb3dc85a7b6d03d7eca9b04cf98d5a82e125669f72cb32b033a4a657b75  scripts/conformance/fonts.test.ts
6bd297ba726fb4577f74a44f1ef8a8aae008e3e22b7ecf22e90e9182595740bd  e2e/fonts.spec.ts

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/fonts.spec.ts whole; e2e/shell.spec.ts `--grep "language toggle renders Amharic|the lockup's second line spans the wordmark exactly|logo cell sits exactly above the rail|BB-1 "` (the Ge'ez heading, the wordmark's lockup, the short Amharic name); e2e/layout.spec.ts whole; e2e/house-style.spec.ts whole; paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-33.report.md, with the twelve headings of .claude/rules/60-report.md, carrying: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract — the document head's links and the computed font families of the body and the wordmark, before → after (3); the consumer census with file:line, re-located at <START> (4); the tests added, B2's red lines, the unit totals, the E2E count lines (5); the K2 list, file:line (6); the guard's counts and self-test (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12). Its "Final commit" is your last code commit. Commit it on its own (`turn 33: report`), run bun .claude/hooks/land.ts with a Bash timeout of 1800000 ms, and END THE TURN when it prints LANDED or HELD; the supervisor reads the run.
```

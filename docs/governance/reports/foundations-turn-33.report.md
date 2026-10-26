# Turn 33 — speed S10: the device's own fonts, no page downloads a font (D234, DEC-262)
Base: c38e953557b995369ab117cc12961d45f3981266 · Final commit: f15e0b1 · Brief: docs/governance/briefs/foundations-turn-33.md (sha256 ba0c65d1f5770095dae948145cc487b0cf9e6e9e6ef1819627f7d2d3a812ec21)

## 1. Done / not done, by part and step

| Part / step | State | Commit |
| --- | --- | --- |
| A1 orient, CI first | done. `git rev-parse HEAD origin/dev` printed `c38e953557b995369ab117cc12961d45f3981266` twice. origin/dev = BASE, so there is no BASE..origin/dev list. CI on BASE: SUCCESS (§11) | — |
| STEP 0 | done. Brief saved; `sha256sum` → `ba0c65d1f5770095dae948145cc487b0cf9e6e9e6ef1819627f7d2d3a812ec21` (the carrying message's value). Roadmap line 3: the brief in force and the Stage 2 phrase. The turn-32 line replaced; the turn-33 line replaced by the brief's two lines | 9e8662d |
| B1–B4 the census and the device's fonts | done. B2 shown red at BASE (§5) | 0b568f3 |
| C1–C2 FTE-1 and the selector | done. `e2e-select self-test OK: every spec is reachable; every area glob matches.` | 2b7483a |
| D1–D5 docs, register row 49, changelog, AGENTS.md; roadmap turn-33 `[x]` | done | f15e0b1 |
| THE CHECKS | all green (§5, §7) | — |
| THE END-TO-END CHECK | all green (§5) | — |

## 2. Files changed  (verbatim `git diff --name-only <BASE>`; new files with `git ls-files` proof)

`git diff --name-only c38e953557b995369ab117cc12961d45f3981266..HEAD` (before this report's commit):

```
AGENTS.md
docs/_changelog.md
docs/features/ci-guards.md
docs/features/design-foundation.md
docs/features/performance-strategy.md
docs/governance/briefs/foundations-turn-33.md
docs/governance/mechanisms.md
e2e/fonts.spec.ts
roadmap.md
scripts/conformance/fonts.test.ts
scripts/e2e-select.ts
src/routes/__root.tsx
src/styles.css
```

This report also lands: docs/governance/reports/foundations-turn-33.report.md. New files, proved with `git ls-files --`:

```
docs/governance/briefs/foundations-turn-33.md
e2e/fonts.spec.ts
scripts/conformance/fonts.test.ts
```

No file was deleted. The brief's hash list, `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-33.md | sha256sum -c`: 11 lines `OK`. `wc -c AGENTS.md` → `8003 AGENTS.md`.

## 3. Behaviour contract — answer tables before → after  (every touched route/function/screen)

| Surface | Before (BASE c38e9535) | After |
| --- | --- | --- |
| The document head's links (`src/routes/__root.tsx` `head().links`, the `rel:` lines) | app stylesheet :334; icon :339; `preconnect https://fonts.googleapis.com` :343; `preconnect https://fonts.gstatic.com` (crossOrigin anonymous) :344; photo-origin `preconnect` and `dns-prefetch` :351–:352; `stylesheet` Google Fonts Inter + Bricolage Grotesque :355–:356; `stylesheet` Google Fonts Noto Sans Ethiopic :359–:360; hreflang alternates :387, :391 | app stylesheet :334; icon :339; photo-origin `preconnect` and `dns-prefetch` :348–:349; hreflang alternates :376, :380. The four font links are gone. The rest are the same links in the same order |
| The body's font family (`body { font-family: var(--font-sans) }`, styles.css; the base rule is unchanged) | the token `"Inter", "Noto Sans Ethiopic", system-ui, sans-serif`, the faces served by Google Fonts | the token `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial, "Noto Sans Ethiopic", Kefa, Nyala, Ebrima, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"` (CF-FT-2 pins it). FTE-1 read the computed `fontFamily` on `/` and `/terms`, both projects, and it starts with the device stack |
| The wordmark and the h1–h3 headings (`font-display`) | `"Bricolage Grotesque", "Noto Sans Ethiopic", system-ui, sans-serif` | `var(--font-sans)`, the same stack. The weight classes are unchanged. FTE-1 read the wordmark's computed family on both pages: the device stack |
| Font requests | 2 stylesheets plus the font files they name, from two Google origins | FTE-1 recorded every request on `/` and `/terms` (resource type `font`, a Google Fonts host or a font-file extension): `[]` on both projects |

Nothing else changed. `git diff c38e9535… --stat -- src/components src/features` printed nothing. The `@theme` block and the base rules are unchanged apart from the two tokens and the comment.

## 4. Censuses  (every grep the brief asked for, with file:line; "none found" only after the grep)

At START (`grep -rn -E "fonts\.googleapis|fonts\.gstatic|typekit|fonts\.bunny|@font-face|fontFamily|font-family|--font-(sans|display)|\.(woff2?|ttf|otf|eot)\b|font-\[|\"Inter\"|Bricolage|Noto Sans|document\.fonts"` over src, public, e2e, scripts; ts/tsx/css/html/js/mjs/svg):
- src/styles.css:112 (the comment), :116 `--font-sans`, :117 `--font-display`, :360 `font-family: var(--font-sans);`, :366 `font-family: var(--font-display);`
- src/routes/__root.tsx:340 (the comment), :343 and :344 (the preconnects), :356 and :360 (the stylesheets)
- e2e/helpers/ui.ts:1465 (`context.font = … ${style.fontFamily}`, the D104 measurement; kept)
- src/components/shell/use-footer-inset.ts:99–:100 (`fonts?.ready`; kept). The grep above missed it, because it spells `(document as …).fonts`. Found by `grep -rn fonts src/components/shell/use-footer-inset.ts`.
- Users of `font-display`: src/components/brand/logo.tsx:72; src/features/posting/preview/listing-detail.tsx:697, :1054, :1082, :1115. They keep the class.
- Font files under src/ and public/ (`find … -iname "*.woff*" -o -iname "*.ttf" -o -iname "*.otf" -o -iname "*.eot"`): none found.

This is the brief's CONSUMERS line exactly; no hit beyond it. After the turn, CF-FT-1 reads 587 files under src/ and public/ and finds nothing.

## 5. Tests  (ids added/changed/re-pointed with reasons; red-first evidence; unit totals; the E2E count lines and [ssr-error] counts; the J-audit line when e2e/** changed)

Added: CF-FT-1, CF-FT-2, CF-FT-3 (scripts/conformance/fonts.test.ts) and FTE-1 (e2e/fonts.spec.ts). A grep showed no id collision. Changed: none. No assertion was loosened.

Red first (B2). `bunx vitest run scripts/conformance/fonts.test.ts -t "CF-FT-1"`, on BASE's styles.css and __root.tsx, failed (`Tests  1 failed | 2 skipped (3)`; `[CF-FT-1] files read: 587`) with exactly:
```
src/routes/__root.tsx:343 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
src/routes/__root.tsx:344 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
src/routes/__root.tsx:356 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
src/routes/__root.tsx:360 names a web-font host (DEC-262: the device's own fonts; no page downloads a font)
```
After B3–B4, `--reporter=verbose`: CF-FT-1 ✓, CF-FT-2 ✓, CF-FT-3 ✓; `Tests  3 passed (3)`.

Unit, whole suite, at THE CHECKS: `Test Files  305 passed (305)`, `Tests  1897 passed (1897)`. No EXH test timed out. Also `scripts/e2e-select.test.ts`: `Tests  12 passed (12)`.

THE END-TO-END CHECK (`bun run e2e:local -- …`, both projects, 2 workers, fake mode, 0 retries, ethio-staging):
- e2e/fonts.spec.ts, whole: `2 passed (8.6s)`.
- e2e/shell.spec.ts `--grep "language toggle renders Amharic|the lockup's second line spans the wordmark exactly|logo cell sits exactly above the rail|BB-1 "`: `3 skipped` · `5 passed (12.7s)`. The language toggle passed on both projects. The logo cell and the lockup passed on desktop-1280 and skipped on mobile-360. BB-1 passed on mobile-360 and skipped on desktop-1280. Each skip is the test's own width rule.
- e2e/layout.spec.ts, whole: `2 skipped` · `8 passed (20.8s)`.
- e2e/house-style.spec.ts, whole: `12 passed (19.9s)`.
- `[ssr-error]`: 0 in each of the four runs' output. The server's lines reach that output as `[WebServer] …`, so there is no path to list.

J-audit (e2e/fonts.spec.ts): J1/J3 — no fixture and no row (it reads `/` and `/terms`). J2 — no sweep. J4 — no count. J5 — no Playwright locator: one `document.querySelector` on the `logo-wordmark` test id inside `page.evaluate`, and no `.first()`. J6 — no roster. J7 — `gotoReady` before reading, built-in waiting only. J8 — not `@global-state`. J9 — no identity.

## 6. K2 — siblings that bypass the mechanism  (file:line, in scope or not; what was left and why)

Places that name a font family, a web-font host, `@font-face` or a font file, or set a family by name, after the turn (the §4 grep re-run):
- Inside the mechanism: src/styles.css (the tokens and the two base rules); scripts/conformance/fonts.test.ts (the census and its planted fixture); e2e/fonts.spec.ts.
- e2e/helpers/ui.ts:1465 measures text with the element's own computed font (D104). It does not set a family; the brief keeps it.
- src/server/ai/**, `translation.googleapis.com` and `generativelanguage.googleapis.com`: provider hosts, not font hosts. Named by the reviewer's grep.

None remains outside the allowed places.

A third family role, from the reviewer: Tailwind's `font-mono` (its default local monospace stack, so nothing is downloaded) at
- src/components/ui/chart.tsx:224
- src/features/admin-categories/category-form-fields.tsx:146
- src/features/admin/translations/language-picker.tsx:87, strings-page.tsx:578, history-drawer.tsx:134, languages-page.tsx:342 and :969, data-scope.tsx:345
- src/features/admin/legal/legal-version-view.tsx:68
- src/features/admin/roles/role-detail.tsx:260
- src/features/admin-listings/listing-page.tsx:686
- src/features/admin-locations/location-form-fields.tsx:90

These are outside scope and untouched. They are a role the register's "one stack per role" does not name.

Pre-existing, outside scope: src/components/shell/use-footer-inset.ts:100, `.catch(() => undefined)` on `fonts.ready`, a silent catch. Reported under the no-known-error-debt rule and left.

## 7. Allowlists and guards  (each allowlist's count before → after; every new line with reason and until; guard self-tests run)

No allowlist changed: `git diff --name-only c38e9535….HEAD -- 'scripts/conformance/*-allowlist.txt'` printed nothing. The new census (CF-FT-1…3) has no allowlist of its own (EXCEPTIONS: none); CF-FT-3 is its self-test on a planted tree. It is a `.test.ts` file run by vitest, so it is outside wired.test.ts's domain (which excludes `*.test.ts`), as overlays.test.ts is.

Other guards at THE CHECKS:
- `node scripts/check-bundle-size.mjs`: `JS: 253.9 KiB / 257 KiB — ok`, `CSS: 20.5 KiB / 40 KiB — ok`, `Bundle budget OK.`
- `node scripts/check-marketplace-imports.mjs`: `findings: 0`.
- `bash scripts/check-hardcoded-strings.sh`: `self-test: bad fixture findings=1 (expect >=1), good fixture findings=0 (expect 0)`, `findings: 0`.
- lint `✖ 39 problems (0 errors, 39 warnings)`; typecheck exit 0; build exit 0; format:check `All matched files use Prettier code style!`.

## 8. Strings  (every new or changed key with EN and AM text; "none" when the brief says No new string)

None. `git diff --name-only c38e9535….HEAD -- src/i18n/` printed nothing. `bun run i18n:usage` → `1736 keys across 586 files (395 dynamic call sites)`. `bun run i18n:map-guard` → `usage maps match the tree.`: the maps did not move.

## 9. Migrations  (file, sha256, mark, apply pairing line; or "none")

None. `git diff --name-only c38e9535….HEAD -- supabase/` printed nothing.

## 10. Departures  (every difference from the brief with its reason; every STOP and ruling in the turn)

- The roadmap's turn-33 line names `Last code commit 2b7483a`, Part C, the last commit touching code. That line is written inside Part D's own commit, which cannot name its own sha. This report's "Final commit" is f15e0b1 (Part D), the commit land.ts counts as the last code commit. The same handling as turn 32; the reviewer of turn 32 noted the mismatch.
- The reviewer's MAJOR is not fixed in this turn (the reviewer ran on f15e0b1, before this report). Nothing proves that Ge'ez text draws in an Ethiopic face:
  - FTE-1 checks the computed `font-family` string, not the face the browser used.
  - The shell test "language toggle renders Amharic" checks `textContent`, not glyphs.
  - Proving the face used (for example the browser's platform-fonts report for a node) is a test this brief does not specify. Adding one would widen scope beyond the brief's numbered blocks, so it is left for the supervisor.
  - Evidence from this sandbox: `fc-list` lists 119 faces and no Ethiopic face (no match for ethiop, abyssinica, nyala, kefa or ebrima). Here, Amharic would draw in the browser's last-resort fallback, and the textContent test still passed.
  - The brief accepts this failure mode ("a device without an Ethiopic face falls back to the browser's own fallback").
- The reviewer's MINOR findings, recorded and not acted on:
  - `logo.tsx:60–66` assumes the sub-line is narrower than the wordmark. The lockup and logo-cell tests passed on desktop-1280; mobile-360 skips them by their own rule.
  - The census does not catch the `font:` shorthand with a family, a new `--font-<other>` token inside styles.css, or root-level files.
  - roadmap.md line 3 and register row 49 name a "CF-FT allowlist" or "allowlist line" that does not exist yet; the census has no allowlist. These are the brief's own words, copied.
  - design-foundation.md's "the shell smoke spec asserts a rendered `U+1200–U+137F` heading" describes a text check. That sentence predates this turn and is kept by the brief's block.
  - The roadmap tick comes before the report (the brief's order).
- No STOP; no ruling.

## 11. CI  (the first six lines of ci-status.md for the last landed commit you can read, with the two-step SHA check; "this landing's run has not completed" when it has not)

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `c38e953557b995369ab117cc12961d45f3981266` (short `c38e953`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T01:57:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40255222082
```

Two-step check: the conclusion is SUCCESS, and the reported commit c38e9535 = BASE = origin/dev before this landing. guards-last-failure.md: `No failed build/guard jobs in this run.` e2e-last-failure.md: `last E2E run 40255222082 passed`. This landing's run has not completed; the supervisor reads it.

## 12. Limits  (what you could not run or prove, and why — logs unavailable, no browser, no secret)

- Which face draws Ge'ez is unproven (§10). This sandbox has no Ethiopic face, and I did not inspect CI's runners. On real devices the face comes from the platform: Noto Sans Ethiopic on Android, Kefa on Apple devices, Nyala or Ebrima on Windows. That is the operator's walk and the lab.
- The first-paint gain (ESTIMATE 1–1.5 s) and the 87 KB / 281 KB figures are the brief's, from turn 23's lab; they are judged on the lab after Publish and were not measured here.
- The browser runs were local, against ethio-staging and a subset of specs; CI on the landing runs every test.
- Rendered-output acceptance — how the device face looks at 360/768/1024/1280, including the wordmark's lockup — belongs to the operator's walk.

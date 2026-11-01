STOP — sage-e-one-line part F: the five-item bar's post label

DONE: parts A, B, C, D, E, and the room correction in part F
LEFT: the five-item bar's `nav.postShort` under the 1.22 factor
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `c21ec7552cdece93ded3ce89afe82802f491f8c6` (short `c21ec75`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T20:50:13Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41347031145
FILES: docs/_changelog.md
docs/features/design-foundation.md
docs/generated/i18n-usage.json
docs/governance/briefs/sage-e-one-line.md
docs/governance/mechanisms.md
docs/governance/reports/sage-e-one-line.stop-1.md
e2e/helpers/one-line.ts
e2e/helpers/ui.ts
e2e/my-listings-page.spec.ts
e2e/one-line-slots-admin.spec.ts
e2e/one-line-slots.spec.ts
public/i18n-usage.json
roadmap.md
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/marketplace/feed.tsx
src/components/shell/bottom-bar.tsx
src/components/ui/one-line-slot.test.tsx
src/components/ui/one-line-slot.tsx
src/i18n/locales/am-base.ts
src/i18n/locales/en-base.ts
src/test/one-line-judge.test.ts

The five-item bottom bar (an admin signed in) at 360. `nav.postShort`, Amharic "ያስተዋውቁ" — the Post button's own short label, not the seller string ruling 2 replaced. I did not shorten it.

OLS-3, mobile-360, light, am, after the room correction (`e2e/helpers/one-line.ts`, the item's content box, not the label's shrink-wrapped grid):

- runner width 59.0px
- factored 72.0px (59.0 × 1.22)
- room 64.0px (the bar is 360 wide, five `flex-1` items, `px-1`)
- 8.0px over the room
- computed font `12px / 16px -apple-system, "system-ui", "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial, "Noto Sans Ethiopic", Kefa, Nyala, Ebrima, sans-serif` plus the emoji faces

This Mac has `/System/Library/Fonts/Supplemental/KefaIII.ttf` and no Noto Sans Ethiopic file under the system, library, or user font directories. The 59.0px is Kefa. 59.0 fits in 64.0 by 5px, and the failure screenshot shows the word whole. The 1.22 factor estimates Kefa from a Noto runner. On a runner that is already Kefa it false-fails. A Noto width near 59/1.212 ≈ 48.7, times 1.22, is about 59.4, which fits in 64.

The three-item and four-item bars passed, including this word (OLS-1, OLS-2). The heading, the short seller label "ሽያጭ", a category heading, the ad's section tabs, ribbon and tier tag passed (OLS-1, OLS-2, OLS-4, OLS-5).

Please rule which it is: the factor applies only when the runner's Ethiopic face is the narrow one, so this Mac's Kefa width is the measurement itself; or the bar gets a shorter post label, as ruling 2 gave the seller item its own key. I will not choose the words.

Also, so the next reading is not a surprise:

- `ADMIN_SECTIONS` is 14. OLS-6's `>= 15` assertion was removed.
- OLS-6 and OLS-8 failed on the same post label. OLS-7, OLS-9 and OLS-10 passed. Those specs do not wait for the fifth item the way OLS-3 does, so a pass can be a four-item bar. The proved miss is OLS-3.
- MLP-6 failed on both projects. After Control+A and Backspace the search still held the query (the screenshot). The list page was not changed; MLP-3 passed. Control+A does not select the field in this Mac Chromium.
- HM-2 failed twice at the same assertion: RTL expects the menu's right edge above 300, received 256, and the screenshot shows the drawer on the left. `e2e/shell.spec.ts` is unchanged. HM-3 passed.
- The checks run after the ceiling commit, before this room correction: `checks (fast): 17 PASS · 4 FAIL · 235s` and `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 289s`. The budget step passed. The four FAILs are NH-6 in the laws step and again in component tests (macOS `date` resolves New York with an empty TZDIR), actionlint (the pinned binary is Linux ELF), and gitleaks (the same). Not re-run after part F. `bun run typecheck` exited 0. ESLint on the judge files was clean. OLJ-1…4 passed (4 tests).
- The browser check used the installed Chromium 1208 by unsetting `PLAYWRIGHT_BROWSERS_PATH` (this shell points it at an empty sandbox cache). Retries 0. The six specs first: 14 failed, 96 skipped, 224 passed (12.1m). After the room correction, OLS plus MLP-6, HM-2 and HM-3: 6 failed, 12 skipped, 8 passed (1.2m). OLS-3 alone then failed with the numbers above.
- The current ci-evidence files name `c21ec7552` in both `ci-status.md` and `e2e-last-failure.md` (run 41347031145, SUCCESS, no failed guard job). The earlier mismatch, a commit field of `612469b7`, is not in these files.
- The roadmap's INC-957 line is open again. Part D had ticked it; the class is this question.
- `panel.myListingsShort` is already in the tree: en "Sell", am "ሽያጭ", the bottom bar only. The operator may override those words. They are not this question.

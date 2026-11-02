# W3 — the walk's last three (the task and its ruling)

```text
Task W3 — the walk's last three: notices docked on the phone's bar, the panel tab marked at the press, the iPhone tick. Base: dev bd97c81c. PLAN FIRST.
**MODEL — plan: Claude Fable 5.1 (High). Build: Claude Opus 5.5 (High). Switch in the model picker when you paste the ruling.**

Builds on: the walk of Part 2 (2026-11-01) and DEC-317 (turn C: `docs/governance/briefs/foundations-turn-c.md`, its ruling 3 left the iPhone tick unbuilt; its K2 left the panel tabs' late mark).
FLAGS: no-migration, no-package-change, no-agents-change, no-new-string.

SCOPE (by area; your plan names the files): `src/components/app-shell.tsx`, `src/components/shell/` (the bottom bar, the notices, the panel tabs and their hooks), `src/components/ui/` (the notices drawn above the bar, the fading notice, ActionMessage), `src/lib/press.ts`, `src/styles.css` (only if a token is needed), their own tests, `e2e/` specs that read these surfaces, `scripts/conformance/` (the guard below), `docs/features/design-foundation.md`, and the standing allowance.

PART A — a notice on a phone is docked on the bottom bar (operator, 2026-11-01: the "Signed out for inactivity" notice "is not close to bottom and floating a bit high, please make it attach to bottom").
THE SYSTEM (G0)
CONCERN: every notice pinned to the bottom of the screen on a phone sits directly on the bottom bar — no gap, no floating card.
MECHANISM: NONE YET — one shared placement constant (your plan names its file in `src/components/shell/`), read by every such notice. Below md: full width (`inset-x-0`), its bottom edge on the bar's top edge (`bottom: var(--bottom-bar)`), top corners only rounded as the bar's (`rounded-t-bar`), the bar's lift turned up (`shadow-bar-up` or the token your census finds), drawn BELOW the bar's layer so the Post disc (raised `--bar-rise` above the bar) stays painted and tappable over it, and its bottom padding clears the disc (`--bar-rise` plus the notice's own padding) so no word or button sits under it. From md (no bottom bar): unchanged.
CONSUMERS (grep of bd97c81c, these files unchanged since e83999cc; by definition — anything `fixed` whose bottom is computed from `--bottom-bar`, plus every notice that is pinned to the bottom): `app-shell.tsx:939` (session-idle-warning), `app-shell.tsx:960` (session-notice), `shell/on-demand-notice.tsx:67` (the download notice; its overlay outlet, INC-955, keeps its own placement inside a dialog — say so in the plan). Your census finds the rest (the fading notice, any ActionMessage pinned above the bar, toasts) and marks each uses | bypasses.
GUARD: a conformance census in `scripts/conformance/` that fails when a file outside the constant's own computes a fixed bottom from `--bottom-bar`; planted bypass shown red; allowlist lines carry reason and expiry (the rail's backdrop at `app-rail.tsx:1134` is not a notice: an allowlist line or a definition that excludes it — your plan says which).
LENSES — security: none · performance: classes only, no new code on the first download beyond the constant · failure modes: none new · consistency: all three notices identical on a phone · future growth: a new notice takes the constant.
TESTS: one e2e test at 360 (both modes, en and am) that shows the session notice (the idle sign-out path the existing session specs already drive — your plan names the spec) and asserts by `layoutBoxes`: the notice's bottom equals the bar's top within 1 px, its width equals the viewport, and the Post disc's box is not covered at its centre (`elementFromPoint` returns the disc). The existing session specs stay green unchanged, or G38 old → new.

PART B — a chosen panel tab is raised the moment it is pressed (the operator's rule of 2026-10-31: "a chosen menu item, tab or segment then stays raised as the current one").
CONCERN: the current mark of the panel tabs (desktop, signed in) follows the press, as the bottom bar's already does.
MECHANISM: `useMenuAt` (`src/components/shell/use-shown-pathname.ts`) and `isCurrentAt` / `panelOf` (`menu-current.ts`). Today `panel-tabs.tsx:56` marks `panel.id === activePanel` from the shell's frame (`useShownPathname`, INC-581). The tab's mark moves onto the mechanism; the frame (the panel shown, the bands, the breadcrumbs) keeps following the shown page. Read the C2 report's K2 line first.
TESTS: the existing test that reads a panel tab's `aria-selected` / current mark, extended (or a new one, id grep-checked free): press a tab whose page is slow (the route's loader held by the harness's own wait helper — your plan names it), the tab is current before the page lands; the old tab is no longer current. Both projects.

PART C — the iPhone tick (D272, the operator's "Yes, on menus and buttons"; DEC-317 ruling 3 left it unbuilt).
CONCERN: a tap on a ticking element gives a haptic tick on iPhone as it does on Android, under the same Settings switch.
MECHANISM: `src/lib/press.ts` `onClick` (:171). Today it returns when `navigator.vibrate` is absent. Add the iOS path: a hidden `<input type="checkbox" switch>` with its own `<label>`, created once by `press.ts` (no package), and a click on that label inside the same activation when `vibrate` is absent and the switch is on; nothing else changes (no tick on a non-touch press, none when the switch is off, none on plain links and cards). The hidden input is out of the accessibility tree (`aria-hidden`, not focusable, no label text a screen reader reads) and never moves focus.
TESTS: unit tests in `press.test.ts`: with `vibrate` absent, a touch tap on a button clicks the hidden label once; with the switch off, never; with `vibrate` present, `vibrate` is called and the label is not; a mouse click never. The device proof is the operator's: name it in the report as walk line 1 ("on your iPhone, Settings → This device on; tap a menu row: a short tick; off: none").

AFTER THE RULING: the parts in order, then the checks, the browser check, the self-review, the report `docs/governance/reports/walk-w3.report.md` (with three walk lines for the operator: the notice on a phone, the tab on a desktop, the tick on an iPhone), the pull request, its CI.
```

## Ruling on the plan

```text
RULING — W3, on the plan. Base: dev bd97c81c. Build now.
**MODEL — build: Claude Opus 5.5 (High).**

The plan is accepted as written, with these answers.

1. The phone strip: (b). The notice starts at the strip's edge (`max-md:inset-s-12`), docked on the bar, from there to the screen's end edge. Nothing is drawn under another surface. Its start-top corner stays square where it meets the strip; its end-top corner takes `rounded-t-bar`'s radius (use the logical corner class). The open phone menu and its scrim covering the notice is accepted: the menu is the person's own act and the notice is still there when it closes. Tie the inset to the strip so the two cannot drift: CF-DOCK-1 gains a case that reads `rail-strip`'s class in `app-rail.tsx` and fails when its width class is not the width `NOTICE_DOCK`'s inset assumes (NDK-4, planted red by changing the width in a fixture). SP-8 is reworded: the notice's start edge within 1 px of the strip's end edge, its end edge within 1 px of the viewport's end edge, its bottom within 1 px of the bar's top; the two `elementFromPoint` points stay (the disc's centre and 3 px below its top).
2. `src/components/shell-context.ts` joins the scope for `panelChoice`. No literal `"marketplace"` fallback.
3. PS-7 on mobile-360: resize to 768×1024 so the tabs show, as you recommend.
4. `scripts/route-budgets.mjs` and `scripts/check-bundle-size.mjs` join the scope. A ceiling changes only in DEC-296's form, with its cause named in the report; a page whose growth is over 1 KiB, or unexplained, is a STOP.
5. `Z_NOTICE` goes into `src/components/layout/layers.ts` (it joins the scope), between `Z_ACTION_BAR` and the bar, with a comment saying why it sits below the bar. The three app-rail allowlist lines expire 2027-06-30.
6. The CF-PRESS-1 extension (rule 3 reads `aria-selected` marks; `panel-tabs.tsx` must call `useMenuAt`; PRP-9) is accepted. `panel-header.tsx:43/:75` goes in the report's K2, untouched.
7. Part C as planned (PR-U10). In the report's walk lines, say plainly that on iPhone the tick depends on iOS 18 or later and on Apple keeping that behaviour.

Then the checks, the browser check, the self-review, the report `docs/governance/reports/walk-w3.report.md` with three walk lines, the pull request and its CI.
```

# Foundations — turn 32b: INC-908 — a modal whose code fails to download tells its owner it did not open (DEC-260's facade): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS BUNDLE — TURN 32b (2026-10-26; DEC-237; DEC-260; INC-908 — found by the executor's reviewer of turn 32, confirmed by the supervisor in the code; S429, the supervisor's slip: turn 32's brief tried the failure path for uncontrolled roots only; anchors located at fe0ceeea8b280cb10947d5499d52acd54d9ca6e1). Tier A (the modal primitive every confirmation and the sign-in step-up use; a failure path). No migration. No new string. No package change. No file deleted. No AGENTS.md change: the Overlays line (DEC-259, DEC-260) already governs these files and stays true. Base: dev fe0ceeea8b280cb10947d5499d52acd54d9ca6e1 (turn 33's final commit). Checked by script against AGENTS.md: no new control; no map read by an outside key (the real root and trigger now through `ownValue`); no silent catch (the loader logs; the owner is told); no `!`; no new cast (two leave the tests). ONE TURN. Parts, IN THIS ORDER: A — orient and CI first; STEP 0; B — the tests, red first; C — the fix; D — the weight guard; E — docs; then THE CHECKS, THE END-TO-END CHECK, the report and the landing.
BASE: fe0ceeea8b280cb10947d5499d52acd54d9ca6e1
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
src/components/ui/overlay-facade.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/ui/modal-facade.test.tsx
scripts/check-marketplace-imports.mjs
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a failed on-demand download of an overlay's code is reported as closed to whoever asked for the opening, and the next opening asks for the code again — for every kind of root: uncontrolled, controlled by its owner, opened by its owner.
MECHANISM: src/components/ui/overlay-facade.tsx (register row 48): `ModalRoot` (:400 at BASE) — its `want()` failure path resets its own flags only (:426-:429), so an owner that heard `onOpenChange(true)` from the trigger (:443) or opened the modal itself keeps `open` true, the effect on `ownerOpens` (:433-:435) never runs again and the next click sends the same `true`. Part C: on a failed download the root tells such an owner `onOpenChange(false)` (the owner read through a ref kept by a layout effect), so the owner's next opening re-arms the effect; the real root and trigger are read by their own keys (`ownValue`, as `ModalPart` already does). `OverlayRoot` (the tooltip and the menu) keeps its path: the trigger's next intent asks again (OVF-9), and no consumer opens a tooltip or a menu by its owner (census below).
CONSUMERS (grep at BASE): the modal roots — 22 controlled by `open` (src/features/ad-page/report-ad.tsx :67, share-ad.tsx :118, src/features/admin-categories/category-dialogs.tsx :76, src/features/admin-screening/screening-page.tsx :637, src/features/admin/legal/legal-editor-form.tsx :348, legal-page.tsx :395, legal-publish-dialog.tsx :40, src/features/admin/translations/ai-bulk-bar.tsx :339, approve-bar.tsx :144, delete-language-dialog.tsx :81, history-drawer.tsx :126, pseudo-bar.tsx :95, src/features/auth/mfa/step-up-gate.tsx :43, src/features/legal/certify-confirm.tsx :60, src/features/my-listings/my-listing-page.tsx :757, my-listings-page.tsx :854, src/features/posting/background-dialog.tsx :152, category-move-dialog.tsx :32, photo-editor.tsx :231, src/features/posting/preview/listing-detail.tsx :1167, :1233, src/routes/admin.listings_.$listingId_.edit.tsx :118), the phone rail's menu (src/components/shell/app-rail.tsx :933, owner-opened) and the toolbar panel's sheet (src/components/shell/toolbar-panel.tsx :64, controlled), and one uncontrolled (src/routes/dev.style.tsx :186); tooltips and menus opened by their owner (`<Tooltip open|defaultOpen>`, `<DropdownMenu open|defaultOpen>`): none.
COVERED HERE: every modal root above (they change nothing: the fix is inside ModalRoot). LEFT: none.
CONFORMANCE GUARD: src/components/ui/overlay-facade-failure.test.tsx — OVF-17 (a controlled dialog: the trigger's opening, a failed download, the owner hears `false`, the next click asks again and opens it) and OVF-18 (a dialog its owner opens: a failed download, the owner hears `false`, its next opening asks again), red first against BASE's facade (B3). The weight guard's FORBIDDEN gains `vaul` and `cmdk` (they carry Radix's dialog inside them; neither has an importer today), proven on a planted import (D1).
EXCEPTIONS: none. Not taken from the reviewer, with the reason: `aria-controls` on the closed trigger (Radix names its content's id only once its root exists, and a closed modal has no content to point at).
FIVE LENSES — security: the sign-in step-up's dialog (step-up-gate.tsx :43) can no longer stay invisible behind a failed download: its owner hears the closing and cancels, as it does on Escape · performance: no change (a few bytes in the facade) · failure modes: every kind of root now answers a failed download the same way — closed, told, asked again (OVF-9, OVF-16, OVF-17, OVF-18) · consistency: the owner hears what Radix's root would have reported: an opening that did not happen is a closing · future growth: an owner-opened tooltip or menu, if one is ever written, takes the same rule in OverlayRoot (a K2 line, not built today).
FORWARD-SCAN: the Sage redesign restyles these dialogs through the same facades; DEC-261's door (turns 34–35) shares no file. REGISTER: docs/governance/mechanisms.md row 48 (E2).

WHY
- On a bad connection, the dialog code can fail to download after the page has loaded. A dialog the screen controls — most confirm boxes, the report dialog, the sign-in step-up — then never appeared, and tapping again did nothing until the page was reloaded.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-32b.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-32b.md (Foundations turn 32b: INC-908 — a modal whose code fails to download tells its owner it did not open)` (everything after it stays); the turn-33 line stays exactly as turn 33 left it (its CI is read in A1 and recorded by the next brief); the line that begins "  - [ ] Turn 32b (after turn 33" is replaced by this line:
  - [ ] Turn 32b (docs/governance/briefs/foundations-turn-32b.md; no migration; the Claude Code executor) — INC-908: a modal whose code fails to download tells its owner it did not open (ModalRoot), so the next opening asks again — found by the executor's reviewer of turn 32; OVF-17 and OVF-18 red first; the real root and trigger read by their own keys; the weight guard forbids vaul and cmdk on the first paint.
Tick nothing else. Commit: `turn 32b: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B–E, one commit per part; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN. Do not stop anywhere else. A STOP (a rule conflict, a file outside SCOPE, a census hit this brief did not anticipate, an environment limit) is landed as 00-executor-protocol.md says: commit what is green, write docs/governance/reports/foundations-turn-32b.stop-<n>.md, commit it, land, end the turn; the supervisor answers in this session with "continue" or a numbered ruling.
- EXACT TEXT (INC-907): every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text — apply it with your file-editing tool; every line this brief gives is copied, never paraphrased. Copy each block from the saved brief (docs/governance/briefs/foundations-turn-32b.md), never from memory or a summary of it: if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's own hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- RED FIRST (G38): Part B adds OVF-17 and OVF-18 and runs them against BASE's facade — they must fail as B3 says; the red tests are committed only together with Part C's fix (Part B and Part C are ONE commit).
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/features/performance-strategy.md, docs/features/display-primitives.md, docs/features/ci-guards.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each part's commit, `bun run typecheck`, `bun run lint` and the tests the part touched pass.
- Known limits: EXH-11, EXH-12, EXH-17 and EXH-19 have timed out in sandboxes (INC-890); if one times out here, paste its failure line under Limits and do not change, skip or work around it. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS; the tests each part touches as you go; THE END-TO-END CHECK's tests through `bun run e2e:local -- <spec file>`, both projects, 2 workers, fake mode, 0 retries, each Bash call with a timeout of 1800000 ms; stop any preview server a killed run left on port 4173 before the next run; no local repeat runs (DEC-184); a run that is killed or cut short is reported as such and never re-run in the background (S407).
- Behaviour contract: every dialog, sheet and alert dialog opens, closes and returns the focus exactly as today when its code arrives; only a failed download changes: the owner hears `onOpenChange(false)` and the next opening asks again. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every root of a facade (modal, tooltip, menu) opened by its owner, and every place a failed on-demand download (`loadOnce`) leaves a caller believing it succeeded (none expected beyond this fix); K3 the tests land with the fix; K4–K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; red first (B3).
- If any rule of yours conflicts with this text, STOP and quote that rule's exact words in a stop report.

PART A — ORIENT AND CI FIRST.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says (fetch; local dev brought level as a fast-forward — the session setup did it at startup; git switch dev); paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. Read CI with the two-step check (.claude/rules/40-ci-evidence.md): git show origin/ci-evidence:docs/tracking/ci-status.md | head -6, then e2e-last-failure.md and guards-last-failure.md the same way; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE — turn 33's landing — finished with SUCCESS, or still running). A red on BASE is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part D and before the report (never wait for it: DEC-181 queues your landing behind it, and a landing never cancels a running run).

PART B — THE TESTS, RED FIRST (ONE COMMIT WITH PART C).
B1. src/components/ui/overlay-facade-failure.test.tsx, these edits (OVF-17, OVF-18; the double cast leaves the mock):
EDIT src/components/ui/overlay-facade-failure.test.tsx #1
OLD-BEGIN
      if (outcome === "fail") return Promise.reject(new Error("offline"));
      state.impl = real as unknown as OverlaysImpl;
      for (const listener of state.listeners) listener();
OLD-END
NEW-BEGIN
      if (outcome === "fail") return Promise.reject(new Error("offline"));
      state.impl = real;
      for (const listener of state.listeners) listener();
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #2
OLD-BEGIN
const { Dialog, DialogContent, DialogTitle, DialogTrigger } = await import("./dialog");
const { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } =
OLD-END
NEW-BEGIN
const { Dialog, DialogContent, DialogTitle, DialogTrigger } = await import("./dialog");
const { useState } = await import("react");
const { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } =
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #3
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("OVF-17 a controlled dialog whose download fails: its owner hears the closing, and the next click asks again and opens it (INC-908)", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    const heard: boolean[] = [];
    function Owned() {
      const [open, setOpen] = useState(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            heard.push(next);
            setOpen(next);
          }}
        >
          <DialogTrigger asChild>
            <Button data-testid="owned-trigger">Report</Button>
          </DialogTrigger>
          <DialogContent data-testid="owned-dialog">
            <DialogTitle>Report the ad</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    render(<Owned />);
    await act(async () => {
      fireEvent.click(screen.getByTestId("owned-trigger"));
    });
    expect(state.asked).toBe(1);
    expect(heard).toEqual([true, false]);
    expect(screen.queryByTestId("owned-dialog")).toBeNull();

    await act(async () => {
      fireEvent.click(screen.getByTestId("owned-trigger"));
    });
    expect(state.asked).toBe(2);
    expect(heard).toEqual([true, false, true]);
    expect(screen.getByTestId("owned-dialog")).toBeInTheDocument();
  });

  it("OVF-18 a dialog its owner opens whose download fails: the owner hears the closing, and its next opening asks again (INC-908)", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    const heard: boolean[] = [];
    let reopen: () => void = () => undefined;
    function Opened() {
      const [open, setOpen] = useState(true);
      reopen = () => setOpen(true);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            heard.push(next);
            setOpen(next);
          }}
        >
          <DialogContent data-testid="opened-dialog">
            <DialogTitle>Confirm it is you</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    await act(async () => {
      render(<Opened />);
    });
    expect(state.asked).toBe(1);
    expect(heard).toEqual([false]);
    expect(screen.queryByTestId("opened-dialog")).toBeNull();

    await act(async () => {
      reopen();
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("opened-dialog")).toBeInTheDocument();
  });
});
NEW-END
B2. src/components/ui/modal-facade.test.tsx, this edit (OVF-12 reads the focus without a cast):
EDIT src/components/ui/modal-facade.test.tsx #1
OLD-BEGIN
      expect(screen.getByTestId("dialog")).toContainElement(document.activeElement as HTMLElement),
OLD-END
NEW-BEGIN
      expect(screen.getByTestId("dialog").contains(document.activeElement)).toBe(true),
NEW-END
B3. Red first: `bunx vitest run src/components/ui/overlay-facade-failure.test.tsx` against BASE's overlay-facade.tsx — OVF-17 must fail with `expected [ true ] to deeply equal [ true, false ]` and OVF-18 with `expected [] to deeply equal [ false ]`; OVF-9 and OVF-16 pass. Paste the lines.

PART C — THE FIX.
C1. src/components/ui/overlay-facade.tsx, these edits:
EDIT src/components/ui/overlay-facade.tsx #1
OLD-BEGIN
 * everything is Radix's. A failed download leaves the closed modal and the next
 * opening asks again.
 */
OLD-END
NEW-BEGIN
 * everything is Radix's. A failed download leaves the closed modal and the next
 * opening asks again; an owner that heard the opening, or opened the modal itself,
 * hears `onOpenChange(false)` when the download fails, so its next opening asks
 * for the module again (INC-908).
 */
NEW-END
EDIT src/components/ui/overlay-facade.tsx #2
OLD-BEGIN
  const controlled = open !== undefined;

OLD-END
NEW-BEGIN
  const controlled = open !== undefined;
  /** The owner as it stands, for the download's failure path (INC-908). */
  const owner = React.useRef({ controlled, onOpenChange });
  useIsoLayoutEffect(() => {
    owner.current = { controlled, onOpenChange };
  });

NEW-END
EDIT src/components/ui/overlay-facade.tsx #3
OLD-BEGIN
      setOpened(false);
    });
OLD-END
NEW-BEGIN
      setOpened(false);
      // INC-908 — an owner that heard the trigger's opening, or opened the modal itself,
      // hears that it did not open: its next opening asks for the module again.
      const { controlled: owned, onOpenChange: tell } = owner.current;
      if (byTrigger || owned) tell?.(false);
    });
NEW-END
EDIT src/components/ui/overlay-facade.tsx #4
OLD-BEGIN
  const inner = <Context.Provider value={state}>{children}</Context.Provider>;
  if (real === null) return inner;
  const RealRoot = real.Root;
  return (
OLD-END
NEW-BEGIN
  const inner = <Context.Provider value={state}>{children}</Context.Provider>;
  const RealRoot = real === null ? undefined : ownValue(real, "Root");
  if (RealRoot === undefined) return inner;
  return (
NEW-END
EDIT src/components/ui/overlay-facade.tsx #5
OLD-BEGIN
  const { real, ask } = useModal(kind, part);
  if (real !== null) {
    const RealTrigger = real.Trigger;
    return (
OLD-END
NEW-BEGIN
  const { real, ask } = useModal(kind, part);
  const RealTrigger = real === null ? undefined : ownValue(real, "Trigger");
  if (RealTrigger !== undefined) {
    return (
NEW-END
Then `bunx vitest run src/components/ui/overlay-facade-failure.test.tsx src/components/ui/modal-facade.test.tsx src/components/ui/overlay-facade.test.tsx scripts/conformance/overlays.test.ts --reporter=verbose` (OVF-1…18 and CF-OV-1…3, every one passed; paste the lines), `bun run typecheck`, `bun run lint`. Commit (Parts B and C together): `turn 32b parts B–C: a failed modal download tells its owner; OVF-17, OVF-18`.

PART D — THE WEIGHT GUARD.
D1. scripts/check-marketplace-imports.mjs, this edit:
EDIT scripts/check-marketplace-imports.mjs #1
OLD-BEGIN
  "@radix-ui/react-alert-dialog",
];
OLD-END
NEW-BEGIN
  "@radix-ui/react-alert-dialog",
  // INC-908 (Foundations turn 32b) — the drawer (vaul) and the command palette (cmdk) carry
  // Radix's dialog inside them: neither may reach the first paint either.
  "vaul",
  "cmdk",
];
NEW-END
Proof (never committed): add the line `import "vaul";` as the first line of src/components/app-shell.tsx and run `node scripts/check-marketplace-imports.mjs` — it must print `findings: 1` and `  src/components/app-shell.tsx imports vaul`; paste both; put the file back and check its sha256 against BASE's (e012aa149cee50292b97c1d70144f67824fb41036c9cefec0dcd894d9d8cab16); the guard then prints `findings: 0`. Commit: `turn 32b part D: vaul and cmdk off the first paint`.

PART E — DOCS.
E1. docs/features/performance-strategy.md, this edit:
EDIT docs/features/performance-strategy.md #1
OLD-BEGIN
- A failed download leaves the closed modal and logs the loader's warning; the next opening asks again.
OLD-END
NEW-BEGIN
- A failed download leaves the closed modal and logs the loader's warning; an owner that heard the trigger's opening, or opened the modal itself, hears `onOpenChange(false)`, so its next opening asks for the module again (INC-908, turn 32b: OVF-17, OVF-18).
NEW-END
E2. docs/governance/mechanisms.md, this edit (row 48's notes):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 48 | An overlay primitive's code (the tooltip, the dropdown menu, the dialog, the alert dialog: Radix, floating-ui and their focus, scroll and dismiss layers) waits for the person's intent and never rides a page's first download (D234, DEC-259, DEC-260) | the facades `src/components/ui/tooltip.tsx` and `dropdown-menu.tsx` (the impls' exports) on `OverlayRoot` / `OverlayTrigger` / `OverlayContent`, and `dialog-primitive.tsx` (under `dialog.tsx`, `sheet.tsx`) and `alert-dialog-primitive.tsx` (under `alert-dialog.tsx`) on `ModalRoot` / `ModalTrigger` / `ModalPart` (`src/components/ui/overlay-facade.tsx`); the module `overlays-impl.ts` (re-exports the four impl files) behind `loadOverlays` / `useOverlays` / `warmOverlaysWhenIdle` (`src/components/ui/overlay-loader.ts`, loadOnce) — a tooltip's or a menu's trigger is the consumer's own element from the first render and the real root draws beside it on the first hover or keyboard focus (a tooltip) or press or opening key (a menu), the intent replayed on the same element; a closed modal draws its trigger alone and the real root draws around its children at the first opening (the trigger's click or the owner's `open`); the module is asked for anyway once the page is idle | `scripts/conformance/overlays.test.ts` (CF-OV-1…3: only the impl files reach the four Radix packages, only overlays-impl the impl files, only the loader overlays-impl; each facade exports its impl's names, the modal facades Radix's parts); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY (`overlays-impl`); the weight guard's FORBIDDEN; OVF-1…16; `e2e/overlays.spec.ts` (OVE-1…3) | none | a new overlay primitive is one impl file re-exported by overlays-impl and one facade over the same parts (the popover and the select next — K2); an owner-opened root (`open`, `defaultOpen`) is asked for at once | triggers are asChild only (the types say so); a modal's children are drawn afresh at its first opening; Foundations turns 31 and 32 |
OLD-END
NEW-BEGIN
| 48 | An overlay primitive's code (the tooltip, the dropdown menu, the dialog, the alert dialog: Radix, floating-ui and their focus, scroll and dismiss layers) waits for the person's intent and never rides a page's first download (D234, DEC-259, DEC-260) | the facades `src/components/ui/tooltip.tsx` and `dropdown-menu.tsx` (the impls' exports) on `OverlayRoot` / `OverlayTrigger` / `OverlayContent`, and `dialog-primitive.tsx` (under `dialog.tsx`, `sheet.tsx`) and `alert-dialog-primitive.tsx` (under `alert-dialog.tsx`) on `ModalRoot` / `ModalTrigger` / `ModalPart` (`src/components/ui/overlay-facade.tsx`); the module `overlays-impl.ts` (re-exports the four impl files) behind `loadOverlays` / `useOverlays` / `warmOverlaysWhenIdle` (`src/components/ui/overlay-loader.ts`, loadOnce) — a tooltip's or a menu's trigger is the consumer's own element from the first render and the real root draws beside it on the first hover or keyboard focus (a tooltip) or press or opening key (a menu), the intent replayed on the same element; a closed modal draws its trigger alone and the real root draws around its children at the first opening (the trigger's click or the owner's `open`); the module is asked for anyway once the page is idle | `scripts/conformance/overlays.test.ts` (CF-OV-1…3: only the impl files reach the four Radix packages, only overlays-impl the impl files, only the loader overlays-impl; each facade exports its impl's names, the modal facades Radix's parts); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY (`overlays-impl`); the weight guard's FORBIDDEN; OVF-1…16; `e2e/overlays.spec.ts` (OVE-1…3) | none | a new overlay primitive is one impl file re-exported by overlays-impl and one facade over the same parts (the popover and the select next — K2); an owner-opened root (`open`, `defaultOpen`) is asked for at once | triggers are asChild only (the types say so); a modal's children are drawn afresh at its first opening; a failed download tells a modal's owner it did not open (INC-908); Foundations turns 31, 32 and 32b |
NEW-END
E3. docs/features/display-primitives.md, this edit (the modal rule):
EDIT docs/features/display-primitives.md #1
OLD-BEGIN
  survive the first opening outside the modal's root. Nothing imports
OLD-END
NEW-BEGIN
  survive the first opening outside the modal's root. When the code fails to
  download, an owner that heard the opening (or opened the modal itself) hears
  `onOpenChange(false)`, so its next opening asks again (INC-908). Nothing imports
NEW-END
E4. docs/features/ci-guards.md, at its end:
APPEND-BEGIN docs/features/ci-guards.md
## INC-908 — a failed overlay download on a modal its owner controls

`src/components/ui/overlay-facade-failure.test.tsx` gains OVF-17 (a controlled dialog: the trigger's opening, a failed download, the owner hears `false`, the next click asks again and opens it) and OVF-18 (a dialog its owner opens: a failed download, the owner hears `false`, its next opening asks again); both were shown red against turn 32's facade. The weight guard's FORBIDDEN gains `vaul` and `cmdk`, which carry Radix's dialog inside them (proven on a planted `import "vaul"`).
APPEND-END docs/features/ci-guards.md
docs/_changelog.md, at its end:
APPEND-BEGIN docs/_changelog.md
- Foundations turn 32b (2026-10-26) — INC-908: a modal whose code fails to download no longer stays stuck for its owner — ModalRoot tells an owner that heard the trigger's opening, or opened the modal itself, `onOpenChange(false)`, so its next opening asks for the module again; the real root and trigger are read by their own keys (`ownValue`); OVF-17, OVF-18 (red first on turn 32's code); two casts left the overlay tests; the weight guard forbids `vaul` and `cmdk` on the first paint. No migration, new string or package change.
APPEND-END docs/_changelog.md
At the end, roadmap.md's turn-32b line `[x]` with the last code commit and the unit totals appended. Commit: `turn 32b part E: docs, register, changelog`.

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-32b.md | sha256sum -c` — every line prints OK (the list below; a FAILED line is fixed by copying its block again from the saved brief, never by editing an expectation); `git diff <START> --stat -- src/features src/routes src/components/shell` (empty: no consumer changes); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals — the supervisor's run: 305 files, 1899 tests, every one passed); `bun run i18n:usage` and `bun run i18n:map-guard` (the maps do not move); `bun run build`; `node scripts/check-bundle-size.mjs` (it must pass); `node scripts/check-marketplace-imports.mjs` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
0526075e6639c08578c4274548b5c31d2ff846abadae5e5ab24810ceedc63fdd  src/components/ui/overlay-facade-failure.test.tsx
34eebf692394d9635bbb207f0d6bc58e4554a9ef5725f7bc95293a23e7d28527  src/components/ui/modal-facade.test.tsx
41fe33c859ce982bfef8097ab93d3392ccbaaff7c0fb68ab2c7fa090ca1d919e  src/components/ui/overlay-facade.tsx
b7b8ce40698d3b74daa534bdd21f8a5f5cb23901817cdff735f614c678e05bd3  scripts/check-marketplace-imports.mjs
5d11c7ca920bed7f4cd1cd828e3c4004c22fd6a766cfb7d2f28ae33a45bdf17a  docs/features/performance-strategy.md
992066b419ee53529c70e9477bd17a271571b2f09c87b860176efdc6910cecb5  docs/governance/mechanisms.md
c2fc7b70f209d8c2e20c2ac314e8d40e33d5aebe448274de7e03bad0da2c2af2  docs/features/display-primitives.md
82b6cb02493c5e43ba0b554d9b03c5b5e77e4354f18a84b8e69dc2e507556dad  docs/features/ci-guards.md
0493e49e496725231ec572da85cc3ee1296ec34ce269a7ab00ec97ece246db91  docs/_changelog.md

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/overlays.spec.ts whole; e2e/ad-page.spec.ts `--grep "AP-29 |AP-30 "` (the report and share dialogs, controlled); e2e/my-listings-ad.spec.ts `--grep "MLA-5 "` (an alert dialog's confirm); paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-32b.report.md, with the twelve headings of .claude/rules/60-report.md, carrying: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract — a controlled, an owner-opened and an uncontrolled modal whose download fails, before → after (3); the consumer census with file:line, re-located at <START> (4); B3's red lines, the tests, the unit totals, the E2E count lines (5); the K2 lists, file:line (6); the guard's count and D1's proof (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12). Its "Final commit" is your last code commit. Commit it on its own (`turn 32b: report`), run bun .claude/hooks/land.ts with a Bash timeout of 1800000 ms, and END THE TURN when it prints LANDED or HELD; the supervisor reads the run.
```

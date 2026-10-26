# Foundations — turn 32: speed S9 — the dialogs' code on demand: the dialog's and the alert dialog's code waits for the person (D234, DEC-260): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS BUNDLE — TURN 32 (2026-10-26; DEC-237; D234 — the operator: "it should be the fastest, lightweight … VERY IMPORTANT"; DEC-260 — the supervisor's decision under G17, reversible, which the operator's "all as recommended" (2026-10-26) covers: the dialog and the alert dialog join the overlay facades of turn 31, so their Radix code arrives on demand; anchors located at 2b8160c9e239ca87b69ba80f26991dd31fe159c2). Tier A (the modal primitive every confirmation, the phone menu and the sign-in step-up use; focus and keyboard behaviour; the first-paint guards). No migration. No new string. No package change. No file deleted. AGENTS.md: the Overlays line (F6). Base: dev 2b8160c9e239ca87b69ba80f26991dd31fe159c2 (turn 31's final commit: its reconciliation of five docs, INC-907). The first speed turn on the Claude Code executor (DEC-255–257). Checked by script against AGENTS.md: no new control; no map read by an outside key (`MODALS[kind]`, `ROOTS[kind]` and `impl[kind]` take the typed `ModalKind` / `OverlayKind` the facades pass, never an outside value; part names read through `ownValue`); no silent catch (a failed download is logged by the loader and the next opening retries); no `!`; no `.first()` in e2e. ONE TURN. Parts, IN THIS ORDER: A — orient and CI first; STEP 0; B — the modal facades (one commit); C — the tests and the census; D — the first-paint guards; E — the browser; F — docs, register, changelog, AGENTS.md, the usage maps; then THE CHECKS, THE END-TO-END CHECK, the report and the landing.
BASE: 2b8160c9e239ca87b69ba80f26991dd31fe159c2
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/dialog-impl.ts
src/components/ui/alert-dialog-impl.ts
src/components/ui/dialog-primitive.tsx
src/components/ui/alert-dialog-primitive.tsx
src/components/ui/dialog.tsx
src/components/ui/sheet.tsx
src/components/ui/alert-dialog.tsx
src/components/shell/app-rail.tsx
src/components/shell/toolbar-panel.tsx
src/components/ui/modal-facade.test.tsx
src/components/ui/overlay-facade-failure.test.tsx
scripts/conformance/overlays.test.ts
scripts/check-marketplace-imports.mjs
scripts/check-bundle-size.mjs
scripts/route-budgets.mjs
e2e/overlays.spec.ts
AGENTS.md
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a modal overlay's code — the dialog's and the alert dialog's (Radix's dialog with its focus trap, scroll lock and hide-the-rest layers) — waits for the person's first opening and never rides a page's first download; the person sees the same trigger and the same modal, with Radix's own focus handling.
MECHANISM: src/components/ui/overlay-facade.tsx and src/components/ui/overlay-loader.ts (register row 48, turn 31), extended in Part B with `ModalRoot`, `ModalTrigger` and `ModalPart`: a closed modal draws its children with the trigger alone (the closed state's attributes, as Radix's); the first opening — the trigger's click, or the owner's `open` / `defaultOpen` — asks for the module and draws the real Radix root AROUND the children, open; the owner hears `onOpenChange(true)` from the trigger as from Radix's, and an uncontrolled modal opens itself. The Radix code is re-exported by dialog-impl.ts and alert-dialog-impl.ts, which join overlays-impl.ts; the facades dialog-primitive.tsx and alert-dialog-primitive.tsx keep Radix's part names, so ui/dialog.tsx, ui/sheet.tsx and ui/alert-dialog.tsx change one import line each. The standard: WAI-ARIA APG dialog (modal) and alertdialog patterns (unchanged — Radix still draws them); import-on-interaction / idle-until-urgent loading.
CONSUMERS (grep at BASE): Radix's dialog by value — src/components/shell/app-rail.tsx :2 (the phone rail's menu, :933, owner-opened, modal={false}), src/components/shell/toolbar-panel.tsx :1 (the toolbar panel's phone sheet, :64, controlled, a trigger), src/components/ui/dialog.tsx :4, src/components/ui/sheet.tsx :4, src/components/ui/alert-dialog.tsx :2 (the alert dialog); src/components/ui/command.tsx :4 (a type-only `DialogProps`: passes the census; command.tsx has no importer). Through ui/dialog, ui/sheet and ui/alert-dialog, every root controlled by `open` with `onOpenChange`: src/features/ad-page/report-ad.tsx :67, share-ad.tsx :118, src/features/admin-categories/category-dialogs.tsx :76, src/features/admin-screening/screening-page.tsx :637, src/features/admin/legal/legal-editor-form.tsx :348, legal-page.tsx :395, legal-publish-dialog.tsx :40, src/features/admin/translations/ai-bulk-bar.tsx :339, approve-bar.tsx :144, delete-language-dialog.tsx :81, history-drawer.tsx :126 (a sheet), pseudo-bar.tsx :95, src/features/auth/mfa/step-up-gate.tsx :43, src/features/legal/certify-confirm.tsx :60, src/features/my-listings/my-listing-page.tsx :757, my-listings-page.tsx :854, src/features/posting/background-dialog.tsx :152, category-move-dialog.tsx :32, photo-editor.tsx :231, src/features/posting/preview/listing-detail.tsx :1167 and :1233, src/routes/admin.listings_.$listingId_.edit.tsx :118, src/components/ui/sidebar.tsx :191 (a sheet); one uncontrolled root with no handler: src/routes/dev.style.tsx :186. Every DialogTrigger, SheetTrigger and AlertDialogTrigger is `asChild` (the typecheck proves it once the facades require it).
COVERED HERE: every consumer above — the five direct importers move onto the facades; the rest import the same names from the same files. LEFT: the popover, the select, the hover card, the context menu, the menubar and the navigation menu still import Radix directly (turn 31's report §5: src/components/ui/popover.tsx :2, select.tsx :4, hover-card.tsx :2, context-menu.tsx :2, menubar.tsx :2, navigation-menu.tsx :2) — the next speed turns, by the same parts (a roadmap line in STEP 0); src/components/ui/drawer.tsx (vaul) and command.tsx have no importer.
CONFORMANCE GUARD: scripts/conformance/overlays.test.ts — CF-OV-1 (every file under src/, e2e/ and scripts/) gains @radix-ui/react-dialog and @radix-ui/react-alert-dialog (only their impl files reach them by value) and the two impl files (only overlays-impl.ts reaches them); CF-OV-3 pins the modal facades' exports to Radix's part names, and each part name in the facades `satisfies` the impl's keys (a misspelt part fails the typecheck). The weight guard's FORBIDDEN gains the two packages (D1, proven on a planted import); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY already hold `overlays-impl`; OVF-11…16; e2e/overlays.spec.ts OVE-3. Shown red on a planted import (C4).
EXCEPTIONS: none (command.tsx's type-only import passes by the census's rule, not by an allowlist line).
FIVE LENSES — security: no input, no door, no data; the focus trap, aria-modal, Escape and the focus return stay Radix's · performance: the supervisor's build — the entry 260.0 → 254.1 KiB; every public page 5.9–6.0 KiB lighter; the posting and editing pages 6.7–6.8 KiB; twelve staff and dev pages that draw another Radix overlay (a popover, a select) 0.3–0.4 KiB heavier (the focus, dismiss and positioning layers it shares with the dialog now ride their own chunk), every one under its ceiling; the overlay module 10.9 KiB gzip, asked for after the load event · failure modes: a failed download leaves the closed modal, the loader logs `[overlays] loading the overlay primitives failed`, the next opening asks again (OVF-16) · consistency: the same loader, census and facade file as the tooltip and the menu; every modal root answers as Radix's — the owner hears the opening and the closing (OVF-13, OVF-15) · future growth: the popover and the select are one impl file and one facade each over the same parts; an owner-opened root is asked for at once.
FORWARD-SCAN: the operator's UI redesign before Stage 2 adds dialogs — through these facades by the census; DEC-261 (the Supabase client off the first download) and DEC-262 (the phone's own fonts) are the next speed turns and touch none of these files. REGISTER: docs/governance/mechanisms.md row 48 (F2).

WHY
- Every page's first download carried Radix's dialog — its focus trap, scroll lock and hide-the-rest layers, about 6 KiB gzip — because the phone rail's menu and the toolbar panel imported it directly, before anyone had opened a window.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-32.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-32.md (Foundations turn 32: speed S9 — the dialogs' code on demand: the dialog's and the alert dialog's code waits for the person — D234, DEC-260)` (everything after it stays); the line that begins "  - [x] Turn 31 (docs/governance/briefs/foundations-turn-31.md" is replaced by these lines:
  - [x] Turn 31 (docs/governance/briefs/foundations-turn-31.md; no migration) — speed S8: the overlays' code on demand (DEC-259) — Tooltip and DropdownMenu as facades over overlay-facade.tsx, their Radix code through overlay-loader.ts on the first intent or at idle; the trigger kept and the intent replayed; CF-OV-1…3; the weight guard follows side-effect imports; the ceilings re-measured (the entry 280.2 → 260.0 KiB); INC-905. Code commit d0ba6c1b — CI run 40248221261: every job green (the bundle budget, the build, typecheck and lint, every lane); final HEAD 2b8160c9, the reconciliation that restored five docs by script from the saved brief (INC-907) — CI run 40248987616: SUCCESS, every job, and main promoted to 2b8160c9; unit 303 files / 1886 passed / 1 skipped / 1 named sandbox timeout (EXH-11); browser 170 passed / 60 project skips.
  - [ ] Turn 32 (docs/governance/briefs/foundations-turn-32.md; no migration; the Claude Code executor) — speed S9: the dialogs' code on demand (DEC-260) — Dialog, Sheet and AlertDialog on facades (dialog-primitive.tsx, alert-dialog-primitive.tsx) over ModalRoot / ModalTrigger / ModalPart; their Radix code joins overlays-impl.ts; the phone rail and the toolbar panel on the facade; CF-OV extended; OVF-11…16; OVE-3; the entry 260.0 → 254.1 KiB.
  - [ ] Turn 33 — speed S10: the phone's own fonts (DEC-262, the operator 2026-10-26): the render-blocking Google Fonts stylesheets and the web-font families leave; the device's font stack for every script, Amharic on the phone's Ethiopic font; no layout or behaviour change.
  - [ ] Turns 34–37 — speed S11: the Supabase client off every page's first download (DEC-261, Tier A, the operator 2026-10-26; the supervisor's study of 2026-10-25): one door getSupabase() on loadOnce, a stored-session reader for the first render, the language bundles behind defineRoute, signed-in calls await the door, the callback and signed-in screens load it eagerly, a census guard. Frozen rule: adopted whole when turn 1's build takes at least 45 KiB gzip off the entry closure, every sign-in, sign-up, callback and session test is green in CI and AP-54 holds; under 45 KiB, stop after the language routes and record why.
  - [ ] Speed, after turn 37: the category pictures re-cut to WebP at card size by a staff action, the same pictures, cached for good under new names (DEC-265, INC-900); card-size copies of a live ad's photos at stable public addresses, deleted and purged the moment the ad stops being live, originals and drafts private (DEC-264, Tier A, spec owed); the popover, the select, the hover card, the context menu, the menubar and the navigation menu on the overlay facades (K2 of turns 31–32); edge caching of signed-out pages with a purge on every staff publish, at the DNS cutover (DEC-263, spec owed).
Tick nothing else. Commit: `turn 32: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B–F, one commit per part; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN. Do not stop anywhere else. A STOP (a rule conflict, a file outside SCOPE, a census hit this brief did not anticipate, an environment limit) is landed as 00-executor-protocol.md says: commit what is green, write docs/governance/reports/foundations-turn-32.stop-<n>.md, commit it, land, end the turn; the supervisor answers in this session with "continue" or a numbered ruling.
- EXACT TEXT (INC-907): every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text — apply it with your file-editing tool; every line this brief gives is copied, never paraphrased. Copy each block from the saved brief (docs/governance/briefs/foundations-turn-32.md), never from memory or a summary of it: if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's own hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- PART B IS ONE COMMIT: the facades, the impl files and the five re-pointed imports land together — between B1 and B10 the tree does not typecheck. Write B1–B10 without stopping, then `bun run typecheck`, `bun run lint` and the whole unit suite (every component test that draws a dialog runs through the facade), then commit.
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn changes e2e/overlays.spec.ts only (read-only: no rows).
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/features/performance-strategy.md, docs/features/ci-guards.md, docs/features/display-primitives.md, docs/_changelog.md, docs/governance/mechanisms.md, roadmap.md, the brief, the report, and the two i18n usage maps when `bun run i18n:usage` moves them. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each part's commit, `bun run typecheck`, `bun run lint` and the tests the part touched pass. Planted proofs (C4, D1) are never committed: put each file back with your editing tool and check its sha256 against BASE's before the commit.
- Type safety: fix every typecheck error at its root (no `!`, new cast, `any` or `@ts-expect-error`); the facade reads Radix's parts through the shape guard `partsOf` (B1), never a cast.
- Known limits: EXH-11, EXH-12, EXH-17 and EXH-19 have timed out in sandboxes (INC-890); if one times out here, paste its failure line under Limits and do not change, skip or work around it. Every other test must pass.
- Local runs: the unit suite whole after Part B and at THE CHECKS; the tests each part touches as you go; THE END-TO-END CHECK's tests through `bun run e2e:local -- <spec file>`, both projects, 2 workers, fake mode, 0 retries, each Bash call with a timeout of 1800000 ms; stop any preview server a killed run left on port 4173 before the next run; no local repeat runs (DEC-184); a run that is killed or cut short is reported as such and never re-run in the background (S407). The bundle ceilings (D2–D3) are the supervisor's build of this change; when `node scripts/check-bundle-size.mjs` fails after your build, paste its whole output and STOP — never move a ceiling yourself.
- Behaviour contract: every page shows what it shows today and every trigger looks the same; a dialog, sheet or alert dialog opens on its trigger's first click or its owner's `open`, with the focus moved inside, Escape closing it and the focus going back to the trigger; the owner's `onOpenChange` hears what Radix's would; the phone menu opens on its first tap. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every file under src/ that still imports from @radix-ui/ by value and draws an overlay (the popover, the select, the hover card, the context menu, the menubar, the navigation menu — expected as THE SYSTEM's LEFT line), every DialogTrigger, SheetTrigger or AlertDialogTrigger without `asChild` (none may remain), and every consumer that keeps state inside a modal's root but outside its content (none expected — the children are drawn afresh at the first opening); K3 the census, its tests and OVE-3 land with the mechanism; K4 no literal language code; K5, K6 do not arise.
- Tests (G27, G38): no real row (OVE-3 only opens the phone menu on the home page); no assertion loosened; the census is shown red on a planted import (C4) and the weight guard on a planted import (D1), each put back.
- If any rule of yours conflicts with this text, STOP and quote that rule's exact words in a stop report.

PART A — ORIENT AND CI FIRST.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says (fetch; local dev brought level as a fast-forward — the session setup did it at startup; git switch dev); paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. Read CI with the two-step check (.claude/rules/40-ci-evidence.md): git show origin/ci-evidence:docs/tracking/ci-status.md | head -6, then e2e-last-failure.md and guards-last-failure.md the same way; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE — turn 31's reconciliation, docs only: SUCCESS, every job, and main promoted to 2b8160c9; its code is d0ba6c1b's, whose run 40248221261 was green on every job). A red on BASE is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part D.

PART B — THE MODAL FACADES (ONE COMMIT, B1–B10).
B1. src/components/ui/overlay-facade.tsx, these edits (the modal parts after the tooltip's and the menu's; the shape guard that reads Radix's parts):
EDIT src/components/ui/overlay-facade.tsx #1
OLD-BEGIN
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  loadOverlays,
  useOverlays,
OLD-END
NEW-BEGIN
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { ownValue } from "@/lib/own-key";

import {
  loadOverlays,
  useOverlays,
NEW-END
EDIT src/components/ui/overlay-facade.tsx #2
OLD-BEGIN
  useIsoLayoutEffect(() => () => setContent(null), [setContent]);
  return null;
}
OLD-END
NEW-BEGIN
  useIsoLayoutEffect(() => () => setContent(null), [setContent]);
  return null;
}

/**
 * THE MODAL OVERLAYS (DEC-260; Foundations turn 32): the dialog and the alert
 * dialog. A closed modal draws nothing but its trigger, so until its first
 * opening ModalRoot draws its children with the closed trigger alone (the closed
 * state's attributes, as Radix's). The first opening — the trigger's click, or
 * the owner's `open` — asks for the module, then draws the real Radix root
 * AROUND the children, open: the owner hears `onOpenChange(true)` from the
 * trigger as from Radix's, and an uncontrolled modal opens itself. The children are
 * drawn afresh at that moment (the focus moves into the modal); afterwards
 * everything is Radix's. A failed download leaves the closed modal and the next
 * opening asks again.
 */
export type ModalKind = "dialog" | "alertDialog";

type Parts = Record<string, React.ComponentType<Props>>;

/** A module export a modal draws: a component (a function, or React's memo / forwardRef object). */
function isPart(value: unknown): value is React.ComponentType<Props> {
  return (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && "$$typeof" in value)
  );
}

const PARTS = new WeakMap<object, Parts>();

/** Radix's parts of one modal kind, by export name — read once per module. */
function partsOf(module: object): Parts {
  const known = PARTS.get(module);
  if (known !== undefined) return known;
  const parts: Parts = Object.fromEntries(
    Object.entries(module).filter((entry): entry is [string, React.ComponentType<Props>] =>
      isPart(entry[1]),
    ),
  );
  PARTS.set(module, parts);
  return parts;
}

interface ModalState {
  /** Radix's parts of this kind once the root is real; null before. */
  real: Parts | null;
  /** The trigger's click before the real root exists. */
  ask(): void;
}

/** One context per kind: an alert dialog may open from inside a dialog. */
const MODALS: Record<ModalKind, React.Context<ModalState | null>> = {
  dialog: React.createContext<ModalState | null>(null),
  alertDialog: React.createContext<ModalState | null>(null),
};

function useModal(kind: ModalKind, part: string): ModalState {
  const state = React.useContext(MODALS[kind]);
  if (state === null) throw new Error(`${part} must be used within its root`);
  return state;
}

export function ModalRoot({
  kind,
  children,
  open,
  defaultOpen,
  onOpenChange,
  ...rest
}: Props & {
  kind: ModalKind;
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const impl = useOverlays();
  const [wanted, setWanted] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const controlled = open !== undefined;

  React.useEffect(() => {
    warmOverlaysWhenIdle();
  }, []);

  const want = React.useCallback((byTrigger: boolean) => {
    setWanted(true);
    if (byTrigger) setOpened(true);
    loadOverlays().catch(() => {
      setWanted(false);
      setOpened(false);
    });
  }, []);

  const ownerOpens = open === true || defaultOpen === true;
  React.useEffect(() => {
    if (ownerOpens) want(false);
  }, [ownerOpens, want]);

  const real = wanted && impl !== null ? partsOf(impl[kind]) : null;
  const state = React.useMemo<ModalState>(
    () => ({
      real,
      ask: () => {
        // As Radix's trigger: the owner hears the opening; an uncontrolled modal opens itself.
        onOpenChange?.(true);
        if (!controlled) want(true);
      },
    }),
    [real, controlled, onOpenChange, want],
  );

  const Context = MODALS[kind];
  const inner = <Context.Provider value={state}>{children}</Context.Provider>;
  if (real === null) return inner;
  const RealRoot = real.Root;
  return (
    <RealRoot
      {...rest}
      open={open}
      defaultOpen={defaultOpen === true || opened}
      onOpenChange={onOpenChange}
    >
      {inner}
    </RealRoot>
  );
}

/** A closed modal's trigger attributes, as Radix's DialogTrigger draws them. */
const MODAL_CLOSED: Props = {
  type: "button",
  "aria-haspopup": "dialog",
  "aria-expanded": false,
  "data-state": "closed",
};

export function ModalTrigger({
  kind,
  part,
  children,
  onClick,
  ...props
}: Props & {
  kind: ModalKind;
  part: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { real, ask } = useModal(kind, part);
  if (real !== null) {
    const RealTrigger = real.Trigger;
    return (
      <RealTrigger asChild onClick={onClick} {...props}>
        {children}
      </RealTrigger>
    );
  }
  const shell: Props = {
    ...MODAL_CLOSED,
    ...props,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) ask();
    },
  };
  return <Slot {...shell}>{children}</Slot>;
}

/** A part a closed modal does not draw: the real part once the root is real, else nothing. */
export function ModalPart({ kind, part, ...props }: Props & { kind: ModalKind; part: string }) {
  const { real } = useModal(kind, part);
  const Real = real === null ? undefined : ownValue(real, part);
  return Real === undefined ? null : <Real {...props} />;
}
NEW-END
B2. src/components/ui/overlays-impl.ts, replaced whole by this text (sha256 49e319c79f99d5d0c5c9d2021c0bfd5a73ab12e0b4d28b376589255e31f9a71f):
FILE-BEGIN src/components/ui/overlays-impl.ts
/**
 * DEC-259 (Foundations turn 31; D234 speed S8) and DEC-260 (turn 32; S9) — THE
 * OVERLAY PRIMITIVES' OWN CODE. The tooltip, the dropdown menu, the dialog and the
 * alert dialog (Radix, floating-ui and their layers) are fetched on demand through
 * src/components/ui/overlay-loader.ts, never on the first download. Only the
 * facades (tooltip.tsx, dropdown-menu.tsx, dialog-primitive.tsx,
 * alert-dialog-primitive.tsx, over overlay-facade.tsx) use it, and only through
 * the loader.
 */
export * as alertDialog from "./alert-dialog-impl";
export * as dialog from "./dialog-impl";
export * as menu from "./dropdown-menu-impl";
export * as tooltip from "./tooltip-impl";
FILE-END src/components/ui/overlays-impl.ts
B3. NEW src/components/ui/dialog-impl.ts (sha256 e8fb5c33feef0af87b86a3d2d7494d760344136cc210349d7b3c59e9376a7cc0):
FILE-BEGIN src/components/ui/dialog-impl.ts
/**
 * DEC-260 (Foundations turn 32; D234 speed S9) — THE RADIX DIALOG ITSELF, fetched on
 * demand with the other overlay primitives (overlays-impl.ts). Only
 * src/components/ui/dialog-primitive.tsx reaches it, and only through the loader.
 */
export * from "@radix-ui/react-dialog";
FILE-END src/components/ui/dialog-impl.ts
B4. NEW src/components/ui/alert-dialog-impl.ts (sha256 1e670cd282ad9c5f06516e254607ef87f5f8d3ca4e95216a7618f20002e36f1a):
FILE-BEGIN src/components/ui/alert-dialog-impl.ts
/**
 * DEC-260 (Foundations turn 32; D234 speed S9) — THE RADIX ALERT DIALOG ITSELF,
 * fetched on demand with the other overlay primitives (overlays-impl.ts). Only
 * src/components/ui/alert-dialog-primitive.tsx reaches it, and only through the loader.
 */
export * from "@radix-ui/react-alert-dialog";
FILE-END src/components/ui/alert-dialog-impl.ts
B5. NEW src/components/ui/dialog-primitive.tsx (sha256 2e61dfe9705a63cd440664541ae0c4245e72cdf73607bf6aefe4572acce8aed7):
FILE-BEGIN src/components/ui/dialog-primitive.tsx
import * as React from "react";

import type * as Impl from "./dialog-impl";
import { ModalPart, ModalRoot, ModalTrigger } from "./overlay-facade";

/**
 * DEC-260 (Foundations turn 32; D234 speed S9) — THE DIALOG, ITS CODE ON DEMAND.
 * Radix's dialog parts by the same names, for ui/dialog.tsx, ui/sheet.tsx and
 * the shell's own panels; the Radix code (dialog-impl.ts) arrives with the other
 * overlay primitives (overlay-loader.ts), and the parts wait for it as
 * overlay-facade.tsx's ModalRoot says.
 */

/** Radix's part names: a name that is not one of them fails the typecheck. */
type Part = keyof typeof Impl;

function Root(props: React.ComponentProps<typeof Impl.Root>) {
  return <ModalRoot kind="dialog" {...props} />;
}

/** Always asChild: the consumer's own element is the trigger. */
function Trigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.Trigger> & { asChild: true }) {
  return <ModalTrigger kind="dialog" part={"Trigger" satisfies Part} {...props} />;
}

function Portal(props: React.ComponentProps<typeof Impl.Portal>) {
  return <ModalPart kind="dialog" part={"Portal" satisfies Part} {...props} />;
}

function Overlay(props: React.ComponentProps<typeof Impl.Overlay>) {
  return <ModalPart kind="dialog" part={"Overlay" satisfies Part} {...props} />;
}
Overlay.displayName = "DialogOverlay";

function Content(props: React.ComponentProps<typeof Impl.Content>) {
  return <ModalPart kind="dialog" part={"Content" satisfies Part} {...props} />;
}
Content.displayName = "DialogContent";

function Title(props: React.ComponentProps<typeof Impl.Title>) {
  return <ModalPart kind="dialog" part={"Title" satisfies Part} {...props} />;
}
Title.displayName = "DialogTitle";

function Description(props: React.ComponentProps<typeof Impl.Description>) {
  return <ModalPart kind="dialog" part={"Description" satisfies Part} {...props} />;
}
Description.displayName = "DialogDescription";

function Close(props: React.ComponentProps<typeof Impl.Close>) {
  return <ModalPart kind="dialog" part={"Close" satisfies Part} {...props} />;
}

export { Root, Trigger, Portal, Overlay, Content, Title, Description, Close };
FILE-END src/components/ui/dialog-primitive.tsx
B6. NEW src/components/ui/alert-dialog-primitive.tsx (sha256 1241a23de74d8eb75414cf461aea2e4943b8287dfd682c0ee66a8ad70d0efe12):
FILE-BEGIN src/components/ui/alert-dialog-primitive.tsx
import * as React from "react";

import type * as Impl from "./alert-dialog-impl";
import { ModalPart, ModalRoot, ModalTrigger } from "./overlay-facade";

/**
 * DEC-260 (Foundations turn 32; D234 speed S9) — THE ALERT DIALOG, ITS CODE ON
 * DEMAND. Radix's alert-dialog parts by the same names, for ui/alert-dialog.tsx;
 * the Radix code (alert-dialog-impl.ts) arrives with the other overlay
 * primitives (overlay-loader.ts), and the parts wait for it as
 * overlay-facade.tsx's ModalRoot says.
 */

/** Radix's part names: a name that is not one of them fails the typecheck. */
type Part = keyof typeof Impl;

function Root(props: React.ComponentProps<typeof Impl.Root>) {
  return <ModalRoot kind="alertDialog" {...props} />;
}

/** Always asChild: the consumer's own element is the trigger. */
function Trigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.Trigger> & { asChild: true }) {
  return <ModalTrigger kind="alertDialog" part={"Trigger" satisfies Part} {...props} />;
}

function Portal(props: React.ComponentProps<typeof Impl.Portal>) {
  return <ModalPart kind="alertDialog" part={"Portal" satisfies Part} {...props} />;
}

function Overlay(props: React.ComponentProps<typeof Impl.Overlay>) {
  return <ModalPart kind="alertDialog" part={"Overlay" satisfies Part} {...props} />;
}
Overlay.displayName = "AlertDialogOverlay";

function Content(props: React.ComponentProps<typeof Impl.Content>) {
  return <ModalPart kind="alertDialog" part={"Content" satisfies Part} {...props} />;
}
Content.displayName = "AlertDialogContent";

function Title(props: React.ComponentProps<typeof Impl.Title>) {
  return <ModalPart kind="alertDialog" part={"Title" satisfies Part} {...props} />;
}
Title.displayName = "AlertDialogTitle";

function Description(props: React.ComponentProps<typeof Impl.Description>) {
  return <ModalPart kind="alertDialog" part={"Description" satisfies Part} {...props} />;
}
Description.displayName = "AlertDialogDescription";

function Action(props: React.ComponentProps<typeof Impl.Action>) {
  return <ModalPart kind="alertDialog" part={"Action" satisfies Part} {...props} />;
}
Action.displayName = "AlertDialogAction";

function Cancel(props: React.ComponentProps<typeof Impl.Cancel>) {
  return <ModalPart kind="alertDialog" part={"Cancel" satisfies Part} {...props} />;
}
Cancel.displayName = "AlertDialogCancel";

export { Root, Trigger, Portal, Overlay, Content, Title, Description, Action, Cancel };
FILE-END src/components/ui/alert-dialog-primitive.tsx
B7. src/components/ui/dialog.tsx, this edit (one import line):
EDIT src/components/ui/dialog.tsx #1
OLD-BEGIN
import * as DialogPrimitive from "@radix-ui/react-dialog";
OLD-END
NEW-BEGIN
import * as DialogPrimitive from "./dialog-primitive";
NEW-END
src/components/ui/sheet.tsx, this edit:
EDIT src/components/ui/sheet.tsx #1
OLD-BEGIN
import * as SheetPrimitive from "@radix-ui/react-dialog";
OLD-END
NEW-BEGIN
import * as SheetPrimitive from "./dialog-primitive";
NEW-END
B8. src/components/ui/alert-dialog.tsx, this edit:
EDIT src/components/ui/alert-dialog.tsx #1
OLD-BEGIN
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
OLD-END
NEW-BEGIN
import * as AlertDialogPrimitive from "./alert-dialog-primitive";
NEW-END
B9. src/components/shell/app-rail.tsx, this edit (the phone rail's menu):
EDIT src/components/shell/app-rail.tsx #1
OLD-BEGIN
import * as DialogPrimitive from "@radix-ui/react-dialog";
OLD-END
NEW-BEGIN
import * as DialogPrimitive from "@/components/ui/dialog-primitive";
NEW-END
B10. src/components/shell/toolbar-panel.tsx, this edit (the toolbar panel's phone sheet):
EDIT src/components/shell/toolbar-panel.tsx #1
OLD-BEGIN
import * as DialogPrimitive from "@radix-ui/react-dialog";
OLD-END
NEW-BEGIN
import * as DialogPrimitive from "@/components/ui/dialog-primitive";
NEW-END
Now `bun run typecheck` (clean), `bun run lint` (0 errors), the whole unit suite; paste the totals. Commit: `turn 32 part B: the dialog and the alert dialog onto the overlay facades`.

PART C — THE TESTS AND THE CENSUS.
C1. NEW src/components/ui/modal-facade.test.tsx (sha256 bd66b609906c58c38a17e46a657384e2bd0e60286b68ea38c5087e7771433de3):
FILE-BEGIN src/components/ui/modal-facade.test.tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/**
 * DEC-260 (Foundations turn 32) — the modal facades (the dialog, the alert
 * dialog): a closed modal draws its trigger alone; the first opening draws the
 * real Radix root around the children, open, and Radix's own focus handling
 * takes over. The module is already here (src/test/setup.ts).
 */
function Plain() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="dialog-trigger">Share</Button>
      </DialogTrigger>
      <DialogContent data-testid="dialog">
        <DialogTitle>Share the ad</DialogTitle>
        <Button data-testid="dialog-inside">Copy link</Button>
      </DialogContent>
    </Dialog>
  );
}

describe("the modal facades (DEC-260)", () => {
  it("OVF-11 a closed dialog draws only its trigger, with the closed state's attributes, on the server and at first", () => {
    const html = renderToString(<Plain />);
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('data-state="closed"');
    expect(html).not.toContain("Share the ad");
    render(<Plain />);
    expect(screen.queryByTestId("dialog")).toBeNull();
  });

  it("OVF-12 the first click opens the dialog with the focus inside; Escape closes it and gives the focus back to the trigger", async () => {
    render(<Plain />);
    fireEvent.click(screen.getByTestId("dialog-trigger"));
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("dialog")).toContainElement(document.activeElement as HTMLElement),
    );
    const trigger = screen.getByTestId("dialog-trigger");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(screen.getByTestId("dialog"), { key: "Escape" });
    expect(screen.queryByTestId("dialog")).toBeNull();
    await waitFor(() => expect(screen.getByTestId("dialog-trigger")).toHaveFocus());
  });

  it("OVF-13 a controlled dialog: the trigger asks its owner to open it, and the owner's open draws it", () => {
    const asked: boolean[] = [];
    function Owned() {
      const [open, setOpen] = useState(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            asked.push(next);
            setOpen(next);
          }}
        >
          <DialogTrigger asChild>
            <Button data-testid="owned-trigger">Filters</Button>
          </DialogTrigger>
          <DialogContent data-testid="owned-dialog">
            <DialogTitle>Filters</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    render(<Owned />);
    fireEvent.click(screen.getByTestId("owned-trigger"));
    expect(asked).toEqual([true]);
    expect(screen.getByTestId("owned-dialog")).toBeInTheDocument();
  });

  it("OVF-14 the first click opens the alert dialog; Cancel closes it", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button data-testid="alert-trigger">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent data-testid="alert">
          <AlertDialogTitle>Delete the ad?</AlertDialogTitle>
          <AlertDialogCancel data-testid="alert-cancel">Keep it</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>,
    );
    fireEvent.click(screen.getByTestId("alert-trigger"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("alert-cancel"));
    expect(screen.queryByRole("alertdialog")).toBeNull();
    await waitFor(() => expect(screen.getByTestId("alert-trigger")).toHaveFocus());
  });

  it("OVF-15 an uncontrolled dialog's owner hears the first opening and the closing, as from Radix's", () => {
    const heard: boolean[] = [];
    render(
      <Dialog onOpenChange={(next) => heard.push(next)}>
        <DialogTrigger asChild>
          <Button data-testid="heard-trigger">Report</Button>
        </DialogTrigger>
        <DialogContent data-testid="heard-dialog">
          <DialogTitle>Report the ad</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByTestId("heard-trigger"));
    expect(screen.getByTestId("heard-dialog")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId("heard-dialog"), { key: "Escape" });
    expect(screen.queryByTestId("heard-dialog")).toBeNull();
    expect(heard).toEqual([true, false]);
  });
});
FILE-END src/components/ui/modal-facade.test.tsx
C2. src/components/ui/overlay-facade-failure.test.tsx, these edits (OVF-16: a failed download keeps the closed dialog):
EDIT src/components/ui/overlay-facade-failure.test.tsx #1
OLD-BEGIN
/**
 * DEC-259 (Foundations turn 31) — a failed download of the overlay module leaves
 * the closed trigger as it was (no half-open menu, no crash) and the next press
 * asks again. The loader is replaced here so the test decides when the module
 * arrives or fails; overlay-loader.ts's own warning is its loadOnce's.
OLD-END
NEW-BEGIN
/**
 * DEC-259 (Foundations turn 31) and DEC-260 (turn 32) — a failed download of the
 * overlay module leaves the closed trigger as it was (no half-open menu or dialog,
 * no crash) and the next press asks again. The loader is replaced here so the test decides when the module
 * arrives or fails; overlay-loader.ts's own warning is its loadOnce's.
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #2
OLD-BEGIN

const { Button } = await import("./button");
const { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } =
OLD-END
NEW-BEGIN

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

const { Button } = await import("./button");
const { Dialog, DialogContent, DialogTitle, DialogTrigger } = await import("./dialog");
const { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } =
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #3
OLD-BEGIN

describe("the overlay facades when the module fails to arrive (DEC-259)", () => {
  it("OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu", async () => {
OLD-END
NEW-BEGIN

describe("the overlay facades when the module fails to arrive (DEC-259, DEC-260)", () => {
  it("OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu", async () => {
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #4
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("OVF-16 a failed download keeps the closed dialog; the next click asks again and opens it", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button data-testid="dialog-trigger">Share</Button>
        </DialogTrigger>
        <DialogContent data-testid="dialog">
          <DialogTitle>Share the ad</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("dialog-trigger"));
    });
    expect(state.asked).toBe(1);
    expect(screen.queryByTestId("dialog")).toBeNull();
    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute("data-state", "closed");

    await act(async () => {
      fireEvent.click(screen.getByTestId("dialog-trigger"));
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute("aria-expanded", "true");
  });
});
NEW-END
C3. scripts/conformance/overlays.test.ts, these edits (the dialog and the alert dialog in the census; CF-OV-3 pins the modal facades' parts):
EDIT scripts/conformance/overlays.test.ts #1
OLD-BEGIN
/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE OVERLAY PRIMITIVES ARRIVE ON
 * DEMAND. The Radix tooltip and dropdown menu (with floating-ui and their
 * layers) are reached by value only through their impl files, the impl files
 * only through src/components/ui/overlays-impl.ts, and that module only through
 * the loader's loadOnce (src/components/ui/overlay-loader.ts). Everything else
 * uses the facades (tooltip.tsx, dropdown-menu.tsx), which draw the trigger at
 * once and the real primitive on the person's first intent. A type-only import
 * is erased by the compiler and passes.
 */
OLD-END
NEW-BEGIN
/**
 * DEC-259 (Foundations turn 31; D234 speed S8) and DEC-260 (turn 32; S9) — THE
 * OVERLAY PRIMITIVES ARRIVE ON DEMAND. The Radix tooltip, dropdown menu, dialog
 * and alert dialog (with floating-ui and their focus and scroll layers) are
 * reached by value only through their impl files, the impl files only through
 * src/components/ui/overlays-impl.ts, and that module only through the loader's
 * loadOnce (src/components/ui/overlay-loader.ts). Everything else uses the
 * facades (tooltip.tsx, dropdown-menu.tsx, dialog-primitive.tsx,
 * alert-dialog-primitive.tsx), which draw the trigger at once and the real
 * primitive on the person's first intent. A type-only import is erased by the
 * compiler and passes.
 */
NEW-END
EDIT scripts/conformance/overlays.test.ts #2
OLD-BEGIN
const WATCHED =
  /^(?:@radix-ui\/react-tooltip|@radix-ui\/react-dropdown-menu|(?:@\/components\/ui\/|\.{1,2}\/(?:[\w.-]+\/)*)(?:tooltip-impl|dropdown-menu-impl|overlays-impl))$/;

OLD-END
NEW-BEGIN
const WATCHED =
  /^(?:@radix-ui\/react-(?:tooltip|dropdown-menu|dialog|alert-dialog)|(?:@\/components\/ui\/|\.{1,2}\/(?:[\w.-]+\/)*)(?:tooltip-impl|dropdown-menu-impl|dialog-impl|alert-dialog-impl|overlays-impl))$/;

NEW-END
EDIT scripts/conformance/overlays.test.ts #3
OLD-BEGIN
  "@radix-ui/react-dropdown-menu": "src/components/ui/dropdown-menu-impl.tsx",
  "./tooltip-impl": "src/components/ui/overlays-impl.ts",
  "./dropdown-menu-impl": "src/components/ui/overlays-impl.ts",
  "./overlays-impl": "src/components/ui/overlay-loader.ts",
OLD-END
NEW-BEGIN
  "@radix-ui/react-dropdown-menu": "src/components/ui/dropdown-menu-impl.tsx",
  "@radix-ui/react-dialog": "src/components/ui/dialog-impl.ts",
  "@radix-ui/react-alert-dialog": "src/components/ui/alert-dialog-impl.ts",
  "./tooltip-impl": "src/components/ui/overlays-impl.ts",
  "./dropdown-menu-impl": "src/components/ui/overlays-impl.ts",
  "./dialog-impl": "src/components/ui/overlays-impl.ts",
  "./alert-dialog-impl": "src/components/ui/overlays-impl.ts",
  "./overlays-impl": "src/components/ui/overlay-loader.ts",
NEW-END
EDIT scripts/conformance/overlays.test.ts #4
OLD-BEGIN
  it(
    "CF-OV-1 only the impl files reach Radix's tooltip and menu, only overlays-impl reaches the impl files, only the loader reaches overlays-impl",
    () => {
OLD-END
NEW-BEGIN
  it(
    "CF-OV-1 only the impl files reach Radix's tooltip, menu, dialog and alert dialog, only overlays-impl reaches the impl files, only the loader reaches overlays-impl",
    () => {
NEW-END
EDIT scripts/conformance/overlays.test.ts #5
OLD-BEGIN

  it("CF-OV-3 each facade exports exactly the names its impl file exports", () => {
    expect(exportedNames("src/components/ui/tooltip.tsx")).toEqual(
OLD-END
NEW-BEGIN

  it("CF-OV-3 each facade exports exactly the names its impl file exports, the modal facades Radix's parts", () => {
    expect(exportedNames("src/components/ui/tooltip.tsx")).toEqual(
NEW-END
EDIT scripts/conformance/overlays.test.ts #6
OLD-BEGIN
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toHaveLength(15);
  });
OLD-END
NEW-BEGIN
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toHaveLength(15);
    expect(exportedNames("src/components/ui/dialog-primitive.tsx")).toEqual([
      "Close",
      "Content",
      "Description",
      "Overlay",
      "Portal",
      "Root",
      "Title",
      "Trigger",
    ]);
    expect(exportedNames("src/components/ui/alert-dialog-primitive.tsx")).toEqual([
      "Action",
      "Cancel",
      "Content",
      "Description",
      "Overlay",
      "Portal",
      "Root",
      "Title",
      "Trigger",
    ]);
  });
NEW-END
C4. The planted proof (never committed): add the line `import * as PlantedDialog from "@radix-ui/react-dialog";` as the first line of src/components/shell/app-rail.tsx; run `bunx vitest run scripts/conformance/overlays.test.ts -t "CF-OV-1"` — it must fail naming exactly `src/components/shell/app-rail.tsx:1 reaches @radix-ui/react-dialog by value; only src/components/ui/dialog-impl.ts may (DEC-259)`; paste that line; put the file back and check its sha256 against B9's result (fc93f855903a8dfa2a78313d4d1f0b3fbc102fe1bce4518e69a0cd2883f4d3d6). Then `bunx vitest run src/components/ui/modal-facade.test.tsx src/components/ui/overlay-facade-failure.test.tsx src/components/ui/overlay-facade.test.tsx scripts/conformance/overlays.test.ts --reporter=verbose` (paste the OVF- and CF-OV- lines: OVF-1…16 and CF-OV-1…3, every one passed). Commit: `turn 32 part C: the modal facades' tests and census`.

PART D — THE FIRST-PAINT GUARDS.
D1. scripts/check-marketplace-imports.mjs, this edit (the two Radix packages never reach the first paint):
EDIT scripts/check-marketplace-imports.mjs #1
OLD-BEGIN
  "@radix-ui/react-dropdown-menu",
];
OLD-END
NEW-BEGIN
  "@radix-ui/react-dropdown-menu",
  // Foundations turn 32 (DEC-260) — the dialog and the alert dialog too.
  "@radix-ui/react-dialog",
  "@radix-ui/react-alert-dialog",
];
NEW-END
Proof (never committed): add the line `import * as PlantedDialog from "@radix-ui/react-dialog";` as the first line of src/components/shell/app-rail.tsx and run `node scripts/check-marketplace-imports.mjs` — it must print `findings: 1` and `  src/components/shell/app-rail.tsx imports @radix-ui/react-dialog`; paste both; put the file back and check its sha256 (fc93f855903a8dfa2a78313d4d1f0b3fbc102fe1bce4518e69a0cd2883f4d3d6); the guard then prints `findings: 0`.
D2. scripts/check-bundle-size.mjs, this edit (the entry's ceiling 263 → 257):
EDIT scripts/check-bundle-size.mjs #1
OLD-BEGIN
  js: 263,
OLD-END
NEW-BEGIN
  // DEC-260 (Foundations turn 32, 2026-10-26): the dialog's and the alert dialog's code left it (260.0 → 254.1 measured); the ceiling follows to 257.
  js: 257,
NEW-END
D3. scripts/route-budgets.mjs, replaced whole by this text (every page's line re-measured; no ceiling rises) (sha256 4b574ee8888557842adaeaaab778a2473832f33a6377ad56be202e256c45023e):
FILE-BEGIN scripts/route-budgets.mjs
/**
 * D234 speed turn S1 — THE PER-PAGE FIRST-DOWNLOAD CEILINGS (KiB, gzip level 6),
 * read by scripts/check-bundle-size.mjs. Every page route the build's route
 * manifest names has one line here (server routes under /api/ have no page and
 * are left out by rule); a page with no line fails the guard, and so does a line
 * whose page is gone. `public` marks a page a visitor opens signed out: its
 * first download must also hold none of PUBLIC_MUST_STAY_LAZY
 * (scripts/bundle-closure.mjs).
 *
 * A RATCHET: each ceiling is the page's measured download plus 3 KiB of
 * build-to-build room, rounded up. A page that grows past its ceiling fails; a page that
 * shrinks 8 KiB or more below it fails too, until its ceiling is lowered in the
 * same commit — so every saving is kept. Raising a ceiling is a commit that says
 * why. Measured 2026-10-26 on the Foundations turn 32 build (DEC-260: the dialog's and the alert
 * dialog's code left every page's first download; the comment after each line; no ceiling rises:
 * the twelve staff and dev pages that draw another Radix overlay (a popover, a select) now carry the
 * focus, dismiss and positioning layers it shares with the dialog in a chunk of their own, 0.3–0.4 KiB
 * more, and keep their ceilings). The three
 * admin pages that import the whole catalogue (/admin/listings_/$listingId, /admin/roles_/$roleId,
 * /admin/translations) carry its member part as a chunk of their own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 271, public: true }, // 267.5
  "/$name": { ceiling: 270, public: true }, // 266.2
  "/account": { ceiling: 262, public: false }, // 259.0
  "/account_/legal": { ceiling: 259, public: false }, // 255.8
  "/account_/legal_/$versionId": { ceiling: 261, public: false }, // 257.3
  "/account_/saved": { ceiling: 270, public: false }, // 266.3
  "/admin": { ceiling: 258, public: false }, // 255.0
  "/admin/": { ceiling: 259, public: false }, // 255.8
  "/admin/ai": { ceiling: 327, public: false }, // 323.8
  "/admin/attributes": { ceiling: 343, public: false }, // 340.0
  "/admin/audit": { ceiling: 303, public: false }, // 300.2
  "/admin/categories": { ceiling: 351, public: false }, // 348.2
  "/admin/countries": { ceiling: 333, public: false }, // 329.8
  "/admin/coverage": { ceiling: 325, public: false }, // 322.4
  "/admin/images": { ceiling: 259, public: false }, // 255.7
  "/admin/impersonation_/$sessionId": { ceiling: 304, public: false }, // 300.7
  "/admin/legal": { ceiling: 273, public: false }, // 270.0
  "/admin/legal_/$versionId": { ceiling: 273, public: false }, // 269.3
  "/admin/legal_/edit": { ceiling: 279, public: false }, // 275.4
  "/admin/listings": { ceiling: 349, public: false }, // 345.5
  "/admin/listings_/$listingId": { ceiling: 371, public: false }, // 367.8
  "/admin/listings_/$listingId_/edit": { ceiling: 395, public: false }, // 391.2
  "/admin/locations": { ceiling: 266, public: false }, // 262.2
  "/admin/places": { ceiling: 334, public: false }, // 331.1
  "/admin/roles": { ceiling: 301, public: false }, // 298.3
  "/admin/roles_/$roleId": { ceiling: 302, public: false }, // 298.8
  "/admin/screening": { ceiling: 369, public: false }, // 365.6
  "/admin/translations": { ceiling: 404, public: false }, // 400.6
  "/admin/translations_/$lang": { ceiling: 316, public: false }, // 312.8
  "/admin/users": { ceiling: 300, public: false }, // 296.7
  "/admin/users_/$userId": { ceiling: 281, public: false }, // 277.2
  "/auth": { ceiling: 270, public: true }, // 266.4
  "/auth_/callback": { ceiling: 258, public: true }, // 255.0
  "/auth_/reset": { ceiling: 260, public: true }, // 257.0
  "/c/$slug": { ceiling: 271, public: true }, // 267.5
  "/dev/primitives": { ceiling: 273, public: false }, // 269.7
  "/dev/style": { ceiling: 291, public: false }, // 288.0
  "/dev/tall": { ceiling: 258, public: false }, // 254.4
  "/l/$slug": { ceiling: 297, public: true }, // 293.9
  "/legal/$kind": { ceiling: 261, public: true }, // 258.0
  "/legal/accept": { ceiling: 269, public: false }, // 265.4
  "/legal/publishing": { ceiling: 262, public: true }, // 258.6
  "/my-listings": { ceiling: 323, public: false }, // 319.5
  "/my-listings_/$listingId": { ceiling: 311, public: false }, // 307.2
  "/my-listings_/$listingId_/edit": { ceiling: 389, public: false }, // 385.9
  "/post": { ceiling: 389, public: false }, // 385.9
  "/post_/$listingId": { ceiling: 389, public: false }, // 385.8
  "/privacy": { ceiling: 261, public: true }, // 258.0
  "/settings": { ceiling: 267, public: false }, // 263.4
  "/terms": { ceiling: 261, public: true }, // 257.9
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
FILE-END scripts/route-budgets.mjs
Then `bun run build` and `node scripts/check-bundle-size.mjs`: it must pass, the entry and every page (the supervisor's build printed `JS: 254.1 KiB / 257 KiB — ok`; paste your line). When it fails, paste its whole output and STOP — never move a ceiling yourself. Commit: `turn 32 part D: the first-paint guards`.

PART E — THE BROWSER.
E1. e2e/overlays.spec.ts, these edits (OVE-3: the phone menu, a dialog, opens on its first tap; Escape gives the focus back to ☰):
EDIT e2e/overlays.spec.ts #1
OLD-BEGIN
/**
 * DEC-259 (Foundations turn 31) — THE OVERLAY PRIMITIVES IN THE BROWSER. The
 * tooltip's and the dropdown menu's code (Radix, floating-ui and their layers)
 * is not on any page's first download: the browser asks for it once the page
 * has loaded and is idle, or on a trigger's first intent, and the trigger the
 * person already sees answers that intent itself. Read-only: no rows are written.
 */
OLD-END
NEW-BEGIN
/**
 * DEC-259 (Foundations turn 31) and DEC-260 (turn 32) — THE OVERLAY PRIMITIVES
 * IN THE BROWSER. The tooltip's, the dropdown menu's and the dialogs' code (Radix,
 * floating-ui and their layers) is not on any page's first download: the browser
 * asks for it once the page has loaded and is idle, or on a trigger's first
 * intent, and the trigger the person already sees answers that intent itself.
 * Read-only: no rows are written.
 */
NEW-END
EDIT e2e/overlays.spec.ts #2
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  test("OVE-3 the phone menu (a dialog) opens on its first tap and Escape gives the focus back to ☰", async ({
    page,
  }, testInfo) => {
    // The phone menu exists below 768 px only.
    test.skip(testInfo.project.name !== "mobile-360");
    await gotoReady(page, "/");
    const toggle = page.locator('[aria-controls="rail-menu"]');
    await toggle.click();
    await expect(page.getByTestId("rail-menu")).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("rail-menu")).toHaveCount(0);
    await expect(toggle).toBeFocused();
    await toggle.click();
    await expect(page.getByTestId("rail-menu")).toBeVisible();
  });
});
NEW-END
Commit: `turn 32 part E: OVE-3`.

PART F — DOCS.
F1. docs/features/performance-strategy.md, at its end:
APPEND-BEGIN docs/features/performance-strategy.md
## 15. The dialogs' code waits for the person (D234, Foundations turn 32)

DEC-260: the dialog and the alert dialog (Radix's dialog with its focus trap, scroll lock and hide-the-rest layers) rode every page's first download, because the phone rail's menu (app-rail.tsx) and the toolbar panel (toolbar-panel.tsx) imported it directly — about 6 KiB, for windows nobody has opened yet. Their facades (`src/components/ui/dialog-primitive.tsx`, under `dialog.tsx` and `sheet.tsx`; `alert-dialog-primitive.tsx`, under `alert-dialog.tsx`) keep Radix's part names; the Radix code (`dialog-impl.ts`, `alert-dialog-impl.ts`, re-exported by `overlays-impl.ts`) arrives through the same loader as the tooltip's and the menu's.

- A closed modal draws only its trigger, with the closed state's attributes (`type="button"`, `aria-haspopup="dialog"`, `aria-expanded="false"`, `data-state="closed"`), on the server and at first.
- The first opening — the trigger's click, or the owner's `open` — asks for the module (most of the time it is already there: it is asked for once the page has loaded and is idle) and draws the real Radix root around the children, open. The owner hears `onOpenChange(true)` from the trigger as from Radix's; an uncontrolled modal opens itself. The children are drawn afresh at that moment — the focus moves into the modal anyway — and afterwards everything is Radix's: the focus trap, Escape, the focus back to the trigger.
- A failed download leaves the closed modal and logs the loader's warning; the next opening asks again.
- The supervisor's build: the entry 260.0 → 254.1 KiB; every public page 5.9–6.0 KiB lighter (the home page 273.4 → 267.5); the posting and editing pages 6.7–6.8 KiB lighter. Twelve staff and dev pages that draw another Radix overlay (a popover, a select) now carry the focus, dismiss and positioning layers it shares with the dialog in a chunk of their own: 0.3–0.4 KiB more, under their ceilings. The overlay module is 10.9 KiB gzip, asked for after the load event. The lab (360 wide, touch): the phone menu opens on the first tap; tapped after the idle download it opens in 127 ms, and tapped at DOMContentLoaded, before the module has arrived, in 306 ms (250 ms on the turn-31 build).

Next: the popover and the select — and the hover card, the context menu, the menubar and the navigation menu that turn 31's K2 list names — still import Radix directly; the same parts take them.
APPEND-END docs/features/performance-strategy.md
F2. docs/governance/mechanisms.md: the line that begins "| 48 |" is replaced by this line:
| 48 | An overlay primitive's code (the tooltip, the dropdown menu, the dialog, the alert dialog: Radix, floating-ui and their focus, scroll and dismiss layers) waits for the person's intent and never rides a page's first download (D234, DEC-259, DEC-260) | the facades `src/components/ui/tooltip.tsx` and `dropdown-menu.tsx` (the impls' exports) on `OverlayRoot` / `OverlayTrigger` / `OverlayContent`, and `dialog-primitive.tsx` (under `dialog.tsx`, `sheet.tsx`) and `alert-dialog-primitive.tsx` (under `alert-dialog.tsx`) on `ModalRoot` / `ModalTrigger` / `ModalPart` (`src/components/ui/overlay-facade.tsx`); the module `overlays-impl.ts` (re-exports the four impl files) behind `loadOverlays` / `useOverlays` / `warmOverlaysWhenIdle` (`src/components/ui/overlay-loader.ts`, loadOnce) — a tooltip's or a menu's trigger is the consumer's own element from the first render and the real root draws beside it on the first hover or keyboard focus (a tooltip) or press or opening key (a menu), the intent replayed on the same element; a closed modal draws its trigger alone and the real root draws around its children at the first opening (the trigger's click or the owner's `open`); the module is asked for anyway once the page is idle | `scripts/conformance/overlays.test.ts` (CF-OV-1…3: only the impl files reach the four Radix packages, only overlays-impl the impl files, only the loader overlays-impl; each facade exports its impl's names, the modal facades Radix's parts); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY (`overlays-impl`); the weight guard's FORBIDDEN; OVF-1…16; `e2e/overlays.spec.ts` (OVE-1…3) | none | a new overlay primitive is one impl file re-exported by overlays-impl and one facade over the same parts (the popover and the select next — K2); an owner-opened root (`open`, `defaultOpen`) is asked for at once | triggers are asChild only (the types say so); a modal's children are drawn afresh at its first opening; Foundations turns 31 and 32 |
F3. docs/features/ci-guards.md, at its end:
APPEND-BEGIN docs/features/ci-guards.md
## DEC-260 — the modal facades in the overlay census; the first-paint ceiling at 257 KiB

`scripts/conformance/overlays.test.ts` now watches the dialog and the alert dialog too: CF-OV-1 lets only `src/components/ui/dialog-impl.ts` reach `@radix-ui/react-dialog` and only `alert-dialog-impl.ts` reach `@radix-ui/react-alert-dialog` by value (a type-only import passes — `command.tsx`'s `DialogProps`), and only `overlays-impl.ts` reach the two impl files; CF-OV-3 pins the modal facades' exports to Radix's part names (`dialog-primitive.tsx`: Close, Content, Description, Overlay, Portal, Root, Title, Trigger; `alert-dialog-primitive.tsx`: Action, Cancel, Content, Description, Overlay, Portal, Root, Title, Trigger), and each part name in those files `satisfies` the impl's keys, so a misspelt part fails the typecheck.

The weight guard's FORBIDDEN gains `@radix-ui/react-dialog` and `@radix-ui/react-alert-dialog` (proven on a planted import in the phone rail). The entry's ceiling falls 263 → 257 KiB (254.1 measured); every page's line is re-measured and none rises — the twelve staff and dev pages 0.3–0.4 KiB heavier keep their ceilings.
APPEND-END docs/features/ci-guards.md
F4. docs/features/display-primitives.md, this edit (the modal rule beside the on-demand rule):
EDIT docs/features/display-primitives.md #1
OLD-BEGIN
  `*-impl` files but the overlay files themselves (CF-OV-1).

OLD-END
NEW-BEGIN
  `*-impl` files but the overlay files themselves (CF-OV-1).
- THE MODAL RULE (DEC-260, the same file): Dialog, Sheet and AlertDialog sit on
  facades too (`dialog-primitive.tsx`, `alert-dialog-primitive.tsx`). Their
  triggers are always `asChild`; a closed modal draws its trigger alone; the
  first opening (the trigger's click or the owner's `open`) draws the real root
  around the children, which are drawn afresh then — so keep state that must
  survive the first opening outside the modal's root. Nothing imports
  `@radix-ui/react-dialog` or `@radix-ui/react-alert-dialog` by value but the
  two impl files (CF-OV-1).

NEW-END
F5. docs/_changelog.md, at its end:
APPEND-BEGIN docs/_changelog.md
- Foundations turn 32 (2026-10-26) — speed S9 (D234), DEC-260: the dialogs' code on demand — Dialog, Sheet and AlertDialog sit on facades (src/components/ui/dialog-primitive.tsx, alert-dialog-primitive.tsx; Radix's part names) over ModalRoot / ModalTrigger / ModalPart (overlay-facade.tsx); the Radix code (dialog-impl.ts, alert-dialog-impl.ts) joins overlays-impl.ts behind the same loader; a closed modal draws its trigger alone and the first opening draws the real root around its children; the phone rail and the toolbar panel use the facade; the entry 260.0 → 254.1 KiB, every public page 5.9–6.0 KiB lighter; CF-OV extended, OVF-11…16, OVE-3; the weight guard forbids the two Radix packages on the first paint. No migration, new string or package change.
APPEND-END docs/_changelog.md
F6. AGENTS.md: the line that begins "- Overlays (DEC-259):" is replaced by exactly this line (AGENTS.md then counts 7714 bytes by `wc -c AGENTS.md`):
- Overlays (DEC-259, DEC-260): Tooltip, DropdownMenu, Dialog and AlertDialog are facades over overlay-facade.tsx (src/components/ui/tooltip.tsx, dropdown-menu.tsx, dialog-primitive.tsx — under dialog.tsx and sheet.tsx — and alert-dialog-primitive.tsx — under alert-dialog.tsx); their Radix code (the four impl files, re-exported by overlays-impl.ts) arrives on demand through overlay-loader.ts; their triggers are always asChild; nothing else imports @radix-ui/react-tooltip, @radix-ui/react-dropdown-menu, @radix-ui/react-dialog, @radix-ui/react-alert-dialog or the impl files by value; scripts/conformance/overlays.test.ts judges.

F7. `bun run i18n:usage` (expected: 1736 keys across 586 files (395 dynamic call sites)) and `bun run i18n:map-guard` ("usage maps match the tree"); commit both maps with this part when they move.
At the end, roadmap.md's turn-32 line `[x]` with the last code commit and the unit totals appended. Commit: `turn 32 part F: docs, register, changelog, AGENTS.md`.

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-32.md | sha256sum -c` — every line prints OK (the list below; a FAILED line is fixed by copying its block again from the saved brief, never by editing an expectation); `git diff <START> --stat -- src/features src/routes src/components/ui/sidebar.tsx` (empty: no consumer outside SCOPE changes); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals — the supervisor's run: 304 files, 1894 tests, every one passed); `bun run i18n:usage` and `bun run i18n:map-guard`; `bun run build`; `node scripts/check-bundle-size.mjs` (D3's line and every page within its ceiling); `node scripts/check-marketplace-imports.mjs` (findings: 0); `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
1f558e3bb3f6dd5544a242555f3ea04e06e3335d2f8cd28877dc92a3686bc145  src/components/ui/overlay-facade.tsx
0a6df345860eb0bb18c772d51a6e4d0e595431ca33aaf584f3b54e652ace31e8  src/components/ui/dialog.tsx
ca3c54a4f363f0061f68a3e980322f4fdd4d9eae76427dca125d86aed952aa5b  src/components/ui/sheet.tsx
e17399be3a7cae7a439f1c3d59d7dae9bb7ed71bd91fdf809dbc59a60fd52c69  src/components/ui/alert-dialog.tsx
fc93f855903a8dfa2a78313d4d1f0b3fbc102fe1bce4518e69a0cd2883f4d3d6  src/components/shell/app-rail.tsx
7297b8e58a388f79f264059b380ff9351a395bf4afacb92cb6132c59d1211799  src/components/shell/toolbar-panel.tsx
15211ecc32ed98e53e5e6f8b1d090502322f9b80a3a63252eacb8859795f70b0  src/components/ui/overlay-facade-failure.test.tsx
f5dbd89dc3233bcb7579892360e4264df194a9611578c48141668bc53fc041ac  scripts/conformance/overlays.test.ts
e73cb4b6fce9638669d5c40a790ca7f24535f0aa3412feee84db695e5173340e  scripts/check-marketplace-imports.mjs
f59c5031296f3b61e89479a435e3ba2cbf9695e4cd6f247d84d0ccdbf9082acd  scripts/check-bundle-size.mjs
bce0f218a8c78f7c450f4f6d2da1dc858631846796f9b15c3918c7029f835f02  e2e/overlays.spec.ts
4cc6bbbcd2516eaa219f32eeccc1682b2f516c060be9bb482bd5c50e15a1fca3  docs/features/performance-strategy.md
409fb6da1e524311e63ec37fdec1c63a804eee412216ca962e9ba3da89d67dde  docs/features/ci-guards.md
53d99f71615c5ceb47e595665bcf49e884e62920900a33e1ec420ea99cbac9ce  docs/features/display-primitives.md
a4c1255d65b526cd003ed79e186cee8cd932e814c65628da7094de549ce256f7  docs/_changelog.md
b67b97dc64196890d481e89763e0f4bd5b201a0668f2fac26364c0688772d2d9  AGENTS.md
21746f8c15d5f9e88fad2b5f02cec4d590474ed84bae4a0c93fe105923beee44  docs/governance/mechanisms.md
49e319c79f99d5d0c5c9d2021c0bfd5a73ab12e0b4d28b376589255e31f9a71f  src/components/ui/overlays-impl.ts
e8fb5c33feef0af87b86a3d2d7494d760344136cc210349d7b3c59e9376a7cc0  src/components/ui/dialog-impl.ts
1e670cd282ad9c5f06516e254607ef87f5f8d3ca4e95216a7618f20002e36f1a  src/components/ui/alert-dialog-impl.ts
2e61dfe9705a63cd440664541ae0c4245e72cdf73607bf6aefe4572acce8aed7  src/components/ui/dialog-primitive.tsx
1241a23de74d8eb75414cf461aea2e4943b8287dfd682c0ee66a8ad70d0efe12  src/components/ui/alert-dialog-primitive.tsx
bd66b609906c58c38a17e46a657384e2bd0e60286b68ea38c5087e7771433de3  src/components/ui/modal-facade.test.tsx
4b574ee8888557842adaeaaab778a2473832f33a6377ad56be202e256c45023e  scripts/route-budgets.mjs

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/overlays.spec.ts whole (OVE-3 runs in mobile-360 only); e2e/shell.spec.ts `--grep "RM-1 |the menu opens in place|the menu follows the active panel"` (the phone rail's menu); e2e/ad-page.spec.ts `--grep "AP-29 |AP-30 "` (the report and share dialogs); e2e/my-listings-ad.spec.ts `--grep "MLA-5 "` (an alert dialog's confirm); e2e/admin-audit.spec.ts `--grep "AS-3 "` (the toolbar panel: a sheet on a phone, a popover on a desktop); paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-32.report.md, with the twelve headings of .claude/rules/60-report.md, carrying: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract — for the dialog, the sheet, the alert dialog and the phone menu: closed, first opening, Escape, the focus back, the owner's onOpenChange, before → after (3); the consumer census with file:line, re-located at <START> (4); the tests added and changed, C4's and D1's red lines, the unit totals, the E2E count lines (5); the K2 lists, file:line (6); the guards' counts and self-tests (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12). Its "Final commit" is your last code commit. Commit it on its own (`turn 32: report`), run bun .claude/hooks/land.ts with a Bash timeout of 1800000 ms, and END THE TURN when it prints LANDED or HELD; the supervisor reads the run.
```

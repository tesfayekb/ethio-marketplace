# Foundations — turn 34c-3: the overlay facades tell no stale failure, the strings layers' retry is retired, and the E2E colour reader reads rgb()'s alpha (the guard debt of turn 32b's reviewer; INC-918): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34c-3 (2026-10-26; turn 34c's line, its third part; register row 52; anchors located at 9eeb83cc0bb8ea2e7c8316e94c9a3401165601d5). Turn 32b's reviewer left three items for a later turn, and turn 34b-3 left one: (1) a late failure of a modal's download could tell its owner a stale closing — the owner had closed it, or asked again, meanwhile (src/components/ui/overlay-facade.tsx, ModalRoot's `want`); the menus' `activate` had the same shape; (2) the uncontrolled dialog's tell (`byTrigger ||`) had no test, and OVF-17/18 never read the trigger's closed state or the owner's last word; (3) the E2E colour reader ignored rgb()'s alpha (e2e/helpers/colors.ts), so `rgba(180, 35, 24, 0.1)` read as red while the oklab() 10% wash did not; (4) the strings layers' hook still offered `retry` — no product caller since turn 34b-3, and a failed download cannot be fetched again in the page (INC-918). Tier B (a UI primitive's failure path; a hook's answer; a test helper). No migration. No string. No package change. No AGENTS.md change. No file deleted. Base: dev 9eeb83cc0bb8ea2e7c8316e94c9a3401165601d5 (turn 34c-2's landing). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the facades, the hook and the reader; D — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 9eeb83cc0bb8ea2e7c8316e94c9a3401165601d5
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
e2e/helpers/colors.ts
src/components/shell/strings-layer-gate.test.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/ui/overlay-facade.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.tsx
src/test/e2e-colors.test.ts
SCOPE-END

THE SYSTEM (G0) — one concern, row 52 continued.
CONCERN: a piece fetched on demand whose download fails tells the person once and offers the one cure, a refresh — and a failure says nothing it does not know: an ask superseded by a newer one is not reported, and an owner that has closed a modal is not told it closed.
MECHANISM: the overlay facades (src/components/ui/overlay-facade.tsx): each ask is numbered (`asks`, a ref) in ModalRoot's `want` and in OverlayRoot's `activate`; a failure acts only for the newest ask; ModalRoot's owner ref carries `open`, and a controlled owner whose `open` is no longer true hears no closing. The strings layers' hook (src/i18n/provider.tsx `useStringsLayers`) answers `{ state }` only; the shell's gate (StringsLayerGate) already draws LoadFailedHere (Refresh) for "failed". The E2E colour reader (e2e/helpers/colors.ts): one `rgbOf` reads rgb()/rgba() with its alpha, comma or space form; `isGoldFill` and `isRedFill` judge it at the same SEEN_ALPHA as oklch()/oklab().
CONSUMERS (grep of `loadOverlays().catch(`, `useStringsLayers(`, `rgba?\(` at BASE, every one):
- overlay-facade.tsx :128 OverlayRoot `activate` (menus, tooltips, popovers) — an older activation's late failure reset `wanted` and reported → only the newest — OVF-22;
- overlay-facade.tsx :137 `warm` — a warm-up, its failure answered by the call that asks (ODC-1's warm-up rule; unchanged);
- overlay-facade.tsx :443 ModalRoot `want` (dialogs, alert dialogs; the step-up gate, app-rail's menu dialog) — the stale closing and the stale report → newest ask only, no closing for an owner that closed — OVF-21; its `byTrigger` tell — OVF-19;
- src/components/shell/strings-layer-gate.tsx :28 — reads `state` only (unchanged); src/components/shell/strings-layer-gate.test.tsx :14/:28/:46 — its mock's `retry` goes; src/i18n/provider-layers.test.tsx :75 — PSL-3's retry button goes (PSL-3 reads the hook's answer);
- e2e/helpers/colors.ts :57 `isGoldFill`, :68 `isRedFill` — their own rgb() patterns, alpha unread → `rgbOf` — EC-6; their callers (e2e/admin-screening.spec.ts, admin-attributes-library.spec.ts, admin-translations-governance.spec.ts, admin-categories-home.spec.ts, admin-categories-lifecycle.spec.ts, admin-locations.spec.ts, photo-pipeline.spec.ts) read solid fills and are unchanged.
COVERED HERE: every consumer above. LEFT: turn 34c-4 (its roadmap line, Part D) — the E2E side of the session's storage name and the client hand-off; INC-930 (a choice for Tesfaye).
CONFORMANCE GUARD: ODC-1 (scripts/conformance/on-demand-failure.test.ts) still judges every call; OVF-19/21/22 and the OVF-17/18 additions (src/components/ui/overlay-facade-failure.test.tsx, whose loader mock gains a held download); PSL-3; EC-6.
EXCEPTIONS: none.
FIVE LENSES — security: none · performance: none (a counter per facade) · failure modes: the subject — a failure is told once, by the ask it belongs to; no notice for a download that arrived for a newer ask · consistency: menus and modals number their asks alike; rgb() and oklab() fills judged alike · future growth: a new facade copies the numbered ask (ODC-1 judges its call).
FORWARD-SCAN: turns 35–37 add no facade. REGISTER: row 52's guard and its last cell (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34c-3.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. e2e/helpers/colors.ts is the one e2e/ file that changes.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34c-3.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34c-3.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34c-3.report.md (your completion report). `bun run i18n:usage` changes nothing (no key moves; checked). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows OVF-21, OVF-22, PSL-3 and EC-6 failing on BASE's code before Part C's edits. OVF-19 and the OVF-17/18 additions pass on BASE (they guard behaviour BASE has; OVF-19 fails when `byTrigger ||` is taken out — show it once by hand, then restore, and paste the line).
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox, and EXH-21 once failed under the full run's load and passed alone (INC-890; turn 34c-2's report); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407). Before a run, nothing of a previous run may still hold port 4173 — stop it first.
- Behaviour contract: a dialog or menu whose download fails once, with no newer ask, behaves as today (the closed trigger, one notice, the owner told). Changed: an older ask's late failure, once a newer ask is pending or has opened the piece, says nothing and closes nothing; a controlled dialog's owner that closed it before its code failed hears no closing (the notice still shows once); `useStringsLayers()` answers `{ state }`; the E2E colour reader judges an rgb() fill under half opacity as no fill. Nothing else changes.
- Knowledge K: K1 the mechanisms above; K2 the report lists (file:line) every other place, in scope or not, where an asynchronous failure acts on a newer request's state (a stale answer applied: a fetch, a lazy import, a timer), and every other place a hook or component still offers a retry for a failed download; K3 the tests land with the fix; K4–K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; OVF-19, OVF-21, OVF-22 and EC-6 are new; OVF-17 gains the trigger's closed state, OVF-18 the owner's last word; PSL-3 reads the hook's answer instead of pressing its retry; the gate test's mock answers `{ state }`; the facade test's loader mock gains a held download; every other test unchanged.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: run 40397087967 on BASE (turn 34c-2's landing) — running when this brief was sent; green, or still running; a red there is read and named). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The tests:
EDIT src/components/ui/overlay-facade-failure.test.tsx #1
OLD-BEGIN
  listeners: new Set<() => void>(),
  next: [] as Array<"fail" | "arrive">,
  asked: 0,
OLD-END
NEW-BEGIN
  listeners: new Set<() => void>(),
  next: [] as Array<"fail" | "arrive" | "hold">,
  /** Turn 34c-3 — a held download fails when the test says so. */
  held: [] as Array<(error: Error) => void>,
  asked: 0,
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #2
OLD-BEGIN
      if (outcome === "fail") return Promise.reject(new Error("offline"));
      state.impl = real;
OLD-END
NEW-BEGIN
      if (outcome === "fail") return Promise.reject(new Error("offline"));
      if (outcome === "hold")
        return new Promise<never>((_, reject) => {
          state.held.push(reject);
        });
      state.impl = real;
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #3
OLD-BEGIN
    expect(screen.queryByTestId("owned-dialog")).toBeNull();

OLD-END
NEW-BEGIN
    expect(screen.queryByTestId("owned-dialog")).toBeNull();
    // Turn 34c-3 (turn 32b's reviewer) — the trigger says closed again.
    expect(screen.getByTestId("owned-trigger")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("owned-trigger")).toHaveAttribute("data-state", "closed");

NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #4
OLD-BEGIN
    expect(screen.getByTestId("opened-dialog")).toBeInTheDocument();
  });
OLD-END
NEW-BEGIN
    expect(screen.getByTestId("opened-dialog")).toBeInTheDocument();
    // Turn 34c-3 — the owner's own reopening tells it nothing more.
    expect(heard).toEqual([false]);
  });

  it("OVF-19 an uncontrolled dialog's listener hears the trigger's opening and its failure, then the opening that works (turn 32b's reviewer)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    const heard: boolean[] = [];
    render(
      <Dialog onOpenChange={(next) => heard.push(next)}>
        <DialogTrigger asChild>
          <Button data-testid="listened-trigger">Share</Button>
        </DialogTrigger>
        <DialogContent data-testid="listened-dialog">
          <DialogTitle>Share the ad</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("listened-trigger"));
    });
    expect(heard).toEqual([true, false]);
    expect(screen.queryByTestId("listened-dialog")).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByTestId("listened-trigger"));
    });
    expect(state.asked).toBe(2);
    expect(heard).toEqual([true, false, true]);
    expect(screen.getByTestId("listened-dialog")).toBeInTheDocument();
  });

  it("OVF-21 a late failure tells no stale closing: an owner that closed meanwhile hears nothing, and an older ask's failure says nothing once a newer one opened it (turn 32b's reviewer)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["hold"];
    state.held = [];
    state.asked = 0;
    const heard: boolean[] = [];
    let close: () => void = () => undefined;
    function Owned() {
      const [open, setOpen] = useState(false);
      close = () => setOpen(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            heard.push(next);
            setOpen(next);
          }}
        >
          <DialogTrigger asChild>
            <Button data-testid="late-trigger">Report</Button>
          </DialogTrigger>
          <DialogContent data-testid="late-dialog">
            <DialogTitle>Report the ad</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    render(<Owned />);
    await act(async () => {
      fireEvent.click(screen.getByTestId("late-trigger"));
    });
    expect(heard).toEqual([true]);
    await act(async () => {
      close();
    });
    await act(async () => {
      state.held.shift()?.(new Error("offline"));
    });
    expect(heard).toEqual([true]);
    expect(reported).toEqual(["a dialog's code"]);

    // An older ask still pending when a newer one opens the dialog: its failure says nothing.
    reported.length = 0;
    state.next = ["hold", "arrive"];
    await act(async () => {
      fireEvent.click(screen.getByTestId("late-trigger"));
    });
    await act(async () => {
      close();
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("late-trigger"));
    });
    expect(screen.getByTestId("late-dialog")).toBeInTheDocument();
    await act(async () => {
      state.held.shift()?.(new Error("offline"));
    });
    expect(screen.getByTestId("late-dialog")).toBeInTheDocument();
    expect(heard).toEqual([true, true, true]);
    expect(reported).toEqual([]);
  });

  it("OVF-22 a menu's older press that fails late says nothing once a newer press opened it (turn 34c-3)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["hold", "arrive"];
    state.held = [];
    state.asked = 0;
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-testid="late-menu-trigger">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="late-menu">
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const trigger = screen.getByTestId("late-menu-trigger");
    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("late-menu")).toBeInTheDocument();
    await act(async () => {
      state.held.shift()?.(new Error("offline"));
    });
    expect(screen.getByTestId("late-menu")).toBeInTheDocument();
    expect(reported).toEqual([]);
  });
NEW-END
EDIT src/i18n/provider-layers.test.tsx #1
OLD-BEGIN
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import { enMember } from "./locales/en-member";
OLD-END
NEW-BEGIN
import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { enMember } from "./locales/en-member";
NEW-END
EDIT src/i18n/provider-layers.test.tsx #2
OLD-BEGIN
 * DEC-258 — a strings layer loads only when a screen asks for it, joins the
 * chain once its English part is in, and says "failed" (with a retry that asks
 * again) when that part does not arrive. The layer loaders are mocked with
 * promises settled by hand.
 */
OLD-END
NEW-BEGIN
 * DEC-258 — a strings layer loads only when a screen asks for it, joins the
 * chain once its English part is in, and says "failed" when that part does not
 * arrive — with no retry (turn 34c-3, INC-918: the one cure is a refresh). The
 * layer loaders are mocked with promises settled by hand.
 */
NEW-END
EDIT src/i18n/provider-layers.test.tsx #3
OLD-BEGIN
      <p data-testid="state">{member.state}</p>
      <Button type="button" onClick={member.retry}>
        retry
      </Button>
    </>
OLD-END
NEW-BEGIN
      <p data-testid="state">{member.state}</p>
      <p data-testid="answer">{Object.keys(member).join(",")}</p>
    </>
NEW-END
EDIT src/i18n/provider-layers.test.tsx #4
OLD-BEGIN

  it("PSL-3 a failed English part fails the layer; Try again asks again and a later load is ready", async () => {
    mount(true);
OLD-END
NEW-BEGIN

  it("PSL-3 a failed English part fails the layer, and the hook offers no retry — a refresh is the cure (INC-918)", async () => {
    mount(true);
NEW-END
EDIT src/i18n/provider-layers.test.tsx #5
OLD-BEGIN
    expect(screen.getByTestId("text").textContent).toBe("");
    loaders.pending.clear();
    fireEvent.click(screen.getByRole("button", { name: "retry" }));
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    await act(async () => {
      loaders.pending.get("member")?.resolve({ [KEY]: TEXT });
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("ready"));
    expect(screen.getByTestId("text").textContent).toBe(TEXT);
  });
OLD-END
NEW-BEGIN
    expect(screen.getByTestId("text").textContent).toBe("");
    expect(screen.getByTestId("answer").textContent).toBe("state");
  });
NEW-END
EDIT src/test/e2e-colors.test.ts #1
OLD-BEGIN

import { isGoldFill, isRedFill, okLchOf } from "../../e2e/helpers/colors";

OLD-END
NEW-BEGIN

import { isGoldFill, isRedFill, okLchOf, rgbOf } from "../../e2e/helpers/colors";

NEW-END
EDIT src/test/e2e-colors.test.ts #2
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("EC-6 rgb()'s alpha is read as oklab()'s is: a 10% wash is no fill, comma or space form (turn 32b's reviewer)", () => {
    expect(isRedFill("rgba(180, 35, 24, 0.1)")).toBe(false);
    expect(isRedFill("rgb(180 35 24 / 10%)")).toBe(false);
    expect(isRedFill("rgba(180, 35, 24, 0.9)")).toBe(true);
    expect(isGoldFill("rgba(201, 138, 43, 0.1)")).toBe(false);
    expect(isGoldFill("rgb(201 138 43 / 90%)")).toBe(true);
    expect(rgbOf("rgba(1, 2, 3, 0.5)")).toEqual({ red: 1, green: 2, blue: 3, alpha: 0.5 });
    expect(rgbOf("rgb(1, 2, 3)")?.alpha).toBe(1);
    expect(rgbOf("oklch(0.5 0.1 30)")).toBeNull();
  });
});
NEW-END
B2. Run `bunx vitest run src/components/ui/overlay-facade-failure.test.tsx src/i18n/provider-layers.test.tsx src/test/e2e-colors.test.ts` — the supervisor's run on BASE: `Tests  4 failed | 14 passed (18)`: OVF-21 (`expected [ true, false ] to deeply equal [ true ]` — the stale closing told), OVF-22 (`Unable to find an element by: [data-testid="late-menu"]` — an older press's failure closed the menu a newer press opened), PSL-3 (`expected 'state,retry' to be 'state'`), EC-6 (`expected true to be false` — a 10% rgba wash read as red) — paste the failure lines and the totals.

PART C — THE FACADES, THE HOOK AND THE READER.
C1. The numbered asks and the owner's `open`:
EDIT src/components/ui/overlay-facade.tsx #1
OLD-BEGIN

  const activate = React.useCallback((next: Intent | null) => {
    intent.current = next;
OLD-END
NEW-BEGIN

  /** Turn 34c-3 — each activation's number: a late failure of an older one says nothing. */
  const asks = React.useRef(0);

  const activate = React.useCallback((next: Intent | null) => {
    asks.current += 1;
    const ask = asks.current;
    intent.current = next;
NEW-END
EDIT src/components/ui/overlay-facade.tsx #2
OLD-BEGIN
    loadOverlays().catch((error: unknown) => {
      intent.current = null;
OLD-END
NEW-BEGIN
    loadOverlays().catch((error: unknown) => {
      if (ask !== asks.current) return;
      intent.current = null;
NEW-END
EDIT src/components/ui/overlay-facade.tsx #3
OLD-BEGIN
  /** The owner as it stands, for the download's failure path (INC-908). */
  const owner = React.useRef({ controlled, onOpenChange, onUnavailable });
  useIsoLayoutEffect(() => {
    owner.current = { controlled, onOpenChange, onUnavailable };
  });

OLD-END
NEW-BEGIN
  /** The owner as it stands, for the download's failure path (INC-908). */
  const owner = React.useRef({ controlled, open, onOpenChange, onUnavailable });
  useIsoLayoutEffect(() => {
    owner.current = { controlled, open, onOpenChange, onUnavailable };
  });
  /** Turn 34c-3 (turn 32b's reviewer) — each ask's number: a late failure of an older ask tells nobody. */
  const asks = React.useRef(0);

NEW-END
EDIT src/components/ui/overlay-facade.tsx #4
OLD-BEGIN
  const want = React.useCallback((byTrigger: boolean) => {
    setWanted(true);
OLD-END
NEW-BEGIN
  const want = React.useCallback((byTrigger: boolean) => {
    asks.current += 1;
    const ask = asks.current;
    setWanted(true);
NEW-END
EDIT src/components/ui/overlay-facade.tsx #5
OLD-BEGIN
    loadOverlays().catch((error: unknown) => {
      setWanted(false);
OLD-END
NEW-BEGIN
    loadOverlays().catch((error: unknown) => {
      // Turn 34c-3 — the owner has asked again since: this failure is that ask's to tell, or the
      // module has arrived for it; an older ask's failure says nothing.
      if (ask !== asks.current) return;
      setWanted(false);
NEW-END
EDIT src/components/ui/overlay-facade.tsx #6
OLD-BEGIN
      // INC-908 — an owner that heard the trigger's opening, or opened the modal itself,
      // hears that it did not open: its next opening asks for the module again.
      const { controlled: owned, onOpenChange: tell, onUnavailable: unavailable } = owner.current;
      if (byTrigger || owned) {
OLD-END
NEW-BEGIN
      // INC-908 — an owner that heard the trigger's opening, or opened the modal itself,
      // hears that it did not open: its next opening asks for the module again. Turn 34c-3 —
      // an owner that has closed the modal meanwhile hears no stale closing.
      const {
        controlled: owned,
        open: isOpen,
        onOpenChange: tell,
        onUnavailable: unavailable,
      } = owner.current;
      if (owned && isOpen !== true) return;
      if (byTrigger || owned) {
NEW-END
C2. The strings layers' hook and its gate's test mock:
EDIT src/i18n/provider.tsx #1
OLD-BEGIN
  /** DEC-258 — ask for a strings layer; also the retry after a failure. */
OLD-END
NEW-BEGIN
  /** DEC-258 — ask for a strings layer (a failed one is asked again by the next screen that needs it). */
NEW-END
EDIT src/i18n/provider.tsx #2
OLD-BEGIN
 * in, failed when any failed. retry asks again for the layers not ready.
OLD-END
NEW-BEGIN
 * in, failed when any failed. Turn 34c-3 (INC-918): no retry — the browser keeps
 * a failed download for the page's life, so the one cure is a refresh (the
 * shell's gate draws LoadFailedHere).
NEW-END
EDIT src/i18n/provider.tsx #3
OLD-BEGIN
export function useStringsLayers(layers: readonly StringsLayer[]): {
  state: LayerState;
  retry: () => void;
} {
OLD-END
NEW-BEGIN
export function useStringsLayers(layers: readonly StringsLayer[]): { state: LayerState } {
NEW-END
EDIT src/i18n/provider.tsx #4
OLD-BEGIN
  const retry = useCallback(() => {
    for (const layer of asked.split(",")) {
      if (isStringsLayer(layer) && layerStates[layer] !== "ready") requestStringsLayer(layer);
    }
  }, [asked, layerStates, requestStringsLayer]);
  return { state, retry };
OLD-END
NEW-BEGIN
  return { state };
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #1
OLD-BEGIN
  asked: [] as string[][],
  retry: vi.fn(),
}));
OLD-END
NEW-BEGIN
  asked: [] as string[][],
}));
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #2
OLD-BEGIN
    state.asked.push(layers);
    return { state: layers.length === 0 ? "ready" : state.layers, retry: state.retry };
  },
OLD-END
NEW-BEGIN
    state.asked.push(layers);
    return { state: layers.length === 0 ? "ready" : state.layers };
  },
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #3
OLD-BEGIN
  state.asked = [];
  state.retry.mockReset();
  refreshed.mockReset();
OLD-END
NEW-BEGIN
  state.asked = [];
  refreshed.mockReset();
NEW-END
C3. The colour reader:
EDIT e2e/helpers/colors.ts #1
OLD-BEGIN
const SEEN_ALPHA = 0.5;

/**
 * D163 — whether a colour is the system's gold: oklch(0.681 0.13 72.5) in light
OLD-END
NEW-BEGIN
const SEEN_ALPHA = 0.5;

/** An sRGB colour's channels (0–255) and its alpha (0–1). */
export interface Rgb {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

/**
 * rgb() and rgba(), comma or space form, with the alpha a browser reports (`, 0.1`, `/ 10%`) —
 * turn 32b's reviewer: `rgba(180, 35, 24, 0.1)` is a 10% wash, never a red fill, as an oklab() wash
 * is not. Null for any other form.
 */
export function rgbOf(color: string): Rgb | null {
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/i.exec(
    color,
  );
  if (!rgb) return null;
  return {
    red: Number(rgb[1]),
    green: Number(rgb[2]),
    blue: Number(rgb[3]),
    alpha: alphaOf(rgb[4]),
  };
}

/**
 * D163 — whether a colour is the system's gold: oklch(0.681 0.13 72.5) in light
NEW-END
EDIT e2e/helpers/colors.ts #2
OLD-BEGIN
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.08 && lch.hue >= 60 && lch.hue <= 95;
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return red >= 150 && red > green && green >= 100 && green - blue >= 40;
  }
  return false;
}

OLD-END
NEW-BEGIN
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.08 && lch.hue >= 60 && lch.hue <= 95;
  const rgb = rgbOf(color);
  if (rgb === null || rgb.alpha < SEEN_ALPHA) return false;
  const { red, green, blue } = rgb;
  return red >= 150 && red > green && green >= 100 && green - blue >= 40;
}

NEW-END
EDIT e2e/helpers/colors.ts #3
OLD-BEGIN
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.1 && (lch.hue <= 45 || lch.hue >= 340);
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return red >= 150 && red - green >= 60 && red - blue >= 60;
  }
  return false;
}
OLD-END
NEW-BEGIN
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.1 && (lch.hue <= 45 || lch.hue >= 340);
  const rgb = rgbOf(color);
  if (rgb === null || rgb.alpha < SEEN_ALPHA) return false;
  const { red, green, blue } = rgb;
  return red >= 150 && red - green >= 60 && red - blue >= 60;
}
NEW-END
C4. Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance src/components src/i18n src/test` — every test passes (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34c-2: the project's address, key and session names read in one place — the door; INC-931)` becomes `docs/governance/briefs/foundations-turn-34c-3.md (Foundations turn 34c-3: no stale failure tells; the strings layers' retry retired; rgb()'s alpha — turn 32b's reviewer)` (everything after it stays, as it is).
D2. These edits (the register's row 52; the changelog; turn 34c-2 ticked with its closing run; turn 34c-3's line rewritten to what it does; turn 34c-4's line):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3; ODC-5: an empty `catch {}`, a handler that only returns undefined, `.then(ok, undefined)` and `.catch(undefined)` — 34b-3's reviewer, closed in turn 34b-4); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |
OLD-END
NEW-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3; ODC-5: an empty `catch {}`, a handler that only returns undefined, `.then(ok, undefined)` and `.catch(undefined)` — 34b-3's reviewer, closed in turn 34b-4); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/17/18/19/20/21/22, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); a late failure of an older ask tells nobody, and an owner that closed the modal meanwhile hears no stale closing (turn 32b's reviewer; OVF-21/22, turn 34c-3); `useStringsLayers()` offers no retry (turn 34c-3); Foundations turn 34b-2 |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34c-2 (2026-10-26) — the project's public address, its key and the session's storage names are read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1): the session clocks no longer read the address with a pattern a local backend's "localhost" defeated, nor fall back to any project's session in the browser; the password check's second client, the language list, the root's loader and the photo origin read what the client reads. INC-931 (DEC-273): the sign-in and reset screens keep an expired session whose refresh never reached the server, and the reset screen says the page did not load instead of dropping it; a refresh the server refused still drops it. SPK-1/2/3, ASC-7, CF-PROJECT-1/2.
OLD-END
NEW-BEGIN
- Foundations turn 34c-2 (2026-10-26) — the project's public address, its key and the session's storage names are read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1): the session clocks no longer read the address with a pattern a local backend's "localhost" defeated, nor fall back to any project's session in the browser; the password check's second client, the language list, the root's loader and the photo origin read what the client reads. INC-931 (DEC-273): the sign-in and reset screens keep an expired session whose refresh never reached the server, and the reset screen says the page did not load instead of dropping it; a refresh the server refused still drops it. SPK-1/2/3, ASC-7, CF-PROJECT-1/2.

- Foundations turn 34c-3 (2026-10-26; the guard debt of turn 32b's reviewer, INC-918's last retry) — the overlay facades: a late failure of an older ask (a dialog or a menu asked again since) tells nobody and shows no notice, and a dialog's owner that closed it before its code failed hears no stale closing (OVF-21, OVF-22); an uncontrolled dialog's listener hears the failed opening (OVF-19); OVF-17 and OVF-18 read the trigger's closed state and the owner's last word. The strings layers' hook offers no retry — a failed download is the page's for its life, the shell's gate offers Refresh (PSL-3). The E2E colour reader reads rgb()'s alpha as it reads oklab()'s: a 10% wash is no red or gold fill (EC-6).
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34c-2 (docs/governance/briefs/foundations-turn-34c-2.md; no migration; Lovable) — the project's public address, its key and the session's storage names read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1/2, register row 55): the session clocks (no own pattern, no "any sb-\*-auth-token" fallback, absent without a project; SPK-1/2/3), the password check's second client, the language list, the root's loader and the photo origin. INC-931 / DEC-273 — the sign-in and reset screens' mount read keeps an expired session whose refresh never reached the server (`neverReachedTheServer`; ASC-7); a refused refresh drops it.
  - [ ] Turn 34c-3 — the rest of turn 34c: the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2); the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
OLD-END
NEW-BEGIN
  - [x] Turn 34c-2 (docs/governance/briefs/foundations-turn-34c-2.md; no migration; Lovable) — the project's public address, its key and the session's storage names read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1/2, register row 55): the session clocks (no own pattern, no "any sb-\*-auth-token" fallback, absent without a project; SPK-1/2/3), the password check's second client, the language list, the root's loader and the photo origin. INC-931 / DEC-273 — the sign-in and reset screens' mount read keeps an expired session whose refresh never reached the server (`neverReachedTheServer`; ASC-7); a refused refresh drops it. Final HEAD 9eeb83cc; CI run 40397087967: running when turn 34c-3's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-3 (docs/governance/briefs/foundations-turn-34c-3.md; no migration; Lovable) — the guard debt of turn 32b's reviewer: the overlay facades tell no stale failure — an older ask's late failure says nothing, a dialog's owner that closed it meanwhile hears no closing (OVF-21, OVF-22), an uncontrolled dialog's listener hears the failed opening (OVF-19), OVF-17/18 read the trigger's closed state and the owner's last word; the strings layers' hook offers no retry (INC-918; PSL-3); the E2E colour reader reads rgb()'s alpha (EC-6).
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930 waits on Tesfaye's choice (a question in the tracker): an offline sign-out from a page whose marketplace code never downloaded either stays on that page, signed out, until the connection returns, or the marketplace's code is fetched for a signed-in visitor ahead of time (its size measured before the choice). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34c-3.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 323 files, 1985 tests, every one passed); `bun run i18n:usage` then `git diff <START> --stat -- docs/generated public` (empty); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
95c4593086989e47b0f29e4a522e7db4e0edd8a839aad64287d78c0f68dc5f4b  docs/_changelog.md
da2cba9cc4dec6fbcfcc315bf407c26e2e2d1f4212d4ad269f06d32158476f76  docs/governance/mechanisms.md
31827852f793bda6584ecb70564a76b76864d761182fbf33e4b237cb3fe2e04a  e2e/helpers/colors.ts
4c918ff1f87f2ac20f040e3cdae9104e53c5a4677111c5ac8fe9b30c90a2bfad  src/components/shell/strings-layer-gate.test.tsx
1bc85c49ea63ab6ffce20d59d0aa3b698d85d94a90dd8fb34b63358b11c0539a  src/components/ui/overlay-facade-failure.test.tsx
4746f93b6c33dbd46438e176f370e942f29896b0f9ce3aa799b082599b5c7bfb  src/components/ui/overlay-facade.tsx
a31e5b1705fa04f3048e771f88fb2d727e4044b57ca3b0a2f0b5b69379b78e99  src/i18n/provider-layers.test.tsx
ca24d8c119755b9ae5a478ed425cddaf9ef6f9f6e95084bdfca4c5ad551e9bba  src/i18n/provider.tsx
5a7d88d99878ee558221a9147659d85e266fc549fd1233566a86e44d21cef0b2  src/test/e2e-colors.test.ts

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>`; both projects, 0 retries, fake mode; G37's minimum — no spec file changes; the colour reader's change judges only sub-half-opaque rgb() fills, which no caller reads, so one caller runs as the proof; CI runs every test on every commit): e2e/on-demand-failure.spec.ts whole (the facades' failure path); e2e/admin-screening.spec.ts whole (the colour reader's heaviest caller) — if the ceiling cuts it, report the count and stop it there; paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34c-3.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract before → after for each consumer above; the red-first lines (and OVF-19's line with `byTrigger ||` taken out); the unit totals and the E2E count lines; the K2 lists (file:line); "none" for migrations and strings; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): the menus number their asks as the modals do (one rule for both facades); a superseded ask's failure shows no notice; turn 34c's E2E side and INC-930 go to turn 34c-4 — INC-930 after Tesfaye's choice.
```

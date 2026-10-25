# Foundations — turn 31: speed S8 — the overlays' code on demand: the tooltip's and the dropdown menu's code waits for the person (D234, DEC-259): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 31 (2026-10-25; DEC-237; D234 — the operator: "it should be the fastest, lightweight … VERY IMPORTANT"; DEC-259 — the supervisor's decision under G17, reversible: the tooltip and the dropdown menu become facades whose Radix code arrives on demand; anchors located at 25542561). Tier A (a primitive every page's header, rail and tables use; focus and keyboard behaviour; the first-paint guards). No migration. No new string. No package change. No file deleted. AGENTS.md: the Overlays line (G6). Base: dev 25542561 (turn 30's final commit 1990ac5d plus your turn-31 stop report, which your completion report replaces). Checked by script against AGENTS.md and the platform rules you quoted: no new control (every test draws the shared Button); no map read by an outside key; no silent catch (a failed download logs and the next intent retries); no `!`; no `.first()` in e2e; browser tests only through `bun run e2e:local`. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — turn 30's red (the two deletions declared); C — the overlays on demand (one batch); D — the tests; E — the first-paint guards; F — the browser; G — docs, register, changelog, AGENTS.md, the usage maps.
BASE: 25542561
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
docs/tracking/intentional-deletions.txt
src/components/ui/tooltip.tsx
src/components/ui/tooltip-impl.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/dropdown-menu-impl.tsx
src/components/ui/overlays-impl.ts
src/components/ui/overlay-loader.ts
src/components/ui/overlay-facade.tsx
src/components/ui/overlay-facade.test.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/shell/row-actions.test.tsx
src/test/setup.ts
scripts/conformance/overlays.test.ts
scripts/check-marketplace-imports.mjs
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/route-budgets.mjs
scripts/e2e-select.ts
e2e/overlays.spec.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: an overlay primitive's code — the tooltip's and the dropdown menu's (Radix, floating-ui and their focus and scroll layers) — waits for the person's intent and never rides a page's first download; the person sees and uses the same trigger throughout.
MECHANISM: NONE YET — built in Part C: src/components/ui/overlay-loader.ts (`loadOverlays`, `useOverlays`, `warmOverlaysWhenIdle`, on loadOnce — row 41) and src/components/ui/overlay-facade.tsx (`OverlayRoot`, `OverlayTrigger`, `OverlayContent`): the facade root draws its children at once and, after the first intent (a tooltip: a mouse or pen hover, a keyboard focus; a menu: a press, Enter, Space, ArrowDown) or an owner's `open`, draws the real Radix root BESIDE its children; the real trigger renders a collector that hands its props (handlers, aria, data-state, the ref the popper anchors to) to the facade trigger, which puts them on the consumer's own element through a Slot — never remounted — and replays the intent once on it. The Radix code moves unchanged to tooltip-impl.tsx and dropdown-menu-impl.tsx, re-exported by overlays-impl.ts; tooltip.tsx and dropdown-menu.tsx keep their exports. The standard: WAI-ARIA APG menu button and tooltip patterns (unchanged — Radix still draws them); import-on-interaction / idle-until-urgent loading.
CONSUMERS (at BASE): tooltips — src/components/ui/icon-button.tsx :67-:74, src/components/marketplace/feed.tsx :292-:312, src/components/shell/row-actions.tsx :87-:140 (the provider) and :112-:123, src/components/shell/table-actions.tsx :88-:93, src/components/shell/app-rail.tsx :165-:170 (WithTooltip) and :885-:1013 (the provider), src/components/ui/sidebar.tsx :128-:146 and :570-:578; menus — src/components/language-switcher.tsx :47-:105, src/components/shell/app-header.tsx :205-:249, src/components/shell/panel-header.tsx :55-:87, src/components/shell/location-selector.tsx :71-:104, src/components/shell/row-actions.tsx :111-:137 (modal={false}, a tooltip on the same trigger), src/routes/dev.style.tsx :177-:185; the unit setup (src/test/setup.ts) and the row-actions tests that open a menu by pointerdown (row-actions.test.tsx). Every trigger is `asChild`; every root is uncontrolled.
COVERED HERE: every consumer above, unchanged — they import the same names from the same files. LEFT: the shell's Radix dialog (src/components/shell/app-rail.tsx :2 and toolbar-panel.tsx :1 import @radix-ui/react-dialog directly) still rides the entry — the next speed turn, by the same three parts (K2).
CONFORMANCE GUARD: scripts/conformance/overlays.test.ts — CF-OV-1 every file under src/, e2e/ and scripts/: only the impl files reach @radix-ui/react-tooltip and @radix-ui/react-dropdown-menu by value, only overlays-impl.ts the impl files, only overlay-loader.ts overlays-impl.ts (type-only imports pass); CF-OV-2 the census on a planted tree (a direct Radix import, a static impl import, a re-export — each fails; type-only reaches pass); CF-OV-3 each facade exports exactly its impl's names. The weight guard's FORBIDDEN gains the two Radix packages and follows side-effect imports (E1); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY gain `overlays-impl` (E2); OVF-1…10; e2e/overlays.spec.ts OVE-1, OVE-2.
EXCEPTIONS: none.
FIVE LENSES — security: no new input or door; the facade decides when code loads, never who may act · performance: the supervisor's build — the entry 280.2 → 260.0 KiB, every page 10–20 KiB lighter (E3–E4); the module (about 9 KiB gzip plus floating-ui) asked about 190 ms after the load event in the lab; no tooltip root is mounted for a control nobody has hovered · failure modes: a failed download keeps the closed trigger and logs `[overlays] loading the overlay primitives failed`; the next intent asks again (OVF-9) · consistency: one facade for both primitives, one loader, one census; the trigger's element is never replaced, so focus, hover and a press survive (OVF-2, OVF-4, OVF-6, OVF-7) · future growth: a new overlay primitive is one impl file re-exported by overlays-impl and one facade over the same three parts; an owner-opened root (`open`, `defaultOpen`) is asked for at once (OVF-10).
FORWARD-SCAN: the operator's UI redesign before Stage 2 will add menus and tooltips — through these facades by the census; the dialog on demand is the next consumer. REGISTER: docs/governance/mechanisms.md row 48 (G2).

WHY
- Every page's first download carried the Radix tooltip and menu, floating-ui, the focus scope and the scroll lock — about 20 KiB gzip — before anyone had touched a header menu or hovered an icon.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-31.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-31.md (Foundations turn 31: speed S8 — the overlays' code on demand: the tooltip's and the dropdown menu's code waits for the person — D234, DEC-259)` (everything after it stays); the line that begins "  - [x] Turn 30 (docs/governance/briefs/foundations-turn-30.md" is replaced by these two lines:
  - [x] Turn 30 (docs/governance/briefs/foundations-turn-30.md; no migration) — speed S7: the strings layers (DEC-258) — a route declares the strings its screens show, the shell's StringsLayerGate loads them before it draws; the member and admin strings off every page's first download (scripts/conformance/strings-layers.ts judges); the ceilings re-measured; AP-54 judges the navigation's own HTML (INC-904). Final HEAD 1990ac5d; CI run 40241386426: every lane, the staging E2E and the component tests green; the build job's deletion guard refused the two retired test files (INC-905: their intentional-deletions lines landed in turn 31), so turn 31's run judges its typecheck, lint and build; unit 300 files / 1872 passed / 1 skipped / 2 named sandbox timeouts (EXH-11/17); browser 51 passed / 1 existing skip.
  - [ ] Turn 31 (docs/governance/briefs/foundations-turn-31.md; no migration) — speed S8: the overlays' code on demand (DEC-259) — Tooltip and DropdownMenu as facades over overlay-facade.tsx, their Radix code through overlay-loader.ts on the first intent or at idle; the trigger kept and the intent replayed; CF-OV-1…3; the weight guard follows side-effect imports; the ceilings re-measured (the entry 280.2 → 260.0 KiB); INC-905.
Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–G; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- PART C IS ONE BATCH: from C1 to C6 the tree does not build (the facades need the loader and the impl files). Write C1–C6 without stopping and read /tmp/observability/build-errors.log only after C6. Every later part lands whole.
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn adds e2e/overlays.spec.ts (read-only: no rows).
- Run no stateful git command. Every FILE block is the file's whole text; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text; copy them by script or your file-editing tool. C1's two copies are byte copies (`cp`), never retyped.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-31.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/features/ci-guards.md, docs/features/display-primitives.md, docs/governance/mechanisms.md, AGENTS.md (G6 only), docs/governance/reports/foundations-turn-31.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (G7). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After each part (after C6 for Part C), read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched. E3–E4's ceilings are the supervisor's build of this change; CI's bundle-budget job judges them.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 time out in your sandbox (INC-890); LL-1 can hit its 5-second limit under the full suite (it passes alone). Do not change, skip or work around them; paste their failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407).
- Behaviour contract: every page shows what it shows today and every trigger looks the same; a menu opens on its trigger's first press or opening key and a tooltip on its first hover or keyboard focus — on the same element, with Radix's own focus handling; a touch on a tooltip's trigger asks for nothing and its tap lands. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every file under src/ that imports from @radix-ui/ by value and draws an overlay on a page's first download (the dialog, the sheet, the popover, the select …), and every TooltipTrigger or DropdownMenuTrigger without `asChild` (none may remain — the types refuse one); K3 the census, its test, OVF-1…10 and OVE-1/2 land with the mechanism; K4 no literal language code in src; K5, K6 do not arise.
- Tests (G27, G38): no real row (OVE-1/2 only read the home page); no assertion loosened (OVF-2 waits for Radix's focus return, which Radix makes on its next task); the census is shown red on a planted import (D5) and put back; the weight guard is shown red on a planted side-effect import (E1) and put back.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on 25542561 — your stop report, no code — green or still running; when it has not finished, the newest finished run is 1990ac5d's: FAILURE, "Build, typecheck, lint" alone, its evidence `Unexplained deletions in a018721a…..HEAD (INC-076)` naming src/i18n/compiled-admin-loader.test.ts and src/i18n/locales/admin-layer.test.ts, every lane green). That red is Part B. Any other red is fixed first at its root (G21, G38) and named in the report.

PART B — TURN 30'S RED (INC-905).
B1. Turn 30 deleted two test files without declaring them, and the deletion guard refused its range (no re-run: the same range fails again; this turn's range no longer holds them). docs/tracking/intentional-deletions.txt, these lines at its end (the record of the declaration):
APPEND-BEGIN docs/tracking/intentional-deletions.txt
# Foundations turn 30 (DEC-258; declared late in turn 31 — INC-905): the admin-layer judge and the admin loader's
# test, replaced by scripts/conformance/strings-layers.test.ts and src/i18n/compiled-layer-loader.test.ts.
# Deleted in a018721a..1990ac5d, whose run the deletion guard refused for want of these lines.
src/i18n/locales/admin-layer.test.ts
src/i18n/compiled-admin-loader.test.ts
APPEND-END docs/tracking/intentional-deletions.txt

PART C — THE OVERLAYS ON DEMAND (ONE BATCH, C1–C6).
C1. Byte copies, from the repository's root: `cp src/components/ui/tooltip.tsx src/components/ui/tooltip-impl.tsx` and `cp src/components/ui/dropdown-menu.tsx src/components/ui/dropdown-menu-impl.tsx` — the two impl files are BASE's tooltip.tsx and dropdown-menu.tsx unchanged (sha256 9682690fc3755d0f4b8684f2d7b1f77945876d41a45b723d0761b26804ad5010 and c6eb5ff28e5bc3cdbe38a11d680aae56d885285e4aca7c8288609811effc04cb).
C2. NEW src/components/ui/overlays-impl.ts (sha256 8a1c6c569f44c8e169fa34c858cc1541537146541c1809132dccf4e309675b5c):
FILE-BEGIN src/components/ui/overlays-impl.ts
/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE OVERLAY PRIMITIVES' OWN CODE.
 * The tooltip and the dropdown menu (Radix, floating-ui and their layers) are
 * fetched on demand through src/components/ui/overlay-loader.ts, never on the
 * first download. Only the facades in tooltip.tsx and dropdown-menu.tsx reach
 * this module, and only through the loader.
 */
export * as menu from "./dropdown-menu-impl";
export * as tooltip from "./tooltip-impl";
FILE-END src/components/ui/overlays-impl.ts
C3. NEW src/components/ui/overlay-loader.ts (sha256 215cf43a2f416cd526ac2482d30e0e872d282c23869c143dc119706b6dda14f3):
FILE-BEGIN src/components/ui/overlay-loader.ts
import { useSyncExternalStore } from "react";

import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE OVERLAY PRIMITIVES, FETCHED
 * ON DEMAND. The tooltip and the dropdown menu carry Radix, floating-ui and
 * their focus and scroll layers: about 23 KiB of every page's first download.
 * Their facades (tooltip.tsx, dropdown-menu.tsx) draw the trigger at once and
 * ask for this module on the first hover, focus or press — or once the page has
 * loaded and the browser is idle, so that first press does not wait.
 *
 * `useOverlays()` is the module once it has arrived (null before; null on the
 * server and in the hydration render, so the server's HTML and the first
 * client render agree). A failed download is logged once per try and forgotten:
 * the next ask tries again (loadOnce).
 */
export type OverlaysImpl = typeof import("./overlays-impl");

const overlays = loadOnce(() => import("./overlays-impl"));
const listeners = new Set<() => void>();

/** Starts the download (or joins the one in flight); the subscribers hear of its arrival. */
export function loadOverlays(): Promise<OverlaysImpl> {
  const known = overlays.ready() !== null;
  return overlays.load().then(
    (impl) => {
      if (!known) for (const listener of listeners) listener();
      return impl;
    },
    (error: unknown) => {
      console.warn(`[overlays] loading the overlay primitives failed: ${errorText(error)}`);
      throw error;
    },
  );
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const serverSnapshot = (): OverlaysImpl | null => null;

/** The overlay module once it has arrived; null before, on the server and while hydrating. */
export function useOverlays(): OverlaysImpl | null {
  return useSyncExternalStore(subscribe, overlays.ready, serverSnapshot);
}

let warmScheduled = false;

/**
 * Asks for the module once the page has loaded and the browser is idle, so a
 * person's first press finds it ready; scheduled once per visit, never on the
 * server. A failure here is logged and left for the next ask.
 */
export function warmOverlaysWhenIdle(): void {
  if (warmScheduled || typeof window === "undefined") return;
  warmScheduled = true;
  const ask = () => {
    loadOverlays().catch(() => undefined);
  };
  const whenIdle = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(ask, { timeout: 4000 });
    } else {
      window.setTimeout(ask, 1);
    }
  };
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}
FILE-END src/components/ui/overlay-loader.ts
C4. NEW src/components/ui/overlay-facade.tsx (sha256 e09e16a05d216d94a3584b092a5ba69590aeae61a8c14bab191541aadcd9a5fd):
FILE-BEGIN src/components/ui/overlay-facade.tsx
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import {
  loadOverlays,
  useOverlays,
  warmOverlaysWhenIdle,
  type OverlaysImpl,
} from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — ONE WAY AN OVERLAY WAITS FOR ITS
 * CODE. The tooltip's and the dropdown menu's facades (tooltip.tsx,
 * dropdown-menu.tsx) are built from the three parts here:
 *
 * - OverlayRoot holds the root's state. Until the person shows intent it draws
 *   only its children; then it asks for the overlay module and, once it has
 *   arrived, draws the real Radix root BESIDE its children (a Radix root and a
 *   closed trigger add no element to the page). The real trigger renders a
 *   collector instead of an element, and the collector hands the trigger's
 *   props — handlers, aria, data-state and the ref the popper anchors to — to
 *   the facade trigger.
 * - OverlayTrigger draws the consumer's own element through a Slot, first with
 *   the closed state's attributes and the intent handlers, then with the real
 *   trigger's props. The element is never replaced, so focus, hover and a
 *   press in progress survive the switch; the intent that started it (a hover,
 *   a focus, a press, a key) is replayed once on the same element, so the real
 *   trigger answers it as if it had been there all along.
 * - OverlayContent keeps the content's props for the real tree and draws
 *   nothing where it stands.
 *
 * The server and the hydration render draw the closed trigger alone, so they
 * agree; a failed download leaves the closed trigger and the next intent asks
 * again (overlay-loader.ts logs the failure).
 */
export type OverlayKind = "tooltip" | "menu";

type Props = Record<string, unknown>;

/** What the person did on a trigger before the real primitive was there. */
type Intent =
  | { kind: "hover" }
  | { kind: "focus" }
  | { kind: "press"; pointerType: string }
  | { kind: "key"; key: string };

const useIsoLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

interface RootState {
  kind: OverlayKind;
  /** The real primitive is drawn: asked for and arrived. */
  active: boolean;
  activate(intent: Intent | null): void;
  /** Asks for the module without asking for the overlay (a menu trigger's hover or focus). */
  warm(): void;
  /** The intent that started the switch, replayed once the real trigger is in place. */
  intent: React.RefObject<Intent | null>;
  /** The content's props (children included), kept for the real tree. */
  setContent(props: Props | null): void;
  /** Where the real trigger's props go: the facade trigger's state setter. */
  sink: React.RefObject<((props: Props) => void) | null>;
}

/** One context per kind: a tooltip may stand between a menu's root and its trigger. */
const ROOTS: Record<OverlayKind, React.Context<RootState | null>> = {
  tooltip: React.createContext<RootState | null>(null),
  menu: React.createContext<RootState | null>(null),
};

function useRoot(kind: OverlayKind, part: string): RootState {
  const root = React.useContext(ROOTS[kind]);
  if (root === null) throw new Error(`${part} must be used within its root`);
  return root;
}

/** The real trigger's only child: draws nothing, hands every prop to the facade trigger. */
function Collector({ sink, ...props }: Props & { sink: RootState["sink"] }) {
  useIsoLayoutEffect(() => {
    sink.current?.(props);
  });
  return null;
}

/** What the real root draws inside: the real trigger around the collector, and the content. */
export interface RealSlots {
  /** Pass as the real trigger's only child (with asChild). */
  collector: React.ReactElement;
  /** The content's props as the consumer gave them, or null when none is drawn. */
  content: Props | null;
}

export function OverlayRoot({
  kind,
  openAtStart = false,
  children,
  real,
}: {
  kind: OverlayKind;
  /** Its owner opens it (`open` or `defaultOpen`): the real root is asked for with no intent. */
  openAtStart?: boolean;
  children?: React.ReactNode;
  real: (impl: OverlaysImpl, slots: RealSlots) => React.ReactNode;
}) {
  const impl = useOverlays();
  const [wanted, setWanted] = React.useState(false);
  const [content, setContentState] = React.useState<Props | null>(null);
  const intent = React.useRef<Intent | null>(null);
  const contentRef = React.useRef<Props | null>(null);
  const sink = React.useRef<((props: Props) => void) | null>(null);
  const activeRef = React.useRef(false);
  const active = wanted && impl !== null;

  React.useEffect(() => {
    warmOverlaysWhenIdle();
  }, []);

  useIsoLayoutEffect(() => {
    activeRef.current = active;
    if (active) setContentState(contentRef.current);
  }, [active]);

  const activate = React.useCallback((next: Intent | null) => {
    intent.current = next;
    setWanted(true);
    loadOverlays().catch(() => {
      intent.current = null;
      setWanted(false);
    });
  }, []);

  const warm = React.useCallback(() => {
    loadOverlays().catch(() => undefined);
  }, []);

  React.useEffect(() => {
    if (openAtStart) activate(null);
  }, [openAtStart, activate]);

  const setContent = React.useCallback((props: Props | null) => {
    contentRef.current = props;
    if (activeRef.current) setContentState(props);
  }, []);

  const root = React.useMemo<RootState>(
    () => ({ kind, active, activate, warm, intent, setContent, sink }),
    [kind, active, activate, warm, setContent],
  );

  const Context = ROOTS[kind];
  return (
    <Context.Provider value={root}>
      {children}
      {active && impl !== null
        ? real(impl, { collector: <Collector sink={sink} />, content })
        : null}
    </Context.Provider>
  );
}

/** The closed state's attributes, as the real trigger draws them. */
const CLOSED: Record<OverlayKind, Props> = {
  tooltip: { "data-state": "closed" },
  menu: {
    type: "button",
    "aria-haspopup": "menu",
    "aria-expanded": false,
    "data-state": "closed",
  },
};

type Handler = (event: React.SyntheticEvent) => void;

/** Our handler after the given one, as Radix composes a consumer's handler with its own. */
function after(first: unknown, second: Handler): Handler {
  return (event) => {
    if (typeof first === "function") (first as Handler)(event);
    second(event);
  };
}

function setRef<T>(ref: unknown, value: T): void {
  if (typeof ref === "function") ref(value);
  else if (ref !== null && typeof ref === "object" && "current" in ref)
    (ref as { current: T }).current = value;
}

/** Plays the intent again on the same element, now that the real trigger's handlers are on it. */
function replay(intent: Intent, node: HTMLElement, hovered: boolean): void {
  const Pointer = typeof PointerEvent === "function" ? PointerEvent : MouseEvent;
  switch (intent.kind) {
    case "hover":
      if (hovered)
        node.dispatchEvent(new Pointer("pointermove", { bubbles: true, pointerType: "mouse" }));
      return;
    case "focus":
      if (node.ownerDocument.activeElement === node)
        node.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
      return;
    case "press":
      node.dispatchEvent(
        new Pointer("pointerdown", {
          bubbles: true,
          cancelable: true,
          button: 0,
          pointerType: intent.pointerType,
        }),
      );
      return;
    case "key":
      node.dispatchEvent(
        new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: intent.key }),
      );
  }
}

/** The keys a closed menu trigger opens on (Radix's DropdownMenuTrigger). */
const MENU_KEYS = ["Enter", " ", "ArrowDown"];

export function OverlayTrigger({
  kind,
  part,
  children,
  ...incoming
}: Props & { kind: OverlayKind; part: string; children?: React.ReactNode }) {
  const root = useRoot(kind, part);
  const [real, setReal] = React.useState<Props | null>(null);
  const node = React.useRef<HTMLElement | null>(null);
  const hovered = React.useRef(false);
  const pressed = React.useRef(false);

  useIsoLayoutEffect(() => {
    const sink = root.sink;
    sink.current = setReal;
    return () => {
      if (sink.current === setReal) sink.current = null;
    };
  }, [root.sink]);

  const live = root.active && real !== null;

  React.useEffect(() => {
    if (!live) return;
    const intent = root.intent.current;
    root.intent.current = null;
    if (intent !== null && node.current !== null) replay(intent, node.current, hovered.current);
  }, [live, root.intent]);

  const track: Props = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== "touch") hovered.current = true;
    },
    onPointerLeave: () => {
      hovered.current = false;
    },
  };

  let mine: Props;
  if (live) {
    mine = {
      ...real,
      onPointerEnter: after(real.onPointerEnter, track.onPointerEnter as Handler),
      onPointerLeave: after(real.onPointerLeave, track.onPointerLeave as Handler),
    };
  } else if (root.kind === "tooltip") {
    mine = {
      ...CLOSED.tooltip,
      onPointerEnter: (event: React.PointerEvent) => {
        if (event.pointerType === "touch") return;
        hovered.current = true;
        root.activate({ kind: "hover" });
      },
      onPointerLeave: track.onPointerLeave,
      onPointerDown: () => {
        pressed.current = true;
        document.addEventListener(
          "pointerup",
          () => {
            pressed.current = false;
          },
          { once: true },
        );
      },
      onFocus: () => {
        if (!pressed.current) root.activate({ kind: "focus" });
      },
    };
  } else {
    mine = {
      ...CLOSED.menu,
      ...track,
      onPointerEnter: (event: React.PointerEvent) => {
        (track.onPointerEnter as Handler)(event);
        root.warm();
      },
      onFocus: () => root.warm(),
      onPointerDown: (event: React.PointerEvent) => {
        if (event.button !== 0 || event.ctrlKey) return;
        event.preventDefault();
        root.activate({ kind: "press", pointerType: event.pointerType });
      },
      onKeyDown: (event: React.KeyboardEvent) => {
        if (!MENU_KEYS.includes(event.key)) return;
        event.preventDefault();
        root.activate({ kind: "key", key: event.key });
      },
    };
  }

  const theirs = mine.ref;
  const ref = React.useCallback(
    (value: HTMLElement | null) => {
      node.current = value;
      setRef(theirs, value);
    },
    [theirs],
  );

  return (
    <Slot {...mine} ref={ref}>
      <Slot {...incoming}>{children}</Slot>
    </Slot>
  );
}

/** Keeps the content's props for the real tree; draws nothing where it stands. */
export function OverlayContent({
  kind,
  part,
  ...props
}: Props & { kind: OverlayKind; part: string }) {
  const root = useRoot(kind, part);
  useIsoLayoutEffect(() => {
    root.setContent(props);
  });
  const { setContent } = root;
  useIsoLayoutEffect(() => () => setContent(null), [setContent]);
  return null;
}
FILE-END src/components/ui/overlay-facade.tsx
C5. src/components/ui/tooltip.tsx, replaced whole by this text (sha256 9ae42e00de3a5a6d914b5d9fc4349c6bf60e523209c201ad8fb64a8dff90df9e):
FILE-BEGIN src/components/ui/tooltip.tsx
"use client";

import * as React from "react";

import { OverlayContent, OverlayRoot, OverlayTrigger } from "./overlay-facade";
import type * as Impl from "./tooltip-impl";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE TOOLTIP, ITS CODE ON DEMAND.
 * The same four parts as before; the Radix tooltip itself (tooltip-impl.tsx)
 * arrives on the trigger's first hover or keyboard focus, or once the page is
 * idle (overlay-facade.tsx). Every tooltip's real root carries its own Radix
 * provider; TooltipProvider keeps the group's timing — once one tooltip in the
 * group has opened, the next opens at once until the skip delay has passed, as
 * Radix's shared provider does.
 */
interface Group {
  delayDuration: number;
  skipDelayDuration: number;
  disableHoverableContent?: boolean;
  /** A tooltip of the group is open, or closed less than the skip delay ago. */
  warm: boolean;
  opened(): void;
  closed(): void;
}

const DEFAULT_GROUP: Group = {
  delayDuration: 700,
  skipDelayDuration: 300,
  warm: false,
  opened: () => undefined,
  closed: () => undefined,
};

const GroupContext = React.createContext<Group>(DEFAULT_GROUP);

function TooltipProvider({
  children,
  delayDuration = 700,
  skipDelayDuration = 300,
  disableHoverableContent,
}: React.ComponentProps<typeof Impl.TooltipProvider>) {
  const [warm, setWarm] = React.useState(false);
  const cool = React.useRef<number | null>(null);
  React.useEffect(
    () => () => {
      if (cool.current !== null) window.clearTimeout(cool.current);
    },
    [],
  );
  const group = React.useMemo<Group>(
    () => ({
      delayDuration,
      skipDelayDuration,
      disableHoverableContent,
      warm,
      opened: () => {
        if (cool.current !== null) window.clearTimeout(cool.current);
        cool.current = null;
        setWarm(true);
      },
      closed: () => {
        if (cool.current !== null) window.clearTimeout(cool.current);
        cool.current = window.setTimeout(() => {
          cool.current = null;
          setWarm(false);
        }, skipDelayDuration);
      },
    }),
    [delayDuration, skipDelayDuration, disableHoverableContent, warm],
  );
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
}

function Tooltip({
  children,
  onOpenChange,
  ...rootProps
}: React.ComponentProps<typeof Impl.Tooltip>) {
  const group = React.useContext(GroupContext);
  return (
    <OverlayRoot
      kind="tooltip"
      openAtStart={rootProps.open === true || rootProps.defaultOpen === true}
      real={(impl, { collector, content }) => (
        <impl.tooltip.TooltipProvider
          delayDuration={group.warm ? 0 : group.delayDuration}
          skipDelayDuration={group.skipDelayDuration}
          disableHoverableContent={group.disableHoverableContent}
        >
          <impl.tooltip.Tooltip
            {...rootProps}
            onOpenChange={(open) => {
              onOpenChange?.(open);
              if (open) group.opened();
              else group.closed();
            }}
          >
            <impl.tooltip.TooltipTrigger asChild>{collector}</impl.tooltip.TooltipTrigger>
            {content !== null ? <impl.tooltip.TooltipContent {...content} /> : null}
          </impl.tooltip.Tooltip>
        </impl.tooltip.TooltipProvider>
      )}
    >
      {children}
    </OverlayRoot>
  );
}

/** Always asChild: the consumer's own element is the trigger. */
function TooltipTrigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.TooltipTrigger> & { asChild: true }) {
  return <OverlayTrigger kind="tooltip" part="TooltipTrigger" {...props} />;
}

function TooltipContent(props: React.ComponentProps<typeof Impl.TooltipContent>) {
  return <OverlayContent kind="tooltip" part="TooltipContent" {...props} />;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
FILE-END src/components/ui/tooltip.tsx
C6. src/components/ui/dropdown-menu.tsx, replaced whole by this text (sha256 ebc1fc068d5387fedd1b53cd2eb3d6cc1c45522b93b03a58d4978bc0bb17b2b3):
FILE-BEGIN src/components/ui/dropdown-menu.tsx
"use client";

import * as React from "react";

import type * as Impl from "./dropdown-menu-impl";
import { OverlayContent, OverlayRoot, OverlayTrigger } from "./overlay-facade";
import { useOverlays, type OverlaysImpl } from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE DROPDOWN MENU, ITS CODE ON
 * DEMAND. The same parts as before; the Radix menu itself
 * (dropdown-menu-impl.tsx) arrives on the trigger's first press or opening key,
 * or once the page is idle (overlay-facade.tsx); a hover or a focus on the
 * trigger starts the download. The parts drawn inside the content (items,
 * labels, groups, separators, sub-menus) exist only once the real content is
 * drawn, so each is the real part or nothing.
 */
function DropdownMenu({ children, ...rootProps }: React.ComponentProps<typeof Impl.DropdownMenu>) {
  return (
    <OverlayRoot
      kind="menu"
      openAtStart={rootProps.open === true || rootProps.defaultOpen === true}
      real={(impl, { collector, content }) => (
        <impl.menu.DropdownMenu {...rootProps}>
          <impl.menu.DropdownMenuTrigger asChild>{collector}</impl.menu.DropdownMenuTrigger>
          {content !== null ? <impl.menu.DropdownMenuContent {...content} /> : null}
        </impl.menu.DropdownMenu>
      )}
    >
      {children}
    </OverlayRoot>
  );
}

/** Always asChild: the consumer's own element is the trigger. */
function DropdownMenuTrigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.DropdownMenuTrigger> & { asChild: true }) {
  return <OverlayTrigger kind="menu" part="DropdownMenuTrigger" {...props} />;
}

function DropdownMenuContent(props: React.ComponentProps<typeof Impl.DropdownMenuContent>) {
  return <OverlayContent kind="menu" part="DropdownMenuContent" {...props} />;
}

type Part = keyof OverlaysImpl["menu"];

/** A part drawn inside the real content: the real part once the module is here, else nothing. */
function inside<K extends Part>(name: K) {
  type P = React.ComponentProps<OverlaysImpl["menu"][K]>;
  function Inside(props: P) {
    const impl = useOverlays();
    if (impl === null) return null;
    const Real = impl.menu[name] as unknown as React.ComponentType<Record<string, unknown>>;
    return <Real {...(props as Record<string, unknown>)} />;
  }
  Inside.displayName = name;
  return Inside;
}

const DropdownMenuItem = inside("DropdownMenuItem");
const DropdownMenuCheckboxItem = inside("DropdownMenuCheckboxItem");
const DropdownMenuRadioItem = inside("DropdownMenuRadioItem");
const DropdownMenuLabel = inside("DropdownMenuLabel");
const DropdownMenuSeparator = inside("DropdownMenuSeparator");
const DropdownMenuShortcut = inside("DropdownMenuShortcut");
const DropdownMenuGroup = inside("DropdownMenuGroup");
const DropdownMenuPortal = inside("DropdownMenuPortal");
const DropdownMenuSub = inside("DropdownMenuSub");
const DropdownMenuSubContent = inside("DropdownMenuSubContent");
const DropdownMenuSubTrigger = inside("DropdownMenuSubTrigger");
const DropdownMenuRadioGroup = inside("DropdownMenuRadioGroup");

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
FILE-END src/components/ui/dropdown-menu.tsx
Now read /tmp/observability/build-errors.log (see HOW TO WORK). No consumer file changes: they import the same names from the same paths.

PART D — THE TESTS.
D1. src/test/setup.ts, these edits (a component test has the overlay module from the start):
EDIT src/test/setup.ts #1
OLD-BEGIN

/**
OLD-END
NEW-BEGIN

import { loadOverlays } from "@/components/ui/overlay-loader";

/**
NEW-END
EDIT src/test/setup.ts #2
OLD-BEGIN

afterEach(() => {
OLD-END
NEW-BEGIN

// DEC-259 — the overlay primitives (tooltip, dropdown menu) arrive on demand in
// the browser. A component test has them from the start, so a trigger's first
// gesture opens the real primitive within the same act(), as on a page whose
// module has already arrived.
await loadOverlays();

afterEach(() => {
NEW-END
D2. NEW src/components/ui/overlay-facade.test.tsx (sha256 6d10fd58a2710de6d6e311f95126b52285115e885415c2b3fe82ed903b538143):
FILE-BEGIN src/components/ui/overlay-facade.test.tsx
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

/**
 * DEC-259 (Foundations turn 31) — the overlay facades: the trigger is the
 * consumer's own element from the first render, the real primitive answers the
 * first intent on that same element, and nothing else changes for the person.
 * The module is already here (src/test/setup.ts), as on a page after its idle
 * download; overlay-facade-failure.test.tsx covers a failed download.
 */
function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid="menu-trigger">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-testid="menu">
        <DropdownMenuItem data-testid="item-1">One</DropdownMenuItem>
        <DropdownMenuItem data-testid="item-2">Two</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Tip() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button data-testid="tip-trigger">Save</Button>
        </TooltipTrigger>
        <TooltipContent>Save the listing</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("the overlay facades (DEC-259)", () => {
  it("OVF-1 the server and the first render draw the closed trigger alone, with the closed state's attributes", () => {
    const menu = renderToString(<Menu />);
    expect(menu).toContain('aria-haspopup="menu"');
    expect(menu).toContain('aria-expanded="false"');
    expect(menu).toContain('data-state="closed"');
    expect(menu).not.toContain("One");
    expect(menu).not.toContain("radix-");
    const tip = renderToString(<Tip />);
    expect(tip).toContain('data-state="closed"');
    expect(tip).not.toContain("Save the listing");
    render(<Menu />);
    expect(screen.queryByTestId("menu")).toBeNull();
    expect(screen.getByTestId("menu-trigger")).toHaveAttribute("aria-expanded", "false");
  });

  it("OVF-2 the first press opens the real menu on the same element; Escape closes it and gives focus back to that element", async () => {
    render(<Menu />);
    const trigger = screen.getByTestId("menu-trigger");
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("menu-trigger")).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("menu")).toHaveAttribute("aria-labelledby", trigger.id);
    fireEvent.keyDown(screen.getByTestId("menu"), { key: "Escape" });
    expect(screen.queryByTestId("menu")).toBeNull();
    // Radix gives the focus back on its focus scope's next task.
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("OVF-3 the first Enter opens the menu with its first item focused, as a keyboard opening does", () => {
    render(<Menu />);
    const trigger = screen.getByTestId("menu-trigger");
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("item-1")).toHaveFocus();
  });

  it("OVF-4 the first hover opens the tooltip on the same element", async () => {
    render(<Tip />);
    const trigger = screen.getByTestId("tip-trigger");
    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Save the listing");
    expect(screen.getByTestId("tip-trigger")).toBe(trigger);
    fireEvent.pointerLeave(trigger, { pointerType: "mouse" });
  });

  it("OVF-5 the first keyboard focus opens the tooltip; a press's focus does not", async () => {
    const { unmount } = render(<Tip />);
    const trigger = screen.getByTestId("tip-trigger");
    act(() => trigger.focus());
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Save the listing");
    unmount();

    render(<Tip />);
    const pressed = screen.getByTestId("tip-trigger");
    fireEvent.pointerDown(pressed, { button: 0, pointerType: "mouse" });
    act(() => pressed.focus());
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(pressed).toHaveAttribute("data-state", "closed");
  });

  it("OVF-6 a touch on a tooltip's trigger asks for nothing and its click still lands", () => {
    let clicks = 0;
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <Button data-testid="touch-trigger" onClick={() => (clicks += 1)}>
            Go
          </Button>
        </TooltipTrigger>
        <TooltipContent>Go there</TooltipContent>
      </Tooltip>,
    );
    const trigger = screen.getByTestId("touch-trigger");
    fireEvent.pointerEnter(trigger, { pointerType: "touch" });
    fireEvent.pointerDown(trigger, { button: 0, pointerType: "touch" });
    fireEvent.click(trigger);
    expect(clicks).toBe(1);
    expect(screen.getByTestId("touch-trigger")).toBe(trigger);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("OVF-7 a tooltip on a menu's trigger: both answer on the one element", async () => {
    render(
      <DropdownMenu modal={false}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button data-testid="both">More</Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>More actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent data-testid="both-menu">
          <DropdownMenuItem>Copy</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const trigger = screen.getByTestId("both");
    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    expect(await screen.findByRole("tooltip")).toHaveTextContent("More actions");
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(screen.getByTestId("both-menu")).toBeInTheDocument();
    expect(screen.getByTestId("both")).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
  });

  it("OVF-10 a menu its owner opens is drawn once the module is here, with no intent", async () => {
    render(
      <DropdownMenu open onOpenChange={() => undefined}>
        <DropdownMenuTrigger asChild>
          <Button data-testid="owned-trigger">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="owned-menu">
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(await screen.findByTestId("owned-menu")).toBeInTheDocument();
    expect(screen.getByTestId("owned-trigger")).toHaveAttribute("aria-expanded", "true");
  });

  it("OVF-8 content that changes after the menu is real is drawn as given", () => {
    function Live({ label }: { label: string }) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testid="live-trigger">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent data-testid="live-menu">
            <DropdownMenuItem>{label}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    const { rerender } = render(<Live label="First" />);
    fireEvent.pointerDown(screen.getByTestId("live-trigger"), {
      button: 0,
      ctrlKey: false,
      pointerType: "mouse",
    });
    expect(screen.getByTestId("live-menu")).toHaveTextContent("First");
    rerender(<Live label="Second" />);
    expect(screen.getByTestId("live-menu")).toHaveTextContent("Second");
  });
});
FILE-END src/components/ui/overlay-facade.test.tsx
D3. NEW src/components/ui/overlay-facade-failure.test.tsx (sha256 80c07a557f5b9fd21a5ddcb47be5efcf79f8e47018323c939a569bfcc4a1529e):
FILE-BEGIN src/components/ui/overlay-facade-failure.test.tsx
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { OverlaysImpl } from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31) — a failed download of the overlay module leaves
 * the closed trigger as it was (no half-open menu, no crash) and the next press
 * asks again. The loader is replaced here so the test decides when the module
 * arrives or fails; overlay-loader.ts's own warning is its loadOnce's.
 */
const state = vi.hoisted(() => ({
  impl: null as OverlaysImpl | null,
  listeners: new Set<() => void>(),
  next: [] as Array<"fail" | "arrive">,
  asked: 0,
}));

vi.mock("./overlay-loader", async () => {
  const React = await import("react");
  const real = await vi.importActual<typeof import("./overlays-impl")>("./overlays-impl");
  return {
    loadOverlays: () => {
      state.asked += 1;
      const outcome = state.next.shift() ?? "arrive";
      if (outcome === "fail") return Promise.reject(new Error("offline"));
      state.impl = real as unknown as OverlaysImpl;
      for (const listener of state.listeners) listener();
      return Promise.resolve(state.impl);
    },
    useOverlays: () =>
      React.useSyncExternalStore(
        (listener: () => void) => {
          state.listeners.add(listener);
          return () => state.listeners.delete(listener);
        },
        () => state.impl,
        () => null,
      ),
    warmOverlaysWhenIdle: () => undefined,
  };
});

const { Button } = await import("./button");
const { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } =
  await import("./dropdown-menu");

describe("the overlay facades when the module fails to arrive (DEC-259)", () => {
  it("OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-testid="trigger">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="menu">
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const trigger = screen.getByTestId("trigger");
    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    expect(state.asked).toBe(1);
    expect(screen.queryByTestId("menu")).toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");

    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("trigger")).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
FILE-END src/components/ui/overlay-facade-failure.test.tsx
D4. NEW scripts/conformance/overlays.test.ts (sha256 3f0f104184e85240bef9f0639005b6ec47ff5ce8ab03e12fcfc55cc27122214c):
FILE-BEGIN scripts/conformance/overlays.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { ownValue } from "../../src/lib/own-key";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

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
type Finding = { file: string; line: number; what: string };

/** The specifiers the census watches. */
const WATCHED =
  /^(?:@radix-ui\/react-tooltip|@radix-ui\/react-dropdown-menu|(?:@\/components\/ui\/|\.{1,2}\/(?:[\w.-]+\/)*)(?:tooltip-impl|dropdown-menu-impl|overlays-impl))$/;

/** The one file allowed to reach each watched module (an impl file by its base name). */
export const MAY_REACH: Record<string, string> = {
  "@radix-ui/react-tooltip": "src/components/ui/tooltip-impl.tsx",
  "@radix-ui/react-dropdown-menu": "src/components/ui/dropdown-menu-impl.tsx",
  "./tooltip-impl": "src/components/ui/overlays-impl.ts",
  "./dropdown-menu-impl": "src/components/ui/overlays-impl.ts",
  "./overlays-impl": "src/components/ui/overlay-loader.ts",
};

function typeOnlyImport(node: ts.ImportDeclaration): boolean {
  const clause = node.importClause;
  if (clause === undefined) return false;
  if (clause.isTypeOnly) return true;
  const named = clause.namedBindings;
  return (
    clause.name === undefined &&
    named !== undefined &&
    ts.isNamedImports(named) &&
    named.elements.length > 0 &&
    named.elements.every((element) => element.isTypeOnly)
  );
}

/** Every value reach of a watched specifier from a file it is not allowed from. */
export function overlayReaches(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    visitTs(file, (node, source) => {
      let specifier: ts.Expression | undefined;
      if (ts.isImportDeclaration(node) && !typeOnlyImport(node)) specifier = node.moduleSpecifier;
      else if (ts.isExportDeclaration(node) && !node.isTypeOnly) specifier = node.moduleSpecifier;
      else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword)
        specifier = node.arguments[0];
      if (specifier === undefined || !ts.isStringLiteral(specifier)) return;
      const text = specifier.text;
      if (!WATCHED.test(text)) return;
      const key = text.startsWith("@radix-ui/") ? text : `./${text.split("/").pop()}`;
      const allowed = ownValue(MAY_REACH, key);
      if (allowed === name) return;
      found.push({
        file: name,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `reaches ${text} by value; only ${allowed ?? "no file"} may (DEC-259)`,
      });
    });
  }
  return found;
}

/** The names a module exports through `export { … }` lists. */
export function exportedNames(file: string): string[] {
  const names: string[] = [];
  visitTs(file, (node) => {
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier === undefined &&
      node.exportClause !== undefined &&
      ts.isNamedExports(node.exportClause)
    )
      for (const element of node.exportClause.elements) names.push(element.name.text);
  });
  return names.sort();
}

const ROOT = process.cwd();

describe("the overlay primitives on demand (DEC-259)", () => {
  it(
    "CF-OV-1 only the impl files reach Radix's tooltip and menu, only overlays-impl reaches the impl files, only the loader reaches overlays-impl",
    () => {
      const files = walkFiles(["src", "e2e", "scripts"], { ext: ["ts", "tsx", "mts", "mjs"] }).map(
        (file) => join(ROOT, file),
      );
      console.log(`[CF-OV-1] files read: ${files.length}`);
      expect(files.length).toBeGreaterThanOrEqual(500);
      expect(report(overlayReaches(files, ROOT))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-OV-2 planted: a direct Radix import and a static import of an impl file fail; type-only reaches pass", () => {
    const dir = join(ROOT, "node_modules/.cache/overlays-census");
    mkdirSync(join(dir, "src/components/ui"), { recursive: true });
    mkdirSync(join(dir, "src/features"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/features/bad.tsx"),
        'import * as T from "@radix-ui/react-tooltip";\nimport { DropdownMenuItem } from "@/components/ui/dropdown-menu-impl";\nexport * from "../components/ui/overlays-impl";\n',
      );
      writeFileSync(
        join(dir, "src/features/good.tsx"),
        'import type * as Impl from "@/components/ui/tooltip-impl";\nimport { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";\nexport type I = typeof import("../components/ui/overlays-impl");\n',
      );
      writeFileSync(
        join(dir, "src/components/ui/overlay-loader.ts"),
        'const m = loadOnce(() => import("./overlays-impl"));\n',
      );
      const files = walkFiles([join(dir, "src")], { ext: ["ts", "tsx"] });
      expect(report(overlayReaches(files, dir))).toBe(
        [
          "src/features/bad.tsx:1 reaches @radix-ui/react-tooltip by value; only src/components/ui/tooltip-impl.tsx may (DEC-259)",
          "src/features/bad.tsx:2 reaches @/components/ui/dropdown-menu-impl by value; only src/components/ui/overlays-impl.ts may (DEC-259)",
          "src/features/bad.tsx:3 reaches ../components/ui/overlays-impl by value; only src/components/ui/overlay-loader.ts may (DEC-259)",
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-OV-3 each facade exports exactly the names its impl file exports", () => {
    expect(exportedNames("src/components/ui/tooltip.tsx")).toEqual(
      exportedNames("src/components/ui/tooltip-impl.tsx"),
    );
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toEqual(
      exportedNames("src/components/ui/dropdown-menu-impl.tsx"),
    );
    expect(exportedNames("src/components/ui/tooltip.tsx")).toHaveLength(4);
    expect(exportedNames("src/components/ui/dropdown-menu.tsx")).toHaveLength(15);
  });
});
FILE-END scripts/conformance/overlays.test.ts
src/components/shell/row-actions.test.tsx, this edit (the fade-out rule's file):
EDIT src/components/shell/row-actions.test.tsx #1
OLD-BEGIN
    // overrides the shared menu's fade-out (src/components/ui/dropdown-menu.tsx).
OLD-END
NEW-BEGIN
    // overrides the shared menu's fade-out (src/components/ui/dropdown-menu-impl.tsx).
NEW-END
D5. The planted proof (never saved): add the line `import { Tooltip as PlantedTooltip } from "@/components/ui/tooltip-impl";` as the first line of src/components/shell/table-actions.tsx; run `bunx vitest run scripts/conformance/overlays.test.ts -t "CF-OV-1"` — it must fail naming exactly `src/components/shell/table-actions.tsx:1 reaches @/components/ui/tooltip-impl by value; only src/components/ui/overlays-impl.ts may (DEC-259)`; paste that line; put the file back and check its sha256 against BASE's (0d37e9d361f1dbcf33c7a50d9d8f1c9359ecdde46ffb8fa37a5c75724c7c1b2a).

PART E — THE FIRST-PAINT GUARDS.
E1. scripts/check-marketplace-imports.mjs, these edits (the two Radix packages never reach the first paint; side-effect imports are followed — a planted `import "x"` passed it before):
EDIT scripts/check-marketplace-imports.mjs #1
OLD-BEGIN
  "qrcode-generator",
];
OLD-END
NEW-BEGIN
  "qrcode-generator",
  // Foundations turn 31 (DEC-259) — the overlay primitives load on demand (src/components/ui/overlay-loader.ts).
  "@radix-ui/react-tooltip",
  "@radix-ui/react-dropdown-menu",
];
NEW-END
EDIT scripts/check-marketplace-imports.mjs #2
OLD-BEGIN

const IMPORT_FROM = /^\s*import\s(?!type\b)[^;]*?from\s+["']([^"']+)["']/gm;
const EXPORT_FROM = /^\s*export\s(?!type\b)[^;]*?from\s+["']([^"']+)["']/gm;
OLD-END
NEW-BEGIN

const IMPORT_FROM = /^\s*import\s(?!type\b)(?:[^;"']*?from\s+)?["']([^"']+)["']/gm;
const EXPORT_FROM = /^\s*export\s(?!type\b)[^;]*?from\s+["']([^"']+)["']/gm;
NEW-END
Proof (never saved): add the line `import "@/components/ui/tooltip-impl";` as the first line of src/components/app-shell.tsx and run `node scripts/check-marketplace-imports.mjs` — it must print `findings: 1` and `  src/components/ui/tooltip-impl.tsx imports @radix-ui/react-tooltip`; paste both; put the file back and check its sha256 against BASE's (e012aa149cee50292b97c1d70144f67824fb41036c9cefec0dcd894d9d8cab16); the guard then prints `findings: 0`.
E2. scripts/bundle-closure.mjs, these edits (the overlay chunk on no first download):
EDIT scripts/bundle-closure.mjs #1
OLD-BEGIN
 */
export const MUST_STAY_LAZY = ["reader-failure", "legal-page-data", "zod", "posting-service"];

OLD-END
NEW-BEGIN
 */
export const MUST_STAY_LAZY = [
  "reader-failure",
  "legal-page-data",
  "zod",
  "posting-service",
  // Foundations turn 31 (DEC-259) — the tooltip's and the menu's code arrives on demand.
  "overlays-impl",
];

NEW-END
EDIT scripts/bundle-closure.mjs #2
OLD-BEGIN
  "am-admin",
];
OLD-END
NEW-BEGIN
  "am-admin",
  "overlays-impl",
];
NEW-END
scripts/bundle-closure.test.ts, this edit:
EDIT scripts/bundle-closure.test.ts #1
OLD-BEGIN
    for (const prefix of ["category-glyphs", "date-calendar", "leaflet", "zod"]) {
OLD-END
NEW-BEGIN
    for (const prefix of ["category-glyphs", "date-calendar", "leaflet", "zod", "overlays-impl"]) {
NEW-END
E3. scripts/check-bundle-size.mjs, this edit (the entry's ceiling 284 → 263):
EDIT scripts/check-bundle-size.mjs #1
OLD-BEGIN
  js: 284,
OLD-END
NEW-BEGIN
  // DEC-259 (Foundations turn 31, 2026-10-25): the tooltip's and the dropdown menu's code left it (280.2 → 260.0 measured); the ceiling follows to 263.
  js: 263,
NEW-END
E4. scripts/route-budgets.mjs, replaced whole by this text (every page's line re-measured; none rises) (sha256 c6861f25438c14a5f70c634d7fa4fef364f75eebaf7be6e4ca3036426e5300f8):
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
 * why. Measured 2026-10-25 on the Foundations turn 31 build (DEC-259: the tooltip's and the
 * dropdown menu's code left every page's first download; the comment after each line). The three
 * admin pages that import the whole catalogue (/admin/listings_/$listingId, /admin/roles_/$roleId,
 * /admin/translations) carry its member part as a chunk of their own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 277, public: true }, // 273.4
  "/$name": { ceiling: 276, public: true }, // 272.1
  "/account": { ceiling: 268, public: false }, // 264.9
  "/account_/legal": { ceiling: 265, public: false }, // 261.8
  "/account_/legal_/$versionId": { ceiling: 267, public: false }, // 263.3
  "/account_/saved": { ceiling: 276, public: false }, // 272.2
  "/admin": { ceiling: 264, public: false }, // 260.9
  "/admin/": { ceiling: 265, public: false }, // 261.8
  "/admin/ai": { ceiling: 327, public: false }, // 323.4
  "/admin/attributes": { ceiling: 343, public: false }, // 339.7
  "/admin/audit": { ceiling: 303, public: false }, // 299.8
  "/admin/categories": { ceiling: 351, public: false }, // 347.9
  "/admin/countries": { ceiling: 333, public: false }, // 329.5
  "/admin/coverage": { ceiling: 325, public: false }, // 322.0
  "/admin/images": { ceiling: 265, public: false }, // 261.6
  "/admin/impersonation_/$sessionId": { ceiling: 304, public: false }, // 300.4
  "/admin/legal": { ceiling: 279, public: false }, // 275.9
  "/admin/legal_/$versionId": { ceiling: 279, public: false }, // 275.2
  "/admin/legal_/edit": { ceiling: 286, public: false }, // 282.2
  "/admin/listings": { ceiling: 349, public: false }, // 345.1
  "/admin/listings_/$listingId": { ceiling: 377, public: false }, // 373.7
  "/admin/listings_/$listingId_/edit": { ceiling: 401, public: false }, // 397.9
  "/admin/locations": { ceiling: 272, public: false }, // 268.2
  "/admin/places": { ceiling: 334, public: false }, // 330.7
  "/admin/roles": { ceiling: 301, public: false }, // 297.9
  "/admin/roles_/$roleId": { ceiling: 308, public: false }, // 304.7
  "/admin/screening": { ceiling: 370, public: false }, // 366.1
  "/admin/translations": { ceiling: 405, public: false }, // 401.1
  "/admin/translations_/$lang": { ceiling: 317, public: false }, // 313.3
  "/admin/users": { ceiling: 300, public: false }, // 296.3
  "/admin/users_/$userId": { ceiling: 287, public: false }, // 283.2
  "/auth": { ceiling: 276, public: true }, // 272.3
  "/auth_/callback": { ceiling: 264, public: true }, // 260.9
  "/auth_/reset": { ceiling: 266, public: true }, // 262.9
  "/c/$slug": { ceiling: 277, public: true }, // 273.4
  "/dev/primitives": { ceiling: 279, public: false }, // 275.7
  "/dev/style": { ceiling: 291, public: false }, // 287.7
  "/dev/tall": { ceiling: 264, public: false }, // 260.3
  "/l/$slug": { ceiling: 303, public: true }, // 299.8
  "/legal/$kind": { ceiling: 267, public: true }, // 263.9
  "/legal/accept": { ceiling: 275, public: false }, // 271.3
  "/legal/publishing": { ceiling: 268, public: true }, // 264.6
  "/my-listings": { ceiling: 323, public: false }, // 320.0
  "/my-listings_/$listingId": { ceiling: 317, public: false }, // 314.0
  "/my-listings_/$listingId_/edit": { ceiling: 396, public: false }, // 392.7
  "/post": { ceiling: 396, public: false }, // 392.6
  "/post_/$listingId": { ceiling: 396, public: false }, // 392.6
  "/privacy": { ceiling: 267, public: true }, // 263.9
  "/settings": { ceiling: 273, public: false }, // 269.3
  "/terms": { ceiling: 267, public: true }, // 263.9
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
FILE-END scripts/route-budgets.mjs

PART F — THE BROWSER.
F1. NEW e2e/overlays.spec.ts (sha256 3686862da86d5e2160cb2e6245b02b28a8c3f3b7815180af8500d39a2b0c202d):
FILE-BEGIN e2e/overlays.spec.ts
import { expect, test } from "./fixtures";

import { gotoReady } from "./helpers/ui";

/**
 * DEC-259 (Foundations turn 31) — THE OVERLAY PRIMITIVES IN THE BROWSER. The
 * tooltip's and the dropdown menu's code (Radix, floating-ui and their layers)
 * is not on any page's first download: the browser asks for it once the page
 * has loaded and is idle, or on a trigger's first intent, and the trigger the
 * person already sees answers that intent itself. Read-only: no rows are written.
 */

/** The overlay chunk's own name in the build: overlays-impl-<hash>.js. */
const OVERLAY_CHUNK = /\/overlays-impl-[^/]+\.js$/;

test.describe("OVERLAYS — their code after the first paint (DEC-259)", () => {
  test("OVE-1 the overlay code is asked for after the page's load event, never before its first paint", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    await expect
      .poll(() =>
        page.evaluate(
          (source) =>
            performance
              .getEntriesByType("resource")
              .some((entry) => new RegExp(source).test(entry.name)),
          OVERLAY_CHUNK.source,
        ),
      )
      .toBe(true);
    const timing = await page.evaluate((source) => {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      const chunk = performance
        .getEntriesByType("resource")
        .find((entry) => new RegExp(source).test(entry.name));
      return { loadEnd: navigation.loadEventEnd, asked: chunk?.startTime ?? -1 };
    }, OVERLAY_CHUNK.source);
    expect(timing.loadEnd).toBeGreaterThan(0);
    expect(timing.asked).toBeGreaterThanOrEqual(timing.loadEnd);
  });

  test("OVE-2 the language menu's first Enter opens it on the same button with a choice focused; Escape gives the focus back", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const trigger = page.getByTestId("language-switcher");
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menu")).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(":focus")).toHaveAttribute("role", "menuitemradio");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
FILE-END e2e/overlays.spec.ts
F2. scripts/e2e-select.ts, this edit (the shared UI's area selects the new spec):
EDIT scripts/e2e-select.ts #1
OLD-BEGIN
    specs: ["e2e/house-style.spec.ts"],
OLD-END
NEW-BEGIN
    specs: ["e2e/house-style.spec.ts", "e2e/overlays.spec.ts"],
NEW-END

PART G — DOCS.
G1. docs/features/performance-strategy.md, at its end:
APPEND-BEGIN docs/features/performance-strategy.md
## 14. The overlays' code waits for the person (D234, Foundations turn 31)

DEC-259: the tooltip and the dropdown menu carried Radix, floating-ui and their focus and scroll layers on every page's first download — about 20 KiB, for controls nobody has touched yet. Their facades (`src/components/ui/tooltip.tsx`, `dropdown-menu.tsx`) keep the same exports; the Radix code (`tooltip-impl.tsx`, `dropdown-menu-impl.tsx`, moved unchanged, re-exported by `overlays-impl.ts`) arrives through `overlay-loader.ts` (loadOnce).

- The trigger is the consumer's own element from the server's first HTML, with the closed state's attributes (`data-state="closed"`; a menu's `aria-haspopup="menu"`, `aria-expanded="false"`, `type="button"`).
- A tooltip's first hover (a mouse or pen) or keyboard focus, and a menu's first press or opening key (Enter, Space, ArrowDown), ask for the module; a menu trigger's hover or focus only warms it. Once the page's load event has passed and the browser is idle, the module is asked for anyway, so the first press rarely waits.
- The real Radix root is drawn beside the trigger, never around it: its trigger renders a collector that hands its props (handlers, aria, data-state, the ref the popper anchors to) to the facade trigger, which puts them on the same element. Nothing is remounted — focus, hover and a press in progress survive — and the first intent is replayed once on that element, so a keyboard opening still focuses the first item.
- A failed download leaves the closed trigger and logs `[overlays] loading the overlay primitives failed`; the next intent asks again.
- The supervisor's build: the entry 280.2 → 260.0 KiB; every page 10–20 KiB lighter (the home page 293.7 → 273.4). The lab (slow 4G constants off; local server): the module asked about 190 ms after the load event; a first press, a first Enter and a first hover each answered on the same element.

Next: the shell's Radix dialog (the phone rail's sheet in app-rail.tsx, the toolbar panel in toolbar-panel.tsx, each importing @radix-ui/react-dialog directly) still rides the entry; the same three parts take it — one more impl file and facade.
APPEND-END docs/features/performance-strategy.md
G2. docs/governance/mechanisms.md: directly after the line that begins "| 47 |", this line:
| 48 | An overlay primitive's code (the tooltip, the dropdown menu: Radix, floating-ui and their layers) waits for the person's intent and never rides a page's first download (D234, DEC-259) | the facades `src/components/ui/tooltip.tsx` and `dropdown-menu.tsx` (the impls' exports) on `OverlayRoot` / `OverlayTrigger` / `OverlayContent` (`src/components/ui/overlay-facade.tsx`); the module `overlays-impl.ts` (re-exports `tooltip-impl.tsx`, `dropdown-menu-impl.tsx`) behind `loadOverlays` / `useOverlays` / `warmOverlaysWhenIdle` (`src/components/ui/overlay-loader.ts`, loadOnce) — the trigger is the consumer's own element from the first render; the real root draws beside it on the first hover or keyboard focus (a tooltip) or press or opening key (a menu), or once the page is idle, and the intent is replayed on the same element | `scripts/conformance/overlays.test.ts` (CF-OV-1…3: only the impl files reach the two Radix packages, only overlays-impl the impl files, only the loader overlays-impl; each facade exports its impl's names); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY (`overlays-impl`); the weight guard's FORBIDDEN; OVF-1…10; `e2e/overlays.spec.ts` (OVE-1, OVE-2) | none | a new overlay primitive (the dialog, the popover, the select) is one impl file re-exported by overlays-impl and one facade over the same three parts; an owner-opened root (`open`, `defaultOpen`) is asked for at once | triggers are asChild only (the types say so); the shell's Radix dialog still rides the entry (K2 → the next speed turn); Foundations turn 31 |
and directly after the line that begins "- Allowlists: rows 2 and 8", this line:
- Weight: `scripts/check-marketplace-imports.mjs` has no self-test (a planted heavy import is proven by hand; it skipped side-effect imports until Foundations turn 31) — owes a SELF_TEST mode with a bad and a good fixture (row 40).
G3. docs/features/ci-guards.md, at its end:
APPEND-BEGIN docs/features/ci-guards.md
## DEC-259 — the overlay census; the first-paint ceiling at 263 KiB

`scripts/conformance/overlays.test.ts`: CF-OV-1 reads every file under src/, e2e/ and scripts/ — only `src/components/ui/tooltip-impl.tsx` and `dropdown-menu-impl.tsx` reach `@radix-ui/react-tooltip` and `@radix-ui/react-dropdown-menu` by value, only `overlays-impl.ts` reaches the impl files, only `overlay-loader.ts` reaches `overlays-impl.ts` (a type-only import passes); CF-OV-2 proves it on a planted tree (a direct Radix import, a static impl import and a re-export each fail); CF-OV-3 pins each facade's exports to its impl's.

The weight guard (`scripts/check-marketplace-imports.mjs`) gains the two Radix packages in FORBIDDEN and now follows side-effect imports (`import "x"`), which it skipped before (a planted `import "@/components/ui/tooltip-impl"` passed it). MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY gain `overlays-impl`. The entry's ceiling falls 284 → 263 KiB (260.0 measured); every page's line is re-measured, none rising.
APPEND-END docs/features/ci-guards.md
G4. docs/features/display-primitives.md, this edit (the on-demand rule beside the tooltip rule):
EDIT docs/features/display-primitives.md #1
OLD-BEGIN
  a provider at its root.

OLD-END
NEW-BEGIN
  a provider at its root.
- THE ON-DEMAND RULE (DEC-259, `src/components/ui/overlay-facade.tsx`): Tooltip
  and DropdownMenu are facades. Their triggers are always `asChild` (the types
  require it) and are the consumer's own element from the first render; the
  Radix code arrives on the first hover or keyboard focus (a tooltip), the
  first press or opening key (a menu), or once the page is idle; a part drawn
  inside the content exists only once the real content is drawn. Nothing
  imports `@radix-ui/react-tooltip`, `@radix-ui/react-dropdown-menu` or the
  `*-impl` files but the overlay files themselves (CF-OV-1).

NEW-END
G5. docs/_changelog.md, this edit (turn 30's entry back into the file's one-item shape, and turn 31's):
EDIT docs/_changelog.md #1
OLD-BEGIN
## Foundations turn 30 (2026-10-25) — speed S7 (D234), DEC-258: the strings layers
OLD-END
NEW-BEGIN
- Foundations turn 30 (2026-10-25) — speed S7 (D234), DEC-258: the strings layers — routes declare the strings their screens show (`staticData: { strings: [...] }`) and one shell gate, StringsLayerGate, loads the admin and member layers before it draws, with the navigation's warm-up, Try again and the English part kept; catalogue entries moved unchanged (591 to member, 30 to admin); scripts/conformance/strings-layers.ts replaces the admin-only judge; the first-download ceilings re-measured; INC-904 (AP-54 judges its own navigation's HTML); `src/i18n/locales/admin-layer.test.ts` and `src/i18n/compiled-admin-loader.test.ts` retired (declared in turn 31 — INC-905). No migration, new string or package change; INC-902 and INC-903 stay open.
NEW-END
EDIT docs/_changelog.md #2
OLD-BEGIN
- Routes declare the strings their screens show; one shell gate loads admin/member layers before drawing them, with navigation warm-up, retry and kept English fallback.
- Catalogue entries moved unchanged: 591 to member, 30 to admin; the census replaces the admin-only judge and first-download ceilings follow the supervisor's measurements.
- INC-904: AP-54 checks its own navigation's HTML, not another server render. Retired `src/i18n/locales/admin-layer.test.ts` and `src/i18n/compiled-admin-loader.test.ts`; their replacement proofs are the strings-layers census and compiled-layer-loader tests.
- No migration, new strings or package change. Whole-catalogue admin imports (INC-902) and unused keys (INC-903) remain outside scope.
OLD-END
NEW-BEGIN
- Foundations turn 31 (2026-10-25) — speed S8 (D234), DEC-259: the overlays' code on demand — the tooltip and the dropdown menu are facades (src/components/ui/tooltip.tsx, dropdown-menu.tsx, same exports) over OverlayRoot / OverlayTrigger / OverlayContent (overlay-facade.tsx); the Radix code (tooltip-impl.tsx, dropdown-menu-impl.tsx, moved unchanged; overlays-impl.ts) arrives through overlay-loader.ts on a trigger's first hover, focus, press or opening key, or once the page has loaded and is idle; the trigger is the consumer's own element throughout and the first intent is replayed on it; the entry 280.2 → 260.0 KiB, every page 10–20 KiB lighter; CF-OV-1…3, OVF-1…10, OVE-1/2; the weight guard follows side-effect imports; INC-905 (the two turn-30 deletions declared). No migration, new string or package change.
NEW-END
At the end, roadmap.md's turn-31 line `[x]` with the final HEAD and the unit totals appended.
G6. AGENTS.md: directly after the line that begins "- Strings (DEC-258):", add exactly this one line (AGENTS.md then counts 7527 bytes by `wc -c AGENTS.md`):
- Overlays (DEC-259): Tooltip and DropdownMenu (src/components/ui/tooltip.tsx, dropdown-menu.tsx) are facades over overlay-facade.tsx; their Radix code (tooltip-impl.tsx, dropdown-menu-impl.tsx, re-exported by overlays-impl.ts) arrives on demand through overlay-loader.ts; their triggers are always asChild; nothing else imports @radix-ui/react-tooltip, @radix-ui/react-dropdown-menu or the two impl files; scripts/conformance/overlays.test.ts judges.
G7. `bun run i18n:usage` (expected: 1736 keys across 582 files (395 dynamic call sites) — five new src files raise the scanned count) and `bun run i18n:map-guard` ("usage maps match the tree").

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these files, which then print exactly:
a17824b52d975db18205e1af631675c66b7fea98ba4daff8e6d644f2db87198c  docs/tracking/intentional-deletions.txt
810b2317bb727b96f19eb9e56e6d593dd7a75cdb6df8ed6f4aa5d1b9b5325209  src/test/setup.ts
de6d5f7306ee4ce680684c8e9e434fb6f956f8bd55622e8c1d706af5fd1c7e93  src/components/shell/row-actions.test.tsx
1f56529ad74ce21fceec373a61579071aae1bae102f1c7b45af420317477a44f  scripts/check-marketplace-imports.mjs
55ad25e7d4a01ea19fc8083a7e7652b2f73a7893c434d213d25a627739047943  scripts/bundle-closure.mjs
4a8deaed5e137620e8bb37eec697a58136e704727d3276a4e39e8b079622a64a  scripts/bundle-closure.test.ts
eba51bdec8d2bfe61d36ef5088910ead646b8104c0cb13ee5564cb06b156c683  scripts/check-bundle-size.mjs
d3056f90e73c97be24a42584b93d58845a4586ada8ec02ac662108f505c27889  scripts/e2e-select.ts
5923adda057460ba7d6ca49de01690c43abeeb757d5e488c7b0cb17c7e02db6e  docs/features/performance-strategy.md
5b0580c5b8fd54ef1c66f74d1ca1915aa71d83a681324ff52cb7cb48c9865bcf  docs/features/ci-guards.md
3930b021b6315660cb39af24f320ade43bcc29a18a4911689a2cf0b321056cc6  docs/features/display-primitives.md
b03cf74f3b4051b52fc653299e51c383860e94046a96b96cf7dfb0c060ea304c  docs/_changelog.md
52277dc31595d0d9a944ddf8bf524c321f0ffae9f01c64fccfa10f424f3e41e4  AGENTS.md
b97d82a2003918dbe9414a23dadc6af801cac555c9acda05e482f59adc0c2266  docs/governance/mechanisms.md
(a difference is fixed by re-copying, never by editing the expectation); `git diff <START> --stat -- src/components/language-switcher.tsx src/components/shell src/components/marketplace src/routes src/components/ui/icon-button.tsx src/components/ui/sidebar.tsx` (it lists src/components/shell/row-actions.test.tsx alone: no consumer changes); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 303 files, 1888 tests); `bunx vitest run scripts/conformance/overlays.test.ts src/components/ui/overlay-facade.test.tsx src/components/ui/overlay-facade-failure.test.tsx scripts/bundle-closure.test.ts --reporter=verbose` (paste the CF-OV-, OVF- and BC-12 lines: 3 + 10 + 1, every one passed); /tmp/observability/build-errors.log read; `node scripts/check-marketplace-imports.mjs` (findings: 0); `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run scripts/e2e-select.ts --self-test` (OK); `bun run format:check` last.

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/overlays.spec.ts whole; e2e/house-style.spec.ts whole (HS-3: the row actions' tooltip on focus, the menu, the focus back); e2e/shell.spec.ts `--grep "language toggle renders Amharic|the rail collapses to icons|FV-2 |the desktop rail switcher NAVIGATES"`; e2e/auth-signout.spec.ts `--grep "SO-1 |SO-2 "` (the account menu); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-31.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; every sha256 line of THE CHECKS; D5's and E1's red lines; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```

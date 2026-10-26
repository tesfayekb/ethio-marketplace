# Foundations — turn 34b-2: a piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the mechanism, its guard, resilientLazy, the overlays, the step-up gate and the sign-in screen's words (INC-911, INC-918): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34b-2 (2026-10-26; DEC-237; INC-911 from turn 32b's reviewer; INC-918 measured by the supervisor; anchors located at 3d699f4a4d637292e94ad5e50f9f78e8daaa9f21). This brief replaces the one sent at 10:20 Atlanta, which stopped before STEP 0 (docs/governance/reports/foundations-turn-34b-2.stop-1.md): BLOCK 7's notice is now built from `CARD_SURFACE` (src/components/layout/surface.ts), with no 1-px border — the shell's card rule. The second of turn 34b's three parts: this one builds the mechanism and its guard and moves the consumers that share its code onto it (resilientLazy's components, the overlay facades and the step-up gate, the sign-in screen's words); 34b-3 moves the other ten, whose allowlist lines expire with INC-911. Tier A (the step-up gate and the sign-in screen are auth surfaces). No migration. Two new strings (listed below, English and Amharic). No package change. AGENTS.md: one new line (F3). No file deleted. Base: dev 3d699f4a4d637292e94ad5e50f9f78e8daaa9f21. The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the mechanism; D — the consumers that share its code; E — the browser; F — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 3d699f4a4d637292e94ad5e50f9f78e8daaa9f21
FLAGS: no-migration, no-package-change
SCOPE-BEGIN
AGENTS.md
e2e/helpers/on-demand.ts
e2e/on-demand-failure.spec.ts
e2e/supabase-door.spec.ts
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/on-demand-failure.test.ts
scripts/e2e-select.ts
src/components/app-shell.tsx
src/components/shell/on-demand-notice.test.tsx
src/components/shell/on-demand-notice.tsx
src/components/ui/alert-dialog-primitive.tsx
src/components/ui/dialog-primitive.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/ui/overlay-facade.tsx
src/components/ui/overlay-loader.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-service.ts
src/features/auth/mfa/step-up-gate.test.tsx
src/features/auth/mfa/step-up-gate.tsx
src/features/auth/mfa/use-step-up.ts
src/features/posting/step-where.tsx
src/i18n/locales/am-base.ts
src/i18n/locales/en-base.ts
src/lib/on-demand-failure.test.ts
src/lib/on-demand-failure.ts
src/lib/resilient-lazy.test.tsx
src/lib/resilient-lazy.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a piece of the app fetched on demand (a menu's or a dialog's code, the maps, the phone library, the calendar, the category glyphs, the sign-in code, a language's strings) whose download fails tells the person, and offers the one cure, a refresh — never silence, never a crashed page, never a "Try again" that cannot work. The browser keeps a failed module download for the page's life (Chromium, measured by the supervisor 2026-10-26: a second import() of the same address fails at once without asking the server — INC-918), so asking again cannot help; refreshing the page can.
MECHANISM: NONE YET — built in Part C: src/lib/on-demand-failure.ts (`reportOnDemandFailure(label, error)` logs one `[client-error] <label> failed to load: <cause>` line and raises the count the shell's notice reads; `useOnDemandFailures()`; `refreshPage()`), src/components/shell/on-demand-notice.tsx (`OnDemandNotice`, the shell's ONE notice — a polite live region above the phone's bottom bar, `common.loadFailed` with Refresh and Close, shown again by a later failure; `LoadFailedHere`, the same words and Refresh in a piece's own place, role=alert). resilientLazy (src/lib/resilient-lazy.ts) reports for every component it fetches, unless `{ inPlace: true }` says its fallback says so itself. The reload for a stale chunk (src/lib/stale-chunk.ts, INC-640) stays the first answer, at a page's first failure only (turn 34b-1, INC-922).
CONSUMERS (the supervisor's census at BASE — every caller of a loader the definers export, or of `.load()` on a same-file loadOnce; the conformance test reproduces it, 15 files; and every component resilientLazy fetches):
- moved here — src/components/ui/overlay-facade.tsx :127 (a menu's intent dropped silently; a modal's owner told only "closed" → report; `onUnavailable` for an owner that must tell "could not open" from "closed"), with the dialog primitives (dialog-primitive.tsx, alert-dialog-primitive.tsx: `onUnavailable` passes through), the step-up gate (src/features/auth/mfa/step-up-gate.tsx :45-:47, use-step-up.ts :75, :89 — it rejected a dialog that could not open as StepUpCancelled → StepUpUnavailable through `onUnavailable`: INC-911's first instance); every resilientLazy component through the definer — src/components/shell/breadcrumbs.tsx :49-:78 (six crumbs), src/features/posting/step-where.tsx :53 (the map preview) and :58 (the pin map: `inPlace`, its fallback LoadFailedHere instead of a "Try again" that reloaded), src/features/posting/preview/listing-detail.tsx :48, :53 (the ad page's maps); src/features/auth/auth-service.ts — its actions' answer for a failed client download becomes `common.loadFailed` (it was `auth.errorGeneric`), which the sign-in screen shows in its own alert (INC-915: an in-place answer, allowlisted for good).
- allowlisted for good (BLOCK 2's first four lines) — src/components/app-shell.tsx :786 (the E2E hand-off, isE2E, DEC-018); src/features/auth/auth-service.ts :43 (above); src/routes/auth.tsx :130 (the client's head start: each submit asks through auth-service); src/routes/legal.publishing.tsx :51 (a route loader's door: the route's error screen).
- LEFT to turn 34b-3 (BLOCK 2's other ten lines, each `until INC-911`) — src/components/shell/date-field.tsx :49; src/components/shell/use-category-glyphs.ts :39; src/features/auth/use-auth.ts :71; src/features/posting/map/map-large.tsx :41; src/features/posting/map/map-pin-dropper.tsx :191; src/features/posting/map/map-preview.tsx :74; src/features/posting/preview/listing-detail.tsx :49 (the map's links); src/features/posting/step-who.tsx :210; src/i18n/provider.tsx :594 (INC-919); src/routes/settings.tsx :173; with the strings gate (src/components/shell/strings-layer-gate.tsx) and INC-909.
COVERED HERE: the mechanism, its guard, and the consumers that share its code. LEFT: the ten above, named by the guard until turn 34b-3 retires their lines.
CONFORMANCE GUARD: scripts/conformance/on-demand-failure.test.ts (BLOCK 1) — ODC-1: every consumer answers through the mechanism (a reference to `reportOnDemandFailure`, `refreshPage` or `LoadFailedHere` imported from it — importing the notice to draw it answers nothing) or carries a line in scripts/conformance/on-demand-failure-allowlist.txt (BLOCK 2, `file | reason | until`); ODC-2: planted callers — a silent one, an exported loadOnce (its callers would escape the census), a drawing-only importer — reported, a user passed; ODC-3: resilientLazy reports, and every named loader exists over a loadOnce. Red on BASE: ODC-1 names src/components/ui/overlay-facade.tsx :127, ODC-3 resilientLazy (Part B). In the browser: e2e/on-demand-failure.spec.ts ODE-1 (BLOCK 5).
EXCEPTIONS: BLOCK 2's first four lines (above), each with its reason and an expiry.
FIVE LENSES — security: no new surface; the notice carries no detail of the failure (the cause goes to the console line only); the step-up gate refuses the guarded action either way · performance: the entry grows by the notice and the reporter, about 1.2 KiB (the supervisor's build of the whole of turn 34b: 204.1 → 205.3 KiB of 207); nothing is fetched to show it · failure modes: the subject; a failed download is answered once in the shell or once in place, never both; the stale-chunk reload answers only a page's first failure · consistency: the notice is a shell card (`CARD_SURFACE`, no 1-px border); one log line, one notice, one in-place piece, one set of words (`common.loadFailed`, `common.refreshPage`) for every on-demand piece, the sign-in screen's included · future growth: a new loader joins the definers and its callers are enumerated by themselves; a new piece answers with one call or one element; the words are keys in every language.
FORWARD-SCAN: turns 35–37 move more modules behind the door and onto on-demand loads — each new caller is named by ODC-1 the day it lands. REGISTER: row 52 added (Part F); row 48's note gains "and the person, through row 52".

THE STRINGS (G43 — the supervisor read each one; your report repeats them key by key):
- NEW common.loadFailed — en "Part of this page didn't load. Check your connection, then refresh the page." — am «የዚህ ገጽ ክፍል አልተጫነም። ግንኙነትዎን ይፈትሹና ገጹን ያድሱ።» (built from the app's own error.pageFailed «ይህ ገጽ አልተጫነም» and feed.errorBody «ግንኙነትዎን ይፈትሹና …»).
- NEW common.refreshPage — en "Refresh page" — am «ገጹን ያድሱ».

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34b-2.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part F only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–F; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. ODE-1 reads the home page as a signed-out visitor (no rows).
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34b-2.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. docs/generated/i18n-usage.json and public/i18n-usage.json are regenerated (`bun run i18n:usage`), never edited. No NEW or FILE block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34b-2.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md, docs/features/e2e-harness.md, docs/generated/i18n-usage.json, public/i18n-usage.json and docs/governance/reports/foundations-turn-34b-2.report.md (your completion report). src/integrations/supabase/** (platform-generated) is never edited. Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After each part from C on, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows ODC-1, ODC-3, OVF-9, OVF-16, OVF-20, ASC-1, ASC-3 and SUG-1 failing on BASE's code, and RLZ's file failing to load the mechanism, before Part C's edits. New behaviour without a red run: ODF-1/2, ODN-1, ODE-1. SBE-4/5 change their expected words with the strings; ASC-1 is their red.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1 and CF-SL-1 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407).
- Behaviour contract: with every download succeeding, every page, menu, dialog, map, crumb and sign-in screen behaves as today and the notice never shows. Changed: a failed download of a menu's or a dialog's code, of a crumb or of a map is said once in the shell's notice, with Refresh and Close; the pin map's own place says so with Refresh; the step-up gate answers StepUpUnavailable for a dialog that could not open; the sign-in screen's alert for a failed client download reads `common.loadFailed`. The ten consumers left to turn 34b-3 behave as today. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every caller of an on-demand loader that is not on the mechanism (none may remain without an allowlist line), every in-place "didn't load" message not drawn by LoadFailedHere, and every "Try again" or retry still offered for a failed download (the ten left to 34b-3 are expected); K3 the guard lands with the mechanism; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; the existing tests unchanged but for the words ASC-1, ASC-3, SBE-4 and SBE-5 expect.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE, the stop report's commit after turn 34b-1's green landing — green, or still running). A red on BASE is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The census and its allowlist — BLOCK 1 (scripts/conformance/on-demand-failure.test.ts) and BLOCK 2 (scripts/conformance/on-demand-failure-allowlist.txt); the step-up gate's test — BLOCK 3 (src/features/auth/mfa/step-up-gate.test.tsx); and these edits:
EDIT src/lib/resilient-lazy.test.tsx #1
OLD-BEGIN
import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";

import { resilientLazy } from "./resilient-lazy";

/** D234 speed turn S3 (INC-897) — a component fetched on demand never breaks the page. */
function Piece({ name }: { name: string }) {
  return <p data-testid="piece">{name}</p>;
OLD-END
NEW-BEGIN
import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";

import { reportOnDemandFailure } from "./on-demand-failure";
import { resilientLazy } from "./resilient-lazy";

vi.mock("./on-demand-failure", () => ({ reportOnDemandFailure: vi.fn() }));

/** D234 speed turn S3 (INC-897) — a component fetched on demand never breaks the page. */
function Piece({ name }: { name: string }) {
  return <p data-testid="piece">{name}</p>;
NEW-END
EDIT src/lib/resilient-lazy.test.tsx #2
OLD-BEGIN
    expect((await screen.findByTestId("piece")).textContent).toBe("hello");
  });

  it("RLZ-2 a failed download renders the fallback and logs once — never the error boundary", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const Lazy = resilientLazy<{ name: string }>(
      () => Promise.reject(new Error("offline")),
      "the piece",
      Fallback,
    );
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
OLD-END
NEW-BEGIN
    expect((await screen.findByTestId("piece")).textContent).toBe("hello");
  });

  it("RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary", async () => {
    vi.mocked(reportOnDemandFailure).mockClear();
    const failure = new Error("offline");
    const Lazy = resilientLazy<{ name: string }>(
      () => Promise.reject(failure),
      "the piece",
      Fallback,
    );
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
        <Lazy name="hello" />
      </Suspense>,
    );
    expect(await screen.findByTestId("piece-fallback")).toBeTruthy();
    expect(screen.queryByTestId("piece")).toBeNull();
    expect(vi.mocked(reportOnDemandFailure).mock.calls).toEqual([["the piece", failure]]);
  });

  it("RLZ-3 INC-911 — a fallback that says so in place (inPlace) is logged, not reported", async () => {
    vi.mocked(reportOnDemandFailure).mockClear();
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const Lazy = resilientLazy<{ name: string }>(
      () => Promise.reject(new Error("offline")),
      "the piece",
      Fallback,
      { inPlace: true },
    );
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
NEW-END
EDIT src/lib/resilient-lazy.test.tsx #3
OLD-BEGIN
      </Suspense>,
    );
    expect(await screen.findByTestId("piece-fallback")).toBeTruthy();
    expect(screen.queryByTestId("piece")).toBeNull();
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the piece failed to load",
      expect.anything(),
OLD-END
NEW-BEGIN
      </Suspense>,
    );
    expect(await screen.findByTestId("piece-fallback")).toBeTruthy();
    expect(reportOnDemandFailure).not.toHaveBeenCalled();
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the piece failed to load",
      expect.anything(),
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #1
OLD-BEGIN
 * no crash) and the next press asks again. The loader is replaced here so the test decides when the module
 * arrives or fails; overlay-loader.ts's own warning is its loadOnce's.
 */
const state = vi.hoisted(() => ({
OLD-END
NEW-BEGIN
 * no crash) and the next press asks again. The loader is replaced here so the test decides when the module
 * arrives or fails; overlay-loader.ts's own warning is its loadOnce's. INC-911 —
 * every failure is reported to the shell's notice (src/lib/on-demand-failure.ts,
 * replaced here so the test reads the reports), and a modal's owner that passes
 * `onUnavailable` hears it before the closing.
 */
const reported = vi.hoisted(() => [] as string[]);
vi.mock("@/lib/on-demand-failure", () => ({
  reportOnDemandFailure: (label: string) => {
    reported.push(label);
  },
}));
const state = vi.hoisted(() => ({
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #2
OLD-BEGIN
  it("OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu", async () => {
    state.impl = null;
OLD-END
NEW-BEGIN
  it("OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu", async () => {
    reported.length = 0;
    state.impl = null;
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #3
OLD-BEGIN
    expect(state.asked).toBe(1);
    expect(screen.queryByTestId("menu")).toBeNull();
OLD-END
NEW-BEGIN
    expect(state.asked).toBe(1);
    expect(reported).toEqual(["a menu's code"]);
    expect(screen.queryByTestId("menu")).toBeNull();
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #4
OLD-BEGIN
  it("OVF-16 a failed download keeps the closed dialog; the next click asks again and opens it", async () => {
    state.impl = null;
OLD-END
NEW-BEGIN
  it("OVF-16 a failed download keeps the closed dialog; the next click asks again and opens it", async () => {
    reported.length = 0;
    state.impl = null;
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #5
OLD-BEGIN
    expect(state.asked).toBe(1);
    expect(screen.queryByTestId("dialog")).toBeNull();
OLD-END
NEW-BEGIN
    expect(state.asked).toBe(1);
    expect(reported).toEqual(["a dialog's code"]);
    expect(screen.queryByTestId("dialog")).toBeNull();
NEW-END
EDIT src/components/ui/overlay-facade-failure.test.tsx #6
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("OVF-20 a dialog whose download fails tells an owner that asked `onUnavailable` before its closing, and reports it once (INC-911)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["fail"];
    state.asked = 0;
    const heard: string[] = [];
    function Gate() {
      const [open, setOpen] = useState(true);
      return (
        <Dialog
          open={open}
          onUnavailable={() => heard.push("unavailable")}
          onOpenChange={(next) => {
            heard.push(`open ${String(next)}`);
            setOpen(next);
          }}
        >
          <DialogContent data-testid="gate-dialog">
            <DialogTitle>Enter your code</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    await act(async () => {
      render(<Gate />);
    });
    expect(state.asked).toBe(1);
    expect(heard).toEqual(["unavailable", "open false"]);
    expect(reported).toEqual(["a dialog's code"]);
    expect(screen.queryByTestId("gate-dialog")).toBeNull();
  });
});
NEW-END
EDIT src/features/auth/auth-client.test.ts #1
OLD-BEGIN
const GENERIC = { ok: false, errorKey: "auth.errorGeneric" };
OLD-END
NEW-BEGIN
const LOAD_FAILED = { ok: false, errorKey: "common.loadFailed" };
NEW-END
EDIT src/features/auth/auth-client.test.ts #2
OLD-BEGIN
  signUp: GENERIC,
  signInWithPassword: GENERIC,
  signInWithGoogle: GENERIC,
  resendConfirmation: GENERIC,
  signOut: GENERIC,
  signOutOtherDevices: GENERIC,
  getIdentities: GENERIC,
  linkGoogleIdentity: GENERIC,
  unlinkProviderIdentity: GENERIC,
  changePassword: GENERIC,
  changeEmail: GENERIC,
OLD-END
NEW-BEGIN
  signUp: LOAD_FAILED,
  signInWithPassword: LOAD_FAILED,
  signInWithGoogle: LOAD_FAILED,
  resendConfirmation: LOAD_FAILED,
  signOut: LOAD_FAILED,
  signOutOtherDevices: LOAD_FAILED,
  getIdentities: LOAD_FAILED,
  linkGoogleIdentity: LOAD_FAILED,
  unlinkProviderIdentity: LOAD_FAILED,
  changePassword: LOAD_FAILED,
  changeEmail: LOAD_FAILED,
NEW-END
EDIT src/features/auth/auth-client.test.ts #3
OLD-BEGIN
  hasPassword: GENERIC,
  removeOwnPassword: GENERIC,
  requestPasswordReset: GENERIC,
  completePasswordReset: GENERIC,
OLD-END
NEW-BEGIN
  hasPassword: LOAD_FAILED,
  removeOwnPassword: LOAD_FAILED,
  requestPasswordReset: LOAD_FAILED,
  completePasswordReset: LOAD_FAILED,
NEW-END
EDIT src/features/auth/auth-client.test.ts #4
OLD-BEGIN
    expect(unloaded).toEqual(GENERIC);
OLD-END
NEW-BEGIN
    expect(unloaded).toEqual(LOAD_FAILED);
NEW-END
B2. Run `bunx vitest run scripts/conformance/on-demand-failure.test.ts src/lib/resilient-lazy.test.tsx src/components/ui/overlay-facade-failure.test.tsx src/features/auth/mfa/step-up-gate.test.tsx src/features/auth/auth-client.test.ts` — the supervisor's run on BASE: src/lib/resilient-lazy.test.tsx fails to load (`Failed to resolve import "./on-demand-failure"`), and `Tests  8 failed | 6 passed (14)`: ODC-1 (`+ src/components/ui/overlay-facade.tsx:127 calls an on-demand loader and answers its failure without the mechanism`), ODC-3 (`… to match /reportOnDemandFailure\(label, error\)/`), OVF-9 (`expected [] to deeply equal [ 'a menu\'s code' ]`), OVF-16 (`expected [] to deeply equal [ 'a dialog\'s code' ]`), OVF-20 (`expected [ 'open false' ] to deeply equal [ 'unavailable', 'open false' ]`), ASC-1 and ASC-3 (the answer's words), SUG-1 (`expected StepUpCancelled: step-up cancelled to be an instance of StepUpUnavailable`) — paste the failure lines and the totals.

PART C — THE MECHANISM.
C1. New files — BLOCK 4 (src/lib/on-demand-failure.ts), BLOCK 6 (src/lib/on-demand-failure.test.ts), BLOCK 7 (src/components/shell/on-demand-notice.tsx), BLOCK 8 (src/components/shell/on-demand-notice.test.tsx).
C2. The strings:
EDIT src/i18n/locales/en-base.ts #1
OLD-BEGIN
  "common.close": "Close",
  "common.goHome": "Go home",
OLD-END
NEW-BEGIN
  "common.close": "Close",
  "common.loadFailed":
    "Part of this page didn't load. Check your connection, then refresh the page.",
  "common.refreshPage": "Refresh page",
  "common.goHome": "Go home",
NEW-END
EDIT src/i18n/locales/am-base.ts #1
OLD-BEGIN
  "common.close": "ዝጋ",
  "common.goHome": "ወደ መነሻ ይሂዱ",
OLD-END
NEW-BEGIN
  "common.close": "ዝጋ",
  "common.loadFailed": "የዚህ ገጽ ክፍል አልተጫነም። ግንኙነትዎን ይፈትሹና ገጹን ያድሱ።",
  "common.refreshPage": "ገጹን ያድሱ",
  "common.goHome": "ወደ መነሻ ይሂዱ",
NEW-END
C3. resilientLazy reports, unless its fallback says so in place:
EDIT src/lib/resilient-lazy.ts #1
OLD-BEGIN

/**
OLD-END
NEW-BEGIN

import { reportOnDemandFailure } from "@/lib/on-demand-failure";

/**
NEW-END
EDIT src/lib/resilient-lazy.ts #2
OLD-BEGIN
 * download resolves to `fallback` — what the piece shows in place of itself (a
 * crumb's "—", the map's own word) — logged once as `[client-error] <label> failed
 * to load`. The server render and the hydration stay React.lazy's own (Suspense
 * streams the piece, the browser hydrates it), so nothing changes when the download
 * succeeds. The tab's one reload for a stale chunk (src/lib/stale-chunk.ts, INC-640)
 * runs first; a failure that remains keeps the fallback for the page's life, since
 * browsers keep a failed module fetch until the page reloads.
 */
OLD-END
NEW-BEGIN
 * download resolves to `fallback` — what the piece shows in place of itself (a
 * crumb's "—", the map's own word). The server render and the hydration stay
 * React.lazy's own (Suspense streams the piece, the browser hydrates it), so nothing
 * changes when the download succeeds. The tab's one reload for a stale chunk
 * (src/lib/stale-chunk.ts, INC-640) runs first; a failure that remains keeps the
 * fallback for the page's life, since browsers keep a failed module fetch until the
 * page reloads (INC-918). INC-911 — the failure is reported to the shell's one notice
 * (src/lib/on-demand-failure.ts: `[client-error] <label> failed to load: …`, and an
 * offer to refresh the page), unless `inPlace` says the fallback itself says so
 * (LoadFailedHere, src/components/shell/on-demand-notice.tsx) — then it is logged only.
 */
NEW-END
EDIT src/lib/resilient-lazy.ts #3
OLD-BEGIN
  fallback: ComponentType<P>,
): LazyExoticComponent<ComponentType<P>> {
OLD-END
NEW-BEGIN
  fallback: ComponentType<P>,
  options: { inPlace?: boolean } = {},
): LazyExoticComponent<ComponentType<P>> {
NEW-END
EDIT src/lib/resilient-lazy.ts #4
OLD-BEGIN
      (error: unknown) => {
        console.error(`[client-error] ${label} failed to load`, error);
        return { default: fallback };
OLD-END
NEW-BEGIN
      (error: unknown) => {
        if (options.inPlace === true)
          console.error(`[client-error] ${label} failed to load`, error);
        else reportOnDemandFailure(label, error);
        return { default: fallback };
NEW-END
C4. The shell draws the one notice:
EDIT src/components/app-shell.tsx #1
OLD-BEGIN
import { BottomBar } from "@/components/shell/bottom-bar";
import { Breadcrumbs } from "@/components/shell/breadcrumbs";
OLD-END
NEW-BEGIN
import { BottomBar } from "@/components/shell/bottom-bar";
import { OnDemandNotice } from "@/components/shell/on-demand-notice";
import { Breadcrumbs } from "@/components/shell/breadcrumbs";
NEW-END
EDIT src/components/app-shell.tsx #2
OLD-BEGIN
        <BottomBar />
        <div
OLD-END
NEW-BEGIN
        <BottomBar />
        {/* INC-911 — the one notice for a piece whose code did not download. */}
        <OnDemandNotice />
        <div
NEW-END
C5. `bun run i18n:usage`; read /tmp/observability/build-errors.log; `bunx vitest run src/lib/on-demand-failure.test.ts src/components/shell/on-demand-notice.test.tsx src/lib/resilient-lazy.test.tsx` — all pass (paste).

PART D — THE CONSUMERS THAT SHARE ITS CODE.
D1. The overlays, the dialogs and the step-up gate:
EDIT src/components/ui/overlay-facade.tsx #1
OLD-BEGIN

import { ownValue } from "@/lib/own-key";
OLD-END
NEW-BEGIN

import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { ownValue } from "@/lib/own-key";
NEW-END
EDIT src/components/ui/overlay-facade.tsx #2
OLD-BEGIN
    setWanted(true);
    loadOverlays().catch(() => {
      intent.current = null;
      setWanted(false);
    });
OLD-END
NEW-BEGIN
    setWanted(true);
    loadOverlays().catch((error: unknown) => {
      intent.current = null;
      setWanted(false);
      // INC-911 — the person's tap opened nothing: the shell's notice says so.
      reportOnDemandFailure("a menu's code", error);
    });
NEW-END
EDIT src/components/ui/overlay-facade.tsx #3
OLD-BEGIN
 * drawn afresh at that moment (the focus moves into the modal); afterwards
 * everything is Radix's. A failed download leaves the closed modal and the next
 * opening asks again; an owner that heard the opening, or opened the modal itself,
 * hears `onOpenChange(false)` when the download fails, so its next opening asks
 * for the module again (INC-908).
 */
OLD-END
NEW-BEGIN
 * drawn afresh at that moment (the focus moves into the modal); afterwards
 * everything is Radix's. A failed download leaves the closed modal; an owner that
 * heard the opening, or opened the modal itself, hears `onOpenChange(false)` when
 * the download fails, so its state never says open over nothing (INC-908); a next
 * opening asks again, which the browser answers from its memory of the failure
 * until the page reloads (INC-918). INC-911 — the failure is reported to the shell's
 * notice (src/lib/on-demand-failure.ts), and an owner that must tell "it could not
 * open" from "the person closed it" passes `onUnavailable`, called before that
 * `onOpenChange(false)` (the step-up gate: StepUpUnavailable, not StepUpCancelled).
 */
NEW-END
EDIT src/components/ui/overlay-facade.tsx #4
OLD-BEGIN
  onOpenChange,
  ...rest
OLD-END
NEW-BEGIN
  onOpenChange,
  onUnavailable,
  ...rest
NEW-END
EDIT src/components/ui/overlay-facade.tsx #5
OLD-BEGIN
  onOpenChange?: (open: boolean) => void;
}) {
OLD-END
NEW-BEGIN
  onOpenChange?: (open: boolean) => void;
  /** INC-911 — the modal's code did not download: heard before `onOpenChange(false)`. */
  onUnavailable?: () => void;
}) {
NEW-END
EDIT src/components/ui/overlay-facade.tsx #6
OLD-BEGIN
  /** The owner as it stands, for the download's failure path (INC-908). */
  const owner = React.useRef({ controlled, onOpenChange });
  useIsoLayoutEffect(() => {
    owner.current = { controlled, onOpenChange };
  });
OLD-END
NEW-BEGIN
  /** The owner as it stands, for the download's failure path (INC-908). */
  const owner = React.useRef({ controlled, onOpenChange, onUnavailable });
  useIsoLayoutEffect(() => {
    owner.current = { controlled, onOpenChange, onUnavailable };
  });
NEW-END
EDIT src/components/ui/overlay-facade.tsx #7
OLD-BEGIN
    if (byTrigger) setOpened(true);
    loadOverlays().catch(() => {
      setWanted(false);
      setOpened(false);
      // INC-908 — an owner that heard the trigger's opening, or opened the modal itself,
      // hears that it did not open: its next opening asks for the module again.
      const { controlled: owned, onOpenChange: tell } = owner.current;
      if (byTrigger || owned) tell?.(false);
    });
OLD-END
NEW-BEGIN
    if (byTrigger) setOpened(true);
    loadOverlays().catch((error: unknown) => {
      setWanted(false);
      setOpened(false);
      reportOnDemandFailure("a dialog's code", error);
      // INC-908 — an owner that heard the trigger's opening, or opened the modal itself,
      // hears that it did not open: its next opening asks for the module again.
      const { controlled: owned, onOpenChange: tell, onUnavailable: unavailable } = owner.current;
      if (byTrigger || owned) {
        unavailable?.();
        tell?.(false);
      }
    });
NEW-END
EDIT src/components/ui/overlay-loader.ts #1
OLD-BEGIN
 * client render agree). A failed download is logged once per try and forgotten:
 * the next ask tries again (loadOnce).
OLD-END
NEW-BEGIN
 * client render agree). A failed download is logged once per try; the caller
 * (overlay-facade.tsx) reports it to the shell's one notice, which offers to refresh
 * the page — the browser keeps a failed module download for the page's life, so the
 * next ask fails at once (INC-911, INC-918).
NEW-END
EDIT src/components/ui/overlay-loader.ts #2
OLD-BEGIN
 * server. A failure here is logged and left for the next ask.
OLD-END
NEW-BEGIN
 * server. A failure here is logged only: the person asked for nothing, and the
 * press that does ask reports it (INC-911).
NEW-END
EDIT src/components/ui/dialog-primitive.tsx #1
OLD-BEGIN
function Root(props: React.ComponentProps<typeof Impl.Root>) {
OLD-END
NEW-BEGIN
/** INC-911 — `onUnavailable`: the modal's code did not download (overlay-facade.tsx ModalRoot). */
function Root(props: React.ComponentProps<typeof Impl.Root> & { onUnavailable?: () => void }) {
NEW-END
EDIT src/components/ui/alert-dialog-primitive.tsx #1
OLD-BEGIN
function Root(props: React.ComponentProps<typeof Impl.Root>) {
OLD-END
NEW-BEGIN
/** INC-911 — `onUnavailable`: the modal's code did not download (overlay-facade.tsx ModalRoot). */
function Root(props: React.ComponentProps<typeof Impl.Root> & { onUnavailable?: () => void }) {
NEW-END
EDIT src/features/auth/mfa/use-step-up.ts #1
OLD-BEGIN

  /** Parks the action behind the modal; the caller's promise waits for it. */
OLD-END
NEW-BEGIN

  /**
   * INC-911 — the modal's code did not download (its root's `onUnavailable`, heard before its
   * closing): the gate settles as StepUpUnavailable, not StepUpCancelled — the person did not
   * cancel; the step-up could not be asked. The shell's notice has told them.
   */
  const unavailable = useCallback(() => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    setMode("closed");
    setErrorKey(null);
    setBusy(false);
    pending?.reject(new StepUpUnavailable());
  }, []);

  /** Parks the action behind the modal; the caller's promise waits for it. */
NEW-END
EDIT src/features/auth/mfa/use-step-up.ts #2
OLD-BEGIN

  return { mode, busy, errorKey, guard, submitCode, close };
}
OLD-END
NEW-BEGIN

  return { mode, busy, errorKey, guard, submitCode, close, unavailable };
}
NEW-END
EDIT src/features/auth/mfa/step-up-gate.tsx #1
OLD-BEGIN
  const { t } = useI18n();
  const { mode, busy, errorKey, guard, submitCode, close } = useStepUp();
  const [code, setCode] = useState("");
OLD-END
NEW-BEGIN
  const { t } = useI18n();
  const { mode, busy, errorKey, guard, submitCode, close, unavailable } = useStepUp();
  const [code, setCode] = useState("");
NEW-END
EDIT src/features/auth/mfa/step-up-gate.tsx #2
OLD-BEGIN
          open
          onOpenChange={(next) => {
OLD-END
NEW-BEGIN
          open
          onUnavailable={unavailable}
          onOpenChange={(next) => {
NEW-END
D2. The pin map says so in its own place:
EDIT src/features/posting/step-where.tsx #1
OLD-BEGIN
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sortPlacesByName } from "@/lib/place-order";
OLD-END
NEW-BEGIN
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { sortPlacesByName } from "@/lib/place-order";
NEW-END
EDIT src/features/posting/step-where.tsx #2
OLD-BEGIN
  PinMapUnavailable,
);
OLD-END
NEW-BEGIN
  PinMapUnavailable,
  { inPlace: true },
);
NEW-END
EDIT src/features/posting/step-where.tsx #3
OLD-BEGIN

/** The pin map's place when it cannot download: "Try again" reloads the page; the draft is saved. */
function PinMapUnavailable() {
  const { t } = useI18n();
  return (
    <Button
      type="button"
      variant="outline"
      size="touch"
      data-testid="post-pin-map-retry"
      onClick={() => window.location.reload()}
    >
      {t("common.tryAgain")}
    </Button>
  );
OLD-END
NEW-BEGIN

/**
 * The pin map's place when it cannot download: it says so and offers to refresh the page, in the
 * words of the shell's notice (INC-911); the draft is saved.
 */
function PinMapUnavailable() {
  return (
    <LoadFailedHere
      testid="post-pin-map-failed"
      refreshTestid="post-pin-map-retry"
      className="items-start text-start"
    />
  );
NEW-END
D3. The sign-in screen's words for a failed client download:
EDIT src/features/auth/auth-service.ts #1
OLD-BEGIN
const CLIENT_FAILED: { ok: false; errorKey: "auth.errorGeneric" } = {
OLD-END
NEW-BEGIN
const CLIENT_FAILED: { ok: false; errorKey: "common.loadFailed" } = {
NEW-END
EDIT src/features/auth/auth-service.ts #2
OLD-BEGIN
  errorKey: "auth.errorGeneric",
OLD-END
NEW-BEGIN
  // INC-911 — the words every on-demand failure uses: the page needs a refresh (src/lib/on-demand-failure.ts).
  errorKey: "common.loadFailed",
NEW-END
D4. Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance src/components src/features/auth src/features/posting src/lib src/i18n` — every test passes (paste the totals; the known limits above excepted).

PART E — THE BROWSER.
E1. BLOCK 9 (e2e/helpers/on-demand.ts), BLOCK 5 (e2e/on-demand-failure.spec.ts), and these edits (supabase-door.spec's two refusal helpers move to BLOCK 9; SBE-4 and SBE-5 expect `common.loadFailed`; the selector's area):
EDIT e2e/supabase-door.spec.ts #1
OLD-BEGIN
import { adPageFixtures } from "./helpers/ad-page";
import {
  authFields,
  gotoReady,
  signInViaSession,
  signedInMarker,
  waitForHydration,
} from "./helpers/ui";
import { leaseUser } from "./helpers/users";
OLD-END
NEW-BEGIN
import { adPageFixtures } from "./helpers/ad-page";
import { openAfterTheOneReload, refuseScripts } from "./helpers/on-demand";
import { authFields, gotoReady, signInViaSession, signedInMarker } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
NEW-END
EDIT e2e/supabase-door.spec.ts #2
OLD-BEGIN
import { en } from "../src/i18n/locales/en";
import { STALE_CHUNK_KEY } from "../src/lib/stale-chunk";

OLD-END
NEW-BEGIN
import { en } from "../src/i18n/locales/en";

NEW-END
EDIT e2e/supabase-door.spec.ts #3
OLD-BEGIN
async function refuseClientDownload(page: Page) {
  await page.route("**/*.js", async (route) => {
    const response = await route.fetch();
    if ((await response.text()).includes(CLIENT_MARKER)) await route.abort("failed");
    else await route.fulfill({ response });
  });
}

/**
 * Opens `path` with the client refused and waits for the app's one reload for a failed chunk
 * (src/lib/stale-chunk.ts, INC-640) and for the page it lands on to be ready, so a test types
 * into the page that stays. Returns the page's load count, which a test checks stays at two.
 */
async function openAfterTheOneReload(page: Page, path: string): Promise<() => number> {
  let loads = 0;
  page.on("load", () => {
    loads += 1;
  });
  // Not gotoReady: the reload can land while it waits, and a destroyed page is not this test's subject.
  await page.goto(path);
  await expect
    .poll(() => loads, { message: "the app reloaded once for the failed chunk (INC-640)" })
    .toBe(2);
  await waitForHydration(page);
  expect(
    await page.evaluate((key) => window.sessionStorage.getItem(key), STALE_CHUNK_KEY),
    "the reload was the stale-chunk rule's",
  ).not.toBeNull();
  return () => loads;
}
OLD-END
NEW-BEGIN
async function refuseClientDownload(page: Page) {
  await refuseScripts(page, (_url, text) => text.includes(CLIENT_MARKER));
}
NEW-END
EDIT e2e/supabase-door.spec.ts #4
OLD-BEGIN
    await submit.click();
    await expect(page.getByTestId("auth-error")).toHaveText(en["auth.errorGeneric"]);
    await expect(submit).toBeEnabled();
OLD-END
NEW-BEGIN
    await submit.click();
    await expect(page.getByTestId("auth-error")).toHaveText(en["common.loadFailed"]);
    await expect(submit).toBeEnabled();
NEW-END
EDIT e2e/supabase-door.spec.ts #5
OLD-BEGIN
    await send.click();
    await expect(page.getByTestId("auth-reset-error")).toHaveText(en["auth.errorGeneric"]);
    await expect(page.getByText(en["auth.resetNeutral"])).toHaveCount(0);
OLD-END
NEW-BEGIN
    await send.click();
    await expect(page.getByTestId("auth-reset-error")).toHaveText(en["common.loadFailed"]);
    await expect(page.getByText(en["auth.resetNeutral"])).toHaveCount(0);
NEW-END
EDIT scripts/e2e-select.ts #1
OLD-BEGIN
    ],
  },
  {
    name: "components",
OLD-END
NEW-BEGIN
    ],
  },
  {
    // INC-911 (Foundations turn 34b-2) — a piece fetched on demand that fails to download says so.
    name: "on-demand",
    src: ["src/components/shell/on-demand-notice.tsx", "src/components/ui/overlay-*.ts*"],
    specs: ["e2e/on-demand-failure.spec.ts"],
  },
  {
    name: "components",
NEW-END
E2. `bun scripts/e2e-select.ts --self-test` (paste); `bun run e2e:local -- e2e/on-demand-failure.spec.ts` (both projects: 2 passed); `bun run e2e:local -- e2e/supabase-door.spec.ts` (10 passed) — paste the count lines.

PART F — DOCS AND THE ROADMAP.
F1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34b-1: a sign-out ends the session on this device whatever the server answers — DEC-268; the reload for a stale chunk answers only a page's first failed download — INC-922)` becomes `docs/governance/briefs/foundations-turn-34b-2.md (Foundations turn 34b-2: a piece fetched on demand whose download fails tells the person and offers a refresh — the mechanism, its guard and the consumers that share its code, INC-911)` (everything after it stays, as it is).
F2. These edits (the register's row 52 and row 48's note; the harness; the changelog; turn K1 and turn 34b-1 ticked with their closing runs):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 47 | The listings pages' first cards are drawn by the server and kept by the browser (D234) | `HeldFirstPage` + `heldFirstPageAdapter` (`src/features/feed/held-first-page.ts`, registered in `src/start.ts`) — the root loader's hand-over, read at once on arrival; `useHeldFirstPage` (`src/features/feed/use-feed.ts`) — the page the feed draws until its own read lands; the route-level Suspense in `index.tsx` and `c.$slug.tsx` | `e2e/ad-page.spec.ts` AP-54 (the server's card nodes kept), `src/features/feed/held-first-page.test.ts` (HFP-1…3), `src/features/feed/use-feed.test.ts` (UFS-5…7) | none | any listings page; the shell's own first state next | Foundations turn 29; hydrated only once React has placed them — the new row (DEC-266) |
| 48 | An overlay primitive's code (the tooltip, the dropdown menu, the dialog, the alert dialog: Radix, floating-ui and their focus, scroll and dismiss layers) waits for the person's intent and never rides a page's first download (D234, DEC-259, DEC-260) | the facades `src/components/ui/tooltip.tsx` and `dropdown-menu.tsx` (the impls' exports) on `OverlayRoot` / `OverlayTrigger` / `OverlayContent`, and `dialog-primitive.tsx` (under `dialog.tsx`, `sheet.tsx`) and `alert-dialog-primitive.tsx` (under `alert-dialog.tsx`) on `ModalRoot` / `ModalTrigger` / `ModalPart` (`src/components/ui/overlay-facade.tsx`); the module `overlays-impl.ts` (re-exports the four impl files) behind `loadOverlays` / `useOverlays` / `warmOverlaysWhenIdle` (`src/components/ui/overlay-loader.ts`, loadOnce) — a tooltip's or a menu's trigger is the consumer's own element from the first render and the real root draws beside it on the first hover or keyboard focus (a tooltip) or press or opening key (a menu), the intent replayed on the same element; a closed modal draws its trigger alone and the real root draws around its children at the first opening (the trigger's click or the owner's `open`); the module is asked for anyway once the page is idle | `scripts/conformance/overlays.test.ts` (CF-OV-1…3: only the impl files reach the four Radix packages, only overlays-impl the impl files, only the loader overlays-impl; each facade exports its impl's names, the modal facades Radix's parts); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY (`overlays-impl`); the weight guard's FORBIDDEN; OVF-1…18; `e2e/overlays.spec.ts` (OVE-1…3) | none | a new overlay primitive is one impl file re-exported by overlays-impl and one facade over the same parts (the popover and the select next — K2); an owner-opened root (`open`, `defaultOpen`) is asked for at once | triggers are asChild only (the types say so); a modal's children are drawn afresh at its first opening; a failed download tells a modal's owner it did not open (INC-908); Foundations turns 31, 32 and 32b |
| 49 | A page's typeface: one font stack per role, the device's own — no page downloads a font (D234, DEC-262) | the tokens `--font-sans` and `--font-display` (= `var(--font-sans)`) in `src/styles.css` (`@theme inline`) and its base rules (`body`; `h1`–`h3`); Tailwind's `font-sans` and `font-display` — Latin in the platform's UI face, Ge'ez per glyph in the platform's Ethiopic face | `scripts/conformance/fonts.test.ts` (CF-FT-1…3: no web-font host, `@font-face`, font file, family by name or token outside styles.css; the two tokens pinned); `e2e/fonts.spec.ts` (FTE-1) | none | a new script's face joins the stack; a brand face, if ever chosen, is an ADR — one self-hosted, subset, non-blocking file, one token change and one allowlist line in the census | the visible change: English text and headings in the device's face; Foundations turn 33 |
OLD-END
NEW-BEGIN
| 47 | The listings pages' first cards are drawn by the server and kept by the browser (D234) | `HeldFirstPage` + `heldFirstPageAdapter` (`src/features/feed/held-first-page.ts`, registered in `src/start.ts`) — the root loader's hand-over, read at once on arrival; `useHeldFirstPage` (`src/features/feed/use-feed.ts`) — the page the feed draws until its own read lands; the route-level Suspense in `index.tsx` and `c.$slug.tsx` | `e2e/ad-page.spec.ts` AP-54 (the server's card nodes kept), `src/features/feed/held-first-page.test.ts` (HFP-1…3), `src/features/feed/use-feed.test.ts` (UFS-5…7) | none | any listings page; the shell's own first state next | Foundations turn 29; hydrated only once React has placed them — the new row (DEC-266) |
| 48 | An overlay primitive's code (the tooltip, the dropdown menu, the dialog, the alert dialog: Radix, floating-ui and their focus, scroll and dismiss layers) waits for the person's intent and never rides a page's first download (D234, DEC-259, DEC-260) | the facades `src/components/ui/tooltip.tsx` and `dropdown-menu.tsx` (the impls' exports) on `OverlayRoot` / `OverlayTrigger` / `OverlayContent`, and `dialog-primitive.tsx` (under `dialog.tsx`, `sheet.tsx`) and `alert-dialog-primitive.tsx` (under `alert-dialog.tsx`) on `ModalRoot` / `ModalTrigger` / `ModalPart` (`src/components/ui/overlay-facade.tsx`); the module `overlays-impl.ts` (re-exports the four impl files) behind `loadOverlays` / `useOverlays` / `warmOverlaysWhenIdle` (`src/components/ui/overlay-loader.ts`, loadOnce) — a tooltip's or a menu's trigger is the consumer's own element from the first render and the real root draws beside it on the first hover or keyboard focus (a tooltip) or press or opening key (a menu), the intent replayed on the same element; a closed modal draws its trigger alone and the real root draws around its children at the first opening (the trigger's click or the owner's `open`); the module is asked for anyway once the page is idle | `scripts/conformance/overlays.test.ts` (CF-OV-1…3: only the impl files reach the four Radix packages, only overlays-impl the impl files, only the loader overlays-impl; each facade exports its impl's names, the modal facades Radix's parts); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY (`overlays-impl`); the weight guard's FORBIDDEN; OVF-1…18; `e2e/overlays.spec.ts` (OVE-1…3) | none | a new overlay primitive is one impl file re-exported by overlays-impl and one facade over the same parts (the popover and the select next — K2); an owner-opened root (`open`, `defaultOpen`) is asked for at once | triggers are asChild only (the types say so); a modal's children are drawn afresh at its first opening; a failed download tells a modal's owner it did not open (INC-908) and the person, through row 52 (INC-911); Foundations turns 31, 32 and 32b |
| 49 | A page's typeface: one font stack per role, the device's own — no page downloads a font (D234, DEC-262) | the tokens `--font-sans` and `--font-display` (= `var(--font-sans)`) in `src/styles.css` (`@theme inline`) and its base rules (`body`; `h1`–`h3`); Tailwind's `font-sans` and `font-display` — Latin in the platform's UI face, Ge'ez per glyph in the platform's Ethiopic face | `scripts/conformance/fonts.test.ts` (CF-FT-1…3: no web-font host, `@font-face`, font file, family by name or token outside styles.css; the two tokens pinned); `e2e/fonts.spec.ts` (FTE-1) | none | a new script's face joins the stack; a brand face, if ever chosen, is an ADR — one self-hosted, subset, non-blocking file, one token change and one allowlist line in the census | the visible change: English text and headings in the device's face; Foundations turn 33 |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 51 | The first screen's hydration: the browser hydrates the server's first screen as drawn — no state change makes React draw a streamed part again, and the page never holds two copies of anything (D234, DEC-266, INC-913) | `src/client.tsx` (the browser's entry: TanStack Start's own, hydrating after the wait) + `src/lib/hydrate-when-placed.ts` (`whenStreamPlaced`: the document read and no `div[hidden][id^="S:"]` segment waiting; a 1.5 s deadline with a `[client-error]` line) | `src/lib/hydrate-when-placed.test.ts` (HWP-1…6: HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order); `e2e/supabase-door.spec.ts` SBE-3; the weight guard's entry (`scripts/check-marketplace-imports.mjs` walks `src/client.tsx`) | none | a new late boundary or provider is covered by itself | hydration waits for the stream's end and then React's reveal (at most 300 ms after the first frame, 2.3 s at worst when a part lands between 2.0 and 2.3 s) — on a slow listings page up to about 2.3 s, bounded by the first page's 2 s deadline (ruling 3); Foundations turn 34, ruling 2 |

OLD-END
NEW-BEGIN
| 51 | The first screen's hydration: the browser hydrates the server's first screen as drawn — no state change makes React draw a streamed part again, and the page never holds two copies of anything (D234, DEC-266, INC-913) | `src/client.tsx` (the browser's entry: TanStack Start's own, hydrating after the wait) + `src/lib/hydrate-when-placed.ts` (`whenStreamPlaced`: the document read and no `div[hidden][id^="S:"]` segment waiting; a 1.5 s deadline with a `[client-error]` line) | `src/lib/hydrate-when-placed.test.ts` (HWP-1…6: HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order); `e2e/supabase-door.spec.ts` SBE-3; the weight guard's entry (`scripts/check-marketplace-imports.mjs` walks `src/client.tsx`) | none | a new late boundary or provider is covered by itself | hydration waits for the stream's end and then React's reveal (at most 300 ms after the first frame, 2.3 s at worst when a part lands between 2.0 and 2.3 s) — on a slow listings page up to about 2.3 s, bounded by the first page's 2 s deadline (ruling 3); Foundations turn 34, ruling 2 |
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader or of a same-file loadOnce answers through the mechanism or has its allowlist line; ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen — and ten consumers until turn 34b-3 moves them, INC-911) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |

NEW-END
EDIT docs/features/e2e-harness.md #1
OLD-BEGIN
A test that refuses a chunk's download waits for the app's one reload for a failed chunk (src/lib/stale-chunk.ts, INC-640) and for the page it lands on before it types — the reload drops what was typed (SBE-4, SBE-5's `openAfterTheOneReload`).
OLD-END
NEW-BEGIN
A test that refuses a chunk's download waits for the app's one reload for a failed chunk (src/lib/stale-chunk.ts, INC-640) and for the page it lands on before it types — the reload drops what was typed (`refuseScripts` and `openAfterTheOneReload`, e2e/helpers/on-demand.ts: SBE-4, SBE-5, ODE-1). Only a page's first failed download may reload it (turn 34b-1, INC-922), so a later failure on that page is answered on screen.
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34b-1 (2026-10-26) — DEC-268: a sign-out ends the session on this device whatever the server answers — auth-service's signOut removes the stored session itself when it cannot finish (the door's forgetStoredSession) and the shell loads "/" afresh; DEC-267's sign-out allowance retired. INC-922: the reload for a stale chunk (INC-640) answers only a page's first failed download, so a form filled for more than a minute is not thrown away (turn 34's reviewer). INC-923: /settings's door-step is requireSignedIn, as /account's — a signed-out visitor no longer races the screen's own send to sign in against its live guard's "/" (CI's S-1 landed on "/"), and the census refuses a screen that sends to sign in from its own code (CF-SIR-3). ASC-3…5, SBD-18/19, STC-1, CF-SIR-3, SO-11.
OLD-END
NEW-BEGIN
- Foundations turn 34b-1 (2026-10-26) — DEC-268: a sign-out ends the session on this device whatever the server answers — auth-service's signOut removes the stored session itself when it cannot finish (the door's forgetStoredSession) and the shell loads "/" afresh; DEC-267's sign-out allowance retired. INC-922: the reload for a stale chunk (INC-640) answers only a page's first failed download, so a form filled for more than a minute is not thrown away (turn 34's reviewer). INC-923: /settings's door-step is requireSignedIn, as /account's — a signed-out visitor no longer races the screen's own send to sign in against its live guard's "/" (CI's S-1 landed on "/"), and the census refuses a screen that sends to sign in from its own code (CF-SIR-3). ASC-3…5, SBD-18/19, STC-1, CF-SIR-3, SO-11.

- Foundations turn 34b-2 (2026-10-26) — INC-911: a piece fetched on demand whose download fails tells the person — src/lib/on-demand-failure.ts reports it and the shell's one notice (src/components/shell/on-demand-notice.tsx) says part of the page did not load and offers to refresh; LoadFailedHere says the same in a piece's own place (the pin map). resilientLazy and the overlay facades report; the step-up gate tells a dialog that could not open from one the person closed (StepUpUnavailable); the sign-in screen says common.loadFailed for a failed client download. The census ODC-1…3 names every caller of an on-demand loader; ten move onto the mechanism in turn 34b-3 (their allowlist lines expire with INC-911). Two strings (common.loadFailed, common.refreshPage). ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ODE-1.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34b-1 (docs/governance/briefs/foundations-turn-34b-1.md; no migration; Lovable) — DEC-268: a sign-out ends the session on this device whatever the server answers — the door's forgetStoredSession; auth-service's signOut and the sign-in's eviction of an expired prior session forget the stored session when the library keeps it; the shell loads "/" afresh after a sign-out that could not finish; DEC-267's sign-out allowance retired (ASC-3…5, SBD-18/19, SO-11); INC-922: the reload for a stale chunk answers only a page's first failed download (STC-1; turn 34's reviewer, MAJOR 3); INC-923: /settings's door-step is requireSignedIn (ssr: false, as /account) — its own send to sign in raced its live guard's "/" (CI's S-1 on 9a3f8713); the census refuses a screen that sends to sign in from its own code (CF-SIR-3).
OLD-END
NEW-BEGIN
  - [x] Turn 34b-1 (docs/governance/briefs/foundations-turn-34b-1.md; no migration; Lovable) — DEC-268: a sign-out ends the session on this device whatever the server answers — the door's forgetStoredSession; auth-service's signOut and the sign-in's eviction of an expired prior session forget the stored session when the library keeps it; the shell loads "/" afresh after a sign-out that could not finish; DEC-267's sign-out allowance retired (ASC-3…5, SBD-18/19, SO-11); INC-922: the reload for a stale chunk answers only a page's first failed download (STC-1; turn 34's reviewer, MAJOR 3); INC-923: /settings's door-step is requireSignedIn (ssr: false, as /account) — its own send to sign in raced its live guard's "/" (CI's S-1 on 9a3f8713); the census refuses a screen that sends to sign in from its own code (CF-SIR-3). Final HEAD c1b6b4e5; CI run 40333117660: SUCCESS; unit 311 files / 1948 tests (four full-load timeouts, each passing alone: INC-921); browser 94 passed, 8 project skips.
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Turn K1 (docs/governance/briefs/foundations-turn-k1.md; no migration; Lovable — the kit's files are outside the Claude Code executor's scope) — the independent review gates every landing: the reviewer runs in the foreground before the report, its last line rides the report's third line, and land.ts refuses a final report without it, with a BLOCKER in it, or reviewed on another commit (EXH-20); the scheduling rule reads the programs a command runs, not words in its data (INC-889, EXH-21); the scratch-repository tests state their time (INC-890).
OLD-END
NEW-BEGIN
  - [x] Turn K1 (docs/governance/briefs/foundations-turn-k1.md; no migration; Lovable — the kit's files are outside the Claude Code executor's scope) — the independent review gates every landing: the reviewer runs in the foreground before the report, its last line rides the report's third line, and land.ts refuses a final report without it, with a BLOCKER in it, or reviewed on another commit (EXH-20); the scheduling rule reads the programs a command runs, not words in its data (INC-889, EXH-21); the scratch-repository tests state their time (INC-890). Rulings 1–5 (foundations-turn-k1-r1.md … -r5.md; INC-920): the kit's shell reader reads every command the shell runs; a heredoc's delimiter by the shell's quote removal; a program named by a variable, $'…', a substitution or a glob refused as unreadable; DEC-269 and DEC-270 — the scheduling rule also matches its words in the command's text, blanking only data no program of the command runs. Final HEAD a8a7a207; CI run 40326085964: SUCCESS, and main promoted. The older non-null assertions in .claude/hooks/, the spellings listed in the rulings' reports and INC-921 (the tree-scan time budget) to the next kit turn.
NEW-END
F3. AGENTS.md — the mechanism's one line, directly after the line that begins "- Speed (D234):" (AGENTS.md then counts 8892 bytes by `wc -c AGENTS.md`):
EDIT AGENTS.md #1
OLD-BEGIN
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts) and on-demand components via `resilientLazy` (src/lib/resilient-lazy.ts), never a bare React.lazy; a read every page makes is preloaded by `firstReadLinks` (src/lib/first-reads.ts) from its reader's own path builder; the listings pages' first feed page comes from the server in the page stream (`readFirstFeedPage`, src/server/first-screen.ts) as a `HeldFirstPage` (src/features/feed/held-first-page.ts, read at once on arrival): useFeed takes it once and the feed draws it until that read lands (`useHeldFirstPage`), so React keeps the server's cards; below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.
OLD-END
NEW-BEGIN
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts) and on-demand components via `resilientLazy` (src/lib/resilient-lazy.ts), never a bare React.lazy; a read every page makes is preloaded by `firstReadLinks` (src/lib/first-reads.ts) from its reader's own path builder; the listings pages' first feed page comes from the server in the page stream (`readFirstFeedPage`, src/server/first-screen.ts) as a `HeldFirstPage` (src/features/feed/held-first-page.ts, read at once on arrival): useFeed takes it once and the feed draws it until that read lands (`useHeldFirstPage`), so React keeps the server's cards; below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.
- On-demand failures (INC-911): a piece fetched on demand whose download fails reports through `reportOnDemandFailure` (src/lib/on-demand-failure.ts) — the shell's one notice (`OnDemandNotice`) offers Refresh, or `LoadFailedHere` says it in the piece's own place; never a silent blank; scripts/conformance/on-demand-failure.test.ts judges every caller of an on-demand loader, its allowlist lines `file | reason | until`.
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34b-2.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 315 files, 1957 tests, every one passed); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
245b435af2edeafdf35a870bb57b8f753844a5fd596e12afa38ba461b30e33f2  AGENTS.md
d50fc0d8e3e5f9b58a0921ca213c28697f7ed045c36e41ed50232a2b179e686c  docs/_changelog.md
6bb98be3a8dae219b70e2ed10d7d2c1b78b212adf2f89412469a37e99921e612  docs/features/e2e-harness.md
6d0f20a7dfd12b2666bbb9fd1c8df2be2920efe1ce3858809e444f75e1edfa2a  docs/generated/i18n-usage.json
c992cdbabb7c92581ec301c0d8f4c0026385b4f61372b7411fc7e34a44233a28  docs/governance/mechanisms.md
da1431efaa6a73908656cfe0b420e69c180a509f22f7495b6c9c09e8ab8f9be7  e2e/helpers/on-demand.ts
f559766f98585af1e91ba617ea2f64071be84f97a0852ff3703480571a267c3d  e2e/on-demand-failure.spec.ts
29b8e5c2df09ba383080b458fcce934a318db9095bd228d1c028489a1f41ca20  e2e/supabase-door.spec.ts
6d0f20a7dfd12b2666bbb9fd1c8df2be2920efe1ce3858809e444f75e1edfa2a  public/i18n-usage.json
329e40502b6ed5eebbf9c3ef2490cd208d8fa8e723691ab6c80faf76c89fdf11  scripts/conformance/on-demand-failure-allowlist.txt
c2dcfff0221ecc060db7e43616e6cf6ca3e29edf798ac6d7f7364d9d991141c9  scripts/conformance/on-demand-failure.test.ts
345dc0cbdd1e15139694be2ec4d2b9477bd1d82e9fbcb7c7fa605adb61442d30  scripts/e2e-select.ts
0ab2fc92732b87187e3ebcdec47ac00c21e16f475b9656d29ed89848bf8d6eb9  src/components/app-shell.tsx
d4015e2ab578be8d6a3f94a6fb06a9920ba30a7ab59fdc00193bb0c86eef7bc8  src/components/shell/on-demand-notice.test.tsx
7b33db3bbfe6e412a0bb6a621c15e7ce54189558d9aa1029c2d0efdf8be935ed  src/components/shell/on-demand-notice.tsx
228521b4d081cbaf9090b64d67155fca5004c41e243c4f29f5275cfec753cc4f  src/components/ui/alert-dialog-primitive.tsx
f9e483ddcc68eef664547c162fc1deac71b21aa616de645b5da625a10aa50f4e  src/components/ui/dialog-primitive.tsx
8cc38a8ca0f81ff57aa6249f0e6881aa02bc5420a57be4bf22ee6f0e85fbc1c5  src/components/ui/overlay-facade-failure.test.tsx
58949fb89a9422fb67cf1d3ef8de938fad6824ff76508118d9d9efb1285c777a  src/components/ui/overlay-facade.tsx
83275632e86044c28ced9f22bec65a5e3eba1b6a92a260edcdfde930b1ffd33d  src/components/ui/overlay-loader.ts
8f1973034c5450acd27a3bef0fd64b00d540c73e1dedcec4e8cffe610fab73df  src/features/auth/auth-client.test.ts
e2405f64ba706b8557636a639cf78d3519c36f032362efddbbc8091e8c46676f  src/features/auth/auth-service.ts
f67031d98f558a619bd30b7f8ec169df93d6e907d913bb31a4462d582f87b6ca  src/features/auth/mfa/step-up-gate.test.tsx
48487eb2e6dff3e4de5f30f3ef8f8a02ea048357e56a47a27ba382b60fe75157  src/features/auth/mfa/step-up-gate.tsx
9b767b24af94205d4869b2a1b06daa0ed594f00722f67f1d5fccdef2f68bcc60  src/features/auth/mfa/use-step-up.ts
5be1434b737a679c8901a05ac9827502b6796f0eb29879445b82860dbb556611  src/features/posting/step-where.tsx
cbe6e085b19acccc35953e3773608873f9d03f904924441a9a0b90f95de25117  src/i18n/locales/am-base.ts
836d228d8db11ce162eaa3dfab51d33963e60b54b029defde63ece2a2e143c07  src/i18n/locales/en-base.ts
4d990eca63de52ad9087c19f4da9c2975fbc93ef03439c9f52d6afb3d8a21bf6  src/lib/on-demand-failure.test.ts
20ffc78bdf491e8667af05b70e8574351758fb909b961d3f0fe717bab19a3745  src/lib/on-demand-failure.ts
2a49ee71583862a52bb90f443c40f775250c0a5145f96b25434782d148ea61be  src/lib/resilient-lazy.test.tsx
6eb37380830130eec32d297b0c6b3d0134d6999bf730f35e4c5e1fae40fa0f8c  src/lib/resilient-lazy.ts

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/on-demand-failure.spec.ts whole; e2e/supabase-door.spec.ts whole; e2e/mfa-stepup.spec.ts whole; e2e/overlays.spec.ts whole; e2e/breadcrumbs.spec.ts whole; e2e/post-wizard-where.spec.ts whole; e2e/i18n-bundle.spec.ts whole; e2e/smoke-auth-i18n.spec.ts whole; paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34b-2.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract — a failed download of a menu's code, of a dialog's code (the step-up gate), of the map preview, of the pin map, of a crumb, of the sign-in code — before → after; the consumer census with file:line, re-located at <START>; the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); the allowlist's lines; the strings key by key, English and Amharic; "none" for migrations; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): the words of the two new strings (the operator reads the Amharic on his return); one shell notice plus LoadFailedHere in place — never both for one failure; resilientLazy reports by default; the step-up gate's StepUpUnavailable through `onUnavailable`; the sign-in screen says `common.loadFailed` for a failed client download; the ten consumers left to turn 34b-3 named by the guard until INC-911 closes.

BLOCK 1 — FILE-BEGIN scripts/conformance/on-demand-failure.test.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-911 / INC-918 (Foundations turn 34b-2) — A PIECE FETCHED ON DEMAND THAT FAILS TO DOWNLOAD
 * TELLS THE PERSON, AND OFFERS THE ONE CURE. The browser keeps a failed module download for the
 * page's life, so asking again cannot help; refreshing the page can. The mechanism is
 * src/lib/on-demand-failure.ts (reportOnDemandFailure → the shell's one notice,
 * src/components/shell/on-demand-notice.tsx; refreshPage) and, for a piece whose own place has
 * room, LoadFailedHere in the same file as the notice.
 *
 * The census reads every browser file (tests and test support excepted) for a call of an
 * on-demand loader: a definer's loader by name (LOADERS), or `.load()` on a `loadOnce(…)` bound
 * in the same file. Each such file uses the mechanism — it calls or renders an answer imported
 * from on-demand-failure or on-demand-notice (reportOnDemandFailure, refreshPage,
 * LoadFailedHere) — or carries an allowance (`file | reason | until`) in
 * on-demand-failure-allowlist.txt. The definers themselves (DEFINERS) are the mechanism's
 * plumbing and are read by ODC-3 instead: resilientLazy reports for every component it fetches,
 * and no file outside them exports a loader its callers could miss.
 */

type Finding = { file: string; line: number; what: string };

/** The files that define on-demand loaders, and the loaders their callers call by name. */
export const DEFINERS: Record<string, readonly string[]> = {
  "src/lib/load-once.ts": [],
  "src/lib/resilient-lazy.ts": [],
  "src/components/ui/overlay-loader.ts": ["loadOverlays"],
  "src/lib/supabase-door.ts": ["getSupabase"],
  "src/features/posting/map/leaflet.ts": ["loadLeaflet"],
  "src/features/posting/phone-parse.ts": ["loadPhoneLib"],
  "src/i18n/compiled-catalog.ts": ["compiledCatalogLoader", "compiledLayerLoader"],
};
const LOADERS = new Set(Object.values(DEFINERS).flat());

/** The mechanism's modules, and the names whose use answers a failure through it. */
const MECHANISM = /(?:^|\/)(?:on-demand-failure|on-demand-notice)$/;
const ANSWERS = new Set(["reportOnDemandFailure", "refreshPage", "LoadFailedHere"]);

function isLoadOnceCall(node: ts.Node | undefined): boolean {
  return (
    node !== undefined &&
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "loadOnce"
  );
}

/** Every loader call in `files` that is not answered through the mechanism. */
export function onDemandFailureCensus(files: string[]): {
  consumers: string[];
  findings: Finding[];
} {
  const consumers: string[] = [];
  const findings: Finding[] = [];
  for (const file of files) {
    const bound = new Set<string>();
    const calls: number[] = [];
    const imported = new Set<string>();
    let uses = false;
    let exportsLoader = 0;
    visitTs(file, (node, source) => {
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        MECHANISM.test(node.moduleSpecifier.text)
      ) {
        const named = node.importClause?.namedBindings;
        if (named !== undefined && ts.isNamedImports(named))
          for (const element of named.elements)
            if (ANSWERS.has((element.propertyName ?? element.name).text))
              imported.add(element.name.text);
        return;
      }
      // A use is a reference to an answer imported from the mechanism (a call, a handler, a JSX
      // element) — importing the shell's notice to draw it answers nothing.
      if (ts.isIdentifier(node) && imported.has(node.text) && !ts.isImportSpecifier(node.parent))
        uses = true;
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        if (isLoadOnceCall(node.initializer)) {
          bound.add(node.name.text);
          const statement = node.parent?.parent;
          if (
            statement !== undefined &&
            ts.isVariableStatement(statement) &&
            statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
          )
            exportsLoader = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
        }
      }
      if (!ts.isCallExpression(node)) return;
      const callee = node.expression;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (ts.isIdentifier(callee) && LOADERS.has(callee.text)) calls.push(line);
      // A loadOnce is bound at the top of its module, before any call reads it.
      if (
        ts.isPropertyAccessExpression(callee) &&
        callee.name.text === "load" &&
        ts.isIdentifier(callee.expression) &&
        bound.has(callee.expression.text)
      )
        calls.push(line);
    });
    if (exportsLoader > 0)
      findings.push({
        file,
        line: exportsLoader,
        what: "exports a loadOnce loader outside DEFINERS (its callers would escape the census)",
      });
    if (calls.length === 0) continue;
    consumers.push(file);
    if (!uses)
      findings.push({
        file,
        line: Math.min(...calls),
        what: "calls an on-demand loader and answers its failure without the mechanism",
      });
  }
  return { consumers, findings };
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src\/(?:server\/|server\.ts$|routes\/api\/|test\/|.*\.server\.ts$)/,
}).filter((file) => !(file in DEFINERS));
const { consumers, findings } = onDemandFailureCensus(domain);
const ALLOWLIST = "scripts/conformance/on-demand-failure-allowlist.txt";
const allowances = readAllowlist(
  ALLOWLIST,
  findings.map((hit) => hit.file),
);

describe("a piece fetched on demand that fails to download tells the person (INC-911)", () => {
  it(
    "ODC-1 every caller of an on-demand loader answers a failure through the mechanism or has a live allowance",
    () => {
      console.log(
        `[ODC-1] loader callers: ${consumers.length}; outside the mechanism: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(consumers.length).toBeGreaterThanOrEqual(15);
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("ODC-2 the census sees a planted silent caller and an exported loader, and passes a planted user", () => {
    const dir = "node_modules/.cache/on-demand-failure";
    mkdirSync(dir, { recursive: true });
    const silent = `${dir}/odc-silent.tsx`;
    const exported = `${dir}/odc-exported.ts`;
    const own = `${dir}/odc-own.ts`;
    const user = `${dir}/odc-user.tsx`;
    const drawer = `${dir}/odc-drawer.tsx`;
    try {
      writeFileSync(
        silent,
        'import { loadLeaflet } from "@/features/posting/map/leaflet";\nvoid loadLeaflet().catch(() => undefined);\n',
      );
      writeFileSync(
        exported,
        'import { loadOnce } from "@/lib/load-once";\nexport const MAP = loadOnce(() => import("./map"));\n',
      );
      writeFileSync(
        own,
        'import { loadOnce } from "@/lib/load-once";\nconst MAP = loadOnce(() => import("./map"));\nconst other = { load: () => 1 };\nother.load();\nvoid MAP.load().catch(() => undefined);\n',
      );
      writeFileSync(
        user,
        'import { reportOnDemandFailure } from "@/lib/on-demand-failure";\nimport { getSupabase } from "@/lib/supabase-door";\nvoid getSupabase().catch((e) => reportOnDemandFailure("x", e));\n',
      );
      writeFileSync(
        drawer,
        'import { OnDemandNotice } from "@/components/shell/on-demand-notice";\nimport { getSupabase } from "@/lib/supabase-door";\nvoid getSupabase().catch(() => undefined);\nexport const Shell = () => <OnDemandNotice />;\n',
      );
      const result = onDemandFailureCensus([silent, exported, own, user, drawer]);
      expect(result.consumers).toEqual([silent, own, user, drawer]);
      expect(report(result.findings)).toBe(
        [
          `${drawer}:3 calls an on-demand loader and answers its failure without the mechanism`,
          `${exported}:2 exports a loadOnce loader outside DEFINERS (its callers would escape the census)`,
          `${own}:5 calls an on-demand loader and answers its failure without the mechanism`,
          `${silent}:2 calls an on-demand loader and answers its failure without the mechanism`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ODC-3 the definers: resilientLazy reports, and every named loader exists over a loadOnce", () => {
    expect(readFileSync("src/lib/resilient-lazy.ts", "utf8")).toMatch(
      /reportOnDemandFailure\(label, error\)/,
    );
    for (const [file, loaders] of Object.entries(DEFINERS)) {
      const text = readFileSync(file, "utf8");
      for (const loader of loaders)
        expect(text, `${file} defines ${loader}`).toMatch(
          new RegExp(`export\\s+(?:async\\s+)?function\\s+${loader}\\b`),
        );
    }
    // Every definer binds a loadOnce, so a renamed or moved loader is seen here.
    for (const file of Object.keys(DEFINERS).filter((file) => !file.endsWith("load-once.ts")))
      if (!file.endsWith("resilient-lazy.ts"))
        expect(readFileSync(file, "utf8"), `${file} binds a loadOnce`).toMatch(/\bloadOnce\(/);
  });
});
FILE-END scripts/conformance/on-demand-failure.test.ts

BLOCK 2 — FILE-BEGIN scripts/conformance/on-demand-failure-allowlist.txt
# INC-911 (Foundations turn 34b-2): a caller of an on-demand loader that answers a failed download without reportOnDemandFailure, refreshPage or LoadFailedHere (src/lib/on-demand-failure.ts, src/components/shell/on-demand-notice.tsx). <path> | <reason> | <until>
src/components/app-shell.tsx | the client handed to the E2E tests (isE2E, DEC-018): never in a production build | 2027-04-26
src/features/auth/auth-service.ts | its actions answer a failed client download as a value, common.loadFailed, which the sign-in screen shows in its own alert (INC-915) | 2027-04-26
src/routes/auth.tsx | a head start on the client once the screen paints; each submit asks again through auth-service and says so in place (INC-915) | 2027-04-26
src/routes/legal.publishing.tsx | a route loader's door: a failed download is the route's own error screen | 2027-04-26
src/components/shell/date-field.tsx | the calendar says it did not load, with a "Try again" that cannot work (the browser keeps the failed download) — onto LoadFailedHere in turn 34b-3 | INC-911
src/components/shell/use-category-glyphs.ts | a failed glyph download is logged and the rows draw without glyphs — reported in turn 34b-3 | INC-911
src/features/auth/use-auth.ts | a signed-in visitor's profile read logs a failed client download — reported in turn 34b-3 | INC-911
src/features/posting/map/map-large.tsx | the large map logs a failed download — reported in turn 34b-3 | INC-911
src/features/posting/map/map-pin-dropper.tsx | the pin map's own map says "Tap the map instead" with no map to tap — onto LoadFailedHere in turn 34b-3 | INC-911
src/features/posting/map/map-preview.tsx | the map preview logs a failed download — reported in turn 34b-3 | INC-911
src/features/posting/preview/listing-detail.tsx | the ad page's map links log a failed download — reported in turn 34b-3 | INC-911
src/features/posting/step-who.tsx | the phone box says so with a "Try again" that cannot work — Refresh in turn 34b-3 | INC-911
src/i18n/provider.tsx | a failed download of a language's strings is an unhandled rejection (INC-919) — reported in turn 34b-3 | INC-911
src/routes/settings.tsx | a failed client download on Settings is logged — reported in turn 34b-3 | INC-911
FILE-END scripts/conformance/on-demand-failure-allowlist.txt

BLOCK 3 — FILE-BEGIN src/features/auth/mfa/step-up-gate.test.tsx
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "./use-step-up";

/**
 * INC-911 — the step-up gate whose dialog code fails to download settles the guarded action as
 * StepUpUnavailable (it could not be asked), never as StepUpCancelled (the person cancelled):
 * the dialog's root hears the failure through `onUnavailable` (overlay-facade.tsx ModalRoot).
 * The overlay loader is replaced so the download fails; the session needs a step-up and has a
 * factor, so the gate opens its code dialog.
 */
vi.mock("@/components/ui/overlay-loader", () => ({
  loadOverlays: () => Promise.reject(new Error("offline")),
  useOverlays: () => null,
  warmOverlaysWhenIdle: () => undefined,
}));
vi.mock("@/lib/on-demand-failure", () => ({ reportOnDemandFailure: () => undefined }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("./mfa-service", async () => {
  const real = await vi.importActual<typeof import("./mfa-service")>("./mfa-service");
  return {
    ...real,
    isStepUpFresh: async () => false,
    listFactors: async () => ({ ok: true, factors: [{ id: "f1" }] }),
  };
});
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: unknown }) => children,
}));

const { StepUpGate } = await import("./step-up-gate");
const { StepUpCancelled, StepUpUnavailable } = await import("./mfa-service");

describe("the step-up gate when its dialog cannot download (INC-911)", () => {
  it("SUG-1 the guarded action settles as StepUpUnavailable and never runs", async () => {
    const captured: { guard?: GuardFn } = {};
    const action = vi.fn(async () => "done");
    render(
      <StepUpGate>
        {(given) => {
          captured.guard = given;
          return <p data-testid="child" />;
        }}
      </StepUpGate>,
    );
    expect(screen.getByTestId("child")).toBeTruthy();
    const guard = captured.guard;
    if (guard === undefined) throw new Error("the gate handed its children no guard");
    let outcome: unknown = "pending";
    act(() => {
      void guard(action).then(
        () => {
          outcome = "resolved";
        },
        (error: unknown) => {
          outcome = error;
        },
      );
    });
    await vi.waitFor(() => {
      expect(outcome).not.toBe("pending");
    });
    expect(action).not.toHaveBeenCalled();
    expect(outcome).toBeInstanceOf(StepUpUnavailable);
    expect(outcome).not.toBeInstanceOf(StepUpCancelled);
    expect(screen.queryByTestId("step-up-modal")).toBeNull();
  });
});
FILE-END src/features/auth/mfa/step-up-gate.test.tsx

BLOCK 4 — FILE-BEGIN src/lib/on-demand-failure.ts
import { useSyncExternalStore } from "react";

import { errorText } from "@/lib/error-text";

/**
 * INC-911 (Foundations turn 34b-2) — A PIECE FETCHED ON DEMAND THAT FAILS TO DOWNLOAD TELLS
 * THE PERSON. The app fetches some of its code only when it is needed (a dialog's or a menu's
 * code, the map, the phone library, the sign-in code; src/lib/load-once.ts,
 * src/components/ui/overlay-loader.ts, src/lib/supabase-door.ts). A failed download first
 * reloads the tab once (src/lib/stale-chunk.ts, INC-640: a tab opened before a Publish asks
 * for old chunk names). A failure that remains is reported here: one `[client-error]` line,
 * and the shell's one notice (src/components/shell/on-demand-notice.tsx) tells the person and
 * offers to refresh the page — the only cure, because the browser keeps a failed module
 * download for the page's life (Chromium, measured 2026-10-26: a second import() of the same
 * address fails at once without asking the server; INC-918). A piece that already says so in
 * its own place (the sign-in form, the strings gate, the phone box, an on-demand component's
 * fallback) reports nothing here; the census (scripts/conformance/on-demand-failure.test.ts)
 * names every loader's caller and where it says so.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let failures = 0;

/** Logs the failure and asks the shell's notice to show (again). */
export function reportOnDemandFailure(label: string, error: unknown): void {
  console.error(`[client-error] ${label} failed to load: ${errorText(error)}`);
  failures += 1;
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** How many on-demand failures this page has reported (0 on the server and before any). */
export function useOnDemandFailures(): number {
  return useSyncExternalStore(
    subscribe,
    () => failures,
    () => 0,
  );
}

/** The cure the notice and every in-place "didn't load" message offer: the page, read afresh. */
export function refreshPage(): void {
  window.location.reload();
}
FILE-END src/lib/on-demand-failure.ts

BLOCK 5 — FILE-BEGIN e2e/on-demand-failure.spec.ts
import { expect, test } from "./fixtures";

import { openAfterTheOneReload, refuseScripts } from "./helpers/on-demand";
import { en } from "../src/i18n/locales/en";

/**
 * INC-911 / INC-918 (Foundations turn 34b-2) — A PIECE FETCHED ON DEMAND THAT FAILS TO DOWNLOAD
 * TELLS THE PERSON AND OFFERS THE ONE CURE. A menu's code (the overlay primitives,
 * src/components/ui/overlay-loader.ts) is refused, as a dropped download on a phone. The app
 * reloads once for a failed chunk (src/lib/stale-chunk.ts, INC-640); the failure that remains is
 * the browser's for the page's life, so the menu's press asks in vain: the shell's one notice
 * (src/components/shell/on-demand-notice.tsx) says part of the page did not load and offers to
 * refresh, the page stays whole, Close puts the notice away, and Refresh reads the page afresh.
 * No rows: the home page as a signed-out visitor sees it.
 */

const OVERLAYS_CHUNK = /\/overlays-impl-[^/]*\.js(?:\?|$)/;

test.describe("ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911)", () => {
  test("ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads", async ({
    page,
  }) => {
    await refuseScripts(page, (url) => OVERLAYS_CHUNK.test(url));
    const loads = await openAfterTheOneReload(page, "/");
    const trigger = page.getByTestId("location-level-country");
    await expect(trigger).toBeVisible();
    await expect(page.getByTestId("on-demand-failed")).toHaveCount(0);

    await trigger.click();
    const notice = page.getByTestId("on-demand-failed");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(en["common.loadFailed"]);
    await expect(page.getByTestId("on-demand-refresh")).toHaveText(en["common.refreshPage"]);
    await expect(page.getByRole("menu")).toHaveCount(0);
    await expect(trigger, "the page stays whole: no route error screen").toBeVisible();
    expect(loads(), "the press asked no reload of its own").toBe(2);

    await page.getByTestId("on-demand-close").click();
    await expect(notice).toHaveCount(0);

    await trigger.click();
    await expect(notice, "a later failure shows the notice again").toBeVisible();
    await page.getByTestId("on-demand-refresh").click();
    await expect.poll(loads, { message: "Refresh reads the page afresh" }).toBe(3);
  });
});
FILE-END e2e/on-demand-failure.spec.ts

BLOCK 6 — FILE-BEGIN src/lib/on-demand-failure.test.ts
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { reportOnDemandFailure, useOnDemandFailures } from "./on-demand-failure";

/**
 * INC-911 — a piece fetched on demand that fails to download is reported once, in one log
 * form, and every reader of the count hears it (the shell's one notice).
 */
describe("the on-demand failure reporter (INC-911)", () => {
  it("ODF-1 a report logs one [client-error] line naming the piece and the cause", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    reportOnDemandFailure("the map", new Error("Failed to fetch dynamically imported module"));
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the map failed to load: Failed to fetch dynamically imported module",
    );
    errors.mockRestore();
  });

  it("ODF-2 every report raises the count its readers hear", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { result } = renderHook(() => useOnDemandFailures());
    const before = result.current;
    act(() => {
      reportOnDemandFailure("a menu's code", new Error("offline"));
    });
    expect(result.current).toBe(before + 1);
    act(() => {
      reportOnDemandFailure("a dialog's code", new Error("offline"));
    });
    expect(result.current).toBe(before + 2);
    errors.mockRestore();
  });
});
FILE-END src/lib/on-demand-failure.test.ts

BLOCK 7 — FILE-BEGIN src/components/shell/on-demand-notice.tsx
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { CARD_SURFACE } from "@/components/layout/surface";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { refreshPage, useOnDemandFailures } from "@/lib/on-demand-failure";
import { cn } from "@/lib/utils";

/**
 * INC-911 — the shell's one notice for a piece of the page whose code did not download
 * (src/lib/on-demand-failure.ts): it says so and offers to refresh the page, the only cure
 * (the browser keeps a failed download for the page's life). It shows from the first failure
 * until the person closes it or refreshes; a later failure shows it again. Drawn above the
 * phone's bottom bar; a polite live region, so a screen reader hears it once.
 */
export function OnDemandNotice() {
  const { t } = useI18n();
  const failures = useOnDemandFailures();
  const [closedAt, setClosedAt] = useState(0);
  useEffect(() => {
    if (failures === 0) setClosedAt(0);
  }, [failures]);
  const shown = failures > closedAt;
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-16 z-50 flex justify-center px-4 md:bottom-6"
    >
      {shown ? (
        <div
          data-testid="on-demand-failed"
          className={cn(
            CARD_SURFACE,
            "pointer-events-auto flex max-w-md items-center gap-3 px-3 py-2 text-sm text-foreground",
          )}
        >
          <span>{t("common.loadFailed")}</span>
          <Button
            variant="link"
            size="touch"
            data-testid="on-demand-refresh"
            className="shrink-0 px-2"
            onClick={refreshPage}
          >
            {t("common.refreshPage")}
          </Button>
          <Button
            variant="ghost"
            size="touch"
            data-testid="on-demand-close"
            aria-label={t("common.close")}
            className="w-11 shrink-0 p-0"
            onClick={() => setClosedAt(failures)}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

/**
 * INC-911 — the same words and the same cure IN PLACE, for a piece whose own place has room to say
 * so (the calendar, the pin map, a page's strings): what the shell's notice says, and a Refresh
 * button. A piece that says so here does not also report to the shell's notice.
 */
export function LoadFailedHere({
  testid,
  refreshTestid,
  className,
}: {
  testid: string;
  refreshTestid: string;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <div
      role="alert"
      data-testid={testid}
      className={cn(
        "flex flex-col items-center gap-2 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      <span>{t("common.loadFailed")}</span>
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid={refreshTestid}
        onClick={refreshPage}
      >
        {t("common.refreshPage")}
      </Button>
    </div>
  );
}
FILE-END src/components/shell/on-demand-notice.tsx

BLOCK 8 — FILE-BEGIN src/components/shell/on-demand-notice.test.tsx
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * INC-911 — the shell's one notice: nothing until a piece fails to download; then the words
 * and Refresh page; closed by the person, shown again by the next failure.
 */
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async () => {
  const real =
    await vi.importActual<typeof import("@/lib/on-demand-failure")>("@/lib/on-demand-failure");
  return { ...real, refreshPage: refreshed };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

const { OnDemandNotice } = await import("./on-demand-notice");
const { reportOnDemandFailure } = await import("@/lib/on-demand-failure");

describe("OnDemandNotice (INC-911)", () => {
  it("ODN-1 nothing shows until a failure; a failure shows the words and Refresh page; Close hides it; the next failure shows it again", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<OnDemandNotice />);
    expect(screen.queryByTestId("on-demand-failed")).toBeNull();
    act(() => {
      reportOnDemandFailure("a menu's code", new Error("offline"));
    });
    expect(screen.getByTestId("on-demand-failed").textContent).toContain("common.loadFailed");
    fireEvent.click(screen.getByTestId("on-demand-refresh"));
    expect(refreshed).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId("on-demand-close"));
    expect(screen.queryByTestId("on-demand-failed")).toBeNull();
    act(() => {
      reportOnDemandFailure("the map", new Error("offline"));
    });
    expect(screen.getByTestId("on-demand-failed")).toBeTruthy();
    errors.mockRestore();
  });
});
FILE-END src/components/shell/on-demand-notice.test.tsx

BLOCK 9 — FILE-BEGIN e2e/helpers/on-demand.ts
import type { Page } from "@playwright/test";

import { expect } from "../fixtures";
import { STALE_CHUNK_KEY } from "../../src/lib/stale-chunk";
import { waitForHydration } from "./ui";

/**
 * INC-911, INC-915 (Foundations turns 34, 34b-2) — A DOWNLOAD THAT FAILS, AS ON A PHONE. The app
 * fetches some of its code only when it is needed; these helpers refuse such a script and open a
 * page past the app's one reload for a failed chunk (src/lib/stale-chunk.ts, INC-640), so a test
 * sees what a visitor whose download keeps failing sees.
 */

/** Every script `refuse` names (by its address and its text) is refused, as a dropped download. */
export async function refuseScripts(
  page: Page,
  refuse: (url: string, text: string) => boolean,
): Promise<void> {
  await page.route("**/*.js", async (route) => {
    const response = await route.fetch();
    if (refuse(route.request().url(), await response.text())) await route.abort("failed");
    else await route.fulfill({ response });
  });
}

/**
 * Opens `path` with a download refused and waits for the app's one reload for a failed chunk and
 * for the page it lands on to be ready, so a test acts on the page that stays. Returns the page's
 * load count, which a test checks stays at two (or rises when it refreshes on purpose).
 */
export async function openAfterTheOneReload(page: Page, path: string): Promise<() => number> {
  let loads = 0;
  page.on("load", () => {
    loads += 1;
  });
  // Not gotoReady: the reload can land while it waits, and a destroyed page is not this test's subject.
  await page.goto(path);
  await expect
    .poll(() => loads, { message: "the app reloaded once for the failed chunk (INC-640)" })
    .toBe(2);
  await waitForHydration(page);
  expect(
    await page.evaluate((key) => window.sessionStorage.getItem(key), STALE_CHUNK_KEY),
    "the reload was the stale-chunk rule's",
  ).not.toBeNull();
  return () => loads;
}
FILE-END e2e/helpers/on-demand.ts
```

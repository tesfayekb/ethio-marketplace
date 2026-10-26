# Foundations — turn 34b-3: every remaining piece fetched on demand answers a failed download through the mechanism — the maps, the pin map, the calendar, a page's strings, the phone box, the glyphs, Settings, the account read, a language's strings (INC-911, INC-918, INC-919, INC-909) — and the guard reads each call (34b-2's reviewer): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34b-3 (2026-10-26; DEC-237; INC-911 finished; INC-918, INC-919, INC-909; anchors located at 470d16baef25173a3993588d6d9076b0bfc822c7). The last of turn 34b's three parts: the ten consumers turn 34b-2's guard names until INC-911 closes move onto the mechanism, with the strings gate and the footer's font wait; the allowlist goes down to its four lines for good; and the guard's census closes the two gaps turn 34b-2's reviewer found (a loader imported under another name or through a namespace is still a call; a file is on the mechanism only where each call's own failure is answered). Tier B (screens and their downloads; no auth flow changes — use-auth and Settings only report a failed download). No migration. No new string; one retired (listed below). No package change. No AGENTS.md change. No file deleted. Base: dev 470d16baef25173a3993588d6d9076b0bfc822c7 (turn 34w's landing — NOT READY: SO-11 and SO-12 red, their fix is the turn after this one). The supervisor sends this brief directly (the operator is away). RE-SENT after your STOP of the first sending (0679c983…, report docs/governance/reports/foundations-turn-34b-3.report.md): you were right — C1 now reads DEFINERS through `ownValue` (src/lib/own-key.ts), the own-key rule (AGENTS.md :32); your STOP report is replaced by this turn's completion report at the same path. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the consumers; D — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 470d16baef25173a3993588d6d9076b0bfc822c7
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/on-demand-failure.test.ts
src/components/shell/date-field-offline.test.tsx
src/components/shell/date-field.tsx
src/components/shell/strings-layer-gate.test.tsx
src/components/shell/strings-layer-gate.tsx
src/components/shell/use-category-glyphs.ts
src/components/shell/use-footer-inset.ts
src/features/auth/use-auth.ts
src/features/posting/map/map-large.tsx
src/features/posting/map/map-pin-dropper-offline.test.tsx
src/features/posting/map/map-pin-dropper.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/phone-parse.ts
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/i18n/compiled-catalog.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-member.ts
src/i18n/provider.tsx
src/lib/load-once.ts
src/routes/settings.tsx
SCOPE-END

THE SYSTEM (G0) — one concern, continued from turn 34b-2.
CONCERN: a piece of the app fetched on demand whose download fails tells the person, and offers the one cure, a refresh — never silence, never an unhandled rejection, never a "Try again" that cannot work (the browser keeps a failed module download for the page's life: INC-918).
MECHANISM: src/lib/on-demand-failure.ts (`reportOnDemandFailure`, `refreshPage`) and src/components/shell/on-demand-notice.tsx (`OnDemandNotice`, `LoadFailedHere`) — register row 52, built in turn 34b-2.
CONSUMERS (the guard's census at BASE — scripts/conformance/on-demand-failure-allowlist.txt's ten lines `until INC-911`, re-located; and the in-place answers beside the loaders; the tightened census of Part C names no other caller in the tree):
- src/components/shell/date-field.tsx :49 — the calendar: "Try again" → LoadFailedHere (DF-6);
- src/components/shell/strings-layer-gate.tsx — a page's strings layer: `auth.errorGeneric` with a "Try again" → LoadFailedHere (SLG-3);
- src/components/shell/use-category-glyphs.ts :39 — logs; rows draw without glyphs → report;
- src/features/auth/use-auth.ts :71 — a signed-in visitor's profile read logs → report;
- src/features/posting/map/map-large.tsx :41 and map-preview.tsx :74 — logged or silent → report;
- src/features/posting/map/map-pin-dropper.tsx :191 — "The place search is unavailable. Tap the map instead." with no map to tap → LoadFailedHere (PMD-1);
- src/features/posting/preview/listing-detail.tsx :49 — the map's links: logged → report;
- src/features/posting/step-who.tsx :210 — the phone box: a "Try again" that cannot work → Refresh (`common.refreshPage`) on the shared Button, as LoadFailedHere draws it (`variant="outline" size="touch"`), its own words kept; `post.who.phoneLibRetry` retired;
- src/i18n/provider.tsx :594 — a language's compiled strings: an UNHANDLED REJECTION, nothing applied, nothing said (INC-919) → report; a failed language part of a strings layer → report;
- src/routes/settings.tsx :173 — logs → report;
- src/components/shell/use-footer-inset.ts — the footer's font wait, a silent catch (INC-909) → a `[client-error]` line;
- the comments that promise a retry of a failed download (src/lib/load-once.ts, src/i18n/compiled-catalog.ts, src/features/posting/phone-parse.ts) — corrected (INC-918).
COVERED HERE: every consumer above. LEFT: none of the concern; the i18n provider's `useStringsLayers().retry` has no product caller after this turn (turn 34c retires it — its roadmap line).
CONFORMANCE GUARD: ODC-1 (scripts/conformance/on-demand-failure.test.ts) with its allowlist down to the four lines for good — red on BASE once the ten lines go (Part B); the census itself reads each call (Part C): a loader is found by the module it is imported from — under any local name, or through a namespace — and each call is judged by its own rejection handler (`.catch`, `.then`'s second argument, `await` inside a `try`, a `Promise` combinator's handler, or resilientLazy, which reports), a handler that drops the failure is silent, and a factory's loader (compiledCatalogLoader, compiledLayerLoader) is followed to its call; ODC-2's planted files now also name the silent catches, and ODC-4 plants an aliased, a namespaced, a mention-only, a warm-up, a resilientLazy and a factory caller — red on BASE's census (Part B); DF-6, SLG-3 (their words), PMD-1 (src/features/posting/map/map-pin-dropper-offline.test.tsx, BLOCK 1), PLF-1 (src/features/posting/step-who.test.tsx: the phone box says so in place, offers Refresh on the shared Button and logs its `[client-error]` line).
EXCEPTIONS: the allowlist's four lines (the E2E client hand-off; the sign-in screen's in-place answer; its head start; a route loader's error screen).
FIVE LENSES — security: none changed · performance: none on any first download (the reporter and the notice landed in turn 34b-2) · failure modes: the subject; every failed download is said once, in the shell or in place · consistency: one log line, one notice, one in-place piece and one set of words for every on-demand piece · future growth: a new loader's caller is named by ODC-1 the day it lands.
FORWARD-SCAN: turns 35–37 add callers; ODC-1 names them. REGISTER: row 52's guard text (ODC-4), allowlist note and test ids (Part D).

THE STRINGS (G43): RETIRED post.who.phoneLibRetry — en "Try again" / am «እንደገና ይሞክሩ» (the phone box's Refresh uses common.refreshPage).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34b-3.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: none in this turn.
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once in the file as the blocks before it left it — at BASE, except Part C's census blocks, which follow Part B's) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34b-3.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. docs/generated/i18n-usage.json and public/i18n-usage.json are regenerated (`bun run i18n:usage`), never edited. No NEW or FILE block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34b-3.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md, docs/generated/i18n-usage.json, public/i18n-usage.json and docs/governance/reports/foundations-turn-34b-3.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows ODC-1 naming the ten consumers, ODC-2 and ODC-4 failing on BASE's census, and DF-6, SLG-3, PMD-1 and PLF-1 failing, on BASE's code before Part C's edits.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407).
- Behaviour contract: with every download succeeding, every page, map, calendar, phone box, glyph, setting and language behaves as today and the notice never shows. Changed: each consumer above answers a failed download through the mechanism (the shell's notice, or LoadFailedHere / Refresh in its own place); a failed language download no longer rejects unhandled. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every caller of an on-demand loader not on the mechanism (none may remain but the allowlist's four), every in-place "didn't load" message not drawn by LoadFailedHere (the phone box's own words are expected), and every "Try again" or retry still offered for a failed download (none may remain); K3 the guard's allowlist shrinks in this turn; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened — DF-6 and SLG-3 change what they expect with the screen (a refresh, not a retry); ODC-2 expects more findings (the silent catches), never fewer; ODC-4 and PLF-1 are new (the phone box had no failure test); every other test unchanged.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE, turn 34w's landing — still running, or red with e2e/auth-signout.spec.ts SO-11 and SO-12 at both widths and nothing else: those four are turn 34w's own sign-out failures, diagnosed and fixed by the supervisor's next brief, not in this turn — do not touch e2e/auth-signout.spec.ts, src/components/app-shell.tsx or src/routes/__root.tsx). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The allowlist loses its ten lines, the census's own tests name what the tightened census must find (ODC-2's expectation; ODC-4 — only the tests; the census's code changes in Part C), the two tests expect a refresh, the phone box gets its test, and the pin map's test — BLOCK 1 (src/features/posting/map/map-pin-dropper-offline.test.tsx):
EDIT scripts/conformance/on-demand-failure-allowlist.txt #1
OLD-BEGIN
# INC-911 (Foundations turn 34b-2): a caller of an on-demand loader that answers a failed download without reportOnDemandFailure, refreshPage or LoadFailedHere (src/lib/on-demand-failure.ts, src/components/shell/on-demand-notice.tsx). <path> | <reason> | <until>
src/components/app-shell.tsx | the client handed to the E2E tests (isE2E, DEC-018): never in a production build | 2027-04-26
OLD-END
NEW-BEGIN
# INC-911 (Foundations turns 34b-2, 34b-3): a caller of an on-demand loader that answers a failed download without reportOnDemandFailure, refreshPage or LoadFailedHere (src/lib/on-demand-failure.ts, src/components/shell/on-demand-notice.tsx). <path> | <reason> | <until>
src/components/app-shell.tsx | the client handed to the E2E tests (isE2E, DEC-018): never in a production build | 2027-04-26
NEW-END
EDIT scripts/conformance/on-demand-failure-allowlist.txt #2
OLD-BEGIN
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
OLD-END
NEW-BEGIN
src/routes/legal.publishing.tsx | a route loader's door: a failed download is the route's own error screen | 2027-04-26
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #1
OLD-BEGIN
          `${drawer}:3 calls an on-demand loader and answers its failure without the mechanism`,
          `${exported}:2 exports a loadOnce loader outside DEFINERS (its callers would escape the census)`,
          `${own}:5 calls an on-demand loader and answers its failure without the mechanism`,
          `${silent}:2 calls an on-demand loader and answers its failure without the mechanism`,
        ].join("\n"),
OLD-END
NEW-BEGIN
          `${drawer}:3 calls an on-demand loader and answers its failure without the mechanism`,
          `${drawer}:3 catches a failed download of getSupabase silently, and no call in the file handles it`,
          `${exported}:2 exports a loadOnce loader outside DEFINERS (its callers would escape the census)`,
          `${own}:5 calls an on-demand loader and answers its failure without the mechanism`,
          `${own}:5 catches a failed download of MAP silently, and no call in the file handles it`,
          `${silent}:2 calls an on-demand loader and answers its failure without the mechanism`,
          `${silent}:2 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ODC-4 each call handles its own failure: an aliased or namespaced loader is still a call, and a mention elsewhere answers nothing (34b-2's reviewer)", () => {
    const dir = "node_modules/.cache/on-demand-failure-4";
    mkdirSync(dir, { recursive: true });
    const files = {
      aliased: `${dir}/odc-aliased.ts`,
      namespaced: `${dir}/odc-namespaced.ts`,
      mention: `${dir}/odc-mention.ts`,
      warm: `${dir}/odc-warm.ts`,
      lazy: `${dir}/odc-lazy.ts`,
      factory: `${dir}/odc-factory.ts`,
    };
    const report4 = 'import { reportOnDemandFailure } from "@/lib/on-demand-failure";\n';
    try {
      writeFileSync(
        files.aliased,
        `${report4}import { getSupabase as client } from "@/lib/supabase-door";\nvoid client();\nexport const told = () => reportOnDemandFailure("x", 1);\n`,
      );
      writeFileSync(
        files.namespaced,
        'import * as door from "@/lib/supabase-door";\nvoid door.getSupabase().then(() => 1);\n',
      );
      writeFileSync(
        files.mention,
        'import { refreshPage } from "@/lib/on-demand-failure";\nimport { loadLeaflet } from "@/features/posting/map/leaflet";\nexport const go = refreshPage;\nvoid loadLeaflet().catch(() => undefined);\n',
      );
      writeFileSync(
        files.warm,
        `${report4}import { loadOverlays } from "@/components/ui/overlay-loader";\nloadOverlays().catch(() => undefined);\nloadOverlays().catch((error) => reportOnDemandFailure("x", error));\n`,
      );
      writeFileSync(
        files.lazy,
        'import { refreshPage } from "@/lib/on-demand-failure";\nimport { loadOnce } from "@/lib/load-once";\nimport { resilientLazy } from "@/lib/resilient-lazy";\nconst MAP = loadOnce(() => import("./map"));\nexport const Map = resilientLazy(() => MAP.load().then((m) => m.Map), "the map", () => null);\nexport const go = refreshPage;\n',
      );
      writeFileSync(
        files.factory,
        `${report4}import { compiledCatalogLoader } from "@/i18n/compiled-catalog";\nexport async function read() {\n  const loader = compiledCatalogLoader("xx");\n  try {\n    return await loader?.();\n  } catch (error) {\n    reportOnDemandFailure("x", error);\n  }\n}\n`,
      );
      const result = onDemandFailureCensus(Object.values(files));
      expect(result.consumers).toEqual(Object.values(files));
      expect(report(result.findings)).toBe(
        [
          `${files.aliased}:3 leaves a failed download of getSupabase unhandled`,
          `${files.mention}:4 catches a failed download of loadLeaflet silently, and no call in the file handles it`,
          `${files.namespaced}:2 calls an on-demand loader and answers its failure without the mechanism`,
          `${files.namespaced}:2 leaves a failed download of getSupabase unhandled`,
        ].join("\n"),
NEW-END
EDIT src/components/shell/date-field-offline.test.tsx #1
OLD-BEGIN
 * D234 speed turn S1 — the date field downloads its calendar on first open; a
 * download that fails says so with "Try again", which asks once more. The page
 * never breaks over it.
 */
let attempts = 0;
vi.mock("./date-calendar", () => {
  attempts += 1;
  throw new Error("offline");
OLD-END
NEW-BEGIN
 * D234 speed turn S1 — the date field downloads its calendar on first open; a
 * download that fails says so in the calendar's place and (INC-911) offers to
 * refresh the page — the browser keeps a failed download for the page's life, so
 * asking again cannot help. The page never breaks over it.
 */
vi.mock("./date-calendar", () => {
  throw new Error("offline");
NEW-END
EDIT src/components/shell/date-field-offline.test.tsx #2
OLD-BEGIN
}));

OLD-END
NEW-BEGIN
}));
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: refreshed }));

NEW-END
EDIT src/components/shell/date-field-offline.test.tsx #3
OLD-BEGIN
describe("DateField offline (D234)", () => {
  it("DF-6 a calendar that cannot download offers Try again, which asks once more", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
OLD-END
NEW-BEGIN
describe("DateField offline (D234)", () => {
  it("DF-6 a calendar that cannot download says so and offers a refresh (INC-911)", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
NEW-END
EDIT src/components/shell/date-field-offline.test.tsx #4
OLD-BEGIN
    fireEvent.click(screen.getByTestId("df"));
    const retry = await screen.findByTestId("df-calendar-retry");
    expect(retry.textContent).toBe("common.tryAgain");
    expect(screen.queryByTestId("df-day-2026-10-11")).toBeNull();
    const before = attempts;
    fireEvent.click(retry);
    expect(await screen.findByTestId("df-calendar-retry")).toBeTruthy();
    expect(attempts).toBeGreaterThan(before);
    expect(errors).toHaveBeenCalledWith(
OLD-END
NEW-BEGIN
    fireEvent.click(screen.getByTestId("df"));
    const failed = await screen.findByTestId("df-calendar-failed");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.queryByTestId("df-day-2026-10-11")).toBeNull();
    const refresh = screen.getByTestId("df-calendar-refresh");
    expect(refresh.textContent).toBe("common.refreshPage");
    fireEvent.click(refresh);
    expect(refreshed).toHaveBeenCalledTimes(1);
    expect(errors).toHaveBeenCalledWith(
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #1
OLD-BEGIN
 * none draws at once; a page that declares one waits for it, says so when it
 * fails (with Try again), and draws once it is in.
 */
OLD-END
NEW-BEGIN
 * none draws at once; a page that declares one waits for it, says so when it
 * fails (with Refresh page — INC-911), and draws once it is in.
 */
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #2
OLD-BEGIN

vi.mock("@tanstack/react-router", () => ({
OLD-END
NEW-BEGIN

const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: refreshed }));
vi.mock("@tanstack/react-router", () => ({
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #3
OLD-BEGIN
  state.retry.mockReset();
});
OLD-END
NEW-BEGIN
  state.retry.mockReset();
  refreshed.mockReset();
});
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #4
OLD-BEGIN

  it("SLG-3 a failed layer says so, with Try again that asks again", () => {
    state.matches = [{ staticData: { strings: ["admin", "member"] } }];
OLD-END
NEW-BEGIN

  it("SLG-3 a failed layer says so, and offers to refresh the page (INC-911)", () => {
    state.matches = [{ staticData: { strings: ["admin", "member"] } }];
NEW-END
EDIT src/components/shell/strings-layer-gate.test.tsx #5
OLD-BEGIN
    draw();
    expect(screen.getByTestId("strings-layer-failed").textContent).toContain("auth.errorGeneric");
    expect(screen.queryByTestId("route")).toBeNull();
    fireEvent.click(screen.getByTestId("strings-layer-retry"));
    expect(state.retry).toHaveBeenCalledTimes(1);
    expect(state.asked.at(-1)).toEqual(["admin", "member"]);
OLD-END
NEW-BEGIN
    draw();
    expect(screen.getByTestId("strings-layer-failed").textContent).toContain("common.loadFailed");
    expect(screen.queryByTestId("route")).toBeNull();
    fireEvent.click(screen.getByTestId("strings-layer-refresh"));
    expect(refreshed).toHaveBeenCalledTimes(1);
    expect(state.asked.at(-1)).toEqual(["admin", "member"]);
NEW-END
The phone box's test (PLF-1, beside D231; its mocks let the library fail and count the refresh):
EDIT src/features/posting/step-who.test.tsx #1
OLD-BEGIN
  useOpenMarkets: () => ({ markets: [] }),
}));
vi.mock("./phone-parse", async (original) => ({
  ...(await original<typeof import("./phone-parse")>()),
  loadPhoneLib: async () => null,
}));
vi.mock("./posting-service", () => ({
OLD-END
NEW-BEGIN
  useOpenMarkets: () => ({ markets: [] }),
}));
const phone = vi.hoisted(() => ({ fails: false }));
const refresh = vi.hoisted(() => ({ calls: 0 }));
vi.mock("./phone-parse", async (original) => ({
  ...(await original<typeof import("./phone-parse")>()),
  loadPhoneLib: async () => {
    if (phone.fails) throw new TypeError("Failed to fetch dynamically imported module");
    return null;
  },
}));
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: () => {
    refresh.calls += 1;
  },
}));
vi.mock("./posting-service", () => ({
NEW-END
EDIT src/features/posting/step-who.test.tsx #2
OLD-BEGIN
  view?.unmount();
});
OLD-END
NEW-BEGIN
  view?.unmount();
});

it("PLF-1 a phone library that cannot download says so in place and offers a refresh, not a retry (INC-911)", async () => {
  phone.fails = true;
  refresh.calls = 0;
  const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
  try {
    let view: ReturnType<typeof render> | undefined;
    await act(async () => {
      view = render(
        <StepWho
          contactPref={{ messages: true }}
          refusals={[]}
          onChange={() => {}}
          onMissing={() => {}}
        />,
      );
    });
    const failed = await screen.findByTestId("post-who-phone-lib-failed");
    expect(failed).toHaveTextContent("post.who.phoneLibFailed");
    const button = screen.getByTestId("post-who-phone-lib-refresh");
    expect(button).toHaveTextContent("common.refreshPage");
    expect(screen.queryByText("post.who.phoneLibRetry")).toBeNull();
    fireEvent.click(button);
    expect(refresh.calls).toBe(1);
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining("[client-error] the phone library failed to load"),
    );
    view?.unmount();
  } finally {
    log.mockRestore();
    phone.fails = false;
  }
});
NEW-END
B2. Run `bunx vitest run scripts/conformance/on-demand-failure.test.ts src/components/shell/date-field-offline.test.tsx src/components/shell/strings-layer-gate.test.tsx src/features/posting/map/map-pin-dropper-offline.test.tsx src/features/posting/step-who.test.tsx` — the supervisor's run on BASE: `Tests  7 failed | 5 passed (12)`: ODC-1 names the ten (`calls an on-demand loader and answers its failure without the mechanism`, the first `src/components/shell/date-field.tsx:49`), ODC-2 (`expected 'node_modules/.cache/on-demand-failure…' to be 'node_modules/.cache/on-demand-failure…'` — BASE's census names no silent catch), ODC-4 (`expected [ …(4) ] to deeply equal [ …(6) ]` — BASE's census does not see the aliased and the namespaced caller), DF-6 (`Unable to find an element by: [data-testid="df-calendar-failed"]`), SLG-3 (`expected 'auth.errorGenericcommon.tryAgain' to contain 'common.loadFailed'`), PMD-1 (`Unable to find an element by: [data-testid="post-pin-load-failed"]`), PLF-1 (`Unable to find an element by: [data-testid="post-who-phone-lib-refresh"]`) — paste the failure lines and the totals.

PART C — THE CENSUS, THEN THE CONSUMERS.
C1. The census reads each call (its code only; Part B gave it its tests):
EDIT scripts/conformance/on-demand-failure.test.ts #2
OLD-BEGIN
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";
OLD-END
NEW-BEGIN
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { posix } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { ownValue } from "../../src/lib/own-key";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #3
OLD-BEGIN
 * The census reads every browser file (tests and test support excepted) for a call of an
 * on-demand loader: a definer's loader by name (LOADERS), or `.load()` on a `loadOnce(…)` bound
 * in the same file. Each such file uses the mechanism — it calls or renders an answer imported
 * from on-demand-failure or on-demand-notice (reportOnDemandFailure, refreshPage,
 * LoadFailedHere) — or carries an allowance (`file | reason | until`) in
 * on-demand-failure-allowlist.txt. The definers themselves (DEFINERS) are the mechanism's
 * plumbing and are read by ODC-3 instead: resilientLazy reports for every component it fetches,
 * and no file outside them exports a loader its callers could miss.
 */
OLD-END
NEW-BEGIN
 * The census reads every browser file (tests and test support excepted) for a call of an
 * on-demand loader: a definer's loader IMPORTED from its definer — under any local name, or
 * through a namespace import (Foundations turn 34b-3; 34b-2's reviewer, MAJOR 1) — or `.load()`
 * on a `loadOnce(…)` bound in the same file. Each such file uses the mechanism — it calls or
 * renders an answer imported from on-demand-failure or on-demand-notice (reportOnDemandFailure,
 * refreshPage, LoadFailedHere) — or carries an allowance (`file | reason | until`) in
 * on-demand-failure-allowlist.txt. And each CALL handles its own failure (MAJOR 2): its promise
 * chain carries a rejection handler (`.catch(h)`, `.then(ok, h)`, through Promise.all), or it is
 * awaited inside a try with a catch; a handler that does nothing is a warm-up, allowed only when
 * another call of the same loader in the file handles its failure; a call inside the function a
 * resilientLazy is given is answered by resilientLazy. A loader factory's call
 * (compiledCatalogLoader) is judged by the calls of the loader it returns. The definers themselves
 * (DEFINERS) are the mechanism's plumbing and are read by ODC-3 instead. What the census does not
 * judge: whether a handler that does something answers the person — a review question.
 */
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #4
OLD-BEGIN
};
const LOADERS = new Set(Object.values(DEFINERS).flat());

OLD-END
NEW-BEGIN
};
/** Loaders that return the loader to call rather than a promise. */
const FACTORIES = new Set(["compiledCatalogLoader", "compiledLayerLoader"]);

NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #5
OLD-BEGIN

/** Every loader call in `files` that is not answered through the mechanism. */
OLD-END
NEW-BEGIN

/** The definer a module specifier names, from `file`: "@/…" is src/…, "./…" is beside it. */
function definerOf(specifier: string, file: string): string | undefined {
  const base = specifier.startsWith("@/")
    ? `src/${specifier.slice(2)}`
    : specifier.startsWith(".")
      ? posix.normalize(posix.join(posix.dirname(file), specifier))
      : undefined;
  if (base === undefined) return undefined;
  return Object.keys(DEFINERS).find((definer) => definer.replace(/\.tsx?$/, "") === base);
}

const PROMISE_COMBINERS = new Set(["all", "allSettled", "race", "any"]);

/** The rejection handler of a loader call's promise, "lazy" inside resilientLazy, or null. */
function rejectionHandler(call: ts.Node): ts.Node | "lazy" | null {
  for (let up: ts.Node = call; up.parent !== undefined; up = up.parent) {
    if (ts.isFunctionLike(up)) {
      const host = up.parent;
      if (
        ts.isCallExpression(host) &&
        ts.isIdentifier(host.expression) &&
        host.expression.text === "resilientLazy"
      )
        return "lazy";
      break;
    }
  }
  let node: ts.Node = call;
  for (;;) {
    const parent = node.parent;
    if (parent === undefined) return null;
    if (ts.isParenthesizedExpression(parent) || ts.isAsExpression(parent)) {
      node = parent;
      continue;
    }
    if (
      ts.isArrayLiteralExpression(parent) &&
      ts.isCallExpression(parent.parent) &&
      ts.isPropertyAccessExpression(parent.parent.expression) &&
      ts.isIdentifier(parent.parent.expression.expression) &&
      parent.parent.expression.expression.text === "Promise" &&
      PROMISE_COMBINERS.has(parent.parent.expression.name.text)
    ) {
      node = parent.parent;
      continue;
    }
    if (
      ts.isPropertyAccessExpression(parent) &&
      parent.expression === node &&
      ts.isCallExpression(parent.parent) &&
      parent.parent.expression === parent
    ) {
      const step = parent.name.text;
      const chained = parent.parent;
      if (step === "catch") return chained.arguments[0] ?? null;
      if (step === "then" && chained.arguments.length >= 2) return chained.arguments[1] ?? null;
      if (step === "then" || step === "finally") {
        node = chained;
        continue;
      }
      return null;
    }
    if (ts.isAwaitExpression(parent)) {
      for (let up: ts.Node = parent; up.parent !== undefined; up = up.parent) {
        if (ts.isFunctionLike(up)) return null;
        const host = up.parent;
        if (ts.isTryStatement(host) && host.tryBlock === up && host.catchClause !== undefined)
          return host.catchClause.block;
      }
      return null;
    }
    return null;
  }
}

/** A handler that does nothing: `() => undefined`, `() => {}`, `() => void 0`. */
function isSilent(handler: ts.Node): boolean {
  if (!ts.isArrowFunction(handler) && !ts.isFunctionExpression(handler)) return false;
  const body = handler.body;
  if (ts.isBlock(body)) return body.statements.length === 0;
  return (ts.isIdentifier(body) && body.text === "undefined") || ts.isVoidExpression(body);
}

/** The calls of the loader a factory call returned (`const loader = compiledCatalogLoader(…)`). */
function factoryLoads(call: ts.CallExpression): ts.Node[] {
  const declaration = call.parent;
  if (!ts.isVariableDeclaration(declaration) || !ts.isIdentifier(declaration.name)) return [call];
  const name = declaration.name.text;
  let scope: ts.Node = declaration;
  while (scope.parent !== undefined && !ts.isFunctionLike(scope) && !ts.isSourceFile(scope))
    scope = scope.parent;
  const loads: ts.Node[] = [];
  const look = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === name
    )
      loads.push(node);
    ts.forEachChild(node, look);
  };
  look(scope);
  return loads.length > 0 ? loads : [call];
}

type LoaderCall = { loader: string; node: ts.Node; line: number };

/** Every loader call in `files` that is not answered through the mechanism. */
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #6
OLD-BEGIN
    const bound = new Set<string>();
    const calls: number[] = [];
    const imported = new Set<string>();
OLD-END
NEW-BEGIN
    const bound = new Set<string>();
    const named = new Map<string, string>();
    const namespaces = new Map<string, readonly string[]>();
    const calls: LoaderCall[] = [];
    const imported = new Set<string>();
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #7
OLD-BEGIN
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
OLD-END
NEW-BEGIN
    visitTs(file, (node, source) => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const specifier = node.moduleSpecifier.text;
        const bindings = node.importClause?.namedBindings;
        if (MECHANISM.test(specifier)) {
          if (bindings !== undefined && ts.isNamedImports(bindings))
            for (const element of bindings.elements)
              if (ANSWERS.has((element.propertyName ?? element.name).text))
                imported.add(element.name.text);
          return;
        }
        const definer = definerOf(specifier, file);
        if (definer === undefined) return;
        const loaders = ownValue(DEFINERS, definer) ?? [];
        if (bindings !== undefined && ts.isNamedImports(bindings))
          for (const element of bindings.elements) {
            const name = (element.propertyName ?? element.name).text;
            if (loaders.includes(name)) named.set(element.name.text, name);
          }
        if (bindings !== undefined && ts.isNamespaceImport(bindings))
          namespaces.set(bindings.name.text, loaders);
        return;
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #8
OLD-BEGIN
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (ts.isIdentifier(callee) && LOADERS.has(callee.text)) calls.push(line);
      // A loadOnce is bound at the top of its module, before any call reads it.
OLD-END
NEW-BEGIN
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      const viaName = ts.isIdentifier(callee) ? named.get(callee.text) : undefined;
      if (viaName !== undefined) calls.push({ loader: viaName, node, line });
      if (
        ts.isPropertyAccessExpression(callee) &&
        ts.isIdentifier(callee.expression) &&
        namespaces.get(callee.expression.text)?.includes(callee.name.text) === true
      )
        calls.push({ loader: callee.name.text, node, line });
      // A loadOnce is bound at the top of its module, before any call reads it.
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #9
OLD-BEGIN
      )
        calls.push(line);
    });
OLD-END
NEW-BEGIN
      )
        calls.push({ loader: callee.expression.text, node, line });
    });
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #10
OLD-BEGIN
        file,
        line: Math.min(...calls),
        what: "calls an on-demand loader and answers its failure without the mechanism",
      });
  }
OLD-END
NEW-BEGIN
        file,
        line: Math.min(...calls.map((call) => call.line)),
        what: "calls an on-demand loader and answers its failure without the mechanism",
      });
    const judged = calls.map((call) => {
      const loads =
        FACTORIES.has(call.loader) && ts.isCallExpression(call.node)
          ? factoryLoads(call.node)
          : [call.node];
      const handlers = loads.map(rejectionHandler);
      const verdict = handlers.some((handler) => handler === null)
        ? ("unhandled" as const)
        : handlers.some((handler) => handler !== "lazy" && isSilent(handler))
          ? ("silent" as const)
          : ("handled" as const);
      return { ...call, verdict };
    });
    for (const call of judged) {
      if (call.verdict === "unhandled")
        findings.push({
          file,
          line: call.line,
          what: `leaves a failed download of ${call.loader} unhandled`,
        });
      if (
        call.verdict === "silent" &&
        !judged.some((other) => other.loader === call.loader && other.verdict === "handled")
      )
        findings.push({
          file,
          line: call.line,
          what: `catches a failed download of ${call.loader} silently, and no call in the file handles it`,
        });
    }
  }
NEW-END
Then the consumers:
EDIT src/components/shell/date-field.tsx #1
OLD-BEGIN
import { isoDay, parseDay } from "./date-day";
import { formatLocale } from "@/lib/format-locale";
OLD-END
NEW-BEGIN
import { isoDay, parseDay } from "./date-day";
import { LoadFailedHere } from "./on-demand-notice";
import { formatLocale } from "@/lib/format-locale";
NEW-END
EDIT src/components/shell/date-field.tsx #2
OLD-BEGIN
 * holds its place while the calendar arrives, focusing or pressing the field
 * starts the download early, and a download that fails says so with a "Try again"
 * that asks once more — the page never breaks over it.
 */
OLD-END
NEW-BEGIN
 * holds its place while the calendar arrives, focusing or pressing the field
 * starts the download early, and a download that fails says so in the calendar's
 * place with a Refresh (LoadFailedHere, INC-911) — the browser keeps a failed
 * download for the page's life (INC-918); the page never breaks over it.
 */
NEW-END
EDIT src/components/shell/date-field.tsx #3
OLD-BEGIN
// An early start on focus or press: a failure here is answered when the field opens —
// the effect in DateField asks again, logs a failure and offers "Try again".
const startCalendar = () => {
OLD-END
NEW-BEGIN
// An early start on focus or press: a failure here is answered when the field opens —
// the effect in DateField asks again, logs the failure and says so in place.
const startCalendar = () => {
NEW-END
EDIT src/components/shell/date-field.tsx #4
OLD-BEGIN
              {calendarFailed ? (
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  data-testid={`${testid}-calendar-retry`}
                  onClick={() => setCalendarFailed(false)}
                >
                  {t("common.tryAgain")}
                </Button>
              ) : null}
OLD-END
NEW-BEGIN
              {calendarFailed ? (
                // INC-911 — the browser keeps a failed download for the page's life: the
                // calendar's place says so and offers a refresh, as the shell's notice does.
                <LoadFailedHere
                  testid={`${testid}-calendar-failed`}
                  refreshTestid={`${testid}-calendar-refresh`}
                  className="px-4"
                />
              ) : null}
NEW-END
EDIT src/components/shell/strings-layer-gate.tsx #1
OLD-BEGIN
import { Spinner } from "@/components/brand/spinner";
import { Button } from "@/components/ui/button";
import { isStringsLayer, useI18n, useStringsLayers, type StringsLayer } from "@/i18n";

import { declaredLayers } from "./strings-layers";
OLD-END
NEW-BEGIN
import { Spinner } from "@/components/brand/spinner";
import { isStringsLayer, useI18n, useStringsLayers, type StringsLayer } from "@/i18n";

import { LoadFailedHere } from "./on-demand-notice";
import { declaredLayers } from "./strings-layers";
NEW-END
EDIT src/components/shell/strings-layer-gate.tsx #2
OLD-BEGIN
 * again if a load fails (F4: its own lines ride in the first paint, so it is
 * never blank). A page that declares none draws at once, unchanged.
 */
OLD-END
NEW-BEGIN
 * again if a load fails (F4: its own lines ride in the first paint, so it is
 * never blank). A page that declares none draws at once, unchanged. INC-911 —
 * the layers are code fetched on demand, and the browser keeps a failed download
 * for the page's life, so the error line offers to refresh the page (the one
 * cure, src/lib/on-demand-failure.ts) in the words the shell's notice uses.
 */
NEW-END
EDIT src/components/shell/strings-layer-gate.tsx #3
OLD-BEGIN
    return (
      <div
        role="alert"
        data-testid="strings-layer-failed"
        className="flex min-h-40 flex-col items-center justify-center gap-3 text-sm text-muted-foreground"
      >
        {t("auth.errorGeneric")}
        <Button data-testid="strings-layer-retry" onClick={strings.retry}>
          {t("common.tryAgain")}
        </Button>
      </div>
    );
OLD-END
NEW-BEGIN
    return (
      <LoadFailedHere
        testid="strings-layer-failed"
        refreshTestid="strings-layer-refresh"
        className="min-h-40 justify-center gap-3"
      />
    );
NEW-END
EDIT src/components/shell/use-category-glyphs.ts #1
OLD-BEGIN
import { loadOnce } from "@/lib/load-once";

OLD-END
NEW-BEGIN
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";

NEW-END
EDIT src/components/shell/use-category-glyphs.ts #2
OLD-BEGIN
 * One download per visit (src/lib/load-once.ts); a later mount reads it at once.
 * A failed download is logged, the rows draw without glyphs, and the next mount
 * tries again. The bundle budget guard keeps the map off every public page's
 * first download (PUBLIC_MUST_STAY_LAZY "category-glyphs").
OLD-END
NEW-BEGIN
 * One download per visit (src/lib/load-once.ts); a later mount reads it at once.
 * A failed download draws the rows without glyphs and is reported to the shell's
 * one notice (INC-911), which offers to refresh the page — the browser keeps a
 * failed download for the page's life (INC-918). The bundle budget guard keeps the map off every public page's
 * first download (PUBLIC_MUST_STAY_LAZY "category-glyphs").
NEW-END
EDIT src/components/shell/use-category-glyphs.ts #3
OLD-BEGIN
      (error: unknown) => {
        console.error("[client-error] category glyphs failed to load", error);
        if (live) setState({ glyphOf: NO_GLYPH, settled: true });
OLD-END
NEW-BEGIN
      (error: unknown) => {
        reportOnDemandFailure("the category glyphs", error);
        if (live) setState({ glyphOf: NO_GLYPH, settled: true });
NEW-END
EDIT src/components/shell/use-footer-inset.ts #1
OLD-BEGIN
    void fonts?.ready.then(() => measure()).catch(() => undefined);
OLD-END
NEW-BEGIN
    // INC-909 — a failure is logged, never dropped (F4); the other settle passes still measure.
    void fonts?.ready
      .then(() => measure())
      .catch((error: unknown) => {
        console.error("[client-error] footer inset: fonts.ready failed", error);
      });
NEW-END
EDIT src/features/auth/use-auth.ts #1
OLD-BEGIN
import { errorText } from "@/lib/error-text";
OLD-END
NEW-BEGIN
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
NEW-END
EDIT src/features/auth/use-auth.ts #2
OLD-BEGIN
      // client that did not load is a read that failed: fail-open, as above.
OLD-END
NEW-BEGIN
      // client that did not load is a read that failed: fail-open, as above. INC-911 — it is
      // reported to the shell's one notice, which offers to refresh the page.
NEW-END
EDIT src/features/auth/use-auth.ts #3
OLD-BEGIN
          console.warn(`[auth] the profile read could not start: ${errorText(error)}`);
OLD-END
NEW-BEGIN
          reportOnDemandFailure("the account's code", error);
NEW-END
EDIT src/features/posting/map/map-large.tsx #1
OLD-BEGIN
import { useI18n } from "@/i18n";
import { APPROX_RADIUS_M } from "./geocode";
OLD-END
NEW-BEGIN
import { useI18n } from "@/i18n";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { APPROX_RADIUS_M } from "./geocode";
NEW-END
EDIT src/features/posting/map/map-large.tsx #2
OLD-BEGIN
      .catch((error: unknown) => {
        console.error("[map-large]", error);
      });
OLD-END
NEW-BEGIN
      .catch((error: unknown) => {
        // INC-911 — the large map stays empty; the shell's notice says why.
        reportOnDemandFailure("the large map", error);
      });
NEW-END
EDIT src/features/posting/map/map-preview.tsx #1
OLD-BEGIN
import { useI18n } from "@/i18n";
import { useNearViewport } from "@/lib/use-near-viewport";
OLD-END
NEW-BEGIN
import { useI18n } from "@/i18n";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { useNearViewport } from "@/lib/use-near-viewport";
NEW-END
EDIT src/features/posting/map/map-preview.tsx #2
OLD-BEGIN
      })
      .catch(() => {
        // A map that cannot load leaves the caption below it standing; the page
        // never blanks over a picture (C4).
      });
OLD-END
NEW-BEGIN
      })
      .catch((error: unknown) => {
        // A map that cannot load leaves the caption below it standing; the page
        // never blanks over a picture (C4). INC-911 — the shell's notice says so.
        reportOnDemandFailure("the map", error);
      });
NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #1
OLD-BEGIN
import { Z_SHEET } from "@/components/layout/layers";
import { Button } from "@/components/ui/button";
OLD-END
NEW-BEGIN
import { Z_SHEET } from "@/components/layout/layers";
import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { Button } from "@/components/ui/button";
NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #2
OLD-BEGIN
import type { MessageKey } from "@/i18n";

OLD-END
NEW-BEGIN
import type { MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";

NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #3
OLD-BEGIN
  const [notice, setNotice] = useState<MessageKey | null>(null);
  const [state, setState] = useState<"idle" | "busy" | "failed">("idle");
OLD-END
NEW-BEGIN
  const [notice, setNotice] = useState<MessageKey | null>(null);
  const [mapFailed, setMapFailed] = useState(false);
  const [state, setState] = useState<"idle" | "busy" | "failed">("idle");
NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #4
OLD-BEGIN
      })
      .catch(() => {
        setNotice("post.pin.geocodeUnavailable");
      });
OLD-END
NEW-BEGIN
      })
      .catch((error: unknown) => {
        // INC-911 — the map's code did not download (or the map could not be drawn): its place
        // says so and offers a refresh, the one cure — the browser keeps a failed download for
        // the page's life (INC-918). It said "the place search is unavailable, tap the map",
        // with no map to tap.
        console.error(`[client-error] the pin map failed to load: ${errorText(error)}`);
        if (!cancelled) setMapFailed(true);
      });
NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #5
OLD-BEGIN
          />
          <p
OLD-END
NEW-BEGIN
          />
          {mapFailed && (
            <LoadFailedHere
              testid="post-pin-load-failed"
              refreshTestid="post-pin-load-refresh"
              className="items-start text-start"
            />
          )}
          <p
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #1
OLD-BEGIN
import { loadOnce } from "@/lib/load-once";
import { resilientLazy } from "@/lib/resilient-lazy";
OLD-END
NEW-BEGIN
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { resilientLazy } from "@/lib/resilient-lazy";
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #2
OLD-BEGIN
    // Keep the still-map module off the marketplace's first-paint graph.
    MAP_PREVIEW.load()
      .then(({ snap }) => {
        if (active) {
OLD-END
NEW-BEGIN
    // Keep the still-map module off the marketplace's first-paint graph.
    // INC-911 — a failed download is reported to the shell's one notice (the map beside it,
    // the same download, shows its own word in place).
    MAP_PREVIEW.load().then(
      ({ snap }) => {
        if (active) {
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #3
OLD-BEGIN
        }
      })
      .catch((error: unknown) => console.error("[listing-maps]", error));
    return () => {
OLD-END
NEW-BEGIN
        }
      },
      (error: unknown) => reportOnDemandFailure("the map's links", error),
    );
    return () => {
NEW-END
EDIT src/features/posting/step-who.tsx #1
OLD-BEGIN
import { formatLocale } from "@/lib/format-locale";

OLD-END
NEW-BEGIN
import { formatLocale } from "@/lib/format-locale";
import { errorText } from "@/lib/error-text";
import { refreshPage } from "@/lib/on-demand-failure";
import { Button } from "@/components/ui/button";

NEW-END
EDIT src/features/posting/step-who.tsx #2
OLD-BEGIN

  /** Step 11 — the phone library, loaded when this step opens; a failure offers a retry. */
  const [phoneLib, setPhoneLib] = useState<PhoneLib | null>(null);
OLD-END
NEW-BEGIN

  /** Step 11 — the phone library, loaded when this step opens; a failure offers a refresh (INC-911). */
  const [phoneLib, setPhoneLib] = useState<PhoneLib | null>(null);
NEW-END
EDIT src/features/posting/step-who.tsx #3
OLD-BEGIN
      (error: unknown) => {
        console.error("[phone-lib] load failed", error);
        if (aliveRef.current) setPhoneLibFailed(true);
OLD-END
NEW-BEGIN
      (error: unknown) => {
        // INC-911 — the in-place say-so logs the line every on-demand failure logs.
        console.error(`[client-error] the phone library failed to load: ${errorText(error)}`);
        if (aliveRef.current) setPhoneLibFailed(true);
NEW-END
EDIT src/features/posting/step-who.tsx #4
OLD-BEGIN
            <span>{t("post.who.phoneLibFailed")}</span>
            <button
              type="button"
              className={smallButtonClass}
              data-testid="post-who-phone-lib-retry"
              onClick={loadLib}
            >
              {t("post.who.phoneLibRetry")}
            </button>
          </p>
OLD-END
NEW-BEGIN
            <span>{t("post.who.phoneLibFailed")}</span>
            {/* INC-911 — the browser keeps a failed download for the page's life: a refresh, not a retry. */}
            <Button
              type="button"
              variant="outline"
              size="touch"
              data-testid="post-who-phone-lib-refresh"
              onClick={refreshPage}
            >
              {t("common.refreshPage")}
            </Button>
          </p>
NEW-END
EDIT src/features/posting/step-who.tsx #5
OLD-BEGIN
                  <span>{t("post.who.phoneLibFailed")}</span>
                  <button type="button" className={smallButtonClass} onClick={loadLib}>
                    {t("post.who.phoneLibRetry")}
                  </button>
                </p>
OLD-END
NEW-BEGIN
                  <span>{t("post.who.phoneLibFailed")}</span>
                  <Button type="button" variant="outline" size="touch" onClick={refreshPage}>
                    {t("common.refreshPage")}
                  </Button>
                </p>
NEW-END
EDIT src/features/posting/phone-parse.ts #1
OLD-BEGIN
 * The one dynamic import, once per visit; a failure is forgotten so a retry can
 * try again (src/lib/load-once.ts — D234 S1).
OLD-END
NEW-BEGIN
 * The one dynamic import, once per visit (src/lib/load-once.ts — D234 S1); a failure
 * is answered by the phone step with a Refresh (INC-911) — the browser keeps a failed
 * download for the page's life (INC-918).
NEW-END
EDIT src/i18n/locales/en-member.ts #1
OLD-BEGIN
  "post.who.phoneLibFailed": "The phone box could not be loaded.",
  "post.who.phoneLibRetry": "Try again",
  "post.who.aliasRules": "5 to 30 small Latin letters, numbers or _. Start with a letter.",
OLD-END
NEW-BEGIN
  "post.who.phoneLibFailed": "The phone box could not be loaded.",
  "post.who.aliasRules": "5 to 30 small Latin letters, numbers or _. Start with a letter.",
NEW-END
EDIT src/i18n/locales/am-member.ts #1
OLD-BEGIN
  "post.who.phoneLibFailed": "የስልክ ሳጥኑ ሊጫን አልቻለም።",
  "post.who.phoneLibRetry": "እንደገና ይሞክሩ",
  "post.who.aliasRules": "ከ5 እስከ 30 ትንንሽ የላቲን ፊደሎች፣ ቁጥሮች ወይም _። በፊደል ይጀምሩ።",
OLD-END
NEW-BEGIN
  "post.who.phoneLibFailed": "የስልክ ሳጥኑ ሊጫን አልቻለም።",
  "post.who.aliasRules": "ከ5 እስከ 30 ትንንሽ የላቲን ፊደሎች፣ ቁጥሮች ወይም _። በፊደል ይጀምሩ።",
NEW-END
EDIT src/i18n/provider.tsx #1
OLD-BEGIN
import { errorText } from "@/lib/error-text";
import { onAuthChange } from "@/lib/supabase-door";
OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { onAuthChange } from "@/lib/supabase-door";
NEW-END
EDIT src/i18n/provider.tsx #2
OLD-BEGIN
        } else {
          compiled = await loader();
        }
OLD-END
NEW-BEGIN
        } else {
          // INC-919 — a failed download of the language's compiled base was an unhandled
          // rejection: nothing applied and nothing said so. It now leaves the base empty (the
          // English first-paint part underneath and the database's rows on top, as for a
          // DB-only language) and is reported to the shell's one notice (INC-911), which offers
          // to refresh the page — the browser keeps a failed download for the page's life.
          try {
            compiled = await loader();
          } catch (reason) {
            reportOnDemandFailure(`the ${language} strings`, reason);
          }
        }
NEW-END
EDIT src/i18n/provider.tsx #3
OLD-BEGIN
            } catch (reason) {
              // F4 — never silent, never blank: the English part still applies.
              console.error(`[i18n] ${layer} strings for ${language} failed: ${errorText(reason)}`);
            }
OLD-END
NEW-BEGIN
            } catch (reason) {
              // F4 — never silent, never blank: the English part still applies, and (INC-911)
              // the shell's one notice says part of the page did not load and offers a refresh.
              reportOnDemandFailure(`the ${layer} strings for ${language}`, reason);
            }
NEW-END
EDIT src/i18n/compiled-catalog.ts #1
OLD-BEGIN
 * (src/lib/load-once.ts); a failed download is forgotten so the next load asks
 * again, and the provider answers it as it always has (INC-107, INC-816).
OLD-END
NEW-BEGIN
 * (src/lib/load-once.ts); the provider answers a failed download (INC-107,
 * INC-816) and reports it to the shell's one notice, which offers to refresh the
 * page — asking again cannot help, the browser keeps the failure (INC-911, INC-918).
NEW-END
EDIT src/lib/load-once.ts #1
OLD-BEGIN
 * so the next `load()` tries again; the caller decides what the person sees
 * meanwhile (a skeleton, a held box, a "Try again") — never a crashed page, which
 * is what a failed React.lazy chunk does through the route's error boundary.
OLD-END
NEW-BEGIN
 * so the next `load()` asks again — but for a module the browser answers from its
 * memory of the failure until the page reloads (INC-918, measured in Chromium), so
 * asking again cannot help. The caller answers the failure through
 * src/lib/on-demand-failure.ts (the shell's one notice, or LoadFailedHere in its own
 * place: the words and a Refresh, INC-911) — never a crashed page, which is what a
 * failed React.lazy chunk does through the route's error boundary, and never a
 * "Try again". The census scripts/conformance/on-demand-failure.test.ts names every
 * caller.
NEW-END
EDIT src/routes/settings.tsx #1
OLD-BEGIN
import { errorText } from "@/lib/error-text";
OLD-END
NEW-BEGIN
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
NEW-END
EDIT src/routes/settings.tsx #2
OLD-BEGIN
      // INC-915 — a failed download leaves member-since unknown and ends the session check.
OLD-END
NEW-BEGIN
      // INC-915 — a failed download leaves member-since unknown and ends the session check;
      // INC-911 — it is reported to the shell's one notice, which offers to refresh the page.
NEW-END
EDIT src/routes/settings.tsx #3
OLD-BEGIN
        console.error(`[client-error] settings: the client did not load: ${errorText(error)}`);
OLD-END
NEW-BEGIN
        reportOnDemandFailure("the account's code", error);
NEW-END
C2. `bun run i18n:usage`; read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance src/components src/features/auth src/features/posting src/lib src/i18n` — every test passes, ODC-1…ODC-4 among them (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34w: the walk of 26 Oct — a signed-out visitor stays on sign in, INC-925; the offline sign-out, DEC-271; the phone menu without its ×, D238; the peek's clock, INC-924; and the notice's live region without a role)` becomes `docs/governance/briefs/foundations-turn-34b-3.md (Foundations turn 34b-3: every remaining piece fetched on demand answers a failed download through the mechanism, and the guard reads each call — INC-911, INC-918, INC-919, INC-909)` (everything after it stays, as it is).
D2. These edits (the register's row 52; the changelog; turn 34c's line names the strings layers' retry for retirement; turn 34w's line stays open — its fix turn ticks it):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader or of a same-file loadOnce answers through the mechanism or has its allowlist line; ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen — and ten consumers until turn 34b-3 moves them, INC-911) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |
OLD-END
NEW-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34w (2026-10-26; the operator's walk of the 34b-1 build) — INC-925: a signed-out visitor to /settings stayed on sign in only a moment — the shell's live guard kept its own list of the pages that send to sign in, and /settings was not on it (turn 34b-1 gave it the door-step); the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts), proven both ways by CF-SIR-4/5, and S-1 checks every such page keeps the visitor on sign in. DEC-271: an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns; a download that fails offline is no stale chunk (no reload). D238: the phone menu has no ×. INC-924: the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened. SIP-1, CF-SIR-4/5, S-1, STC-2, SO-12, PK-2, PK-3.
OLD-END
NEW-BEGIN
- Foundations turn 34w (2026-10-26; the operator's walk of the 34b-1 build) — INC-925: a signed-out visitor to /settings stayed on sign in only a moment — the shell's live guard kept its own list of the pages that send to sign in, and /settings was not on it (turn 34b-1 gave it the door-step); the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts), proven both ways by CF-SIR-4/5, and S-1 checks every such page keeps the visitor on sign in. DEC-271: an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns; a download that fails offline is no stale chunk (no reload). D238: the phone menu has no ×. INC-924: the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened. SIP-1, CF-SIR-4/5, S-1, STC-2, SO-12, PK-2, PK-3.

- Foundations turn 34b-3 (2026-10-26) — INC-911 finished: every remaining piece fetched on demand answers a failed download through the mechanism — the maps, the pin map (LoadFailedHere: no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar and a page's strings (LoadFailedHere), the phone box (Refresh on the shared Button, its own words kept), Settings and the account read report to the shell's notice; the allowlist is down to its four lines for good. INC-918: every "Try again" for a download became Refresh and every comment that promised a retry was corrected. INC-919: a failed download of a language's strings is reported and no longer an unhandled rejection. INC-909: the footer's font wait logs its failure. One string retired (post.who.phoneLibRetry). The census judges each call (34b-2's reviewer): a loader imported under another name or through a namespace is a call, and each call handles its own failure — a mention of an answer elsewhere in the file no longer covers it (ODC-4). PMD-1, PLF-1, DF-6, SLG-3, ODC-4.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15; /settings's door-step since turn 34b-1, INC-923) as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3).
OLD-END
NEW-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15; /settings's door-step since turn 34b-1, INC-923) as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918).
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34b-3.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase e2e` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 317 files, 1965 tests, every one passed); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
018002458ef76f125451f5b856eb77983d51ac6132e33b421693121fbdf590a2  docs/_changelog.md
edf31a7b76bca7c4e8cffe86c4a00aaa7ab9e7ebc6d444a4e52f71838413dc9f  docs/generated/i18n-usage.json
325d8c258167b662efd742b862a8d25ec304e26a98bbd77d4e1360116be0c263  docs/governance/mechanisms.md
edf31a7b76bca7c4e8cffe86c4a00aaa7ab9e7ebc6d444a4e52f71838413dc9f  public/i18n-usage.json
78aa2abfd94f440dc5eae73465b06f6d6cded97dbc07eabb62aa541feb92209a  scripts/conformance/on-demand-failure-allowlist.txt
3c3189483f09b70cf1c160796b847524f16fc3e7456f616570d6b27f0dccc426  scripts/conformance/on-demand-failure.test.ts
ba7006dcadba85c6c3acc9297f888850dd1745bf3864dd9bc9252893cb31ee2b  src/components/shell/date-field-offline.test.tsx
55f3cb3ddf9a5f09c6b5115c4374e238fcea6a8b286e50bbcfa00f3e735908ad  src/components/shell/date-field.tsx
aa26fd663a0ba5713a0ccbb1e253ce98c73f7f5002141aa5102594acc7864f64  src/components/shell/strings-layer-gate.test.tsx
f0b71cccbbcb4562aa07783d273fcf01bff7574715c9d3624792216276f0a762  src/components/shell/strings-layer-gate.tsx
7f4406b15ae27b4eef8b9646a4b42eeccf0b9b834534a17ded9469748d537240  src/components/shell/use-category-glyphs.ts
ae37d1e94d5aec1dfed5d6c847e5a436076e7eed16bd101261a5b6d567471264  src/components/shell/use-footer-inset.ts
8b1074a691b73c58d7294597648a41f58befecffb5fbc02e97d710f24813f90d  src/features/auth/use-auth.ts
6f1ccfbf8a9041827d7fe078881c5118043791b75e3b8be742c88dcc0151323b  src/features/posting/map/map-large.tsx
def6353b0bcd63b585d92b7334e521f6316c8e4e5c6302492ac794cc83df94ec  src/features/posting/map/map-pin-dropper-offline.test.tsx
61e76b2120f8bcf6e4cbd31962258edd76313ea38f2a1e5678a0afa44559145f  src/features/posting/map/map-pin-dropper.tsx
8b92ba3f20810396180f550efede1473b647fa80bf56d5657d6a86212d79978e  src/features/posting/map/map-preview.tsx
316f24673576d7625585aba89492f397c85db02300e22591630a72c01480807b  src/features/posting/phone-parse.ts
827f21d2a30cc3a9ad974483fd8a9fe5b1b671d72d4fe677dde592083c263cfb  src/features/posting/preview/listing-detail.tsx
302620a0bb5de88f863ae2a02dcd9356e71d825b9dc04e841693a662edbf2c51  src/features/posting/step-who.test.tsx
9c1da67d73ec0964bfd3cd0f92080c4f312313dc3b134cc6795b198d41b8ed0e  src/features/posting/step-who.tsx
6a4e185c72bc8bab3cd4fdf1c8a4d49340c11a600c8f5d558c9ee3f56295ac84  src/i18n/compiled-catalog.ts
6139140a42a31b543caa344fa1cb50cf3eb68afc316c5fd1277adbfa9a016240  src/i18n/locales/am-member.ts
a84cd0b8c5560e0c64d20ddfc415956039798455ca67fa192795e627559bd8c6  src/i18n/locales/en-member.ts
7c48e849b249b4349c1b79d6438b03eb69a1f541390e22f8d61163a6ec671690  src/i18n/provider.tsx
c3480969898b6740a686e91aad3c7d243b9281ddc26aadc772f15b26eb5a7a23  src/lib/load-once.ts
9614fb4a5149e7a4537aaa92873e5cc4ecd00c0f667f2b0c3e4f66309f30ec1f  src/routes/settings.tsx

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>`; both projects, 0 retries, fake mode; CI runs every test): e2e/post-wizard-where.spec.ts whole; e2e/post-wizard-place.spec.ts whole; e2e/post-wizard-bundle2.spec.ts whole (the phone box); e2e/ad-page.spec.ts whole (the map's links); e2e/i18n-bundle.spec.ts whole; e2e/settings.spec.ts whole; e2e/category-nav.spec.ts whole; e2e/smoke-auth-i18n.spec.ts whole; e2e/on-demand-failure.spec.ts whole; paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34b-3.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract — a failed download of the calendar, a page's strings, the glyphs, the large map, the map preview, the pin map's own map, the map's links, the phone library, a language's strings, the account's and Settings' client — before → after; the consumer census with file:line, re-located at <START>; the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); the allowlist's lines before → after; the retired string key by key, English and Amharic; "none" for migrations; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): every remaining consumer onto the mechanism; the phone box keeps its own words with Refresh; INC-919 fixed with its class; the strings layers' retry left to turn 34c's retirement; the two census MAJORs of turn 34b-2's reviewer closed here rather than in a turn of their own.

BLOCK 1 — FILE-BEGIN src/features/posting/map/map-pin-dropper-offline.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * INC-911 (Foundations turn 34b-3) — the pin map whose code cannot download says so in its own
 * place and offers to refresh the page (the browser keeps a failed download for the page's life,
 * INC-918). It said "The place search is unavailable. Tap the map instead." with no map to tap.
 */
vi.mock("./leaflet", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./leaflet")>();
  return {
    ...actual,
    loadLeaflet: () => Promise.reject(new Error("Failed to fetch dynamically imported module")),
    loadTilePlan: () => Promise.resolve({ plan: actual.OSM_PLAN, reason: null }),
  };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: refreshed }));

const { MapPinDropper } = await import("./map-pin-dropper");

describe("the pin map offline (INC-911)", () => {
  it("PMD-1 a map whose code cannot download says so in place and offers a refresh", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <MapPinDropper
        saved={null}
        place={{ lat: 9.03, lng: 38.74, level: "city", query: null }}
        note=""
        onNote={() => undefined}
        onSave={async () => true}
        onClose={() => undefined}
      />,
    );
    const failed = await screen.findByTestId("post-pin-load-failed");
    expect(failed.getAttribute("role")).toBe("alert");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.queryByText("post.pin.geocodeUnavailable")).toBeNull();
    fireEvent.click(screen.getByTestId("post-pin-load-refresh"));
    expect(refreshed).toHaveBeenCalledTimes(1);
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the pin map failed to load: Failed to fetch dynamically imported module",
    );
    errors.mockRestore();
  });
});
FILE-END src/features/posting/map/map-pin-dropper-offline.test.tsx
```

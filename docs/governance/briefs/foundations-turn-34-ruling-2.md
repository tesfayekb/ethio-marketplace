RULING 2 — Foundations turn 34, stop 2: AP-54, the reviewer's blockers and majors. Base: dev b58aa884.

Save this ruling byte for byte as docs/governance/briefs/foundations-turn-34-ruling-2.md and commit it
("turn 34: ruling 2 saved"). Its changes R2-1 … R2-9 are numbered CHANGEs of the brief. Your stop was right,
your reading of AP-54 was right, and running the reviewer before the report was what the operator asked for.

## 0. What AP-54 and the lane-5 red are (INC-913, one class)

The supervisor reproduced the mechanism with react-dom 19.2.5 alone (a streamed shell, one Suspense boundary
finishing after it, hydrateRoot(document), one state change):

- React 19.2 streams a boundary that finishes after the shell as a hidden segment, `<div hidden id="S:0">` at
  the end of <body>, and REVEALS it on a timer: `$RC` queues it, `$RV` places it no sooner than 300 ms after
  the shell's first frame (at 2.3 s when it lands between 2.0 and 2.3 s).
- A state change above a boundary that is still pending or queued makes React draw that boundary again in the
  browser at once (react-dom-client, updateDehydratedSuspenseComponent:
  `isSuspenseInstancePending(…) || renderDidSuspendDelayIfPossible(); retrySuspenseComponentWithoutHydrating`).
  startTransition does not prevent it (tested).
- Measured: a change while the segment was queued → two copies 13 ms later (the browser's in the shell, the
  server's still hidden) → one copy when React's timer fired 235 ms later. That is PP-21 on run 40269083499
  (3b680c1, BASE's runtime code: element 1 under shell-stack, element 2 under a section outside it, the same
  signed URL) and PW-94 on run 40260842584. The redraw replaces the server's nodes: that is AP-54. The door
  did not create the class; it made the signed-out answers land inside React's window every time.
- TanStack Start's entry script is `async` (start-plugin-core manifestBuilder.js :68), so hydration can begin
  before the stream ends. Hydrating once the document has been read and no segment waits: one copy throughout
  and the server's node kept, with the late page at 150 ms and at 2050 ms.

So the fix is not the door's timing (any later state change — a strings layer, a shell choice, a tap — would
reopen it). It is when the browser hydrates: DEC-266, R2-2.

## 1. What stands, what this ruling releases

Parts B–F stand as landed. The brief's hash list keeps binding every file it names except these, which this
ruling releases: src/features/auth/auth-service.ts, src/routes/auth.tsx, src/routes/settings.tsx,
src/lib/supabase-door.ts, src/lib/supabase-door.test.ts, e2e/supabase-door.spec.ts,
scripts/check-marketplace-imports.mjs, scripts/conformance/vendor-seams-scan.ts,
scripts/conformance/vendor-seams.test.ts, src/features/legal/use-legal-gate.test.tsx, and the docs R2-8 names.
SCOPE gains those files and these new or touched ones: src/client.tsx, src/lib/hydrate-when-placed.ts,
src/lib/hydrate-when-placed.test.ts, src/features/auth/auth-client.test.ts, src/lib/session-bearer.test.ts,
src/i18n/server-shell-language.test.ts, docs/governance/briefs/foundations-turn-34-ruling-2.md, and both usage
maps (docs/generated/i18n-usage.json, public/i18n-usage.json), committed whenever `bun run i18n:usage` moves
them — the new files move them (the supervisor's run: "1736 keys across 590 files"). Any other file is a STOP,
as before. The report gives every released or new file's sha256. The FLAGS hold: no migration, no
new string, no package change.

## 2. The changes, in this order

**R2-1 — red first (nothing committed in this step).** Write e2e/supabase-door.spec.ts as BLOCK D (SBE-1's two
corrections, the new SBE-3 and SBE-4). On the code as it stands (no R2-2, R2-3 yet) run once each, both
projects: `bun run e2e:local -- e2e/supabase-door.spec.ts` and
`bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-54 "`. Paste both count lines, whatever they say. SBE-4
is expected red (the sign-in button stays busy). SBE-3 and AP-54 are timing-dependent and DEC-184 forbids
repeat runs: a green there is recorded, not a STOP — the supervisor's reproduction is INC-913's deterministic red.

**R2-2 — DEC-266: the browser hydrates the server's first screen once React has placed it.** Write BLOCKS A, B
and C verbatim (check each sha256). TanStack Start's plugin takes src/client.tsx as the client entry by itself
(start-plugin-core planning.js :70-:76, default entry name "client"): no config change. In
scripts/check-marketplace-imports.mjs, the ENTRIES array gains, after `"src/start.ts",`, exactly these two lines
(the file's sha256 after the edit: `757056a9f6bafcbacb0264fda8bf41979b6f886a87d457e947c51ce4f843d248`):

```
  // DEC-266 (Foundations turn 34, ruling 2): the browser's entry, which hydrates the first screen.
  "src/client.tsx",
```

Expected, as in the supervisor's build of b58aa884 plus BLOCKS A–C: HWP-1…6 6 passed; TI-1 passes (the ids
are new — FSP- belongs to src/server/first-screen.test.ts); the weight guard `modules walked: 110`,
`findings: 0`; check-bundle-size `JS: 203.9 KiB / 207 KiB — ok` (254.0 → 203.9: still more than 45 KiB off, the
frozen rule's first condition); "/" and "/c/$slug" 217.4 / 220 KiB; every other ceiling holds. Run
e2e/supabase-door.spec.ts whole (SBE-4 stays red until R2-3) and, by id, AP-54, PP-21 and PW-94, both
projects; paste the count lines. Commit BLOCKS A–C with the ENTRIES lines and the moved maps: "turn 34 ruling 2: DEC-266 —
hydrate once the first screen is placed (INC-913)". BLOCK D waits for R2-3: a spec file that is not fully green
is not committed.

**R2-3 — INC-915, the auth screens: a failed client download answers as a failed action, never a hang.**
- src/features/auth/auth-service.ts: ONE private helper, `async function authClient()`, returns the client or
  null; on null it has logged `console.error("[client-error] the sign-in code did not load:", errorText(error))`.
  Every exported action that needs the client calls it once and on null returns its own failure answer: every
  `Promise<AuthResult>` action → `{ ok: false, errorKey: "auth.errorGeneric" }`; getIdentities and hasPassword
  → `{ ok: false, errorKey: "auth.errorGeneric" }`; completeEmailVerification → `{ ok: false, hadError: true }`;
  hasSessionRehydrating → `false`; fetchPreferredLanguage → `{ code: null, reason: "the client did not load" }`;
  savePreferredLanguage → `{ ok: false, reason: "the client did not load" }`. The three private helpers that
  fetch it again (evictExpiredSession, awaitSessionCommit, currentPasswordProof) take the caller's client as a
  parameter. After the change `getSupabase()` appears in auth-service.ts once, inside authClient. No action
  rejects.
- src/routes/auth.tsx: each of the four submit paths the reviewer named (:269-:278, :318-:320, :340-:345,
  :376-:378) resets `busy` in a `finally`, so no future throw leaves the screen disabled.
- src/routes/settings.tsx :169: the effect's client read catches a failed download — logs
  `[client-error] settings: the client did not load: <text>`, leaves member-since unknown and ends the session
  check (`setCheckingSession(false)`), so the page is never left waiting.
- NEW src/features/auth/auth-client.test.ts: ASC-1 with the door mocked so `getSupabase()` rejects, every
  exported async function of auth-service.ts (enumerated from the module's exports, so a new action is covered
  by itself; a function that needs no client is listed by name as needing none) resolves, never rejects, to the
  answer above; ASC-2 a census — auth-service.ts's text calls `getSupabase()` exactly once. ASC-1 shown red
  first against the pre-change auth-service.ts. SBE-4 (BLOCK D) is the screen's proof in the browser: run
  e2e/supabase-door.spec.ts whole, both projects — all four green — then commit BLOCK D with R2-3:
  "turn 34 ruling 2: a failed client download answers as a failed action (INC-915); SBE-1…4".

**R2-4 — INC-915, the door: it never rejects where the client's own call did not (the brief's contract).**
- src/lib/supabase-door.ts `rpc()`: a rejected `getSupabase()` answers
  `{ data: null, error: rpcError(null, `the client did not load: ${errorText(error)}`) }` after
  `logLoadFailure(error)`; provider.tsx's two calls then end in their own `[i18n]` failure path (no edit there).
  currentSession() logs "the session read failed: <text>" when the client loaded and getSession() threw, and
  "the client did not load: <text>" only when the download failed.
- src/lib/supabase-door.test.ts: SBD-14 rpc() with a rejected download resolves with that error, for a caller
  with a stored session; SBD-15 currentSession() with a rejected download answers
  `{ session: null, failed: true }`; SBD-16 a listener unsubscribed before the client arrives never hears an
  event; SBD-17 a storage event with `newValue: null` starts no download; SBD-9 made able to fail — a fresh
  module per case (`vi.resetModules()` and a dynamic import), so `imported` counts that case's import only.

**R2-5 — the bearer's tests.** NEW src/lib/session-bearer.test.ts against the module's real export
(`attachSessionBearer`, a TanStack function middleware): SBB-1 a session from currentSession() → the call's
headers carry `Authorization: Bearer <access token>`; SBB-2 no session → no header is added; SBB-3
currentSession() answers `failed` → no header, no throw. If the middleware's shape makes one impossible to
reach without the framework, say so in the report and prove that case with an E2E id instead.

**R2-6 — INC-916, the guard's hole.** scripts/conformance/vendor-seams-scan.ts `vendorTies().supabase` also
matches a dynamic import of `@supabase/supabase-js` or `@/integrations/supabase/client`
(`import\(\s*["']…["']\s*\)`). scripts/conformance/vendor-seams.test.ts: VS-4 a planted source whose only
tie is `import("@/integrations/supabase/client")` is reported; VS-5 the same through `@supabase/supabase-js`.
If the census then finds a file outside the allowlist, list it in the report — do not allowlist it.

**R2-7 — INC-917, tests that mock a module their subject no longer reaches.** src/i18n/server-shell-language.test.ts
:3: re-point the mock to what server-shell-language.ts reaches now, or delete it when the test needs none — and
show the test can still fail. Then the class census in the report: every test file under src/ that mocks
`@/integrations/supabase/client` or `@supabase/supabase-js` (twelve mock the client at b58aa884), each marked
"its subject reaches it", "kept for a transitive import (named)" or "re-pointed". In
src/features/legal/use-legal-gate.test.tsx move the `vi.hoisted()` and `vi.mock("@/lib/supabase-door")` calls
to the module's top level (vitest warns they will become an error).

**R2-8 — the records.**
- docs/features/performance-strategy.md: after §17's last paragraph, one paragraph headed "DEC-266 — the first
  screen is hydrated where React placed it": INC-913, the wait, its cost (hydration waits for the stream's end
  and React's reveal — at most 300 ms after the first paint where a late boundary exists; a page without one
  is unchanged), the 1.5 s deadline and its `[client-error]` line, HWP-1…6, SBE-3. In §17's `rpc()` line (:332)
  "the anonymous PostgREST call the client itself sends" becomes "the anonymous PostgREST call with the client's
  own auth headers" and the parenthesis gains "; not postgrest-js's X-Client-Info, an analytics header" — the
  reviewer's MAJOR 2, the wording made exact.
- docs/governance/mechanisms.md: a new row after the last, "The first screen's hydration" — concern: the browser
  hydrates the server's first screen as drawn; mechanism: src/client.tsx + src/lib/hydrate-when-placed.ts; guard:
  HWP-1…6, SBE-3, the weight guard's entry; exceptions: none; growth: a new late boundary or provider is covered
  by itself. In the row beginning "| 13 | New code reaches a vendor" add "dynamic imports too (INC-916, VS-4/5)"
  (the two rows numbered 13 are the records turn's to renumber, not this turn's).
- docs/features/e2e-harness.md §Authoring laws: one line each — `data-app-ready` is set once the browser has
  hydrated the placed first screen (DEC-266); `__ethioSupabase` arrives when the client's chunk has loaded, not
  at mount (read it after a wait); `__ethioClientOff` turns the E2E hand-off off (SBE-1…4).
- docs/_changelog.md: one line for ruling 2 (DEC-266, INC-913, INC-915, INC-916, INC-917).
- roadmap.md: the turn-34 line stays open until the final report. After the line that begins
  "  - [ ] Turn 34b — a failed on-demand download" add:
  `  - [ ] Turn 34b also — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15) and settings' hasSessionRehydrating as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous __ethioSupabase readers in e2e/ (Foundations turn 34, ruling 2).`
  After the line that begins "  - [ ] Speed, after turn 37" add:
  `  - [ ] Speed study (DEC-266's REVISIT branch, D234): the listings pages' first page held inline in the server's first flush when it arrives within a short budget (no late boundary, no reveal timer), measured in the lab against the streamed page; adopted only on the lab's numbers.`

**R2-9 — the close.** THE CHECKS in the brief's order; THE END-TO-END CHECK: the brief's list as you ran it,
plus e2e/supabase-door.spec.ts whole and AP-23, AP-26, AP-29, AP-54, PP-21, PW-94 by id, both projects. Then
the reviewer in the FOREGROUND on the last code commit; wait for its verdict line; a BLOCKER is fixed in a new
commit and the reviewer runs again. Then the completion report: the frozen rule's three conditions with their
numbers; the R2-1 red-first counts; every released or new file's sha256; the census lists of R2-6 and R2-7.

## 3. Decisions made here (overridable by the operator; pasting this ruling approves them — G17)

1. DEC-266 — hydrate once the first screen is placed (src/client.tsx), deadline 1.5 s after the document is read.
   Cost as R2-8 says. Frozen judge: KEEP when, over the next 10 completed CI runs after this turn's final
   landing, AP-54, SBE-3 and SBE-4 never fail and no INC-913-shape duplicate enters the flake ledger; otherwise
   REVISIT with the speed study R2-8 adds.
2. A failed client download shows "auth.errorGeneric" ("Something went wrong. Please try again.") — no new
   string this turn; a "check your connection" line belongs to INC-911's mechanism in turn 34b.
3. X-Client-Info is not sent by the anonymous call (an analytics header, not part of the call's meaning).
4. The reviewer's minors: the roadmap tick — done by you; an `#access_token` hash on a path other than the
   callback — accepted (no flow lands there; your grep found none); the localhost key derivation — accepted; the
   two `as unknown as` casts in app-shell.tsx — accepted (brief text, E2E-only code); `const data: T =
   JSON.parse(text)` — accepted (the client typed its answers the same way); MUST_NOT_CARRY with GoTrueClient
   alone — accepted (the one marker that survives minification; a dynamic import is now caught by R2-6);
   auth-service.ts :20's second loadOnce of supabase-js — accepted (the current-password verifier's throwaway
   client); provider.tsx :145-:185's hand-built languages read — left to turns 35–37 (the anonymous reference
   reads behind cached routes); session-policy.ts — its roadmap line exists; server-shell-language.test.ts —
   R2-7; SBD-9, the untested paths and session-bearer.ts — R2-4, R2-5; SBE-1's unreadable body and idle wait —
   BLOCK D; `__ethioSupabase`'s timing — R2-8 now, the census of its synchronous readers in turn 34b.
5. MAJOR 1's second half — a signed-in visitor whose client failed is treated as signed out — is INC-914, turn
   34b (INC-911's mechanism decides what "unknown" shows).

## 4. BLOCKS A–D (verbatim; each file's whole text)

BLOCK A — `src/lib/hydrate-when-placed.ts` — sha256 `ed2974612f18fa4eee838881f79583968bc609ef33ecffb05ae75740e948828f` (2648 bytes):

````ts
/**
 * DEC-266 (INC-913) — THE BROWSER HYDRATES THE SERVER'S FIRST SCREEN ONCE IT IS PLACED.
 *
 * React 19.2 streams a Suspense boundary that finishes after the shell as a hidden segment,
 * `<div hidden id="S:n">` at the end of the body, and reveals it on a timer (no sooner than
 * 300 ms after the first paint; at 2.3 s when it lands between 2.0 and 2.3 s). A boundary
 * still waiting when the browser hydrates is drawn again by React the moment any state above
 * it changes (the auth answer, a strings layer, a shell choice): the server's nodes are
 * replaced (AP-54), and until React's timer fires the page holds two copies, the browser's and
 * the server's hidden one (PP-21, PW-94). So the client entry (src/client.tsx) hydrates once
 * the document has been read and no segment waits: every boundary is then complete, and
 * React hydrates it before it applies any update. A page with no late boundary hydrates as
 * soon as the document has been read.
 */

/** A streamed segment React has not placed yet (pinned against react-dom by HWP-5). */
export const WAITING_SEGMENT = 'div[hidden][id^="S:"]';

/** After the document has been read, how long hydration waits for React to place the segments. */
export const PLACED_DEADLINE_MS = 1500;

export type PlacedOutcome = "placed" | "deadline";

/** The document has been read and React has placed every segment it streamed. */
export function streamPlaced(doc: Document): boolean {
  return doc.readyState !== "loading" && doc.querySelector(WAITING_SEGMENT) === null;
}

/**
 * Resolves "placed" once the first screen is placed, or "deadline" when a segment still waits
 * PLACED_DEADLINE_MS after the document was read (the caller hydrates anyway and says so).
 */
export function whenStreamPlaced(
  doc: Document = document,
  deadlineMs: number = PLACED_DEADLINE_MS,
): Promise<PlacedOutcome> {
  return new Promise((resolve) => {
    if (streamPlaced(doc)) {
      resolve("placed");
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = (outcome: PlacedOutcome) => {
      observer.disconnect();
      doc.removeEventListener("DOMContentLoaded", check);
      if (timer !== undefined) clearTimeout(timer);
      resolve(outcome);
    };
    function check() {
      if (streamPlaced(doc)) finish("placed");
      else if (doc.readyState !== "loading" && timer === undefined)
        timer = setTimeout(() => finish("deadline"), deadlineMs);
    }
    const observer = new MutationObserver(check);
    observer.observe(doc, { childList: true, subtree: true });
    doc.addEventListener("DOMContentLoaded", check);
    check();
  });
}
````

BLOCK B — `src/lib/hydrate-when-placed.test.ts` — sha256 `a07dd5c1d1195d6ce52af3ccb02153487a8b7d4c7bf4fc52527fa95125caee9a` (4415 bytes):

````ts
import { readFileSync } from "node:fs";
import { createElement, Suspense, use } from "react";
import { renderToReadableStream } from "react-dom/server.browser";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  streamPlaced,
  PLACED_DEADLINE_MS,
  WAITING_SEGMENT,
  whenStreamPlaced,
} from "./hydrate-when-placed";

/**
 * DEC-266 (INC-913) — the browser hydrates the server's first screen once it is placed.
 * HWP-1…4 the wait; HWP-5 pins React's streamed-segment markers against the installed
 * react-dom (an upgrade that renames them fails here, not as a flake); HWP-6 the client
 * entry waits for it before it hydrates.
 */
function freshDocument(readyState: DocumentReadyState): Document {
  const doc = document.implementation.createHTMLDocument("first screen");
  Object.defineProperty(doc, "readyState", { configurable: true, get: () => readyState });
  return doc;
}

function addSegment(doc: Document): HTMLElement {
  const segment = doc.createElement("div");
  segment.hidden = true;
  segment.id = "S:0";
  doc.body.append(segment);
  return segment;
}

afterEach(() => {
  vi.useRealTimers();
});

describe("the first screen's hydration (DEC-266)", () => {
  it("HWP-1 a read document with no waiting segment is placed at once", async () => {
    const doc = freshDocument("interactive");
    expect(streamPlaced(doc)).toBe(true);
    await expect(whenStreamPlaced(doc)).resolves.toBe("placed");
  });

  it("HWP-2 a waiting segment holds the hydration until React removes it", async () => {
    const doc = freshDocument("complete");
    const segment = addSegment(doc);
    expect(streamPlaced(doc)).toBe(false);
    let outcome: string | null = null;
    const waiting = whenStreamPlaced(doc).then((value) => (outcome = value));
    await Promise.resolve();
    expect(outcome).toBeNull();
    segment.remove();
    await expect(waiting).resolves.toBe("placed");
  });

  it("HWP-3 a document still being read waits for it to be read", async () => {
    let state: DocumentReadyState = "loading";
    const doc = document.implementation.createHTMLDocument("streaming");
    Object.defineProperty(doc, "readyState", { configurable: true, get: () => state });
    let outcome: string | null = null;
    const waiting = whenStreamPlaced(doc).then((value) => (outcome = value));
    await Promise.resolve();
    expect(outcome).toBeNull();
    state = "interactive";
    doc.dispatchEvent(new Event("DOMContentLoaded"));
    await expect(waiting).resolves.toBe("placed");
  });

  it("HWP-4 a segment React never places ends the wait at the deadline", async () => {
    vi.useFakeTimers();
    const doc = freshDocument("complete");
    addSegment(doc);
    const waiting = whenStreamPlaced(doc);
    await vi.advanceTimersByTimeAsync(PLACED_DEADLINE_MS - 1);
    let outcome: string | null = null;
    void waiting.then((value) => (outcome = value));
    await Promise.resolve();
    expect(outcome).toBeNull();
    await vi.advanceTimersByTimeAsync(1);
    await expect(waiting).resolves.toBe("deadline");
  });

  it("HWP-5 react-dom streams a late boundary as the segment WAITING_SEGMENT names, revealed by $RC", async () => {
    let release: (value: string) => void = () => undefined;
    const late = new Promise<string>((resolve) => {
      release = resolve;
    });
    function Late() {
      return createElement("p", null, use(late));
    }
    const stream = await renderToReadableStream(
      createElement(
        "div",
        null,
        createElement(
          Suspense,
          { fallback: createElement("span", null, "…") },
          createElement(Late),
        ),
      ),
    );
    setTimeout(() => release("late"), 0);
    const html = await new Response(stream).text();
    const parsed = new DOMParser().parseFromString(html, "text/html");
    const segment = parsed.querySelector(WAITING_SEGMENT);
    expect(segment?.textContent).toBe("late");
    expect(html).toContain(`$RC("B:0","${segment?.id ?? "?"}")`);
  });

  it("HWP-6 the client entry hydrates only after the first screen is placed", () => {
    const entry = readFileSync("src/client.tsx", "utf8");
    const waits = entry.indexOf("whenStreamPlaced()");
    const hydrates = entry.indexOf("hydrateRoot(");
    expect(waits).toBeGreaterThan(-1);
    expect(hydrates).toBeGreaterThan(waits);
    expect(entry.match(/hydrateRoot\(/g) ?? []).toHaveLength(1);
  });
});
````

BLOCK C — `src/client.tsx` — sha256 `f4f0295ec0d06fade564c81898f534c3a739b8e074fe02027215f44947c30c15` (831 bytes):

````tsx
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

import { whenStreamPlaced } from "@/lib/hydrate-when-placed";

/**
 * DEC-266 — the browser's entry: TanStack Start's own client entry
 * (@tanstack/react-start/dist/plugin/default-entry/client.tsx), with one change — it hydrates
 * once the server's first screen is placed (src/lib/hydrate-when-placed.ts, INC-913).
 */
void whenStreamPlaced().then((outcome) => {
  if (outcome === "deadline")
    console.error(
      "[client-error] the first screen was not placed 1.5 s after the page was read; hydrating anyway",
    );
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
});
````

BLOCK D — `e2e/supabase-door.spec.ts` — sha256 `819ed1bf556c42369090fc97b8e6b5eac57442e3db56c761ec29502936da67c4` (8368 bytes):

````ts
import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { adPageFixtures } from "./helpers/ad-page";
import { authFields, gotoReady, signInViaSession, signedInMarker } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { listingPath } from "../src/features/ad-page/address";
import { en } from "../src/i18n/locales/en";

/**
 * DEC-261 (Foundations turn 34) — THE CLIENT'S DOOR IN THE BROWSER. A signed-out
 * visitor's public pages download no Supabase client: no script the page fetches
 * carries the client's auth class (the build guard's marker, scripts/bundle-closure.mjs
 * MUST_NOT_CARRY). The sign-in screen fetches it once it has painted, and a signed-in
 * visitor's stored session starts it at once.
 *
 * An E2E build hands the client to the harness at mount (app-shell.tsx, DEC-018); the
 * init script's `__ethioClientOff` turns that hand-off off, so these tests see what a
 * production visitor's browser does. Scratch rows only (G27): a scratch seller, its own
 * category branch and one scratch ad, reaped in afterEach.
 *
 * DEC-266 (INC-913) — SBE-3: the browser hydrates the server's first screen once React has
 * placed it, so a signed-in visitor's settling state (the session, the member strings) never
 * makes React draw the listings again: one copy of each card, the server's own. INC-915 —
 * SBE-4: a client whose download fails leaves the sign-in form answering, never stuck.
 */

const CLIENT_MARKER = "GoTrueClient";

/**
 * Every script the page fetches, with whether its text carries the client; a body that cannot
 * be read is never counted clean (the reviewer of turn 34).
 */
function watchScripts(page: Page) {
  const reads: Array<Promise<{ url: string; carries: boolean | null }>> = [];
  page.on("response", (response) => {
    if (response.request().resourceType() !== "script") return;
    reads.push(
      response.text().then(
        (text) => ({ url: response.url(), carries: text.includes(CLIENT_MARKER) }),
        () => ({ url: response.url(), carries: null }),
      ),
    );
  });
  return {
    async carriers(): Promise<string[]> {
      const all = await Promise.all(reads);
      return all.filter((read) => read.carries !== false).map((read) => read.url);
    },
  };
}

/** Every database function a page calls, with its answer's status (the door's anonymous path). */
function watchRpcs(page: Page) {
  const calls: Array<{ name: string; status: number }> = [];
  page.on("response", (response) => {
    const match = /\/rest\/v1\/rpc\/([^?]+)/.exec(response.url());
    if (match) calls.push({ name: match[1] ?? "", status: response.status() });
  });
  return { calls: () => [...calls] };
}

/** The page has loaded and the browser has had an idle moment (a deferred fetch has started). */
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForLoadState("networkidle");
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        if ("requestIdleCallback" in window)
          window.requestIdleCallback(() => resolve(), { timeout: 2000 });
        else setTimeout(resolve, 500);
      }),
  );
}

test.describe("THE CLIENT'S DOOR — the Supabase client off public pages (DEC-261)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(async () => {
    await cleanup();
  });

  test("SBE-1 signed out: the home, a category, an ad and the terms download no client; the sign-in screen then fetches it", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    const canonical = listingPath(ad.title, await publicIdOf(ad.id));
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    const scripts = watchScripts(page);
    const rpcs = watchRpcs(page);
    for (const path of ["/", `/c/${seller.leafSlug}`, canonical, "/terms"]) {
      await gotoReady(page, path);
      await settle(page);
      expect(await scripts.carriers(), `${path}: no script carries the client`).toEqual([]);
    }
    // The door answered them without the client: its anonymous calls reached the database and succeeded.
    expect(rpcs.calls().length, "the pages called the database through the door").toBeGreaterThan(
      0,
    );
    expect(rpcs.calls().filter((call) => call.status >= 400)).toEqual([]);
    // The ad page drew for a signed-out visitor through the door (its title and its sign-in link).
    await gotoReady(page, canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    await page.getByTestId("listing-contact-sign-in").click();
    await expect(page).toHaveURL(/\/auth(?:\?|$)/);
    await expect
      .poll(async () => (await scripts.carriers()).length, {
        message: "the sign-in screen fetched the client",
      })
      .toBeGreaterThan(0);
  });

  test("SBE-2 signed in: the stored session starts the client and the header shows the account", async ({
    page,
  }) => {
    const user = await leaseUser();
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    const scripts = watchScripts(page);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
    expect((await scripts.carriers()).length, "the client was fetched").toBeGreaterThan(0);
  });

  test("SBE-3 signed in: a listings page draws each card once and keeps the server's (DEC-266, INC-913)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    await seed(seller, "active");
    const visitor = await leaseUser();
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
      // The most copies of a card the page ever held, and the first card as the server drew it.
      const most = { cards: 0 };
      Reflect.set(window, "__mostCards", most);
      new MutationObserver(() => {
        const cards = document.querySelectorAll('[data-testid="listing-card"]').length;
        if (cards > most.cards) most.cards = cards;
      }).observe(document, { childList: true, subtree: true });
      document.addEventListener("DOMContentLoaded", () => {
        Reflect.set(window, "__firstCard", document.querySelector('[data-testid="listing-card"]'));
      });
    });
    await signInViaSession(page, visitor.email, visitor.password);
    await gotoReady(page, `/c/${seller.leafSlug}`);
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    await expect(page.getByTestId("listing-card")).toHaveCount(1);
    await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
    const seen = await page.evaluate(() => {
      const first: unknown = Reflect.get(window, "__firstCard");
      const most: unknown = Reflect.get(window, "__mostCards");
      return {
        most: most !== null && typeof most === "object" ? Reflect.get(most, "cards") : -1,
        kept:
          first instanceof Element &&
          first === document.querySelector('[data-testid="listing-card"]'),
      };
    });
    expect(seen.most, "the page never held two copies of the card").toBe(1);
    expect(seen.kept, "the browser kept the card the server drew").toBe(true);
  });

  test("SBE-4 signed out, the client's download fails: the sign-in form says so and its button works again (INC-915)", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    // Every script that carries the client is refused, as a dropped download on a phone.
    await page.route("**/*.js", async (route) => {
      const response = await route.fetch();
      if ((await response.text()).includes(CLIENT_MARKER)) await route.abort("failed");
      else await route.fulfill({ response });
    });
    await gotoReady(page, "/auth");
    const { email, password, submit } = authFields(page);
    await email.fill("nobody@example.test");
    await password.fill("not-a-real-password-1");
    await submit.click();
    await expect(
      page.locator('p[role="alert"]').filter({ hasText: en["auth.errorGeneric"] }),
    ).toBeVisible();
    await expect(submit).toBeEnabled();
  });
});
````

# Foundations — turn 34c-5: every session read in the browser goes through the door, and a read that failed is never "signed out" — the signed-in services, Account and Settings, and the auth service's own flows (INC-933): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34c-5 (2026-10-26; INC-933; DEC-274; register row 54; anchors located at 6b3a461d205dbe224a7071e9e639b700f7f8f9d9). Turn 34c-1 made `currentSession()` the one session read and CF-SESSION-1 judges its readers — but the census counts only that function's callers, and fifteen reads in the browser still ask the client directly (`.auth.getSession()` or `.auth.getUser()`) and take `data.session` without its error, so a read that failed is "nobody signed in": the posting service's own-row reads, the price prefills, the step-up freshness, Account's and Settings' member-since (each a server round trip through `getUser()`), and the auth service's own flows — where a reset whose recovery session could not be read says "the link is invalid" and a verification landing says the link failed. Your turn 34c-1 and 34c-2 reports listed them (K2). This turn moves every one onto the door and lands the census of reads around it. Tier A (the session; the sign-in, reset and verification flows; the step-up check). No migration. No string. No package change. AGENTS.md: one clause added to its Supabase-client line (EDIT below). No file deleted. Base: dev 6b3a461d205dbe224a7071e9e639b700f7f8f9d9 (turn K2's landing). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the readers; D — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 6b3a461d205dbe224a7071e9e639b700f7f8f9d9
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
scripts/conformance/session-reads-allowlist.txt
scripts/conformance/session-reads.test.ts
scripts/conformance/vendor-seams-allowlist.txt
src/features/account/account-overview.tsx
src/features/auth/auth-client.test.ts
src/features/auth/auth-service.ts
src/features/auth/mfa/mfa-service.ts
src/features/posting/posting-service.ts
src/features/posting/pricing-data.test.ts
src/features/posting/pricing-data.ts
src/routes/settings.tsx
src/test/settings-messages.test.tsx
SCOPE-END

THE SYSTEM (G0) — one concern, row 54 continued.
CONCERN: a session read in the browser — who is signed in, with what token, since when — answers through the door, and a read that failed is unknown, never "nobody signed in" (INC-914, INC-933).
MECHANISM: `currentSession()` (src/lib/supabase-door.ts :213) → `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`); every reader reads `failed` (CF-SESSION-1). New: no `.auth.getSession()` or `.auth.getUser()` in the browser tree around it (CF-SESSION-3) — the one exception an allowlist line with its DEC.
CONSUMERS (grep of `auth\.getSession()\|auth\.getUser(` in src/ at BASE, every one — the census's own list):
- src/features/posting/posting-service.ts :531 readLastListingPlaces, :722 readLastListingContact, :937 readSellerLine, :956 readSellerIdentity (`getUser()`, a server round trip for the user's id) → one `signedInSellerId()`: `null` when nobody is signed in, a failed read throws `ReaderError(readerFailure(error))` (the callers already catch a reader failure: wizard.tsx :387, step-who.tsx :245/:282/:347, step-review.tsx :273/:282, my-listing-page.tsx :246/:251; step-where.tsx :1002 reads readLastListingPlaces, which answers null on any failure and now logs it — its `catch {}` was silent);
- src/features/posting/pricing-data.ts :142 signedInId (readSellerHome, readLastListingCurrency) → currentSession; a failed read is no prefill, as every failure there is;
- src/features/auth/mfa/mfa-service.ts :171 isStepUpFresh → currentSession; a failed read is not fresh (the step-up asks again; the server is the authority, F3);
- src/features/account/account-overview.tsx :67 and src/routes/settings.tsx :180 — `getUser()` for the account's `created_at` → the session's own `user.created_at` (no server round trip); a failed read is Account's load error, Settings' member-since unknown (not shown); Settings then reaches Supabase only through the door and leaves the vendor-seams allowlist (INC-877; scripts/conformance/vendor-seams-allowlist.txt :38);
- src/features/auth/auth-service.ts :226 awaitSessionCommit (a failed read is "not committed yet"; the poll goes on; its unused client parameter goes), :484 and :518 rehydrate (a failed read is thrown — sessionRehydration answers "unavailable"), :557, :563, :582 completeEmailVerification (a failed read is `{ ok: false, unavailable: true }`, never a failed link), :675 completePasswordReset (a failed read is `auth.errorGeneric` — try again — never `auth.errorResetLinkInvalid`);
- src/features/auth/auth-service.ts :412 currentPasswordProof `getUser()` — the server's own answer of the account's e-mail for the password proof — stays (DEC-274: an e-mail confirmed on another device is not yet in this device's session); its allowlist line;
- outside the census by definition: src/server/supabase/user-client.ts :93 (the server's identity check of a bearer — the route boundary's), src/integrations/supabase/auth-attacher.ts :9 (the generated platform file nothing imports — src/lib/session-bearer.ts replaced it).
COVERED HERE: every consumer above. LEFT: none.
CONFORMANCE GUARD: CF-SESSION-3 (scripts/conformance/session-reads.test.ts — `sessionBypassCensus`: every `<client>.auth.getSession()` / `<client>.auth.getUser()` call in src/ but src/server/, src/routes/api/ and src/integrations/, keyed `<file> <function>`; allowlist scripts/conformance/session-reads-allowlist.txt, the kit's `key | reason | until` form) — red on BASE naming the fifteen; CF-SESSION-4 (planted: a `getSession()` and a `getUser()` named, the door's read and `getUserIdentities()` passed); CF-SESSION-1 judges the new readers; ASC-8 and ASC-9 (the reset and the verification landing on a failed read).
EXCEPTIONS: the password proof's `getUser()` — its allowlist line, DEC-274.
FIVE LENSES — security: the step-up freshness and the reset read the same session the door reads; a failed read never widens anything (not fresh; no reset; no reads of another seller's rows — INC-330's filter stays) · performance: Account, Settings and the seller's identity read (the wizard, the seller's own ad page) drop a `getUser()` server round trip each · failure modes: the subject — a failed read is a typed failure (a ReaderError, no prefill, not fresh, the load error, unavailable, try again), logged by the door · consistency: every browser session read is one call with one answer · future growth: a new reader is judged by CF-SESSION-1 and a read around the door by CF-SESSION-3 the day it lands.
FORWARD-SCAN: turns 35–37 move the signed-in and staff modules onto the door for their client; their session reads are already on it. REGISTER: rows 54 and 13 (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34c-5.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: none in this turn.
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34c-5.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW or FILE block carries a non-null assertion (your platform rule; CF-NN-1 counts them).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34c-5.md, roadmap.md, AGENTS.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34c-5.report.md (your completion report). `bun run i18n:usage` changes nothing (no key moves; checked). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows CF-SESSION-3, ASC-8 and ASC-9 failing on BASE's code before Part C's edits.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox, and EXH-4 and EXH-21 have timed out under the full run's load and passed alone (INC-890; turns 34c-2 and 34c-3's reports); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407). Before a run, nothing of a previous run may still hold port 4173 — stop it first.
- Behaviour contract: a read that succeeds answers exactly as at BASE (the same seller's rows, the same prefills, the same freshness, the same member-since date, the same sign-in, reset and verification outcomes). Changed only where the read fails: the posting service's own-row reads throw a reader failure (their callers' failure paths); a prefill is not offered; the step-up asks again; Account shows its load error and Settings no member-since; the reset says try again (`auth.errorGeneric`), the verification landing says the page did not load (`unavailable`), the mount read answers "unavailable" — and the door logs each. Account, Settings and the seller's identity read no longer ask the server for the user. Nothing else changes.
- Knowledge K: K1 the census above; K2 the report lists (file:line) every other place, in scope or not, where code reads who is signed in from somewhere other than the door (a cached user object, a JWT decoded from storage, `useAuth()` where a fresh read is needed) — listed, not changed; K3 the guard lands with the fix; K4–K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; CF-SESSION-3/4, ASC-8 and ASC-9 and one pricing test (a failed read reads nothing) are new; ASC-6/7, the pricing tests and the Settings tests mock the door's read where they mocked the client's (the reader moved); every other test unchanged.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: run 40403849904 on BASE (turn K2's landing) — queued when this brief was sent; green, or still running; a red there is read and named). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The census — BLOCK 1 (scripts/conformance/session-reads-allowlist.txt) and these edits:
EDIT scripts/conformance/session-reads.test.ts #1
OLD-BEGIN
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

OLD-END
NEW-BEGIN
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

NEW-END
EDIT scripts/conformance/session-reads.test.ts #2
OLD-BEGIN
 * handed to a `.then` callback that reads it so. Anything else is a finding.
 */
OLD-END
NEW-BEGIN
 * handed to a `.then` callback that reads it so. Anything else is a finding.
 *
 * Turn 34c-5 (INC-933) — and nothing reads the session around the door: a `.auth.getSession()`
 * or `.auth.getUser()` call in the browser tree (src/ but the server's code, its API routes and
 * the generated client) takes the client's answer without the door's `failed`, so it is a
 * finding unless its allowlist line (`<file> <function> | reason | until`) says why.
 */
NEW-END
EDIT scripts/conformance/session-reads.test.ts #3
OLD-BEGIN

describe("a session that could not be read is unknown, never signed out (INC-914)", () => {
OLD-END
NEW-BEGIN

/** The client's own session and user reads. */
const AROUND = new Set(["getSession", "getUser"]);

/** The name of the function a node sits in (its declaration, or the variable an arrow is held in). */
function functionNameOf(node: ts.Node, source: ts.SourceFile): string {
  for (let up = node.parent; up !== undefined; up = up.parent) {
    if ((ts.isFunctionDeclaration(up) || ts.isMethodDeclaration(up)) && up.name !== undefined)
      return up.name.getText(source);
    if (
      ts.isVariableDeclaration(up) &&
      ts.isIdentifier(up.name) &&
      up.initializer !== undefined &&
      (ts.isArrowFunction(up.initializer) || ts.isFunctionExpression(up.initializer))
    )
      return up.name.text;
  }
  return "(module)";
}

/** Every `<client>.auth.getSession()` / `<client>.auth.getUser()` call: its place and its key. */
export function sessionBypassCensus(
  files: string[],
): Array<{ file: string; line: number; key: string }> {
  const found: Array<{ file: string; line: number; key: string }> = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression)) return;
      const callee = node.expression;
      if (!AROUND.has(callee.name.text)) return;
      if (
        !ts.isPropertyAccessExpression(callee.expression) ||
        callee.expression.name.text !== "auth"
      )
        return;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      found.push({ file, line, key: `${file} ${functionNameOf(node, source)}` });
    });
  }
  return found;
}

const BYPASS_ALLOWLIST = "scripts/conformance/session-reads-allowlist.txt";

const browser = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src[\\/](?:server|integrations|routes[\\/]api)(?:[\\/]|$)/,
}).filter((file) => file !== "src/lib/supabase-door.ts");

describe("a session that could not be read is unknown, never signed out (INC-914)", () => {
NEW-END
EDIT scripts/conformance/session-reads.test.ts #4
OLD-BEGIN

  it("CF-SESSION-2 the census names a planted session-only reader and passes the three ways to read `failed`", () => {
OLD-END
NEW-BEGIN

  it(
    "CF-SESSION-3 nothing in the browser tree reads the session or the user around the door but its allowlist lines (INC-933)",
    () => {
      const found = sessionBypassCensus(browser);
      const allowed = readAllowlist(BYPASS_ALLOWLIST, new Set(found.map(({ key }) => key)));
      const findings = found
        .filter(({ key }) => !allowed.has(key))
        .map(({ file, line }) => ({
          file,
          line,
          what: "reads the session around the door — read currentSession() and its `failed`",
        }));
      console.log(
        `[session-reads] files read: ${browser.length}; reads around the door: ${found.length}`,
      );
      expect(browser.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-SESSION-4 the bypass census names planted reads around the door and passes the door's read", () => {
    const dir = "node_modules/.cache/session-bypass";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/sb-reads.ts`;
    try {
      writeFileSync(
        file,
        [
          'import { supabase } from "@/integrations/supabase/client";',
          'import { currentSession } from "@/lib/supabase-door";',
          "export async function a() {",
          "  return (await supabase.auth.getSession()).data.session;",
          "}",
          "export const b = async (client: typeof supabase) => client.auth.getUser();",
          "export async function c() {",
          "  const read = await currentSession();",
          "  await supabase.auth.getUserIdentities();",
          "  return read.failed ? null : read.session;",
          "}",
          "",
        ].join("\n"),
      );
      expect(sessionBypassCensus([file])).toEqual([
        { file, line: 4, key: `${file} a` },
        { file, line: 6, key: `${file} b` },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-SESSION-2 the census names a planted session-only reader and passes the three ways to read `failed`", () => {
NEW-END
B2. The auth service's failed reads:
EDIT src/features/auth/auth-client.test.ts #1
OLD-BEGIN
    door.getSupabase.mockReset().mockResolvedValue({ auth: { getSession } });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
OLD-END
NEW-BEGIN
    door.getSupabase.mockReset().mockResolvedValue({ auth: { getSession } });
    // Turn 34c-5 — the read goes through the door, which answers a throw as `failed`.
    door.currentSession.mockResolvedValue({
      session: null,
      failed: true,
      error: new Error("the lock timed out"),
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
NEW-END
EDIT src/features/auth/auth-client.test.ts #2
OLD-BEGIN
      .mockResolvedValue({ auth: { getSession, refreshSession, signOut } });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
OLD-END
NEW-BEGIN
      .mockResolvedValue({ auth: { getSession, refreshSession, signOut } });
    // Turn 34c-5 — the door's read finds no session in the client's memory.
    door.currentSession.mockResolvedValue({ session: null, failed: false });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
NEW-END
EDIT src/features/auth/auth-client.test.ts #3
OLD-BEGIN

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
OLD-END
NEW-BEGIN

  it("ASC-8 a reset whose recovery session could not be read is not a dead link: the person tries again (INC-933)", async () => {
    const unreachable = Object.assign(new Error("Failed to fetch"), {
      name: "AuthRetryableFetchError",
    });
    const getSession = vi.fn().mockResolvedValue({ data: { session: null }, error: unreachable });
    const updateUser = vi.fn().mockResolvedValue({ data: {}, error: null });
    door.getSupabase.mockReset().mockResolvedValue({ auth: { getSession, updateUser } });
    door.currentSession.mockResolvedValue({ session: null, failed: true, error: unreachable });
    expect(await service.completePasswordReset("new-password-1")).toEqual({
      ok: false,
      errorKey: "auth.errorGeneric",
    });
    expect(updateUser).not.toHaveBeenCalled();
    getSession.mockResolvedValue({ data: { session: null }, error: null });
    door.currentSession.mockResolvedValue({ session: null, failed: false });
    expect(await service.completePasswordReset("new-password-1")).toEqual({
      ok: false,
      errorKey: "auth.errorResetLinkInvalid",
    });
  });

  it("ASC-9 a verification landing whose session could not be read is unavailable, never a failed link (INC-933)", async () => {
    const unreachable = Object.assign(new Error("Failed to fetch"), {
      name: "AuthRetryableFetchError",
    });
    const getSession = vi.fn().mockResolvedValue({ data: { session: null }, error: unreachable });
    door.getSupabase.mockReset().mockResolvedValue({ auth: { getSession } });
    door.currentSession.mockResolvedValue({ session: null, failed: true, error: unreachable });
    expect(await service.completeEmailVerification()).toEqual({ ok: false, unavailable: true });
    getSession.mockResolvedValue({ data: { session: null }, error: null });
    door.currentSession.mockResolvedValue({ session: null, failed: false });
    expect(await service.completeEmailVerification()).toEqual({ ok: false, hadError: false });
  });

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
NEW-END
B3. Run `bunx vitest run scripts/conformance/session-reads.test.ts src/features/auth/auth-client.test.ts` — the supervisor's run on BASE: `Tests  3 failed | 10 passed (13)`: CF-SESSION-3 (`expected 'src/features/account/account-overview…' to be ''` — it names the fifteen reads around the door: account-overview.tsx:67, auth-service.ts :226, :484, :518, :557, :563, :582, :675, mfa-service.ts:171, posting-service.ts :531, :722, :937, :956, pricing-data.ts:142, settings.tsx:180), ASC-8 (`expected { ok: false, …(1) } to deeply equal { ok: false, …(1) }` — the reset answered `auth.errorResetLinkInvalid` for a read that failed), ASC-9 (`expected { ok: false, hadError: false } to deeply equal { ok: false, unavailable: true }`) — paste the failure lines and the totals.

PART C — THE READERS.
C1. The posting service and the price prefills (with their test's door mock):
EDIT src/features/posting/posting-service.ts #1
OLD-BEGIN
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { callRoute, uploadRoute, type RouteAnswer, type RoutePath } from "@/lib/route-client";
import { supabase } from "@/integrations/supabase/client";
import type { Certification } from "@/features/my-listings/my-listing";
OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { callRoute, uploadRoute, type RouteAnswer, type RoutePath } from "@/lib/route-client";
import { currentSession } from "@/lib/supabase-door";
import { supabase } from "@/integrations/supabase/client";
import type { Certification } from "@/features/my-listings/my-listing";
NEW-END
EDIT src/features/posting/posting-service.ts #2
OLD-BEGIN
}

/**
 * W6b-1 R4 — THE LAST POST'S PLACES, for a NEW post's prefill. Filtered by
OLD-END
NEW-BEGIN
}

/**
 * Turn 34c-5 (INC-933) — THE SIGNED-IN SELLER'S ID, from the door's session read (no
 * network). `null` when nobody is signed in; a read that failed throws a ReaderError —
 * unknown, never "nobody is signed in" (INC-914). Every "the seller's own row" read below
 * filters by it (INC-330).
 */
async function signedInSellerId(): Promise<string | null> {
  const read = await currentSession();
  if (read.failed) throw new ReaderError(readerFailure(read.error));
  return read.session?.user.id ?? null;
}

/**
 * W6b-1 R4 — THE LAST POST'S PLACES, for a NEW post's prefill. Filtered by
NEW-END
EDIT src/features/posting/posting-service.ts #3
OLD-BEGIN
 * draft on screen out. Only the place's `country_code` is read from
 * `locations` (the public read), so the step can open the right market; names
 * still come from the cached tree. A failure is simply no prefill (`null`).
 */
export async function readLastListingPlaces(excludeId: string | null): Promise<LastPlaces | null> {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id ?? null;
    if (userId === null) return null;
    let query = supabase
OLD-END
NEW-BEGIN
 * draft on screen out. Only the place's `country_code` is read from
 * `locations` (the public read), so the step can open the right market; names
 * still come from the cached tree. A failure is simply no prefill (`null`), logged (F4).
 */
export async function readLastListingPlaces(excludeId: string | null): Promise<LastPlaces | null> {
  try {
    const userId = await signedInSellerId();
    if (userId === null) return null;
    let query = supabase
NEW-END
EDIT src/features/posting/posting-service.ts #4
OLD-BEGIN
          };
    return { country, itemId: last.location_id, placeIds: [last.location_id, ...others], pin };
  } catch {
    return null;
  }
OLD-END
NEW-BEGIN
          };
    return { country, itemId: last.location_id, placeIds: [last.location_id, ...others], pin };
  } catch (error) {
    console.warn(`[post-where] the last post's places could not be read: ${errorText(error)}`);
    return null;
  }
NEW-END
EDIT src/features/posting/posting-service.ts #5
OLD-BEGIN
  excludeId: string | null,
): Promise<Record<string, unknown> | null> {
  const { data: session } = await supabase.auth.getSession();
  if ((session.session?.user.id ?? null) === null) return null;
  // INC-389 — contact_pref is private; the owner-only door reads the last post.
  const { data, error } = await supabase.rpc("my_last_listing_private", {
OLD-END
NEW-BEGIN
  excludeId: string | null,
): Promise<Record<string, unknown> | null> {
  if ((await signedInSellerId()) === null) return null;
  // INC-389 — contact_pref is private; the owner-only door reads the last post.
  const { data, error } = await supabase.rpc("my_last_listing_private", {
NEW-END
EDIT src/features/posting/posting-service.ts #6
OLD-BEGIN
 */
export async function readSellerLine(): Promise<SellerLineFacts | null> {
  const { data: session } = await supabase.auth.getSession();
  if ((session.session?.user.id ?? null) === null) return null;
  const { data, error } = await supabase.rpc("my_seller_line");
  if (error) throw new Error(error.message);
OLD-END
NEW-BEGIN
 */
export async function readSellerLine(): Promise<SellerLineFacts | null> {
  if ((await signedInSellerId()) === null) return null;
  const { data, error } = await supabase.rpc("my_seller_line");
  if (error) throw new Error(error.message);
NEW-END
EDIT src/features/posting/posting-service.ts #7
OLD-BEGIN

export async function readSellerIdentity(): Promise<SellerIdentity | null> {
  const { data: session } = await supabase.auth.getUser();
  const userId = session.user?.id ?? null;
  if (userId === null) return null;
  const { data, error } = await supabase
OLD-END
NEW-BEGIN

export async function readSellerIdentity(): Promise<SellerIdentity | null> {
  // Turn 34c-5 — the session's own id, not a server round trip (`auth.getUser()` was one).
  const userId = await signedInSellerId();
  if (userId === null) return null;
  const { data, error } = await supabase
NEW-END
EDIT src/features/posting/pricing-data.ts #1
OLD-BEGIN
import { callRoute } from "@/lib/route-client";
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { callRoute } from "@/lib/route-client";
import { currentSession } from "@/lib/supabase-door";
import { supabase } from "@/integrations/supabase/client";
NEW-END
EDIT src/features/posting/pricing-data.ts #2
OLD-BEGIN
 * INC-330 — THE SIGNED-IN SELLER'S OWN ID, read from the local session (no
 * network). Every "the seller's own row" read below filters by it: RLS alone is
 * not a filter. `listings_public_read` shows EVERY active listing to a seller, so
 * an unfiltered "last listing" read returned another seller's currency; and an
 * unfiltered `profiles` read made the policy judge every row (slow enough on a
OLD-END
NEW-BEGIN
 * INC-330 — THE SIGNED-IN SELLER'S OWN ID, read from the local session (no
 * network) through the door (turn 34c-5, INC-933): a read that failed is no
 * prefill, as every failure here is — the door has logged it. Every "the
 * seller's own row" read below filters by it: RLS alone is not a filter.
 * `listings_public_read` shows EVERY active listing to a seller, so an
 * unfiltered "last listing" read returned another seller's currency; and an
 * unfiltered `profiles` read made the policy judge every row (slow enough on a
NEW-END
EDIT src/features/posting/pricing-data.ts #3
OLD-BEGIN
async function signedInId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}
OLD-END
NEW-BEGIN
async function signedInId(): Promise<string | null> {
  const read = await currentSession();
  if (read.failed) return null;
  return read.session?.user.id ?? null;
}
NEW-END
EDIT src/features/posting/pricing-data.test.ts #1
OLD-BEGIN
let sessionUser: string | null = "seller-1";

OLD-END
NEW-BEGIN
let sessionUser: string | null = "seller-1";
let sessionFailed = false;

NEW-END
EDIT src/features/posting/pricing-data.test.ts #2
OLD-BEGIN

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: () =>
        Promise.resolve({
          data: { session: sessionUser === null ? null : { user: { id: sessionUser } } },
        }),
    },
    from: (table: string) =>
OLD-END
NEW-BEGIN

// Turn 34c-5 (INC-933) — the seller's id comes from the door's session read.
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () =>
    Promise.resolve(
      sessionFailed
        ? { session: null, failed: true, error: new Error("Failed to fetch") }
        : { session: sessionUser === null ? null : { user: { id: sessionUser } }, failed: false },
    ),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: (table: string) =>
NEW-END
EDIT src/features/posting/pricing-data.test.ts #3
OLD-BEGIN
    sessionUser = "seller-1";
  });
OLD-END
NEW-BEGIN
    sessionUser = "seller-1";
    sessionFailed = false;
  });
NEW-END
EDIT src/features/posting/pricing-data.test.ts #4
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("reads nothing when the session read failed: no prefill, never another seller's row (INC-933)", async () => {
    sessionFailed = true;
    expect(await readLastListingCurrency()).toBe(null);
    expect(await readSellerHome()).toEqual({ countryCode: null, currencyCode: null });
    expect(calls).toHaveLength(0);
  });
});
NEW-END
C2. The step-up freshness, Account and Settings (with Settings' test mock):
EDIT src/features/auth/mfa/mfa-service.ts #1
OLD-BEGIN
import { isE2E } from "@/lib/env-flags";

OLD-END
NEW-BEGIN
import { isE2E } from "@/lib/env-flags";
import { currentSession } from "@/lib/supabase-door";

NEW-END
EDIT src/features/auth/mfa/mfa-service.ts #2
OLD-BEGIN
 * Authority still lives in public.require_step_up_if_needed (law F3).
 */
export async function isStepUpFresh(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return false;
OLD-END
NEW-BEGIN
 * Authority still lives in public.require_step_up_if_needed (law F3).
 * Turn 34c-5 (INC-933) — the session through the door: a read that failed is not
 * fresh (the step-up asks again; the door has logged the failure).
 */
export async function isStepUpFresh(): Promise<boolean> {
  const read = await currentSession();
  if (read.failed) return false;
  const token = read.session?.access_token;
  if (!token) return false;
NEW-END
EDIT src/features/account/account-overview.tsx #1
OLD-BEGIN
import { formatLocale } from "@/lib/format-locale";

OLD-END
NEW-BEGIN
import { formatLocale } from "@/lib/format-locale";
import { currentSession } from "@/lib/supabase-door";

NEW-END
EDIT src/features/account/account-overview.tsx #2
OLD-BEGIN
    void (async () => {
      const [profile, listings, authUser] = await Promise.all([
        supabase
OLD-END
NEW-BEGIN
    void (async () => {
      // Turn 34c-5 (INC-933) — the member-since date from the door's session read (local), not
      // a server round trip (`auth.getUser()` was one); a read that failed is the page's error.
      const read = await currentSession();
      const [profile, listings] = await Promise.all([
        supabase
NEW-END
EDIT src/features/account/account-overview.tsx #3
OLD-BEGIN
        readMyListings("live", 1, 0),
        supabase.auth.getUser(),
      ]);
      if (!active) return;
      if (profile.error || listings === null || authUser.error) {
        setState((current) => ({ ...current, error: true }));
OLD-END
NEW-BEGIN
        readMyListings("live", 1, 0),
      ]);
      if (!active) return;
      if (read.failed || profile.error || listings === null) {
        setState((current) => ({ ...current, error: true }));
NEW-END
EDIT src/features/account/account-overview.tsx #4
OLD-BEGIN
        profile: profile.data,
        memberSince: authUser.data.user?.created_at ?? null,
        counts: listings.counts,
OLD-END
NEW-BEGIN
        profile: profile.data,
        memberSince: read.session?.user.created_at ?? null,
        counts: listings.counts,
NEW-END
EDIT src/routes/settings.tsx #1
OLD-BEGIN
import { getSupabase } from "@/lib/supabase-door";
OLD-END
NEW-BEGIN
import { currentSession, getSupabase } from "@/lib/supabase-door";
NEW-END
EDIT src/routes/settings.tsx #2
OLD-BEGIN
      const { data } = await supabase.auth.getUser();
OLD-END
NEW-BEGIN
      // Turn 34c-5 (INC-933) — member since from the door's session read (local), not a server
      // round trip (`auth.getUser()` was one); a read that failed leaves it unknown (not shown).
      const read = await currentSession();
NEW-END
EDIT src/routes/settings.tsx #3
OLD-BEGIN
      setMemberSince(data.user?.created_at ?? null);
OLD-END
NEW-BEGIN
      setMemberSince(read.failed ? null : (read.session?.user.created_at ?? null));
NEW-END
EDIT src/test/settings-messages.test.tsx #1
OLD-BEGIN
    auth: { getUser: async () => ({ data: { user: { created_at: "2026-01-01T00:00:00Z" } } }) },
OLD-END
NEW-BEGIN
    // Turn 34c-5 — member since comes from the door's session read (currentSession).
    auth: {
      getSession: async () => ({
        data: { session: { user: { created_at: "2026-01-01T00:00:00Z" } } },
        error: null,
      }),
    },
NEW-END
Settings now reaches Supabase only through the door, so its vendor-seams line goes stale (the census fails a stale line) and leaves:
EDIT scripts/conformance/vendor-seams-allowlist.txt #1
OLD-BEGIN
src/routes/api/listings/photos.$id.ts | direct vendor use before DEC-250 | INC-877
src/routes/settings.tsx | direct vendor use before DEC-250 | INC-877
src/server/imports/gate.ts | direct vendor use before DEC-250 | INC-877
OLD-END
NEW-BEGIN
src/routes/api/listings/photos.$id.ts | direct vendor use before DEC-250 | INC-877
src/server/imports/gate.ts | direct vendor use before DEC-250 | INC-877
NEW-END
C3. The auth service's own flows:
EDIT src/features/auth/auth-service.ts #1
OLD-BEGIN
 * DEC-076 step 2 — the session is committed when `getSession()` answers with
OLD-END
NEW-BEGIN
 * DEC-076 step 2 — the session is committed when the session read answers with
NEW-END
EDIT src/features/auth/auth-service.ts #2
OLD-BEGIN
 * the write goes through auth-js's storage lock.
OLD-END
NEW-BEGIN
 * the write goes through auth-js's storage lock. Turn 34c-5 (INC-933) — read
 * through the door: a read that failed is "not committed yet", and the poll goes on.
NEW-END
EDIT src/features/auth/auth-service.ts #3
OLD-BEGIN
async function awaitSessionCommit(
  supabase: Client,
  accessToken: string | undefined,
): Promise<boolean> {
OLD-END
NEW-BEGIN
async function awaitSessionCommit(accessToken: string | undefined): Promise<boolean> {
NEW-END
EDIT src/features/auth/auth-service.ts #4
OLD-BEGIN
    const session = (await supabase.auth.getSession()).data.session;
OLD-END
NEW-BEGIN
    const read = await currentSession();
    const session = read.failed ? null : read.session;
NEW-END
EDIT src/features/auth/auth-service.ts #5
OLD-BEGIN
  if (!(await awaitSessionCommit(supabase, data.session?.access_token))) {
OLD-END
NEW-BEGIN
  if (!(await awaitSessionCommit(data.session?.access_token))) {
NEW-END
EDIT src/features/auth/auth-service.ts #6
OLD-BEGIN
  const direct = (await supabase.auth.getSession()).data.session;
  if (direct) return true;
OLD-END
NEW-BEGIN
  // Turn 34c-5 (INC-933) — the session through the door: a read that failed is thrown, and
  // sessionRehydration answers "unavailable", never "no session".
  const direct = await currentSession();
  if (direct.failed) throw direct.error;
  if (direct.session) return true;
NEW-END
EDIT src/features/auth/auth-service.ts #7
OLD-BEGIN
  return Boolean((await supabase.auth.getSession()).data.session);
OLD-END
NEW-BEGIN
  const after = await currentSession();
  if (after.failed) throw after.error;
  return after.session !== null;
NEW-END
EDIT src/features/auth/auth-service.ts #8
OLD-BEGIN
  // 1. detectSessionInUrl may already have consumed the hash tokens.
  let session = (await supabase.auth.getSession()).data.session;
  if (session) return { ok: true };
OLD-END
NEW-BEGIN
  // 1. detectSessionInUrl may already have consumed the hash tokens. Turn 34c-5 (INC-933) —
  //    every session read here goes through the door: a read that failed is unknown, never a
  //    bad link (the screen says the page did not load).
  const first = await currentSession();
  if (first.failed) return { ok: false, unavailable: true };
  if (first.session) return { ok: true };
NEW-END
EDIT src/features/auth/auth-service.ts #9
OLD-BEGIN
  if (!session && accessToken && refreshToken) {
OLD-END
NEW-BEGIN
  if (accessToken && refreshToken) {
NEW-END
EDIT src/features/auth/auth-service.ts #10
OLD-BEGIN
    session = (await supabase.auth.getSession()).data.session;
    if (session) return { ok: true };
OLD-END
NEW-BEGIN
    const set = await currentSession();
    if (set.failed) return { ok: false, unavailable: true };
    if (set.session) return { ok: true };
NEW-END
EDIT src/features/auth/auth-service.ts #11
OLD-BEGIN
  session = (await supabase.auth.getSession()).data.session;
  if (session) return { ok: true };
OLD-END
NEW-BEGIN
  const last = await currentSession();
  if (last.failed) return { ok: false, unavailable: true };
  if (last.session) return { ok: true };
NEW-END
EDIT src/features/auth/auth-service.ts #12
OLD-BEGIN
  const session = (await supabase.auth.getSession()).data.session;
  if (!session) return { ok: false, errorKey: "auth.errorResetLinkInvalid" };
OLD-END
NEW-BEGIN
  // Turn 34c-5 (INC-933) — the recovery session through the door: a read that failed (its
  // refresh never reached the server) is not a dead link — the person tries again.
  const read = await currentSession();
  if (read.failed) return { ok: false, errorKey: "auth.errorGeneric" };
  if (!read.session) return { ok: false, errorKey: "auth.errorResetLinkInvalid" };
NEW-END
C4. Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance src/features/auth src/features/posting src/features/account src/test` — every test passes (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn K2: the kit's non-null assertions out; the platform rule's guard — INC-932)` becomes `docs/governance/briefs/foundations-turn-34c-5.md (Foundations turn 34c-5: every session read in the browser through the door — INC-933)` (everything after it stays, as it is).
D2. These edits (AGENTS.md's Supabase-client line; the register's rows 13 (the vendor-seams count) and 54; the changelog; turn K2 ticked with its closing run; this turn's own line):
EDIT AGENTS.md #1
OLD-BEGIN
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); every reader of currentSession reads its `failed` — a failed read is unknown, never signed out (INC-914, CF-SESSION-1); the project's address and key and the session's storage names only through projectEnv, storedSessionKey and besideStoredSession (CF-PROJECT-1); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
OLD-END
NEW-BEGIN
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); every reader of currentSession reads its `failed` — a failed read is unknown, never signed out (INC-914, CF-SESSION-1) — and browser code never reads `.auth.getSession()` or `.auth.getUser()` around it (CF-SESSION-3; an exception is an allowlist line with its DEC); the project's address and key and the session's storage names only through projectEnv, storedSessionKey and besideStoredSession (CF-PROJECT-1); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 13 | New code reaches a vendor (Supabase, Lovable) only through the project's seam modules | the five seams: `src/integrations/supabase/**`, `src/server/supabase/**`, `src/server/media/storage.ts`, `src/lib/route-client.ts`, `src/lib/supabase-door.ts` (DEC-261, Foundations turn 34) | VS-1…3 in `scripts/conformance/vendor-seams.test.ts` over `vendor-seams-scan.ts`, dynamic imports too (INC-916, VS-4/5); allowlist `scripts/conformance/vendor-seams-allowlist.txt` (51 physical lines, 49 entries) until INC-877; exit notes `docs/features/vendor-exit.md` | the 49 frozen files (41 Supabase, 8 Lovable), each a reviewed line | a move off Supabase or Lovable is the frozen set | DEC-250; planted-file proof VS-3 |
OLD-END
NEW-BEGIN
| 13 | New code reaches a vendor (Supabase, Lovable) only through the project's seam modules | the five seams: `src/integrations/supabase/**`, `src/server/supabase/**`, `src/server/media/storage.ts`, `src/lib/route-client.ts`, `src/lib/supabase-door.ts` (DEC-261, Foundations turn 34) | VS-1…3 in `scripts/conformance/vendor-seams.test.ts` over `vendor-seams-scan.ts`, dynamic imports too (INC-916, VS-4/5); allowlist `scripts/conformance/vendor-seams-allowlist.txt` (50 physical lines, 48 entries) until INC-877; exit notes `docs/features/vendor-exit.md` | the 48 frozen files (40 Supabase, 8 Lovable), each a reviewed line — Settings left in turn 34c-5 | a move off Supabase or Lovable is the frozen set | DEC-250; planted-file proof VS-3 |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 54 | A session the browser could not read is UNKNOWN, never signed out: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so (INC-914) | `src/lib/supabase-door.ts` — `currentSession()` answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`) — `failed` when the read did not happen (the client not downloaded, getSession() thrown, a refresh that never reached the server); a refresh the server refused is signed out, known; its readers: use-auth (unknown: loading kept, the shell's notice), requireSignedIn (the route error view, whose one cure is Refresh), the session's bearer (none, said), the preferred-language reads (a typed reason), the legal landing (lands, logged), route-client; the reset and confirmation screens keep a client that did not load apart from a dead link (`sessionRehydration`, `VerificationResult` `unavailable`) | `scripts/conformance/session-reads.test.ts` (CF-SESSION-1: every reader reads `failed`; CF-SESSION-2: planted session-only readers); UA-1/2, SIR-3, SBB-3, REV-1, SBD-11/15/20; `e2e/supabase-door.spec.ts` SBE-6 | none | a new reader is named by CF-SESSION-1 the day it lands | the root error view's Try again became Refresh (INC-918's class); Foundations turn 34c-1; turn 34c-2 — INC-931, DEC-273: the sign-in and reset screens' mount read (auth-service.ts `rehydrate`) keeps an expired session whose refresh never reached the server (`neverReachedTheServer`) and answers "unavailable", ASC-7; the eviction stays for a refresh the server refused |
OLD-END
NEW-BEGIN
| 54 | A session the browser could not read is UNKNOWN, never signed out: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so (INC-914) | `src/lib/supabase-door.ts` — `currentSession()` answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`) — `failed` when the read did not happen (the client not downloaded, getSession() thrown, a refresh that never reached the server); a refresh the server refused is signed out, known; its readers: use-auth (unknown: loading kept, the shell's notice), requireSignedIn (the route error view, whose one cure is Refresh), the session's bearer (none, said), the preferred-language reads (a typed reason), the legal landing (lands, logged), route-client; the reset and confirmation screens keep a client that did not load apart from a dead link (`sessionRehydration`, `VerificationResult` `unavailable`); since turn 34c-5 (INC-933) also the signed-in services — the posting service's own-row reads (`signedInSellerId`: a failed read throws a ReaderError), the price prefills (no prefill), the step-up freshness (not fresh), Account and Settings' member-since (the session's own `created_at`, no server round trip), and the auth service's own flows (the grant's commit poll, `rehydrate`, the verification landing — `unavailable` —, the reset — the generic error, never a dead link) | `scripts/conformance/session-reads.test.ts` (CF-SESSION-1: every reader reads `failed`; CF-SESSION-2: planted session-only readers; CF-SESSION-3: no `.auth.getSession()` or `.auth.getUser()` around the door in the browser tree — src/ but src/server, src/routes/api and src/integrations; CF-SESSION-4: planted reads around it); UA-1/2, SIR-3, SBB-3, REV-1, SBD-11/15/20, ASC-6/7/8/9; `e2e/supabase-door.spec.ts` SBE-6 | `scripts/conformance/session-reads-allowlist.txt`: the password proof's `auth.getUser()` (the server's own answer of the e-mail; DEC-274) | a new reader is named by CF-SESSION-1 the day it lands, and a read around the door by CF-SESSION-3 | the root error view's Try again became Refresh (INC-918's class); Foundations turn 34c-1; turn 34c-2 — INC-931, DEC-273: the sign-in and reset screens' mount read (auth-service.ts `rehydrate`) keeps an expired session whose refresh never reached the server (`neverReachedTheServer`) and answers "unavailable", ASC-7; the eviction stays for a refresh the server refused; turn 34c-5 — every session read in the browser through the door (INC-933) |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn K2 (2026-10-26; the kit cleanup) — the kit (.claude/hooks/lib.ts, land.ts) carries no non-null assertion: its 22 became guards, `charAt`, optional chaining and a typed report path (EXH-1…24 unchanged). The platform rule gets its guard: the non-null census (CF-NN-1/2) counts every non-null assertion in src/, scripts/, e2e/ and the kit, a `process.env` read excepted, and its ratchet allowlist holds each of the 143 files that still carry the 979 older ones at its count (INC-932) — a file's count only falls, the kit's stays at zero.
OLD-END
NEW-BEGIN
- Foundations turn K2 (2026-10-26; the kit cleanup) — the kit (.claude/hooks/lib.ts, land.ts) carries no non-null assertion: its 22 became guards, `charAt`, optional chaining and a typed report path (EXH-1…24 unchanged). The platform rule gets its guard: the non-null census (CF-NN-1/2) counts every non-null assertion in src/, scripts/, e2e/ and the kit, a `process.env` read excepted, and its ratchet allowlist holds each of the 143 files that still carry the 979 older ones at its count (INC-932) — a file's count only falls, the kit's stays at zero.

- Foundations turn 34c-5 (2026-10-26; INC-933) — every session read in the browser goes through the door's `currentSession()` and reads its `failed`: the posting service's own-row reads (a failed read is a typed reader failure, never "nobody signed in"), the price prefills, the step-up freshness, Account and Settings (member since from the session's own `created_at` — no server round trip; nor for the seller's identity read in the wizard and on the seller's own ad page, which asked the server for the user's id), and the auth service's own flows — a reset whose recovery session could not be read answers "try again", not "the link is invalid" (ASC-8); a verification landing answers "unavailable", not a failed link (ASC-9). The census CF-SESSION-3/4 names any `.auth.getSession()` or `.auth.getUser()` around the door; its one allowlist line is the password proof's server read of the e-mail (DEC-274). Settings leaves the vendor-seams allowlist (INC-877): it reaches Supabase only through the door.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn K2 (docs/governance/briefs/foundations-turn-k2.md; no migration; Lovable) — the kit's 22 non-null assertions (.claude/hooks/lib.ts, land.ts) become guards; the platform rule's guard: the non-null census (CF-NN-1/2) with its ratchet allowlist — 143 files hold the 979 older assertions at their counts (INC-932), a count only falls, the kit's stays at zero. INC-921 (the tree-scan time budget) stays on the kit's next turn.
OLD-END
NEW-BEGIN
  - [x] Turn K2 (docs/governance/briefs/foundations-turn-k2.md; no migration; Lovable) — the kit's 22 non-null assertions (.claude/hooks/lib.ts, land.ts) become guards; the platform rule's guard: the non-null census (CF-NN-1/2) with its ratchet allowlist — 143 files hold the 979 older assertions at their counts (INC-932), a count only falls, the kit's stays at zero. INC-921 (the tree-scan time budget) stays on the kit's next turn. Final HEAD 6b3a461d; CI run 40403849904: queued when turn 34c-5's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-5 (docs/governance/briefs/foundations-turn-34c-5.md; no migration; Lovable) — INC-933: every session read in the browser through the door's `currentSession()` and its `failed` — the posting service's own-row reads (`signedInSellerId`, a failed read a reader failure), the price prefills, the step-up freshness, Account's and Settings' member-since (the session's own `created_at`, no `getUser()` round trip), the auth service's commit poll, mount read, verification landing (`unavailable`) and reset (try again, never a dead link; ASC-8/9); the census of reads around the door (CF-SESSION-3/4), its one allowlist line the password proof's server read of the e-mail (DEC-274).
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34c-5.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase e2e` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 324 files, 1992 tests, every one passed); `bun run i18n:usage` then `git diff <START> --stat -- docs/generated public` (empty); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
5ed6b1925c6322e3b3837c4842b596a029a77d399c4b6114a0da4a0e299655a5  AGENTS.md
ad24b2cf345caf2cdbfb824fb49e4f41b16c25447a3e95d7308be3e277613f27  docs/_changelog.md
ff4f50f142380b62145ea1428879d41aff7c291ae79d0a72639985e6e02e3001  docs/governance/mechanisms.md
649df05614c3e6846e79313980b7b497e5a216deb13a6ee770bbdde2a29babf6  scripts/conformance/session-reads-allowlist.txt
6264bf5ef85f6e423de050dc97f63acf32bcd28441efdeb304a59329fbf5e86b  scripts/conformance/session-reads.test.ts
fec28e73171a7facd566966e7cbd802f6cf0ad8caf51064784963aa9b2a52692  scripts/conformance/vendor-seams-allowlist.txt
29da9cddf6a25d475f6ad836c1daed9b4b606d72e702636750527ef6919cf0a1  src/features/account/account-overview.tsx
6056629eb1fa335687a8d3ab4411ce9b353596c2771202f71b0c25f40e4b0b4e  src/features/auth/auth-client.test.ts
1c821917859abea83dbb15776c57677a508c08b1faecd217d1626c762b1d7939  src/features/auth/auth-service.ts
02aa77e6c26ad79c64a3c2306c3019021a8dd57a78ba254bdda0f156ea6b4905  src/features/auth/mfa/mfa-service.ts
b7569a0042e63c91aff03818a8b719535a2471db5d059ee8c4894befe53ffa1a  src/features/posting/posting-service.ts
9c4be65423c20b119da7af41a6527697180cd8a6c6ae9d5150118dd073825e58  src/features/posting/pricing-data.test.ts
7ca9b2885c7479d0264eb9a7a32ddadfb91643407ae80fc7df1a6bb769d4bcb1  src/features/posting/pricing-data.ts
dc58b436ac375543aa6b93def309047e14fa6c64394e8065dd1fc16ca0fb5657  src/routes/settings.tsx
7c548271eea202d3c9d872a7b163f8d82b870fc1733a1167957c589e2ea26c66  src/test/settings-messages.test.tsx

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>`; both projects, 0 retries, fake mode; G37's minimum — no spec file changes and no screen changes; the services the screens call change; CI runs every test on every commit): e2e/auth-reset.spec.ts whole (completePasswordReset, the mount read), e2e/auth-callback.spec.ts whole (the verification landing), e2e/mfa-stepup.spec.ts whole (the step-up freshness), e2e/settings.spec.ts whole (Settings' member-since and the password proof); paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34c-5.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract before → after for each consumer above; the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); "none" for migrations and strings; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): DEC-274 — the password proof keeps the server's answer of the e-mail (`getUser()`), the one read around the door; a reset whose recovery session could not be read answers the generic "try again" (an existing string), not a new one; Account reads the session before its two server reads rather than beside them (the census reads a held answer; the read is local).

BLOCK 1 — FILE-BEGIN scripts/conformance/session-reads-allowlist.txt
# Turn 34c-5 (INC-933) — a session or user read around the door: `<client>.auth.getSession()` or
# `<client>.auth.getUser()` in the browser tree (scripts/conformance/session-reads.test.ts, CF-SESSION-3).
# Key: `<file> <function>` | reason | until. Every other read goes through currentSession() and reads its `failed`.
src/features/auth/auth-service.ts currentPasswordProof | the server's own answer of the account's e-mail for the password proof — a server read by design (an e-mail confirmed on another device is not yet in this device's session); a failed read answers the generic error | DEC-274
FILE-END scripts/conformance/session-reads-allowlist.txt
```

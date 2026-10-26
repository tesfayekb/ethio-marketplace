# Foundations — turn 34w-2: turn 34w's NOT READY landing — the root reads its facts once, so the offline sign-out keeps the site on screen (DEC-272, INC-927); SO-11 waits for the signed-in page (INC-928); the live guard evacuates every door-step page (INC-926); the fading notice and the kept empty message carry no role (INC-929): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34w-2 (2026-10-26; DEC-271, DEC-272; INC-926, INC-927, INC-928, INC-929; anchors located at f09ec2a90bc6fc4405b3ac5e5b1e53caab50e898). Turn 34w landed byte-exact (a8c025ef) and NOT READY — your reviewer was right: SO-12 failed because the offline branch's move to "/" from "/" made the router read the root's facts from the server again, and offline that read failed and the root's error view replaced the app (CI run 40358294719: SO-12 at both widths, the page snapshot "This page didn't load", the client log `TypeError: Failed to fetch … createServerFn`); SO-11 passed on CI and failed in your sandbox only, because the test made the session stale before the signed-in page was drawn. This turn fixes both at their roots, with your reviewer's K2 item (the live guard's own page list) and its minor (the fading notice's role). Tier A (the shell's live guard and the sign-out's offline path). No migration. No string. No package change. No AGENTS.md change. No file deleted. Base: dev f09ec2a90bc6fc4405b3ac5e5b1e53caab50e898 (turn 34b-3's landing). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the fixes; D — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: f09ec2a90bc6fc4405b3ac5e5b1e53caab50e898
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
e2e/auth-signout.spec.ts
scripts/conformance/signed-in-routes.test.ts
src/components/app-shell.tsx
src/components/ui/action-message.test.tsx
src/components/ui/action-message.tsx
src/components/ui/fading-notice.test.tsx
src/components/ui/fading-notice.tsx
src/routes/__root.tsx
src/routes/root-reads-once.test.ts
SCOPE-END

THE SYSTEM (G0) — three concerns, each on its one mechanism.
1. CONCERN: a navigation never asks the server for what the page already has — the root's facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load. MECHANISM: src/routes/__root.tsx, the root route — its `loader` (getSsrLangContext) gains `shouldReload: false` (DEC-272). Why: @tanstack/router-core 1.171.34 reloads a match that stays (the root) only when it is invalid, when `shouldReload` says so, or when the navigation's href is the current one (node_modules/@tanstack/router-core/dist/esm/load-client.js :330–:331 and :992, :1009: `forceStaleReload = sameHref`). hardReset's `navigate({ to: "/" })` from "/" is that case: online a round trip for nothing, offline a failed read whose error replaced the app (INC-927). CONSUMERS: every same-href navigation — the sign-out's move to "/" from "/" (src/components/app-shell.tsx, hardReset), a link to the page already shown (the logo, a breadcrumb, a category on its own page); a navigation elsewhere never re-read the root. COVERED HERE: all of them, by the one option. The only re-read left is `router.invalidate()` (the root error view's Try again, src/routes/__root.tsx). GUARD: RRO-1 (src/routes/root-reads-once.test.ts, BLOCK 1) — red on BASE (`expected undefined to be false`); SO-12 (unchanged) is the behaviour's proof.
2. CONCERN: the shell's live guard takes its pages from the door-step's one list (INC-925's class, second occurrence). MECHANISM: src/lib/signed-in-pages.ts (`sendsToSignIn`) — register row 29. CONSUMERS: app-shell.tsx `ownSignIn` (on it since turn 34w) and `gatedRoute` (its own four: /admin, /settings, /account, /my-listings — so /post, /legal/accept and /legal/publishing stood open, signed out, after a sign-out in another tab or a token expiry: INC-926) → `pathname.startsWith("/admin") || sendsToSignIn(pathname)` (/admin keeps its own line: it has no door-step). GUARD: CF-SIR-4 also reads `gatedRoute` — red on BASE.
3. CONCERN: an always-drawn live region carries `aria-live` and no role (S446's class, second occurrence: an empty role="status" on a page answers that page's own getByRole("status") too). MECHANISM: the pattern ODN-2 set in turn 34w (src/components/shell/on-demand-notice.tsx). CONSUMERS (grep of `role="status"` in src/ at BASE — 93 code sites; the supervisor's script read the lines before each, and each is drawn only with its words — a branch of a condition, a `loadingState`, or ActionMessage without `persistent` — but these): src/components/ui/fading-notice.tsx :35 (the wizard's Edit notice, wizard.tsx :1117; the ad's page notice, my-listing-page.tsx :540) → no role, `aria-live="polite"` kept; src/components/ui/action-message.tsx :53 with `persistent` (the screening queue's notice, src/features/admin-screening/screening-page.tsx :451) → no role while empty, the role with its words, `aria-live` from the start (polite, or assertive for a refusal) — INC-929. Your K2 census confirms the 93 by reading, and lists `role="alert"`'s always-drawn sites too. GUARD: FN-1 (src/components/ui/fading-notice.test.tsx) and AMSG-2 (src/components/ui/action-message.test.tsx) — red on BASE; no static census of always-drawn roles yet (the register's guard debt names it).
And one test that did not establish its precondition: SO-11 (e2e/auth-signout.spec.ts) made the session stale before the signed-in Settings was drawn — when the page's first session read came after that, it read the visitor as signed out (that reading is INC-914's, turn 34c) and the sign-out controls never came (your runs, both widths; CI passed it). It now waits for the sign-out control first (INC-928). Not weakened: the same steps, the same expectations, one precondition more.
EXCEPTIONS: /admin in gatedRoute (no door-step of its own; unchanged).
FIVE LENSES — security: the live guard now evacuates every door-step page after a sign-out — the signed-in wizard and the legal pages no longer stand open, signed out (INC-926) · performance: one server round trip fewer on a same-href navigation; nothing else changes · failure modes: offline, the sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271), from "/"; from another page the move to "/" needs the marketplace's code — when the tab never downloaded it, the app's own "didn't load" view shows until the connection returns and the fresh load comes (a known limit, recorded with turn 34c) · consistency: one page list, one rule for always-drawn live regions (the shell's notice, the fading notice, the kept empty message), one reading of the root's facts · future growth: a new door-step page is guarded and evacuated by its one SIGNED_IN_PAGES line; a new root fact rides the one loader.
FORWARD-SCAN: turn 34c (INC-914) reads a failed session read as unknown, not signed out — SO-11's precondition stays valid either way. REGISTER: row 29 (gatedRoute), row 53 added (the root's facts), the guard-debt line for live regions (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34w-2.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. SO-11 keeps its one leased account; nothing else in e2e/ changes.
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34w-2.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW or FILE block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34w-2.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34w-2.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows RRO-1, CF-SIR-4, FN-1 and AMSG-2 failing on BASE's code before Part C's edits. SO-12's red is CI's on a8c025ef (above) and your own turn 34w runs; SO-11's change is a precondition (no red of its own on CI).
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407). Before a run, nothing of a previous run may still hold port 4173 — stop it first.
- Behaviour contract: online, every page behaves as today — a navigation elsewhere already never re-read the root; a navigation to the page already shown no longer asks the server for the root's facts. Changed: offline, the sign-out from "/" keeps the site on screen, signed out, and loads it afresh when the connection returns (SO-12); after a sign-out in another tab or a token expiry, /post, /legal/accept and /legal/publishing go to "/" as /settings, /account and /my-listings do; the fading notice and the screening queue's notice are heard as before and add no role while empty. Nothing else changes.
- Knowledge K: K1 the three mechanisms above; K2 the report lists (file:line) every other hand-kept list of signed-in pages, every other loader a same-href navigation re-runs that reads the network (route loaders other than the root's), and every other always-drawn element with a role — in scope or not; K3 the guards land with their fixes; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened — FN-1 expects no role where it expected role="status" (the rule changed, ODN-2's), AMSG-2 asserts the empty region's missing role and then its role with words, CF-SIR-4 reads one line more, SO-11 waits for one precondition more; RRO-1 is new; every other test unchanged.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE, turn 34b-3's landing — still running, or red with e2e/auth-signout.spec.ts SO-12 and nothing else (turn 34w's failure, fixed in this turn's Part C; SO-11 passed on CI at a8c025ef)). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The root's test — BLOCK 1 (src/routes/root-reads-once.test.ts); the census reads the guard's second list; the fading notice and the kept empty message expect no role:
EDIT scripts/conformance/signed-in-routes.test.ts #1
OLD-BEGIN
    // The shell's live guard reads the list itself — never a copy of its own.
    expect(codeOf(readFileSync(join(ROOT, "src/components/app-shell.tsx"), "utf8"))).toMatch(
      /const ownSignIn = sendsToSignIn\(pathname\);/,
OLD-END
NEW-BEGIN
    // The shell's live guard reads the list itself — never a copy of its own: for the pages it
    // sends to sign in and (INC-926) for the pages it evacuates after a sign-out.
    const shell = codeOf(readFileSync(join(ROOT, "src/components/app-shell.tsx"), "utf8"));
    expect(shell).toMatch(/const ownSignIn = sendsToSignIn\(pathname\);/);
    expect(shell).toMatch(
      /const gatedRoute = pathname\.startsWith\("\/admin"\) \|\| sendsToSignIn\(pathname\);/,
NEW-END
EDIT src/components/ui/fading-notice.test.tsx #1
OLD-BEGIN
    expect(notice).toHaveAttribute("role", "status");
OLD-END
NEW-BEGIN
    // S446 — drawn always, so no role: the polite live region alone is heard.
    expect(notice).not.toHaveAttribute("role");
    expect(notice).toHaveAttribute("aria-live", "polite");
NEW-END
EDIT src/components/ui/action-message.test.tsx #1
OLD-BEGIN
    expect(screen.getByTestId("region")).toBeEmptyDOMElement();
    expect(scroll).not.toHaveBeenCalled();
  });
OLD-END
NEW-BEGIN
    expect(screen.getByTestId("region")).toBeEmptyDOMElement();
    // INC-929 — the empty region is live but carries no role until its words come.
    expect(screen.getByTestId("region")).not.toHaveAttribute("role");
    expect(screen.getByTestId("region")).toHaveAttribute("aria-live", "polite");
    expect(scroll).not.toHaveBeenCalled();
    rerender(<ActionMessage text="Saved." tone="done" persistent testid="region" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saved.");
  });
NEW-END
B2. Run `bunx vitest run src/routes/root-reads-once.test.ts scripts/conformance/signed-in-routes.test.ts src/components/ui/fading-notice.test.tsx src/components/ui/action-message.test.tsx` — the supervisor's run on BASE: `Tests  4 failed | 7 passed (11)`: RRO-1 (`expected undefined to be false`), CF-SIR-4 (`expected 'import { CARD_SURFACE } from "@/compo…' to match /…/admin"\) \|\| sendsToSignIn\(pathname\);/`), FN-1 and AMSG-2 (`Expected the element not to have attribute: role`) — paste the failure lines and the totals.

PART C — THE FIXES.
C1. The root reads its facts once (DEC-272, INC-927):
EDIT src/routes/__root.tsx #1
OLD-BEGIN
  },
  head: ({ loaderData }) => ({
OLD-END
NEW-BEGIN
  },
  // DEC-272 (Foundations turn 34w-2, INC-927) — the root's facts (the published languages, the
  // language star, the saved area, the edge's guess) are read once per page load. The router read
  // them again from the server on a navigation to the page already shown (it reloads every
  // loader of a same-href navigation): a round trip for nothing online, and offline a failed read
  // whose error view replaced the whole app — the offline sign-out's move to "/" from "/" (SO-12).
  // A navigation elsewhere never re-read them; only router.invalidate() (the error view's "Try
  // again") reads them again.
  shouldReload: false,
  head: ({ loaderData }) => ({
NEW-END
C2. The live guard's pages are the door-step's (INC-926):
EDIT src/components/app-shell.tsx #1
OLD-BEGIN
   * gated UI survives a sign-out on any screen size.
OLD-END
NEW-BEGIN
   * gated UI survives a sign-out on any screen size. INC-926 (Foundations turn
   * 34w-2) — the gated pages are /admin and every page the door-step guards
   * (SIGNED_IN_PAGES): this guard kept its own four, and /post, /legal/accept and
   * /legal/publishing stood open, signed out, after a sign-out in another tab.
NEW-END
EDIT src/components/app-shell.tsx #2
OLD-BEGIN
  const gatedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/my-listings");
OLD-END
NEW-BEGIN
  const gatedRoute = pathname.startsWith("/admin") || sendsToSignIn(pathname);
NEW-END
C3. The fading notice and the kept empty message carry no role (INC-929):
EDIT src/components/ui/fading-notice.tsx #1
OLD-BEGIN
 * second save says the same thing. A screen reader hears it through the live
 * region; nothing else moves.
 */
OLD-END
NEW-BEGIN
 * second save says the same thing. A screen reader hears it through the live
 * region; nothing else moves. It is drawn always, empty until told, so it carries
 * no role (S446, ODN-2): an empty role="status" answered a page's own
 * getByRole("status") too — the polite live region alone is what is heard.
 */
NEW-END
EDIT src/components/ui/fading-notice.tsx #2
OLD-BEGIN
    <p
      role="status"
      aria-live="polite"
OLD-END
NEW-BEGIN
    <p
      aria-live="polite"
NEW-END
EDIT src/components/ui/action-message.tsx #1
OLD-BEGIN
 * announced.
OLD-END
NEW-BEGIN
 * announced — that empty region is a live region with no role (INC-929, S446's
 * class): an empty role answered a page's own getByRole too; the role comes with
 * the words.
NEW-END
EDIT src/components/ui/action-message.tsx #2
OLD-BEGIN
      role={liveRole}
      aria-live={liveRole === "status" ? "polite" : undefined}
OLD-END
NEW-BEGIN
      role={shown ? liveRole : undefined}
      aria-live={liveRole === "status" ? "polite" : persistent ? "assertive" : undefined}
NEW-END
C4. SO-11 waits for the signed-in page (INC-928):
EDIT e2e/auth-signout.spec.ts #1
OLD-BEGIN
    await gotoReady(page, "/settings");
    // The access token has run out and the auth server cannot be reached.
OLD-END
NEW-BEGIN
    await gotoReady(page, "/settings");
    // INC-928 — the signed-in page is drawn before its session goes stale: made stale while the
    // page's first session read was still pending, the visitor read as signed out before the click
    // (turn 34w's local runs; that reading is INC-914's, turn 34c).
    await expect(
      isMobile(page)
        ? page.getByTestId("account-menu")
        : page.getByTestId("app-rail").getByTestId("rail-sign-out"),
    ).toBeVisible();
    // The access token has run out and the auth server cannot be reached.
NEW-END
C5. Read /tmp/observability/build-errors.log; `bunx vitest run src/routes scripts/conformance src/components src/lib` — every test passes (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34b-3: every remaining piece fetched on demand answers a failed download through the mechanism, and the guard reads each call — INC-911, INC-918, INC-919, INC-909)` becomes `docs/governance/briefs/foundations-turn-34w-2.md (Foundations turn 34w-2: turn 34w's NOT READY landing — the root reads its facts once, so the offline sign-out keeps the site on screen, DEC-272; SO-11's precondition; the live guard's pages, INC-926; the fading notice's role)` (everything after it stays, as it is).
D2. These edits (the register's rows 29 and 53 and its guard debt; the changelog; turn 34b-3 ticked with its closing run; turn 34w ticked as NOT READY, closed by this turn, whose own line follows it):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 28 | A guard is one census over the whole tree with one allowlist grammar and a named caller | `scripts/conformance/kit.ts` | kit-adoption.test.ts, wired.test.ts |  kit-adoption-allowlist.txt (5 walkers until INC-858; 6 enumerators until DEC-244)  | growth: a new guard is one file |  DEC-244; INC-856 ✓ (the four walkers moved, Foundations turn 2); INC-857 ✓ (the six walkers moved, Foundations turn 22) 
| 29 | A signed-in screen's door-step | `src/lib/signed-in-route.ts` requireSignedIn + `src/lib/signed-in-pages.ts` (`SIGNED_IN_PAGES`, `sendsToSignIn` — the pages it guards, which the shell's live guard reads so a signed-out visitor stays on sign in) | signed-in-routes.test.ts (CF-SIR-1…3: no route reads the session itself; ssr: false implies requireSignedIn; no screen but the sign-in screens sends to sign in from its own code — INC-923; CF-SIR-4/5: SIGNED_IN_PAGES is every route that calls requireSignedIn and nothing else, and the shell reads it — INC-925); SIP-1; `e2e/settings.spec.ts` S-1 over every page | none | a new screen is one import and one line in SIGNED_IN_PAGES (the census asks for it) | INC-852; /settings onto it in Foundations turn 34b-1 (INC-923); the shell's own list retired in turn 34w (INC-925) |
| 30 | A legal kind's audience | `public.legal_kind_signed_in_only(text)` (M24) + legal-kinds.ts signedInOnlyKind | the mirror test, LGC-6, the M24 proof | none | a kind is one predicate line, then a kinds table | D236 |
OLD-END
NEW-BEGIN
| 28 | A guard is one census over the whole tree with one allowlist grammar and a named caller | `scripts/conformance/kit.ts` | kit-adoption.test.ts, wired.test.ts |  kit-adoption-allowlist.txt (5 walkers until INC-858; 6 enumerators until DEC-244)  | growth: a new guard is one file |  DEC-244; INC-856 ✓ (the four walkers moved, Foundations turn 2); INC-857 ✓ (the six walkers moved, Foundations turn 22) 
| 29 | A signed-in screen's door-step | `src/lib/signed-in-route.ts` requireSignedIn + `src/lib/signed-in-pages.ts` (`SIGNED_IN_PAGES`, `sendsToSignIn` — the pages it guards, which the shell's live guard reads so a signed-out visitor stays on sign in, and, with /admin, as the pages it evacuates once a session this tab held has gone — INC-926) | signed-in-routes.test.ts (CF-SIR-1…3: no route reads the session itself; ssr: false implies requireSignedIn; no screen but the sign-in screens sends to sign in from its own code — INC-923; CF-SIR-4/5: SIGNED_IN_PAGES is every route that calls requireSignedIn and nothing else, and the shell reads it for both — INC-925, INC-926); SIP-1; `e2e/settings.spec.ts` S-1 over every page | none | a new screen is one import and one line in SIGNED_IN_PAGES (the census asks for it) | INC-852; /settings onto it in Foundations turn 34b-1 (INC-923); the shell's own lists retired in turns 34w (INC-925) and 34w-2 (INC-926) |
| 30 | A legal kind's audience | `public.legal_kind_signed_in_only(text)` (M24) + legal-kinds.ts signedInOnlyKind | the mirror test, LGC-6, the M24 proof | none | a kind is one predicate line, then a kinds table | D236 |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |

OLD-END
NEW-BEGIN
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); Foundations turn 34b-2 |
| 53 | The root's server facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load: a navigation never asks the server for them again — offline that read fails and its error view replaces the whole app (DEC-272, INC-927) | `src/routes/__root.tsx` — the root route's `loader` (getSsrLangContext) with `shouldReload: false`; router-core reloads a staying match only when it is invalid, told to, or the navigation is to the same href | RRO-1 (`src/routes/root-reads-once.test.ts`); `e2e/auth-signout.spec.ts` SO-12 (the offline sign-out's move to "/" from "/") | none | a new root fact rides the one loader | only `router.invalidate()` (the root error view's Try again) reads them again; Foundations turn 34w-2 |

NEW-END
EDIT docs/governance/mechanisms.md #3
OLD-BEGIN
- Allowlists: rows 2 and 8 and the RLS/definer allowlists carry no `until` (G55 format) — migrated by the door manifest and the conformance kit.
- Weight: `scripts/check-marketplace-imports.mjs` has no self-test (a planted heavy import is proven by hand; it skipped side-effect imports until Foundations turn 31) — owes a SELF_TEST mode with a bad and a good fixture (row 40).
OLD-END
NEW-BEGIN
- Allowlists: rows 2 and 8 and the RLS/definer allowlists carry no `until` (G55 format) — migrated by the door manifest and the conformance kit.
- Live regions: an always-drawn live region carries `aria-live` and no role (S446, INC-929) — ODN-2, FN-1 and AMSG-2 pin the three known (the shell's on-demand notice, FadingNotice, ActionMessage `persistent`); no census of an always-drawn `role="status"` yet.
- Weight: `scripts/check-marketplace-imports.mjs` has no self-test (a planted heavy import is proven by hand; it skipped side-effect imports until Foundations turn 31) — owes a SELF_TEST mode with a bad and a good fixture (row 40).
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34b-3 (2026-10-26) — INC-911 finished: every remaining piece fetched on demand answers a failed download through the mechanism — the maps, the pin map (LoadFailedHere: no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar and a page's strings (LoadFailedHere), the phone box (Refresh on the shared Button, its own words kept), Settings and the account read report to the shell's notice; the allowlist is down to its four lines for good. INC-918: every "Try again" for a download became Refresh and every comment that promised a retry was corrected. INC-919: a failed download of a language's strings is reported and no longer an unhandled rejection. INC-909: the footer's font wait logs its failure. One string retired (post.who.phoneLibRetry). The census judges each call (34b-2's reviewer): a loader imported under another name or through a namespace is a call, and each call handles its own failure — a mention of an answer elsewhere in the file no longer covers it (ODC-4). PMD-1, PLF-1, DF-6, SLG-3, ODC-4.
OLD-END
NEW-BEGIN
- Foundations turn 34b-3 (2026-10-26) — INC-911 finished: every remaining piece fetched on demand answers a failed download through the mechanism — the maps, the pin map (LoadFailedHere: no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar and a page's strings (LoadFailedHere), the phone box (Refresh on the shared Button, its own words kept), Settings and the account read report to the shell's notice; the allowlist is down to its four lines for good. INC-918: every "Try again" for a download became Refresh and every comment that promised a retry was corrected. INC-919: a failed download of a language's strings is reported and no longer an unhandled rejection. INC-909: the footer's font wait logs its failure. One string retired (post.who.phoneLibRetry). The census judges each call (34b-2's reviewer): a loader imported under another name or through a namespace is a call, and each call handles its own failure — a mention of an answer elsewhere in the file no longer covers it (ODC-4). PMD-1, PLF-1, DF-6, SLG-3, ODC-4.

- Foundations turn 34w-2 (2026-10-26; turn 34w's NOT READY landing, a8c025ef) — DEC-272 / INC-927: the root's facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load (`shouldReload: false` on the root route): the router read them again from the server on a navigation to the page already shown, and offline that failed read's error view replaced the whole app — the offline sign-out's move to "/" from "/" (SO-12; DEC-271 now holds). INC-928: SO-11 waits for the signed-in page before it makes the session stale. INC-926: the shell's live guard evacuates every page the door-step guards (SIGNED_IN_PAGES) with /admin — /post, /legal/accept and /legal/publishing stood open after a sign-out in another tab. INC-929: the fading notice, drawn always, and an action message kept empty in the page carry no role until their words come (S446's class). RRO-1, CF-SIR-4, FN-1, AMSG-2, SO-11, SO-12.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34w (docs/governance/briefs/foundations-turn-34w.md; no migration; Lovable) — the operator's walk of 26 Oct and CI's red on bc963938: the notice's live region carries no role (ODN-2); INC-925 — a signed-out visitor to /settings stayed on sign in only a moment, because the shell's live guard kept its own list of the pages that send to sign in: the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts; CF-SIR-4/5, SIP-1) and S-1 proves every such page keeps the visitor there; DEC-271 — an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns, and a download that fails offline is no stale chunk (STC-2, SO-12); D238 — the phone menu has no ×; INC-924 — the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened (PK-2, PK-3).
  - [ ] Turn 34b-3 — every remaining on-demand consumer onto the mechanism, the allowlist down to its four permanent lines: the maps (map-preview.tsx :108, map-large.tsx :73), the pin map (LoadFailedHere — no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar, the strings gate, the phone box (Refresh), settings, the account read and the strings provider (INC-919: a failed language download is no longer an unhandled rejection); every "Try again" for a download becomes Refresh and every comment that promises a retry is corrected (INC-918); the footer's silent catch (use-footer-inset.ts :100, INC-909). And the census itself (34b-2's reviewer, MAJORs 1–2): a loader imported under another name or called through a namespace is still a call, and a file is on the mechanism only where each call's own failure is answered, never because the file mentions an answer somewhere.
OLD-END
NEW-BEGIN
  - [x] Turn 34w (docs/governance/briefs/foundations-turn-34w.md; no migration; Lovable) — the operator's walk of 26 Oct and CI's red on bc963938: the notice's live region carries no role (ODN-2); INC-925 — a signed-out visitor to /settings stayed on sign in only a moment, because the shell's live guard kept its own list of the pages that send to sign in: the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts; CF-SIR-4/5, SIP-1) and S-1 proves every such page keeps the visitor there; DEC-271 — an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns, and a download that fails offline is no stale chunk (STC-2, SO-12); D238 — the phone menu has no ×; INC-924 — the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened (PK-2, PK-3). Final HEAD a8c025ef; CI run 40358294719: FAILURE — SO-12 at both widths (the offline sign-out's move to "/" from "/" re-read the root's facts from the server, and offline that failed read's error view replaced the app); its own sandbox also lost SO-11's race (INC-928). Closed by turn 34w-2.
  - [ ] Turn 34w-2 (docs/governance/briefs/foundations-turn-34w-2.md; no migration; Lovable) — turn 34w's NOT READY landing: DEC-272 / INC-927 — the root's facts are read once per page load (`shouldReload: false`; RRO-1), so the offline sign-out keeps the site on screen (SO-12, DEC-271); INC-928 — SO-11 waits for the signed-in page before the session goes stale; INC-926 — the live guard evacuates every page the door-step guards, with /admin (CF-SIR-4); INC-929 — the fading notice and the kept empty message carry no role (FN-1, AMSG-2).
  - [x] Turn 34b-3 (docs/governance/briefs/foundations-turn-34b-3.md; no migration; one string retired; Lovable) — every remaining on-demand consumer onto the mechanism, the allowlist down to its four permanent lines: the maps (map-preview.tsx :108, map-large.tsx :73), the pin map (LoadFailedHere — no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar, the strings gate, the phone box (Refresh), settings, the account read and the strings provider (INC-919: a failed language download is no longer an unhandled rejection); every "Try again" for a download becomes Refresh and every comment that promises a retry is corrected (INC-918); the footer's silent catch (use-footer-inset.ts :100, INC-909). And the census itself (34b-2's reviewer, MAJORs 1–2): a loader imported under another name or called through a namespace is still a call, and a file is on the mechanism only where each call's own failure is answered, never because the file mentions an answer somewhere. Final HEAD f09ec2a9; CI run 40374691120: running when turn 34w-2 was briefed (its Part A reads it; SO-12 the expected red). Its reviewer: NOT READY — the census misses an empty `catch {}`, a `() => { return undefined; }` handler, and takes `.then(ok, undefined)` for a handler; those three go to the next turn with their planted cases.
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15; /settings's door-step since turn 34b-1, INC-923) as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918).
OLD-END
NEW-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15; /settings's door-step since turn 34b-1, INC-923) as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34w-2.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 318 files, 1966 tests, every one passed); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
147da55fdedd5269c1277bb1bdec6d7505ead0484c33490ba3f82d98373bffae  docs/_changelog.md
ed25d83ecec83414fd8a93fae5bbca8a31b60e0668d842c02773676221d95de1  docs/governance/mechanisms.md
970d38f84793c7a570d86b2b35b754bff6a03d00e106eabb23d457554ef76c1b  e2e/auth-signout.spec.ts
3d9778f267a4a9cbc5adeb4c8c0fa7eb1cce427541de1996600a18fba55e1997  scripts/conformance/signed-in-routes.test.ts
c63c89f9cd9561861c92d34685869ea0d9c196e459d5f03b98ea13ee6dc877bf  src/components/app-shell.tsx
56b9c70fdd71fc534364fc915d16e9431d5a766e4d7fd2dcc351ba5f6b2d7951  src/components/ui/action-message.test.tsx
48b9630fa363b1e3cb0bbb01fc86b40d373f6ae41d53df4e49300af13db80ce3  src/components/ui/action-message.tsx
14e26a0e506342b73fefb03752c3d0a88d67df73f979eb46f4075a9be8a242e5  src/components/ui/fading-notice.test.tsx
dcd4be3813139a1b9c121a027701541fd908ed6be6a2444b9f94f212e8087703  src/components/ui/fading-notice.tsx
ce1871141c88e836fce14c4516b4b1b0063a93077f313484c7ee65aff716d38d  src/routes/__root.tsx
d80ce6801622ee00665d7ca8ffc49c5e5542f4ce4da1567f4fe4b08c5e8bf7fc  src/routes/root-reads-once.test.ts

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>`; both projects, 0 retries, fake mode; CI runs every test): e2e/auth-signout.spec.ts whole (SO-11 and SO-12 among them); e2e/settings.spec.ts whole; e2e/shell.spec.ts whole; e2e/account-saved.spec.ts whole; e2e/my-listings-page.spec.ts whole; e2e/legal-certify.spec.ts whole; e2e/admin-listings.spec.ts whole (the wizard's Edit notice); e2e/admin-screening.spec.ts whole (the screening queue's notice); e2e/my-listings-ad.spec.ts whole; paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34w-2.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract before → after (the offline sign-out from "/", a same-href navigation online, a sign-out in another tab on /post and the legal pages, the fading notice); the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); "none" for migrations and strings; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): DEC-272 — the root's facts are read once per page load (`shouldReload: false`; only the error view's Try again reads them again); the live guard evacuates every door-step page with /admin; the fading notice and the kept empty message drop their role, as the shell's notice did; SO-11 gains its precondition rather than a retry or a longer timeout; the offline sign-out from a page whose marketplace code never downloaded is a known limit, recorded with turn 34c.

BLOCK 1 — FILE-BEGIN src/routes/root-reads-once.test.ts
import { describe, expect, it } from "vitest";

import { Route } from "./__root";

/**
 * DEC-272 (Foundations turn 34w-2, INC-927) — the root's server facts are read once per page
 * load: a navigation to the page already shown does not read them again (offline, that read
 * failed and the root's error view replaced the app — the offline sign-out, SO-12).
 */
describe("the root reads its facts once (DEC-272)", () => {
  it("RRO-1 the root route never reloads on a navigation; only an invalidation reads it again", () => {
    expect(Route.options.shouldReload).toBe(false);
  });
});
FILE-END src/routes/root-reads-once.test.ts
```

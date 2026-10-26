# Foundations — turn 34w: the walk of 26 Oct and CI's red on turn 34b-2's landing — the notice's live region without a role, a signed-out visitor who stays on sign in (INC-925), the offline sign-out (DEC-271), the phone menu without its × (D238) and the peek's clock (INC-924): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34w (2026-10-26; DEC-237; the operator's walk of the 34b-1 build at 11:07 Atlanta; CI's red on bc963938, run 40345497360; anchors located at bc963938f649d134784d317c78b15ec367f132d9). Five fixes, one turn: (1) the red — the on-demand notice's always-drawn live region carried role="status", so auth-reset's R-2 and R-4 met two statuses; (2) INC-925 — walk line 4: a signed-out visitor who opens /settings reaches Sign in and is sent on to Home a moment later, because the shell's live guard keeps its own list of the pages that send to sign in and /settings is not on it; (3) DEC-271 — the operator's "YES": an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns; (4) D238 — the operator: the phone menu needs no ×; (5) INC-924 — the peek's three seconds start before its menu is drawn, and it takes over a menu the person opened. Tier A (the sign-out; the signed-in door-step). No migration. No new string. No package change. AGENTS.md: one line changed (G3). One new module, src/lib/signed-in-pages.ts (its AGENTS.md rule is that line). No file deleted. Base: dev bc963938f649d134784d317c78b15ec367f132d9. The supervisor sends this brief directly. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the red of turn 34b-2; D — the door-step's pages (INC-925); E — the offline sign-out (DEC-271); F — the phone menu (D238, INC-924); G — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: bc963938f649d134784d317c78b15ec367f132d9
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
AGENTS.md
e2e/auth-signout.spec.ts
e2e/settings.spec.ts
e2e/shell.spec.ts
scripts/conformance/signed-in-routes.test.ts
scripts/e2e-select.ts
src/components/app-shell.tsx
src/components/shell/app-rail.tsx
src/components/shell/on-demand-notice.test.tsx
src/components/shell/on-demand-notice.tsx
src/lib/signed-in-pages.test.ts
src/lib/signed-in-pages.ts
src/lib/stale-chunk.test.ts
src/lib/stale-chunk.ts
SCOPE-END

THE SYSTEM (G0) — five concerns, each on one mechanism.
1. CONCERN: an element the shell draws on every page adds no role that a page's own query can meet. MECHANISM: OnDemandNotice (src/components/shell/on-demand-notice.tsx, register row 52) — a live region must exist before its words arrive, so it is drawn from the first paint; it needs aria-live, not a role. CONSUMERS (census at BASE of browser tests that query a role page-wide): e2e/auth-reset.spec.ts :47 and :144 `page.getByRole("status")` — red (R-2, R-4); e2e/settings.spec.ts :127 scoped to its form; e2e/legal-admin.spec.ts :989 filtered by its words; every other role="status" under src/ is drawn only with its own words. GUARD: ODN-2 (a page's own status stays the only one, quiet or shown).
2. CONCERN: a signed-out visitor who opens a signed-in page is sent to sign in and kept there, by the page's door-step alone. MECHANISM: requireSignedIn (src/lib/signed-in-route.ts :13, register row 29) — its list of pages: NONE YET, built in Part D as src/lib/signed-in-pages.ts (`SIGNED_IN_PAGES`, `sendsToSignIn`). CONSUMERS (grep of BASE): the twelve routes that call requireSignedIn — account.tsx, account_.legal.tsx, account_.legal_.$versionId.tsx, account_.saved.tsx, legal.accept.tsx, legal.publishing.tsx, my-listings.tsx, my-listings_.$listingId.tsx, my-listings_.$listingId_.edit.tsx, post.tsx, post_.$listingId.tsx, settings.tsx — use; src/components/app-shell.tsx :762 `ownSignIn` — bypasses: a list of its own (/account, /my-listings), which never gained /settings when turn 34b-1 gave /settings the door-step (INC-923), so the live guard sends the visitor to "/" right after the door-step sent them to /auth (reproduced by the supervisor on a local build: /settings → /auth?return=%2Fsettings → "/"; /account and /my-listings stay). COVERED HERE: all. GUARD: CF-SIR-4 (SIGNED_IN_PAGES is every route that calls requireSignedIn and nothing else, and the shell reads it), CF-SIR-5 (planted), SIP-1; in the browser S-1 over every page of the list — it used to wait only for /auth, which passed on the passing frame. Siblings of other concerns, not this one (K2): the shell's `gatedRoute` (:739, the pages it evacuates after a sign-out) and `routePanel` (:513, the panel a page belongs to).
3. CONCERN: the app never loads a page afresh by itself while the device is offline — the browser would replace the app with its own "cannot open" page. CONSUMERS (grep of BASE for location.reload / location.replace): src/components/app-shell.tsx :657 (the sign-out's fresh load, DEC-268) — onto DEC-271: offline, the hard reset's own in-app path (auth-derived reads purged, "/" in place, signingOut held so no frame of the old account), and one `online` listener loads "/" afresh; src/lib/stale-chunk.ts :64 (the reload for a stale chunk) — a download that fails offline is no stale chunk: no reload, and it counts as the page's first failure; the person's own reloads stay as they are (feed.tsx :190 Try again, on-demand-failure.ts :51 refreshPage, error-page.ts :71). GUARD: STC-2, SO-12.
4. CONCERN: the phone menu closes by ☰ (top-left, aria-expanded), a tap outside, or Escape (D238). CONSUMERS: src/components/shell/app-rail.tsx :982-:991 (the ×, a fixed button inside the sliding menu, which rode the slide-in and jumped to the top bar) — removed; its tests — e2e/shell.spec.ts RL-1 (:1173, :1203), RM-2 (:1377), "primary touch targets are at least 44px" (:1566), FV-1 (:3914) — close by ☰ or prove the × is gone.
5. CONCERN: the peek (D216) shows for three seconds once it is drawn, and never takes over a menu the person opened. CONSUMERS: src/components/shell/app-rail.tsx :829-:853 (the peek starts on a menu already open), :855-:876 (its clock starts at the opening, before the menu's code has arrived). GUARD: PK-2, PK-3; PK-1's recorder becomes the spec's shared watchPeek / readPeek.
EXCEPTIONS: none.
FIVE LENSES — security: the sign-out still ends the session on this device in every branch (auth-service's signOut removes the stored session before either path, DEC-268); offline, the shell stays signed out until the fresh load and its auth-derived reads are purged first; the page list can only stop the shell's own detour to "/" — the route's door-step still sends every signed-out visitor to sign in; no new surface · performance: one module of a few lines joins the shell's first download; nothing new is fetched · failure modes: an offline sign-out keeps the app and loads afresh on reconnect; a download failing offline is answered by the on-demand notice, never by a reload; a menu's code arriving late shows the peek late, for its full three seconds · consistency: one list of the door-step's pages, read by the routes' census and the shell; the notice's region carries no role, like every always-drawn live region should · future growth: a new signed-in page is one import and one list line, and the census asks for both.
FORWARD-SCAN: turn 34c (INC-914) reads currentSession().failed inside requireSignedIn — the page list is unchanged by it; turn 34b-3 tightens the on-demand census (34b-2's reviewer, MAJORs 1–2). REGISTER: row 29 gains the page list; row 52's mechanism unchanged.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34w.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part G only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–G; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. S-1 reads the door-step pages as a signed-out visitor (no rows); PK-3 and SO-12 lease one account each.
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34w.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. docs/generated/i18n-usage.json and public/i18n-usage.json are regenerated (`bun run i18n:usage`; the × took its common.close use with it), never edited. No NEW or FILE block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34w.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md, docs/features/panels.md, docs/generated/i18n-usage.json, public/i18n-usage.json and docs/governance/reports/foundations-turn-34w.report.md (your completion report). src/integrations/supabase/** (platform-generated) is never edited. Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After each part from C on, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows, on BASE's code, CF-SIR-4 (the shell does not read the list), STC-2 and ODN-2 failing, and in the browser S-1 /settings, SO-12, PK-2 and PK-3 failing, before Parts C–F. New behaviour without a red run: SIP-1, CF-SIR-5. RM-2 and the 44-px test change with D238.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1, CF-SL-1, CF-SL-3 and CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file> [--grep …]` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no cap of your own below that ceiling; no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407). Before a run, nothing of a previous run may still hold port 4173 — stop it first.
- Behaviour contract: unchanged — every page, menu and sign-out online; Sign in for a signed-out visitor to /account, /my-listings, /post, /legal/*; the evacuation to "/" of a signed-in page standing open after a sign-out. Changed: a signed-out visitor to /settings stays on Sign in (and comes back to Settings after signing in); an offline sign-out leaves the site on screen, signed out, and reloads it when the connection returns; a download that fails offline reloads nothing; the phone menu has no ×; the peek shows for its three seconds once drawn and leaves a menu the person opened alone; the notice's region has no role. Nothing else changes.
- Knowledge K: K1 the five mechanisms above; K2 the report lists (file:line) every other hand-kept list of signed-in pages, every other self-started reload, every other always-drawn element with a role, and every other fixed-position control inside a sliding panel — in scope or not; K3 the guards land with their fixes; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; the existing tests unchanged but for the closings by ☰ (D238) and PK-1's recorder moving into watchPeek / readPeek unchanged.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing test's first error line (expected: run 40345497360 on BASE — FAILURE, auth-reset.spec.ts R-2 and R-4 on mobile-360, `strict mode violation: getByRole('status') resolved to 2 elements` — the notice's region and the reset screen's own answer). That red is fixed in Part C, first; any other red is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The door-step's page list (the module the census reads) — BLOCK 1 (src/lib/signed-in-pages.ts) and BLOCK 2 (src/lib/signed-in-pages.test.ts); and these test edits:
EDIT scripts/conformance/signed-in-routes.test.ts #1
OLD-BEGIN
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
OLD-END
NEW-BEGIN
import { tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
NEW-END
EDIT scripts/conformance/signed-in-routes.test.ts #2
OLD-BEGIN
import { codeOf, readAllowlist, report, walkFiles } from "./kit";

OLD-END
NEW-BEGIN
import { codeOf, readAllowlist, report, walkFiles } from "./kit";
import { SIGNED_IN_PAGES } from "../../src/lib/signed-in-pages";

NEW-END
EDIT scripts/conformance/signed-in-routes.test.ts #3
OLD-BEGIN
 * (/settings landed on "/"). Only the sign-in screens themselves (a route path under /auth) may.
 */
OLD-END
NEW-BEGIN
 * (/settings landed on "/"). Only the sign-in screens themselves (a route path under /auth) may.
 * INC-925 (Foundations turn 34w) — the door-step's list of its pages (SIGNED_IN_PAGES, read by the
 * shell's live guard) is every route that calls requireSignedIn and nothing else: CF-SIR-4.
 */
NEW-END
EDIT scripts/conformance/signed-in-routes.test.ts #4
OLD-BEGIN

const tempRoots: string[] = [];
OLD-END
NEW-BEGIN

/** A route's address from its file route id: a non-nesting segment's trailing "_" is not in the URL. */
function addressOf(routeId: string): string {
  return routeId
    .split("/")
    .map((segment) => segment.replace(/_$/, ""))
    .join("/");
}

/** INC-925 — where the door-step's page list and the routes that call requireSignedIn disagree. */
export function pageListCensus(routesRoot: string, pages: readonly string[]): Finding[] {
  const covers = (address: string) =>
    pages.some((page) => address === page || address.startsWith(`${page}/`));
  const findings: Finding[] = [];
  const served = new Set<string>();
  for (const file of walkFiles([routesRoot], { ext: ["ts", "tsx"], skipTests: true })) {
    const code = codeOf(readFileSync(file, "utf8"));
    const id = /createFileRoute\("([^"]*)"\)/.exec(code)?.[1];
    if (id === undefined) continue;
    const address = addressOf(id);
    const rel = relative(ROOT, file).split(sep).join("/");
    const doorStep = code.search(/\brequireSignedIn\(/);
    for (const page of pages)
      if (address === page || address.startsWith(`${page}/`)) served.add(page);
    if (doorStep !== -1 && !covers(address))
      findings.push({
        file: rel,
        line: lineOf(code, doorStep),
        what: `${address} calls requireSignedIn but SIGNED_IN_PAGES does not list it`,
      });
    if (doorStep === -1 && covers(address))
      findings.push({
        file: rel,
        line: 1,
        what: `${address} is under SIGNED_IN_PAGES but its route does not call requireSignedIn`,
      });
  }
  for (const page of pages)
    if (!served.has(page))
      findings.push({
        file: "src/lib/signed-in-pages.ts",
        line: 1,
        what: `SIGNED_IN_PAGES lists ${page}, which no route serves`,
      });
  return findings;
}

const tempRoots: string[] = [];
NEW-END
EDIT scripts/conformance/signed-in-routes.test.ts #5
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("CF-SIR-4 SIGNED_IN_PAGES is every route that calls requireSignedIn, and nothing else (INC-925)", () => {
    const findings = pageListCensus(join(ROOT, "src", "routes"), SIGNED_IN_PAGES);
    console.log(`[signed-in-routes] door-step pages: ${SIGNED_IN_PAGES.length}`);
    expect(report(findings)).toBe("");
    // The shell's live guard reads the list itself — never a copy of its own.
    expect(codeOf(readFileSync(join(ROOT, "src/components/app-shell.tsx"), "utf8"))).toMatch(
      /const ownSignIn = sendsToSignIn\(pathname\);/,
    );
  });

  it("CF-SIR-5 a planted unlisted door-step, a listed page without it and a list entry no route serves are reported", () => {
    const temp = mkdtempSync(join(tmpdir(), "signed-in-routes-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "unlisted.tsx"),
      'createFileRoute("/vault_/$id")({\n  beforeLoad: () => requireSignedIn("/vault"),\n});\n',
    );
    writeFileSync(join(temp, "listed.tsx"), 'createFileRoute("/settings")({});\n');
    writeFileSync(
      join(temp, "kept.tsx"),
      'createFileRoute("/account_/saved")({\n  beforeLoad: () => requireSignedIn("/account/saved"),\n});\n',
    );
    const at = (name: string) => relative(ROOT, join(temp, name)).split(sep).join("/");
    expect(pageListCensus(temp, ["/account", "/settings", "/ghost"])).toEqual([
      {
        file: at("listed.tsx"),
        line: 1,
        what: "/settings is under SIGNED_IN_PAGES but its route does not call requireSignedIn",
      },
      {
        file: at("unlisted.tsx"),
        line: 2,
        what: "/vault/$id calls requireSignedIn but SIGNED_IN_PAGES does not list it",
      },
      {
        file: "src/lib/signed-in-pages.ts",
        line: 1,
        what: "SIGNED_IN_PAGES lists /ghost, which no route serves",
      },
    ]);
  });
});
NEW-END
EDIT src/lib/stale-chunk.test.ts #1
OLD-BEGIN

  it("still reloads once per page when storage is refused", () => {
OLD-END
NEW-BEGIN

  it("STC-2 a download that fails offline is no stale chunk: no reload, then or later (DEC-271)", () => {
    const net = { onLine: false };
    const { win, fire, reloads } = fakeWindow();
    reloadOnStaleChunk({ ...win, navigator: net }, () => 1_000);
    expect(fire().defaultPrevented).toBe(false);
    net.onLine = true;
    expect(fire().defaultPrevented).toBe(false);
    expect(reloads()).toBe(0);
  });

  it("still reloads once per page when storage is refused", () => {
NEW-END
EDIT src/components/shell/on-demand-notice.test.tsx #1
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("ODN-2 the notice adds no role to the page, quiet or shown: a page's own status stays the only one", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <>
        <p role="status">the page's own answer</p>
        <OnDemandNotice />
      </>,
    );
    expect(screen.getAllByRole("status")).toHaveLength(1);
    act(() => {
      reportOnDemandFailure("a menu's code", new Error("offline"));
    });
    expect(screen.getByTestId("on-demand-failed")).toBeTruthy();
    expect(screen.getAllByRole("status")).toHaveLength(1);
    errors.mockRestore();
  });
});
NEW-END
B2. Run `bunx vitest run scripts/conformance/signed-in-routes.test.ts src/lib/signed-in-pages.test.ts src/lib/stale-chunk.test.ts src/components/shell/on-demand-notice.test.tsx` — the supervisor's run on BASE: `Test Files  3 failed | 1 passed (4)`, `Tests  3 failed | 12 passed (15)` — CF-SIR-4 (`expected 'import { CARD_SURFACE } from "@/compo…' to match /const ownSignIn = sendsToSignIn\(path…/`), STC-2 (`expected true to be false`), ODN-2 (`expected [ <p role="status"></p>, …(1) ] to have a length of 1 but got 2`); paste the failure lines and the totals.
B3. The browser tests — these edits:
EDIT e2e/settings.spec.ts #1
OLD-BEGIN
import { en } from "../src/i18n/locales/en";
import {
  attemptSignIn,
  expectSignedIn,
OLD-END
NEW-BEGIN
import { en } from "../src/i18n/locales/en";
import { SIGNED_IN_PAGES } from "../src/lib/signed-in-pages";
import {
  attemptSignIn,
  authFields,
  expectSignedIn,
NEW-END
EDIT e2e/settings.spec.ts #2
OLD-BEGIN

test("S-1: unauthenticated /settings lands on /auth", async ({ page }) => {
  await page.goto("/settings");
  await page.waitForURL(/\/auth(\?|$)/, { timeout: 15000 });
  await expectSignedOut(page);
});

OLD-END
NEW-BEGIN

/**
 * INC-925 (Foundations turn 34w) — every page whose door-step is requireSignedIn sends a signed-out
 * visitor to sign in AND KEEPS THEM THERE: the shell's live guard once evacuated /settings to "/"
 * a moment after /auth, and a test that only waited for /auth passed on the passing frame. The
 * signed-out marker shows in the same render that runs the guard; typing into the email field
 * then proves the sign-in page is the one that stays, and no frame ever showed "/".
 */
for (const path of SIGNED_IN_PAGES) {
  test(`S-1 ${path}: a signed-out visitor is sent to sign in and stays there (INC-923, INC-925)`, async ({
    page,
  }) => {
    const seen: string[] = [];
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame()) seen.push(new URL(frame.url()).pathname);
    });
    await page.goto(path);
    await page.waitForURL(/\/auth(\?|$)/, { timeout: 15000 });
    await expectSignedOut(page);
    const { email } = authFields(page);
    await email.pressSequentially("door-step@example.test");
    await expect(email).toHaveValue("door-step@example.test");
    const at = new URL(page.url());
    expect(at.pathname).toBe("/auth");
    expect(at.searchParams.get("return")).toBe(path);
    expect(seen, "the visitor never passed through the home page").not.toContain("/");
  });
}

NEW-END
EDIT e2e/auth-signout.spec.ts #1
OLD-BEGIN
  signOutViaUi,
  signedInMarker,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
OLD-END
NEW-BEGIN
  signOutViaUi,
  signedInMarker,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
NEW-END
EDIT e2e/auth-signout.spec.ts #2
OLD-BEGIN
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });
});

OLD-END
NEW-BEGIN
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });

  test("SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)", async ({
    page,
  }) => {
    const user = await leaseUser();
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    if (isMobile(page)) {
      // The account menu's code arrives on its first opening: open it once while online.
      await page.getByTestId("account-menu").click();
      await expect(page.getByTestId("account-menu-sign-out")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("account-menu-sign-out")).toHaveCount(0);
    }
    let loads = 0;
    page.on("load", () => {
      loads += 1;
    });
    await page.context().setOffline(true);
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
      await page.getByTestId("account-menu-sign-out").click();
    } else {
      await page.getByTestId("app-rail").getByTestId("rail-sign-out").click();
    }
    // The site stays on screen, signed out — not the browser's own "cannot open" page.
    await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
    expect(loads, "no load is tried while offline").toBe(0);
    expect(
      await page.evaluate(() =>
        Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token")),
      ),
      "the stored session is gone from this device",
    ).toBe(false);
    // The connection returns: the page loads afresh, still signed out.
    await page.context().setOffline(false);
    await expect
      .poll(() => loads, { message: "the page loads afresh when the connection returns" })
      .toBe(1);
    await waitForHydration(page);
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });
});

NEW-END
EDIT e2e/shell.spec.ts #1
OLD-BEGIN
  signIn,
  signInViaSession,
  signOutViaUi,
  settled,
OLD-END
NEW-BEGIN
  signIn,
  signInViaSession,
  signedInMarker,
  signOutViaUi,
  settled,
NEW-END
EDIT e2e/shell.spec.ts #2
OLD-BEGIN
    await expect(menu).toBeVisible();
    await checkVariant(menu, "Admin", "menu");
    await page.getByTestId("rail-menu-close").click();

    // INC-759: prove scrolling where the Admin strip is one row's floor short.
OLD-END
NEW-BEGIN
    await expect(menu).toBeVisible();
    await checkVariant(menu, "Admin", "menu");
    // D238 — the phone menu has no ×: ☰ closes it.
    await page
      .getByTestId("shell-topbar")
      .getByRole("button", { name: en["shell.closeMenu"] })
      .click();
    await expect(menu).toBeHidden();

    // INC-759: prove scrolling where the Admin strip is one row's floor short.
NEW-END
EDIT e2e/shell.spec.ts #3
OLD-BEGIN
    await expect(menu).toBeVisible();
    await checkVariant(menu, "Account", "menu");
    await page.getByTestId("rail-menu-close").click();
  });

OLD-END
NEW-BEGIN
    await expect(menu).toBeVisible();
    await checkVariant(menu, "Account", "menu");
    await page
      .getByTestId("shell-topbar")
      .getByRole("button", { name: en["shell.closeMenu"] })
      .click();
    await expect(menu).toBeHidden();
  });

NEW-END
EDIT e2e/shell.spec.ts #4
OLD-BEGIN
    const menuBox = await menu.boundingBox();
    if (!menuBox) throw new Error("Missing opened menu box");
    const close = page.getByTestId("rail-menu-close");
    await expect(close).toBeVisible();
    const closeBox = await close.boundingBox();
    if (!closeBox) throw new Error("Missing close button box");
    expect(closeBox.height).toBeGreaterThanOrEqual(44);
    expect(closeBox.width).toBeGreaterThanOrEqual(44);
    expect(Math.abs(closeBox.x + closeBox.width - menuBox.x - menuBox.width)).toBeLessThanOrEqual(
      1,
    );
    await close.click();
    await expect(menu).toBeHidden();
    await expect(close).toBeHidden();
    await expect(control).toBeFocused();
    menu = await openRailScope(page);
    await page.mouse.click(menuBox.x + menuBox.width + 20, menuBox.y + 20);
    await expect(menu).toBeHidden();
OLD-END
NEW-BEGIN
    const menuBox = await menu.boundingBox();
    if (!menuBox) throw new Error("Missing opened menu box");
    // D238 (the operator, 2026-10-26) — the phone menu has no ×; a tap outside and ☰ close it.
    await expect(page.getByTestId("rail-menu-close")).toHaveCount(0);
    await page.mouse.click(menuBox.x + menuBox.width + 20, menuBox.y + 20);
    await expect(menu).toBeHidden();
NEW-END
EDIT e2e/shell.spec.ts #5
OLD-BEGIN
    expect(firstMenuRow.height).toBeGreaterThanOrEqual(31);
    expect(firstMenuRow.height).toBeLessThanOrEqual(41);
    await expectTapTarget(page, page.getByTestId("rail-menu-close"), "close menu");
  });

OLD-END
NEW-BEGIN
    expect(firstMenuRow.height).toBeGreaterThanOrEqual(31);
    expect(firstMenuRow.height).toBeLessThanOrEqual(41);
    await expectTapTarget(
      page,
      page.getByTestId("shell-topbar").getByRole("button", { name: en["shell.closeMenu"] }),
      "close menu",
    );
  });

NEW-END
EDIT e2e/shell.spec.ts #6
OLD-BEGIN
});

test.describe("in-place category menu (bundle 21 turn 5)", () => {
  /**
OLD-END
NEW-BEGIN
});

type PeekRecord = {
  shows: number;
  shownAt: number | null;
  focusedAtShow: boolean | null;
  focusedLater: boolean | null;
  goneAt: number | null;
};

/**
 * D216 — every load opts in to the peek (the force word; no production session marker is
 * written). INC-741 — the same script watches the menu from BEFORE the load, so a peek that opens
 * and closes while page.goto is still waiting is recorded. Shared by PK-1…PK-3 (INC-924).
 */
async function watchPeek(page: Page) {
  await page.addInitScript(() => {
    if (window.location.origin !== "null" && sessionStorage.getItem("ethio.peek") === null) {
      sessionStorage.setItem("ethio.peek", "force");
    }
    type Record = {
      shows: number;
      shownAt: number | null;
      focusedAtShow: boolean | null;
      focusedLater: boolean | null;
      goneAt: number | null;
    };
    const record: Record = {
      shows: 0,
      shownAt: null,
      focusedAtShow: null,
      focusedLater: null,
      goneAt: null,
    };
    (window as unknown as { __peek: Record }).__peek = record;
    const visibleMenu = () => {
      const menu = document.querySelector<HTMLElement>('[data-testid="rail-menu"]');
      if (!menu) return null;
      const box = menu.getBoundingClientRect();
      const style = getComputedStyle(menu);
      return box.width > 0 && box.height > 0 && style.visibility !== "hidden" ? menu : null;
    };
    const look = () => {
      const menu = visibleMenu();
      if (menu && (record.shownAt === null || record.goneAt !== null)) {
        record.shows += 1;
        record.goneAt = null;
        record.shownAt = performance.now();
        record.focusedAtShow = menu.contains(document.activeElement);
        window.setTimeout(() => {
          const later = visibleMenu();
          record.focusedLater = later ? later.contains(document.activeElement) : false;
        }, 300);
      } else if (!menu && record.shownAt !== null && record.goneAt === null) {
        record.goneAt = performance.now();
      }
    };
    new MutationObserver(look).observe(document, {
      subtree: true,
      childList: true,
      attributes: true,
    });
  });
}

function readPeek(page: Page): Promise<PeekRecord> {
  return page.evaluate(() => (window as unknown as { __peek: PeekRecord }).__peek);
}

test.describe("in-place category menu (bundle 21 turn 5)", () => {
  /**
NEW-END
EDIT e2e/shell.spec.ts #7
OLD-BEGIN
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360");
    // D216: every load opts in; no production session marker is written.
    // INC-741 — the same script watches the menu from BEFORE the load, so a
    // peek that opens and closes while page.goto is still waiting is recorded.
    await page.addInitScript(() => {
      if (window.location.origin !== "null" && sessionStorage.getItem("ethio.peek") === null) {
        sessionStorage.setItem("ethio.peek", "force");
      }
      type PeekRecord = {
        shows: number;
        shownAt: number | null;
        focusedAtShow: boolean | null;
        focusedLater: boolean | null;
        goneAt: number | null;
      };
      const record: PeekRecord = {
        shows: 0,
        shownAt: null,
        focusedAtShow: null,
        focusedLater: null,
        goneAt: null,
      };
      (window as unknown as { __peek: PeekRecord }).__peek = record;
      const visibleMenu = () => {
        const menu = document.querySelector<HTMLElement>('[data-testid="rail-menu"]');
        if (!menu) return null;
        const box = menu.getBoundingClientRect();
        const style = getComputedStyle(menu);
        return box.width > 0 && box.height > 0 && style.visibility !== "hidden" ? menu : null;
      };
      const look = () => {
        const menu = visibleMenu();
        if (menu && (record.shownAt === null || record.goneAt !== null)) {
          record.shows += 1;
          record.goneAt = null;
          record.shownAt = performance.now();
          record.focusedAtShow = menu.contains(document.activeElement);
          window.setTimeout(() => {
            const later = visibleMenu();
            record.focusedLater = later ? later.contains(document.activeElement) : false;
          }, 300);
        } else if (!menu && record.shownAt !== null && record.goneAt === null) {
          record.goneAt = performance.now();
        }
      };
      new MutationObserver(look).observe(document, {
        subtree: true,
        childList: true,
        attributes: true,
      });
    });
    const readRecord = () =>
      page.evaluate(
        () =>
          (
            window as unknown as {
              __peek: {
                shows: number;
                shownAt: number | null;
                focusedAtShow: boolean | null;
                focusedLater: boolean | null;
                goneAt: number | null;
              };
            }
          ).__peek,
      );
    await gotoReady(page, "/c/electronics");
    await expect
OLD-END
NEW-BEGIN
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360");
    await watchPeek(page);
    const readRecord = () => readPeek(page);
    await gotoReady(page, "/c/electronics");
    await expect
NEW-END
EDIT e2e/shell.spec.ts #8
OLD-BEGIN
      .toBe("held");
  });
});

OLD-END
NEW-BEGIN
      .toBe("held");
  });

  test("PK-2 a peek whose code arrives late still shows for its three seconds (INC-924)", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360");
    await watchPeek(page);
    // A slow connection: the menu's code arrives after the peek's three seconds would have run out.
    await page.route(/\/overlays-impl-[^/]+\.js$/, async (route) => {
      const response = await route.fetch();
      await new Promise((resolve) => setTimeout(resolve, 3_500));
      await route.fulfill({ response });
    });
    await gotoReady(page, "/c/electronics");
    await expect
      .poll(async () => (await readPeek(page)).shownAt !== null, {
        timeout: 15_000,
        message: "INC-924: the late peek never showed",
      })
      .toBe(true);
    await expect
      .poll(async () => (await readPeek(page)).goneAt !== null, { timeout: 10_000 })
      .toBe(true);
    const record = await readPeek(page);
    if (record.goneAt === null || record.shownAt === null) throw new Error("PK-2 incomplete peek");
    expect(
      record.goneAt - record.shownAt,
      "the peek's three seconds count from when it showed",
    ).toBeGreaterThanOrEqual(2_500);
    expect(record.shows).toBe(1);
  });

  test("PK-3 a menu opened before the sign-in check ends is the person's: the peek never closes it (INC-924)", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360");
    const user = await leaseUser();
    await watchPeek(page);
    await signInViaSession(page, user.email, user.password);
    // The sign-in code arrives late, so the sign-in check is still running when the person opens
    // the menu (the client's own code carries GoTrueClient, as e2e/supabase-door.spec.ts reads it).
    await page.route("**/*.js", async (route) => {
      const response = await route.fetch();
      if ((await response.text()).includes("GoTrueClient"))
        await new Promise((resolve) => setTimeout(resolve, 4_000));
      await route.fulfill({ response });
    });
    await page.goto("/c/electronics");
    await waitForHydration(page);
    await page.getByRole("button", { name: en["shell.openMenu"] }).click();
    const menu = page.getByTestId("rail-menu");
    await expect(menu).toBeVisible();
    await expect(signedInMarker(page)).toBeVisible({ timeout: 20_000 });
    // The check has ended; the peek's three-second clock would have closed a menu it took over.
    const heldFrom = Date.now();
    await expect
      .poll(
        async () => {
          if (!(await menu.isVisible())) return "closed";
          return Date.now() - heldFrom >= 4_000 ? "held" : "waiting";
        },
        { timeout: 8_000, message: "INC-924: the peek took over the person's menu and closed it" },
      )
      .toBe("held");
  });
});

NEW-END
EDIT e2e/shell.spec.ts #9
OLD-BEGIN
          .toBe("level");
      }
      await page.getByTestId("rail-menu-close").click();
    }
  };
OLD-END
NEW-BEGIN
          .toBe("level");
      }
      await page
        .getByTestId("shell-topbar")
        .getByRole("button", { name: en["shell.closeMenu"] })
        .click();
      await expect(scope).toBeHidden();
    }
  };
NEW-END
B4. On BASE's code, run `bun run e2e:local -- e2e/settings.spec.ts --grep "S-1 /settings"`, `bun run e2e:local -- e2e/auth-signout.spec.ts --grep "SO-12"` and `bun run e2e:local -- e2e/shell.spec.ts --grep "PK-2|PK-3"`: each fails (S-1 /settings: `the visitor never passed through the home page` or the URL on "/"; SO-12: the sign-in marker never shows — the browser's own offline page; PK-2: `INC-924: the late peek never showed`, or a showing shorter than 2,500 ms; PK-3: `INC-924: the peek took over the person's menu and closed it`). Paste each count line and first error.

PART C — THE RED OF TURN 34b-2 (the notice's live region carries no role).
EDIT src/components/shell/on-demand-notice.tsx #1
OLD-BEGIN
 * until the person closes it or refreshes; a later failure shows it again. Drawn above the
 * phone's bottom bar; a polite live region, so a screen reader hears it once.
 */
OLD-END
NEW-BEGIN
 * until the person closes it or refreshes; a later failure shows it again. Drawn above the
 * phone's bottom bar; a polite live region, so a screen reader hears it once. The region is
 * there from the first paint (a live region must exist before its words arrive) and carries no
 * role: an empty role="status" on every page answered a page's own getByRole("status") too
 * (the reset screen's R-2 and R-4, CI on turn 34b-2's landing).
 */
NEW-END
EDIT src/components/shell/on-demand-notice.tsx #2
OLD-BEGIN
    <div
      role="status"
      aria-live="polite"
OLD-END
NEW-BEGIN
    <div
      aria-live="polite"
NEW-END
C2. Read /tmp/observability/build-errors.log; `bunx vitest run src/components/shell/on-demand-notice.test.tsx` (ODN-1, ODN-2 pass); `bun run e2e:local -- e2e/auth-reset.spec.ts` (R-2 and R-4 pass) — paste.

PART D — THE DOOR-STEP'S PAGES (INC-925).
EDIT src/components/app-shell.tsx #1
OLD-BEGIN
import { getSupabase } from "@/lib/supabase-door";
import { useRailCollapsed, RAIL_INIT_SCRIPT } from "@/providers/rail-state";
OLD-END
NEW-BEGIN
import { getSupabase } from "@/lib/supabase-door";
import { sendsToSignIn } from "@/lib/signed-in-pages";
import { useRailCollapsed, RAIL_INIT_SCRIPT } from "@/providers/rail-state";
NEW-END
EDIT src/components/app-shell.tsx #2
OLD-BEGIN
          clearSessionClocks();
          window.location.replace("/");
          return;
        }
OLD-END
NEW-BEGIN
          clearSessionClocks();
          if (navigator.onLine) {
            window.location.replace("/");
            return;
          }
          // DEC-271 (Foundations turn 34w) — offline, that load would show the browser's own
          // "cannot open" page: the app stays on screen, signed out (signingOut stays set, so no
          // frame of the old account), its auth-derived reads purged below, and the fresh load
          // comes the moment the connection returns.
          window.addEventListener("online", () => window.location.replace("/"), { once: true });
        }
NEW-END
EDIT src/components/app-shell.tsx #3
OLD-BEGIN
      } finally {
        // A reloading page stays signed-out until it goes: no frame of the old account.
        if (!reloading) setSigningOut(false);
OLD-END
NEW-BEGIN
      } finally {
        // A reloading page stays signed-out until it goes — offline, until the connection returns
        // and it goes (DEC-271): no frame of the old account.
        if (!reloading) setSigningOut(false);
NEW-END
EDIT src/components/app-shell.tsx #4
OLD-BEGIN
   * Bundle 16 turn 2b (INC-627) — A FRESH SIGNED-OUT VISIT IS NOT A SIGN-OUT.
   * /account and /my-listings send a signed-out visitor to sign in and back
   * (their own `beforeLoad`, D20's rule). This guard used to win that race and
   * drop the visitor on the marketplace instead. It now evacuates those two only
   * once a session this tab held has gone; /admin and /settings, which have no
   * sign-in redirect of their own, are evacuated as before.
   *
OLD-END
NEW-BEGIN
   * Bundle 16 turn 2b (INC-627) — A FRESH SIGNED-OUT VISIT IS NOT A SIGN-OUT.
   * A page whose door-step is requireSignedIn sends a signed-out visitor to sign
   * in and back (D20's rule). This guard used to win that race and drop the
   * visitor on the marketplace instead. It now evacuates those pages only once a
   * session this tab held has gone; /admin, which has no sign-in redirect of its
   * own, is evacuated as before. INC-925 (Foundations turn 34w) — which pages those
   * are is the door-step's own list (sendsToSignIn, src/lib/signed-in-pages.ts),
   * never a list kept here: /settings gained the door-step (INC-923) while this
   * guard still evacuated it, and the visitor landed on "/" a moment after /auth.
   *
NEW-END
EDIT src/components/app-shell.tsx #5
OLD-BEGIN
   */
  const ownSignIn = pathname.startsWith("/account") || pathname.startsWith("/my-listings");
  useEffect(() => {
OLD-END
NEW-BEGIN
   */
  const ownSignIn = sendsToSignIn(pathname);
  useEffect(() => {
NEW-END
D2. (These edits also carry Part E's offline path, which sits in the same function — apply them all here.) Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance/signed-in-routes.test.ts src/lib/signed-in-pages.test.ts src/lib/signed-in-route.test.ts` — all pass (paste).

PART E — THE OFFLINE SIGN-OUT (DEC-271).
EDIT src/lib/stale-chunk.ts #1
OLD-BEGIN
 * that failure is left to the piece that asked for the download to answer.
 */
OLD-END
NEW-BEGIN
 * that failure is left to the piece that asked for the download to answer.
 * DEC-271 (Foundations turn 34w) — a download that fails while the device is offline is no stale
 * chunk: a reload would only show the browser's own "cannot open" page. It is left to the piece
 * that asked (the on-demand notice, src/lib/on-demand-failure.ts), and it counts as the page's
 * first failure, so no later one reloads the page either.
 */
NEW-END
EDIT src/lib/stale-chunk.ts #2
OLD-BEGIN
  sessionStorage?: Pick<Storage, "getItem" | "setItem">;
}
OLD-END
NEW-BEGIN
  sessionStorage?: Pick<Storage, "getItem" | "setItem">;
  navigator?: { onLine: boolean };
}
NEW-END
EDIT src/lib/stale-chunk.ts #3
OLD-BEGIN
    failedInPage = true;
    if (!first || reloadedRecently(win, at)) return;
    try {
OLD-END
NEW-BEGIN
    failedInPage = true;
    if (!first || win.navigator?.onLine === false || reloadedRecently(win, at)) return;
    try {
NEW-END
E2. Read /tmp/observability/build-errors.log; `bunx vitest run src/lib/stale-chunk.test.ts` — all pass (paste).

PART F — THE PHONE MENU (D238, INC-924).
EDIT src/components/shell/app-rail.tsx #1
OLD-BEGIN
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, LogOut, Star, X, type LucideIcon } from "lucide-react";
import {
OLD-END
NEW-BEGIN
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, LogOut, Star, type LucideIcon } from "lucide-react";
import {
NEW-END
EDIT src/components/shell/app-rail.tsx #2
OLD-BEGIN
  const [peeking, setPeeking] = useState(false);
  const peekAttempted = useRef(false);
OLD-END
NEW-BEGIN
  const [peeking, setPeeking] = useState(false);
  /** INC-924 — the peek's menu has been drawn (its code arrived): its 3-second clock starts here. */
  const [peekDrawn, setPeekDrawn] = useState(false);
  const peekAttempted = useRef(false);
NEW-END
EDIT src/components/shell/app-rail.tsx #3
OLD-BEGIN
    peekAttempted.current = true;
    if (isE2E) {
OLD-END
NEW-BEGIN
    peekAttempted.current = true;
    // INC-924 (Foundations turn 34w) — a menu the person opened before the sign-in check ended is
    // theirs: the peek never takes it over (it used to, and closed it three seconds later).
    if (navOpen) return;
    if (isE2E) {
NEW-END
EDIT src/components/shell/app-rail.tsx #4
OLD-BEGIN
    setNavOpen(true);
  }, [authLoading, activePanel, pathname, setNavOpen]);

  useEffect(() => {
    if (!peeking || !navOpen) return;
    const end = () => {
      setNavOpen(false);
      setPeeking(false);
    };
    const outside = (event: Event) => {
OLD-END
NEW-BEGIN
    setNavOpen(true);
  }, [authLoading, activePanel, pathname, navOpen, setNavOpen]);

  // A person's tap, scroll or key ends the peek at once, drawn or not.
  useEffect(() => {
    if (!peeking || !navOpen) return;
    const outside = (event: Event) => {
NEW-END
EDIT src/components/shell/app-rail.tsx #5
OLD-BEGIN
        return;
      end();
    };
    const timer = window.setTimeout(end, 3000);
    document.addEventListener("pointerdown", outside, true);
OLD-END
NEW-BEGIN
        return;
      setNavOpen(false);
      setPeeking(false);
    };
    document.addEventListener("pointerdown", outside, true);
NEW-END
EDIT src/components/shell/app-rail.tsx #6
OLD-BEGIN
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", outside, true);
OLD-END
NEW-BEGIN
    return () => {
      document.removeEventListener("pointerdown", outside, true);
NEW-END
EDIT src/components/shell/app-rail.tsx #7
OLD-BEGIN

  const changeMenu = (open: boolean) => {
OLD-END
NEW-BEGIN

  // INC-924 (Foundations turn 34w) — the peek shows for three seconds FROM WHEN IT IS DRAWN: on a
  // slow connection its code arrives late, and a clock started at the opening closed it before it
  // was ever seen (or a moment after).
  useEffect(() => {
    if (!peeking || !navOpen || !peekDrawn) return;
    const timer = window.setTimeout(() => {
      setNavOpen(false);
      setPeeking(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [peeking, navOpen, peekDrawn, setNavOpen]);

  useEffect(() => {
    if (!peeking) setPeekDrawn(false);
  }, [peeking]);

  const changeMenu = (open: boolean) => {
NEW-END
EDIT src/components/shell/app-rail.tsx #8
OLD-BEGIN
            event.preventDefault();
            if (peeking) return;
            peekFocus.current = false;
OLD-END
NEW-BEGIN
            event.preventDefault();
            if (peeking) {
              setPeekDrawn(true);
              return;
            }
            peekFocus.current = false;
NEW-END
EDIT src/components/shell/app-rail.tsx #9
OLD-BEGIN
        >
          <Button
            variant="ghost"
            size="touch"
            data-testid="rail-menu-close"
            aria-label={t("common.close")}
            onClick={() => setNavOpen(false)}
            className="fixed start-[calc(16rem-2.75rem)] top-1 z-50 w-11 p-0 md:hidden [&_svg]:size-5"
          >
            <X aria-hidden="true" />
          </Button>
          <DialogPrimitive.Title className="sr-only">{t("shell.menuTitle")}</DialogPrimitive.Title>
OLD-END
NEW-BEGIN
        >
          {/* D238 (the operator, 2026-10-26) — no × here: ☰ (top-left, aria-expanded) and a tap
              outside close the menu, and Escape does; a fixed × rode the slide-in and jumped. */}
          <DialogPrimitive.Title className="sr-only">{t("shell.menuTitle")}</DialogPrimitive.Title>
NEW-END
F2. `bun run i18n:usage`; read /tmp/observability/build-errors.log; `bun scripts/e2e-select.ts --self-test` after these edits (paste):
EDIT scripts/e2e-select.ts #1
OLD-BEGIN
    src: ["src/routes/settings.tsx", "src/features/settings/**"],
OLD-END
NEW-BEGIN
    // INC-925 (Foundations turn 34w) — S-1 proves every door-step page; the shell's guard reads the list.
    src: [
      "src/routes/settings.tsx",
      "src/features/settings/**",
      "src/lib/signed-in-pages.ts",
      "src/lib/signed-in-route.ts",
      "src/components/app-shell.tsx",
    ],
NEW-END

PART G — DOCS AND THE ROADMAP.
G1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34b-2: a piece fetched on demand whose download fails tells the person and offers a refresh — the mechanism, its guard and the consumers that share its code, INC-911)` becomes `docs/governance/briefs/foundations-turn-34w.md (Foundations turn 34w: the walk of 26 Oct — a signed-out visitor stays on sign in, INC-925; the offline sign-out, DEC-271; the phone menu without its ×, D238; the peek's clock, INC-924; and the notice's live region without a role)` (everything after it stays, as it is).
G2. These edits (the register's row 29; the panels doc; the changelog; turn 34b-2 ticked with its red run, this turn's line, 34b-3's census MAJORs):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 29 | A signed-in screen's door-step | `src/lib/signed-in-route.ts` requireSignedIn | signed-in-routes.test.ts (CF-SIR-1…3: no route reads the session itself; ssr: false implies requireSignedIn; no screen but the sign-in screens sends to sign in from its own code — INC-923) | none | a new screen is one import | INC-852; /settings onto it in Foundations turn 34b-1 (INC-923) |
OLD-END
NEW-BEGIN
| 29 | A signed-in screen's door-step | `src/lib/signed-in-route.ts` requireSignedIn + `src/lib/signed-in-pages.ts` (`SIGNED_IN_PAGES`, `sendsToSignIn` — the pages it guards, which the shell's live guard reads so a signed-out visitor stays on sign in) | signed-in-routes.test.ts (CF-SIR-1…3: no route reads the session itself; ssr: false implies requireSignedIn; no screen but the sign-in screens sends to sign in from its own code — INC-923; CF-SIR-4/5: SIGNED_IN_PAGES is every route that calls requireSignedIn and nothing else, and the shell reads it — INC-925); SIP-1; `e2e/settings.spec.ts` S-1 over every page | none | a new screen is one import and one line in SIGNED_IN_PAGES (the census asks for it) | INC-852; /settings onto it in Foundations turn 34b-1 (INC-923); the shell's own list retired in turn 34w (INC-925) |
NEW-END
EDIT docs/features/panels.md #1
OLD-BEGIN
Subcategories open in place at every width (D98 with D213): the list follows the URL, with ‹ Main menu / ‹ <parent> moving it up without navigation. The phone menu opens at the main list, stays open on a category with subcategories, and folds into the strip on one without. The folded rail and strip show main categories with the current ancestor marked. Every category link preloads on intent. The peek opens on every page load on phones, a reload included, never on an in-app navigation (D216), without taking focus; it is off under test unless the tab's `ethio.peek` word is `force`.
OLD-END
NEW-BEGIN
Subcategories open in place at every width (D98 with D213): the list follows the URL, with ‹ Main menu / ‹ <parent> moving it up without navigation. The phone menu opens at the main list, stays open on a category with subcategories, and folds into the strip on one without. The folded rail and strip show main categories with the current ancestor marked. Every category link preloads on intent. The peek opens on every page load on phones, a reload included, never on an in-app navigation (D216), without taking focus; it is off under test unless the tab's `ethio.peek` word is `force`. Its three seconds count from when the menu is drawn — on a slow connection the menu's code arrives late — and it never takes over a menu the person opened before the sign-in check ended (INC-924, PK-2, PK-3). The phone menu has no ×: ☰, a tap outside and Escape close it (D238).
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34b-2 (2026-10-26) — INC-911: a piece fetched on demand whose download fails tells the person — src/lib/on-demand-failure.ts reports it and the shell's one notice (src/components/shell/on-demand-notice.tsx) says part of the page did not load and offers to refresh; LoadFailedHere says the same in a piece's own place (the pin map). resilientLazy and the overlay facades report; the step-up gate tells a dialog that could not open from one the person closed (StepUpUnavailable); the sign-in screen says common.loadFailed for a failed client download. The census ODC-1…3 names every caller of an on-demand loader; ten move onto the mechanism in turn 34b-3 (their allowlist lines expire with INC-911). Two strings (common.loadFailed, common.refreshPage). ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ODE-1.
OLD-END
NEW-BEGIN
- Foundations turn 34b-2 (2026-10-26) — INC-911: a piece fetched on demand whose download fails tells the person — src/lib/on-demand-failure.ts reports it and the shell's one notice (src/components/shell/on-demand-notice.tsx) says part of the page did not load and offers to refresh; LoadFailedHere says the same in a piece's own place (the pin map). resilientLazy and the overlay facades report; the step-up gate tells a dialog that could not open from one the person closed (StepUpUnavailable); the sign-in screen says common.loadFailed for a failed client download. The census ODC-1…3 names every caller of an on-demand loader; ten move onto the mechanism in turn 34b-3 (their allowlist lines expire with INC-911). Two strings (common.loadFailed, common.refreshPage). ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/20, SUG-1, ODE-1.

- Foundations turn 34w (2026-10-26; the operator's walk of the 34b-1 build) — INC-925: a signed-out visitor to /settings stayed on sign in only a moment — the shell's live guard kept its own list of the pages that send to sign in, and /settings was not on it (turn 34b-1 gave it the door-step); the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts), proven both ways by CF-SIR-4/5, and S-1 checks every such page keeps the visitor on sign in. DEC-271: an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns; a download that fails offline is no stale chunk (no reload). D238: the phone menu has no ×. INC-924: the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened. SIP-1, CF-SIR-4/5, S-1, STC-2, SO-12, PK-2, PK-3.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34b-2 — a piece fetched on demand whose download fails tells the person and offers a refresh (INC-911, INC-918): the mechanism (src/lib/on-demand-failure.ts; the shell's one notice and LoadFailedHere, src/components/shell/on-demand-notice.tsx; two strings, common.loadFailed and common.refreshPage); resilientLazy reports (`inPlace` for a fallback that says so itself); the guard ODC-1…3 with an allowlist naming every consumer not yet on it, each with its expiry; the overlay facades (`onUnavailable`) and the step-up gate (StepUpUnavailable: step-up-gate.tsx :45-:47, use-step-up.ts :75, :89); ODE-1.
  - [ ] Turn 34b-3 — every remaining on-demand consumer onto the mechanism, the allowlist down to its four permanent lines: the maps (map-preview.tsx :108, map-large.tsx :73), the pin map (LoadFailedHere — no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar, the strings gate, the phone box (Refresh), settings, the account read and the strings provider (INC-919: a failed language download is no longer an unhandled rejection); every "Try again" for a download becomes Refresh and every comment that promises a retry is corrected (INC-918); the footer's silent catch (use-footer-inset.ts :100, INC-909).
OLD-END
NEW-BEGIN
  - [x] Turn 34b-2 (docs/governance/briefs/foundations-turn-34b-2.md; no migration; Lovable) — a piece fetched on demand whose download fails tells the person and offers a refresh (INC-911, INC-918): the mechanism (src/lib/on-demand-failure.ts; the shell's one notice and LoadFailedHere, src/components/shell/on-demand-notice.tsx; two strings, common.loadFailed and common.refreshPage); resilientLazy reports (`inPlace` for a fallback that says so itself); the guard ODC-1…3 with an allowlist naming every consumer not yet on it, each with its expiry; the overlay facades (`onUnavailable`) and the step-up gate (StepUpUnavailable: step-up-gate.tsx :45-:47, use-step-up.ts :75, :89); ODE-1. Final HEAD bc963938 (one stop before STEP 0: the notice's card took a 1-px border against the shell's card rule — re-sent with CARD_SURFACE); unit 315 files / 1,956 passed + 1 skip; browser 81 passed. CI run 40345497360: FAILURE — auth-reset R-2 and R-4 met the notice's always-drawn, empty role="status" as well as their own: fixed first in turn 34w (ODN-2). Its reviewer's two census MAJORs go to turn 34b-3.
  - [ ] Turn 34w (docs/governance/briefs/foundations-turn-34w.md; no migration; Lovable) — the operator's walk of 26 Oct and CI's red on bc963938: the notice's live region carries no role (ODN-2); INC-925 — a signed-out visitor to /settings stayed on sign in only a moment, because the shell's live guard kept its own list of the pages that send to sign in: the list is now the door-step's own (SIGNED_IN_PAGES, src/lib/signed-in-pages.ts; CF-SIR-4/5, SIP-1) and S-1 proves every such page keeps the visitor there; DEC-271 — an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns, and a download that fails offline is no stale chunk (STC-2, SO-12); D238 — the phone menu has no ×; INC-924 — the peek's three seconds count from when it is drawn, and it never takes over a menu the person opened (PK-2, PK-3).
  - [ ] Turn 34b-3 — every remaining on-demand consumer onto the mechanism, the allowlist down to its four permanent lines: the maps (map-preview.tsx :108, map-large.tsx :73), the pin map (LoadFailedHere — no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar, the strings gate, the phone box (Refresh), settings, the account read and the strings provider (INC-919: a failed language download is no longer an unhandled rejection); every "Try again" for a download becomes Refresh and every comment that promises a retry is corrected (INC-918); the footer's silent catch (use-footer-inset.ts :100, INC-909). And the census itself (34b-2's reviewer, MAJORs 1–2): a loader imported under another name or called through a namespace is still a call, and a file is on the mechanism only where each call's own failure is answered, never because the file mentions an answer somewhere.
NEW-END
G3. AGENTS.md — the constitution line's door-step rule names its page list (AGENTS.md then counts 8980 bytes by `wc -c AGENTS.md`):
EDIT AGENTS.md #1
OLD-BEGIN
Follow Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits. Server/RLS alone authorizes; signed-in screens gate by `requireSignedIn` (signed-in-route.ts), never their own getSession. No silent catch-and-continue: a reader's door error is a typed `ReaderError` (reader-failure.ts), never `if (error) return null`. Routes: `defineRoute` + a src/lib/schemas shape (`.strict()`), server functions `createServerFn().validator(<that shape>)` (server-fns.ts); doors via `doorCall`, ownership via `ownListing`, answers via answer.ts, caches via versionCache, cursors via cursor.ts, outside calls via `upstream()`; UUIDs only via src/lib/uuid.ts; dials only from src/lib/dials.ts, declared in the spec (`refuseAs` for a verdict) or spent via `spend` (src/server/dials.ts); read failures via `readFailure`; a client that left gets `clientAborted` 499; staff checks via `callerHasPermission`; downloads via `download` + imports/csv.ts; staff imports via `defineImportRoute` (imports/route.ts); browser calls via `callRoute`/`downloadRoute` (route-client.ts); no request.json/new Response/createClient/fetch elsewhere (routes.test.ts, ESLint).
OLD-END
NEW-BEGIN
Follow Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits. Server/RLS alone authorizes; signed-in screens gate by `requireSignedIn` (signed-in-route.ts) and are listed in `SIGNED_IN_PAGES` (signed-in-pages.ts, which the shell's guard reads), never their own getSession. No silent catch-and-continue: a reader's door error is a typed `ReaderError` (reader-failure.ts), never `if (error) return null`. Routes: `defineRoute` + a src/lib/schemas shape (`.strict()`), server functions `createServerFn().validator(<that shape>)` (server-fns.ts); doors via `doorCall`, ownership via `ownListing`, answers via answer.ts, caches via versionCache, cursors via cursor.ts, outside calls via `upstream()`; UUIDs only via src/lib/uuid.ts; dials only from src/lib/dials.ts, declared in the spec (`refuseAs` for a verdict) or spent via `spend` (src/server/dials.ts); read failures via `readFailure`; a client that left gets `clientAborted` 499; staff checks via `callerHasPermission`; downloads via `download` + imports/csv.ts; staff imports via `defineImportRoute` (imports/route.ts); browser calls via `callRoute`/`downloadRoute` (route-client.ts); no request.json/new Response/createClient/fetch elsewhere (routes.test.ts, ESLint).
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34w.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 316 files, 1962 tests, every one passed); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
c4af5f68d218c9392df8924a3d151df4e12bdb86ba3ddac4ee297907c6d7c5c3  AGENTS.md
1ec6d29e0627a0bb174caaed7353d8607e217387cf5513c3011100317c1b3433  docs/_changelog.md
7fb17b90ee1ff72216d91d623511e1c04d9bd57e686c7fc6ae94bc55dc17f7ca  docs/features/panels.md
037b6960a58238e1632967787d842ebedefb3f8d93f11578f916512f1c288231  docs/generated/i18n-usage.json
2246ba9ef07018487b5277bb79cb053b37ef23952571795ecc573a7754cc7bb6  docs/governance/mechanisms.md
d68655625caa13e442db04abf8ccd7a7cae63d4fe7eb2e8a334c793255053518  e2e/auth-signout.spec.ts
c58903878f8d918711e8d009a6fa910c4647ecc661525de848ba882b8ef0406e  e2e/settings.spec.ts
b1a14a487bc890314d916c86434b1bf8d11b8c04df50e618b6d6c059aaf502da  e2e/shell.spec.ts
037b6960a58238e1632967787d842ebedefb3f8d93f11578f916512f1c288231  public/i18n-usage.json
55b081d19b88892d8b36a43ceee01b4b943e7e0817412065bfa977b04b4eb0ef  scripts/conformance/signed-in-routes.test.ts
3187c123f86a0fa86bd247d8503181cedfbb855632ff6ee56dbb77eeffe4ec01  scripts/e2e-select.ts
d846188a7d132b2f93277b33ea7c002762fb070779874483f689817968a022a9  src/components/app-shell.tsx
b0e87ed6848a08a11234712539bd04432062fad9b71378a7dd1e3d3c7cfbac7c  src/components/shell/app-rail.tsx
db64221f7db957fcfc9f40b40b1df64be77d8a7829fa389a6a92a3783a4ca74b  src/components/shell/on-demand-notice.test.tsx
6808ad04f0d70d4ed78c13d3b8e8d8e71a1f40979fa0ffeeb89b77826270a75f  src/components/shell/on-demand-notice.tsx
153cae217f69975deaf0ead975df8859243b6cca605a4ef16ed57c06378bdb69  src/lib/signed-in-pages.test.ts
9b53f890b64196b8a3c04792eb2a6db2d5c174460551192e92f5eeaaa542fb90  src/lib/signed-in-pages.ts
0cdc184dac6d30356f9e0c195811493647060e6dd7503ceacc715a530c95e281  src/lib/stale-chunk.test.ts
68cb5721019c3bbe73064359af880903e10ebed2edeb433dd8abddd945d52a63  src/lib/stale-chunk.ts

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/settings.spec.ts whole; e2e/auth-signout.spec.ts whole; e2e/auth-reset.spec.ts whole; e2e/shell.spec.ts --grep "RL-1|RM-|primary touch targets|PK-|FV-1"; e2e/overlays.spec.ts whole; e2e/on-demand-failure.spec.ts whole; e2e/account-saved.spec.ts whole; paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34w.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract — /settings signed out, an offline sign-out, a download failing offline, the phone menu's closings, the peek on a slow download, a menu opened before the sign-in check ended — before → after; the consumer census of each concern with file:line, re-located at <START>; the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); "none" for migrations and strings; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17, in the operator's directives): the live region keeps aria-live and loses its role; the page list lives in its own small module because the shell, the census and a browser test all read it (the door-step module reaches the client's door, which a browser test cannot import); the stale-chunk rule counts an offline failure as the page's first; the overlay warm-up is NOT changed (DEC-259's "after the load event", pinned by OVE-1, stands — the walk shows ☰ fast).

BLOCK 1 — FILE-BEGIN src/lib/signed-in-pages.ts
/**
 * INC-925 (Foundations turn 34w) — THE PAGES WHOSE DOOR-STEP IS requireSignedIn
 * (src/lib/signed-in-route.ts), as address prefixes: every route whose beforeLoad calls it, and
 * nothing else (scripts/conformance/signed-in-routes.test.ts CF-SIR-4 proves it both ways). The
 * shell's live guard (src/components/app-shell.tsx) reads this list: on these pages a signed-out
 * visitor is left to the door-step (sign in, then back), and only a session this tab held is
 * evacuated. A page that gains the door-step joins here, so the two can never disagree again —
 * /settings gained it (INC-923) while the guard's own list still evacuated it to "/".
 */
export const SIGNED_IN_PAGES: readonly string[] = [
  "/account",
  "/legal/accept",
  "/legal/publishing",
  "/my-listings",
  "/post",
  "/settings",
];

/** True when `pathname` is one of SIGNED_IN_PAGES or a page below one. */
export function sendsToSignIn(pathname: string): boolean {
  return SIGNED_IN_PAGES.some((page) => pathname === page || pathname.startsWith(`${page}/`));
}
FILE-END src/lib/signed-in-pages.ts

BLOCK 2 — FILE-BEGIN src/lib/signed-in-pages.test.ts
import { describe, expect, it } from "vitest";

import { sendsToSignIn, SIGNED_IN_PAGES } from "./signed-in-pages";

describe("the door-step's pages (INC-925)", () => {
  it("SIP-1 sendsToSignIn answers each door-step page and the pages below it, and nothing beside them", () => {
    for (const page of SIGNED_IN_PAGES) {
      expect(sendsToSignIn(page), page).toBe(true);
      expect(sendsToSignIn(`${page}/x`), `${page}/x`).toBe(true);
      expect(sendsToSignIn(`${page}x`), `${page}x`).toBe(false);
    }
    for (const page of ["/", "/auth", "/legal/terms", "/admin", "/c/vehicles", "/l/x"])
      expect(sendsToSignIn(page), page).toBe(false);
  });
});
FILE-END src/lib/signed-in-pages.test.ts
```

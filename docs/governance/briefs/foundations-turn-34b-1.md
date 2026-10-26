# Foundations — turn 34b-1: a sign-out ends the session on this device whatever the server answers (DEC-268); the reload for a stale chunk answers only a page's first failed download (INC-922); /settings's door-step is requireSignedIn (INC-923): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34b-1 (2026-10-26; DEC-237; DEC-268 and INC-922 from turn 34's reviewer, MAJORs 4 and 3; INC-923 from CI's red on 9a3f8713, fixed first; anchors located at a8a7a20703e29f5af4eb835f0b659221d4dc46de). Turn 34b is split in three: 34b-1 (this brief) closes the sign-out first; 34b-2 builds the on-demand failure mechanism and its guard; 34b-3 moves the remaining consumers onto it (roadmap, Part D). Tier A (the sign-out, the sign-in and a signed-in screen's door-step are auth flows). No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev a8a7a20703e29f5af4eb835f0b659221d4dc46de (turn K1's landing, ruling 5 — K1 is CLEAN on its diff; CI judges it with this turn's run, since this turn's pushes supersede its own queued run). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — /settings's door-step (the red, first), the sign-out and the stale-chunk reload; D — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: a8a7a20703e29f5af4eb835f0b659221d4dc46de
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
e2e/auth-signout.spec.ts
scripts/conformance/auth-answers-allowlist.txt
scripts/conformance/signed-in-routes.test.ts
src/components/app-shell.tsx
src/features/auth/auth-client.test.ts
src/features/auth/auth-service.ts
src/lib/stale-chunk.test.ts
src/lib/stale-chunk.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/settings.tsx
SCOPE-END

THE SYSTEM (G0) — three concerns.

1. DEC-268 (the supervisor, G17 — overridable; it replaces DEC-267's premise that the library always removes the stored session).
CONCERN: a sign-out ends the session on this device whatever the server answers, and whether or not the client loaded — the person who signs out of a shared phone is signed out of it.
MECHANISM: NONE YET — built in Part C: src/lib/supabase-door.ts `forgetStoredSession()` (removes this project's stored session and the two items the client keeps beside it — `<key>-code-verifier`, `<key>-user` — from the browser's storage, where the client reads its session on every call; a framed page, the editor's preview, keeps its session in the editor's broker, which this does not reach, and answers false), called by src/features/auth/auth-service.ts wherever this device's session is ended: `signOut()` (when its client did not load, or the library answers an error, it forgets the stored session itself and answers its failure) and `evictExpiredSession()` (DEC-076's drop of an expired prior session before a sign-in: when the library answers an error or throws, it forgets it).
CONSUMERS (grep at BASE — every call that ends this device's session, and every caller of signOut): src/features/auth/auth-service.ts :275 signOut (the library's sign-out, default scope) and :195 evictExpiredSession (scope "local"; called at :225 by signInWithPassword and at :465 by the sign-in hand-off) — both onto the mechanism; :411 currentPasswordProof (scope "local" on a second client with no storage — it holds no session on this device: the named exception); signOutOtherDevices :287 and the "others" sign-outs at :369, :580, :638 end no session on this device and are unchanged. Callers of signOut: src/components/app-shell.tsx :645 (the hard reset, through use-auth's signOut :124 — it discarded the answer under DEC-267; now it reads it: a failure means the session is gone from this device but this page's state is not, so it loads "/" afresh with `window.location.replace("/")` and stays signed-out until it goes); src/features/auth/use-auth.ts :91 (a deactivated account's sign-out — its user is cleared whatever it answers; its allowance's premise is now true and names DEC-268). A direct call of the client's sign-out anywhere else is refused by the vendor-seams census (scripts/conformance/vendor-seams-scan.ts :26).
COVERED HERE: every consumer above. LEFT: a sign-out the server did not record leaves that session's refresh token valid on the server until it expires; nothing on the device holds it any more.
CONFORMANCE GUARD: ASC-5 (src/features/auth/auth-client.test.ts) — every function of auth-service.ts that calls the client's sign-out with any scope but "others" is named (evictExpiredSession, signOut, currentPasswordProof) and calls forgetStoredSession, the one exception holding `persistSession: false`; red on BASE (evictExpiredSession). ASC-3 and ASC-4 (the two behaviours), SBD-18/19 (the door), SO-11 (e2e/auth-signout.spec.ts: the access token has run out and the auth server cannot be reached; Sign out → signed out, nothing stored, and still signed out on a fresh load); AAN-1's allowlist loses app-shell's line (its answer is now read). Red on BASE: ASC-3…5, SBD-18/19 and SO-11 (Part B).
EXCEPTIONS: currentPasswordProof (ASC-5's NO_STORED_SESSION: its client keeps no session on this device).
FIVE LENSES — security: the subject (OWASP ASVS V3.3, session termination); a sign-out the server confirms is unchanged — the library removes the session itself · performance: none on any page; a sign-out that cannot reach the server still waits for the library's refresh retries (up to about 30 s, its own back-off) before it answers · failure modes: storage that refuses the removal answers false and the page still reloads; offline, the reload shows the browser's offline page and the session is already gone; a sign-in's eviction that fails leaves no stale session behind for the new one · consistency: one sign-out path for the deliberate, the idle and the absolute sign-outs (all through the hard reset) and the deactivated one; one forgetting for the sign-out and the sign-in's eviction · future growth: another item the client keeps beside the session is one more name in forgetStoredSession; a new place that ends this device's session is named by ASC-5 the day it lands.
FORWARD-SCAN: INC-914 (turn 34c) reads a failed session read as "unknown"; this turn changes only the end of a session. REGISTER: row 50 gains `forgetStoredSession` (Part D).

2. INC-922 (turn 34's reviewer, MAJOR 3).
CONCERN: the reload for a stale chunk (INC-640) never throws away a person's work: a page whose first failed download came within a minute of the tab's last reload was reloaded by a LATER failure, after the minute — a form filled for more than a minute thrown away.
MECHANISM: src/lib/stale-chunk.ts `reloadOnStaleChunk` — only a page's FIRST failed download may reload it (`failedInPage`); a later failure on that page is left to the code that asked for the download.
CONSUMERS (grep at BASE): src/routes/__root.tsx :418 (the one install). COVERED HERE: it. LEFT: none.
CONFORMANCE GUARD: STC-1 (src/lib/stale-chunk.test.ts), red on BASE; the file's existing tests unchanged. EXCEPTIONS: none.
FIVE LENSES — security: none · performance: none · failure modes: the subject; storage refused still reloads at most once per page life · consistency: one rule — a page reloads for a stale chunk at most once, and only at its first failure · future growth: none.
FORWARD-SCAN: turn 34b-2's notice answers the later failures on screen. REGISTER: none (row 50's neighbour, INC-640, is unchanged).

3. INC-923 (CI's red on 9a3f8713, run 40318186480: e2e/settings.spec.ts S-1 on mobile-360, both attempts — "/settings" landed on "/", not on /auth; that commit changed only the executor's kit, so the defect is in the app at that commit).
CONCERN: a signed-in screen's door-step — a signed-out visitor who opens a member screen is sent to sign in, and comes back, before the screen draws; by one gate.
MECHANISM: src/lib/signed-in-route.ts requireSignedIn (INC-852, register row 29) — /account, /my-listings, /post and /legal/accept use it in beforeLoad (with `ssr: false`). /settings does not (src/routes/settings.tsx :52, no beforeLoad): its screen renders for a signed-out visitor, and two of its effects route at once — the live guard (:135-:138) sends to "/", and the bootstrap's signed-out branch (:161-:167) awaits hasSessionRehydrating and then sends to /auth, unless the screen has already gone. Since turn 34, hasSessionRehydrating downloads the sign-in code before it answers (auth-service.ts :442), so on a slow runner "/" comes first, the screen unmounts and /auth never comes. The fix: /settings's door-step is requireSignedIn (`ssr: false` and beforeLoad, as /account's); its bootstrap no longer routes a signed-out visitor (the live guard and the shell's hard reset own every other transition, INC-078). A signed-out visitor no longer downloads the sign-in code at /settings either (DEC-261).
CONSUMERS (grep at BASE — every route under src/routes that sends a visitor to sign in): the routes that use requireSignedIn (account.tsx, account_.legal.tsx, account_.legal_.$versionId.tsx, account_.saved.tsx, legal.accept.tsx, my-listings*.tsx, post*.tsx); src/routes/settings.tsx — its own gate (onto the mechanism here); src/routes/auth.tsx, auth_.callback.tsx, auth_.reset.tsx — the sign-in screens themselves (their sends to /auth change their own view). src/routes/admin.tsx sends a visitor without the panel's permission to "/" by design (a staff panel does not invite a sign-in) and is not this concern.
COVERED HERE: settings. LEFT: none.
CONFORMANCE GUARD: scripts/conformance/signed-in-routes.test.ts — CF-SIR-1's census gains a rule: a route whose path is not under /auth and whose code holds `hasSessionRehydrating(` or a navigate to "/auth" is reported ("sends to sign in from the screen"); red on BASE (src/routes/settings.tsx :164); CF-SIR-3, planted: two such screens reported, a sign-in screen not. In the browser: S-1 (unchanged) and CI.
EXCEPTIONS: none.
FIVE LENSES — security: a signed-out visitor sees no frame of the member screen; RLS and the routes stay the authority (F3) · performance: a signed-out visitor at /settings downloads no sign-in code; /settings renders in the browser, as /account does (no server HTML for a member screen) · failure modes: a session read that fails is turn 34c's (INC-914), as for every requireSignedIn screen · consistency: one door-step for every member screen; one owner of every other route change on the screen · future growth: a new member screen is one import; the census names a screen that gates itself the day it lands.
FORWARD-SCAN: turn 34c (INC-914) reads requireSignedIn's failed read as "unknown"; it now covers /settings too (its roadmap line updated, Part D). REGISTER: row 29's guard and note (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34b-1.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. SO-11 leases one pool account and writes nothing.
- Run no stateful git command. Every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34b-1.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34b-1.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34b-1.report.md (your completion report). src/integrations/supabase/** (platform-generated) is never edited. Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows CF-SIR-1, ASC-3, ASC-4, ASC-5, SBD-18, SBD-19, STC-1 and SO-11 failing on BASE's code, before Part C's edits (S-1's red is CI's, intermittent; it is not reproduced on demand).
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1 and CF-SL-1 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407).
- Behaviour contract: a sign-out the server confirms, every sign-in, every page and every reload for a stale chunk at a page's first failure behave as today; a signed-in visitor's /settings shows what it shows today (drawn in the browser, as /account is). Changed: a signed-out visitor at /settings is sent to sign in (and back) before the screen draws; a sign-out that cannot finish (the client did not load, or the library answers an error) removes the stored session and loads "/" afresh; a sign-in's drop of an expired prior session removes it when the library keeps it; a page reloads for a stale chunk only at its first failed download. Nothing else changes.
- Knowledge K: K1 the mechanisms above; K2 the report lists (file:line) every call that ends this device's session without forgetStoredSession (none may remain but the named exception), every other reload of the page made in answer to a failure (src/ only), and every member screen not behind requireSignedIn (none may remain); K3 ASC-5 and STC-1 land with the mechanisms; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; the existing tests unchanged; SO-11's 120 s budget is named in the test (the library's refresh back-off).
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the newest finished run is 6c445a3e's or 9a3f8713's — green, or red on S-1 alone; BASE's own run may still be queued, or cancelled by this turn's pushes). A red in e2e/settings.spec.ts S-1 alone is INC-923, fixed in Part C (C0) — this brief is its fix; any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The five test files:
EDIT scripts/conformance/signed-in-routes.test.ts #1
OLD-BEGIN
 * import requireSignedIn or carry an allowance. Expected allowances: none.
 */
OLD-END
NEW-BEGIN
 * import requireSignedIn or carry an allowance. Expected allowances: none.
 * INC-923 (Foundations turn 34b-1) — nor does a screen send a signed-out visitor to sign in from its
 * own code (`hasSessionRehydrating(` or a navigate to "/auth"): that raced the screen's other routing
 * (/settings landed on "/"). Only the sign-in screens themselves (a route path under /auth) may.
 */
NEW-END
EDIT scripts/conformance/signed-in-routes.test.ts #2
OLD-BEGIN
    }
    const ssr = code.indexOf("ssr: false");
OLD-END
NEW-BEGIN
    }
    const path = /createFileRoute\("([^"]*)"\)/.exec(code)?.[1] ?? "";
    const ownGate = code.search(/hasSessionRehydrating\(|navigate\(\{\s*to:\s*"\/auth"/);
    if (ownGate !== -1 && !path.startsWith("/auth")) {
      findings.push({
        file: rel,
        line: lineOf(code, ownGate),
        what: "sends to sign in from the screen",
      });
      continue;
    }
    const ssr = code.indexOf("ssr: false");
NEW-END
EDIT scripts/conformance/signed-in-routes.test.ts #3
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("CF-SIR-3 a planted screen that sends to sign in itself is reported; a sign-in screen is not (INC-923)", () => {
    const temp = mkdtempSync(join(tmpdir(), "signed-in-routes-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "planted.tsx"),
      'createFileRoute("/planted")({});\nif (!signedIn) void navigate({ to: "/auth", search: {} });\n',
    );
    writeFileSync(
      join(temp, "rehydrating.tsx"),
      'createFileRoute("/other")({});\nconst signedIn = await hasSessionRehydrating();\n',
    );
    writeFileSync(
      join(temp, "sign-in.tsx"),
      'createFileRoute("/auth")({});\nif (await hasSessionRehydrating()) void navigate({ to: "/auth", search: {} });\n',
    );
    const { findings } = census(temp);
    const at = (name: string) => relative(ROOT, join(temp, name)).split("\\").join("/");
    expect(findings).toEqual([
      { file: at("planted.tsx"), line: 2, what: "sends to sign in from the screen" },
      { file: at("rehydrating.tsx"), line: 2, what: "sends to sign in from the screen" },
    ]);
  });
});
NEW-END
EDIT src/features/auth/auth-client.test.ts #1
OLD-BEGIN
  getSupabase: vi.fn(),
  currentSession: vi.fn(),
}));

OLD-END
NEW-BEGIN
  getSupabase: vi.fn(),
  currentSession: vi.fn(),
  forgetStoredSession: vi.fn(),
}));

NEW-END
EDIT src/features/auth/auth-client.test.ts #2
OLD-BEGIN
  currentSession: () => door.currentSession(),
  storedSessionKey: () => "sb-abcdefghijklmnop-auth-token",
}));

OLD-END
NEW-BEGIN
  currentSession: () => door.currentSession(),
  storedSessionKey: () => "sb-abcdefghijklmnop-auth-token",
  forgetStoredSession: () => door.forgetStoredSession(),
}));

NEW-END
EDIT src/features/auth/auth-client.test.ts #3
OLD-BEGIN
    .mockReset()
    .mockRejectedValue(new TypeError("Failed to fetch dynamically imported module"));
  door.currentSession
    .mockReset()
OLD-END
NEW-BEGIN
    .mockReset()
    .mockRejectedValue(new TypeError("Failed to fetch dynamically imported module"));
  door.forgetStoredSession.mockReset().mockReturnValue(true);
  door.currentSession
    .mockReset()
NEW-END
EDIT src/features/auth/auth-client.test.ts #4
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });
});

describe("a sign-out ends the session on this device whatever the server answers (DEC-268)", () => {
  it("ASC-3 a sign-out that cannot finish still ends the session on this device", async () => {
    // The client did not load: the stored session is removed, and the answer says it failed.
    const unloaded = await service.signOut();
    expect(door.forgetStoredSession).toHaveBeenCalledTimes(1);
    expect(unloaded).toEqual(GENERIC);
    // The server could not be reached (supabase-js answers an error and keeps the session).
    door.forgetStoredSession.mockClear();
    const signOut = vi.fn().mockResolvedValue({
      error: { name: "AuthRetryableFetchError", message: "Failed to fetch", status: 0 },
    });
    door.getSupabase.mockReset().mockResolvedValue({ auth: { signOut } });
    const failed = await service.signOut();
    expect(failed.ok).toBe(false);
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(door.forgetStoredSession).toHaveBeenCalledTimes(1);
    // A sign-out the server confirmed leaves the stored session to supabase-js, which removed it.
    door.forgetStoredSession.mockClear();
    signOut.mockResolvedValue({ error: null });
    expect(await service.signOut()).toEqual({ ok: true });
    expect(door.forgetStoredSession).not.toHaveBeenCalled();
  });

  it("ASC-4 a sign-in that drops an expired prior session drops it from this device when the library keeps it", async () => {
    const key = "sb-abcdefghijklmnop-auth-token";
    const expiredAt = Math.floor(Date.now() / 1000) - 3600;
    window.localStorage.setItem(
      key,
      JSON.stringify({ access_token: "a", refresh_token: "r", expires_at: expiredAt }),
    );
    const unreachable = { name: "AuthRetryableFetchError", message: "Failed to fetch", status: 0 };
    const signOut = vi.fn().mockResolvedValue({ error: unreachable });
    const signInWithPassword = vi
      .fn()
      .mockResolvedValue({ data: { session: null, user: null }, error: unreachable });
    door.getSupabase.mockReset().mockResolvedValue({ auth: { signOut, signInWithPassword } });
    try {
      await service.signInWithPassword({
        email: "nobody@example.test",
        password: "not-a-real-password-1",
      });
      expect(signOut).toHaveBeenCalledWith({ scope: "local" });
      expect(door.forgetStoredSession).toHaveBeenCalledTimes(1);
    } finally {
      window.localStorage.removeItem(key);
    }
  });

  it("ASC-5 every call that ends this device's session forgets the stored session when the library keeps it", () => {
    const text = readFileSync("src/features/auth/auth-service.ts", "utf8");
    // Each top-level function's text, from its declaration to the next one.
    const functions = text.split(/\n(?=(?:export )?(?:async )?function )/);
    // A sign-out of "others" ends no session on this device; every other one does.
    const ending = functions.filter((body) =>
      /\.auth\.signOut\((?!\{ scope: "others" \})/.test(body),
    );
    const names = ending.map((body) => /function (\w+)/.exec(body)?.[1] ?? "?");
    expect(names).toEqual(["evictExpiredSession", "signOut", "currentPasswordProof"]);
    // The one exception: the password check's second client keeps no session on this device
    // (no storage, persistSession false) — its sign-out ends the check, not the person's session.
    const NO_STORED_SESSION = ["currentPasswordProof"];
    for (const [index, body] of ending.entries()) {
      if (NO_STORED_SESSION.includes(names[index] ?? "")) {
        expect(body).toMatch(/persistSession: false/);
        continue;
      }
      expect(body, names[index]).toMatch(/forgetStoredSession\(\)/);
    }
  });
});
NEW-END
EDIT src/lib/supabase-door.test.ts #1
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("SBD-18 DEC-268 — forgetting the stored session removes it and the two items beside it, and nothing else", async () => {
    for (const item of [STORED, `${STORED}-code-verifier`, `${STORED}-user`, "ethio:other"])
      window.localStorage.setItem(item, "{}");
    const { forgetStoredSession, hasStoredSession } = await door();
    expect(forgetStoredSession()).toBe(true);
    expect(Object.keys(window.localStorage)).toEqual(["ethio:other"]);
    expect(hasStoredSession()).toBe(false);
    expect(state.imported).toBe(0);
  });

  it("SBD-19 a framed page's session lives in the editor's broker: forgetting leaves storage alone and says so", async () => {
    window.localStorage.setItem(STORED, "{}");
    const parent = vi.spyOn(window, "parent", "get").mockReturnValue(Object.create(window));
    const { forgetStoredSession } = await door();
    expect(forgetStoredSession()).toBe(false);
    expect(window.localStorage.getItem(STORED)).toBe("{}");
    parent.mockRestore();
  });
});
NEW-END
EDIT src/lib/stale-chunk.test.ts #1
OLD-BEGIN

  it("still reloads once per page when storage is refused", () => {
OLD-END
NEW-BEGIN

  it("STC-1 a page whose first failure came within the window is never reloaded by a later one (INC-922)", () => {
    const storage = new Map<string, string>([[STALE_CHUNK_KEY, "1000"]]);
    let clock = 1_000 + 2_000;
    const { win, fire, reloads } = fakeWindow(storage);
    reloadOnStaleChunk(win, () => clock);
    // The page that came back from the reload fails at once: left to surface.
    expect(fire().defaultPrevented).toBe(false);
    // More than a minute later, a submit's download fails again: the form is not thrown away.
    clock = 1_000 + STALE_CHUNK_WINDOW_MS + 10_000;
    const later = fire();
    expect(reloads()).toBe(0);
    expect(later.defaultPrevented).toBe(false);
  });

  it("still reloads once per page when storage is refused", () => {
NEW-END
EDIT e2e/auth-signout.spec.ts #1
OLD-BEGIN
  signIn,
  signInViaSession,
  signOutViaUi,
  signedInMarker,
OLD-END
NEW-BEGIN
  signIn,
  signInViaSession,
  signInMarker,
  signOutViaUi,
  signedInMarker,
NEW-END
EDIT e2e/auth-signout.spec.ts #2
OLD-BEGIN
    expect(survivors, "auth-derived queries survived the hard reset").toEqual([]);
  });
});

OLD-END
NEW-BEGIN
    expect(survivors, "auth-derived queries survived the hard reset").toEqual([]);
  });

  test("SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268)", async ({
    page,
  }) => {
    // supabase-js retries a refused token refresh with back-off for up to about 30 s before
    // the sign-out answers (auth-js GoTrueClient's refresh retry): that wait is this test's time.
    test.setTimeout(120_000);
    const user = await leaseUser();
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/settings");
    // The access token has run out and the auth server cannot be reached.
    await page.route("**/auth/v1/**", (route) => route.abort("failed"));
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find(
        (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
      );
      if (!key) throw new Error("no persisted supabase session found");
      const session = JSON.parse(localStorage.getItem(key) ?? "{}") as { expires_at?: number };
      session.expires_at = Math.floor(Date.now() / 1000) - 3600;
      localStorage.setItem(key, JSON.stringify(session));
    });
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
      await page.getByTestId("account-menu-sign-out").click();
    } else {
      await page.getByTestId("app-rail").getByTestId("rail-sign-out").click();
    }
    await expect(page).toHaveURL(/\/$/, { timeout: 60_000 });
    await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    expect(
      await page.evaluate(() =>
        Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token")),
      ),
      "the stored session is gone from this device",
    ).toBe(false);
    // The network is back: a fresh load of the page is still signed out.
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await gotoReady(page, "/");
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });
});

NEW-END
B2. Run `bunx vitest run scripts/conformance/signed-in-routes.test.ts src/features/auth/auth-client.test.ts src/lib/supabase-door.test.ts src/lib/stale-chunk.test.ts` — exactly seven fail, every other test in the four files passes: CF-SIR-1 (`+ src/routes/settings.tsx:164 sends to sign in from the screen`), ASC-3 and ASC-4 (`expected "vi.fn()" to be called 1 times, but got 0 times`), ASC-5 (`evictExpiredSession: expected 'async function evictExpiredSession(su…' to match /forgetStoredSession\(\)/`), SBD-18 and SBD-19 (`forgetStoredSession is not a function`), STC-1 (`expected 1 to be +0`) — paste the failure lines and the totals (the supervisor's run on BASE: 7 failed, 26 passed). Run `bun run e2e:local -- e2e/auth-signout.spec.ts --grep "SO-11 "`: it is expected to fail on both projects — the supervisor's reading of BASE, not a run (the supervisor's workspace cannot reach the staging project): the stored session stays, so the sign-in button never shows — paste the failure lines. If SO-11 passes on BASE, STOP: the test does not reach its case; paste the run.

PART C — /SETTINGS'S DOOR-STEP, THE SIGN-OUT AND THE STALE-CHUNK RELOAD.
C0. /settings onto requireSignedIn (INC-923 — the red, first):
EDIT src/routes/settings.tsx #1
OLD-BEGIN
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

OLD-END
NEW-BEGIN
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";

NEW-END
EDIT src/routes/settings.tsx #2
OLD-BEGIN
  hasPassword,
  hasSessionRehydrating,
  linkGoogleIdentity,
OLD-END
NEW-BEGIN
  hasPassword,
  linkGoogleIdentity,
NEW-END
EDIT src/routes/settings.tsx #3
OLD-BEGIN
import { useAuth } from "@/features/auth/use-auth";
import { getSupabase } from "@/lib/supabase-door";
OLD-END
NEW-BEGIN
import { useAuth } from "@/features/auth/use-auth";
import { requireSignedIn } from "@/lib/signed-in-route";
import { getSupabase } from "@/lib/supabase-door";
NEW-END
EDIT src/routes/settings.tsx #4
OLD-BEGIN
export const Route = createFileRoute("/settings")({
  head: () => ({
OLD-END
NEW-BEGIN
export const Route = createFileRoute("/settings")({
  // INC-923 (Foundations turn 34b-1) — a signed-in screen's door-step, as /account's: a signed-out
  // visitor goes to sign in and comes back here, before the screen draws (INC-852).
  ssr: false,
  beforeLoad: async () => {
    await requireSignedIn("/settings");
  },
  head: () => ({
NEW-END
EDIT src/routes/settings.tsx #5
OLD-BEGIN
   * shell's hard reset alone, never to a page bootstrap.
   */
  const hadSession = useRef(false);

  useEffect(() => {
OLD-END
NEW-BEGIN
   * shell's hard reset alone, never to a page bootstrap.
   *
   * INC-923 (Foundations turn 34b-1) — nor the sign-in: a signed-out visitor never reaches this
   * screen (the route's door-step is requireSignedIn). This screen's own send to /auth raced the
   * live guard's "/" above, and lost whenever the sign-in code's download was slow.
   */
  useEffect(() => {
NEW-END
EDIT src/routes/settings.tsx #6
OLD-BEGIN
    void (async () => {
      if (user === null) {
        // Signed out AFTER having a session: the shell hard reset owns "/".
        if (hadSession.current) return;
        const signedIn = await hasSessionRehydrating();
        if (!active || hadSession.current) return;
        if (!signedIn) void navigate({ to: "/auth", search: {} });
        return;
      }
      hadSession.current = true;
      // INC-915 — a failed download leaves member-since unknown and ends the session check.
OLD-END
NEW-BEGIN
    void (async () => {
      if (user === null) return;
      // INC-915 — a failed download leaves member-since unknown and ends the session check.
NEW-END
EDIT src/routes/settings.tsx #7
OLD-BEGIN
    };
  }, [authLoading, user, navigate]);

OLD-END
NEW-BEGIN
    };
  }, [authLoading, user]);

NEW-END
C1. The door's forgetting:
EDIT src/lib/supabase-door.ts #1
OLD-BEGIN

/** The client's onAuthStateChange, without fetching the client for a signed-out visitor. */
OLD-END
NEW-BEGIN

/**
 * Foundations turn 34b-1 (DEC-268) — A SIGN-OUT ENDS THE SESSION ON THIS DEVICE, whatever
 * the server answered. Removes this project's stored session, and the two items the client keeps
 * beside it, from the browser's storage, where the client reads its session on every call
 * (supabase-js keeps none in memory with persistSession). For the sign-out that could not finish
 * (src/features/auth/auth-service.ts signOut): the client then holds no session, and a page load
 * reads none. A framed page (the editor's preview) keeps its session in the editor's broker,
 * which this does not reach; a visitor's page is never framed. Answers whether it removed it.
 */
export function forgetStoredSession(): boolean {
  if (typeof window === "undefined" || framed()) return false;
  const key = storedSessionKey();
  if (key === null) return false;
  try {
    for (const item of [key, `${key}-code-verifier`, `${key}-user`])
      window.localStorage.removeItem(item);
    return true;
  } catch {
    return false;
  }
}

/** The client's onAuthStateChange, without fetching the client for a signed-out visitor. */
NEW-END
C2. auth-service — signOut and the sign-in's eviction:
EDIT src/features/auth/auth-service.ts #1
OLD-BEGIN
import { safeReturnPath } from "@/lib/return-path";
import { currentSession, getSupabase, storedSessionKey } from "@/lib/supabase-door";

OLD-END
NEW-BEGIN
import { safeReturnPath } from "@/lib/return-path";
import {
  currentSession,
  forgetStoredSession,
  getSupabase,
  storedSessionKey,
} from "@/lib/supabase-door";

NEW-END
EDIT src/features/auth/auth-service.ts #2
OLD-BEGIN
 * can land after the new one. `scope: "local"` only: this browser's stale
 * token is the problem, the user's other devices are not.
 */
OLD-END
NEW-BEGIN
 * can land after the new one. `scope: "local"` only: this browser's stale
 * token is the problem, the user's other devices are not. DEC-268 (Foundations
 * turn 34b-1): when the library answers an error or throws, this device drops
 * the stored session itself (the door's forgetStoredSession), as signOut does.
 */
NEW-END
EDIT src/features/auth/auth-service.ts #3
OLD-BEGIN
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    /* Best effort: the storage clear below is the part that matters. */
  }
OLD-END
NEW-BEGIN
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) forgetStoredSession();
  } catch {
    forgetStoredSession();
  }
NEW-END
EDIT src/features/auth/auth-service.ts #4
OLD-BEGIN
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  const { error } = await supabase.auth.signOut();
  if (error) return failure(error);
  return { ok: true };
OLD-END
NEW-BEGIN
  const supabase = await authClient();
  // DEC-268 (Foundations turn 34b-1) — the session ends on this device whatever the answer: a
  // sign-out that could not reach the server, or whose client did not load, removes the stored
  // session itself, and answers its failure so the shell reloads to read that.
  if (supabase === null) {
    forgetStoredSession();
    return CLIENT_FAILED;
  }
  const { error } = await supabase.auth.signOut();
  if (error) {
    forgetStoredSession();
    return failure(error);
  }
  return { ok: true };
NEW-END
C3. The shell's hard reset reads the answer:
EDIT src/components/app-shell.tsx #1
OLD-BEGIN
   *   (e) replace-navigate to "/" so Back cannot re-enter a gated page.
   *
OLD-END
NEW-BEGIN
   *   (e) replace-navigate to "/" so Back cannot re-enter a gated page.
   * DEC-268 (Foundations turn 34b-1): when (a) answers a failure, the session is already gone from
   * this device (auth-service's signOut removed it) and the page loads "/" afresh.
   *
NEW-END
EDIT src/components/app-shell.tsx #2
OLD-BEGIN
      setNavOpen(false);
      try {
        await signOut();
        // (2) macrotask boundary: React commits the unmount before the purge.
OLD-END
NEW-BEGIN
      setNavOpen(false);
      let reloading = false;
      try {
        const answer = await signOut();
        if (!answer.ok) {
          reloading = true;
          // DEC-268 (Foundations turn 34b-1) — the server did not confirm, but the session is gone
          // from this device (auth-service's signOut removed it); a full load to "/" reads that
          // afresh, so no screen, cache or listener of the old session survives.
          clearSessionClocks();
          window.location.replace("/");
          return;
        }
        // (2) macrotask boundary: React commits the unmount before the purge.
NEW-END
EDIT src/components/app-shell.tsx #3
OLD-BEGIN
      } finally {
        setSigningOut(false);
      }
OLD-END
NEW-BEGIN
      } finally {
        // A reloading page stays signed-out until it goes: no frame of the old account.
        if (!reloading) setSigningOut(false);
      }
NEW-END
EDIT scripts/conformance/auth-answers-allowlist.txt #1
OLD-BEGIN
src/components/app-shell.tsx:signOut | the deliberate sign-out's hard reset: supabase-js removes the stored session whatever the server answers (auth-js GoTrueClient _signOut), so the reset that follows is true on this device; a sign-out the server did not record leaves its refresh token to expire on its own | DEC-267
src/features/auth/use-auth.ts:signOut | a deactivated account's sign-out (D189): the user is cleared whatever it answers, the stored session goes as above, and every door refuses the account (F3) | DEC-267
OLD-END
NEW-BEGIN
src/features/auth/use-auth.ts:signOut | a deactivated account's sign-out (D189): the user is cleared whatever it answers, the stored session goes with it on this device whatever the server answers (DEC-268: auth-service's signOut removes it itself), and every door refuses the account (F3) | DEC-268
NEW-END
C4. The stale-chunk reload (INC-922):
EDIT src/lib/stale-chunk.ts #1
OLD-BEGIN
 * best-effort: a browser that refuses storage still reloads once per page life.
 */
OLD-END
NEW-BEGIN
 * best-effort: a browser that refuses storage still reloads once per page life.
 * INC-922 (Foundations turn 34b-1; turn 34's reviewer, MAJOR 3) — only a page's
 * FIRST failed download may reload it: a page whose first failure was left to
 * surface (it came within the minute) is never reloaded by a later one, so a
 * form the person has been filling for more than a minute is not thrown away;
 * that failure is left to the piece that asked for the download to answer.
 */
NEW-END
EDIT src/lib/stale-chunk.ts #2
OLD-BEGIN
/**
 * Installs the handler; returns the uninstaller. `reloadedInPage` guards the
 * case where storage is refused: one reload per page life, never a loop.
 */
OLD-END
NEW-BEGIN
/**
 * Installs the handler; returns the uninstaller. `failedInPage` lets only the
 * page's first failure reload it — one reload per page life, never a loop, also
 * where storage is refused.
 */
NEW-END
EDIT src/lib/stale-chunk.ts #3
OLD-BEGIN
): () => void {
  let reloadedInPage = false;
  const onPreloadError = (event: Event) => {
    const at = now();
    if (reloadedInPage || reloadedRecently(win, at)) return;
    reloadedInPage = true;
    try {
OLD-END
NEW-BEGIN
): () => void {
  let failedInPage = false;
  const onPreloadError = (event: Event) => {
    const at = now();
    const first = !failedInPage;
    failedInPage = true;
    if (!first || reloadedRecently(win, at)) return;
    try {
NEW-END
C5. Read /tmp/observability/build-errors.log (no `error TS` line); `bunx vitest run src/features/auth src/lib/supabase-door.test.ts src/lib/stale-chunk.test.ts scripts/conformance/signed-in-routes.test.ts scripts/conformance/auth-answers.test.ts scripts/conformance/vendor-seams.test.ts` — every test passes (paste the totals); `bun run e2e:local -- e2e/auth-signout.spec.ts --grep "SO-11 "` — 2 passed; `bun run e2e:local -- e2e/settings.spec.ts --grep "S-1: "` — 2 passed (paste the count lines).

PART D — DOCS AND THE ROADMAP.
D1. These edits (the register's rows 50 and 29; the roadmap: line 3 names this brief and drops the text left over from ruling 2's title; turn 34 ticked with its closing run (K1's tick waits for CI's verdict on it: the next brief); turn 34b becomes 34b-1, 34b-2 and 34b-3; turn 34c's line names requireSignedIn for /settings):
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 29 | A signed-in screen's door-step | `src/lib/signed-in-route.ts` requireSignedIn | signed-in-routes.test.ts | none | a new screen is one import | INC-852 |
OLD-END
NEW-BEGIN
| 29 | A signed-in screen's door-step | `src/lib/signed-in-route.ts` requireSignedIn | signed-in-routes.test.ts (CF-SIR-1…3: no route reads the session itself; ssr: false implies requireSignedIn; no screen but the sign-in screens sends to sign in from its own code — INC-923) | none | a new screen is one import | INC-852; /settings onto it in Foundations turn 34b-1 (INC-923) |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 50 | The Supabase client (sign-in, the session, database calls) waits for a session and never rides a public page's first download (D234, DEC-261) | `src/lib/supabase-door.ts` — `getSupabase` (loadOnce), `hasStoredSession` and `storedSessionKey` (the client's own storage key; a framed page counts), `onAuthChange` (the client's `onAuthStateChange`; `INITIAL_SESSION` null for a signed-out visitor), `currentSession` (never rejects), `rpc` (the anonymous PostgREST call for a signed-out visitor, the client's own otherwise) — never rejects where the client's own call did not; auth-service's authClient() (INC-915); `src/lib/session-bearer.ts` (the route calls' bearer, registered in `src/start.ts`) | `src/lib/supabase-door.test.ts` (SBD-1…17); `src/features/auth/auth-client.test.ts` (ASC-1, ASC-2); `src/lib/session-bearer.test.ts` (SBB-1…3); `MUST_NOT_CARRY` + BC-13 (`scripts/bundle-closure.mjs`, `scripts/check-bundle-size.mjs`); the weight guard's FORBIDDEN and FORBIDDEN_FILES (walked from `src/start.ts` too); vendor-seams VS-1 (the door is a seam); `e2e/supabase-door.spec.ts` (SBE-1…5); `scripts/conformance/auth-answers.test.ts` (AAN-1/2: every auth action's answer read where it is called; two sign-outs excepted by DEC-267, ruling 3) | the files still frozen in the vendor-seams allowlist (INC-877) import the client directly — signed-in and staff screens, never a public page (`MUST_NOT_CARRY` judges) | a new database call from code a public page draws is one `rpc()`; a new auth listener one `onAuthChange()`; a new sign-in screen warms the client once painted | the E2E build hands the client to the harness at mount unless a test's init script sets `__ethioClientOff` (SBE); a signed-out listener can hear `INITIAL_SESSION` twice (null, then the client's own); Foundations turn 34 |
OLD-END
NEW-BEGIN
| 50 | The Supabase client (sign-in, the session, database calls) waits for a session and never rides a public page's first download (D234, DEC-261) | `src/lib/supabase-door.ts` — `getSupabase` (loadOnce), `hasStoredSession` and `storedSessionKey` (the client's own storage key; a framed page counts), `forgetStoredSession` (DEC-268: a sign-out that could not finish removes the stored session from this device — not in the editor's preview frame), `onAuthChange` (the client's `onAuthStateChange`; `INITIAL_SESSION` null for a signed-out visitor), `currentSession` (never rejects), `rpc` (the anonymous PostgREST call for a signed-out visitor, the client's own otherwise) — never rejects where the client's own call did not; auth-service's authClient() (INC-915); `src/lib/session-bearer.ts` (the route calls' bearer, registered in `src/start.ts`) | `src/lib/supabase-door.test.ts` (SBD-1…17); `src/features/auth/auth-client.test.ts` (ASC-1, ASC-2); `src/lib/session-bearer.test.ts` (SBB-1…3); `MUST_NOT_CARRY` + BC-13 (`scripts/bundle-closure.mjs`, `scripts/check-bundle-size.mjs`); the weight guard's FORBIDDEN and FORBIDDEN_FILES (walked from `src/start.ts` too); vendor-seams VS-1 (the door is a seam); `e2e/supabase-door.spec.ts` (SBE-1…5); `scripts/conformance/auth-answers.test.ts` (AAN-1/2: every auth action's answer read where it is called; a deactivated account's sign-out excepted, DEC-268; ASC-3, SBD-18/19, SO-11 — a sign-out ends the session on this device whatever the server answers) | the files still frozen in the vendor-seams allowlist (INC-877) import the client directly — signed-in and staff screens, never a public page (`MUST_NOT_CARRY` judges) | a new database call from code a public page draws is one `rpc()`; a new auth listener one `onAuthChange()`; a new sign-in screen warms the client once painted | the E2E build hands the client to the harness at mount unless a test's init script sets `__ethioClientOff` (SBE); a signed-out listener can hear `INITIAL_SESSION` twice (null, then the client's own); Foundations turn 34 |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34, ruling 3 (2026-10-26) — INC-915 continued: Forgot password says a request that never left the browser failed, gives back its try and cooldown, and no longer claims a link is on its way; one census reads every auth action's answer where it is called (scripts/conformance/auth-answers.test.ts, AAN-1/2; the two sign-outs that discard it on purpose, by DEC-267); SBE-4 and SBE-5 wait for the app's one reload for a failed chunk (INC-640) before they type; DEC-266's stated cost corrected (up to about 2.3 s on a slow listings page) and its judge given a time-to-interactive measure in the speed study, moved before turns 35–37.
OLD-END
NEW-BEGIN
- Foundations turn 34, ruling 3 (2026-10-26) — INC-915 continued: Forgot password says a request that never left the browser failed, gives back its try and cooldown, and no longer claims a link is on its way; one census reads every auth action's answer where it is called (scripts/conformance/auth-answers.test.ts, AAN-1/2; the two sign-outs that discard it on purpose, by DEC-267); SBE-4 and SBE-5 wait for the app's one reload for a failed chunk (INC-640) before they type; DEC-266's stated cost corrected (up to about 2.3 s on a slow listings page) and its judge given a time-to-interactive measure in the speed study, moved before turns 35–37.

- Foundations turn 34b-1 (2026-10-26) — DEC-268: a sign-out ends the session on this device whatever the server answers — auth-service's signOut removes the stored session itself when it cannot finish (the door's forgetStoredSession) and the shell loads "/" afresh; DEC-267's sign-out allowance retired. INC-922: the reload for a stale chunk (INC-640) answers only a page's first failed download, so a form filled for more than a minute is not thrown away (turn 34's reviewer). INC-923: /settings's door-step is requireSignedIn, as /account's — a signed-out visitor no longer races the screen's own send to sign in against its live guard's "/" (CI's S-1 landed on "/"), and the census refuses a screen that sends to sign in from its own code (CF-SIR-3). ASC-3…5, SBD-18/19, STC-1, CF-SIR-3, SO-11.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
The brief in force: docs/governance/briefs/foundations-turn-k1-r5.md (Foundations turn K1, ruling 5 in brief form: data is inert only where its consumer never runs it — INC-920, DEC-270)" closes no substitution; a heredoc ends where the shell ends it — INC-920 continued). Next: the remaining Foundations bundle (DEC-237 — before bundle 23): the route boundary, the form kit, the AI gateway, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals; turn 34 — the sign-in/sign-up scenario census; then bundle 23 — the business-name rule (D222) after reserved-names v5.2, and Stage 1's last part (the banned-items and safety pages after the curator's research); the Afaan Oromo legal texts added to the in-force versions by the operator; before launch a real phone number replaces the placeholder in the legal facts, published as a Correction, and the privacy-request inbox (D229, spec owed); the flake-and-cleanup rest; D199 (discount / sale) after the peer research and the operator's rulings; D200's state. Before Stage 2: the operator's major UI redesign — the Sage 3D look and feel and the left rail's new behaviour (the operator, 2026-10-22; his design files of 2026-10-25; the display face decided then, a DEC owed — a brand face returns only as one self-hosted, subset, non-blocking file through the CF-FT allowlist); the supervisor reminds him before the next stage starts.
OLD-END
NEW-BEGIN
The brief in force: docs/governance/briefs/foundations-turn-34b-1.md (Foundations turn 34b-1: a sign-out ends the session on this device whatever the server answers — DEC-268; the reload for a stale chunk answers only a page's first failed download — INC-922). Next: the remaining Foundations bundle (DEC-237 — before bundle 23): the route boundary, the form kit, the AI gateway, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals; turn 34 — the sign-in/sign-up scenario census; then bundle 23 — the business-name rule (D222) after reserved-names v5.2, and Stage 1's last part (the banned-items and safety pages after the curator's research); the Afaan Oromo legal texts added to the in-force versions by the operator; before launch a real phone number replaces the placeholder in the legal facts, published as a Correction, and the privacy-request inbox (D229, spec owed); the flake-and-cleanup rest; D199 (discount / sale) after the peer research and the operator's rulings; D200's state. Before Stage 2: the operator's major UI redesign — the Sage 3D look and feel and the left rail's new behaviour (the operator, 2026-10-22; his design files of 2026-10-25; the display face decided then, a DEC owed — a brand face returns only as one self-hosted, subset, non-blocking file through the CF-FT allowlist); the supervisor reminds him before the next stage starts.
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Turn 34 (docs/governance/briefs/foundations-turn-34.md; no migration; the Claude Code executor) — speed S11: the Supabase client off every public page's first download (DEC-261) — one door, src/lib/supabase-door.ts (getSupabase on loadOnce; onAuthChange, currentSession and rpc answer a signed-out visitor without the client), the route calls' bearer through src/lib/session-bearer.ts; twenty first-paint modules onto it; MUST_NOT_CARRY (BC-13) and the weight guard; SBD-1…13, SBE-1…2. Frozen rule: at least 45 KiB off the entry closure (the supervisor's build: 254.0 → 203.6 KiB), every sign-in, sign-up, callback and session test green in CI, AP-54 holding.
OLD-END
NEW-BEGIN
  - [x] Turn 34 (docs/governance/briefs/foundations-turn-34.md; no migration; the Claude Code executor) — speed S11: the Supabase client off every public page's first download (DEC-261) — one door, src/lib/supabase-door.ts (getSupabase on loadOnce; onAuthChange, currentSession and rpc answer a signed-out visitor without the client), the route calls' bearer through src/lib/session-bearer.ts; twenty first-paint modules onto it; MUST_NOT_CARRY (BC-13) and the weight guard; SBD-1…13, SBE-1…2. Frozen rule: at least 45 KiB off the entry closure (the supervisor's build: 254.0 → 203.6 KiB), every sign-in, sign-up, callback and session test green in CI, AP-54 holding. Final HEAD e024c36e; CI run 40296745791: SUCCESS, and main promoted; the entry 254.0 → 204.1 KiB (the frozen rule held); unit 311 files / 1937 passed; rulings 2 and 3 (INC-915, DEC-267). The reviewer's four MAJORs: 1 and 2 to turn 34c; 3 (INC-922) and 4 (DEC-268) to turn 34b-1.
NEW-END
EDIT roadmap.md #3
OLD-BEGIN
  - [ ] Turn 34b — a failed on-demand download is surfaced to the person, every consumer (INC-911): the step-up gate reports a dialog whose code failed as unavailable, not as cancelled (step-up-gate.tsx :45-:47, use-step-up.ts :75, :89); the map preview logs its failure (map-preview.tsx :108) and the large map shows one (map-large.tsx :73); the footer's silent catch (use-footer-inset.ts :100, INC-909); OVF-19 (an uncontrolled root's listener hears true, then false, then true again); no stale `false` once the owner has closed or reopened; OVF-17 and OVF-18 re-assert the trigger's closed state; the colour reader applies its alpha rule to rgba() too (INC-910's sibling). From turn 32b's reviewer and K2.
OLD-END
NEW-BEGIN
  - [ ] Turn 34b-1 (docs/governance/briefs/foundations-turn-34b-1.md; no migration; Lovable) — DEC-268: a sign-out ends the session on this device whatever the server answers — the door's forgetStoredSession; auth-service's signOut and the sign-in's eviction of an expired prior session forget the stored session when the library keeps it; the shell loads "/" afresh after a sign-out that could not finish; DEC-267's sign-out allowance retired (ASC-3…5, SBD-18/19, SO-11); INC-922: the reload for a stale chunk answers only a page's first failed download (STC-1; turn 34's reviewer, MAJOR 3); INC-923: /settings's door-step is requireSignedIn (ssr: false, as /account) — its own send to sign in raced its live guard's "/" (CI's S-1 on 9a3f8713); the census refuses a screen that sends to sign in from its own code (CF-SIR-3).
  - [ ] Turn 34b-2 — a piece fetched on demand whose download fails tells the person and offers a refresh (INC-911, INC-918): the mechanism (src/lib/on-demand-failure.ts; the shell's one notice and LoadFailedHere, src/components/shell/on-demand-notice.tsx; two strings, common.loadFailed and common.refreshPage); resilientLazy reports (`inPlace` for a fallback that says so itself); the guard ODC-1…3 with an allowlist naming every consumer not yet on it, each with its expiry; the overlay facades (`onUnavailable`) and the step-up gate (StepUpUnavailable: step-up-gate.tsx :45-:47, use-step-up.ts :75, :89); ODE-1.
  - [ ] Turn 34b-3 — every remaining on-demand consumer onto the mechanism, the allowlist down to its four permanent lines: the maps (map-preview.tsx :108, map-large.tsx :73), the pin map (LoadFailedHere — no "Tap the map instead" with no map), the ad page's map links, the category glyphs, the calendar, the strings gate, the phone box (Refresh), settings, the account read and the strings provider (INC-919: a failed language download is no longer an unhandled rejection); every "Try again" for a download becomes Refresh and every comment that promises a retry is corrected (INC-918); the footer's silent catch (use-footer-inset.ts :100, INC-909).
NEW-END
EDIT roadmap.md #4
OLD-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15) and settings' hasSessionRehydrating as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3).
OLD-END
NEW-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15; /settings's door-step since turn 34b-1, INC-923) as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3).
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34b-1.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 311 files, 1948 tests, every one passed); `bun run i18n:map-guard`; `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
781e5ad40cd8e6ab0dd5fe3e6dc26bcbc6614dc182da1076bf2212d6383b6897  docs/_changelog.md
bfffcb50eafbf4a8f9c975150bb688e6123cb95702c128980d691a9022bdc4e7  docs/governance/mechanisms.md
47ef4414940bf48d6104d2f6178f2b8fe5d8c255882c32f92ab439df0901fd4b  e2e/auth-signout.spec.ts
e4d3349fead6676a5f8406b3a29bb0401e942d12b3fcac9d1f7c762b8db1876b  scripts/conformance/auth-answers-allowlist.txt
743b4c9c6e2d2dbd78bc4ec774ddcf5e98f1a2f83a702218506a5b2aacb99d3d  scripts/conformance/signed-in-routes.test.ts
7023f183c13277ccafc1bca54d398ff76a963da07f78323cdcf2b2bd48001f5b  src/components/app-shell.tsx
0f7324a3f14f2a7785f7dcfef1f7e6502a052f1280fdc6c714872e2260533454  src/features/auth/auth-client.test.ts
4ab763786b91fbf192d08c490dd6244d335b316346fbb3a9bd0e431389561267  src/features/auth/auth-service.ts
e0c8dafff9c78c72b3223d651bb4e2784a3d75c3ce130ed38522807039b2394a  src/lib/stale-chunk.test.ts
a5725ecad59a303213ff290d62a1483c99e3bbf955f4020035ddab56bf793055  src/lib/stale-chunk.ts
88782b391e9eb296ea574875e4c06abce4aa245e64454cddd5ac3fd20ba1d400  src/lib/supabase-door.test.ts
5b28bd09a03b87339d4083729cc0774bca3f076064c4ceb85781b4d41dab54df  src/lib/supabase-door.ts
c621313c523c338e1cef1e0b8dae3402896d26fe7cae582515e493d5dcd619c2  src/routes/settings.tsx

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/settings.spec.ts whole; e2e/auth-signout.spec.ts whole; e2e/auth-signin-errors.spec.ts whole (B-5: one sign-in after an expired prior session); e2e/smoke-auth-i18n.spec.ts whole; e2e/supabase-door.spec.ts whole; e2e/mfa-stepup.spec.ts whole; e2e/breadcrumbs.spec.ts whole; e2e/layout.spec.ts whole; e2e/legal-accept.spec.ts `--grep "LAC-3 "`; e2e/phone-frame.spec.ts `--grep "pool user routes fit"`; e2e/auth-reset.spec.ts `--grep "R-9: "`; e2e/shell.spec.ts `--grep "/settings shows the Account context|FF-1 |location row is present on Marketplace|no Settings item leaks|the posting wizard keeps the frame"` (every spec that opens /settings); paste every count line.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34b-1.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract — a signed-out visitor at /settings, a sign-out the server confirms, a sign-out that cannot reach it, a sign-out whose client did not load, a sign-in after an expired prior session, a page's second failed download — before → after; the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); the allowlist's lines before → after; "none" for strings and migrations; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): INC-923's fix (/settings drawn in the browser behind requireSignedIn, as /account; the census rule); DEC-268 (a sign-out ends the session on this device whatever the server answers; the sign-in's eviction forgets alike; the shell reloads "/" after a sign-out that could not finish; DEC-267's sign-out allowance retired); INC-922's rule (a page reloads for a stale chunk only at its first failed download); turn 34b split in three, the sign-out first.
```

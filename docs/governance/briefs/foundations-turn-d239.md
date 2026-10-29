# Foundations turn D239 — brief

## The plan (at d2e3a9f7)

````markdown
# D239 — Signing in switches the site to the account's language (plan only)

Base: dev 9b8a8cdc. Tier A (the sign-in flow, Knowledge I5: the supervisor drafts the DEC from the facts below).

## 0. CI first

- Newest completed run in ci-evidence: `e150cc6e`, FAILURE. Every job in ci-status.md passed except "E2E (Playwright, ethio-staging)". That job follows from the lanes, and its cause is Lane smoke (INC-993), which 9b8a8cdc fixes.
- The run on 9b8a8cdc had not landed when this plan was written. The build's first step is to read it. Any red there is fixed at its root before D239 work starts.

## 1. Today's precedence (file:line)

The one mechanism is `I18nProvider` in `src/i18n/provider.tsx`.

| What | Where | Read / write |
|---|---|---|
| Current choice ("last used") | localStorage `ethio.lang` (`LANGUAGE_STORAGE_KEY`, :40) | written by `setLanguage` :406–:420; read at boot :470–:476 |
| Device star | localStorage `ethio.lang.star` + cookie `ethio_lang_star` (:53–:55) | `readDeviceStar` :77 (storage first, then cookie); `writeDeviceStar` :96–:108 |
| Boot precedence | :455–:477 | URL override ▸ device star ▸ last used ▸ base |
| Account `preferred_language` | `fetchPreferredLanguage` (`auth-service.ts` :705–:725, a `profiles` select) and `savePreferredLanguage` (:731–:746, the `user_set_preferred_language` RPC, publication-gated in the database) | read by the account-carry effect `provider.tsx` :492–:517; written only by `setStar` :436–:452 |
| Account carry (U4h) | :492–:517 | runs once per user id (`carriedForRef`) and **only when there is no device star**: it applies the account's code and writes it as the device star |
| Gate reconcile | :523–:540 | once the gate answers, an unpublished active language falls back to base, and an unpublished star is cleared |
| Server first paint | `src/routes/__root.tsx` :163 (`getCookie(LANGUAGE_STAR_COOKIE)`), then `serverShellLanguage` | the cookie only |
| Session identity | `useAuthIdentity` :264–:292 | `onAuthChange` mirrors `userId` with no Supabase call (I5) and settles on a macrotask hop |

What each way in does today:
- **E-mail sign-in, sign-up, Google (OAuth return), the Telegram flow, magic and confirmation links (`verifyOtp`/`setSession`, `auth-service.ts` :537–:580), a session restored at reload, a token refresh:** none of them touch the language. Each fires an auth event, `userId` changes, and the carry effect runs once for that user id. A token refresh keeps the same id, so the latch makes it a no-op. Because the carry only fills a device with no star, an account's language **never** replaces a device that has a star (the U4h comment at `auth-service.ts` :696–:705).
- **Picking a language (D237 / INC-851):** the menu pick calls `setStar`, which writes the star, the cookie and the current choice, and saves to the account when signed in. A signed-out pick goes as far as the RPC wrapper and comes back as "no session" with no write. **That is already the D239 rule.**
- **An account with no language:** today nothing is saved. The carry reads `null` and returns. The account is written only by a pick. The brief's "the device's current choice is saved to the account, *as today*" does not match the code: that save is new behaviour, and it needs a ruling (Q1).
- **Sign-out:** `userId` becomes `null` and the latch is released. The star, cookie and current choice stay, so the language does not change.
- **Cross-tab:** the provider has no `storage` listener. `supabase-door.ts` :325 only loads the client when another tab signs in. An open tab keeps its language until it reloads. A new tab or a reload reads the star. **"every open tab follows" is not met today**, for a pick or for a sign-in.
- **Staff impersonation:** `begin_impersonation` opens a read-only view for the staff member's own session (DEC-016; full view-as-user is still DEC-021, `en-admin.ts` :1966). No session is swapped and no auth event fires, so the staff member's device language does not change when the view starts or ends. The build re-checks this by reading the impersonation route before writing the test.

## 2. The one change

D239 goes in **one place**: the account-carry effect (`provider.tsx` :492–:517), renamed in its comment to "the account rule (D239)". No sign-in door changes. Every door reaches the rule the way it does today: through the auth event, `userId`, then the effect.

The new rule, run once per signed-in user id, after the gate answers:
1. Read the account's code (`fetchPreferredLanguage`).
2. **The read failed** (no session, client did not load, error): keep the device's choice, log one named line, and change nothing. The page is never blank and never shows key names.
3. **The code is set and on the gate's list:** call `setStar(code)` without the account save. That writes the star (localStorage + cookie) and the current choice, and switches the language. The device star no longer blocks the account (U4h's "star wins" is removed).
4. **The code is set but not on the gate's list:** the device choice stays and the account is **not** written. The preference applies at the first sign-in after that language is published. This needs a new wait on `gateReady`; today the carry does not wait for the gate.
5. **The code is null:** save the device's current language to the account (`savePreferredLanguage`), only if it is on the list. This is new behaviour; see Q1.

**Session start only, or every restore?** Recommendation: **session start only**, meaning the first auth identity per page load and each new sign-in, under the existing user-id latch. A reload is a new page load, so it does apply. The reason: a reload re-reading the account would undo a signed-out pick made before the session was restored. That cannot happen while signed in, because a signed-in pick writes the account too. So a reload is safe, and a token refresh (same id, latch held) is excluded. Net effect: sign-in, sign-up, every link type, Google, Telegram and a reload all apply the rule; a token refresh never does.

**Cross-tab:** add one `storage` listener in the same provider for `ethio.lang.star`. When another tab writes the star, this tab calls `setLanguageState(code)` after the same shape and gate checks, with no account write. This makes D237's "every tab follows" literally true for picks and for D239 switches. No second mechanism is added.

**No flash of the wrong language:**
- Server first paint already renders from the star cookie. After a D239 switch the cookie is updated before any navigation, so the next server render is right.
- On the in-page switch, the catalog loads through the existing `appliedLanguage` path (INC-872). `<html lang>` and the text change together once the catalog is in, so the page never shows mixed text.
- The sign-in screen redirects after the event. To avoid one frame in the old language there, the redirect already waits on `authSettled`, and the rule runs in the same settle. The build measures this. If a frame of the old language is visible, we report it rather than hiding it.

**The publication gate's list is the only allowlist:** shape check (`isLanguageCode`) plus `isPublic`. The database function stays the authority on writes. Oromo, Tigrinya or any later language joins through the gate's rows, with no code change.

## 3. Tests (ids grep-checked free at build; proposed `LANG-D239-*` for units, `D239-E*` for E2E)

Unit (provider, with the auth/door modules mocked):
- U1 account `en`, device star `am`, gate has both → switch to `en`, star and cookie written, no account save.
- U2 account null → device language saved once to the account (if Q1 is yes).
- U3 account code unpublished → device kept, **no** save call (refusal: asserts the RPC mock was not called).
- U4 a failed account read → device kept, one warn line, no save.
- U5 a token refresh (same id) → no second read.
- U6 sign-out → language and star unchanged.
- U7 another tab's star `storage` event → the language follows, with no account save.
- U8 a signed-out pick → `savePreferredLanguage` returns "no session"; refusal test that no RPC was sent.

E2E (`bun run e2e:local`, both projects, whole file, 0 retries, pool accounts, restored in afterEach):
- E1 device `am`, account `en` → sign in → `en`; the cookie reads `en`; a second open tab follows.
- E2 an account with no language takes the device's (the DB row reads the device code).
- E3 a signed-out pick leaves the account alone (a DB read proves the row did not change).
- E4 an unpublished account preference is ignored and kept (seeded through the service door, reverted in afterEach).
- E5 sign-out keeps the current language.
- E6 impersonation: start and end the view; the staff member's language and star do not change.

E4 and E6 may hit J6 (gate rows are global to the backend). If so, they run in desktop-1280 only, as N1b-3's Resume does, stated for ruling.

## 4. DEC facts (for the supervisor's draft)

- **Changes:** at session start, the account's published `preferred_language` overrides the device star. Today the star wins (U4h). An account with no language receives the device's. A token refresh never re-applies. Open tabs follow a star change.
- **Why:** operator D239. One person, one language across devices.
- **Cost:** one `profiles` read per session start. It already happens today when there is no star; with D239 it happens on every sign-in. No first-paint round trip is added: the server still reads only the cookie. A person who picks a language on a shared device and then signs into an account with a different saved language will see the account's language. That is intended.
- **Security:** values are closed-list codes (shape + gate) in the cookie, storage and the account. The database function refuses unpublished codes. Nothing from the URL is written to the account: the URL override stays view-only. No new grant, migration or RPC. The cookie still carries only a code (`SameSite=Lax`).

## 5. Conflicts, K2, sizing

Conflicts:
- U4h's precedence comment (`auth-service.ts` :696–:705, `provider.tsx` :455–:458 and :479–:491) is rewritten; the DEC must name it.
- **Q1:** "save the device's choice when the account has none, as today" is new, not today's behaviour. It needs a yes/no.
- I5: the rule's read still runs after the macrotask hop, never inside the auth callback. That is unchanged.
- Knowledge v3.12 has not been read. The project knowledge in context is v3.11; a v3.12 conflict check is owed at build.

K2:
- The cross-tab gap predates D239 (D237 said every tab follows). It is fixed in the same place.
- `fetchPreferredLanguage` returns `reason` strings rather than a typed `ReaderError` (constitution: a reader's door error is a typed `ReaderError`). Proposed as part of this turn, because it is the rule's input.

Sizing (G37), one turn, no migration:
- D239-1: CI first, the rule, the storage listener, units, E2E, docs (feature doc, changelog, register row), i18n maps (no new strings expected).

ESTIMATE: 1 turn (band 1–2). It becomes 2 if E2E multi-tab or impersonation needs harness work.
````

## The ruling

````text
RULING — Foundations turn D239: the plan is approved with the rulings below. BUILD D239-1 now. Base: dev d2e3a9f7.

CI FIRST: read the run on 9b8a8cdc when it lands. The newest completed run, e150cc6e, is red only on Lane smoke (INC-993, fixed in 9b8a8cdc). Fix any red first.

R1. THE ONE PLACE: the account rule (D239) replaces the account-carry effect in src/i18n/provider.tsx (:492–:517), and no sign-in door changes. Every door reaches it through the auth event and the user-id latch, as today. Rewrite U4h's precedence comments (auth-service.ts :696–:705, provider.tsx :455–:458 and :479–:491) to D239's rule; the DEC names them.
R2. Q1, THE OPERATOR'S ANSWER (29 Oct, 08:1x New York): YES. When an account has no saved language, the device's current language is saved to it at sign-in, only if it is on the gate's list.
R3. A failed read keeps the device's choice, one named log line, no write; a published account code switches the device (star, cookie, current choice) with no account write; an unpublished code leaves the device alone and the account unwritten, after waiting for the gate; the rule runs at session start (each new sign-in and each page load); a token refresh never re-runs it.
R4. CROSS-TAB: one storage listener in the same provider, for the star, with the shape and gate checks and no account write; closes D237's "every tab follows"; roadmap records it.
R5. fetchPreferredLanguage moves onto a typed ReaderError; in scope.
R6. Test ids LANG-D239-U1…U8 and D239-E1…E6, grep-checked free. E4 and E6 desktop-1280 only if J6 requires. Refusal tests U3, U8, E3 prove the account row was not written.
R7. NO FLASH: measure at build; report any old-language frame with method.
R8. Work to Knowledge v3.11; v3.12 install owed at records turn.
R9. One turn, no migration; ESTIMATE 1, band 1–2.
````

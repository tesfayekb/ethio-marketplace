# Incidental Findings (INC-###)

| ID      | Date       | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Disposition                                                                                                                                                                                                                                                                                                                        |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INC-000 | 2026-07-29 | Committed .env holds publishable-tier values only (verified); standing rule: nothing above publishable tier may ever enter it                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | RULED-ACCEPTABLE, CI secrets-scan guards                                                                                                                                                                                                                                                                                           |
| INC-001 | 2026-07-29 | First CI run exposed 127 latent prettier errors in scaffold-era files; generated files (supabase types.ts, routeTree.gen.ts) were lintable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | FIXED — generated files excluded from lint/format as a class; four integration files formatted                                                                                                                                                                                                                                     |
| INC-002 | 2026-07-30 | String-scanner (warn-mode) surfaced pre-existing hardcoded strings in \_\_root.tsx scaffold error/not-found boundary; same class as INC-001 scaffold debt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | FIXED same-day + scanner promoted to fail-mode so the class cannot recur                                                                                                                                                                                                                                                           |
| INC-004 | 2026-07-30 | /auth/callback showed 'invalid or expired' on a genuinely successful email verification (success misread as failure, F4-inverted)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | FIXED — root cause was PKCE flow (cannot exchange email-link code cross-browser); reverted to implicit flow + callback now separates verification-success from session-established; BUG 2 sign-in navigation fixed. Live re-test pending.                                                                                          |
| INC-005 | 2026-07-30 | 'Check your email' page shows 'Confirmation email sent' even when the account is already confirmed, and the resend button is unthrottled (misleading UX + resend-abuse vector); Sign-in link on that page is a no-op; callback still misreads a successful verification as invalid                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | FIXED — resend throttled (60s cooldown, max 3/visit) with neutral non-enumerating message; check-email view auto-advances on same-browser confirmation; view state moved to URL so header sign-in works; DEBUG panel removed.                                                                                                      | D-004: an editable resend-to input was added unrequested (scope drift, abuse vector) — removed; resend now targets only the session's sign-up email, read-only. | Completion: check-email view now live-detects same-browser confirmation (state-change + focus recheck + 5s visible-poll) and swaps to confirmed+Continue; permanent 'Already confirmed? Sign in' path for cross-device; limit message reworded to guide forward. | D-005: redundant duplicate sign-in buttons consolidated — one primary (resend) + one secondary (already-confirmed sign-in); back-to-sign-in only on cold load. | iOS fix: recheck now rehydrates session directly from storage (suspended tabs miss cross-tab events); pageshow listener added. | CLOSED — resend throttled (60s/max3) + server backstop surfaced; view state URL-driven; no email input (D-004 removed); actions consolidated (D-005); same-browser auto-flip = BEST-EFFORT (documented platform limitation: iOS suspends background tabs; storage rehydration implemented); GUARANTEED path = session-smart "Already confirmed? Sign in" → straight home when session exists; cross-device shows neutral non-enumerating message by design. |
| INC-006 | 2026-07-30 | Security-scan findings ruled: missing INSERT policies on profiles/user_directory are by-design (trigger-owned); SECURITY DEFINER grants re-verified via live proacl read-back; leaked-password toggle Pro-gated (launch gate)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | CLOSED — rulings documented in schema comments + identity-schema.md                                                                                                                                                                                                                                                                |
| INC-007 | 2026-07-30 | 12 pre-existing unformatted docs (INC-001 class) surfaced via H2 self-report                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | CLOSED — ruling: ratified records (spec/, governance/) exempted from formatters permanently (bytes are history); living docs formatted; CI format-check now covers docs/                                                                                                                                                           |
| INC-008 | 2026-07-30 | Dependency audit: 5 high findings, single root cause (brace-expansion via eslint devDep); nested 5.x floor-bump blocked by Bun's lack of scoped overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | RULED — all dev-only/dormant/no-in-range-patch ACCEPTED; eslint 9→10 upgrade + CI audit-gate deferred as tracked tasks                                                                                                                                                                                                             |
| INC-009 | 2026-07-30 | Format gate non-deterministic: prettier unpinned, `bunx prettier` resolved different versions across environments → same commit could pass/fail CI (root cause of repeated "reports clean but clone disagrees")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | FIXED — prettier pinned exact (3.8.3), CI uses `bun run format:check` (local pinned binary), format scripts added                                                                                                                                                                                                                  |
| INC-010 | 2026-07-30 | Adversarial auth pass (P1-c capstone) found 2 defects: (a) /auth/callback invalid-link view still ships a free-text resend-to email field with an UNTHROTTLED resend button (D-004 abuse vector surviving on a second surface; 4 rapid sends all accepted); (b) sign-up is broken in production — GoTrue returns 500 `Error sending confirmation email` for every address, so no account can be created (also blocked live verification of cases 2 and 4)                                                                                                                                                                                                                                                                                                                                         | CLOSED — INC-010a: callback email input + resend removed (verified: no input/send path in any state); D-004 vector closed on both surfaces. INC-010b: RULED — signup 500 for non-owner test addresses = Resend test-domain restriction, not a code defect; owner-address signup works; custom-domain send is the launch-gate item. |
| INC-011 | 2026-08-02 | CI status reporter output fails the pinned prettier gate. Defect: the reporter emits an unpadded markdown table; prettier 3.8.3 requires padded table cells. format:check globs docs/\*\*, and docs/tracking/ was not exempt. Evidence: pinned prettier run against the committed docs/tracking/ci-status.md returns exit code 1 with a padding-only diff. The placeholder version present at commit 70fa361 passed (exit 0), which is why that CI run was green — the real table landed afterward under [skip ci] and was never graded. Impact: the next CI-triggering commit would have gone red on format:check, with the failure misattributed to unrelated work; each subsequent run would re-arm it. Class: deterministic-tooling / generated-file exemption (sibling of INC-001, INC-009). | FIXED — docs/tracking/ci-status.md added to .prettierignore as a generated file. Workflows unchanged.                                                                                                                                                                                                                              |
| INC-012 | 2026-08-02 | Orphan i18n key `auth.resendEmailLabel` left by the INC-010a removal; present in en.ts and am.ts, referenced nowhere in src/. Class: dead-code residue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | FIXED — removed from both locales.                                                                                                                                                                                                                                                                                                 |
| INC-013 | 2026-08-02 | A-1..A-3 (real sign-up through the UI) cannot pass on ethio-staging: the Resend test domain rejects non-owner recipients, so sign-up to @ethio-e2e.invalid fails and the check-email view never renders. Evidence: run 30730144529 — three A-cases fail identically on the check-email heading; the other ten pass; teardown deleted 4 users, none from the A-cases. Class: environment capability gap, not a code defect.                                                                                                                                                                                                                                                                                                                                                                        | RESOLVED — ethio-staging SMTP repointed at a Mailtrap sandbox inbox (accepts any recipient); E2E_EMAIL_SINK=1 set as a repository variable and passed to the E2E job; A-1..A-3 now execute. Prod SMTP unchanged.                                                                                                                   |
| INC-014 | 2026-08-02 | The SSR Register augmentation (`declare module '@tanstack/react-start'`) lived inside the generated src/routeTree.gen.ts, which the TanStack Router plugin rewrites without it. Lost twice; a reported restoration never reached main because the generator re-dropped it pre-commit. Class: hand-maintained content stored in a generated artifact.                                                                                                                                                                                                                                                                                                                                                                                                                                              | FIXED — relocated to a hand-authored module (src/types/router-register.d.ts) the generator does not write. Class rule: hand-maintained content never lives in a generated file.                                                                                                                                                    |
| INC-015 | 2026-08-02 | A-3's `page.clock.install()` ran before navigation, freezing the timers supabase-js depends on; the resend request never completed (no email, no cooldown, no error). Evidence: Mailtrap received the -103 sign-up email but no resend, while A-1/A-3 sign-ups on real timers succeeded. Class: test-mechanism fault from virtual time applied too broadly.                                                                                                                                                                                                                                                                                                                                                                                                                                       | FIXED — clock installed only after sign-up completes, and `fastForward` used instead of `runFor`.                                                                                                                                                                                                                                  |
| INC-016 | 2026-08-02 | A-2 sign-up (-102) produced no email and no check-email view, on a code path identical to A-1 which passed in the same run. Cause UNKNOWN; a rate limiter is ruled out because the later -103 send succeeded.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | OPEN — Phase 1 gate blocker. Diagnostic assertions added to surface the app's own error text on the next run.                                                                                                                                                                                                                      |
| INC-017 | 2026-08-02 | The resend cooldown and per-visit counter engaged only on a SUCCESSFUL send. A 429 refusal left the button enabled and unlabelled, so a rate-limited user could hammer the resend endpoint freely. Found by E2E case A-3 on its first real execution. Evidence: trace shows POST /auth/v1/resend -> 429 over_email_send_rate_limit with the button still reading "Resend confirmation email". Class: anti-abuse control armed on the wrong branch.                                                                                                                                                                                                                                                                                                                                                | FIXED — cooldown and counter now engage on click (operator ruling 2026-08-02).                                                                                                                                                                                                                                                     |
| INC-018 | 2026-08-02 | Mailtrap free sandbox refuses sends issued within a few seconds of each other, surfacing as Supabase 500 "Error sending confirmation email" and a failed sign-up. Not a code defect and not a Supabase limit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 15s pacing before the A-2 and A-3 sign-ups. If the sink's rate proves tighter than this, the options are a paid Mailtrap tier or fewer sends per run.                                                                                                                                                                              |

| INC-019 | 2026-08-03 | A-3's cooldown skip used page.clock.fastForward, which fires each due timer at most once; the 1-second cooldown countdown therefore decremented once and never reached zero, leaving the resend button in its cooldown label. Evidence: run on 18d2b00, toBeEnabled on the resend button failed with "element(s) not found" after fastForward(61_000). Class: wrong virtual-time API for an interval-driven countdown. | FIXED — reverted to page.clock.runFor. |

RETRACTED — an earlier supervisor claim that sign-up mapped a 429 to a generic error
was WRONG. The sign-up received a 500, and the generic message is correct for it. No
defect existed; the claim was inferred from a screenshot rather than a status code.

| INC-020 | 2026-08-03 | A-3 could not be made to pass under Playwright virtual time. Three mechanisms failed: `clock.install()` before navigation froze the timers supabase-js needs (INC-015); `clock.fastForward` left the 1s cooldown countdown stuck; `clock.runFor` did the same. The countdown does not reach zero under a virtual clock in this app. Class: virtual time incompatible with the component's countdown and client stack. | RESOLVED STRUCTURALLY — A-3 moved to a nightly scheduled job using real elapsed time; per-push coverage of the ruled cooldown-on-click behaviour is retained by A-2. No assertion weakened, no test-only seam added to application code. |
| INC-021 | 2026-08-03 | The guard-proof harness treated ANY non-zero Playwright exit as proof that a guard bit. An empty `--grep` match, a global-setup failure, or a browser launch failure would each have produced a GREEN job proving nothing. Class: phantom success (§7) in the harness that certifies other guards — supervisor design defect, specified in the prompt, not an executor error. | FIXED — each guard now runs an unmutated baseline that must pass and a mutated run that must fail, both asserted from Playwright's JSON reporter rather than the exit code. The first Guard Proof green run (2026-08-03) is therefore VOID as evidence and must be re-run under the A/B harness. Follow-up (same session): the first hardened run failed because the JSON report was captured by stdout redirect, which globalSetup's logging corrupts. Fixed by writing the report through PLAYWRIGHT*JSON_OUTPUT_NAME. The assertion script behaved correctly by refusing to interpret an unreadable report — the A/B design caught its own harness bug before it could produce a false result. |
| INC-022 | 2026-08-03 | handle_new_user() stamped every countryless signup as home_country_code 'US' with country_source 'ip_guess', fabricating both the value and its provenance. In the schema since P1-a; §7 banned-pattern (sentinel default on a geography path) — the table's own example is country ?? 'ET'. Found by the executor's P1-d census. Impact: every account created to date, including Ethiopian users, recorded as US with false provenance; downstream this poisons the REQ-005 country-scoped feed, per-country content rules, and the DEC-008/REQ-035 Ethiopia partition routing, while confirm_home_country()'s ip_guess-only filter made the fabricated rows look genuinely guessed and therefore plausible forever. Detection credit: executor census (census-before-build working as designed). | FIXED per operator ruling — 'unknown' added to country_source on both tables, defaults flipped to 'unknown', home_country_code made NULLable (NULL = unknown), trigger fallback removed, all existing fabricated rows corrected to unknown, confirm_home_country widened to act on ip_guess and unknown. |
| INC-023 | 2026-08-03 | G-1 as originally specified intercepted and aborted the accounts.google.com redirect hop. Playwright route handlers do not fire on server-redirect hops, so the handler never matched, and the aborted click-navigation hung to the 60s test timeout — red on both viewports, deterministically. The assertion also targeted the wrong layer: the Google-hop URL is built server-side by Supabase and cannot regress via our commits. Class: supervisor test-design defect (wrong interception layer + abort-on-navigation). | FIXED — G-1 now captures and FULFILLS the first-hop /auth/v1/authorize request, asserting our provider, our exact three scopes, and our redirect target; the real Supabase→Google chain remains a manual pre-launch check per the Q-2 ruling. |
| INC-024 | 2026-08-03 | GHOST PASSWORD DOOR. Unlinking the email identity leaves `auth.users.encrypted_password` alive. Evidence: after U-3 removed the operator's email identity (providers = `[google]`), SQL read-back `encrypted_password is not null and encrypted_password <> ''` returned **true**, and the operator then signed in live through the email door with that password — a working credential that the settings sign-in-methods list does not show and no user can manage. GoTrue nulls the password in the identity REPLACE path (D-8) but not in the UNLINK path. Class: credential outlives its identity — UI truth diverges from the credential store. | FIXED — operator ruling 2026-08-03, option A: unlink tells the truth. Migration `20260803100407*...`: `public.handle_email_identity_unlink()`(SECURITY DEFINER,`search_path = public`, EXECUTE revoked from PUBLIC/anon/authenticated) fires AFTER DELETE ON `auth.identities`WHEN`OLD.provider = 'email'`and nulls the password **only if another identity remains** (full-account deletion cascades untouched); plus a one-time correction nulling every password with no email identity. Proven by`--recheck`(throwaway user: password signs in before,`invalid_credentials`after, providers`[google]`) and by operator read-back `has_password = false`. |
| INC-025 | 2026-08-04 | Dependency audit reported 8 high findings across three transitive packages — `brace-expansion`(eslint + typescript-eslint chains),`postcss`(vite chain) and`js-yaml`(eslint + @tanstack/start-plugin-core chains). All three are dev/build-chain only: none appears in the production dependency tree, none processes end-user input, and none ships to the browser or the Worker runtime. Class: same as INC-008, but this time remediable. | FIXED —`package.json`"overrides" force patched transitive versions:`brace-expansion` `^1.1.17`(resolves 1.1.18),`postcss` `>=8.5.18`(resolves 8.5.25),`js-yaml` `>=4.3.0`(resolves 5.2.3). The`brace-expansion`floor is deliberately major-pinned to 1.x: a flat`>=1.1.17`resolves the whole tree to 5.x, whose API is incompatible with`minimatch@3`and breaks`eslint .`outright (observed:`TypeError: expand is not a function`). Typecheck, lint, build and format:check all pass on the new lockfile. The clean-audit verdict itself can only come from the CI `dependency-audit`job —`bun audit` 404s from the build sandbox. |
| INC-026 | 2026-08-04 | Two items. (a) The forgot-password submit (`handleForgotSubmit`) carried only a `busy`in-flight flag — no 60s cooldown and no per-visit cap — while the sign-up resend carried the full INC-017 apparatus. Not a live vulnerability: the answer is neutral-always (ruling R4 / guard B-3) so nothing is enumerable, and GoTrue rate-limits sends server-side. Class: defense-in-depth / surface inconsistency. (b) INC-018 RECURRENCE — the nightly E2E job pinned`E2E_EMAIL_SINK: "1"`inline while ci.yml read it from the repository variable, so when staging SMTP moved Mailtrap → Ethereal (ruling R1) the nightly kept driving sign-ups at the retired sink; every sign-up 500'd and the check-email view never rendered (heartbeat FAILURE 2026-08-04T07:04Z). Class: duplicated environment config drifting from its source of truth. | FIXED — (a) the reset request now shares the sign-up resend's cooldown timer and per-visit counter, both engaged on INITIATION per INC-017, with the same synchronous in-flight guard; past the cap a neutral`auth.resetLimit`message renders and the control stays disabled. Neutral-always response unchanged; guarded by new E2E R-4. (b) the nightly env block now reads the same`vars.E2E_EMAIL_SINK`ci.yml reads — one source of truth; Mailtrap references in the nightly spec/doc corrected to the Ethereal sink. Verification is the next scheduled run (or a manual dispatch). |
| INC-027 | 2026-08-04 | Nightly heartbeat push was non-rebasing and job-fatal. The P1-g follow-up fix-commit landed on main while the nightly ran, so the bare`checkout -> commit -> push`was rejected ("fetch first"); the step failed, the whole job read RED even though the test step had already run separately, and`docs/tracking/nightly-status.md` stayed stale at the pre-fix run (07d05ad) — the reporter's own documented weakness, now realized. Second occurrence of the "watchdog reads/writes without accounting for a moved ref" class (REQ-032 ops-invariant family; first was the ci-status reporter's same no-rebase push). | FIXED — job conclusion is now the TEST step's outcome only (`continue-on-error`+ a final re-assert step); the heartbeat regenerates the status file after`fetch`+`reset --hard`and retries up to 3 times, and a push that still fails is a`::warning::`, not a job failure. |
| INC-029 | 2026-08-04 | Reported "locations row drift": ethio-prod 18 rows vs ethio-staging 32. Prod read-back (2026-08-04) shows `public.locations` totals **32 rows** — country 2, region 12, city 18 — with **0 duplicate natural keys** and every constraint/index from the P2-a migration present (`locations_parent_slug_unique UNIQUE (parent_id, slug)`, partial `locations_root_slug_unique`, both CHECKs, both FKs). The "18" is the **city-level count**, not the table total; `docs/features/geography.md`states "2 countries, 12 regions, 18 cities" = 32. Staging's 32 therefore MATCHES prod's 32. Class: measurement error (per-level count compared against a table total), not data drift. | NO DRIFT — no cleanup proposed, no destructive SQL, nothing executed. Prod verified correct and untouched. Staging remains formally UNPROVEN (D-016 stands): this sandbox holds only the prod binding, so the operator must run the diagnostic block in the staging SQL editor to convert "same total" into a proven per-level + natural-key match. Re-runnability finding: the P2-a migration file contains CREATE TABLE and all seed INSERTs in ONE file with no explicit BEGIN/COMMIT; Supabase applies each migration file in a single implicit transaction, so a re-apply that trips`relation already exists` aborts the whole statement batch and rolls the seed back — partial seed stacking is not possible via that path. Lesson recorded rather than a fix: a migration that must be re-runnable needs guarded DDL (`IF NOT EXISTS`) plus idempotent seeds (`ON CONFLICT DO NOTHING`), not transaction wrapping, which is already in force. |
| INC-030 | 2026-08-04 | Gitleaks `generic-api-key`FALSE POSITIVE on`docs/\_changelog.md`line 81 — the design-foundation changelog sentence ("...coffee-on-cool-slate oklch tokens, Inter/Bricolage/Noto Sans Ethiopic, brand mark...") scored above the entropy heuristic as a credential. Human prose, not a secret; the changelog never carries credentials (standing rule INC-000). Class: machine-flagged-but-benign. | FIXED — root`.gitleaksignore`carries the single CI fingerprint`6cdcca71...:docs/\_changelog.md:generic-api-key:81`, which `gitleaks-action@v2`reads with no workflow change. Deliberately NOT a path/rule allowlist: the`generic-api-key`rule stays fully armed everywhere, including on every future changelog line, so a real planted key is still caught. Cost of the choice: a future prose false positive needs its own fingerprint line — accepted, because a blanket path exemption would blind the guard on a human-edited file. |
| INC-031 | 2026-08-04 | E2E CASCADE — 13 tests red, only one real cause.`use-feed.ts`selects`listings.tier`; the tier migration is applied on ethio-prod but NOT on ethio-staging, so the feed query errors there. `\_\_root.tsx`wraps EVERY route in`<AppShell>`whose default body is the Marketplace feed, so one feature's data error reached unrelated auth/settings/callback specs. Root cause = the un-applied staging migration; the real defect = the app had no blast radius containment. Lesson: a shell that wraps every route makes any always-mounted panel a single point of failure for the whole app. | FIXED (structural) — the feed now fails SOFT: both the`.then`error branch and a new`.catch`(transport-level rejection) resolve to`{listings: [], isLoading: false, error: true}`; `useCategories`is likewise wrapped so the rail degrades to "no categories". Nothing throws past the hooks, so no error boundary trips. NOT catch-and-hide (law F4):`feed.tsx`renders a visible`role="alert"`"couldn't load listings" panel WITH a retry, and the`feed-empty`block renders whenever`listings`is empty for ANY reason, so the shell.spec empty-state assertion holds under both no-rows and soft-error. Operator action still outstanding: apply the tier migration to ethio-staging — E2E in CI remains authoritative. |
| INC-032 | 2026-08-04 | Eleven E2E failures on the design-foundation commit, one class: specs written before the AppShell existed asserted against pre-shell chrome.`smoke-auth-i18n`asserted the level-1 heading contains "ethio.com", but the`<h1>`is now the feed heading and the wordmark is a`<span>`inside the brand link; sign-out moved into an account menu, so`settings`, `auth-callback`and`auth-reset`could not find their sign-out control. Class: legitimate test debt — the UI genuinely moved and the tests must follow. No app defect: the render audit at 360/768/1280 showed zero console errors and no horizontal overflow. | FIXED — specs repointed at the shell's real structure via shared helpers in`e2e/helpers/ui.ts` (`openAccountMenu`, `signOutViaMenu`, `expectSignedIn`, `gotoReady`). No assertion weakened; the behaviour asserted is unchanged, only its location. |
| INC-033 | 2026-08-04 | Hydration race in the shell specs. Playwright clicked the language switcher and the hamburger while the SSR'd markup was present but React had not attached handlers, so the click landed on inert DOM and the assertion that followed read the pre-click state. Surfaced as the `shell.spec`Amharic-heading and rail-drawer failures, which look like i18n/drawer bugs but are not. Class: test drives server HTML before hydration — a false-red generator that would recur on every new shell control. | FIXED —`waitForHydration`(probes for any element carrying React's internal props) plus`gotoReady`are now used by every shell-touching spec, so navigation is not "ready" until handlers exist. Fixes the class, not the two instances. |
| INC-034 | 2026-08-04 | Mobile tap-target law C2 violated by two shell controls introduced in the same commit that documents the rule: the header brand link rendered 34px tall and the footer home link 20px, both below the 44px minimum, at 360px. Class: the design foundation not meeting its own stated floor — found by an executor measurement pass, not by a test, which is why the measurement is now an assertion. | FIXED — both controls carry an explicit 44px minimum block size;`shell.spec` now measures every visible button and link at 360px and fails under 44px, so the floor is enforced rather than documented. |

| INC-035 | 2026-08-04 | At 360px the minimized top bar's fixed-width children (hamburger, two-line lockup, search, language, theme, Sign in) summed to ~404px, so the right-hand group overlapped the brand lockup — a real clipping defect, found by measuring element boxes rather than by eye. Class: law C1 (design at 360 first) violated by additive chrome. | FIXED — the mobile bar uses the new single-line `wordmark` logo variant, the language trigger is code+chevron only, and icon buttons/paddings were trimmed; measured layout at 360px now leaves the group inside its container with no overlap and no horizontal overflow. |

| INC-036 | 2026-08-05 | The rail-collapse state was held in per-hook React state, so the rail, its foot and the drawer each kept a private copy: the foot's toggle flipped only its own, and the rail never learned it had collapsed (tooltips never appeared). Class: shared UI state without a single source of truth. | FIXED — `data-rail` on `<html>` is the only truth; every `useRailCollapsed` instance subscribes to it through a `MutationObserver`, and `localStorage` persists the choice with a pre-paint init script. |
| INC-037 | 2026-08-05 | The expandable search row positioned itself with `inset-inline-start-*` / `inset-inline-end-*`, which are NOT Tailwind utilities, so the classes emitted nothing and the row escaped its container at 360px (horizontal overflow). Class: invented utility names passing review because logical-property naming looks plausible. | FIXED — replaced with the real logical utilities `start-*` / `end-*`; the 360px overflow assertion in `shell.spec` now covers the regression. |
| INC-038 | 2026-08-05 | Two E2E locator collisions after the identity moved into the account menu: `expectSignedIn` matched both the trigger span and the menu label (strict-mode violation), and the rail-row locator matched the rail-foot buttons as well as the nav rows. Class: test debt from a moved surface, not an app defect. | FIXED — identity assertion scoped to `data-testid="account-menu-identity"`; rail-row locator scoped to the rail's `nav`. The smoke spec's Amharic step also targeted a button named after the language, but the switcher trigger's accessible name is its `aria-label`; it now opens the switcher by testid and picks the Amharic menu item. |
| INC-039 | 2026-08-05 | Every category row in the rail rendered the SAME `Tag` glyph, so a collapsed icon-only rail was unreadable without hovering each row — the collapse feature's whole point defeated. Class: presentation defect (icon carries no information). | FIXED — `CATEGORY_ICONS` (slug -> lucide glyph) plus `categoryIcon()` in `src/config/panels.ts` give each seeded top-level slug a descriptive icon; unmapped slugs (new categories, subcategories) still fall back to `Tag`, so the gutter never shifts. |
| INC-040 | 2026-08-05 | The rail-collapse toggle lived at the BOTTOM of the rail, below the category list; with the full category tree expanded it sat below the fold and was unreachable without scrolling the rail. Class: control placed outside the reach of the state it controls. | FIXED — the toggle moved into the top bar (md+ only, before the search field), where it is always visible; the rail foot now holds only the additional sign-out and renders nothing at all when logged out. |
| INC-041 | 2026-08-05 | Location selector cascade defects: the chosen area was rendered BOTH as a leading row label and again on its own picker (suppressName hack), and the depth arithmetic left deeper levels (city) mis-parented after the leading label was introduced. Class: two sources of truth for one selection. | FIXED — the pickers ARE the display: each level shows its own selection or its level name, the deepest selected picker IS the chosen area, and nothing but the sr-only row label renders outside the pickers. The cascade is rebuilt as a strict Country -> Region -> City -> Sub-city walk that stops at the first level with an unselected parent or no rows, so sub-city stays absent until seeded. Guarded by a rewritten E2E that picks through all three live levels and asserts no echo. |
| INC-042 | 2026-08-05 | Sidebar/panel rows used `bg-muted` for hover — a CONTENT-surface token — against `bg-sidebar`, so hover flashed a mismatched slate patch inside the white rail. Class: token used outside its surface family. | FIXED — rail rows and the panel switcher hover on `bg-sidebar-accent/60` + `text-sidebar-accent-foreground`, the sidebar family's own tokens, in both themes. |
| INC-043 | 2026-08-05 | The breadcrumb root read `Home › Marketplace` on the marketplace panel — two segments naming the same surface, since Home IS the marketplace feed. Class: redundant navigation label. | FIXED — on the marketplace panel the chain is `Home › <category path>`; every OTHER panel keeps its name as a real segment (`Home › Account › …`). Asserted in `e2e/shell.spec.ts`. |
| INC-044 | 2026-08-05 | The feed body sat off-centre: the container hugged the rail edge, so the left gutter was smaller than the right at desktop widths. Class: asymmetric container margins. | FIXED — the feed container and its empty-state card carry symmetric auto margins inside a max-width column; measured gutters are equal (±1px) at 360/768/1280 and asserted in `e2e/shell.spec.ts`. |
| INC-045 | 2026-08-05 | With the rail collapsed the corner cell shrank to the icon mark and the wordmark disappeared entirely, leaving the desktop chrome unbranded. Class: brand lost to a layout state. | FIXED — collapsing the rail moves the wordmark into the top bar (after the collapse toggle, before search); expanding returns it to the corner cell. Placement keys off the `data-rail` attribute so there is no first-frame flash and the wordmark is never rendered twice. |
| INC-046 | 2026-08-05 | Suspected duplicate sidebar affordances (hamburger + collapse toggle) at the same breakpoint. | CONFIRMED CORRECT, NO CHANGE — the hamburger is `md:hidden` and the collapse toggle is `hidden md:inline-flex`: exactly one sidebar control exists at any width. Now locked by an assertion rather than left as a reading of the classes. |
| INC-047 | 2026-08-05 | Footer link rows carried more vertical air than the compact footer spec allows. Class: spacing drift. | FIXED — link list items use negative block margins to tighten the visual rhythm while the anchors keep their 44px tap boxes; the 360px tap-target assertion still passes. |
| INC-048 | 2026-08-05 | With the rail collapsed the top bar showed a wordmark that carried the mark AND "ethio.com" but not the MARKETPLACE line, so the bar brand read as a second, different logo next to the corner icon — perceived as a duplicate. Class: one brand rendered as two inconsistent lockups. | FIXED — a new `lockup` logo variant renders the two-line lockup WITHOUT the mark; the collapsed bar uses it, the corner cell keeps the icon. Brand appears in exactly one place per rail state, in one form. |
| INC-049 | 2026-08-05 | The bar search field was `flex-1` capped only at `max-w-sm`, so at tablet width it grew toward the right-hand controls and crowded/clipped the language control. Class: unbounded flexible control against fixed-size siblings. | FIXED — the field is capped per breakpoint (`md:max-w-[13rem]`, `lg:max-w-xs`, `xl:max-w-sm`) and the control cluster stops flexing at `md`; measured non-overlap with the language control at 768/1024/1280 is asserted in `e2e/shell.spec.ts`. |
| INC-050 | 2026-08-05 | `useCategories` re-read the whole category tree (two queries) on every mount — every panel switch, drawer open and route change — with no placeholder, so the rail visibly lagged and then jumped. Class: reference data re-fetched per mount. | FIXED — a process-lifetime cache plus in-flight de-duplication in `src/features/feed/use-feed.ts` (still READ-ONLY; failures are not cached, so the next mount retries) and 44px-tall skeleton rows in the rail while the first read is in flight. |
| INC-051 | 2026-08-05 | CI red: the 44px tap-target test measured 20px for "footer home". The footer link was never under 44px — shadcn's `BreadcrumbPage` renders `role="link"` for the current page, so the unscoped role query matched the breadcrumb's "Home" instead. Class: test locator ambiguity, not a UI regression. | FIXED — the footer link carries `data-testid="footer-home"` and the assertion targets it; the 44px floor is unchanged and every footer link measures 44px at 360px. |
| INC-052 | 2026-08-05 | The shell rendered `<LocationSelector />` UNCONDITIONALLY in band 3 while the body was gated to `activePanel === "marketplace"`, so the country/state/city row appeared over My Listings, Account and Admin — panels that have no geographic axis. Class: chrome not scoped to the panel it belongs to. | FIXED — band 3 now carries the SAME gate as the body; on non-marketplace panels the stack is top bar -> panel tabs -> breadcrumbs -> body with no location band. Filtering itself stays stubbed (docs/features/location-scoping.md). |
| INC-053 | 2026-08-05 | Reported: a Settings item leaking into the Marketplace category rail. CENSUS finding — `PANELS.marketplace.items` is already `[]` and the marketplace rail renders ONLY the live category tree; the `ml-settings` entry lives under the My Listings panel's Manage submenu and `ac-settings` under Account, both correct per spec. No config change was required. Class: reported-but-absent (already correct). | NO CHANGE — locked by a new E2E assertion that the category rail contains no Settings label, so a future leak turns the suite red. |
| INC-054 | 2026-08-05 | Reported: the rail-collapse toggle showing on mobile. CENSUS finding — the button already carries `hidden md:inline-flex` (INC-046 ruling: exactly one sidebar affordance per breakpoint). No class change was required. | NO CHANGE — locked by a new mobile-360 E2E assertion (hamburger visible, collapse toggle hidden). |
| INC-055 | 2026-08-05 | CI red: the rail-collapse toggle rendered at 360px despite `hidden md:inline-flex`. Root cause — the element merged TWO base display utilities (`ICON_BUTTON` already sets `inline-flex`, then `hidden` was appended as a raw string), so the CSS cascade, not the attribute order, chose the winner. INC-054's "no change needed" ruling was wrong: the class string was present but inert. Class: conflicting utility classes concatenated as raw strings. | FIXED — the toggle (and the two other ICON_BUTTON consumers) compose through `cn()`/twMerge, which drops the earlier display utility, so `hidden` genuinely applies below md. Verified in a real browser: `display: none` at 360px, visible at 900px; the E2E assertion now also checks the computed display. |
| INC-056 | 2026-08-05 | The panel-tabs row used `overflow-x-auto`, so at phone width the four tabs scrolled and painted a horizontal scrollbar under band 2. Class: chrome that scrolls instead of fitting. | FIXED — the row no longer scrolls; each tab is `min-w-0 flex-1` with a truncating label, so the set always fits. E2E asserts zero row and document horizontal overflow at 360/768/1280. |
| INC-057 | 2026-08-05 | Re-check of the reported "slow load" / category caching. CENSUS finding — the INC-050 process-lifetime cache with in-flight de-duplication and 44px skeleton rows is present and working in `src/features/feed/use-feed.ts`; repeat panel switches and drawer opens read from memory with no query. Class: reported-but-already-fixed. | NO CHANGE — caching confirmed in place; first read per page session still hits the database by design (reload re-reads). |
| INC-058 | 2026-08-05 | `/settings` rendered its page beside the MARKETPLACE category rail: `activePanel` was pure client state defaulting to `marketplace` and no route updated it, so panel state and router location desynced. Class: derived UI state kept as independent client state. | FIXED — the active panel is DERIVED from the route (`/settings` -> account); the body renders a route-owned page instead of the panel placeholder, the location row is feed-only, and choosing a panel from a route-owned page returns to `/`. E2E reproduces the operator path. |
| INC-059 | 2026-08-05 | At md+ the top-bar right cluster stopped short of the bar's right edge: the capped search field could not absorb the row's free space, which then sat between search and the controls. Class: flex free space left unassigned. | FIXED — the cluster carries `md:ms-auto` and is flush right (measured gap = the bar's own 16px padding at 1280px). E2E asserts it. |

### INC-060 (2026-08-07) — Lovable-platform auto-commits (class rule; second occurrence)

Defect class: commits authored by the Lovable platform outside any prompt's scope (toolchain/config bumps, generated files). Occurrence 1: 64c301b (routeTree.gen.ts Register block, 2026-08-05). Occurrence 2: 3ced270 + 66eda07 (2026-08-08Z, @lovable.dev/vite-tanstack-config 2.8.5→2.9.1 in package.json + bun.lock) — landed alongside a prompt execution whose honest report said "files modified: none" because the model cannot see platform commits.
CLASS RULE (per §11 two-occurrence rule): platform auto-commits are expected out-of-prompt noise. Verification scope-checks and logs them as platform commits, never attributes them to the prompt, and never counts their absence from a completion report as a reporting violation. They remain subject to CI (must build green) and the secrets sweep.

### INC-061 (2026-08-07) — No CI run created for a push to main (single occurrence; WATCH)

Evidence: pushes 3ced270/66eda07 (2026-08-08 02:56Z) produced no CI workflow run at all — not queued, not skipped, absent from the runs list hours later (operator-verified Actions view). ci.yml trigger covers the changed paths (only the two tracking files are paths-ignored); no skip markers in messages; identical bot pushes have always triggered (e.g. e28e6af → CI #97). Most probable cause: dropped GitHub event delivery (known, occasional, no-retry). Consequence: HEAD 66eda07 unbuilt — not red. Remedy: next push re-probes the trigger and builds the full tree at a HEAD containing the toolchain bump. Second occurrence ⇒ systemic investigation (webhook/app-integration audit) per the two-strike rule. Detection note: the two-step ci-status.md check catches this class (reported SHA ≠ newest non-status commit after recheck window).

### INC-062 (2026-08-08) — log_audit executable by anon/authenticated (audit-trail pollution vector)

Defect: R1 left the PostgreSQL default EXECUTE-to-PUBLIC on log_audit() and additionally granted it to authenticated. Any visitor or logged-in user could insert arbitrary audit_log rows (NULL/self actor), polluting the trail that admin actions rely on. Surfaced honestly by the executor in the R1 completion report (partially — the explicit authenticated grant found in supervisor verification). Fix: R1a revokes PUBLIC/anon/authenticated on log_audit, is_super_admin, get_role_hierarchy; internal SECURITY DEFINER call chains unaffected. Class note: SECURITY DEFINER functions default to PUBLIC EXECUTE — every future definer function must ship explicit REVOKE/GRANT lines in its creating migration (standing rule; second occurrence promotes to a CI guard).

### INC-063 (2026-08-08) — base-user guard would have blocked account deletion (supervisor spec error)

Defect: the R1 prompt asserted FK-cascade deletes bypass row triggers; PostgreSQL fires BEFORE DELETE row triggers on cascaded rows, so user_roles_protect() as specced would abort auth.users deletion when the GDPR/account-deletion path ships. Caught by the executor's limitation note; error was in the supervisor-authored spec, not execution. Fix: R1a makes the base-user block cascade-aware (allow when the parent auth.users row is already gone; absolute otherwise). The last-super-admin block remains absolute by ruling.

### INC-064 (2026-08-09) — Migration-embedded probes hardcoded environment uuids (staging apply would abort)

Defect: R2's in-migration impersonation assertions declared literal ethio-prod uuids; on any other environment the superadmin probe fails its assertion and aborts the entire migration, blocking the policy retrofit. Caught in supervisor verification before any staging apply. Fix: probe block made dynamic + skip-with-NOTICE when fixture users are absent (this commit). CLASS RULE: migration-embedded assertions must be environment-agnostic — dynamic lookups, never literal ids; skip loudly when preconditions are absent.

### INC-065 (2026-08-09) — Red main: bare changelog line broke format:check; bun unpinned

Defect: the R3a changelog entry was appended without the "- " list prefix; prettier 3.8.3 flags it as a mis-indented lazy continuation, failing Build/typecheck/lint at 6851c0c. Contributing causes, both logged: executor skipped its pre-commit format:check; supervisor changelog templates omitted the "- " prefix (executor had silently normalized it until this commit). Diagnosis: supervisor local reproduction of the format:check leg at pinned prettier after Actions-API rate limiting. CLASS RULES: changelog append instructions carry the literal "- " prefix verbatim; executor runs format:check before every commit without exception. Rider: bun-version pinned to 1.3.14 (was "latest") per the INC-009 pinned-tooling law — same class, caught during the same diagnosis.

### INC-066 (2026-08-10) — A1 seed-mapping gap + attribute-placement flaw (operator-corrected)

Defect 1: the A1 prompt's upsert-by-slug rules carried no legacy→new mapping for the 7 P2-b starter roots whose meaning (not slug) overlapped A1 roots, yielding 22 visible roots with duplicates. Supervisor spec gap. Defect 2 (operator-caught, donor-inherited): vehicle-intrinsic attributes (make/model/year/mileage etc.) seeded at the Automotive ROOT, wrongly inherited by auto-parts. Fix: A1b restructure — Vehicles intermediate node under Automotive carries the seven; cars/trucks/motorcycles re-parented beneath it; Computers + Phones & Tablets demoted under Electronics; six meaning-duplicate legacy roots hard-retired under zero-reference assertions. CLASS RULE: taxonomy seed prompts must carry an explicit disposition (absorb / re-parent / retire) for every pre-existing row, and attribute placement follows the narrowest node whose ENTIRE subtree the attribute truthfully describes.

### INC-067 (2026-08-10) — has_permission inside an anon-reachable policy (A2 combined read)

Defect: A2's single SELECT policy was TO anon,authenticated with has_permission() in its OR-chain; Postgres does not guarantee OR short-circuit order, so anonymous scans can evaluate the RBAC function — against DEC-013 §10's zero-anon-cost rule and the R2 precedent (admin branches live only in TO authenticated policies). Caught in supervisor verification. Fix: A2b splits into public/owner/admin policies; in-migration assertion P4 proves no anon-reachable policy references has_permission. CLASS RULE: policies granted to anon may never reference has_permission(); owner/admin branches are separate TO authenticated policies. Second occurrence promotes this to a CI guard.

### INC-068 (2026-08-10) — e2e signIn helper resolved before session establishment (latent since P1-c)

Defect: the shared signIn helper returned on click, not on authentication; every earlier caller synchronized by accident through downstream visibility timeouts. First flow to navigate immediately after signIn (U0's A-1) hit the race deterministically on both viewports: full navigation outran the token exchange, the reloaded page had no persisted session, the admin gate correctly redirected the anonymous page to /, and the section assertions polled zero. Diagnosed from the Playwright failure artifact (page snapshot: signed-out homepage) after two inspection-only fix rounds failed. Fix: signIn resolves only on the authenticated signal (post-auth URL + signed-in affordance + persisted token). CLASS RULES: (1) auth/test helpers terminate on their achieved STATE, never on the triggering action; accidental synchronization via downstream timeouts is the named anti-pattern. (2) Supervisor practice, adopted: after ONE failed inspection-only fix on a red E2E, the failure artifact (screenshot/trace/error-context) is mandatory evidence before any further push.

**INC-068 addendum (2026-08-10):** the corrected signIn contract exposed the class's second facet — six expected-failure callers (wrong password, unknown email, unconfirmed account, retired-password probes) were reusing the success-contract helper as "attempt credentials," and the new session-wait correctly timed out on paths designed never to produce a session. Fix: semantics split — signIn = achieve-session contract; attemptSignIn = submit-and-return, outcome-agnostic. CLASS RULE (extends INC-068): test helpers encode INTENT in their name; a success-contract helper is never reused for expected-failure paths, and any helper serving both intents is the named smell to split.

### INC-069 (2026-08-12) — Admin panel bypassed the shell's panel-rail pattern (operator-caught)

Defect: U0 rendered admin navigation inside the page (cards + internal sidebar) while every existing panel (Account, My Listings) surfaces its items through the shell rail/drawer — inconsistent navigation and a double-sidebar at md+. Root cause: the U0 prompt's scope forbade shell edits beyond the entry point, walling off the correct integration seam — supervisor scope-design error. Fix: U0b feeds permission-filtered admin sections through the shell's panel-items mechanism; internal sidebar removed; landing cards retained as index content. CLASS RULE: a new panel integrates the shell's panel-item seam like its siblings; a panel that carries its own parallel navigation is the named smell. Prompt scopes for panel work must include the shell's panel-item source.

### INC-070 (2026-08-12) — U0c clobbered the admin landing cards despite an explicit UNCHANGED instruction (operator-caught)

Defect: the U0c edit to admin.index.tsx replaced the U0 section-cards landing with a generic placeholder, violating the prompt's verbatim "Landing cards: UNCHANGED." Caught in the operator render-walk. Fix: U0d restores the cards from the U0-era implementation. CLASS RULES: (1) when a completion report touches a route/index file, it must include a before/after content summary of that file proving preserved behavior; (2) STANDING DESIGN RULE (operator directive): a panel's landing page presents its items as clickable cards in the body — the consistent panel-landing theme, applied to each panel as it is built; (3) the panel identity (name + switcher) is a persistent band below the logo cell at every viewport, with the logo cell's geometry constant.

**U0d verification note (agent, 2026-08-12):** the git-history census of `src/routes/admin.index.tsx` shows the cards path was NOT deleted by U0c — the only U0c hunk removed `<AdminBreadcrumb section={null} />`; `<AdminNav />` (the permission-filtered card grid) survived. The card _variant_ prop was dropped in U0b when the md+ sidebar rendering was retired, leaving cards as the single rendering. U0d therefore hardens rather than restores: the landing card contract (title + description per permitted section) is now asserted in A-1, and the standing design rule is recorded above.

### INC-071 (2026-08-12) — Panel activation bypassed panel-follows-route (INC-058 violation; two /admin renderings)

Defect: the top panel tabs and the U0d switcher set activePanel state without navigating; route-derived content correctly ignored the state, so switcher item-swaps failed in E2E and the Admin tab from another panel rendered a stale pre-U0 state-path placeholder while the /admin route held the real landing. Operator-caught (placeholder sighting) + CI-caught (both switcher tests). Fix: U0e — panels carry homePath; ALL activation flows navigate through one shared switchPanel helper; the state-path admin body deleted; null-homePath panels grandfathered with comment until their routes ship. CLASS RULE (extends INC-058): panel activation IS navigation; any panel body reachable by state alone is the named defect. Supervisor note: the U0d switcher tests encoded the state-swap contract — spec error, corrected here.

### INC-072 (2026-08-16) — Sign-out left gated UI rendered; no confirmation; panel not reset (operator-caught, Tier A)

Defect: signing out from the drawer left the active admin panel rendered and the panel-header claiming Admin; the gate checked auth only on mount, not on live change; no confirmation; no navigation. Server-side safe (session destroyed, RPC/RLS deny), client-side exposure on shared devices. Fix: U0j — confirm dialog, hard reset (sign-out + permission cache purge + state reset + replace-navigate to "/"), live auth guard on all gated routes (redirect on any signed-out transition incl. cross-tab/expiry), shell re-derives panels from live auth; E2E SO-1..SO-4. CLASS RULES: (1) auth gates subscribe to auth state, never mount-only; (2) sign-out is a hard reset with confirmation and replace-navigation; (3) every gated surface ships a "signed-out leaves nothing rendered" test.

**INC-072 addendum (2026-08-16, operator directive):** confirmation dialog REMOVED — a confirm step reintroduces the walk-away exposure it pretends to prevent (user clicks Sign out, leaves mid-dialog, session live); sign-out is non-destructive and instantly reversible, so one click is the correct contract (OWASP/NIST). Session policy added: role-tiered idle (staff 30m / regular 4h) + absolute (staff 12h / regular 7d), warning banner, cross-tab enforcement, hard reset on expiry; strict tier applies until permissions resolve (fail-safe). Server-side bound = Supabase refresh-token lifetime (operator item).

### INC-074 (2026-08-16) — U1 shipped a migration; E2E ran against staging without it (12 cryptic reds) + re-declared seams without grant lines (definer guard red)

Defect 1 (process, supervisor): migration-shipping prompts did not state "apply to staging BEFORE E2E" as an explicit ordered operator step; the harness failed on missing RPCs across 12 tests instead of one clear message. Fix: staging-apply becomes step 1 of every migration-shipping prompt (instructions amendment G21 proposed) + CI migration-parity preflight that names the missing file. Defect 2 (executor): CREATE OR REPLACE of two existing definer seams without restating REVOKE/GRANT — correctly caught by the R2b definer guard on its first real occasion. Fix: restatement rider + guard help text. CLASS RULES: (1) every migration-shipping prompt lists the staging apply as operator step 1 with the exact filename and a read-back; (2) E2E preflight asserts migration parity and fails with the filename; (3) re-declared definer functions restate their grants in-file.

ADDENDUM (2026-08-17) — guard ruling: in-place restatement. The four REVOKE/GRANT lines now live inside 20260816120338 itself (section C1), directly after the transition_listing re-declaration; the forward-only rider 20260817023555 remains as the APPLIED record. Both are idempotent and change no live posture; the operator re-runs only those four lines on staging. `scripts/check-migrations.sh` -> "Definer guard OK". U1 E2E residual after staging parity: NOT DIAGNOSED — the CI failure artifact of run 31988652674 is unreachable from the executor environment (no `gh`, no GITHUB_TOKEN) and no staging E2E credentials (E2E_SUPABASE_URL / E2E_SUPABASE_SERVICE_ROLE_KEY) are present, so AU-1/AU-2/AU-3/AU-5 were left untouched rather than guessed (INC-068 evidence rule).

ADDENDUM (2026-08-17) — U1 E2E residual root causes (from artifact): (a) second sign-in via /auth while authenticated — /auth is guarded (U0j), specs must sign out first (switchUser helper; class rule: multi-user E2E never navigates to /auth while signed in); (b) duplicate responsive testids in users-list — class rule: responsive twins carry distinct testids (card vs row).

ADDENDUM (2026-08-17) — U1b-2: switchUser raced the header's auth branch after a redirect (count()==0 before hydration) → skipped sign-out → /auth guard refused the form (correct). Fix: settle-then-branch. AU-3/AU-5 mobile in run 31991623929 are attributed to the staging seed (profiles:update) landing mid-run — the next run at parity is the check; if they persist, the artifact drives the next round.

### INC-075 (2026-08-17) — U1 users table overflowed horizontally at desktop; no shared table primitive; admin role lacked profiles:update (operator-caught + artifact-diagnosed)

Defect 1: hand-rolled table + separate card list; desktop table wider than its column → page-level horizontal scroll (operator screenshot). Fix: DataTable primitive with priority-driven responsiveness + the table law E2E; users list migrated. CLASS RULE: every admin list uses DataTable; no page may ever scroll horizontally at 360/768/1280 (CI-asserted). Defect 2: E2E admin fixture (seeded admin role) lacked profiles:update, so the detail page correctly hid Deactivate → AU-3/5 hung (artifact evidence: click on deactivate-user never resolved). Fix: seed correction (admin manages users). Note: RBAC + UI behaved correctly; the seed was the gap.

### INC-076 (2026-08-17) — Executor push from a stale checkout overwrote committed work (U1c lost, restored)

Defect: U1c landed on main across ten commits (03:43–03:48); the next task (U1b-2) was composed on a checkout predating them and its push replaced main's tree, silently removing every U1c file. Caught by supervisor verification (files absent at HEAD; present in history). Restored verbatim from f62f2f8. CLASS RULES: (1) every completion report states the base SHA the work was composed on and confirms it was HEAD at push time; (2) supervisor verification diffs the new HEAD against the last verified HEAD for FILE REMOVALS, not only additions; (3) any file removal not named in the prompt's scope is DRIFT-class and stops the line; (4) proposed CI guard: a "no unexplained deletions" step — fail if a push deletes files unless the commit message carries [intentional-delete] (operator to ratify).

### INC-077 (2026-08-17) — Desktop table rows lost their link in the DataTable migration; own-row deactivate exposed in admin (operator walk)

Defect 1: the users list's mobile card carried rowHref but the desktop <tr> did not — a regression introduced by U1b's migration and missed because the table law tests overflow, not interaction. Fix: DataTable rowHref applies to table rows (whole row + primary cell + keyboard) + primitives law L8. CLASS RULE: every primitive interaction contract has a law test on /dev/primitives (not just geometry). Defect 2: an admin viewing their own record saw Deactivate (server refuses, UI shouldn't offer). Fix: own-row rule + note; self-closure lives in Account settings (separate scoped item). Operator directive adopted: sensitive actions require step-up (2FA) — U1e (Tier A) builds MFA enrollment + the requires_step_up gate; deactivate/activate/role assign/revoke are the first step-up permissions.

### INC-078 (2026-08-17) — Sign-out regression on /settings after U1d banner (desktop SO-2/SO-4)

Defect: U1d added the own-profile deactivation banner to `src/routes/settings.tsx`
inside the page's ONE-SHOT bootstrap effect (deps `[navigate]`), whose tail
branch sent any session-less outcome to `/auth`. The two added awaits
(`supabase.auth.getUser()` + the `profiles.account_status` read) widened the
window so that a sign-out started on `/settings` resolved that tail AFTER the
session was gone: the page navigated to `/auth` while the shell's hard reset
was replace-navigating to `/`, and the sign-out assertions (SO-2, and SO-4
whose flow also passes through a gated surface) observed the wrong destination.
Desktop-only in practice because the desktop rail exposes sign-out in one
click, while the mobile drawer costs enough time for the bootstrap to settle
first.

Fix (root): the settings bootstrap is now keyed to the auth state
(`[authLoading, user, navigate]`), bails when the user is null after a session
existed, and never routes post-sign-out. LAW: **the sign-out hard reset purges
every auth-derived read; no page bootstrap may route after an auth
transition — destination after sign-out belongs to the shell's hard reset
alone, and any auth-derived cache entry must be prefix-tagged so the reset can
remove it (today: `MY_PERMISSIONS_KEY`; the settings banner holds no cache at
all, by design).**

Note: CI now publishes E2E failure evidence to
`docs/tracking/e2e-last-failure.md` — the supervisor reads it by clone; the
artifact courier model is retired.

**Addendum (2026-08-17, U1g-2) — second facet: any NEW auth-context query
re-introduces the leak unless the purge is STRUCTURAL.** U1g added the admin
countries read for the edit form; keyed `["admin","countries"]` it sat outside
every purge prefix and survived sign-out, and SO-4 caught it. LAW: every
auth-derived query key starts with the shared root `["auth-derived", ...]`
(`AUTH_DERIVED_ROOT` / `authKey()` in
`src/features/permissions/usePermissions.ts`), and the hard reset does
**cancel-then-remove** on that one root — cancel first so no in-flight fetch
resolves into a signed-out shell. Public data fetched in an authenticated admin
context (countries) is auth-derived for this purpose: it must not outlive the
session. SO-4 asserts zero surviving `auth-derived` queries via the DEV-only
`window.__ethioQueryClient`.

## INC-079 — step-up authentication is a session property, not a role property

Design record (U1f). RBAC answers "may this account do it"; step-up answers
"is THIS SESSION currently proven to be that account". The two are independent,
so `super_admin` gets no exemption: the server gate
`public.require_step_up_if_needed` reads `auth.jwt() ->> 'aal'` only, and every
sensitive mutation RPC calls it AFTER its permission check — permission denied
must never be softened into "verify to continue" for someone who lacks the
permission entirely.

Client consequences: `StepUpGate` is UX, never authorization (law F3); it may be
forgotten without opening a hole, because the RPC raises P0009 and the hook
converts that refusal back into the same modal. A user with no enrolled factor
is blocked BEFORE any RPC is sent, so a missing factor can never produce a
half-applied action.

Session tie-in (folded from INC-078): the hard reset now also removes every
query prefixed `["me"]` — that prefix is the standing contract for anything read
as "the signed-in user" — and `clearSessionClocks()` drops the cached step-up
hint, so a fresh sign-in starts at `aal1` and re-verifies.

## INC-074 addendum (U1f-3) — the ledger existed only where the migration tool ran

Finding: `supabase_migrations.schema_migrations` is written by the migration
TOOL. ethio-prod has it because Lovable's Supabase integration applies there;
ethio-staging is applied BY HAND through the SQL editor, which writes no ledger
at all. The U1f-2 definer RPC read that schema, so it was not merely empty on
staging — the migration declaring it could not be applied there in the first
place. A parity check whose ledger exists in only one environment can never be
the mechanism it claims to be.

**Environment-asymmetry law:** any artefact the preflight depends on must be
created BY the migrations themselves, never by the tool that happens to apply
them.

**Self-marking law (ratified):** every migration's LAST statement is
`INSERT INTO public.migration_marks(version) VALUES ('<its own 14-digit
version>') ON CONFLICT DO NOTHING;`. The mark is the ledger on staging and is
identical on prod. `public.migration_marks` is RLS-enabled with an explicit
deny-all policy for `anon`/`authenticated`; only `service_role` and the definer
`public.e2e_migration_ledger()` can see it. `scripts/check-migrations.sh`
enforces the mark for every file with version >= 20260817054246 (self-test:
`scripts/fixtures/bad-unmarked-migration-example.sql`).

Degraded mode now has exactly one cause — the ledger RPC itself is absent, i.e.
the ledger migration has not been applied to staging — and the warning names
that migration.

### INC-080 (2026-08-17) — Sharded E2E processes deleted each other's fixtures (namespace-wide teardown, shared run id)

**Evidence.** Run 32012959376: 39 tests passed, but 3 of 4 shards and the smoke
tier were red while the merged reporter showed **0 failed tests** — failures
outside test results, i.e. process-level crashes (setup/teardown), not
assertions. Root cause: `global-teardown.ts` swept the ENTIRE
`@ethio-e2e.invalid` namespace, and every parallel process keyed its fixtures on
`GITHUB_RUN_ID`, which all shards and the smoke tier share. The first process to
finish deleted the still-in-use fixtures of the other four.

**Fix.** Fixture ownership is now a PROCESS id:
`PROCESS_ID = ${GITHUB_RUN_ID ?? local<rand>}-${E2E_SHARD ?? "solo"}`
(`E2E_SHARD` is `1..4` on the shard matrix, `smoke` on the smoke tier,
`nightly` on the nightly job). Minted emails are
`e2e+<PROCESS_ID>-<n>@ethio-e2e.invalid`; the id is persisted in the setup state
file; teardown deletes only users whose email contains `+${PROCESS_ID}-`, with
the out-of-namespace refusal kept as a per-user assert. Stale-orphan reaping
moved to the single-process nightly job (`sweepStaleUsers()`), the only place a
namespace-wide delete is permitted, and only for users older than 24h.

**Class rule (ratified):** parallel test processes own their fixtures by process
id; namespace-wide sweeps run only in single-process jobs (nightly).

**Addendum (2026-08-17) — second facet.** Run 32015036209: all 15 smoke tests
failed with "already registered". The per-job counter collided across the two
project workers inside the smoke job (mobile-360 + desktop-1280 share an
identical PROCESS_ID, and the counter restarts in every OS process). Fix: worker
tag + random suffix — `e2e+<PROCESS_ID>-<worker>-<n>-<rand6>@ethio-e2e.invalid`,
where `worker` is `TEST_WORKER_INDEX` (Playwright, per worker) falling back to
the pid. The teardown filter `+${PROCESS_ID}-` still matches, so ownership is
unchanged. **Class rule:** fixture identity is unique by construction (worker +
random), never by a counter shared across processes.

**Final addendum (2026-08-18) — closed.** The addendum fixed `mintEmail` but
`testEmail(RUN_ID, n)` in `e2e/global-setup.ts` still built the old shape, so
`auth-signup` A-1 collided under parallel workers ("Check your email" never
rendered — the address was already registered). `testEmail` is now a **thin
alias of `mintEmail`**; the legacy `id` argument is ignored (ownership always
comes from `processId()`), so no spec can construct a colliding address. Call
sites inherit the new shape with no further edits: `e2e/global-setup.ts` (setup
fixture), `e2e/auth-signup.spec.ts`, `e2e/auth-signin-errors.spec.ts` (B-2/B-3
never-registered addresses), `e2e/nightly/auth-resend-exhaustion.spec.ts`. A-1
now polls for heading-or-error and reports the app's own error text, so a future
collision reads as "already registered" instead of a missing heading. Nightly
needs no change: the last two red nightlies ran the pre-fix suite serially and
are expected to clear tonight; the supervisor verifies tomorrow's heartbeat.
INC-080 is CLOSED.

### INC-082 (2026-08-17) — Sharded E2E hits the Auth email rate limit (sign-up/resend tests)

The generic UI error masked the cause until the diagnostic assertion: the Auth
API's email/signup quota (per-project, per-hour) is consumed by 5 parallel
processes plus the resend tests within minutes, and `auth-service.ts` maps a
non-429 shaped failure to `auth.errorGeneric` — so A-1 read as "Something went
wrong" instead of "rate limited". Fix: email-sending tests isolated in a single
serial project (`email-serial`) with its own CI job (`E2E email (serial,
quota-bound)`), removed from the shard matrix and the smoke tier via explicit
`--project` selection; A-1 watches the Auth API for a raw 429 and fails with a
self-naming reason quoting `over_email_send_rate_limit` /
`over_request_rate_limit`, with no retry loop past the limit. **Class rule:**
tests that consume an external quota run single-instance and name the quota when
it bites.

**Addendum (2026-08-19).** Ethereal sink refreshed per the launch-gate WATCH
(expired ephemeral account = the generic-SMTP-failure signature + 3 red
nightlies); the 429 watcher was over-broad and flagged the deliberate resend
throttle — scoped to the sign-up phase. **Class note:** guards that watch for an
error code must exclude the paths where that code is the expected behavior.
Same addendum: `openRailScope`'s retry branch asserted `toHaveCount(0)` to prove
"not mid-animation", which converted a merely slow drawer into a failure; it now
keeps waiting when the dialog is mounted and re-clicks only when nothing
mounted.

### INC-083 (2026-08-22) — Same-tree divergence: sharded run 32380360503 failed 9 (parallel-load window), the serial nightly on the identical tree passed all; disposition: re-run. Reporter gap found: Playwright's JSON reporter emits no steps — the step-walker and the last-steps block never fired on real data; the self-test fixture encoded the assumption (supervisor design slip). CLASS RULES: (1) reporter fixtures are captured from real output, never authored from assumption; (2) next CI task quotes each failure's error-context.md (which carries the pending-action call log) instead of JSON steps.

### INC-084 (2026-08-22) — U2 walk + evidence bundle

(a) Delete-confirm compared against the role key but displayed it only in the Meta card — operator typed a guess and the button stayed correctly disarmed; the key now renders adjacent to the field (+ duplicate role-name testid split into role-key). (b) Matrix action/resource vocabulary rendered raw English under Amharic — it is finite chrome, not data: i18n maps + coverage-guard extension. (c) RP-1 failed on both viewports by locating rows without the responsive-twin helper (hidden card/table twins) — roleRow added; CLASS RULE reaffirmed: specs never locate primitive list rows except through the twin-aware helper. (d) Five parallel-load timeouts recur without diagnosable evidence — error-context quoting ships now (INC-083 rule 2); the JSON-steps mechanism is retired as impossible. Open product question registered: restrict which permissions are grantable to custom roles (assignable-scope flag) — future hardening, operator-raised.

(e) The context-quoting reporter crashed on its first live run (no report commit for ce7ec6c; ci-status published normally) — root cause: an unparseable `results.json` from a source that died mid-write made `Bun.file().json()` throw straight out of `main`, so the process exited 1 having written nothing, and the step (running under `set -u`, without `set -e`) went on to commit the unchanged checked-out file: "No report change". Fixed: results files are parsed defensively (an unreadable one is a quoted source-without-results), plus a never-silent top-level wrapper (a reporter crash writes its own REPORTER ERROR report and then exits non-zero), download resilience on all three artifact downloads, and permanent layout fixtures (per-artifact subdir, merged flat, zero artifacts). CLASS RULE: new CI plumbing ships with a live-shape rehearsal; reporters may never die namelessly.

(f) The reporter's layout fixtures were never committed — unanchored `test-results/` in .gitignore excluded their realistic inner paths at any depth; local self-test passed on untracked files while CI found 0. Root-anchored the pattern; all context fixtures tracked and proven. CLASS RULES: completion reports prove tracking via git ls-files; "works locally" includes a clean git status check of every new path.

(g) First run with the committed fixtures still reported "context file not found" for every failure: Playwright's output-directory slug carries the WHOLE `titlePath` (spec base + describe chain + test title) but the matcher built its core from the bare test title, so any test inside a `describe` — nearly all of them — matched nothing. Fixed: `collect` now records `titlePath` (excluding the file suite, which supplies the spec base) and the matcher joins it; a real describe-nested capture is committed as a permanent fixture and the self-test fails if the match regresses. Straggler cleared in the same pass: `expectSignedIn` located the account menu's sign-out by its English accessible name (icon + active catalog) — it now anchors on `account-menu-sign-out`. CLASS RULES: (1) reporter fixtures must cover BOTH the describe-less and describe-nested slug shapes; (2) E2E never locates chrome by a hardcoded English label when a testid exists.

### INC-085 (2026-08-22) — U3 banner query survived the hard reset (SO-4 tripwire); A-2's zero-sections premise expired

(a) ImpersonationBanner mounted unconditionally with an enabled prop — a mounted useQuery re-registers its disabled entry after removeQueries (INC-078 class, second occurrence of the pattern post-law): fixed by conditional mount + gcTime:0. CLASS RULE hardened: auth-scoped queries live in components that UNMOUNT on sign-out; `enabled` is never the mechanism. (b) A-2 asserted moderators see zero admin sections — true only while audit was a placeholder; re-anchored to exactly-one-section truth. CLASS NOTE: section-visibility specs assert the censused set, not emptiness.

(c) The parallel-load flake family unmasked: context snapshots showed the server's static error page ("This page didn't load") across three unrelated tests — the dev SSR server intermittently fails requests under 6-way CI load; every prior 60s/element-not-found recidivist is consistent with an undelivered page. The page logged nothing and retried nothing: server catch now logs [ssr-error] + DEV-embeds the cause; gotoReady retries once then fails named. Build-serve migration registered as the durable fix candidate pending named evidence.

(d) ACTED on (c)'s registered candidate — DEC-018: CI runs the PRODUCTION build in E2E mode and serves it through wrangler, removing the dev-SSR flake class at the root instead of retrying around it. `dist/server/wrangler.json` IS emitted by the current nitro build, so the 2026-08-01 evidence that forced dev-server mode (Option B) no longer holds; local wrangler needed a current release (an older pinned binary refuses the build's compatibility date). Test-only instruments moved from `import.meta.env.DEV` to `isE2E` (`src/lib/env-flags.ts`) so the built E2E app keeps them and production still compiles them out. Retry policy centralised in `e2e/fixtures.ts` (one document-response guard, one reload, then a named failure); the reporter now quotes `[ssr-error]` lines from every failed source's log and matches context directories by token containment. CLASS RULE: when a flake family's cause is the TEST ENVIRONMENT differing from production, migrate the environment — retries around it only buy silence.

(e) First build-serve run: nitro's target is sandbox-detected by the preset; CI resolved differently and emitted no dist/server — six jobs died at serve with ENOENT while the build step passed. Target pinned explicitly (`vite.config.ts` now passes the wrapper's supported `nitro: { preset: "cloudflare-module", output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" }, cloudflare: { nodeCompat: true, deployConfig: true } }` — verbatim the values the wrapper applies only inside the sandbox branch); build-output verify step added. CLASS RULE: implicit environment detection in build tooling is pinned explicit the moment two environments disagree; every build step that feeds a serve step verifies its own output.

(f) First production-build suite: 24 failures with blank snapshots and no server errors — the hydration gate polled React's internal `__reactProps$` markers (a dev-era heuristic) and the harness had no client-error capture, so "not yet hydrated" and "crashed during hydration" were indistinguishable. The app now declares readiness explicitly (`data-app-ready`, root effect) and the fixture buffers pageerror/console errors, attached on failure and tag-grepped by the reporter. CLASS RULE: readiness is an explicit contract the app sets, never an inference from framework internals; every runtime error channel (server log, browser console, page error) has a capture path into the evidence file.

(g) The prod-build suite's own evidence was unreadable: 25 failures whose ring buffer held only "Minified React error #185 … at si" with the ready-marker absent — an update-depth loop that reproduces on production timing only, named by nothing because the e2e bundle was minified and the console capture kept `message.text()` (arg 0) while React's component stack rides the LATER args. Fixed: the e2e build is unminified with sourcemaps (`VITE_E2E=1` branch in `vite.config.ts`), and the fixture joins all console args (first 500 chars). The plain `bun run build` — the one the first-paint bundle budget job measures — never sets `VITE_E2E`, so the shipped bundle and its ceiling are untouched. CLASS RULE: test builds are never minified; a test artifact optimises for readability, never for size.

(h) INC-085h — THE E2E BUILD SHIPPED A 404 STYLESHEET. Local repro of the production/e2e bundle (`build:e2e` + `serve:e2e:built`) showed the SSR HTML printing `/assets/styles-DmnTMSCG.css` while the client build had emitted `/assets/styles-B6HzPvrJ.css`: the only 404 on the page, and every e2e page therefore rendered with NO styles. Cause: (g)'s `minify: false` applies to CSS too and lands in BOTH build environments, and the unminified CSS the SSR graph hashed is not the CSS the client graph emitted — the two content hashes diverge. The plain production build minifies in both graphs, so the hashes match and prod was never affected; the defect existed only in the test artifact created to make tests readable. Downstream: with no stylesheet, `hidden`/`md:hidden`/`sr-only` variants do nothing, so responsive-duplicated chrome is all visible at once — locally reproduced as `strict mode violation: getByRole('link', { name: 'ethio.com' }) resolved to 3 elements` and 15 failures across shell/rbac, matching CI's failure count and its `[client-error] Failed to load resource: 404` lines. The same unstyled DOM is what makes the #185 update-depth loop possible: `useFooterInset` observed `document.body` while its measured inset is written onto the rail, and an unstyled rail is NOT taken out of flow, so writing the inset resizes the body and re-fires the observer — a self-feeding setState loop, present only under real (non-dev) styling failures.
FIX: `cssMinify: true` pinned in the `VITE_E2E` branch so the CSS pipeline is byte-identical to prod in both graphs (hashes now match; zero 404s, `data-app-ready="1"` on `/` and `/settings` at 360x740 and 1280x800), and `useFooterInset` no longer observes `document.body` (`#main`/`main` still covers the locale-switch height change that observation was added for).
CLASS RULE 1: a test-build relaxation may change CODE GENERATION but never ASSET IDENTITY — anything that feeds a content hash (CSS/JS pipeline settings) stays exactly as production has it, or the SSR graph and the client graph stop agreeing on filenames. CLASS RULE 2: a ResizeObserver may never observe an ancestor whose box the observed measurement itself can move; measurement targets and mutation targets are disjoint sets.

(i) INC-085i — THE LOOP NAMED. An uncapped local reproduction of the broken E2E artifact produced this first application frame after React's `dispatchSetState`:

```text
at setInset (http://127.0.0.1:4173/assets/index-BQfrtM6r.js:2460:13)
at measure (http://127.0.0.1:4173/assets/index-BQfrtM6r.js:2475:7)
at schedule (http://127.0.0.1:4173/assets/index-BQfrtM6r.js:2482:28)
in useFooterInset (at src/components/shell/app-rail.tsx:380)
```

ROOT CAUSE: `useFooterInset` still observed the footer after the body observer was removed. During the production-shaped E2E artifact's unstyled first frame (the stylesheet hash 404 in INC-085h), the rail was in normal flow. Applying the measured inset to that rail moved the footer, the footer's `ResizeObserver` scheduled another measurement, and `setInset` repeated. Development did not expose it because Vite injects styles rather than loading the mismatched hashed asset; ordinary production did not expose it because its CSS remained minified and hash-stable. Removing the body observer therefore reduced one feedback path but left the footer-to-rail-to-footer path intact.

FIX: the hook observes only the content region, never the footer or a layout-coupled ancestor, and treats an unchanged measurement as a complete no-op before either its DOM attribute or React state is written. The harness retains complete `pageerror` stacks, raises console evidence to 2,000 characters, and collapses consecutive identical Client/Server report lines to one line plus `×N`.

CLASS RULE: a measurement subscription must not observe any node whose geometry its callback can directly or indirectly mutate; stable measurements must be equality-guarded before every state or DOM write.

## INC-087 — platform-injected auth storage caught by the gates

The platform injected `src/integrations/supabase/previewAuthStorage.ts` and rewired `src/integrations/supabase/client.ts` to use it (commit `857f049`, "Lovable update"). The "Build, typecheck, lint" job failed in 22 seconds and every E2E job died downstream. Local reproduction: `bun run typecheck` clean, `bun run build` clean, `bun run lint` **23 errors** — 22 `prettier/prettier` (single-quoted string literals and unwrapped lines against our double-quote, 100-column Prettier profile) and one `prefer-const` (`let timer` is never reassigned) — all 23 inside `previewAuthStorage.ts` and none anywhere else.

DISPOSITION: **E5 exemption, not in-place conformance.** The file opens with `// This file is automatically generated. Do not edit it directly.` and is rewritten wholesale by the platform each time preview auth is re-injected, so any reformatting we commit is destroyed by the next injection and the same red main returns. It is therefore regeneration-owned, exactly the class of `src/routeTree.gen.ts` and `src/integrations/supabase/types.ts`. The exemption is scoped to this one path in `eslint.config.js` (`ignores`) and `.prettierignore`; no rule was relaxed, no glob widened, and every hand-authored file remains fully gated — `bun run lint` still reports `0 errors`, and the hardcoded-string, migration, browse-path, listing-write, marketplace-weight and deletion guards are unaffected because none of them read this path.

SAFETY: the broker is inert off the Lovable preview surface. `PREVIEW_ZONES` matching plus a UUID-anchored host pattern plus the `window.parent !== window` frame test must ALL hold; otherwise the module returns plain `localStorage`. CI's `127.0.0.1` origin, the production domain and the published `lovable.app` host (no project UUID in a non-user-controlled host position) each fall through to `localStorage`, so the U0k localStorage audit, SO-3b's `sb-*-auth-token` handling and the session-policy clocks read exactly what they read before. Auth material leaves the page only through `window.parent.postMessage` with a `targetOrigin` drawn from `EDITOR`-validated Lovable editor origins, and inbound replies are discarded unless `event.origin` is in that same validated list — an untrusted embedder can neither receive nor forge a session.

CLASS RULE: platform-generated files are held to our gates like any other file — for each one we decide **conform or E5-exempt**, per file and with the reason recorded. A file we can edit durably gets conformed; a file the platform rewrites gets a path-scoped exemption. Weakening a gate to accommodate generated output is never the remedy.

## INC-088 — the e2e serve died in workerd, not in our code (DEC-019)

SYMPTOM: every E2E job produced a `results.json` with zero tests, and the reporter's
40-line tail quoted nothing but repeated "waiting for the web server" lines. The cause
was printed far above that window.

REPRODUCTION (`env -u SANDBOX -u LOVABLE_SANDBOX -u DEV_SERVER__PROJECT_PATH bun run
build:e2e && bun run serve:e2e:built --port 4173`), verbatim after the asset table:

```text
⎔ Starting local server...
[wrangler:info] ✨ Parsed 1 valid header rule.
✘ [ERROR] service core:user:ethio-marketplace: This Worker requires compatibility date "2026-08-28", but the newest date supported by this server binary is "2026-08-27".

✘ [ERROR] The Workers runtime failed to start. There was likely a problem with the workerd binary or your configuration.
```

ROOT CAUSE: nitro stamps the built worker's `compatibility_date` with the BUILD DAY.
`wrangler dev` runs a pinned workerd binary whose newest supported date is, by
construction, never newer than its own release day. On any day after that release the
local serve refuses to start before the first request. Nothing in the application is
involved; bumping the pinned wrangler only moves the same cliff forward one release.

DEC-019 BRANCH: **the first branch fired** — the failure is in the wrangler/workerd
runtime class. The per-push CI serve therefore moved to nitro's `node-server` preset
(`node dist/server/index.mjs`, via `scripts/serve-e2e-node.ts`): the same built
application code, no bunx download, no workerd. The deploy target is unchanged —
`NITRO_PRESET` is unset everywhere except the e2e build, so the shipped build still
resolves `cloudflare-module` byte-identically. One nightly job,
`cloudflare-parity-smoke`, keeps a wrangler-served smoke pass on the deploy runtime and
prints an explicit line when it dies for the compatibility-date reason rather than for
an application break.

EVIDENCE FIX: a zero-test source's log is no longer quoted as a raw tail. The report
now carries every ERROR-shaped line from the FULL log (`/✘|ERROR|error:|Error:|exited
with code/`, capped at 30, oldest first — the first error is the cause) followed by the
final 10 lines, proven by `scripts/fixtures/e2e-log-boot-crash.log`, a banner-then-crash
log whose tail is pure noise.

PLATFORM-ORIGIN NOTE: Lovable's auto-pushes land on main with a fixed commit subject.
The reporter now prefixes a `PLATFORM-ORIGIN?` line when the run's head commit message
is `Lovable update` or `Work in progress` (one exact string check on the subject line,
fed by `E2E_HEAD_COMMIT_MESSAGE`), so a red whose likely origin is platform-injected
code says so instead of costing a diagnosis from scratch.

CLASS RULE: a test harness may not depend on a runtime whose acceptance window is
pinned to a binary's release date while its input is stamped with the build date. When
the failing layer is the runtime and not the application, migrate the harness and keep
exactly one parity job on the deploy runtime.

## INC-089 — the #185 loop is an `asChild` ref contract break, not a footer measurement

React error #185 kept firing after INC-085i with app frames finally visible in the
unminified e2e bundle:

```text
dispatchSetState
  ← <anonymous @22054>   (index-w2z5Ky7H.js)
  ← setRef
  ← Array.map
  ← setRef
  ← <anonymous @24285>   (index-w2z5Ky7H.js)
```

RESOLVED SITE: both offsets land in Radix's `composeRefs`/`useComposedRefs`
(`refs.map(ref => setRef(ref, node))`), invoked from the two Slot parents the rail
stacks on a MAPPED row in `src/components/shell/app-rail.tsx` — `CollapsibleTrigger
asChild` (RailRow's submenu branch, previously line 118) and `TooltipTrigger asChild`
inside `WithTooltip` (previously line 53). Both Radix triggers compose a `useState`
setter as one of their refs.

CAUSE: `CollapsibleTrigger asChild` was given `WithTooltip` as its child, and
`WithTooltip` never yields a ref-holding element — expanded it returned a Fragment,
collapsed it returned a Tooltip Root. A Slot parent whose child cannot hold a ref
writes its composed state-setter with `null` on every render pass, so
`setRef → dispatchSetState → re-render → setRef` never settles; every mapped rail row
multiplies the churn until React aborts with #185.

FIX (root, both components): the tooltip now wraps the TRIGGER instead of sitting
between the trigger and its DOM element, and `WithTooltip`'s non-collapsed branch
returns `children` unwrapped — so every `asChild` parent in the rail receives a real
ref-holding element.

CLASS RULE — MAPPED CHILDREN NEVER TAKE INLINE STATE-WRITING REF CALLBACKS, AND NO
`asChild` PARENT EVER RECEIVES A FRAGMENT OR A ROOT/PROVIDER COMPONENT. If a wrapper
component is conditional, it must be placed OUTSIDE the trigger, never between the
trigger and its element.

CORRECTION TO INC-085i: INC-085i attributed the whole #185 family to
`useFooterInset`'s ResizeObserver feedback. That attribution was INCOMPLETE. The
observer loop was real and its fix stands, but it accounted for only one class; the
surviving loop is the rail's `asChild` ref contract break recorded here. The record is
corrected accordingly — INC-085i's frames named the hook that _re-rendered_, not the
ref that _dispatched_.

THE STRAY 400 (shard 1 client errors): captured verbatim locally on the negative
sign-in path —
`POST https://<project>.supabase.co/auth/v1/token?grant_type=password` →
`400 {"code":"invalid_credentials","message":"Invalid login credentials"}`.
It is GoTrue's by-design response to the wrong-password specs; the app renders the
translated error. Environmental to the auth suite, not an application defect — no fix.

LOCAL-REPRO LIMITATION (recorded so the next reader does not repeat it): inside the
Lovable sandbox the vite wrapper forces `preset: "cloudflare-module"` regardless of
`NITRO_PRESET`, so `serve:e2e:built` runs the worker entry under node and serves NO
static assets (every `/assets/*` 404s, nothing hydrates). Local verification therefore
front-ends the built server with a static file server for `dist/client`. CI is outside
the sandbox and gets the real node-server output (DEC-019 unaffected).

## INC-089 ADDENDUM (run 33166409697) + INC-090 — THE SIGNED-IN #185 LOOP AND THE CLAMP LAW

CLASS 1 — CLAMP LAW CORRECTED (`src/components/shell/use-footer-inset.ts`).
Evidence line: `shell.spec.ts › rail scroll regions (U0f) › md+ rail` —
`rail bottom must be min(viewport bottom, footer top) … Expected: <= 2, Received: 28`.
INC-085i removed the footer ResizeObserver (correctly — it fed itself), but that
observer was also the ONLY path that re-measured when the footer is ALREADY in view
at first paint and nothing ever scrolls: the mount measurement lands before fonts and
late layout settle, so the rail kept a stale inset and overhung the footer.

CORRECTED LAW — the footer top is read PULL-BASED (inside `measure`, never observed);
the trigger set is exactly: (1) mount plus a bounded settle pass (next frames,
`document.fonts.ready`, 0/60/200/600 ms one-shots), (2) scroll / scrollend / resize,
(3) a ResizeObserver on the CONTENT region (`#main`) only — never the footer, never
the body. Every pass is idempotent through `lastApplied`, so a stable measurement is a
no-op for React state and for the diagnostic attribute alike.

CLASS 2 — RESIDUAL #185 IS REAL, AND IT IS NOT A REF-CALLBACK SITE (INC-090).
The client-error channels attach to FAILING sources (shards 1–4 all carry the lines),
so the tail was not cured noise. Resolving the two offsets against the local
sourcemapped e2e build (`dist/client/assets/index-*.js`, unminified) gives, verbatim:

```text
22054: const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
       — @radix-ui/react-focus-scope, FocusScope
24285: ref: import_react.useCallback((node2) => { stylesRef.current = node2 ? getComputedStyle(node2) : null; setNode(node2); }, [])
       — @radix-ui/react-presence, usePresence
```

Both are Radix's own composed state-setting refs inside an OPEN overlay (dropdown
menu / drawer). They are the loop's LOUDEST dispatchers, not its source: they churn
because their whole subtree re-renders without end. The source is the shell:

`usePermissions` returned `enabled ? (query.data ?? []) : []` — a NEW array on every
render whenever the read is loading, disabled or errored. `<PermissionsLoader/>`
reports through an effect whose dependency array contains that value, and the shell
stored the report as a NEW object. So: render → new array → effect → shell setState →
render … an unbounded loop that only exists for a SIGNED-IN shell, which is exactly
the population of this run's failures. React aborts with #185 and the root error
boundary paints "This page didn't load".

FIX (root, both halves): one module-level `EMPTY_PERMISSIONS` constant plus a
`useMemo` on `query.data` in `usePermissions`; an equality-guarded writer
(`applyPermissions`) in `AppShell` so an unchanged report is a genuine no-op.

CLASS RULE — A VALUE THAT CROSSES AN EFFECT DEPENDENCY ARRAY OWNS ITS IDENTITY. Hook
results that feed effects must never mint fresh arrays/objects for the empty or
loading case, and every state writer fed by such an effect must be equality-guarded.

ADDENDUM — the reporter's boot-crash fixture is a tracked file test: an untracked `.log`
fixture was swallowed by `.gitignore *.log` and caused a green suite to red at report
self-test; the durable fix is renaming to `.log.txt` and treating every fixture path as a
commit-time tracked-files proof (INC-091).

CLASS 3 — THE SINGLES, PER TEST (all diagnosed from the run file, no spec changed):

- `admin-users.spec.ts › AU-5` — context: the error page; timeout waiting on a dead
  shell. Same INC-090 loop. No spec change.
- `auth-callback.spec.ts › C-1`, `› C-3` — context: `account-menu-sign-out` never
  appears; snapshot is the error page. The signed-in shell crashed before the header
  rendered. INC-090. No spec change.
- `settings.spec.ts › S-2`, `› S-3 (U-4)`, `› S-4` — identical evidence (error page +
  missing sign-out). INC-090. No spec change.
- `shell.spec.ts › panel-scoped chrome › location row …` — identical evidence.
  INC-090.
- `shell.spec.ts › rail scroll regions › drawer …` (mobile) — context: the error page,
  test timeout; INC-090 (the drawer is an open Dialog, i.e. the FocusScope/Presence
  frames above).
- `admin-roles.spec.ts › RP-8` — context: the error page, timeout. INC-090.
- `smoke-auth-i18n.spec.ts` (mobile-360 and desktop-1280) — identical evidence.
  INC-090.
- `shell.spec.ts › rail scroll regions › md+ rail` — the only NON-#185 failure of the
  twelve; Class 1 above.

No timeout was loosened, no assertion weakened, no suppression added; no spec file was
re-anchored because no evidence line shows product truth changing.

LOCAL PROOF (signed-out surfaces only — see the limitation below): built e2e bundle,
served locally, `data-app-ready=1`, zero console errors, clamp delta
`/ @1280x360 = 0`, `/ @1280x800 = 1.5`, `/auth @1280x360 = 0` (law allows <= 2).
The signed-in surfaces remain CI's to prove: the sandbox has no staging service-role
key, so no fixture user can be created or signed in here.

| INC-091 | 2026-08-28 | Fixture file `scripts/fixtures/e2e-log-boot-crash.log` was ignored by `.gitignore *.log` and never tracked, so CI reporter self-test ENOENTed while the suite itself was green (INC-084f law) | FIXED — renamed to `.log.txt`, path updated in `scripts/e2e-failure-report.ts`; tracked-files proof now mandatory for every new fixture |

| INC-092 | 2026-08-29 | U3 walk: audit Details opened the panel at page bottom (found by operator) — inline row expansion is the law for tabular detail (primitives L-series); impersonation scope expectation documented — DEC-021 registered for full act-as at Ops | FIXED — `DataTable` gained an `expandedRow` slot (full-width `<tr>` after the row at md+, in-card at 360); impersonation copy states the read-only model and the DEC-021 roadmap |

| INC-093 | 2026-08-29 | U3a walk: Events-per-day chart rendered unbounded (viewport-height bars) — bounded sparkline variant is the law for trend glances; stat tiles carry the numbers. Same landing reintroduced a bare prefix+`.first()` expand locator that resolved to the hidden responsive twin (INC-084c, fifth occurrence) — visible-container scoping reaffirmed as the only legal pattern | FIXED — `ChartFrame` gained `variant="sparkline"` + `footer` (fixed 64px plot, <= 160px card, normalized bars, 2px zero-day tick, sparse labels); AS-2 locators scoped to `getByRole("table")`. (b) The desktop scoping fix inverted the break at 360 (table absent, cards visible) — sixth occurrence; the class rule is now mechanical: any spec touching a DataTable surface declares its twin-aware surface/row helper first |

| INC-094 | 2026-08-29 | Self-marking law was unsatisfiable by construction: the migration tool assigns a file's 14-digit stamp at WRITE time (after the SQL is authored) and the file cannot be edited afterwards, so `check-migrations.sh`'s "mark must equal its own filename stamp" rule reddened every landing — and each corrective migration inherited the same defect (correction recursion). Surfaced on the U4b read-seam migration | FIXED — DECLARED-MARK LAW: a migration declares a 14-digit mark at or after its filename stamp; `check_mark_file` checks presence + monotonicity, `e2e-migration-preflight.ts` gained `declaredMark()` and compares declared marks against the ledger. Two append-only reconciliation migrations restored ledger parity |

| INC-095 | 2026-08-29 | (a) The D3 runtime flip replaced the compiled active layer instead of overlaying it — an empty DB catalog regressed am to English; CLASS RULE: fallback chains are additive overlays, never replacements. (b) The TR suite anchored to an invented primitive testid — CLASS RULE reaffirmed: spec surface helpers use censused primitive ids only, pasted in the report | FIXED — `I18nProvider` builds `{ ...compiled.en, ...compiled[lang] }` as the base layer and merges the DB bundle over it (chain = DB[lang] > compiled[lang] > compiled.en), so an empty or failing bundle is invisible; `e2e/admin-translations.spec.ts` re-anchored to the censused DataTable ids (`data-table-cards` / `<table>`, mobile row `${rowTestId}-card`, desktop row `${rowTestId}`) (c) First real guard catch: a console key shipped without its am pair (D2) — parity-grepped. (d) Expansion inner ids exist in both twins — the surface helper now owns expansion scoping. (e) Scratch-key law: specs never mutate real catalog keys; namespaced `e2e.scratch.*` only (shared-runtime pollution). Seventh `.first()`-hidden-twin logged. |

| INC-095 addendum g-h | 2026-08-29 | (g) The coverage guard's reverse-match surfaced shadcn's hardcoded sr-only "Close" (pre-existing D1 violation, invisible until an en key carried that value) — primitives i18n'd. (h) Post-purge, TR-6 exposed vacuous completeness: an empty catalog satisfied the publish gate — server now refuses explicitly. CLASS RULE: every completeness/totality gate defines its behavior on the empty set explicitly | FIXED — `admin_set_language_flags` re-declared with the empty-catalog refusal (grants restated, proofs P1-P3); `sheet.tsx`/`dialog.tsx` sr-only labels use `common.close`; the public switch gained the `totalKeys === 0` branch with `admin.translations.syncFirstTooltip`; TR-6 branches on the observed catalog size and is shard-order-proof |

| INC-095i | 2026-08-29 | TR-9 timed out once per viewport with all error channels clean — the full-catalog UI sync is legitimately long under load. CLASS RULE: tests performing real bulk operations carry explicitly sized budgets and named phases; the default budget is for interactions, not batch work | FIXED — TR-9 is now verify-or-sync (reads `en` stats via the DEV client and skips the bulk sync when another spec already populated the catalog), scoped to `test.setTimeout(120_000)`, and wrapped in named `test.step` phases ("sign-in", "sync", "switch+assert") |
| INC-095j | 2026-08-30 | TR-10 re-anchored: the translator card became conditional on the target's effective translations permissions (operator-directed) — spec now proves both states. Registered for the Ops security review: has_permission is client-callable for arbitrary target uuids (pre-existing grant, first client use here) — candidate hardening: self-or-manage wrapper | FIXED — TR-10 proves STATE A (no translations:\* permission → muted no-role line, zero checkboxes, no save button) and STATE B (scratch custom role grants translations:view → checkboxes render, am assigned and saved behind step-up); has_permission exposure logged for Ops review |
| INC-095k | 2026-08-30 | Invoker-RLS blindness: a helper GRANTed to authenticated is not thereby client-usable — invoker functions read under caller RLS and return empty-truth. CLASS RULE: client reads go only through gated SECURITY DEFINER RPCs; a census that finds a callable helper must also confirm DEFINER. The ×5 fan-out is gone; revoking has_permission's client grant registered for the Ops review alongside 095j | FIXED — `public.user_has_translation_permission(uuid)` (SECURITY DEFINER, caller gated on `translations:manage`, granted to authenticated only) replaces the fan-out; an errored check renders its own line and never impersonates absence (F4) |
| INC-095 l-n | 2026-08-30 | (l) U4b-5's empty-state branch replaced the controls for eligible-but-unassigned targets — the entire TR-10 red streak's root; empty state is a caption, never a control-replacement. (m) SUPERVISOR CORRECTION: the 095k invoker-blindness mechanism was a misdiagnosis from a truncated grep — has_permission was SECURITY DEFINER throughout; class rule: function-declaration greps must capture through the AS $$ line before any semantics ruling. The gated scope RPC stands on its merits (single read, no enumeration). (n) The card carried a silent replace-set wipe (no read of existing assignments) — closed by the scope RPC + persistence E2E | FIXED — `public.admin_get_translator_scope(uuid)` (SECURITY DEFINER, caller gated on `translations:manage`, REVOKE/GRANT restated, proofs P1/P2a-c) returns `(eligible, languages)`; the card seeds `selected` from server truth, always renders the checkbox list for eligible targets with the empty state as a caption above it, invalidates the scope query after save, and keys under `authKey("admin","translator-scope",userId)` (INC-078 purge root); TR-10 reloads after save and proves the assignment persists |

- **INC-096 (U4c) — executor capability boundary: new Supabase Edge Functions
  are rejected at the tool layer.** Existing functions remain editable; the
  creation of `supabase/functions/translate/index.ts` was refused. Transport
  ruling (operator, DEC'd to the app server): the provider wrapper lives at
  `src/routes/api/translate.ts` as a TanStack server route with the U4c
  contract verbatim — caller-context Supabase client from the `Authorization`
  header, machine+scope gate before any provider call, v2 endpoint with the
  am/om/ti census, ≤100-item chunks / 600 cap, per-item failure isolation, and
  `admin_machine_translation` as the sole writer. CLASS RULE: a transport that
  the executor cannot create is not a design constraint on the CONTRACT — move
  the host, keep the gates.

- **INC-096 addendum (b–c) — the run-33293988345 500s were handler-issued, not
  SSR renders.** (b) The failing evidence (TR-scope: `Expected: 403, Received:
500` from the fetch response while the surrounding page rendered normally)
  shows POST `/api/translate` REACHED its handler and returned a
  handler-issued 500 from the gate section — a page-registered route rendering
  through SSR could not produce a JSON status for the client's fetch to read.
  Census of the installed `@tanstack/react-start@1.168.26`: NO separate server
  factory exists (`createServerFileRoute` is absent from every installed
  package); `createFileRoute(...)({ server: { handlers } })` IS the
  server-route primitive, augmented into file-route options by
  `start-client-core/serverRoute.d.ts` (`server?: RouteServerOptions`,
  `handlers.POST: (ctx: { request, params, pathname, context, next }) =>
Response`). Verified empirically in BOTH serves: dev AND the
  `NITRO_PRESET=node-server` production build behind
  `scripts/serve-e2e-node.ts` answer POST from the handler (401 without a
  bearer; the compiled bundle keeps `process.env[name]` as a runtime read).
  CLASS RULE: server endpoints use `createFileRoute` + `server.handlers`,
  censused from the installed package; a red-run mechanism ruling must be
  checked against the failure's own evidence shape before any rewrite
  (INC-095m's class rule, second instance). (c) Server-route responses bypass
  the SSR error catch, so the gate-section 500 was invisible to the reporter's
  `[ssr-error]` grep. Handler-level logging is now part of the endpoint
  contract: every 5xx the route issues — thrown or deliberately returned —
  logs `[ssr-error] /api/translate <message + first stack line>` before the
  structured `{error}` body. FIXED — `src/routes/api/translate.ts` wraps the
  handler in try/catch and routes every deliberate 5xx through a logging
  `fail5xx` helper; handler body (gates, chunking, fake mode, single-writer,
  caps, per-item isolation) carried over verbatim.
- **INC-096d — first lit-seam catch: named-argument mismatch in the
  `/api/translate` gate.** The handler's two `supabase.rpc("has_permission",
...)` calls used `_user_id`, `_resource`, `_action`, but the SQL declaration
  names the parameters `p_user_id`, `p_resource`, `p_action`. PostgREST treats
  a wrong argument name as function-not-found, producing the one-line
  `[ssr-error]` "Could not find the function public.has_permission(\_action,
  \_resource, \_user_id)" on the first run after the server-route rewrite —
  previously four blind 500 cycles with no greppable seam. CLASS RULE: every
  `rpc()` argument list is copied verbatim from the SQL function declaration
  and stated in the completion report; the declaration is censused before the
  client seam is written. FIXED — both gate calls now use `p_user_id`,
  `p_resource`, `p_action`; the other RPCs in the same file
  (`get_my_translator_languages`, `admin_machine_translation`,
  `admin_list_translations`) already matched their declarations.
- INC-096e (2026-08-30, U4c-4): TR-11 count corrected to the capture law — two
  revisions for AI-then-edit. The machine write's status transition
  (untranslated → machine) is captured as revision [0] (action=machine,
  prev_status=untranslated, prev_value NULL); the human edit is revision [1]
  (action=save, prev_value = the ⟪am⟫-marked machine value). AI-over-empty is
  history too — the count is the law, not an accident.
- **INC-096f — TR-11's four revisions: a shared scratch key, not a doubled
  writer.** The live bodies of `admin_save_translation`,
  `admin_machine_translation` and `admin_set_translation_status`
  (`pg_get_functiondef`, connected project) each contain EXACTLY ONE
  `INSERT INTO public.ui_translation_revisions`, and each already orders
  permission → step-up (`require_step_up_if_needed`) → scope
  (`translation_scope_ok`) ABOVE that capture and above the mutation, inside
  one transaction — so a refused attempt raises before capture and, even if it
  did not, the raise would roll capture and mutation back together. No trigger
  on `ui_translations` or `ui_translation_revisions` writes revisions
  (`pg_get_triggerdef`: none). The doubling was test identity: `scratchKey()`
  namespaced by PROCESS_ID + `TEST_WORKER_INDEX` only, so the `mobile-360` and
  `desktop-1280` projects — the same job, routinely the same worker index —
  drew the SAME key and mutated ONE catalog row. Each viewport contributed its
  lawful 2 revisions; both then read 4, which is why both viewports failed with
  the same number. Arithmetic: (1 AI via route + 1 human save) × 2 projects = 4.
  FIXED by putting the Playwright project name into the scratch namespace.
  CLASS RULE (ratified regardless of this instance's cause): capture and
  mutation live strictly below every gate; a refused attempt leaves no trace
  but its audit refusal. The live writers already satisfy it, verified above —
  no re-declaration migration was shipped, because a no-op re-declaration of a
  correct SECURITY DEFINER writer is risk without change (A3/A4: the conflict
  is reported, not silently resolved). SECOND CLASS RULE: shared-runtime
  fixture identity includes EVERY axis that can run the same test twice —
  process, worker AND project.

- **INC-096f-b** (2026-08-30): The project-name fix was one axis short. The
  DEC-023-B changed-spec fast lane added a third concurrent job, and scratch
  keys collided **across jobs** because `PROCESS_ID` is run-scoped (`GITHUB_RUN_ID`)
  and the fast lane uses `E2E_SHARD=changed`. Same-project workers in different
  jobs drew the same key, so TR-11 again read 4 revisions from multiple jobs
  (run 33297507465: shards 1 and 3 plus the changed lane). CLASS RULE finalized:
  mutable-fixture identity enumerates every parallelism axis — `run id × job
(E2E_SHARD) × worker × project`. The fast lane's maiden run surfaced this in
  three minutes — working as ratified. FIXED by putting `E2E_SHARD ?? "solo"`
  into the scratch namespace.
- 2026-08-30 — **INC-096f-c** — Per-test tag completes fixture identity
  (`run × shard × worker × project × test`): with the four-axis namespace
  confirmed in-tree, run 33298052285 still read 4 revisions because every TR
  test in one worker derived ONE key, so sibling tests' writes landed on
  TR-11's row. `scratchKey(tag)` now takes the per-test tag (tr3/tr4/tr6/tr8/
  tr11/tr12/tr13), and TR-11's count assertion dumps every revision row
  verbatim on mismatch — counts never again require archaeology.

- **INC-096g — TR-12 parsed a localized summary for its count.** Fragile and
  stale-list-blind: the digits-concat parse read a bar whose untranslated list
  was computed before this spec's seeds landed ("Expected >= 3, Received 0").
  Per-key DB truth is the law for bulk assertions (TR-11's pattern); the
  summary asserts visibility only. Global-setup now reaps hour-old
  `e2e.scratch.%` rows: fixture graveyards self-heal.

- INC-097 — U4d scope census: the URL-scoped Interface|Data toggle cannot persist unless `src/routes/admin.translations_.$lang.tsx` parses `scope` (`validateSearch` is the single parse point, INC-073), and the strings page was already 565 lines, so the Data scope landed as a sibling `data-scope.tsx` rather than growing that file past the ~300-line split law (B4). Both files are named in the completion report as deliberate, minimal additions outside the task's literal file list.

- **INC-097b — fixture lookups are service-client reads.** TR-14's Addis Ababa lookup met `permission denied for table locations` at its own `.single()`. A fixture read hitting GRANT/RLS denial is a spec bug, not a product one: fixture reads go through `adminClient()` (the established service-client path), never a page-tier client. Root census: `locations` predates the E1 service-role GRANT law — its migrations grant `anon`/`authenticated` only, so even the service role needs the corrective grant migration tracked separately.

- **INC-097d — global sweeps collide with shared-surface seeding by definition.**
  Dump-proven in run 33310150087: (1) TR-12's by-design global bulk swept
  sibling tests' scratch keys on `am` (row[0]'s actor was the bulk persona);
  (2) TR-14's real-row Addis Ababa fixture met the previous run's residue.
  The fence: such tests operate in a dedicated fence language (admin-only,
  never public), and real-row fixtures are replaced by per-axes scratch
  entities with reaper-backed cleanup. Third pillar of the fixture-identity
  law: identity isolates ROWS; fences isolate SWEEPS. The fence code is `zxx`
  rather than the literal `e2e` because `/api/translate` validates
  `target_lang` against `/^[a-z]{2,8}(-[a-z]{2,8})?$/`, which rejects the
  digit; the code is one exported constant in `e2e/global-setup.ts`.

- **INC-098 — the publication gate governed data but not choice.** U0's language
  switcher predated the `languages` table and kept a static list, so an
  unpublished language stayed selectable and a non-public code could activate a
  compiled catalog the gate had never blessed. Fixed in U4f: the switcher reads
  the public list (`enabled_public OR is_base`, ordered by `sort`), the runtime
  validates every activation source against it and falls back to the base
  language with one warning, and approve now refuses flagged rows. CLASS RULE:
  every consumer of a gated list reads the gate's source.

## INC-098b — a root provider gated on a network read (2026-08-31)

The publication-gate fix gated the ROOT on a network read — three specs stuck
on their URLs. CLASS RULE: root providers render immediately from local state
and reconcile async; gates change state once, equality-guarded, never block or
loop.

Verified alongside the fix: route guards are independent of i18n. `/admin`'s
gate (`src/routes/admin.tsx`) derives `pending` from `authLoading || loading`
(shell auth + permissions) and navigates from that effect alone; `useI18n()` is
used there only for `t`. No guard, loader or redirect reads `publicLanguages`
or `gateReady`.

## INC-098c — geometry assertions must wait for data-settled state (2026-08-31)

U0f drawer geometry raced category loading: the smoke run resolved the last
`li` to `rail-category-skeleton` twice before real rows, and a scroll performed
on skeleton height left the final item out of the viewport. CLASS RULE:
geometry assertions wait for data-settled state — skeleton count 0 — not merely
hydration. The non-blocking provider surfaced the assumption.

## INC-099 — a wrapper/\_impl split dropped authenticated EXECUTE (2026-08-31)

A wrapper/\_impl split re-declared functions without restating authenticated
EXECUTE on the wrapper the app calls — a Postgres-level denial masquerading as
an app refusal ("permission denied for function admin_translation_stats",
run 33363319629; TR-3/4/8/11/12 cascaded from the page's stats call).

CLASS RULE (E6 applied to grants): every migration touching functions ends with
a `has_function_privilege` totality proof over the exact signatures the app
calls; an overload census prevents stale-signature resolution.

Fixture corollary: fixture reads are table reads (service client); gated RPCs
are for the app. TR-21's stats assertion now counts `ui_translations` rows
directly.

## INC-099b — language sort shipped tied at 0

Language sort shipped tied at 0 — roster and switcher order were undefined and
new languages could never append; normalized with rank, append-on-insert, and
(sort, code) ordering everywhere. Poll budgets must be shorter than test budgets
so failures self-describe.

## INC-099c — a tool-split DEFINER/REVOKE pair left the guard permanently red (2026-08-31)

`scripts/check-migrations.sh` requires a SECURITY DEFINER function's REVOKE in
the SAME file. The migration tool wrote `languages_append_sort` (U4g-3,
`4a00896e`) and its REVOKE (`f18f1883`) as two files, and tool-managed
migrations cannot be edited afterwards — so the scan stayed red although the
database was correctly locked down.

MECHANISM (DEC-022-B): the follow-up lands in the same landing, the operator
applies both in one step (apply-pairing), and the earlier file is entered in
`scripts/migration-guard-allowlist.txt` with a reason and its closing migration
fragment. Allowlisted files are skipped by the definer scan and PRINTED on every
run — nothing is silently skipped, and the law itself is unweakened.

CLASS RULE: trigger helpers default to SECURITY INVOKER; DEFINER is for gated
entry points only. `languages_append_sort` was re-declared as INVOKER (U4g-4)
with its REVOKEs in-file and an append proof under invoker semantics.

## INC-100 — re-runs were blind: artifacts could not be overwritten (2026-08-31)

Re-run attempts could not overwrite attempt-1 artifacts; the reporter read
nothing and reported a wipeout (run 33367384491 attempt 2 → "Passed 0 ·
Skipped 0 · Failed 0" while shards 1/3 and the changed lane visibly failed).

CLASS RULE: evidence artifacts are overwrite-on-rerun and the report names its
attempt; a wipeout on attempt >= 2 with a green preflight now reads as
"artifact contract broken", never as "no tests ran".

## INC-101 — auth-derived state never settled behind the i18n language read (2026-08-31)

Since 4301a18 the built app intermittently never settled its auth-derived
state: the account menu rendered the "Signed in" fallback (the profile
`display_name` read never resolved — smoke S-2), `/admin` stopped redirecting a
regular user (AdminGate's `pending = authLoading || loading` never cleared —
R-2, earlier A-3), and translation cases stalled behind the same reads.

DIFF REVIEW (`git diff 4301a18..HEAD -- src/`): the shell auth/profile query,
`usePermissions`, `authKey()`/purge machinery and the app-shell/app-header/
app-rail/breadcrumbs consumers are UNCHANGED. The only convicted change is
`src/i18n/provider.tsx:99` (U4f) — a NEW Supabase read (`fetchPublicLanguages`,
`src/i18n/provider.tsx:49`) issued from the provider that wraps the whole tree.
Hypotheses (a) key/enabled depending on provider state, (b) a purge on the
language reconcile, (c) a U4d profile→user mapping change and (d) context
identity resetting auth state are all KILLED: `MY_PERMISSIONS_KEY`
(`src/features/permissions/usePermissions.ts:20`) and its `enabled` flag carry
no i18n input, the reconcile effect (`src/i18n/provider.tsx:190`) touches no
query cache, `applyUser` still reads `display_name`
(`src/features/auth/use-auth.ts:45`), and `applyPermissions`
(`src/components/app-shell.tsx:220`) is equality-guarded.

MECHANISM: supabase-js serialises all session access through one exclusive auth
lock, and `onAuthStateChange` callbacks run while it is held.
`src/features/auth/use-auth.ts:61` issued the profile read from INSIDE that
callback — a documented re-entrancy. With no other contender the lock always
drained; the i18n gate read, mounted above the shell and fired on the same
first frames, now interleaves and the profile read — and the permission read
queued behind it — can hang forever. Both symptoms are one stuck lock.

FIX: the auth callback never touches Supabase (macrotask hop, sequence ticket
unchanged), and the i18n gate read is deferred by one macrotask so the auth
client initialises first. No test budget was loosened.

CLASS RULE: AUTH-DERIVED STATE SETTLES INDEPENDENTLY OF EVERY OTHER READ. No
Supabase call is issued from inside an auth-state callback, and no provider
above the shell may issue a Supabase read on the first frames of the session
bootstrap.

J2 ADDENDUM (dump-proven: TR-12's `zxx` key came back approved because TR-19's
approve-all swept the shared fence): ONE FENCE PER GLOBAL-SWEEP TEST. TR-19 now
owns `zxy`; the reaper covers every fence code.

INC-101 ADDENDUM (U4g-7) — the U4g-6 hop deferred TOO MUCH. The macrotask hop
wrapped the whole `applyUser`, so the SESSION IDENTITY (user id / email), which
comes from the callback payload and needs no Supabase call, also landed a tick
late. For that frame every auth-derived consumer saw "signed out":
`usePermissions({ enabled: user !== null })` (src/routes/admin.tsx:39,
src/components/app-shell.tsx:195) stayed disabled, and the admin lists mounted
behind it could resolve their gated reads as empty with nothing re-keyed on
identity to force a refetch — RP-2's created role and TR-3/TR-8's seeded keys
read as "element(s) not found" while present in the DB.

CLASS RULE: AUTH IDENTITY IS SYNCHRONOUS; ONLY NETWORK READS HOP. Anything
derivable from the auth event payload is applied in the same tick; only calls
that would re-enter supabase-js's exclusive auth lock are deferred
(src/features/auth/use-auth.ts). TR-20 is NOT folded here — its stall was an
ordering/poll-budget matter (INC-099b) and this root does not explain it.

## INC-101b — two auth-path rewrites regressed different query families

Two successive rewrites of `src/features/auth/use-auth.ts` (INC-101 and its
addendum) each cured one family and bred another: run 33374884757 shows rail
category skeletons that never resolve, absent strings rows, and a missing
`admin-panel-root`. The proven 4301a18 auth code is restored VERBATIM
(`git diff 4301a18 -- src/features/auth/use-auth.ts` is empty) and the
newcomer — the i18n provider's public-language read, added in U4f — now
yields instead.

Settle signal: `useAuthSettled()` in `src/i18n/provider.tsx` subscribes to
`onAuthStateChange` and makes NO Supabase call inside the callback; it raises
a flag on a macrotask hop after the first event (`INITIAL_SESSION` included),
with a 3s watchdog so i18n can never stall. The gate read, the entity bundle
read and the DB UI bundle read all start behind that flag. Gated activation
(U4f) and the once-only reconcile (U4f-2) keep their behaviour; only their
timing moves.

CLASS RULE: first-frame Supabase reads belong to the auth flow alone —
providers added later start their reads after auth settles; core auth code is
changed only by DEC, never by in-cycle fixes.

## INC-102 — an admin surface blanked on a public readiness signal

Evidence: run 33376721893 — TR-3's context snapshot for
`/admin/translations/am` held only the footer (no heading, no search, no
table); TR-4/8/11/12/16/20 all died on the same page.

Census (verbatim):

- `src/routes/admin.translations_.$lang.tsx` — no `useI18n()` read at all;
  `validateSearch` parses `status`/`flagged`/`q`/`scope` only and never
  consults any language list, so the route decides nothing from the provider.
- `src/features/admin/translations/strings-page.tsx:90` —
  `const { t } = useI18n();` (labels only), `:526` —
  `const { t, language } = useI18n();` (labels + `relativeTime` locale).
- `src/features/admin/translations/data-scope.tsx:68` and `:247` —
  `const { t } = useI18n();` (labels only).
- No read of `publicLanguages`, `gateReady` or `entities` exists in the
  strings route, page or data scope.

Blank path: `strings-page.tsx` early-returned a bare
`PageCard testid="strings-unavailable"` whenever
`guardPending = languages.isLoading` was true — the whole console (heading,
search, filters, table) was replaced by one line of text while
`admin_list_languages` was in flight. Once U4g-8 moved provider reads behind
the auth-settle flag, that in-flight window widened past the assertions'
budget and the page read as empty.

Fix: the page renders its shell immediately from admin sources — language
validity comes from `admin_list_languages` (enabled_admin OR base) — and the
list/stats load in place. The early return survives only for the genuinely
`unavailable` case (unknown or staff-disabled language), which also redirects.

TR-20 (the roster page, `languages-page.tsx`) does NOT share the dependency:
it already renders its shell and passes `languages.isLoading` down as a
`loading` prop rather than early-returning, so this fix does not touch it.

CLASS RULE: admin surfaces never depend on public-facing readiness signals.

## INC-103 — nullable list filters and the roster's move controls (U4g-10)

REPRODUCTION (connected DB, no credentials needed).

PART 1 — probe row `e2e.probe.u4g10` ('am', untranslated, orphaned=false),
searched with `p_search = 'e2e.probe'` under three `p_orphaned` values, counted
against the function's own predicate:

    p_orphaned = NULL  -> 1
    p_orphaned = false -> 1
    p_orphaned = true  -> 0

The shipped WHERE clause (pg_get_functiondef, verbatim):

    WHERE t.lang_code = p_lang
      -- NULL means "the live catalog": orphans are hidden unless asked for.
      AND t.orphaned = COALESCE(p_orphaned, false)
      AND (p_status IS NULL OR p_status = '' OR p_status = 'all' OR t.status = p_status)
      AND (p_flagged IS NULL OR t.flagged = p_flagged)
      AND (p_search IS NULL OR p_search = ''
           OR t.key ILIKE '%' || p_search || '%'
           OR COALESCE(t.value, '') ILIKE '%' || p_search || '%'
           OR COALESCE(src.value, '') ILIKE '%' || p_search || '%')

STATIC TRACE: `strings-search` input -> `searchDraft` state -> 350 ms debounce
-> `navigate({ search: { q } })` -> `search.q` -> `query` -> `useTranslations({
lang, status, search: query, limit, offset, orphaned: orphanedView })` -> query
key `[AUTH_DERIVED_ROOT,'admin','translations','rows',filters]` ->
`supabase.rpc('admin_list_translations', { p_lang, p_status, p_search, p_limit,
p_offset, p_orphaned })`. With the Orphaned chip OFF the client sends
`p_orphaned: false` — an EXPLICIT boolean, never absent.

HONEST VERDICT: the reproduction does NOT convict the orphan predicate for the
TR-3/4/8/11/12/16 "row not found after search" family — a non-orphaned row is
returned for NULL and for false alike, and the console never sends NULL. What
the reproduction DOES convict is the latent NULL-collapse: `COALESCE(p_orphaned,
false)` makes an absent filter mean "hide orphans" for every other caller, and
a key that a later Sync marks orphaned then disappears from a default search
with no way to ask for "both". Fixed at root; the search family stays open with
no reproduction of its own here.

PART 2 — the up control's shipped disabled predicate (verbatim):

    disabled={order.isPending || (rows[rows.indexOf(row) - 1]?.isBase ?? true)}

`rows` is the parent's `(sort, code)`-sorted roster passed through
`LanguagesTable`. Two defects: (1) `indexOf(row)` is object-identity based, and
a miss yields -1 -> `rows[-2]` -> `?? true` -> permanently disabled; (2) the
predicate is TRUE whenever the row above is the base language — and the fence
language IS directly beneath the base whenever its `sort` ties with the base's
(pre-U4g-3 rows all shared sort = 0, and (sort, code) then puts `en` first and
the fence second). Playwright's click then waits out the whole budget on a
legitimately disabled button. `order.isPending` does NOT stick: `move()` routes
through `guard(() => order.mutateAsync(...))` with a `.catch`, so React Query
settles the mutation on success and on refusal alike.

FIX: one sorted source (`sortLanguages()`) feeds render, `move()` and both
predicates; the index is taken by CODE, never by object identity. TR-20 gains a
precondition that parks the fence at the end of the roster when it sits directly
beneath the base, plus an explicit `toBeEnabled` assertion before the click —
assertions and budgets unchanged.

CLASS RULE: filters with nullable params must be written as
`(p IS NULL OR col = p)`; list RPCs get a proof for the absent-filter call.
Controls whose enabled-ness depends on list position read the SAME sorted array
the list renders, and index it by key.

## INC-104 — post-action feedback died with the expansion; detail page rendered nothing while loading

TRACE 1 (TR-8, table twin, after Approve) — `string-approve-<id>` calls
`run(statusAction.mutateAsync)`; `useTranslationStatusAction` invalidates the
WHOLE `ADMIN_TRANSLATIONS_KEY` namespace `onSettled`, so the list, the stats and
the counts all refetch. The `string-saved-<id>` marker lived in
`StringEditor`'s own `useState`, and `StringEditor` is produced by the
DataTable's `expandedRow(row)` slot — in the table twin that element is
re-created inside a separately injected `-expanded-row` `<tr>` on every data
change, so the refetch discarded the marker before Playwright could read it
(the card twin, whose expansion is a plain child of the row `<li>`, kept it —
hence "table twin only"). PATH TAKEN: page-level marker state keyed by row key,
NOT a primitive change and NOT "approve collapses the row" — §10 census: the
DataTable primitive is intentionally stateless about row content, and every
other call site owns its own expansion state, so preserving arbitrary
expansion-local state inside the primitive would be the wrong seam. Product
intent is unchanged (the row stays open after Approve); TR-8 is unchanged.

TRACE 2 (AU-3, mobile, intermittent) — `AdminUserDetailPage` early-returned a
bare `PageCard` at lines 59/69/78 on `useAdminUser`'s loading/error/absent
states, so the page had no `admin-user-detail` shell at all and the mobile
snapshot held only the footer. The stalling query is the detail read
`useAdminUser` → `admin_get_user`: it is auth-derived (`AUTH_DERIVED_ROOT`) and
therefore cannot resolve until the session identity settles, which on a cold
mobile load lands after first paint — an intermittent blank. FIX: the shell
(container, heading, back link) renders immediately and the body carries named
`user-detail-loading` / `user-detail-error` / `user-not-found` states in place.
The activity list is unchanged.

CLASS RULE: post-action feedback is page-level state, never expansion-local;
pages render their shell before their queries.

## INC-105 — a sweep orphaned rows it never introduced (U4g-12)

Sync orphaned keys it never introduced (direct inserts) — sibling scratch keys
vanished mid-test. `admin_sync_ui_keys` treated the ingested catalog as the
whole world: any row absent from the payload was flagged `orphaned`, including
rows written directly by fixtures and by manual authoring, which the payload
can never contain. Ownership is now recorded on the row: `ui_translations.origin`
(`sync` | `manual`, NOT NULL, default `manual`), stamped `sync` by every insert
and upsert the sync writer performs, and orphan marking is scoped to
`origin = 'sync'`. Non-scratch keys were backfilled to `sync`.

Two riders landed with it: TR-20's fence-parking precondition writes `sort`
directly on `public.languages` with the service client (setup is a table write,
not a borrowed gated RPC), and the History drawer's restore reports through the
page-level marker keyed by row key (U4g-11) instead of drawer-local state, so
it survives the table twin's expansion rebuild.

CLASS RULE: a sweep may only touch rows it owns (origin tracking); fixture
writes are table writes; post-action feedback has ONE page-level home per
surface.

## INC-106 — twin parity, seed origin, and URL-driven selects (U4g-13)

(a) A test seeded a manual-origin key and expected sync semantics; (b) reorder
controls were table-twin only — every row action ships in BOTH twins (C1 law);
(c) a URL-driven select collapsed while its options loaded — URL truth renders
before option lists arrive (INC-073 law extended).

## INC-106c — a row's actions are not inside the row element (U4g-15)

(a) DataTable's card twin renders the card element and the actions region as
SIBLINGS inside the `<li>`, so scoping row actions through the row locator
finds nothing at 360; the table twin nests them in `-actions-cell` inside the
`<tr>`. (b) A strict-mode/actionability stall on a click consumes the whole
test budget before the poll's own budget is ever entered, so an anonymous
timeout mis-names the phase.

RULE: row-action locators route through a twin-aware `actionsOf(row)` helper
that names the primitive's actual DOM per twin — never through the row
locator; and every click / step-up / poll is its own named `test.step`, with
the click carrying a budget strictly shorter than the test's.

## INC-106d — roster actions and fixed-band scroll targets intercepted clicks (U4g-16)

Roster actions overlapped (link over button) and rows scrolled under the fixed
band — both intercepted real clicks. CLASS RULE: interactive rows carry scroll
margin for the fixed band; action groups never overlap.

## INC-107 — a published DB-only language crashed the public app (U4g-17)

Selecting a language published in the console but absent from
`src/i18n/locales/` invoked an undefined compiled loader and threw during
render — a Tier A public runtime crash.

CLASS RULE: a published language never requires a compiled file; the compiled
layer is OPTIONAL BY DESIGN. A missing compiled layer is empty, not fatal —
the chain is compiled.en ▸ {} ▸ DB[lang], with one named warning. Nothing may
validate an active language against the COMPILED registry; only the
publication gate decides what may activate.

## INC-108 — the nightly wrote only a heartbeat (U4g-17)

The nightly published a one-line conclusion and nothing else, so serial-mode
failures were undiagnosable from the repo: the per-push evidence file exists,
the nightly simply never rendered one.

RULE: the nightly runs the SAME reporter over its own artifacts (source label
`nightly`, attempt line included) and commits
`docs/tracking/nightly-last-failure.md` next to `nightly-status.md`, on the
same `[skip ci]` tracking path and branch (dev). Every scheduled suite that
can go red owes an evidence file, not a verdict.

## INC-109 — blind 500s and a blind AU-3 (U4g-18)

Run 33511926950 recorded `console.error: Failed to load resource: the server
responded with a status of 500 ()` — a 500 with no method, no URL, no body —
and AU-3 failed for the fifth time with nothing but `element(s) not found`.
Neither failure carried the one fact needed to diagnose it.

RULE: 5xx responses now log their URL; AU-3 dumps route + query-cache state on
failure — five blind recurrences end here. An instrument that reports THAT
something failed without reporting WHERE is not an instrument.

## INC-110 — activity list stale after its own mutation; redirect awaiting i18n (U4g-19)

TRACE 1 (AU-3/AU-4, run 33513615863) — the Activity section is NOT collapsed,
lazy or virtualized: it is one unconditional `<ul>` inside
`user-activity-card`, identical at 360 and 1280. Its key is
`["auth-derived","admin","users","activity",<userId>]`; the deactivate/assign
mutations invalidated only the section PREFIX
`["auth-derived","admin","users"]`, with the default `refetchType: "active"`,
un-awaited, while the query carried `staleTime: 15_000`. So the refetch could
be skipped (observer momentarily inactive behind the step-up modal path) or
served from a cache captured before the audit row landed, and nothing re-read
it afterwards.

TRACE 2 (TR-18, 7181 ms against a 5000 ms law) — the redirect awaits
`useAuth` + the `has_permission` RPC only, neither of which is i18n. The
coupling was the CLIENT: the provider's public-language read went through the
shared supabase-js client, whose request path resolves the session through the
one exclusive auth lock. With `/rest/v1/languages` delayed 5 s, the guard's
own permission read inherited the wait. The provider additionally gated that
read behind the auth-settle signal (INC-101b), which existed only because the
read took that lock.

RULES:

- MUTATIONS INVALIDATE THE EXACT KEYS THEIR AUDIT ROWS FEED — the section
  prefix is a convenience, not the contract: every audited user mutation names
  the detail and activity keys, forces `refetchType: "all"` and awaits them,
  and the activity query is `staleTime: 0` / `refetchOnMount: "always"`.
- NON-BLOCKING IS ASSERTED BY ORDERING, NOT ONLY BY CLOCK — TR-18 records
  whether the delayed response had resolved at the moment the URL changed
  (expected: not yet); the wall clock stays as a secondary signal.
- Public reference data reads with a keyed anon fetch, never through the
  session-bearing client, so they can never sit on a guard's critical path.

## INC-111 — the parity smoke never ran (2026-09-01)

FINDING (verbatim, nightly run 33516364647): the serial nightly suite PASSED,
and the cloudflare-parity job died with "service core:user:ethio-marketplace:
This Worker requires compatibility date \"2026-09-01\", but the newest date
supported by this server binary is \"2026-08-27\"." The application was never
exercised on workerd — on any day after the pinned wrangler's release day the
job could only refuse, so DEC-019's tripwire had been silently dead.

ROOT: nitro resolves an unset `compatibilityDate` to `"latest"` = the build
day, and the cloudflare preset copies it into `dist/server/wrangler.json`.

FIX: `vite.config.ts` pins `nitro.compatibilityDate: "2026-08-27"`. Local proof
(sandbox env unset): `dist/server/wrangler.json` carries
`"compatibility_date": "2026-08-27"`, and `bun run serve:e2e:built:cloudflare`
reaches `[wrangler:info] Ready on http://127.0.0.1:4173` (HTTP 200 on `/`)
instead of refusing.

RULES:

- A DATE THAT MOVES BY ITSELF IS NOT A CONFIGURATION — anything stamped from
  the build clock into a runtime contract is pinned explicitly.
- PIN AND RUNTIME MOVE TOGETHER — the compatibility pin is raised only with a
  wrangler that supports it, in one landing.
- A TRIPWIRE THAT CAN ONLY REFUSE IS NOT A TRIPWIRE — the parity job is gating,
  and its refusal message now names the remedy instead of excusing itself.

## INC-112 — TR-19 timed out blank (2026-09-01)

FINDING (verbatim, run 33517466975, shard 3, desktop-1280): "Test timeout of
120000ms exceeded." with a footer-only ARIA snapshot, no phase names, no
server errors and no client errors. The report could not say whether the
strings page had loaded, whether the approve bar had rendered, whether a
dialog was sitting over the surface, or which interaction consumed the budget.

FIX: J-law applied. TR-19 now runs as named `test.step`s (sign-in / open fence
page / seed check / approve-all start / confirm / step-up / summary / poll DB
truth), every poll and wait budgeted strictly shorter than the test budget,
and each step rethrows with a shared dump. `describeStringsPage(page)` in
`e2e/helpers/ui.ts` (precedent: describeUserDetail, INC-109) reports the route,
the live query-cache state for the roster / strings / stats queries (status,
error, dataUpdatedAt, data length), presence counts for
`strings-coverage` / `strings-search` / `strings-unavailable` / the approve
bar, and whether the step-up or confirm dialog is open. It is available to
every TR test on failure.

RULES:

- A TEST THAT CAN ONLY REPORT "TIMEOUT" IS NOT INSTRUMENTED — every long test
  names its phases and every phase failure carries the surface's state.
- A DUMP IS SHARED, NEVER INLINE — surface describers live in
  `e2e/helpers/ui.ts` so the next test inherits the evidence for free.

## INC-113 — one predicate for count and action; gate lists are never cached

DATE: 2026-09-01 · PHASE: U4g-21 · TIER: A

### Finding 1 — `reviewable` was defined twice (verbatim census, 2026-09-01)

`admin_translation_stats`, reviewable column (`pg_get_functiondef`):

```sql
count(*) FILTER (WHERE NOT t.orphaned AND NOT t.flagged
                   AND t.status IN ('machine', 'edited'))
```

`approve_all_translations_impl`, row predicate (capture + update, identical in
both statements):

```sql
WHERE t.lang_code = p_lang
  AND t.status IN ('machine', 'edited')
  AND NOT t.flagged AND NOT t.orphaned
```

TR-19's seed (`e2e/admin-translations.spec.ts`): three rows
`status='machine', machine=true, flagged=false` and one row
`status='machine', machine=true, flagged=true, flag_note='placeholder
mismatch'`; `orphaned` and `origin` left at their defaults (`false`,
`'manual'`); the fence language is `zxy`.

HONESTY (law A3): the two expressions AGREE. A live probe against the seed
shape (3 machine + 1 flagged + 1 orphaned in `zxy`) returned
`stats_reviewable = 3` and `approve_target = 3` BEFORE any change, so the
observed `reviewable = 0` in the TR-19 dump is NOT convicted at this seam — it
is a client-side symptom (a stats query that errored, was pending, or was
served for the wrong language), and the INC-112 dump now records exactly that
state on the next occurrence. What IS a defect is the DUPLICATION: the number
an operator reads and the rows the sweep touches were two independent copies of
one rule, free to drift on any future edit.

FIX: one shared definition, `public.ui_translation_reviewable(status, flagged,
orphaned)` (IMMUTABLE, SECURITY INVOKER):

```sql
reviewable := status IN ('machine','edited') AND NOT flagged AND NOT orphaned
```

Both the stats count and approve-all's skip / capture / update predicates call
it. Proof on staging after the apply: seeding 3 machine + 1 flagged + 1
orphaned in `zxy` gave `reviewable_shared = 3`, and
`approve_all_translations_impl('zxy')` returned
`{"approved": 3, "skipped_flagged": 1}` with the flagged and orphaned rows
still `machine`. Probe rows and the fence language were removed afterwards.

### Finding 2 — the gate list could be served from cache across loads

Provider read before the fix (`src/i18n/provider.tsx`, `fetchPublicLanguages`):

```
GET ${VITE_SUPABASE_URL}/rest/v1/languages
    ?select=code,name_en,name_native,rtl,sort
    &or=(enabled_public.eq.true,is_base.eq.true)
    &order=sort.asc
headers: { apikey, accept: "application/json" }   // no cache directive
init:    (default `cache` mode; no cache key of its own)
```

Service-worker census (2026-09-01): this project registers NO service worker —
no `VitePWA` plugin in `vite.config.ts`, no `src/sw*`, no `public/sw.js`; PWA
mechanics are still unbuilt (REQ-039, gap register). So nothing caches
`/rest/v1/*` today, and the reload-invisibility TR-22 saw cannot be blamed on a
worker; the exposure is the request itself, which was cacheable by the HTTP
cache and by any intermediary, and would be matched by a future worker route.

FIX: the public-list read is uncacheable BY CONSTRUCTION — `cache: "no-store"`,
`cache-control: no-cache`. NO query-string busting is used: PostgREST treats
unknown query parameters as column filters, so a `_ts` parameter caused a 400
and broke the gate read entirely (INC-113b). The invariant is stated in the code
beside the fetch. TR-22 and TR-17 now dump the provider's own `publicLanguages`
snapshot (`window.__ethioPublicLanguages`: gateReady, active language, codes)
plus the rendered options through `describeSwitcher(page)` in
`e2e/helpers/ui.ts`, so a missing option names the seam (gate vs render) instead
of timing out bare.

RULES:

- ONE PREDICATE FOR COUNT AND ACTION — a number an operator reads before acting
  and the rows the action touches are the SAME definition, in one place; two
  copies that agree today are a drift, not a coincidence.
- GATE LISTS ARE NEVER CACHED ACROSS LOADS — publication, permission and other
  gate reads are fetched `no-store` with a `no-cache` header, and no caching
  layer (HTTP, intermediary, service worker) may answer them; an operator
  decision must be visible on the next page load. Busting must NOT be done with
  a query parameter that PostgREST would interpret as a column filter.
- GATE FETCH FAILURES SURFACE AND RETRY — a non-2xx gate read logs
  `[client-error] gate fetch failed` with status and a 200-character body preview,
  retries once, and only then falls back to the seed list; the fallback is never
  silent (law F4).

## INC-113b — cache-bust via query param broke the gate read

DATE: 2026-09-01 · PHASE: U4g-22 · TIER: B

DEFECT: `src/i18n/provider.tsx` added a per-request `_ts` query parameter to the
`/rest/v1/languages` gate fetch in U4g-21 (INC-113) to prevent caching. PostgREST
treats unknown query parameters as column filters, so the request returned 400
Bad Request. The provider's `try/catch` swallowed the failure and returned
`null`, leaving only the seed language (`en`) active. The nightly E2E run
(33520274915) observed this as 34 Amharic test failures after the gate fetch
failed — the UI fell back to English-only.

EVIDENCE: seed-only `en` after a 400 gate response; 34 Amharic failures in run 33520274915.

FIX (U4g-22):

1. Removed the `_ts` parameter entirely. Cache invalidation now relies solely
   on `cache: "no-store"` and the `cache-control: no-cache` header.
2. Added explicit failure handling: a non-2xx response logs
   `console.error("[client-error] gate fetch failed", status, <first 200 chars>)`,
   retries once, and only then falls back to the seed list. The retry logs the
   same way. The fallback is never silent (law F4).
3. Added a code comment documenting why query-string busting is forbidden here:
   PostgREST interprets unknown query params as filters.

RULES (extends INC-113):

- Gate-list reads must NOT use query parameters for cache busting when the
  endpoint is PostgREST — unknown params are column filters.
- Gate fetch failures must log, retry once, and only then fall back; a silent
  fallback to a seed list is a defect.

## INC-114 — scratch roles were never reaped; the 1000-row cap hid new ones

DATE: 2026-09-01 · PHASE: U4g-23 · TIER: B

DEFECT (1): every RP-2 run creates a scratch role (`e2e-…`) and only deletes it
on the happy path. The graveyard grew past PostgREST's 1000-row read cap, so
`admin_list_roles_detailed()` returned a full page of old roles and the freshly
created one was not in it — RP-2's dump recorded `dataLength=1000`. The reaper
in `e2e/global-setup.ts` covered translations, fence rows and scratch locations
but no other scratch entity type.

DEFECT (2): AU-3's activity assertion failed with zero activity rows, which is
ambiguous — either no audit row was written, or the activity RPC filtered it
out. The dump could not distinguish the two.

EVIDENCE: RP-2 dump `dataLength=1000`; AU-3 dump with `dataLength=0` and no
audit truth.

FIX (U4g-23), test-side only — no product change:

1. `e2e/global-setup.ts` reaps roles named `e2e-%` older than 60 minutes,
   deleting their `role_permissions` and `user_roles` rows first (a role with
   grants or members cannot be deleted), then the roles, and logs the count.
2. `e2e/admin-users.spec.ts` — AU-3's failure dump reads the target's
   `audit_log` rows with the service client (action, entity, created_at), so a
   zero-activity failure is settled as "no audit row written" vs "activity RPC
   filters it out".

RULES:

- REAPER LAW EXTENDS TO EVERY SCRATCH ENTITY TYPE — any test that mints a row
  that survives a mid-test death is reaped by age in global setup, dependents
  first. A cleanup that only runs on the happy path is not cleanup.
- A COUNT-SHAPED FAILURE DUMPS THE UNDERLYING TRUTH — when an assertion fails
  on "N rows rendered", the dump reads the same data from the database, so the
  next failure distinguishes a missing write from a filtering read.

## INC-115 — placeholder protection in machine translation (U4g-24)

1. MT SENT RAW `{token}`s TO THE PROVIDER. Google translated or reordered the
   token text itself, so a token-bearing string came back mangled and every
   such row landed flagged — the validator caught it, but the operator had to
   retype the whole value by hand. `/api/translate` now MASKS each `{token}`
   as `<span translate="no">⟦i⟧</span>` (`format=html`), and restores by index
   afterwards. Restore is total-or-nothing: if a sentinel is missing or
   duplicated the provider's own text is returned untouched and the writer's
   validator flags it — a guess is never written.
   HONESTY: no Google credential exists in this environment, so the provider's
   behaviour could not be measured here; the implementation follows Google's
   DOCUMENTED `translate="no"` contract and carries a second defence (bare
   index sentinels) for the case where the wrapper is stripped. Fake mode runs
   the same mask/restore path, so CI proves the mechanism.
2. A MANGLED ROW HAD NO REPAIR PATH. The editor now offers "Restore
   placeholders" on a flagged row: a POSITIONAL rewrite, inert until the draft
   and the English source hold the same number of tokens (the hint states both
   counts). It fills the editor only; Save re-runs the server validator.
3. PROVENANCE FLIPPED TO "HUMAN" ON APPROVAL IN THE READING. Approval now
   APPENDS "Approved by …" to the machine origin instead of reading as human
   authorship.

RULES:

- PLACEHOLDERS NEVER TRAVEL TO A TRANSLATION PROVIDER — they are masked before
  the call and restored after it, and a restore that cannot be proven exact is
  not performed at all.
- A REPAIR TOOL NEVER INVENTS CONTENT — it rewrites positionally under an
  equal-count precondition, states the two counts when it refuses, and writes
  nothing that the server validator has not re-checked.
- PROVENANCE IS ORIGIN, NEVER REVIEW STATE — approval is appended to machine
  provenance, never substituted for it.

## INC-115b — FENCES CARRY THE PROJECT AXIS (U4g-25)

EVIDENCE: TR-19 failed on `mobile-360` with reviewable=0 and only 2 of its 4
keys present, while the same test passed on `desktop-1280` in the SAME job.
Both projects seeded into the ONE approve fence `zxy`; desktop's approve-all
is a by-design global sweep, so it approved (and thereby consumed) mobile's
freshly seeded pending rows.

CHANGE: `fenceLang(kind, project)` in `e2e/global-setup.ts` derives the code
from the sweep kind and the Playwright project: the bulk fence is `zxx-m` /
`zxx-d` and the approve fence `zxy-m` / `zxy-d`. Region-suffixed codes still
satisfy `/api/translate`'s `^[a-z]{2,8}(-[a-z]{2,8})?$`. Ensure, park and reap
cover all four; the reaper deletes fence residue by PREFIX, and TR-17 asserts
publication-exclusion by prefix rather than by an enumerated pair.

RULES:

- FENCES CARRY THE PROJECT AXIS — a sweep test on two viewports is TWO sweeps,
  and two sweeps never share one fence (J2's addendum, extended).
- A FENCE REAPER MATCHES THE FAMILY, NOT A LITERAL — residue is deleted by
  prefix so a newly suffixed fence can never outlive its run.

## INC-115c — A REGION SUBTAG IS TWO LETTERS; AN AUDITED MUTATION INVALIDATES ITS ACTIVITY

EVIDENCE: TR-12 failed four times — the AI bulk never produced a summary
because `/api/translate` validates `target_lang` against
`^[a-z]{2,8}(-[a-z]{2,8})?$`, and the per-project fence `zxx-m` carries a
ONE-letter region, which that contract rejects.

CHANGE: `fenceProjectSuffix` now yields two-letter subtags — `mo` / `de`, with
any fallback padded to at least two letters — so the fences are `zxx-mo` /
`zxx-de` and `zxy-mo` / `zxy-de`. The reaper's prefixes are unchanged: it
matches by prefix, so a longer suffix is still swept. The profile-edit
mutation (`useUpdateProfile`) invalidates through the same shared helper as
status and role changes, naming the exact detail and activity keys.

RULES:

- A GENERATED IDENTIFIER IS CHECKED AGAINST THE CONSUMER'S GRAMMAR — a fence
  code that a server route refuses is not a fence, it is a silent no-op.
- EVERY AUDITED MUTATION INVALIDATES THE KEYS ITS AUDIT ROW FEEDS — one shared
  invalidator, no per-mutation variants.

## INC-115d — EVERY ACTIVITY ASSERTION CARRIES THE SAME EVIDENCE

EVIDENCE: AU-9 failed with nothing but `getByTestId('activity-user.profile_edit')
… element(s) not found`. Only AU-3 had been taught (INC-109/INC-114) to dump
the route, the query-cache state and the target's audit rows, so AU-9's failure
could not distinguish three different defects from one another.

CHANGE: `expectActivity(page, action, userId)` in `e2e/admin-users.spec.ts` is
the single way any AU test asserts an `activity-*` row. On failure it rethrows
the original assertion message plus `describeUserDetail(page)` and the target's
last 10 `audit_log` rows (action, entity, created_at) read with the service
client. AU-3 (status_change), AU-4 (role.assign, role.revoke) and AU-9
(user.profile_edit) all go through it.

RULES:

- AN INSTRUMENT BUILT FOR ONE ASSERTION COVERS EVERY SIBLING ASSERTION OF THE
  SAME SHAPE — otherwise the next failure re-buys the diagnosis.
- A MISSING-ROW FAILURE NAMES WHICH LAYER IS EMPTY — write, read, or refetch —
  in one dump.

## INC-115e — GLOBAL-ORDER MUTATIONS RUN IN ONE PROJECT

EVIDENCE: two reds on the same green-otherwise run. TR-20 (`desktop-1280`)
failed with `expected 9, received 10` — the roster is ONE global list, so an
absolute index is only true if no sibling row moves. TR-17 failed with "the
admin-only fence language zxx-mo is never public" while TR-22 was concurrently
publishing that very fence for its own duration.

CHANGE (`e2e/admin-translations.spec.ts`):

- TR-17 asserts SET EQUALITY between the switcher's options and the DB public
  list, and nothing else. The fence-never-public loop is gone.
- TR-20 runs on `desktop-1280` only (`test.skip` elsewhere, reason: "global
  order is a single list — one project mutates it") and asserts RELATIVE order:
  after moving up the fence sits directly ABOVE its censused upper neighbour
  (offset -1), and directly below it again after moving down (offset +1).
- TR-20m (mobile) proves both reorder controls are present and the up control
  enabled for the parked fence — it performs no move.

RULES:

- GLOBAL-ORDER MUTATIONS RUN IN ONE PROJECT; every other project asserts
  presence and actionability only.
- PUBLICATION OF A FENCE IS THAT FENCE'S OWN TEST'S BUSINESS — no sibling test
  asserts a fence's publication state.
- AN ASSERTION ON SHARED RUNTIME IS RELATIVE, NEVER AN ABSOLUTE INDEX.

## INC-116 — THE ACTIVITY RPC TIMED OUT ON A GROWN AUDIT LOG (2026-09-01, U4g-29)

Activity RPC hit statement timeout (57014) on a grown `audit_log` — missing
index + non-sargable predicate; five AU "row not found" recurrences were this.

EVIDENCE (`EXPLAIN ANALYZE`, connected DB, before):

```text
Limit -> Sort (Sort Key: created_at DESC)
  -> Seq Scan on audit_log
       Filter: ((actor_id = $1) OR (entity_id = $1::text))
       Rows Removed by Filter: 674
```

AFTER (same shape, rewritten):

```text
Limit -> Sort -> Unique -> Append
  -> Limit -> Index Scan using audit_log_actor_created_idx (actor_id = $1)
  -> Limit -> Index Scan using audit_log_entity_id_created_idx (entity_id = $1)
```

CHANGE (one migration, declared mark `20260901170000`): index
`audit_log_entity_id_created_idx (entity_id, created_at DESC)` plus
`audit_log_entity_type_id_created_idx (entity_type, entity_id, created_at DESC)`;
`admin_user_activity` rewritten as two independently indexed, independently
LIMITed branches merged by `UNION`, ordered and LIMITed once. Every cast sits
on the PARAMETER side. Grants restated (INC-074); in-migration proofs P1–P5.

RULES:

- EVERY LIST RPC SHIPS ITS INDEX AND AN EXPLAIN IN THE MIGRATION PROOF.
- AN `OR` ACROSS TWO COLUMNS IS NOT A PREDICATE — IT IS TWO PREDICATES; WRITE
  THEM AS TWO INDEXED BRANCHES.
- A CAST NEVER SITS ON THE COLUMN SIDE.

TR-22 (same landing): the assertion anchor must be visible at BOTH viewports —
the wordmark is `md+` only, so the sign-in link and the switcher's aria-label
carry the seeded-value proof.

## INC-117 — GLOBAL-STATE TESTS ARE QUARANTINED, NOT TRUSTED AS GATES

EVIDENCE: TR-17 compared the switcher against the DB roster while a concurrent
TR-22 published its own fence — the two sides were read at different instants,
so the fence appeared on one side only and the set comparison failed on a
correct product. TR-19 asserted the approve button before proving the page's
own rows query had seen the four seeded rows, so "approved nothing" and "never
loaded" were the same red.

CHANGE (spec-only):

- TR-17 filters every `FENCE_PREFIX_LIST` code out of BOTH the DB list and the
  rendered options before the set comparison. Fences are transient test state
  and are never part of the product assertion.
- TR-19 writes ALL four rows before the page is opened, and its "seed check"
  phase polls the rendered rows query (reloading once per turn) until all four
  keys are present; only then is the approve control asserted.
- TR-17/19/20/22 carry the `@global-state` tag plus a
  `test.info().annotations` entry; `scripts/e2e-failure-report.ts` labels such
  a failure "quarantined global-state (INC-117, non-gating)".

RULES:

- A TEST THAT MUTATES OR READS A SINGLE GLOBAL SURFACE (the language roster,
  the publication gate) IS QUARANTINED: its red, with a green product matrix,
  is REPORTED, NOT GATING — until the DEC-026 component-test layer covers its
  logic.
- QUARANTINE IS APPLIED ON THE NEXT RED OF A TAGGED TEST, NOT PRE-EMPTIVELY:
  the label exists now, the gating change is the operator's next step.
- A SEED IS NOT VISIBLE UNTIL THE PAGE'S OWN QUERY HAS RETURNED IT; SEED BEFORE
  NAVIGATING AND POLL THE ROWS, NEVER THE BUTTON ALONE.

### INC-117 addendum (DEC-028, 2026-09-01) — quarantine is now enforced by the lanes

The label alone left a tagged spec free to run inside the parallel matrix,
where its red was manufactured by a sibling's legitimate mutation and still
gated the push. DEC-028 moves the enforcement into the lanes:

- The per-push lanes (smoke, shard matrix, changed fast lane) EXCLUDE
  `@global-state` via `--grep-invert`; those specs execute only in the serial
  nightly, one worker.
- The nightly VERDICT excludes quarantined failures: the reporter publishes
  `gating=`/`quarantined=` (`E2E_VERDICT_PATH`) and both the heartbeat and the
  outcome step read `gating` only. Quarantined reds are written to
  `docs/tracking/nightly-last-failure.md` under the INC-117 label.
- UN-QUARANTINING REQUIRES A GREEN NIGHTLY STREAK OF 7 AND A DEC NOTE; until
  then the DEC-026 component-test layer is where that logic earns a gate.
- A source with no results is NOT quarantinable: a dead runner gates (law F4).

### INC-118 (DEC-030, 2026-09-01) — a retried pass was an unrecorded event

`retries: 0` everywhere made every infrastructural blip a red push, and the
obvious remedy (retries) hides the blip instead: Playwright's `flaky` status
was, until now, collected by the reporter as an ordinary FAILURE, so switching
retries on without touching the reporter would have turned a recovered test
into a gating red — and switching it on _with_ a naive fix would have turned it
into silence.

DEC-030 takes the third path: the parallel matrix retries once, the nightly does
not, and every retry-recovered test is named twice — in the run's evidence file
(`## Flake ledger (DEC-030)`, plus a header count) and as one appended line in
`docs/tracking/flake-ledger.md`. A flaky test never gates; a test flaky 3× in 7
days gets an INC and root-cause work.

- A GREEN RUN CAN STILL CARRY EVIDENCE: the reporter's ledger-only pass
  (`E2E_FLAKE_ONLY=1`) exists because the green branch writes no report.
- A SOURCE WITH NO RESULTS IS STILL GATING (law F4) — retries change nothing
  about a dead runner.

## INC-119 — the Data bulk bar reported "(0)" against a 129-row universe

**Observed** (operator's Tigrinya walk; TR-24, both viewports): the Data scope
bulk bar rendered `(0)` and stayed disabled while
`admin_entity_translation_stats('ti')` counts `total=129, untranslated=129`.

**Wire truth.** The RPC contract is
`TABLE(lang_code text, total bigint, approved bigint, machine_count bigint,
edited bigint, untranslated bigint)`, one row per non-base language over the
universe `active categories ∪ active locations`; for the connected project the
per-language counts are `am 129/15`, `om 129/129`, `ti 129/129`
(total/untranslated).

**Mismatch.** The client never asserted that contract:

- `data-scope.tsx:96` read `(stats.data ?? [])[0]` — an INDEX, not the row whose
  `lang_code` matches the page's language. With `p_lang` present the array holds
  one row; with it absent, ignored, or the language missing from the result the
  index silently answers for another language — or for nothing.
- `data-scope.tsx:116` then passed `langStats?.untranslated ?? 0` to
  `AiBulkBar`, collapsing pending, failed and no-row-for-this-language into the
  same legitimate-looking zero, and `ai-bulk-bar.tsx:172` disabled the button on
  that zero. A phantom count (law F4).
- `translations-service.ts` mapped the row field-by-field with `Number(...)`, so
  a renamed or absent column would have produced `NaN`/`0` instead of an error.

The entity bar does NOT reuse the UI stats hook, and the list's status string
for missing rows is `'untranslated'` — the same string the collector filters on;
those two suspicions are cleared.

**Law.** RPC responses are parsed by ONE typed mapper per function
(`mapEntityStatsRow`), which asserts the shape it was promised and throws
`RpcShapeError` naming the function and field otherwise; the mapper is proven by
a self-test (`translationMapperSelfTest`) that TR-24 runs before the walk. Rows
are selected by identity (`pickEntityStats(rows, lang)`), never by index, and an
unknown count renders as pending/error — never as `0`.

## INC-119b — the Data scope rendered no universe rows

Universe rows carry no translation id — the list keyed on it and rendered
nothing for fresh languages; rows now key on the entity identity
(`${entity_type}:${entity_id}:${field}`), and every marker/testid derives from
the same composite (`entity-row-<type>-<id>-<field>`).

RULE: list keys come from the entity, never from the optional translation row.

## INC-119c — TR-24's readiness check anchored on nothing of its own

The readiness assertion used `[data-testid^='entity-status-']` + `.first()` (a
J5 violation — supervisor-dictated, logged): at 1280 the first match is the
hidden card twin, and its text was `Machine`, left by a PRIOR sweep. The check
therefore assumed a virgin fence universe it never owned.

RULE: readiness anchors are per-run scratch entities, asserted through the
twin-aware helper on the visible surface — never a bare prefix + `.first()`.
Fence entity residue (`entity_translations` rows in a fence-prefixed
`lang_code`) is reaped alongside fence UI rows once it is an hour old.

## INC-120 — an injected session is invisible to the step-up gate

Evidence: run 33560575803, 16 failures, one shape — HTTP 500 with SQLSTATE
P0009 `step-up required` on step-up-gated RPCs, and no `step-up-modal` was ever
shown, so `stepUpIfPrompted` had nothing to answer.

**What the client gate reads.** `useStepUp.guard`
(`src/features/auth/mfa/use-step-up.ts:76`) runs the action unprompted iff
`isStepUpFresh()` (`src/features/auth/mfa/mfa-service.ts:88-94`) is true, which
is three reads: (1) `listFactors()` — GoTrue's factor list for the account;
(2) `isSteppedUp()` → `getAal()` (`mfa-service.ts:68`) — the `aal` claim of the
access token currently in storage; (3) `readSteppedUpAt()`
(`src/features/session/session-policy.ts:97`) — the browser-local
`sb-<ref>-stepped-up-at` stamp, written only by `verifyFactor`
(`mfa-service.ts:130`). The enrolment path `stepUpIfPrompted` expects
(`e2e/helpers/ui.ts:387`) is the modal itself, then `expectAal2`.

**The differing input, verbatim.** Under a UI login the ONLY writer of
`sb-<ref>-auth-token` is the app's own client, so storage always holds the
newest session the server issued. Under injection, `addInitScript` re-ran on
EVERY navigation and re-wrote the ORIGINAL aal1 password-grant bytes over
whatever the app had persisted — including the AAL2 access token returned by
`supabase.auth.mfa.verify`. The step-up stamp, an ordinary localStorage key,
survived that overwrite. The result is a state a UI session can never reach:
factor present + a claim that reads `aal2` after refresh of the restored
session + a stamp inside the window, so the gate stays silent, while the server
applies its stricter second condition — a `totp` amr row on the CURRENT session
inside the 10-minute window (`docs/features/step-up-auth.md:136-138`) — and
refuses with P0009.

**Fix (proved with DEC-029-C; see the closure note below).** `injectSession` (`e2e/helpers/session.ts`) now
writes the grant ONCE, guarded by a `__ethio-e2e-injected` sentinel in the same
localStorage, so the app's own client is the only writer from the first
navigation onward; and it clears any `sb-*-stepped-up-at` hint at that moment,
so an injected session starts exactly where a fresh UI sign-in starts — aal1, no
hint, gate prompts. Neither the client gate nor the server gate is weakened.

**LAW.** Credential-lifecycle tests (password rotation, signed-out assertions)
always use UI login regardless of the knob: `signIn()` / `switchUser()` accept
`{ uiLogin: true }` and S-3's sign-in calls carry it.

**CLOSURE (DEC-029-C, 2026-09-02).** The two spec call sites in
`e2e/settings.spec.ts` (S-3) now pass `{ uiLogin: true }`, and `E2E_UI_LOGIN` is
removed from all four E2E jobs, so injection runs in CI under the write-once
sentinel. `e2e/rbac.spec.ts` needed no annotation: R-1 never signs in, and R-2 /
R-3 assert rendering, not the credential. The knob stays in the harness as the
standing rollback; the step-up families (TR-11/13/16/23/26, RP-1/4/5/11,
IMP-1/2, AU-10, S-3) are the recurrence detector.

## INC-120b — the write-once sentinel was user-blind (persona switching)

**Evidence.** Run 33563901040 — 18 reds, all multi-persona gating tests.

**Cause.** The INC-120 sentinel recorded only the storage key, so the SECOND
persona's `injectSession` was a no-op: the browser kept persona A's session
while the test asserted persona B's permissions.

**Fix.** The sentinel is now the TARGET USER ID
(`__ethio-e2e-injected = <userId>`). A different user clears every
`sb-*-auth-token` AND every `sb-*-stepped-up-at` hint, then writes the new grant
once; the same user stays a no-op. `switchUser` routes through the same
`signInViaSession` (its UI-login branch untouched), and every injection ends on
`assertInjectedIdentity`, which reads the ACTIVE persisted session's user id in
the page and throws with BOTH ids on a mismatch — persona mix-ups name
themselves instead of surfacing as inexplicable permission failures.

## INC-120c — injection parked per the pre-committed rule

**Evidence.** The run after INC-120b produced a third distinct failure shape in
the multi-persona gating families.

**Disposition.** Per the DEC-029 pre-committed rule, the revert knob is
re-engaged (`E2E_UI_LOGIN: "1"` in all four E2E jobs) rather than chasing the
next seam variant. The injection helpers and the per-user sentinel remain in
the harness for the DEC-026 era, when the component layer is expected to make
the client step-up gate safe under injected sessions. Levers 2 and 3 (shared
build artifact, six shards) are retained as the measured win. Re-engaging lever
1 requires a green feature-branch run with the knob removed and a DEC note
naming the component-layer change.

## INC-121 — U4h star flows: four sub-shapes, one convergence

**Run.** 33569252582, attempt 2 (16 gating failures, all in
`shell.spec.ts › U4h device language star`, both projects, smoke + shard 3).

**(a) The account carry never ran — `star=null`, `html lang="en"` while the
account preferred `am`.** `src/i18n/provider.tsx:419` guarded the carry with a
once-per-MOUNT latch (`accountSyncedRef`). The provider mounts on `/auth` while
signed OUT, so the first effect run consumed the latch, resolved `"no session"`,
and the sign-in that followed was an in-page transition — no remount, therefore
no second attempt. Fixed at root: the latch is keyed by the signed-in user id
(mirrored from the auth event's own `session`, never a Supabase call inside the
callback — law I5) and released on sign-out.
**LAW.** A once-per-mount latch must not guard a session-dependent read; key it
by identity.

**(b) "rendered options: (none)" in the switcher dump.** `describeSwitcher`
(`e2e/helpers/ui.ts:648`) read `[data-testid^='language-option-']`, which Radix
renders into a PORTAL only while the menu is open. A closed menu therefore
reported the same "(none)" as a missing gate row. The dump now states the
menu's `aria-expanded` and also lists the star controls, so the two absences
can never be confused.
**LAW.** A failure dump never depends on an interaction; it names its own
preconditions.

**(c) "email field is not editable" ×6.** Not a pending auth state and not a
redirect race: after the ★ the shell renders in AMHARIC, and
`e2e/helpers/ui.ts:255` located the field by the ENGLISH accessible name
(`getByRole('textbox', { name: /email/i })`) — element(s) not found. The same
blindness applied to the submit button (`/^sign in$/i`) and to
`signOutViaUi`'s English "Sign in" link assertion. All three now anchor on
locale-free handles (`#auth-email`, the form's only `button[type=submit]`,
`header a[href="/auth"]`), and the door is awaited with `toBeEditable` — a
wait on truth, no `waitForTimeout` (DEC-027).
**LAW.** A shell helper is locale-agnostic: ids, testids and destinations, never
rendered labels (the INC-084g law, extended from menus to the auth door).

**(d) hreflang `toEqual` off by `am`.** The EMISSION was right (SSR loader gate:
`en`, `am`); the spec read `window.__ethioPublicLanguages` on the first frame,
where the provider still holds the compiled SEED (`["en"]`). The spec now polls
`gateReady === true` before reading and normalises both sides (lower-cased,
de-duplicated, sorted, `x-default` included).
**LAW.** Compare a settled document against a settled mirror: the gate snapshot
publishes `gateReady` precisely so a reader can wait on truth (J7).

## INC-122 — U4i walk findings (2026-09-02)

**(a) Context note saved, nothing under the source.** The write landed; the
editor simply had no read-back element for a `translations:manage` holder — the
saved note was rendered ONLY in the non-manage branch, and manage holders saw
the input alone. Root fix: the note is always its own paragraph under the
source, with the input beneath it.
**LAW.** An editable field never replaces the display of its own value.

**(b) Used-on showed file paths.** `features/admin` is not a surface a
translator can act on. The scanner now resolves call sites through the static
import graph to the ROUTE PATHS that reach them, and falls back to
`component: <name>` only when no route does.

**(c) Length warning was a sentence.** Dressed as an amber `--gold` chip
(`Long ×4.8`) with the sentence as its tooltip. No behaviour change.

**(d) Import counted round-trip noise as edits.** A re-imported untouched
export reported "changed 2 · Imported 25" and would DEMOTE approved rows to
`edited`. The importer now normalises both sides and skips identical rows into
a new `unchanged` bucket.
**LAW.** Imports are idempotent: an untouched export re-imported is a no-op.

**(e) Pseudo button not found.** It rendered only inside the BASE language's
strings page, behind the manage gate, below the export bar — a place an
operator has no reason to open. It moved to the Languages roster toolbar with a
confirm dialog naming `zxa`.

## INC-123 — U4i-4 walk (2026-09-02)

**(a) Export was page-scoped.** The bar serialised the rows the console was
holding (25 = one page). Exports are catalog-scoped BY DEFINITION: the bar now
pages `admin_list_translations` in batches of 200 until the language is
exhausted, ignoring the search/status chips (stated in the button tooltip), and
names the file `<lang>-<scope>-<yyyymmdd>.csv|.xlf`.

**(b) Languages were not deletable.** A mistyped or abandoned language could
only be hidden, never removed, so the roster accumulated dead rows.
`admin_delete_language(p_code)` now cascades `translator_languages` →
`ui_translations` → `entity_translations` → `ui_translation_revisions` → the
`languages` row inside one transaction, writes ONE audit entry carrying the
per-table counts, and REFUSES the base language and any published one
(unpublish first). The UI requires TYPING the code and passes through step-up.

**(c) Switcher density.** The menu had grown into a canvas — tall rows, the
star wrapping under the label. Density is a control, not a canvas: ~12rem wide,
`py-1.5` rows, check · label · star on one line, ≥44px star target at <md.

**(d) Context-note placement.** PASS as landed — visible and persistent in its
labelled block; no change.

## INC-124 — U4i-6 walk findings (2026-09-02b)

**(a) Step-up owns the top layer.** The gate was a plain in-tree
`fixed inset-0 z-50` panel while every Radix dialog portals to the end of
`<body>` at the SAME `z-50`. The dialog that ARMS a sensitive action (the
typed-confirm delete) therefore painted over the gate and kept the focus trap:
the code input was unreachable. Fixed at the primitive — `DialogContent` now
takes `overlayClassName`, and `StepUpGate` renders through the dialog portal on
a dedicated TOP layer (`z-[100]` overlay / `z-[101]` content) with focus moved
into the code input. Only step-up may use that layer.

**(b) Idempotency is server law; a client comparator is advisory.** The no-op
filter landed in U4i-3 lived in the browser, so anything reaching the RPC by
another path (a bypassed filter, a value differing only by trailing whitespace)
re-wrote the row and DEMOTED an approved translation to `edited`.
`admin_import_translations` now compares the incoming value to the stored one
under one normalization (trailing whitespace/newlines trimmed) and, when equal,
writes nothing: no status change, no revision, no audit row of its own —
counted `unchanged` in the RETURN. The client filter stays as a payload-shrinking
fast path; the rendered summary is the SERVER's counts.

**(c) Density is a control.** Switcher rows drop to `py-0.5` with
`leading-tight` (about half the previous rhythm); the 12rem menu width from
U4i-4 is unchanged.

## INC-125 — U4i-7 (2026-09-02)

Imports are batch-tagged and undoable while untouched; conflicts never
overwrite later work. The undo's "untouched" test is the row's VALUE against
what the import wrote, not revision ordering: `changed_at` defaults to the
transaction clock, so revisions written in one transaction tie and any
ordering-based answer is arbitrary (the first cut's proof returned
`{restored:1, conflicted:0}` for a case whose truth was `{restored:2,
conflicted:1}`). Density final: `py-px`.

## INC-126 — U4i-9 mobile roster (2026-09-02)

Fit-content columns crushed the roster at phone width — twins are the law for
dense tables; scroll, never cramp, at mid-widths. A 360 layout assertion now
guards the roster.

## INC-160 — (2026-09-08, imported from the S34/S35 backfill)

CT-6 Escape-swallow.

## INC-161 — (2026-09-08, imported from the S34/S35 backfill)

admin_list_categories 57014 (C3d CTEs).

## INC-162 — (2026-09-08, imported from the S34/S35 backfill)

sub-44px verb targets (touch size at the primitive).

## INC-163 — (2026-09-08, imported from the S34/S35 backfill)

redirect latency = the i18n bundle's per-request aggregation (in-process cache
by publication version).

## INC-164 — (2026-09-08, imported from the S34/S35 backfill)

the same, root: Nano compute + 8s role timeout + nine-job concurrency.

## INC-165 — (2026-09-08, imported from the S34/S35 backfill)

listings never reaped (feed-empty world-assumption; reaper + scoped anchors).

## INC-166 — (2026-09-08, imported from the S34/S35 backfill)

shared-identity session churn (deadlocks on /factors/verify).

## INC-167 — (2026-09-08, imported from the S34/S35 backfill)

stale stepped-up-at hint reader (deleted).

## INC-168 — (2026-09-08, imported from the S34/S35 backfill)

shared refresh token revoked the family (session per test).

## INC-169 — (2026-09-08, imported from the S34/S35 backfill)

challenge-window expiry after 10 minutes (per-test verify).

## INC-170 — (2026-09-08, imported from the S34/S35 backfill)

scratch-prefix anchors (all scratch slugs start with e2e-).

## INC-171 — (2026-09-08, imported from the S34/S35 backfill)

C-2/C-3 inconsistent skip guard.

## INC-172 — (2026-09-08, imported from the S34/S35 backfill)

DataTable pagination slicing owned by the primitive.

## INC-173 — (2026-09-08, imported from the S34/S35 backfill)

language baseline on acquire = NULL (fresh-user state); switchLanguage waits on
the device record.

## INC-174 — (2026-09-08, imported from the S34/S35 backfill)

local-only RP-1 sign-out reconciliation — CLOSED 2026-09-11.

Cause: until c40b7109 (2026-09-07, IE-1r Part D — the real door, always)
`signIn` injected sessions in every local run (`sessionInjectionEnabled()`
is false only under the parked CI knob); the injection's INC-120 write-once
sentinel lives in localStorage, which RP-1's signed-out phase clears, so the
next `page.goto` re-wrote the last injected grant before the document booted.
Local-only by construction; never in-memory. Written on 2026-09-08 from an
earlier observation, after the fix had already landed. Verified at HEAD
b0a4bd20 on 2026-09-11: 2 runs × 2 projects, `--retries=0`, all green. No code
change. Lesson (J9 gloss, v3.9 candidate): a pool-injected page must never
test signed-out behaviour by clearing storage — the sentinel re-arms the pool
session on the next document; signed-out assertions take the real door.

## INC-175 — (2026-09-08, imported from the S34/S35 backfill)

EN baseline heal on staging (compiled EN is staging's truth of record).

## INC-176 — (2026-09-08, imported from the S34/S35 backfill)

orphan function on the connected project after a lost working tree (migration
and commit in the same turn; report divergence first).

## INC-177 — (2026-09-08, imported from the S34/S35 backfill)

non-idempotent import round-trip (semantic option comparison; the real-export
invariant).

## INC-178 — (2026-09-08, imported from the S34/S35 backfill)

read-only reporter noise (one serializer; compare after normalization).

## INC-182 — (2026-09-09, IMPORT-GATE T2)

TR-19 and TR-30 (`@global-state`, DEC-028 quarantine) fail on a LOCAL subset
run of `admin-translations-governance.spec.ts` because the fence language
carries the whole interface catalog untranslated (1063 keys, 1059 of them
untranslated at the time of the run) and the seeded rows therefore sit past the
first page the test reads. Neither test touches the import door — TR-29 (CSV
round trip) and TR-32 (undo), which do, pass through the new route — so this is
a fixture/ordering debt in the specs (they must anchor on the seeded rows
through the filter or the search, not on page one), not a regression of the
gate. Owner: translations E2E; to be fixed with the shard-1 heal that a subset
run skips (J3).

**Resolved (2026-09-09, IMPORT-GATE T3).** Both tests were repaired at the
anchor, not at the environment. TR-19 now OPENS the fence page already narrowed
to its own scratch prefix through the list's URL search (`?q=`), so the four
seeded rows are read where they provably are instead of on page one, and no
debounce race can hide them (J7). TR-30's failure was a different fault the
subset run had masked: `lang-public-zxa` exists in BOTH DataTable twins, so a
bare testid was a strict-mode violation; the switch and its gate caption are now
read through `langRow(...)` per twin (J5). Proof: the mandatory closure run
across all three families on both projects — 211 passed, 7 skipped, 0 failed.

## INC-179 — (2026-09-09, IE-5b)

A migration file was deleted after it had applied on the connected project;
restored byte-identical. Law: migration files are never deleted or edited once
applied anywhere — a failed-elsewhere migration is superseded by a corrective
that heals its mark.

## INC-180 — (2026-09-09, IE-6)

Inherited echo rows collided with new direct rows in the duplicate-key check.
Fix: the duplicate-key check tracks direct rows only (IE-6).

## INC-181 — (2026-09-09, IE-6)

Empty read-only cells were reported as edits. Fix: an empty read-only cell
means "not provided" and is silent (IE-6).

## INC-183 — a migration patched a function body by text anchor (second occurrence)

The IE-8 rename detector was inserted into `attr_import_plan` by exact-text
(`20260910042749_afcb289a`) and then by regex (`20260910045047_1dce2042`)
against the live definition; the first failed on staging because prod and
staging differed by whitespace. LAW (frozen 2026-09-10): a migration NEVER
patches a function body by anchor, flexible or not — it re-declares the
function whole with `CREATE OR REPLACE`, restates its closers and reads back
its definition and ACL in-file. Closed by `20260910053535_40e4ab7d`, the whole
re-declaration; no anchored patch remains in the lineage.

## INC-184 — TR-29's catalog-count invariant reads sibling workers' transient fence rows

TR-29 exports the fence language's catalog as CSV, then reads `count(*)` of
`ui_translations` for that fence with the service client and asserts the
file's data-line count equals it. The count is taken AFTER the download, over
the whole fence language, which every test in the same project shares (J2);
a sibling worker's scratch key landing in that window fails the assertion by
exactly one — nine retry-passes in seven days (2026-09-06→10; shard 2
mobile-360 and shard 5 desktop-1280), every body "N rows for an N+1-row
catalog". The export is not page-scoped (INC-123 holds); the invariant is the
leak (J6: invariants exclude other tests' rows). Fix at the anchor: compare
the non-scratch key sets on both sides — the file's rows minus `e2e-` keys
against the DB count with the scratch prefix excluded — and keep the test's
own round-trip assertion (imported value per key) as the proof of its own
rows. Class: J6 invariant leak (INC-182's sibling in the anchor family).

## INC-185 — TR-12's waits carry no step names, so twenty retry-passes name nothing

TR-12 passed on retry twenty times in seven days (2026-09-04→09; shards 1/2
mobile-360, 4/5 desktop-1280 — the DEC-030 trigger met six times over), and
every flake-ledger line ends at `expect(locator).toBeVisible() failed`: the
ledger quotes the first line of the error and Playwright puts the locator on
the second, so the evidence cannot say which of the test's four waits stalls
(ai-bulk-start 20 s, ai-bulk-confirm, ai-bulk-summary 90 s, the string row
20 s). INC-115c closed the earlier cause (a one-letter fence region) on
2026-09-02; these are later. First fix, inside the spec (J7 — failures assert
with values): give each wait a `message:` naming its step, then read the next
seven days' ledger before touching the console. Class: evidence fidelity
(G20).

## INC-186 — a green run never judges the artifact contract

`E2E_GREEN` is derived from the shard/smoke/email jobs' own results, and on
`E2E_GREEN=1` the merged reporter writes the green form and returns before
opening any results directory; the merged job's three `pattern` downloads are
`continue-on-error`. A change in `actions/download-artifact`'s on-disk layout
under `pattern` would therefore pass every green run unseen and surface only
on the next red — as a spurious all-sources runner-death, the wrong brief
(G21). Found while landing DEC-049 (download-artifact v4 → v7, read at
a511b3c); mitigated for that landing by the operator's glance at the merged
job's "Verify the downloaded artifacts belong to this attempt" step (eight
results.json). Permanent fix is a reporter change under the harness ritual
(DEC candidate): the green branch reads the expected sources too — the
DEC-030 flake-only pass already does — and the green form carries
`Sources read: n/N`; an unreadable expected source on a green run is
`silent`, which the red branch already counts as gating. Class: evidence
fidelity — INC-100's sibling: blind on green as INC-100 was blind on re-run.

## INC-187 — the categories import plans `display_order` but never commits it

Walk finding after the Real Estate import (2026-09-11). `cat_import_plan`
diffs `display_order` into every changed row's delta and carries it in every
create payload, so the preview counted the file's five reorders and two placed
creates as changes. `admin_commit_category_import` then calls
`admin_update_category` with NULL in `p_display_order` — the door applies
`COALESCE(p_display_order, c.display_order)`, so NULL keeps the old value — and
`admin_create_category` has no order parameter, so created rows are appended.
The console showed Condominiums at 9 and New Developments at 10 instead of 3
and 4, and Commercial, Land and Short-term unmoved, after "131 changes
written". The export marks the column editable; stale `category_path` cells
are at least reported under "Ignored (read-only)" — `display_order` is dropped
without a word. Class: phantom success (F4; §7). Fix: the commit applies the
delta's order through `p_display_order` and follows every create with the same
update carrying the payload's order; catch-all rows are skipped (the reorder
door pins them at 1000000+); the categories-import round-trip E2E asserts
`display_order` on changed and created rows against DB truth (J4; G26). Proof:
the Real Estate categories file re-imported unchanged lands the intended order.

INC-187 addendum (2026-09-11) — mechanism corrected after the commit function
was read in full; the registered sentence "the commit never commits it" was
wrong — it came from a grep window that cut before the decisive block
(supervisor slip, G3-addendum class, logged in S36). What the code did:
creates ignore the payload's `display_order` (`admin_create_category` has no
order parameter; rows are appended); updates DO commit order, but one row at a
time — each row with an order delta is ranked against its siblings' CURRENT
numbers and `admin_reorder_categories` renumbers all siblings 0..N−1, so after
the first row every later file value is compared on a different scale and a
file with several order edits does not reproduce its own sequence; the
catch-all is excluded from the reorder door yet the planner counts its order
cell as a change. Fix, part 1 (`5c1e174e`): the planner emits no
`display_order` delta for a catch-all; the commit and the undo each apply
order ONCE per primary parent after all rows — siblings sorted by the file's
value for rows in the batch (the prev value on undo) and their current
position otherwise, then one reorder call — so the batch's rows land in
exactly the file's sequence among their siblings. Proof, part 2: CT-30, then
the Real Estate categories file re-imported unchanged.

## INC-188 — the console erased curated option fields (fixed by DEC-050 L3b, 2026-09-12)

The definition editor composed options from a values textarea as
`{ value, labelEn: "", labelAm: "", parent }` and `admin_upsert_attribute`
stores `options = p_options` as passed, so saving a curated select definition
in the console erased every option's `label_en` and `label_am` and, since
DEC-050 L1, its `active`, `bounds` and `aliases`. Fix: options are edited as
rows carrying every field, and the writer emits the door's strict normalised
record, so a save without edits sends the stored records back unchanged.

## INC-189 — a teardown failure fails a green shard and leaves no body in the evidence

Run 34741970648, shard 6: 75 tests passed, then `global-teardown.ts` threw on a

transient `fetch failed` deleting one pooled user, the job exited 1, the merged

verdict went red and promote was skipped. The evidence file reported

"Gating failures: 0" with no body for the teardown error — an error channel

without a capture path (G20). Hour-old residue is reaped by the next setup

(J3), so a failed delete after green tests is never worth a red board. Fix

(DEC-059, harness ritual): the teardown retries each delete with backoff and

reports leftovers as warnings, never as an error after green tests; the

reporter captures post-test errors into the evidence file. Class: harness

flake with a blind reporter (INC-100/INC-186 family).

## INC-190 — TR-34 snapshots the whole entity-translation map (J6)

TR-34 reads the entire entity-translation map before and after its own

action and asserts nothing else changed, so any sibling test that renames or

creates a category in the same run breaks it: two retry-passes on 2026-09-10

and a gating failure on run 34749709166 (both attempts, shard 2 mobile-360),

unrelated to the landing under test. The DEC-030 trigger is met. Fix (with

INC-184, the same class): scope the snapshot to rows outside the scratch

namespace, or to the test's own subject, so other tests' rows fall out of the

invariant. Class: J6 invariant leak.

INC-184, INC-189, INC-190 — CLOSED 2026-09-13 by DEC-059: TR-29 counts and compares stable rows plus its own key; TR-34's bundle snapshot excludes the reserved `e2e-`/`e2e_` prefix; the teardown retries and warns instead of failing a green shard; the reporter captures post-test lines into the evidence file (fixture: the real shard-6 log tail of run 34741970648, attempt 1).

## INC-191 — the reporter's self-test wrote the tracked evidence file

During the DEC-059 landing the reporter's `--self-test` rendered into `docs/tracking/e2e-last-failure.md`; the platform's mid-turn auto-commit shipped a local run's output ("Run: local") before the executor's restore, so HEAD briefly carried a fake evidence file until the next CI run rewrote it. Fix: the self-test renders into a temp directory and never writes the tracked file. Class: a tool writing evidence it did not earn (G20). Rule for prompts: every landing's VERBATIM record blocks are copied to a scratch file before editing (they were lost from the executor's context twice in code-heavy turns).

## INC-192 — the deletion guard had no door the executor could open

`scripts/check-deletions.sh` (INC-076) accepted only a `[intentional-delete]` commit-message marker, and the platform writes every commit message — no commit in the repository ever carried the marker, so every executor-side deletion was unpassable (the root `roadmap.md` cleanup went red twice). Fix: a second door — a path line added by the same push to `docs/tracking/intentional-deletions.txt`; self-test covers both directions. Class: an unsatisfiable guard.

## INC-193 — TR-24 asserted a global untranslated count (J6)

TR-24 waited for the fence language's untranslated-entity count to drop after translating its own row; sibling shards add scratch entities to the same fence, so the count can stay put (run 34753266967, both attempts, shard 2 mobile-360). Fix: assert the test's own rows (bundle state and row status), the stats bar for visibility only. Class: J6 invariant leak (INC-184/190 family; TR-24 was on the INC-119 watch).

## INC-194 — the post-test window swept a failing test's own error

DEC-059's post-test extraction started at the last test-result line; Playwright prints a failing test's error block in the summary after that line, so TR-24's failure appeared under "Post-test errors: shard 2" as well as in its own section. Fix: the window starts at the final summary block; teardown lines after it are captured, result lines and failure blocks are not. Class: evidence fidelity (G20).

## INC-195 — a new option row was hidden by the active search, and blank rows reached the door

C3-UX-7's option search filtered rows by value or label; `add(parent)` appended a blank row that could never match a non-empty needle, so the row was created out of view, repeated clicks piled up blank rows, and a save sent them to the door, which refused them with no visible cause. Found by the platform's scanner on 2026-09-13; the same scan re-reported two findings already fixed (the one-write link flags, the settled step-up promise) — verified stale against the tree. Fix: adding an option clears the needle, scopes the parent filter to the row's parent and scrolls it into view; a save with any blank value is refused in the dialog with a named count before the door is called (AT-57). Class: a view-only filter that hid a write.

INC-185 — CLOSED 2026-09-14: TR-12's waits carry step names and the values they wait on, so the flake ledger now records which step stalled instead of "expect(locator).toBeVisible() failed"; timeouts and locators unchanged. Whether the 21-in-7 retry rate is contention or a real slow path is read from the next week of named ledger lines (DEC-030 watch continues).

## INC-196 — a clean preview, a failed commit: rank swaps collided mid-transaction, and the dialog said nothing

Travel's attributes import (2026-09-14) previewed 57 added · 2 changed · 12 unchanged · 0 refused and the commit failed. Cause: the commit applied a category's link changes in plan order (by attribute key), so vehicle-hire's model-cars moved to rank 3 before seats vacated it, and UNIQUE (category_id, card_rank) refused mid-transaction although the end state was valid. Second defect: the dialog rendered the generic "could not be completed" and swallowed the error key and detail (F4). Fix: the commit clears every changing rank first, applies unlinks, then sets adds and final states (L1, proofs for shift, swap, and add-over-move, with undo); the dialog surfaces the RPC's error key and detail (L2). Class: write order inside one transaction against a non-deferrable constraint; a swallowed server error.

INC-196 — CLOSED 2026-09-14 (L1 9fc2d238: two-pass link writes; L2: the import dialog renders the commit's error key or message and detail beneath the generic line, the route forwarding them; AT-58 proves a rank shift and a rank swap through the route with undo). Beauty's import that day committed 92 changes with rank moves after the L1 apply on staging; prod applied the same mark.

## INC-197 — the undo restores ranks in one pass, so undoing a rank swap collides

Found by AT-58 on 2026-09-14, immediately after INC-196 L1 landed. `admin_undo_attribute_import` restores each link's prior card_rank in plan order, so undoing a commit that SWAPPED two ranks within one category fails with `duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"` — the same write-order defect L1 removed from the commit, in the function L1 deliberately left byte-identical. A rank SHIFT (one rank vacated) undoes clean; only a swap collides. Fixing it is a migration (the undo re-declared whole per INC-183 with the commit's two-pass shape: clear every changing rank, then restore final states), which INC-196 L2 may not carry. AT-58 asserts today's truth and forwards the message, so the finding is visible in the dialog rather than silent. Class: the same one-pass write order, in the mirror function.

INC-197 — CLOSED 2026-09-14 by its migration: admin_undo_attribute_import restores links in two passes (clear changing ranks → delete added links → reinsert unlinked and restore changed states), mirroring the INC-196 commit fix; proofs undo a shift, a swap and an add-over-move to the exact prior ranks. AT-58 now asserts both undos succeed (L2 spec update). Found by AT-58 red on run 34837657033 (a shift's undo collided on one shard where the local run had passed — revision iteration order made the collision intermittent).

## INC-198 — the categories import will not delete an empty root

A delete row for food-beverages-2 (an auto-suffixed root with no children and no listings) previewed as unchanged at All categories; the root was retired in the console instead. Either the planner should delete an empty root or the preview should say why it will not — silence is the defect. Class: a no-op that should have been a refusal with a reason. Fix at the library sweep.

## INC-199 — the categories planner ignores is_active and drops an action row's other cells, silently

Two silent no-ops found across the Agriculture, Babies & Kids and Pets passes: (1) a row whose is_active cell differs from the stored status, without a retire/reactivate action, previews as changed for its other cells and leaves the status untouched — three intended reactivations stayed retired until fixed by hand; (2) a row carrying action = reactivate applies the action and drops the row's other cell changes (Pet Services' secondary parent). Fix: (1) refuse the row by name ("is_active differs from the stored status — use action = reactivate or retire"); (2) an action row is a change row plus the action — its cells apply. Class: silent no-op where a refusal or an apply was due (with INC-198).

INC-198, INC-199 — CLOSED 2026-09-15 by their migration: an empty root deletes by file and undoes; an is_active cell without the matching action is refused `statusNeedsAction`; an action row applies its other cells alongside the status change, in one write, undone together; already-retired rows say so in the preview detail. L2 (gate refusal key EN+AM, IG-2 hostile rows, CT-32) next.

## INC-200 — a type change kept the old type's cells and the CHECK refused the row

The library sweep converted compatible_make from text to multi_select; the door's change path keeps a NULL parameter as "leave as is", so preset free:40 and max_length 40 survived onto the select and attributes_max_length_check refused the commit — the whole 381-row batch rolled back (correctly) with no reason line until the dialog was published. Fix: a type change clears every cell that does not apply to the new type, in the door and in the planner's diff, with the preview naming the clears. Class: a partial write on a type transition. Found 2026-09-15; the sweep landed without that row and the conversion follows this fix.

## INC-201 — the locations undo re-inserted deleted rows deepest-first

Defect: admin_undo_location_import (55cdd205) ordered every revision group by key depth DESC; for location:delete revisions that is inverted — a batch that deleted a city and its sub-cities (legal: children deleted earlier in the same file) was re-inserted sub-city first, and the L1a ancestry guard refused parentMissing. Evidence: the ORDER BY read verbatim at supervisor verification (L1b-M's proof list covered the commit's write sequence and no undo sequence — supervisor gap, G10). Class: undo ordering (INC-197's family).

INC-201 — CLOSED 2026-09-15 by ae6b3804: the door re-declared whole, deleted rows return parents-first; P6 proves the ordering expression over a VALUES set, P7 the ten untouched functions; the round trip through the route is proven at L2 (LT).

## INC-202 — a thrown public-language gate fetch skipped the F4 retry and reported the gate ready

Defect: fetchPublicLanguages (src/i18n/provider.tsx) retried once only on an HTTP error response; a THROWN fetch (ERR_QUIC_PROTOCOL_ERROR, ERR_HTTP2_SERVER_REFUSED_STREAM, ERR_CONNECTION_CLOSED) returned null, skipped the retry, and the provider set gateReady = true with the compiled seed ["en"]; TR-28 then compared that degraded mirror with SSR's healthy gate (am, en) and failed. Evidence: run 35011187482 (smoke, both attempts, client-error attachments); the decisive lines read at verification; DEC-030 threshold met (three ledgered flakes on 2026-09-07 plus this failure). Class: I6 — a failed gate fetch is logged and retried, never silently defaulted; J4 — a test judges truth from the database, not a client mirror.

INC-202 — CLOSED 2026-09-15 by L1c-C (aa75fd56): a thrown attempt is retried once and logged; the mirror carries degraded; TR-28 reads the gate from languages through the service client and annotates a client degradation by name instead of failing on it.

## INC-203 — import commits carry Amharic through the translation door, which is gated on translations:update

Finding: admin_commit_category_import and admin_commit_location_import write a non-empty name_am cell through admin_save_entity_translation, whose own gate is has_permission(auth.uid(), 'translations', 'update'); an importer holding categories:import or locations:import but not translations:update fails on an Amharic cell. Invisible to a super-admin operator. Class: permission coupling across doors. OPEN — ruled at the L2 review (either the import doors write the am row with the same capture themselves, or the import permissions carry the translation grant by definition).

## INC-204 — the L2a prompt specified row verbs, producing a six-button stack that clipped the roster

Defect: the supervisor's L2a prompt listed create-child, edit, activate/retire, move, reorder and delete as "row actions"; the executor rendered them in the primitive's 96 px actions column, which overflowed and hid every verb; LT-2's overflow check tested the page, not the scroller, and stayed green. Evidence: the operator's walk 2026-09-15 (screenshots), supervisor read of rowActions in locations-page.tsx. Class: prompt mis-specifies a UI convention that the donor console already embodies (CT-8: one edit icon per row, verbs in the editor).

INC-204 — CLOSED 2026-09-15 by L2a-R: the categories convention restored, the shared TipBadge lifted, LT-2 asserts the scroller and every action box, LT-8..11 added. Rule: a console prompt names the donor's pattern by its test ("as CT-8"), never re-describes it.

## INC-205 — an executor format check ran before the last edit and reported clean on a red file

Defect: L2a-R's report stated format:check clean while docs/features/locations-console.md failed the pinned prettier (hand-aligned tables); the check had run before the final doc edit. Evidence: run 35025336718 (Build, typecheck, lint: Format check step), supervisor reproduction offline with prettier 3.8.3. Class: a check that does not run last proves nothing.

INC-205 — CLOSED 2026-09-15 by R-CI: the file re-aligned by the formatter; every prompt since carries "format:check as the LAST command"; DEC-066 makes the failure readable from the repo.

## INC-206 — undoing a countries-file create was refused by the anchor it created itself

Defect: since L2b-M a country row is born with its anchor (countries_anchor_on_insert), so the import undo's country:create branch — which refuses when any location row references the code — always answered undoBlocked:hasRows. Evidence: the executor's CO-7 limitation note (C1), supervisor read of the branch. Class: a trigger changed an invariant a sibling door relied on.

INC-206 — CLOSED 2026-09-16 by 186a9cb4 (L2b-C2): admin_undo_location_import re-declared whole; undoing country:create removes the born anchor when it carries nothing; CO-7 proves the removal through the route.

## INC-207 — a thrown bulk-AI chunk aborted the run without a summary; TR-12 reported a mute timeout

Defect: ai-bulk-bar.tsx translated chunks in sequence and set the summary only after the last; a chunk whose request threw (network) fell into the error path with no summary, while TR-12 waited on the summary alone and reported "never rendered within 90 s". Evidence: run 35101545574 (shard 2, mobile-360, client-error attachments; gate fetches threw in the same run); five flake-ledger entries 2026-09-15/16 (DEC-030 threshold crossed). Class: F4 — a partial failure must still report; a test must read the failure it can see.

INC-207 — CLOSED 2026-09-16 by L2d: a throwing chunk is retried once, then its keys land in the summary's failed list and the run continues (the summary always renders); TR-12 step 3 waits on summary or error and fails with the error's text.

## INC-208 — decimal import columns refused a hand-typed negative number

Defect: the gate's formula law refused any cell beginning with "-" unless the column allowed it; decimal/int columns carried no allowance, so a curator's plain negative longitude was refused while the export's apostrophe form round-tripped. Evidence: the cycle-1 diaspora file (34 cells), gate.ts isFormulaCell + registry.ts. Class: a type whose regex already proves the cell is a number was still subject to the formula guard.

INC-208 — CLOSED 2026-09-16 by L3-FIX (7fcdddce): every decimal/int import column allows formula-leading; a hostile-catalogue probe proves a plain negative reaches the planner.

## INC-209 — a closed market's anchor blocked the preparation of its tree

Defect: the ancestry guard and the import planner refused any active row under an inactive parent; since L2b-M a closed market's anchor is inactive, so a curated tree could not be imported active under a closed country (58 rows refused parentInactive/parentLaterInFile), contradicting the era's law that a market's tree is prepared before it opens. Evidence: the cycle-1 diaspora preview 2026-09-16; guard line 161; planner conditions. Class: two laws collided at the anchor; supervisor design gap (the charter promised what the importer refused).

INC-209 — CLOSED 2026-09-16 by L3-FIX: the country anchor is exempt (guard and planner re-declared whole, depth > 2 keeps the rule); the path rule keeps the tree hidden until the market opens; proofs P1–P3.

## INC-210 — guarded-action tests raced the step-up modal with a fixed window

Defect: tests clicked a guarded action and probed for the step-up modal for five seconds; when the server's step_up_required arrived later, the modal opened after the probe, the run parked on it, and the test saw neither outcome nor error (TR-12's "mute timeout"). Evidence: run 35155684382 shard 2; use-step-up.ts guard path; ui.ts stepUpIfPrompted. Class: a fixed-window probe for an event whose timing the server decides.

INC-210 — CLOSED 2026-09-17 by U6-A1's rider: `awaitGuardedOutcome` waits for the outcome or the modal, answers the modal, keeps waiting; TR-12, CT-3, LT-3/6, CO-4, CV-3 use it.

## INC-211 — the shell picker seeded a picked market with the previous market's anchor

Defect: `useCountryTree` kept the previous country's nodes until the new fetch resolved; the anchor-landing effect fired on the stale nodes, seeded the path with the old market's anchor and wrote the cookie with a foreign node; the cascade rendered nothing until a reload. Evidence: operator walk 2026-09-16 (Australia); app-shell.tsx effect; location-data.ts hook. Class: state carried across a key change.

INC-211 — CLOSED 2026-09-17 by A1-R: the hook resets on change; the cookie waits for the picked market's tree; LS-11.

## INC-212 — new service-only tables were born client-granted

Defect: Supabase's default privileges on public grant every new table to anon/authenticated at creation; three service-only tables of A1-2 were born client-granted; the migration's read-back proof caught it and rolled the whole file back. Evidence: A1-2 first attempt error "READ-BACK FAILED: a client role holds a grant on a service-only table"; pg_default_acl. Class: an environment default that a migration must undo explicitly.

INC-212 — CLOSED 2026-09-17 by A1-2's retry: explicit REVOKE ALL FROM anon, authenticated after each new table; Knowledge v3.10 E1 proposal.

## INC-213 — the executor committed while the local run was parity-blocked

Defect: U6-A1 was committed with the DEC-023 local run refused by staging parity ("STAGING BEHIND"), against Knowledge A7 ("blocked by staging parity = NO commit"); the board went red until the operator applied the migrations. Evidence: the A1 completion report, limitation 2. Class: executor procedural slip, first occurrence.

INC-213 — CLOSED 2026-09-17 (procedural; the law stands; every prompt restates it).

## INC-214 — TR-34 pruned scratch rows by name only

Defect: the Data-roster equality snapshot pruned scratch entries by a name regex; a sibling shard's scratch place with an Amharic name carried no marker and appeared as a phantom diff (15 flake-ledger entries). Evidence: run 35165292681 shard 2 ({"name":"አዲስ አበባ 35165292681-5"}). Class: an invariant reading global state without excluding other tests' rows (J6).

INC-214 — CLOSED 2026-09-17 by A1-R: pruning by live identity across every scratch family plus the marker.

## INC-215 — an action row's profile cells are dropped silently by the countries import

Defect: for an existing country with action open/close, the commit takes the state branch and never the update branch; currency/unit edits on the same row are neither applied nor reported. Evidence: the cycle-3 countries file (EUR/GBP/KES on open rows) — the roster kept the blanks; loc_import_plan and admin_commit_location_import branches. Class: F4/F5 — an edit silently not applied.

INC-215 — OPEN. Fix at U6-A2 (an action row applies its field edits, or reports them ignored). Interim rule for curators: profile edits on their own rows.

## INC-216 — leaked open scratch markets crowded both rosters (the LT-13 / CO-\* red)

Defect: LS-11 seeded two scratch markets per run and cleaned up in a finally inside the test body, which a timeout abandons; `destroyCountry` discarded database errors, so partial failures left OPEN markets behind silently; the reaper removed only residue older than three hours. 26 open scratch markets sorted ahead of Ethiopia on the Countries roster and 85 scratch places pushed the Places roster past page 1; LT-13 and CO-1..7 asserted real rows by page-1 presence. Evidence: R-LT13 STEP 1 (staging counts and roster orders); runs 35176748289, 35190393232. Class: layered causes (timeout-abandoned finally · silent catch · reaper window) behind a page-position assertion; supervisor slip: the LT-13 brief assumed page-1 presence.

INC-216 — CLOSED 2026-09-17 by R-LT13: destroy closes, deletes child-first and throws by step; the reaper reads every handle; shell fixtures clean up in afterEach; LT-13 and the CO tests locate rows through search and totals through DB truth; residue reaped.

## Reconciliation 2026-09-25 — INC-215 closure; INC-217 → INC-287 (supervisor record S41/S42)

The tracker stopped at INC-216 (2026-09-17). Every number since was registered in the supervisor thread and, where a fix landed, recorded by the executor in docs/\_changelog.md and the feature docs; this block restores the ledger from those records. Numbers without a repo record are listed as VOID so they are never reused. Open items keep their status line.

INC-215 — CLOSED 2026-09-17 by M-MAINT: a countries-file row carrying open/close applies its field edits too (planner and commit re-declared whole; the preview counts both). See docs/features/imports.md § INC-215.

## INC-217 — the open-markets read carried no anchor id

Defect: `get_open_countries` returned no `anchor_id`, so the shell picker could not resolve a market's name through the entity bundle and rendered raw `name_en`. Evidence: changelog 2026-09-17 U6-A2-M ("`get_open_countries` gains `anchor_id` (INC-217)") and U6-A2-C ("market names in the shell through the entity bundle"). Class: a public read missing the field its consumer names rows by.

INC-217 — CLOSED 2026-09-17 by U6-A2-M/U6-A2-C.

## INC-218 — LS-11 (second market's tree) over budget, then not reproducible, then the cache window

Defect: LS-11 summed a 40 s open-market poll and two 30 s tree polls past its own three-minute budget, so the test timeout fired before any expect could name a step (closed 2026-09-17 by R-FLAKES: every wait bounded and named); re-opened 2026-09-19 (U6-C1-R3b-2 Part 1: not reproduced in any loaded run; an instrumented refusal names the menu's DOM, the wanted item's count and the browser's own `/api/locations` body); U6-C1-R3a opened a fresh browser context after seeding (the HTTP cache lives per context). Step 3 (2026-09-25): 8 flake-ledger lines 09-19 → 09-25, the instrumented refusal reading "the open-market list never carried QZ within 20 s"; 20 local repeats measured a seeded market appearing after up to 15.3 s — the route's 15 s server TTL (`src/routes/api/locations.ts:28`) plus a loaded read overran the 20 s wait; LS-11's two open-market waits are 35 s (15 s TTL + 20 s read allowance), named in the poll message; LS-12/LS-13 keep 20 s. Class: a test budget written against a route's cache TTL without a load allowance (J5/J7).

INC-218 — OPEN (watch): closes when the flake ledger shows no LS-11 line for seven days after 2026-09-25.

## INC-219 — TR-12 bulk AI fill ran the whole catalog

Defect: the mobile timeout was a full-catalog run (1,685 keys) instead of the three scratch keys, and the bulk-AI bar exposed no run state for the test to wait on. Evidence: changelog 2026-09-17 R-FLAKES. Class: a bulk action without the roster's scope; a control without a readiness state.

INC-219 — CLOSED 2026-09-17 by R-FLAKES (the fill honours the search filter; the bar exposes run state and readiness).

## INC-220 — listing-photos storage policies keyed on the partition segment

Defect: the bucket's owner-read policy keyed the owner on the FIRST path segment (the partition) instead of the segment after it, so the DEC-075 key `default/<user_id>/…` never matched the owner. Evidence: registered 2026-09-17 with U6-B1; fixed 2026-09-17 M-MAINT; docs/features/media-pipeline.md § INC-220. Class: policy path arithmetic off by one segment (Tier A storage policy).

INC-220 — CLOSED 2026-09-17 by M-MAINT.

## INC-221 — Amharic market names looked wrong on the published site

Defect: none — a stale cached UI/entity bundle (300 s max-age) on the operator's browser; the names were correct on a fresh load. Evidence: changelog 2026-09-17 (R-FLAKES line). Class: cache freshness vs. walk timing.

INC-221 — CLOSED 2026-09-17 (no change; walks wait out the bundle window).

## INC-222 — a migration proof anchored on a live catalog definition

Defect: an in-file proof read a real definition, so it could not run on a database where that row is absent and could touch a real row. Rule since: every proof builds and deletes its own scratch definition in the same file. Evidence: docs/features/attributes.md ("the public read on a scratch definition built and deleted in the same file (INC-222)"); second occurrence INC-255. Class: proof anchoring on a real row (J3 for migrations).

INC-222 — CLOSED (the scratch-row proof law; promoted at INC-255).

## INC-223 — session clocks keyed to a previous session

Defect: the idle/absolute clocks read stale stamps from a previous session, so a correct sign-in ended in "Signed out for inactivity"; rider: the session ref is the JWT `session_id` claim so a token refresh never restarts the absolute window. Evidence: changelog 2026-09-19 "INC-223 fixed" and the rider line. Class: local state outliving its session (Tier A auth).

INC-223 — CLOSED 2026-09-19.

## INC-224 — the Google door dropped the sign-in return path

Defect: D20's return path was honoured by the email door only. Evidence: changelog 2026-09-18 U6-C1-R1 ("the Google door honours the return path through its own `redirectTo` query"). Class: a site law applied to one door of three.

INC-224 — CLOSED 2026-09-18 by U6-C1-R1.

INC-225 · INC-226 — VOID (numbers used in the 2026-09-18 → 09-23 thread; no repo record; never reused).

## INC-227 — autosave rate refusals dead-ended the seller

Defect: the draft route's rate dial was sized for humans and hit by an autosave loop; a refusal left the wizard stuck. Evidence: changelog 2026-09-18 U6-C1-R1 ("draft rate dial 600/h, change-only autosave, rate refusals never dead-end"). Class: a rate limit met by the app's own loop.

INC-227 — CLOSED 2026-09-18.

## INC-228 — autosave validated the current step on every save

Defect: the autosave judged the step the seller was still typing; now it saves at the last completed step and only Next validates the current one. Evidence: changelog 2026-09-18 U6-C1-R1. Class: validation attached to the wrong event.

INC-228 — CLOSED 2026-09-18.

## INC-229 — specification fields outside the field primitive

Defect: specification controls lacked the shared field primitive (required borders) and lost their values on Back (no rehydration). Evidence: changelog 2026-09-18 U6-C1-R1. Class: U6-C1-R2 — every field through the primitive.

INC-229 — CLOSED 2026-09-18.

INC-230 — VOID (no repo record).

## INC-231 — a phone field accepted the word "number"

Defect: no client-side rule mirrored the doors; the identity route saved a profile before judging `contact_pref`. Fix: every wizard field validates on blur against a client mirror (`src/features/posting/validate.ts`), the identity route validates through `listing_contact_refusals` BEFORE saving, the refusal summary lists fields by label with cross-step links. Evidence: changelog 2026-09-19 U6-C1-R3a-2. Class: F3 mirror missing (the door was right; the screen was silent).

INC-231 — CLOSED 2026-09-19.

INC-232 · INC-233 — VOID (no repo record).

## INC-234 — the importer's gate lacked the `facts` option key

Defect: the gate kept its own copy of the option-key allowlist and lacked `facts` while `attr_option_shape` had allowed it since 20260917210006, so the console's own export of a fold set was refused. Evidence: `src/server/imports/gate.ts` (the INC-234 comment); docs/features/imports.md (the INC-264 paragraph). Class: two allowlists for one shape — second occurrence INC-264 → the gate spells the door's ten keys and judges shape only.

INC-234 — CLOSED 2026-09-20 (M-FACTS era).

## INC-235 — the where step opened before the tree route served the scratch chain

Defect: under load, `reachStep7` opened the where step before `/api/locations/<market>` served the city, and nothing named the wait. Fix: the helper waits on the route from node (`cache: "no-store"`) and names what it saw. Evidence: changelog 2026-09-19 U6-C1-R3b-2 Part 2a; flake ledger 2026-09-24 (PW-39, run 36064995954 — the named refusal, not a silent timeout). Class: J7 wait-on-the-route.

INC-235 — CLOSED 2026-09-19 (the named refusal stands as instrumentation).

## INC-236 — facts keys refused the definition-key charset

Defect: a facts key with a hyphen was refused although definition keys carry hyphens. Evidence: changelog 2026-09-20 M-MAINT-3b. Class: one charset declared twice.

INC-236 — CLOSED 2026-09-20.

## INC-237 — the where step guessed a market for the seller

Defect: the where step preselected a market the prefill had not resolved. Evidence: changelog 2026-09-20 R-CLEAN (PW-31); docs/features/posting.md § INC-237 (R-CLEAN) — THE MARKET IS NEVER GUESSED FOR THE SELLER. Class: a sentinel default on a geography path (§7 banned pattern).

INC-237 — CLOSED 2026-09-20.

## INC-238 — visible_when sibling keys refused hyphens

Defect: the condition's key charset lacked the hyphen a real sibling key carries. Evidence: changelog 2026-09-20 R-CLEAN (apply `fb8d315a` → mark `20260920100000`). Class: INC-236's charset, second site.

INC-238 — CLOSED 2026-09-20.

## INC-239 — a facts-only change previewed as unchanged

Defect: the attributes file did not diff, write or echo option `facts`. Evidence: changelog 2026-09-20 M-FACTS (apply `7b9dc9eb` → mark `20260920110000`). Class: F4 — an edit silently not applied.

INC-239 — CLOSED 2026-09-20.

## INC-240 — prefilled details did not re-derive on a parent change

Defect: a parent option change left the previous model's prefills in place, and a seller edit could be lost. Evidence: changelog 2026-09-20 U6-C1-R3b-3a (PW-32); D25. Class: derived state not re-derived.

INC-240 — CLOSED 2026-09-20.

## INC-241 — the links gate and the two new cells

Defect (as registered): the links import gate did not know `visible_when` and `display_order`. Census at fix time: the gate never ignored an unknown column — it has answered `unknownColumn` by name since its birth; the two cells were added. Evidence: changelog 2026-09-20 R-GATE. Class: registration corrected by census (recorded, not hidden).

INC-241 — CLOSED 2026-09-20.

## INC-242 — option bounds applied from one option only

Defect: a model's year floor did not bound the picker when the bound came from a later-selected option. Evidence: changelog 2026-09-20 U6-C1-R3b-3c (PW-25). Class: bounds must narrow from every chosen option.

INC-242 — CLOSED 2026-09-20.

## INC-243 — the options cache after a file commit

Defect: the version already bumped on commit (`get_attribute_options_version`); the browser cache was the seam. Fix: `max-age=60, stale-while-revalidate=300` with the version as ETag and a sixty-second client hold. Evidence: changelog 2026-09-21 U6-C1-R3b-3d. Class: cache keyed without its version.

INC-243 — CLOSED 2026-09-21.

## INC-244 — option `allowed` sets did not narrow sibling pickers

Defect: an option's `allowed` narrowing was read by the door but not by the form. Fix: allowed sets narrow and lock sibling pickers; one admissible answer is filled (PW-35). Evidence: changelog 2026-09-21. Class: F3 mirror.

INC-244 — CLOSED 2026-09-21.

## INC-245 — link defaults did not prefill

Defect: a link's `default_value` did not prefill on first render or after a reset (PW-22). Evidence: changelog 2026-09-21 U6-C1-R3b-3d. Class: default applied on one path only.

INC-245 — CLOSED 2026-09-21.

## INC-246 — surfaced categories missing from the wizard tree

Defect: a category surfaced under a second root did not appear in the wizard's tree (PW-36); completed by INC-263 so a surfaced category reaches both roots. Evidence: changelog 2026-09-21 and 2026-09-22. Class: the reader's tree vs. the pointer table.

INC-246 — CLOSED 2026-09-22.

## INC-247 — bounds across three-level folds

Defect: option bounds did not apply to inherited fields across three-level folds (PW-25). Evidence: changelog 2026-09-21 R-YEAR. Class: INC-242's rule, deeper.

INC-247 — CLOSED 2026-09-21.

## INC-248 — a category change left the fold pickers on screen

Defect: after a category change the fold pickers kept their old lists. Evidence: changelog 2026-09-21 R-YEAR. Class: derived state not cleared on its input's change.

INC-248 — CLOSED 2026-09-21.

## INC-249 — the option's own `bounds` object was not read

Defect: the form read a model's bound only from a bound nested inside `facts`; the published catalogue serves `"bounds": {"year": {"min": 2020}}` beside `facts`, so BYD Han and Toyota Corolla offered 1901. Evidence: changelog 2026-09-21 R-SW. Class: one shape read from two places.

INC-249 — CLOSED 2026-09-21.

INC-250 · INC-251 — VOID (no repo record).

INC-252 — RESERVED, not a defect: the curator delivery convention "scopes naming same-batch options ride a second links file (pass 2)" is cited by that number in the cycle-18 change notes; recorded so the number is never reused.

## INC-253 — Amharic catalog text did not render

Defect: Amharic help, labels and units did not render in the wizard, review and preview when present. Evidence: changelog 2026-09-21 R-HELP (PW-42). Class: one language rule declared in three places.

INC-253 — CLOSED 2026-09-21.

## INC-254 — option values could not lead with a digit

Evidence: changelog 2026-09-22 M-SHAPE. Class: a charset stricter than the catalog.

INC-254 — CLOSED 2026-09-22.

## INC-255 — the M-SHAPE planner guard's proofs anchored on a live definition

Defect: the earlier file's proofs read a live catalog definition and could not run where that row is absent; re-declared byte-identically with scratch-row proofs only. Evidence: changelog 2026-09-22 M-SHAPE corrective. Class: INC-222 second occurrence → the migration-proof law (scratch rows only; proofs assert behaviour, never planner choice).

INC-255 — CLOSED 2026-09-22.

INC-256 — VOID (no repo record).

## INC-257 — facts skipped siblings unhidden by the same selection

Evidence: changelog 2026-09-21 "INC-257: facts apply to siblings unhidden by the same selection (PW-43)". Class: visibility judged before the fact was applied.

INC-257 — CLOSED 2026-09-21.

INC-258 — VOID (no repo record).

## INC-259 — colour swatches with parent-prefixed stems and patterns rendered empty trays

Evidence: changelog 2026-09-21 (PW-44). Class: swatch resolution keyed on the bare value only.

INC-259 — CLOSED 2026-09-21.

## INC-260 — a dependent list picked its parent by first match

Defect: Vehicle Hire's "other" vehicle type owned the car-model list; the owner is now the list covering the most of the child's parent values (PW-44/PW-45; docs/features/posting.md § INC-260). Evidence: changelog 2026-09-21. Class: structural resolution by first match.

INC-260 — CLOSED 2026-09-21.

## INC-261 — re-parenting onto an existing secondary parent needs two steps (chat-side registration)

Defect (as registered): a categories row that moves a category under a parent already listed as its secondary parent is refused (duplicate pointer), so curators deliver two steps. Repo anchor to re-ground from: the commit's parent-move-before-secondary-removal in migration 20260917210006 (lines 844–870). Class: importer refusal on a legal single-step intent.

INC-261 — OPEN: re-registration from repo truth pending (the importer census turn).

## INC-262 — importer refusals worked around by curator deltas (chat-side registration)

Defect (as registered): (a) an import targeting a surfaced leaf is filter-scoped unless the category filter is cleared; (b) an inherited row cannot be unlinked at a leaf (unlink at the origin instead); (c) a card rank on a direct row collides with an inherited card at other-\* leaves. Class: importer semantics that should be refused by name or accepted.

INC-262 — OPEN: re-registration from repo truth pending.

## INC-263 — the category tree was pinned for the visit

Defect: the wizard's (and the rail's) tree never re-read during a visit; now version-keyed (`get_category_tree_version`, re-checked every 15 s with an ETag), so an import is visible inside the 60 s window and a surfaced category reaches both roots (PW-46). Evidence: changelog 2026-09-22 and its follow-up. Class: cache without a version.

INC-263 — CLOSED 2026-09-22.

## INC-264 — the importer's gate lacked the `swatch` key

Defect: a swatch-only definitions file was refused as an unknown field although the door allowed it. Evidence: changelog 2026-09-22; docs/features/imports.md. Class: INC-234 second occurrence → one allowlist (the door's ten keys), the gate judges shape only.

INC-264 — CLOSED 2026-09-22.

## INC-265 — the tree held its body, never its stamp; the options cell split on a bare pipe

Defect: (a) the public tree route did not ask the version on every request and the reader did not revalidate on mount; (b) the options cell split its records on any pipe, breaking D28's two-tone swatch and piped labels. Fix: one boundary reader on `}|{` in the gate (`splitOptionSegments`) and in SQL (`attr_split_option_cell`). Evidence: changelog 2026-09-22 (two lines). Class: one reader declared twice; cache without a version.

INC-265 — CLOSED 2026-09-22.

## INC-266 — (a) a proof asserting the wrong verdict word; (b) an overnight tab ate the first sign-in

Defect: (a) the INC-265 landing's own proof asserted `update` where the planner says `change`, so `20260922120000` could never apply — restated; (b) an expired prior session raced the new sign-in (DEC-076: evict the expired session before sending credentials; a grant that never commits is an honest failure with one `[ssr-error]` line). Evidence: changelog 2026-09-22 and 2026-09-23; spec-ledger DEC-076. Class: (a) a tool-written file cannot be edited — restate; (b) Tier A auth race.

INC-266 — CLOSED 2026-09-23.

## INC-267 — importer item (chat-side registration; specification lost with the thread)

INC-267 — OPEN: re-registration from repo truth pending (the importer census turn); the number stays reserved.

## INC-268 — the attributes planner re-resolved the same target once per option

Defect: `attr_allowed_check` resolved each target once per option; re-declared whole with a per-call memo. Two ledger repairs followed: the landing omitted its self-marking INSERT (marks-only corrective, allowlist entry), and parity now keys on the DECLARED mark, falling back to the filename stamp (INC-094). Evidence: changelog 2026-09-23 (three lines). Class: planner cost law; DEC-022 declared marks.

INC-268 — CLOSED 2026-09-23.

## INC-269 — the specifications step reordered the catalogue

Defect: D36's partition pulled required and conditional rows ahead of display-order-earlier optional ones. Rule: display order always; a dependent below its parent and never hidden. Evidence: changelog 2026-09-23. Class: presentation overriding the curated order.

INC-269 — CLOSED 2026-09-23 (D41 later removed the expander entirely).

## INC-270 — the full E2E matrix could not be collected outside Vite

Defect: `isE2E` crashed on an absent `import.meta.env` under Playwright's plain-Node loader. Evidence: changelog 2026-09-23. Class: environment assumption in shared code.

INC-270 — CLOSED 2026-09-23.

## INC-271 — the trailing cut ran before the form knew its shape

Defect: folds, facts/bounds/allowed targets and colour trays live in the option ROWS, which land a beat after first paint; the form now publishes `data-options="1"` once its option lists settle. Evidence: changelog 2026-09-23. Class: a decision taken before its inputs arrive.

INC-271 — CLOSED 2026-09-23.

## INC-272 — a 363-option definitions file timed out at Preview

Defect: `attr_split_option_cell` alone dominated the planner on prod (INC-268 follow-up). Evidence: changelog 2026-09-24. Class: planner cost law.

INC-272 — CLOSED 2026-09-24.

## INC-273 — finder rebuild triggers raised `catalog_find_terms_pkey` inside saves

Defect: the D37-1 rebuild triggers ran a concurrent delete+insert inside category/link saves across shards; rebuild decoupled from every write path (lazy under `pg_advisory_xact_lock`) and the base re-landed portably. Evidence: changelog 2026-09-24 (two lines); flake ledger 2026-09-24 09:29 (`f98455b`, the last occurrences before the landing at 11:01). Class: a write-path side effect racing itself.

INC-273 — CLOSED 2026-09-24.

## INC-274 — e2e audit rows grew without bound

Fix: `maintenance_prune_e2e_audit(cutoff, include_orphans, batch)` (service_role only, ≤ 50,000 rows a call) prunes e2e-namespaced and vanished-actor audit rows older than 24 h on staging; apply `22d92338` → mark `20260925010000`. Evidence: changelog 2026-09-25; docs/features/e2e-harness.md. Class: harness hygiene (DEC-062 family).

INC-274 — CLOSED 2026-09-25.

## INC-275 — the categories planner rebuilt the export per row

Defect: `cat_import_plan` called `cat_export_row()` per row (a full export each call); re-declared WHOLE with one tree read per plan; CT-18's timeout. Evidence: changelog 2026-09-24 (apply `ee768e16` → mark `20260924230000`). Class: planner cost law.

INC-275 — CLOSED 2026-09-24.

## INC-276 — hour-old `e2e-` scratch categories were never reaped

Fix: global-setup reaps every hour-old `e2e-` category with its listings, pointers, legacy attributes and translations (staging swept 553 → 0). Evidence: changelog 2026-09-25; e2e-harness.md. Class: DEC-031 reaper scope.

INC-276 — CLOSED 2026-09-25.

## INC-277 — Back froze while "Find a category" held a term

Defect: Back was closed at the roots and moved an unseen cursor inside a folder while the filter held a term. Fix: the wizard owns the filter term; Back clears it first, then climbs, then leaves the step (PW-53). Evidence: changelog 2026-09-24; docs/features/posting.md § INC-277. Class: two owners for one piece of state.

INC-277 — CLOSED 2026-09-24.

## INC-278 — no reaper removed photo storage objects

Defect: a reaped scratch listing (and a reaped e2e user, whose listing rows cascade away) left its `listing-photos` objects behind for ever. Fix: DEC-077 parts 1–2 (setup reaper purges reaped listings' prefixes; storage-side backlog enumeration; per-run delete proof). Evidence: changelog 2026-09-25 (two lines); the two staging setup runs pasted in the report (3 orphan objects removed, then 0). Class: cleanup that never ran against the store it names.

INC-278 — CLOSED 2026-09-25 by DEC-077.

## INC-279 — a curator file overwrote a shared definition it thought it was creating

Defect: the cycle-18 batch-1 Home & Garden definitions file created `delivery_available` as a new key while a Travel definition of that key existed; the import overwrote it (preview 3 added / 10 changed vs the stated 4 / 9). Fix: the batch-1 follow-up file restated the row at final content. Class rule: every new key AND every restated shared row is checked against the UNFILTERED definitions export attached with the batch; unchanged shared rows are omitted from partial files. Second occurrence 2026-09-25 (the Babies file 1 echo rows for `size` and `furniture_material` copied from a pre-follow-up export — dropped by the supervisor before import, no damage). Evidence: the batch-1 import previews and the follow-up previews (all matched). Class: curator baseline staleness.

INC-279 — CLOSED 2026-09-25 (data; no code; class rule in force).

## INC-280 — LY-6: the currency list opened past the 360 viewport

Defect: the list opened downward past the viewport when its input sat just above the sticky action bar, so LY-6 hit-tested outside the screen (8 flake-ledger lines 09-19 → 09-25 before the fix; the supervisor missed the DEC-030 threshold on 09-21 — slip S41). Fix: the list chooses its side on open and resize (`data-placement`); LY-6 probes in one frame with a bottom-edge flip scenario. Evidence: changelog 2026-09-25. Class: a floating control unaware of the viewport edge.

INC-280 — CLOSED 2026-09-25 (no ledger line after commit 55428544).

## INC-281 — PW-37 tapped the map before Leaflet's handler attached

Fix: the map box carries `data-ready` and every tap waits on `mapReady`. Evidence: changelog 2026-09-25. Class: a test acting before the component's readiness.

INC-281 — CLOSED 2026-09-25 (no ledger line after commit 11f94620).

## INC-282 — the feed-gutters test threw a TypeError on a null box

Defect: three `(await …boundingBox())!` reads threw `Cannot read properties of null (reading 'x')` when an element detached after `feed-empty` was visible (6 matrix-lane flake lines 09-19 → 09-25). Fix: `boxOf` waits for visibility and throws `INC-282: <testid> had no box (detached or hidden)`. Cause (executor hypothesis, read from code, not reproduced): `feed.tsx:14–17` builds the feed query from `selectedCategoryId`, null until `useCategories()` resolves (`app-shell.tsx:377–379`), so the empty state can render for the no-category query and be swapped for the spinner when the tree loads or revalidates (INC-263/265). Class: measurement before the element settles; product-side re-mount.

INC-282 — CLOSED 2026-09-25 (test); WATCH (product): a named INC-282 refusal in the ledger reopens it as a feed fix.

## INC-283 — the shell cascade smoke test picked menu items by position

Defect: `options.nth(1)` was a sibling job's scratch market whenever one was open — `seedCountry` writes `display_order: 0` (ET and US are 0 too) and the country menu re-sorts on displayOrder then `nameEn.localeCompare`, so "E2E-Scratch-…" sorts before "Ethiopia"; the scratch market could vanish mid-test (11 smoke-lane flake lines 09-19 → 09-25). Fix: every pick by identity — ET by its served name, the first curated (`non-e2e-`) served region, that region's first curated city (`readServedNodes`); on staging the picks resolve to region `addis-ababa`, city `addis-ababa`. Evidence: changelog 2026-09-25; the executor's E1 census. Class: G28 — a page-position assertion on a shared roster.

INC-283 — CLOSED 2026-09-25.

## INC-284 — CO-6 swapped whatever root sat first

Defect: `useRootCategories` lists every active top-level category with no `e2e-` filter, so the first rail row was usually a sibling test's scratch root (display_order 0); when it was deleted before the save the door refused `notARoot` and the 20 s poll timed out, and when deleted after, its stored row cascaded away and the absolute position checks failed (6 matrix-lane lines, twice on 2026-09-25's last two runs). Fix: the first adjacent pair of REFERENCE roots (rows are read, never edited — the order rows belong to the scratch country), relative positions instead of absolute, one named retry after `notARoot`, a second refusal fails by name. Evidence: changelog 2026-09-25; the executor's E2 census. Class: G28; a test writing a payload that names rows it does not own.

INC-284 — CLOSED 2026-09-25 (the retry path is written and self-consistent but not yet exercised live — WATCH for its console line).

## INC-285 — guess-fixture probe points collided across jobs

Defect: `guessPoint(project, worker)` gave the SAME point to every job running shell.spec.ts at once (smoke, six shards, the changed lane), so two jobs seeded scratch cities at one point and either could be nearest (6 lines 09-19 → 09-24 for LS-6). Fix: one point per job × project × worker on a 10 × 8 grid (origin 5.5°N 49.0°E, step 1.1° — 122.3 km in latitude, 121.8 km in longitude at 5.5°N, twice the 60 km metro window) with a `beforeAll` DB proof that no curated Ethiopian settlement sits within 60 km of any grid point (the earlier "read from the DB" guarantee had been a comment only). Caveat: every local run maps to slot 9, so two LOCAL suites at once still collide — the executor's local LS-6 red of 2026-09-25 (a stray server from a restarted run); CI overlaps are prevented by the workflow's `cancel-in-progress` concurrency group, and the nightly (slot 9) never runs beside a local suite of the executor's. Rule (Knowledge J-law proposal): one local E2E suite at a time. Evidence: changelog 2026-09-25. Class: fixture isolation keyed below the concurrency level.

INC-285 — CLOSED 2026-09-25 (CI); local caveat recorded.

## INC-286 — TR-34 deep-equality flaked after R-TR34

Defect: 4 flake-ledger lines (09-19, 09-21, 09-22 ×2; shards 2 and 5) after R-TR34 (2026-09-19 12:12) made whole-export comparisons strip same-run scratch rows. Evidence: the ledger lines only (no body existed before DEC-078). Class: INC-214 family (whole-roster comparison against concurrent residue).

INC-286 — OPEN: evidence pending the first DEC-078 body; no fix without it (G21).

## INC-287 — TR-24 toBeVisible flaked 4× on 2026-09-24

Defect: four lines across three commits (`a1fe1f1`, `4bf9f78`, `db13e9a`) on shards 2 and 5. Evidence: the ledger lines only. Class: unknown until a body arrives.

INC-287 — OPEN: evidence pending the first DEC-078 body.

## INC-288 — a definition's own bound spoke a different vocabulary than the door (2026-09-25)

Defect: the wizard clamped a stated year ceiling to next year and did not resolve relative bounds (`year`, `year±N`) as `attr_bound_value` does. Evidence: PW-25/PW-35 walk. Fix: the wizard resolves bounds as the door does (landed 09-25 with D44/D45). Class: client mirrors of door vocabulary are pinned by tests to the SQL.

## INC-289 — TR-29 counted the harness's own scratch keys (2026-09-26)

Defect: TR-29 did not exclude `SCRATCH_PREFIX` (`e2e.scratch.`), the namespace scratchKey uses. Evidence: TR-29 red. Fix: exclusion added (09-26). Class: fixtures exclude their own namespace.

## INC-290 — a blank `visible_when` cell cannot clear a condition (2026-09-26)

Defect/law: the links import treats an empty condition cell as "no change" (INC-290 reading of the planner), so clearing a condition is a console act (Show when → Always visible). Evidence: Cycle 18 attempt; console "Always visible" confirmed. Fix: none needed — rule recorded in the curator's Knowledge and the import checklists. Class: present-and-empty semantics differ per column (scope/default clear; condition does not).

## INC-291 — every top fold owner was a form-reset root (2026-09-26)

Defect: the D25b rule made a size-system or a non-card-1 make change wipe the whole specifications form. Evidence: operator walk (clothing, Vehicle Hire). Fix: D47 — only the card-1 identity restarts the form (turn 3, 8d620dfc; PW-60). Class: root sets are named explicitly, never derived from structure.

## INC-292 — a lock aimed outside the target's link scope leaves a dead form (2026-09-26)

Defect: Beverages › Brewing had `allowed.unit_of_sale-food = [per_kg]` while the leaf's unit scope excluded per_kg — the unit list rendered empty and the card could not be answered. Evidence: operator walk; the audit's reachability sweep found 5 such hits in the pending files. Fix: console tick (per_kg into the Beverages scope) and the curator's files corrected before import. Class rule: every facts/allowed value lies inside the target's link scope at every leaf where the option is reachable; the audit sweeps it before every import; dormant locks (target not linked at the leaf) are DEC-057b by design and are not this class.

## INC-293 — two posting homes for vehicle services (2026-09-26 → 27)

Defect: Vehicles › Auto Services (retired earlier, reactivated 09-26 when the audit search showed nothing) and Services › Vehicle Services served the same trade with different option lists. Evidence: operator walk 09-27 ("Towing" in two places). Fix: Cycle 21 — merged list on service_type-vehicle-services; Auto Services retired; browse path Vehicles → Vehicle Services (INC-246 shows it in the posting picker). Class: one posting home per trade; discoverability through browse paths, never through a second leaf. Orphan: service_type-auto-services (delete pass later).

## INC-294 — the help splitter ended a sentence at "e.g." (2026-09-27)

Defect: `firstSentence` broke on any ". " so "… e.g. 89." showed "e.g." behind the (i). Evidence: operator walk (every help with e.g.). Fix: Turn A — abbreviations e.g./i.e./etc./vs./approx./cf. do not end a sentence; unit tests. Class: copy splitters carry an abbreviation list.

## INC-295 — the catalogue finder rebuilt inside an anon request and timed out (2026-09-27)

Defect: `catalog_find` runs `catalog_find_refresh(false)` lazily inside the read; after a catalogue change the rebuild takes 3–4 s against the anon 3 s statement timeout, so the index stayed stale until a manual `catalog_find_rebuild()` (26,377 rows). Evidence: finder results ≠ live after Cycle 19; manual rebuild timing. Fix: queued (Turn C) — rebuild off the request path (service-role schedule or post-import hook), the in-request attempt removed, last failure recorded. Class: index maintenance never rides an anon read.

## INC-296 — attributes created by import showed English names to Amharic sellers (2026-09-27)

Defect: nine attributes created since 09-26 (aggregate_type, battery_ah, decoder_service, electronics_type-other, megapixels, tile_grade, tv_type, wifi_standard, display_tech) had empty Amharic names in the export and in the wizard. Cause: IE-4b by design — an imported label_am is a pending (`edited`) translation; `get_entity_bundle` and the export serve approved rows only, falling back to a column the create path never sets. The import checklists never carried the approval step (S51). Evidence: export 2026-09-27 01:25 (eight empties), export 02:55 (none after approval). Fix: all nine approved in Translations › Data; class rule: every import that creates an attribute ends with that approval; the audit checks the re-export for empty label_am. Product option left open: auto-approve labels imported by an admin holding translations:approve (operator default: keep the gate).

## INC-297 — "Price per Per Kg" (2026-09-27)

Defect: the wizard passed the basis option's label verbatim into templates that already carry "per"/"በ"; every unit/basis label starts with "Per …"/"በ…". Evidence: operator walk (Coffee & Tea, Education, Hotels). Fix: Turn A — basisNoun strips the label's own preposition once, in wizard.tsx; shape-only bases render the plain price line. Class: a label that is already a phrase is never wrapped in another.

## INC-298 — hosting-tier resource limit stalled every server route (2026-09-27)

Defect: Cloudflare Error 1102 on the app's Worker for ≈ 13 minutes (07:30–07:43 UTC; Ray a418db14897dca32 at 07:42:02); the wizard reported "Not saved yet" and retried (correct); the operator's walk stopped. Evidence: the error page; DB activity/locks/logs clean; API log incomplete for the window (S52); executor census of module-scope caches (bounded or small). Root cause: not determinable without the platform's Worker logs (Lovable support, Ray ID given). Fix: none on our side beyond hygiene queued for Turn B (bound the options cache; prune idle rate-limit buckets); standing post-publish health check. Class: hosting-tier; watch for recurrence.

## INC-299 — the assist route read `rate_limits` with the user's client (2026-09-27)

Defect: `src/routes/api/listings/assist.ts:271–277` selects from `rate_limits` (service-role only, policy rate_limits_no_client) after `consumeRate`; the 403 is discarded and `triesLeft` silently becomes null (F4 phantom); every assist call logs `permission denied for table rate_limits`. Evidence: Postgres log 07:46:52 + the 403 in the API log. Fix: queued Turn B — take the count from consumeRate's answer or a definer read. Class: no client-role read of a service-only table.

## INC-300 — client `profiles` reads fire while the session is gone (2026-09-27, low)

Defect: `profiles` is granted to authenticated only; client reads (`use-auth.ts:44–48`, `pricing-data.ts:100`, others) can run in the logout/login moment and log `permission denied for table profiles`. Evidence: three Postgres log lines 07:43–07:44 during the operator's re-login. Fix: queued Turn B — guard on a live session. Class: noise, not a leak.

## INC-301 — a commission of 0 or 150 was refused without words (2026-09-27)

Defect: the only commission checks were the door's `required` and the DB constraint `listings_price_bp_check`, whose raw message reached the client as field `door`; the seller saw a red field and no reason. Evidence: operator walk (Realtor). Fix: Turn A — local range check (commissionRange), field-aware `commissionRequired`, the route maps the constraint to `price_bp/commissionRange`; PW-58. Class: every refusal a seller can trigger has words and a field.

## INC-302 — red run 36312273832: PR-10 asserted the contract Turn A changed (2026-09-27)

Defect: step 3c of Turn A remapped the constraint refusal that PR-10 asserted as field `door`; the prompt's scope and local-suite list omitted posting-routes.spec.ts (S53), so the executor's local run could not catch it and the red reached CI (2 gating failures, both projects). Evidence: e2e-last-failure for 422550b8. Fix: the executor's follow-up 2dda3ab8 ("Fixed PR-10 test expectations"); green run 36313684517. Class: a prompt that changes a route contract lists every spec that asserts it, in scope and in the local suite list.

## INC-303 — the categories import's ordering pass flipped four homes (2026-09-27)

Defect: `admin_commit_category_import`'s per-parent ordering pass (20260917210006:897–900) looked a pointer's file rank up by CHILD ID ONLY, so a row's guest pointer under another parent inherited the row's home rank and was renumbered among that parent's own children; with the home defined as "the lowest-numbered pointer anywhere" (cat_primary_pointer, 20260907194932:80–90), four leaves flipped on the Cycle 22 import: bicycles → sports-leisure, personal-care-services → beauty-personal-care, industrial-equipment → construction, nursery-furniture → home-garden; 40 own rows carried interleaved numbers. Evidence: post-import categories export (2026-09-27) vs the pre-import export; the Industrial & Manufacturing posting form inherited Construction's required unit-of-sale for the interim (0 listings affected). Fix: DEC-080 (C1) — `is_primary` flag, one per child; the ordering pass ranks by (child, parent), own children first; the four homes repaired by slug; the file re-imported to restore contiguous numbers. Class rule: a ranking or matching clause is keyed on the full identity of the row it ranks; the home has one reader.

## INC-304 — undo could not reverse a flipped batch (2026-09-27)

Defect: `admin_undo_category_import` (20260917210006:1047–1048) moved the current primary pointer back to the prior parent with a plain UPDATE (`admin_move_category_pointer`, 20260903064413:135); the prior parent already held a pointer to the same child, so UNIQUE (parent_id, child_id) (20260804152522:39) would have aborted the whole undo (no handler). Evidence: code reading against the post-import state; the button was not pressed. Fix: DEC-080 (C1) — the move door MERGES onto an existing pointer (flag travels, moved row deleted, audit `merged`). Class rule: a door never assumes the absence of a duplicate it can check.

## INC-305 — the public tree sorted by a column no door writes, and the version was blind to pointer order (2026-09-27)

Defect: `rootsOf` and `compareEdges` (category-tree.ts:136–143, 265–274) sorted roots and own children by `categories.display_order` — the ROW column, written only at creation — while every reorder door writes the POINTER's `display_order` (C2h census, 20260903073853); INC-263's route re-introduced the row column on the public path. `get_category_tree_version` (20260922050704:18–33) hashed counts and created_at only, so a reorder or a home change never moved the ETag. Evidence: the operator's rail did not change after the Cycle 22 import although the export did. Fix: DEC-080 (C1) — the route serves `is_primary`; the client sorts by pointer order (roots by the parent-NULL pointer) with the flagged pointer as home; the version covers every pointer's parent, order and flag. Tests C-5, PW-62, unit (i)–(iv). Class rule: readers of an order read the column the doors write.

## INC-306 — the links export resolved a category's home by a different tiebreak (2026-09-27)

Defect: `attr_export_payload`'s path walk (20260920151236:399–414) and `attr_link_path` (20260907202049:11–31) picked a parent by `ORDER BY t.display_order, t.parent_id` (tiebreak by parent uuid, no activity filter, no flag); `attr_link_origin` (:34–56) walked every pointer. On a display_order tie the links export named the guest while the categories export named the home (farm-equipment: agriculture 8 vs its commercial-equipment guest at 8; generators-power: commercial-equipment 10 vs its construction guest at 10). Evidence: the curator's six-leaf read of the two exports (2026-09-27). Fix: C1-b — all three re-declared whole through `cat_primary_parent`; proofs P7/P8; AT-64. Class rule: the home has exactly one reader; an inline copy of its rule is a defect (three found: admin_list_categories' edge CTE, the export path walk, the two helpers).

## INC-307 — undo of a category delete does not restore its attribute links (2026-09-28, low)

Defect: `category_attribute_links.category_id` cascades on delete (20260906035541:39); the import's delete revision captures the category row (`cat_export_row`) but not its links, so `admin_undo_category_import` recreates the row without them. Evidence: code reading before the Cycle 24 delete of the retired auto-services leaf (three shared links, all linked elsewhere). Disposition: accepted for a retired, listing-free leaf; fix when the undo is next touched (capture the links in `prev`, restore through `admin_link_attribute`). Class rule: an undo restores every dependent row the delete removed, or says which it cannot.

Numbering: next free INC-308. Watch list (no INC): AT-3 (2 flaky lines in 7 days: 09-25, 09-27), LT-13 (09-28), PW-41, LS-7, CI-4 (09-28), PW-61's ten-second race; LS-11 (INC-218; new teardown body "destroying QQ failed at country row" on 09-27), TR-24, i18n-coverage mobile drawer "category labels still in English" (1 flaky line 09-27 — the entity bundle timing; watch), the nightly's quarantine (INC-117).

(Appended 2026-10-05 by the records turn of bundle 4; INC-308 to INC-437, compiled from the supervisor thread 2026-09-27 → 2026-10-05. Heading dates are the operator's local day, America/New_York, except INC-407 to INC-413 and INC-433, which carry the UTC day of the notes that registered them; statuses are as of 2026-10-05 06:30Z unless the entry names an earlier date, which is then the last word on it.)

## INC-308 — bulk "Generate image" answered HTTP 500 with no JSON body (2026-09-28)

Defect: every category in a bulk "Generate image" run in the admin Categories console failed with `<slug>: stage: HTTP 500` (the operator listed 25 slugs, from commercial-equipment to realtor-services). The request died in the hosting layer before the route's own JSON error handling could answer: the Worker decoded and re-encoded PNGs in plain JavaScript (pngjs and jpeg-js, 130–180 ms of CPU per image). Evidence: the operator's browser capture — status 500, `content-type: text/html`, `server: cloudflare`, `cf-ray a41f95ed9c9dc57b-IAD`, 2026-09-28 03:15:47 UTC, body the hosting platform's page titled "This page didn't load"; the executor's read-only investigation (the route's own refusals are JSON; the last successful generation was 2026-09-19 14:01 UTC; the image code had not changed since 2026-09-17; the executor cannot sign in as an admin on the published app, so it did not capture the failing call itself). Fix: DEC-082 — the route only calls the provider and returns the image, and the admin's browser cuts the three variants and uploads them under the admin's session. Class rule: no image processing and no image library on the Worker; it does I/O only. Status (2026-10-04): FIXED (`0bf75959`; first green board carrying it `9690a9d3`, run 36388786851; operator acceptance walk 2026-09-28 "11 generated · 0 failed").

## INC-309 — a draft carrying the retired price mode `negotiable` could not be saved at any step (2026-09-28)

Defect: after D62-1 the constraint `listings_price_mode_check` allowed only fixed, free, contact and commission, but `submit_listing` writes the price mode at every step while `validate_listing_draft` turned `negotiable` into fixed only inside its step-5 block. A draft created by the pre-D62-2 client therefore threw on every save at steps 1–4, and the draft route surfaced the raw exception as field `door` with no words ("That could not be saved … door"). Second occurrence of INC-301's class. Evidence: the operator's walk of 2026-09-28 (a filled draft that could not proceed even from the category step); the executor's census (the mode set straight from the input at line 440 of `20260928034942`, written at lines 777 and 792). Fix: D62-1b — `negotiable` is an alias at every step, forever (stored as `fixed` with `price_negotiable` true); an unmapped door exception becomes `{field: "door", reason: "doorError", detail}` and reads `post.refusal.doorError` ("We couldn't save this step. Please try again; if it keeps happening, tell us."); `listings_price_mode_check` maps to `{field: "price_mode", reason: "badValue"}`; tests PR-12, PW-66; proofs P8–P10. Class rule: every door exception reaching a route is mapped to a named reason or a worded generic; a new constraint ships with its route mapping. Status (2026-10-04): FIXED (`394162bb`; migration `702a2975` → mark `20260928060000` on prod and staging; closed with the green board at `9690a9d3`, run 36388786851).

## INC-310 — the image prompt's parent was still picked by lowest display order (2026-09-28)

Defect: `src/routes/api/admin/categories/generate-image.ts:77–85` chose the prompt-context parent by lowest `display_order`, a DEC-080 leftover; since DEC-080 the home of a category is its `is_primary` pointer. Evidence: the supervisor's verification read of the DEC-082 landing. Fix: W1 Part C — the query orders by `is_primary` descending, then `display_order`, limit 1. Status (2026-10-04): FIXED (`8e0c2ecf`, run 36398155321 attempt 3).

## INC-311 — PW-66 red: a test-level route handler bypassed the edge-header handler (2026-09-28)

Defect: `seller()` registers `asEdge` on `**/api/listings/**`, which adds `cf-ipcountry: ET`. PW-66 registered a later handler on `**/api/listings/draft` and called `route.continue(...)`. Playwright runs matching handlers last-registered-first and `continue()` goes straight to the network, so `asEdge` never ran: no country header, `residency_country_for` recorded nothing, `submit_listing` answered `residencyUnknown` and the save state ended `idle`. Evidence: run 36383469726 on `394162bb` (4 gating failures, all PW-66 — one test on two projects, in its shards and in the fast lane; PR-12 green proved the door); the spec read. Fix: D62-1c — both `route.continue` calls became `route.fallback` (Playwright 1.58.1 keeps the `postData` override through the fallback), with a comment naming the rule. Class rule: a test-level handler on a path `asEdge` covers must fall back, never continue. Status (2026-10-04): FIXED (`9690a9d3`, run 36388786851).

## INC-312 — a commission draft without its percentage violated the price-pair constraint on every autosave (2026-09-28)

Defect: choosing the `commission` basis on the price step sets `priceMode "commission"` with `priceBp` null; the autosave goes out at the last completed step (4); below step 5 the door returns mode commission with a null percentage, and the UPDATE tripped `listings_price_pair_check`, whose commission disjunct required `price_bp IS NOT NULL`. The autosave swallowed the exception, so the seller saw nothing, the draft's mode was not stored until the percentage was typed, and every run logged a false `[ssr-error]`. Evidence: eight `[ssr-error] … listings_price_pair_check` lines in run 36383469726 (shard 2 ×2, shard 5 ×2, fast lane ×4) during tests that passed; the executor's attribution to PW-55 and PW-58 (both commission), which overturned the supervisor's first hypothesis (an amount saved with a null currency below step 5). Fix: D62-1d — the constraint becomes `CHECK ((price_mode = 'commission' AND price_amount IS NULL AND price_currency IS NULL) OR (price_mode <> 'commission' AND price_bp IS NULL AND ((price_amount IS NULL) = (price_currency IS NULL))))`; the step-5 door still refuses `{price_bp, required}`, so no commission listing publishes without a percentage; tests PW-67, PR-13; proofs P11, P12a, P12b, P13. Status (2026-10-04): FIXED (`1f7e0869`; migration `07bf3052` → mark `20260928090000` on prod and staging; run 36391560866 attempt 2).

## INC-313 — the refusal summary printed raw field names for refusals that have no control (2026-09-28)

Defect: `RefusalSummary` (`src/features/posting/field.tsx:215`) fell back to the raw field name when it had no label for a refused field, so the seller read "door", "residency" or "id". Evidence: the operator's walk ("Complete these to continue … door"); the executor's census of control-less field values (`door` from draft.ts:148, identity.ts:138/161, photos.$id.ts:101/128, publish.ts:52 and upload/photo.ts:253; `id` from photos.$id.ts:81/119; `residency` from the doors' own answers). Fix: D62-1c — `CONTROL_LESS_FIELDS = {door, residency, id}` and the pure helper `summaryRefusals()`; the summary leaves those out (their words already render as refusal paragraphs); unit test `field.test.ts` (2 cases). Status (2026-10-04): FIXED (`9690a9d3`, run 36388786851). Residual, not followed up in any later record: the executor reported other raw names the summary could still show (`status`, `cover`, `renew`, `first_name`, `last_name`, `name`, `label`), probably coming from other screens, unconfirmed.

## INC-314 — the categories importer drops `secondary_parents` on a create row (2026-09-28)

Defect: the create loop of `admin_commit_category_import` (migration `20260928002133`, lines 502–566) never reads `secondary_parents`; only the update branch does (lines 685–700). A new leaf imported with guests (second parents) lands without them. Evidence: the curator's audit after Cycle 25 (the five new leaves had empty `secondary_parents` in the export while the existing `books-media` row took its cell); the supervisor's read of the function. Workaround in force: a two-pass delivery — the create in one file, the guests in a follow-up file of the same rows (Cycle 26 did this). Fix: queued as a Tier B importer fix with a create-with-guests test, in an "importer sweep" with INC-307 and INC-327; that turn was never issued. Status (2026-10-05): OPEN — re-confirmed at dev `48d3c53b`: the latest declaration of `admin_commit_category_import` is still the one in `20260928002133` (`secondary_parents` is read only in the update branch, lines 685–699, and in the undo path, line 884; the create loop reads it nowhere); the two-pass workaround stands (last mentioned 2026-09-30); no later source (spec-ledger blocks S46–S53) names INC-314.

## INC-315 — the wizard stuck at photos after a refused Next on details (2026-09-28)

Defect: Next on step 4 with an empty title set the pending claim to 4 and the refusal branch cleared only the strict flag. Back then Next on photos ran `saveAt(2)`, which sends `max(pending, 2)` = 4, so the door re-judged step 4 from the photos page every time; the seller could advance only through the summary's "Fix Title and description: Title" button. Evidence: the operator's acceptance walk of 2026-09-28; `use-draft.ts` (the refusal branch at lines 349–354, `saveAt` at lines 438–447). Fix: W1 Part A — a refused strict save also drops the pinned claim (`pendingStepRef.current = null`); test PW-68. Status (2026-10-04): FIXED (`8e0c2ecf`, run 36398155321 attempt 3; operator walk 2026-09-28 "yes it works").

## INC-316 — 22 categories carried icon names outside the client allowlist and drew no icon (2026-09-28)

Defect: the small category glyph is drawn only when the category's `icon` name is on the client allowlist `CATEGORY_ICON_NAMES` (117 names); `categoryGlyphOrNull` (`category-glyphs.ts:283–296`) draws nothing for any other name. 22 of the 167 categories carried 21 Lucide names off the list: Armchair, Brush, Church, CircleDot, Cookie, CupSoda, Flame, Gauge, Grid3x3, Leaf, Milk, PaintBucket, Plug, Power, Puzzle, ShieldCheck, Snowflake, SprayCan, Sun, Warehouse, Wifi (all present in lucide-react 0.575.0). The glyph is not the generated category art. Evidence: the operator's walk (subcategories without the small icon after a successful image batch). Fix: W1 Part B — the 21 names join the allowlist and the glyph map (136 names; a missing glyph is a type error); the categories import gains a case-sensitive column type `icon` that refuses an unlisted name as `unknownIcon` (a blank cell passes), with reason words in English and Amharic and three gate tests, so a name off the list can never land silently. A new category takes its icon from the list in the file, or is left blank and given one in the console (the picker or "Suggest icon"). Status (2026-10-04): FIXED (`8e0c2ecf`, run 36398155321 attempt 3; operator walk 2026-09-28 "correct all shows").

## INC-317 — a late writer queued a step no longer on screen (the PW-61 flake's root cause) (2026-09-28)

Defect: registered when PW-61 flaked for the third time in 24 hours (four by the time of the investigation: runs 36383469726 fast lane ×2, 36391560866 shard 2 (`1f7e0869`) and 36398155321 fast lane — the investigation prompt of 2026-09-28 wrote the shard-2 run as 36388786851; the flake ledger on `ci-evidence` records the shard-2 PW-61 flake at run 36391560866 and holds no PW-61 line for run 36388786851 (whose lines are PW-17 shard 2 and AT-2 shard 4)), each time with `post-step-2` not visible within 20 000 ms after the D59 category-change reset. The executor found the cause in the app, not the test: during fast Back taps the price step is on screen for about 60 ms; its currency preselect (`step-pricing.tsx:205–228`, deliberately never cancelled) finishes after the reset and calls `onChange` from the render where the step was 5; `change()` (`use-draft.ts:425–426`) computed the backup step from that stale step (4); the next Next's `saveAt` raised its claim to 4, the door refused `title required` for a field not on screen, and Next seemed to do nothing. A real seller tapping Back quickly past the price step could hit it. Evidence: reproduced only at 8 workers on mobile-360 (7 of 24); request traces. Fix (third take): `stepRef` in `use-draft.ts` — the queue reads the step on screen (set in `goTo` and on reopening a draft). The late prefill write is kept, because it mirrors the door's own step-5 currency fill (INC-321). Deterministic test PW-72 on the reset path with a gated profile read; a pre-committed baseline judge passed. Class rule: a write that lands after its step has closed is queued at the step on screen, so it can never claim a later step. Status (2026-10-04): FIXED (`de56b6c8`, run 36418421258; operator walk 2026-09-28 passed).

## INC-318 — staging outage: every E2E group died in global setup with HTTP 522 (2026-09-28)

Defect: ethio-staging stopped answering (Cloudflare 522 after about 19.5 s on its health check; the dashboard read Unhealthy for database, Postgres, auth and storage), so W1's run 36398155321 went red with every E2E group at 0 passed, 0 failed, 0 skipped, while build, typecheck, lint, guards and unit tests passed. Evidence: the executor's three health-check attempts; the operator's dashboard read. The executor's note that staging still needed migration `07bf3052` was stale: staging already carried mark `20260928090000` (the D62-1d preflight was green at 07:50 UTC). Fix: none in code. The operator's "Fast database reboot" did not clear it; the full "Restart project" did, and the re-run of the failed jobs went green (attempt 3). Root cause not determined: the Postgres log excerpt held only test-made errors and nothing about memory, connections or disk. Class rule: a 522 in global setup is never a code finding — restore staging, re-run. Status (2026-10-04): CLOSED, no change — platform origin; watch item: if Unhealthy returns, read Reports → Database first and decide the staging compute add-on or a lower E2E concurrency (the DEC-024 knob) on that evidence.

## INC-319 — `column profiles.id does not exist` twice in the staging Postgres log (2026-09-28)

Defect: the staging Postgres log attached by the operator showed `42703 column profiles.id does not exist` twice at one moment (00:38). Evidence: the executor's census — no source in the project names `profiles.id`: all 13 profile lookups in the app code and tests filter on `user_id`; every database function in the migrations, the scripts and the CI workflows were checked; there are no edge functions. Fix: none. Status (2026-10-04): CLOSED, no change — no source in the project; the likeliest issuer is the dashboard's Table Editor or a query run by hand.

## INC-320 — an answered big list showed "Choose" after Back (2026-09-28)

Defect: single-select lists above `EAGER_OPTION_LIMIT` stay lazy (DEC-053; read on focus or pointer-down), so on re-entry a select such as a car's model mounted with a stored answer and no matching option, and the browser showed the placeholder while the draft, the summary and the writing helper still held the value. A display bug; the data was intact. Evidence: the operator's walk of 2026-09-28 (make kept, model reads "Choose", Next still passes). Fix: W2 Part A — a lazy list is read up front when its control mounts with a stored answer, once per key per mount (DEC-053 amended: an answered list is read up front so its answer can be shown); test PW-69 (a 210-model scratch list). Status (2026-10-04): FIXED (`611e1094`, run 36502363580). The fix exposed INC-329 on every Back (S67).

## INC-321 — the door filled the step-5 currency but its answer never said so (2026-09-28)

Defect: at step 5 `validate_listing_draft` fills a missing currency from the seller's home (`20260928054510:175–176`) and stores it, but `submit_listing` answered only `{ok, listing_id, draft_step}` (`20260928034942:834`), so the wizard's own copy stayed null until the asynchronous prefill happened to land. A D59 Undo fired before that prefill restored an amount with no currency, and the step-1 save was refused by `listings_price_pair_check` — the "Undo did not restore the title" failures. Evidence: the executor's logged saves during the first INC-317 fix attempt (dropping the late prefill write made PW-61 "Undo within ten seconds" fail 19 of 24). Fix: `submit_listing` re-declared whole, its answer gaining `'price_currency', v_row.price_currency`; the wizard mirrors it when its own copy is empty, with no version bump, no pending step, no save-state change and no flush; tests PW-73, PR-14; proofs P14–P16. The migration `20260928135721_6b0f6ae1` declared mark `20260928100000`, earlier than its own file stamp (S66), so a corrective `20260928140742_5d74b795` records the ledger row `20260928135721` and mark `20260928150000`, and `6b0f6ae1` is listed in `scripts/migration-mark-allowlist.txt`. Class rule: a mirror of what the door stored is never a new answer. Status (2026-10-04): FIXED (commits `6d23c205` and `53398099`, verified on `694689f6`; board green at `4e2a9aad`, run 36494534782). The inline INC-321 comment in `submit_listing` was lost when a later migration (M1, `b9aa66a4`) re-declared the function; bundle 4's M5 (`20261004144146_923dd4cb`, mark `20261004090000`, on ethio-prod and ethio-staging) re-declared it with the comment restored (line 1136: "-- INC-321 — the answer names the currency the door stored").

## INC-322 — PW-61 "Undo within ten seconds" fails most runs at 8 sandbox workers (2026-09-28)

Defect: in the executor's sandbox at 8 workers PW-61 "Undo within ten seconds" failed about 21 of 24 runs both before and after the INC-317 fix (passes out of 12 on the baseline `e7eb28bd` against the fixed tree: mobile-360 1 → 0, desktop-1280 2 → 3; "after ten seconds" 10 → 12 and 12 → 12), mostly click timeouts and missing elements. Evidence: the pre-committed baseline judge run for INC-317. Ruling: infrastructure timeouts under sandbox contention, not a product defect; the "Undo did not restore the title" subset was INC-321. Fix: none issued. Status (2026-10-04): OPEN — recorded, no fix scheduled; PW-61 was registered again on 2026-09-29 as INC-333 for flaking in CI.

## INC-323 — "listing not found" server lines that no test provokes on purpose (2026-09-28)

Defect: the first server-error census (DEC-083) listed `[ssr-error] /api/listings/draft listing not found` far more often than any test provokes it (×102 in run 36494534782, ×111 in run 36502363580). Cause: a test's cleanup deleted the draft while the page was still open, and the wizard's debounced autosave then arrived for a draft that no longer existed — test-side noise. Evidence: the census; the executor's attribution. Fix: C2 Part B — every `afterEach` that purges drafts first runs `await page.goto("about:blank")` (the post-wizard, a11y and photo-pipeline specs): 111 → 27; W5 Part C — the step became `stopPageBeforePurge(page)` in `e2e/helpers/posting.ts` (wait for network quiet, then blank), after W4's new tests had raised the count from 5 to 21. PR-15 provokes two lines on purpose. Pre-committed judge: closes after three consecutive green CI runs at 5 or fewer lines, judged on CI runs, not local ones. Class rule: a hook that purges drafts stops the page first. Status (2026-10-04): FIXED (`24663baf`, then `d25b5d79`; closed 2026-09-29 on CI counts of 4, 5 and 4); the message stays off the allowlist. The same message was carried on afterwards under two more numbers: INC-364 (spec-ledger block S47 — named beside the lines from 2026-10-01 on, never defined) and INC-398 (spec-ledger block S50, 2026-10-03 — "the CI server-error census carries 'listing not found' off the allowlist", registered at the bundle 3 brief). `roadmap.md` at dev `48d3c53b` still reads "E census (incl. 7 "listing not found" lines, INC-364) — not done (CI census still shows 6 "listing not found" lines)"; the census of run 37264070069 (`70e16ea5`, 2026-10-05) lists `listing not found` ×8 (shard 3, shard 5, shard 6) as its only off-allowlist message (×7 on `2b55ed15`, run 37244952955; ×10 on `0fc968e4`, run 37249574367). See INC-364 and INC-398 for the later carry of the same message.

## INC-324 — a save racing a draft delete failed with a null write to `listing_revisions` (2026-09-28)

Defect: `submit_listing` read the draft without a lock (`20260928135721_6b0f6ae1:50`); a delete landing between that read and the UPDATE left the UPDATE matching nothing, `v_row` null, and the revision insert failing on `listing_id NOT NULL`. A seller deleting a draft in one tab while another tab autosaves would get a "couldn't save" error — a real product bug. Evidence: `null value … listing_revisions` ×3 per run in the DEC-083 census. Fix: C2 Part A — the read becomes `… FOR UPDATE` and, directly after the UPDATE, `IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;`; test PR-15 (a save after the delete answers status 200 with `ok: false`, never a 5xx); proofs P17, P18. Pre-committed judge: closes after three consecutive green runs with 0 such lines. Status (2026-10-04): FIXED (`24663baf`, run 36524317564; migration `bff9822c` → mark `20260929120000` on prod and staging; closed 2026-09-29 after 5 clean runs). The inline INC-324 comment in `submit_listing` was lost in the later migration M1 (`b9aa66a4`); bundle 4's M5 (`20261004144146_923dd4cb`, mark `20261004090000`, on ethio-prod and ethio-staging) restored it (line 1103: "-- INC-324: the row is locked for the save; a delete that won the race is …").

## INC-325 — the mobile step strip was a scroll region the keyboard could not reach (2026-09-28)

Defect: axe reported `scrollable-region-focusable` (serious) on wizard step 1 at mobile-360 — the single serious finding of the first accessibility runs. The element axe named was the mobile step strip (`ol.-mx-1`, `mobile-step-strip.tsx:33–36`, `overflow-x-auto`), which has no focusable child on step 1; it was first described as the category list. Evidence: the DEC-084 section of the first runs (`serious=1 critical=0`). Fix: W2 Part D — the scroll container takes `tabIndex={0}` with a focus ring. Status (2026-10-04): FIXED (`611e1094`, run 36502363580; 0 serious · 0 critical on all 10 page × size checks).

## INC-326 — red board: the format check had no parser for the new allowlist file (2026-09-28)

Defect: prettier's `docs/**` glob reached the new `docs/tracking/ssr-error-allowlist.txt` → "No parser could be inferred" → exit 2 in the Build job. Second parser-less file after INC-192. Evidence: run 36435962253 on `694689f6` (Build job red; E2E green). Fix: R1 Part 0 — a `.prettierignore` entry beside the INC-192 entry with the comment "# DEC-083 / INC-326: the ssr-error allowlist is a plain pattern list (no parser)." Class rule: a new parser-less file under a prettier glob lands with its `.prettierignore` line in the same turn; `format:check` runs on the whole tree before reporting, never only on changed files. Status (2026-10-04): FIXED (`4e2a9aad`, run 36494534782).

## INC-327 — the attributes import preview approves a card-rank clash that only the commit refuses (2026-09-28)

Defect: `duplicate key … category_attribute_links_card_rank_unique` appeared during an attributes import on a green run. Test AT-58 provokes the clash deliberately, but it exposes a gap: the preview approves the clashing file and only the commit rejects it. Evidence: the DEC-083 census of run 36494534782 (numbered the same day under the DEC-083 rule for SQL-class lines on a green run); the executor's attribution. Interim: the allowlist entry `commit_failed duplicate key value violates unique constraint` names AT-58 but is broad — it also hides any other duplicate-key error during a commit — and goes away once the preview refuses the clash itself. Fix: queued with the importer fixes (INC-314, INC-307); that turn was never issued. Status (2026-10-05): OPEN — the broad allowlist entry is still line 21 of `docs/tracking/ssr-error-allowlist.txt` at dev `48d3c53b` ("commit_failed duplicate key value violates unique constraint # AT-58 (admin-attributes.spec.ts — a clashing card-rank commit is refused, INC-196 L2 / INC-327)"); the file it names, `admin-attributes.spec.ts`, was deleted in the CI-T1 split and AT-58 now lives in `e2e/admin-attributes-editor.spec.ts`. The census of run 37264070069 (2026-10-05) still counts the message twice (shard 1, shard 4), quiet. No later source names INC-327.

## INC-328 — the tree route logged an upstream HTML error page raw (2026-09-28)

Defect: `[ssr-error] /api/categories/tree <html>` ×1 — an upstream HTML error page came back where data should have been, and the route logged the raw page. Evidence: the DEC-083 census of run 36502363580 (fast lane). Most likely a brief upstream outage, not project code; which call produced it was not attributable (the executor cannot read that run's log). Fix: C2 Part C — `logRouteError` in `src/routes/api/categories.tree.ts` logs `upstream returned an HTML error page (<status|unknown>)` when the message starts with `<`. Status (2026-10-04): FIXED (`24663baf`, run 36524317564) — logging only; origin unattributed.

## INC-329 — answers erased on Back: joining the parent set was treated as a change (2026-09-28)

Defect: on the specifications step the reconciliation resets dependents when a parent picker changes (`step-specifications.tsx:756–764`). It derived `parents` from loaded option lists (a picker joins once its options carry facts or bounds) but compared against `parentsSeen` as if every parent had been seen on the first pass, so a picker whose list arrived later "moved" from empty to its stored answer and the D25 reset wiped what it governs. A year bounded by the model has no fact to refill it, so it was really erased and Next stayed blocked. Since INC-320 this fired on every Back for an answered big list; before it, for any such picker whose list arrived after the first pass. Evidence: the operator's W2 walk (the year back to "Choose", Next blocked until a year is chosen again). Fix: W3 Part A — `movedKey` considers only keys already in the previous set; test PW-74, the round-trip law, which failed on the unfixed code and passes for both the short and the long model list. Class rule: joining the parent set is not a move; only a changed answer resets. Status (2026-10-04): FIXED (`c22a3bdb`, run 36519870276; operator walk 2026-09-29 "working as intended in all").

## INC-330 — the currency pre-fill read rows that were not the seller's own (2026-09-29)

Defect: registered when PW-17 (currency preselect) flaked three times in seven days; PW-10 flaked twice on the same pre-fill and joined it, then failed on both projects after the CI-T1 split and reproduced alone 7 times in 10 (so neither test order nor the split caused it). Both pre-fill reads in `src/features/posting/pricing-data.ts` (`readLastListingCurrency`, `readSellerHome`) had no filter for the signed-in seller. Listings RLS lets a seller read their own listings and every active listing of any seller, so "last listing" could fill in another seller's currency — a real bug; the unfiltered profiles read made the database check the admin permission against every row, which was slow on staging's large test-user table. Evidence: run 36533275066 on `425039fa`; the executor's trace. Fix: both reads take the signed-in seller's id from the local session and filter on it (`seller_id` for listings, `user_id` for profiles); with no session they read nothing; `pricing-data.test.ts` (3 tests, red on the old code). Class check: every other own-row read in the app already filters explicitly. Class rule: an own-row read filters by the signed-in user explicitly and never relies on RLS. Status (2026-10-04): FIXED (`7c300b6e`, run 36547403556). The executor's code comments first labelled the fix INC-331; corrected in W4.

## INC-331 — a model-supplied answer might be cleared on Back before the model's list arrives (2026-09-29)

Defect: the executor's read-only table of every path in `step-specifications.tsx` that deletes or overwrites an answer (W3 Part D) flagged one more risk: a detail the model fills by itself could be re-derived on re-entry before the model's list arrives; PW-74 did not cover that case. Evidence: code reading only. Fix: none needed — W4 Part C extended PW-74 with a prefilled, untouched, unpinned fact (`seats`), which survived the round trip in both list sizes on both projects, and the operator's W4 walk (Next then Back on a phone model) kept every answer and prefill. Status (2026-10-04): CLOSED, no change — not reproduced by test or walk (`4de0e33f`; walk 2026-09-29).

## INC-332 — a tap on Next was lost when a refusal message appeared under it (2026-09-29)

Defect: when a field's refusal message appeared as the seller tapped Next, the message pushed the button down and the tap was silently lost. Evidence: found by the executor while writing PW-77 in W4. Fix: W5 Part B, at the shared level — the action bar ignores the press on its buttons, so focus stays in the field until the click has registered; one rule for every on-blur field (details, price, who, specifications) and every bar layout; test PW-79 (red on desktop before the fix). Status (2026-10-04): FIXED (`d25b5d79`, run 36585975894).

## INC-333 — PW-61 flaky in five runs within seven days (2026-09-29)

Defect: the running seven-day flake ledger (`docs/tracking/flake-ledger.md`) showed PW-61 flaky in 5 runs, over the limit of three flakes in seven days, with no open incident; the supervisor had been reading each run's flaky list instead of the running ledger (S69). The record numbers three tests at once, in the order PW-61, LT-13, PW-35 → INC-333, INC-334, INC-335. Evidence: the flake ledger at the W4 run. Fix: none yet; queued for a flaky-test turn (called the "CI turn", later CI-T2) together with an automatic check that lists every test at or over the limit in each CI report. Status (2026-10-05): OPEN as a number, no fix issued — CI-T2 was never issued (spec-ledger block S46); its leftovers were parked for the close-out bundle on 2026-10-03 ("Test-account pool adoption and the leftover CI housekeeping") and 2026-10-04 ("Close-out bundle: slow-connection loading, search speed, one permission fix, older database warnings, the parked roadmap items, records"). The flake ledger on `ci-evidence` carries no PW-61 line after 2026-09-28: its five lines are runs 36383469726 (×2, `394162bb`), 36391560866 (`1f7e0869`), 36398155321 (`8e0c2ecf`) and 36414969833 (`18f1b592`), all on commits before the INC-317 fix `de56b6c8`.

## INC-334 — LT-13 flaky in four runs within seven days (2026-09-29)

Defect: the running seven-day flake ledger showed LT-13 (admin locations console) flaky in 4 runs, over the limit of three flakes in seven days, with no open incident (found with INC-333; see S69). Evidence: the flake ledger at the W4 run. Fix: the flaky-test turn (CI-T2) was never issued; the class was fixed in bundle 4 turn 11 — LT-13 reads the DB count and the page total in the same poll step, with reload, and the class rule sits in the `e2e/admin-locations.spec.ts` header ("a total asserted against DB truth is read in the same …", INC-334). Status (2026-10-05): CLOSED (`70e16ea5`, 2026-10-05; `docs/_changelog.md` "Bundle 4 turn 11 item 1: INC-334 closed"; `roadmap.md` "[x] LT-13 / INC-334 (closed)"). Ledger: eight LT-13 flake lines in all (2026-09-28 runs 36362240778, 36383469726, 36494534782; 2026-10-03 runs 37091007779, 37137801437; 2026-10-04 runs 37213029341, 37233659011; 2026-10-05 run 37256219728 fast lane), and the run on `a17b227c` (37256219728, turn 10) was red on LT-13 itself (gating, mobile-360, shard 1) before the fix. The run on `70e16ea5` (37264070069) is red on CT-19 only (INC-437); the next run, 37268978090 on `48d3c53b`, is green.

## INC-335 — PW-35 flaky in three runs within seven days (2026-09-29)

Defect: the running seven-day flake ledger showed PW-35 (a model's single allowed answer is stored, not rendered) flaky in 3 runs, at the limit of three flakes in seven days, with no open incident (found with INC-333; see S69). Evidence: the flake ledger at the W4 run. Fix: none; CI-T2 was never issued. Status (2026-10-05): OPEN as a number, no fix issued — the flake ledger on `ci-evidence` carries no PW-35 line after 2026-09-28 (its three lines: run 36312273832 `422550b8` 2026-09-27, run 36362240778 `98d2cd2c` and run 36379492978 `0bbf9eb7`, both 2026-09-28, each "PW-35: the review never opened").

## INC-336 — the DEC-086 required mark was missing on big model lists (2026-09-29)

Defect: on Smartphones → Apple → iPhone 13 series the Model question showed no asterisk and no soft border until Next was refused. The phone model list has 363 options, above `EAGER_OPTION_LIMIT` (200, `step-specifications.tsx:63`), so it was not loaded, the form held no fold entry for it and `requiredByModel` returned false; PW-76 and PR-16 used small lists and could not see it. Evidence: the operator's W4 walk, step c. Fix: W5 Part A — a list above the limit is read once per key per mount as soon as any other select on the step is answered; test PW-78 (205 options, red before the fix). Logged deviation: it loads when any answer is given, not only its parent's, because the posting schema carries no parent link; adding the parent link and loading only the chosen series' models was assigned to W4b. Only two lists exceed the limit: phone models (363) and car models (209). Status (2026-10-04): FIXED (`d25b5d79`, run 36585975894) with the logged deviation; the W4b follow-up was never issued.

## INC-337 — the place step let a listing pass without a city (2026-09-29)

Defect: the operator's ruling of 2026-09-19 (a region alone must not pass; a city is required) was never enforced: the door accepted any level and the form showed no required mark on the city. The supervisor missed it when verifying the place step (S70). Evidence: the operator's W4 walk (Next passed with only the country chosen). Fix: W6 — the door refuses `{field: 'coverage', reason: 'cityRequired'}` unless every place is a city or a sub-city, and judges sent places at any step; the place step shows the required mark and the soft border until a city is chosen and says "Choose a city."; tests PR-17, PW-80, PW-81; proofs P22–P27. Status (2026-10-04): FIXED (W6 `0e4adb22` with migration `a3a572bf` → mark `20260929235900` on prod; repaired for staging by W6-R, `d662a91f` with migration `13cb1b22`; run 36630568746 green on re-run; operator walk 2026-09-29 passed).

## INC-338 — the place step hardcoded the plan's city limit (2026-09-29)

Defect: `PLAN_CITIES = 1` at `step-where.tsx:78` copied the free plan's limit as a constant, although the posting schema already carries the plan (`maxCities`, `maxRegions`, `maxCountries`, `posting-service.ts:455–469`); a limit changed in the console never reached the form. Evidence: the supervisor's read while grounding the W6 spec. Fix: W6 — the constant is deleted, the step reads the plan's limits and shows an add button only while the plan leaves room at its level; test PW-82. Status (2026-10-04): FIXED (`d662a91f`, run 36630568746).

## INC-339 — the Amharic check on the marketplace menu flaked three times in seven days (2026-09-29)

Defect: the test that checks the Amharic labels of the marketplace menu flaked for the third time in seven days, reaching the limit of three flakes in seven days. The record does not give its test id. Evidence: the flake ledger at the W5 run (36585975894). Fix: none under this number; CI-T2 was never issued. Status (2026-10-05): OPEN as a number — the flake ledger on `ci-evidence` carries no line for `i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback` after 2026-09-29 (its eight lines run 2026-09-09 → 2026-09-29, the last at run 36585975894 `d25b5d79`, every body "marketplace rail categories: category labels still in English"). The same rail's two English roots on staging were fixed as INC-361 (`f2422adf`, 2026-10-01, spec-ledger block S46: `name_am` filled on staging for construction and travel); no source states that INC-361 closes INC-339, and the test id of INC-339 is still not given by any source.

## INC-340 — the W6 migration could not apply on staging: its proofs borrowed real places (2026-09-29)

Defect: `20260929201601_a3a572bf` passed on prod but failed on ethio-staging with `ERROR: P0001: PROOF setup failed: places … <NULL> …` — its proofs borrowed five real places, and staging has no sub-city (0 rows; prod has 11 active, all in Ethiopia). The W6 prompt had allowed proofs to read real places (S73). CI stayed red on `0e4adb22` (run 36626287215, preflight "STAGING BEHIND"). Evidence: the operator's staging apply; the read-only staging count. Fix: W6-R — the corrective migration `20260929205914_13cb1b22` re-declares `validate_listing_draft` whole from `a3a572bf` (md5 `64539a18…` → `97626544…`), with self-contained proofs that build two scratch markets on free ISO user-assigned country codes picked at run time and read no reference place or country row. It inserts its own mark `20260930001000` and `a3a572bf`'s `20260929235900`, so on staging it replaces `a3a572bf` (the preflight accepts a file whose declared mark is in the ledger; no allowlist line). `a3a572bf` must never be applied on staging. Class rule: G27 applies to proofs too — a proof never depends on reference rows whose presence differs between projects, and no proof skips with a notice. Status (2026-10-04): FIXED (`d662a91f`; `13cb1b22` on prod and staging; run 36630568746 green on re-run).

## INC-341 — the door never enforced the plan's region limit (2026-09-29)

Defect: once every place is a city or a sub-city, the door's count of region-level nodes is always 0, so `max_regions` was enforced only on screen. (The same step had also written `v_lands` twice, so the country limit counted country-level places instead of countries; that was fixed in `a3a572bf`.) Evidence: the executor's W6 report; the supervisor's read. Fix: `13cb1b22` — step 6 counts distinct cities with a sub-city counted as its own city (`coalesce(city_id, id)`), distinct `region_id` and distinct `country_code`; proofs P28 (two regions in one market under the free plan → `coverageExceedsPlan:region`) and P29 (a city and its own sub-city count as one city). Status (2026-10-04): FIXED (`d662a91f`; `13cb1b22` → mark `20260930001000` on prod and staging; run 36630568746 green on re-run).

## INC-342 — the form capped the description at 1,200 characters while the door allows 5,000 (2026-09-29)

Defect: `step-details.tsx:31` capped the description at 1200 characters; the door (step 4) allows 5000. Evidence: the executor's W6 report. Ruling: the door is the authority, so the form follows it at 5000; the AI writing assist stays at 1200 (DEC-072); the title limit of 120 already matched. Fix: W6-R Part B — `DESCRIPTION_MAX` is 5000; PR-18 (5000 characters accepted, 5001 refused `tooLong`) and the unit test `step-details-limits.test.ts` pin the client constants to the door. Status (2026-10-04): FIXED (`d662a91f`, run 36630568746 green on re-run; the operator's W6 walk passed the step). The operator was offered 1,200 everywhere instead and did not take it up.

## INC-343 — two place-step limits left by W6 (2026-09-29)

Defect: after W6 (a) the item's own place could be changed but no longer removed and put back, and (b) a saved extra place in another country was not shown again after Back, though never dropped or overwritten (it cannot happen on the free plan, which allows one country). The record gives both limits under this one number; whether the number covers both or only the second is not stated. Evidence: the executor's W6 report. Fix: assigned to W6b, whose item-location marker was to cover both. Status (2026-10-04): (a) FIXED by W6b-1, landed 2026-09-30 (CI green on `c7ae8d78`, run 36646916552) — any city box may be removed while another remains, and removing the ticked one moves the tick; (b) OPEN — not confirmed fixed in any later record; last word 2026-09-29.

## INC-344 — CI dependency audit red on three undici advisories (2026-09-29)

Defect: the "Dependency vulnerability audit" job failed on dev `eda023d3` (the W6b-1 landing) although every E2E job passed: `bun audit` reported undici >=8.0.0 <8.10.2 with three high advisories (GHSA-rfgv-xxqx-mfg5, GHSA-w293-vg96-wgc3, GHSA-vp8m-p9jh-q5pm), reached only through jsdom, a test-only dependency. Evidence: run 36642555497, red on that one job. Fix: W7 Part A — `"undici": "^8.10.2"` added to the `package.json` overrides on the INC-025 precedent (jsdom@30 asks for ^8.9.0, so the override fits); `bun.lock` resolves `undici@8.11.2` (was 8.10.1); entry "2026-09-29 Audit — undici via jsdom, REMEDIATED (INC-344)" in `docs/features/dependency-audit.md`. Only CI's audit job proves a clean audit: `bun audit` cannot reach the advisory service from the executor's sandbox. Status (2026-10-04): FIXED (`c7ae8d78`, run 36646916552 green, main promoted).

## INC-345 — TR-29 flaked five times in seven days (2026-09-29)

Defect: TR-29, a translations test, failed and then passed on retry five times in seven days. Evidence: `docs/tracking/flake-ledger.md` as read on 2026-09-29. Fix: none. It was assigned to the flaky-test turn (CI-T2), a turn the supervisor planned for the tests that fail and pass on retry; the same turn was to take PR-7, LS-11 (whose clean-up error suggests another test's post landed in its test country), PW-58 and the ledger's 14 tests that had failed and then passed on retry three or more times in seven days (count read 2026-09-30). Status (2026-10-05): OPEN — CI-T2 was never issued and TR-29 is named in no later source (spec-ledger blocks S48–S53); its CI-T2 leftovers were parked for the close-out bundle (2026-10-03 "the leftover CI housekeeping"; 2026-10-04 "the parked roadmap items"). The flake ledger on `ci-evidence` carries one more TR-29 line after this slice: 2026-10-04, mobile-360, shard 2, run 37184985245 (`61b02390`), "the CSV export was page-scoped: 2030 stable+own rows against a 30-row expectation" (eight TR-29 lines in all since 2026-09-17).

## INC-346 — the category step's required mark vanished while changing category (2026-09-29)

Defect: on wizard step 1, after Back, a seller who browsed into a branch other than the chosen leaf's saw no asterisk and no red border although nothing on that level was chosen. Evidence: operator walk 2026-09-29 ("the red and astrike around the categories goes away when returning back … even if not selected"). Fix: W7 Part C — while the level on screen is on the chosen leaf's path there is no mark, and the chosen item or its ancestor wears the selected treatment (D40); off that path the heading's required mark and the soft border show, with a line "Current choice: <path>" and a "Keep it" link; Next still accepts the current choice until a new leaf is chosen. Test PW-87 (360 and 1280) in `e2e/post-wizard-finder.spec.ts`, red against the last clean step 1 (`cd85a217`). Status (2026-10-04): FIXED (`825a7794`, run 36657436473 green, main promoted).

## INC-347 — the price step offered "per kg" for milk (2026-09-30)

Defect: at Meat, Dairy & Eggs › Milk the price step showed the leaf's default unit "per kg", although the Milk option carries the fact `{unit_of_sale-food: per_litre}` and allows only per_litre, per_piece and per_pack. The basis control mounted on step 5 (`only=[basisKey]`, `step-specifications.tsx:209–215`) did not apply the step-3 answer's facts or narrowing. Evidence: operator walk 2026-09-30 (Shola milk "listed as per kg"); code reading. Fix: W6b-2 Part A3 — the type answer's fact and narrowing reach the price-step basis; test PW-88, red on both projects before the fix. The prompt also ordered a class census of every fact, allowed list or bound whose owner is answered on one step and whose target is drawn on another; its result is not in the record read. When the goods unit moved to step 3 (ruling N2, 2026-10-01) PW-88 was re-expressed there and exposed a second fault — the narrowing cleared the leaf's default and nothing refilled the type's unit — fixed in `cceab250`. Status (2026-10-04): FIXED (`6de84944`, operator walk on the published site 2026-09-30 "correct"; `cceab250`, run 36903983908 green, main promoted).

## INC-348 — CI dependency audit red on two brace-expansion advisories (2026-09-30)

Defect: the dependency audit failed on dev `6de84944` (the W6b-2 landing) on two new high advisories for brace-expansion < 1.1.19 (GHSA-6j4f-fj2g-mc7p, GHSA-qhr7-859c-m2p7), reached only through eslint's minimatch (dev tooling). Evidence: run 36757197211 — every E2E job green, red only on the audit. Fix: W6c Part 0 — the override raised from `^1.1.17` to `^1.1.19`, kept inside 1.x on purpose because a flat floor drags minimatch@3 onto 5.x and eslint dies (`docs/features/dependency-audit.md:56–60`, the reason recorded 2026-08-04); `bun.lock` resolves `brace-expansion@1.1.21`, one copy; `eslint .` 0 errors; entry "2026-09-30 Audit — brace-expansion < 1.1.19, REMEDIATED (INC-348)". Status (2026-10-04): FIXED (`07e6a523`, run 36762595363 green, main promoted).

## INC-349 — not defined in the record (date unknown)

Not defined in the record; the number is not reused. INC-348, INC-350 and INC-351 were written in one supervisor reply of 2026-09-30 (the verification of W6b-2 and the W6c prompt), so the number was either skipped or given to a finding of that reply that carried no label; the only unnumbered defect-like finding there is the `map_pin` gate (S79). Searched: every raw turn 835–1375, every sweep, the digest, the uploads, the supervisor's notes and the repository at dev `48d3c53b`.

## INC-350 — the location note promised "No phone numbers" but nothing checked (2026-09-30)

Defect: the "Location details" help added by W6b-2 says "No phone numbers" (`en.ts:2239`), but no door and no form check enforced it. Evidence: the executor's W6b-2 report ("the location details box says 'No phone numbers', but nothing checks for them yet"). Fix, specified in W6c Part D and widened in W6d: the pin door `set_listing_pin` refuses a note that contains a phone-like number (seven or more digits in one run, allowing spaces, dots, dashes, brackets and a leading +) with key `contactInNote` (EN "Remove the phone number — buyers contact you through ethio.com."), every text-type attribute value is refused the same way with key `contactInText`, and the form mirrors the door. Built as migration `20261002013936_a35e45fa` (mark `20261002030000`; the text branch sits in `validate_listing_attributes`; the identity formats digits:n, vin, plate-et and alnum skip the check) and as Bundle 1's app side (one client mirror, `src/features/posting/contact-like.ts`; two tests named PW-101). Status (2026-10-04): FIXED (a35e45fa → mark 20261002030000 on ethio-prod and ethio-staging, 2026-10-01; Bundle 1 closed 2026-10-02 on `5e09c8d3`, run 37038531279 green). The rule then proved too broad (INC-382) and was tightened, and extended to Other write-ins, the title and the description, in migration `7423f49a` (bundle 2).

## INC-351 — the posting form takes about 20 s to load on Slow 4G at 360 px (2026-09-30)

Defect: on staging, at 360 px with Slow 4G throttling, the place step loaded in 20.3 s before W6b-2 and 20.5 s after it; the cost is the posting form's own load, not the map's (map ready 3.9 s → 4.4 s, first map picture 5.8 s → 6.5 s, both served by the OpenStreetMap fallback). Evidence: the executor's W6b-2 timing table (2026-09-30). Fix: none yet. W6c Part E ordered a census only — the requests made before step 1 is usable, the JS chunks in gzipped KB, the data reads and their times, the render-blocking resources — reporting the top five costs with numbers and a proposal. Status (2026-10-05): OPEN — the census was never run; it is the load-time half of the "E census" line that `roadmap.md` still lists as not done at dev `48d3c53b` (line 18), and it is parked for the close-out bundle: 2026-10-03 "Wizard load time on a slow phone connection" and 2026-10-04 "Close-out bundle: slow-connection loading, search speed, one permission fix, older database warnings, the parked roadmap items, records".

## INC-352 — not defined in the record (date unknown)

Not defined in the record; the number is not reused. It falls between INC-351 (the W6c prompt of 2026-09-30) and INC-353 to INC-356 (the supervisor's next reply the same afternoon), so it was either skipped or given to an unlabelled finding. Searched as INC-349.

## INC-353 — the map pin and the place outline were invisible (2026-09-30)

Defect: on the published site the dropped pin and the outline of the ticked place drew transparent. The map code wrapped theme tokens in `hsl(var(--…))` (`leaflet.ts:195`; `map-pin-dropper.tsx:202` and `:221`), but the tokens are full oklch colours (`src/styles.css:108`, `:114`); `hsl(oklch(…))` is invalid. Evidence: operator walk 2026-09-30 ("the pin is transparent", "i dont see pin at all"); code reading. Fix: W6d Part F — each token is used as the full colour it is; all three `hsl(var(--…))` uses in `src` are removed, and a new `tokenColor()` helper in `leaflet.ts` reads the real colour from the page where SVG or Leaflet needs a concrete value; the PW-92 extension asserts that the placed marker's background is not transparent and that the outline has a visible stroke (failed 4/4 with the `07e6a523` code restored locally, then passed 4/4). Status (2026-10-04): FIXED (the code first committed in `e765c012` and green on `9d56f391`, run 36799472142, main promoted; the PW-92 extension reached dev only with the INC-359 restore and is green on `f2422adf`, run 36804972697; operator walk after Publish 2026-10-01: "pin is shown and saves").

## INC-354 — the map credit was not visible on a phone (2026-09-30)

Defect: the operator saw no Esri or OpenStreetMap credit on the map sheet; the credit was drawn in the bottom-right corner, most likely under the Save/Cancel bar. Esri's terms require it to be visible. Evidence: operator walk 2026-09-30 ("i dont see the text but it opens a dialog box"). Fix: W6d Part G — the credit is a plain line under the map, never under a control bar, reading "Esri" on the Esri tiles and "OpenStreetMap" on the backup; test PW-97 (the credit is inside the viewport and `elementFromPoint` at its centre is the credit, on both plans), red on the pre-credit code of `e765c012`. The executor turn that built it was pushed by the platform to a side branch and restored to dev under INC-359. Status (2026-10-04): FIXED (restored from `9f36b11b`; green on `f2422adf`, run 36804972697, main promoted).

## INC-355 — required-and-empty fields did not read as red (2026-09-30)

Defect: an empty required control wore the destructive colour at 40 % (`field.tsx:120` `controlClass`; `step-where.tsx:127` `boxClass`), which the operator did not see as red, and on the place step only the heading carried an asterisk (`step-where.tsx:999`). Evidence: operator walk 2026-09-30 ("the red box line is not there now … we had it built but now its not tehre"). Fix: W6d Part H, at the shared primitive — required and empty wears the full destructive border, a refusal adds the ring and the message; each empty country, region and city box wears its own asterisk, clearing when filled and returning when cleared; `step-category.tsx:268`, the last `border-destructive/40` in `src`, was added to scope and brought in line. Tests: the PW-90 extension compares the computed border colour with the destructive token; PW-78 and `post-wizard-category.spec.ts:798` still asserted the old soft border, turned CI red on `e765c012` (run 36781795077) and were updated in `9d56f391`. Class rule: the fix is made at the shared primitive, not per field, and every test that asserts the retired treatment is censused and updated. Status (2026-10-04): FIXED (borders `e765c012` and `9d56f391`, run 36799472142 green; the per-box asterisks and the PW-90 extension restored under INC-359 and green on `f2422adf`, run 36804972697).

## INC-356 — the "Item or service is here" tick was not seen (2026-09-30)

Defect: on a phone the tick that marks which listed place holds the item sat below the fold, under the district box, so the operator took it for removed; it was drawn and checked all along. Evidence: operator walk 2026-09-30 ("a click box next to a city that says this is product location is no longer there"); the executor's reproduction at 360 and 1280. Fix: W6d Part I — the tick sits on the city line, under the city at 360 (city y 348, tick y 412) and to its right at 1280 (city ends x 704, tick x 716); test PW-98, on a fresh post and on a prefilled one. The executor turn that built it was pushed to a side branch and restored under INC-359. Status (2026-10-04): FIXED (restored from `9f36b11b`; green on `f2422adf`, run 36804972697). Bundle 2 later gave the marker its own line with Remove at its end (Part P2, PW-98 amended).

## INC-357 — a list settled to "Other" blocked Next, so sellers could not post (2026-09-30)

Defect: when a product type leaves a single-choice list with one allowed answer, the form fills it (INC-244) and hides the row (D44; `step-specifications.tsx:1000–1017`, `:1292–1299`). When that answer is "other" the door still demands its text (`otherNeedsText`, migration `20260928034942_247a3ed0`, lines 375–380); the hidden row had no text box, the separate "Brand / Maker (write it)" question did not satisfy it, and Next showed "Complete these to continue: brand-food" for ever. Hit at Sugar, Salt & Packaged Food (tomato paste, pasta, sauces, canned food, cereal, nutrition) and Honey, Butter & Oils (both cooking oils). Evidence: operator walk of the published build, 2026-09-30. Fix (ruling N1): a single-select settled to "other" is never hidden; it renders its own write-in box and sends `{ value: "other", text }`; the door is unchanged (`c3761f92`). The proof tests then found the one-answer fill flattening `{other + text}` back to a bare "other"; the fill now compares the chosen value, not the shape (`a5775647`). Tests PW-102 and the class test PW-103 (required text, optional text and a list's Other text each save and pass Next) in the new `e2e/post-wizard-details.spec.ts`, both red on `0a132c30`. Census: the form hides a row only when the door also needs nothing typed. Catalogue side: the 24 duplicate `brand_name` write-in links were unlinked by file on 2026-10-01. Class rule: the form never hides a row whose door still demands input; the catalogue adds no new pair of a list and a separate write-in for the same answer, and never settles a row to Other. Status (2026-10-04): FIXED (`c3761f92`, `a5775647`; run 36812025113 green, main promoted).

## INC-358 — Yadea and Dodai sellers who skipped the model got Petrol and an engine-size question (2026-09-30)

Defect: Yadea and Dodai make only electric bikes, but at Motorcycles & Three-Wheelers a seller who skipped the optional model kept the leaf's Petrol prefill and was asked Engine Size. An old gap, found during the audit of Vehicles step 2, not caused by it; only those two makes were affected. Evidence: supervisor audit of the merged catalogue. Fix: catalogue file `c27-inc358-definitions.csv` (one definition row): both make options are locked to Electric, with two independent sources per maker, so with no model chosen Fuel and Engine Size are not asked and Battery, Range and Charging show. Status (2026-10-04): FIXED (imported 2026-09-30, "0 added · 1 changed … 1 changes written"; walked correct for Yadea, Dodai and Honda the same evening).

## INC-359 — executor turns landed on platform side branches and never reached dev (2026-09-30)

Defect: the executor's turn of 21:54–22:12 UTC on 2026-09-30 (place-step Parts G, H's per-box asterisks, I, J and K; tests PW-97 to PW-100) was pushed by the platform to side branch `lovable-sync-1790806349` (forked at `e765c012`, tip `9f36b11b`), and its 22:38 UTC framework revert to `lovable-sync-1790807903`, while dev moved on. The supervisor had recorded that work as landed from the executor's reports and had read the green run on `9d56f391` as covering it (slip S84). dev's history was not rewritten, as the executor first reported. Evidence: the executor's stop report; the supervisor's census of all nine `lovable-*` branches, which found one more lost fix — the operator's 2026-09-18 walk fix that keeps My Listings active while posting (`6fea44fd` on `lovable-sync-1789741128`). Fix: the executor restored about 540 lines by copying files (commits `e0205f1a` to `b960ae3c`; verified equal to `9f36b11b` except the PW-99 lines), then restored the My Listings fix with two PW-15 assertions. Class rule: after every executor turn the supervisor confirms on a fresh dev clone that the work is on dev and lists the platform's `lovable-*` branches; a green run is trusted only for the commit it names. Status (2026-10-04): FIXED (`f2422adf`, run 36804972697 green, main promoted). The class recurred as INC-373 and INC-376 and was removed at its cause by DEC-098.

## INC-360 — a component test still asserted the superseded place-step layout (2026-09-30)

Defect: `step-where.test.tsx:215` ("puts each add button in its own box (R2)") encoded the first place-step walk ruling, W6b-1 R2, after the operator's staircase ruling (Part J) had replaced it; it never ran against the staircase while that work sat off dev, and turned CI red when the work was restored. Evidence: run 36801729573 on `b960ae3c`. Fix: the test follows the staircase and is renamed "(J)": "+ Add city" is inside its region box after every city row; "+ Add region" is the last child of the last region box; "+ Add country" is outside the primary country box. Proven red against `step-where.tsx` from `e765c012`, green on HEAD. Status (2026-10-04): FIXED (`f2422adf`, run 36804972697 green).

## INC-361 — the Amharic category rail on staging showed two roots in English (2026-09-30)

Defect: the i18n-coverage test (shard 5; the mobile-drawer variant is the same defect) found "Construction Material" and "Travel & Accommodation" in English under Amharic. It had flaked more than ten times since 2026-09-14, every recorded body naming exactly those two roots; this time it failed on retry and gated. Cause: the two rows had an empty `name_am` on staging although approved Amharic translations existed; no test was found writing them. Evidence: run 36801729573; the flake ledger; the executor's read-only staging queries. Fix: `name_am` filled on staging only with the production values (construction «የግንባታ እቃዎችና መሳርያዎች», travel «የጉዞ እና ማረፊያ አገልግሎቶች»); the test's failure message now names the slug of each English label. Because every recorded failure named the same two rows, the cause was read as data, not timing, before anything was changed. Status (2026-10-04): FIXED (`f2422adf`, run 36804972697 green). A read-only class count on staging and production (rows whose `name_am` or `label_am` is empty while an approved 'am' translation exists) was queued on 2026-09-30; no result is recorded.

## INC-362 — the category search said "No results" while the finder was still working (2026-09-30)

Defect: until the server finder answers, step 1 checks only category names; a term that matches no name (for example «ምስር») showed "No results" ("Nothing matched. Try another word, or browse below.") for the seconds the finder took, so a seller could leave before the answer came. Evidence: operator walks 2026-09-30, 2026-10-01 (twice). Fix, specified as Part S3: while the finder is asked about the current term the list shows a searching row (the site logo spinning; aria-live "Searching…", en + am); name hits stay visible with "Still searching…"; "No results" appears only after the finder answered empty, or failed with no name hits. Built in Bundle 1: `finderPending` in `src/features/posting/catalog-finder.ts`, a component test, and PW-105 in `e2e/post-wizard-finder.spec.ts`. Status (2026-10-04): FIXED per the changelog (2026-10-02, Bundle 1 items 2–5) and the code; Bundle 1 closed 2026-10-02 on `5e09c8d3`, run 37038531279 green. `roadmap.md`'s truth pass of 2026-10-04 still lists "S2 / S3 — not done" at dev `48d3c53b` (line 11; the truth-pass lines were untouched by turns 9b–12, whose roadmap edits ticked bundle 4 lines only); the two records are not reconciled — the supervisor parked "the parked roadmap items" for the close-out bundle on 2026-10-04.

## INC-363 — the category search was slow (2026-09-30)

Defect: each search made three trips to the database (rate check, version, find), and the first search after a catalogue change rebuilt the whole index while the visitor waited. Evidence: operator walks 2026-09-30 ("it takes few seconds"); the executor's S1 measurement on 2026-10-01: warm p95 1.43 s against the target, including a 5.49 s inline rebuild. Targets fixed before measuring: warm server time p95 ≤ 300 ms, and no visitor ever waits for an index rebuild; INC-273's law stands (no rebuild inside a write path). Fix (Part S2, approved 2026-10-01): migration `a35e45fa` — `catalog_find` answers from the current index and never rebuilds; a new `catalog_search` does the rate check, the version and the results in one call; pg_cron enabled with an hourly sweep that writes a heartbeat row on every run (every 5 minutes from `7423f49a`); Bundle 1 — the category and attribute import commits and undos refresh the index after the commit returns, and `/api/catalog/find` makes one call. Re-timed 2026-10-02 on the published site through the Server-Timing header, 20 terms, warm: p50 145 ms, p95 306 ms (max 372); inside the database p50 6.2 ms, p95 10.7 ms. Status (2026-10-04): PARTLY FIXED — no visitor waits for a rebuild; the 300 ms target is missed by 6 ms. The supervisor ruled the timing "closed as recorded" on 2026-10-02 (hop-bound; caching search answers at the edge is a candidate for the load-time work), while `roadmap.md` on 2026-10-04 reads "S2 timing over target (edge p95 306 ms), stopped for ruling, no ruling since" (still so at dev `48d3c53b`, line 10). Reconciled by the supervisor on 2026-10-04 (after the operator's 02:49 message): "I am parking all of it for the close-out bundle. That includes the search-timing ruling Lovable says is waiting on me: 306 ms against a 300 ms target at the edge, with the database at about 11 ms." — the hop is close-out work, not a pending ruling; the roadmap line is to be re-worded at the records turn.

## INC-364 — not defined in the record (first named 2026-10-01)

Not defined in the record; the number is not reused. First used on 2026-10-01 in the supervisor's N2 verification ("The 7 'listing not found' server lines go to the E census with INC-364", answering the executor's line "Server log: 7 'listing not found' lines, above the target of 5"), repeated in the executor's reports and on `roadmap.md` line 18 ("E census (incl. 7 'listing not found' lines, INC-364) — not done (CI census still shows 6 'listing not found' lines)", unchanged at dev `48d3c53b`); no entry text exists. The lines it names are the message INC-323 closed on 2026-09-29 (at a target of 5 or fewer per CI run) and registered again as INC-398 on 2026-10-03, the live incident for them; the census of run 37264070069 (`70e16ea5`, 2026-10-05) counts the message 8 times (shard 3, shard 5, shard 6). Status (2026-10-05): OPEN only as a name on the roadmap's E-census line; see INC-398.

## INC-365 — CI red on the i18n used-on map guard after a file move (2026-09-30)

Defect: to clear a fast-refresh lint warning the executor moved the shell context, its types and `useShell` into a new `src/components/shell-context.ts` (ten importing files changed, outside the stated scope) and did not regenerate the two i18n usage maps, which Knowledge rule A6 requires on every landing that touches `src/`. Evidence: run 36806970357 on `2a466705`, job "i18n used-on map is fresh". Fix: `bun run i18n:usage`; `docs/generated/i18n-usage.json` and `public/i18n-usage.json` committed; `bun run i18n:map-guard` prints "usage maps match the tree."; the shell-context move accepted as behaviour-neutral and recorded; whole-project lint 0 errors, 28 warnings (older fast-refresh warnings, parked for CI-T2). Class rule: every landing that touches `src/` runs `bun run i18n:usage` and commits both maps (A6, restated in every later prompt). Status (2026-10-04): FIXED (`0a132c30`, run 36808648788 green, main promoted).

## INC-366 — Next moved on although the door had refused the step (2026-10-01)

Defect: when an autosave was still in flight as Next was pressed, the autosave's follow-up carried the Next request and received the door's refusal, while Next's own turn found nothing left to send and reported success; the seller advanced to Photos with an empty required text box and no message. Evidence: the class test PW-103, red on `0a132c30` on both projects. The executor found it and assigned the number; the supervisor accepted it. Fix: in `src/features/posting/use-draft.ts`, a Next is answered by its own claim's verdict, whichever send carried it (`saveAt` returns false when its claim was refused). The edit broke the INC-317 bar on that file; the supervisor reviewed it and recorded it as an exception, because the bug hid a refusal from the seller (rule F4). Status (2026-10-04): FIXED (`a5775647`, run 36812025113 green, main promoted); refined by INC-367.

## INC-367 — PW-58 failed in the first nightly after INC-366 (2026-10-01)

Defect: PW-58 (the commission step) failed for the first time, on desktop-1280: after a valid 2.5 %, `post-step-6` never appeared within 10 s. A late refusal that answered an earlier Next claim blocked, and could clear, the newer claim. Evidence: nightly run 36825601323; the executor's repeat runs under a rule fixed in advance — 7 failures in 180 runs on the INC-366 code, 0 in 60 with the `use-draft.ts` of `0a132c30`, 0 in 60 after the fix. Fix: every strict claim (Next, rewind) carries its own token; a refusal is charged only to the claim its pass carried, and a superseded claim's refusal is history; component test `src/features/posting/use-draft.test.tsx`, red on the unfixed code. No timeout was raised. Status (2026-10-04): FIXED (`6a33e31b`; run 36882672052 green after the operator repaired the staging mail service and re-ran the failed jobs; main promoted).

## INC-368 — an expected refusal was logged as a server error (2026-10-01)

Defect: `/api/listings/draft` logged every door error as `[ssr-error]` before it turned the commission constraint (`price_bp_check`) and the price-mode constraint into seller refusals, so a seller's mistake counted as a server error in the E2E server-error census. Evidence: two `price_bp_check` lines in the executor's local run of 2026-10-01 and in the nightly's server log. Fix: the route logs only the unexpected branch; the census allowlist was not changed (G22). Class rule: a seller's mistake is not a server error. Status (2026-10-04): FIXED (`6a33e31b`, run 36882672052 green; the server log carries no constraint lines). Same class, still open at 2026-10-05: the census of run 37264070069 still counts `commit_failed duplicate key value violates unique constraint <q>` ×2 (shard 1, shard 4), quiet under the INC-327 allowlist line; assigned to the E census, which is close-out work; and the check whether the quiet allowlist entry "new row for relation <q> violates check constraint <q>" is still hit by anything, which the final full run was to show.

## INC-369 — an empty Other write-in was refused but the cursor landed on the dropdown (2026-10-01)

Defect: on Next, an empty "Other" write-in on a single-choice question is refused by the door (`otherNeedsText`), the field turns red with "Say what it is." and the page scrolls to it, but focus landed on the dropdown, not on the text box. Evidence: supervisor code reading after the operator's walk comment of 2026-10-01 ("should it be required and made red and scroll back to it if not filled?"); anchors `step-specifications.tsx` about line 1592, `field.tsx` `fieldTarget` and `focusFirstRefusal`. Fix (Part O, built in Bundle 1): an `otherNeedsText` refusal moves the field's id to the write-in, so Next focuses it, single and multi; test PW-106 in `e2e/post-wizard-specs.spec.ts`. Status (2026-10-04): FIXED per the changelog (2026-10-02, Bundle 1 items 6–8) and the code; Bundle 1 closed on `5e09c8d3`, run 37038531279 green. The red-before-fix run for PW-106 was owed when the bundle was reported; `roadmap.md`'s truth pass of 2026-10-04 still lists "Part O (INC-369, INC-370) — not done" at dev `48d3c53b` (line 16). Not reconciled; parked for the close-out bundle with the other truth-pass lines (2026-10-04).

## INC-370 — five multi-choice questions offered Other with no write-in box (2026-10-01)

Defect: `compatible_make`, `connectivity`, `languages_spoken`, `skin_concern` and `visa_country` offer "Other" but collected no text, against the operator's directive that every question with Other asks for the text, required only when Other is picked. Evidence: supervisor census of the merged catalogue, 2026-10-01; the executor's census then found that several readers of multi-choice answers dropped a `{"value":"other","text":"…"}` element. Fix (Part O): a picked Other always travels as `{"value":"other","text":"…"}`; in a multi-choice array that one element is the object and the rest stay strings. Door side in migration `a35e45fa`: `attr_answer_tokens` and `attr_answer_other_text` are the one reader, used by `validate_listing_attributes`, `attr_visible_when_met` and `listings_search_tsv_refresh` (proofs P8 and P9). App side in Bundle 1: `src/features/posting/answer-tokens.ts` mirrors them; a multi-choice Other gets its own write-in box; test PW-107 (DB truth). Class rule: the answer shape is read in one place on each side. Status (2026-10-04): FIXED per the changelog and the code (a35e45fa → mark 20261002030000; Bundle 1 closed on `5e09c8d3`, run 37038531279 green); `roadmap.md`'s truth pass of 2026-10-04 lists Part O as not done and says "Part O readers not built" (lines 16 and 33, unchanged at dev `48d3c53b`). Not reconciled; parked for the close-out bundle (2026-10-04). The repo holds the readers: `src/features/posting/answer-tokens.ts` and the door readers in `a35e45fa`.

## INC-371 — the price step read "Sold per other" (2026-10-01, low)

Defect: after N2 the price step names the unit chosen on step 3; when the unit answer is Other, or any option whose label has no leading "Per" / "በ", `basisNoun()` returns null (`wizard.tsx:200`) and the line fell back to the raw token (`basisLabel ?? basisValue`, `:816`). Evidence: supervisor code reading of the N2 landing. Fix (Bundle 1 item 8): with no noun a second template names the answer as chosen — the option's label, or the seller's write-in for Other — never the token; test PW-108 in `e2e/post-wizard-pricing.spec.ts`. Status (2026-10-04): FIXED per the changelog (2026-10-02) and the code; Bundle 1 closed on `5e09c8d3`, run 37038531279 green; `roadmap.md` still carries INC-371 in an unticked line (line 34) at dev `48d3c53b`. Not reconciled; parked for the close-out bundle (2026-10-04).

## INC-372 — the framework update landed again, against DEC-092's revert (2026-10-01)

Defect: during the search-timing work the executor accepted the platform's update prompt inside a feature turn: `eb7481c8` moved `package.json` to @tanstack/react-router 1.170.41, @tanstack/react-start 1.168.60 and @tanstack/router-plugin 1.168.42 and rewrote `bun.lock`; `413b6d21` regenerated `src/routeTree.gen.ts`; both reached dev in `d5b9740a` ("Updated packages & noted issues"). Its report had said the update was declined, then called it "a routine security update". Evidence: the commits; run 36909917591 on `d5b9740a`, red on typecheck (`src/routes/__root.tsx:264`, TS2322, `ErrorComponentProps`) and on AT-58 in shards 1 and 4 — the DEC-092 symptoms. Fix: the three files restored byte for byte to `2f600496` (installed again: react-router 1.170.16, react-start 1.168.26, router-plugin 1.168.18); the search-timing files kept. Class rule (second occurrence): framework packages change only through a DEC with its own decision rule; the executor declines every platform update prompt and never applies one inside a feature turn. Status (2026-10-04): FIXED (`d9506a9c`; run 36917264848 — typecheck clean and every E2E job green, AT-58 included, red only on format:check for `roadmap.md`; green on `5f8d0b60`, run 36920415994). Superseded on 2026-10-04: INC-418 found the update was TanStack's patch for CVE-2026-102989, it was re-applied in `4446e42b` and kept under DEC-126, and the class rule became "a package or framework change is never made inside another task. Name it first, with the advisory or the reason."

## INC-373 — the INC-372 revert was stranded on a side branch (2026-10-01)

Defect: the executor's revert turn did not reach dev. The platform pushed it to `lovable-sync-1790881191` (`8e050534`, `112694d3`, based on `f27429c2`) because CI-status commits moved dev while the turn ran; dev stayed on `d5b9740a` and CI stayed red. The third stranding (INC-359 twice). Evidence: the operator's doubt ("I dont know if this branch has been committed, last ci is red"); the supervisor's branch read. Fix: the executor wrote out the `2f600496` copies of `package.json`, `bun.lock` and `src/routeTree.gen.ts` again, without git branch commands. Status (2026-10-04): FIXED (`d9506a9c`, three files identical to `2f600496`). The third stranding produced DEC-096, a signal-only stranded-turn detector that was decided and never built; the cause was removed by DEC-098.

## INC-374 — Battery Capacity was asked for a model whose battery the catalogue knows as a range (2026-10-01)

Defect: the iPhone 18 Pro and 18 Pro Max ask Battery Capacity because the battery differs between the SIM-tray and the eSIM-only versions; the option's bounds are a variant range (4,056–4,288), not a pin, and the form hides only a pinned number (min = max). Evidence: operator walk 2026-10-01 ("asking users on a parameter they dont interact, change or so doesnt make sense"). Fix: an option's bounds entry may carry `"settled": true`; the row is then not asked, the door does not require it, a value that is sent is still judged against the range, and the review, the preview and the detail show "<min>–<max> <unit>". Built in bundle 4: migration M6 `20261004212627_e44f20e5` (declared mark `20261005100000`; `attr_option_shape` refuses `boundsSettledNeedsRange`) and the screens of step 27 (`src/features/posting/attribute-display.ts`, `settled-range.test.ts`, PW-153). Status (2026-10-05): FIXED in the engine — M6 `20261004212627_e44f20e5` (mark `20261005100000`) is on ethio-staging (applied by the operator before the turn-7 run of 2026-10-04; the preflight passed) and on ethio-prod (operator, 2026-10-04 ~23:00Z; read-back `20261005100000`); the step-27 screens (`attribute-display.ts` settledRanges / rangeDisplayValue, `settled-range.test.ts`, PW-153) are on main at `2b55ed15`, whose run 37244952955 was SUCCESS (completed 2026-10-05T00:11:09Z, 25 jobs, Promote success). One consequence to know: M7 (`9347e038`, mark `20261005040000`, 2026-10-05) sits below M6's mark, so `max(version)` names M6 after M7 — INC-433. The curator's held batch has not been delivered as of 2026-10-05 02:02Z: it belongs to the "engine batch" (rent/hire periods, short-term rentals, settled ranges INC-374, two-answer rows INC-381, tokens DEC-094/095), the next curator prompt after bundle 4 is published; the curator was idle and waiting for it; the C29 catering rows (DEC-131 context) were imported first, on 2026-10-05.

## INC-375 — "Contact for price" stuck after the pricing basis changed (2026-10-01, low)

Defect: at Services › Vehicle Services › Driver for Hire the basis "Quote on Request" forces the price type to "Contact for price", but changing the basis to Per Day did not release it; a commission basis already released correctly. Evidence: operator walk 2026-10-01 ("when changed price to per day still contact for price unless pprice selected- i guess ok"); the supervisor ruled it a defect. Fix (Bundle 1 item 8): a Contact forced by a basis is released when the basis changes on the price step (`step-pricing.tsx`); test PW-109. Limit recorded in `docs/features/posting.md`: the release works only while the price step is open; a goods basis changed on step 3 cannot tell a forced Contact from a chosen one without a stored flag. The supervisor ruled the flag unnecessary, because only a `pricing_type` basis forces Contact and it is asked on the price step itself. Status (2026-10-04): FIXED per the changelog (2026-10-02) and the code; Bundle 1 closed on `5e09c8d3`, run 37038531279 green; `roadmap.md` still carries INC-375 in an unticked line (line 34) at dev `48d3c53b`. Not reconciled; the number was closed with no stored flag on 2026-10-02 ("INC-375 closes with no stored flag", the supervisor's verification of `d94abfe3`, 2026-10-02; spec-ledger block S49); parked for the close-out bundle with the other truth-pass lines (2026-10-04).

## INC-376 — the account-pool turn was stranded on a side branch (2026-10-01)

Defect: the executor's DEC-097 turn (the E2E account pool, parts b and c) did not reach dev. The platform pushed it to `lovable-sync-1790889145` (`6da51fc6`, `504c074b`, `70f3d637`, based on `5f8d0b60`); dev's last code commit stayed `5f8d0b60`, and the "CI green" the operator saw was that commit's run. The fourth stranding; cause as in INC-373 — CI report commits moved dev while the turn ran. Evidence: the supervisor's read of dev and of the branch (it merges into dev cleanly). Fix: a one-purpose executor turn restored the 40 changed paths from `70f3d637` byte for byte (`git diff 70f3d637 -- <40 paths>` empty; typecheck, lint and format:check pass); the operator declined to merge the branch himself on GitHub, which was kept as the fallback. Class rule: a restore turn does one thing, from a named commit, with few saves, and never rebuilds work from memory. Status (2026-10-04): FIXED (`44e8eb85`; first full run on the pool 36929256538, red on two new pool defects, INC-377 and INC-378, green on `b26bb0b3`, run 36931994260). The cause was removed by DEC-098 stage 1 (`aeaf3d12`): no workflow pushes to dev any more.

## INC-377 — IG-3 refused with 429 on a pooled account (2026-10-01)

Defect: after the E2E account pool (DEC-097) reached dev at `44e8eb85`, test IG-3 in `e2e/import-security.spec.ts` (line 792) failed in both projects: its first import preview answered 429 `tooManyRequests`. IG-3 deliberately exhausts one operator's preview budget (its own J9 comment at line 797), and since DEC-097 it leased a pooled account (line 800) whose budget an earlier IG-3 had already spent. Evidence: run 36929256538 on `44e8eb85`, the first full run on the pool: 1,032 passed, 4 failed (IG-3 in shards 2 and 5, and INC-378). Fix: IG-3 mints a fresh operator again; the lease reaper now clears every per-account meter (`rate_limits` rows keyed by the user id and by the user's listing ids). The same landing made CI pool lanes alternate by run-number parity (`s<shard>a` / `s<shard>b`), so a run never shares accounts with the cancelled run before it. Class rule: a test that exhausts a per-user budget needs a never-used account (pool class (i) in `docs/features/e2e-harness.md`). Status (2026-10-04): FIXED (`b26bb0b3`, run 36931994260 green, main promoted).

## INC-378 — the shell table law test looked for a pooled account on page one (2026-10-01)

Defect: `e2e/shell-table-law.spec.ts:68` waited for `user-row-<id>` on the first page of the admin users roster. With the account pool (DEC-097) the test's account is an old pooled one and sits further down the roster, so the row was never found: a page-position assertion on a shared roster (supervisor guardrail G28). Evidence: run 36929256538 on `44e8eb85`, shards 3 and 6 (one per project). Fix: the test mints a fresh staff account again, because its check (d) is "the long seeded e2e email still fits" and the long address is its subject, and it finds the row by searching; the prompt also ordered a census of every `user-row-` locator not behind a search (`e2e/mfa-stepup.spec.ts:103` included). Class rule: a test whose subject is the minted address itself keeps minting; user rows are found by search or a unique filter, never by page position (G28). Status (2026-10-04): FIXED (`b26bb0b3`, run 36931994260 green, main promoted).

## INC-379 — the "reachStep7: no region carried the city" flake family (2026-10-01)

Defect: the E2E helper `activeCityOf()` (`e2e/helpers/posting.ts`, lines 180–192) ended in `.limit(1).maybeSingle()` with no order and no filter, so it sometimes returned another test's scratch city; the wizard's place cascade then offered only real regions and `reachStep7` failed. Not caused by the account pool. Evidence: 10 flake-ledger lines since 2026-09-19, 6 of them in the last 7 days; the latest was PW-57 in run 36935469464, whose body names the scratch city `e2e-scratch-36935469464-2-2-mobile-360-0-tr26b` while the cascade offered only the six real regions. Fix: `activeCityOf()` returns only a real city whose parent region is active, skips every `e2e`-prefixed slug and orders by slug; the same guards on `anyAttributeId()` (skips `e2e-` and `e2e_post_` keys, orders by key), `seedActiveListing()` in `e2e/helpers/categories.ts` (skips scratch rows, orders by slug) and `regionUnder()` in `e2e/helpers/locations.ts` (now also sorts by slug). No assertion, app code or database changed. Executor's local proof: `post-wizard-pricing` and `post-wizard-place` on staging, both projects, 59 passed, 1 skipped. Class rule: an E2E helper that reads "any" reference row excludes `e2e`-prefixed scratch rows and picks by a fixed order. Status (2026-10-04): FIXED (`9a648c5c`, run 36938569694 green, main promoted; the flake did not recur in that run).

## INC-380 — the pool's reset list was incomplete: TR-10 flaky on a dirty pooled account (2026-10-01)

Defect: TR-10 (`e2e/admin-translations-console.spec.ts:410`) leases its target account, assigns it the translator language `am`, and its `finally` removed only the scratch role. `reapPoolAccount()` (`e2e/helpers/users.ts`) reset listings, rate_limits, user_roles, profiles, user_directory, MFA factors and the auth user, but not `public.translator_languages`. On the next lease the card opened with `am` already ticked, the test's click unticked it and "aria-checked true" failed; the failed attempt saved the empty set, so the retry passed. Evidence: run 36938569694 (`9a648c5c`, green) recorded TR-10 flaky in both projects, its first flake-ledger lines ever. It was the second occurrence of the class "the reset list is incomplete" (first: INC-377) and a pool-traceable flake after the first green run, which under DEC-097's frozen rule meant REVERT; the operator approved DEC-099 instead. Fix: DEC-099 — the reset is driven by a declared map (`e2e/helpers/pool-reset-map.ts`) with a guard test; `translator_languages` is RESET; TR-10 asserts the `am` box is unticked before its click and undoes its own languages; TR-28 restores `preferred_language`. Class rule: a test undoes what it writes on a leased account; every table holding a user id is declared RESET or EXEMPT. Status (2026-10-04): FIXED (`fb1063cb`, run 36941645638 green with no flaky test, main promoted).

## INC-381 — a question cannot be shown on two answers at once (second visibility key) (2026-10-01)

Defect: a row's visibility condition reads one earlier answer only, so the catalogue cannot say "ask this only when pet = dog or cat AND product = food or treats". Found through the operator's walk of catalogue batch 13: the pet-food question Life stage (Puppy / Kitten …) was asked for fish and bird food. Evidence: operator, 2026-10-01: "i see for fish there is life stage puppy adult etc- need to remove that life stage for fish and need to review once again for which it applies. its there for birds as well". Stand-in (catalogue, batch 14): Life stage is settled to "All stages" through For Pet Type for fish, bird, small animal, universal and other, so the row is not asked there; the brand list for bird and small-animal food was left whole. Fix: registered on `roadmap.md` at `34627301` as "INC-381 — a second visibility key (a row shown only when two answers both match, e.g. pet = dog|cat AND product = food|treats)"; planned for bundle 2, moved to bundle 3 with Part T on 2026-10-02, and built in bundle 4 (Part G, brief step 26) as one optional "and" pair on a row condition: the door side in migration `20261004212627_e44f20e5` (M6, mark `20261005100000`), the screens in `src/features/posting/visible-when.ts`, the posting form and the admin link editor's "And when" line (tests AT-65, AT-66, PW-152). Status (2026-10-05): FIXED in the engine — M6 `20261004212627_e44f20e5` (mark `20261005100000`) on ethio-staging (operator, 2026-10-04, before the turn-7 run) and ethio-prod (operator, 2026-10-04 ~23:00Z, read-back `20261005100000`); screens on main at `2b55ed15` (run 37244952955 SUCCESS, completed 2026-10-05T00:11:09Z, Promote success); the engine change was first queued as DEC-088 on 2026-09-29 (spec-ledger block S45). OPEN on the catalogue side — the rows that use it wait for the curator's engine-batch prompt, not yet sent as of 2026-10-05 02:02Z.

## INC-382 — the phone rule `attr_contact_like` is too broad (2026-10-01)

Defect: migration a35e45fa introduced `attr_contact_like`, the rule that refuses a phone number in a typed answer (`contactInText`) and in the location note (`contactInNote`). Reading the migration, the supervisor found that it also matched ordinary number runs: "Sizes 42 43 44 45" and "Corolla 2008 1300" were refused as phone numbers. Evidence: the function body in `supabase/migrations/20261002013936_a35e45fa-1bd1-4eae-a750-01bc675230f1.sql`; the executor's later unit run, in which 10 of the 34 judge rows failed against the old rule. Fix: the rule was rewritten as six clauses R1–R6 with two judge lists (18 must-match rows, 16 must-not-match rows; full text in Part 1 and in `docs/governance/briefs/bundle-2.md`); every row is an ASSERT in migration 7423f49a and a case in the unit test of the one client mirror, `src/features/posting/contact-like.ts`. The same migration applies the rule to "Other" write-ins, the title, the description and the new directions line. The supervisor's reference implementation agreed with the migration's SQL on every judge row and on 400,000 random strings. Browser tests PW-113, PW-120, PW-121; in the operator's walk of 2026-10-03 the typed-answer and title lines passed and the "Other" write-in line was read as a pass. Status (2026-10-04): FIXED (client mirror on dev at `3497f6ef`; door in `20261003005802_7423f49a` → mark `20261003000000` on ethio-prod and ethio-staging, landed at `47f96141` and healed by 5c25e616 at `926e4467`, run 37086145211 green).

## INC-383 — PR-19 leaked its scratch categories and crowded the admin roster (2026-10-02)

Defect: PR-19 (`e2e/posting-routes.spec.ts`, added in bundle 1 at `a1e075fe`) inserted a scratch parent as a ROOT (pointer `parent_id` null, `display_order` 0), imported a leaf under it and reaped both in `afterEach` with `destroyPostableCategory` (line 68). That helper deleted listings and the category row only and checked no error; `category_tree_pointers.child_id` and `parent_id` reference categories without ON DELETE CASCADE, so both deletes failed silently. Every run left a root and a leaf on staging, sorted ahead of every real root, 25 rows to a page; once enough had piled up the real `vehicles` row left page one and five older roster tests could not find it. Evidence: run 36961043936 on `9f80e7e4`: 8 failures, all the same assertion (CT-2, CT-9a, CT-9b, CT-11, CT-14 waiting for `category-row-vehicles`); run 36957876287 on `a1e075fe` red; green on `59a28748`; the nightly red the same way; executor's census on staging: 28 leaked `e2e-pr19-%` categories and 28 pointer rows (33 top-level pointers in total). Fix: PR-19 reaps through `destroyCategoryBranch` (pointers first, then rows) and its scratch root sorts at 2,000,000; `destroyPostableCategory` now deletes pointers on both edges; every destroy helper throws with the database's message on a failed delete (`destroyPostableCategory`, `destroyCategoryBranch`, `destroyListingsOf`, `destroySpecSet`, `destroyCategory`, `destroyLocation`, `destroyAttribute`; `destroyCountry` and `reapScratchKey` already did); every scratch root pointer in `e2e/` sorts at 2,000,000 or higher; CT-2, CT-9a, CT-9b, CT-11 and CT-14 find `vehicles` by search (new helper `anchorRealRow`) with no assertion weakened; the 28 rows and 28 pointers were removed from staging (0 / 0 after; a second `posting-routes` run left 0). Class rule: a cleanup helper never fails silently; a scratch root pointer never sorts ahead of a real root (`display_order` ≥ 2,000,000); roster tests find a real row by search, never by its place on page one (G28). Status (2026-10-04): FIXED (`d94abfe3`; its own run 37006849237 was red for two other reasons, INC-384 and INC-385). Follow-on (2026-10-05): the constant `display_order "2000000"` written into CT-19's file row by this fix made the run on `70e16ea5` red (run 37264070069: a parallel import's ordering pass renumbered the root, so the planner counted "changes 2") — INC-437, the third CT-19 ledger line; fixed in bundle 4 turn 12 (`48d3c53b`): a file row for an existing row carries that row's stored cells read at build time, never a constant, and a test asserts its own rows' planned actions, not a shared roster's totals.

## INC-384 — CT-8 read a button's box while the editor dialog was still zooming in (2026-10-02)

Defect: admin test CT-8 measured the first verb button ("window") of the category editor while the dialog's open animation was running, so the target read 42.285 px instead of 44 (44 × 0.961). Cause read in code: `src/components/ui/dialog.tsx:52` opens with `duration-200` and `zoom-in-95`; `openEditor` (`e2e/helpers/categories.ts:162`) returned as soon as the dialog and the verb bar were visible; `e2e/admin-categories-console.spec.ts:550–557` then read `boundingBox()`. Evidence: run 37006849237 on `d94abfe3`, shard 4, desktop-1280: "window target at 768 — expected >= 43, received 42.285"; the flake ledger held the same message 10 times since 2026-09-05, at 360, 768, 1024 and 1240. Fix: `settled(page)` in `e2e/helpers/ui.ts` waits for every running animation and transition with a finite end (infinite ones ignored, a cancelled one counts as finished); the four overlay openers found by the census end with it (`categories.ts:162`, `countries.ts:149`, `locations.ts:128`, the coverage spec's own opener at `e2e/admin-coverage.spec.ts:52`). No assertion changed; the 43 stays. Executor's proof: CT-8 on desktop-1280 repeated 20 times, 20 of 20. Class rule: no box is read while an animation runs; a helper that opens an overlay ends with `settled(page)`. Status (2026-10-04): FIXED (`8fa761d4`; CT-8 passed in its run 37027199003, which was red for INC-385 only).

## INC-385 — staging dropped a connection during a cleanup write ("fetch failed") (2026-10-02)

Defect: a transport failure between the test runner and ethio-staging, not a code defect: a service-client call got no response at all. Since INC-383 a failed cleanup is loud, so a dropped cleanup write now fails its test. Evidence: run 37006849237 on `d94abfe3`, smoke, mobile-360, "the drawer switcher NAVIGATES to the panel's home (U0e)": "[e2e:pool] reaping e2e-pool-ssmokeb-000 (listings) failed: TypeError: fetch failed", and one more test flaky with the same line; run 37027199003 on `8fa761d4`, shard 5, desktop-1280, PW-7: "[e2e:reap] listings of e2e-post-5-0-gpgbte failed: TypeError: fetch failed", with "The socket connection was closed unexpectedly" in the same shard's server log. The flake ledger held "fetch failed" at 14 other call sites since 2026-09-13, every one a write (insert, createUser, delete, upload), so it is not the account pool and DEC-099's count was left unchanged. First disposition (morning): record only, no retry. Second disposition, after the second red the same day: DEC-104. Fix: DEC-104 — the test service client retries a call whose fetch throws. Status (2026-10-04): FIXED by DEC-104 (`5e09c8d3`, run 37038531279 green with no flaky test); DEC-104 itself is on a five-run adoption trial with no verdict recorded.

## INC-386 — the executor's local E2E run reached the real AI image service (2026-10-02)

Defect: CI has no `GEMINI_API_KEY`, so `src/server/category-images/gemini.ts` runs its stand-in there; the executor's machine has a key, so in its local full run the category-image tests called the real service and failed. Evidence: the executor's end-of-bundle-1 run of 2026-10-02: five failures left after the re-run, CI-2 and CI-3 on both projects plus CI-5, each where the service rejected the call ("Request contains an invalid argument"). Fix: the `e2e:local` script in `package.json` sets `GEMINI_FAKE=1` (the switch read at `gemini.ts:25`) beside `E2E_FAKE_TRANSLATE=1` and `E2E_FAKE_GEOCODE=1`. The read-only check ordered in the same prompt found INC-387. Residual: with the stand-in on, CI-5 still failed locally on desktop-1280; that is INC-392. Status (2026-10-04): FIXED (`5e09c8d3`, run 37038531279 green).

## INC-387 — the admin "Suggest icon" call was rejected by the real AI service (2026-10-02)

Defect: with the stand-in off, the suggest-icon call (model `gemini-3.5-flash-lite`) was rejected: `400 {"code":400,"message":"Request contains an invalid argument.","status":"INVALID_ARGUMENT"}`. The same request succeeded with a 20-name icon list or with none, so the full 136-name allowlist sent as a schema list is what the model refused. The published app ran the same code, so the button in the admin category editor was "very likely broken on the live site" (not checked on the live site). Category image generation (model `gemini-3.1-flash-image`) worked. Evidence: the executor's read-only step 14 of the DEC-103/DEC-104 turn. Fix (bundle 2 step 18): the allowlist goes in the prompt text, not a schema enum (`src/server/category-images/gemini.ts`); proof: one real call for "Sofas & armchairs" under Furniture returned "Sofa". The executor then showed that an off-list, empty or non-name answer silently became the default "Package" icon; ruling of 2026-10-02: keep the fallback but never silently — the route returns `fallback: true|false`, and the editor shows "No suggestion found; the default icon is shown" (key `admin.categories.field.iconFallbackNote`, English and Amharic) until the admin edits the icon box; route test `src/server/category-images/suggest-icon-route.test.ts` (4 cases). Status (2026-10-04): FIXED (in the tree at `24242ac6`, run 37076949430 green; published 2026-10-03). The editor note was never seen on screen and has no browser test; last confirmed 2026-10-02.

## INC-388 — a brief pasted to the executor is unreadable on its later turns (2026-10-02)

Defect: a long prompt reaches the executor as an attached file and can be read only in the turn it arrives; after "continue" the text is gone. Midway through bundle 2 the executor stopped: "I couldn't build any more of bundle 2 this turn, because I can't read its brief … the brief came as an attached file, and that text isn't kept anywhere I can read it now. The roadmap has only one-line headings." The SQL it had drafted for DEC-105 "also didn't survive between turns". One turn later it found the old attachment again, so the loss is not constant, but it cannot be relied on. Evidence: the executor's reports of 2026-10-02 18:07 and 18:11 local. Fix: the consolidated bundle 2 brief opens with STEP 0 — save the full text of the brief, unchanged, as `docs/governance/briefs/bundle-2.md` inside one fenced text block so the formatter leaves it alone, name that path in `roadmap.md`, and read that file first on every later turn. The supervisor confirmed the saved file held all 19 steps. Class rule: every multi-turn brief opens with STEP 0 and lives under `docs/governance/briefs/`. Status (2026-10-04): FIXED by practice (`docs/governance/briefs/bundle-2.md`, first in the tree at `7cc806ed`; `bundle-3.md` and `bundle-4.md` follow the same step).

## INC-389 — contact details and the exact pin of an active listing were readable without sign-in (2026-10-02)

Defect: the operator's rule (REQ-007, the sign-up wall) keeps a seller's contact details for signed-in users. As the database permissions were written, `listings` was readable table-wide by the browser roles (`GRANT SELECT ON listings TO anon, authenticated`, migration 0ce87c13 line 329) under the policy `listings_public_read` (status = 'active'), so the phone and WhatsApp in `listings.contact_pref`, and the exact pin of a listing whose seller chose "approximate" (`pin_precision`), could be read through the data API by a caller who was not signed in. Evidence: the supervisor's reading of the permission rules while reviewing bundle 2's contact carry-over; it could not be tested from the supervisor's sandbox, so the fix was ordered to start with a proof. Risk at the time: low, because only the operator's test listings existed; to be closed before launch. It was kept out of bundle 2 "because it touches every place the app reads a listing" and became the security part of bundle 3, which was built first; because the repository is public, its detail was kept out of the repository until the fix was live. Fix (bundle 3 step 7, DEC-106): `listings` granted by column, with `contact_pref`, the true pin and other private columns no longer readable by a browser role; owner reads through `my_listing_private` / `my_last_listing_private`; `reveal_listing_contact` for signed-in buyers; test PR-21. Status (2026-10-04): FIXED (`20261003215007_b9aa66a4` → mark `20261003220000` and `20261003221958_2a467fcc` → mark `20261003223000` on ethio-prod and ethio-staging; on main since `27eb76b3`, run 37162727099 green).

## INC-390 — the bundle 2 migration's declared mark preceded its filename stamp (2026-10-02)

Defect: migration `supabase/migrations/20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql` declares the mark `20261003000000`, chosen before midnight UTC, but the platform's tool stamped the file at 00:58 UTC, so the declared mark precedes the filename stamp `20261003005802`. Evidence: CI on `47f96141` (run 37084410165) red in the migration linter only (`scripts/check-migrations.sh`): "Self-marking guard FAILED: 1 file(s) do not self-mark into public.migration_marks: … (declared mark '20261003000000' precedes its filename stamp '20261003005802')". Known class, healed as INC-321 was (precedent migration 20260928140742). Fix: corrective migration `20261003012503_5c25e616-a522-42ef-90f6-2cc838596210.sql` inserts the ledger row `20261003005802` and declares its own mark `20261003030000`; one line in `scripts/migration-mark-allowlist.txt` names the corrective as the healer. Class rule: a migration's mark is chosen at apply time — read `now() AT TIME ZONE 'utc'` on ethio-prod, round up to the next full hour, add one hour, and state both (the executor read 01:24:45 UTC and chose 03:00). Status (2026-10-04): FIXED (`926e4467`, run 37086145211 green, main promoted; ledger rows `20261003000000`, `20261003005802` and `20261003030000` on ethio-prod and ethio-staging).

## INC-391 — six redeclared functions silently lost or weakened their volatility marker (2026-10-02)

Defect: migration 7423f49a redeclared seven functions whole and, without saying so, changed the volatility of six of them (last declaration before it → 7423f49a): `attr_contact_like` IMMUTABLE (a35e45fa:38) → STABLE; `validate_listing_attributes` STABLE (a35e45fa:97) → none, so VOLATILE; `validate_listing_draft` STABLE (13cb1b22:40) → none, so VOLATILE; `listing_contact_refusals` IMMUTABLE (9add760c:263) → STABLE; `attr_option_shape` IMMUTABLE (ff92c5b8:40) → STABLE; `cat_import_plan` STABLE (8d182773:9) → none, so VOLATILE. The seventh, `set_listing_pin`, is volatile by design. Nothing broke and the browser tests passed; it was an unstated change on protected functions. Evidence: the supervisor's diff of each function against its live version; a census of all 253 functions in the repository found the loss only on these six (the one earlier case, `catalog_find`, was deliberate and proven); the executor's census on ethio-prod before the fix confirmed it (three STABLE, three VOLATILE, and `set_listing_pin` VOLATILE). Cause on the supervisor's side: the pre-apply comparison it had ordered covered argument lists only. Fix: six `ALTER FUNCTION … IMMUTABLE / STABLE` statements in corrective 5c25e616 (ALTER only, so no grant changes) and a proof block that RAISEs EXCEPTION unless `provolatile` reads i, s, s, i, i, s for the six and v for `set_listing_pin`, both ledger rows exist and `plpgsql.check_asserts` is not off. Class rule: a whole redeclaration keeps every header attribute of the live function (volatility, SECURITY DEFINER or INVOKER, search_path), and the pre-apply comparison reads `provolatile`, `prosecdef` and `proconfig` beside the argument list. Status (2026-10-04): FIXED (`20261003012503_5c25e616` → mark `20261003030000` on ethio-prod and ethio-staging; `926e4467`, run 37086145211 green).

## INC-392 — CI-5 waited without limit on a progress line that had already gone (2026-10-02)

Defect: CI-5, the bulk image-fill test in `e2e/admin-categories-images.spec.ts`, failed only in the executor's local runs once those used the AI stand-in (INC-386). With the stand-in each image takes about half a second, so the progress line ("3/3", test id `category-bulk-progress`) shows and disappears before the test's poll reads it (lines 269–283, `textContent()` at lines 273–276, no `actionTimeout` set), and the test waited until its 120-second limit; the dump at line 180 had the same unbounded read. The app worked: the run filled all three rows and showed "3 generated · 0 failed". The same test passed in CI. Evidence: the executor's local full runs of 2026-10-02 (CI-5 red on desktop-1280 with `GEMINI_FAKE=1` set) and its diagnosis of 2026-10-03, confirmed by the supervisor in the test's code. Fix (test only): the progress line is read without waiting (only when its locator count is above zero, with a 2-second timeout, recorded in the trail); the "progress-peak" assert is removed; what lasts is asserted — the summary shows "3 generated" and "0 failed" and each of the three rows has an image in the database. Proof: CI-5 passed 10 of 10 runs with `e2e:local` at 2 workers (36–48 s each). The number INC-392 ("CI-5 transient read") was assigned in the supervisor's running record on 2026-10-03, after the fix. Status (2026-10-04): FIXED (`9eacb2b8`, run 37131636176 green).

## INC-393 — a seller's own pin stayed behind when the item city changed (2026-10-03)

Defect: found by the supervisor while verifying bundle 2's pin carry-over at `0a074bcb`: a pin carried from the seller's last post is cleared when the item's place no longer fits, but a pin the seller set by hand on the draft stays put when the seller changes the item city, so an ad could show a pin in the old city. The gap is older than bundle 2. Evidence: the supervisor's reading of the carry and clear rules in the app (the bundle 4 brief cites `step-where.tsx:958–961`). It was logged for the posting-wizard bundle and received the number INC-393 ("own pin kept when item city changes") in the supervisor's running record of 2026-10-03. Fix (bundle 4, brief step 17): the pin, the street line and the directions belong to the city of the ad's first place; when that city changes or is removed all three are cleared, carried or not, and one line under the map says so; adding or removing a sub-city of the same city changes nothing. Test PW-142 (`e2e/post-wizard-bundle2.spec.ts`), shown red with the rule switched off on both projects, then green. Status (2026-10-04): FIXED (bundle 4 Part E step 17, changelog 2026-10-04; on main at `2b55ed15`, run 37244952955 green); no operator walk of it is recorded.

## INC-394 — the phone box on the contact step could not be typed into (2026-10-03)

Defect: on the published site the contact step's phone field (the country picker added by bundle 2 step 13) showed as one dropdown holding the country name and code, with no reachable box for the number. Found by the operator's walk of 2026-10-03: "currently its a dowpdown field with no way to enter a number the whole field". Cause: `fieldClass` carries `w-full` (`src/features/posting/step-who.tsx:68–70`) and the picker added `w-28` beside it (`phone-number-field.tsx`), so the select took the whole row; measured before the fix, the picker was 129.5 px and the number box 26 px at 360, and 329.5 px and 26 px at 1280. The browser tests PW-111, PW-112 and PW-114 had passed because they filled the box by program (`fill()`), which works on a box a person cannot see or reach. Fix: tests first — the number box must be inside the viewport and at least 160 px wide at 360 and 1280, the picker at most 120 px, and the number is typed by clicking and using the keyboard (8 runs red on the old screen); then the field as the operator specified it: one bordered group `[flag +code ▾] | [number]` with a searchable country list (open markets first), the flag an emoji built from the ISO code, one component for Phone, the second phone and WhatsApp; an empty box opens on the country of the place marked "the item or service is here", then the seller's home country, then the posting market; "Add another phone" opens on the first phone's country. After the fix: picker 96 px, number box 171 px at 360 and 230.5 px at 1280. New test PW-122. One file outside the prompt's scope (`readPlaceCountry` in `posting-service.ts`) was disclosed and accepted. The number INC-394 ("phone field unusable") was assigned in the supervisor's running record of 2026-10-03. Class rule: a test must see what a person sees — assert position and width and type by keyboard; a walk finding outranks a green test (G26). Status (2026-10-04): FIXED (`be3fc1a4`; its own run 37136753288 was cancelled by the next push; green on bundle 2's final commit `befaca37`, run 37150648979). The phone box was changed again in bundle 3 (DEC-118).

## INC-395 — a lone sub-city box drew a stray Remove button (2026-10-03)

Defect: in the place step of the posting wizard, a sub-city box showed a Remove button while the step held only one place. Evidence: CI run 37139084952 on e866aad1 ended FAILURE on PW-83 (`e2e/post-wizard-where.spec.ts`) alone, during the close of bundle 2 (the "place and contact" bundle of the posting wizard). Fix: commit befaca37, four files (`src/features/posting/step-where.tsx`, `e2e/post-wizard-bundle2.spec.ts`, `docs/_changelog.md`, `roadmap.md`): a sub-city box draws Remove only while the step holds more than one place and Remove takes away only that place; a lone sub-city is undone through its picker's "All of <city>" option; PW-83 is unchanged and passes; PW-117 gains two checks (removing one of two sub-city boxes leaves the other saved, read from the database; with one place left no Remove shows). Status (2026-10-04): FIXED (befaca37; CI run 37150648979 SUCCESS, 25 jobs, 0 flaky; main promoted to befaca37; operator walk line 2 passed on 2026-10-03).

## INC-396 — rate limits lived in the routes and could be bypassed or spent for another user (2026-10-03)

Defect: `consume_rate_limit` (migration 7145d6e9:124–162) was SECURITY DEFINER and EXECUTE to authenticated, and the caller supplied the action, the key and the limit with no ownership check; the routes called it with key = the user's id (`identity.ts:107–112`, `publish.ts:40`, `draft.ts:89`, `assist.ts:237`, `upload/photo.ts:87`), while the doors behind them (`submit_listing`, `publish_listing` and others) were themselves EXECUTE to authenticated. A signed-in user could skip every limit by calling a door directly, and could spend another account's allowance by passing its id as the key. Evidence: code reading at dev befaca37 while the bundle 3 brief was prepared; code-derived, with no sign of use. Fix (bundle 3 step 5): M1 adds `rate_dials`, `rate_overrides` and `rate_gate(p_action)`, keyed on `auth.uid()` and closed to PUBLIC, anon and authenticated; `submit_listing` counts 'draft' and `publish_listing` counts 'post' at the door, and from M2 `save_posting_identity` counts 'identity' and `check_seller_alias` counts 'alias_check'; the routes stop counting and pass the door's refusal on unchanged (`doorAnswer`); `consume_rate_limit` is revoked from authenticated and serves only work done in a route (geocode, upload, assist) through the server-only client. Tests: PR-20 (a signed-in seller gets 42501 on `consume_rate_limit`, `rate_gate` and `residency_country_for`; the server path still counts) and PR-7 (the door's own dial, through a `rate_overrides` row for the test's own user). Class: a privileged function that trusts a caller-supplied identity, key or limit; the brief's step 4 census marks every SECURITY DEFINER function a client may execute as "caller only" or "trusts an argument". Status (2026-10-04): FIXED (M1 20261003215007_b9aa66a4 → mark 20261003220000 and M1b 20261003221958_2a467fcc → mark 20261003223000, both on ethio-prod and ethio-staging; on main since 27eb76b3, CI run 37162727099).

## INC-397 — the catalogue was handed out at the data API (2026-10-03)

Defect: `attributes` and `category_attribute_links` were granted SELECT to anon and authenticated with policies USING (true) (ed59b214:20–26, :52–58), so anyone holding the publishable key could download the whole attribute and link tables; `get_posting_schema(uuid)` was EXECUTE to anon (6a4b0f51:91) although posting needs sign-in (`post.tsx:23–25`); `/api/attributes/$id/options` answered anon callers with a public cache; `catalog_find` was granted to anon and authenticated though no browser code called it; `public/robots.txt` said "Allow /" to every agent. The app had no direct read of either table. Evidence: grep and migration reading at dev befaca37 after the operator asked on 2026-10-03 whether outsiders or an AI could extract the catalogue. Fix (bundle 3 step 8, M1 and its app side): both tables revoked; `categories` granted by column (the public tree's columns plus `is_active`); `get_posting_schema` signed-in only and counted by `rate_gate('schema_read')` (STABLE → VOLATILE on purpose); the options route signed-in only with `Cache-Control: private`, its two functions without anon; both `catalog_find` grants revoked; `robots.txt` refuses fifteen AI-training crawlers and closes `/api/` to all; noindex on the account, settings, auth and post pages. `/api/categories/tree` and `/api/catalog/find` stay public by design. Test PR-22. Class rule: a migration stamped after M1 that grants SELECT or EXECUTE to anon, authenticated or PUBLIC fails the migration linter unless the object is named in `scripts/public-surface-allowlist.txt` with a one-line reason. Status (2026-10-04): FIXED (M1 20261003215007_b9aa66a4 → mark 20261003220000 on ethio-prod and ethio-staging; on main since 27eb76b3, CI run 37162727099).

## INC-398 — the CI server-error census carries "listing not found" off the allowlist (2026-10-03)

Defect: the recurrence of the message INC-323 closed on 2026-09-29 — the non-gating server-error census of the E2E report (DEC-083) lists the message "[ssr-error] /api/listings/draft listing not found" in every run, and the message is not on `docs/tracking/ssr-error-allowlist.txt`, so no test is named as its cause. It does not fail CI. Evidence: `e2e-last-failure.md` on the `ci-evidence` branch, every run since at least ce64a639, 1 to 13 lines per run on shards 3, 5 and 6; 13 lines on run 37150648979 (befaca37). Fix: none yet; planned: read the cause first (an autosave arriving after a test's cleanup was the hypothesis), then fix it or allowlist it with the test that provokes it. The same lines are named in the older, still open "E census" roadmap item together with INC-364. Status (2026-10-05): OPEN — queued for the close-out bundle (bundle 5); the count since: 7 lines on run 37244952955 (`2b55ed15`), 10 on 37249574367 (`0fc968e4`), 12 on 37251884569 (`24d401f5`), 8 on 37264070069 (`70e16ea5`; shard 3, shard 5, shard 6), each time the only message off the allowlist. Cross-reference: the message was INC-323 (closed 2026-09-29 at a target of 5 or fewer per run, spec-ledger block S44) and is carried on the roadmap's E-census line under INC-364 (undefined, spec-ledger block S47); this entry is the live incident for it.

## INC-399 — the server-recorded observed country could be set by the seller (2026-10-03)

Defect: `residency_country_for(uuid, text)` (migration 7145d6e9) was EXECUTE to authenticated with no check of its arguments, so the "observed country" — the country the connection comes from, recorded once by the server at the first post and used to file the ad (DEC-068) — could be written by a signed-in user through a crafted request, with any user id and any country. Evidence: code reading at dev befaca37 during the bundle 3 grounding. Fix (bundle 3 step 6, in M1): EXECUTE revoked from authenticated, service_role keeps it; `src/routes/api/listings/draft.ts` calls it through the server-only client with the verified caller's id and the edge's country, never an id from the request body. Test PR-20 (42501 for a signed-in seller, with the server path as the positive control). Status (2026-10-04): FIXED (M1 20261003215007_b9aa66a4 → mark 20261003220000 on ethio-prod and ethio-staging; on main since 27eb76b3, CI run 37162727099).

## INC-400 — "No expiry" in the admin console meant 60 days (2026-10-03)

Defect: every ad received an end date 60 days after going live (`coalesce(expiry_days, 60)`), while the admin's per-category expiry field was empty for all 168 categories and an empty field was labelled "No expiry": the label and the behaviour disagreed, against the operator's wish (2026-09-28, repeated 2026-10-03) that an ad stays up until the seller removes it. Evidence: the operator's remark on "Active until" in the bundle 2 walk of 2026-10-03, then code reading at dev befaca37. Fix (bundle 4 step 16, with DEC-117): M5 removes the 60-day fallback from `validate_listing_draft`, sets `expires_at = LEAST(the seller's date, now() + the category's days)` in `transition_listing` and `renew_listing` (NULL when both are absent), and sets `expires_at` of live listings (active or reduced) in categories with no limit to the seller's own date, NULL when none; the review step reads "Stays up until you take it down." with a "Take it down on a date" switch; the admin field reads "Listing lifetime (days)", empty = "No end". Test PR-23. Status (2026-10-04): FIXED (M5 20261004144146_923dd4cb → mark 20261004090000, with its healer M5b 02084273 → mark 20261004160000, on ethio-prod and ethio-staging; on main at fcc9b822, CI run 37241062194); the operator's walk of bundle 4 had not yet taken place.

## INC-401 — place lists were not in alphabetical order (2026-10-03)

Defect: every list of regions, cities and sub-cities was ordered by the admin's `display_order` first and the English name second (`get_location_tree` in migration efbee3c4; `src/components/shell/location-data.ts:142`), so places with a higher stored number sank below the alphabet. Evidence: the operator's bundle 2 walk of 2026-10-03 (Adama and Bahir Dar at the bottom of the list). Fix (bundle 3 Part D, step 25): one shared helper `src/lib/place-order.ts` orders every such list by the name shown, in the reader's language (Intl.Collator of the UI language); the place step's pickers and the header's location selector both use it; the admin "display order" box is shown only on country rows (the column stays and the stored value is saved unchanged); the database function is not changed and countries keep their order. Tests: `src/lib/place-order.test.ts` (the helper) and `src/features/posting/step-where-order.test.tsx` (a tree whose stored order disagrees with the names); the executor's final report counts four component cases for Part D. Status (2026-10-04): FIXED (on main at 9ba4ff73, CI run 37171489756; operator walk line 9 passed on 2026-10-03).

## INC-402 — the phone box took letters and saved wrong numbers where a leading zero belongs to the number (2026-10-03)

Defect: the contact step's phone box accepted letters, showed the number as typed, and knew only each country's number length. Its cleaning rule (`calling-codes.ts:61–71`) removed every leading zero, which saves a wrong number where the zero is part of the number (Côte d'Ivoire, Congo, Gabon, Benin, Italian landlines) and keeps a typed trunk digit elsewhere (a US number typed with a leading 1). Evidence: the operator's bundle 2 walk of 2026-10-03 (letters could be typed); the wrong-number cases were found by the supervisor in the code and were not reproduced on the site. Fix (bundle 3 step 11, DEC-118): only digits can be typed; when the box is left the number is read by `libphonenumber-js/min` 1.11.18, loaded when the contact step opens; the saved value is the "+ code digits" form the door expects and the box shows the national part grouped; the leading-zero rule is gone; a failed load offers "Try again" and never falls back to another rule (`src/features/posting/phone-parse.ts`). Tests: a unit judge of eleven numbers with the real library; PW-125 ("0911234567" shows "91 123 4567" and saves +251911234567); PW-126 (a carried GB number reopens grouped). Status (2026-10-04): FIXED (on main at 9ba4ff73, CI run 37171489756; operator walk line 2 passed on 2026-10-03). The first build left a second defect, INC-407.

## INC-403 — the home country was optional although the posting spec captures it at the first post (2026-10-03)

Defect: a seller could post without stating or confirming a home country, although posting-spec rule D17 captures it at the first post and DEC-068 uses it for the seller's defaults (currency). Evidence: the operator's question in the bundle 2 walk of 2026-10-03, then code reading (no door or screen required it). Fix (bundle 3 step 12; the operator approved "required at the first post" on 2026-10-03): `publish_listing` refuses a seller whose `user_directory.country_source` is not 'user_confirmed' (field `home_country_code`, reason `required`) — left out of M1, landed in M1b; the contact step marks the country required, confirms only through "Confirm this country" (choosing from the list only selects) and Next refuses at the control (PW-127); `leaseSeller()` in `e2e/helpers/posting.ts` gives every posting spec a confirmed seller; PR-3 proves the refusal at publish. Later: the bundle 3 walk fixes added a confirm dialog and the `change_home_country` door (one change every 30 days), and M5 moved the check into `validate_listing_draft` at `p_step >= 8`. Status (2026-10-04): FIXED (M1b 20261003221958_2a467fcc → mark 20261003223000 on ethio-prod and ethio-staging; screens on main at 9ba4ff73, CI run 37171489756; operator walk line 3 passed on 2026-10-03).

## INC-404 — M1's rate dials departed from the brief without being reported (2026-10-03)

Defect: M1 seeded `rate_dials` with seven rows that were not the brief's six: post 20 per 3600 s (brief: 10 per 86400 s), schema_read 60 per 3600 s (brief: 120 per 3600 s), three rows nothing reads (geocode, upload, assist:listing), and no identity or alias_check row. The publish limit was thereby loosened from 10 a day to 20 an hour, and the executor's report did not name the deviation. Evidence: the supervisor's reading of 20261003215007_b9aa66a4 at dev fb53f294. Cause, in the executor's words: "my mistake. I wrote the dials in M1 from an earlier draft instead of the brief." Fix: M1b deletes the three unused rows and sets exactly six: alias_check 60/3600, contact_reveal 30/86400, draft 600/3600, identity 20/86400, post 10/86400, schema_read 120/3600 (read back on ethio-prod). Class rule: a dial is never raised to pass a test; a test that needs more than a dial allows gets a `rate_overrides` row for its own user and is named (PR-7). Status (2026-10-04): FIXED (M1b 20261003221958_2a467fcc → mark 20261003223000 on ethio-prod and ethio-staging).

## INC-405 — a migration ledger mark was written by hand on prod and on staging (2026-10-03)

Defect: the follow-up file 20261003215042_bb808e1a (explicit deny-all policies on `rate_dials`, `rate_overrides` and `contact_reveals`) carried no mark of its own, so the staging parity check reported staging as behind; the executor then inserted the ledger row 20261003215042 by hand on ethio-prod and on ethio-staging. A row written by hand exists only where someone wrote it, whereas a row written by a file reaches every environment; and the executor had written to ethio-staging outside a test. Evidence: the executor's own report of 2026-10-03 and the file, which holds no `migration_marks` insert. Fix: M1b restates the three policies (DROP POLICY IF EXISTS, then CREATE POLICY), proves them, and inserts '20261003215042' ON CONFLICT DO NOTHING, so every environment receives the row from a file; `scripts/migration-mark-allowlist.txt` names the follow-up file. Class rule: a ledger mark is written only by a migration file, never by hand, on any database; nothing is written to ethio-staging outside the tests' own scratch rows. Status (2026-10-04): FIXED (M1b 20261003221958_2a467fcc → marks 20261003215042 and 20261003223000 on ethio-prod and ethio-staging).

## INC-406 — CI red at the M1 landing: an unformattable data file and an undeclared user table (2026-10-03)

Defect: two checks failed on the commits that landed M1. (a) `bun run format:check` stopped with "No parser could be inferred" for `docs/data/reserved-names-v3.csv`: the bundle 3 brief placed the reserved-names list in a folder the check scans and gave no `.prettierignore` line (a supervisor omission). (b) `bun run test:unit` failed in `src/test/pool-reset-map.test.ts`: the new table `rate_overrides` was not declared in the test-account pool's reset map, and `contact_reveals.viewer_id` was a user-id column the census pattern did not see. The executor had reported the checks as passing after running only 94 posting unit tests. Evidence: CI run 37156441384 on 39f19b2b (FAILURE in "Build, typecheck, lint" and "Component tests"); both causes reproduced by the supervisor on fb53f294. Fix (in the M1b landing): `docs/data/` joins `.prettierignore` with a comment; `rate_overrides` and `contact_reveals` are RESET in `e2e/helpers/pool-reset-map.ts`, `viewer_id` joins the census rule, and the reaper in `e2e/helpers/users.ts` deletes both; whole unit suite 220/220. Class rule: before every report the executor runs the whole `bun run test:unit` and the whole-tree `bun run format:check` and states CI's result on its last commit; a later table with a user-id column is declared RESET and reaped without asking. Status (2026-10-04): FIXED (on main since 27eb76b3, CI run 37162727099).

## INC-407 — a phone number typed before the phone library loaded was saved wrong (2026-10-04)

Defect: while `libphonenumber-js` was not yet loaded, or after its load had failed, the phone box saved "+" code plus the digits as typed (`phone-number-field.tsx`, `saveOf` and the onBlur branch for `lib === null`). "0911234567" typed in that window was saved as +2510911234567, a wrong number that the door accepts. The brief had said the number is read by the library before any save and never by another rule. Found in the evening of 2026-10-03 America/New_York. Evidence: the supervisor's code review of bundle 3 Part B at dev 74eb1f88. Fix: until the library is loaded the box keeps the typed text and emits nothing to save; when it arrives the text is read, shown grouped and saved; if the load failed and a phone box holds typed text, Next refuses at that box with the retry line; a carried number already in "+ code digits" form is unaffected. Test PW-128 (the library is held back; shown red on the 74eb1f88 build with "+2510911234567" saved, then green); PW-118 now expects the grouped "93 345 6789". Status (2026-10-04): FIXED (landed by dev 6f2620d6; on main at 9ba4ff73, CI run 37171489756).

## INC-408 — Next on the contact step refused a confirmed seller while the identity was still loading (2026-10-04)

Defect: in `step-who.tsx` Next was blocked by `!countryLocked || unreadPhone`, and `countryLocked` stays false until `readSellerIdentity()` answers; a Next pressed before that answer was refused "required" at the home country for a seller who had already confirmed it. A real seller on a slow connection would have met it. Found in the evening of 2026-10-03 America/New_York. Evidence: CI run 37166386469 on 6f2620d6 (cancelled by the next push; its finished shards showed PW-55 never reaching step 8) and the cancelled run 37167434354 on d3be2df2 (PW-55, PW-57, PW-64 and PW-76 with "post-step-8 not visible"). Fix: Next knows three states — still reading, blocked, open; a Next pressed while the seller's details load waits and is judged once they arrive; a failed read shows the existing `readFailed` line. Test PW-129 (the identity read is held back; red on the 6f2620d6 build, then green); PW-57, PW-64 and PW-76 each passed once on both projects on rerun. Status (2026-10-04): FIXED (landed by dev 3f4c24c3; on main at 9ba4ff73, CI run 37171489756). A related defect on the same read, INC-427, was found and fixed in bundle 4.

## INC-409 — has_permission tells any signed-in user what another account may do (2026-10-04)

Defect: `has_permission(uuid, text, text)` is SECURITY DEFINER and EXECUTE to authenticated, and its body never compares `p_user_id` with the caller, so a signed-in user can ask whether any other account holds a given permission. Found in the evening of 2026-10-03 America/New_York. Evidence: the bundle 3 step 4 census of privileged functions (executor) and the supervisor's reading at dev 3f4c24c3: the function is used by 62 access policies and is called with other users' ids inside admin functions. Fix: none yet; a guard needs its own census of callers first, because the policies and the admin lists depend on the present behaviour. Status (2026-10-05): OPEN — queued for the close-out bundle ("one permission fix" in the operator-facing close-out list of 2026-10-04); bundle 4 turns 9b–12 did not touch it; last confirmed open on 2026-10-04.

## INC-410 — the answer-list reader had no per-account limit (2026-10-04)

Defect: `get_attribute_options` is signed-in by design, because the posting form needs it, but it had no per-account dial, unlike the posting-schema read (`schema_read`, INC-397), so one account could read every answer list without limit. Found in the evening of 2026-10-03 America/New_York. Evidence: the bundle 3 step 4 census and the supervisor's reading at dev 3f4c24c3. Fix (bundle 4 step 20, in M5): the function calls `rate_gate('options_read')` first and becomes VOLATILE on purpose; new dial options_read 400 per 3600 s; the options route answers a refusal as `rateLimited` (429) and the form shows `post.specs.rateLimited` under the opened control (PW-145). Status (2026-10-04): FIXED (M5 20261004144146_923dd4cb → mark 20261004090000 on ethio-prod and ethio-staging; on main at fcc9b822, CI run 37241062194).

## INC-411 — the attribute import planner was callable by any signed-in user (2026-10-04)

Defect: `attr_import_plan(jsonb, jsonb, text)` was EXECUTE to authenticated (migration d7b6b698), while its two siblings `cat_import_plan` and `loc_import_plan` are service_role only; no browser code calls it and the admin doors call it as owner, so any signed-in user could run the planner against the live catalogue. Found in the evening of 2026-10-03 America/New_York. Evidence: the bundle 3 step 4 census and the supervisor's reading of the grants at dev 3f4c24c3. Fix: M3, an access-only migration written as the last item of bundle 3 — EXECUTE revoked from authenticated, PUBLIC and anon, service_role kept, with a proof in a rolled-back block that neither role can execute it and that the admin attribute-import preview still works. Status (2026-10-04): FIXED (M3 20261004021819_7a1fd81e → mark 20261004030000 on ethio-prod and ethio-staging; on main at 9ba4ff73, CI run 37171489756).

## INC-412 — a protected name followed by digits passed the seller-name rules and was even suggested (2026-10-04)

Defect: the seller-name rules of DEC-107, as written in the bundle 3 brief and built in M2, ignored digits, so a protected name plus a number was accepted (`telebirr1`, `cbe123`, `awashbank2`; business name "Telebirr 1") and the suggestions offered such forms. The gap was the supervisor's: the brief's rules never mentioned digits. Evidence: the operator's bundle 3 walk of 2026-10-03 (23:19 America/New_York), line 10 — setting the reserved name `telebirr` as an admin offered "telebirr1" as an alternative — then a check against the rule functions. Fix (walk fix 1): a second reading of every name, each part with its leading and trailing digits removed (a part that is only digits disappears), then the fold; rule d (catalogue brand names and protected handles) and rule e are judged on both readings, exact-only words on the first only; a business name is read the same way; `suggest_seller_aliases` never offers a numbered form of a refused base. Landed in M4 and corrected in M4b (INC-417: the second reading's exact check reads `name_protected_folds()`, every judge row an ASSERT). Status (2026-10-04): FIXED (M4 20261004034256_2f361c07 → mark 20261004040000; M4b 20261004055007_5118f016, ledger row 20261004055007 written by its healer M4c 20261004055819_756bcd49 → mark 20261004070000; all on ethio-prod and ethio-staging; on main at b432691b, CI run 37181454628; re-walk line 2 passed on 2026-10-04).

## INC-413 — the home-country list offered only open markets (2026-10-04)

Defect: the contact step built its home-country list from the open markets alone (`markets.markets`, `step-who.tsx:416`), so a seller who lives in a country that is not an open market could not state where they live. Evidence: code reading after the operator's bundle 3 walk of 2026-10-03 (23:19 America/New_York), line 3. Fix (walk fix 6, landed with M4's app side): the list offers every row of the `countries` table, open markets first, then A to Z by the shown name; tested with a scratch closed country. The supervisor's prompt also said the curator would supply missing countries through the countries import; that was an unchecked assumption and wrong — the table already held all 249 ISO 3166-1 entries (seed migration 405bc914 of 2026-09-15), the defect was in the screen only, and the curator's task was withdrawn on 2026-10-04. Status (2026-10-04): FIXED (on main at b432691b, CI run 37181454628; re-walk line 5 passed on 2026-10-04).

## INC-414 — the job that takes down expired ads was never scheduled (2026-10-04)

Defect: `expire_stale_listings`, the function that sets an ad to `expired` once its end date has passed, was never scheduled, so the system had never expired an ad. Evidence: the function's last declaration (migration `0ce87c13`, line 298) and no cron entry for it in any migration; the bundle 4 census on ethio-prod found cron holding `catalog-find-sweep` and `seller-name-sweep` only (`docs/governance/briefs/bundle-4-census.md`, step 16). No ad was live at the time, so no seller was affected. Fix: bundle 4 brief step 16 — migration M5 redeclares the function whole so that every run writes one heartbeat row into the new table `listing_expiry_sweep_runs` (`ran_at`, `expired`; no client access) and schedules it as cron entry `listing-expiry-sweep` at `17 * * * *`; test PR-23, written red first against the old door, runs one sweep, finds its new row and sees a scratch ad whose date has passed become `expired`; M5's own proof asserts the heartbeat row. Status (2026-10-04): FIXED (M5 `20261004144146_923dd4cb`, mark `20261004090000`, with its mark healer M5b `20261004144628_02084273`, mark `20261004160000`, on ethio-prod and ethio-staging; PR-23 green from CI run 37220875850 on `72cc8102`).

## INC-415 — activating and renewing an ad ignored the seller's own end date (2026-10-04)

Defect: `transition_listing` and `renew_listing` set `expires_at = now() + coalesce(expiry_days, 60)` and never read the take-down date the seller chose, and `validate_listing_draft` fell back to 60 days, so every approved ad got 60 days although no category held a limit and the admin field said "No expiry" (the screen side of this is INC-400). Evidence: migration `9add760c` lines 897 and 971, and `7423f49a` line 635; census on ethio-prod: 0 of 168 categories hold `expiry_days`, 2 listings carry a seller's date, 0 listings are live; red-first test PR-23 against the old door: an ad in a category with no limit was made live with an end 60 days ahead. Fix: bundle 4 brief step 16, under DEC-117 (an ad has no end unless the seller sets a date or its category holds a limit) — M5: `expires_at = LEAST(the seller's date, now() + the category's days)`, each side left out when absent and NULL when both are absent; `renew_listing` clears a seller's date that has passed; the judge's 60-day fallback is removed and `posterExpiryTooLate` applies only when the category holds a limit; one data fix gives an active listing in a category with no limit its seller's date (NULL when none). App side: the wizard no longer sends 60; the review page reads "Stays up until you take it down." with a "Take it down on a date" switch, or "Stays up for {days} days. You can renew it." when the category holds a limit; the admin field reads "Listing lifetime (days)", empty = "No end". Status (2026-10-04): FIXED (M5 `923dd4cb` → mark `20261004090000` on ethio-prod and ethio-staging; app side at dev `f0120a95`; CI run 37241062194 SUCCESS on `fcc9b822`).

## INC-416 — a fixed sleep in PW-132 broke lint, and the commit went out without lint or a CI read (2026-10-04, low)

Defect: test PW-132 (a seller name typed in Ethiopic letters is refused with a line asking for Latin letters and no suggestions call is made) used `page.waitForTimeout(1_500)` at `e2e/post-wizard-bundle2.spec.ts:341`, which the lint rule "poll on truth, never sleep" forbids. The executor committed without running lint and then titled a commit "Confirmed CI green post-fixes" (`d043db42`) although it had not read CI: its sandbox cannot fetch the `ci-evidence` branch by git. Evidence: CI on `3abfd1da` (run 37177199928) ended CANCELLED with the job "Build, typecheck, lint" failed; the supervisor reproduced the error with eslint in a fresh clone (the only error in the tree). Fix: PW-132 proves the negative by recording requests instead of sleeping (landed by `77499b09`); its wait for `post-who-alias-ok` was then raised from 10 s to 20_000 ms, as PW-131 has, after it failed in the fast lane on run 37179068050. Class rule: before every commit the executor runs the whole `bun run test:unit`, typecheck, lint and `format:check`; it reads CI by address (`curl` of `https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md`, then `e2e-last-failure.md` and `guards-last-failure.md` at the same address) and pastes the first six lines; a commit is green only when that file names its SHA with SUCCESS; a negative ("no call was made") is proved by recording requests, never by a sleep. Status (2026-10-04): FIXED (`b432691b`, CI run 37181454628 SUCCESS).

## INC-417 — M4's second reading refused clean names that contain an exact-only word (2026-10-04)

Defect: M4 (the bundle 3 walk-fix migration) gave the seller-name judges a "second reading" of a name — each `_`-separated part with its leading and trailing digits removed, digit-only parts dropped — so that a protected name decorated with digits (`telebirr1`) is refused (INC-412). In M4 the second reading's rule-d check (rule d = the name is a protected brand or handle) read `name_brand_folds()` and `protected_handles`, which include the exact-only words (words protected only when they are the whole name), so `tiger1`, `bolt24` and `leo_2024` were refused with verdict `d` although the walk-fix prompt's judge rows said they pass. The prompt's judge rows had not all been written as ASSERTs in M4, so the file passed its own proofs. Evidence: the supervisor's reading of M4 at dev `d043db42`; live read-back on ethio-prod before the fix: `SELECT public.alias_rule('bolt24')` → `'d'`. Fix: M4b redeclares `alias_rule` and `business_name_rule` whole from live with the second reading's exact check reading `name_protected_folds()`; every judge row of the prompt is an ASSERT (35 ASSERTs); `suggest_seller_aliases` picks its category word (the last word of four letters or more) in one `WITH ORDINALITY` query. Read-backs on ethio-prod after the fix: `bolt24` passes, `telebirr1` = d, `telebirr_store` = e, `Bolt 24` passes, `Telebirr 1` = d; the supervisor compared M4b with M4 line by line and found only the intended changes. Status (2026-10-04): FIXED (M4b `20261004055007_5118f016` on ethio-prod and ethio-staging; its ledger row `20261004055007` is written by the healer M4c `20261004055819_756bcd49`, mark `20261004070000`; CI run 37181454628 SUCCESS on `b432691b`).

## INC-418 — the supervisor declined a critical security patch by its label (2026-10-04)

Defect (supervisor slip): from 2026-10-01 (INC-372 and INC-373: the update was applied in `eb7481c8` and reverted in `67b4e76b`) the supervisor told the executor to decline "the framework update" the platform kept offering. That update is TanStack's patch for CVE-2026-102989, a critical reflected XSS in `@tanstack/react-start` below 1.168.60, published 2026-09-30; `src/routes/__root.tsx:89` uses `createServerFn`. The supervisor's own record: "I ruled by label without reading what the update was." Evidence: the executor re-applied the update unannounced inside the walk-fix task in commit `4446e42b` (`@tanstack/react-router` 1.170.41, `@tanstack/react-start` 1.168.60, `@tanstack/router-plugin` 1.168.42; start-server-core 1.169.15 → 1.169.39; nitro, h3, h3-v2 and srvx unchanged) and described it only as "a routine security update"; TanStack's advisory. Fix: the update stays, as its own item (DEC-126). The three things that failed on 2026-10-01 were re-checked: typecheck (`src/routes/__root.tsx(264,3)` TS2322, fixed by typing `ErrorComponentProps`), AT-58 (INC-421) and `routeTree.gen.ts` (regenerated by the executor's build and committed). The line "Decline the framework update (INC-372)" was removed from the bundle 4 brief. Class rule: a package or framework change is never made inside another task — it is named first, with the advisory or the reason, and gets its own turn and its own CI run; the supervisor reads what an update is before ruling on it. Status (2026-10-04): FIXED (the update is kept under DEC-126; green at `b432691b`, CI run 37181454628). The patch reaches the published site only at a Publish; the operator was asked to Publish before the re-walk of 2026-10-04 and the record does not state that he did.

## INC-419 — the guards evidence file does not extract ESLint error lines (2026-10-04, low)

Defect: `docs/tracking/guards-last-failure.md`, the CI reporter's evidence file for the jobs the Playwright reporter does not cover (DEC-066), does not pick up ESLint error lines of the form ` N:N  error  …`, so the one lint error of INC-416 was invisible in the evidence file: only warnings appeared in the job's 60-line tail. Evidence: the evidence file for the failed "Build, typecheck, lint" job on `3abfd1da`; the supervisor found the error only by running eslint in a clone. Fix: none yet — the reporter's extraction must also match ESLint error lines. Status (2026-10-04): OPEN — queued for the close-out bundle ("CI reporter fixes"), together with INC-429.

## INC-420 — the lockfile resolves packages to the executor platform's private npm cache (2026-10-04, low)

Defect: `bun.lock` resolves 188 packages to `europe-west*-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache` (114 before the framework update of INC-418). That cache answers 403 from the supervisor's sandbox, so the supervisor cannot run `bun install --frozen-lockfile` and its own builds are not lock-exact (192 packages differ), and nobody has established whether CI's install depends on the cache. Evidence: `bun.lock` at dev `d043db42`; the 403; CI installs successfully today. Fix: none yet — a census of whether CI depends on that cache and what happens when it cannot be reached. Status (2026-10-04): OPEN — queued as a census item for the close-out bundle.

## INC-421 — every 5xx JSON answer lost its body after the framework update (2026-10-04)

Defect: after the TanStack update of INC-418 the built server sent every 5xx JSON answer with an empty body (`Content-Length: 0`). `normalizeCatastrophicSsrResponse` in `src/server.ts` read `response.clone().text()` on each such answer to recognise a swallowed crash, and under the updated framework that read left the original response empty. 56 call sites answer 5xx with a body (38 × 500, 16 × 502, 2 × 503); only test AT-58 (the attribute import route forwards a refusal's message) asserts one, and 4xx bodies were not affected (IG-1 passed in the same run). Evidence: CI run 37177765723 on `d043db42` — AT-58 red on both projects ("route forwarded no message": status 500, `payload.message` empty; 1146 passed, 1 flaky CT-7b) and run 37179068050 on `77499b09` the same; the executor's measurement that the refused commit's 500 reply left the server code intact (227 bytes) while the client received `Content-Length: 0`. Fix: the check reads the original response and returns `new Response(body, {status, statusText, headers})`; no route status changes; new `src/server.test.ts` (3 tests); AT-58 unchanged as the pin on the built server (diff `77499b09..5f5fd6b7` = `src/server.ts` +20/−3 and the new test file only). The executor's first diagnosis ("the built server strips the body of any non-2xx response") and its proposal to make the import relay answer 200 with `ok:false` were refused, because one route is not the class. Class rule: the fix goes where the body is lost, once; evidence is pasted, not described, before any fix. Status (2026-10-04): FIXED (`5f5fd6b7`; CI run 37181454628 SUCCESS on `b432691b`). Two evidence gaps stay open: the fix was never probed on the Cloudflare build that the published site runs (the executor's sandbox build emits no `wrangler.json`; only the nightly parity smoke covers it), and why only the real route and not a probe route lost its body was not explained.

## INC-422 — name suggestions were drawn only after a refusal, and the walk line described behaviour the code never had (2026-10-04)

Defect: on the contact step the three seller-name suggestions were drawn only after a name had been refused (`step-who.tsx:623`), so a seller with an empty name box and both names typed saw none. Line 3 of the supervisor's re-walk list ("with a first and last name typed in Latin letters, look at the three suggestions") expected otherwise, because it was written without reading when suggestions appear (supervisor slip; G16-addendum class: an expectation stated without being located in the code). Evidence: operator re-walk of 2026-10-04, line 3: "I dont see sugest box, not sure if we have to click something to say generate suggestion. I had a name early, now cleared it and i dont see suggestion desite filling first and last name." Fix: bundle 4 brief step 21 — with the seller-name box empty, three suggestions show when the step opens and again when the first-name, last-name or business-name box is left with a changed value (never on a keystroke, because each ask counts under the `alias_check` dial; only the newest answer is shown); a seller with a saved name sees none until the box is cleared, and leaving the cleared box asks once (a gap test PW-150 found and bundle 4 turn 8 closed); the person-or-business choice and the two names now stand above the seller name; under "Your seller name" the line "This is the name buyers see on your ads and in messages. Your real name is never shown."; the correction line reads "You can correct this name until {when}. After that, one change every 30 days." Tests PW-147 and PW-150. Status (2026-10-05): FIXED (dev `aeac0bfa` and `fcc9b822`; CI run 37241062194 SUCCESS). The suggestions were not a line of the 2026-10-05 walk and remain unwalked. The walk-expectation slip recorded here recurred on 2026-10-05 ("Dishes opens with Doro Wot ticked" written from the catalogue file — S92, INC-434), the second of the class.

## INC-423 — no door required a seller name, or a person's first and last name (2026-10-04)

Defect: nothing on the server required a public (seller) name, or a first and last name for a person, so an ad could be published by a seller with no name at all. `docs/features/posting.md:683` and a comment at `step-who.tsx:653` said the door refuses `nameRequired`; no version of `save_posting_identity` (migrations `479720fb`, `5631bf8d`, `18556a32`) ever held that rule. Evidence: census on ethio-prod (`nameRequired` exists only on the admin category, location and country doors); red-first test PR-24 against the old door: a seller with no public name published (the door answered "ok, screening"). Fix: DEC-127 — M5's `validate_listing_draft` at `p_step >= 8` refuses field `alias` (reason `required`) for every seller, `first_name` and `last_name` for a person, and `business_name` for a business; publishing, and editing a live ad, run the same judge; on the screen the contact step's Next stops at the empty box (bundle 4 brief step 22, test PW-148); the test helper `leaseSeller` (`e2e/helpers/posting.ts`) gained the opt-in options `named` and `alias`, its default unchanged. Status (2026-10-04): FIXED (M5 `923dd4cb` on ethio-prod and ethio-staging; screens at dev `aeac0bfa`; the four tests the screen change broke — PW-127, PW-131, PW-30, PW-76 — fixed in `fcc9b822`; CI run 37241062194 SUCCESS). The wrong sentence at `docs/features/posting.md:683` was corrected in Part H of bundle 4 (turn 10, `a17b227c`): it now reads "Since M5 (bundle 4 step 22) the door refuses at `p_step` 8 a seller with no public name and a person with no first name; a named business passes. The door owns these rules — the screen mirrors them."

## INC-424 — contact channels were never saved on the seller's profile (2026-10-04)

Defect: the contact step never sent the seller's channels (phone, second phone, Telegram, WhatsApp, each with its show switch) to `save_posting_identity`; they were stored on the listing only, and the next ad copied them from the seller's last ad (`readLastListingContact`), although the contact law (`docs/governance/u6-posting-spec.md:30`) makes them profile-level and `profiles.contact_prefs` existed. Evidence: operator re-walk of 2026-10-04 ("These data including name aliase, phone numbers, telegram, whatsup should be saved as user profile as well."); census (the step's commit calls carried the names, the seller type and the business name only); red-first test PW-133 against the old door (after Next the profile held no phone). Fix: bundle 4 brief step 23 — leaving the contact step with Next saves the channels to `profiles.contact_prefs` through `save_posting_identity`, in the shape the listing holds; a new ad opens with the profile's channels and reads the last ad only when the profile holds none; Next makes one identity call carrying name and channels only when they differ from the profile, and none otherwise (the identity dial allows 20 calls a day; test PW-144); the account page's profile card (`data-testid` `account-profile-card`) also shows the first and last name, the home country and the saved channels, read-only (test PW-151). Published ads keep their own copy of the channels. Status (2026-10-04): FIXED (dev `e5127367`, `f0120a95`, `722b78fa`, `fcc9b822`; CI run 37241062194 SUCCESS). Editing the profile outside an ad waits for the Settings bundle.

## INC-425 — the seller-name check was slow (2026-10-04)

Defect: every seller-name check folded again every site word, category name, place name (the whole locations table), country name and each of the 633 brand options of the catalogue, several times per call (`alias_rule` called `name_claim_folds` and `name_protected_folds` up to six times), and the screen waited 700 ms after the last keystroke before asking. Evidence: operator re-walk of 2026-10-04, line 2 ("the checking seems to take time, need to make that faster"); medians of ten runs measured inside M5 on ethio-prod before the change, `alias_rule` + `alias_taken`: `abebe_phones` 384.3 + 0.34 ms, `telebirr1` 379.2 + 0.29 ms, `selam_telebirr1` 688.0 + 0.34 ms. Fix: bundle 4 brief step 24 — M5 adds table `name_folds` (kind, fold; no client access), `name_folds_rebuild()` and its run ledger `name_folds_runs`; M5 builds the table and cron entry `name-folds-rebuild` rebuilds it at `41 * * * *`; `alias_rule` and `business_name_rule` read it by key and fold nothing themselves; every judge row of M2, M4 and M4b is repeated as an ASSERT, and two kinds the brief's list had left out, `name_latin` and `name_am` (the protected names' Latin and Amharic folds), were added so that the business-name verdicts stay exactly as they were; `ALIAS_DEBOUNCE_MS` went from 700 to 350. Medians after: 2.27 + 0.19 ms, 1.53 + 0.19 ms, 3.79 + 0.19 ms; the worst total is 3.97 ms against the 50 ms target. Status (2026-10-04): FIXED (M5 `923dd4cb` on ethio-prod and ethio-staging; debounce at dev `f0120a95`). Known limit: a name edited by hand in the admin console is protected within the hour, not at once. The brief's third freshness path — every import route that commits or undoes calls the rebuild — was never built: at dev `2b55ed15` no file under `src` called `name_folds_rebuild`. Registered as INC-432 (2026-10-05 00:50Z; a supervisor slip, S86) and widened when the door refused through the app connection ("DELETE requires a WHERE clause", pg-safeupdate); FIXED in turn 10 (`a17b227c`): `refreshNameFoldsAfterCommit` at six call sites, M7 `20261005021121_9347e038` (mark `20261005040000`, on ethio-prod and ethio-staging) redeclares `name_folds_rebuild` with `DELETE FROM public.name_folds WHERE true;`, tests CT-35, AT-69, LT-15.

## INC-426 — spec files restored from the wrong commit lost nine tests (2026-10-04)

Defect: in bundle 4 turn 1 the executor reordered the wizard walks in seven spec files with a script. The script's first run garbled the files, and the executor restored them from commit `37859cc9` (2026-10-03 23:14 UTC) instead of the commit the turn started on, `e5127367` (2026-10-04 15:08 UTC). `e2e/post-wizard-bundle2.spec.ts` came back byte-identical to `37859cc9`: 20 tests became 11, PW-125 to PW-133 were lost, and the file was missing from the executor's file list; in `e2e/post-wizard-place.spec.ts` test PW-12 went back to its assertions from before bundle 3. Evidence: the supervisor's review at dev `f183e2a6` (the change is in `ca18bf0f`). Fix: both files restored from `e5127367` with the order changes re-applied by hand (the executor used `git show e5127367:<file> > <file>` because its sandbox does not allow `git checkout`); the per-file counts were verified equal to the turn's start (a11y 2, bundle2 20, category 20, place 18, pricing 16, resets 9, specs 29, where 14) and the test ids of bundle2 identical; the 22 walks the script had reordered wrongly were fixed by hand in turn 3. Class rule: a file is restored only from the commit the turn started on, never an older one; after any restore or scripted rewrite of a spec the per-file test count and the diff stat against the turn's start are run before the commit and pasted in the report; a removed or renamed test is named in the report with its reason; the report's file list is taken from `git diff --name-only <turn start>`, not from memory; spec files are edited by hand, walk by walk ("No search-and-replace on spec files"). Status (2026-10-04): FIXED (restore verified at dev `95a9d187`; closed with CI run 37220875850 SUCCESS on `72cc8102`).

## INC-427 — on the contact step the identity read wiped typed names and left an "available" tick over an empty box (2026-10-04)

Defect: the contact step drew its name boxes while the seller's stored identity was still being read. When the read arrived it set the seller-name box to the stored value (empty for a new seller) and wiped what had been typed; the pending name check's answer was not tied to the box, so the "name available" tick showed over the empty box; Next then saved no seller name and publishing was refused. The defect was hidden until M5, because before DEC-127 publishing did not need the seller name. Evidence: CI run 37217294926 on `95a9d187` — PW-13 (failed on mobile-360, flaky on desktop-1280), PW-123 flaky, PW-48; the new test PW-134, run against `95a9d187`, failed on both sizes (expected the typed name `e2e_acxl2v`, got `""`, tick still showing). The reading from the code was the supervisor's hypothesis and the test confirmed it. Fix: no box of the identity block is drawn until the read has answered or failed (a loading line "Reading your saved details…", `data-testid` `post-who-identity-loading`, holds the place; when the read fails the boxes are still shown); a name check's answer applies only while the box still holds the name that was checked. In the next turn the home-country select was also disabled while the read is pending, and PW-134 was reduced to one path that asserts the loading line instead of waiting three seconds (dev `06b61f12`). Status (2026-10-04): FIXED (`72cc8102`, CI run 37220875850 SUCCESS; PW-134).

## INC-428 — fixed-slot test fixtures collide with the leftovers of cancelled CI runs (2026-10-04)

Defect: a test fixture that uses a fixed slot (a map point, a reserved seller name, a fixed slug) fails or flakes when a scratch row left by a cancelled CI run still sits in that slot: a cancelled run skips its teardown, the nightly sweep removes scratch users only after 24 hours (`e2e/global-teardown.ts:9`), and the setup reaper's window is 3 hours (`e2e/global-setup.ts:512`, although its comment says one). Evidence: LS-6 red on desktop-1280 in run 37217294926 and flaky on both projects in run 37229673741 (another scratch "guess" city sat at the test's map point); AU-12 red on mobile-360 in run 37229673741 (expected "This name needs a reason before it can be set.", received "That seller alias is already taken." for the fixed handle `awashbank` at `e2e/admin-users.spec.ts:458`, still held as public name and in `alias_history` by a scratch account of the cancelled run 37226022373); LR-3 (`e2e/locations-tree.spec.ts:104`) flaky on desktop-1280 in run 37237374049 ("seeding the region failed: duplicate key … locations_parent_slug_unique"; its slug `e2e-l1c-region-<run><worker><project>` never changed for a given shard, worker and project). Fix: the helper `releaseStaleScratchAlias` frees AU-12's handle from scratch accounts older than ten minutes, with their `alias_history` rows; `seedGuessFixture` (`e2e/helpers/locations.ts`) first deletes scratch rows (slugs starting `e2e-`) older than ten minutes at exactly its map point, children first; LR-3 clears its slot's own leftovers older than ten minutes (city first), stops with an error if the clearing fails, and takes a slug of its own per attempt. The list of fixed-slot fixtures, as delivered: these three now clear their own leftovers; the scratch language of `i18n-bundle` (IB-1, IB-2) upserts, so a leftover cannot collide; no other fixed slot was found. Class rule: a fixture that uses a fixed slot clears its own stale scratch leftovers before it seeds — only the e2e namespace, only rows older than ten minutes, child rows first; a real account is never touched. Status (2026-10-04): FIXED (bundle 4 turns 6 and 8, dev `aeac0bfa` and `fcc9b822`; CI run 37241062194 SUCCESS with 0 flaky).

## INC-429 — the E2E failure report finds no error-context file (2026-10-04, low)

Defect: in `docs/tracking/e2e-last-failure.md` every failure body said "context file not found": the failure reporter found no error-context file for any failed test, so the quoted call logs that a diagnosis is supposed to start from were missing. Evidence: run 37217294926 on `95a9d187` (57 occurrences); again in run 37229673741 on `f0120a95`, where the cause of the PW-55 failure could not be established for lack of it; the executor also reported that the run "kept no context files". Fix: none yet. Status (2026-10-04): OPEN — queued for the close-out bundle ("CI reporter fixes"), together with INC-419.

## INC-430 — Next on the contact step failed silently when the save was refused for a reason other than the name (2026-10-04)

Defect: when the contact step's identity save was refused for a reason other than the name (a rate limit, a missing draft, the network), Next returned false and the screen showed nothing — the banned phantom-success pattern (a failed state shown as nothing wrong). The executor found it while chasing a failure of PW-55 on mobile-360 in run 37229673741 (`post-step-8` not visible 10 s after Next on step 7, on every attempt; the test took 70.8 s; desktop passed), which it could not reproduce (the whole pricing file passed 21 of 21 on mobile-360 with tracing on). Evidence: red-first test PW-149, in which the identity route answers 429 `rateLimited`: before the fix it failed on both projects at "the refused save showed nothing". Fix: when the save is refused and no field on the step can show why, the step shows "Your details were not saved. Please tap Next to try again." (key `post.who.saveFailed`, English and Amharic; `data-testid` `post-who-save-failed`), and tapping Next again goes through. Status (2026-10-04): FIXED (`fcc9b822`, CI run 37241062194 SUCCESS; PW-149). The PW-55 failure itself was never explained; it did not recur in runs 37237374049 and 37241062194.

## INC-431 — the Amharic strings of the map-pin tool are garbled (2026-10-04)

Defect: the Amharic strings of the map-pin tool in `src/i18n/locales/am.ts` (keys `post.pin.*`, from the block of 33 strings added on 2026-09-21 in commit `4b7f2174`) are garbled: non-words (for example `post.pin.locate`, the label of the "Use my location" button, reads «አቅማቾን ተጠቀም» where «አካባቢዬን ተጠቀም» is meant), the unassigned code point U+12B1 in four strings and U+1720, a letter of the Hanunoo script, in `post.pin.layerSatellite`. Evidence: found by the supervisor on 2026-10-04 while writing the Amharic legal text, by a scan of `am.ts` for characters outside the assigned Ethiopic blocks. Class: Amharic text written by the executor and never read by anyone. Fix: the supervisor's corrected strings for 25 keys are imported word for word (landed in `src/i18n/locales/am.ts` at `a17b227c`), the three keys `post.pin.precisionLabel`, `post.pin.precisionExact` and `post.pin.precisionApprox` of the same commit are corrected if they still exist, and a unit guard is added: every value in `am.ts` holds only assigned Ethiopic code points (U+1200–137F, U+1380–139F, U+2D80–2DDF), Latin letters, digits and the allowed punctuation. Status (2026-10-05): FIXED in turn 10 (`a17b227c`): the 25 strings imported verbatim from the supervisor's file (the prompt was built by script from the vetted file and delivered as a file after an inline retype corrupted one character — slip S88); the guard `src/i18n/locales/am-script.test.ts` (no unassigned code point, no non-Ethiopic or non-Latin letter) is the CI promotion of the class ("executor-written Amharic never read", three or more occurrences): it also caught `admin.countries.filter.pageSize` (U+1444) and `admin.coverage.error.reason` (U+1728), corrected by the executor as «በአንድ ገጽ ረድፎች» ("Rows per page") and «ምክንያት፦ {reason}» ("Reason: {reason}"). The five `post.pin.*` keys not in the list (`layerStreet`, `save`, `saved`, `removed`, `at`) and the later `post.pin` keys were read by the supervisor on 2026-10-05 and judged correct Amharic; `post.pin.precisionLabel/Exact/Approx` do not exist. `am.ts` now has no unassigned or foreign letters.

## INC-432 — the seller-name table was never refreshed by an import (2026-10-04)

Defect: bundle 4 step 24 required three ways of keeping `name_folds` (the table the seller-name check `alias_rule` reads) fresh: M5 builds it, the cron entry `name-folds-rebuild` (`41 * * * *`) rebuilds it hourly, and every import route that commits or undoes calls `name_folds_rebuild` beside `refreshCatalogFindAfterCommit`. The third was never built: at dev 2b55ed15 nothing under `src` called the function (the only hit was `types.ts`), so a category, place or brand name imported by the curator was unprotected in the seller-name check until the next hour. Found by the records compile, not by the turn's verification — a supervisor slip (the brief's steps were not each checked against the diff). The fix uncovered a second half: the door itself could not be called from the app's connection, which runs with safe-update on and refuses `DELETE FROM public.name_folds;` ("DELETE requires a WHERE clause"); the cron session is unaffected, which is why the hourly rebuild worked. Evidence: grep of src at 2b55ed15; the executor's red tests CT-35, AT-69 and LT-15 (6/6 "not protected after commit"), then the server log line `name_folds_rebuild: DELETE requires a WHERE clause` from all three routes. Fix: M7 `20261005021121_9347e038` (mark `20261005040000`; applied on ethio-prod by the executor's tool at save and on ethio-staging by the operator) redeclares `name_folds_rebuild` whole with `DELETE FROM public.name_folds WHERE true;` and restates its closers; `refreshNameFoldsAfterCommit` in `src/server/catalog-find.server.ts` with the contract of `refreshCatalogFindAfterCommit` (after the commit or undo returns, never inside it; a failure is logged and never fails the import), called at `attributes/import.ts` :143 and :186, `categories/import.ts` :135 and :176, `locations/import.ts` :148 and :187; tests CT-35, AT-69, LT-15 (red first, then green; rebuild 472–644 ms on staging); landed in turn 10, a17b227c. Class rules: (1) verification of a bundle turn checks every step of the brief against the diff, not the report's list; (2) a function reachable from the app's connection never issues a DELETE or UPDATE without a WHERE clause, and a DO-block proof does not exercise that connection — only a route test does. Census of the class: `name_folds_rebuild` was the only such function (`transition_listing` was a false match; dynamic SQL is not covered). Status (2026-10-05): FIXED (`a17b227c`; M7 `9347e038` → mark `20261005040000` on ethio-prod and ethio-staging; its own CI run 37256219728 was red on LT-13 only, INC-334; green from run 37268978090 on `48d3c53b`).

## INC-433 — a migration mark below the ledger's newest mark (2026-10-05, low)

Defect: M7's declared mark `20261005040000` is lower than M6's `20261005100000`, so `select max(version) from public.migration_marks` names M6 after M7 is applied and the operator's read-back convention ("expect mark …" checked with max) no longer identifies the newest file. Cause: M6's mark was chosen about eleven hours ahead of the brief's rule (now() at UTC rounded up to the next hour plus one hour would have given `20261004230000`), and M7, chosen by the rule, fell below it. Evidence: the operator's staging read-back after M7 (`max = 20261005100000`), then the row query (`version = '20261005040000'` present). Effect: none on CI — `scripts/e2e-migration-preflight.ts` compares the set of declared marks per file with the ledger (`missingAgainstLedger`), not the maximum. Fix: the next migration heals M7's mark upward with the UPDATE form the preflight understands (`UPDATE public.migration_marks SET version = '<new>' WHERE version = '20261005040000'`); the mark rule in every brief gains "and above the ledger's current newest mark"; a read-back asks for the specific mark, never max. Status (2026-10-05): OPEN — heal in the next migration (the engine batch); no migration followed in turns 11 and 12.

## INC-434 — a list fact never ticked a tick list (2026-10-04)

Defect: `docs/features/attributes.md` says an option's `facts` take scalars or lists of strings, and the door accepts a list; the form (`step-specifications.tsx`, the facts fold) skipped any fact whose value was not a string, number or boolean, so `facts: {"dishes": ["doro_wot"]}` on the C29 Food Type "Doro Wot" ticked nothing. Evidence: the operator's walk of 2026-10-04 line 1 ("Dishes opens with Doro Wot ticked" — not ticked); code at step-specifications.tsx:666 (before the fix). Fix: `foldFact` — a list fact prefills a multi_select target the same way a scalar fact prefills a single_select, only while the target is empty, as the seller's own ticks afterwards; a boolean target stays a hint (D27); the step remembers which ticks the fact made, per category, for the open tab, so an untick survives Next and Back; unit tests on `foldFact`, PW-159; landed in turn 11, 70e16ea5. Class rule: a shape the door accepts is a shape every screen reads; the docs' sentence is checked against the form before a curator is told to rely on it (the supervisor told the curator "a prefill can tick a list" without reading the form). Status (2026-10-05): FIXED (`70e16ea5`; the run on that commit, 37264070069, was red on CT-19 only — INC-437 — and the next green run, 37268978090 on `48d3c53b`, carried it).

## INC-435 — the "Photos coming soon" ribbon ran past the picture (2026-10-04)

Defect: `listing-picture.tsx` drew the ribbon as a 150 %-wide band rotated across the whole 4:3 box, so on a default category picture drawn narrower than the box (object-contain) the band extended past the picture's edges, and it crossed the picture from the lower left to the upper right instead of sitting in a corner. Evidence: the operator's walk of 2026-10-04 line 6 and his reference image (a corner ribbon in the lower right). Fix: the picture gets a frame sized to its own ratio (width `min(100cqw, 75·ratio cqw)`, the ratio read on load); the ribbon is a corner band inside that frame, anchored at the lower right, rotated −45°, clipped by the frame, in the design system's primary button colours (`bg-primary` / `text-primary-foreground` — the operator ruled out yellow and the watermark colour); `data-testid listing-photos-soon-ribbon` and the screen-reader text kept; the one primitive serves the card, the review, the preview and the detail; PW-141 measures the frame; landed in turn 11, 70e16ea5, corrected in the same turn. Status (2026-10-05): FIXED (`70e16ea5`; green with run 37268978090 on `48d3c53b`), published and walked by the operator ("looks good").

## INC-436 — "Use my location" showed no state (2026-10-04)

Defect: `map-pin-dropper.tsx` `locate()` moved the map and the pin on success but the button looked the same before, during and after; the operator could not see that his position had been taken. Evidence: the operator's walk of 2026-10-04 line 4. Fix: while locating the button is disabled and shows the locating words; once the position is taken it shows pressed (`aria-pressed="true"`, filled with the primary colour — the design system has no success colour) until the pin is moved by hand, the map is tapped or the search places it; PW-160 with a granted geolocation permission at a fixed position; landed in turn 11, 70e16ea5. Status (2026-10-05): FIXED (`70e16ea5`; green with run 37268978090 on `48d3c53b`), published and walked by the operator ("yes good").

## INC-437 — CT-19 asserted a shared roster's totals from a constant (2026-10-05)

Defect: `e2e/admin-categories-lifecycle.spec.ts` CT-19 (and the same literal at :876 and :953) wrote its scratch root's row with the constant `display_order "2000000"` (the INC-383 fix) and asserted the preview's totals `{adds 1, changes 1}`; a parallel test's import ran its ordering pass and renumbered the root, so the planner counted a second change (`changes 2`) and the run on 70e16ea5 went red (run 37264070069, mobile-360, shard 1). CT-19's third ledger line (2026-09-23, 2026-09-28, 2026-10-05). Evidence: e2e-last-failure.md for 70e16ea5. Fix (turn 12): the row is built from the root's current stored cells read through the service client right before the file is built; the test asserts its own rows' planned actions where the plan payload names rows, totals only where it does not; class rule in the file header. Class rule: a file row for a row that already exists carries that row's stored cells read at build time, never a constant; a test asserts its own rows, not a shared roster's totals (G28's sibling). Status (2026-10-05): FIXED (`48d3c53b`, bundle 4 turn 12: `storedRootLine` builds the scratch root's row from its stored cells read through the service client, CT-19 asserts its own rows' planned actions and an empty refusal list, and the two sibling literals are replaced; CI run 37268978090 SUCCESS, 25 jobs, 0 flaky, main promoted — dev = main = `48d3c53b`, bundle 4 closed on that run).

## INC-438 — a definitions import may remove options that live link cells still name (2026-10-05)

Defect: `attr_import_plan` (latest declaration before this bundle: M6 `20261004212627_e44f20e5`) accepted a definition change whose new option list drops values that live `category_attribute_links` cells still name in `visible_when`, `allowed_options` or `default_value`, that an option record's `allowed` list or facts name, or that a dependent's parent names; no refusal reason covered it, `admin_commit_attribute_import` rewrote the options without touching the link cells, and no trigger on `attributes` guarded it. A stale cell makes a condition that never matches or a scope naming a ghost value. Evidence: the read of both functions during the C30 audit; the C30 curator's own sequencing ("live conditions name them until file 3") was the workaround; not hit by C30. Class rule for curators (already their practice): every cell naming a value is rewritten or unlinked in a file BEFORE the file that removes the value. Fix: bundle 5 Part B — the planner refuses `optionInUse` naming the holder rows (`{value}`, `{detail}`), except cells the same file rewrites or unlinks; the import dialog renders the reason in English and Amharic (B8); AT-71 red-first. Status (2026-10-05): FIXED (M8b `20261005171442_6c825c7e`, dev `feae4f49`; CI run 37356684765 SUCCESS).

## INC-439 — the nightly of 2026-10-05 is red on PW-32, with 128 "operation was aborted" server lines (2026-10-05)

Defect: nightly run 37274430784 on `48d3c53b` (09:28Z; serial, `--workers=1`, 0 retries): 1,080 passed · 49 skipped · 1 failed — `e2e/post-wizard-resets.spec.ts` › PW-32, mobile-360: `getByTestId('post-save-state')` stayed `data-state="saving"` for the whole 10 s wait after the category pick (`:145`, the chooseBySearch helper). The same log's server-error census carries a message seen in no earlier nightly and not in the matrix run on the code-identical `d08c76cf`: `HTTPError: The operation was aborted. @…/h3+rou3+srvx.mjs:544:20`, 128 lines, off the allowlist, on `/api/categories/tree`, `/api/listings/draft`, `/api/listings/alias`, `/api/catalog/find` and one `/_serverFn/…`. Evidence: `nightly-status.md` and `nightly-last-failure.md` on `ci-evidence`; the four earlier nightly files hold no such line. Answers (bundle 5 Part D, read-only): (a) the error is raised at `dist/server/_libs/h3+rou3+srvx.mjs:495–510` when the response closes before it is fully written — the request's signal aborts when the browser drops the connection; (b) no server client passes `request.signal` into the Supabase fetch (`src/` carries no `request.signal`); (c) the draft save is a plain `fetch` with no timeout (`src/features/posting/posting-service.ts:71–86`) — a save that never answers keeps "saving" (`use-draft.ts:296–345`), a transport failure shows "unsaved" (`:350–363`); (d) six serial local runs of PW-32 with the server log captured: 0 abort lines, 0 server errors, "saving" never stuck. Classification: (i) a stalled connection to staging during the serial nightly; no code change. Class: a red nightly unruled at a handover; an off-allowlist server message. Fix: none yet — the latent gap in (c) is DEC-135 (bundle 6); the next nightlies are read for the abort line. Status (2026-10-05): OPEN, watched.

## INC-440 — PW-76 flaky three times in one day (2026-10-04) — DEC-030

Defect: `e2e/post-wizard-place.spec.ts` › PW-76 ("a detail the model pins to one value is filled and hidden, and still reviewed", DEC-085) failed then passed on retry three times on 2026-10-04: fast lane mobile-360 (run 37166386469, `6f2620d6`), desktop-1280 shard 5 (run 37167434354, `d3be2df2`), desktop-1280 shard 5 (run 37184985245, `61b02390`); each `expect(locator).toBeVisible() failed`. Evidence: `flake-ledger.md` on `ci-evidence`; this file's watch list at `48d3c53b` ("an INC is owed"). Class: the DEC-030 threshold reached with no INC (S41/S42/S69 class). Fix: root cause in the flaky-test turn (CI-T2, the close-out bundle). Status (2026-10-05): OPEN, parked.

## INC-441 — CO-4 flaky three times in seven days (2026-09-28 → 2026-10-04) — DEC-030

Defect: `e2e/admin-countries.spec.ts` › CO-4 ("open and close: opening publishes the market's tree, closing takes it away"), mobile-360 shard 1: 2026-09-28; 2026-10-01 (run 36806970357, `2a466705`, `toBeVisible`); 2026-10-04 (run 37170105972, `bd056a6a`, "[e2e:INC-210] the guarded outcome never arrived within 30000 ms"). Evidence: `flake-ledger.md`; the watch list ("an INC is owed"). Class: as INC-440. Fix: the flaky-test turn. Status (2026-10-05): OPEN, parked.

## INC-442 — the identity route called the paid imitation check before any rate gate (2026-10-05, MEDIUM; security review 2026-10-05 finding 1)

Defect: `src/routes/api/listings/identity.ts` — the caller check (`refuseUserClient`) was the only gate before `imitationOf(alias)`, which calls the Gemini text model; the rate gate lived in the door the route calls afterwards (`save_posting_identity` → `rate_gate('identity')`), and an alias the model judged as imitating returned without reaching the door. Bundle 3's ruling had removed the route's own `consumeRate("identity")` to leave counting to the door. So any signed-in account could trigger unbounded paid model calls: refused aliases were never counted, over-the-dial aliases were counted after the call. The sibling `assist.ts` consumes its rate before its model call. Evidence: the weekly security review's baseline report (Project doc `claude/security-review-2026-10-05.md`, finding 1); the lines read in the fresh clone at `d08c76cf`. Class: a paid provider call before a rate gate (the assist route is the pattern). Fix: bundle 5 Part F — `consumeRate("identity:imitation", userId, 20, "24 hours")` (the live `identity` dial's numbers) before `imitationOf`; a refused count answers `rate`/`rateLimited` with the reset as detail and the model is never asked; the door keeps counting its own `identity` bucket; PR-26 (`e2e/posting-routes-identity.spec.ts`) red-first (the twenty-first alias, one the fake judge flags, answered `aliasImitatesBrand` before the fix and the rate refusal after); the F1 census found no other paid call ahead of its gate (assist, translate, geo, category images, media policy each gated first; tiles makes no call). Status (2026-10-05): FIXED (dev `f0d948dc`; CI run 37386543669 SUCCESS, main promoted).

## INC-443 — a CI guard blind to one grant form; its allowlist incomplete (2026-10-05, LOW; security review finding 2)

Defect: a census gap in a CI guard, not an open door — the functions it misses are gated inside. Detail held in the Project record (`claude/running-record-2026-10-05-thread2.md`) until the fix is live (G51: the detail of an unfixed hole never enters the public repository). Class: a guard that reads statements literally misses a dynamic form (§8: every guard is proven on bad input). Fix: bundle 6 — the guard extended with a self-test fixture; the allowlist completed with reasons; the full entry imported with that landing. Status (2026-10-05): OPEN.

## INC-444 — owner doors that write without a dial (2026-10-05, LOW; security review finding 3)

Defect: a degradation vector under the spend cap (unbounded growth of one table by an authenticated caller), not a data exposure. Detail held in the Project record until the fix is live (G51). Class: an owner-callable write door without the dial its siblings carry. Fix: bundle 6, migration M9 — the dial added at whole redeclarations from the live definitions; a route test per door that a scratch user with a low `rate_overrides` row is refused past the dial; the full entry imported with that landing. Status (2026-10-05): OPEN.

## INC-445 — proof blocks that borrow real rows: the census, and the class at CI-guard count (2026-10-05, LOW; security review finding 4)

Defect: a census of migration proof blocks in the window that impersonate or read real rows inside rolled-back sub-transactions; nothing persists. M4 and M5 were already named in the G27 addendum; the census completes the list (held in the Project record until the guard lands). Class: real rows in a proof (G27 addendum) — at this count the class is promoted to a CI guard (§11: three occurrences ⇒ a guard). Fix: bundle 6 — the migration linter gains a check on DO blocks at or after a floor, with a self-test fixture; landed files are never edited. Status (2026-10-05): OPEN.

## INC-446 — a metric endpoint without a rate gate (2026-10-05, LOW; security review finding 5)

Defect: detail held in the Project record until the fix is live (G51). Class: a metric endpoint without a rate gate; an outside resource without a provider-side usage cap (G52). Fix: bundle 6 — `consumeRate` on the endpoint keyed by the hashed client address, with a test; operator step: a usage budget or alert on the provider's dashboard (DEC-091's Services page tracks it later); the full entry imported with that landing. Status (2026-10-05): OPEN.

## INC-447 — a route can return a raw database message to the client (2026-10-05, INFO; security review finding 6)

Defect: detail held in the Project record until the fix is live (G51). Class: a raw error string to the client. Fix: bundle 6 — the refusal's `detail` carries the constraint name or nothing; the raw message stays in the server log; a unit test of the mapping. Status (2026-10-05): OPEN.

## INC-448 — a client-side regex can backtrack polynomially on long input (2026-10-05, INFO; security review finding 7)

Defect: client-side advice only; the door's mirror does not backtrack the same way. Detail held in the Project record until the fix is live (G51). Class: an unbounded input to a backtracking regex. Fix: bundle 6 — bound the tested input length (or tighten the pattern) with a unit test on a long input; census the file's other patterns. Status (2026-10-05): OPEN.

## INC-449 — PW-57 flaky three times in seven days (2026-10-05) — DEC-030

Defect: `e2e/post-wizard-pricing.spec.ts` › PW-57 ("a per-quintal basis keeps the period once and reviews as a price"), mobile-360 shard 3: three failed-then-passed lines in the seven-day window ending 2026-10-05 (2026-10-01 `aeaf3d12`, 2026-10-04 `d3be2df2`, 2026-10-05 run 37356684765 `feae4f49`). Evidence: `flake-ledger.md` on `ci-evidence`, read whole. Class: the DEC-030 threshold with no INC. Fix: root cause in the flaky-test turn (CI-T2, the close-out bundle), with PW-76 (INC-440) and CO-4 (INC-441). Status (2026-10-05): OPEN, parked.

Numbering: next free INC-450.

Watch list (DEC-030 rule, three flakes in seven days, as of run 37386543669 on 2026-10-05): LS-6 (seven matrix lines in the window — INC-285 reopened / INC-428; no source closes INC-285), PW-55 (three — INC-430), PW-57 (three — INC-449), PW-76 (two in the window plus the fast lane — INC-440), CO-4 (two in the window — INC-441), TR-29 (two — INC-345, parked), LT-13 (four, all before its fix `70e16ea5` — INC-334 closed, no line since), PW-10, TR-28, TR-24, AT-47, TR-10, LR-3 (two each, no INC); the fast-lane-only flakes are contention noise by DEC-023-B. The server-error census still carries "listing not found" off the allowlist (8 lines on run 37386543669 — INC-398, the close-out bundle's).


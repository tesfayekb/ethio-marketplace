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

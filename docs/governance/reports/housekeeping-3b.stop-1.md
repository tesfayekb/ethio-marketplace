STOP — housekeeping-3b STEP 1: the census (PLAN FIRST; nothing edited beyond STEP 0)
DONE: STEP 0 (commit 64102f86c `housekeeping-3b: task saved`), STEP 1 (this census)
LEFT: parts A, B, C, D, E; STEPS 2 → 9
CI: the lane head's run, read at the ci-evidence branch before STEP 0's commit:
# CI Status (auto-generated — do not edit by hand)

- Commit: `f3b215762a80531405ed4c8ebfac1e4b62a15a1d` (short `f3b2157`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T00:47:21Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43129068660
FILES: this turn's, `git diff --name-only f3b215762` (the lane head this turn began from):
docs/governance/briefs/housekeeping-3b.md
roadmap.md
docs/governance/reports/housekeeping-3b.stop-1.md (this file)
(`git diff --name-only 2b11a9d29` prints 302 paths: the bundle's turns 1, 1b, lockfile, 2 and 3 on
this lane, plus the two above; `git merge-base origin/dev HEAD` = 2b11a9d29, so the base is exact.)

Four questions need a ruling before Part A (end of this file, "QUESTIONS"). Everything else below
is a census answer or a decide-and-name the plan states and continues on.

## STEP 0 — what was run and what it printed

- Lane: `git fetch origin` (ci-evidence moved 1af37e23a → ca8cf7baf), already on
  `cursor/housekeeping`; `git merge --ff-only origin/cursor/housekeeping` → "Already up to date";
  head f3b215762a80531405ed4c8ebfac1e4b62a15a1d; `git status --short` empty. `origin/dev` =
  2b11a9d29 = the brief's base (no drift).
- The brief: the folder's `housekeeping-3b.md` sha256
  b5ba11819df1948009899c52af371241e551805e2ef151eaacf4ac4790209f9f = the stated value; the text
  between BEGIN BRIEF and END BRIEF in the task file, extracted by `awk`, is byte-identical (`cmp`).
  Saved by script inside one four-backtick fence (the brief holds no four-backtick run); the fenced
  text's sha256 re-measured equal.
- Roadmap line 3: written by script (`perl -i`, line 3 only) as dictated; `bunx prettier --check
  roadmap.md` → "All matched files use Prettier code style!".
- `scripts/conformance/briefs-allowlist.txt`: three comment lines and no entry line, so nothing was
  removed.
- `bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-3b.md` → exactly
  `[check-go] no finding` (exit 0).
- `bunx vitest run scripts/conformance/briefs.test.ts` → 10 passed.
- CI read (rule 40): root `ci-status.md` names f3b215762 SUCCESS, run 43129068660 (the lane's head,
  a docs-only push). The lane's folder `branches/cursor/housekeeping/`: `e2e-last-failure.md` says
  run 43129068660 ran no lanes (DEC-365) because the code tree equals 3ab2bd250, whose lanes were
  green in run 43124629224; `gh run view 43124629224` → success on 3ab2bd250 (the last code commit);
  `local-backend-proof.md` (run 43124629224): every lane 0 failed, 0 flaky. `guards-last-failure.md`
  (f3b215762): no failed build/guard job, no warning step. `gh pr checks 34`: every check pass or
  skipping (the lanes and the budget skipped as docs-only). Flake ledger, 2026-11-05 → 11-12: 7
  lines, no test with three (SO-12 has two). No red to fix first.
- Install: `bun install --frozen-lockfile` → "Checked 607 installs across 700 packages (no changes)".

## CENSUS-ITEM consumers

### Concern 1 — the thirteen allowlisted sites, re-read at f3b215762

| Site | What it builds | Marker |
| --- | --- | --- |
| `scripts/admin-tables.ts:213` | `from "\./${name}"` — `name` is a section file's stem | none |
| `scripts/e2e-select.ts:444` | `^${out}$` — a spec glob, metacharacters escaped by hand at :436 | DEC-153 comment :442, `nosemgrep` :443 |
| `scripts/list-action-labels.ts:112` | `<${tag}(?=[\s>/])\|</${tag}\s*>` (g) — `tag` letters only (:109) | DEC-153 comment :110, `nosemgrep` :111 |
| `scripts/list-action-labels.ts:225` | `\b${name}\s*[?]?:\s*(string\|ReactNode\|…)` — `name` matched `[a-z][A-Za-z0-9]*` at :222 | none |
| `scripts/list-action-labels.ts:241` | `\s${name}=\{\s*t\(\s*["'\`]([A-Za-z0-9_.-]+)["'\`]` (g) — `name` from the receivers map | none |
| `scripts/brief/apply-blocks.ts:52` | `MARKER_SOURCE` (constant, :50–51) with `m` | none |
| `scripts/brief/apply-blocks.ts:94` | the same constant with `gm`; only `marker[0]` is read (:98) | none |
| `scripts/destructive-red.ts:43` | `\.${ACT}[A-Za-z]*$\|…` (i) — `ACT` a constant (:41) | none |
| `scripts/conformance/vendor-seams-scan.ts:39` | `\.auth\.${AUTH_METHODS}\b` — a constant (:25–26) | none |
| `scripts/conformance/package-price.ts:59` | `${OPERAND}\s+[-+*/%]\s+` — `OPERAND` a constant (:55) | none |
| `scripts/conformance/package-price.ts:60` | `\s[-+*/%]\s+(?:\w+\.)?${OPERAND}` | none |
| `scripts/conformance/migration-reader.ts:49` | `/\*[\s\S]*?\*/\|--[^\n]*\|` + `ONE_LINE_LITERAL` (g) | none |
| `scripts/conformance/migration-reader.ts:70` | `ONE_LINE_LITERAL` (:48) with `g` | none |

How each moves (Part A): a name or text part enters as a `${part}` string of `pattern` /
`flaggedPattern(flags)` (escaped; for the letter-only and identifier names escaping is the identity,
so no match changes); a constant SOURCE fragment becomes a flagless RegExp literal and enters as a
RegExp part (`partSource` wraps it in `(?:…)`, which changes no capture number: `MARKER_SOURCE`'s
group 1 stays group 1, and only `marker[0]` is read). `globToRegExp` builds its source run by run:
it calls the tag with the arrays it assembles (`pattern(["^", …, "$"], …parts)`), literal runs as
string parts and `**` / `*` as the RegExp parts `/.*/` and `/[^/]*/` — the form `go-laws.ts:221`
`globRegex` already uses. Both `nosemgrep` markers go (no `new RegExp(` is left beside them); their
DEC-153 comments go with them, since the reviewed site is then `pattern.ts:40` (CF-PATTERN-4 counts a
marker outside the helper as a finding once the file's allowlist line is gone).

`TEST_ID` (`scripts/brief/go-laws.ts:40`, used at :369): `(?<![\w-])[A-Z]{2,6}(?:-[A-Z0-9]+)*-\d+(?![\w-])` —
`[A-Z0-9]+` and `\d+` overlap inside a starred group (alert #453, open on the PR #34 merge ref).

### Concern 2 — the language pick

- `switchLanguage(` callers (`rg -c "switchLanguage\(" e2e`): the 23 spec files and counts the brief
  lists, exactly; plus `e2e/helpers/account-language.ts:76` and the definition `e2e/helpers/ui.ts:1331`.
- The fourteen picks of turn 2's §4, each read at its line: ad-page :159, :1323; admin-roles :344;
  i18n-sign-in-language :143; page-head :53; post-wizard-specs :2527; sage-bands :408 (`language`);
  sage-tiers :592; shell :1619, :1626, :2040, :2409, :2441; user-guides :172 — every one is
  `await switchLanguage(page, …)` at the cited line.
- `watchAccountLanguage` / `consumeAccountLanguage` callers (every one):
  - `e2e/helpers/ui.ts:1312` (definition), `:1322` (definition), `:1324` (consume → watch, 2 s);
  - `e2e/helpers/account-language.ts:53` (`reloadSettled`, used by `setAccountLanguage` :75, :83);
  - `e2e/admin-attributes-library.spec.ts:707` (the AT-12 arm, import :11);
  - `e2e/one-line-slots.spec.ts:56` (`ensureMode`'s reload), `:89`/`:90` (OLS-2 after sign-in),
    `:113`/`:114` (OLS-3 after sign-in), imports :19–20;
  - `e2e/one-line-slots-admin.spec.ts:52` (`ensureMode`'s reload), `:66` (after sign-in), `:69`
    (each path's navigation), imports :15–16.
  The two one-line-slots specs were not named by the brief; its words "any other direct
  `watchAccountLanguage` call in a spec" and SCOPE's "any spec the census moves off a direct watch"
  cover them, so this is no STOP.
- The provider's account rule (`src/i18n/provider.tsx` :459 doc → effect :487 → :531), every branch
  and what it does to the device's choice:

| Line | Branch | Device's choice |
| --- | --- | --- |
| :488 | boot read, auth settle or gate still pending | untouched; the rule has not run (read not begun) |
| :489–492 | signed out | untouched; the latch released |
| :493 | same identity again (token refresh, an `isPublic` change) | untouched; nothing re-runs |
| :494 | a new identity: the latch is taken, then | (the read starts below) |
| :495 | a `?lang=` view | untouched; the rule waits for the next session start |
| :498–503 | the read answered not ok (`signedOut` silently, else one warning) | kept |
| :505–507 | no account code, the current language unpublished | kept; nothing written |
| :505–514 | no account code, the current language published | kept; the account is SAVED, fire-and-forget |
| :515 | an account code that is not a code shape or not published | kept; nothing written |
| :516–524 | a published account code | REPLACED: star, cookie (writeDeviceStar), selection, localStorage |
| :526–530 | `.catch` — the read's own code did not download | kept; one warning |

### Concern 3 — the reaper and the helpers' scratch literals

The reaper (`e2e/global-setup.ts`, shard 1 or `E2E_MAINTENANCE`, :588) sweeps by prefix eleven
times, not three:

| Line | Table . column | Pattern | Prefix's maker |
| --- | --- | --- | --- |
| :604, :614 | ui_translation_revisions / ui_translations . key | `e2e.scratch.%` (literal) | `e2e/helpers/translations.ts:149` `SCRATCH_PREFIX` |
| :632, :642, :656 | revisions / ui_translations / entity_translations . lang_code | `${prefix}%` over `FENCE_PREFIX_LIST` | `e2e/global-setup.ts:48` `FENCE_PREFIXES` (`zxx`, `zxy`) |
| :693 | locations . slug | `e2e-%` | `e2e/helpers/locations.ts:32` `e2e-loc-…` |
| :732 | countries . name_en | `E2E-Scratch-%` | `e2e/helpers/countries.ts:50` |
| :815 | location import revisions . entity_key | `%e2e-%` | the location slugs above |
| :832 | roles . name | `e2e-%` | specs' `${RUN_TAG}-role-…` (e.g. `e2e-al-…`, legal-admin :14, :1151) — NOT `users.ts:467` `e2e_scratch_role_…` (INC-1104 confirmed: `-` is a literal in LIKE, so no scratch role from the one maker is ever reaped) |
| :870 | profiles . display_name | `e2e+%` | `e2e/helpers/users.ts:45` `e2e+…@ethio-e2e.invalid` |
| :885 | listings . title | `e2e-cat-listing-%` | `e2e/helpers/categories.ts:288` |
| :1057 | categories . slug | `e2e-%` | `e2e/helpers/categories.ts:45` `e2e-cat-…` and every `e2e-` seeder (INC-276) |
| :1210 | categories . slug | `e2e-cat-%` (the assets sweep) | `categories.ts:45` |
| (:1108 →) | attributes . attr_key | `planAttributeReap` (`e2e/helpers/attribute-reap-plan.ts:26`): `e2e_` / `e2e-` or after a hyphen | `posting.ts` stems (below), specs |

Also by prefix outside global-setup: `e2e/helpers/locations.ts:289` (`not like e2e-%`), `:396` (`like
e2e-%`); `e2e/global-teardown.ts:9`, `:28` (`e2e+` and `@ethio-e2e.invalid`); `global-setup.ts:206`
(the same two).

The sixty-seven helper literals (COUNT holds: 67), classified:

| Class | Count | Sites |
| --- | --- | --- |
| comments (documentation, no code) | 27 | exports.ts :7, :10, :26; users.ts :455; category-menu.ts :7; posting.ts :10, :245, :482, :1995; alias-check.ts :47, :49; attribute-reap-plan.ts :4, :5; locations.ts :17, :29, :239, :339, :648; global-setup.ts :669, :674, :681, :826, :1043, :1044, :1045, :1108, :1109 |
| a scratch row's NAME (a maker) | 26 | users.ts :467 (role); posting.ts :24 (`e2e-post-`), :502, :620, :817, :949, :1024, :1081, :1171, :1311, :1660, :1749, :2061, :2120, :2235, :2317, :2442, :2495, :2590, :2690 (attribute stems `e2e_<kind>_…` / `e2e_<time>`); categories.ts :45 (`e2e-cat-`), :288 (`e2e-cat-listing-`); ad-page.ts :166 (storage key `e2e-<run>/…`); alias-check.ts :53 (public name `e2e_…`); locations.ts :32 (`e2e-loc-`); reach-rows.ts :18 (`REACH_PREFIX = "e2e_lvl_r"`) |
| a matcher or sweep reading a prefix | 11 | category-menu.ts :41; locations.ts :242, :289, :396, :409; global-setup.ts :693, :832, :885, :1057, :1210, :1249 |
| a pool identity's name (never swept: the pool is persistent) | 2 | users.ts :160 (`e2e-pool-…` e-mail); global-setup.ts :335 (TOTP factor `e2e-pool-<pid>`) |
| another string | 1 | users.ts :301 `ended_reason: "e2e_pool_reset"` |

### Concern 4 — the two redactions side by side

| Rule | `scripts/ci/redact.py` (order) | `scripts/e2e-failure-report.ts` :116–122 (order) |
| --- | --- | --- |
| ANSI `\u001b\[[0-9;]*m` → "" | — (CF-REDACT-1 asserts it is KEPT, redact.test.ts :81, :93) | 1 |
| ACCOUNT_ID (uuid, `\b…\b`) → `[account id]` | 1 | — |
| the staging keys' VALUES from the environment → `[masked]` (a literal replace, not a pattern) | 2 | — |
| JWT → `[masked JWT]`: `\beyJ[…]+\.[…]+\.[…]+\b` | 3 | 2, as `[redacted-jwt]` with `{5,}` per part |
| SUPABASE_KEY `\bsb_(?:secret\|publishable)_[…]+\b` → `[masked key]` | 4 | — |
| EMAIL → `[e-mail]` | 5 | — |
| STORAGE_KEY_ROW `(│\s*(?:Access Key\|Secret Key)\s*│\s*)[^│]*?(\s*│)` → `\1[masked]\2` | 6 | — |
| STORAGE_KEY `sb-[A-Za-z0-9-]+-auth-token` → `[redacted]` | — | 3 |
| LONG_HEX `[0-9a-fA-F]{32,}` → `[masked hex]`, except the value equal to `GITHUB_SHA` (a function) | 7 | — |

Validity in both engines: every pattern COMPILES in Python's `re` and in JavaScript's `RegExp`
(Python accepts `\u001b` in a str pattern since 3.3). Their MEANING differs in three ways that make
"byte-identical" fail unless the plan fixes them: (a) Python str patterns are Unicode-aware — `\b`,
`\w`, `\d` treat Ge'ez letters and digits as word characters, JavaScript without `u` does not — so
the Python side compiles with `re.ASCII`; (b) even then `\s` differs (`re.ASCII` gives `[ \t\n\r\f\v]`,
JavaScript keeps U+00A0, U+FEFF and the Unicode spaces), so no shared pattern uses `\s` —
STORAGE_KEY_ROW's four `\s*` become `[ \t]*`; (c) a replacement's group reference is `\1` in
Python and `$1` in JavaScript, so the file states one form and each side translates it (or the rule
names its kept groups). The environment-value pass and the commit exception are not patterns.

### Part E

- Law 3 (`scopeFindings`, go-laws.ts :93 → :115): reads the SCOPE paragraph, takes every `CODE_FILE`
  match, and for each non-test path asks only whether SCOPE also NAMES `<stem>.test.ts(x)` (or, for
  an e2e path, any `.spec.ts`). It never looks at the tree; check-go passes it no root (`textFindings`,
  :517). The K1 clause needs the root: it becomes a tree law (or `scopeFindings` takes an optional
  root). Briefs.test.ts's first `it` runs `textFindings` on the brief in force; check-go runs both.
- Law 11 (`titleFindings` :123, `TITLE` :60 = `\b(?:Commit|first line):?\s*\`([^\`\n]+)\``, gi): it
  reads "Commit `…`" and "commit: `…`"; "commit (`…`)" escapes it (the `(` sits between).
- Law 10's message :487 `write COUNT: <n> := <command>` (alert #457, `html-in-template-string`, open
  on the PR #34 merge ref); the same placeholders in the doc comment :480 and `baseFindings` :76
  (`Base: dev <sha>`, a plain string, not flagged). `docs/governance/go-template.md:25` carries
  `COUNT: <n> := <command>`; briefs.test.ts :246 asserts law 10's message word for word.
- The template's other lines: `premises` :79, `consumers` :59, STEP 0's check-go sentence :56
  ("…on the tree as saved and paste its output.").
- LGA-22 `makeRole` (`e2e/legal-admin.spec.ts` :1150 → insert :1153–1154 → role_permissions :1175 →
  the user_roles loop :1186–1198): builds two roles `${RUN_TAG}-role-bl-edit|bl-view` BEFORE the
  two users are leased (:1184–1185), then assigns. `grantScratchRole(userId, wanted, reap)`
  (users.ts :461) makes, grants and assigns in one call, so the move leases first, then calls it per
  user with `[["admin_panel","access"],["legal","edit"|"view"]]` and the spec's `roles` set; the
  loop goes. LGA-21 in the same file already uses it (:1016, :1025). The only inline
  `.from("roles").insert(` in e2e/ besides the helper (`rg -U`): this one.
- The two `.mjs` imports: `scripts/ci/step-failures.test.ts:6–7` (`failedStepLines`, `TAIL_LINES`;
  the module exports those two, :15, :19) and `scripts/ci/start-failure-excerpt.test.ts:6–7`
  (`ECHO_LINES`, `startFailureExcerpt`, `TAIL_LINES`; the module exports `CAUSE_LINES`, `ECHO_LINES`,
  `TAIL_LINES`, `RECORD_LINES`, `STATEMENT_CHARS`, `serverErrorRecord`, `serverRecordLines`,
  `startFailureExcerpt`).
- The self-test's label (`scripts/e2e-failure-report.ts:2914`) prints `DEC-083/084 census` for every
  failed check of the block that starts at :2668. That block's checks lead with INC-398 (3), R1a (2),
  INC-973 (2), DEC-340 (1), INC-1101 (6), R1b (2), and four lead with no record (DEC-083's own: :2669
  → :2672). DEC-321 and DEC-365 already print under their own labels (:2198, :2226).

## CENSUS-ITEM definition

- Concern 1, "a RegExp a script builds from text": the census (CF-PATTERN-4) reads non-test files
  under scripts/ only — the thirteen above. By definition the same act also happens in
  `e2e/helpers/ui.ts:41` (escaped), `e2e/helpers/auth-form.ts:32` (a catalogue label, NOT escaped),
  105 `RegExp(` sites in 34 spec files, 12 script test files, and `src/` (`location-data.ts:92`,
  `:114`, `i18n-context.ts:44`, `theme.ts:191`, `:192`, `:202`, `imports/gate.ts:171`,
  `integrations/supabase/previewAuthStorage.ts:50–51`, platform-generated). The brief's concern is
  "a script"; these are LEFT and named (§13).
- Concern 2, "a language pick on a signed-in page": every pick goes through `switchLanguage`
  (CF-HELPERS-1 refuses a copy); the other ways a test changes the language — `setDeviceAmharic`
  (before first paint, no race), `seedAccountLanguage` (before a session), the storage event (R4) —
  are not picks. No difference.
- Concern 3, "a scratch row maker and sweeper": the brief counts three sweeps and the literals
  `[\"'\x60]e2e[-_]` catches; by definition the makers also include `translations.ts:149`
  (`e2e.scratch.`), `countries.ts:50` (`E2E-Scratch-`), `users.ts:45` (`e2e+`), `global-setup.ts:48`
  (fence `zxx`/`zxy`), `translations.ts:204` (`E2E Fence` names), and the sweepers include the eleven
  above plus `locations.ts:289`, `:396`, `global-teardown.ts:28`, `global-setup.ts:206`. A second
  definition of one value: `scripts/en-baseline-heal.ts:12` repeats `SCRATCH_PREFIX`
  (`e2e/helpers/translations.ts:149`). QUESTION 2 asks how far the list reaches.
- Concern 4, "an evidence writer that redacts": the two above; every workflow heredoc imports
  `redact.py` (CF-REDACT-2: three imports in local-backend-proof.yml). The 300-character cut the brief
  places in redact.py is not there: it is `.github/workflows/local-backend-proof.yml:443`
  (`' '.join(err.split())[:300]`, outside scope) — nothing to keep in the module.

## CENSUS-ITEM tests

- The eight scripts' own tests: `scripts/admin-tables.test.ts`, `scripts/e2e-select.test.ts`,
  `scripts/list-action-labels.test.ts`, `scripts/brief/apply-blocks.test.ts`,
  `scripts/destructive-red.test.ts`, `scripts/conformance/vendor-seams.test.ts` (the one whose stem
  differs), `scripts/conformance/package-price.test.ts`, `scripts/conformance/migration-reader.test.ts`
  (its `sqlCodeOf` / `spanningLiterals` cases :89–108; six more conformance tests import the reader).
- `scripts/lib/pattern.test.ts` (CF-PATTERN-1…3), `scripts/conformance/pattern-sites.test.ts`
  (CF-PATTERN-4), `scripts/conformance/briefs.test.ts` (CF-BRIEF-1…15; CF-BRIEF-14 is the self-test:
  planted and clean fixtures, check-go spawned — the "self-test's planted fixtures" are these; there
  is no separate `.selftest.sh`), `check-go.ts` has no test of its own (CF-BRIEF-14 runs it).
- `scripts/conformance/e2e-helpers.test.ts` (CF-HELPERS-1…3 and the planted `it`).
- `scripts/ci/redact.test.ts` (CF-REDACT-1, -2); `scripts/e2e-failure-report.test.ts` and the
  reporter's own `--self-test`.
- The account rule's own test: `src/i18n/provider-d239.test.tsx` (LANG-D239-U1 → U8); the other
  provider test is `src/i18n/provider.test.tsx` (ILA-1 → 4, `<html lang>`).
- `global-setup.ts` has no unit test; `planAttributeReap`'s is `src/test/attribute-reap-plan.test.ts`
  (e2e helpers' unit tests live in `src/test/`, since vitest excludes `e2e/**`).
- Specs: AT-12 (`admin-attributes-library.spec.ts:685`); the two one-line-slots specs; LGA-22
  (`legal-admin.spec.ts:1133`); and every spec whose helper path changes in Part C — the 23
  `switchLanguage` callers and the three `setAccountLanguage` callers (`page-head`, `i18n-coverage`,
  `i18n-sign-in-language`). The browser-test values are set here (names checked) and a Chromium is
  installed, so the local runs can start (outside the sandbox). QUESTION 4's last line asks which.

## CENSUS-ITEM lists

- `scripts/conformance/wired.test.ts`: its exact `toContain` lines name the newest id of each guard —
  `CF-HELPERS-3` (:208–210) → `CF-HELPERS-6`; `CF-REDACT-2` (:252) → `CF-REDACT-3`; the briefs and
  pattern lines (:196–205, :216–224) unchanged.
- `scripts/conformance/pattern-sites-allowlist.txt`: 8 lines (13 sites) → 0.
- `scripts/conformance/pattern-sites.test.ts` `AUTHORED_CALLERS` (:20, `["scripts/brief/go-laws.ts"]`):
  the reporter compiles rules read from JSON, so it joins (the census refuses `authored` elsewhere,
  and a module-local `new RegExp(` would be an allowlist line in a list that must end at zero).
- Exact-list assertions found by grep: `briefs.test.ts:246` (law 10's message); `briefs.test.ts`
  CF-BRIEF-14's planted fixture lists (:230–262, :343–355, which grow by law 3's K1 and law 11's form
  only if those cases join the planted brief); `pattern-sites.test.ts` planted `toEqual` (:121–131,
  unchanged); `redact.test.ts` CF-REDACT-1's `toEqual` (:76–99 — changes if Python starts stripping
  ANSI); `e2e-helpers.test.ts` planted `toEqual` (:169–175, grows by the inline roles insert and the
  CF-HELPERS-5/6 plants).
- New test ids, each free (`rg -n` over scripts/ src/ e2e/ → none): CF-HELPERS-5, CF-HELPERS-6,
  CF-REDACT-3, LANG-D239-U9 onward.
- `docs/governance/go-template.md`'s census checklist: keys unchanged (this turn edits three item
  texts, no marker).
- `scripts/ci/turn-checks-allowlist.txt`: no new line expected (every check this turn adds is a vitest
  case that runs locally).
- The register: §14 only (DEC-346).

## CENSUS-ITEM old-file-readers

- `docs/features/security-scanning.md:68`: "unless the file is counted on `pattern-sites-allowlist.txt`
  (the sites housekeeping turn 3 moves)" → rewritten in Part A (the list is empty).
- `scripts/conformance/wired.test.ts:218` names the allowlist in a comment (still true).
- `docs/features/attributes.md:171` names AT-12 by behaviour (unchanged).
- `docs/features/e2e-harness.md`: names `switchLanguage` (:316) and the reapers (§INC-276 :339–342,
  §DEC-077, §Scratch attribute definitions :439–441) — the reaper and the settled-language wait are
  documented there in Parts C–D; it does not name `watchAccountLanguage`.
- `docs/features/ci-guards.md`: the reporter's redaction (:213–217, "anything matching
  `sb-*-auth-token`"), its self-test (:220) — rewritten in Part B / E (vi).
- `scripts/e2e-failure-report.ts:2914` (`DEC-083/084 census`), `scripts/brief/go-laws.ts:480`, `:487`,
  `docs/governance/go-template.md:25` (the placeholders) — the files this turn changes.
- AGENTS.md: names none of these (`rg` → no hit). It names every landed mechanism by a line; DEC-367's
  attribute would earn one, and FLAGS forbid the change, so §13 names it.
- Records (handoffs, incidental-findings) that mention AT-12 historically are not readers.

## CENSUS-ITEM second-readers

`rg` for a dynamic `import(` or a `vi.mock(` of `e2e/helpers/ui`, `users`, `account-language`,
`src/i18n/provider`, `scripts/e2e-failure-report`, `redact` or `go-laws` → none. `account-language.ts`
imports `LANGUAGE_STORAGE_KEY` from the provider statically (unchanged). No symbol moves module.

## CENSUS-ITEM chunk-graph

`src/i18n/provider.tsx` is NOT in `SHARED_SHELL_MODULES` (`scripts/route-budgets.mjs:135` →; the
list names `i18n-context.ts`, `entity.ts`, `compiled-catalog.ts`, `locales/en-base.ts` from
src/i18n, not the provider). The provider's code is in the ENTRY chunk: `rg -l "account language read
failed" dist/client/assets/` → `index-Bz4a07uF.js` (129.0 KiB gzipped). No module moves; the
attribute's write grows the entry chunk, which every page downloads (QUESTION 3).

## CENSUS-ITEM environments

- Playwright: three projects — `mobile-360`, `desktop-1280`, `email-serial` (only
  `auth-signup.spec.ts`). Concern 2 reaches the first two (every `switchLanguage` caller runs on
  both); none reaches `email-serial`.
- Vitest: ONE project (`vitest.config.ts`: jsdom, `src/**/*.test.{ts,tsx}` and `scripts/**/*.test.ts`),
  not two — the provider's unit test and every scripts test run there.
- The provider runs on the client only for the attribute (an effect; SSR renders `<html>` without
  it, like `data-app-ready`, `src/router.tsx:15–26`).
- The reaper: `global-setup.ts` runs per lane on CI's temporary backend (and on ethio-staging for
  `e2e:local`), its maintenance block only on shard 1 or `E2E_MAINTENANCE=1` (:588).
- `bun run typecheck` (`tsc --noEmit`, `tsconfig.json` include: src, e2e, three config files) does
  NOT read scripts/: `tsc --listFilesOnly` reaches five scripts files, all by import from
  src/e2e/config (`conformance/kit.ts`, `chunk-modules-plugin.d.mts`, `route-budgets.d.mts`,
  `e2e-migration-preflight.ts`, `en-baseline-heal.ts`). QUESTION 4.

## CENSUS-ITEM mechanisms

Read before anything is proposed: `scripts/lib/pattern.ts` (all of it; `compile` :35–41 the one
site); `go-laws.ts:198` and `:221–226` (the tag called with assembled arrays — the model for
`globToRegExp`); `data-app-ready`'s one home `src/router.tsx:15–26` and its reader
`e2e/helpers/ui.ts:211` `waitForHydration` (the model for `data-lang-settled` and its wait);
`watchAccountLanguage` / `consumeAccountLanguage` (ui.ts :1305–1328) and `setAccountLanguage` /
`reloadSettled` (account-language.ts :51–97); `grantScratchRole` and `scratchLetters` (users.ts
:449–505); `FENCE_PREFIXES` / `FENCE_PREFIX_LIST` (global-setup.ts :48–53 — an existing prefix list
the reaper already loops over) and `SCRATCH_PREFIX` (translations.ts :149); `planAttributeReap`
(attribute-reap-plan.ts); `redact.py` and the reporter's `redact`; law 3 and law 11.

## CENSUS-ITEM first-download

Lock-exact build at f3b215762 + STEP 0 (`bun install --frozen-lockfile` no changes; `bun run build`
exit 0; `node scripts/check-bundle-size.mjs` → "Bundle budget OK."). Entry closure JS 206.0 / 207 KiB,
CSS 23.1 / 40 KiB; the provider's chunk `index-Bz4a07uF.js` 129.0 KiB. Every page (KiB, size /
ceiling):

```
227.0/228 /              225.0/233 /$name          268.2/269 /account
208.6/209 /account_/legal                          209.2/210 /account_/legal_/$versionId
225.2/233 /account_/saved                          206.9/208 /admin       207.7/209 /admin/
319.5/320 /admin/ai      332.8/334 /admin/attributes                      292.6/293 /admin/audit
340.8/342 /admin/categories                        322.3/323 /admin/countries
207.5/208 /admin/images  287.7/289 /admin/impersonation_/$sessionId       278.5/279 /admin/legal
275.9/277 /admin/legal_/$versionId                 277.5/278 /admin/legal_/edit
344.1/345 /admin/listings                          346.5/354 /admin/listings_/$listingId
405.7/407 /admin/listings_/$listingId_/edit        267.6/269 /admin/locations
330.1/331 /admin/monetisation                      323.9/325 /admin/places
289.4/290 /admin/roles   270.2/271 /admin/roles_/$roleId                  365.5/366 /admin/screening
300.2/301 /admin/translations                      303.8/305 /admin/translations_/$lang
289.5/290 /admin/users   284.7/286 /admin/users_/$userId                  223.2/231 /auth
210.0/217 /auth_/callback                          212.0/219 /auth_/reset 227.0/228 /c/$slug
227.1/228 /dev/primitives                          247.9/249 /dev/style   206.3/207 /dev/tall
257.1/265 /l/$slug       210.7/212 /legal/$kind    217.6/219 /legal/accept
211.4/212 /legal/publishing                        314.9/316 /my-listings
322.7/324 /my-listings_/$listingId                 400.7/402 /my-listings_/$listingId_/edit
400.7/402 /post          400.6/402 /post_/$listingId                      210.7/212 /privacy
276.8/284 /settings      210.7/212 /terms
```

Room to the band (ceiling − size − 0.1 local allowance − 0.3): `/account_/legal` and `/admin/audit`
0.0 (at the edge now); `/admin/ai`, `/admin/images`, `/admin/legal`, `/admin/legal_/edit`,
`/admin/screening`, `/admin/users` 0.1; `/admin/roles`, `/legal/publishing` 0.2. The "after" table is
Part C's (QUESTION 3).

## CENSUS-ITEM premises

- P1 — `src/i18n/provider.tsx` is in the shared shell (`SHARED_SHELL_MODULES`): wrong; it is in the
  entry chunk `index-*.js` (chunk-graph above). The growth still reaches every page.
- P2 — "the two vitest projects": there is one.
- P3 — "the reaper's three `like` patterns": eleven sweeps by prefix over eight prefixes, plus the
  attribute plan (concern 3 above); the roles sweep is at :832 (the comment :826), as cited.
- P4 — the Python module's 300-character cut: not in `redact.py`; it is the workflow's
  (`local-backend-proof.yml:443`).
- P5 — the reporter "keeps ANSI stripping as a rule" and both give byte-identical output: today the
  two rule sets differ in four rules, two replacement words and one JWT length, and CF-REDACT-1
  asserts the Python side keeps ANSI codes (QUESTION 1).
- P6 — the self-test's checks "lead with INC-1101, DEC-321 or DEC-365": the single-label block
  (:2668 → :2914) holds INC-398, R1a, INC-973, DEC-340, INC-1101, R1b and four unprefixed checks;
  DEC-321 and DEC-365 already print their own labels.
- P7 — Part E (iv)'s premise that the directive breaks rule 10's TypeScript law as checked: `tsc`
  never reads either test or either `.mjs`, so the directive, and a `.d.mts` added beside each module,
  are judged by nothing today; two more `.mjs` modules imported by TypeScript under scripts/ have no
  declaration (`budget-band.mjs` ← `conformance/budget-band.test.ts:10`, `ci/turn-checks.ts:50`;
  `bundle-closure.mjs` ← `bundle-closure.test.ts:22`) (QUESTION 4).
- P8 — "no existing conformance assertion keeps every `.mjs` declared": `rg "d\.mts"` over the tree →
  no guard; `route-budgets.d.mts` and `chunk-modules-plugin.d.mts` exist and nothing names them.
- P9 — law 3's K1 clause is a text law today (`scopeFindings` takes no root); checking "a file of
  that name exists anywhere under scripts/, src/ or e2e/" needs the tree, so it lands as a tree law
  (CF-BRIEF-3 keeps its name; check-go passes the root).
- P10 — "whether every account-rule branch can set the attribute from one line": not from one line
  inside the effect (eight exits, two of them in promise callbacks), but from one HOME: one state
  that every exit sets through one callback, and one effect that writes or removes the attribute on
  `<html>` (decide-and-name below). The attribute must also be REMOVED when a new identity's read
  starts (an in-page sign-in, :494), or a pick right after an in-page sign-in would not wait.
- P11 — the line numbers read on f3b215762: every one cited for go-laws.ts, go-template.md,
  provider.tsx, ui.ts, account-language.ts, users.ts, legal-admin.spec.ts, global-setup.ts (:693,
  :815, :826/:832), e2e-failure-report.ts (:116 → :122, :2914), the allowlist and redact.py holds.
  The four COUNT lines print 67, 357, 36, 98 (as written). The provider has a unit test
  (`provider-d239.test.tsx`).

## Decide-and-name (the plan, §10 at the end; each continues unless the ruling says otherwise)

- The token check's name: `isTestId(word)` in go-laws.ts — split a word on characters outside
  `[A-Za-z0-9$_-]`, then a run is an id when its `-`-separated tokens are `[A-Z]{2,6}`, zero or more
  `[A-Z0-9]+`, then `\d+` (each token by a flat anchored class test, no nested quantifier). Cases under
  CF-BRIEF-7: `xCF-A-1` (an id inside a word), `$CF-A-1` (at a `$`), `CF-a-1` (a lowercase token),
  `ABCDEFG-1` (seven capitals) refused; `(CF-HELPERS-5,` and `CF-PLANT-9` found.
- The placeholder wording (one form in law 10's message, its doc comment and the template's :25):
  `COUNT: N := COMMAND` — N the number the command prints, COMMAND a read-only shell line.
- The attribute's set points: `const [langSettled, setLangSettled] = useState(false)`; the account
  rule calls one `settle()` at every exit — :489 signed out, :495 `?lang=`, :499–503 failed read,
  :507 nothing to save, :509–513 AFTER the save answers (ok or not: the session-start save and a
  pick's save race on the same column otherwise, which `setAccountLanguage` polls around today,
  account-language.ts :69–74), :515 unpublished code, :524 after the four writes, :526–530 `.catch`;
  `setLangSettled(false)` at :494 when a new identity's read starts; :488 and :493 leave it as is.
  One effect writes `document.documentElement.dataset["langSettled"] = "1"` or deletes it — the
  only place `data-lang-settled` appears in src/ (CF-HELPERS-5).
- `watchAccountLanguage` and `consumeAccountLanguage`: no caller needs them after Part C — the sign-in
  page's own read ends in the same attribute (D239-E2/E4 assert `html lang` after `signIn`, no watch).
  Both are removed from ui.ts; a helper-only `waitForLanguageSettled(page)` (ui.ts) is what
  `switchLanguage` and `reloadSettled` call; the spec arms (AT-12 :707, one-line-slots :56, :89–92,
  :113–116, one-line-slots-admin :52–56, :66, :69–72) are deleted, the picks after them already go
  through `switchLanguage`. A failed wait names itself: "the page never said its language was settled
  (DEC-367)".
- The rules file: `scripts/ci/redaction-rules.json` = `{ "secret_env": [...], "keep_env": "GITHUB_SHA",
  "rules": [{ "name", "pattern", "replacement", "keep_env"? }] }`, replacements with `$1`-style group
  references that redact.py translates once at load; redact.py compiles with `re.ASCII`; the TS side
  loads it in `scripts/e2e-failure-report.ts` (exported `redactionRules()`), compiling each pattern
  through `authored` (the reviewed site stays `pattern.ts:40`). Subject to QUESTION 1.
- The prefix module: `e2e/helpers/scratch.ts` (new) — `SCRATCH_PREFIXES` (each with its kind and its
  LIKE form, `_` and `%` escaped) and `likePrefix(prefix)`; `users.ts`, `translations.ts`, the
  makers QUESTION 2 keeps, and global-setup read it; FENCE_PREFIXES joins it or stays the fence list
  the module re-exports. The reaper's unit case lives in `e2e-helpers.test.ts` beside CF-HELPERS-6
  (a new `src/test/` file is outside SCOPE). Subject to QUESTION 2.
- The `.d.mts` export lists: `step-failures.d.mts` — `TAIL_LINES: number`, `failedStepLines(stepsJson:
  string, logDir: string): string[]` (as the module's JSDoc says); `start-failure-excerpt.d.mts` — the
  eight exports above. Subject to QUESTION 4.
- The self-test label: each failed check under the record its name leads with (`/^(?:INC|DEC)-\d+\w*|
  ^R1[ab]\b/`), the unprefixed ones under `DEC-083/084 census`, one `SELF-TEST FAILED — <record>: …`
  line per record.
- Law 11: `TITLE` also reads `` commit (`…` `` / `` Commit (`…` ``; law 3's K1 clause names the
  existing path (`SCOPE names <path> (new); <existing path> already exists`).

## CENSUS-ITEM findings

- F1 — `scripts/` is outside `tsconfig.json`'s include, so `bun run typecheck` judges no script and no
  script test except five reached by import (environments above): rule 10's TypeScript law (no `any`,
  no `!`, no `as unknown as`, no `@ts-expect-error`) holds over scripts/ only as far as ESLint checks
  it. Structural; beyond this turn.
- F2 — `src/server/ai/gateway.test.ts:407` carries `@ts-expect-error` (rule 10); outside scope (K2).
- F3 — `e2e/helpers/auth-form.ts:32` builds `^${en["auth.signUpButton"]}$` without escaping a
  catalogue string (a label with `?`, `(` or `.` would change the match); `e2e/helpers/ui.ts:41`
  escapes the same kind of string. Outside scope.
- F4 — `scripts/en-baseline-heal.ts:12` defines `SCRATCH_PREFIX = "e2e.scratch."` a second time
  (`e2e/helpers/translations.ts:149` is the first) — a value with two definitions, INC-1106's class;
  outside scope (scripts/en-baseline-heal.ts is not in SCOPE).
- F5 — `e2e/global-teardown.ts:9`, `:28` and `e2e/global-setup.ts:206` restate the scratch-user
  namespace `e2e+…@ethio-e2e.invalid` that `e2e/helpers/users.ts:45` builds (concern 3's class).
- F6 — `e2e/admin-monetisation.spec.ts:54` keeps its own `SCRATCH_PREFIX = "e2e_mon_"` (a spec literal,
  LEFT by the brief).
- F7 — code-scanning alerts #442, #443, #445 are open on `dev` (2b11a9d29) for
  `scripts/doors/manifest.ts:129` and `scripts/doors/rows.ts:137/139`; this lane already moved both
  (turn 2), so they close when PR #34 merges. On the PR #34 merge ref only #453 and #457 are open —
  both this turn's.
- F8 — Limits: `/tmp/hk3b-chat.txt` (a byte copy of the brief made during STEP 0's comparison) sits
  outside `/tmp/ethio-scratch/housekeeping-3b/`; it is the operator's to remove (my tool does not run
  `rm`). The build left `dist/` (ignored).

## QUESTIONS

1. Concern 4 — what "one rule set" means for the two writers' OUTPUT. Applying the union to both
   changes what each writes today: the E2E reporter would start masking account ids, e-mail
   addresses, 32+ hex strings (every 40-hex SHA but the run's own `GITHUB_SHA`) and `sb_` keys in
   every text it passes through `redact` — e2e-last-failure.md's quoted bodies and the flake ledger's
   message field (the ledger's `commit` field is written after redaction, `ledgerLines` :530 →
   :541, and stays); redact.py would start stripping ANSI codes
   and masking `sb-…-auth-token`. One replacement word per rule must be chosen (`[masked JWT]` or
   `[redacted-jwt]`; `[masked]` or `[redacted]`) and one JWT length (`+` or `{5,}`). Proposal: the
   union, in one order (ANSI first), redact.py's words and `+`, the commit exception and the secret
   environment names as fields of the file — so CF-REDACT-1's expectation for the ANSI probe changes
   and the reporter's evidence masks what the lanes' evidence masks. Or rule a narrower set.
2. Concern 3 — how far the prefix list reaches. The brief's guard reads "every `like`/`ilike` in
   global-setup.ts that sweeps by a scratch prefix names a prefix of the list, and no helper builds a
   scratch name with a prefix outside it": by the census that is eleven sweeps over eight prefixes
   (`e2e.scratch.`, fence `zxx`/`zxy`, `e2e-`, `E2E-Scratch-`, `%e2e-%`, `e2e+`, `e2e-cat-listing-`,
   `e2e-cat-`), the attribute plan's `e2e_`/`e2e-`, and 26 name builders in eight helpers (19 in
   posting.ts) — plus the two existing lists (`FENCE_PREFIXES`, `SCRATCH_PREFIX`) that would fold into
   it. Proposal: the whole of it as the brief's words read — one module, every sweep in global-setup
   and `locations.ts` reading it, every helper builder reading its prefix (the posting stems through
   one `e2e_<kind>_` builder), the roles sweep matching both `e2e-` and `e2e_scratch_role_` (INC-1104);
   global-teardown and `scripts/en-baseline-heal.ts` (outside SCOPE) named in §13. Or narrow it to the
   roles class and the three sweeps the brief counted.
3. The first download. Part C's attribute grows the entry chunk every page downloads; at today's sizes
   `/account_/legal` and `/admin/audit` sit at the NEAR band's edge (0.0 KiB room with the local
   allowance) and six more pages have 0.1 KiB, so any growth over 0.05 KiB leaves pages inside the
   band, which CI's bundle-budget job fails. Their ceilings live in `scripts/route-budgets.mjs`, which
   SCOPE does not name (rule 10: raise now every page the change leaves inside the band, DEC-296's
   form). Ask: add `scripts/route-budgets.mjs` to SCOPE for ceilings only, each raised line carrying
   its cause (DEC-367's attribute) and measured on this machine (`ceilingForLocal`).
4. Part E (iv) and the local spec runs. (a) `tsc` reads neither the two tests nor the two `.mjs`
   modules (P7), so removing the directive and adding the two `.d.mts` changes nothing any check
   sees, and "every `.mjs` the tests import declared" also covers `budget-band.mjs` and
   `bundle-closure.mjs`, whose `.d.mts` are not in SCOPE. Proposal: the two `.d.mts` as the brief
   names them, plus a `wired.test.ts` assertion that every `.mjs` a scripts TypeScript file imports
   has a `.d.mts` beside it exporting each imported name — with `budget-band.d.mts` and
   `bundle-closure.d.mts` (new) added to SCOPE; or the assertion limited to the two `scripts/ci`
   modules, the other two named in §13; F1 (scripts/ outside tsc) is a separate turn either way.
   (b) DEC-364 and Part C: "every spec whose helper path changed" is the 23 `switchLanguage` callers
   and the three `setAccountLanguage` callers (24 files, `shell.spec.ts` among them), run three at a
   time locally on one project. Proposal: locally, the specs this turn edits (AT-12's file, the two
   one-line-slots specs, `legal-admin.spec.ts`) and the D239 behaviour specs
   (`i18n-sign-in-language.spec.ts`, `page-head.spec.ts`, `i18n-coverage.spec.ts`), each whole on
   `desktop-1280`; the other 19 judged by the lanes and the repeat lane. Or rule all 24.

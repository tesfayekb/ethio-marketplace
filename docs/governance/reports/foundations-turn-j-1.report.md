# Foundations turn J-1 — report (J-1 and its continue)

## 1. CI first

Run 40971107823 on 9a262ea3 was FAILURE for two reasons:

- (a) The first-paint budget. The INC-1003 ceilings fix it.
- (b) INC-1004, PGH-E2. It is fixed below.

CI on this turn's last commit is the judge of both.

## 2. Step 0

- foundations-turn-j-1.md: sha256 0d6d61964a6f95ea00f4f034d717f1cc7ad98f3a30440bddc8cc1fd51aea2733. Its STRINGS block's sha256 is d33412143ce04b792cb047339ff4c72b429eb80b220353fcc9543d3491520796, 663 bytes.
- foundations-turn-j-1-continue.md: sha256 1ce04f2c6d4a532785919c8a18476f8188badb48e9ef484595fd9cbbfdba059c, read back from the fenced block.
- Roadmap line 3 names both files.

## 3. INC-1003 ceilings

24 ceilings are set to floor(CI size + 0.3) + 1. The 16 named pages take the ruling's values; the other 8 use local + 0.1. Each changed line keeps its causes and adds "CI's size + the NEAR band (INC-1003)".

## 4. Deviations (accepted)

1. The ceilings went in with the platform's commit, not a commit of their own.
2. photo_screen's `warnings` takes strings only.
3. "Name hidden" stays for a reader who may not see names.

## 5. INC-1004: the language pick sees what a person sees

- **Cause (from the evidence):** the second pick clicked the switcher while the first pick's menu was still closing. That click was lost, and language-option-en never showed. Two specs already waited for the menu to close by hand; PGH-E2 did not.
- **Helper change:** `switchLanguage` (e2e/helpers/ui.ts) now:
  - waits until no menu is open before it clicks the switcher;
  - asserts that the menu is closed once the pick has applied.
  - No timeout was raised and no retry was added. The contract is unchanged.
- **Copies moved:** two, both onto the helper:
  - legal-history.spec.ts :177–178;
  - legal-pages.spec.ts :189–190.
- **Census:** every caller of switchLanguage, 15 spec files. The other menu waits are for other menus and stay:
  - smoke-auth-i18n.spec.ts:83 (the account menu, after Escape);
  - overlays.spec.ts:59;
  - on-demand-failure.spec.ts:34.
- **App defect:** none. The new assertion after the pick never fired, so the switcher closes as it should.
- **Tests (retries 0, both projects):**
  - page-head, legal-history, legal-pages and name-check-queue, each file whole: 27 passed, 1 skipped (NCQ-E2E-3 runs on desktop only, by its own J6 rule).
  - By id, the other switchLanguage tests in 12 files (AP-13, AP-41, AT-12, RP-8, RP-11, RP-12, TR-9, D239-E3, D239-E6, PW-85, PW-30, PW-55, PW-162, PW-183, PW-42, PW-155, PW-161, BB-1, the footer test, TR-41, TR-27 and the smoke test): 44 passed, 2 skipped.
  - CI's repeat lane is the flake proof.

## 6. Part A, INC-1002: done

- providerSchemaOf derives the provider's answer shape from each task's output. category_icon and photo_screen are byte-equal to the old literals (AIRS-1…5).
- name_check reads `"of": null` as absent.
- The gateway logs a content-free `unusable answer: parse | shape`.
- The ARS census, with its planted proof, fails when a JSON text task has no derivable shape.
- **Migration:** apply 4aaa2474 → expect mark 20261030050000.
  - ethio-prod was read back at stop 1. ethio-staging was applied by the supervisor.
  - NCAP-1…7 and JLOST-1…3 ran clean.
  - N = 5 unusable answers in a row → needs_review, which stays public. 'unavailable' does not count; clean and imitates reset the streak; a new name resets the row.
- **J-1 item 1, done:** name-check-catchup marks 'unusable' on unusableAnswer. Every other failure stays 'unavailable', with the pause rules unchanged.
  - The run keeps its four figures; an unusable answer counts under unavailable. A separate count is on the roadmap and needs a migration.
  - The tests caught a real defect: `counts["unusable"]` would have been NaN. It is fixed.
  - Census of name_check_mark callers: name-check-catchup.ts (mapped) and listings/identity.ts :82–:97 (clean only, unchanged). There are no others.
  - Tests: NCJ-20 (unusable) and NCJ-21 (timeout, providerError and unavailable stay unavailable).
- **J-1 item 2, done:** NCQ-E2E-4 in name-check-queue.spec.ts, the Admin › Screening names queue.
  - Scratch seller; five 'unusable' marks through the service client.
  - The row shows the unusable text and no `of` line.
  - Its Clear shows doneVisible.
  - The database reads clean, and a buyer sees the name.
  - afterEach releases a needs_review hold as well.
- **Queue and health UI:** needs_review rows, the lost outcome and the three keys (EN and AM). Tests: NCR-1…3.

## 7. Part B, INC-1000: done

- Each refusal logs one `[job-refused] <job> secret_missing | bad_signature | stale | replay` line, with no secret, signature or timestamp. The caller still gets the constant 401. Tests: JRF-1…6.
- job_call closes unclaimed 'dispatched' rows older than 10 minutes as lost/never_claimed. That is SQL.
- Admin › Screening's health line reads the newest run's outcome through job_health_core and shows "lost".

## 8. Unit count

2,263 tests in 379 files at the last full checks run, before the ERRT-6 fix. That run had one failure, ERRT-6, caused by my new census. It now passes through errorText.

## 9. Checks

CHECKS_LINE

## 10. K2

- Tooling `localeCompare` sites, unchanged from L-2.
- The other menu waits listed in §5. They belong to other menus.
- The job health line has no separate unusable count. This is the roadmap follow-up and needs a migration.

## 11. Files

FILES_LIST

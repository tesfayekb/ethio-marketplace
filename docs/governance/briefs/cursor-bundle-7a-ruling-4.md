RULING — cursor-bundle-7a, stop 5: CT-23 waits for the account's first language save. Base: cursor/bundle-7a-2 5690ac2db

**MODEL — Claude Sonnet 5.5, in the SAME Cursor chat (it is stopped at stop 5).**

Option (b), through the helper that already holds the wait. Your reading of the cause is right.

PREVENTION (G70)

- Class — a test's exclusion removed on a premise that covered one branch of the writer (S793, mine). Ruling 1, decision 5 removed CT-23's audit exclusion because an unchanged save writes nothing (INC-1290). But D239's account rule also has a changing branch: an account with no `preferred_language` receives the device's language once, at its first session start (`src/i18n/provider.tsx`, the account rule's comment). A leased account starts with none (the lease writes NULL, `e2e/helpers/account-language.ts`'s header), so that first save audits once and can land after the watermark.
  - Instructions — in force now: before a ruling removes a test's exclusion, the supervisor reads every writer of the excluded rows in the test's window, branch by branch.
  - Repository — changed here: the wait for the first save becomes one exported step of the helper that already holds it, and CT-23 uses it. The test then reads the audit whole, with no exclusion, which removes the race at its cause (DEC-464).
  - Cursor rules, Knowledge — not needed.

WHY NOT (a). An exclusion by action name would also hide a `profile.preferred_language` row that the refused import itself wrote. The test's claim is "writes nothing", and (b) proves it whole.

DECISIONS

1. THE BRIEF'S SCOPE GROWS BY `e2e/helpers/account-language.ts`.
   - Export one step from it: `awaitSessionLanguage(userId: string): Promise<void>`.
   - It polls the module's own `storedLanguage(userId)` until the value is not null, within `SETTLE_MS`, with the message `setAccountLanguage` already uses for the same wait (`[e2e:lang] the session-start save of the account language never landed (D239)`).
   - `setAccountLanguage` calls it for its first wait instead of its own copy, so there is one mechanism (K1). Its behaviour is unchanged.
   - If a standing guard demands that the new name join a list (CF-HELPERS-1's names, the helpers' header), make that mechanical edit and name it under §10.
2. CT-23 (`e2e/admin-categories-lifecycle.spec.ts`):
   - After `gotoReady(page, "/admin/categories")` and before the watermark is read, call `await awaitSessionLanguage(importer.id)`.
   - Comment: the account rule (D239) gives an account with no language the device's language once, at its first session start, and that save audits; after it the rule never writes the account again (INC-1290), so the audit read from the watermark on stays whole.
   - The audit read keeps no exclusion. The meter exclusion (`account_pref`) stays as ruling 1 wrote it.
   - Correct the closing comment above the audit read so it names both branches: the first, changing save, which lands before the watermark; and the unchanged saves, which write no audit row.
3. Prove it: run `bun run e2e:local -- e2e/admin-categories-lifecycle.spec.ts --grep "CT-23" --project=mobile-360 --project=desktop-1280 --retries=0` once. Also run every other spec that calls `setAccountLanguage`, by `--grep` of their test ids in both projects (`rg -n "setAccountLanguage" e2e`, the command and its hits in the report). CI's repeat lane repeats the changed spec and judges the race.
4. Then the self-review, the one push (the draft #107 moves to Ready for review only when the supervisor says the run is green), and the report as ruling 3 decision 6 says. The report carries the advisor step's capture from #107's run.
5. DEC-414's count: this stop is the supervisor's (S793), not yours. The build copies under `/tmp/ethio-scratch/` are the operator's to remove.

NUMBERS ASSIGNED (G66): S793 (the supervisor's). No new INC or DEC.

# Bundle 12 — the tidy-up round, turn T3: the definition editor names the listings holding an answer its save removes (bundle 7's named item), and INC-582's rule spares a switched-off option: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T3 (2026-10-13). ONE TURN, NO MIGRATION. One new string. No package change.
Base: the commit that lands turn T2 on dev (send this brief after T2's turn has ended); the census below proves every file by content. This file is public: it is written as build instructions. Tier B: the attributes console's definition editor, the import gate's options cell (the catalogue import), an e2e spec, a unit test, docs. No door, no database change.

ANSWERS TO THE LAST TURN
- Turn T1 is CLEAN, and the operator's walk passed all three of its lines: Post from the home page goes straight to the form, the photo step shows the public notice, and a business card goes through. Its census confirmed INC-582's cause: Alcatel's "Other" series has the value `alcatel_other`, one of 355 per-parent Others. Turn T2 is read against its own stand-in when it lands.

WHY THIS TURN
- Bundle 7 named an item and did not build it (block S56; docs/governance/handoffs/2026-10-07-order-of-work-additions.md): "The console's definition editor shows no count when its save removes an answer ads hold". Read in the editor today:
  - a stored option row is locked: it can be switched off ("Offered when posting" unticked, `"active": false`), which keeps it and its words on the listings that hold it, but it cannot be removed;
  - a save therefore removes answers when the type changes to one without options, which drops every stored value. The editor says nothing about it.
  - `admin_attribute_holders(attribute, link, value)` counts the listings that hold an answer; "Remove from a category" already shows its count (AT-73).
- INC-582 (turn T2's import rule). The import gate refuses an option labelled Other whose value is not `other`. The catalogue's 355 per-parent Others (`<parent>_other`) go, and the curator switches them off rather than deleting them, so the listings that hold one keep its words (INC-466). A switched-off option is never offered, so it asks nothing either way. As written in T2, the rule also refused a switched-off one; this turn spares it.
- The truth pass: bundle 7 also named "one unit case of the reset function: a prefill from an unmoved parent's fact". It exists: reset-scope.test.ts case (x), added 2026-10-07. Only the roadmap records it.

WHAT THIS TURN BUILDS
- src/features/admin-attributes/attributes-service.ts — `readAttributeHolders` takes an optional `value` (sent as `p_value`).
- src/features/admin-attributes/use-attributes.ts — `useRemovedAnswerHolders(attributeId, values)`: one read per value, combined into `total`, `known` (every read answered) and `failed`. A failed read is never zero.
- src/features/admin-attributes/attribute-dialogs.tsx — the editor works out the values its save would remove:
  - every stored value, when the stored type has options and the new type does not;
  - otherwise, any stored value missing from the rows.
  When every read has answered and the total is above zero, it shows one line (`attribute-edit-removed-holders`). A failed read shows the error line. The save is never blocked.
- The new string (G43): `admin.attributes.edit.removedHolders`:
  - "{count} listings hold an answer this change removes. To keep its words on those listings, untick “Offered when posting” instead of removing the option."
  - «{count} ዝርዝሮች ይህ ለውጥ የሚያስወግደውን መልስ ይዘዋል። ቃሉ በእነዚያ ዝርዝሮች ላይ እንዲቆይ፣ አማራጩን ከማስወገድ ይልቅ «በማስታወቂያ ጊዜ ይቀርባል» የሚለውን ምልክት ያንሱ።»
- src/server/imports/gate.ts — the options cell reads an option's `"active": false`, and INC-582's rule does not judge a switched-off option.
- src/server/imports/gate.test.ts — two more INC-582 cases:
  - a switched-off Other under another value passes;
  - the same option with `"active": true` is refused.
- e2e/admin-attributes-safety.spec.ts — AT-81. A scratch choice question is held by one scratch listing. The editor shows no line, then the count of 1 when the type changes to text, and no line again when the type changes back. Nothing is saved; the fixture is reaped. It imports `attributeEdit` from the helpers.
- Docs: attributes.md, the changelog, the roadmap (line 3; the T3 line, with the truth-pass note).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The count reads the holders of each value the save would remove, and never blocks the save. This is the rule of "Remove from a category" and of the import (the seller is never blocked).
- The line names the way to keep the words: switching the option off.
- INC-582: a switched-off Other may keep any value. This is the way out for the 355 per-parent Others; the curator is told in the next message to it.
- The new id is AT-81.

TESTS
- Unit: the two INC-582 cases.
- E2E: AT-81 (NEW).
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn T2 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 728 unit tests (123 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard.
- Red first: the switched-off case fails on T2's rule ("optionOtherValue" for a switched-off Other). AT-81 is proven in CI only (INC-506); on the base the editor has no such line.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T2's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the usage maps;
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  77ff5696c54fbc6429be2617540147c56590945e5afaeab746f6e0a26e89f574  docs/_changelog.md
  2f8395a9d96df91a625ab56c695459e6d34d8277279ca8ae9b39547d515c2e3e  docs/features/attributes.md
  b99c7f09f15ce7cc032160db564423fd3f747f09c36a1379afcdd5fa6d11b5a8  e2e/admin-attributes-safety.spec.ts
  56cea53f203e44b9385d98d3bf66cf5deefcb1c2f19b69ddd6776ed40c1fd6ab  roadmap.md
  fd2e3a047c229f18cd5e14c7f02f341829edb49f9e4b434b2a7c67dbe7d3512b  src/features/admin-attributes/attribute-dialogs.tsx
  e5fc52cfa6955ea89593e72fd9a32545c35685926837d8b4984f29242b6a2696  src/features/admin-attributes/attributes-service.ts
  54fa463f83299b0688cc058777297e9120f01c96a81b5ef7c4b0bbf5e3ac9092  src/features/admin-attributes/use-attributes.ts
  5710c81ff29e315225fa5ebf977aecf11e5915c522d7382da494014d59cb714a  src/i18n/locales/am.ts
  70d32bb5d6dc12394b720d1aef7d9d339719e832fcb84fce5c24351d4d2ced90  src/i18n/locales/en.ts
  7097baf5c1dbc331e619dc5b2150e362099c302c05a77a0cccf9c2b4f5fcd7dd  src/server/imports/gate.test.ts
  756acead064099012b6d58ab6a03f79c57674f29f6f64fd0f812f4d9dd8ab00a  src/server/imports/gate.ts

THE CARRIER — T3-TURN-CARRIER-2026-10-13.md (9,988 bytes; sha256 2503628a210683e98d40d26280aaffa8eb0cac35cf7b9254ad08515d33eb4eae; 19 sections)
- Its first line starts "T3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 13 paths below; each must equal the table. On any mismatch, STOP. The two usage maps are among them; they are hashed after step 5. Also paste the saved brief's sha256sum.
  5dd935e72c3b8ea88fe4bde6a7b93c181667f34454042ef5ff64c60f7a8e3a56  docs/_changelog.md
  920a49aa22f83142e737bd707cfa5c5915a84d0a68457b74f5ab55a643701fae  docs/features/attributes.md
  93b406dd759a5d90a81341ec2d008dc24bf39b63640f2147de365881bff34736  docs/generated/i18n-usage.json
  8591658022a5f9b40f2f87e569f5caf0c5e938dff6f65366bc67c7c7c62f4168  e2e/admin-attributes-safety.spec.ts
  93b406dd759a5d90a81341ec2d008dc24bf39b63640f2147de365881bff34736  public/i18n-usage.json
  6d8f3b6b40ef37fddb48efc952fa4aa555e22df9a928c980130efacd79e226ab  roadmap.md
  230133a359e846cafa8ce5b1dedf641b2ede192dfb8a4aed20d6d4a401eb6571  src/features/admin-attributes/attribute-dialogs.tsx
  f77631d6d086a58f60537a6f2f893e678b2aa1736fe4372e84b074f360d14e5f  src/features/admin-attributes/attributes-service.ts
  24c6ba4166cefe7d2b22960e455f4e74fd0aedee35515008af548e60640d3f00  src/features/admin-attributes/use-attributes.ts
  f423b079fdb9e91dacef97c54ab88e115573fc040710756ab90fbe4f67c6c9ce  src/i18n/locales/am.ts
  cddd312b599ddbf99a38b47b88b6902f8f62251270c244f4f8f8815336986daa  src/i18n/locales/en.ts
  ebc85f08f0fac9ef7d3d477a9fae0ddc7ff14836b007b4ca89d43e8d233de0bc  src/server/imports/gate.test.ts
  a99fa6724a5fa4d42e17325720917c81001861a12d3dfa4a5e5425b1a7322bd7  src/server/imports/gate.ts

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (one new key), then exits 1. Run it again: it must print "usage maps match the tree." Then hash the two maps (the table above).

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 728 passed (123 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(b).
- The 13 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 13 paths and the brief.
- The checks.
- The new string, key by key, English and Amharic, as it stands in en.ts and am.ts (G43).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit. A short walk (admin, any width): open a choice question in Admin › Catalog › Attributes, change its type to Text; if listings hold its answers, the count shows above the buttons; change it back and Cancel.
```

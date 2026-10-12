# Bundle 11 — turn C4: the operator's walk of C2 — the roles menu's Open, and passwords confirmed and typed twice: brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C4 (2026-10-12). ONE TURN, NO MIGRATION. 5 new strings (below). No package change.
Base: dev 07c1e2b632863e63fc1a4b0340c69313680bc7d5. This file is public: it is written as build instructions. Tier A: the sign-up, reset and Settings password forms and Remove password's check (auth). Tier B: the roles table's menu, the admin tables' check, the tests and the docs. No door and no database change.

ANSWERS TO THE LAST TURN
- Turn C3: verified (dev 07c1e2b6 holds the delivered tree and the brief as sent); CI run on 07c1e2b6 SUCCESS.
- Turn C2: CI SUCCESS on 4e111104; the operator's walk of its red buttons passed (the photo's Remove waits for a draft with a photo).

THE OPERATOR'S WALK OF C2 (2026-10-12): the red buttons passed. He asked for:
- D142 — on the roles table, the three-dots opens the role's page as well as the row does (today it holds View members only);
- D143 — Remove password asks for the password to confirm; changing a password asks for the new one twice, and they must match; the same on the reset page (after "Forgot password") and on sign-up.

WHAT THIS TURN BUILDS
- D142:
  - src/features/admin/roles/roles-list.tsx — the row's three-dots holds Open first (`role-actions-<name>-more-open`, the role's page), then View members.
  - scripts/admin-tables.ts — rule T9: a row that opens its own page (`rowHref`) and carries a three-dots menu offers Open in it (`key: "open"`); on the base it refuses roles-list.tsx alone. scripts/admin-tables.test.ts TBL-1 gains its planted cases.
- D143:
  - src/features/auth/password-pair.ts (NEW) — `passwordPairProblem(password, again)`: two that differ answer "The passwords do not match." (`auth.errorPasswordMismatch`); src/features/auth/password-pair.test.ts (NEW) PPR-1.
  - src/routes/auth.tsx — the sign-up view shows a second field, Confirm password (`#auth-password-confirm`; not in the sign-in view); two that differ are refused on the form and no sign-up request is sent.
  - src/routes/auth_.reset.tsx — Confirm new password (`#reset-password-confirm`); after the length check, two that differ are refused on the form.
  - src/routes/settings.tsx — Change password gains Confirm new password (`#new-password-confirm`), refused on the form when they differ; Remove password's confirmation asks for the current password (`#remove-password-current`, under "Enter your current password to remove it."; "Yes, remove" greyed until it is filled; Cancel clears it; a wrong password keeps the confirmation open with "That current password is not correct.").
  - src/features/auth/auth-service.ts — the current-password check Change password already made (a throwaway client that persists nothing) becomes `verifyCurrentPassword`, used by `changePassword` and now by `removeOwnPassword(currentPassword)` before `remove_own_password` is called. The server door and its guard (another sign-in method must remain) are unchanged.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Remove password is confirmed the way Change password already is: the password is checked against the sign-in service on a throwaway client before the door is called. (A check inside the server door would need the password sent to our own server; that is not in this turn.)
- The second field appears only where a new password is chosen: sign-up, the reset page and Change password; signing in asks once.
- The roles menu's Open comes first, then View members; the rule is written into the agreed tables' check (T9) so every table whose row opens a page offers Open in its menu.

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts)
- auth.passwordConfirm — en "Confirm password" · am "የይለፍ ቃሉን ያረጋግጡ"
- auth.errorPasswordMismatch — en "The passwords do not match." · am "የይለፍ ቃሎቹ አይመሳሰሉም።"
- settings.newPasswordConfirm — en "Confirm new password" · am "አዲሱን የይለፍ ቃል ያረጋግጡ"
- settings.removePasswordAsk — en "Enter your current password to remove it." · am "ለማስወገድ አሁን ያለውን የይለፍ ቃልዎን ያስገቡ።"
- admin.roles.action.open — en "Open" · am "ክፈት"

TESTS
- Unit: PPR-1 (NEW); TBL-1 (T9's planted cases).
- e2e/admin-roles.spec.ts — RP-16: the menu's order (Open, View members); Open lands on the role's page; then View members as before.
- e2e/auth-signup.spec.ts — SU-1 (NEW): the confirmation field shows only in the sign-up view; two passwords that differ are refused ("The passwords do not match.") and no sign-up request leaves (no mail sink needed). `signUpFresh` fills both fields (A-1+A-2).
- e2e/nightly/auth-resend-exhaustion.spec.ts — its `signUpFresh` fills both fields (A-3).
- e2e/auth-reset.spec.ts — R-3: a mismatch refused on the form, then the reset as before; R-9 fills both fields.
- e2e/settings.spec.ts — S-3: a mismatch refused on the form, then the wrong current password, then the change, each with both new-password fields.
- A successful Remove password needs a second sign-in method (a Google identity) that e2e accounts cannot hold; S-4 (Remove refused for an email-only account) is unchanged.
- Not edited: every other test.

DOCS
- settings-surface.md, auth-password-recovery.md, admin-roles.md, the changelog, the roadmap (line 3; the C4 line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C3 applied)
- typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 689 unit tests (115 files), the usage maps, the hardcoded-string scan, the root-route check, the selector self-test: all clean. The admin tables' check on the base: one refusal (roles-list.tsx, T9); after: none.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-33.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 07c1e2b6…; any conclusion). If it shows another commit, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 23 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-33.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 19 files → each equal to:
  158e072a5330169f1fc89551defa074a95763375543284b344988920e5d37e1f  docs/_changelog.md
  0b9910cb85e705afa38a44685acf3218f305d5c70686c6ecf93352aa04c28538  docs/features/admin-roles.md
  53a92474f80b68fefaefe6d744184fd8640da8e383e81a331d9a707ea9556b06  docs/features/auth-password-recovery.md
  3918c8ddd533de320443af2d1ff4c85863dfb8b6d9c47e227842f15330dae180  docs/features/settings-surface.md
  e7e162a6306a366719c29444b4a7c83a95fc25a2e59d6b65d813473e11806023  e2e/admin-roles.spec.ts
  701324596faca6ec46bd42b0cd99eaa9eef9e88861f534a87d3858e636f5878a  e2e/auth-reset.spec.ts
  15f61ce0932dae382b39b995bebc9eba01ecef53836ea8906e2effc7d4e59b7a  e2e/auth-signup.spec.ts
  cfdb47168a5269e77c3d010cc68e65bc2db7b4c0af43f3b5843b01a123596835  e2e/nightly/auth-resend-exhaustion.spec.ts
  7993097640db78f22f8325d90553c50f88eb592311e4a5938e6c77d8364dbbe8  e2e/settings.spec.ts
  ceaec87ea1e261841ae31599a0288add1c795edcfce85a10cbc85b44db169909  roadmap.md
  89233a8df53cb3f5d8f073ecd02c6c2a0b6846d9c142a7a1e68d52b1dbec6870  scripts/admin-tables.test.ts
  2cdd372c07bd0ff26c979ac4067633a7cd0048d83d75287e9f92c2c96db59b47  scripts/admin-tables.ts
  ca414ec71ab6465ee6502ac365bb147346b88712f7a02426cddd46b5b296ac6a  src/features/admin/roles/roles-list.tsx
  d1a9f2a07f53bdc946da8012080d5b0f708ca17ecb2ab3c1115298978338ad83  src/features/auth/auth-service.ts
  9279971ace7e9ed1be6c7d4b7b2d1afdb5f06dc72f274f5febec4b957cd5f13a  src/i18n/locales/am.ts
  fa6be90247048ad31767f23889f9f1c9791098fa191e25dade4a830a3f336a69  src/i18n/locales/en.ts
  d854bd81c5deb3b6668813426b2dfc69007ed97dce732bab8a9f01542f904758  src/routes/auth.tsx
  3ea3c6f38d27d651e29d1e94cfb0c2a9a07add35fc9007a999ab59778174ec4e  src/routes/auth_.reset.tsx
  82b56c0e9a894faf35a877f36f6cfc84f93155c390308ebe1dbaf7573e311b4d  src/routes/settings.tsx
- (c) `ls src/features/auth/password-pair.test.ts src/features/auth/password-pair.ts` → "No such file or directory" for each.

THE CARRIER — C4-TURN-CARRIER-2026-10-12.md (19,144 bytes; sha256 b2ef55513ddce7be9fc1bdd7004fe7cdef528955998b8218f6fd193012f94e59; 59 sections)
- Its first line starts "C4 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (the new keys; keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 23 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  a4cb6cb4cb05c3712938d0b72efe084ebc00ab965527f53419602df9eeaa3910  docs/_changelog.md
  a8a510637f1e3506a6d7f8468b7ce6854a59084f999cf62745d4845b38e14e9f  docs/features/admin-roles.md
  e93302fca0929ad0438b82a40044172bd35ad44e6caffc2d9a89765e8a404862  docs/features/auth-password-recovery.md
  621ba56b03b0b0f8e3571750146fa46dfdeac827ec36b65c2560c945173426d8  docs/features/settings-surface.md
  edf47a43659a97d55683bd5ef320128768b28be3a1616fb17e42708b907b2957  docs/generated/i18n-usage.json
  337076f08966d70d6cd5911299a827a6126e2fd8c910b8e2e600424e46b03f66  e2e/admin-roles.spec.ts
  e86e10350cdbca2a00a8c5efea256744365481e9271a48a748112de032da3f41  e2e/auth-reset.spec.ts
  b076abe21038a50c5e40b896c1706e774a994427be22ff30139be3885808c198  e2e/auth-signup.spec.ts
  48d627d8f96eb79bf1ad9fd4bcf5820ceed59b2c4bc4c09977ee4bb48fcdbf8a  e2e/nightly/auth-resend-exhaustion.spec.ts
  1751da5d02fdf51ad6e7488eb7b69f8b786d2af2ca7a0799c82139059507874f  e2e/settings.spec.ts
  edf47a43659a97d55683bd5ef320128768b28be3a1616fb17e42708b907b2957  public/i18n-usage.json
  8c9d04397badcafec8e087b0b66ca0ed5c96c6588532ac81126d079776c5270e  roadmap.md
  6a7da62c5914f6405e7c8dd3a58274207bb7ed8b5929b061feb01bebde0ede0b  scripts/admin-tables.test.ts
  34bcbc2194be961cb511badf6d8c320dcf8f988031bac3ab5cfdf11ba8dccbc6  scripts/admin-tables.ts
  5a8aac76cc953377ad38324c3abf8771844a2ad299d029f950abaf715bb1ae53  src/features/admin/roles/roles-list.tsx
  e8a701ad3e4c04df060f1167e33b9f7b6112f2e6c04949e9d7b2982d9e66998a  src/features/auth/auth-service.ts
  8d22d7d330f0f681238aec6220f8f17a5b96b4ab9dad2c0537d4c33f5f407d12  src/features/auth/password-pair.test.ts
  446c1457fc953b7d8f2cc39adcd2ecbfd4a183d1e56403e234b293f2c9a288f7  src/features/auth/password-pair.ts
  61404f23e3378e5d129a0cbc37171db2f9be92b984d1bfc839b7c8069f590957  src/i18n/locales/am.ts
  fce31832202117c9b2034a2c1e22a9de7f32cf0127d163fea615ae294ad3c720  src/i18n/locales/en.ts
  0c31b6876a600310dad372fff1310890a1fb32100a1e2e0966e2fdac481f9ddc  src/routes/auth.tsx
  c7818fd78393cdc0c9aeda232f84d5e268311b8e38b8cd9f8da58bcf4afd0851  src/routes/auth_.reset.tsx
  5c13c65a0f8bcb8242eb0624f7d3e9e88b4eaf586d1246c3441a6c479b5f7c33  src/routes/settings.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 689 passed (115 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 23 sha256sum lines and the brief's.
- `git diff --name-only 07c1e2b632863e63fc1a4b0340c69313680bc7d5` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 07c1e2b632863e63fc1a4b0340c69313680bc7d5 HEAD` too. Expect the 23 carrier paths and the brief.
- The 5 new strings, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```

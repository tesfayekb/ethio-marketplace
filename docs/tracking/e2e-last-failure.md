# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36909917591
- Commit: `d5b9740aa859bc87ee0182efe5dc8dffbe4d02a8`
- Attempt: 2
- Written (UTC): 2026-10-01T19:34:36.296Z
- Passed: 1034 · Skipped: 75 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit — Error: [e2e:u4e] TR-16 revision-count mismatch for e2e.scratch.36909917591-5-5-desktop-1280-0-tr16:

## Flaky bodies (DEC-078)

### admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:u4e] TR-16 revision-count mismatch for e2e.scratch.36909917591-5-5-desktop-1280-0-tr16:
  [0] action=machine prev_status=untranslated prev_value=null prev_machine=false changed_by=0b7905f5-4358-42b7-bfc2-f921b300261b changed_at=2026-10-01T18:58:10.962045+00:00
  [1] action=save prev_status=machine prev_value="⟪am⟫ History source" prev_machine=true changed_by=0b7905f5-4358-42b7-bfc2-f921b300261b changed_at=2026-10-01T18:58:15.688568+00:00
  [2] action=save prev_status=edited prev_value="የሰው እርማት" prev_machine=false changed_by=0b7905f5-4358-42b7-bfc2-f921b300261b changed_at=2026-10-01T18:58:21.220853+00:00
  [3] action=machine prev_status=untranslated prev_value=null prev_machine=false changed_by=fa719ce5-269d-433a-99e6-dba75a7f45f0 changed_at=2026-10-01T19:21:42.740877+00:00
  [4] action=save prev_status=machine prev_value="⟪am⟫ History source" prev_machine=true changed_by=fa719ce5-269d-433a-99e6-dba75a7f45f0 changed_at=2026-10-01T19:21:47.543285+00:00
  [5] action=save prev_status=edited prev_value="የሰው እርማት" prev_machine=false changed_by=fa719ce5-269d-433a-99e6-dba75a7f45f0 changed_at=2026-10-01T19:21:53.209206+00:00
(TR-16 expected exactly 3 revisions for e2e.scratch.36909917591-5-5-desktop-1280-0-tr16

expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 6

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate)
```

Context:

```text
      - listitem [ref=e50]:
        - generic [ref=e51]:
          - generic [ref=e52]: Human edit
          - generic [ref=e53]: Machine
          - generic [ref=e54]: Machine
        - paragraph [ref=e55]: 24 minutes ago · e2e+36909917591-5-2927-2-53qoaf
        - paragraph [ref=e56]: ⟪am⟫ History source
        - generic [ref=e57]:
          - paragraph [ref=e58]: Restores this text as an EDITED value — history keeps everything
          - button "Restore this value" [ref=e59] [cursor=pointer]
      - listitem [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e62]: Machine write
          - generic [ref=e63]: Untranslated
          - generic [ref=e64]: Human
        - paragraph [ref=e65]: 24 minutes ago · e2e+36909917591-5-2927-2-53qoaf
        - paragraph [ref=e66]: (no value)
        - button "Clear instead" [ref=e67] [cursor=pointer]
    - status [ref=e68]: Restored.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 4 | shard 1, shard 4 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · commit_failed duplicate key value violates unique constraint <q> ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-01T19:18:54.905Z | 9.9 min |
| email | 2026-10-01T18:55:24.603Z | 0.2 min |
| shard 1 | 2026-10-01T19:18:45.661Z | 14.1 min |
| shard 2 | 2026-10-01T19:23:17.104Z | 9.5 min |
| shard 3 | 2026-10-01T19:22:08.206Z | 9.1 min |
| shard 4 | 2026-10-01T19:22:46.672Z | 11.4 min |
| shard 5 | 2026-10-01T19:19:23.976Z | 12.5 min |
| shard 6 | 2026-10-01T19:18:53.824Z | 10.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 13.3 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 7.7 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 7.2 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 6.1 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 36 | 5.6 min | shard 1, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 5.1 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 4.9 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 4.9 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 4.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 24 | 4.4 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 4.2 min | smoke, shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.2 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 4.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 4.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 3.3 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 3.1 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 3.1 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 2.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 36 | 2.7 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.3 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.0 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.0 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 6 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.6 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `post-wizard-details.spec.ts` | 4 | 0.4 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-console.spec.ts` › TR-16 the History drawer lists revisions and restores one as a new edit | desktop-1280 | 69.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 31.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 30.3 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 29.2 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 29.1 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 27.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 27.3 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 27.2 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 26.8 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | mobile-360 | 24.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 24.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 66 user(s) owned by process 36909917591-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 36909917591-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 58 user(s) owned by process 36909917591-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 190 user(s) owned by process 36909917591-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 172 user(s) owned by process 36909917591-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 54 user(s) owned by process 36909917591-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 134 user(s) owned by process 36909917591-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 108 user(s) owned by process 36909917591-6
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-58 the route forwarded no message for the refused commit (INC-196 L2)

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-58 the route forwarded no message for the refused commit (INC-196 L2)

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

Context:

```text
          - listitem [ref=e880]:
            - generic [ref=e881]: About
          - listitem [ref=e882]:
            - generic [ref=e883]: How it works
      - navigation "Help" [ref=e884]:
        - heading "Help" [level=2] [ref=e885]
        - list [ref=e886]:
          - listitem [ref=e887]:
            - generic [ref=e888]: Safety
          - listitem [ref=e889]:
            - generic [ref=e890]: Contact
      - navigation "Legal" [ref=e891]:
        - heading "Legal" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Terms
          - listitem [ref=e896]:
            - generic [ref=e897]: Privacy
    - paragraph [ref=e899]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

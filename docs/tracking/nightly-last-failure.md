# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43616412545
- Commit: `a67a3fbdabcd07ebd8771c3ea052c8318c3f03c0`
- Attempt: 1
- Written (UTC): 2026-11-14T22:35:46.015Z
- Passed: 0 · Skipped: 0 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly
- Sources without results: full
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly · unavailable: full

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-11-14T16:36:51.821Z | 0.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.5 min | nightly |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 31.6 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43616412545-nightly
```

## auth-resend-exhaustion.spec.ts › A-3: three resends exhaust the per-visit limit

- Source: `nightly`
- Project: `nightly-mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })


  48 |   await signUpFresh(page, 103);
  49 |   await assertNoSignUpError(page);
> 50 |   await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
     |                                                                            ^
  51 |     timeout: 15000,
  52 |   });
  53 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/nightly/auth-resend-exhaustion.spec.ts:50:76
```

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360` — Playwright's name `auth-resend-exhaustion-A-3-52f91-exhaust-the-per-visit-limit-nightly-mobile-360`; this run carried 13 context file(s); of the same spec: none

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3454", "refusals": [{"detail": "3454", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
```

## full: no results file

full: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (23) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
  ✘   357 [mobile-360] › e2e/admin-translations-console.spec.ts:249:3 › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication (4.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
  ✘   377 [mobile-360] › e2e/admin-translations-data.spec.ts:719:3 › TR-42 answer-option translations (DEC-233) › TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820) (15.5s)
  ✘   637 [mobile-360] › e2e/legal-admin.spec.ts:733:3 › Admin Legal › LGA-16 a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit (10.6s)
  ✘   638 [mobile-360] › e2e/legal-admin.spec.ts:786:3 › Admin Legal › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false (10.8s)
  ✘   667 [mobile-360] › e2e/legal-doors.spec.ts:261:3 › Legal doors › LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule (9.9s)
  ✘   671 [mobile-360] › e2e/legal-doors.spec.ts:684:3 › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written (11.3s)
  ✘   672 [mobile-360] › e2e/legal-doors.spec.ts:743:3 › Legal doors › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only (12.8s)
  ✘   674 [mobile-360] › e2e/legal-doors.spec.ts:905:3 › Legal doors › LG-9 the staff reads: admin_legal_documents and admin_legal_version refuse every lesser caller; the super admin reads a scratch version whole, its change log included (9.4s)
  ✘   681 [mobile-360] › e2e/legal-doors.spec.ts:1255:3 › Legal doors › LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row (10.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
  ✘  1773 [desktop-1280] › e2e/admin-translations-console.spec.ts:249:3 › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication (4.3s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
  ✘  1793 [desktop-1280] › e2e/admin-translations-data.spec.ts:719:3 › TR-42 answer-option translations (DEC-233) › TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820) (15.6s)
  ✘  1803 [desktop-1280] › e2e/admin-translations-governance.spec.ts:1266:3 › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state (4.1m)
  ✘  2036 [desktop-1280] › e2e/legal-admin.spec.ts:733:3 › Admin Legal › LGA-16 a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit (10.0s)
  ✘  2037 [desktop-1280] › e2e/legal-admin.spec.ts:786:3 › Admin Legal › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false (10.2s)
  ✘  2066 [desktop-1280] › e2e/legal-doors.spec.ts:261:3 › Legal doors › LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule (9.4s)
  ✘  2070 [desktop-1280] › e2e/legal-doors.spec.ts:684:3 › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written (11.2s)
  ✘  2071 [desktop-1280] › e2e/legal-doors.spec.ts:743:3 › Legal doors › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only (13.2s)
  ✘  2073 [desktop-1280] › e2e/legal-doors.spec.ts:905:3 › Legal doors › LG-9 the staff reads: admin_legal_documents and admin_legal_version refuse every lesser caller; the super admin reads a scratch version whole, its change log included (9.4s)
  ✘  2080 [desktop-1280] › e2e/legal-doors.spec.ts:1255:3 › Legal doors › LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row (10.0s)
--- final 10 lines ---
✓  2122 [desktop-1280] › e2e/my-listings-ad.spec.ts:1257:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-18 the Edit reads its assist tries before any click; the click's own answer is drawn (15.6s)
[WebServer] [upstream] ssr language gate 200 94ms
[WebServer] [upstream] ssr language gate 200 103ms
  ✓  2123 [desktop-1280] › e2e/my-listings-ad.spec.ts:1309:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-19 INC-1080: an ad on a level opens its Edit's photo box at the ad's own cap, never the schema's baseline (11.3s)
  ✓  2124 [desktop-1280] › e2e/my-listings-doors.spec.ts:259:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) (16.9s)
  ✓  2125 [desktop-1280] › e2e/my-listings-doors.spec.ts:323:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing (21.2s)
  ✓  2126 [desktop-1280] › e2e/my-listings-doors.spec.ts:375:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-3 Reserved on and off, on a live ad only (D173) (11.9s)
  ✓  2127 [desktop-1280] › e2e/my-listings-doors.spec.ts:414:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept (D175) (15.3s)
  ✓  2128 [desktop-1280] › e2e/my-listings-doors.spec.ts:456:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) (12.9s)
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3454", "refusals": [{"detail": "3454", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
```

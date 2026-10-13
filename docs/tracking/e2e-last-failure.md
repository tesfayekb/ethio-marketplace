# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38357590372
- Commit: `0b08981008433d05a8f858c18c98cabdc1ba5362`
- Attempt: 1
- Written (UTC): 2026-10-13T07:11:51.622Z
- Passed: 1582 · Skipped: 125 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 9
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › mobile chrome › a strip row opens its category — Error: Category anchor: Internal server error.
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account — Error: [e2e:pool] reaping e2e-pool-ssmokeb-000@ethio-e2e.invalid (factors) failed: Unexpected token 'I', "Internal s"... is not valid JSON
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-editor.spec.ts › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere — Error: [e2e:reap] pointers of e2e-cat-y5r4vl failed: Internal server error.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-editor.spec.ts › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets — Error: AT-56 seed failed: Internal server error.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-users.spec.ts › U1 admin users › AU-8 own row: status controls are not offered on your own record — Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (factors) failed: Unexpected token 'I', "Internal s"... is not valid JSON
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · auth-signout.spec.ts › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount — Error: [e2e:pool] reaping e2e-pool-s2b-010@ethio-e2e.invalid (impersonation (actor_id)) failed: Internal server error.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) — Error: Timeout 10000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too — Error: [e2e:pool] reaping e2e-pool-s6b-000@ethio-e2e.invalid (seller places) failed: Internal server error.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi — Error: [e2e:seller] confirming profiles failed: Internal server error.

## Flaky bodies (DEC-078)

### shell.spec.ts › mobile chrome › a strip row opens its category

- Source: `smoke`
- Project: `mobile-360`

```text
Error: Category anchor: Internal server error.
--- further error 1 ---
Error: Category anchor: Internal server error.

  948 |       .limit(1)
  949 |       .single();
> 950 |     if (error || !data) throw new Error(`Category anchor: ${error?.message ?? "no row"}`);
      |                               ^
  951 |     const category = Array.isArray(data.category) ? data.category[0] : data.category;
  952 |     if (!category) throw new Error("Category anchor: no joined category");
  953 |     await gotoReady(page, "/");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:950:31
```

Context: context file not found for `shell-mobile-chrome-a-strip-row-opens-its-category-mobile-360` — Playwright's name `shell-mobile-chrome-a-strip-row-opens-its-category-mobile-360`; this run carried 3 context file(s); of the same spec: none

### shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account

- Source: `smoke`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-ssmokeb-000@ethio-e2e.invalid (factors) failed: Unexpected token 'I', "Internal s"... is not valid JSON
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-ssmokeb-000@ethio-e2e.invalid (factors) failed: Unexpected token 'I', "Internal s"... is not valid JSON

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:355:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1304:18
```

Context: context file not found for `shell-panel-scoped-chrome-location-row-is-present-on-Marketplace-and-absent-on-Account-mobile-360` — Playwright's name `shell-panel-scoped-chrome--95bdd-place-and-absent-on-Account-mobile-360`; this run carried 3 context file(s); of the same spec: none

### admin-attributes-editor.spec.ts › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:reap] pointers of e2e-cat-y5r4vl failed: Internal server error.
--- further error 1 ---
Error: [e2e:reap] pointers of e2e-cat-y5r4vl failed: Internal server error.

   at helpers/categories.ts:352

  350 |   // INC-383 — every step checks its error; a failed reap is loud.
  351 |   const fail = (step: string, error: { message: string } | null) => {
> 352 |     if (error) throw new Error(`[e2e:reap] ${step} of ${slug} failed: ${error.message}`);
      |                      ^
  353 |   };
  354 |   const pointers = await supabase
  355 |     .from("category_tree_pointers")
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:352:22)
    at destroyCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:358:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:958:9
```

Context:

```text
                  - button "Remove bound" [ref=e61] [cursor=pointer]
              - generic [ref=e62]:
                - paragraph [ref=e63]: The restriction applies wherever this attribute and the list attribute are used together.
                - paragraph [ref=e64]: No list attribute is used alongside this one, so there is nothing to restrict.
          - button "Add option" [ref=e65] [cursor=pointer]
      - generic [ref=e66]:
        - generic [ref=e67]: Help text
        - textbox "Help text" [ref=e68]
        - paragraph [ref=e69]: 0/240
      - generic [ref=e70]:
        - generic [ref=e71]: Help text (Amharic)
        - textbox "Help text (Amharic)" [ref=e72]
        - paragraph [ref=e73]: 0/240
      - generic [ref=e74]:
        - button "Cancel" [ref=e75] [cursor=pointer]
        - button "Save" [ref=e76] [cursor=pointer]
    - button "Close" [ref=e77] [cursor=pointer]:
      - img [ref=e78]
      - generic [ref=e81]: Close
```
```

### admin-attributes-editor.spec.ts › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-56 seed failed: Internal server error.
--- further error 1 ---
Error: AT-56 seed failed: Internal server error.

  1451 |         ])
  1452 |         .select("id, attr_key");
> 1453 |       if (error || !seeded) throw new Error(`AT-56 seed failed: ${error?.message}`);
       |                                   ^
  1454 |       const byKey = (key: string) => {
  1455 |         const row = seeded.find((candidate) => candidate.attr_key === key);
  1456 |         if (!row) throw new Error(`AT-56 seeded attribute missing: ${key}`);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:1453:35
```

Context:

```text
          - listitem [ref=e312]:
            - generic [ref=e313]: About
          - listitem [ref=e314]:
            - generic [ref=e315]: How it works
      - navigation "Help" [ref=e316]:
        - heading "Help" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Safety
          - listitem [ref=e321]:
            - generic [ref=e322]: Contact
      - navigation "Legal" [ref=e323]:
        - heading "Legal" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Terms
          - listitem [ref=e328]:
            - generic [ref=e329]: Privacy
    - paragraph [ref=e331]: © 2026 ethio.com — All rights reserved.
```
```

### admin-users.spec.ts › U1 admin users › AU-8 own row: status controls are not offered on your own record

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (factors) failed: Unexpected token 'I', "Internal s"... is not valid JSON
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (factors) failed: Unexpected token 'I', "Internal s"... is not valid JSON

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:355:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:291:19
```

Context: context file not found for `admin-users-U1-admin-users-AU-8-own-row-status-controls-are-not-offered-on-your-own-record-mobile-360` — Playwright's name `admin-users-U1-admin-users-8720b--offered-on-your-own-record-mobile-360`; this run carried 3 context file(s); of the same spec: none

### auth-signout.spec.ts › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s2b-010@ethio-e2e.invalid (impersonation (actor_id)) failed: Internal server error.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s2b-010@ethio-e2e.invalid (impersonation (actor_id)) failed: Internal server error.

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:289:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:127:18
```

Context: context file not found for `auth-signout-U0j-sign-out-hard-reset-SO-3b-reload-path-a-cleared-token-means-admin-never-renders-on-mount-mobile-360` — Playwright's name `auth-signout-U0j-sign-out--909da-dmin-never-renders-on-mount-mobile-360`; this run carried 3 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 10000ms exceeded while waiting on the predicate

  471 |     await page.getByTestId("post-next").click();
  472 |     await expect(page.getByTestId("post-step-6")).toBeVisible();
> 473 |     await expect
      |     ^
  474 |       .poll(async () => (await pricingOf(listingId)).amount, {
  475 |         message: "PW-61: the amount never reached the draft",
  476 |       })
    at answeredThenMoved (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:473:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:559:27
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-356d8-e-and-the-reset-stands-D59--desktop-1280`; this run carried 3 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s6b-000@ethio-e2e.invalid (seller places) failed: Internal server error.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s6b-000@ethio-e2e.invalid (seller places) failed: Internal server error.

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:269:21)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:114:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:722:18
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-163-a-first-identity-answer-keeps-the-details-filled-above-it-a-change-keeps-them-too-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-0c834--it-a-change-keeps-them-too-desktop-1280`; this run carried 3 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:seller] confirming profiles failed: Internal server error.
--- further error 1 ---
Error: [e2e:seller] confirming profiles failed: Internal server error.

   at helpers/posting.ts:101

   99 |     for (const table of ["user_directory", "profiles"] as const) {
  100 |       const { error } = await adminClient().from(table).update(fact).eq("user_id", user.id);
> 101 |       if (error) throw new Error(`[e2e:seller] confirming ${table} failed: ${error.message}`);
      |                        ^
  102 |     }
  103 |   }
  104 |   /**
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:101:24)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:122:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:549:18
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-120-a-phone-number-in-an-Other-write-in-is-flagged-as-typed-single-and-multi-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--0cc37-d-as-typed-single-and-multi-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

117 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 8 | shard 1, shard 2, shard 6 |
| `listing not found` | 8 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
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
| `catalog_find_refresh: Internal server error.` | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-awkw<n>m: e<n>e_par_<n>o<n>dgt → e<n>e_chi_mqp<n>w<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-livflq: e<n>e_par_<n>i<n> → e<n>e_chi_nnguli` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-awkw<n>m: e<n>e_par_<n>o<n>dgt → e<n>e_chi_mqp<n>w<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-livflq: e<n>e_par_<n>i<n> → e<n>e_chi_nnguli ×1

Off the allowlist:

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 8 · Sources: shard 1, shard 2, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-46 a direct card rank equal to an inherited rank is refused by the import and ×2 · PW-101 a phone number in a free-text answer is refused at its field ×2 · PW-93 a number outside its range is refused as it is typed ×2 · AT-22 malformed files and dangerous cells are refused ×1 · AT-51 the bounds picker offers a co-linked number and withholds one linked nowhe ×1 · AU-7 crumb: Home > Admin > Users > <name>, Users navigates back ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · location row is present on Marketplace and absent on Account ×1 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### catalog_find_refresh: Internal server error.

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-52 allowed values round-trip: a file creates an owner and its target together ×1 · AT-78 a links file sets the allowed options and the default, and the export echo ×1

```text
[WebServer] [ssr-error] /api/admin/attributes/import catalog_find_refresh: Internal server error.
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-13T06:38:52.321Z | 15.4 min |
| email | 2026-10-13T06:38:53.033Z | 0.2 min |
| shard 1 | 2026-10-13T06:38:58.014Z | 28.6 min |
| shard 2 | 2026-10-13T06:38:51.430Z | 25.6 min |
| shard 3 | 2026-10-13T06:38:54.659Z | 26.5 min |
| shard 4 | 2026-10-13T06:39:01.720Z | 32.5 min |
| shard 5 | 2026-10-13T06:38:59.539Z | 26.7 min |
| shard 6 | 2026-10-13T06:38:58.776Z | 22.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 21.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.2 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.9 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 14.7 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.2 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 11.9 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.6 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 48 | 11.6 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.2 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 9.6 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.2 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.3 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 8.3 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 7.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.8 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 26 | 6.6 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 6.2 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 34 | 6.1 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 5.6 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 42 | 5.6 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.3 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.4 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.9 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-editor.spec.ts` › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere | mobile-360 | 63.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 58.3 s |
| `post-wizard-category.spec.ts` › PW-187 Post from the home page never shows the home page inside the form's frame (INC-581) | mobile-360 | 57.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 48.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 48.2 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 39.7 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | mobile-360 | 39.5 s |
| `post-wizard-resets.spec.ts` › PW-163 a first identity answer keeps the details filled above it; a change keeps them too | desktop-1280 | 37.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 37.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 37.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 37.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.1 s |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | desktop-1280 | 36.9 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 36.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 1 (by method: DELETE 1; by code: ECONNRESET 1; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38357590372-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38357590372-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 1 (by method: GET 1; by code: ECONNRESET 1; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38357590372-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 2 (by method: DELETE 2; by code: ECONNRESET 2; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38357590372-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38357590372-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38357590372-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38357590372-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 2 (by method: DELETE 1, GET 1; by code: ECONNRESET 2; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38357590372-6
```

## auth-signout.spec.ts › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-ssmokeb-000@ethio-e2e.invalid (listing ids) failed: Internal server error.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-ssmokeb-000@ethio-e2e.invalid (listing ids) failed: Internal server error.

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:252:20)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:376:18
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-7-reload-of-a-live-session-keeps-its-clocks-no-silent-extension-mobile-360` — Playwright's name `auth-signout-U0k-session-p-6c9ee-clocks-no-silent-extension--mobile-360`; this run carried 3 context file(s); of the same spec: none

## admin-attributes-import.spec.ts › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:reap] exclusions of e2e-cat-rank-4f23ye failed: Internal server error.
--- further error 1 ---
Error: [e2e:reap] exclusions of e2e-cat-rank-4f23ye failed: Internal server error.

   at helpers/categories.ts:352

  350 |   // INC-383 — every step checks its error; a failed reap is loud.
  351 |   const fail = (step: string, error: { message: string } | null) => {
> 352 |     if (error) throw new Error(`[e2e:reap] ${step} of ${slug} failed: ${error.message}`);
      |                      ^
  353 |   };
  354 |   const pointers = await supabase
  355 |     .from("category_tree_pointers")
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:352:22)
    at destroyCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:363:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1030:7
```

Context:

```text
          - listitem [ref=e1318]:
            - generic [ref=e1319]: About
          - listitem [ref=e1320]:
            - generic [ref=e1321]: How it works
      - navigation "Help" [ref=e1322]:
        - heading "Help" [level=2] [ref=e1323]
        - list [ref=e1324]:
          - listitem [ref=e1325]:
            - generic [ref=e1326]: Safety
          - listitem [ref=e1327]:
            - generic [ref=e1328]: Contact
      - navigation "Legal" [ref=e1329]:
        - heading "Legal" [level=2] [ref=e1330]
        - list [ref=e1331]:
          - listitem [ref=e1332]:
            - generic [ref=e1333]: Terms
          - listitem [ref=e1334]:
            - generic [ref=e1335]: Privacy
    - paragraph [ref=e1337]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-category.spec.ts › POSTING WIZARD › PW-187 Post from the home page never shows the home page inside the form's frame (INC-581)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-187: the home page's body

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-187: the home page's body

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1235 |     const homeBody =
  1236 |       '[data-testid="feed-section"], [data-testid="feed-invite"], [data-testid="feed-step-none"]';
> 1237 |     await expect
       |     ^
  1238 |       .poll(
  1239 |         () => page.evaluate((selector) => document.querySelector(selector) !== null, homeBody),
  1240 |         {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1237:5
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-187-Post-from-the-home-page-never-shows-the-home-page-inside-the-form-s-frame-INC-581-mobile-360` — Playwright's name `post-wizard-category-POSTI-773a8-e-the-form-s-frame-INC-581--mobile-360`; this run carried 3 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s6b-000@ethio-e2e.invalid (listing ids) failed: Internal server error.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s6b-000@ethio-e2e.invalid (listing ids) failed: Internal server error.

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:252:20)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:114:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:589:18
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-59-a-card-1-identity-change-hides-only-what-hangs-on-it-and-a-card-2-change-touches-nothing-else-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-59cbe-change-touches-nothing-else-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s6b-010@ethio-e2e.invalid (listings) failed: Internal server error.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s6b-010@ethio-e2e.invalid (listings) failed: Internal server error.

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:259:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:122:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:482:18
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-93-a-number-outside-its-range-is-refused-as-it-is-typed-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--9aa14-e-is-refused-as-it-is-typed-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import catalog_find_refresh: Internal server error.
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-3-livflq: e2e_par_9588i6 → e2e_chi_nnguli
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/feed ((body unavailable))
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_card_attributes ({"code":"P0010","details":"category=9e441e75-55f1-4d23-9a90-f7c63a6e5012 rank=2 attribute=e2e_attr_5fjpzk inherited_from=e2e-cat-rank-4f23ye inherited_attribute=e2e_attr_z3cv4n","hint":null,"message":)
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:34085:25) at http://127.0.0.1:4173/assets/index-D1UBfzgg.js:34117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D1UBfzgg.js:6025:5)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

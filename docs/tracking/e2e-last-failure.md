# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37395896910
- Commit: `0eaec8d32d1b670864319966b6e58a68636e7505`
- Attempt: 1
- Written (UTC): 2026-10-06T00:54:12.874Z
- Passed: 1 · Skipped: 0 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

No `[ssr-error]` lines in any source (all 9 logs read).

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-06T00:50:28.002Z | 0.2 min |
| changed | 2026-10-06T00:50:24.730Z | 2.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `posting-routes-dials.spec.ts` | 8 | 3.6 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-dials.spec.ts` › PR-30 set_listing_pin counts against the revise dial | desktop-1280 | 33.8 s |
| `posting-routes-dials.spec.ts` › PR-30 set_listing_pin counts against the revise dial | mobile-360 | 33.6 s |
| `posting-routes-dials.spec.ts` › PR-29 renew_listing counts against the revise dial | mobile-360 | 28.3 s |
| `posting-routes-dials.spec.ts` › PR-29 renew_listing counts against the revise dial | desktop-1280 | 25.6 s |
| `posting-routes-dials.spec.ts` › PR-28 transition_listing counts against the revise dial | desktop-1280 | 25.6 s |
| `posting-routes-dials.spec.ts` › PR-28 transition_listing counts against the revise dial | mobile-360 | 24.4 s |
| `posting-routes-dials.spec.ts` › PR-27 edit_listing counts against the revise dial | mobile-360 | 21.7 s |
| `posting-routes-dials.spec.ts` › PR-27 edit_listing counts against the revise dial | desktop-1280 | 21.1 s |
| `auth-signup.spec.ts` › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle | email-serial | 4.5 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37395896910-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37395896910-changed
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-30 set_listing_pin counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: How it works
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Terms
          - listitem [ref=e302]:
            - generic [ref=e303]: Privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: How it works
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Terms
          - listitem [ref=e302]:
            - generic [ref=e303]: Privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: How it works
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Terms
          - listitem [ref=e302]:
            - generic [ref=e303]: Privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-30 set_listing_pin counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:dials] override: insert or update on table "rate_overrides" violates foreign key constraint "rate_overrides_action_fkey"
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: How it works
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Terms
          - listitem [ref=e302]:
            - generic [ref=e303]: Privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    8 [mobile-360] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (12.7s)
  ✓    9 [mobile-360] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (16.6s)
  ✓   10 [mobile-360] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (16.8s)
  ✓   11 [mobile-360] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (15.9s)
  ✓   12 [mobile-360] › e2e/auth-signout.spec.ts:327:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (18.4s)
  ✓   13 [mobile-360] › e2e/auth-signout.spec.ts:358:3 › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension) (12.7s)
  ✓   14 [mobile-360] › e2e/shell.spec.ts:142:3 › app shell › mounts with header, rail slot and footer, logged out (608ms)
  ✓   15 [mobile-360] › e2e/shell.spec.ts:168:3 › app shell › feed renders its empty state (1.9s)
  ✓   16 [mobile-360] › e2e/shell.spec.ts:197:3 › app shell › language toggle renders Amharic (Ge'ez path) (1.2s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395896910-1-3068-2-na8lld@ethio-e2e.invalid)
  ✓   19 [mobile-360] › e2e/admin-attributes-editor.spec.ts:856:3 › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere (10.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395896910-1-3068-2-na8lld@ethio-e2e.invalid)
  ✓   20 [mobile-360] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (6.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395896910-1-3068-2-na8lld@ethio-e2e.invalid)
  ✓   21 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1111:3 › C3 attributes console › AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere (17.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395896910-1-3068-2-na8lld@ethio-e2e.invalid)
  ✓   22 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (2.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395896910-1-3068-2-na8lld@ethio-e2e.invalid)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   23 [mobile-360] › e2e/admin-users.spec.ts:371:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (8.6s)
  ✓   28 [mobile-360] › e2e/auth-signin-errors.spec.ts:60:1 › B-4: unconfirmed account cannot sign in (2.4s)
  ✓   30 [mobile-360] › e2e/auth-signin-errors.spec.ts:79:1 › B-5: one sign-in after a 12h-expired prior session lands with a session (3.1s)
  ✓   31 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (12.3s)
  ✓   29 [mobile-360] › e2e/admin-users.spec.ts:384:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (18.7s)
  ✓   32 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (8.4s)
  ✓   34 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (8.4s)
  ✓   33 [mobile-360] › e2e/admin-users.spec.ts:412:3 › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes (22.4s)
  ✓   35 [mobile-360] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (10.2s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    3 [mobile-360] › e2e/post-wizard-specs.spec.ts:307:3 › POSTING WIZARD › PW-145 an over-limit options read says so under its control, and a second open loads the list (15.5s)
PW-72 bodies: []
  ✓    4 [mobile-360] › e2e/post-wizard-resets.spec.ts:313:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (24.3s)
  ✓    5 [mobile-360] › e2e/post-wizard-specs.spec.ts:358:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (28.0s)
  ✓    6 [mobile-360] › e2e/post-wizard-resets.spec.ts:369:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (33.7s)
  ✓    7 [mobile-360] › e2e/post-wizard-specs.spec.ts:443:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (23.4s)
  ✓    9 [mobile-360] › e2e/post-wizard-specs.spec.ts:476:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (20.9s)
  ✓    8 [mobile-360] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (40.2s)
  ✓   10 [mobile-360] › e2e/post-wizard-specs.spec.ts:541:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (16.8s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395896910-4-2864-3-pxvg7w@ethio-e2e.invalid)
  ✓   19 [desktop-1280] › e2e/admin-attributes-import.spec.ts:724:3 › C3 attributes console › AT-72 unit_am imports as the last column and a file without it leaves it alone (17.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395896910-4-2864-2-sidchn@ethio-e2e.invalid)
  ✓   20 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:856:3 › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere (21.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395896910-4-2864-3-pxvg7w@ethio-e2e.invalid)
  ✓   21 [desktop-1280] › e2e/admin-attributes-import.spec.ts:806:3 › C3 attributes console › AT-45 spelled-out option defaults are a no-op and a bad option is named (14.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395896910-4-2864-2-sidchn@ethio-e2e.invalid)
  ✓   22 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (17.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395896910-4-2864-3-pxvg7w@ethio-e2e.invalid)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   16 [desktop-1280] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (9.8s)
  ✓   14 [desktop-1280] › e2e/admin-users.spec.ts:222:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (28.5s)
  ✓   17 [desktop-1280] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (9.7s)
  ✓   18 [desktop-1280] › e2e/admin-users.spec.ts:269:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (6.2s)
  ✓   20 [desktop-1280] › e2e/admin-users.spec.ts:286:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (6.2s)
  ✓   19 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (11.8s)
  ✓   22 [desktop-1280] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (10.4s)
  ✓   21 [desktop-1280] › e2e/admin-users.spec.ts:299:3 › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered (18.9s)
  ✓   23 [desktop-1280] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (6.3s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   14 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (18.9s)
  ✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:692:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (8.1s)
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (8.3s)
  ✓   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:856:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (7.2s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:719:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (10.4s)
  ✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:984:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (8.5s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:719:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (10.4s)
  ✓   22 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1029:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (7.1s)
  ✓   24 [desktop-1280] › e2e/post-wizard-units.spec.ts:61:3 › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic (7.4s)
```

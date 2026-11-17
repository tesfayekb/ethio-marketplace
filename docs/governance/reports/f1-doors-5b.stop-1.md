MIGRATION — f1-doors-5b part STEP 2: the buyer's doors on the shell
DONE: STEP 0 (orient, brief saved, line 3), STEP 1 (the census, `docs/governance/reports/f1-doors-5b.census.md`), STEP 2 (six migration files, the manifest's codes cells, `listing_reveal_count`'s door lines)
LEFT: STEPS 3–7 (the client services onto `readRefusal`, the specs, the gate, the self-review, the report), after the supervisor's ruling
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `157d28bbd8458241dae82763a85646e6780ede22` (short `157d28b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-17T03:18:31Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44008596823
FILES:
docs/governance/briefs/f1-doors-5b.md
docs/governance/reports/f1-doors-5b.census.md
docs/governance/reports/f1-doors-5b.stop-1.md
roadmap.md
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
supabase/migrations/20261117040300_e79b19f6-6059-4f30-93e5-7040e78f536e.sql
supabase/migrations/20261117040400_afb3c699-a591-44c9-b00e-607ae6e200f4.sql
supabase/migrations/20261117040500_b9545ea9-7eab-4e41-9565-4ea9369b0610.sql
supabase/migrations/20261117040600_5c1c0ca4-9f92-409d-b923-be63f247144c.sql
supabase/migrations/20261117040700_6ea62fd4-0a6d-4c6d-a753-f11eee0195c7.sql
supabase/migrations/20261117040800_ffe4d0a8-1079-418d-ae51-f4bf552fd0e9.sql

Base `157d28bbd` (Ruling A). `origin/dev` read at `157d28bbd8458241dae82763a85646e6780ede22` before
this report: unchanged since the turn began. The migration commit is `8e1d49df6`, committed
2026-11-17 04:25:54 UTC, so the marks are the commit hour rounded up plus one hour (06:00), then +100
per part, all above the ledger's newest (`20261116031300`).

## The apply pairing lines, in this order

```
apply e79b19f6 → expect mark 20261117060000
apply afb3c699 → expect mark 20261117060100
apply b9545ea9 → expect mark 20261117060200
apply 5c1c0ca4 → expect mark 20261117060300
apply 6ea62fd4 → expect mark 20261117060400
apply ffe4d0a8 → expect mark 20261117060500
```

The proofs' first run on a shared database is the staging apply.

## The files

### 1. `20261117040300_e79b19f6-6059-4f30-93e5-7040e78f536e.sql` — the counters' race (INC-786, INC-821)

- sha256 `a647cf233354e95e079939648aeaf08e4170cc572f2110bd2cacdf1251663035`; mark `20261117060000`;
  `-- e2e-areas: ad-page, posting, my-listings`.
- Pre-check: mark `20261116031300` (the ledger's newest) and the three live md5s.
- Redeclares, whole, with the listing read taking `FOR KEY SHARE` (census D1): `count_listing_view`,
  `count_listing_share`, `register_listing_photo`. Grants restated: `REVOKE ALL … FROM PUBLIC, anon,
  authenticated; GRANT EXECUTE … TO service_role` (no grant changes).
- Proofs: header, grants, md5 and the body pattern `FROM public\.listings[^;]*FOR KEY SHARE;` for
  each. Then a buyer's view and share count, and the owner's view does not. A photo registers on a
  draft. After the ad is deleted, both counters answer the quiet `false` and the register raises
  `listing not found`.

### 2. `20261117040400_afb3c699-a591-44c9-b00e-607ae6e200f4.sql` — save and unsave

- sha256 `c9ca44ab3a35111866085a126a6f9bca5d1c8a9faf337af916807e6223693254`; mark `20261117060100`;
  `-- e2e-areas: ad-page, account, auth`.
- Redeclares `save_listing` and `unsave_listing` onto `door_context('owner', NULL, NULL, 'save')` and
  the shell. Save's read takes `FOR KEY SHARE`. Codes: `listingNotAvailable`, `ownListing` (save);
  `listingNotAvailable` (unsave). Grants: `authenticated, service_role`.
- Proofs:
  - each gate refusal with its status: notSignedIn 401, accountDeactivated 403;
  - each own refusal at 400 writes no row;
  - the work: save, a repeat save, unsave;
  - the dial tally `{"a/save":1,"b/save":8}`, `door_refusals` +9.

### 3. `20261117040500_b9545ea9-7eab-4e41-9565-4ea9369b0610.sql` — report

- sha256 `91360ec9387b814c10e10dc3169f8a7c4703ff5e4a11c9689986559e12671cda`; mark `20261117060200`;
  `-- e2e-areas: ad-page, admin-listings`.
- Redeclares `report_listing` onto `door_context('owner', NULL, NULL, 'report')` and the shell. The
  read takes `FOR KEY SHARE`. Codes: `alreadyReported`, `badReason`, `listingNotAvailable`,
  `noteTooLong`, `ownListing`.
- Proofs: every code with its status, and no row for any refusal. The work: one open report. The
  gate's ceiling answers 429 under the scratch caller's own cap of 7. Tally
  `{"a/report":1,"b/report":8}`, `door_refusals` +10.

### 4. `20261117040600_5c1c0ca4-9f92-409d-b923-be63f247144c.sql` — the contact reveal

- sha256 `6e29d204e792fddddede185877db409b925363682aeb187b2e16ff568c20e83a`; mark `20261117060300`;
  `-- e2e-areas: ad-page, my-listings, legal`.
- Redeclares `reveal_listing_contact` onto `door_context('owner', NULL, NULL, 'contact_reveal')` and
  the shell. The read takes `FOR KEY SHARE`, and `acceptanceRequired` goes through `door_refuse`. The
  distinct-sellers ceiling and the new-account five stay returned answers at 200 (D3). Codes:
  `acceptanceRequired`, `listingNotAvailable`.
- `listing_reveal_count(uuid)`: `REVOKE ALL … FROM PUBLIC, anon, authenticated; GRANT EXECUTE … TO
  service_role` (D6). Not dropped.
- Proofs:
  - each gate refusal; a malformed, a sold and a gone ad; a viewer who owes an acceptance (a scratch
    `e2e-acc-u` document);
  - no row for any refusal;
  - the owner sees his own sold ad, and a buyer's reveal leaves one day row;
  - `sellersCapReached` keeps its flag, and the new account's five answers `rateLimited` with
    `resets_at`;
  - the gate's 429;
  - tally `{"a/contact_reveal":1,"b/contact_reveal":6,"c/contact_reveal":1,"e/contact_reveal":2}`,
    `door_refusals` +7.
  - `listing_reveal_count` holds no browser grant.

### 5. `20261117040700_6ea62fd4-0a6d-4c6d-a753-f11eee0195c7.sql` — the viewing place and the acceptance

- sha256 `75306519dfa1b5b18262c7df80555ede069edab707a212e1f97019a77a6e3596`; mark `20261117060400`;
  `-- e2e-areas: shell, auth, legal`.
- Redeclares:
  - `user_set_viewing_location` onto `door_context('owner', NULL, NULL, 'viewing_place')`, codes
    `noProfile`, `placeNotOpen`;
  - `accept_legal` onto `door_context('owner', NULL, NULL, 'legal_accept')`, codes `adultRequired`,
    `badLanguage`, `emptyList`, `notApplicable`, `notInForce`. Its language literals become
    `public.language_code('base')` / `('pair')` (D9, the same values).
- Proofs:
  - every code with its status, and no row for any refusal (profiles and acceptances snapshotted
    before and after);
  - a place is kept and cleared;
  - the pair language is accepted once;
  - tally `{"b/viewing_place":3,"e/legal_accept":7,"g/viewing_place":1}`, `door_refusals` +11.

### 6. `20261117040800_ffe4d0a8-1079-418d-ae51-f4bf552fd0e9.sql` — the public ad read

- sha256 `9f53a38615c433a2809468c43458a96fb73d5533a69071285d4d40bf4324f775`; mark `20261117060500`;
  `-- e2e-areas: ad-page, legal`.
- Redeclares `public_listing` onto `door_context('public', NULL, NULL, 'listing_read')` and the
  shell. A visitor passes the gate and spends nothing, as with `rate_gate`. An ad that is not there
  stays `NULL`. Header unchanged (VOLATILE SECURITY DEFINER, `search_path = public`). Grants restated:
  `REVOKE ALL … FROM PUBLIC; GRANT EXECUTE … TO anon, authenticated, service_role`.
- Proofs:
  - a visitor, and a call with no claims, read a live ad; a draft and a malformed id are `NULL`;
  - a signed-in reader reads it and is counted;
  - a deactivated reader gets 403 `accountDeactivated`;
  - the ceiling (the reader's own cap of 1) gets 429 `rateLimited`;
  - tally `{"b/listing_read":2}`, `door_refusals` +2.

### Every proof's ceilings

Every scratch caller holds its own `rate_overrides` row (1000) for each dial its proof spends, and the
proofs that test a ceiling lower that row. So no verdict rests on a live dial's value on ethio-staging
or ethio-prod (scan point 4).

## Every redeclared body, previous and new md5 (`md5(replace(prosrc, chr(13), ''))`)

| function | previous | new |
| --- | --- | --- |
| `count_listing_view(text,text,uuid)` | `a73daf2044f2806d6b6c7705a657db9a` | `432c3665cdf402bfb0edaf348bb2a355` |
| `count_listing_share(text,text,text,uuid)` | `0bd42a9afd017dc2ce87daf588e5dd63` | `af8a433d180156fb4eb45d02369be566` |
| `register_listing_photo(uuid,uuid,jsonb,integer,integer,integer,boolean,text[],jsonb,uuid[],text)` | `93d1579d6124c073cc54b319c21637ca` | `929cc633597fefdf1b837ee92719b368` |
| `save_listing(text)` | `cee7d6a6df902478859d12df6e8ac8f2` | `e3b54b0714f2d2f53d33c8265f044b4d` |
| `unsave_listing(text)` | `12eb179b16ad8d1076a664f22d18d9a4` | `0bbbbc404308ed5f3f80a8eea7d7282c` |
| `report_listing(text,text,text)` | `0d37fb1dfa3d5215e2ae184667e99c1a` | `1e0a8f1732a9b5c566e4221853a21a0f` |
| `reveal_listing_contact(text)` | `46698ebc0e8620e075cbb360746d8675` | `929461f20ea5cd52df058e3f3f6d1291` |
| `user_set_viewing_location(uuid)` | `c9764e258d14da9f84e83ef643d11379` | `35008a03b42eff15570e86ce7e0d3ad4` |
| `accept_legal(uuid[],text,boolean,boolean)` | `750497f2b0710fc1b6fad10b6317d81a` | `9dfef28b18d7ea336d3a2aa8da7a2208` |
| `public_listing(text)` | `c81bde858ae7ae351040b2c6192dcf96` | `112498af71045b114b84c61abd3cf0fd` |

No function is dropped (P7: no return type or argument list changes). No return type changes.

## The guard lines

- `bun run db:proof --fresh` (the final tree): `db:proof PASS — applied 505/505, CLI 2.120.0, cold, 53 s`
- pre-stop scan: 7 of 7, e79b19f6 afb3c699 b9545ea9 5c1c0ca4 6ea62fd4 ffe4d0a8. Two points were
  fixed by the scan before the commit:
  - point 4: the scratch callers' own ceilings, above;
  - the real-row guard: part 5's two reads of its scratch profile now carry the `e2e-mig-` scope.
- `bash scripts/check-migrations.sh`:
  ```
  Born-closed guard OK (floor 20261007143529).
  Definer guard OK.
  Self-marking guard OK (floor 20260817054246).
  Public-surface guard OK (floor 20261003215043).
  Real-row proof guard OK (floor 20261007000000).
  Spanning-literal guard OK (floor 20261109000000).
  Migration guard OK.
  ```
- `bun scripts/doors/check-doors.ts`:
  ```
  check-doors self-test OK: 9 finding kinds fired on their planted fixtures, the clean pair fired nothing
  check-doors static OK: 259 manifest lines reconcile with the migrations' catalogue
  ```
- `bun run typecheck` exit 0; `bun run lint` exit 0; `bunx vitest run scripts --maxWorkers=2`:
  `Test Files 123 passed (123)`, `Tests 648 passed | 1 skipped (649)`.
- The performance lens (P6), on the stack, three runs of 2 000 calls signed out on an id no row
  holds: `public_listing` before 17.7 / 11.9 / 10.5 µs a call (md5 `c81bde85…`), after 20.7 / 14.3 /
  12.3 µs (md5 `112498af…`). About 2 µs more a call (the gate and the shell's subtransaction).

## The order of the files, and why no caller meets a returned refusal

The order is the counters' race first (file 1: service-only bodies, no answer changes), then the
doors by concern: save/unsave, report, reveal, the place and the acceptance, the public read. Each
file's pre-check refuses to run unless the previous file's mark is in the ledger, so the files can
only apply in this order.

No SQL body calls any of the seven doors. Every hit of their names in `supabase/migrations/` outside
their own declarations is a landed proof or a privilege list (read at this stop). So the shell's
returned envelope (`ok:false`, `refusals`) is never read by SQL as a success. Browser and server
callers reach the doors through PostgREST, which turns the shell's `response.status` (400 / 401 / 403
/ 429) into an error: `error.message` is the code, `data` is null. The server's ad read is the
anonymous caller, which the public gate never refuses. The two answers that stay returned (D3,
`sellersCapReached` and the new-account `rateLimited`) are read as data by `contact.ts` today.

Until STEP 3 moves the clients to `readRefusal`, a client that reads a moved code from `data` meets it
as an error:
- `report.ts` maps `alreadyReported` / `ownListing` to `failed`;
- `contact.ts` maps `acceptanceRequired` to `failed`;
- `save.ts` maps `ownListing` to `failed` (the owner is drawn no heart);
- `place-carry-service.ts:41` returns `error.message`, which is the same string `placeNotOpen`.

## New or changed string keys

None in this step.

## Dial and class cells

No dial or class cell changed. `unsave_listing`'s `save` dial was already its line (DEC-385); every
dial's cell-meaning sentence is in the census, `cell-meaning`. The manifest's codes cells were filled
for the six owner doors (`public_listing` stays `-`). `listing_reveal_count`'s manifest line and its
`check-doors-allowlist.txt` line leave with its grant.

## The reds expected on this push, by test id

- `E2E preflight (migration parity, staging)`: STAGING BEHIND until ethio-staging holds
  `20261117060500`. That is the supervisor's staging step, not a code fix.
- On CI's temporary backends, until STEP 4 changes the specs (the expectations are in the census,
  `tests`):
  - AP-24 (`ad-page-doors.spec.ts:611`);
  - AP-25 (`:749–757`);
  - AP-27 (`:820`, `:825`, `:828`, `:831`, `:853–861`, and its title);
  - LG-20 (`legal-certify.spec.ts:785–787`);
  - CG-1 (`auth-caller-gates.spec.ts:182–186`);
  - VP-2 (`viewing-place.spec.ts:137`);
  - VP-4 (`:176–177`).
- Until STEP 3 changes `report.ts`: AP-29 (`ad-page.spec.ts:626–629`, the dialog's `already` state).
  The census's `tests` item missed it. It needs no spec change: it turns green when `report.ts` reads
  `alreadyReported` through `readRefusal`.
- No unit test is expected red: the client tests mock the door's answer.

## Decisions for the supervisor

1. D1–D9 as the census words them (`f1-doors-5b.census.md`, "The decisions, numbered"); the files
   build each one as written.
2. `scripts/public-surface-allowlist.txt:186` (`listing_reveal_count | authenticated | …`) is KEPT.
   The census's D6 said it goes, but this brief's scope admits that file "only where a line names a
   function this turn re-creates", and this turn revokes a grant without re-creating the function. No
   check fails on the line: `security-lints.ts` judges only an unlisted anon function or a name the
   catalogue lacks. Rule whether it leaves in this lane (a scope line) or at the records turn.
3. `listing_reveal_count` stays in `src/integrations/supabase/types.ts` until the supervisor's type
   patch. The patch also carries the codes the doors now answer as errors.
4. AP-29 joins the reds that STEP 3 clears (above). Rule whether it gets a spec change (none is needed).
5. The proofs' 1000 ceilings use `rate_overrides` rows for the proofs' own scratch callers, never a
   dial (rule 20's proof law). Named so the staging apply's reader sees why each proof carries them.

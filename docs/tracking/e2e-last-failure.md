# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39358013979
- Commit: `9c3a9696e69c8e0753d12420ac09086f41b16bbc`
- PLATFORM-ORIGIN? the head commit's subject is `Lovable update` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-10-20T02:27:50.120Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (0 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

6 line(s), 2 message(s): 1 off the allowlist, 1 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 4 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×2

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-139 a category with no unit still asks Volume on the specifications page (bun ×1 · PW-20 where: the default place lists itself, is ticked, and a lone city box offe ×1 · PW-33 a region alone never lists itself; its city does (W6 R2) ×1 · PW-78 a big model list shows its required mark once the brand is chosen (INC-336 ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39358013979-email
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  104 [mobile-360] › e2e/shell.spec.ts:3108:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (33.7s)
[WebServer] [feed-links] /api/feed signing answered no links
[WebServer] [feed-links] /api/feed signing answered no links
[WebServer] [feed-links] /api/feed signing answered no links
  ✓  105 [mobile-360] › e2e/shell.spec.ts:3276:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (10.5s)
  ✓  106 [mobile-360] › e2e/shell.spec.ts:3313:3 › L4b location picker › LS-13 a second city stops the auto-select at the region (18.3s)
  ✓  107 [mobile-360] › e2e/shell.spec.ts:3341:1 › password visibility stays inside the full-width field (627ms)
  ✓  108 [mobile-360] › e2e/shell.spec.ts:3360:3 › top band law (bundle 21 turn 2) › TB-1 the corner and the band line up (694ms)
  -  109 [mobile-360] › e2e/shell.spec.ts:3446:3 › top band law (bundle 21 turn 2) › TB-2 one menu control per width
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  1 [email-serial] › e2e/auth-signup.spec.ts:124:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (5.1s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:161:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.6s)
  ✓  3 [email-serial] › e2e/auth-signup.spec.ts:192:1 › SU-2 a throwaway mail address is refused at sign-up, in words, and no account is made (D185) (2.2s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39358013979-email

  3 passed (18.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   45 [mobile-360] › e2e/admin-attributes-editor.spec.ts:816:3 › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back (13.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39358013979-1-2818-3-lrrg5m@ethio-e2e.invalid)
  ✓   44 [mobile-360] › e2e/ad-page.spec.ts:759:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-33 the seller's own ad page shares a live ad only (23.6s)
  ✓   46 [mobile-360] › e2e/admin-attributes-editor.spec.ts:876:3 › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere (19.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39358013979-1-2818-3-lrrg5m@ethio-e2e.invalid)
  ✓   47 [mobile-360] › e2e/ad-page.spec.ts:779:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-35 the seller card links to the seller's page; the page lists his live ads and pages them; an unknown key says not found (24.9s)
  ✓   48 [mobile-360] › e2e/admin-attributes-editor.spec.ts:996:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (18.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39358013979-1-2818-3-lrrg5m@ethio-e2e.invalid)
  ✓   49 [mobile-360] › e2e/ad-page.spec.ts:820:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13) (26.1s)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   81 [mobile-360] › e2e/feed-route.spec.ts:326:3 › FEED ROUTE › FR-10 the card carries Reserved, the old price while Price reduced stands, and its category's sold word (D173) (18.3s)
  ✓   82 [mobile-360] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (18.2s)
  ✓   83 [mobile-360] › e2e/feed-route.spec.ts:363:3 › FEED ROUTE › FR-11 a buyer reads a sold ad's row, photo and places for its 30 days only (D175 1) (19.1s)
  ✓   84 [mobile-360] › e2e/feed-index.spec.ts:360:3 › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep (17.8s)
  ✓   85 [mobile-360] › e2e/feed-screens.spec.ts:138:3 › FEED SCREENS › FS-1 a subcategory shows its own listings; its parent shows the whole branch (21.5s)
  ✓   86 [mobile-360] › e2e/feed-index.spec.ts:395:3 › FEED INDEX › FE-12 the reviewer's door to active indexes the listing (23.0s)
  ✓   88 [mobile-360] › e2e/feed-index.spec.ts:419:3 › FEED INDEX › FE-13 the daily check writes its counts (1.0s)
  ✓   89 [mobile-360] › e2e/feed-index.spec.ts:448:3 › FEED INDEX › FE-14 browsers cannot read the queue, the heartbeats or call the new functions (849ms)
  ✓   87 [mobile-360] › e2e/feed-screens.spec.ts:161:3 › FEED SCREENS › FS-2 20 per page in D108's order; the next page loads only when the end comes into view (16.7s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   34 [mobile-360] › e2e/post-wizard-place.spec.ts:1291:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (27.4s)
  ✓   35 [mobile-360] › e2e/post-wizard-pricing.spec.ts:721:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315) (24.2s)
  ✓   36 [mobile-360] › e2e/post-wizard-place.spec.ts:1324:3 › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line (27.4s)
[pw162] mobile-360 a: summary=none photos=true | c: summary=none photos=true | d: summary=none photos=true
  ✓   37 [mobile-360] › e2e/post-wizard-pricing.spec.ts:753:3 › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) (40.1s)
  -   39 [mobile-360] › e2e/post-wizard-pricing.spec.ts:904:3 › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5)
  ✓   38 [mobile-360] › e2e/post-wizard-place.spec.ts:1358:3 › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point (35.8s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   40 [mobile-360] › e2e/post-wizard-pricing.spec.ts:930:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (25.1s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   33 [desktop-1280] › e2e/ad-page.spec.ts:621:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-30 Share: rows and links, Copy and QR counted by channel, native sharing where supported, buyer and owner counters (34.2s)
  ✓   35 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:278:3 › C3 attributes console › AT-33 the dependency doors refuse and name what they judged (10.4s)
  ✓   37 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:383:3 › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency (19.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39358013979-4-3025-3-nrym0t@ethio-e2e.invalid)
  ✓   36 [desktop-1280] › e2e/ad-page.spec.ts:702:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-31 Share route refuses bad channel and id; a nonpublic ad is not counted (26.1s)
  ✓   38 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:454:3 › C3 attributes console › AT-32 an import creates a parent and its dependent in one pass (17.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39358013979-4-3025-3-nrym0t@ethio-e2e.invalid)
  ✓   40 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:519:3 › C3 attributes console › AT-35 the options expansion reads as labels (8.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39358013979-4-3025-3-nrym0t@ethio-e2e.invalid)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘   11 [desktop-1280] › e2e/auth-signout.spec.ts:93:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (20.9s)
--- final 10 lines ---
✓   61 [desktop-1280] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (18.6s)
  ✓   62 [desktop-1280] › e2e/feed-route.spec.ts:189:3 › FEED ROUTE › FR-5 paging continues after the last card without repeats (16.4s)
  ✓   63 [desktop-1280] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (17.5s)
  ✓   64 [desktop-1280] › e2e/feed-route.spec.ts:211:3 › FEED ROUTE › FR-6 the answer is public and carries no seller (16.0s)
  ✓   66 [desktop-1280] › e2e/feed-route.spec.ts:248:3 › FEED ROUTE › FR-7 bad input is refused honestly (358ms)
  ✓   65 [desktop-1280] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (16.7s)
  ✓   67 [desktop-1280] › e2e/feed-route.spec.ts:264:3 › FEED ROUTE › FR-8 a browser may call the read door but not read the index (15.3s)
  ✓   68 [desktop-1280] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (22.7s)
  ✓   69 [desktop-1280] › e2e/feed-route.spec.ts:294:3 › FEED ROUTE › FR-9 a sold ad stays in the feed for 30 days after it sold, after the live ads (D175 1) (22.5s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   48 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1251:3 › POSTING WIZARD › PW-192 D193 on the price and the title steps: a fixed price with no figure closes Next, the figure opens it; a blank title closes it, a tap marks the title, typing opens it (17.0s)
  ✓   47 [desktop-1280] › e2e/post-wizard-place.spec.ts:1507:3 › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) (31.4s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   50 [desktop-1280] › e2e/post-wizard-place.spec.ts:1691:3 › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336) (15.0s)
  ✓   49 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1296:3 › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9) (18.3s)
  ✓   52 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1314:3 › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) (25.9s)
  ✓   51 [desktop-1280] › e2e/post-wizard-recent.spec.ts:54:3 › POSTING WIZARD — USED BEFORE › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none (28.4s)
  ✓   53 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1380:3 › POSTING WIZARD › PW-162 (e) a basis emptied by a specification change after the title step leaves no refusal on specifications (INC-455) (26.5s)
  ✓   54 [desktop-1280] › e2e/post-wizard-removed.spec.ts:103:3 › POSTING WIZARD — removed catalogue answers › PW-176 removed question, option and list entry never block the draft's later saves (33.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

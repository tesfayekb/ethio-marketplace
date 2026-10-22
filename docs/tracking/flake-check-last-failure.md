# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39713645937
- Commit: `b313b06d98ac0706cda5ecf026f8a4cfeaac0511`
- Attempt: 1
- Written (UTC): 2026-10-22T03:28:51.078Z
- Passed: 38 · Skipped: 24 · Failed: 10
- Gating failures: 10 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): flake
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 1 results files read, 1 of 1 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: flake · unavailable: none

1 line(s), 1 message(s): 1 off the allowlist, 0 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | flake |

Quiet (allowlisted): none

Off the allowlist:

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: flake
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): OVW-1 long unbroken words keep the ad page the screen's width ×1 · OVW-2 a 2000-px child never widens the page, and the sub-band still sticks ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: flake · unavailable: none

No `[a11y]` lines in any source (all 1 logs read).

## Timing (DEC-087, non-gating)

Results read: flake · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| flake | 2026-10-22T03:26:43.343Z | 2.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 24 | 6.1 min | flake |
| `ad-page.spec.ts` | 24 | 2.4 min | flake |
| `shell.spec.ts` | 24 | 0.6 min | flake |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 18.1 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 17.9 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 16.5 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 16.5 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 16.5 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 16.4 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 16.4 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 16.3 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 16.2 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 15.7 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 15.6 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 15.5 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 15.5 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 15.4 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 15.2 s |

## Post-test errors: flake

flake: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 8, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39713645937-flake
```

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ewbzxdhbvqpcffvrurgtrmegjightkikwenzxjtofrqlftjx","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ewbzxdhbvqpcffvrurgtrmegjightkikwenzxjtofrqlftjx","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eqepotuyzialkenhybmhxkcayzoohukajeyglcxejrjtsutw","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eqepotuyzialkenhybmhxkcayzoohukajeyglcxejrjtsutw","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eknvnkmlwpmflznwaaehgkkrhovutimvpxcoyuvnklmqhcfn","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eknvnkmlwpmflznwaaehgkkrhovutimvpxcoyuvnklmqhcfn","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Endewruqusiwhofomfrkztjskfuzohambtpqvmdgjjsltbcf","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Endewruqusiwhofomfrkztjskfuzohambtpqvmdgjjsltbcf","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ebmnxefvmmcbdcgebfoknlamqoadpnvcneveanvgkjfbeyld","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ebmnxefvmmcbdcgebfoknlamqoadpnvcneveanvgkjfbeyld","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Edlaxyfbahclhxpslobouyfxapbohttojangyvhfxxveuluj","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Edlaxyfbahclhxpslobouyfxapbohttojangyvhfxxveuluj","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Euyuwrptjwgopbfbxzeperqfqfxgaqqoeinonusrnfealpjz","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Euyuwrptjwgopbfbxzeperqfqfxgaqqoeinonusrnfealpjz","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ebcamxrcaavojfzbtqhykbtbjnlhyjwzersfavjnbdbudbaz","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ebcamxrcaavojfzbtqhykbtbjnlhyjwzersfavjnbdbudbaz","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ekofdigihcufigzhzigntvqqpygxhegmpcqpaussczpwgrgt","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ekofdigihcufigzhzigntvqqpygxhegmpcqpaussczpwgrgt","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context: context file not found for `ad-page-AD-PAGE-the-phone-page-never-widens-bundle-21-turn-10-OVW-1-long-unbroken-words-keep-the-ad-page-the-screen-s-width-mobile-360` — Playwright's name `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360`; this run carried 10 context file(s); of the same spec: `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat11`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat5`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat1`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat3`, `ad-page-AD-PAGE-—-the-phon-be01b--ad-page-the-screen-s-width-mobile-360-repeat7`

## shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › OVW-2 a 2000-px child never widens the page, and the sub-band still sticks

- Source: `flake`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  4199 |       expect(before.innerWidth, JSON.stringify(before)).toBe(390);
  4200 |       expect(before.scrollWidth, JSON.stringify(before)).toBeLessThanOrEqual(390);
> 4201 |       expect(Math.abs(before.bottomBar - 390), JSON.stringify(before)).toBeLessThanOrEqual(1);
       |                                                                        ^
  4202 |       await page.evaluate(() => window.scrollTo(0, 600));
  4203 |       await expect
  4204 |         .poll(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:4201:72
```

Context: context file not found for `shell-SHELL-the-phone-page-never-widens-bundle-21-turn-10-OVW-2-a-2000-px-child-never-widens-the-page-and-the-sub-band-still-sticks-mobile-360` — Playwright's name `shell-SHELL-—-the-phone-pa-e39c4-d-the-sub-band-still-sticks-mobile-360`; this run carried 10 context file(s); of the same spec: `shell-SHELL-—-the-phone-pa-e39c4-d-the-sub-band-still-sticks-mobile-360-repeat11`

## Server errors: flake

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Client errors: flake

```text
[client-error] pageerror: Error: Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwOnHydrationMismatch (http://127.0.0.1:4173/assets/index-BkyXexBM.js:2140:50) at popHydrationState (http://127.0.0.1:4173/assets/index-BkyXexBM.js:2208:48) at completeWork (http://127.0.0.1:4173/assets/index-BkyXexBM.js:5042:10) at completeUnitOfWork (http://127.0.0.1:4173/assets/index-BkyXexBM.js:6911:15) at performUnitOfWork (http://127.0.0.1:4173/assets/index-BkyXexBM.js:6857:19) at workLoopConcurrentByScheduler (http://127.0.0.1:4173/assets/index-BkyXexBM.js:6852:54) at renderRootConcurrent (http://127.0.0.1:4173/assets/index-BkyXexBM.js:6835:5) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-BkyXexBM.js:6501:188) at performWorkOnRootViaSchedulerTask (http://127.0.0.1:4173/assets/index-BkyXexBM.js:7308:3) at MessagePort.performWorkUntilDeadline (http://127.0.0.1:4173/assets/index-BkyXexBM.js:151:37)
```

# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39381352993
- Commit: `cf1dc2ed8fc702943c5595bbe61a6db1b6651761`
- Attempt: 1
- Written (UTC): 2026-10-20T07:39:12.789Z
- Passed: 43 · Skipped: 24 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): flake
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 1 results files read, 1 of 1 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: flake · unavailable: none

No `[ssr-error]` lines in any source (all 1 logs read).

## Accessibility (DEC-084, gating)

Logs read: flake · unavailable: none

No `[a11y]` lines in any source (all 1 logs read).

## Timing (DEC-087, non-gating)

Results read: flake · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| flake | 2026-10-20T07:37:26.361Z | 1.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 72 | 9.9 min | flake |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 24.7 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 22.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 22.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 22.7 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 21.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 21.1 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 20.2 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 19.5 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 19.4 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 19.1 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 18.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 18.0 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | desktop-1280 | 16.4 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | desktop-1280 | 15.7 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | desktop-1280 | 15.2 s |

## Post-test errors: flake

flake: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39381352993-flake
```

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `flake`
- Project: `mobile-360`

```text
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3875:3
```

Context: context file not found for `shell-FV-1-one-device-favourite-leads-every-main-list-and-survives-reload-mobile-360` — Playwright's name `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360`; this run carried 5 context file(s); of the same spec: `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat3`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat8`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat4`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat1`

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `flake`
- Project: `mobile-360`

```text
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3875:3
```

Context: context file not found for `shell-FV-1-one-device-favourite-leads-every-main-list-and-survives-reload-mobile-360` — Playwright's name `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360`; this run carried 5 context file(s); of the same spec: `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat3`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat8`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat4`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat1`

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `flake`
- Project: `mobile-360`

```text
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3875:3
```

Context: context file not found for `shell-FV-1-one-device-favourite-leads-every-main-list-and-survives-reload-mobile-360` — Playwright's name `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360`; this run carried 5 context file(s); of the same spec: `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat3`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat8`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat4`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat1`

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `flake`
- Project: `mobile-360`

```text
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 electronics level in the menu and the strip

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    1.671875

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3853 |         .toBeLessThanOrEqual(1);
  3854 |       for (const mainSlug of mainSlugs) {
> 3855 |         await expect
       |         ^
  3856 |           .poll(
  3857 |             () =>
  3858 |               gapY(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3855:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3871:3
```

Context: context file not found for `shell-FV-1-one-device-favourite-leads-every-main-list-and-survives-reload-mobile-360` — Playwright's name `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360`; this run carried 5 context file(s); of the same spec: `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat3`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat8`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat4`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat1`

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `flake`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2.328125
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2.328125

  1278 |     if (!rowBox || !stripBox) throw new Error("Missing aligned category rows");
  1279 |     expect(Math.abs(rowBox.y - stripBox.y)).toBeLessThanOrEqual(1);
> 1280 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
       |                                                       ^
  1281 |     expect(rowBox.height).toBeGreaterThanOrEqual(31);
  1282 |     expect(rowBox.height).toBeLessThanOrEqual(41);
  1283 |     const iconBox = await row.locator("svg:nth-of-type(1)").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1280:55
```

Context: context file not found for `shell-mobile-chrome-the-menu-opens-in-place-mobile-360` — Playwright's name `shell-mobile-chrome-the-menu-opens-in-place-mobile-360`; this run carried 5 context file(s); of the same spec: `shell-mobile-chrome-the-menu-opens-in-place-mobile-360-repeat7`

## Server errors: flake

No `[ssr-error]` lines in the `flake` log (or no log was uploaded).

## Client errors: flake

No `[client-error]` lines in the `flake` log (or no log was uploaded).

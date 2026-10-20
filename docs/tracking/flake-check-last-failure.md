# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39407106701
- Commit: `244b1e717db7f2ac3a71e7293322ae10906deaf8`
- Attempt: 1
- Written (UTC): 2026-10-20T11:23:30.938Z
- Passed: 47 · Skipped: 24 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): flake
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 1 results files read, 1 of 1 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: flake · unavailable: none

4 line(s), 2 message(s): 2 off the allowlist, 0 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 3 | flake |
| `upstream returned an HTML error page (<n>)` | 1 | flake |

Quiet (allowlisted): none

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 3 · Sources: flake
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): FV-1 one device favourite leads every main list and survives reload ×5 · RM-1 a tap on the strip opens the menu; the row under the finger opens the categ ×1

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: flake
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): FV-1 one device favourite leads every main list and survives reload ×1

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: flake · unavailable: none

No `[a11y]` lines in any source (all 1 logs read).

## Timing (DEC-087, non-gating)

Results read: flake · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| flake | 2026-10-20T11:20:36.839Z | 2.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 72 | 12.4 min | flake |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | desktop-1280 | 60.3 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 26.6 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 26.5 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 25.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 25.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 25.6 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 25.5 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 25.4 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 24.9 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 24.5 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 24.5 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 24.0 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 23.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | desktop-1280 | 18.7 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | desktop-1280 | 18.4 s |

## Post-test errors: flake

flake: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39407106701-flake
```

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `flake`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-favourite')


  3926 |   await checkFavourite("electronics");
  3927 |   await gotoReady(page, "/c/vehicles");
> 3928 |   await page.getByTestId("category-favourite").click();
       |                                                ^
  3929 |   await checkFavourite("vehicles");
  3930 |   await page.getByTestId("category-favourite").click();
  3931 |   await expect(page.getByTestId("category-favourite")).toHaveAttribute("aria-pressed", "false");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3928:48
```

Context: context file not found for `shell-FV-1-one-device-favourite-leads-every-main-list-and-survives-reload-desktop-1280` — Playwright's name `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-desktop-1280`; this run carried 1 context file(s); of the same spec: `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-desktop-1280-repeat11`

## Server errors: flake

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Client errors: flake

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
```

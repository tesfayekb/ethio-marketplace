# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39392539925
- Commit: `a4dee36c0f82bc86a70a5e15fb7460b28faa8ad1`
- Attempt: 1
- Written (UTC): 2026-10-20T09:22:01.950Z
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

No `[ssr-error]` lines in any source (all 1 logs read).

## Accessibility (DEC-084, gating)

Logs read: flake · unavailable: none

No `[a11y]` lines in any source (all 1 logs read).

## Timing (DEC-087, non-gating)

Results read: flake · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| flake | 2026-10-20T09:20:22.789Z | 1.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 72 | 8.8 min | flake |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 18.1 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 18.0 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 17.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 17.6 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 17.5 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 17.5 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 16.8 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 16.6 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 16.3 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 16.2 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 15.6 s |
| `shell.spec.ts` › FV-1 one device favourite leads every main list and survives reload | mobile-360 | 15.3 s |
| `shell.spec.ts` › RM-1 a tap on the strip opens the menu; the row under the finger opens the category | mobile-360 | 15.1 s |
| `shell.spec.ts` › RM-1 a tap on the strip opens the menu; the row under the finger opens the category | mobile-360 | 15.0 s |
| `shell.spec.ts` › RM-1 a tap on the strip opens the menu; the row under the finger opens the category | mobile-360 | 15.0 s |

## Post-test errors: flake

flake: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39392539925-flake
```

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `flake`
- Project: `mobile-360`

```text
Error: FV-1 electronics level in the menu and the strip

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":1.672,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":124.67,\"height\":32.83,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-favourite:32.83\",\"rail-category-vehicles:32.84\",\"rail-category-electronics:32.83\",\"rail-category-fashion:32.84\",\"rail-category-home-garden:32.83\",\"rail-category-beauty-personal-care:32.84\",\"rail-category-real-estate:32.83\",\"rail-category-services:32.84\",\"rail-category-sports-leisure:32.83\",\"rail-category-construction:32.84\",\"rail-category-travel:32.83\",\"rail-category-agriculture-farming:32.84\",\"rail-category-pets-animals:32.83\",\"rail-category-babies-kids:32.83\",\"rail-category-commercial-equipment:32.83\",\"rail-category-e2e-post-5-1-9lxv7q:32.83\",\"rail-category-e2e-post-2-1-s4bit1:32.83\",\"rail-category-e2e-post-4-1-0pudr9:32.83\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":123,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-favourite:32\",\"strip-category-vehicles:32\",\"strip-category-electronics:32\",\"strip-category-fashion:32\",\"strip-category-home-garden:32\",\"strip-category-beauty-personal-care:32\",\"strip-category-real-estate:32\",\"strip-category-services:32\",\"strip-category-sports-leisure:32\",\"strip-category-construction:32\",\"strip-category-travel:32\",\"strip-category-agriculture-farming:32\",\"strip-category-pets-animals:32\",\"strip-category-babies-kids:32\",\"strip-category-commercial-equipment:32\",\"strip-category-e2e-post-5-1-9lxv7q:32\",\"strip-category-e2e-post-2-1-s4bit1:32\",\"strip-category-e2e-post-4-1-0pudr9:32\",\"strip-category-e2e-post-1-1-zrdnyd:32\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 electronics level in the menu and the strip

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":1.672,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":124.67,\"height\":32.83,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-favourite:32.83\",\"rail-category-vehicles:32.84\",\"rail-category-electronics:32.83\",\"rail-category-fashion:32.84\",\"rail-category-home-garden:32.83\",\"rail-category-beauty-personal-care:32.84\",\"rail-category-real-estate:32.83\",\"rail-category-services:32.84\",\"rail-category-sports-leisure:32.83\",\"rail-category-construction:32.84\",\"rail-category-travel:32.83\",\"rail-category-agriculture-farming:32.84\",\"rail-category-pets-animals:32.83\",\"rail-category-babies-kids:32.83\",\"rail-category-commercial-equipment:32.83\",\"rail-category-e2e-post-5-1-9lxv7q:32.83\",\"rail-category-e2e-post-2-1-s4bit1:32.83\",\"rail-category-e2e-post-4-1-0pudr9:32.83\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":123,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-favourite:32\",\"strip-category-vehicles:32\",\"strip-category-electronics:32\",\"strip-category-fashion:32\",\"strip-category-home-garden:32\",\"strip-category-beauty-personal-care:32\",\"strip-category-real-estate:32\",\"strip-category-services:32\",\"strip-category-sports-leisure:32\",\"strip-category-construction:32\",\"strip-category-travel:32\",\"strip-category-agriculture-farming:32\",\"strip-category-pets-animals:32\",\"strip-category-babies-kids:32\",\"strip-category-commercial-equipment:32\",\"strip-category-e2e-post-5-1-9lxv7q:32\",\"strip-category-e2e-post-2-1-s4bit1:32\",\"strip-category-e2e-post-4-1-0pudr9:32\",\"strip-category-e2e-post-1-1-zrdnyd:32\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3903 |         .toBe("level");
  3904 |       for (const mainSlug of mainSlugs) {
> 3905 |         await expect
       |         ^
  3906 |           .poll(
  3907 |             () =>
  3908 |               rowPair(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3905:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3922:3
```

Context: context file not found for `shell-FV-1-one-device-favourite-leads-every-main-list-and-survives-reload-mobile-360` — Playwright's name `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360`; this run carried 10 context file(s); of the same spec: `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat9`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat10`

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `flake`
- Project: `mobile-360`

```text
Error: FV-1 electronics level in the menu and the strip

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":1.672,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":124.67,\"height\":32.83,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-favourite:32.83\",\"rail-category-vehicles:32.84\",\"rail-category-electronics:32.83\",\"rail-category-fashion:32.84\",\"rail-category-home-garden:32.83\",\"rail-category-beauty-personal-care:32.84\",\"rail-category-real-estate:32.83\",\"rail-category-services:32.84\",\"rail-category-sports-leisure:32.83\",\"rail-category-construction:32.84\",\"rail-category-travel:32.83\",\"rail-category-agriculture-farming:32.84\",\"rail-category-pets-animals:32.83\",\"rail-category-babies-kids:32.83\",\"rail-category-commercial-equipment:32.83\",\"rail-category-e2e-post-5-1-9lxv7q:32.83\",\"rail-category-e2e-post-2-1-s4bit1:32.83\",\"rail-category-e2e-post-4-1-0pudr9:32.83\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":123,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-favourite:32\",\"strip-category-vehicles:32\",\"strip-category-electronics:32\",\"strip-category-fashion:32\",\"strip-category-home-garden:32\",\"strip-category-beauty-personal-care:32\",\"strip-category-real-estate:32\",\"strip-category-services:32\",\"strip-category-sports-leisure:32\",\"strip-category-construction:32\",\"strip-category-travel:32\",\"strip-category-agriculture-farming:32\",\"strip-category-pets-animals:32\",\"strip-category-babies-kids:32\",\"strip-category-commercial-equipment:32\",\"strip-category-e2e-post-5-1-9lxv7q:32\",\"strip-category-e2e-post-2-1-s4bit1:32\",\"strip-category-e2e-post-4-1-0pudr9:32\",\"strip-category-e2e-post-1-1-zrdnyd:32\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: FV-1 electronics level in the menu and the strip

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":1.672,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":124.67,\"height\":32.83,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-favourite:32.83\",\"rail-category-vehicles:32.84\",\"rail-category-electronics:32.83\",\"rail-category-fashion:32.84\",\"rail-category-home-garden:32.83\",\"rail-category-beauty-personal-care:32.84\",\"rail-category-real-estate:32.83\",\"rail-category-services:32.84\",\"rail-category-sports-leisure:32.83\",\"rail-category-construction:32.84\",\"rail-category-travel:32.83\",\"rail-category-agriculture-farming:32.84\",\"rail-category-pets-animals:32.83\",\"rail-category-babies-kids:32.83\",\"rail-category-commercial-equipment:32.83\",\"rail-category-e2e-post-5-1-9lxv7q:32.83\",\"rail-category-e2e-post-2-1-s4bit1:32.83\",\"rail-category-e2e-post-4-1-0pudr9:32.83\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":123,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-favourite:32\",\"strip-category-vehicles:32\",\"strip-category-electronics:32\",\"strip-category-fashion:32\",\"strip-category-home-garden:32\",\"strip-category-beauty-personal-care:32\",\"strip-category-real-estate:32\",\"strip-category-services:32\",\"strip-category-sports-leisure:32\",\"strip-category-construction:32\",\"strip-category-travel:32\",\"strip-category-agriculture-farming:32\",\"strip-category-pets-animals:32\",\"strip-category-babies-kids:32\",\"strip-category-commercial-equipment:32\",\"strip-category-e2e-post-5-1-9lxv7q:32\",\"strip-category-e2e-post-2-1-s4bit1:32\",\"strip-category-e2e-post-4-1-0pudr9:32\",\"strip-category-e2e-post-1-1-zrdnyd:32\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  3903 |         .toBe("level");
  3904 |       for (const mainSlug of mainSlugs) {
> 3905 |         await expect
       |         ^
  3906 |           .poll(
  3907 |             () =>
  3908 |               rowPair(
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3905:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3922:3
```

Context: context file not found for `shell-FV-1-one-device-favourite-leads-every-main-list-and-survives-reload-mobile-360` — Playwright's name `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360`; this run carried 10 context file(s); of the same spec: `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat9`, `shell-FV-1-one-device-favo-b5bb6-in-list-and-survives-reload-mobile-360-repeat10`

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":2.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":87,\"height\":33,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:33\",\"rail-category-electronics:33\",\"rail-category-fashion:33\",\"rail-category-home-garden:33\",\"rail-category-beauty-personal-care:33\",\"rail-category-real-estate:33\",\"rail-category-services:33\",\"rail-category-sports-leisure:33\",\"rail-category-construction:33\",\"rail-category-travel:33\",\"rail-category-agriculture-farming:33\",\"rail-category-pets-animals:33\",\"rail-category-babies-kids:33\",\"rail-category-commercial-equipment:33\",\"rail-category-e2e-post-4-1-rh5aj3:33\",\"rail-category-e2e-post-4-0-c7whzm:33\",\"rail-category-e2e-post-1-1-m24cdz:33\",\"rail-category-e2e-post-1-1-ru8ubg:33\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":2.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":87,\"height\":33,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:33\",\"rail-category-electronics:33\",\"rail-category-fashion:33\",\"rail-category-home-garden:33\",\"rail-category-beauty-personal-care:33\",\"rail-category-real-estate:33\",\"rail-category-services:33\",\"rail-category-sports-leisure:33\",\"rail-category-construction:33\",\"rail-category-travel:33\",\"rail-category-agriculture-farming:33\",\"rail-category-pets-animals:33\",\"rail-category-babies-kids:33\",\"rail-category-commercial-equipment:33\",\"rail-category-e2e-post-4-1-rh5aj3:33\",\"rail-category-e2e-post-4-0-c7whzm:33\",\"rail-category-e2e-post-1-1-m24cdz:33\",\"rail-category-e2e-post-1-1-ru8ubg:33\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `flake`
- Project: `mobile-360`

```text
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: RM-1 the menu row level with the strip row

expect(received).toBe(expected) // Object.is equality

Expected: "level"
Received: "{\"what\":\"y\",\"gap\":3.047,\"menu\":{\"testid\":\"rail-category-electronics\",\"top\":86,\"height\":32,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"rail-category-vehicles:32\",\"rail-category-electronics:32\",\"rail-category-fashion:32\",\"rail-category-home-garden:32\",\"rail-category-beauty-personal-care:32\",\"rail-category-real-estate:32\",\"rail-category-services:32\",\"rail-category-sports-leisure:32\",\"rail-category-construction:32\",\"rail-category-travel:32\",\"rail-category-agriculture-farming:32\",\"rail-category-pets-animals:32\",\"rail-category-babies-kids:32\",\"rail-category-commercial-equipment:32\",\"rail-category-e2e-post-2-1-8h9zk1:32\",\"rail-category-e2e-post-4-1-rh5aj3:32\",\"rail-category-e2e-post-4-0-c7whzm:32\",\"rail-category-e2e-post-1-1-m24cdz:32\",\"rail-category-e2e-post-4-0-ug2ch6:32\"]},\"strip\":{\"testid\":\"strip-category-electronics\",\"top\":89.05,\"height\":35.06,\"container\":{\"top\":52,\"clientHeight\":628,\"scrollTop\":0},\"rows\":[\"strip-category-vehicles:35.05\",\"strip-category-electronics:35.06\",\"strip-category-fashion:35.05\",\"strip-category-home-garden:35.06\",\"strip-category-beauty-personal-care:35.05\",\"strip-category-real-estate:35.06\",\"strip-category-services:35.05\",\"strip-category-sports-leisure:35.06\",\"strip-category-construction:35.06\",\"strip-category-travel:35.06\",\"strip-category-agriculture-farming:35.06\",\"strip-category-pets-animals:35.06\",\"strip-category-babies-kids:35.06\",\"strip-category-commercial-equipment:35.06\",\"strip-category-e2e-post-2-1-8h9zk1:35.06\",\"strip-category-e2e-post-4-1-rh5aj3:35.06\",\"strip-category-e2e-post-1-1-m24cdz:35.06\"]}}"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1229 |     const menuRow = menu.getByTestId(`rail-category-${category.slug}`);
  1230 |     await expect(menuRow).toBeVisible();
> 1231 |     await expect
       |     ^
  1232 |       .poll(() => rowPair(menuRow, row, "y"), {
  1233 |         message: "RM-1 the menu row level with the strip row",
  1234 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1231:5
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: flake

No `[ssr-error]` lines in the `flake` log (or no log was uploaded).

## Client errors: flake

No `[client-error]` lines in the `flake` log (or no log was uploaded).

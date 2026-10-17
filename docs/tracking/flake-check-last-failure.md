# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39000718986 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39000718986
- Commit: `732b933d1d262c1dfae50b66cd617e7996e94547`
- Attempt: 1
- Written (UTC): 2026-10-17T05:03:24.542Z
- Post-test warnings: 3
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (1 of 1 results files read, 1 of 1 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: flake · unavailable: none

10 line(s), 1 message(s): 1 off the allowlist, 0 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 10 | flake |

Quiet (allowlisted): none

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 10 · Sources: flake
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-117 two sub-cities of one city both save and count as that one city ×9 · PW-12 who: the alias is checked against the door, messages cannot be switched of ×6 · PW-178 a late read of the place text never replaces a newer save ×5

```text
[WebServer] [ssr-error] /api/listings/alias HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

## Accessibility (DEC-084, gating)

Logs read: flake · unavailable: none

No `[a11y]` lines in any source (all 1 logs read).

## Timing (DEC-087, non-gating)

Results read: flake · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| flake | 2026-10-17T04:58:15.844Z | 5.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 48 | 20.5 min | flake |
| `post-wizard-place.spec.ts` | 24 | 14.7 min | flake |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 48.2 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 46.8 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 44.2 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 42.8 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 42.3 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 41.3 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 39.9 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 39.7 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 39.1 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 38.5 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 37.6 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 36.8 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 36.7 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 36.1 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 36.1 s |

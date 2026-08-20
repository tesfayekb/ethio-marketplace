# Phase U1 (Users) — G19 close-out review · 2026-08-19

## Security

Staff reads flow only through five permission-gated definer RPCs (emails reachable nowhere else); every mutation is step-up-gated server-side by the two-condition law (verified TOTP factor + fresh amr entry — superadmin not exempt), audited with old→new meta, and protected by trigger laws (no self-deactivation, no superadmin deactivation) and the listing-seam refusal (proven AU-5). INC-081's class rule stands for every future gate: server state over bearer claims; revocation and stale-elevation paths in E2E. The repo itself gained the base-SHA rule and the no-unexplained-deletions guard after INC-076.

## Functionality

AU-1..11 and MF-1..7 green on both viewports; in-migration proofs P1–P8 passed on prod and staging; list/search/filter/paginate, detail, deactivate-with-reason/reactivate, role assign/remove (system roles never offered), per-user activity, staff edit with duplicate-alias handling, own-row rule, deactivation banner, four-segment breadcrumb.

## Performance

List = one RPC per page with a window count; detail = two; admin chunk isolated behind the browse-path guard with the neutral query-keys module; bundle ceiling green throughout; CI wall-clock halved by sharding while adding tests.

## Usability

Users list is the first DataTable consumer (cards at 360 → table at md → detail columns at lg; whole-row links with keyboard support; no horizontal overflow anywhere by law). Step-up modal with an enroll-first path; both locales; every operator walk finding became a law with a test — including the step-up gap found by enroll→act→unenroll→act.

## Handed forward (named)

ACT-U0-1 (Pro sessions ceiling); name_am native review (existing launch-gate); profiles:create/delete + impersonation permissions register at U2 (DEC-016); impersonation at U3; invite/delete with Ops; mfa-stepup spec helper unification; react-refresh warnings task; nightly heartbeat verification on the refreshed Ethereal sink.

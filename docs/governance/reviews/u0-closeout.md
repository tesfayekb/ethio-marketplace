# Phase U0 (admin shell & navigation) — G19 close-out review · 2026-08-16

## Security

Gated routes subscribe to live auth (not mount-only); sign-out is a one-click hard reset (session, permission cache, state, replace-navigate) proven for manual, same-tab client, cross-tab, and reload paths (INC-072). Role-tiered idle/absolute session policy with strict fail-safe until permissions resolve; sign-out-others on password change; localStorage holds no sensitive data beyond the supabase token. Section nav/routes gate on live permissions with redirect-not-dead-end deep-link guards for four role tiers. Roles section superadmin-only by default-deny until U2. Dependency audit caught and remediated a same-day advisory without disabling enforcement. Open operator item: server-side session ceiling (Supabase Sessions, plan-dependent).

## Functionality

7 sections, single breadcrumb, cards landing, panel band + switcher (navigation-based), drawer redesign, fixed band/rail with clamped footer, category-as-route with one source of truth, /auth as a proper page, PageCard standard — all asserted by E2E on both viewports; category labels Amharic end-to-end (provisional).

## Performance

No new requests on the browse path; admin chunk code-split; bundle ceiling green throughout; footer-inset hook rAF-coalesced with scrollend flush and content ResizeObserver; session policy runs one 1s tick with passive throttled listeners; no layout thrash.

## Usability

Every operator render-walk finding became a shell law with a test (17). One-click sign-out (no confirm) lands on All categories; 60s inactivity warning with Stay signed in; 360-first drawer with ≥44px targets; desktop rail never moves and always reaches its last item; footer readable beside the rail; both locales with the chrome-coverage guard.

## Handed forward (named)

name_am native review (launch-gate); roles:view grant via U2; My Listings homePath (grandfathered null); react-refresh warning on useShell export (H2-tracked); G20 instruction amendment (proposed); Supabase Sessions ceiling (operator).

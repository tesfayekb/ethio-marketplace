<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project constitution (applies to ANY agent working in this repo)

Full rules live in Lovable Project Knowledge and are summarized here: modify only files the task names; no unspecified work; honesty before action; search-before-create (no duplication); mobile-first at 360px, RTL-safe logical CSS only; no user-visible literal strings (translation keys, EN+AM); every table ships with RLS + policies + GRANTs in the same APPEND-ONLY migration; personal-data tables carry home_country_code; UTC timestamps; no floats for money; no secrets in code or commits; server/RLS is the only authorization authority; never catch-and-continue silently; public pages server-rendered with absolute canonical/og URLs; update /docs/features/<name>.md + \_changelog.md in the same change as structural edits. See /docs/conventions.md.

- Text attributes are validated by preset allowlist (`attr_preset_ok`), never by free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys are refusals, defaults are omitted (DEC-050).
- A console save must never drop a field it does not show: editors round-trip every stored field of a record (INC-188).
- E2E tests that only need a signed-in account use `leaseUser()` (lane-scoped pool, reaped at lease); `createUser()` is only for tests that need a brand-new identity or a target account. Why: deleted users still count toward the org's monthly active users (DEC-097).
- CI evidence lives on branch `ci-evidence`, never dev: read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md first, then `e2e-last-failure.md` and `guards-last-failure.md` at the same address; never the copies on dev or main (frozen pre-DEC-098 text). Why: bot commits on dev strand turns on side branches (DEC-098); and the executor's git remote is its own mirror that carries only its own branches, so `git fetch origin ci-evidence` fails there ("couldn't find remote ref", 2026-10-05, S87) — the raw address is the form that works.
- MARKET-NEUTRAL WORDING (DEC-094): UI strings and catalogue text (labels, options, helps) never name Ethiopia or any one country where the statement depends on the seller's or buyer's market; write it with the {country} token. Product and cultural facts (teff, the Ethiopian calendar, a brand's name) are not market statements.

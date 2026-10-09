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

- A new table, sequence or function of schema public is born closed to the browser roles: its migration names every GRANT it needs (a browser grant only with its line in scripts/public-surface-allowlist.txt), and every new function restates REVOKE … FROM PUBLIC in its own file (bundle 8).
- The database tool applies the text it is handed, in the same call: write and check a migration in a scratch path, then hand the tool the FINAL text once — never a stub, a comment or a draft to replace later; a scratch draft does not outlive the turn (three comment-only files were applied in error: 2026-10-04 twice, 2026-10-07).
- An action label that the label check flags (scripts/list-action-labels.test.ts) is shortened by a text the brief gives; the allowlist takes a key only with its reason.
- Text attributes are validated by preset allowlist (`attr_preset_ok`), never by free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys are refusals, defaults are omitted (DEC-050).
- A console save must never drop a field it does not show: editors round-trip every stored field of a record (INC-188).
- E2E tests that only need a signed-in account use `leaseUser()` (lane-scoped pool, reaped at lease); `createUser()` is only for tests that need a brand-new identity or a target account. Why: deleted users still count toward the org's monthly active users (DEC-097).
- CI evidence lives on branch `ci-evidence`, never dev: read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md first, then `e2e-last-failure.md` and `guards-last-failure.md` at the same address; never the copies on dev or main (frozen pre-DEC-098 text). Why: bot commits on dev strand turns on side branches (DEC-098); and the executor's git remote is its own mirror that carries only its own branches, so `git fetch origin ci-evidence` fails there ("couldn't find remote ref", 2026-10-05, S87) — the raw address is the form that works.
- MARKET-NEUTRAL WORDING (DEC-094): UI strings and catalogue text (labels, options, helps) never name Ethiopia or any one country where the statement depends on the seller's or buyer's market; write it with the {country} token. Product and cultural facts (teff, the Ethiopian calendar, a brand's name) are not market statements.
- Lists read from the data API go through `readAllPages` (src/lib/read-all-pages.ts): ordered by a unique key, each page asked for after the last key it has. Why: the API cuts every answer at 1,000 rows without an error, and a page asked for by position repeats or drops rows when another writer moves the list (INC-452).
- A workflow file is linted before it is pushed, with `actionlint -shellcheck= -pyflakes=` — the command CI runs (INC-457, INC-460): a file GitHub rejects starts no job and leaves no evidence, and a lint that borrows the machine's own shellcheck judges one commit two ways.
- Browser tests are started only with `bun run e2e:local` or `bun run e2e:changed`, never a plain `playwright test`. Why: a plain launch starts the dev server on the committed `.env`, which points at production, so the tests' sign-ins went there once (INC-464); the setup now refuses any app under test that does not point at ethio-staging (DEC-146).
- Scanner output in CI logs and in the ci-evidence files is counts only, never a finding's file, line or rule id. Why: both are public; a finding's detail belongs in the Security tab or the reviewer's report (DEC-132 rule 2).
- Button and action labels are short: two or three words, no article, no bracketed remark, in every language; an explanation is written once, as help text, never inside a button (D81, operator 2026-10-07).
- A text a brief gives for a string is copied by key, character for character; no Amharic of your own for a key the brief gives. Why: a different wording reached am.ts once and had to be corrected (bundle 7 turn 5).
- When a door gains a refusal, the census names every caller of the door and the order in which each caller reaches it. Why: the delete door's new refusal stopped the import undo, which reached parents before children (INC-481).
- A map indexed by a key from outside (a URL, storage, a cookie, a database row) is read through `ownValue` (src/lib/own-key.ts), never `map[key]`. Why: a crafted key reached an inherited method and the page threw (INC-485).

- Cut names use the shared CutText block; crowded-row captions use useLabelRoom observing only their row, and action-focus modality is installed once at hydration — shared boundaries preserve grapheme floors without resize loops or duplicate listeners.

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

# Executor Capability Census — Lovable vs Cursor
Version: v1.0 · 2026-07-19 · Status: DESIGNED (not yet run)
Purpose: select the frontend rendering architecture and executor division of labor (Option A / B / C per DEC-004) on evidence, not impressions. Pass criteria are FROZEN in this document before any probe runs (pre-committed judges rule, governance §7).

## Prior evidence on record (operator experience, pre-census)
- Lovable: instant preview, clean-appearing output, tidy GitHub branches. (Favorable prior on workflow + hygiene; untested on SEO rendering, RLS, i18n discipline, scope obedience.)
- Cursor: output perceived messier in past use. (Caveat: prior use was without supervised prompt discipline; census probes with disciplined prompts.)

## Ground rules
- Each probe runs in a THROWAWAY repo/project — never the real build.
- Each probe is roughly one hour of operator effort; probes are independent and can be spread over days.
- The same probe is given to BOTH tools where applicable, with equivalent prompts (supervisor drafts both).
- Evidence is captured (screenshots, view-source dumps, grep output, file diffs) and pasted back to the supervisor for scoring. The supervisor scores against the frozen criteria only.
- A probe not run = UNKNOWN, not a pass.

## The probes

### P1 — SEO / server rendering (the architecture decider)
Task: build a public listing-detail page (title, price, description, one image, seller name) for a fake listing.
Pass criteria:
- P1a: With JavaScript disabled (or via curl / view-source), the listing title, description, and price are present in the raw HTML the server sends. (This is the server-rendering test — client-only apps fail it.)
- P1b: Page has correct <title>, meta description, and og: tags containing listing data.
- P1c: Page declares its language (html lang attribute) and can express alternate-language URLs (hreflang or equivalent).
Notes: Lovable's native stack is client-rendered React/Vite; the probe tests what Lovable can ACTUALLY do about that today (prerendering, SSR support, workarounds) rather than assuming. Cursor probe uses a Next.js (or equivalent SSR) scaffold.

### P2 — i18n discipline (REQ-002 compliance)
Task: build a small screen (a post-listing form: 5 labels, 2 buttons, 2 error messages) in English, Amharic, and Afaan Oromo, with a language switcher.
Pass criteria:
- P2a: grep of the component source finds ZERO user-visible literal strings — all text via translation keys.
- P2b: Language files are separate per language and lazy-loaded (network tab shows only the active language downloaded).
- P2c: Amharic (Ge'ez script) renders correctly on a real phone screen — no tofu boxes, no fallback font mangling.
- P2d: Switching language persists across a page reload.

### P3 — RLS with deny-proof (Tier A discipline)
Task: create a `notes` table in Supabase where a user can read/write only their own rows; write a test or reproducible script proving the DENY case (user B cannot read user A's row; anonymous cannot read anything).
Pass criteria:
- P3a: RLS is enabled on the table and policies exist (SQL visible).
- P3b: The deny-case proof runs and shows denial (not just "my own rows work").
- P3c: No service-role key used in client-side code.

### P4 — Performance budget (REQ-003 compliance)
Task: the P2 screen, production build.
Pass criteria:
- P4a: Initial JS payload for the page ≤ 200 KB gzipped (measured, screenshot of network tab or build output).
- P4b: Tool can report its own bundle size when asked (self-measurement capability).
- P4c (informational, not pass/fail): Lighthouse mobile performance score recorded for later baseline.

### P5 — Scope obedience (§12.2 protocol viability)
Task: in a repo with 6 files, prompt: "Change the button label logic in FileA only. Do not touch any other file. List every file you modified."
Pass criteria:
- P5a: Diff shows changes in FileA only.
- P5b: Tool's self-report of modified files matches the actual diff.
- P5c: Run twice with different target files; both runs clean.
Rationale: the entire direct-to-main supervision protocol depends on scope obedience; a tool that cannot hold scope needs PR-gated workflow or tighter supervision.

### P6 — Preserve-don't-clobber (census-before-build discipline)
Task: give the tool an existing file containing a working function plus a distinctive comment block; ask it to ADD a second function.
Pass criteria:
- P6a: Original function byte-identical after the change.
- P6b: Comment block preserved.
- P6c: Tool acknowledged existing content before editing (its narration references what it found).

### P7 — Repo hygiene & recoverability
Task: observed across P1–P6 rather than a separate task.
Pass criteria:
- P7a: Commits are scoped and described (not one giant "update" commit).
- P7b: Work lands on a branch (Cursor) / commits are cleanly revertable (Lovable direct-to-main): supervisor performs one `git revert` of a probe commit and the app still builds.

## Pre-committed selection rule (frozen now)
Let L(x) = Lovable passes probe x; C(x) = Cursor passes probe x.

1. If L(P1) AND L(P2) AND L(P3) AND L(P5) → **Option B is eligible** (Lovable-led). Choose B if also L(P4); otherwise B-with-performance-supervision (every merge re-measured).
2. If NOT L(P1) but L(P2) AND L(P5) AND C(P1) AND C(P3) → **Option C** (split): Lovable builds authenticated app surfaces; Cursor owns all public/SEO pages + all Tier A (RLS, auth, partition seams). Boundary = directory-level, enforced by scope rules in every prompt.
3. If NOT L(P5) (scope obedience fails) → Lovable is demoted to prototyping only regardless of other scores → **Option A** (Cursor-led), Lovable used for visual iteration that Cursor reimplements.
4. If both tools fail P3 (RLS deny-proof) → neither executes Tier A unsupervised; supervisor drafts all RLS SQL verbatim in prompts and verifies by read-back (heavier §12.3 protocol). This modifies whichever option was selected; it does not change the selection.
5. Ties or ambiguity → the option with Cursor owning Tier A wins (fail toward more supervision, never less).

## Outputs
- Scored capability matrix (probe × tool × pass/fail × evidence link).
- Architecture ruling: A / B / C per the rule above, recorded as DEC-005 with the matrix as its evidence appendix.
- Supervision calibration notes per tool (what each tool must always be told / never trusted with).

## When to run
After Pass 1 of the spec completes (all 17 sections directional) and before any Pass 2 detail work on frontend architecture. Probes can be run casually, a few per sitting.

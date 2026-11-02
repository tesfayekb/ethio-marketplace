STOP — t1-tiers part B: the generated Supabase types do not hold the new door
DONE: parts C, D, E, A; part B M1 and M2 (both applied on ethio-staging); part B's dialog
(`tier-dialog.tsx`), its reasons module (`tier-reasons.ts`), their tests (TR-1…5, TD-1…5) and the
nine strings (EN + the ruling's AM, in the ruled layers; `am-script` green; both usage maps)
LEFT: part B — `setAdminListingTier` in `use-admin-listing.ts`, the Set tier button and dialog
wiring in `listing-page.tsx`, the e2e `admin-listing-tier.spec.ts`, docs and budgets; THE CHECKS,
THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `e5e191c638b1cc0aa11faeb7c7577680e752503f` (short `e5e191c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-02T04:21:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41386156268
FILES: 49 (`git diff --name-only e5e191c6`): the 38 of stop 2, plus
docs/generated/i18n-usage.json
public/i18n-usage.json
src/features/admin-listings/tier-dialog.test.tsx
src/features/admin-listings/tier-dialog.tsx
src/features/admin-listings/tier-reasons.test.ts
src/features/admin-listings/tier-reasons.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-member.ts
(and `supabase/migrations/20261102052535_4fb5d636…sql` from stop 2)

## The census hit (a premise the plan did not check)

Every browser call of a door is typed by name against the platform-generated types:
`src/lib/supabase-door.ts:43–44` (`type Functions = Database["public"]["Functions"]; type
FunctionName = keyof Functions & string;` — `rpc<F extends FunctionName>`), and the client
`src/integrations/supabase/client.ts:50` (`createClient<Database>`), whose `.rpc("…")` the
admin-listings hooks use. `src/integrations/supabase/types.ts` has no `admin_set_listing_tier`
entry (it holds `admin_move_listing` at :4471), so `setAdminListingTier` cannot typecheck until
that file carries the door. The file is platform-generated and never hand-edited (AGENTS.md
"Vendors"; lovable-knowledge E5; `.prettierignore:10`), every commit on it is the platform's
(`gpt-engineer-app[bot] Changes`), and it is not in my scope. The plan named the hook and the
page but not this file; the brief and ruling 1 do not mention it. A file I need that my scope
does not cover is a STOP (rule 00, A1).

Nothing half-written: the hook, the page wiring and the e2e are not started; the committed parts
(dialog, reasons, tests, strings) are green — `bun run typecheck` clean, ESLint clean on the four
files, the touched suites 58 + 6 passed (`src/features/admin-listings/tier-*`, `src/i18n`,
`strings-layers`), `scripts/check-hardcoded-strings.sh` 0 findings.

## The ways I see (the supervisor rules; I take none myself)

1. The platform regenerates `types.ts` on `dev` (it does so after an apply it made; M1 and M2 were
   applied by the supervisor, so it may not have). Then the regenerated file is handed to me as a
   word-for-word import (sha256-checked) into this branch — `origin/dev` moving on a file outside
   my scope is otherwise only reported, never merged.
2. A ruling that the one `admin_set_listing_tier` entry may be written by hand in the generated
   shape (`Args: { p_listing_id: string; p_note?: string; p_reason: string; p_tier: string };
   Returns: Json` — `p_note` optional since it is trailing with `DEFAULT NULL`, rule 30), for the
   platform's next regeneration to overwrite identically. This touches a never-hand-edited file,
   so it needs the ruling's words.
3. A typed seam outside the generated file — a declared door signature the hook calls through —
   would be a new mechanism (K3: its guard in the same change) and is not in the plan.

## While waiting

- The dialog's testids and the door's message → key map are fixed (`tier-reasons.ts`), so the
  e2e can be written against them next; the Set tier button sits with the moves
  (`mayEnforce && !own && mayTier(status)`), through `guard()` as `runMove` does.
- Reused, not forked (K1): `ReasonNote`, `NOTE_MAX`, the move's `pickReason` / `noteRequired` /
  `noteTooLong` / `error.*` keys for the refusals the two doors share; `TIER_LABEL` is now the one
  map for a tier's word (the page's local `tierLabel` will read it).

# RULING — P-2 (c) c2a, stop 6: the ad page's level names ride its own document (option 1, a seventh migration part); no permanent allowance for W1; one shared level-name helper for the specs. Base: cursor/p2-fold 12ab0a712.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2a-ruling-6.md` (INC-1076). It widens c2a's file list by one migration file and one e2e helper file, named below, and nothing else.

## 1. Option 1 is ruled — and the cause was my ruling, not your build

Ruling 1 §8 placed the level's names on the ad page's document; my ruling 2 §1 then wrote "the ad page's `level` with no dictionary" without reading the one consumer that needs a name there — the flag's word, drawn on the server render — so the page fell back to the store, and the store's one read loads the Supabase client on a direct landing (DEC-261). Recorded as my slip (S557: a consumer of the concern dropped from a ruling without the census that would have found it — G0.3). SBE-1 did its job.

The rule: **on the ad page the flag's word comes from the document and never from the store**, so a direct landing and a landing from a feed draw the same word at the same moment, on the server. `public_listing_json`'s `level` becomes `{key, placement, badge, name_en, name_am}`; the names are the level row's (`listing_packages.name_en`, `name_am` by key), answered whether the level is enabled or not (a switched-off level still has a name; only its look is NULL). The cards' `level` stays `{key, placement, badge}` with the three doors' `levels` dictionary — two documents, two contracts, one resolver and one names source. Option 2 is refused (a feed call per landing and a late flag); option 3 is refused (a page that shows the flag only sometimes fails the consistency lens).

## 2. M-3c-a part 7 — one file, computed insertion, then the MIGRATION stop

- `public_listing_json` by computed insertion guarded by md5 (law 13, CR-normalised), from the live body part 6 left (md5 `658946271564eb7906d91729e995407b`, the pre-check), one unique fragment replaced: the `level` expression gains `'name_en', k.name_en, 'name_am', k.name_am` from one `LEFT JOIN public.listing_packages k ON k.key = l.tier AND k.kind = 'level'` inside the same subselect (NULL names when no such row — typed absence, never a literal). The live header kept (STABLE, SECURITY DEFINER, search_path public); the service-only grants restated; the new md5 asserted after the apply.
- Pre-check: mark `20261108090500` present and the live md5 above. Mark chosen at the commit by G39's rule (the UTC hour at the commit rounded up plus one hour); the file's stamp before the mark; pairing line `apply <fragment> → expect mark <value>`; `scripts/check-migrations.sh` ("Self-marking guard OK" pasted) and `bun run db:proof --fresh` PASS.
- Proofs, scratch rows under a sentinel, no real row read or written (the INC-949 scratch-market way, as parts 1–6): (a) header and grants unchanged; (b) the body with the fragment put back hashes to `658946271564eb7906d91729e995407b`; (c) an ad at a scratch level answers `level` with the scratch names and its look; an ad at a switched-off scratch level answers its names with NULL axes; an ad whose nil-key index row was removed answers its names with NULL axes; `tier` unchanged and no `levels` key.
- Then STOP at the migration stop: commit, push, the short stop report with the pairing line and the file's sha256, END THE TURN. I apply it on staging (or the operator does), read it back, patch the types if the generated types change (they should not — the function's return type is unchanged), and send "continue". Nothing of §3–§5 before that.

## 3. After "continue": the ad page reads its document

- `src/routes/l.$slug.tsx` (:227 today) draws the flag's word from the document's `level.name_en` / `name_am` by the reader's language, through the same name chooser the store uses for the cards (one function picks a name by language; the store and the page both call it — no second chooser); the page no longer touches the store, so a direct landing performs no read. The store stays as built for the feeds.
- SBE-1 green on both projects, 0 retries, is the proof; the ad-page specs that assert the flag's word run whole, alone (G37). A unit test proves the page's reader takes the name from the document for both languages and answers the typed absence when the names are NULL (no literal, no "Regular" fallback).

## 4. W1 and CF-LIST-1 — no permanent allowance

A permanent allowlist line is DRIFT (G55: every line carries a reason AND an expiry; G0.5: an exception is a decision). Remove it. CF-LIST-1 (INC-1027) refuses the current-row look where a screen reader is not told which row is current; the Promote sheet's current level IS the current item of a set, so the row carries the attribute the guard looks for (`aria-current="true"` on the current level's row, read from the same state that draws `LIST_ROW_CURRENT`) and the guard passes by its own rule. Read the guard's rule first; if it refuses by place rather than by the missing attribute, STOP with the rule quoted — do not add the line. "The row already says Current in words" is a reason for a sighted reader only.

## 5. One level-name helper for the specs

Three new local copies of one read, plus one existing spec read extended, is the pattern K1 forbids (a copied helper kept here rather than imported — §7 "hand-rolled boundary"). Widened scope: one file under `e2e/helpers/` — extend the existing level helper if one reads `listing_packages` (read the helpers first; `e2e/helpers/level-overrides.ts` is the nearest), else add the read there — one function that answers a level's name by key and language through the service client; the four specs call it and their copies go. Its J-law home is `docs/features/e2e-harness.md §Authoring laws`; no new default on any shared helper (G37).

## 6. Then finish

`bun run checks` whole; the budgets from your lock-exact build with ruling 1's tolerance (the ad page's first download must not grow by the store — it no longer imports it on the server path; state the number); self-review; the final report (`docs/governance/reports/p2-fold-c2a.report.md`) with FINDINGS — the SBE-1 red and its cause as above, the W1 attribute, the helper; the K2 list; the Records section (DEC-352, DEC-353, INC-1085, INC-1086, the register row 118 as landed, S557 named as the supervisor's); the CI line of the last commit once its run completes. Push, END THE TURN; PR #30 stays a draft.

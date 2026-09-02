# Phase U4 — G19 close-out review · 2026-08-31

## Security

Every write is definer-gated (permission → step-up → language scope), audited with old→new, and revision-captured; the provider key lives only in server runtime env (never VITE\_, never client); the translate route builds a caller-context client and never holds service role; anon reaches only approved public bundles; publication is coverage-gated with the empty set refused; service_role grants swept with totality proven. Open: Ops review items listed in S32.

## Functionality

TR-1..16 green on both viewports across shards and the fast lane; proofs in-migration on prod and staging for every RPC; three operator walks passed including a real-provider bulk.

## Performance

One cached JSON bundle per language (approved-only) + one entity bundle, client overlay; AI calls chunked ≤100 / capped 600 per request; console isolated to the admin chunk; CI wall-clock reduced by DEC-024 and the fast lane.

## Usability

Coverage meters and gated toggles explain themselves; provenance chips name machine vs human and who; flags carry their reason; History makes every change reversible as a new edit; console fully bilingual (EN/AM) with 360-first layouts.

## Handed forward

ACT-U4-1/2/3; DEC-023's dormant leg; Ops security review; name_am review now continuous through the console.

## S33 addendum — U4f→U4k (2026-09-02)

Security: gate enforced at data AND choice; imports land unapproved+validated, idempotent, batch-undoable; every mutation step-up'd incl. bulk/reorder/delete; deletion cascades counted + audited, base/public refused; step-up top-layer; audit reads indexed (57014 closed); no new definer exposure. Functionality: TR-17..32 green across six shards + serial nightly; five operator walks. Performance: ETag bundles (max-age 300 + SWR); build-time usage map; CI ≈halved; audit query 1.85ms. Usability: dual meters + chips answer "what's left" at a glance; placeholder restore, undo-import, delete, pseudo-loc, compact switcher, tablet-safe roster. Handed forward: ACT-U4-4 spec-lint sweep · ACT-U4-5 entity revisions/flags parity · ACT-U4-6 injection un-park criteria · ACT-U4-7 split admin-translations.spec (~2.5k lines) for shard balance · ACT-U4-8 import-batch history list · v2-context limitation (revisit with v3/glossaries) · HMR dev-only loader warning (upstream).

# HANDOFF — engineering thread, written 2026-09-10 (C3 era closed; import gate live; Vehicles curated)

Run the §2 ritual FIRST: clone dev, read system-state → this file → the ledger tail (S35) → docs/governance/reviews/c3-era-gate.md → git log. Chat memory is advisory; the repo is the record.

## State at handoff
- Board: green on push and nightly; shards 4–7 min; judges 57014 = 0, auth errors = 0. Staging: Pro plan, Small compute; migration marks paired through 20260910080000 (Data-scope identifiers).
- Rulebooks: Lovable Knowledge v3.7 (add A8 amendment INC-183 at v3.8: whole re-declarations only, never text-anchored patches); supervisor instructions v1.9 (G23–G26). DEC-023 LIVE: Lovable runs specs locally against staging via `bun run e2e:local`; a landing touching e2e/** or a gated surface commits only on a local green; staging parity blocked ⇒ no commit; the platform commits when the executor's turn ends — "commit" is never an operator action.
- Catalog surfaces complete: categories console (C2/C5), attributes console (C3) on the DataTable tiers, inherited rows by primary lineage only (DEC-044/INH-1), dependent options (DEC-045), export/import for categories, attributes and translations through ONE import gate (DEC-046) with preview → confirm → undo, column classes, guided refusals naming their values, the three-state dialog (IE-7), the hostile-file spec per family; the guard-cancel contract (DEC-047); the scanner's five findings resolved at their roots; UX-2 polish incl. Data-scope identifiers.
- Two Projects run in parallel: this one (engineering supervisor) and "ethio.com — Catalog curation" (files only; handoff at docs/governance/handoffs/2026-09-08-catalog-curation-thread-handoff.md). Vehicles is curated and imported; Real Estate is the curation thread's current category.

## The operator's loop per curated category (unchanged)
Export subtree (categories, attributes) → curation Project reviews → review note approved by the operator (this thread recommends decisions on request) → three files + change note → import categories, then attributes in ONE pass (IE-5/IE-6 removed the two-pass and echo-row workarounds) → counts line to this thread before Confirm → walk → approve pending Amharic in Translations. Refusals go back to the curation thread verbatim.

## Open items, in order
1. DEC-049 (workflow DEC): bump actions/cache, upload-artifact, download-artifact and gitleaks-action to their Node-24-native majors; pre-committed rule: next push + nightly green, else revert.
2. INC-174: local-only RP-1 sign-out reconciliation (hydrated page keeps the in-memory session after storage clearing) — resolve before U6, when unprivileged writers arrive.
3. Knowledge v3.8 (INC-183 whole-re-declaration law) and the ledger line for DEC-049/INC-183 at the next docs landing.
4. C3-UX-3 (option-value translations), C3-UX-4 (other-text capture), Auto Services cards (Services curation pass), model-heavy-machinery via distributor catalogues (curation delta).
5. U6 Posting spec session per roadmap: first law DEC-043 (card attributes required at posting; other linked attributes optional; listing shows filled attributes only); the poster-facing make → model cascade consumes DEC-045; images are Risk #1 per roadmap.

## Laws that were forged here (do not re-derive)
Read before ruling; trivial-query timeouts are queueing; the walk outranks a green test; migrations re-declare whole with closers in-file; never delete or edit an applied migration (heal marks with a corrective); identity per worker and session per test in node; private mints take the real door; token-derived step-up freshness; inheritance by primary lineage; slugs and keys are identities; imports only through the gate, previewed, undoable; every refusal names its values.

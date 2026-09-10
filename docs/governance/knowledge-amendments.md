# Lovable Project Knowledge — amendment records

## Lovable Project Knowledge v3.7 — amendments (append to §3)

A8 — Any migration that declares or re-declares a SECURITY DEFINER function restates its REVOKE/GRANT closers in the same file with an ACL read-back; a migration and its commit land in the same turn; if the working tree is lost after an apply, report the divergence before anything else.
C7 (amended) — Data tables render only through the DataTable primitive using priority tiers (primary/secondary/detail/wide) and width utilities; `minWidth` is reserved for genuinely unwrappable dense data and requires a same-line `// C7-dense:` justification (guarded); the primitive owns pagination slicing.
F5 (amended) — Imports: server-side parse only; size-capped; every cell is data (formula-leading cells refused; export prefixes them); identity columns never renamed; read-only columns never applied and reported when edited; deletion only by explicit action; preview writes nothing; commit is idempotent, step-up gated, batch-tagged and undoable; refusals name the values they judged.
J10 — Public-surface anchors exclude the scratch prefix (`e2e-`); every scratch entity carries it; invariants exclude other tests' fixtures by actor.

## Lovable Project Knowledge v3.8 — amendments (2026-09-10; A8 amended; two trims)

A8 (amended, in E2) — never patch a function body by text anchor (INC-183): re-declare it WHOLE (CREATE OR REPLACE; DROP+CREATE if the return shape changes), restating REVOKE ALL FROM PUBLIC, anon · GRANT EXECUTE TO authenticated · GRANT ALL TO service_role in-file, with definition+ACL read-back. Closed by 20260910053535_40e4ab7d.
Trims (the settings box caps at 10,000 characters; v3.7 stood at 9,998, v3.8 stands at 9,996 — every future amendment pays for itself): §1's closing sentence "Favor light pages, translation-ready text, DB-enforced security, traceable changes." removed as redundant with A5/D1/E1/F3/G1/H1; J9's "E2E_UI_LOGIN is inert" removed — DEC-048 deleted the knob.
Deferred to v3.9 — E2: an applied migration is never edited or deleted; a corrective heals its mark (INC-179).

# P-1b — ruling 2 (M-a's apply order; the three answers)

````text
RULING — P-1b, turn (a), ruling 2: M-a's apply order (CI red on the temporary backend) + the three answers. Base: cursor/p1b-monetisation at 919c50e6b (dev 8ae1bec5).

**MODEL — Claude Fable 5.1 (High), this same chat. Fix, push, END THE TURN — a second migration stop; nothing else moves.**

## 1. The red (a STOP on a path this turn changed)

Run 41579268496 on 919c50e6b: every lane's backend start failed at the same line —

```
migration: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```

Cause, read in the file: the `INSERT … VALUES ('regular', …)` (M-a §1, after the two key renames) runs while `tier` still exists NOT NULL; the `ALTER TABLE … DROP COLUMN tier, DROP COLUMN label_key` comes three statements later. Nothing else in the four files is wrong: M-b, M-c and M-d are read whole and CLEAN (my own script restores M-d's one line and prints `dfa2d9cd3e4d633314717597e9902986`; the pre-apply md5 guard is right).

## 2. The fix (M-a only; the file keeps its name — it is landed nowhere)

a. Move the line `ALTER TABLE public.listing_packages DROP COLUMN tier, DROP COLUMN label_key;` to directly after `UPDATE public.listing_packages SET key = 'premium' WHERE key = 'premium_60';` and before the `regular` INSERT. Nothing else in §1 moves.
b. One rule added to `admin_save_listing_package`, after `SELECT * INTO v_old … FOR UPDATE;` and before the Amharic line: a product's kind never changes once the row exists —
```
  IF v_old.key IS NOT NULL AND v_old.kind <> p_kind THEN
    RAISE EXCEPTION 'kind change';
  END IF;
```
   Proof (e) gains that refusal (save the scratch level again as `reach` → `kind change`, nothing written); the file's RAISE count and the stop report's "fifteen refusals" line move by one. Turn (b)'s key: `admin.monetisation.error.kindChange` "A product's kind cannot change; add a new product."
c. `docs/governance/reports/p1b-monetisation.stop-1.md`: M-a's sha256 line updated; one line under Departures: "ruling 2 (2026-11-03): the DROP moved above the `regular` INSERT — CI's backend refused the apply (23502); the `kind change` refusal added." No new report file.
d. `bash scripts/check-migrations.sh` and `bun run checks` as before; push; END THE TURN with three lines (done, left, CI) — I read the run myself. The staging apply follows a green backend start on that run (the lanes STAGING BEHIND and PKG stay red by design, as your Limits say).

## 3. The three answers

1. **Rule 30's size clause — apply as written, no split.** Each file is one concern with its own mark, proofs and stop, which is the rule's purpose; M-d is a live body and cannot be split; the connector applies a whole file and I read each whole. Recorded as a deviation (G10) with that rationale; rule 30's wording ("about 25 KB") is amended at the next rules turn to say when a split is due — more than one concern in a file, or a file the applier cannot take whole; a redeclared live body never.
2. **Seed values — confirmed, every one as you set them:** `regular` 30 days / 4 photos / `standard` / no badge / sort 0 / self-serve / extends lifetime; `featured` 8 / `boost` / badge, sort unchanged; `premium` 12 / `top` / badge; reach `city` 100 (not self-serve: the included reach), `nationwide` 110, `worldwide` 120 (self-serve), 30 days, `extends_lifetime` false; the default market 10 credits / 30 days.
3. **The EN key list — approved with three edits**, final for turn (b): `caps.untilP2` reads "These caps move to the levels and the reach when an ad's level lands." (no "(P-2)" in a screen); `col.since` reads "Paid since"; add `error.kindChange` (§2 b). The `override.add` / `override.edit` / `override.clear` verbs stand. Everything else as listed: 3 base + 74 admin keys. The Amharic file for exactly that list comes with the continue ruling, with the generated types and the staging read-backs.

Departures accepted: M-d's form with the md5 pre-check (better than the ruling asked); `scripts/e2e-select.ts` untouched until the spec exists in (b).
````

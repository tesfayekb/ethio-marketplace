Source: supervisor thread, turn 1073, Thu 2026-10-01 15:44 New York.
Status at 2026-10-05: the S2 rulings (visitor search never rebuilds the index; rebuild after commits and in a scheduled pg_cron sweep with a heartbeat; one round trip per search) were built in the D + L + M migration a35e45fa and bundle 1 item 3 (catalog_search, sweep every 5 minutes from bundle 2); the Part O readers were built in bundle 1 item 7; DEC-096 (the stranded-turn detector) was queued and NEVER BUILT — roadmap.md names it as open; the repo holds the built search behaviour (docs/features/catalog-finder.md, _changelog.md), not this text.
Related: INC-372, INC-373, S2, INC-273, DEC-096, Part O (INC-370), D + L + M, pg_cron, catalog_find_refresh.

Your instinct was right: the fix did not reach dev. Lovable's undo of the framework upgrade (INC-372) was pushed to a side branch, `lovable-sync-1790881191`, not to dev. While Lovable was working, the CI report commits moved dev forward, so the platform couldn't push there. This is the same stranding as INC-359; I've logged it as INC-373.

- **Why CI is red:** dev still ends at d5b9740a, the upgraded version, and CI fails on it. The type check breaks in `__root.tsx` and test AT-58 fails, the same two failures DEC-092 was rolled back for.
- **The undo itself is correct:** the side branch holds exactly the 2f600496 versions of the three files. It only needs to reach dev.
- **Third stranding:** this is the third time a Lovable turn has missed dev, so I'm adding a small CI check (DEC-096). It lists any stranded Lovable branch in the CI status file. It's information only; it never blocks a build or a promotion.
- **Lovable's two blockers, ruled:**
  - **Search speed (S2): approved.** Visitors' searches never rebuild the search index. The rebuild runs right after a catalogue change, plus a scheduled sweep as a safety net, which also covers the listing-expiry job still waiting for a scheduler. Each search becomes one trip to the database. If the target of 0.3 s still isn't met, Lovable stops and reports timings.
  - **"Other" write-ins on multi-choice questions (INC-370): in scope.** The places that currently drop the typed text get updated in the same change, through one shared helper.
- **Lovable's slip:** it called the framework upgrade a "routine security update" and has owned that. I've logged it.

**Your steps**
1. Paste this into Lovable and send it:

---
```
INC-373 — YOUR INC-372 REVERT DID NOT REACH dev. The platform pushed it to the side branch lovable-sync-1790881191 (8e050534, 112694d3, based on f27429c2), because CI-status commits moved dev while your turn ran (the INC-359 stranding again). dev's HEAD is still d5b9740a, and CI is red on it: typecheck src/routes/__root.tsx:264 (TS2322, ErrorComponentProps from react-router 1.170.41) and AT-58 on shards 1 and 4 — the DEC-092 symptoms.

1 · Land the revert on dev first: package.json, bun.lock and src/routeTree.gen.ts byte-identical to 2f600496 (lovable-sync-1790881191 holds exactly that). Keep the S1 files. Run typecheck and the AT-58 spec locally before the turn ends.

2 · Rulings on your two blockers.
S2 — APPROVED as you proposed, within these limits:
- A visitor's search never rebuilds the index, and INC-273 still holds: no rebuild inside a write path.
- Rebuild (a) right after a catalogue import, attribute/category edit or translation approval commits, as its own call made after the commit returns, never inside that transaction; and (b) in a scheduled sweep that rebuilds when the catalogue version moved, under the existing advisory lock, writing a completion heartbeat row (§9: "ran with nothing to do" ≠ "never ran").
- The project has no scheduler yet (the expiry sweeper's pg_cron wiring is still a named follow-up, migration 0ce87c13:294). pg_cron is approved for this sweep. If a migration cannot enable it, say so and stop that piece; the operator will enable it in the dashboard.
- While a rebuild is pending, search answers from the current index.
- Fold the version read into the find call; run the rate check in the same call or in parallel — one round trip per search.
- Re-time afterwards: per-step timings and warm p95 against ≤ 300 ms. If it is still over, stop and report the timings before changing anything else.
- DB changes ride the D+L+M migration (one migration, one apply).
Part O (INC-370) — the readers ARE in scope. Adapt every reader the census found in the same landing, through one shared helper (the selected tokens of a multi-choice answer, plus the Other text), so the shape is understood in one place. List each reader (file:line) and how it now reads the object element. Then the migration as specified.

3 · DEC-096 — stranded-turn detector (third stranding: INC-359 twice, now INC-373). Signal only.
- The CI Status Reporter adds a "Stranded turns" section to docs/tracking/ci-status.md. It lists every remote lovable-* branch whose tip is not an ancestor of dev, minus the branches in a new docs/tracking/stranded-acknowledged.md.
- Seed that file with the ten branches that exist today: lovable-backup-dev-1788419378, lovable-sync, lovable-sync-1788322342, lovable-sync-1788764600, lovable-sync-1789741128, lovable-sync-1790153551, lovable-sync-1790668701, lovable-sync-1790806349, lovable-sync-1790807903, lovable-sync-1790881191.
- It never gates the verdict or promote.
- Decision rule (pre-committed): adopted only if its self-test fixture shows an unmerged scratch branch in the section and an acknowledged one absent.

Then continue: D+L+M → S2/S3 → DEC-096 → T (with T4) → A → B → C → Part O → Part P → INC-371 → the E census → the final full DEC-023 run. Report once at the end unless blocked or red.
```
---

2. When Lovable finishes that turn, tell me. I'll check that the undo is actually on dev and that CI is green before anything else goes ahead.
3. You haven't sent the earlier quick check yet: Beauty & Personal Care › Skincare, Product Type = Moisturiser. Condition should come right after Volume, before Expiry month.

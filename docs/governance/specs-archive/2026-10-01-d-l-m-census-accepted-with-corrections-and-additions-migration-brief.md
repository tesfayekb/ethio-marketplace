Source: supervisor thread, turn 1124, Thu 2026-10-01 21:30 New York.
Status at 2026-10-05: the D + L + M migration was written and applied by the executor on ethio-prod (20261002013936_a35e45fa, mark 20261002030000) and by the operator on ethio-staging (2026-10-02; CI green attempt 2, 8e96a6a4); its findings (INC-382 rule too broad; Other write-ins, title and description to get the phone check) went to bundle 2; the repo holds the migration file and the changelog line, not this brief.
Related: D + L + M, Parts D L M, INC-350, Part O (INC-370), S2 (catalog_search, pg_cron sweep), set_listing_pin p_zoom, other-food catch-all correction, INC-382.

**Lovable's census is right except for one location, which I corrected in the block below. Send that block and it can write the migration.**

- **The wrong location:** Lovable says text answers are checked inside `validate_listing_draft`. In the repo that check lives in `validate_listing_attributes` (migration 247a3ed0, line 236), which the draft door only calls. The phone-number refusal has to go there.
- **What the census left out:** it does not cover the search changes (S2) or the Part O readers, though both go into the same migration. I asked for those before it edits.
- **Verified in the repo:** the pin door's signature and last declaration, its three callers at lines 686, 704 and 738, the draft door's last declaration, and the last mark `20260930180000`.

**CI:** the census commit (`34627301`) is green, main is promoted, and there is no new side branch. One test (PW-98) was flaky: it timed out in its cleanup step, which does not touch the account pool. A slower account reset could have contributed, and the evidence does not show how long resets take. So I count this as green run 2 of 3 for the pool, but I will hold adoption until a timing line settles that question, queued for after this migration.

1. Paste this into Lovable, attach nothing, and send it.

---
```
D + L + M census: accepted with one correction and three additions. Then write the migration; stop again only if a census finding contradicts the brief.

CORRECTION (read in the repo; confirm against the live definition)
- The text-answer branch is not in validate_listing_draft. It is in public.validate_listing_attributes, last declared in migration 247a3ed0 (line 236, `IF v_def.attr_type = 'text'`). validate_listing_draft (13cb1b22, line 101) only calls it. The preset check there is inline; it does not call attr_preset_ok.
- So Part D's contactInText is added inside validate_listing_attributes. Census that function before you redeclare it: live md5, access rules, last declaration. Redeclare it from its live definition, never from a migration file. Redeclare validate_listing_draft only if the brief changes it.

ADD TO THE CENSUS BEFORE EDITING (state each in your report)
1. Every branch of validate_listing_attributes that stores seller-typed text: the text branch (247a3ed0:236) and the Other write-in (247a3ed0:378, otherNeedsText). Say which of them the brief's contactInText covers. An answer governed by a preset (digits:n, vin, plate-et, alnum) is identity data, not free text: show that the rule can never refuse an IMEI, a VIN or a plate.
2. S2: each search function the migration changes, with its live md5 and last declaration; and whether pg_cron is installed on the live database (pg_extension). The migration creates what it needs in-file, so staging and prod end identical.
3. Part O readers: every function that reads a multi-select answer, by name, so the shared helper replaces all of them.

RISKS TO CLOSE IN THE FILE
- set_listing_pin gains p_zoom: drop the five-argument signature in the same migration, so there are never two overloads; re-issue REVOKE and GRANT on the new signature.
- The scheduled sweep writes a completion heartbeat on every run, including a run with nothing to do.

Everything else in the brief stands: one migration with its in-file closers, PW-96 and PW-101 each shown failing before its fix, a local run of the touched specs, and a report only on green that states "apply <uuid-fragment> → expect mark <value>".
```
---

2. Send me Lovable's report when it arrives, and the curator's batch 14 when it is ready.

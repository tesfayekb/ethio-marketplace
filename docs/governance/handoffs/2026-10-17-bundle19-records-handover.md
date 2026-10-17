# Handover — bundle 19's records (the product detail page built; the walk and its fixes follow) (2026-10-17)

Written by the supervisor after bundle 19's turn 19 and imported word for word by turn 20 (the records turn, docs only — G41). Bundle 19 stays open until the operator has Published and walked the page and the walk's fixes have landed green; this file is the record at turn 19. The successor reads, in this order, before anything else (instructions §2 addendum): this file → docs/governance/system-state.md → the tail of docs/spec/spec-ledger.md (block S71) → the root /roadmap.md → the brief it names → the ci-evidence branch (ci-status.md, e2e-last-failure.md, guards-last-failure.md, flake-ledger.md whole, flake-check-status.md) → the tail of docs/tracking/incidental-findings.md. Chat memory and the previous thread's notes are advisory; the repository is the record (G53).

## Heads and CI

- dev = `130586d0` (turn 19, "Completed background tasks", 2026-10-17 22:45Z) before this records turn; main = `732b933d` (turn 1; run 970 green 04:23Z, promoted — the bundle's only promote: every later run was red or replaced while queued).
- Run 996 on `130586d0`: running when these records were written (started 22:46Z); its verdict is read with turn 21
- Runs queue and are never cancelled (ci.yml :31–:33, `cancel-in-progress: false`, DEC-181); a newer push only replaces a run still QUEUED (run 993 on `fe92cf36` was replaced at 14:38Z). The executor gets its next turn the moment it reports — no wait for CI (S279).
- The platform's side branches: eleven, the known set; none new.
- Published: nothing in bundle 19 yet. The Publish is asked for when the newest commit is green and the executor is idle (DEC-181).

## Bundle and turn state

- Bundle 19 (D201, the product detail page; spec docs/governance/product-detail-page-spec.md v1; drawings v12 as WebP copies in docs/design/d201/): turns 1–19 landed, ten migrations in eighteen files on ethio-prod by the executor's tool and on ethio-staging by the operator (the newest mark `20261018220000`, M9 — applied on ethio-staging by the operator (his word, 21:24Z) and proven by the preflight of run 995's second attempt). Block S71 lists every turn.
- What remains before the close: the Publish, the one walk (G31), the walk's fixes and INC-712 (the "Seen N times" threshold), then the close's ledger line.

## D201 mapped to the turns that built it (S274's class rule)

- §0 rulings: 1 key facts — turns 9 (M2 `fact_rank`), 10 (the Key fact tick); the curator's C38 rows owed. 2 contact — turns 11 (M5: 30 a day, 10 distinct sellers, 5 for a new account, the flag), 18 (the operator's "Contact seller" link before "All ads by this seller"), 19 (the reveal after sign-in by the visitor's own tap — a tab-only intent; never an address, §14). 3 safety box — turn 8, the cards turn 18. 4 Save — turns 12a (M3), 12b (the heart, "Saved by N", Account › Saved). 5 rating — not drawn (ruling 12: nothing that is not built). 6 the in-page bar — turns 18, 19 (on a sold ad too). 7 the address and the QR — turns 1, 3, 4, 5. 8 Messages hidden — turn 7. 9 Save and Report in this bundle — turns 12, 13. 10 views and shares — turns 4 (M1), 14 (Share, the counts); "Share your ad now" at the end of posting NOT built: a new ad goes to review first and its address answers "gone" until it is live, so the share sits on the seller's ad page once the ad is live (turn 14, AP-33) — the operator's ruling is owed (keep as is, or a share step when the ad goes live). 11 the sold ad — turns 8, 10, 19 (full-width Details). 12 no "coming soon" — kept. 13 recurring prices — as built before. 14 location — turns 18 (the map only with a pin; Enlarge map), 19 (Google Maps from the places line and the map; an approximate pin gives the snapped centre only); "All ads by this seller" — turns 16, 17 (the seller's page at ethio.com/<name>, DEC-107/DEC-108). 15 one component, three actors — turn 7.
- §2 turns 1, 3, 5. §3 turn 4. §4 turns 9, 10. §5 turns 18, 19 — not built: the owner's top bar "This is how buyers see your ad" (the seller's ad page has "View as buyer" and its own "As buyers see it" section — the operator may rule it settled); Save and Share in the phone's bottom bar and the right column (the supervisor's G17 call of turn 18, approved by the paste: one control each, on the photo). §6 turn 11, and turn 19 for §14's "never an address". §7 turn 8. §8 turns 12a, 12b. §9 turns 4, 14 — Q-B's threshold NOT built: INC-712; the 400-day purge of the counters' buckets is not built (named for the retention job's turn). §10 turn 14 (the sheet, the QR row, og and JSON-LD, the photo redirect). §11 turns 13a, 13b. §12 turns 15 (similar ads; the home feed's rows since 18), 16, 17. §13 the server timing line built (`[slow-rpc]`); the first-paint budget measures the bundle, not the page's HTML — the ESTIMATE of 60 KB stays unmeasured. §14 turns 4, 11, 19. §15 the tests each turn named. §16 M1–M5 plus M6–M9 (the bundle's own additions). §19 Q-A turn 13a (the AH-12 list), Q-B INC-712, Q-C turn 11 (`reveal_flags`), Q-D turn 12b.

## Operator steps owed

1. When run 996 (or the newest run) is green and the executor is idle: Publish (Lovable → Publish), then the bundle's one walk (sent with the Publish request).
2. The laptop review he announced (19:26 local): screenshots of anything on the ad page that still looks off at a laptop width — the turn after 21 folds them.
3. DEC-191's curator message (the reserved-names v4 research: sound-alikes, abbreviations, the gaps in kinds and markets; research and plan only) — send it to the curator when it is free, if not sent yet.
4. A ruling, when convenient: "Share your ad now" (above) — keep the share on the live ad's own page, or add a share step when the ad goes live.

## Executor and curator

- The executor (Lovable): idle after this records turn until the next brief.
- The curator: C38 (the title parts, the required flags, `fact_rank`; research and plan first) — its plan is not yet received; DEC-191's pass — research and plan first, no rows.

## Open questions with owners

- The operator: the "Share your ad now" ruling; the owner's top bar (settled by "View as buyer", or built); the reclaim of a squatted seller name — today no one, staff included, can give a name another account once held (`alias_taken` reads every `alias_history` row with no expiry; the override cannot pass it) — DEC-107 needs its reclaim exception, in the store spec [6.19] with "Report this seller" (roadmap).
- The supervisor: the seller-name sweep of 2026-10-18 02:23 UTC (the first after M9) read for the names DEC-191 now refuses; the curator's two plans audited against the form as built (G47); the instructions v1.14 (the rules in force and not yet installed — block S71's judges).

## Next planned action

Turn 21 — the operator's phone review of 19:26 local (the phone's contact bar removed, "Contact seller" in the seller card only; the Maps links' comma encoded %2C so the app opens at the pin; the buyer's own map words instead of the seller's preview caption) with INC-712; then the turn for his laptop review; then, on the newest green with the executor idle, the Publish and the one walk; then the close's ledger line.

Numbering: next free DEC-192, D202, INC-713, S281, ACT-021.

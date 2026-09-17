# MODERATION — SIMPLIFIED AI-FIRST DESIGN (2026-09-17; replaces D16 of the U6 v3 amendment)

## 1 · What the research says (grounding)
- The classifieds industry converged on one architecture: an automated first decision that sorts every submission into **OK / NOK / Uncertain**, with humans touching only the Uncertain band. Besedo (OLX's long-time vendor) runs exactly that for marketplaces; its published case (the Swiss marketplace Anibis) reached **94% automation at 99.8% accuracy**; image decisions in under a second, text in milliseconds. Vendors price by volume with monthly minimums — not worth it at our size; the architecture is.
- The EU Digital Services Act shapes what "good" looks like even where it may not bind us: a **statement of reasons** on every restriction (Art. 17), a **notice-and-action** channel for illegal content (Art. 16), an **internal complaint** path (Art. 20), **suspension of repeat misusers** after warning (Art. 23), and **trader traceability** for business sellers on marketplaces (Art. 30). Micro and small enterprises are exempt from Arts. 20–32 (Art. 19); Arts. 16–17 apply to every hosting provider. Whether a classifieds site where contracts are concluded off-platform is an "online marketplace" under Art. 30 is a counsel question (Q-014). Design decision: build the Art. 16/17/20/23 shape now because it is simply good moderation; keep Art. 30 (business KYC) as a seam behind the seller-type flag.

## 2 · Principles
1. **One judge, one call.** The gateway sends the whole listing — title, description, attributes, category, and up to ten photos — to the model in ONE multimodal request and receives ONE structured verdict. No separate text and image pipelines to keep in step.
2. **Three bands, not five.** Every verdict lands in OK, NOK or UNCERTAIN by confidence. Reduced reach and holds are what happens to UNCERTAIN, not separate judgements.
3. **A second opinion before a person.** UNCERTAIN goes to a second model pass with a stricter, reasons-required prompt (a different sampling seed or model). Two agreeing passes decide; only two disagreeing passes reach a human.
4. **Time-boxed holds.** Nothing waits on a human indefinitely: a held listing unreviewed after 24 hours takes the second pass's lean — live with reduced reach if the lean was OK, rejected with reasons and an appeal if NOK. Humans are a quality signal, never a bottleneck.
5. **Trust moves the thresholds.** A seller's standing shifts the bands, so an established seller's borderline post goes live where a new account's is held; the model's work is the same.
6. **Every decision explains itself** in the seller's language, with an appeal link — the DSA Art. 17 shape, also the fair one.
7. **Dials, not deploys.** Thresholds, band widths, tier rules, allowances, ladder lengths and the severe-category list live in one admin table.

## 3 · The pipeline (per listing, at publish and on every edit)
1. **Structure** (deterministic, free): the validation authority (DEC-051), price and period laws, coverage plan, residency; a refusal here never reaches the model.
2. **Hygiene** (deterministic, free): sanitisation; magic-byte and metadata strip on photos (already done at upload); contact details in text (phone/URL patterns) allowed only in the contact fields; velocity (posts per hour/day vs allowance); duplicate detection (same seller, same title+category within 24 h → soft warning; near-identical across sellers → flag to the model as context).
3. **The judge** (one Gemini call, JSON schema output): `{ policy: [ {code, severity, evidence} ], coherence: { category_fit, photos_match_text, text_quality }, fraud_signals: [...], risk: 0–1, lean: OK|NOK, reasons_for_seller: [...in the seller's language], reasons_internal: [...] }`. Policy codes are a fixed list (prohibited goods, weapons, drugs, counterfeit, adult, minors, hate, scams/advance-fee, stolen goods markers, personal data of others, off-platform payment pressure, misleading price). The same call also judges the photo coherence pass (D15's second pass) — the upload-time policy pass on each photo is a smaller image-only call.
4. **Routing** by `risk` against the seller's tier thresholds: OK → live (or reduced reach in the top of the band for T0 sellers); NOK → reject (never live) or remove (if editing a live post) with reasons and appeal; UNCERTAIN → second pass → agree → act; disagree → human queue with the two verdicts side by side, 24-hour box.
5. **Record**: the verdict row (model, version, both passes, reasons), the standing update, the audit line.

## 4 · Trust tiers (standing → thresholds and allowances)
| Tier | Who | Bands (risk) | Allowances |
|---|---|---|---|
| **T0 new** | < 3 approved posts, or contact channel unverified | OK ≤ 0.20 · UNCERTAIN 0.20–0.70 · NOK > 0.70; OK 0.10–0.20 goes live with reduced reach | 3 drafts/day, 5 live |
| **T1 established** | ≥ 3 approved, no strike in 90 days | OK ≤ 0.35 · UNCERTAIN 0.35–0.80 · NOK > 0.80 | 10/day, 30 live |
| **T2 trusted** | ≥ 20 approved, verified channel, no strike in 180 days, low report ratio | OK ≤ 0.50 · UNCERTAIN 0.50–0.85 · NOK > 0.85; edits skip re-screen unless risk rose | 30/day, 100 live |
| **T3 restricted** | any active strike, or a suspension in the last 180 days | everything ≥ 0.10 is UNCERTAIN → held first | 1/day, 5 live |
Business sellers start at T0 like everyone; verification (later era) is a shortcut to T2. Report ratio = reports received per 100 views, weighted by the reporters' tiers.

## 5 · The action ladder (automatic; the same table drives it)
| Trigger | T2/T1 seller | T0 seller | Severe list (any tier) |
|---|---|---|---|
| First NOK | post rejected/removed, reasons + appeal, **no strike** | post rejected, reasons + appeal, **strike 1** | immediate suspension, all listings removed, report per Art. 18 shape, appeal via human only |
| Strike 2 (within 90 days) | strike, tier → T3 for 30 days | tier → T3, 7-day posting suspension | — |
| Strike 3 | 7-day suspension | 30-day suspension | — |
| Strike 4 | 30-day suspension | account closed | — |
Strikes expire after 180 clean days. Every step: a statement of reasons and the appeal path. A warning precedes any suspension (Art. 23 shape) — the strike itself is the warning.

## 6 · Appeals, reports, sweeps — with humans as the exception
- **Appeal, first round — automated.** The seller writes one sentence; a fresh model instance sees the listing, both verdicts and the appeal text and answers uphold/overturn with reasons. Overturn → live and the strike reversed. Uphold → the seller may escalate once.
- **Appeal, second round — human**, from the queue, with everything in front of them. This and severe-list appeals are the only appeals a person reads.
- **Reports** (notice-and-action shape): a reporter picks a reason and may add a line; the listing is re-judged with the report as context; reports from T2 reporters weigh more; a report on a listing that survives re-judgement does not touch the seller; reporters who file three overturned reports in 30 days lose weight.
- **Sweeps**: when the dials, the model or the policy list change, a job re-judges live listings from the highest risk down, in batches, with a heartbeat; removals go through the same ladder (with reasons, appeal).
- **Calibration sample**: each week 50 random decisions (stratified by band) are shown to a human who marks agree/disagree; the disagreement rate is a dial input and the only routine human task.

## 7 · Human involvement, honestly counted
Per week at launch-scale volumes (ESTIMATE): the calibration sample (~1 hour), second-round appeals and disagreeing-pass holds (minutes to an hour), dial changes when calibration drifts. No human reads first-round verdicts, first-round appeals, ordinary reports or sweep results.

## 8 · Data (deltas to the U6 spec)
- `screening_verdicts` gains `pass integer` (1 = judge, 2 = second opinion, 3 = appeal, 4 = human) and `risk numeric(4,3)`, `lean text`; `listings.screening` carries the current summary.
- `user_directory.standing` holds `{ tier, approved, strikes: [{at, reason, expires}], suspended_until, report_ratio, last_verdict_at }`.
- `moderation_dials` (admin-editable, one row per key, audited): band thresholds per tier, allowances, ladder lengths, strike expiry, hold time-box, severe-category codes, reporter weights.
- `listing_reports (id, listing_id, reporter, reason, note, verdict_id, created_at)`; `moderation_appeals (id, listing_id, seller_id, round, text, verdict_id, outcome, created_at)`.
- Business sellers (D17): `seller_type = business` plus a `trader_traceability jsonb` seam (empty until counsel rules on Art. 30) — no collection at first posting beyond the business name and a contact channel.

## 9 · What we deliberately do not build
A vendor moderation platform (cost, minimums, a second system to keep in step); separate text and image pipelines; a human-first queue; manual re-screening of edits from trusted sellers; a policy list that lives in a deploy.

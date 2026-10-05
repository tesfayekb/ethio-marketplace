Source: supervisor thread, turn 839, Sun 2026-09-27 22:21 New York.
Status at 2026-10-05: D62 approved by the operator on 2026-09-27 22:34 (recorded as DEC-081 in turn 841) and built (D62-1 database half 6ebe04ea, mark 20260928040000; D62-2 client half 0bbf9eb7; hotfixes D62-1b/1c/1d); the INC-308 investigation was run (the fix became DEC-082, 0bf75959); the Photo Studio (D65) was approved in principle in turn 841 and is not specified and not built. The repo holds the built behaviour in docs/features/posting.md (sections DEC-081 and D62-2) and the D62 ruling line in docs/spec/spec-ledger.md (S43), not this spec text.
Related: D62, DEC-081, DEC-082, INC-308, D65, D63, Turn C (INC-295), D53, D56.

Three separate things in there — here is where each stands and what I need from you.

## 1 · The price page (D62 grows into "the price page")

Agreed on all three, and they belong together on step 5. What exists today: the currency preselect already follows a chain — the draft's saved currency → the seller's last listing's currency → the guess market's currency (IP country → `countries.currency_code`) → ETB — but the list itself is alphabetical by code (`currencies` has code, name, minor units; no symbol, no commonness rank). The pricing basis ("per hour / per job / fixed / quote") is a catalogue attribute answered on the Specifications step, and the price step reads it to shape the amount.

**Spec D62 — the price page (DEC-081 on your approval):**

- **A · Negotiable** — a toggle beside the amount, "Price is negotiable"; stored as `listings.price_negotiable`; a "Negotiable" badge beside the price on card, detail and the admin table; a feed filter chip. `negotiable` stops being a price mode; the curator then removes it from every basis list (the door treats a leftover value as a plain price until then).
- **B · The basis moves to the price page** — the leaf's pricing-basis attribute is asked on step 5, above the amount, not on Specifications; the doors judge it at step 5 (today's basis checks already run there); locks and prefills (D44) unchanged; Review shows it under Price. Recommendation: yes — it is the question "how do you price this", and the seller answers it where the price is.
- **C · Currency** — default chain gains the seller's **home country's currency** ahead of the IP guess (saved → last listing → home country → IP country → ETB); the list opens with that currency first, USD second, then the rest by a curated commonness order; every row shows code · symbol · name (ETB · Br · Ethiopian Birr). Needs two columns on `currencies` (`symbol`, `display_order`) seeded by migration — expansion to Kenya, Somalia, Djibouti, Eritrea then costs one row each in `countries.currency_code`, which already exists.
- Build in two turns: DB (column, currency columns + seed, doors incl. `edit_listing`'s argument list, `price_shape_for_basis`) then client (step 5 layout, badge, filter, tests PW-6x/PR). Tier A on the doors, B on the client.

**One answer needed: "approve D62 as written", or name the change.** Then I write the execution prompt for the DB turn.

## 2 · Category image generation — INC-308, registered

The message tells me where it broke: the console prints `<slug>: stage: <stage> <error>`, and yours shows an **empty stage and "HTTP 500"** — meaning the response carried no JSON body at all. Every failure path inside the route answers JSON with its stage (generate-image.ts:224–228, 268–273), so this 500 came from **outside the route**: the Worker itself. Hypothesis (not yet proven): the image processing (`processGeneratedPng` decoding a full-size generated PNG and cutting three variants) exceeds the Worker's CPU limit — the INC-298 class (Cloudflare 1102 returns a plain 500 page) — or the server-only modules fail to load under workerd. It affected every category in the batch, which fits a limit rather than a provider error. Admin-only surface, no seller impact; sequenced right after the docs turn.

Paste this to Lovable **after** its docs-turn report (one turn in flight; this one is read-only, so no approval gate):

---
```
INVESTIGATION (read-only, no repo edits) — INC-308: bulk "Generate image" answers HTTP 500 with no JSON body for every category (2026-09-28, admin console). Report findings only; propose, do not fix.

1. Reproduce ONE call to POST /api/admin/categories/generate-image as an admin (any category without an image) and capture the raw response: status, every header (cf-ray, content-type, cf-cache-status), and the first 300 bytes of the body. Say whether the body is the route's JSON ({error, stage}) or something else (an HTML error page — quote its title/error number).
2. Server logs for the same minute: is there a "[ssr-error] /api/admin/categories/generate-image image_generate_failed stage=…" line at all? If none, the request died outside the handler — say so.
3. Census, line-cited: the route's dynamic imports (generate-image.ts:52–56) and what they pull in (pngjs/jpeg-js sizes); processGeneratedPng's work on a REAL-size generated PNG (measure processMs locally with a 1024×1024 PNG, not the fake fixture); the hosting runtime's CPU/time/memory limits per request as the platform documents them for this project (name the source; if you cannot read it, say so — no guess).
4. When the generation last succeeded on the published app (dates from the category-assets storage objects' timestamps) and what changed in the serve stack since.
5. Options with trade-offs, ranked: (a) move variant processing off the Worker — the route returns the generated bytes, the console cuts the variants in the browser and uploads them under the admin's session; (b) a Supabase Edge Function does the processing; (c) a provider-side resize. State which the evidence supports and what each costs in scope.
Report: the captured response, the log verdict, the measured processMs, the limits with their source, the ranked options. Nothing is changed in the repo or the database.
```
---

## 3 · The photo step

What already exists: the phone's native chooser offers both **take a photo** and **choose from library** (the input has no `capture` attribute on purpose, so both appear); on-device encoding (orientation fix, resize that never upscales, WebP or JPEG 0.82, three variants), sequential uploads with real progress, and a server-side policy pass. What you are asking for beyond that is a **Photo Studio** spec — D65: a clarity check (blur/darkness warning before upload), auto-enhance (light and contrast, on device), a standard background / background removal and smart crop (these need an AI provider per image — server-side, opt-in per photo, never automatic, and never a model downloaded to the phone: kilobytes are the seller's money). It comes after D62 and the INC-308 fix; the one decision it will need from you is spend: a paid image model per background removal, roughly a cent or two per photo, yes or no. Nothing to answer now.

**Queue, in order:** docs turn (in flight) → INC-308 investigation → D62 DB turn → D62 client turn → INC-308 fix → D63 (guest order) → D65 photo studio → Turn C (INC-295) → D53/D56. Say if you want a different order.

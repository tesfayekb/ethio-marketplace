# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35439949370
- Commit: `ce35e726b2037c7bf0c1bf3526b1da3bbf9ee3a2`
- Attempt: 1
- Written (UTC): 2026-09-19T11:37:23.537Z
- Passed: 833 · Skipped: 74 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar — Error: LY-6: the sticky action bar covers the open currency list
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion — Error: expect(locator).toHaveAttribute(expected) failed

## admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 4
+ Received  + 0

@@ -71,14 +71,10 @@
  dog_gender,Gender,,single_select,\"{\"\"value\"\": \"\"male\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Male\"\"}|{\"\"value\"\": \"\"female\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Female\"\"}\",,,,,,,,,,,,1
  dog_health,Health Status,,single_select,\"{\"\"value\"\": \"\"vaccinated\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Vaccinated\"\"}|{\"\"value\"\": \"\"dewormed\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Dewormed\"\"}|{\"\"value\"\": \"\"spayed-neutered\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Spayed/Neutered\"\"}|{\"\"value\"\": \"\"microchipped\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Microchipped\"\"}|{\"\"value\"\": \"\"vet-checked\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Vet Checked\"\"}\",,,,,,,,,,,,1
  doors-cars,Number of Doors,,single_select,\"{\"\"value\"\": \"\"2\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"2 Doors\"\"}|{\"\"value\"\": \"\"3\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"3 Doors\"\"}|{\"\"value\"\": \"\"4\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"4 Doors\"\"}|{\"\"value\"\": \"\"5\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"5 Doors\"\"}\",,,,,,,,,Auto-selected based on model,,,1
  doors-sedans,Number of Doors,,single_select,\"{\"\"value\"\": \"\"2\"\", \"\"label_en\"\": \"\"2 Door\"\"}|{\"\"value\"\": \"\"4\"\", \"\"label_en\"\": \"\"4 Door\"\"}\",,,,,,,,,,,,1
  duration,Duration,,single_select,\"{\"\"value\"\": \"\"hourly\"\", \"\"label_en\"\": \"\"Hourly\"\"}|{\"\"value\"\": \"\"daily\"\", \"\"label_en\"\": \"\"Daily\"\"}|{\"\"value\"\": \"\"weekly\"\", \"\"label_en\"\": \"\"Weekly\"\"}|{\"\"value\"\": \"\"monthly\"\", \"\"label_en\"\": \"\"Monthly\"\"}|{\"\"value\"\": \"\"custom\"\", \"\"label_en\"\": \"\"Custom\"\"}\",,,,,,,,,,,,1
- e2e_fold_6_2_oqtz84_make,e2e_fold_6_2_oqtz84 make,,single_select,\"{\"\"value\"\": \"\"e2e_fold_6_2_oqtz84_mk1\"\", \"\"active\"\": true, \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_mk1 ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_mk1 label\"\"}|{\"\"value\"\": \"\"e2e_fold_6_2_oqtz84_mk2\"\", \"\"active\"\": true, \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_mk2 ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_mk2 label\"\"}\",,,,,,,,,,,,1
- e2e_fold_6_2_oqtz84_model,e2e_fold_6_2_oqtz84 model,,single_select,\"{\"\"facts\"\": {\"\"e2e_fold_6_2_oqtz84_year\"\": {\"\"min\"\": 1968}}, \"\"value\"\": \"\"e2e_fold_6_2_oqtz84_md1\"\", \"\"active\"\": true, \"\"parent\"\": \"\"e2e_fold_6_2_oqtz84_mk1\"\", \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_md1 ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_md1 label\"\"}|{\"\"facts\"\": {\"\"e2e_fold_6_2_oqtz84_year\"\": 1999}, \"\"value\"\": \"\"e2e_fold_6_2_oqtz84_md2\"\", \"\"active\"\": true, \"\"parent\"\": \"\"e2e_fold_6_2_oqtz84_mk1\"\", \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_md2 ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_md2 label\"\"}|{\"\"value\"\": \"\"e2e_fold_6_2_oqtz84_md3\"\", \"\"active\"\": true, \"\"parent\"\": \"\"e2e_fold_6_2_oqtz84_mk2\"\", \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_md3 ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_md3 label\"\"}\",,,,,,,,,,,,1
- e2e_fold_6_2_oqtz84_unit,e2e_fold_6_2_oqtz84 unit,,single_select,\"{\"\"value\"\": \"\"e2e_fold_6_2_oqtz84_pc\"\", \"\"active\"\": true, \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_pc ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_pc label\"\"}|{\"\"value\"\": \"\"e2e_fold_6_2_oqtz84_set\"\", \"\"active\"\": true, \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_set ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_set label\"\"}|{\"\"value\"\": \"\"e2e_fold_6_2_oqtz84_jug\"\", \"\"active\"\": true, \"\"label_am\"\": \"\"e2e_fold_6_2_oqtz84_jug ምልክት\"\", \"\"label_en\"\": \"\"e2e_fold_6_2_oqtz84_jug label\"\"}\",,,,,,,,,,,,1
- e2e_fold_6_2_oqtz84_year,e2e_fold_6_2_oqtz84 year,,number,,,,1900,2030,0,,,,,,,1
  e2e_post_local_5_2vlt1k_bool,e2e_post_local_5_2vlt1k bool,,boolean,,,,,,,,,,,,,1
  e2e_post_local_5_2vlt1k_number,e2e_post_local_5_2vlt1k number,,number,,,kg,1,9,0,,,,,,,1
  e2e_post_local_5_2vlt1k_select,e2e_post_local_5_2vlt1k select,,single_select,\"{\"\"value\"\": \"\"e2e_post_local_5_2vlt1k_a\"\", \"\"active\"\": true, \"\"label_en\"\": \"\"e2e_post_local_5_2vlt1k_a label\"\"}|{\"\"value\"\": \"\"e2e_post_local_5_2vlt1k_b\"\", \"\"active\"\": true, \"\"label_en\"\": \"\"e2e_post_local_5_2vlt1k_b label\"\"}\",,,,,,,,,,,,1
  e2e_post_local_5_2vlt1k_text,e2e_post_local_5_2vlt1k text,,text,,,,,,,,,40,,,,1
  engine_cc,Engine Size,,single_select,\"{\"\"value\"\": \"\"under250\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Under 250cc\"\"}|{\"\"value\"\": \"\"250-500\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"250-500cc\"\"}|{\"\"value\"\": \"\"500-750\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"500-750cc\"\"}|{\"\"value\"\": \"\"750-1000\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"750-1000cc\"\"}|{\"\"value\"\": \"\"over1000\"\", \"\"label_am\"\": null, \"\"label_en\"\": \"\"Over 1000cc\"\"}\",,,,,,,,,,,,1
```

Context:

```text
          - listitem [ref=e270]:
            - generic [ref=e271]: About
          - listitem [ref=e272]:
            - generic [ref=e273]: How it works
      - navigation "Help" [ref=e274]:
        - heading "Help" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Safety
          - listitem [ref=e279]:
            - generic [ref=e280]: Contact
      - navigation "Legal" [ref=e281]:
        - heading "Legal" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Terms
          - listitem [ref=e286]:
            - generic [ref=e287]: Privacy
    - paragraph [ref=e289]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

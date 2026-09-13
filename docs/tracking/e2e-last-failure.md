# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34755439513
- Commit: `ef8ca4e28fe37b468f5b102f5db9b9ea5e4573c0`
- Attempt: 1
- Written (UTC): 2026-09-13T11:59:02.363Z
- Passed: 577 · Skipped: 68 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 3, shard 6
- Sources without results: none

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 41 user(s) owned by process 34755439513-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 39 user(s) owned by process 34755439513-6
```

## import-security.spec.ts › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: IG-2 (j) [{"file":"definitions","row":2,"key":"e2e_attr_n73wrf","reason":"optionShape","detail":"a|allowedNotObject","values":{"category_path":"e2e-cat-8ie12q","category_slug":"e2e-cat-8ie12q","attribute_key":"e2e_attr_0gp13p","is_required":"false","is_filterable":"false","card_rank":"","origin":"e2e-cat-8ie12q","detail":"a|allowedNotObject"}},{"file":"definitions","row":3,"key":"e2e_attr_8duuah","reason":"optionShape","detail":"a|allowedValuesNotArray:e2e_attr_rwol0l","values":{"category_path":"e2e-cat-ttrlc7","category_slug":"e2e-cat-ttrlc7","attribute_key":"e2e_attr_0gp13p","is_required":"false","is_filterable":"false","card_rank":"","origin":"e2e-cat-ttrlc7","detail":"a|allowedValuesNotArray:e2e_attr_rwol0l"}},{"key":"e2e_attr_e0l5d8","row":4,"file":"definitions","detail":"e2e_attr_e0l5d8|a|allowedTooMany","reason":"badOption","values":{"attribute_key":"e2e_attr_e0l5d8","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_rwol0l\":[\"x\"],\"t2\":[\"x\"],\"t3\":[\"x\"],\"t4\":[\"x\"],\"t5\":[\"x\"],\"t6\":[\"x\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_e0l5d8|a|allowedTooMany"}},{"key":"e2e_attr_m7n8ma","row":5,"file":"definitions","detail":"e2e_attr_m7n8ma|a|allowedEmpty:e2e_attr_rwol0l","reason":"badOption","values":{"attribute_key":"e2e_attr_m7n8ma","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_rwol0l\":[]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_m7n8ma|a|allowedEmpty:e2e_attr_rwol0l"}},{"key":"e2e_attr_47vqdu","row":6,"file":"definitions","detail":"e2e_attr_47vqdu|a|allowedDuplicate:e2e_attr_rwol0l","reason":"badOption","values":{"attribute_key":"e2e_attr_47vqdu","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_rwol0l\":[\"x\",\"x\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_47vqdu|a|allowedDuplicate:e2e_attr_rwol0l"}},{"key":"e2e_attr_loj4ce","row":7,"file":"definitions","value":"","detail":"e2e_attr_loj4ce|a|e2e_attr_pnyjhf","option":"a","reason":"allowedTargetNotSelect","target":"e2e_attr_pnyjhf","values":{"attribute_key":"e2e_attr_loj4ce","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_pnyjhf\":[\"1\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_loj4ce|a|e2e_attr_pnyjhf"}},{"key":"e2e_attr_bwttux","row":8,"file":"definitions","value":"","detail":"e2e_attr_bwttux|a|e2e_attr_bwttux","option":"a","reason":"allowedTargetCircular","target":"e2e_attr_bwttux","values":{"attribute_key":"e2e_attr_bwttux","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_bwttux\":[\"b\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_bwttux|a|e2e_attr_bwttux"}},{"key":"e2e_attr_5ujmbh","row":9,"file":"definitions","value":"","detail":"e2e_attr_5ujmbh|a|e2e_attr_rwol0l","option":"a","reason":"allowedTargetCircular","target":"e2e_attr_rwol0l","values":{"attribute_key":"e2e_attr_5ujmbh","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_rwol0l\":[\"x\"]}},{\"value\":\"b\"}]","depends_on":"e2e_attr_rwol0l","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_5ujmbh|a|e2e_attr_rwol0l"}},{"key":"e2e_attr_pkdxe7","row":10,"file":"definitions","value":"q","detail":"e2e_attr_pkdxe7|a|e2e_attr_rwol0l|q","option":"a","reason":"allowedUnknownValue","target":"e2e_attr_rwol0l","values":{"attribute_key":"e2e_attr_pkdxe7","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_rwol0l\":[\"q\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_pkdxe7|a|e2e_attr_rwol0l|q"}}]

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e787]:
            - generic [ref=e788]: About
          - listitem [ref=e789]:
            - generic [ref=e790]: How it works
      - navigation "Help" [ref=e791]:
        - heading "Help" [level=2] [ref=e792]
        - list [ref=e793]:
          - listitem [ref=e794]:
            - generic [ref=e795]: Safety
          - listitem [ref=e796]:
            - generic [ref=e797]: Contact
      - navigation "Legal" [ref=e798]:
        - heading "Legal" [level=2] [ref=e799]
        - list [ref=e800]:
          - listitem [ref=e801]:
            - generic [ref=e802]: Terms
          - listitem [ref=e803]:
            - generic [ref=e804]: Privacy
    - paragraph [ref=e806]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: IG-2 (j) [{"file":"definitions","row":2,"key":"e2e_attr_6t9tf7","reason":"optionShape","detail":"a|allowedNotObject","values":{"category_path":"e2e-cat-o4p9iz","category_slug":"e2e-cat-o4p9iz","attribute_key":"e2e_attr_u7bja6","is_required":"false","is_filterable":"false","card_rank":"","origin":"e2e-cat-o4p9iz","detail":"a|allowedNotObject"}},{"file":"definitions","row":3,"key":"e2e_attr_lvp0c0","reason":"optionShape","detail":"a|allowedValuesNotArray:e2e_attr_lk93az","values":{"category_path":"e2e-cat-3ubrvj","category_slug":"e2e-cat-3ubrvj","attribute_key":"e2e_attr_u7bja6","is_required":"false","is_filterable":"false","card_rank":"","origin":"e2e-cat-3ubrvj","detail":"a|allowedValuesNotArray:e2e_attr_lk93az"}},{"key":"e2e_attr_8v28ew","row":4,"file":"definitions","detail":"e2e_attr_8v28ew|a|allowedTooMany","reason":"badOption","values":{"attribute_key":"e2e_attr_8v28ew","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_lk93az\":[\"x\"],\"t2\":[\"x\"],\"t3\":[\"x\"],\"t4\":[\"x\"],\"t5\":[\"x\"],\"t6\":[\"x\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_8v28ew|a|allowedTooMany"}},{"key":"e2e_attr_kymume","row":5,"file":"definitions","detail":"e2e_attr_kymume|a|allowedEmpty:e2e_attr_lk93az","reason":"badOption","values":{"attribute_key":"e2e_attr_kymume","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_lk93az\":[]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_kymume|a|allowedEmpty:e2e_attr_lk93az"}},{"key":"e2e_attr_hod9ys","row":6,"file":"definitions","detail":"e2e_attr_hod9ys|a|allowedDuplicate:e2e_attr_lk93az","reason":"badOption","values":{"attribute_key":"e2e_attr_hod9ys","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_lk93az\":[\"x\",\"x\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_hod9ys|a|allowedDuplicate:e2e_attr_lk93az"}},{"key":"e2e_attr_uw9ho0","row":7,"file":"definitions","value":"","detail":"e2e_attr_uw9ho0|a|e2e_attr_ojbg2s","option":"a","reason":"allowedTargetNotSelect","target":"e2e_attr_ojbg2s","values":{"attribute_key":"e2e_attr_uw9ho0","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_ojbg2s\":[\"1\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_uw9ho0|a|e2e_attr_ojbg2s"}},{"key":"e2e_attr_n64wso","row":8,"file":"definitions","value":"","detail":"e2e_attr_n64wso|a|e2e_attr_n64wso","option":"a","reason":"allowedTargetCircular","target":"e2e_attr_n64wso","values":{"attribute_key":"e2e_attr_n64wso","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_n64wso\":[\"b\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_n64wso|a|e2e_attr_n64wso"}},{"key":"e2e_attr_wd10c7","row":9,"file":"definitions","value":"","detail":"e2e_attr_wd10c7|a|e2e_attr_lk93az","option":"a","reason":"allowedTargetCircular","target":"e2e_attr_lk93az","values":{"attribute_key":"e2e_attr_wd10c7","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_lk93az\":[\"x\"]}},{\"value\":\"b\"}]","depends_on":"e2e_attr_lk93az","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_wd10c7|a|e2e_attr_lk93az"}},{"key":"e2e_attr_kggyri","row":10,"file":"definitions","value":"q","detail":"e2e_attr_kggyri|a|e2e_attr_lk93az|q","option":"a","reason":"allowedUnknownValue","target":"e2e_attr_lk93az","values":{"attribute_key":"e2e_attr_kggyri","label_en":"Hostile probe","label_am":"","type":"single_select","options":"[{\"value\":\"a\",\"allowed\":{\"e2e_attr_lk93az\":[\"q\"]}},{\"value\":\"b\"}]","depends_on":"","unit":"","min":"","max":"","decimals":"","format":"","preset":"","max_length":"","help_text_en":"","help_text_am":"","is_per_variant":"","direct_link_count":"0","detail":"e2e_attr_kggyri|a|e2e_attr_lk93az|q"}}]

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e1172]:
            - generic [ref=e1173]: About
          - listitem [ref=e1174]:
            - generic [ref=e1175]: How it works
      - navigation "Help" [ref=e1176]:
        - heading "Help" [level=2] [ref=e1177]
        - list [ref=e1178]:
          - listitem [ref=e1179]:
            - generic [ref=e1180]: Safety
          - listitem [ref=e1181]:
            - generic [ref=e1182]: Contact
      - navigation "Legal" [ref=e1183]:
        - heading "Legal" [level=2] [ref=e1184]
        - list [ref=e1185]:
          - listitem [ref=e1186]:
            - generic [ref=e1187]: Terms
          - listitem [ref=e1188]:
            - generic [ref=e1189]: Privacy
    - paragraph [ref=e1191]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

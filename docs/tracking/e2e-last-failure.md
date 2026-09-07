# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34085834188
- Commit: `48164709ddb6c1f58b82949e4b1ed9574120dbe7`
- Attempt: 2
- Written (UTC): 2026-09-07T05:24:08.238Z
- Passed: 474 · Skipped: 67 · Failed: 12
- Gating failures: 12 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-attributes.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_m711cw-card')
Expected substring: "ኢ2ኢ 7bsos3"
Received string:    "e2e_attr_m711cwe2e_attr_m711cwጽሑፍእስካሁን በየትኛውም ምድብ አልተጠቀመም።—"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_m711cw-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="attribute-row-e2e_attr_m711cw-card">…</div>
       - unexpected value "e2e_attr_m711cwe2e_attr_m711cwጽሑፍእስካሁን በየትኛውም ምድብ አልተጠቀመም።—"

```

Context:

```text
          - listitem [ref=e125]:
            - generic [ref=e126]: About
          - listitem [ref=e127]:
            - generic [ref=e128]: How it works
      - navigation "Help" [ref=e129]:
        - heading "Help" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Safety
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Terms
          - listitem [ref=e141]:
            - generic [ref=e142]: Privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByTestId('entity-status-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label')
Expected: visible
Error: strict mode violation: getByTestId('entity-status-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label') resolved to 2 elements:
    1) <div data-testid="entity-status-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label-card').getByTestId('entity-status-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label')
    2) <div data-testid="entity-status-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label').getByTestId('entity-status-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label')

Call log:
  - [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none with timeout 20000ms
  - waiting for getByTestId('entity-status-attribute-0d249eec-a2e2-47a3-8642-8cd095332008-label')

```

Context:

```text
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: How it works
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
          - listitem [ref=e145]:
            - generic [ref=e146]: Contact
      - navigation "Legal" [ref=e147]:
        - heading "Legal" [level=2] [ref=e148]
        - list [ref=e149]:
          - listitem [ref=e150]:
            - generic [ref=e151]: Terms
          - listitem [ref=e152]:
            - generic [ref=e153]: Privacy
    - paragraph [ref=e155]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e781]:
            - generic [ref=e782]: About
          - listitem [ref=e783]:
            - generic [ref=e784]: How it works
      - navigation "Help" [ref=e785]:
        - heading "Help" [level=2] [ref=e786]
        - list [ref=e787]:
          - listitem [ref=e788]:
            - generic [ref=e789]: Safety
          - listitem [ref=e790]:
            - generic [ref=e791]: Contact
      - navigation "Legal" [ref=e792]:
        - heading "Legal" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Terms
          - listitem [ref=e797]:
            - generic [ref=e798]: Privacy
    - paragraph [ref=e800]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('table').getByTestId('attribute-row-e2e_attr_rvynq2')
Expected substring: "ኢ2ኢ 44u84f"
Received string:    "e2e_attr_rvynq2e2e_attr_rvynq2ጽሑፍ—እስካሁን በየትኛውም ምድብ አልተጠቀመም።—"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('attribute-row-e2e_attr_rvynq2')
    14 × locator resolved to <tr data-testid="attribute-row-e2e_attr_rvynq2" class="border-b border-border last:border-0">…</tr>
       - unexpected value "e2e_attr_rvynq2e2e_attr_rvynq2ጽሑፍ—እስካሁን በየትኛውም ምድብ አልተጠቀመም።—"

```

Context:

```text
          - listitem [ref=e239]:
            - generic [ref=e240]: About
          - listitem [ref=e241]:
            - generic [ref=e242]: How it works
      - navigation "Help" [ref=e243]:
        - heading "Help" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Safety
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Legal" [ref=e250]:
        - heading "Legal" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Terms
          - listitem [ref=e255]:
            - generic [ref=e256]: Privacy
    - paragraph [ref=e258]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByTestId('entity-status-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label')
Expected: visible
Error: strict mode violation: getByTestId('entity-status-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label') resolved to 2 elements:
    1) <div data-testid="entity-status-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label-card').getByTestId('entity-status-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label')
    2) <div data-testid="entity-status-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label').getByTestId('entity-status-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label')

Call log:
  - [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none with timeout 20000ms
  - waiting for getByTestId('entity-status-attribute-1b34df7b-d041-4544-a75a-8783baf6e152-label')

```

Context:

```text
          - listitem [ref=e252]:
            - generic [ref=e253]: About
          - listitem [ref=e254]:
            - generic [ref=e255]: How it works
      - navigation "Help" [ref=e256]:
        - heading "Help" [level=2] [ref=e257]
        - list [ref=e258]:
          - listitem [ref=e259]:
            - generic [ref=e260]: Safety
          - listitem [ref=e261]:
            - generic [ref=e262]: Contact
      - navigation "Legal" [ref=e263]:
        - heading "Legal" [level=2] [ref=e264]
        - list [ref=e265]:
          - listitem [ref=e266]:
            - generic [ref=e267]: Terms
          - listitem [ref=e268]:
            - generic [ref=e269]: Privacy
    - paragraph [ref=e271]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e1162]:
            - generic [ref=e1163]: About
          - listitem [ref=e1164]:
            - generic [ref=e1165]: How it works
      - navigation "Help" [ref=e1166]:
        - heading "Help" [level=2] [ref=e1167]
        - list [ref=e1168]:
          - listitem [ref=e1169]:
            - generic [ref=e1170]: Safety
          - listitem [ref=e1171]:
            - generic [ref=e1172]: Contact
      - navigation "Legal" [ref=e1173]:
        - heading "Legal" [level=2] [ref=e1174]
        - list [ref=e1175]:
          - listitem [ref=e1176]:
            - generic [ref=e1177]: Terms
          - listitem [ref=e1178]:
            - generic [ref=e1179]: Privacy
    - paragraph [ref=e1181]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_c4b1f7-card')
Expected substring: "ኢ2ኢ ifem1j"
Received string:    "e2e_attr_c4b1f7e2e_attr_c4b1f7ጽሑፍእስካሁን በየትኛውም ምድብ አልተጠቀመም።—"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_c4b1f7-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="attribute-row-e2e_attr_c4b1f7-card">…</div>
       - unexpected value "e2e_attr_c4b1f7e2e_attr_c4b1f7ጽሑፍእስካሁን በየትኛውም ምድብ አልተጠቀመም።—"

```

Context:

```text
          - listitem [ref=e125]:
            - generic [ref=e126]: About
          - listitem [ref=e127]:
            - generic [ref=e128]: How it works
      - navigation "Help" [ref=e129]:
        - heading "Help" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Safety
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Terms
          - listitem [ref=e141]:
            - generic [ref=e142]: Privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending

- Source: `changed`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByTestId('entity-status-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label')
Expected: visible
Error: strict mode violation: getByTestId('entity-status-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label') resolved to 2 elements:
    1) <div data-testid="entity-status-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label-card').getByTestId('entity-status-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label')
    2) <div data-testid="entity-status-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label').getByTestId('entity-status-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label')

Call log:
  - [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none with timeout 20000ms
  - waiting for getByTestId('entity-status-attribute-4bda92a8-eb0c-4db1-9911-b0546e6cf58f-label')

```

Context:

```text
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: How it works
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
          - listitem [ref=e145]:
            - generic [ref=e146]: Contact
      - navigation "Legal" [ref=e147]:
        - heading "Legal" [level=2] [ref=e148]
        - list [ref=e149]:
          - listitem [ref=e150]:
            - generic [ref=e151]: Terms
          - listitem [ref=e152]:
            - generic [ref=e153]: Privacy
    - paragraph [ref=e155]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('table').getByTestId('attribute-row-e2e_attr_6zlnxz')
Expected substring: "ኢ2ኢ vbailz"
Received string:    "e2e_attr_6zlnxze2e_attr_6zlnxzጽሑፍ—እስካሁን በየትኛውም ምድብ አልተጠቀመም።—"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('attribute-row-e2e_attr_6zlnxz')
    14 × locator resolved to <tr data-testid="attribute-row-e2e_attr_6zlnxz" class="border-b border-border last:border-0">…</tr>
       - unexpected value "e2e_attr_6zlnxze2e_attr_6zlnxzጽሑፍ—እስካሁን በየትኛውም ምድብ አልተጠቀመም።—"

```

Context:

```text
          - listitem [ref=e239]:
            - generic [ref=e240]: About
          - listitem [ref=e241]:
            - generic [ref=e242]: How it works
      - navigation "Help" [ref=e243]:
        - heading "Help" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Safety
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Legal" [ref=e250]:
        - heading "Legal" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Terms
          - listitem [ref=e255]:
            - generic [ref=e256]: Privacy
    - paragraph [ref=e258]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByTestId('entity-status-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label')
Expected: visible
Error: strict mode violation: getByTestId('entity-status-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label') resolved to 2 elements:
    1) <div data-testid="entity-status-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label-card').getByTestId('entity-status-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label')
    2) <div data-testid="entity-status-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Untranslated</div> aka getByTestId('entity-row-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label').getByTestId('entity-status-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label')

Call log:
  - [dialog-dump AT-13 the attribute never reached the Data roster] open dialogs: none with timeout 20000ms
  - waiting for getByTestId('entity-status-attribute-5861c19f-045e-49c3-b1a4-38f51c72fc07-label')

```

Context:

```text
          - listitem [ref=e252]:
            - generic [ref=e253]: About
          - listitem [ref=e254]:
            - generic [ref=e255]: How it works
      - navigation "Help" [ref=e256]:
        - heading "Help" [level=2] [ref=e257]
        - list [ref=e258]:
          - listitem [ref=e259]:
            - generic [ref=e260]: Safety
          - listitem [ref=e261]:
            - generic [ref=e262]: Contact
      - navigation "Legal" [ref=e263]:
        - heading "Legal" [level=2] [ref=e264]
        - list [ref=e265]:
          - listitem [ref=e266]:
            - generic [ref=e267]: Terms
          - listitem [ref=e268]:
            - generic [ref=e269]: Privacy
    - paragraph [ref=e271]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e781]:
            - generic [ref=e782]: About
          - listitem [ref=e783]:
            - generic [ref=e784]: How it works
      - navigation "Help" [ref=e785]:
        - heading "Help" [level=2] [ref=e786]
        - list [ref=e787]:
          - listitem [ref=e788]:
            - generic [ref=e789]: Safety
          - listitem [ref=e790]:
            - generic [ref=e791]: Contact
      - navigation "Legal" [ref=e792]:
        - heading "Legal" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Terms
          - listitem [ref=e797]:
            - generic [ref=e798]: Privacy
    - paragraph [ref=e800]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e1162]:
            - generic [ref=e1163]: About
          - listitem [ref=e1164]:
            - generic [ref=e1165]: How it works
      - navigation "Help" [ref=e1166]:
        - heading "Help" [level=2] [ref=e1167]
        - list [ref=e1168]:
          - listitem [ref=e1169]:
            - generic [ref=e1170]: Safety
          - listitem [ref=e1171]:
            - generic [ref=e1172]: Contact
      - navigation "Legal" [ref=e1173]:
        - heading "Legal" [level=2] [ref=e1174]
        - list [ref=e1175]:
          - listitem [ref=e1176]:
            - generic [ref=e1177]: Terms
          - listitem [ref=e1178]:
            - generic [ref=e1179]: Privacy
    - paragraph [ref=e1181]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

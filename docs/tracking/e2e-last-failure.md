# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34012398325
- Commit: `6a712d5e34fc6caeef218c0a53ad4ba99a28bcde`
- Attempt: 1
- Written (UTC): 2026-09-06T05:04:36.106Z
- Passed: 429 · Skipped: 76 · Failed: 19
- Gating failures: 19 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › U1f step-up authentication › MF-5 unenroll requires a fresh verification — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer — Error: expect(locator).toBeVisible() failed

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "select"
Received: undefined

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: locator.click: Error: strict mode violation: getByTestId('attribute-delete-e2e_attr_pel98e') resolved to 2 elements:
    1) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_pel98e" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_pel98e-actions').getByTestId('attribute-delete-e2e_attr_pel98e')
    2) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_pel98e" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_pel98e-actions-cell').getByTestId('attribute-delete-e2e_attr_pel98e')

Call log:
  - waiting for getByTestId('attribute-delete-e2e_attr_pel98e')

```

Context:

```text
          - listitem [ref=e122]:
            - generic [ref=e123]: About
          - listitem [ref=e124]:
            - generic [ref=e125]: How it works
      - navigation "Help" [ref=e126]:
        - heading "Help" [level=2] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - generic [ref=e130]: Safety
          - listitem [ref=e131]:
            - generic [ref=e132]: Contact
      - navigation "Legal" [ref=e133]:
        - heading "Legal" [level=2] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: Terms
          - listitem [ref=e138]:
            - generic [ref=e139]: Privacy
    - paragraph [ref=e141]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

Context:

```text
          - listitem [ref=e89]:
            - generic [ref=e90]: About
          - listitem [ref=e91]:
            - generic [ref=e92]: How it works
      - navigation "Help" [ref=e93]:
        - heading "Help" [level=2] [ref=e94]
        - list [ref=e95]:
          - listitem [ref=e96]:
            - generic [ref=e97]: Safety
          - listitem [ref=e98]:
            - generic [ref=e99]: Contact
      - navigation "Legal" [ref=e100]:
        - heading "Legal" [level=2] [ref=e101]
        - list [ref=e102]:
          - listitem [ref=e103]:
            - generic [ref=e104]: Terms
          - listitem [ref=e105]:
            - generic [ref=e106]: Privacy
    - paragraph [ref=e108]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - option "Babies & Kids › Strollers, Car Seats & Gear"
          - option "Commercial Equipment"
          - option "Commercial Equipment › Office & Shop Equipment"
          - option "Commercial Equipment › Restaurant & Café Equipment"
          - option "Commercial Equipment › Medical Equipment"
          - option "Commercial Equipment › Tools & Site Machinery"
          - option "Commercial Equipment › Industrial Machinery"
          - option "e2e-cat-nightly-4-wjfdxw"
          - option "e2e-cat-nightly-4-jekezz"
          - option "e2e-cat-nightly-4-owwk7e"
          - option "e2e-cat-4-3-w8aphf"
          - option "e2e-cat-1-4-ylfb1j"
          - option "e2e-cat-4-6-fbh38s"
      - generic [ref=e18]:
        - button "Cancel" [ref=e19] [cursor=pointer]
        - button "Add path" [ref=e20] [cursor=pointer]
    - button "Close" [ref=e21] [cursor=pointer]:
      - img [ref=e22]
      - generic [ref=e25]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-parent-primary-auto-services')
Expected: visible
Error: strict mode violation: getByTestId('category-parent-primary-auto-services') resolved to 2 elements:
    1) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services-card').getByTestId('category-parent-primary-auto-services')
    2) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services').getByTestId('category-parent-primary-auto-services')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('category-parent-primary-auto-services')

```

Context:

```text
          - listitem [ref=e135]:
            - generic [ref=e136]: About
          - listitem [ref=e137]:
            - generic [ref=e138]: How it works
      - navigation "Help" [ref=e139]:
        - heading "Help" [level=2] [ref=e140]
        - list [ref=e141]:
          - listitem [ref=e142]:
            - generic [ref=e143]: Safety
          - listitem [ref=e144]:
            - generic [ref=e145]: Contact
      - navigation "Legal" [ref=e146]:
        - heading "Legal" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Terms
          - listitem [ref=e151]:
            - generic [ref=e152]: Privacy
    - paragraph [ref=e154]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-1 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('admin-section-link-attributes')
Expected substring: "The shared attribute library: definitions, their categories, and what a listing card shows."
Received string:    "AttributesAttribute management arrives in U6."
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('admin-section-link-attributes')
    14 × locator resolved to <a href="/admin/attributes" data-testid="admin-section-link-attributes" class="flex min-h-16 flex-col justify-center rounded-lg border border-border bg-card p-4 text-start transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</a>
       - unexpected value "AttributesAttribute management arrives in U6."

```

Context:

```text
          - listitem [ref=e117]:
            - generic [ref=e118]: About
          - listitem [ref=e119]:
            - generic [ref=e120]: How it works
      - navigation "Help" [ref=e121]:
        - heading "Help" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Safety
          - listitem [ref=e126]:
            - generic [ref=e127]: Contact
      - navigation "Legal" [ref=e128]:
        - heading "Legal" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Terms
          - listitem [ref=e133]:
            - generic [ref=e134]: Privacy
    - paragraph [ref=e136]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "select"
Received: undefined

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-desktop-1280`

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('attribute-delete-e2e_attr_7f1wqb') resolved to 2 elements:
    1) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_7f1wqb" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_7f1wqb-actions').getByTestId('attribute-delete-e2e_attr_7f1wqb')
    2) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_7f1wqb" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_7f1wqb-actions-cell').getByTestId('attribute-delete-e2e_attr_7f1wqb')

Call log:
  - waiting for getByTestId('attribute-delete-e2e_attr_7f1wqb')

```

Context:

```text
          - listitem [ref=e224]:
            - generic [ref=e225]: About
          - listitem [ref=e226]:
            - generic [ref=e227]: How it works
      - navigation "Help" [ref=e228]:
        - heading "Help" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - generic [ref=e232]: Safety
          - listitem [ref=e233]:
            - generic [ref=e234]: Contact
      - navigation "Legal" [ref=e235]:
        - heading "Legal" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Terms
          - listitem [ref=e240]:
            - generic [ref=e241]: Privacy
    - paragraph [ref=e243]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e189]:
            - generic [ref=e190]: About
          - listitem [ref=e191]:
            - generic [ref=e192]: How it works
      - navigation "Help" [ref=e193]:
        - heading "Help" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - generic [ref=e197]: Safety
          - listitem [ref=e198]:
            - generic [ref=e199]: Contact
      - navigation "Legal" [ref=e200]:
        - heading "Legal" [level=2] [ref=e201]
        - list [ref=e202]:
          - listitem [ref=e203]:
            - generic [ref=e204]: Terms
          - listitem [ref=e205]:
            - generic [ref=e206]: Privacy
    - paragraph [ref=e208]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-parent-primary-auto-services')
Expected: visible
Error: strict mode violation: getByTestId('category-parent-primary-auto-services') resolved to 2 elements:
    1) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services-card').getByTestId('category-parent-primary-auto-services')
    2) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services').getByTestId('category-parent-primary-auto-services')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('category-parent-primary-auto-services')

```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-9a-roster-shape-the-parent-column-and-a-25-row-page-table-twin-desktop-1280`

## admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e40]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-1 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('admin-section-link-attributes')
Expected substring: "The shared attribute library: definitions, their categories, and what a listing card shows."
Received string:    "AttributesAttribute management arrives in U6."
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('admin-section-link-attributes')
    14 × locator resolved to <a href="/admin/attributes" data-testid="admin-section-link-attributes" class="flex min-h-16 flex-col justify-center rounded-lg border border-border bg-card p-4 text-start transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</a>
       - unexpected value "AttributesAttribute management arrives in U6."

```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "select"
Received: undefined

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `changed`
- Project: `mobile-360`

```text
Error: locator.click: Error: strict mode violation: getByTestId('attribute-delete-e2e_attr_63vxvl') resolved to 2 elements:
    1) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_63vxvl" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_63vxvl-actions').getByTestId('attribute-delete-e2e_attr_63vxvl')
    2) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_63vxvl" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_63vxvl-actions-cell').getByTestId('attribute-delete-e2e_attr_63vxvl')

Call log:
  - waiting for getByTestId('attribute-delete-e2e_attr_63vxvl')

```

Context:

```text
          - listitem [ref=e122]:
            - generic [ref=e123]: About
          - listitem [ref=e124]:
            - generic [ref=e125]: How it works
      - navigation "Help" [ref=e126]:
        - heading "Help" [level=2] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - generic [ref=e130]: Safety
          - listitem [ref=e131]:
            - generic [ref=e132]: Contact
      - navigation "Legal" [ref=e133]:
        - heading "Legal" [level=2] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: Terms
          - listitem [ref=e138]:
            - generic [ref=e139]: Privacy
    - paragraph [ref=e141]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - generic [ref=e625]:
            - checkbox "Size (womens_size) · 1" [ref=e626] [cursor=pointer]
            - generic [ref=e627]: Size (womens_size) · 1
          - generic [ref=e628]:
            - checkbox "Year (year) · 1" [ref=e629] [cursor=pointer]
            - generic [ref=e630]: Year (year) · 1
          - generic [ref=e631]:
            - checkbox "Year Built (year_built) · 1" [ref=e632] [cursor=pointer]
            - generic [ref=e633]: Year Built (year_built) · 1
          - generic [ref=e634]:
            - checkbox "Zoning / Land Use (zoning) · 1" [ref=e635] [cursor=pointer]
            - generic [ref=e636]: Zoning / Land Use (zoning) · 1
      - status [ref=e637]: 1 links move to e2e_attr_keep_vxaw2y; 1 definitions removed.
      - generic [ref=e638]:
        - button "Cancel" [ref=e639] [cursor=pointer]
        - button "Merge" [active] [ref=e640] [cursor=pointer]
    - button "Close" [ref=e641] [cursor=pointer]:
      - img [ref=e642]
      - generic [ref=e645]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "select"
Received: undefined

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-desktop-1280`

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `changed`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('attribute-delete-e2e_attr_gsa4jg') resolved to 2 elements:
    1) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_gsa4jg" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_gsa4jg-actions').getByTestId('attribute-delete-e2e_attr_gsa4jg')
    2) <button type="button" title="Delete" data-testid="attribute-delete-e2e_attr_gsa4jg" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h…>…</button> aka getByTestId('attribute-row-e2e_attr_gsa4jg-actions-cell').getByTestId('attribute-delete-e2e_attr_gsa4jg')

Call log:
  - waiting for getByTestId('attribute-delete-e2e_attr_gsa4jg')

```

Context:

```text
          - listitem [ref=e224]:
            - generic [ref=e225]: About
          - listitem [ref=e226]:
            - generic [ref=e227]: How it works
      - navigation "Help" [ref=e228]:
        - heading "Help" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - generic [ref=e232]: Safety
          - listitem [ref=e233]:
            - generic [ref=e234]: Contact
      - navigation "Legal" [ref=e235]:
        - heading "Legal" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Terms
          - listitem [ref=e240]:
            - generic [ref=e241]: Privacy
    - paragraph [ref=e243]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-parent-primary-auto-services')
Expected: visible
Error: strict mode violation: getByTestId('category-parent-primary-auto-services') resolved to 2 elements:
    1) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services-card').getByTestId('category-parent-primary-auto-services')
    2) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services').getByTestId('category-parent-primary-auto-services')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('category-parent-primary-auto-services')

```

Context:

```text
          - listitem [ref=e135]:
            - generic [ref=e136]: About
          - listitem [ref=e137]:
            - generic [ref=e138]: How it works
      - navigation "Help" [ref=e139]:
        - heading "Help" [level=2] [ref=e140]
        - list [ref=e141]:
          - listitem [ref=e142]:
            - generic [ref=e143]: Safety
          - listitem [ref=e144]:
            - generic [ref=e145]: Contact
      - navigation "Legal" [ref=e146]:
        - heading "Legal" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Terms
          - listitem [ref=e151]:
            - generic [ref=e152]: Privacy
    - paragraph [ref=e154]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-parent-primary-auto-services')
Expected: visible
Error: strict mode violation: getByTestId('category-parent-primary-auto-services') resolved to 2 elements:
    1) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services-card').getByTestId('category-parent-primary-auto-services')
    2) <div data-testid="category-parent-primary-auto-services" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Primary</div> aka getByTestId('category-row-auto-services').getByTestId('category-parent-primary-auto-services')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('category-parent-primary-auto-services')

```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-9a-roster-shape-the-parent-column-and-a-25-row-page-table-twin-desktop-1280`

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/i18n canceling statement due to statement timeout ×2
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_list_categories ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:15969:21) ×3
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
```

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
```

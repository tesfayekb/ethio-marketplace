# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33560575803
- Commit: `c49534ac92c95973ac0449db46d8d5e9c5c039d8`
- Attempt: 1
- Written (UTC): 2026-09-01T21:33:36.814Z
- Passed: 306 · Skipped: 67 · Failed: 27
- Gating failures: 27 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit — Error: expect(locator).toHaveText(expected) failed

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

```

Context:

```text
            - listitem [ref=e172]:
              - generic [ref=e173]: About
            - listitem [ref=e174]:
              - generic [ref=e175]: How it works
        - navigation "Help" [ref=e176]:
          - heading "Help" [level=2] [ref=e177]
          - list [ref=e178]:
            - listitem [ref=e179]:
              - generic [ref=e180]: Safety
            - listitem [ref=e181]:
              - generic [ref=e182]: Contact
        - navigation "Legal" [ref=e183]:
          - heading "Legal" [level=2] [ref=e184]
          - list [ref=e185]:
            - listitem [ref=e186]:
              - generic [ref=e187]: Terms
            - listitem [ref=e188]:
              - generic [ref=e189]: Privacy
      - paragraph [ref=e191]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

```

Context:

```text
            - listitem [ref=e172]:
              - generic [ref=e173]: About
            - listitem [ref=e174]:
              - generic [ref=e175]: How it works
        - navigation "Help" [ref=e176]:
          - heading "Help" [level=2] [ref=e177]
          - list [ref=e178]:
            - listitem [ref=e179]:
              - generic [ref=e180]: Safety
            - listitem [ref=e181]:
              - generic [ref=e182]: Contact
        - navigation "Legal" [ref=e183]:
          - heading "Legal" [level=2] [ref=e184]
          - list [ref=e185]:
            - listitem [ref=e186]:
              - generic [ref=e187]: Terms
            - listitem [ref=e188]:
              - generic [ref=e189]: Privacy
      - paragraph [ref=e191]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"

```

Context:

```text
          - listitem [ref=e379]:
            - generic [ref=e380]: About
          - listitem [ref=e381]:
            - generic [ref=e382]: How it works
      - navigation "Help" [ref=e383]:
        - heading "Help" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - generic [ref=e387]: Safety
          - listitem [ref=e388]:
            - generic [ref=e389]: Contact
      - navigation "Legal" [ref=e390]:
        - heading "Legal" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Terms
          - listitem [ref=e395]:
            - generic [ref=e396]: Privacy
    - paragraph [ref=e398]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e367]:
            - generic [ref=e368]: About
          - listitem [ref=e369]:
            - generic [ref=e370]: How it works
      - navigation "Help" [ref=e371]:
        - heading "Help" [level=2] [ref=e372]
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e375]: Safety
          - listitem [ref=e376]:
            - generic [ref=e377]: Contact
      - navigation "Legal" [ref=e378]:
        - heading "Legal" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Terms
          - listitem [ref=e383]:
            - generic [ref=e384]: Privacy
    - paragraph [ref=e386]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /role has members/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e399]:
            - generic [ref=e400]: About
          - listitem [ref=e401]:
            - generic [ref=e402]: How it works
      - navigation "Help" [ref=e403]:
        - heading "Help" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Safety
          - listitem [ref=e408]:
            - generic [ref=e409]: Contact
      - navigation "Legal" [ref=e410]:
        - heading "Legal" [level=2] [ref=e411]
        - list [ref=e412]:
          - listitem [ref=e413]:
            - generic [ref=e414]: Terms
          - listitem [ref=e415]:
            - generic [ref=e416]: Privacy
    - paragraph [ref=e418]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /not assignable to custom roles/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e403]:
            - generic [ref=e404]: About
          - listitem [ref=e405]:
            - generic [ref=e406]: How it works
      - navigation "Help" [ref=e407]:
        - heading "Help" [level=2] [ref=e408]
        - list [ref=e409]:
          - listitem [ref=e410]:
            - generic [ref=e411]: Safety
          - listitem [ref=e412]:
            - generic [ref=e413]: Contact
      - navigation "Legal" [ref=e414]:
        - heading "Legal" [level=2] [ref=e415]
        - list [ref=e416]:
          - listitem [ref=e417]:
            - generic [ref=e418]: Terms
          - listitem [ref=e419]:
            - generic [ref=e420]: Privacy
    - paragraph [ref=e422]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /not fully approved/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e562]:
            - generic [ref=e563]: About
          - listitem [ref=e564]:
            - generic [ref=e565]: How it works
      - navigation "Help" [ref=e566]:
        - heading "Help" [level=2] [ref=e567]
        - list [ref=e568]:
          - listitem [ref=e569]:
            - generic [ref=e570]: Safety
          - listitem [ref=e571]:
            - generic [ref=e572]: Contact
      - navigation "Legal" [ref=e573]:
        - heading "Legal" [level=2] [ref=e574]
        - list [ref=e575]:
          - listitem [ref=e576]:
            - generic [ref=e577]: Terms
          - listitem [ref=e578]:
            - generic [ref=e579]: Privacy
    - paragraph [ref=e581]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

```

Context:

```text
          - listitem [ref=e562]:
            - generic [ref=e563]: About
          - listitem [ref=e564]:
            - generic [ref=e565]: How it works
      - navigation "Help" [ref=e566]:
        - heading "Help" [level=2] [ref=e567]
        - list [ref=e568]:
          - listitem [ref=e569]:
            - generic [ref=e570]: Safety
          - listitem [ref=e571]:
            - generic [ref=e572]: Contact
      - navigation "Legal" [ref=e573]:
        - heading "Legal" [level=2] [ref=e574]
        - list [ref=e575]:
          - listitem [ref=e576]:
            - generic [ref=e577]: Terms
          - listitem [ref=e578]:
            - generic [ref=e579]: Privacy
    - paragraph [ref=e581]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "⟪am⟫"
Received string:    ""
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e118]:
            - generic [ref=e119]: About
          - listitem [ref=e120]:
            - generic [ref=e121]: How it works
      - navigation "Help" [ref=e122]:
        - heading "Help" [level=2] [ref=e123]
        - list [ref=e124]:
          - listitem [ref=e125]:
            - generic [ref=e126]: Safety
          - listitem [ref=e127]:
            - generic [ref=e128]: Contact
      - navigation "Legal" [ref=e129]:
        - heading "Legal" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Terms
          - listitem [ref=e134]:
            - generic [ref=e135]: Privacy
    - paragraph [ref=e137]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('entity-approve-all-summary')
Expected: visible
Timeout: 60000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 60000ms
  - waiting for getByTestId('entity-approve-all-summary')

```

Context:

```text
          - listitem [ref=e472]:
            - generic [ref=e473]: About
          - listitem [ref=e474]:
            - generic [ref=e475]: How it works
      - navigation "Help" [ref=e476]:
        - heading "Help" [level=2] [ref=e477]
        - list [ref=e478]:
          - listitem [ref=e479]:
            - generic [ref=e480]: Safety
          - listitem [ref=e481]:
            - generic [ref=e482]: Contact
      - navigation "Legal" [ref=e483]:
        - heading "Legal" [level=2] [ref=e484]
        - list [ref=e485]:
          - listitem [ref=e486]:
            - generic [ref=e487]: Terms
          - listitem [ref=e488]:
            - generic [ref=e489]: Privacy
    - paragraph [ref=e491]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('history-drawer-e2e-scratch-33560575803-1-1-mobile-360-25-tr16').getByTestId('history-action-e2e-scratch-33560575803-1-1-mobile-360-25-tr16-0')
Expected: "Human edit"
Received: "Machine write"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('history-drawer-e2e-scratch-33560575803-1-1-mobile-360-25-tr16').getByTestId('history-action-e2e-scratch-33560575803-1-1-mobile-360-25-tr16-0')
    14 × locator resolved to <div data-testid="history-action-e2e-scratch-33560575803-1-1-mobile-360-25-tr16-0" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Machine write</div>
       - unexpected value "Machine write"

```

Context:

```text
      - paragraph [ref=e10]: e2e.scratch.33560575803-1-1-mobile-360-25-tr16
    - list [ref=e11]:
      - listitem [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]: Machine write
          - generic [ref=e15]: Untranslated
          - generic [ref=e16]: Human
        - paragraph [ref=e17]: 5 seconds ago · e2e+33560575803-1-25-2-sh4f82
        - paragraph [ref=e18]: (no value)
        - button "Clear instead" [ref=e19] [cursor=pointer]
      - listitem [ref=e20]:
        - generic [ref=e21]:
          - generic [ref=e22]: Human edit
          - generic [ref=e23]: Untranslated
          - generic [ref=e24]: Human
        - paragraph [ref=e25]: 5 seconds ago · e2e+33560575803-1-25-2-sh4f82
        - paragraph [ref=e26]: (no value)
        - button "Clear instead" [ref=e27] [cursor=pointer]
    - status [ref=e28]: Restored.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('edit-error')
Expected: "That seller alias is already taken."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')

```

Context:

```text
          - listitem [ref=e150]:
            - generic [ref=e151]: About
          - listitem [ref=e152]:
            - generic [ref=e153]: How it works
      - navigation "Help" [ref=e154]:
        - heading "Help" [level=2] [ref=e155]
        - list [ref=e156]:
          - listitem [ref=e157]:
            - generic [ref=e158]: Safety
          - listitem [ref=e159]:
            - generic [ref=e160]: Contact
      - navigation "Legal" [ref=e161]:
        - heading "Legal" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - generic [ref=e165]: Terms
          - listitem [ref=e166]:
            - generic [ref=e167]: Privacy
    - paragraph [ref=e169]: © 2026 ethio.com — All rights reserved.
```
```

## settings.spec.ts › S-3 (U-4): wrong current password is rejected; correct one rotates the password

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeVisible() failed

Locator: getByRole('textbox', { name: /email/i })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for getByRole('textbox', { name: /email/i })

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

```

Context:

```text
            - listitem [ref=e260]:
              - generic [ref=e261]: About
            - listitem [ref=e262]:
              - generic [ref=e263]: How it works
        - navigation "Help" [ref=e264]:
          - heading "Help" [level=2] [ref=e265]
          - list [ref=e266]:
            - listitem [ref=e267]:
              - generic [ref=e268]: Safety
            - listitem [ref=e269]:
              - generic [ref=e270]: Contact
        - navigation "Legal" [ref=e271]:
          - heading "Legal" [level=2] [ref=e272]
          - list [ref=e273]:
            - listitem [ref=e274]:
              - generic [ref=e275]: Terms
            - listitem [ref=e276]:
              - generic [ref=e277]: Privacy
      - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-view')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('impersonation-view')

```

Context:

```text
            - listitem [ref=e260]:
              - generic [ref=e261]: About
            - listitem [ref=e262]:
              - generic [ref=e263]: How it works
        - navigation "Help" [ref=e264]:
          - heading "Help" [level=2] [ref=e265]
          - list [ref=e266]:
            - listitem [ref=e267]:
              - generic [ref=e268]: Safety
            - listitem [ref=e269]:
              - generic [ref=e270]: Contact
        - navigation "Legal" [ref=e271]:
          - heading "Legal" [level=2] [ref=e272]
          - list [ref=e273]:
            - listitem [ref=e274]:
              - generic [ref=e275]: Terms
            - listitem [ref=e276]:
              - generic [ref=e277]: Privacy
      - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"

```

Context:

```text
          - listitem [ref=e460]:
            - generic [ref=e461]: About
          - listitem [ref=e462]:
            - generic [ref=e463]: How it works
      - navigation "Help" [ref=e464]:
        - heading "Help" [level=2] [ref=e465]
        - list [ref=e466]:
          - listitem [ref=e467]:
            - generic [ref=e468]: Safety
          - listitem [ref=e469]:
            - generic [ref=e470]: Contact
      - navigation "Legal" [ref=e471]:
        - heading "Legal" [level=2] [ref=e472]
        - list [ref=e473]:
          - listitem [ref=e474]:
            - generic [ref=e475]: Terms
          - listitem [ref=e476]:
            - generic [ref=e477]: Privacy
    - paragraph [ref=e479]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e455]:
            - generic [ref=e456]: About
          - listitem [ref=e457]:
            - generic [ref=e458]: How it works
      - navigation "Help" [ref=e459]:
        - heading "Help" [level=2] [ref=e460]
        - list [ref=e461]:
          - listitem [ref=e462]:
            - generic [ref=e463]: Safety
          - listitem [ref=e464]:
            - generic [ref=e465]: Contact
      - navigation "Legal" [ref=e466]:
        - heading "Legal" [level=2] [ref=e467]
        - list [ref=e468]:
          - listitem [ref=e469]:
            - generic [ref=e470]: Terms
          - listitem [ref=e471]:
            - generic [ref=e472]: Privacy
    - paragraph [ref=e474]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /role has members/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e487]:
            - generic [ref=e488]: About
          - listitem [ref=e489]:
            - generic [ref=e490]: How it works
      - navigation "Help" [ref=e491]:
        - heading "Help" [level=2] [ref=e492]
        - list [ref=e493]:
          - listitem [ref=e494]:
            - generic [ref=e495]: Safety
          - listitem [ref=e496]:
            - generic [ref=e497]: Contact
      - navigation "Legal" [ref=e498]:
        - heading "Legal" [level=2] [ref=e499]
        - list [ref=e500]:
          - listitem [ref=e501]:
            - generic [ref=e502]: Terms
          - listitem [ref=e503]:
            - generic [ref=e504]: Privacy
    - paragraph [ref=e506]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /not assignable to custom roles/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e491]:
            - generic [ref=e492]: About
          - listitem [ref=e493]:
            - generic [ref=e494]: How it works
      - navigation "Help" [ref=e495]:
        - heading "Help" [level=2] [ref=e496]
        - list [ref=e497]:
          - listitem [ref=e498]:
            - generic [ref=e499]: Safety
          - listitem [ref=e500]:
            - generic [ref=e501]: Contact
      - navigation "Legal" [ref=e502]:
        - heading "Legal" [level=2] [ref=e503]
        - list [ref=e504]:
          - listitem [ref=e505]:
            - generic [ref=e506]: Terms
          - listitem [ref=e507]:
            - generic [ref=e508]: Privacy
    - paragraph [ref=e510]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /not fully approved/i
Received string:  "step-up required"
```

Context:

```text
          - listitem [ref=e746]:
            - generic [ref=e747]: About
          - listitem [ref=e748]:
            - generic [ref=e749]: How it works
      - navigation "Help" [ref=e750]:
        - heading "Help" [level=2] [ref=e751]
        - list [ref=e752]:
          - listitem [ref=e753]:
            - generic [ref=e754]: Safety
          - listitem [ref=e755]:
            - generic [ref=e756]: Contact
      - navigation "Legal" [ref=e757]:
        - heading "Legal" [level=2] [ref=e758]
        - list [ref=e759]:
          - listitem [ref=e760]:
            - generic [ref=e761]: Terms
          - listitem [ref=e762]:
            - generic [ref=e763]: Privacy
    - paragraph [ref=e765]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

```

Context:

```text
          - listitem [ref=e746]:
            - generic [ref=e747]: About
          - listitem [ref=e748]:
            - generic [ref=e749]: How it works
      - navigation "Help" [ref=e750]:
        - heading "Help" [level=2] [ref=e751]
        - list [ref=e752]:
          - listitem [ref=e753]:
            - generic [ref=e754]: Safety
          - listitem [ref=e755]:
            - generic [ref=e756]: Contact
      - navigation "Legal" [ref=e757]:
        - heading "Legal" [level=2] [ref=e758]
        - list [ref=e759]:
          - listitem [ref=e760]:
            - generic [ref=e761]: Terms
          - listitem [ref=e762]:
            - generic [ref=e763]: Privacy
    - paragraph [ref=e765]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "⟪am⟫"
Received string:    ""
```

Context:

```text
          - listitem [ref=e205]:
            - generic [ref=e206]: About
          - listitem [ref=e207]:
            - generic [ref=e208]: How it works
      - navigation "Help" [ref=e209]:
        - heading "Help" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Safety
          - listitem [ref=e214]:
            - generic [ref=e215]: Contact
      - navigation "Legal" [ref=e216]:
        - heading "Legal" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Terms
          - listitem [ref=e221]:
            - generic [ref=e222]: Privacy
    - paragraph [ref=e224]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e205]:
            - generic [ref=e206]: About
          - listitem [ref=e207]:
            - generic [ref=e208]: How it works
      - navigation "Help" [ref=e209]:
        - heading "Help" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Safety
          - listitem [ref=e214]:
            - generic [ref=e215]: Contact
      - navigation "Legal" [ref=e216]:
        - heading "Legal" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Terms
          - listitem [ref=e221]:
            - generic [ref=e222]: Privacy
    - paragraph [ref=e224]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "{name}"
Received string:    ""
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: How it works
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
          - listitem [ref=e266]:
            - generic [ref=e267]: Contact
      - navigation "Legal" [ref=e268]:
        - heading "Legal" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Terms
          - listitem [ref=e273]:
            - generic [ref=e274]: Privacy
    - paragraph [ref=e276]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('entity-approve-all-summary')
Expected: visible
Timeout: 60000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 60000ms
  - waiting for getByTestId('entity-approve-all-summary')

```

Context:

```text
          - listitem [ref=e696]:
            - generic [ref=e697]: About
          - listitem [ref=e698]:
            - generic [ref=e699]: How it works
      - navigation "Help" [ref=e700]:
        - heading "Help" [level=2] [ref=e701]
        - list [ref=e702]:
          - listitem [ref=e703]:
            - generic [ref=e704]: Safety
          - listitem [ref=e705]:
            - generic [ref=e706]: Contact
      - navigation "Legal" [ref=e707]:
        - heading "Legal" [level=2] [ref=e708]
        - list [ref=e709]:
          - listitem [ref=e710]:
            - generic [ref=e711]: Terms
          - listitem [ref=e712]:
            - generic [ref=e713]: Privacy
    - paragraph [ref=e715]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('edit-error')
Expected: "That seller alias is already taken."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('edit-error')

```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_role_permission ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_role_permission ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] pageerror:
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] pageerror:
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_role_permission ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_role_permission ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] pageerror:
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] pageerror:
```

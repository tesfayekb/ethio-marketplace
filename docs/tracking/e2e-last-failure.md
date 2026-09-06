# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34059785789
- Commit: `520f60afcb2effbfadfa745dbf7cac482553fcbb`
- Attempt: 1
- Written (UTC): 2026-09-06T21:35:05.747Z
- Passed: 391 · Skipped: 70 · Failed: 62
- Gating failures: 62 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Error: the session did not reach aal2 after 5s of polling (last read: null)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes — Error: the session did not reach aal2 after 5s of polling (last read: null)

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

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - listitem [ref=e120]:
              - generic [ref=e121]: About
            - listitem [ref=e122]:
              - generic [ref=e123]: How it works
        - navigation "Help" [ref=e124]:
          - heading "Help" [level=2] [ref=e125]
          - list [ref=e126]:
            - listitem [ref=e127]:
              - generic [ref=e128]: Safety
            - listitem [ref=e129]:
              - generic [ref=e130]: Contact
        - navigation "Legal" [ref=e131]:
          - heading "Legal" [level=2] [ref=e132]
          - list [ref=e133]:
            - listitem [ref=e134]:
              - generic [ref=e135]: Terms
            - listitem [ref=e136]:
              - generic [ref=e137]: Privacy
      - paragraph [ref=e139]: © 2026 ethio.com — All rights reserved.
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
            - listitem [ref=e381]:
              - generic [ref=e382]: About
            - listitem [ref=e383]:
              - generic [ref=e384]: How it works
        - navigation "Help" [ref=e385]:
          - heading "Help" [level=2] [ref=e386]
          - list [ref=e387]:
            - listitem [ref=e388]:
              - generic [ref=e389]: Safety
            - listitem [ref=e390]:
              - generic [ref=e391]: Contact
        - navigation "Legal" [ref=e392]:
          - heading "Legal" [level=2] [ref=e393]
          - list [ref=e394]:
            - listitem [ref=e395]:
              - generic [ref=e396]: Terms
            - listitem [ref=e397]:
              - generic [ref=e398]: Privacy
      - paragraph [ref=e400]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /not fully approved/i
Received string:  "step-up required: no verified factor"
```

Context:

```text
            - listitem [ref=e663]:
              - generic [ref=e664]: About
            - listitem [ref=e665]:
              - generic [ref=e666]: How it works
        - navigation "Help" [ref=e667]:
          - heading "Help" [level=2] [ref=e668]
          - list [ref=e669]:
            - listitem [ref=e670]:
              - generic [ref=e671]: Safety
            - listitem [ref=e672]:
              - generic [ref=e673]: Contact
        - navigation "Legal" [ref=e674]:
          - heading "Legal" [level=2] [ref=e675]
          - list [ref=e676]:
            - listitem [ref=e677]:
              - generic [ref=e678]: Terms
            - listitem [ref=e679]:
              - generic [ref=e680]: Privacy
      - paragraph [ref=e682]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
            - listitem [ref=e663]:
              - generic [ref=e664]: About
            - listitem [ref=e665]:
              - generic [ref=e666]: How it works
        - navigation "Help" [ref=e667]:
          - heading "Help" [level=2] [ref=e668]
          - list [ref=e669]:
            - listitem [ref=e670]:
              - generic [ref=e671]: Safety
            - listitem [ref=e672]:
              - generic [ref=e673]: Contact
        - navigation "Legal" [ref=e674]:
          - heading "Legal" [level=2] [ref=e675]
          - list [ref=e676]:
            - listitem [ref=e677]:
              - generic [ref=e678]: Terms
            - listitem [ref=e679]:
              - generic [ref=e680]: Privacy
      - paragraph [ref=e682]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
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
          - listitem [ref=e691]:
            - generic [ref=e692]: About
          - listitem [ref=e693]:
            - generic [ref=e694]: How it works
      - navigation "Help" [ref=e695]:
        - heading "Help" [level=2] [ref=e696]
        - list [ref=e697]:
          - listitem [ref=e698]:
            - generic [ref=e699]: Safety
          - listitem [ref=e700]:
            - generic [ref=e701]: Contact
      - navigation "Legal" [ref=e702]:
        - heading "Legal" [level=2] [ref=e703]
        - list [ref=e704]:
          - listitem [ref=e705]:
            - generic [ref=e706]: Terms
          - listitem [ref=e707]:
            - generic [ref=e708]: Privacy
    - paragraph [ref=e710]: © 2026 ethio.com — All rights reserved.
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
            - listitem [ref=e469]:
              - generic [ref=e470]: About
            - listitem [ref=e471]:
              - generic [ref=e472]: How it works
        - navigation "Help" [ref=e473]:
          - heading "Help" [level=2] [ref=e474]
          - list [ref=e475]:
            - listitem [ref=e476]:
              - generic [ref=e477]: Safety
            - listitem [ref=e478]:
              - generic [ref=e479]: Contact
        - navigation "Legal" [ref=e480]:
          - heading "Legal" [level=2] [ref=e481]
          - list [ref=e482]:
            - listitem [ref=e483]:
              - generic [ref=e484]: Terms
            - listitem [ref=e485]:
              - generic [ref=e486]: Privacy
      - paragraph [ref=e488]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /not fully approved/i
Received string:  "step-up required"
```

Context:

```text
            - listitem [ref=e793]:
              - generic [ref=e794]: About
            - listitem [ref=e795]:
              - generic [ref=e796]: How it works
        - navigation "Help" [ref=e797]:
          - heading "Help" [level=2] [ref=e798]
          - list [ref=e799]:
            - listitem [ref=e800]:
              - generic [ref=e801]: Safety
            - listitem [ref=e802]:
              - generic [ref=e803]: Contact
        - navigation "Legal" [ref=e804]:
          - heading "Legal" [level=2] [ref=e805]
          - list [ref=e806]:
            - listitem [ref=e807]:
              - generic [ref=e808]: Terms
            - listitem [ref=e809]:
              - generic [ref=e810]: Privacy
      - paragraph [ref=e812]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

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
            - listitem [ref=e793]:
              - generic [ref=e794]: About
            - listitem [ref=e795]:
              - generic [ref=e796]: How it works
        - navigation "Help" [ref=e797]:
          - heading "Help" [level=2] [ref=e798]
          - list [ref=e799]:
            - listitem [ref=e800]:
              - generic [ref=e801]: Safety
            - listitem [ref=e802]:
              - generic [ref=e803]: Contact
        - navigation "Legal" [ref=e804]:
          - heading "Legal" [level=2] [ref=e805]
          - list [ref=e806]:
            - listitem [ref=e807]:
              - generic [ref=e808]: Terms
            - listitem [ref=e809]:
              - generic [ref=e810]: Privacy
      - paragraph [ref=e812]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
            - listitem [ref=e793]:
              - generic [ref=e794]: About
            - listitem [ref=e795]:
              - generic [ref=e796]: How it works
        - navigation "Help" [ref=e797]:
          - heading "Help" [level=2] [ref=e798]
          - list [ref=e799]:
            - listitem [ref=e800]:
              - generic [ref=e801]: Safety
            - listitem [ref=e802]:
              - generic [ref=e803]: Contact
        - navigation "Legal" [ref=e804]:
          - heading "Legal" [level=2] [ref=e805]
          - list [ref=e806]:
            - listitem [ref=e807]:
              - generic [ref=e808]: Terms
            - listitem [ref=e809]:
              - generic [ref=e810]: Privacy
      - paragraph [ref=e812]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `changed`
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

- Source: `changed`
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

## admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - listitem [ref=e120]:
              - generic [ref=e121]: About
            - listitem [ref=e122]:
              - generic [ref=e123]: How it works
        - navigation "Help" [ref=e124]:
          - heading "Help" [level=2] [ref=e125]
          - list [ref=e126]:
            - listitem [ref=e127]:
              - generic [ref=e128]: Safety
            - listitem [ref=e129]:
              - generic [ref=e130]: Contact
        - navigation "Legal" [ref=e131]:
          - heading "Legal" [level=2] [ref=e132]
          - list [ref=e133]:
            - listitem [ref=e134]:
              - generic [ref=e135]: Terms
            - listitem [ref=e136]:
              - generic [ref=e137]: Privacy
      - paragraph [ref=e139]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
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

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e691]:
            - generic [ref=e692]: About
          - listitem [ref=e693]:
            - generic [ref=e694]: How it works
      - navigation "Help" [ref=e695]:
        - heading "Help" [level=2] [ref=e696]
        - list [ref=e697]:
          - listitem [ref=e698]:
            - generic [ref=e699]: Safety
          - listitem [ref=e700]:
            - generic [ref=e701]: Contact
      - navigation "Legal" [ref=e702]:
        - heading "Legal" [level=2] [ref=e703]
        - list [ref=e704]:
          - listitem [ref=e705]:
            - generic [ref=e706]: Terms
          - listitem [ref=e707]:
            - generic [ref=e708]: Privacy
    - paragraph [ref=e710]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "step-up required"
```

Context:

```text
            - listitem [ref=e381]:
              - generic [ref=e382]: About
            - listitem [ref=e383]:
              - generic [ref=e384]: How it works
        - navigation "Help" [ref=e385]:
          - heading "Help" [level=2] [ref=e386]
          - list [ref=e387]:
            - listitem [ref=e388]:
              - generic [ref=e389]: Safety
            - listitem [ref=e390]:
              - generic [ref=e391]: Contact
        - navigation "Legal" [ref=e392]:
          - heading "Legal" [level=2] [ref=e393]
          - list [ref=e394]:
            - listitem [ref=e395]:
              - generic [ref=e396]: Terms
            - listitem [ref=e397]:
              - generic [ref=e398]: Privacy
      - paragraph [ref=e400]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e684]:
            - generic [ref=e685]: About
          - listitem [ref=e686]:
            - generic [ref=e687]: How it works
      - navigation "Help" [ref=e688]:
        - heading "Help" [level=2] [ref=e689]
        - list [ref=e690]:
          - listitem [ref=e691]:
            - generic [ref=e692]: Safety
          - listitem [ref=e693]:
            - generic [ref=e694]: Contact
      - navigation "Legal" [ref=e695]:
        - heading "Legal" [level=2] [ref=e696]
        - list [ref=e697]:
          - listitem [ref=e698]:
            - generic [ref=e699]: Terms
          - listitem [ref=e700]:
            - generic [ref=e701]: Privacy
    - paragraph [ref=e703]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /system role/i
Received string:  "step-up required: no verified factor"
```

Context:

```text
            - listitem [ref=e469]:
              - generic [ref=e470]: About
            - listitem [ref=e471]:
              - generic [ref=e472]: How it works
        - navigation "Help" [ref=e473]:
          - heading "Help" [level=2] [ref=e474]
          - list [ref=e475]:
            - listitem [ref=e476]:
              - generic [ref=e477]: Safety
            - listitem [ref=e478]:
              - generic [ref=e479]: Contact
        - navigation "Legal" [ref=e480]:
          - heading "Legal" [level=2] [ref=e481]
          - list [ref=e482]:
            - listitem [ref=e483]:
              - generic [ref=e484]: Terms
            - listitem [ref=e485]:
              - generic [ref=e486]: Privacy
      - paragraph [ref=e488]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-6 revocation path: unenrolling the factor refuses the next change

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Set up two-factor authentication first
      - paragraph [ref=e6]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e7] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e8] [cursor=pointer]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

```text
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] pageerror:
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] pageerror:
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×28
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] pageerror:
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] pageerror:
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_set_language_flags ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×28
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Verify a second factor (TOTP) and retry this action.","message":"step-up required"})
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] pageerror:
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] pageerror:
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×16
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_role ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog ×17
```

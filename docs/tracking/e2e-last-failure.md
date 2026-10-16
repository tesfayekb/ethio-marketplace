# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38905533461
- Commit: `d0644eef4e752452452a972538efc86e02bb9d9c`
- Attempt: 1
- Written (UTC): 2026-10-16T14:29:46.301Z
- Passed: 1935 · Skipped: 126 · Failed: 26
- Gating failures: 26 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 9
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control — Error: [e2e:seller] confirming profiles failed: undefined
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) — Error: expect(locator).toHaveCount(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited — Error: sign-in form did not render on /auth

## Flaky bodies (DEC-078)

### admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
```

Context:

```text
          - listitem [ref=e269]:
            - generic [ref=e270]: About
          - listitem [ref=e271]:
            - generic [ref=e272]: How it works
      - navigation "Help" [ref=e273]:
        - heading "Help" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Safety
          - listitem [ref=e278]:
            - generic [ref=e279]: Contact
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Terms
          - listitem [ref=e285]:
            - generic [ref=e286]: Privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:seller] confirming profiles failed: undefined
--- further error 1 ---
Error: [e2e:seller] confirming profiles failed: undefined

   at helpers/posting.ts:101

   99 |     for (const table of ["user_directory", "profiles"] as const) {
  100 |       const { error } = await adminClient().from(table).update(fact).eq("user_id", user.id);
> 101 |       if (error) throw new Error(`[e2e:seller] confirming ${table} failed: ${error.message}`);
      |                        ^
  102 |     }
  103 |   }
  104 |   /**
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:101:24)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:126:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:1340:18
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-17-the-currency-is-preselected-and-searchable-by-name-in-one-control-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-118f5-able-by-name-in-one-control-mobile-360`; this run carried 57 context file(s); of the same spec: none

### admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: How it works
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
          - listitem [ref=e340]:
            - generic [ref=e341]: Contact
      - navigation "Legal" [ref=e342]:
        - heading "Legal" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - generic [ref=e346]: Terms
          - listitem [ref=e347]:
            - generic [ref=e348]: Privacy
    - paragraph [ref=e350]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 · scratch 6: e2e-cat-1-5-qm2os0@2, e2e-cat-4-6-9dp94j-r@19, e2e-cat-1-5-zccg57@1, e2e-cat-4-6-9dp94j-r2@20, e2e-cat-4-6-9dp94j-a@0, e2e-cat-4-6-9dp94j-r3@21
[ct18-dump] now: roots: real 16 at 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 5: e2e-cat-1-5-qm2os0@20, e2e-cat-4-6-9dp94j-r@17, e2e-cat-1-5-zccg57@18, e2e-cat-4-6-9dp94j-r2@19, e2e-cat-4-6-9dp94j-a@0
[ct18-dump] preview: 16 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":13}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,13,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":17}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,17,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":15}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,15,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":7}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,7,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":16}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,16,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":11}
[ct18-dump]   sent: commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump]   now:  commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump] electronics · display_order · file {"display_order":4}
[ct18-dump]   sent: electronics,electronics,,Electronics,ኤሌክትሮኒክስ,4,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump]   now:  electronics,electronics,,Electronics,ኤሌክትሮኒክስ,2,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump] fashion · display_order · file {"display_order":5}
[ct18-dump]   sent: babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump]   now:  babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump] home-garden · display_order · file {"display_order":6}
[ct18-dump]   sent: home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,6,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump]   now:  home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,4,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump] jobs · display_order · file {"display_order":18}
[ct18-dump]   sent: jobs,jobs,,Jobs,ስራዎች,18,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump]   now:  jobs,jobs,,Jobs,ስራዎች,16,false,false,false,true,,once,true,,Briefcase,,,,,0,
[ct18-dump] (6 more changed rows not printed)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 · scratch 6: e2e-cat-1-5-qm2os0@2, e2e-cat-4-6-9dp94j-r@19, e2e-cat-1-5-zccg57@1, e2e-cat-4-6-9dp94j-r2@20, e2e-cat-4-6-9dp94j-a@0, e2e-cat-4-6-9dp94j-r3@21
[ct18-dump] now: roots: real 16 at 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 · scratch 5: e2e-cat-1-5-qm2os0@20, e2e-cat-4-6-9dp94j-r@17, e2e-cat-1-5-zccg57@18, e2e-cat-4-6-9dp94j-r2@19, e2e-cat-4-6-9dp94j-a@0
[ct18-dump] preview: 16 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":13}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,13,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":17}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,17,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":15}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,15,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":7}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,7,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":16}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,16,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":11}
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [active] [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e327]:
            - generic [ref=e328]: About
          - listitem [ref=e329]:
            - generic [ref=e330]: How it works
      - navigation "Help" [ref=e331]:
        - heading "Help" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Safety
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Terms
          - listitem [ref=e343]:
            - generic [ref=e344]: Privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-6a690149-5f9b-48c2-85b0-be7d874f099d"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-6a690149-5f9b-48c2-85b0-be7d874f099d"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-6a690149-5f9b-48c2-85b0-be7d874f099d"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-6a690149-5f9b-48c2-85b0-be7d874f099d"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1493 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1494 |       .not.toContain("decided");
> 1495 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1496 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1497 |   });
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: How it works
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
          - listitem [ref=e346]:
            - generic [ref=e347]: Contact
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Terms
          - listitem [ref=e353]:
            - generic [ref=e354]: Privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
```
```

### admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e322]:
            - generic [ref=e323]: About
          - listitem [ref=e324]:
            - generic [ref=e325]: How it works
      - navigation "Help" [ref=e326]:
        - heading "Help" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Safety
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Legal" [ref=e333]:
        - heading "Legal" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Terms
          - listitem [ref=e338]:
            - generic [ref=e339]: Privacy
    - paragraph [ref=e341]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch
```

Context:

```text
          - listitem [ref=e304]:
            - generic [ref=e305]: About
          - listitem [ref=e306]:
            - generic [ref=e307]: How it works
      - navigation "Help" [ref=e308]:
        - heading "Help" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - generic [ref=e312]: Safety
          - listitem [ref=e313]:
            - generic [ref=e314]: Contact
      - navigation "Legal" [ref=e315]:
        - heading "Legal" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - generic [ref=e319]: Terms
          - listitem [ref=e320]:
            - generic [ref=e321]: Privacy
    - paragraph [ref=e323]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

105 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 8 | shard 1, shard 4, shard 5 |
| `too many previews` (quiet) | 5 | shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pbn<n>kp: e<n>e_par_at<n>wq → e<n>e_chi_vtcxmi` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zhy<n>u<n>: e<n>e_par_muwfvx → e<n>e_chi_<n>f<n>hzt` (quiet) | 1 | shard 4 |
| `upstream returned an HTML error page (<n>)` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×8 · too many previews ×5 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pbn<n>kp: e<n>e_par_at<n>wq → e<n>e_chi_vtcxmi ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zhy<n>u<n>: e<n>e_par_muwfvx → e<n>e_chi_<n>f<n>hzt ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-101 a phone number in a free-text answer is refused at its field ×1 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×1 · PW-137 Pieces per Pack shows with per pack and goes, with its value, on another  ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-5 profile round trip: units, currency and order are saved and read back ×1 · CT-20 action=retire and action=reactivate walk the state machine ×1

```text
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-16T13:45:21.337Z | 17.4 min |
| email | 2026-10-16T13:45:13.047Z | 0.2 min |
| shard 1 | 2026-10-16T13:45:08.076Z | 44.1 min |
| shard 2 | 2026-10-16T13:45:15.417Z | 40.8 min |
| shard 3 | 2026-10-16T13:45:25.685Z | 40.2 min |
| shard 4 | 2026-10-16T13:45:11.051Z | 40.1 min |
| shard 5 | 2026-10-16T13:45:09.791Z | 38.2 min |
| shard 6 | 2026-10-16T13:45:09.770Z | 34.9 min |
| changed | 2026-10-16T13:45:17.537Z | 37.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 120 | 47.6 min | shard 1, shard 4, changed |
| `admin-screening.spec.ts` | 104 | 41.0 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 80 | 27.2 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 26.4 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 60 | 25.2 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 336 | 20.4 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 18.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.5 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 28 | 17.3 min | shard 2, shard 5, changed |
| `post-wizard-place.spec.ts` | 38 | 16.9 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 78 | 16.1 min | smoke, shard 2, shard 5, changed |
| `my-listings-doors.spec.ts` | 28 | 15.8 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 62 | 15.0 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.9 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 12.7 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.6 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.5 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 9.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 9.2 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.2 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.6 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 30 | 7.3 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 7.0 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.1 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.1 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 3.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 3.8 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 263.6 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 102.4 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 94.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 81.0 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | desktop-1280 | 79.8 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | mobile-360 | 78.2 s |
| `admin-attributes-library.spec.ts` › AT-1 gating: a plain user is refused; the library renders for an admin | desktop-1280 | 75.4 s |
| `admin-roles.spec.ts` › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects | mobile-360 | 75.2 s |
| `admin-users.spec.ts` › AU-1 permission: moderator is refused, admin sees the list | desktop-1280 | 74.6 s |
| `admin-coverage.spec.ts` › CV-1 gating: a plain user is refused; the roster renders for a super admin | desktop-1280 | 69.0 s |
| `admin-attributes-library.spec.ts` › AT-1 gating: a plain user is refused; the library renders for an admin | mobile-360 | 68.5 s |
| `admin-shell.spec.ts` › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one | mobile-360 | 68.5 s |
| `admin-coverage.spec.ts` › CV-1 gating: a plain user is refused; the roster renders for a super admin | mobile-360 | 67.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 66.9 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | mobile-360 | 65.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38905533461-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38905533461-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38905533461-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 55 user(s) owned by process 38905533461-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38905533461-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 38905533461-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 45 user(s) owned by process 38905533461-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38905533461-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38905533461-changed
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: About
          - listitem [ref=e291]:
            - generic [ref=e292]: How it works
      - navigation "Help" [ref=e293]:
        - heading "Help" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Safety
          - listitem [ref=e298]:
            - generic [ref=e299]: Contact
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Terms
          - listitem [ref=e305]:
            - generic [ref=e306]: Privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e298]:
            - generic [ref=e299]: About
          - listitem [ref=e300]:
            - generic [ref=e301]: How it works
      - navigation "Help" [ref=e302]:
        - heading "Help" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Safety
          - listitem [ref=e307]:
            - generic [ref=e308]: Contact
      - navigation "Legal" [ref=e309]:
        - heading "Legal" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: Terms
          - listitem [ref=e314]:
            - generic [ref=e315]: Privacy
    - paragraph [ref=e317]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e375]:
            - generic [ref=e376]: About
          - listitem [ref=e377]:
            - generic [ref=e378]: How it works
      - navigation "Help" [ref=e379]:
        - heading "Help" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Safety
          - listitem [ref=e384]:
            - generic [ref=e385]: Contact
      - navigation "Legal" [ref=e386]:
        - heading "Legal" [level=2] [ref=e387]
        - list [ref=e388]:
          - listitem [ref=e389]:
            - generic [ref=e390]: Terms
          - listitem [ref=e391]:
            - generic [ref=e392]: Privacy
    - paragraph [ref=e394]: © 2026 ethio.com — All rights reserved.
```
```

## admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e387]:
            - generic [ref=e388]: About
          - listitem [ref=e389]:
            - generic [ref=e390]: How it works
      - navigation "Help" [ref=e391]:
        - heading "Help" [level=2] [ref=e392]
        - list [ref=e393]:
          - listitem [ref=e394]:
            - generic [ref=e395]: Safety
          - listitem [ref=e396]:
            - generic [ref=e397]: Contact
      - navigation "Legal" [ref=e398]:
        - heading "Legal" [level=2] [ref=e399]
        - list [ref=e400]:
          - listitem [ref=e401]:
            - generic [ref=e402]: Terms
          - listitem [ref=e403]:
            - generic [ref=e404]: Privacy
    - paragraph [ref=e406]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e299]:
            - generic [ref=e300]: About
          - listitem [ref=e301]:
            - generic [ref=e302]: How it works
      - navigation "Help" [ref=e303]:
        - heading "Help" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Safety
          - listitem [ref=e308]:
            - generic [ref=e309]: Contact
      - navigation "Legal" [ref=e310]:
        - heading "Legal" [level=2] [ref=e311]
        - list [ref=e312]:
          - listitem [ref=e313]:
            - generic [ref=e314]: Terms
          - listitem [ref=e315]:
            - generic [ref=e316]: Privacy
    - paragraph [ref=e318]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e281]:
            - generic [ref=e282]: About
          - listitem [ref=e283]:
            - generic [ref=e284]: How it works
      - navigation "Help" [ref=e285]:
        - heading "Help" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Safety
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Legal" [ref=e292]:
        - heading "Legal" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Terms
          - listitem [ref=e297]:
            - generic [ref=e298]: Privacy
    - paragraph [ref=e300]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-71e1933f-0ae4-4b70-b738-4d1e4c89cdea"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-71e1933f-0ae4-4b70-b738-4d1e4c89cdea"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-71e1933f-0ae4-4b70-b738-4d1e4c89cdea"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-71e1933f-0ae4-4b70-b738-4d1e4c89cdea"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1493 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1494 |       .not.toContain("decided");
> 1495 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1496 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1497 |   });
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e267]:
            - generic [ref=e268]: About
          - listitem [ref=e269]:
            - generic [ref=e270]: How it works
      - navigation "Help" [ref=e271]:
        - heading "Help" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Safety
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
      - navigation "Legal" [ref=e278]:
        - heading "Legal" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Terms
          - listitem [ref=e283]:
            - generic [ref=e284]: Privacy
    - paragraph [ref=e286]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: How it works
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
          - listitem [ref=e340]:
            - generic [ref=e341]: Contact
      - navigation "Legal" [ref=e342]:
        - heading "Legal" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - generic [ref=e346]: Terms
          - listitem [ref=e347]:
            - generic [ref=e348]: Privacy
    - paragraph [ref=e350]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e741]:
            - generic [ref=e742]: About
          - listitem [ref=e743]:
            - generic [ref=e744]: How it works
      - navigation "Help" [ref=e745]:
        - heading "Help" [level=2] [ref=e746]
        - list [ref=e747]:
          - listitem [ref=e748]:
            - generic [ref=e749]: Safety
          - listitem [ref=e750]:
            - generic [ref=e751]: Contact
      - navigation "Legal" [ref=e752]:
        - heading "Legal" [level=2] [ref=e753]
        - list [ref=e754]:
          - listitem [ref=e755]:
            - generic [ref=e756]: Terms
          - listitem [ref=e757]:
            - generic [ref=e758]: Privacy
    - paragraph [ref=e760]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 240000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 240000ms exceeded.
Call log:
  - waiting for locator('#auth-email')


   at helpers/ui.ts:69

  67 |
  68 |   for (let attempt = 1; attempt <= 5; attempt += 1) {
> 69 |     await input.fill("");
     |                 ^
  70 |     await input.fill(value);
  71 |
  72 |     try {
    at fillUntilStable (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:69:17)
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:437:3)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:557:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:804:7
```

Context:

```text
          - listitem [ref=e269]:
            - generic [ref=e270]: About
          - listitem [ref=e271]:
            - generic [ref=e272]: How it works
      - navigation "Help" [ref=e273]:
        - heading "Help" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Safety
          - listitem [ref=e278]:
            - generic [ref=e279]: Contact
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Terms
          - listitem [ref=e285]:
            - generic [ref=e286]: Privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e318]:
            - generic [ref=e319]: About
          - listitem [ref=e320]:
            - generic [ref=e321]: How it works
      - navigation "Help" [ref=e322]:
        - heading "Help" [level=2] [ref=e323]
        - list [ref=e324]:
          - listitem [ref=e325]:
            - generic [ref=e326]: Safety
          - listitem [ref=e327]:
            - generic [ref=e328]: Contact
      - navigation "Legal" [ref=e329]:
        - heading "Legal" [level=2] [ref=e330]
        - list [ref=e331]:
          - listitem [ref=e332]:
            - generic [ref=e333]: Terms
          - listitem [ref=e334]:
            - generic [ref=e335]: Privacy
    - paragraph [ref=e337]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e341]:
            - generic [ref=e342]: About
          - listitem [ref=e343]:
            - generic [ref=e344]: How it works
      - navigation "Help" [ref=e345]:
        - heading "Help" [level=2] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]:
            - generic [ref=e349]: Safety
          - listitem [ref=e350]:
            - generic [ref=e351]: Contact
      - navigation "Legal" [ref=e352]:
        - heading "Legal" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Terms
          - listitem [ref=e357]:
            - generic [ref=e358]: Privacy
    - paragraph [ref=e360]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e281]:
            - generic [ref=e282]: About
          - listitem [ref=e283]:
            - generic [ref=e284]: How it works
      - navigation "Help" [ref=e285]:
        - heading "Help" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Safety
          - listitem [ref=e290]:
            - generic [ref=e291]: Contact
      - navigation "Legal" [ref=e292]:
        - heading "Legal" [level=2] [ref=e293]
        - list [ref=e294]:
          - listitem [ref=e295]:
            - generic [ref=e296]: Terms
          - listitem [ref=e297]:
            - generic [ref=e298]: Privacy
    - paragraph [ref=e300]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: How it works
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
          - listitem [ref=e258]:
            - generic [ref=e259]: Contact
      - navigation "Legal" [ref=e260]:
        - heading "Legal" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Terms
          - listitem [ref=e265]:
            - generic [ref=e266]: Privacy
    - paragraph [ref=e268]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: How it works
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
          - listitem [ref=e274]:
            - generic [ref=e275]: Contact
      - navigation "Legal" [ref=e276]:
        - heading "Legal" [level=2] [ref=e277]
        - list [ref=e278]:
          - listitem [ref=e279]:
            - generic [ref=e280]: Terms
          - listitem [ref=e281]:
            - generic [ref=e282]: Privacy
    - paragraph [ref=e284]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"


  483 |       await window.__ethioSupabase!.auth.signOut({ scope: "local" });
  484 |     });
> 485 |     await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
      |                        ^
  486 |   });
  487 |
  488 |   test("MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:485:24
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

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: How it works
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
          - listitem [ref=e277]:
            - generic [ref=e278]: Contact
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Terms
          - listitem [ref=e284]:
            - generic [ref=e285]: Privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:66

  64 | /** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
  65 | export async function fillUntilStable(input: Locator, value: string, fieldName: string) {
> 66 |   await expect(input, `${fieldName} field is not editable`).toBeEditable();
     |                                                             ^
```

Context:

```text
          - listitem [ref=e404]:
            - generic [ref=e405]: About
          - listitem [ref=e406]:
            - generic [ref=e407]: How it works
      - navigation "Help" [ref=e408]:
        - heading "Help" [level=2] [ref=e409]
        - list [ref=e410]:
          - listitem [ref=e411]:
            - generic [ref=e412]: Safety
          - listitem [ref=e413]:
            - generic [ref=e414]: Contact
      - navigation "Legal" [ref=e415]:
        - heading "Legal" [level=2] [ref=e416]
        - list [ref=e417]:
          - listitem [ref=e418]:
            - generic [ref=e419]: Terms
          - listitem [ref=e420]:
            - generic [ref=e421]: Privacy
    - paragraph [ref=e423]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e322]:
            - generic [ref=e323]: About
          - listitem [ref=e324]:
            - generic [ref=e325]: How it works
      - navigation "Help" [ref=e326]:
        - heading "Help" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Safety
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Legal" [ref=e333]:
        - heading "Legal" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Terms
          - listitem [ref=e338]:
            - generic [ref=e339]: Privacy
    - paragraph [ref=e341]: © 2026 ethio.com — All rights reserved.
```
```

## admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e315]:
            - generic [ref=e316]: About
          - listitem [ref=e317]:
            - generic [ref=e318]: How it works
      - navigation "Help" [ref=e319]:
        - heading "Help" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Safety
          - listitem [ref=e324]:
            - generic [ref=e325]: Contact
      - navigation "Legal" [ref=e326]:
        - heading "Legal" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Terms
          - listitem [ref=e331]:
            - generic [ref=e332]: Privacy
    - paragraph [ref=e334]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e375]:
            - generic [ref=e376]: About
          - listitem [ref=e377]:
            - generic [ref=e378]: How it works
      - navigation "Help" [ref=e379]:
        - heading "Help" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Safety
          - listitem [ref=e384]:
            - generic [ref=e385]: Contact
      - navigation "Legal" [ref=e386]:
        - heading "Legal" [level=2] [ref=e387]
        - list [ref=e388]:
          - listitem [ref=e389]:
            - generic [ref=e390]: Terms
          - listitem [ref=e391]:
            - generic [ref=e392]: Privacy
    - paragraph [ref=e394]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e312]:
            - generic [ref=e313]: About
          - listitem [ref=e314]:
            - generic [ref=e315]: How it works
      - navigation "Help" [ref=e316]:
        - heading "Help" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Safety
          - listitem [ref=e321]:
            - generic [ref=e322]: Contact
      - navigation "Legal" [ref=e323]:
        - heading "Legal" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Terms
          - listitem [ref=e328]:
            - generic [ref=e329]: Privacy
    - paragraph [ref=e331]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}
--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

[auth-dump] {"url":"http://127.0.0.1:4173/","accountMenu":1,"authEmail":0,"title":"ethio.com — Ethiopia's marketplace","h1":"All listings","localSb":["sb-jatpuhfdjfzctjipklmk-last-activity-at","sb-jatpuhfdjfzctjipklmk-session-started-at","[redacted]","sb-jatpuhfdjfzctjipklmk-session-ref"],"sessionKeys":["tsr-scroll-restoration-v1_3"],"deactivated":null}

   at helpers/ui.ts:396

  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
  395 |   try {
> 396 |     await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({
```

Context:

```text
          - listitem [ref=e294]:
            - generic [ref=e295]: About
          - listitem [ref=e296]:
            - generic [ref=e297]: How it works
      - navigation "Help" [ref=e298]:
        - heading "Help" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Safety
          - listitem [ref=e303]:
            - generic [ref=e304]: Contact
      - navigation "Legal" [ref=e305]:
        - heading "Legal" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - generic [ref=e309]: Terms
          - listitem [ref=e310]:
            - generic [ref=e311]: Privacy
    - paragraph [ref=e313]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-d25a1ecb-0042-4b2c-af11-d43eea4c0e35"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-d25a1ecb-0042-4b2c-af11-d43eea4c0e35"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-d25a1ecb-0042-4b2c-af11-d43eea4c0e35"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-d25a1ecb-0042-4b2c-af11-d43eea4c0e35"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1493 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1494 |       .not.toContain("decided");
> 1495 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1496 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1497 |   });
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-ffe65d50-352c-41ec-9383-be88f96ecb41"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-ffe65d50-352c-41ec-9383-be88f96ecb41"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-ffe65d50-352c-41ec-9383-be88f96ecb41"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-ffe65d50-352c-41ec-9383-be88f96ecb41"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1493 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1494 |       .not.toContain("decided");
> 1495 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1496 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1497 |   });
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: How it works
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
          - listitem [ref=e346]:
            - generic [ref=e347]: Contact
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Terms
          - listitem [ref=e353]:
            - generic [ref=e354]: Privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-pbn6kp: e2e_par_at59wq → e2e_chi_vtcxmi
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×3
[client-error] console.error: [client-error] gate fetch threw ×4
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
console.error: [client-error] gate fetch threw ×4
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×4
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×3
[client-error] console.error: [client-error] gate fetch threw ×2
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
console.error: [client-error] gate fetch threw ×4
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-zhy7u6: e2e_par_muwfvx → e2e_chi_5f6hzt
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (502)
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×5
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×3
console.error: [client-error] gate fetch threw
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

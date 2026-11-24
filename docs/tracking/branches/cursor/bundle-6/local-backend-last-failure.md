# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45494187853
- Commit: `f59780cacce77687b544bd3959546c227b56503b`
- Attempt: 1
- Repeat: 34 of 1490 tests repeated — specs directly changed 3/33, importers of a changed helper 0/80; budget 643 s; the time cap left 40 test runs
- Written (UTC): 2026-11-24T22:15:48.451Z
- Passed: 2496 · Skipped: 395 · Failed: 14
- Gating failures: 14 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: shard 6 (INFRA: install-chromium-s-system-libraries)
- Infrastructure: 1 lane(s) died before any test at install-chromium-s-system-libraries — E: Unable to locate package fonts-unifont
- Errors outside any test (INC-589): repeat (2)

## Gating failures

### admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:396:5
```

Context:

```text
          - listitem [ref=e243]:
            - generic [ref=e244]: About
          - listitem [ref=e245]:
            - generic [ref=e246]: Contact
      - navigation "Help" [ref=e247]:
        - heading "Help" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Safety
      - navigation "Legal" [ref=e252]:
        - heading "Legal" [level=2] [ref=e253]
        - list [ref=e254]:
          - listitem [ref=e255]:
            - link "Terms" [ref=e256] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e257]:
            - link "Privacy" [ref=e258] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e260]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:809:7
```

Context:

```text
          - listitem [ref=e242]:
            - generic [ref=e243]: About
          - listitem [ref=e244]:
            - generic [ref=e245]: Contact
      - navigation "Help" [ref=e246]:
        - heading "Help" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Safety
      - navigation "Legal" [ref=e251]:
        - heading "Legal" [level=2] [ref=e252]
        - list [ref=e253]:
          - listitem [ref=e254]:
            - link "Terms" [ref=e255] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e256]:
            - link "Privacy" [ref=e257] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e259]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:809:7
```

Context:

```text
          - listitem [ref=e243]:
            - generic [ref=e244]: About
          - listitem [ref=e245]:
            - generic [ref=e246]: Contact
      - navigation "Help" [ref=e247]:
        - heading "Help" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Safety
      - navigation "Legal" [ref=e252]:
        - heading "Legal" [level=2] [ref=e253]
        - list [ref=e254]:
          - listitem [ref=e255]:
            - link "Terms" [ref=e256] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e257]:
            - link "Privacy" [ref=e258] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e260]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:809:7
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:809:7
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

### import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:809:7
```

Context:

```text
          - listitem [ref=e242]:
            - generic [ref=e243]: About
          - listitem [ref=e244]:
            - generic [ref=e245]: Contact
      - navigation "Help" [ref=e246]:
        - heading "Help" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Safety
      - navigation "Legal" [ref=e251]:
        - heading "Legal" [level=2] [ref=e252]
        - list [ref=e253]:
          - listitem [ref=e254]:
            - link "Terms" [ref=e255] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e256]:
            - link "Privacy" [ref=e257] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e259]: © 2026 ethio.com — All rights reserved.
```
```

### legal-admin.spec.ts › Admin Legal › LGA-1 Legal cards, facts and the permission-gated admin menu

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:298:5
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

### legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:1094:7
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

### legal-admin.spec.ts › Admin Legal › LGA-1 Legal cards, facts and the permission-gated admin menu

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:298:5
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

### admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:58:5
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:149:5
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-23 a commit without step-up is refused and writes nothing

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: {"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"batch_id":"[account id]","refusals":[{"key":"e2e-cat-local-15-0-horcun","row":2,"file":"categories","reason":"unknownSlug","values":{"category_path":"","category_slug":"e2e-cat-local-15-0-horcun","parent_slug":"","name_en":"e2e-cat-local-15-0-horcun","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","capabilities":"","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":""}}]}

expect(received).toBe(expected) // Object.is equality

Expected: 428
Received: 200
--- further error 1 ---
Error: {"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"batch_id":"[account id]","refusals":[{"key":"e2e-cat-local-15-0-horcun","row":2,"file":"categories","reason":"unknownSlug","values":{"category_path":"","category_slug":"e2e-cat-local-15-0-horcun","parent_slug":"","name_en":"e2e-cat-local-15-0-horcun","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","capabilities":"","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":""}}]}

expect(received).toBe(expected) // Object.is equality

Expected: 428
Received: 200

  1911 |         digest: preview.payload["digest"],
  1912 |       });
> 1913 |       expect(commit.status, JSON.stringify(commit.payload)).toBe(428);
       |                                                             ^
  1914 |       expect(commit.payload["code"]).toBe("P0009");
  1915 |
  1916 |       // A refused attempt leaves NO trace (F5).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1913:61
```

Context:

```text
          - listitem [ref=e1212]:
            - generic [ref=e1213]: About
          - listitem [ref=e1214]:
            - generic [ref=e1215]: Contact
      - navigation "Help" [ref=e1216]:
        - heading "Help" [level=2] [ref=e1217]
        - list [ref=e1218]:
          - listitem [ref=e1219]:
            - generic [ref=e1220]: Safety
      - navigation "Legal" [ref=e1221]:
        - heading "Legal" [level=2] [ref=e1222]
        - list [ref=e1223]:
          - listitem [ref=e1224]:
            - link "Terms" [ref=e1225] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1226]:
            - link "Privacy" [ref=e1227] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1229]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-23 a commit without step-up is refused and writes nothing

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"batch_id":"[account id]","refusals":[{"key":"e2e-cat-local-15-2-s26tw0","row":2,"file":"categories","reason":"unknownSlug","values":{"category_path":"","category_slug":"e2e-cat-local-15-2-s26tw0","parent_slug":"","name_en":"e2e-cat-local-15-2-s26tw0","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","capabilities":"","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":""}}]}

expect(received).toBe(expected) // Object.is equality

Expected: 428
Received: 200
--- further error 1 ---
Error: {"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"batch_id":"[account id]","refusals":[{"key":"e2e-cat-local-15-2-s26tw0","row":2,"file":"categories","reason":"unknownSlug","values":{"category_path":"","category_slug":"e2e-cat-local-15-2-s26tw0","parent_slug":"","name_en":"e2e-cat-local-15-2-s26tw0","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","capabilities":"","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":""}}]}

expect(received).toBe(expected) // Object.is equality

Expected: 428
Received: 200

  1911 |         digest: preview.payload["digest"],
  1912 |       });
> 1913 |       expect(commit.status, JSON.stringify(commit.payload)).toBe(428);
       |                                                             ^
  1914 |       expect(commit.payload["code"]).toBe("P0009");
  1915 |
  1916 |       // A refused attempt leaves NO trace (F5).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1913:61
```

Context:

```text
          - listitem [ref=e1228]:
            - generic [ref=e1229]: About
          - listitem [ref=e1230]:
            - generic [ref=e1231]: Contact
      - navigation "Help" [ref=e1232]:
        - heading "Help" [level=2] [ref=e1233]
        - list [ref=e1234]:
          - listitem [ref=e1235]:
            - generic [ref=e1236]: Safety
      - navigation "Legal" [ref=e1237]:
        - heading "Legal" [level=2] [ref=e1238]
        - list [ref=e1239]:
          - listitem [ref=e1240]:
            - link "Terms" [ref=e1241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1242]:
            - link "Privacy" [ref=e1243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1245]: © 2026 ethio.com — All rights reserved.
```
```

### admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:199:5
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited — Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
- FLAKY (passed on retry) · `mobile-360` · source `shard 7` · admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.
--- further error 1 ---
Error: [e2e:session] injected identity mismatch — expected user [account id], page holds no session.

   at helpers/session.ts:331

  329 |   }, storageKey());
  330 |   if (actual !== expected) {
> 331 |     throw new Error(
      |           ^
  332 |       `[e2e:session] injected identity mismatch — expected user ${expected}, page holds ${actual ?? "no session"}.`,
  333 |     );
  334 |   }
    at assertInjectedIdentity (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:331:11)
    at signInStaff (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/staff-factor.ts:166:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:809:7
```

Context:

```text
          - listitem [ref=e293]:
            - generic [ref=e294]: About
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Help" [ref=e297]:
        - heading "Help" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Safety
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - link "Terms" [ref=e306] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e307]:
            - link "Privacy" [ref=e308] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
--- further error 1 ---
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:975:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1112:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:693:24
```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-10-parent-picker-retired-nodes-are-absent-and-options-carry-paths-mobile-360` — Playwright's name `admin-categories-console-C-5592f-ent-and-options-carry-paths-mobile-360`; this run carried 29 context file(s); of the same spec: none

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 763s for the test suite to run
(no place given)
```

```text
Timed out waiting 763s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: shard 6

`shard 6`: log unavailable.

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: shard 6

`shard 6`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-24T21:50:40.287Z | 6.5 min |
| email | 2026-11-24T21:50:34.110Z | 0.3 min |
| webkit | 2026-11-24T21:51:03.269Z | 10.6 min |
| shard 1 | 2026-11-24T21:50:33.090Z | 6.1 min |
| shard 2 | 2026-11-24T21:50:32.986Z | 10.8 min |
| shard 3 | 2026-11-24T21:52:41.521Z | 7.1 min |
| shard 4 | 2026-11-24T21:50:43.967Z | 9.8 min |
| shard 5 | 2026-11-24T21:50:57.001Z | 9.8 min |
| shard 7 | 2026-11-24T21:50:33.833Z | 19.5 min |
| shard 8 | 2026-11-24T21:50:32.598Z | 25.0 min |
| shard 9 | 2026-11-24T21:50:29.693Z | 10.6 min |
| shard 10 | 2026-11-24T21:50:56.862Z | 20.8 min |
| shard 11 | 2026-11-24T21:51:08.212Z | 7.5 min |
| shard 12 | 2026-11-24T21:50:44.760Z | 5.8 min |
| shard 13 | 2026-11-24T21:50:27.372Z | 12.2 min |
| shard 14 | 2026-11-24T21:50:17.155Z | 20.3 min |
| shard 15 | 2026-11-24T21:50:16.326Z | 14.3 min |
| shard 16 | 2026-11-24T21:51:26.934Z | 5.8 min |
| repeat | 2026-11-24T21:53:38.460Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-attributes-editor.spec.ts` | 108 | 27.1 min | shard 14, repeat |
| `admin-listings.spec.ts` | 82 | 26.3 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 64 | 21.2 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 20.6 min | shard 15 |
| `admin-translations-console.spec.ts` | 46 | 19.2 min | smoke, shard 8 |
| `legal-admin.spec.ts` | 44 | 18.6 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 17.6 min | shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 16.7 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 16.1 min | shard 13 |
| `admin-monetisation.spec.ts` | 34 | 13.2 min | smoke, shard 10 |
| `admin-roles.spec.ts` | 28 | 11.0 min | shard 9 |
| `legal-doors.spec.ts` | 34 | 9.8 min | smoke, shard 8 |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `import-security.spec.ts` | 36 | 9.0 min | shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.4 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 5 |
| `admin-translations-governance.spec.ts` | 20 | 5.5 min | smoke, shard 16 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 11 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 5.0 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `dialogs.spec.ts` | 36 | 4.6 min | webkit, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.5 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 4.4 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-translations-data.spec.ts` | 10 | 4.3 min | shard 5 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-users.spec.ts` | 28 | 3.6 min | shard 16 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `mfa-stepup.spec.ts` | 28 | 2.5 min | webkit, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `sage-ad-page.spec.ts` | 30 | 2.3 min | webkit, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 1.9 min | smoke, shard 9 |
| `admin-services.spec.ts` | 10 | 1.9 min | shard 1 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 1.4 min | shard 4 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `house-style.spec.ts` | 18 | 1.2 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 1.0 min | shard 10 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 3 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.9 min | shard 3 |
| `ad-page-doors.spec.ts` | 90 | 0.8 min | shard 14, repeat |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 0.6 min | shard 9 |
| `settings.spec.ts` | 16 | 0.5 min | shard 1 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 15 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 15 |
| `shell-table-law.spec.ts` | 6 | 0.1 min | shard 2, repeat |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 62.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.7 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.5 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 58.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 53.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 53.7 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.6 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.5 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 46.4 s |
| `admin-monetisation.spec.ts` › MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark | desktop-1280 | 44.9 s |
| `admin-monetisation.spec.ts` › MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark | mobile-360 | 44.2 s |
| `admin-attributes-safety.spec.ts` › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does | desktop-1280 | 43.0 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | desktop-1280 | 42.9 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | mobile-360 | 42.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 42.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45494187853-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45494187853-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45494187853-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 3, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45494187853-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 40 (pool 4, fresh 36)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 37 user(s) owned by process 45494187853-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45494187853-local-5
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45494187853-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45494187853-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45494187853-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45494187853-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494187853-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45494187853-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 2, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45494187853-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45494187853-local-16
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

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

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — E: Unable to locate package fonts-unifont

```text
Step install-chromium-s-system-libraries: outcome failure
  Fetched 1650 kB in 0s (4330 kB/s)
  Reading package lists...
  Reading package lists...
  Building dependency tree...
  Reading state information...
  Package fonts-freefont-ttf is not available, but is referred to by another package.
  This may mean that the package is missing, has been obsoleted, or
  is only available from another source
  
  E: Unable to locate package fonts-unifont
  E: Unable to locate package xfonts-cyrillic
  E: Unable to locate package xfonts-scalable
  E: Unable to locate package fonts-ipafont-gothic
  E: Unable to locate package fonts-wqy-zenhei
  E: Unable to locate package fonts-tlwg-loma-otf
  E: Package 'fonts-freefont-ttf' has no installation candidate
  Failed to install browser dependencies
  Error: Installation process exited with code: 100
  ::error title=ci-mirror::the install failed (exit 1) after apt's fetch stage — final, never run twice (DEC-276)
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium failed with exit 1 on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```

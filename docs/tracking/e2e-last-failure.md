# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33552467495
- Commit: `55fc04b20ce40091834846f6cc2fcebc54676f68`
- Attempt: 1
- Written (UTC): 2026-09-01T20:04:16.833Z
- Passed: 365 · Skipped: 69 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [INC-119] the Data bulk bar reported 0 untranslated for zxx-mo while the universe is non-empty
[INC-119] stats: state=pending lang=zxx-mo rows=0 untranslated=unknown total=unknown error=
[INC-119] bulk bar: text="Translating…" countState=pending
[INC-119] first rows: (none rendered)
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxx-mo?scope=data
[INC-112] testids: strings-coverage=1 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
  ["auth-derived","admin","translations","languages"] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","stats","zxx-mo"] status=success error=none dataUpdatedAt=1788292981826 dataLength=1
  ["auth-derived","admin","translations","my-scope"] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","rows",{"lang":"zxx-mo","status":"all","search":"","limit":25,"offset":0,"orphaned":false}] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","entity-rows",{"lang":"zxx-mo","status":"all","search":"","limit":25,"offset":0}] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","entity-stats","zxx-mo"] status=pending error=none dataUpdatedAt=0 dataLength=null
```

Context:

```text
          - listitem [ref=e462]:
            - generic [ref=e463]: About
          - listitem [ref=e464]:
            - generic [ref=e465]: How it works
      - navigation "Help" [ref=e466]:
        - heading "Help" [level=2] [ref=e467]
        - list [ref=e468]:
          - listitem [ref=e469]:
            - generic [ref=e470]: Safety
          - listitem [ref=e471]:
            - generic [ref=e472]: Contact
      - navigation "Legal" [ref=e473]:
        - heading "Legal" [level=2] [ref=e474]
        - list [ref=e475]:
          - listitem [ref=e476]:
            - generic [ref=e477]: Terms
          - listitem [ref=e478]:
            - generic [ref=e479]: Privacy
    - paragraph [ref=e481]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: [INC-119] the Data bulk bar reported 0 untranslated for zxx-de while the universe is non-empty
[INC-119] stats: state=pending lang=zxx-de rows=0 untranslated=unknown total=unknown error=
[INC-119] bulk bar: text="Translating…" countState=success
[INC-119] first rows: (none rendered)
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxx-de?scope=data
[INC-112] testids: strings-coverage=1 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
  ["auth-derived","admin","translations","languages"] status=success error=none dataUpdatedAt=1788292960573 dataLength=14
  ["auth-derived","admin","translations","stats","zxx-de"] status=success error=none dataUpdatedAt=1788292960542 dataLength=1
  ["auth-derived","admin","translations","my-scope"] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","rows",{"lang":"zxx-de","status":"all","search":"","limit":25,"offset":0,"orphaned":false}] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","entity-rows",{"lang":"zxx-de","status":"all","search":"","limit":25,"offset":0}] status=success error=none dataUpdatedAt=1788292960615 dataLength=keys:2
  ["auth-derived","admin","translations","entity-stats","zxx-de"] status=success error=none dataUpdatedAt=1788292960590 dataLength=1
```

Context:

```text
          - listitem [ref=e686]:
            - generic [ref=e687]: About
          - listitem [ref=e688]:
            - generic [ref=e689]: How it works
      - navigation "Help" [ref=e690]:
        - heading "Help" [level=2] [ref=e691]
        - list [ref=e692]:
          - listitem [ref=e693]:
            - generic [ref=e694]: Safety
          - listitem [ref=e695]:
            - generic [ref=e696]: Contact
      - navigation "Legal" [ref=e697]:
        - heading "Legal" [level=2] [ref=e698]
        - list [ref=e699]:
          - listitem [ref=e700]:
            - generic [ref=e701]: Terms
          - listitem [ref=e702]:
            - generic [ref=e703]: Privacy
    - paragraph [ref=e705]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [INC-119] the Data bulk bar reported 0 untranslated for zxx-de while the universe is non-empty
[INC-119] stats: state=pending lang=zxx-de rows=0 untranslated=unknown total=unknown error=
[INC-119] bulk bar: text="Translating…" countState=pending
[INC-119] first rows: (none rendered)
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxx-de?scope=data
[INC-112] testids: strings-coverage=1 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
  ["auth-derived","admin","translations","languages"] status=success error=none dataUpdatedAt=1788292902323 dataLength=14
  ["auth-derived","admin","translations","stats","zxx-de"] status=success error=none dataUpdatedAt=1788292902308 dataLength=1
  ["auth-derived","admin","translations","my-scope"] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","rows",{"lang":"zxx-de","status":"all","search":"","limit":25,"offset":0,"orphaned":false}] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","entity-rows",{"lang":"zxx-de","status":"all","search":"","limit":25,"offset":0}] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","entity-stats","zxx-de"] status=pending error=none dataUpdatedAt=0 dataLength=null
```

Context:

```text
          - listitem [ref=e686]:
            - generic [ref=e687]: About
          - listitem [ref=e688]:
            - generic [ref=e689]: How it works
      - navigation "Help" [ref=e690]:
        - heading "Help" [level=2] [ref=e691]
        - list [ref=e692]:
          - listitem [ref=e693]:
            - generic [ref=e694]: Safety
          - listitem [ref=e695]:
            - generic [ref=e696]: Contact
      - navigation "Legal" [ref=e697]:
        - heading "Legal" [level=2] [ref=e698]
        - list [ref=e699]:
          - listitem [ref=e700]:
            - generic [ref=e701]: Terms
          - listitem [ref=e702]:
            - generic [ref=e703]: Privacy
    - paragraph [ref=e705]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

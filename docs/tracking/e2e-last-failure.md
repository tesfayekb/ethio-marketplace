# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33961892408
- Commit: `98cb07f4ed004125e48716debb661ea0d383b7ea`
- Attempt: 1
- Written (UTC): 2026-09-05T11:06:19.666Z
- Passed: 403 · Skipped: 73 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-17 the "Before e2e-cat-1-1-mpa8tz" position option — CT-17 the "Before e2e-cat-1-1-mpa8tz" position option

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
[dialog-dump CT-17 CT-17 the "Before e2e-cat-1-1-mpa8tz" position option] open dialogs: category-edit-dialog opened-by=create-button
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: mobile drawer categories: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Construction Material",
+   "Travel & Accommodation",
+ ]
```

Context:

```text
          - link "ግብርና እና እርሻ" [ref=e345] [cursor=pointer]:
            - /url: /c/agriculture-farming
            - img [ref=e346]
            - generic [ref=e352]: ግብርና እና እርሻ
        - listitem [ref=e353]:
          - link "እንስሳት" [ref=e354] [cursor=pointer]:
            - /url: /c/pets-animals
            - img [ref=e355]
            - generic [ref=e359]: እንስሳት
        - listitem [ref=e360]:
          - link "ህጻናት እና ልጆች" [ref=e361] [cursor=pointer]:
            - /url: /c/babies-kids
            - img [ref=e362]
            - generic [ref=e365]: ህጻናት እና ልጆች
        - listitem [ref=e366]:
          - link "የንግድ መሳሪያዎች" [ref=e367] [cursor=pointer]:
            - /url: /c/commercial-equipment
            - img [ref=e368]
            - generic [ref=e370]: የንግድ መሳሪያዎች
```
```

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-17 the "Before e2e-cat-4-2-au5i80" position option — CT-17 the "Before e2e-cat-4-2-au5i80" position option

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
[dialog-dump CT-17 CT-17 the "Before e2e-cat-4-2-au5i80" position option] open dialogs: category-edit-dialog opened-by=create-button
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

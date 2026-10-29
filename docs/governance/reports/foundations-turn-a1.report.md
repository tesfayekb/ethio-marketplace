# Foundations turn A1 — report

CI line read: run 40809236156, commit c7bb093a, FAILURE (Component tests only; fixed in 4819f7cc, whose run had not completed when this turn ended).

- AGL-1 follow-up: done. docs/tracking/local-backend-proof.md is deleted; an AGL-1 allowlist line `names local-backend-proof.md` (reason, until 2026-12-31) holds the name. AGL-1 and AGL-2 read the one shared allowlist with every key the file can hold.
- Part A: done. `judgesPerson` is set on all seven tasks: name_check, writing_helper and photo_screen true; the other four false. GWC-10 is the census. AIV-1…8 pass, and each was shown red without the fix.
  - Finding for the ruling: when the identity check answers `unavailable`, the route already takes D158's unchecked path. The name is saved and recorded `alias.unchecked`; it is not refused. The verdict is never acted on, but the name does change.
- Part B: done. `refused` (422/502/503) and `providerRefusal` are in answer.ts. The census found 20 `ok(…, {status})` calls: translate.ts 9, generate-image.ts 7, suggest-icon.ts 4. All are moved. RFL-1 refuses the form, proven on a planted file.
  - Changes the browser can see:
    - translate's failed scope read now answers readFailure's 500 with an incident, where it answered "internal error".
    - A provider's unusual 4xx (not 400/401/403/422/429) now answers 502 `modelCallFailed`.
  - Browser readers checked: translations-service.ts and category-images-service.ts. Both read `error` and the status, and are unchanged.
- Part C: done. A failed flag read-back answers `flagged: null, flagRead: "failed"`, logged. The browser reader keeps it null, and the bar shows the existing `admin.translations.strings.error` line with "?" in place of the count. A dedicated key needs approved EN/AM text. RFL-2 and RFL-3 pass.
  - Census of reads turned into numbers: none found. Siblings that drop a failed read into empty text: generate-image.ts :47 and :58, policy.ts :194.
- Part D: done. The hash covers the material as canonical JSON (AIA-2, shown red without the fix). `isDeadline` in upstream.ts replaces the copies at gemini.ts :98, photoroom.ts :75 and :83, and google-translate.ts :60 (four copies). AIA-1 and AIA-3 pass.
- Whole unit suite: 353 files; 2 failed. NH-1/2/3 fail because the sandbox lacks time-zone data (CI has it). CF-KIT-7 failed and was fixed, then re-run green with its file.
- K2 siblings:
  - browser deadline names in route-client.ts :154 and error-capture.ts :70 (client concern);
  - readFailure logs a PostgREST error object as "[object Object]";
  - RFL-1 is not yet named in register row 13.
- Files: the 34 from `git diff --name-only 5f2c5396` plus this report. Commit: the platform commits at turn end.

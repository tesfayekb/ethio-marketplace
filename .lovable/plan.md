# Bundle 10c plan — failed select choices and the translations console's last failure states

Base `lovable/next` = dev `996b9b2e3` (HEAD read at that commit). Plan only; nothing changed.

## 1. Today, per file (four states)

| File | Loading | Failed | Empty | Ready | Own tests |
|---|---|---|---|---|---|
| `components/forms/field-select.tsx` | disabled trigger, `loadingLabel` as placeholder, wrapper `role=status` + `statusTestId` | same disabled trigger, `failedLabel`, wrapper `role=alert`; **no Retry, no reason** | list opens, `prim.filter.none` | SelectList | `field-select.test.tsx` FSL-U1, FSL-U2 (loading/failed); `select-list-loading.test.tsx` |
| `translations/language-picker.tsx:51-55` | `add.pickLoading`, id `translations-add-picker-loading` | `add.pickError`, id `translations-add-picker-error`, no Retry | none list | choices | `language-picker.test.tsx` LP-U1 (+ :35 disabled case) |
| `translations/translator-card.tsx:128-141` | `translations.loading` | scope fail → `translator.checkError` (id `translator-check-error`); languages fail → `translations.error`, **no test id**; no Retry | caption `translator.none`, no select | multi select | `translator-card.test.tsx` TL-U1..U3 |
| `translations/languages-page.tsx:1048-1050` | `add.countriesLoading` | `admin.countries.error`, no test id, no Retry | none list | countries | none for this field |
| `translations/ai-bulk-bar.tsx:236-245` | button text `ai.pending`, disabled | `strings.error` caption `ai-bulk-count-error`, no Retry, reason lost (`countState` carries no error) | disabled on 0 | count in label | `ai-bulk-bar.test.tsx` (untitled-id cases "pending", "error/missing", "believed zero") |
| `translations/delete-language-dialog.tsx:112-121` | `delete.countsLoading` | `delete.countsError` inside the `<p>`, no Retry | n/a | counts sentence | none in folder; e2e `admin-translations-governance.spec.ts:1180,1210` reads `lang-delete-counts-{code}` visibility |

## 2. FieldSelect's failed state (primitive, once)

Props replace `state/loadingLabel/failedLabel/statusTestId`:
```text
read?: { isLoading: boolean; error: unknown; onRetry: () => void }   // absent = ready
subject?: ReactNode        // what failed, caller's words (existing keys)
statusTestId?: string      // kept: test-id contract
```
- Loading: disabled trigger, placeholder `prim.state.loading` (or the caller's `subject`-less loading words — see key note), wrapper `role=status`.
- Failed: trigger stays disabled with an empty placeholder (`prim.select.choose`); below the control, inside the Field (before hint/refusal line), `<FailureNotice size="line" error={read.error} onRetry={read.onRetry} subject={subject} testid={statusTestId ?? `${id}-error`} />`. Never a blank list, never a stale value.
- Empty/ready: unchanged.
- Callers to change: language-picker, translator-card, languages-page; admin-categories `category-form-fields.tsx:373` and `category-dialogs.tsx:608` and `routes/dev.style.tsx:626,636` pass no read today and need **no edit** (the prop is optional). `select-list-loading.test.tsx:77` checked; edit only if it uses `state`.
- Caller reads: `list` / `languages` / `countries` are TanStack queries — pass `{ isLoading, error, onRetry: () => void q.refetch() }`. translator-card has two reads: the failed one wins (scope first), Retry refetches only the failed read(s).

## 3. Count and dialog sentence

- **ai-bulk-bar**: add optional prop `countRead?: { error: unknown; onRetry: () => void }`. Error state draws `<FailureNotice size="line" testid="ai-bulk-count-error" subject={t("admin.translations.strings.error")} …/>`; the filtered count uses its own `filteredCount.error/refetch`. Needs callers `strings-page.tsx:385` and `data-scope.tsx:207` to pass the stats read's error and refetch — **two files not named in the task; listed for ruling**. `missing` (stats answered, language row absent) is not a failed read: keep its existing caption as is and report it as a finding rather than invent a Retry.
- **delete dialog**: the `<p data-testid="lang-delete-counts-{code}">` keeps loading and ready sentences; on failure it holds `<FailureNotice size="line" error={preview.error} onRetry={() => void preview.refetch()} subject={t("admin.translations.delete.countsError")} testid="lang-delete-counts-error-{code}"/>` (free id, grep-checked at build) inside the same paragraph slot, so the counts sentence replaces it when Retry succeeds. `!preview.data` after success is treated as server failure via `goneReading`-free path: drawn the same way with `reading` of kind server (no made-up Error).

## 4. Keys

None new expected: subjects reuse `admin.translations.add.pickError`, `admin.translations.translator.checkError`, `admin.translations.error`, `admin.countries.error`, `admin.translations.strings.error`, `admin.translations.delete.countsError`; reasons/Retry are the notice's `failure.*`. Loading words stay the callers' existing `pickLoading`, `translations.loading`, `countriesLoading` (loading keeps a `loadingLabel` prop). Subject English that says "try again" (`checkError`) duplicates the notice's Retry; kept as is unless the ruling sends a new key.

## 5. Tests and census

- FSL-U2 split: loading case unchanged; failed case asserts disabled trigger, the notice's `failure.*` words and a Retry that calls `onRetry` once (new FSL-U3).
- TL-U2: keeps `translator-check-error` role alert; adds Retry → scope read refetched.
- LP new LP-U2: failed list shows `translations-add-picker-error` with Retry refetching.
- ai-bulk-bar: existing error/missing case keeps assertions; new ABB-U1 error with Retry.
- delete dialog: new `delete-language-dialog.test.tsx` DLD-U1 failed counts → Retry → sentence.
- Census `ALLOW` lines removed (only these five): field-select, language-picker, translator-card, ai-bulk-bar, delete-language-dialog. languages-page has no line (it gets fixed via the primitive).
- All IDs grep-checked free before use.

## 6. Checks

`bash scripts/check-hardcoded-strings.sh`; `bun run i18n:usage` + `git diff --exit-code` on both maps; prettier and eslint on touched files; touched tests; `bunx vitest run src/components/shell src/components/forms scripts/conformance --maxWorkers=2`; `scripts/conformance/forms.test.ts`; final write-back of every outside path from `996b9b2e3`.

First download: FailureNotice is already in the shell's first download; no new chunk expected. Measured only if the sandbox can build.

## 7. Findings

- `ai-bulk-bar.tsx` does not use `countedLabel` (task's ":188 drawn by countedLabel"); `countedLabel` is used by `strings-page.tsx:156` and `data-scope.tsx:117`, which drop to a bare label when stats fail — a quiet state outside the census list.
- `ai-bulk-bar.tsx:236` receives `countState` without the read's error, so the reason cannot reach words without editing its two callers (section 3).
- `translator-card.tsx:141`: languages-read failure has no test id.
- `delete-language-dialog.tsx:114`: `!preview.data` after success is drawn as a failure.
- `field-select.tsx:52`: failed/loading pass `value=[]`, hiding the stored answer — kept (form never saves while disabled).

## Questions for ruling

1. May `strings-page.tsx` and `data-scope.tsx` (same folder, not named) pass the stats error + Retry to AiBulkBar?
2. Delete dialog failure test id `lang-delete-counts-error-{code}` acceptable?

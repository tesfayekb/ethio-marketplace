# Turn J-1 plan — INC-1002 (unusable name-check answers) and INC-1000 (silent job refusals)

Base dev 5dfe5234. Tier A. Plan only; nothing changed. Request sha256 339cca81…d12 (taken as given; step 0 of the build turn saves and proves it).

## 1. Part A — INC-1002

**Hypothesis: proven in part (sandbox parse, no provider call, no alias).** The committed `nameCheckOutput` was run against these answer shapes:

```text
{imitates:false, of:null}            -> REFUSED   (null is not string|undefined)
{imitates:false, of:"", reason:"x"}  -> REFUSED   (.strict(): extra key)
{imitates:false, of:""}              -> accepted
{imitates:false}                     -> accepted
{imitates:true, of:"Coca-Cola"}      -> accepted
```

The task's instruction asks for `{"imitates": boolean, "of": string}`. That pushes the model to fill `of` on a "false" answer, so `null` is a likely reply, and the task sends no `responseSchema` (tasks.ts :287–:310; gateway.ts :348 forwards `task.responseSchema`, which is undefined here). The gateway marks a non-JSON reply and a schema mismatch with the same `unusableAnswer` code (gateway.ts JSON.parse catch and `safeParse` branch). So the 42 rows alone cannot say which of the two happened. The `null` or extra-key cause is the most likely one and is not proven. The build turn makes it observable: the gateway's existing log line gets a content-free sub-reason `parse | shape` (never the text). The first production row after the fix confirms or refutes it.

**Mechanism (G0, extended, not a new one):** the task's `output` (zod) stays the single source. A helper `providerSchemaOf(output)` in `src/server/ai/response-schema.ts` derives the Gemini `responseSchema` (OBJECT/STRING/BOOLEAN/ARRAY, `required` = the non-optional keys, `nullable` never emitted). `defineTask` fills `responseSchema` for every `gemini-text` task whose `output` is a zod object, so the two cannot drift. The hand-written schemas of category_icon and photo_screen are replaced by the derived ones. The derived output must equal today's literal byte for byte, and a unit test asserts that, so their behaviour does not change.

**Consumers:** every `gemini-text` task: name_check, category_icon, writing_helper, photo_screen. writing_helper's output uses `transform/pipe`. The helper reads the input side of the schema, and if any task's output cannot be derived, the build turn STOPs and names that task. It never falls back silently.

**`of` and null:** yes. `of` becomes `z.string().trim().max(80).nullish().transform(v => v ?? undefined)`, so null is read as absent and the stored value keeps today's shape. The instruction changes to `"of": string, only when imitates is true`. `.strict()` stays: an extra key is still unusable, because the response schema now forbids it.

**Cap (N = 5):** after 5 consecutive unusable answers for the same text, the name stops being asked and goes to staff:
- `name_checks.state` gains `'needs_review'`. The CHECK is widened by a migration.
- The catch-up job's pick (`state = 'unchecked'`) skips it.
- Admin › Screening's queue lists it beside 'imitates', with its existing Clear action. `admin_name_check_clear` accepts 'needs_review'.
- An owner's new name resets the row to 'unchecked' through the existing trigger path.
- The seller line treats needs_review as under_review. That is the same rule as 'imitates' (INC-986): no auto-publish of an unproven name.
- `name_check_mark` gets a new verdict `'unusable'`. It counts `unusable_streak`, a new column. At 5 it moves the row to 'needs_review'. A clean or imitates verdict resets the count. `'unavailable'` (provider down) does not count: an outage is not an unusable answer.

The three stuck production aliases have attempts = 14, and those are not unusable streaks recorded under the new rule. They remain 'unchecked' and are asked again with the response schema. If they come back unusable 5 more times, they move to needs_review.

**Guard:** `scripts/conformance/ai-response-schema.test.ts` (kit census). It fails when a `gemini-text` task with a JSON object output reaches the gateway without a `responseSchema`, or with one that differs from `providerSchemaOf(output)`. Proven on a planted task in `planted-proofs`. No allowlist lines are expected; wired.test.ts names its caller.

## 2. Part B — INC-1000

**Reason lines (route; the client keeps DEC-285's one constant 401):** `verifyJobSignature` returns a typed result `{ok, ts} | {ok:false, reason: "secret_missing" | "bad_signature" | "stale"}` instead of `null`. `job_run_claim`'s `refused:` error is mapped to `replay`. The route logs exactly one line per refusal, `[job-refused] <job> <reason>`. It never logs a secret, signature, timestamp or header. The 401 body is unchanged. A unit test asserts that the line holds no input bytes.

**Closing stale 'dispatched' rows (SQL, in `job_call`):** before it inserts the new 'dispatched' row, `job_call` closes the same job's older rows that are still 'dispatched', unclaimed and older than the claim window. It sets `outcome = 'lost'`, `reason = 'never_claimed'` and `finished_at = now()`. The outcome CHECK gains `'lost'`. The route cannot do this, because a refused call never reaches the database. Admin › Screening's health line reads it through `admin_job_health` → `job_health_core` (`last.outcome`). use-name-checks.ts :145/:160 add `lost` to the outcome set and the key `admin.screening.job.outcome.lost` (EN+AM from the brief, copied by key). The two 19:15Z/19:30Z rows close on the next run after the apply. The route cannot tell why a call was lost (refused or timed out) and does not record a reason it does not know. The refusal reason lives in the `[job-refused]` log line.

## 3. Migration: yes, one

- `name_checks`: CHECK widened with `'needs_review'`; `unusable_streak int NOT NULL DEFAULT 0`.
- `name_check_mark`: re-declared whole from the live definition, with the `'unusable'` verdict and the cap at 5. The catch-up pick and `admin_name_check_clear` are re-declared whole for 'needs_review'. The same goes for the queue reader and the seller line, if their bodies name states.
- `job_runs` outcome CHECK gains `'lost'`; `job_call` is re-declared whole with the close-stale step.
- Closers: REVOKE PUBLIC, anon · grants as today · read-back of definitions and ACLs · self-mark.
- Proofs, scratch rows only, behaviour only:
  - NCAP-1: 4 unusable → still unchecked; the 5th → needs_review.
  - NCAP-2: unavailable does not count.
  - NCAP-3: clean resets the streak.
  - NCAP-4: the catch-up pick skips needs_review.
  - NCAP-5: staff Clear works on needs_review.
  - NCAP-6: a new name resets to unchecked with streak 0.
  - JLOST-1: an old unclaimed dispatched row becomes 'lost'.
  - JLOST-2: a fresh dispatched row and a claimed row are untouched.
  - JLOST-3: another job's row is untouched.
- Rows typed through server code: the gateway wiring maps `unusableAnswer` to the `'unusable'` verdict in the name-check job.

## 4. Tests (ids grep-checked free on 5dfe5234: 0 hits each)

- Unit:
  - AIRS-1…4: helper derivation; equality with today's two literal schemas; name_check gets one; null `of` reads as absent.
  - JRF-1…5: each refusal reason and its single line; no value leaks; the 401 body is constant.
  - JRL-1: `lost` renders on the health line.
- Conformance: the ai-response-schema census, plus its planted proof.
- Migration proofs: NCAP-1…6, JLOST-1…3 (grep-checked free before writing).
- E2E: none is added. The queue's needs_review row is covered by the existing admin-screening spec only if the brief adds it to scope. That spec would run through `bun run e2e:local`.

## 5. Conflicts

- `.strict()` and the "null as absent" reading: none. The transform keeps the stored shape.
- K4/D2: the new key ships EN+AM from the brief's strings. I write no Amharic of my own, so the brief must carry the text.
- Platform: none. The migration goes through the migration tool, applied only when told.
- One open choice for the supervisor: N = 5, and 'needs_review' as a new state rather than reusing 'imitates'. Reusing 'imitates' would falsely accuse a seller, so a new state is proposed.

## 6. K2

- writing_helper and every future `gemini-text` task are brought under the census, not left as siblings.
- Other providers (`gemini-image`, `photoroom-segment`, `google-translate`) answer binary or text, not JSON, so they are out of scope and named.
- Other signed job routes: only `jobs.$job.ts` exists, so there is no other refusal site.
- `job_health_core` already flags `dispatched_unclaimed`. It stays, and becomes rarer once rows close.

## 7. Sizing

One turn fits: one migration, about 8 source files, 2 test files, 1 census. ESTIMATE: about 6 h, band M (4–9 h). The risk is writing_helper's derivation. If it cannot be derived, the turn STOPs.

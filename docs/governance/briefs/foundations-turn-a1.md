# Foundations turn A1 — brief

```text
FOUNDATIONS — TURN A1: THE AI GATEWAY'S FOLLOW-UPS (2026-10-29; G0, G54 b, G60). Base: dev 4819f7cc. Tier A (a verdict about a person; an admin read of the AI audit). Lovable. BUILD, against the approved plan (.lovable/plan.md at 5f2c5396) and the ruling that carries this brief.

HOW TO WORK
- CI FIRST (Knowledge A0; AGENTS.md): every turn starts by reading the last COMPLETED CI run at the raw ci-evidence addresses (ci-status.md, guards-last-failure.md, e2e-last-failure.md, local-backend-proof.md). Any red is fixed first, at its root, then the work continues. Never end a turn just to wait for CI. Every report opens with that CI line.
- Knowledge K1–K6 bind: one mechanism per concern; the K2 sibling list in every report; a guard lands with its mechanism; no literal language, country or role codes; every AI call goes through the one gateway; every route parses through the shared schema helper.
- Tests: the whole unit suite (`bun run test:unit`) passes before the turn ends, not only the touched files (the D1 lesson, 2026-10-29). The in-turn E2E run covers the spec files changed or added (each file whole, both projects, 0 retries).
- Migrations (if the plan needs one): G39 in full. The proofs create every row they read and roll back whole (INC-970). The closers go in the file. The mark is chosen at apply time. The report gives "apply <fragment> → expect mark <value>".
- No weakened proof: no assertion loosened, and no timeout raised without a named cause.

THE SYSTEM (G0) — five concerns, each on the mechanism that already exists (register rows 11 and 12, docs/governance/mechanisms.md).

PART A — CONCERN: an AI verdict about a person is acted on only once its audit row is written (INC-952, DEC-280).
  MECHANISM: aiCall in src/server/ai/gateway.ts (the audit write recordAiCall at :390) and the task registry src/server/ai/tasks.ts.
  BEHAVIOUR: the registry marks, per task, whether it judges a person. DEC-280 names two: the identity imitation check (name_check) and the assist's screening. The plan lists EVERY task in tasks.ts with a proposed mark and its reason (photo_screen, writing_helper, background_removal, category_icons, category_image and translation included); the supervisor rules the list. For a marked task, when the ai_calls row cannot be written, the gateway answers `unavailable`, never the verdict, and the caller shows its existing "try again later" refusal. Unmarked tasks stay best-effort, as today.
  PROOF: a test per marked task with the audit write failing: the answer is `unavailable`, and the refused side effect did not happen (no verdict stored, no listing or name change, no dial spent beyond what the gateway's order already spends; G38 addendum). A conformance check fails if a task in tasks.ts has no mark (GWC census extended, or a new id; ids grep-checked free).

PART B — CONCERN: a route's refusal answer has one worded shape (INC-886).
  MECHANISM: src/server/answer.ts.
  BEHAVIOUR: answer.ts gains worded refusals for 422, 502 and 503. translate.ts, suggest-icon.ts and generate-image.ts stop answering `ok({ error }, { status })`. The plan's census finds every route that answers a refusal with ok(...) by the concern's definition, across src/routes, not only these three files.

PART C — CONCERN: a failed read is never reported as zero (INC-885).
  MECHANISM: readFailure in src/server/answer.ts.
  BEHAVIOUR: translate.ts's flag read-back (admin_list_translations) goes through readFailure. A failed read is a typed failure, never `flagged: 0`. The census lists every other read in src/server and src/routes/api that turns a failed read into a number.

PART D — CONCERN: the AI audit row tells inputs apart (INC-887), and an outside call's deadline is classified once (INC-888).
  MECHANISMS: aiCall's audit hash (gateway.ts); src/server/upstream.ts.
  BEHAVIOUR: the audit hash covers the task's material, so a field-less task (translation) hashes what it was asked, not empty text. upstream.ts exports one deadline classification. gemini.ts, photoroom.ts and google-translate.ts use it, and the plan names every copy, four today by INC-888.

PART E moves to turn A2 (its own turn, with its migration), by the plan's recommendation.

FIVE LENSES — security: A closes a verdict acted on without audit (OWASP LLM Top 10, LLM09/LLM05 audit trail); E is read-only, gated, with no prompt text. Performance: A adds nothing on the success path; E's door is paginated and indexed. Failure modes: an audit write failure → `unavailable` (marked tasks) or best-effort (others), typed and logged; a deadline is classified once. Consistency: one refusal shape, one read-failure shape, one deadline classifier. Future growth: a new AI task declares its person-mark in the registry, and the census refuses a task without one.
FORWARD-SCAN: Stage 2's screening judge is a task that judges a person → marked from birth. REGISTER: rows 11 and 12 extended, no new row.

REPORT: it opens with the CI line read. Then each part done or not done; the whole unit suite count; the K2 sibling list; every census list (refusals sent through ok, reads turned into numbers, deadline copies); the files from git diff --name-only 5f2c5396; and the commit.
```

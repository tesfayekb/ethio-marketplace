# Handoff — Translation era close (S33) · 2026-09-02

**For the successor supervisor. The repo is the record; this accelerates the §2 ritual, never replaces it.**

## State

HEAD (dev) green 24/24 at the S33 import; "last E2E run passed"; nightly green incl. cloudflare parity; main = promote-on-green (steady-state lag is [skip ci] tracking only — count with %h %s, not bare %h: a bare-hash grep for "skip ci" matches nothing and fabricates lag, a logged S33 slip). Staging mark ledger max at the S33 import: 20260902141500. Prod is the human-testing surface; staging is the automated suite's database only (Ethereal SMTP sink account carolanne.abernathy@ethereal.email — EPHEMERAL, expect expiry ⇒ 535s in the email job ⇒ mint a new account, update staging SMTP).

## How to operate (the short form; law lives in Claude instructions v1.8 + Knowledge v3.6)

1. Session start: clone dev fresh (`git clone --branch dev https://github.com/tesfayekb/ethio-marketplace.git`), read system-state → newest handoff → ledger tail → changelog tail → `git log --oneline -10`; state HEAD/phase/last/next; get confirmation.
2. Evidence before rulings (G21/G3): docs/tracking/e2e-last-failure.md is the brief (per-source bodies, [ssr-error]/[client-error] greps, Attempt line, quarantine labels, flake ledger); nightly-last-failure.md for the serial run; ci-status.md with the two-step SHA check (mismatch = STALE, wait and re-read — G18). Gitleaks is the one uncovered job (operator pastes). The GitHub API is unauthenticated-only from the sandbox and rate-limited — the repo files are the channel.
3. Prompts: inline, one fenced block between --- rules, copy-paste ready; scope list · census-before-build · verbatim content where exactness matters · anti-patterns · completion-report requirements incl. apply-pairing ("apply <uuid-fragment> → expect mark <value>") and the J-audit line for e2e-touching work; one prompt in flight; Tier A never closes on "tests passed" — proofs + read-backs.
4. Operator turns: lead with the decision/action; numbered steps when multiple systems; walks written click-by-click with a "✅ you should see" line per step (the operator asked for this explicitly).
5. Fix philosophy: root cause + a law (INC → class rule at 2nd occurrence → guard at 3rd), instrument so the next failure names itself (dumps, phases, budgets < test budget), and prefer last-known-good restores over serial rewrites of core Tier A files (the use-auth saga). Executor corrections outrank supervisor inference (G3 addendum — three overturned rulings forged it).

## What this era proved (read INC-092→126b for mechanisms)

Identity axes run×shard×worker×project×test; fences per project, one project mutates global lists; seed-before-navigate; per-key DB truth over aggregates; locale-free structural anchors; auth callbacks never touch Supabase (I5) and gate lists bypass the auth lock via raw no-store anon fetch (I6 — and PostgREST treats query params as filters); totality gates define the empty set; list RPCs ship EXPLAIN+index; imports are idempotent server-side and batch-undoable; step-up owns the top layer; DataTable owns responsive density (C7).

## Open items (owners)

Operator: install Knowledge v3.6 C7 if not yet; keep Ethereal creds in the password manager. Supervisor-next: S34 U5 spec session per roadmap.md §Next-1 (forward-scan the ledger REQs; apex-marketplace is the approved reference for taxonomy/attributes); then ACT-U4-4/7 as early riders. Executor: nothing in flight.

## First moves for the U5 thread

Ritual → confirm → draft the U5 Pass-2 spec (taxonomy import from apex ~112 leaf categories + icons + attributes; location tree + diaspora seed; admin consoles on DataTable/C7; entity_translations consumption; name_am column retirement plan) → forward-scan → operator approval → A1 execution prompt.

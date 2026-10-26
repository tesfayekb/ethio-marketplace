STOP — turn 32b part D: D1's planted proof needs src/components/app-shell.tsx, which is outside SCOPE
DONE: Part A, STEP 0, parts B, C; part D's EDIT (D1) committed — D1's planted proof not run
LEFT: part D's proof (D1), part E, THE CHECKS, THE END-TO-END CHECK, the completion report
CI: (the newest completed run on ci-evidence is for c38e953, not BASE fe0ceee — STALE; the run on BASE had not reported at Part A nor before Part D)
# CI Status (auto-generated — do not edit by hand)

- Commit: `c38e953557b995369ab117cc12961d45f3981266` (short `c38e953`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T01:57:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40255222082
FILES:
docs/governance/briefs/foundations-turn-32b.md
roadmap.md
scripts/check-marketplace-imports.mjs
src/components/ui/modal-facade.test.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/ui/overlay-facade.tsx

## The conflict

D1's proof says: "add the line `import "vaul";` as the first line of src/components/app-shell.tsx and
run `node scripts/check-marketplace-imports.mjs`". src/components/app-shell.tsx is not in the brief's
SCOPE block nor in its "THE FILES" list, and the editing tool's scope guard refused the plant:

    SCOPE GUARD (.claude/hooks/scope-guard.ts): src/components/app-shell.tsx is outside the brief's
    SCOPE (docs/governance/briefs/foundations-turn-32b.md). Law A1: a file the task needs but did not
    name is a STOP — report the file and why it is needed, and wait for a ruling.

The rules I quote: 00-executor-protocol.md — "A file the task needs and the brief did not name is a
STOP naming the file and why … Do not work around a refusal (no shell redirection, no `git apply`, no
inline scripts)."; 50-security.md — "a refusal is final — do not look for another way to do the same
thing." The brief itself: "THE FILES: the SCOPE block above, plus … Anything else is a STOP naming the
file and why."

The file and why: src/components/app-shell.tsx — D1's planted, never-committed `import "vaul";`
(proving the weight guard's new FORBIDDEN entry fails the run), to be put back and checked against
BASE's sha256 e012aa149cee50292b97c1d70144f67824fb41036c9cefec0dcd894d9d8cab16.

The ruling asked for: either src/components/app-shell.tsx added to the turn's scope for the plant only,
or another planted proof the supervisor words.

## What stands at this stop (from commands run this turn)

- STEP 0: `sha256sum docs/governance/briefs/foundations-turn-32b.md` →
  dbffb3ff686d5943b5575033f9e1606339097850160eff6b46b7869ccdac119c (the carrying message's value).
- B3 red against BASE's overlay-facade.tsx (`git diff --quiet fe0ceee -- src/components/ui/overlay-facade.tsx` held):
  OVF-9 ✓, OVF-16 ✓, OVF-17 × `AssertionError: expected [ true ] to deeply equal [ true, false ]`,
  OVF-18 × `AssertionError: expected [] to deeply equal [ false ]` — `Tests  2 failed | 2 passed (4)`.
- After Part C: the four files (overlay-facade-failure, modal-facade, overlay-facade tests and
  scripts/conformance/overlays.test.ts) `Test Files  4 passed (4)`, `Tests  21 passed (21)` — OVF-1…18 and
  CF-OV-1…3 each ✓. `bun run typecheck` clean; `bun run lint` `✖ 39 problems (0 errors, 39 warnings)`.
- The brief's hash list, for the four SCOPE files: overlay-facade-failure.test.tsx OK, modal-facade.test.tsx OK,
  overlay-facade.tsx OK, check-marketplace-imports.mjs OK.
- Part D's guard with the edit: `node scripts/check-marketplace-imports.mjs` → `modules walked: 106`,
  `findings: 0`.
- A census note for the ruling (not a STOP of its own): the brief says vaul and cmdk have "no importer
  today"; `src/components/ui/drawer.tsx:2` imports vaul and `src/components/ui/command.tsx:5` imports cmdk,
  and nothing in src/, e2e/ or scripts/ imports either wrapper (grep for `ui/(drawer|command)` and
  `./(drawer|command)`: no hit) — so neither package reaches any page today.
- Commits: 3a49feb (step 0), e0354a3 (parts B–C), 3bc4a92 (part D's edit). The full unit suite, build,
  bundle check and format check run in land.ts before this lands; THE CHECKS proper and the E2E check
  wait for the end of the turn.

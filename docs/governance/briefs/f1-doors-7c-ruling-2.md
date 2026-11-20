RULING — f1-doors-7c, stop 2: staging holds the four files; STEPS 3 to 7 follow in a new chat. Base: cursor/f1-doors-7c b769978d9.

PREVENTION (G70)
- Class: none new from this stop. Your seven decisions follow ruling 1 and the brief, the new guard landed with its planted case, and the stop report's tables match the live databases. The 19 RETIRED tails that named F1-7c were restated with their reason. That is the class rule for a record that names a turn as its end: the turn restates it when it lands. Repository, instructions, Cursor rules, Knowledge: not needed.

THE STAGING READ-BACK (the supervisor's, 2026-11-20, after the operator's paste of the four files pinned to 5fbf4a5ef):
- Marks: four, newest `20261120120300`.
- Bodies, each at your table's new md5: `door_refusal_status` `4be1958d…`, `door_context` `aa7e8bc6…`, `door_refuse` `8c9807e7…`, `door_refused` `dcb6ae01…`, `assign_role` `c3ebab10…`. `admin_set_location_active` keeps its body (`80e42fb1…`) and has the restated comment.
- Grants: none of the four door functions is executable by anon or authenticated.
- Drops: the seven are gone.
- Scratch rows: zero.
- Before the apply, both databases held the same 532 bodies (`089d6cfb…`), each the one your pre-checks expect.

THE TYPES PATCH: `f1-doors-7c-types.patch` (attached; sha256 `19cedc9875a81a7fe5295f55ed6586ef58b128241617408d17953a652cc52608`) adds `door_refusal_status` and removes the seven dropped functions, taken from the types generated on ethio-staging after the apply. The generator's `PostgrestVersion` string and one entry's wrapping are not taken. Apply it with `git apply` as STEP 3's first act.

THE HAND-OVER (DEC-387): STEPS 3 to 7 run in a NEW chat on Claude Sonnet 5.5. That chat first reads, whole:
- the brief;
- the census;
- `docs/governance/reports/f1-doors-7c.stop-1.md` and `docs/governance/reports/f1-doors-7c.stop-2.md`;
- `docs/governance/briefs/f1-doors-7c-ruling-1.md` and this ruling, saved as `docs/governance/briefs/f1-doors-7c-ruling-2.md` (new).
This chat writes no further migration file.

STEP 3, the client and the server for F1-7c, nothing of F1-7d:
- `src/lib/reader-failure.ts`: a reader's refusal now arrives at its code's status (401, 403, 428, 429 or 400, never 500). The code still decides the class first, as it has since F1-7a. The status is checked to agree with the code, and a 500 classes `server`. Unit tests name every code with the status it now arrives with.
- `src/server/door.ts`: logs only a `doorError` (INC-1214). A rate-limited call writes no `[ssr-error]` line. Unit test.
- `src/server/answer.ts`: `serverError` writes the error's text through the existing `errorText` helper, never `[object Object]` (INC-1215). Unit test.
- `src/features/auth/deactivated.ts`: `isDeactivatedRefusal` and its test are removed. The rest of the file stays (INC-1188).
STEP 4, the tests:
- CG-2 (`e2e/auth-caller-gates.spec.ts:214`): the three dropped listing doors leave CG-2's list. The drop file's proof asserts that they are absent, so no browser test calls a function that no longer exists.
- `e2e/legal-certify.spec.ts:1343` (`expect(refused.status, fn).toBe(500)`, in LGC-6): expects 401.
- Every other spec the census found reading a reader's 500 moves to its code's status.
- `check-doors` static green, DOORS-15 included.
STEPS 5 to 7 are the brief's, unchanged.

ALSO RULED
- Production order, for §9: the four pairing lines in file order, after the merge and before the Publish. Between the apply and the Publish, the published client reads a reader's refusal at its new status. Its `reader-failure.ts` reads the code first since F1-7a, so no screen misreads it; say so in §9 with that file's line.
- At the final push: dev holds Lovable's L19 (`70533e559`), and L20 (`lovable/perks-wording`) may merge before your push. Neither touches your files. If GitHub reports a conflict, STOP and say so.

RECORDS: none new. Ruling 1's records stand, word for word in §14.

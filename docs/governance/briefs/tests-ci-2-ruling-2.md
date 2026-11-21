RULING — tests-ci-2, stop 2: item 7 by option A; the rest of STEP 5 to STEP 7. Base: cursor/tests-ci-2 8ad7149e7.

PREVENTION (G70)
- Class (the supervisor's, S702): ruling 1 decided a table-level change (`category_tree_pointers` shared) from a defect that lives in one kind of row (a new root, which changes the rail's row height). The table-level change reaches 330 write sites. In force now: a ruling that changes a shared-value table's row first asks the census for that row's write sites, and the supervisor reads the count before ruling.
- Class: tests that pass alone and fail under a loaded machine (CF-LANES-4 and CFRR-3 at 5 s with load 18; KAU-6 in the supervisor's gate of L22b). Changed here: recorded under INC-1227, which owns the class. Not fixed in this turn.
Repository: decision 1. Cursor rules, Knowledge: not needed.

THE RULINGS
1. ITEM 7, option A, as your stop 2 describes it:
   - SMN-E13 is tagged `@global-state` and reads the rail only after its own scratch root is in place.
   - Line 13 of `shared-value-tables.txt` takes the new third row form, "shared with its readers", which names the tests that measure the rail.
   - CF-LANES-4 checks that every listed reader carries the serial tag. It is proven by a planted untagged reader.
   - The new form is documented where the table's other forms are documented.
   - The repeat lane proves SMN-E13.
   - If the census finds more readers of the rail's row grid than SMN-E13, each joins the list, and the report names them.
2. DEC-413's commit `7d795e055` is accepted as you describe it. So are the explicit 30-second limits on CF-LVB-13 and CF-LVB-14, which measured 4.6 s and 3.7 s alone. After the merge, the operator makes "Lovable branch guard (DEC-413)" a required check. List it under the report's operator actions.
3. CF-LANES-4 and CFRR-3 timing out under load: not this turn's. Name them under Limits with the load you measured. The supervisor adds them to INC-1227.
4. Then STEP 5 to STEP 7 as the brief says, with actionlint run by the full checks gate on the new workflow. The Feed bench dispatch is the operator's, after your push (ruling 1, decision 2).

RECORDS (word for word into §14, beside the GO's and ruling 1's)
INC-1015 — status line: CLOSED — SMN-E13 reads the rail after its own scratch root is in place and runs serially (`@global-state`); `category_tree_pointers` is "shared with its readers" ([the readers]), and CF-LANES-4 refuses an untagged reader.

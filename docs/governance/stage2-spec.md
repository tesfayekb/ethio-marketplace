# Stage 2 spec — automatic screening (v1, approved 2026-11-23, DEC-458)

The operator approved this spec on 2026-11-23 (DEC-458, block S93). This file is the supervisor's Claude Doc exported whole at its revision 16 (2026-11-25) and landed at records turn R18; it is the spec Stage 2's bundles are built from. Its decisions are DEC-440 → DEC-458 in docs/spec/spec-ledger.md. The numbers that would help someone game the screening — the AI's pass marks with their ceilings, and the counts and periods that move a seller's standing — are left out of this public copy (the repository is public until launch); they stay in the supervisor's private copy and, once built, in the staff-only dials table.

## What you are approving

This spec turns the review of 23 November and your answers into what gets built. Approved by you on 23 November 2026, 11:54 New York (DEC-458), with every choice listed under Open points. Base: dev `92fee7d1a`.

### After your switch

1. Every new ad and every edit is judged by AI. The seller sees the result in seconds.
2. An ad the first AI finds nothing in goes live at once.
3. An ad the first AI flags, or is unsure about, is hidden until the second AI passes it. If the second AI does not pass it, it is refused. Nothing an AI flagged goes live by waiting (DEC-446).
4. A severe flag hides the ad until a person releases it.
5. A refused seller reads our own fixed wording for each reason, in their language, with a **Fix it** button and one appeal (DEC-440).
6. Staff decide nothing in the normal flow. They release severe cases, hear second appeals, and read a sample afterwards (DEC-450).

### Until your switch

Everything is built and tested while staff still decide every ad, exactly as today. The switch is one control in admin, and you use it only when the numbers meet the bar you froze (DEC-444).

### The decisions it rests on

| Decision | What it says |
| --- | --- |
| REQ-021 | One screening gateway for everything a person enters |
| DEC-145 | Automatic from the first ad; a stronger second layer; people as the exception |
| DEC-149 | The judge reads the original; the ad's text is translated in the same call; screening never switches off |
| D166 | What a person wrote is material, never an instruction |
| DEC-440 to DEC-450 | Your answers of 23 November |

The design of 17 September (`docs/governance/moderation-design.md`) stands where these decisions do not change it.

### Not in this spec

Private messages (decided when messaging is designed), reviews and replies (their own stage, on this same pipeline), the chat assistant, and anything about payments.

## The system

**The concern.** Anything a person enters that another person can see is judged the same way before it is seen.

### The mechanisms

Two exist and are extended. One is new.

| Mechanism | Where | State |
| --- | --- | --- |
| Every AI call | `aiCall` in `src/server/ai/gateway.ts`, with the quoting rule in `src/lib/untrusted-text.ts` (register rows 11 and 12) | Exists. Gains the judge's jobs and a typed answer for a provider block (INC-1270). |
| An ad's states | `transition_listing_core` in the database. Its own words: "only these roles may put a listing in front of a visitor" — the gateway or a reviewer. | Exists. Gains one law: the gateway's move needs a verdict for exactly this content. |
| The screening pipeline | Queue, rules check, two judges, decision, record | **None yet.** Built first, to the OWASP Top 10 for AI applications (2025) and the UK cyber security centre's guidance. |

### Every consumer today

Read in the code at the base. The first bundle's census lists them again by definition: every door that stores a person's free text or file.

| What a person enters | Its door today | Uses the pipeline? |
| --- | --- | --- |
| A new ad | `publish_listing` sends it to `screening`; staff decide | No — moved in this stage |
| An edit | `edit_listing` sends the ad back to `screening` on every edit | No — moved in this stage |
| Photos | The photo check at upload, with its own review rows | Its own path — joined to the pipeline's record |
| Seller and business names | The name check, with a catch-up job | Its own path — kept, as a named exception (below) |
| Reports | `report_listing` stores the report; staff read it | No — a report starts a new judgement |
| Writing helper text | Goes to the person who asked | Not a consumer: the ad it becomes is judged at Publish |
| Reviews, replies, messages | Not built | Their own stages |

### The guard

`scripts/conformance/` gains a screening-hook census in the same bundle as the pipeline. It lists every door that stores a person's text or file and fails when one has no screening hook. It is proven on a planted door. Its allowlist lines carry a reason and an end date.

### Exceptions

One, recorded: the **name check** passes a name when the AI is unavailable and checks it later through its catch-up job and its staff queue. A name is short, blocks sign-up when held, and is already covered by the reserved-names list. Everything else fails closed.

### The five lenses

- **Security.** A fooled model can do no harm: no tools, least data, fixed answers, code decides, the database refuses the rest. Each refusal test also proves the refused thing did not happen.
- **Performance.** No public page's first download grows: the pipeline runs on the server. The seller's wait is one or two model calls.
- **Failure.** No answer, a bad answer, a spent budget or a provider block all leave the ad hidden and retried. Nothing passes unchecked.
- **Consistency.** One queue, one rules check, one policy list and one set of dials for every surface.
- **Growth.** A new surface is one row. A new language is a test set, its wording and a score. A new country is a column on the policy list. A new model is a dial.

## What people see

### The seller

1. **Publish.** The ad shows "Checking your ad" for a few seconds. Nobody else sees it meanwhile.
2. **Passed.** The ad is live. Its text is also shown in the other site languages, marked "Translated automatically · See original" (DEC-149).
3. **Needs edits.** The ad is not live. Each reason is our own sentence in the seller's language, with a one-line "how to fix it" and a **Fix it** button that opens the edit form at the right box. Saving sends it through the check again.
4. **Refused for a rule.** The same notice, plus who decided (automatic), the rule, and one **appeal**: the seller writes one sentence, and the second AI reads the ad again with it. If the appeal fails, the seller may ask once for a person.
5. **Severe.** The ad is hidden and the seller is told it is under review by a person. Posting is paused until that person decides.
6. **Edits.** An edit takes the ad out of view for the seconds the check takes, as an edit does today. An edit that changes nothing the judge reads keeps its pass and stays live.
7. **Over the free limit.** The ad stays a draft with the reason and the date a place frees. It is never refused for that.

A public page, **Why an ad is refused**, lists every reason with its fix, in every site language. It is generated from the same policy list the judge uses, so the two cannot drift apart.

### The reader

- Sees only what has passed.
- Reads ad text in their own language, with the original one tap away. The original governs.
- Can report an ad with a reason, as today. A report starts a new judgement of the ad with the report as context. A report alone never removes an ad.

### The staff member

- Does not approve ads. The Screening queue becomes the exceptions page: severe cases, second appeals and legal removal requests.
- Reads decisions afterwards from a list (DEC-450): for the first 500 ads every refusal, every case where the two AIs disagreed, and 1 in 5 approvals; then 50 a week. Each is marked right or wrong. A wrong one is corrected there.
- If the sample finds a wrongly approved ad, every approval is read for the next 100 ads.
- Sees the original text with the English beside it, the policy codes, and the piece of the seller's text each code points at.
- Has one area, Admin › AI and safety, for switches, budgets, dials, the policy list, the decision log and the emergency stop.

## The pipeline

### The steps

1. **Intake.** The publish and edit doors create one job in the same transaction as the save, keyed by the ad and a fingerprint of everything the judge reads. The same fingerprint is never judged twice.
2. **Rules check, with no AI.** It refuses or parks at no cost:
   - text over its length, or empty;
   - contact details outside the contact fields ("Needs edits");
   - a photo that matches one from an ad we removed;
   - the same seller posting the same title in the same category within 24 hours (a warning, not a refusal);
   - a seller over the posting limit (the ad stays a draft).

   It also cleans the text for the judge: invisible characters, spaced-out letters and look-alike letters. A short list of words for the severe categories forces the second AI; it never refuses by itself.
3. **First AI.** The small model reads the ad and answers in a fixed shape.
4. **Second AI.** The stronger model reads the same ad when the routing table says so.
5. **Decision by code,** from the routing table and the dials.
6. **Record and act.** The verdict is written, and the ad's state changes through the one state machine, in one transaction. A refusal sends the seller's notice.

### The routing table

| First AI | Second AI | Result |
| --- | --- | --- |
| Finds no code, risk under the pass mark | Not asked | **Live** |
| Flags a code, or risk over the pass mark, or unsure | Passes it | **Live.** The case goes on the list read afterwards. |
| Flags a code, or unsure | Does not pass it | **Refused**, with reasons and an appeal |
| Either AI flags a severe code |  | **Held** until a person decides; posting paused |
| The provider blocks the content |  | **Held** as severe (INC-1270) |
| No answer, a bad answer, switch off, budget spent |  | Stays in the queue, hidden, and is tried again. After three tries it is on a staff list with an alarm. |

Three cases always go to the second AI, whatever the first says: an ad in a language that is not yet proven (DEC-149), a seller whose standing is restricted, and an ad the word list flagged.

### What the AI is given

- The category path and the answers chosen from the catalogue.
- The title, the description and any written answers, cleaned and quoted, with contact details masked (DEC-443).
- The price, its currency and unit.
- The city, never an address.
- The photos at the smallest size that judges well, or their upload verdicts.
- Whether a photo also appears in another seller's ad.
- On a report: the report's reason and note, quoted. On an appeal: the seller's sentence, quoted.

Never given: a name, a phone number, an e-mail, an address, an account id, staff notes, the seller's standing, or any pass mark.

### What the AI may answer

| Field | Shape |
| --- | --- |
| Policy codes | A list from the policy list, each with the box it concerns and up to 120 characters that must be found in the text it was given |
| Risk | A number from 0 to 1 |
| Language | A code from the list of languages, or "other" |
| Fit | Category fits: yes, no, unsure. Photos match the text: yes, no, unsure. |
| Translations | The title, description and written answers in each other site language, as plain text (DEC-149) |

Anything else in the answer is thrown away and the call counts as failed. The judge writes no explanation of its own, and none is stored.

A translation is checked by code before any reader sees it: the numbers, model codes and phone-like strings of the original must be present, nothing may be a link, and its length must be in proportion. A translation that fails is not shown; the original is.

### Languages

- The judge reads the original text. The English it writes sits beside the original for the second AI and for staff.
- A language is proven by its test set (see Proof). English and Amharic are tested before the switch.
- An ad in any other language is accepted and always goes to the second AI.

### Speed and cost

Most ads should be live within a few seconds. The first bundle that runs the judge measures the time and the cost per 1,000 ads, and those numbers replace the estimates in the review.

## The policy list, standing and strikes

### The policy list

One list for the judge, the seller's notices and the public page. Each code has a kind, the countries it applies in, and its wording with a one-line fix in every site language. You approve the list in admin before the switch. It is built from the published prohibited-items list, one to one; the first bundle's census brings that list.

| Kind | What happens | Codes (families; the exact list comes with the census) |
| --- | --- | --- |
| **Severe** | The ad is held until a person decides. Posting is paused. | Child safety; trafficking or the sale of a person; a threat of violence or support for terrorism; intimate images shared without consent (DEC-456); a provider block (DEC-455) |
| **Rule** | Refused, with an appeal. Counts toward a strike. | Prohibited goods; a scam; hate or harassment; adult content; someone's private documents or data; an ad that deceives |
| **Fixable** | "Needs edits", with Fix it. Never a strike. | Wrong category; contact details in the text; unreadable or not an ad; a duplicate of the seller's own ad; the ten photo codes that exist today |

### A seller's standing

The September table, kept. Standing moves the first AI's pass mark; the AI is never told it.

| Standing | Who | First AI's pass mark (starting value) |
| --- | --- | --- |
| New | A new account, or no verified contact | in the private copy |
| Established | Enough approved ads, no recent strike | in the private copy |
| Trusted | Many approved ads, a verified contact, no recent strike, few reports | in the private copy |
| Restricted | An active strike, or a suspension in the last 180 days | Always the second AI |

- The pass marks are starting values. The test period sets them from measured scores.
- A new seller's ad that passed only on the second AI goes live with reduced reach, as the September design says.

### Strikes

The September ladder, kept. Only a **rule** refusal counts.

| Event | Established or trusted | New |
| --- | --- | --- |
| First rule refusal | Refused; no strike | Refused; strike 1 |
| A second within 90 days | A strike; restricted for 30 days | Restricted; posting paused 7 days |
| A third | Posting paused 7 days | Posting paused 30 days |
| A fourth | Posting paused 30 days | Posting paused; a person decides whether to close the account |

- A strike expires after 180 clean days.
- Every step sends its reason and the way to appeal.
- **Severe:** the ad is hidden and kept, out of the seller's hands, and from that moment the account cannot post or edit (DEC-454). A person then chooses one of the actions below. Until then nothing else happens to the account.
- **Trying again and again:** more than five refused tries of one ad in a day pauses that ad for 24 hours.

### The actions

The AI's actions are automatic, and every one of them can be undone. Closing an account is always a person's action.

| The AI finds | The ad | The seller |
| --- | --- | --- |
| Nothing | Live | Nothing |
| Something fixable | Needs edits | Nothing |
| A rule broken, and the second AI agrees | Refused, with an appeal | A strike, and the ladder's timed pause if one is due |
| Something severe, or the provider blocks it | Hidden and kept; the seller cannot edit or delete it | Cannot post or edit from that moment; staff are alerted. The seller's other live ads stay up. |
| A report | Judged again | Nothing, unless the new judgement finds something |

What a person can do, on a severe case or on any account:

| Action | The ad | The account | Can the person come back? |
| --- | --- | --- | --- |
| Release | Live | Posting resumes; nothing on record | Not needed |
| Refuse as a rule | Refused | A normal strike; posting resumes | Yes |
| Suspend for a time (1 to 90 days) | Removed | Every ad hidden; cannot post, edit or contact anyone; can sign in to read the notice and appeal | Yes, on the end date; the ads are checked again |
| Ban | Removed | Closed: sign-in refused, every ad removed; the account's e-mail, phone, Google and Telegram sign-ins go on the ban list | Not with those sign-ins, unless a person lifts the ban |
| Ban and report (child abuse material) | Kept as evidence, out of view | As Ban, plus the report to NCMEC; the ad, its photos and the account's data are kept for the legal period and never deleted | No |
| Lift | Checked again | Restored and taken off the ban list | Yes |

Every action asks for a reason and a fresh second-factor sign-in, writes an audit row, and sends the seller a notice with the reason and the way to appeal. What that notice says when a report has been filed is a question for counsel.

### Can a removed person come back?

- **Today** an account staff have closed cannot be reopened by its owner. Its sign-in signs the person out, and the same e-mail cannot register again because the account still exists. Only staff can reopen it.
- **But** the person can open a new account with another e-mail or phone. Today nothing stops that.
- **Deleting one's own account is not built yet.** Once it is, a deleted account's e-mail could register again.
- **So this spec adds a ban list:** the banned account's e-mail, phone, Google and Telegram identities, kept as fingerprints that cannot be read back, and checked at sign-up and sign-in. It outlives the account's deletion. Whether we may keep it after a deletion request is a question for counsel.
- **What it cannot stop:** a person with a new e-mail and a new phone number. The checks for reused photos and repeated ads, and a new account's low standing, slow that person down.

### Reports and appeals

- A report starts a new judgement by both AIs, with the report quoted. If the ad passes, nothing changes for the seller. A reporter whose reports fail three times in 30 days counts for less.
- A first appeal is read by the second AI with the seller's sentence quoted. It never overturns a severe refusal (DEC-447). A second appeal goes to a person.
- Overturned appeals are all on the list read afterwards.

## The dials

Every dial lives in one table, is changed in admin with a fresh second-factor sign-in and a reason, and is audited. The hard limits are constraints in the database: no screen can pass them.

| Dial | Starts at | Hard limits |
| --- | --- | --- |
| Automatic decisions for ads | Off, until your switch | Off means staff decide, never "pass" |
| First AI's pass mark, by standing | In the private copy | A hard ceiling, in the private copy |
| Second AI's pass mark | In the private copy | A hard ceiling, in the private copy |
| Unproven languages go to the second AI | On | Cannot be turned off |
| Proven languages | None, until their test sets pass | A language enters only with a passing score on record |
| The severe list | The five families above | Cannot be emptied; a code leaves it only by a super admin |
| Posting paused on a severe flag | On | Cannot be turned off |
| Strike expiry | 180 days | 90 to 365 |
| Posting pauses | 7 and 30 days | 1 to 90 |
| Refused tries of one ad per day | 5 | 3 to 20 |
| Appeals per refusal | 1 by the AI, then 1 by a person | Fixed |
| Appeal window | 14 days | 7 to 30 |
| Tries before an item goes to the staff list | 3 | 1 to 5 |
| Reading afterwards | First 500 ads: all refusals, all disagreements, 1 in 5 approvals. Then 50 a week. | The weekly sample is never below 20 |
| Daily budget for screening | $5 (DEC-445) | A spent budget holds items; it never passes them |
| Budget alarm | 80% | 50% to 95% |

The pass marks, the pauses and the windows are my starting values from the September design. Each is yours to change, here or later in admin.

## The database

The names of new tables and doors are working names; each bundle's plan fixes them after its own census.

### The ad's states

The eleven states and their one state machine exist. The pipeline uses them as they are.

| State | With the pipeline |
| --- | --- |
| `screening` | Waiting for the AI. Hidden. |
| `active` | Live |
| `reduced` | Live with reduced reach |
| `rejected` | Refused. The seller can edit and try again. |
| `held` | Severe. Hidden until a person decides. |
| `removed` | Removed by enforcement, or deleted by its owner |

`draft`, `expired`, `sold`, `closed` and `paused` do not change.

### Tables

| Table | State | What it holds |
| --- | --- | --- |
| `screening_verdicts` | Exists | Gains: which pass it was (first AI, second AI, appeal, person), the risk, the codes with their evidence, the content fingerprint, the rules version, and the kind of thing judged, so later surfaces use the same table. Becomes append-only. |
| `screening_jobs` | New | One job per item and fingerprint; its tries; a heartbeat |
| `screening_policy` | New | The codes, their kind and their countries. The wording lives in Translations. |
| `screening_dials` | New | Each dial with its value and its hard limits as constraints |
| `screening_appeals` | New | One row per appeal, with its verdict |
| `screening_readings` | New | The marks of the list read afterwards |
| `listing_translations` | New (DEC-149) | An ad's text in each site language, with the fingerprint it was made from |
| `user_directory.standing` | Exists, empty | Standing, approved count, strikes, paused until |
| `account_bans` | New | Keyed fingerprints of a banned account's e-mail, phone, Google and Telegram identities, the ban's reason and who set it. Closed to every client role; read only by the sign-up and sign-in checks. |

### Doors

| Door | State | What changes |
| --- | --- | --- |
| `publish_listing`, `edit_listing` | Exist | Also create the job, in the same transaction as the save |
| `transition_listing_core` | Exists | The gateway's move to live, reduced, refused or held needs a verdict whose fingerprint equals the ad's and whose decision is that state. With automatic decisions Off, only a reviewer may make these moves, as today. |
| Claim a job, record a verdict, apply a decision | New | The only three things the screening worker may do. Service role only. |
| Appeal | New | The owner's door: one appeal per refusal, inside the window |
| `report_listing` | Exists | Also creates a job for a new judgement |
| Dials, policy, readings | New | Staff doors: a permission, a fresh second-factor sign-in, a reason, an audit row |

### Protections

1. **A verdict opens the door only for the content it judged.** An edit changes the fingerprint.
2. **Verdicts are append-only.** A trigger refuses a change or a delete by any role the app uses.
3. **Dials cannot leave their limits,** and the severe list cannot be emptied: constraints.
4. **Every new table is closed** to visitors and signed-in users, with a test that proves the refusal.
5. **The worker calls its three doors and nothing else.** A build guard fails if screening code touches a table directly.
6. **The audit row and the action are one transaction.**
7. **Little is kept.** Verdicts hold codes, fingerprints and the short evidence pieces. The AI call log keeps no content, as today.

### The worker

Publish starts the judgement at once on the server, so the seller waits seconds. The scheduled job runner that exists (the signed jobs route with the database's scheduler) picks up whatever is left every minute and writes a heartbeat, so "nothing to do" is never confused with "never ran".

### Migrations

Additive: new tables and new columns. No table or column is dropped; a function that changes is declared again whole. Each file is proven on Cursor's throwaway database, applied on ethio-staging, read back by me, and applied on ethio-prod after the merge, as every migration is.

## The admin area

One area, **Admin › AI and safety**, grown from today's AI page and Screening page. Cursor builds the doors; Lovable builds the screens.

| Screen | What it shows | What staff can do |
| --- | --- | --- |
| Overview | Provider up or down; items waiting and for how long; today's spend against each budget; live, refused and held counts by language; the provider's block rate | Nothing |
| Switches and budgets | Each AI job with its switch and daily budget (the AI page today), plus the one switch for automatic decisions | Turn on or off; set a budget |
| Dials | Every dial with its value and its limits | Change a value inside its limits, with a reason |
| Policy | The codes, their kind and countries, and the wording a seller reads | Add or retire a code; change its kind; edit wording through Translations |
| Models and languages | The model of each judge with its version and latest test scores; the proven languages | Put a model on trial beside the live one; add a language once its score is on record |
| Exceptions | Severe cases; second appeals; legal removal requests with their clocks (the Screening page today) | Choose one of the actions in "The actions", with a reason |
| Read afterwards | The sample of DEC-450, with the original, the English, the codes and the evidence | Mark right or wrong; correct a wrong one |
| Quality | Scores by language; the attack set's result; how often the mark was "wrong" | Nothing |
| Decision log | Every verdict, searchable | Export |
| Emergency | One stop per surface | Send everything on that surface to staff, at once |

### Who may do what

| Task | Permission |
| --- | --- |
| See the area | The staff view permissions that exist |
| Decide exceptions and mark the reading list | `listings` review (exists) |
| Switches, budgets and dials | `services` manage (exists) |
| The policy list, the models, the proven languages, the severe list | New, held by the super admin at the start |

Every change asks for a fresh sign-in with the second factor, writes an audit row with the old and new value, and sends a notice e-mail to the owner.

## Proof

### The bars before your switch (frozen now, before any number exists)

1. **The language bar (DEC-444).** On the test set, for English and for Amharic, with both AIs working as in the routing table: no severe item passed; at most 1 bad item in 100 passed; at most 3 good items in 100 refused.
2. **The attack bar** (my proposal, see Open points). No attack changes a severe verdict; at most 1 attack in 100 turns a refused ad into a passed one.
3. **The paths, as browser tests,** all green: publish to live in seconds; a refusal, its reason, Fix it, live; a severe flag, held, released by staff; an appeal; the provider down, the ad waits, then goes through; a spent budget holds.
4. **The emergency stop** tried once on ethio-staging.
5. **Measured and written down:** the time to a result (the middle one and the slowest 1 in 20), and the cost per 1,000 ads.

### The test sets

- **Per language, about 300 ads** (an ESTIMATE): ordinary ads across the categories; each rule family; scams; Amharic typed in Latin letters and mixed with English.
- **About 100 attacks per language:** hidden instructions in the text and inside photos, attempts to get the rules out, and disguises.
- **Severe image categories** are tested with harmless stand-ins and with the provider's own block. No illegal image is ever made or stored.
- I write the items with a proposed answer for each. A native reader confirms the Amharic answers.
- **They stay out of the public repository,** in private storage the test job reads. A public answer key would be a training set for attackers. The repository holds the runner and a small harmless sample.

### After the switch

- **The reading afterwards** (DEC-450), with its widening rule.
- **Every week, and on every change** of a model, an instruction or the policy list, the test sets and the attack set run again. If a language falls under its bar, it leaves the proven list by itself, so all its ads go to the second AI, and an alarm is raised.
- **Alarms:** the provider failing, the block rate, the queue's waiting time, the budget at 80%, the job's heartbeat missing.

### Every bundle's own proof

This is top-tier work. Each bundle brings browser tests of what it built, a refusal test for every door that also proves the refused thing did not happen, guards proven on a planted bypass, and my read-back from the live database.

## The bundles

Stage 2 starts after Cursor's account-security bundles (5 and 6) and Lovable's bundle 8 close. Each bundle gets its own task file after its own census. Cursor plans on Opus 5.5 and builds on Sonnet 5.5, as you decided.

| # | What lands | Who | What changes for people |
| --- | --- | --- | --- |
| 1 | **The base.** The new tables and columns; the state machine's new law, off; the worker's three doors; the screening-hook guard; a provider block as its own answer (INC-1270). | Cursor | Nothing |
| 2 | **The judge, in the shadow.** The rules check; both judges on the gateway; translations with their checks; the worker and its job; the test-set and attack-set runners. The AI's answer is recorded beside each ad while staff still decide. | Cursor | Staff see what the AI would have decided |
| 3 | **The admin area.** Overview, switches and budgets, dials, policy, models and languages, the list read afterwards, quality, the decision log, the emergency stop. | Lovable, on Cursor's doors | Staff get the screens |
| 4 | **The seller's side.** Reasons with Fix it; the public page "Why an ad is refused"; the appeal; the notices. | Cursor for doors, Lovable for screens | Sellers see reasons and can appeal |
|  | **Your switch,** when the bars are met | You | Ads go live in seconds |
| 5 | **Standing and strikes.** Standing, the ladder, the posting pause; staff's account actions and the ban list; reports judged again; duplicates and reused photos; posting limits by standing. | Cursor, then Lovable | Repeat offenders are slowed; trusted sellers pass faster |
| 6 | **Keeping it honest, and the law.** Sweeps of live ads; the full alarms; a model on trial; the removal request form with its 48-hour clock; the reporting procedure (DEC-448). | Cursor, then Lovable | A request form on the site |

- Bundles 1 to 4 come before the switch. Bundles 5 and 6 come before launch.
- As an ESTIMATE this is six to eight Cursor bundles and three to four Lovable bundles, because bundles 2 and 5 may each split in two by size.
- Until the switch the site behaves as today. The switch can be turned back off at any time, and staff then decide again.

## Forward-scan

The design checked against what comes later.

| Later work | How this design takes it |
| --- | --- |
| Public pages and search in English and Amharic (REQ-025) | `listing_translations` is the source for the index in every language |
| Reviews and replies (DEC-150) | Two more kinds of thing on the same pipeline. A review that calls a seller a scammer starts a check of that seller through the report path. |
| Private messages | The pipeline can take them as a kind. Nothing is built until the messaging design decides (DEC-449). |
| The chat assistant | The gateway takes a conversation as material and an answer that is one item from a list |
| Plans that raise posting limits | Limits read from the caps that exist |
| More languages and countries | The proven-languages dial; the policy list's country column |
| A second provider, or Google's business cloud (DEC-441, DEC-442) | A provider is a setting of the gateway; a trial runs beside the live model |
| The repository going private at launch | Nothing to move: the test sets are private from the start |
| A seller correcting a translation of their own ad | Later; the translations table has room for it |
| An owner deleting their own account (not built yet) | The ban list outlives the deletion. An account held for a legal report is never deleted while the hold lasts. |

### Left for later, by name

- Matching uploads against lists of known illegal images. It needs its own decision and a provider; it is weighed in bundle 6.
- Trader details for business sellers.
- A public page of numbers about refusals and appeals.

### The register

Rows 11 and 12 (the AI gateway, the quoting rule) are extended. The pipeline, the dials and the policy list each get a row when they land.

## Open points

### What needs your word

1. **Your answers of 23 November, 11:48:**
   - DEC-452: the AI judges the original text, with the English beside it; you confirm the right answers on the Amharic test ads.
   - DEC-453: the attack bar: no attack changes a severe verdict, and at most 1 in 100 turns a refused ad into a passed one.
   - DEC-454: a severe flag hides the ad and stops the account posting and editing at once. A person decides the rest, using the actions in section 5.
2. **Your answers of 23 November, 11:54** ("agree with all your recommendation"):
   - DEC-455: a severe ad is blocked at once and taken off the site, and KEPT as evidence, never deleted, until a person decides; a provider block stays on the severe list.
   - DEC-456: a fifth severe family, intimate images shared without consent (removed within 48 hours of a valid request, with identical copies).
   - DEC-457: closing an account is always a person's decision, at a fourth strike as everywhere; the AI never closes an account.
   - DEC-458: this spec is approved, with every choice listed below.

### Choices I made that you can overrule

Approving the spec approves these.

- An edit goes through the check as an edit does today: out of view for the seconds it takes.
- The name check keeps its one recorded exception.
- The judge writes no explanation. Staff see codes and the seller's own words as evidence.
- A fixable refusal never counts as a strike.
- More than five refused tries of one ad in a day pauses that ad for 24 hours.
- One appeal to the AI within 14 days, then one to a person.
- The starting pass marks, pauses and limits in the dials table.
- Decide and read-afterwards use the review permission that exists; dials use the services permission that exists; the policy list and the models need a new one, held by the super admin.
- The test sets and their answers stay out of the public repository.
- A language that falls under its bar leaves the proven list by itself.
- During the shadow period staff see what the AI would have decided.

### One reminder

You wanted your redesign done before Stage 2, and you have told me it is. If any part of it is still open, say so before bundle 1.

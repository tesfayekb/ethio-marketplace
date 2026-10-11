# The Listings console — spec, version 1 (D134, D136, D137; APPROVED by the operator, 2026-10-11)

Tier A: a new admin door that writes another person's listing, its audit, and a state-machine amendment. Nothing here is built before the operator approves this spec.

## What exists today (read at dev `6e055589`)

- **Reading every listing:** an admin with `listings:view` can read every listing (RLS `listings_admin_read`); the Screening queue reads the `screening` status only.
- **Statuses:** draft, screening, active, reduced, rejected, held, expired, sold, removed (the listings CHECK, 2026-09-16).
- **The state door** `transition_listing(listing, status)`:
  - a reviewer (`listings:review`, step-up) moves screening → active / reduced / rejected / held and held → active / reduced / rejected;
  - anyone with a hand on the listing (owner, reviewer, enforcer) sends draft / active / reduced / rejected / expired / sold back to screening;
  - an enforcer (`listings:enforce`, step-up) removes any listing;
  - `removed` is terminal (REQ-022), and every move writes a `listing_revisions` row (kind `state`, the actor).
- **Content:** only the seller writes it (`submit_listing` / the draft door: "you submit only your own"). Its screening step is a marked pass-through until stage 2's gateway.
- **The audit log:** `log_audit(action, entity_type, entity_id, meta)` is internal (no browser grant); the Audit page reads `audit_log`.
- **Missing:** the console itself, an admin content door, a way back from Removed, and a place to keep the notice to the seller.

## The pages (D134)

- A **Listings** group in the side menu (its own glyph), holding **All listings** (new, `/admin/listings`, permission `listings:view`) and the **Screening queue** (moved under it; its address stays `/admin/screening`).
- **All listings** is one table on the agreed blocks:
  - the header: the heading; Export as the one action (a later turn may add it);
  - the views as a row of pills above the toolbar:
    - Live — active, reduced;
    - Waiting — screening, held;
    - Ended — expired, sold;
    - Removed — rejected, removed;
    - All — everything but drafts;
  - search: title or listing id;
  - Filters: country (from the listing's place), category branch, seller (by public name or email), date posted (from / to), tier;
  - Columns;
  - tick-boxes with Remove and Restore (D136 4);
  - the footer.
- **The row:** the photo, the title, the seller's public name, the place, the category, the price, the status pill, posted and expires.
  - Open: the public page, or the buyer preview when not live.
  - Edit.
  - The three-dots: Send back to review; Remove (red); Restore (Removed view only); View as seller (super admin only, the existing impersonation).
- **Drafts never appear** (D136 / D134 3): the door excludes `draft` for every admin.
- **One read door:** `admin_list_listings(view, search, country, category, seller, from, to, tier, limit, offset)`.
  - It is SECURITY DEFINER, refuses without `listings:view`, and pages with a count.
  - It returns the public seller name only, with the email for `profiles:view` holders.

## The admin's edit (D136)

- **One new door,** `admin_edit_listing(listing, changes)`:
  - it needs `listings:enforce` and step-up;
  - it refuses a draft, a removed listing and the admin's own listing (a seller edits their own the seller's way);
  - it changes only what D136 allows: title and description, category and specs, price, and removing a photo; it never uploads a photo.
- **Validation:**
  - the same rules as the seller's door (the category's questions, the price rules, the shapes);
  - its screening step is the same call as the seller's (the pass-through today, the AI gateway from stage 2, which then judges admin edits too).
- **A live listing stays live** (D136 1). A category move keeps the answers the new category also asks, as the seller's own move does.
- **One edit writes three records:**
  1. a `listing_revisions` row (kind `edit`, before and after, the actor);
  2. an `audit_log` row (`listing.admin_edit`, the listing, the fields changed);
  3. a notice to the seller (below).
- **A removed photo** leaves the listing at once. Its file is kept until the listing's retention ends, so a mistaken removal can be undone by Restore-photo (a later turn if wanted).

## The notice to the seller (D136 2)

- **A new table `seller_notices`:** seller, listing, kind (`admin_edit`, `admin_remove`, `admin_restore`, `review`), the fields named, a reason chosen from a short list plus an optional note, created at, and read at.
- **No outside email.** The notices are read later by My ads (stage 4) and notifications (stage 6); until then they are kept and counted.
- **RLS:** the seller reads only their own; no browser role writes.

## Remove and Restore (D136 4) — a change to REQ-022

- **Remove:** the existing enforcer move, with a reason. Bulk Remove calls the door once per listing, each logged.
- **Restore (new):** REQ-022 says `removed` is terminal, so Restore needs the operator's amendment.
  - The proposal: an enforcer (step-up) may move removed → screening, so the listing goes back through review and never straight to live.
  - A listing removed for a severe screening reason is restored by a super admin only.
  - Restore is possible while the listing still exists (before any retention purge).
  - It writes the revision, the audit row and the seller's notice.
- **Send back to review** (active / reduced → screening) is already legal; it gains a reason and a notice.

## Tests (owed with the build)

- **Doors:**
  - deny proofs for every door (a plain user, a reviewer without enforce, no step-up, the admin's own listing, a draft, a removed listing for edit);
  - the door's validation equals the seller's (a refused answer is refused for both);
  - a revision, an audit row and a notice for every edit, remove, restore and send-back;
  - drafts are never returned by the list door.
- **Screens:** the views' counts; the filters; bulk Remove and Restore on scratch listings only (J3, G27); Edit's form with each allowed field; the footer.
- **Migration proofs:** RAISE on failure, scratch rows only, no real listing touched.

## Size (ESTIMATE)

- Two or three turns:
  1. the doors and the notices table (one migration), with their route tests;
  2. All listings and the menu move;
  3. the Edit form.

## Decided (D137, the operator, 2026-10-11)

1. **Restore:** REQ-022 is amended. A removed listing may come back only to Waiting (screening), never straight to live. An enforcer restores it, with step-up; a listing removed for a severe screening reason is restored by a super admin only.
2. **Who edits and removes:** the holders of `listings:enforce`, with step-up. Reviewers (`listings:review`) keep Approve and Reject in the Screening queue.

## Addendum — as built in turn L1 (2026-10-11; where it differs from the text above, the addendum governs)

Read again at dev `7f2db333` while the doors were written (G3 addendum 2):

- **Correction — the screening step of a seller's content.** "Its screening step is a marked pass-through" (What exists today) was read from the oldest write door (2026-08-04: "REQ-021 SCREENING GATEWAY LANDS HERE … pass-through stub"). The live doors differ: the seller's `edit_listing` and `publish_listing` put the listing in `screening`, where the Screening queue judges it; no automatic screening call exists before stage 2 (DEC-145). An admin's edit leaves a live listing live (D136), so before stage 2 nothing screens it automatically — the enforcer's edit is itself a human judgment. The door carries the marked seam where stage 2's gateway call goes, as the seller's path will.
- **The content rules.** `admin_edit_listing` calls the seller's validator, `validate_listing_draft(seller, 7, …)`: every content rule of the seller's doors (category postable, the category's questions, title and description, price, the seller's own end date, coverage, contact). *Amended 2026-10-11 (turn L4a, DEC-173, INC-552): `validate_listing_draft(seller, 5, …)` with no end date and no places — the rules for what an admin can change (category postable, the category's questions, price, title and description); the seller's own end date, places and contact are the seller's choices, judged when the seller saves, and never block an admin's edit.* Step 8's checks (the seller's public name, legal names, confirmed home country) judge the seller, not the content, and are not applied to an admin's edit. Every field the admin does not change is read from the listing as it stands; a category move keeps the answers the new category also asks (the validator releases an answer the listing held and the new category does not ask — `validate_listing_attributes`, INC-467).
- **Remove, Restore, Send back** go through one door, `admin_move_listing(listing, to, reason, note)`, which calls `transition_listing` (the state machine stays the one place a status changes). `transition_listing` gains removed → screening for enforcement with a fresh second factor (REQ-022 as amended by D137). The door counts against the `revise` dial (120 an hour per person) through the state door.
- **"A severe screening reason"** is the listing's `screening->>'severe'` flag, the one the state door already reads for a seller's removal of a rejected listing. Nothing sets it before stage 2's gateway; tests set it on scratch rows.
- **Drafts** answer "listing not found" at every console door (D136: a draft is the seller's private work).
- **The admin's own listing** is refused by both write doors (a seller edits their own the seller's way).
- **Reasons** (decided by the supervisor, overridable by the operator; the seller reads them later):
  - Edit: wrong category, misleading details, contact details in the text, a photo, the site's rules, other.
  - Remove: a prohibited item, misleading details, a duplicate ad, contact details in the text, a photo, the site's rules, other.
  - Restore: removed in error, an appeal accepted, other.
  - Send back: wrong category, misleading details, contact details in the text, a photo, the site's rules, other.
  - "Other" needs a note; a note is at most 500 characters.
- **The notice's kinds:** `admin_edit`, `admin_remove`, `admin_restore`, `admin_send_back` (the spec's `review` kind — a reviewer's decision — comes with the screening work that writes it). The notice names the fields as the seller reads them: title, description, category, specs, price, photos, or status for a move. The notice carries no admin's identity; the audit row does.
- **A removed photo:** its row leaves the listing (the next photo becomes the cover); its file stays in storage, and the revision's `before.photos_removed` keeps the whole row, paths included, for a later Restore-photo.
- **The seller's e-mail** is returned, and searchable, only for holders of `profiles:view` (the Users console's own rule); everyone with `listings:view` sees the public name, and the business name of a business.
- **Tests:** AL-1..AL-9 (e2e/admin-listings.spec.ts); the migration's proofs F1–F5; the supervisor's local trial and eleven variants, each caught by its proof.

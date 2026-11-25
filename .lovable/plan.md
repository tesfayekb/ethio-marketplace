# Bundle 10a-2 — every refusal a screen can receive has words (INC-1280)

Census and plan only; nothing has changed. Base `lovable/next` `9947183cb` (app files = dev `1bbfc7dad` + 10a). This plan does not write any Amharic. Ruling 1 supplies it.

## How the census was made
- **Doors.** For each of the 521 functions in `supabase/migrations/`, I took the newest `CREATE [OR REPLACE] FUNCTION` body and listed every `door_refuse('code'[, 'detail'])` and `RAISE EXCEPTION` with its file and line. Each entry below is cited as `migration-stem:line`, where the stem is the file's 14-digit prefix.
- **Routes.** I read every `refusal("field","reason")` and `clientError(...)` under `src/routes/api/` and `src/server/` that a covered screen reaches. These were read, not changed.
- **Families.** These are the 28 `RefusalFamily` objects under `src/` that sit outside EXCLUDED. For each, I listed its `words` codes and the doors called by its screens' services.
- **Not listed as MISSING:** the shell's own codes (`notSignedIn`, `permissionDenied`, `accountDeactivated`, `stepUpRequired`, `rateLimited`, `acceptanceRequired`). These already reach words through `door-codes.ts` or the console's shared words.
- **Families with nothing missing:** `country-refusals.ts`, `location-refusals.ts`, `monetisation-refusals.ts`, `listing-policy.ts` (for its own door), `photo-remove.ts`, `legal-accept-refusals.ts` (only `accept_legal` is the screen's), `field-refusals.ts`.

## Census: codes MISSING words, with the proposed key
Notes on the tables:
- "reuse" means the key exists today and its English already fits.
- "NEW" means a new key with its proposed English.
- A tail such as `:field` is shown only through words that take it as a value of a known shape. Raw server text is never shown.

### A. Posting — `src/features/posting/refusal-text.ts`
`DRAFT_REASONS` is at line 27 and `PHOTO_REASONS` at line 111. The screens are the posting wizard steps (Where, Photos, Review) and edit-in-wizard.

| Door/route | Code | Source | Today | Proposed |
|---|---|---|---|---|
| route `/api/upload/photo` | `levelNotAvailable` (D17) | routes/api/upload/photo.ts:279 | MISSING | NEW `post.refusal.levelNotAvailable`: "This ad's level does not take photos." |
| `set_listing_pin` | `badLatitude` (D21) | 20261115203900:95 | MISSING | NEW `post.refusal.badPinPlace`: "That point is not on the map. Place the pin again." (shared with badLongitude and badZoom) |
| `set_listing_pin` | `badLongitude` | :98 | MISSING | same as above |
| `set_listing_pin` | `badZoom` | :109 | MISSING | same as above |
| `set_listing_pin` | `badPrecision`, `badPrecision:missing` | :102, :106 | MISSING | reuse `post.pin.chooseShow` (bundle 3: "choose what buyers see") |
| `set_listing_pin` | `directionsTooLong` | :85 | MISSING | NEW `post.refusal.directionsTooLong`: "The directions are too long." |
| `set_listing_pin` | `streetTooLong` | :73 | MISSING | NEW `post.refusal.streetTooLong`: "The street name is too long." |
| `set_listing_pin` | `pinNotEditable` | :66 | MISSING | NEW `post.refusal.pinNotEditable`: "The map pin of this ad can no longer be changed." |
| route `/api/listings/publish` → `publish_listing` | `illegalTransition` (D22) | 20261115203900:171 | MISSING | NEW `post.refusal.alreadySubmitted`: "This ad was already sent, or it can no longer be sent from here." |
| same | `listingNotPlaced` (D22) | :193 | MISSING | NEW `post.refusal.listingNotPlaced`: "Choose where this ad is shown before sending it." |
| `submit_listing` | `notADraft` | 20261115204200:67 | MISSING | reuse NEW `post.refusal.alreadySubmitted` |
| `submit_listing` | `listingNotFound` | :129 | MISSING | reuse `admin.listings.move.error.notFound` "This listing no longer exists." *if the layer allows; otherwise NEW `post.refusal.listingNotFound` with the same English* |
| `set_listing_photos_soon` | `photosSoonNotEditable` | 20261115203800:55 | MISSING | NEW `post.refusal.photosSoonNotEditable`: "This choice can no longer be changed for this ad." |
| `get_posting_schema` | `categoryNotFound`, `categoryInactive` | 20261115203500:53, :56 | MISSING | NEW `post.refusal.categoryClosed`: "This category is no longer open for new ads." |

### B. My listings — `src/features/my-listings/my-listing.ts:266` (`SELLER_DOOR_REFUSALS`, generic `common.error`)
The screens are My listings, the ad's manage page and its edit sheet.

| Door | Code | Source | Today | Proposed |
|---|---|---|---|---|
| `copy_my_listing` | `notCopied`, `notCopied:draft` (D24) | 20261115203800:93, :95 | MISSING | NEW `myListings.refusal.notCopied`: "This ad cannot be copied." Plus NEW `myListings.refusal.notCopiedDraft`: "A draft cannot be copied. Finish or delete it first." |
| `set_listing_reserved` | `badValue:reserved` (D24) | 20261115203600:89 | MISSING | reuse `post.refusal.badValue` |
| `edit_my_listing` | `notEditable` (D25) | 20261115204100:78 | MISSING | NEW `myListings.refusal.notEditable`: "This ad can no longer be edited." |
| same | `listingNotEditable` | :97 | MISSING | same key as `notEditable` |
| same | `draftNotEdited` | :87 | MISSING | NEW `myListings.refusal.draftNotEdited`: "Drafts are changed in the posting steps, not here." |
| same | `renewFirst` | :94 | MISSING | NEW `myListings.refusal.renewFirst`: "Renew this ad before editing it." |
| same | `badShape:coverage`, `badShape:contact_pref` | :110, :115, :122 | MISSING | reuse `post.refusal.badShape` |
| same | `streetTooLong` | :134 | MISSING | reuse NEW `post.refusal.streetTooLong` (A) |
| same | `directionsTooLong` | :142 | MISSING | reuse NEW `post.refusal.directionsTooLong` (A) |
| same | `contactInNote` | :136, :144 | MISSING | reuse `post.refusal.contactInNote` |

### C. Saved ads — `src/features/account/saved-page.tsx:43-60` (D27)
- **The defect:** a refused or failed Remove draws `account.saved.failed`, which is the page's load words, and drops the code.
- **The fix:** a new family `SAVED_REMOVE_REFUSALS` in `src/features/ad-page/ad-page-refusals.ts`, beside the save family. It is read through `readRefusal`.
- **Door:** `unsave_listing` refuses with `listingNotAvailable` (20261117040400:92, :96).
- **Words:**
  - `listingNotAvailable` reuses `account.saved.unavailable` ("No longer available").
  - The generic is NEW `account.saved.removeFailed`: "This ad could not be removed from your saved ads. Try again."

### D. Ad page — `src/features/ad-page/ad-page-refusals.ts`
| Door | Code | Source | Today | Proposed |
|---|---|---|---|---|
| `report_listing` | `listingNotAvailable` | 20261117040500:44, :59 | MISSING | NEW `adPage.refusal.gone`: "This ad is no longer available." (shared with reveal) |
| `report_listing` | `noteTooLong` | :51 | MISSING | reuse `admin.listings.move.noteTooLong` if its English fits and the layer allows; otherwise NEW `adPage.report.noteTooLong`: "The note is too long." |
| `report_listing` | `badReason` | :47 | EXCEPTION | the screen offers only listed reasons |
| `report_listing` | `ownListing` | :60 | EXCEPTION | Report is not drawn on your own ad. Words are still proposed as reuse `admin.screening.error.ownListing` if the ruling prefers. |
| `reveal_listing_contact` | `listingNotAvailable` | 20261117040600:50, :54, :57 | MISSING | NEW `adPage.refusal.gone` |
| `my_saved_listings` | `badSize`, `badValue:cursor` | 20261119150400:62, :68, :70 | EXCEPTION | screen-built paging values |

### E. One person's admin page — `src/features/admin/users/` (D30)
- **The defect:** `user-detail.tsx:271-274` draws `status.error` through the failure notice with no family. Role assign and revoke have no family.
- **The fix:** a new family `ACCESS_REFUSALS` in `admin-users-service.ts`, beside `PROFILE_EDIT_REFUSALS`, read by the status and role blocks.

| Door | Code | Source | Proposed |
|---|---|---|---|
| `admin_set_account_status` | `unknownUser` | 20261114070600:64 | NEW `admin.users.error.unknownUser`: "This account is no longer on record." |
| same | `required:reason` | :56 | reuse `post.refusal.required` |
| same | `badValue:status` | :53 | EXCEPTION: the screen sends only listed statuses |
| `assign_role` | `roleReserved` | 20261120100100:40 | NEW `admin.users.roles.reserved`: "This role is given only by the system." |
| same | `unknownRole` | :43 | NEW `admin.users.roles.unknown`: "This role is no longer on record." |
| same | `badCountryCode` | :47 | reuse `admin.countries.error.badCountryCode` |
| same | `unknownUser` | :50 | reuse NEW `admin.users.error.unknownUser` |
| `revoke_role` | `roleReserved`, `unknownRole` | 20261114070400:92, :95 | the same two keys |
| | generic | | status: `admin.users.status.failed`; roles: `admin.users.roles.failed` |

### F. Admin listings — `src/features/admin-listings/`
| Family | Door | Code | Source | Proposed |
|---|---|---|---|---|
| `undo-edit.ts:37` | `admin_undo_listing_edit` | `photoRemovalFinal` (D33) | 20261118012200:75 | NEW `admin.listings.undo.photoFinal`: "A removed photo cannot be brought back, so this edit cannot be undone." |
| same | same | `listingNotFound` | :53 | reuse `admin.listings.move.error.notFound` |
| `tier-reasons.ts:94` | `admin_set_listing_tier` | `listingNotFound`, `ownListing`, `noteRequired`, `noteTooLong` | 20261118012500:63, :66, :78, :81 | reuse `admin.listings.move.error.notFound`, `.own`, `admin.listings.move.noteRequired`, `.noteTooLong` |
| same | same | `badValue:tier`, `badValue:reason` | :59, :75 | EXCEPTION: listed choices only |
| `listing-refusals.ts` | `admin_list_listings`, `admin_open_report_counts` | `badValue:tier/view`, `badSize` | 20261122023200:76, :81; 20261118012900:258 | EXCEPTION: paging and filter values |
| `listing-policy.ts:40` | `admin_set_listing_policy` | `badValue:renew_days` | 20261118012500:156 | reuse `admin.listings.settings.daysHelp` (already its field words at :44; the family line points the code at it) |

### G. Screening — `src/features/admin-screening/use-screening.ts:419` (reveal family; D34, words only)
| Door | Code | Source | Proposed |
|---|---|---|---|
| `admin_reveal_listing_contact` | `listingNotFound` | 20261118012700:83 | reuse `admin.listings.move.error.notFound` |
| same | `badValue:channel` | :78 | NEW `admin.screening.revealNoChannel`: "This seller has no contact of that kind." |
| `admin_screening_facts` | `listingNotFound` | 20261118012800:157 | reuse `admin.listings.move.error.notFound` |
| `admin_name_check_clear` | `badValue:name`, `badValue:reason` | 20261118012700:117, :118 | EXCEPTION: screen-built |
| `admin_review_listing`, `admin_screening_queue`, `admin_warned_listings`, `admin_job_resume` | `badValue:status/tier/job`, `badSize` | 20261118013000:255; 20261122023400:56; 20261123020600:149; 20261119030900:110 | EXCEPTION: screen-built |

### H. Legal console — `src/features/admin/legal/legal-service.ts` (D45)
| Door | Code | Source | Proposed |
|---|---|---|---|
| `admin_save_legal_draft`, `admin_add_legal_translation` | `tooLong` | 20261114114200:55; 20261114114300:62 | reuse `admin.legal.error.tooLong` ("Too long: at most {max} characters."; `{max}` is a number from the family's limit, never the server's text) |
| `admin_add_legal_translation` | `notPublished` | 20261114114300:57 | NEW `admin.legal.error.notPublished`: "Translations are added to a published version only." |
| all versioned doors | `unknownVersion` | 20261114114300:56, :146; 20261114114200:125, :158; 20261114114600:108 | NEW `admin.legal.error.unknownVersion`: "This version is no longer on record." |
| `admin_add_legal_translation`, `admin_mark_legal_reviewed`, `admin_save_legal_draft`, `admin_set_legal_settings` | `badValue[:field]` | 20261114114300:61, :103; 20261114114200:49-61; 20261114114400:45-170 | NEW `admin.legal.error.badValue`: "This value is not accepted: {field}." `{field}` is drawn only when the tail is in the family's field-label map, otherwise from reuse `post.refusal.badValue`. |
| `admin_user_legal_history` | `unknownUser` | 20261114114600:185 | reuse NEW `admin.users.error.unknownUser` |
| Export (`admin_export_legal_acceptances`) at `legal-version-view.tsx:507-536` | one flag for every failure | | read the export's error through the legal family: `unknownVersion` gets its words; `badValue:after/limit` (:140, :141) are EXCEPTIONS (screen-built) |

### I. Categories — `src/features/admin-categories/category-refusals.ts` (D50, categories part)
| Door | Code | Source | Proposed |
|---|---|---|---|
| `admin_set_category_images`, `admin_accept_category_image` | `unknownCategory` | 20261115022200:63, :113 | NEW `admin.categories.error.unknownCategory`: "This category is no longer on record." |
| `admin_set_primary_pointer` | `unknownPointer` | 20261115022100:110 | NEW `admin.categories.error.unknownPointer`: "That link to another category is no longer on record." |
| same | `parentInactive` | :113 | reuse the English of `admin.locations.error.parentInactive` only as a NEW key `admin.categories.error.parentInactive`: "The parent category is switched off." (a category is not a place, so the place key is not reused) |

### J. Exports — Places, Countries, Categories (D55)
- **Where:**
  - `locations-page.tsx:195-200` and `countries-page.tsx:124` call `/api/admin/locations/export`.
  - `categories-page.tsx:307-312` calls `/api/admin/categories/export`.
- **The defect:** each page sets one boolean on any failure and drops the route's code.
- **The routes' codes:**
  - `routes/api/admin/locations/export.ts:44-45`: `forbidden` (403), `unknownCountry` (404).
  - `routes/api/admin/categories/export.ts:40`: `forbidden`, `unknownCategory`.
- **The fix:** keep the answer and read it through the page's own family:
  - `forbidden` maps to reuse `admin.locations.error.denied` / `admin.countries.error.denied`, and for categories to NEW `admin.categories.error.denied`: "You do not hold the right to do this." (the same English as `admin.ai.error.denied`).
  - `unknownCountry` maps to the existing family lines.
  - `unknownCategory` maps to NEW (I).
  - Anything else keeps today's export error words.

### K. AI console — `src/features/admin-ai/ai-refusals.ts` (D56)
| Door | Code | Source | Proposed |
|---|---|---|---|
| `admin_set_ai_feature` | `badValue:enabled` | 20261119030900:51 | NEW `admin.ai.error.badEnabled`: "Choose on or off." |
| `admin_ai_spend_days`, `admin_list_ai_calls` | `badValue:days/limit/cursor/feature/outcome` | 20261119031000:137, :165-168 | EXCEPTION: screen-built |

### L. Roles and translations (found beyond the list)
- **`roles-service.ts`:**
  - `unknownRole` (20261114070500:97, :134, :174) uses NEW `admin.users.roles.unknown` (E).
  - `unknownPermission` (:182) uses NEW `admin.roles.error.unknownPermission`: "This permission is no longer on record."
- **`translations-service.ts`:**

| Code | Source | Proposed |
|---|---|---|
| `badLanguage` | 20261114114100:98, :163; 20261114114000:189; 20261114114500:341 | reuse `admin.legal.error.badLanguage`? Its English is legal-specific, so instead NEW `admin.translations.error.badLanguage`: "This language is not on record." |
| `unknownKey` | 20261114114000:152 | NEW `admin.translations.error.unknownKey`: "This text is no longer on record." |
| `unknownTranslation` | 20261114130400:48, :65, :99 | NEW `admin.translations.error.unknownTranslation`: "This translation is no longer on record." |
| `tooLong:context` | 20261114114000:143 | reuse `post.refusal.tooLong` |
| `nameRequired` | 20261114114100:54 | reuse `admin.categories.error.nameRequired` ("A name is required.") if the layer allows |
| `unknownUser` | 20261114114000:181 | reuse NEW (E) |
| `catalogEmpty`, `pseudoLanguage` | 20261114114100:176, :168 | `languages-page.tsx` family already has words; `translations-service` routes these doors to that family (verify at build; if a gap remains, it is one line each) |
| `badValue:limit/after/action/code/en` | | EXCEPTION: screen-built |

## Counts
| | Count |
|---|---|
| Families changed | 14 (posting, my-listing, saved [new], ad-page, users access [new], undo, tier, listing-policy, screening reveal, legal, categories, the three export readers, ai, roles/translations) |
| New keys proposed | 33 (the NEW entries above, de-duplicated) |
| Reused keys | 16 |
| EXCEPTIONS | 14 code groups, each listed with its reason |

## Layers (judged by `scripts/conformance/strings-layers.ts` at build)
- **`post.refusal.*`:** these keys live in `en-base.ts` today, because `DRAFT_REASONS` is read by a base-layer page (verified at build by the census). New ones follow that placement. If the census names `member`, they go in `en-member.ts`.
- **`myListings.refusal.*` and `account.saved.removeFailed`:** member.
- **`adPage.*`:** base, because the ad page is public.
- **`admin.*`:** admin.

## Unit tests (IDs grep-checked free)
| Test file | IDs |
|---|---|
| `posting/refusal-text.test.ts` | RWP-U1…U8 |
| `my-listings/my-listing.test.ts` | RWM-U1…U6 |
| `ad-page/ad-page-refusals.test.ts` | RWD-U1…U3 (saved Remove and gone) |
| `account/saved-page` (new `saved-remove.test.tsx`) | RWS-U1: a refused Remove draws its code's words, never the load words |
| `admin/users/` (new `access-refusals.test.ts`) | RWU-U1…U4 |
| `admin-listings/undo-edit.test.ts` | RWX-U1; plus tier/policy in new `tier-refusals.test.ts`, RWX-U2/U3 |
| `admin-screening/use-screening.test.ts` | RWG-U1/U2 |
| `admin/legal/legal-service.test.ts` | RWL-U1…U4 (incl. Export) |
| `admin-categories/category-refusals.test.tsx` | RWC-U1…U3 |
| page export tests | RWE-U1…U3 (one per page) |
| AI (new `ai-refusals.test.ts`) | RWA-U1 |
| `roles-service.test.ts`, `translations-service.test.ts` | RWR-U1…U5 |

Each test asserts the exact key for each code and that an unplaced code still draws the family's generic.

## Findings
- `src/features/admin/users/user-detail.tsx:271-274`: status refusals pass through the failure notice only. They read as "refused", with no reason words (D30).
- `src/features/admin/legal/legal-version-view.tsx:523-524`: Export keeps only a flag.
- `src/features/admin-locations/locations-page.tsx:199`, `src/features/admin-categories/categories-page.tsx:311` and `src/features/admin-countries/countries-page.tsx:124+`: the answer's code is dropped (D55).
- `src/features/ad-page/ad-page-refusals.ts:69`: a bad reason or long note is deliberately generic. The plan gives the note its words.
- `src/features/admin/legal/legal-service.ts`: `admin.legal.error.tooLong` exists in `en-admin.ts:2138` with no family line.
- `src/features/admin-ai/ai-refusals.ts:59`: an unmapped code is only `console.warn`ed. This is acceptable under the failure-modes lens, because the generic is still drawn.
- None needs a security note.

## Build (after ruling 1, not now)
1. Family lines and keys (EN as ruled, AM from the ruling, by script).
2. Unit tests.
3. Ruling 1 decision 11 checks of 10a.
4. `bunx vitest run scripts/conformance --maxWorkers=2`.
5. Write-back from `1bbfc7dad` last.
6. Report.

Out of scope here and left as ruled:
- D31 and the attribute parts of D50/D55 go to 10b.
- Who may see Show number is INC-1281.

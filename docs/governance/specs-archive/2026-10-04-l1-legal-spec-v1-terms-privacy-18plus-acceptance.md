Source: supervisor thread, turn 1341, Sun 2026-10-04 16:50 New York.
Status at 2026-10-04: superseded by turn 1343 (see file 2026-10-04-l1-legal-spec-v2-legal-documents-acceptance-publishing-certification.md); the operator answered on 2026-10-04 17:01 "agree, but know that we should have admin side where we from time to time modify these terms of service...".
Related: DEC-128, L1, Q-018, REQ-034, REQ-035.

**What the record already held**
- **18+ rule:** you decided it on 29 July: users must be 18 or older, and accounts found under 18 are closed.
- **Sign-up acceptance:** a versioned, timestamped acceptance of Terms and Privacy at sign-up is on the build checklist, not yet built.
- **Legal review:** I draft the pages from the source ledger, marked pre-counsel; professional review waits for the Ethiopia-entity milestone and never blocks global launch.

**What today adds**
- No date of birth is collected anywhere.
- The 18+ confirmation is part of the acceptance tick.
- An "Under 18" reason on the admin's account-closure action, and a matching report reason when the report feature is built.
- The country-law notes (Ethiopia, Kenya, UAE, UK) go into the source ledger and the existing counsel item on the launch checklist.

My item 6 said "a lawyer's read before launch", which conflicts with your earlier ruling. I've kept the earlier ruling: these are recorded as watch items, not a new launch blocker. Tell me if you meant to change that.

Nothing to paste now. The record updates ride in this bundle's docs step, folded into my next ruling once Lovable stops.

## Spec for approval: Terms, Privacy and the 18+ acceptance

1. **Pages.** `/terms` and `/privacy`, public, in both languages. The footer's two words become links; the sign-up page and the publish line link to them. The text lives in the repository with a version string per document. English is authoritative.
2. **Acceptance.** One screen, shown once after sign-in to any account that has not accepted the current version. It has one required tick: "I am 18 or older and I agree to the Terms and the Privacy Policy."
   - It covers all three sign-in doors, existing accounts, and re-acceptance when the text changes.
   - Browsing stays open without it. Posting, saving a seller profile and, later, messaging need it.
3. **Sign-up page.** One line under the button with the two links. No tick there; the acceptance screen is the single recorded act.
4. **Server side.** An append-only acceptance record (user, document versions, time), written only through its own door for the signed-in user. Publishing and the seller-profile save are refused without a current acceptance. The record is included in data export and deletion.
5. **Under 18.** The admin's deactivate action gains a preset reason "Under 18"; it is audited as today.
6. **Tests.**
   - Nobody can write another user's acceptance.
   - Publishing without acceptance is refused.
   - A new account at each door reaches the screen, accepts and posts.
   - A new version brings the screen back.
   - Test accounts get an acceptance by default; this changes the test setup, so it carries its own decision record.
7. **Checked against later requirements.**
   - The per-post affirmation is the publish line built in this bundle.
   - Cross-border consent is separate and unaffected.
   - Staff acting for a user cannot accept for them.
   - The record carries the home country for the Ethiopia partition.
8. **Launch checklist additions.** Pages and acceptance live; a UK children's access assessment within three months of opening the UK, which I draft; a re-check of the UAE child digital safety law before its grace period ends.

This touches sign-in and personal data, so it gets the heaviest verification. My estimate is two to three Lovable turns, right after this bundle.

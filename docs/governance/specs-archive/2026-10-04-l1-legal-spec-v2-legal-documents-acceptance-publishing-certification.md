Source: supervisor thread, turn 1343 (version 1 is turn 1341; later additions are in turns 1345, 1351, 1353, 1359 and 1362), Sun 2026-10-04 17:01 New York.
Status at 2026-10-04: approved by the operator on 2026-10-04 17:11 with his words "approve. also make sure that we record in each user profile for the version agreeing terms of service."; extended in turns 1345, 1351, 1353 and 1362 (see the L1 addition files); the default notice period was changed from 14 to 30 days in turn 1359; not built (queued right after bundle 4; ESTIMATE four to six executor turns, two migrations).
Related: DEC-128, DEC-129, L1, REQ-031, REQ-034, REQ-028.

**Your three points**
- **Admin-managed, versioned terms:** yes. Terms and Privacy move into the admin console with numbered versions. Every acceptance is recorded with its version and time, and shown on the admin side only. One limit: a user who formally asks for a copy of their data is entitled to these records in the EU, UK, Ethiopia, Kenya and South Africa, so they are included in that export.
- **Certification before Publish:** today there is one line above Publish, added this weekend: "By publishing you confirm that you have the right to sell this, and that the ad follows the rules of ethio.com." It is time-stamped but has no tick, and it is not the wording you describe. The spec replaces it with a real certification.
- **Per country, on publish and on update, recorded with each post:** yes, built into the same model.

One caution, and I'm not a lawyer: a "will not hold ethio.com liable" promise is standard marketplace wording, but how far it holds varies by country, and EU and UK consumer law limit it. That is what the per-country statements are for, and the text stays marked pre-counsel.

## Revised spec: legal documents, acceptance and publishing certification

1. **A new "Legal" section in the admin console**
   - Three kinds of document: Terms, Privacy Policy, Publishing statement.
   - Each has numbered versions with English and Amharic text, a change summary, an effective date, and who published it and when.
   - A published version can never be edited or deleted; a change is a new version. Publishing needs its own permission, a fresh sign-in check, and both languages; it is audited.
   - A document is global or belongs to one country.
   - `/terms` and `/privacy` show the version in force with its date.

2. **Acceptance at sign-in**
   - Any signed-in account that has not accepted the version in force gets one screen with one required tick: "I am 18 or older and I agree to the Terms and the Privacy Policy."
   - Recorded: user, document, version, time, language shown, sign-in method. I've left the IP address out to keep personal data minimal; say if you want it stored as evidence.
   - The admin's user page shows the list. The user has no history screen.

3. **When a document changes**
   - The admin marks a version as a material change or not. A typo fix asks nobody for anything.
   - A material change takes effect on a date the admin sets, 14 days ahead by default. From that date the acceptance screen returns at the next sign-in.
   - The email goes out when the version is published; see item 6.

4. **Publishing certification**
   - Above Publish the seller sees the statements that apply to this ad: the global one, plus one for each country where the ad is shown and for the seller's home country, where such a statement exists. Then one required tick: "I certify the above."
   - It is required again when an ad is edited and when it is renewed.
   - The server decides which statements apply and refuses if the screen confirmed a different set.
   - Recorded per ad and per action: the ad, the user, publish, edit or renew, the statement versions, the countries, the time and the language. The admin sees it on the ad's page.
   - Staff helping a user can prepare an ad but cannot certify for them.
   - Draft global wording for your read: "I certify that everything in this ad is true and that I have the right to offer it. I alone am responsible for this ad and for any deal that follows from it. ethio.com only displays the ad; it is not a party to the deal and is not liable for it, as the Terms set out."

5. **Tests and server rules:** as in the first version, plus:
   - a published version cannot be changed;
   - nobody can write another user's acceptance or certification;
   - an ad cannot be published, edited or renewed without the current certification.

6. **The email on a material change.** The app has no general email sending today, only sign-up and password emails. This part is built with the notifications work and needs the sending domain that is already on the launch checklist. Until then the acceptance screen is the notice. The checklist gets a line: the email must be live before the first material change after launch.

This is larger than the first version: my estimate is four to six Lovable turns and two database changes, right after this bundle. It replaces the publish line built this weekend; nothing in the current bundle needs redoing.

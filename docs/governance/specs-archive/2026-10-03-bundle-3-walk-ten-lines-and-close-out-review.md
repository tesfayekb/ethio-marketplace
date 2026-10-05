Source: supervisor thread, turn 1282, Sat 2026-10-03 22:59 New York.
Status at 2026-10-04: walked by the operator on 2026-10-03 23:19 on the published site: nine of ten lines passed; line 6 failed ("dont see that after i entered ፊደል"); his remarks (Telegram box, wrong home country, suggestions from the category, changes left, telebirr1 offered) became the WALK FIXES prompt (file 2026-10-03-bundle-3-walk-fixes-prompt-m4.md).
Related: bundle 3 (dev = main = 9ba4ff73, M1 to M3), DEC-106, DEC-107, DEC-108, INC-409, INC-410, INC-412, INC-413, G19.

## Close-out review

- **Security:** contact details, exact pins and the catalogue are closed to outsiders; limits are enforced in the database; reserved names and "ethio" are refused. Two items are logged for later: the permission function, and a per-account limit on option lists.
- **Functionality:** everything in the brief is built and tested. Lovable's final report mislabels the first migration; I have the correct list for the records.
- **Performance:** the phone library loads only on the contact step (about 29 KB, once). Nothing was added to the first page load.
- **Usability:** this is what your walk decides.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

2. Walk these on the published site. Use a new test account for lines 3 to 7, because your own account already has a confirmed country and a name.

   **Contact step**
   1. "Messages on ethio.com" is one green box marked "Always on", with no switch. Below it is "Optional: phone, WhatsApp or Telegram", and each switch reads "Show to signed-in buyers".
   2. Phone box: letters cannot be typed. Type `0911234567` and leave the box: it shows `91 123 4567`. Switch to the United States and type `435-6554444`: it shows `435 655 4444`.
   3. Home country: the box has a required mark. Picking a country from the list does not lock it. Next refuses and says so at the box. "Confirm this country" locks it, and then Next moves on.
   4. Seller name: `ethio_coffee`, `admin_abebe` and `telebirr_store` are each refused with their own reason and three names to tap. `badminton_shop` is accepted with "This name is free. It becomes yours when you save this step."
   5. Choose "A business" and enter `Awash Bank` as the business name: Next refuses it.
   6. Type a name in Amharic letters as the seller name: a line asks for Latin letters.

   **Review step**
   7. The seller line shows the name and "Member since" with the month and year.

   **With your own account**
   8. Change your seller name twice: both go through. A third change is refused and says when the next one is allowed. The review step then shows "Previously" with the old name.

   **Place lists**
   9. In the place step and the header's location picker, regions, cities and sub-cities are in A-to-Z order. In Amharic they follow the Amharic names.

   **Admin**
   10. On a test user's page, set the seller name to `telebirr`: it asks for a reason, and with a reason it saves. In admin locations, the "display order" box shows only on country rows.

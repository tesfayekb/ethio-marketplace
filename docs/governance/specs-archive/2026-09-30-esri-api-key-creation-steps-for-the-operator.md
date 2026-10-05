Source: supervisor thread, turn 983, Wed 2026-09-30 12:51 New York.
Status at 2026-10-05: operator guidance given 2026-09-30 12:51; the key was created 2026-09-30 and entered in Lovable's secret dialog as ESRI_API_KEY (W6b-2 reads it on the server); the key expires at most one year after creation — the expiry warning was added to the DEC-091 Services page scope, which is not approved and not built; no key appears in this text.
Related: W6b-2, DEC-091, ESRI_API_KEY, ethio-market-dawn.lovable.app.

I'll check Esri's current guide for this wizard so the steps match your screen.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

Here's each screen of the wizard in order, with what to pick. The "public or private" question is step 2: choose **Public application**.

1. **Credential type:** choose **API key credentials**, not OAuth.
2. **"Where will you use these credentials?"** Choose **Public application**.
   - The key has to be sent to each visitor's browser to load the map, so it can't be kept secret.
   - Step 5 locks it to our website, and step 4 limits it to map images.
   - "Private application" would unlock admin-level permissions that must never sit in a browser.
3. **Item access:** choose **No item access**.
4. **Privileges:** under **Basemaps**, tick only **Static basemap tiles**. Leave everything else unticked, including Basemap styles service, Geocoding, Places, Routing and Elevation. Changing privileges later cancels the key and you'd have to make a new one, so it's worth getting this right now.
5. **Expiration and referrers:**
   - **Expiration:** choose the latest date it allows. The maximum is one year.
   - **Referrers:** add these two lines exactly:
     - `https://*.ethio.com` (covers ethio.com and www)
     - `https://ethio-market-dawn.lovable.app` (your published site, which is in the repo)
   - Don't add a `*.lovable.app` wildcard, because that would let any Lovable site use your key. Lovable's preview window will show the free OpenStreetMap tiles instead, which is expected. Always test on the published URL anyway.
6. **Item details:**
   - **Title:** `ethio-marketplace map tiles`
   - **Folder:** leave the default.
   - **Tags:** `ethio, basemap`
   - **Description:** `Browser key for posting-step map tiles; locked to our domains.`
7. **Review:** check that it shows Public, Static basemap tiles only, no item access, and the two referrers.
8. **Generate:** choose **"Generate the API key and go to item details page. I am ready to copy and save the key."** Copy it straight into your password manager, because Esri only shows it this one time. Only generate API key 1. The second slot is for swapping in a new key before this one expires.
9. **Don't paste it here.** When Lovable's secret dialog opens during W6b-2, enter it with the name **ESRI_API_KEY**.

I've added key expiry dates to the DEC-091 Services page scope, so admin will warn you before this key runs out. DEC-091 still needs your "approve DEC-091".

I can't see your screen, so if a field has a different label, tell me its exact wording.

Sources:
- [Create an API key — Location Platform (Esri)](https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/tutorials/create-an-api-key/location-platform/)
- [API key credentials — Location Platform (Esri)](https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/api-key-credentials/location-platform/)
- [Manage API key credentials (Esri)](https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/tutorials/manage-api-key-credentials/location-platform/)

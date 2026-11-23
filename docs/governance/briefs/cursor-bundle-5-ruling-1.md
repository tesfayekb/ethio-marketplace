RULING — cursor-bundle-5, stop 1: your plan approved; the operator's four answers; your fourteen questions. Base: cursor/bundle-5 7054dd769

Save this file bare as `docs/governance/briefs/cursor-bundle-5-ruling-1.md` (new) by a scripted copy; its sha256 is the carrier's. Copy the package's `words.json` and `templates/` by script and prove each by the sha256 lines below; never retype them. Then build STEPS 2 to 8 in a NEW chat on Claude Sonnet 5.5, which first reads the brief, your stop report and this ruling. Where this ruling and the brief differ, this ruling governs.

PREVENTION
- CLASS 1 (the supervisor's): the brief's premise "CI's backend turns on the same settings the hosted projects will have" (P1, P2) was written without reading the pinned CLI's configuration keys. In force for the supervisor: a GO's premise about a vendor setting is read from the pinned vendor source before the GO is sent, file and line cited. Repository: not needed (your `environments` census item caught it).
- CLASS 2 (the supervisor's): I put DEC-433 to the operator without reading that the vendor puts link AND unlink behind one switch (P3). He has now answered the second half (DEC-435). In force for the supervisor: a question to the operator about a vendor setting names every effect of that setting, read from the vendor first.
- CLASS 3 (the supervisor's): SCOPE missed the third failed sign-out's page and INC-1262's own files (P6). The records that queued those items named them. In force: a GO's SCOPE is checked against every file named by the record of each item it carries. The template's `queued` census item already reads those records; `go-template.md` gains that sentence at the next records turn.
- CLASS 4 (the supervisor's, and your words): the brief said "Sign out other devices" for a control whose key reads "Sign out others" (P10). Your words table said "two-step sign-in" where the app says "two-factor authentication" (`mfa.title`, `en-member.ts` :189). In force for both: every word in a GO, a ruling or a words table is grepped in the locale files first. Cursor rules queue (next rules turn): rule 10 — a new key's English uses the app's own terms, grepped.

THE OPERATOR'S ANSWERS (2026-11-23 06:4x New York; each a decision of his):
- DEC-435: the Unlink control goes with Link Google. The Settings methods list reads only, and manual linking is off at the server in both projects. `remove_own_password` stays. This widens DEC-433.
- DEC-436: the server exempts sessions it treats as recovery from the current-password check. This bundle KEEPS the in-app current-password check (`currentPasswordProof`) beside the server's check. It also turns on the "password changed" notice. The gap is recorded only in the Project's private account-security register, never in a committed file (G51). ACT-033 (assigned) is the later turn that moves the e-mail links to the code flow. It also takes the vendor's silent automatic link (your findings 6).
- DEC-437: the security notices go out as one mail each, English then Amharic. The texts are this package's templates. CI sends them from files under `supabase/templates/` (new), copied by `scripts/ci/prepare-local-backend.sh`. The operator pastes the same files into both hosted projects (your §12).
- DEC-438: DEC-434's server half is its own Cursor bundle (bundle 6), right after this one. This bundle builds the client gate and its 20 harness sites, and names the server half under §10 with DEC-438.

THE DECISIONS (by your question numbers)
1. (a): send `current_password` AND keep the browser's verifier (DEC-436 keeps it beyond the hosted keys too). ACS-E1 on CI proves the verifier. The hosted server proves itself on ethio-staging after Publish (§12).
2. (a), by DEC-435. `linkGoogleIdentity` and `unlinkProviderIdentity` leave, with their buttons, their tests' names (`auth-client.test.ts` :49–50) and the keys `settings.linkGoogle`, `settings.unlink`, `settings.unlinked` (`en-member.ts` :33–35 and the Amharic file). The list stays, reading only, with no help line (no support path exists to point to). CF-AUTH-1 also refuses `unlinkIdentity(` in `src/`. S-2 is re-pointed: no Link Google, no Unlink.
3. Recorded in the Project's private register by the supervisor (DEC-436). In the repository it is DEC-436 and ACT-033 by number and title alone. Write nothing more about it in any file, commit or test name.
4. By DEC-437. Kinds ON: `password_changed`, `email_changed`, `identity_linked`, `identity_unlinked`, `mfa_factor_enrolled`, `mfa_factor_unenrolled`. `phone_changed` stays off (no phone sign-in). Each kind gets `enabled = true`, its `subject` from `templates/subjects.json`, and `content_path` to its template.
   - The templates use no template variable and carry no link (a security notice asks the reader to open the site, never to click). Read from the vendor whether a notice template with no variable is accepted and sent; if not, STOP with the line.
   - ACS-E4 (new): a password change on CI sends `password_changed` to the account's address, read from the mail sink. Its subject equals `subjects.json`'s.
5. `getUser()` for the pending address: one CF-SESSION-3 allowlist line under DEC-439 (assigned, the supervisor's): "the Settings page reads the server's user once on load and once after an e-mail change, for `new_email`; the local session may be stale when the change is confirmed on another device; its failure is typed and said in the e-mail section". Its `until` is DEC-439. No other read.
6. THE BRIEF'S SCOPE GROWS BY `src/routes/auth_.reset.tsx` and its tests (`src/routes/auth-forms.test.tsx`). A failed sign-out of other devices there says `auth.resetOthersStillSignedIn` (new, in the words file). Settings says `settings.othersStillSignedIn`.
7. THE BRIEF'S SCOPE GROWS BY `scripts/public-surface.ts`, `scripts/public-surface.test.ts`, `scripts/check-migrations.sh` and `scripts/fixtures/` (INC-1262 in Part 1).
8. By DEC-438.
9. Agreed: `efield` is the entity door's last tie-breaker, an order change for tied rows only. The status read's failure: the person stays signed in, and the failure is named and reported to the shell's one notice. The signed-in screen never waits on it.
10. `chooseInList` by the option's value test id (J5). THE BRIEF'S SCOPE GROWS BY `src/routes/dev.style.tsx`: two SelectLists on the style board (7 and 9 options, fixed data, test ids `style-select-7` and `style-select-9`), outside every grid a law counts. SLH-1 and SLH-2 run there.
11. Agreed: the list at `docs/governance/briefs/<records stem>.records.sha256`, and the body line `Records list: <path> sha256 <64 hex>`. Two laws:
    - The body is parsed by one anchored pattern: `^Records list: (docs/governance/briefs/[a-z0-9-]+\.records\.sha256) sha256 ([0-9a-f]{64})$`. Neither group ever reaches a shell unquoted, and nothing in the body is evaluated.
    - The trust basis is written in the script's header: the body is written only by the supervisor when it opens the pull request (G76), and Lovable has no path to it.
    Planted (you listed four): a body whose path holds `..` or a space → refused.
12. `ClosedPrimary` with its own missing-choice line is an action: yes. The gallery line's `until` is `2027-05-23` (re-read then).
13. `same_password` → `auth.errorSamePassword` (new). `reauthentication_needed` → `auth.errorReauthNeeded` (new). That code is INC-1267 (assigned), and its text is under RECORDS. "Secure password change" stays ON at the hosted projects: its 24-hour rule still covers an old session the recovery exemption lets through. `manual_linking_disabled` gets no word: after DEC-435 no caller reaches it. `current_password_invalid` and `current_password_required` → `auth.errorWrongCurrentPassword`, as planned.
14. Approved: CF-AUTH-1, CF-SESSION-5, DG-12, DG-13, FD-U1, BT-U1, ACS-U1 → U6, ACS-E1 → E4, STAFF-E1, STAFF-E2, AG-U1 → U4, SLH-1, SLH-2. All are free (searched in `src`, `e2e`, `scripts` and `docs` at the base).

THE WORDS: the package's `words.json` holds ten keys (`layer`, `en`, `am` each), copied by script into `en-<layer>.ts` and `am-<layer>.ts`. It REPLACES your table: the app's term is "two-factor authentication". `bun run i18n:usage` after, and the maps diffed. Removed keys: `settings.linkGoogle`, `settings.unlink`, `settings.unlinked`.

FINDINGS FILED (G64, G71)
- 1 (the listener's hop), 2 (the second status read), 3 (`getAal`), 4 (the provider codes' words) and 8 (the tie): built here, as planned.
- 6 → ACT-033 (DEC-436).
- 7 → bundle 6 (DEC-438).
- 9 → INC-1268 (assigned), text under RECORDS.
- 10: INC-564, INC-566 and INC-567 have their code half built by Part 4. Each closes when its hosted setting is set and read back after Publish (your §12). Write them by number alone, with "code half built (cursor-bundle-5); closes with the hosted setting".
- 5: no change.

SIDE BY SIDE: Lovable's bundle 7 is building on `lovable/next`. It changes `src/lib/reader-failure.ts` (the class `ReaderError` gains `readonly code`, set from its `failure.code`) and six admin console services: categories, category images, attributes, locations, countries, AI. You touch none of them. If your census later reaches one, STOP. The supervisor measures the merged tree before the second merge (S756).

THE MIGRATION STOP (Part 2): the file drops and recreates two functions, so the operator applies it on ethio-staging from one message of my links (DEC-384). Its stop report carries `bun run db:proof --fresh` PASS, the pairing line, every body's md5, and `has_function_privilege` for anon, authenticated and PUBLIC. Push and STOP. The client types arrive as my patch with ruling 2.

RECORDS (for your report's Records section, word for word; the records turn imports them):
- DEC-435 — the operator, 2026-11-23: the Unlink control goes with Link Google; the Settings methods list reads only; manual linking off at the server in both projects (widens DEC-433).
- DEC-436 — the operator, 2026-11-23: the in-app current-password check stays beside the server's; the "password changed" notice on; the remaining gap is held in the private register; ACT-033 is its later turn.
- DEC-437 — the operator, 2026-11-23: one security notice mail per kind, English then Amharic, from the repository's templates (CI and both hosted projects).
- DEC-438 — the operator, 2026-11-23: DEC-434's server half is Cursor bundle 6, right after bundle 5.
- DEC-439 — the supervisor (G17): the Settings page reads the server's user for the pending e-mail address, once on load and once after a change (CF-SESSION-3, one line).
- INC-1267 — a password change in a session older than 24 hours is refused with `reauthentication_needed` (hosted "Secure password change") and the page showed the generic line; fixed by `auth.errorReauthNeeded` (cursor-bundle-5). Class: a provider refusal with no word. Mechanism: `AUTH_REFUSALS` (`src/features/auth/auth-error-key.ts`).
- INC-1268 — `src/i18n/provider.tsx` (`useAuthIdentity`) subscribes to the auth state on its own, beside the shell's one store. Class: one session store (INC-1247). Owner: Cursor bundle 6.
- ACT-033 — move the e-mail links (sign-up confirmation, e-mail change, reset) to the code flow, and name the vendor's silent automatic link (DEC-436). Owner: a later Cursor turn; its spec and the operator's yes first.

THE PACKAGE (sha256):
- `b524dce4bb841cc0d1678b2899fbe524c12e857c698bcc5f6eec6f814245e554  words.json`
- `24292c06bbfa0a57beae897d08d1e83fa4f82a56bbd8cfcd460ec2d72f024be9  templates/password_changed.html`
- `016cd7592feb5265a8e34a1e72ab2138b87279e54434bbf4e27c7290fd56eb87  templates/email_changed.html`
- `fd1f14ddcd4b1ff25c798b71e402403eb9d326d20726aaa3edea130bfa4018b2  templates/identity_linked.html`
- `a55653c7767049227d98273fc46c99d85cf117a0976fb220168578bd446e7ed1  templates/identity_unlinked.html`
- `094090e327fb6b296d74d2bcf43d1458b39f7c68d9d51230e2d0b131d69b8906  templates/mfa_factor_enrolled.html`
- `28fa233b9f73f372f7436858428daf1e227f5917aede0c86ccee17d5b287c161  templates/mfa_factor_unenrolled.html`
- `fc54372aabcc8d8f84b28276018edf9efad041afd48490108713b31d3d6f16ee  templates/subjects.json`

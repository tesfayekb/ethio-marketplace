# P-1c turn (b) — ruling 1 (the plan approved with eight answers)

```text
RULING — P-1c, turn (b), ruling 1: the plan is APPROVED with eight answers. Base: cursor/p1c-guides-b at 15ac9bc7c (dev eb72f3bdf).

MODEL — Claude Fable 5.1 (High), this same chat. Build (b1) then (b2) in this pull request; the strings last; the Amharic file (89 keys) reaches this chat within the hour — STOP at the strings commit if it has not.

1. THE EIGHT ANSWERS
1) The +0.9 KiB on every page — try (ii) FIRST, measured: one chunk group in vite.config.ts (SCOPE extended by that file, that change only) pinning `spinner` and `on-demand-notice` to the entry so a lazy chunk imports them from the entry instead of splitting them out. Rule: if every unguided page returns to +0.0 and the guided pages keep the control's own cost (your table B), take it and name it on the entry's line; if it does not hold, or costs the entry more than the two modules' own size, fall back to (i) — carry the +0.9 with its cause on every moved line (DEC-296's form). Either way the build STOPS if any page grows beyond the numbers your §4 measured for the form you take.
2) `prim.guide.open` → base (both languages); `prim.guide.what/columns/parts/how/next` → the guide layer — yes.
3) The edit wizard shares the eight part lines (`partsPrefix`) with its own what/how/next — yes.
4) The ad page's next → /post in both sign-in states — yes.
5) One wizard guide with the current step marked (`aria-current="step"`), no per-step guides — yes.
6) Excluded routes as listed, each written in the guard with its reason — yes.
7) The admin allowlist's until → 2026-11-24 — yes.
8) SCOPE as your §8, plus vite.config.ts for 1) only; FLAGS no-migration, no-package-change.

2. THE MECHANISM SHAPE — approved as your §2: `guide-sheet.tsx` the one body host, `page-guide.tsx` the page form (a plain button on first paint; the sheet mounted on the first tap and kept), `partsKind` with the one grammar, `GuideNext` as the union with `keyof FileRoutesByTo`, the admin context read nullable, the ad page's control in the actions row as the last item, every other page's in the row that carries its name. One addition: the page form's button and the table form's tile share one label, one icon and one `aria` contract — a unit test asserts both forms render the same accessible name and `aria-haspopup`.

3. THE TEXTS — approved with four edits; the prefixes exactly as your §5 names them (adPage, feed, sellerPage, auth, account, saved, settings, myListings, myListing, post, post.edit):
   a. myListings.guide.how reads: "Open an ad to edit, renew, mark sold or delete it. Each market lets you keep a number of Regular ads live at no cost." (the clause "past that, an ad needs a paid level" goes — P-2 is not built; the guide must not promise a rule the app does not yet apply).
   b. post.guide.how reads: "Each step saves when you press Next. A phone number in the text, too many photos or a place beyond your plan is refused with a note saying what to change." (the last sentence goes, for the same reason).
   c. adPage.guide.how gains one sentence at the end: "Never share your bank or card details in a message."
   d. auth.guide.parts.password reads: "At least the length shown; a phrase of several words is strong and easy to remember."
   Everything else stands word for word. The Amharic follows as p1c-am-strings-b.md with its sha256: paste its blocks beside the English (am-base one key; am-guide the rest), key order kept, no value altered.

4. TESTS AND GUARD — as your §6 (UG-1 → UG-9, the unit tests, CF-GUIDE-1's route census with the exclusions written in the guard). UG-7's request assertion is the proof of §5's "nothing but the control on first paint".

5. THE REPORT per rule 60: the file list from `git diff --name-only 15ac9bc7c`; the form taken for answer 1) with the measured table (base, tree, per page); every key added or moved by layer (EN + AM); the budget lines; the test-count line; the K2 list; Limits; the PR's CI line; the walk subject: the Guide on the ad page signed out, on the posting wizard, on My listings; the Amharic once. A red is a STOP when its failure or server log touches a path this turn changed; otherwise Limits and CI judges. A security-shaped finding is a STOP described in chat only (G51).
```

The Amharic file named by §3 reached the operator's computer as `p1c-am-strings-b.md`
(sha256 `7ce74aa6902668c580916c17cbb157a20d579a257ca19c8e88d727c742509199`, 89 keys: its
header places `prim.guide.parts` in am-base; answer 2 places it in the guide layer, and answer 2
governs — the report names this).

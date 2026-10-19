import { CutText } from "@/components/ui/cut-text";
import { ChevronDown, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import type { Language } from "@/i18n/types";
import { cn } from "@/lib/utils";

const LABEL_KEYS = {
  en: "language.english",
  am: "language.amharic",
} as const;

const SHORT_KEYS = {
  en: "language.enShort",
  am: "language.amShort",
} as const;

/**
 * ONE language affordance at EVERY width, in two presentations split at `md`:
 * phones get the compact code ("EN ▾") because the bar is minimized there;
 * tablets and up get the language NAME ("English ▾"), so nothing has to be
 * decoded. Either way the menu lists all languages INCLUDING the current one
 * (ticked). There is deliberately no second control.
 *
 * U4f (INC-098) — the OPTIONS come from the publication gate's own source (the
 * `languages` table's public RLS SELECT: enabled_public OR is_base), ordered by
 * `sort`, labelled with the native name. A static list is exactly the bug: a
 * consumer of a gated list must read the gate.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, t, publicLanguages, star, setStar } = useI18n();

  const shortKey = SHORT_KEYS[language as keyof typeof SHORT_KEYS];
  const fullKey = LABEL_KEYS[language as keyof typeof LABEL_KEYS];
  const activeRow = publicLanguages.find((row) => row.code === language);
  const shortLabel = shortKey ? t(shortKey) : language.toUpperCase();
  const fullLabel = fullKey ? t(fullKey) : (activeRow?.name_native ?? language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-testid="language-switcher"
          aria-label={t("language.label")}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-0.5 rounded-md px-1.5 text-sm font-medium",
            "text-muted-foreground hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          {/* TWO labels, one visible at a time. They are marked so a test (or
              anything else reading the control) can assert the RENDERED label
              rather than the button's concatenated text content (INC-033). */}
          <span lang={language} data-testid="language-switcher-short" className="md:hidden">
            {shortLabel}
          </span>
          <span lang={language} data-testid="language-switcher-full" className="hidden md:inline">
            {fullLabel}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1">
        {/* U4g-3 (INC-099b) — (sort, code): the SAME ordering law the admin
            roster applies, so what the operator arranges is what visitors see.
            U4i-4 (c) (INC-123) — DENSITY IS A CONTROL, NOT A CANVAS: one row
            per language on ONE line (check · label · star), ~12rem wide, no
            vertical slack. The star keeps a ≥44px touch target on phones via
            padding and shrinks to an icon-sized hit area from `md` up. */}
        {[...publicLanguages]
          .sort((a, b) => a.sort - b.sort || a.code.localeCompare(b.code))
          .map((row) => {
            const key = LABEL_KEYS[row.code as keyof typeof LABEL_KEYS];
            const starred = star === row.code;
            return (
              <DropdownMenuItem
                key={row.code}
                lang={row.code}
                data-testid={`language-option-${row.code}`}
                // U4i-7 — DENSITY IS A CONTROL, FINAL (INC-125): rows at
                // `py-px`, half again from `py-0.5`; leading stays tight and
                // the 12rem menu width is unchanged. The star keeps its own
                // ≥44px touch target, so the row never becomes untappable.
                className={cn(
                  "flex min-w-0 items-center gap-1 py-0.5 pe-1 ps-2 leading-none",
                  row.code === language && "bg-accent text-accent-foreground",
                )}
                onSelect={() => setLanguage(row.code as Language)}
              >
                <CutText className="flex-1" text={key ? t(key) : row.name_native} />
                {/* U4h — the DEVICE ★. One favourite: `aria-pressed` is true on
                    exactly one row because the provider's setter REPLACES the
                    star rather than appending to a set. The click never reaches
                    the menu item's own select handler — starring already
                    selects, and a double-apply would fight it. */}
                <button
                  type="button"
                  data-testid={`language-star-${row.code}`}
                  aria-pressed={starred}
                  aria-label={t(starred ? "language.starred" : "language.star")}
                  title={t(starred ? "language.starred" : "language.star")}
                  // INC-748 — the star is a control inside a menu item. Radix's MenuItem clicks ITSELF on a pointerup it saw no pointerdown for (@radix-ui/react-menu, MenuItem's onPointerUp), which selected the row and closed the menu before the star's own click could land — on the iPhone it never did. Both halves of the press stop here, so the row never selects on a star tap; the star's click sets the star (setStar also selects the language) and the menu stays open, the star filled." The onClick stays as it is. Nothing else in the switcher changes.
D2. The class census (G29), in the report: every control nested inside a DropdownMenuItem, ContextMenuItem or MenuItem in src — file:line and how a tap on it reaches its own handler; fix any other the same way.

PART E — THE PEEK ON EVERY PAGE LOAD (D216).
E1. src/components/shell/app-rail.tsx, the peek effect (:788-809, from "// D206: one fixed session word; denied storage deliberately disables the peek."): outside test runs no storage is read or written — the peek shows once per page load (the existing peekAttempted ref; a reload is a new load) on phones, on the marketplace panel, on "/" and "/c/…", as today; under test (isE2E) it shows only when the tab's sessionStorage word "ethio.peek" is "force" (PK-1's init script), read inside a try (a throw means no peek). Nothing writes "seen" any more: the line at :802 goes, and the effect that writes "seen" whenever the menu opens (:811-818, `if (!navOpen) return; try { sessionStorage.setItem("ethio.peek", "seen"); …`) is removed. The comment says D216 (the operator, 2026-10-18: on every load, a reload included; never on an in-app navigation) and that it changes D206's once a visit. The 3-second fold, the no-focus rule and the closers (a tap, a scroll, a key) stay.

PART F — THE AMHARIC FAVOURITE LINE (D217).
F1. src/i18n/locales/am.ts :397: `"shell.favouriteHint": "{category} ተወዳጅዎ ይሁን",` becomes `"shell.favouriteHint": "{category} ተወዳጅዎ ያድርጉ።",`. Copy it from this file; never retype it. Paste the value's code points in the report (`grep "shell.favouriteHint" src/i18n/locales/am.ts | python3 -c "import sys; s=sys.stdin.read(); print([hex(ord(c)) for c in s[s.index('{'):s.rindex(chr(34))]])"`) — expected ['0x7b', '0x63', '0x61', '0x74', '0x65', '0x67', '0x6f', '0x72', '0x79', '0x7d', '0x20', '0x1270', '0x12c8', '0x12f3', '0x1305', '0x12ce', '0x20', '0x12eb', '0x12f5', '0x122d', '0x1309', '0x1362']. English and every other key unchanged.

PART G — "ANY AREA" FOR THE COUNTRY IS REMEMBERED AS EVERYWHERE (INC-750; D219).
G1. src/components/shell/location-data.ts: the cookie `ethio_area` gains one more shape, `everywhere:<ms>` — the person's own choice of every area, with its time. Add `writeEverywhereCookie(at: number = Date.now())` (same Path, Max-Age and SameSite as writeAreaCookie, :97-100), `parseEverywhere(raw: string | null): { at: number } | null` (exactly that shape — the word, a colon, 1–15 digits — else null) and `readEverywhere()` (read like readAreaCookie, :86-95). parseAreaCookie (:77-84) is unchanged and returns null for the new shape, so every reader of a saved PLACE — the posting wizard's readAreaCookie()?.country (wizard.tsx :344, :986; step-where.tsx :855, :1000, :1094; step-who.tsx :261; step-review.tsx :546, :586) — behaves as with no saved place, exactly as after "Any area" today. The comment at :26 ("THE SAVED AREA (law 12) is the cookie `ethio_area`, shaped `<CC>:<node id>`, …") names the new shape and D219.
G2. src/routes/__root.tsx :83-84: AREA_SHAPE also accepts `everywhere:<1–15 digits>` (case as written), so the server hands the shell the same choice the browser holds.
G3. src/components/app-shell.tsx: (a) beside savedArea (:170-174) an `everywhere` memo read the same way (deriveTick === 0 ? parseEverywhere(areaCookieRaw) ?? readEverywhere() : readEverywhere()); (b) guessCountry (:176-181) also requires `everywhere === null` — the guess never overrides an own choice; (c) clearPick (:247-252) writes the everywhere cookie (writeEverywhereCookie()) in place of clearAreaCookie(), its other lines unchanged (the account's place is still cleared through saveToAccount(null)); (d) the sign-in carry (:495) passes this browser's choice — a place, or everywhere with its time — to chooseCarry. The shell keeps publishing `locationCountry: treeCountry` (:809): with everywhere chosen, savedArea and the guess are both null, so it is null and the picker shows "Country" with no deeper level.
G4. src/components/shell/place-carry.ts, chooseCarry (:66-78): the device side may be the everywhere choice with its time. With a usable account place: the account's time newer or equal → apply (as for a place); everywhere newer → upload null (the account's place cleared). With no usable account place → none. Its comment says D219.
G5. The class census (G29), in the report: for the country and each deeper level, what its "Any area" saves and what a reload then shows; any level whose choice a reload loses is fixed in this turn (the deepest remaining place is saved), named with its line.

PART H — THE TESTS (written by you; CI runs the e2e files on your last commit).
H1. SR-1 (e2e/shell.spec.ts :1238, "SR-1 search opens a row below the bar, beside the strip, as the page"): keep every assertion; add, while the row is open: the search input's computed font-size is at least 16 px; the trail (`[data-testid="shell-subband"] [data-testid="breadcrumbs"]`) is visible and its top is at or below the row's bottom (−1 px); `document.elementFromPoint` at the trail's first crumb's centre is inside the trail (nothing covers it). Measure the trail's top before the row opens; after Escape the row is gone and the trail's top is back there (±1 px).
H2. TR-27's helper `starLanguage` (:2116-2122): after the star click, the menu is STILL OPEN — `language-star-${code}` is visible with aria-pressed "true" — and <html lang> is the code; then Escape closes the menu (the switcher visible). Every other user of the helper keeps working (name each in the report).
H3. TR-41 (new, in the "U4h device language star" describe, :2114): "TR-41 a starred language stays the default after another is chosen". Signed out, both projects: star am through the helper; reopen the switcher and choose English by its row (`language-option-en`) → <html lang> "en"; reload → <html lang> "am" (the device star outranks the last choice — docs/features/translations.md, U4h's precedence), and in the reopened menu `language-star-am` has aria-pressed "true" and `language-star-en` "false". Without D1 the helper's still-open check fails (red today in Chromium); without the star itself the reload reads "en".
H4. FF-1 (new, in the "SHELL — the phone page never widens (bundle 21 turn 10)" describe, :3814; mobile-360 only — skip the other project as PK-1 does): "FF-1 every text field is at least 16 px on a phone". On each page: "/" with the search row open; "/auth"; signed in (the pool's lease and sign-in helpers), "/post" at its first step and "/settings" — every visible input (not checkbox, radio, range, file, color, hidden, button, submit, reset, image), textarea and select has a computed font-size of at least 16 px; the failure message names the page, the field's data-testid (or name, or tag) and its size. A test reaches the pages it names only; no real row is written.
H5. PK-1 (:3447) follows D216: its title becomes "PK-1 the forced peek opens without focus, folds, and shows again on every load"; it loads "/c/electronics" (a real category, read only, by slug); the record counts shows; the first load shows and folds within 5 s without focus (as today); the session word is still "force" afterwards (it was "seen"); after a reload the peek shows and folds again; then an in-app navigation to "/" through the trail's Home link shows no peek within 4 s of the new page's data-app-ready. The force word keeps every other test free of the peek.
H6. "Any area" (INC-750, D219): LS-2 (e2e/shell.spec.ts :2367, "LS-2 a pick is remembered, clearing forgets it") becomes "LS-2 a pick is remembered; Any area is remembered as everywhere" — after its reload check, "Any area" on the country: the cookie becomes `ethio_area=everywhere:<digits>` (no "ET:"), the country picker reads en["location.country"], no region picker is shown; after a reload the same, the row's data-area-source "chosen". VP-6 (e2e/viewing-place.spec.ts :301, "… any area clears it"): the account's place still becomes null; the cookie now matches /^everywhere:\d+$/ (its title's "clears it" becomes "clears it on the account and remembers every area here"). EV-1 (new, beside LS-2): "EV-1 a guessed country never overrides Any area" — `page.context().setExtraHTTPHeaders({ "cf-ipcountry": "ET" })` as :2505 does; load "/": the country picker shows the guessed market; choose "Any area" for the country → the picker reads en["location.country"] (not the guessed country), no region picker, the feed's heading is en["nav.allListings"]; reload → the same. Unit (place-carry.test.ts): parseEverywhere's shapes (accepted; refused: no digits, a 16-digit time, a place cookie, garbage), and chooseCarry with everywhere on the device (account newer → apply; everywhere newer → upload null; no account place → none).
H7. Unit: src/components/language-switcher-star.test.tsx gains a case driving the real press on a star — `fireEvent.pointerDown`, `fireEvent.pointerUp`, then `fireEvent.click` on `language-star-en` — that proves setStar("en") was called, setLanguage was NOT called by the row (the row did not select), and the menu is still open (the other star still in the document). Show it failing on the old switcher locally first (restore the old file in your sandbox, run, put it back — never commit the old code), then passing. `bun run test:unit` whole.

PART I — DOCS AND THE ROADMAP.
I1. docs/features/design-foundation.md — after the sentence "The footer's "Buy and sell" is centred under the wordmark from 768 px (bundle 21 turn 13).", one sentence: "Below 768 px every text field is at least 16 px — one unlayered rule in styles.css, so iPhone Safari never zooms into a field (INC-747, bundle 21 turn 14)."
I2. docs/features/panels.md :112 — "The peek opens once a visit on phones (sessionStorage `ethio.peek`), without taking focus; it is off under test unless forced." becomes "The peek opens on every page load on phones, a reload included, never on an in-app navigation (D216), without taking focus; it is off under test unless the tab's `ethio.peek` word is `force`."
I3. docs/features/admin-shell.md :215 — "its height and the open search row overlays the page; from md up it is 56px." becomes "its height; the open search row is the first row of the sticky sub-band and pushes the page down (INC-749); from md up it is 56px."
I4. docs/features/translations.md, "## U4h — the device ★" (:623), after the paragraph that ends "structural rather than policed.": "A tap on the star sets it without selecting the row, and the menu stays open with the star filled (INC-748: Radix's menu item clicked itself on the pointerup and closed the menu first)."
I5. docs/features/location-scoping.md :45-47 — "clearing the country forgets it." becomes "'Any area' for the country saves `everywhere:<ms>` — every area, the person's own choice — and the guess never overrides it (D219, INC-750)."; and :197 — "'any area' clears both." becomes "'any area' saves every area here (`everywhere:<ms>`) and clears the account's place."
I6. docs/_changelog.md APPEND one line: "- 2026-10-18 — Bundle 21 turn 14 (no migration): the walk's findings — every text field at least 16 px on phones (INC-747, the iPhone zoom); the search row in the sticky sub-band (INC-749); the language star takes on a tap (INC-748); the peek on every page load (D216); the Amharic favourite line (D217); 'Any area' for the country remembered as everywhere, the guess never over it (INC-750, D219); SR-1, TR-27's helper, PK-1, LS-2 and VP-6 follow; FF-1, TR-41 and EV-1 new."
I7. roadmap.md as STEP 0 says.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bun run i18n:map-guard` matches; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; the preview harness's "build OK".
SCOPE — these files only: the brief; src/styles.css; src/components/shell/app-header.tsx; src/components/shell-context.ts; src/components/app-shell.tsx; src/components/language-switcher.tsx; src/components/language-switcher-star.test.tsx; src/components/shell/app-rail.tsx; src/i18n/locales/am.ts; src/components/shell/location-data.ts; src/routes/__root.tsx; src/components/shell/place-carry.ts; src/components/shell/place-carry.test.ts; e2e/shell.spec.ts; e2e/viewing-place.spec.ts; docs/features/design-foundation.md; docs/features/location-scoping.md; docs/features/panels.md; docs/features/admin-shell.md; docs/features/translations.md; docs/_changelog.md; roadmap.md; any file D2's or G5's census must fix (named with its control or level); and the files of any Part A fix (named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change. No migration. No AGENTS.md change. No new module.
THE REPORT: done or not done by part; the six ci-status lines with the run's number and commit (and the failed tests' and jobs' names if red) and <START>; B2's, D2's and G5's census lists; H2's list of the helper's users; F1's code points; H7's red then green lines; `git diff <START> --stat`; `git diff <START> -- src/styles.css src/components/shell/app-header.tsx src/components/shell-context.ts src/components/app-shell.tsx src/components/language-switcher.tsx src/components/shell/app-rail.tsx src/components/shell/location-data.ts src/components/shell/place-carry.ts src/routes/__root.tsx` whole; `git diff --name-only <START>`; the checks; anything not foreseen. Then push and END THE TURN; the operator Publishes when CI is green and re-walks the changed lines.
REVERT: git revert of this turn's commits (forward only).
```

                  onPointerDown={(event) => event.stopPropagation()}
                  onPointerUp={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setStar(row.code as Language);
                  }}
                  className={cn(
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md md:h-9 md:w-9",
                    "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    starred ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Star aria-hidden="true" className={cn("h-4 w-4", starred && "fill-current")} />
                </button>
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;

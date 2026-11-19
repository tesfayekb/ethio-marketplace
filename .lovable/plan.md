# L16 monetisation-price-path — PLAN (nothing changed)

Branch `lovable/monetisation-price-path` (sandbox `edit/<id>`), base dev `8ac9908f8`. CI on the base is read again at the start of the build. Nothing in the tree was changed while planning.

## (b) Mechanisms that already exist (read at the base)
- **Product opener:** `product-name-toggle.tsx:24-44` is the `product-<key>-open` button, with `aria-expanded` and `aria-controls=…-details`. `products-section.tsx:82-103` keeps the `open[]` list, opens the product the hash names and scrolls to the frame. `:291` passes `expandedRow` to `ProductDetails`.
- **Product contents:** `product-details.tsx:37-50` shows `LevelOverridesTable` (perks) and then `ProductPricesTable`, with frame ids `product-<key>-perks` and `product-<key>-prices`.
- **Prices table:** `product-prices-table.tsx:69-70` builds the flat scope text "Market · Category" (`price-<id>-title`). `:172` is the add button (`price-add`), `:193` the empty line (`prices-empty`).
- **Side panel:** the house Sheet is `src/components/ui/sheet.tsx:46-71`. It is modal, uses the dialog look, and defaults to `side="end"`. The only console that opens one is `src/features/admin/translations/history-drawer.tsx:126-127`, a Sheet with `onOpenChange` from a button.
- **D322:** it is the submenu's reflow rule (`submenu-impl.tsx:241`). The Sheet does not follow its opener — see (g).
- **Set-up steps:** `OrderStrip` (`src/components/shell/order-strip.tsx:35-85`) has states `set` and `needsRow`, an optional detail, and a link per step. `monetisationSteps` (`monetisation-order.ts:62-108`) fills them.
- **The price date rule:** `priceHolds` (`monetisation-order.ts:44-49`) is private and needs a market. Its date half (`validFrom ≤ now`, `validTo` empty or later) is the rule to reuse.
- **Money and dates:** `moneyText` (`src/lib/format.ts:139`) and `dateFormatter` (`format.ts:84`, used at `products-section.tsx:77`).
- **Empty and error lines:** there is no empty-state primitive. Empty states are the DataTable's `emptyState` slot (C4: a caption beside the controls). `ActionMessage` (`src/components/ui/action-message.tsx:22`) is the error/warning line.
- **New product:** `product-editor.tsx:125-126` runs `mutateAsync`, then `onClose()`. It does not report which key was saved.

## (c) The seven points
1. **Price on the row.** A new "Price" column on level and reach rows (`product-<key>-price`). It shows the standard price as `moneyText`, plus "+N exceptions" when any hold now. With no standard price holding now it shows a warning badge, "No price yet".
   - "Holds now": I export the date half of `priceHolds` as `priceHoldsNow(price, nowIso)`. `priceHolds` then calls it, so the date rule is written once. CF-PRICE-1 is safe: rows are shown as they are, nothing is picked or computed.
   - Not built: a currency column, or a second warning elsewhere.
2. **One product, one place.**
   - `ProductDetails` moves out of `expandedRow` into a Sheet on the end side, titled with the product's name. Order: Prices, then Perks (levels only), then Details. Details is a read-only `DetailPanel` of the fields the table hides, with the existing Edit button.
   - On the row: `product-<key>-open` stays the opener and carries `aria-expanded`. It becomes a visible labelled button, "Prices & details", after the name. The name stays a plain label.
   - The hash `#product-<key>-prices` (or `-perks`) opens the panel and lands on that frame. Closing the panel clears that hash.
   - Not built: a second opener, or the expandable row.
3. **New product leads to its first price.** `ProductEditorDialog` gets an optional `onCreated(key)`, called after the save succeeds. Edit is unchanged. On create, the section opens that product's panel at Prices with the add-price dialog open. Closing it leaves the row reading "No price yet".
4. **Standard price and exceptions.**
   - `ProductPricesTable` keeps one DataTable, sorted into three groups by a new pure `priceGroups(rows, nowIso)`:
     - **Now:** the standard price first, then the exceptions.
     - **Scheduled:** the start is in the future.
     - **Ended:** behind one disclosure (`product-<key>-prices-ended`).
   - The scope cell says what the row overrides, in words: "Standard price", "Exception: {market}", "Exception: {category}", "Exception: {market} · {category}".
   - Doors and their arguments are unchanged.
   - Not built: an "effective price" preview (CF-PRICE-1).
5. **Set-up steps.**
   - `OrderStrip` already numbers the steps and links each one. The change is in `monetisationSteps`: each link points to the exact place. Markets goes to the markets block. Products goes to the levels block, or the reach block when only reach is missing. Prices opens the first unpriced product's panel, as today.
   - When all three are Set, the strip draws in one line. That needs an `OrderStrip` prop, which is a shared primitive — see (g), STOP-ask.
6. **Empty states that guide.**
   - Each empty slot gets one sentence of what is missing and what it stops, plus its fixing button: levels, reach, prices, perks, markets.
   - The prices empty state is the panel's own Add price button. It is not repeated in the toolbar while the list is empty.
   - Not built: a page-level banner. The missing price is already the row's warning and the step's state.
7. **One sentence before save.**
   - A pure `priceSummary(values, names, language)` in `price-forms.ts` builds the sentence, for example "Gold, in Ethiopia · every category, 150 ETB, from 20 Nov 2026."
   - It uses `moneyText` and `dateFormatter` and draws under the form, above the buttons, in `price-dialog.tsx`.
   - It shows only once the amount passes `AMOUNT_PATTERN`. It is not a help line on any field.

## (a) Files (all in `src/features/admin-monetisation/` unless named)
| File | Change | Tests |
|---|---|---|
| products-section.tsx | price column, panel state, hash, onCreated | `monetisation-page.test.tsx` (extend) |
| product-name-toggle.tsx | visible labelled opener | same |
| product-details.tsx | Sheet wrapper, order, Details | new `product-details.test.tsx` |
| product-prices-table.tsx | groups, scope words, Ended disclosure | new `product-prices-table.test.tsx` |
| product-price-cell.tsx (new) | the row's price/warning cell | covered by `monetisation-order.test.ts` |
| monetisation-order.ts | `priceHoldsNow`, `rowPrice`, `priceGroups`, step links | `monetisation-order.test.ts` (extend) |
| product-editor.tsx | optional `onCreated` | `monetisation-field-gates.test.tsx` (extend) |
| price-forms.ts, price-dialog.tsx | `priceSummary` and its line | `monetisation-forms.test.ts` (extend) |
| products/markets/level-overrides empty states | guiding sentence and button | `monetisation-page.test.tsx` |
| `src/i18n/locales/en-admin.ts`, `am-admin.ts` | new keys (Amharic from the supervisor) | — |
| the two usage maps | regenerated | — |

`monetisation-service.ts` stays read-only; no shape guard moves.

**Outside the folder, for a ruling:**
- `src/components/shell/order-strip.tsx`, for the one-line form. If refused, I drop the one-line form and the strip stays a grid of three Set cards.
- No other shared primitive is touched.

## (d) Tests that would break, for a ruling
- **MON-4 `e2e/admin-monetisation.spec.ts:703-704`:** it clicks `product-<key>-open` on the row again and expects the prices frame to be gone. With a modal Sheet the row sits under the scrim, so the click fails. I propose the panel's close button and Escape close it, the row's `aria-expanded` falls back to false, and the spec changes to "close" (the supervisor's `e2e/` edit). The alternative is a non-modal Sheet — see (g).
- **`openProduct` helper `:103-108`** (used by MON-1 :533, MON-4 :697, MON-6, MON-8..11, MON-17):
  - It clicks the row's `-open`, expects `aria-expanded=true` and the prices frame visible. That still holds, because the frame lives in the panel.
  - But a second `openProduct` call for another product, while one panel is open, clicks under the scrim. I need to check during the build whether any test opens two products without closing.
- **MON-16 `:1495-1501`:** the step's link puts `#product-<key>-prices` in the address, the frame shows and the row's opener reads `aria-expanded=true`. This is kept: the hash opens the panel.
- **MON-1 `:503`, MON-16 `:1477-1507`, MON-17 `:1533-1570`:** they read step ids, `data-state` and `-detail`. Kept. Done steps add no detail, so `-prices-detail` count 0 at `:1560` still holds.
- **MON-8 `:1043`:** `price-<id>-title` expects the text "Market · Category" (`toHaveText`). The new wording ("Exception: …") breaks it. Either the spec reads the new words, or the title keeps "Market · Category" and the "Standard/Exception" word sits in a separate element (`price-<id>-kind`). I propose the separate element, so the spec stays as it is.
- **MON-4 `:698-701`, MON-8 `:1062`:** `-perks-empty` and `-prices-empty` keep their ids. The text changes, and the tests check only visibility.
- **`admin-guides.spec.ts:73-77`:** finds `-open` on the drawn twin, inside `product-<key>-card` on phones. Kept on both twins.
- **AG-1** opens a level, and the guides inside the panel are modal over modal. This needs a ruling on whether Guide sheets may open from inside the panel.
- **`phone-frame.spec.ts:80`:** overflow only. Unaffected.

**New unit ids** (the folder uses the MNO, MNF and MNS families):
- MNO-5..8 (`priceHoldsNow`, `rowPrice`, `priceGroups`, step links)
- MNF-12..13 (`priceSummary`)
- MNS-11..13 (price column; panel open/close and hash; onCreated opens Prices)
- MPD-1..3 (panel order)

All ids will be checked free with `rg -w` before use.

## (e) Budget
`/admin/monetisation` ceiling: 313 KiB (`scripts/route-budgets.mjs:47`; CI run 43859278786 measured 309.9). I cannot measure here.

The Sheet's shell already rides this page (the Guide sheet, the P-1c note on that line). Its Radix code comes on demand through the overlay loader. Expected growth: the new pure functions, the cell and the strings, about 1–2 KiB. The page's `DetailPanel` use is new to it. The supervisor measures.

## (f) New string keys (English)
- `admin.monetisation.col.price`: "Price"
- `admin.monetisation.price.none`: "No price yet"
- `admin.monetisation.price.exceptions`: "+{count} exceptions"
- `admin.monetisation.product.openPanel`: "Prices & details"
- `admin.monetisation.panel.details`: "Details"
- `admin.monetisation.price.kind.standard`: "Standard price"
- `admin.monetisation.price.kind.market`: "Exception: {market}"
- `admin.monetisation.price.kind.category`: "Exception: {category}"
- `admin.monetisation.price.kind.both`: "Exception: {market} · {category}"
- `admin.monetisation.price.group.now`: "Now"
- `admin.monetisation.price.group.scheduled`: "Scheduled"
- `admin.monetisation.price.group.ended`: "Ended ({count})"
- `admin.monetisation.price.summary`: "{product}, in {where}, {amount}, from {from}."
- `admin.monetisation.price.summaryUntil`: "{product}, in {where}, {amount}, from {from} until {to}."
- `admin.monetisation.empty.levelsWhy`: "No levels yet — sellers cannot pick an ad level until one exists."
- `admin.monetisation.empty.reachWhy`: "No reach products yet — sellers cannot widen where their ad is seen."
- `admin.monetisation.empty.pricesWhy`: "No price yet — sellers cannot buy this product."
- `admin.monetisation.empty.overridesWhy`: "No per-category perks — every category uses this level's own perks."
- `admin.monetisation.empty.marketsWhy`: "No markets yet — no market can switch on paid levels."

Because a renamed string is a new key (D5), the old `admin.monetisation.empty.*` keys retire when unread. Amharic: all of it from the supervisor.

## (g) Where I would do differently
1. **Side panel or in-row panel.** The house Sheet is modal. The table is "behind" it but cannot be clicked, which breaks MON-4 `:703` and AG-1's nested Guide. There are two clean choices:
   - (i) a modal Sheet. The spec closes it through the panel, and the guides open on top.
   - (ii) keep the in-row panel but make it obvious: a visible "Prices & details" button, Prices first, and no Sheet. That needs no spec change and no new bytes.
   I lean to (ii) for phones (the Sheet is full-width there anyway) and ask for a ruling. "D322" does not name the Sheet, so I cannot cite it for (i).
2. **Several standard prices at once.** One per currency can hold now. The cell would show them joined ("150 ETB · 5 USD") rather than pick one.
3. **One-line strip.** This needs an `OrderStrip` prop (a shared primitive). I ask before touching it, or I drop the point.
4. **Exceptions count.** "+N exceptions" counts only exceptions that hold now. Scheduled ones show only in the panel, to keep each fact in one place.

## Build end
After the build: A6 checks, the report, and K2. Then `git diff --name-only 8ac9908f8` and write back anything outside the task's files, `.lovable/plan.md` included.

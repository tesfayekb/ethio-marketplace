Source: supervisor thread, turn 1284, Sat 2026-10-03 23:19 New York.
Status at 2026-10-04: the operator answered on 2026-10-03 23:28: recommendation 1 — "I thing it has to be editable?" (the home country became changeable once every 30 days in the revised prompt of turn 1286); recommendation 2 — "ok" (AI-made suggestions wait for the admin page with the AI switches); built with the walk fixes (M4, M4b); sharing buttons are not built (they wait for the public ad page).
Related: bundle 3 walk fixes, INC-412, INC-413, DEC-068, public ad page (share buttons).

## The hole

`telebirr1` is accepted as a seller name, and the system even suggests it. The rules I wrote ignore digits, so a protected name plus a number gets through: `cbe123`, `awashbank2`, or the business name "Telebirr 1". The fix judges every name a second time with the digits at its edges removed. I tested 18 example names against that rule before writing the prompt.

## Your questions

- **Telegram box.** It is checked only when the step is saved (5 to 32 letters, digits or underscore), with no help as you type. The fix makes it the same width as the phone boxes, accepts `@name` or a pasted `t.me/name` link, checks it as typed, and adds a hint showing where to find the username.
- **Share to Telegram, WhatsApp, Facebook at the last step.** There is nothing to share yet: the ad is "In review" and the public ad page is not built. I recorded it for that bundle: the seller taps to share, and nothing posts automatically, as you ruled.
- **Wrong home country.** After confirming, it cannot be changed without support, which is why the list stopped responding. The fix adds your dialog: it names the country and says it cannot be changed later. Changing it in Settings, with a limit, was decided on 16 September and is not built yet.
- **Home country list.** I found that it offers only open markets, so a seller living in Germany cannot choose Germany. The fix offers every country; the missing countries come from a curator file that you import.
- **Name suggestions from what they sell.** Yes. This version builds them from the seller's name plus the category, such as `abebephones`. It is instant and costs nothing.
- **Changes left.** Yes. A line under the name box will say when the next change is allowed.

## Recommendations inside the prompt

Tell me before you send if you disagree with either.

1. The home-country list offers every country, not only open markets.
2. AI-made name suggestions wait for the admin page with the AI switches; this round uses name plus category.

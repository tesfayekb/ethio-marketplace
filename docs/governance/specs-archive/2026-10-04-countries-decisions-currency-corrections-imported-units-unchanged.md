Source: supervisor thread, turn 1300, Sun 2026-10-04 02:16 New York.
Status at 2026-10-05: decided 2026-10-04 06:20Z (the curator's held currency file c27-countries-currency-corrections-HELD-2026-10-03.csv imported as delivered, 4 rows; unit systems unchanged — imperial only for the United States, Liberia and Myanmar); the import result was not pasted in the thread; not in the repo (the countries console and reference docs describe the table, not this ruling).
Related: countries table (249 rows, 17 open markets), INC-413 (home-country list), bundle 3 walk fixes, curator countries check.

**The curator is right, and sending them for that file was my mistake.** The countries table has held all 249 countries since September; I assumed rows were missing without checking. The home-country list showed only 17 because of the screen, and the walk fixes already correct that.

I audited the export and the held file:

- **Export:** 249 rows, 17 open markets, imperial only for the United States, Liberia and Myanmar.
- **Held currency file:** 4 rows, and only the currency changes on each. The app's currency list already knows the corrected codes.

## Decisions

- **Currencies: import the held file.** It fixes Curaçao and Sint Maarten (old guilder to the new one) and un-swaps Saint Helena and South Georgia. All four are closed markets, so nothing visible changes today.
- **Units: none of the 12 change.** Your standing rule is imperial for the United States, Liberia and Myanmar only, and all 12 are closed markets. If one ever opens, revisit it then.

## What to do

1. In the admin console on the live site, import `c27-countries-currency-corrections-HELD-2026-10-03.csv` as the countries file. Leave the country scope empty.
2. The preview should say changed 4, refused 0. If it does, confirm. If it says anything else, stop and send me the counts.
3. Send the curator this:

```
No countries file is needed; thank you for checking before building one. Currency corrections: importing your held file as delivered (4 rows). Unit system: none of the 12 change. The standing rule stays: imperial for the United States, Liberia and Myanmar only.
```

No walk is needed for this; it is a data-only change.

## Lovable

It has written M4b, and all the name-rule rows I asked for are in it. It saved M4b without its mark, so it added a small follow-up file (M4c) that records it. I will review both properly when you bring its report. Apply whatever "apply … → expect mark …" lines it gives you on staging, in the order given.

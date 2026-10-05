Source: supervisor thread, turn 1284, Sat 2026-10-03 23:19 New York.
Status at 2026-10-05: sent to the curator with the countries export (turns 1286 to 1288); answered 2026-10-04 02:16 — no country was missing (the export already held all 249 ISO 3166-1 entries), so no file was built; the curator's four currency corrections were imported as a held file (turn 1300) and the unit systems left unchanged; the home-country picker's short list was a screen defect fixed by the walk fixes (INC-413); not in the repo.
Related: INC-413, countries table, curator countries check, INC-374, INC-381, DEC-094.

CURATOR: countries file (small task).

A seller must be able to state the country they live in, and the countries list holds only our markets today.

1. Export the current countries file from the admin countries page. Rows already there stay untouched and out of your file.
2. Deliver one countries import file, in that export's format, with one row for every ISO 3166-1 country or territory that is missing:
   - country_code: ISO alpha-2.
   - name_en: the common English short name.
   - is_active: false (a closed market; it only makes the country choosable as a home country).
   - unit_system: the system in everyday use there.
   - currency_code: the main legal tender, ISO 4217.
   - display_order and root_order: as the format expects for a closed market.
3. A short note: your sources, the row count, and every country where the currency or unit system was a judgement call.

Unchanged: the standing rules, and the items still waiting for the engine (INC-374, INC-381, DEC-094).

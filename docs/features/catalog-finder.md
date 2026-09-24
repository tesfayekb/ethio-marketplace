# Catalog finder

## D37-1 — Index, RPC and route

The catalog finder is the server-side search foundation for later wizard and synonyms-console landings. This landing adds no client UI.

- `pg_trgm` was already enabled; no package or database extension was added.
- `catalog_find_index` is private behind RLS with no client policy. Public reads use only the bounded `catalog_find` RPC.
- A rebuild indexes published category names and paths, attribute labels, option labels, option aliases and numeric unit forms in each published language. Option terms are attached to every effective listing leaf.
- Category, category-link and entity-translation publication writes schedule one transaction-deduplicated rebuild. The explicit admin rebuild remains available for repair and other publication paths.
- `GET /api/catalog/find?q=…&lang=…` accepts 2–64 characters and a 2–3 letter language code. It returns at most eight rows and trims the lowest-ranked rows to stay inside a 2 KB response budget.
- Results cache for 60 seconds by normalized query, language and catalog version. Requests are rate-limited per hashed edge IP through `consume_rate_limit`; the raw address is never stored.
- Exact aliases rank above prefixes and trigram matches. Language-local hits rank before fallback languages; categories rank before identity-fold options, then other options and synonyms. Active listing count breaks remaining leaf ties.

The current rebuild contains 4,911 leaf-bound rows from 3,730 distinct terms across the enabled languages. This is bounded by catalog terms multiplied by published languages and linked leaves; it does not grow with searches or users.

### Performance contract

The RPC returns no more than eight rows and the route trims the lowest-ranked rows until the response fits the 2 KB budget (INC-273); it never fails a search for size. Migration proof profiles the current catalog and confirms the fuzzy candidate pass reads the distinct-term lexicon rather than the larger leaf-bound index.

## Forward scan — U7 marketplace filters

The marketplace landing must consume the returned `leaf_id` plus `matches` attribute key/value pairs as a proposed filter contract. It must revalidate every filter against the selected leaf's effective links and current options before changing a feed query; finder scores are ranking evidence, never authorization or validation authority.

## Operations

`catalog_find_rebuild()` is the administrative repair door. Normal category and entity-translation publication writes refresh automatically once per transaction. Failures abort the publishing transaction rather than leaving a silently stale finder.
